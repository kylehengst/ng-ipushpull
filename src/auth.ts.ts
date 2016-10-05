namespace ipushpull {
    "use strict";
    import IQService = angular.IQService;
    import IPromise = angular.IPromise;
    import IDeferred = angular.IDeferred;
    import IEventEmitter = Wolfy87EventEmitter.EventEmitter;

    export interface IAuthService extends IEventEmitter {
        EVENT_LOGGED_IN: string;
        EVENT_RE_LOGGING: string;
        EVENT_LOGIN_REFRESHED: string;
        EVENT_LOGGED_OUT: string;
        EVENT_ERROR: string;
        EVENT_401: string;

        user: IUserSelf;

        authenticate: (force?: boolean) => IPromise<any>;
        login: (username: string, password: string) => IPromise<any>;
        logout: () => void;
    }

    export interface IUserSelf {
        id: number;
        url: string;
        email: string;
        screen_name: string;
        first_name: string;
        last_name: string;
        mobile_phone_number: string;
        pushbullet_id: string;
        default_domain_id: number;
        default_page_id: number;
        default_domain_name: string;
        default_page_name: string;
        pending_invitation_count: number;
        can_create_folders: boolean;
        meta_data: any[];
    }

    class Auth extends EventEmitter {
        public static $inject: string[] = ["$q", "ippApiService", "ippStorageService", "ippConfig"];

        public get EVENT_LOGGED_IN(): string { return "logged_in"; } // emitted when logged in (not on login refresh)
        public get EVENT_RE_LOGGING(): string { return "re_logging"; } // emitted when re-logging started
        public get EVENT_LOGIN_REFRESHED(): string { return "login_refreshed"; } // emitted only after 401 and re-login
        public get EVENT_LOGGED_OUT(): string { return "logged_out"; } // emitted when logged out
        public get EVENT_ERROR(): string { return "error"; }
        public get EVENT_401(): string { return "401"; } // listener

        private _user: IUserSelf | any = {};
        private _authenticated: boolean = false;
        private _authInProgress: boolean = false;

        public get user(): IUserSelf { return this._user; }

        constructor(private $q: IQService, private ippApi: IApiService, private storage: IStorageService, private config: any){
            super();

            this.on("401", this.on401);
        }

        public authenticate(force: boolean = false): IPromise<any>{
            let q: IDeferred<any> = this.$q.defer();

            if (this._authInProgress){
                q.reject("Auth already in progress"); // @todo or resolve?
                return q.promise;
            }

            this._authInProgress = true;

            if (this._authenticated && !force){
                this._authInProgress = false;
                q.resolve(); // Actually at this moment we have no idea if access token is valid but we dont have to worry about that because of the 401 process from API
                return q.promise;
            }

            this.processAuth().then((res) => {
                if (!this._authenticated) {
                    this._authenticated = true;

                    // @todo oh no....
                    this.storage.user.suffix = this._user.id;

                    this.emit(this.EVENT_LOGGED_IN);
                }

                q.resolve();
            }, (err) => {
                this.emit(this.EVENT_ERROR, err);

                if (this._authenticated){
                    this.logout();
                }

                q.reject(err);
            }).finally(() => {
                this._authInProgress = false;
            });

            return q.promise;
        }

        public login(username: string, password: string): IPromise<any> {
            let q: IDeferred<any> = this.$q.defer();

            this.ippApi.userLogin({
                grant_type: "password",
                client_id: this.config.api_key,
                client_secret: this.config.api_secret,
                email: username,
                password: password,
            }).then((res) => {
                this.saveTokens(res.data);
                this.authenticate().then(q.resolve, q.reject);
            }, (err) => {
                err.message = "";
                if (err.httpCode === 400 || err.httpCode === 401) {
                    switch (err.data.error) {
                        case "invalid_grant":
                            err.message = "The username and password you entered did not match our records. Please double-check and try again.";
                            break;
                        case "invalid_client":
                            err.message = "Your client doesn\'t have access to iPushPull system.";
                            break;
                        case "invalid_request":
                            err.message = err.data.error_description;
                            break;
                        default :
                            err.message = this.ippApi.parseError(err.data, "Unknown error");
                            break;
                    }
                }

                this.emit(this.EVENT_ERROR, err);
                q.reject(err);
            });

            return q.promise;
        }

        public logout(): void{
            this.storage.persistent.remove("access_token");
            this.storage.persistent.remove("refresh_token");

            this._authenticated = false;

            // @todo oh no....
            this.storage.user.suffix = "GUEST";

            this.emit(this.EVENT_LOGGED_OUT);
        }

        private processAuth(): IPromise<any> {
            let q: IDeferred<any> = this.$q.defer();

            let accessToken: string = this.storage.persistent.get("access_token");
            let refreshToken: string = this.storage.persistent.get("refresh_token");

            if (accessToken){
                 return this.getUserInfo();
            } else {
                if (refreshToken){
                    this.refreshTokens().then((data) => {
                        this.saveTokens(data.data);
                        this.getUserInfo().then(q.resolve, q.reject);
                    }, (err) => {
                        this.storage.persistent.remove("refresh_token");
                        q.reject(err);
                    });
                } else {
                    q.reject("No tokens available");
                }
            }

            return q.promise;
        }

        private refreshTokens(): IPromise<any> {
            let refreshToken: string = this.storage.persistent.get("refresh_token");

            return this.ippApi.refreshAccessTokens(refreshToken);
        }

        private saveTokens(tokens: any): void {
            this.storage.persistent.create("access_token", tokens.access_token, (tokens.expires_in / 86400));
            this.storage.persistent.create("refresh_token", tokens.refresh_token);
        }

        private getUserInfo(): IPromise<IUserSelf> {
            let q: IDeferred<IUserSelf> = this.$q.defer();

            this.ippApi.getSelfInfo().then((res) => {
                this._user = res.data; // going outside function scope..
                q.resolve();
            }, q.reject);

            return q.promise;
        }

        private on401: any = () => {
            // Block rest api
            this.ippApi.block();

            // Remove access token
            this.storage.persistent.remove("access_token");

            this.emit(this.EVENT_RE_LOGGING); // @todo do we need this?

            // Try to authenticate
            this.authenticate(true).then(() => {
                // @todo oh no....
                this.storage.user.suffix = this._user.id;

                this.emit(this.EVENT_LOGIN_REFRESHED);
            }, () => {
                this.emit(this.EVENT_ERROR);
            }).finally(() => {
                this.ippApi.unblock();
            });
        };
    }

    ipushpull.module.service("ippAuthService", Auth);
}
