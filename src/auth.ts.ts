namespace ipushpull {
    "use strict";
    import IQService = angular.IQService;
    import IPromise = angular.IPromise;
    import IDeferred = angular.IDeferred;
    import IEventEmitter = Wolfy87EventEmitter.EventEmitter;

    export interface IAuthService extends IEventEmitter {
        EVENT_LOGGED_IN: string;
        EVENT_RE_LOGGED_IN: string;
        EVENT_LOGGED_OUT: string;
        EVENT_ERROR: string;

        user: IUserSelf;

        authenticate: () => IPromise<any>;
        login: (username: string, password: string) => IPromise<any>;
        logout: () => void;
        refreshTokens: () => IPromise<any>;
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
        public static $inject: string[] = ["$q", "ippApiService", "ippGlobalStorageService", "ipushpull_conf"];

        public get EVENT_LOGGED_IN(): string { return "logged_in"; }
        public get EVENT_RE_LOGGED_IN(): string { return "re_logged"; }
        public get EVENT_LOGGED_OUT(): string { return "logged_out"; }
        public get EVENT_ERROR(): string { return "error"; }

        private _user: IUserSelf | any = {};

        public get user(): IUserSelf { return this._user; }

        constructor(private $q: IQService, private ippApi: IApiService, private storage, private config: any){
            super();
        }

        // @todo better name?
        public authenticate(): IPromise<any>{
            let q: IDeferred<any> = this.$q.defer();

            if (this.storage.get("access_token")){
                this.getUserInfo().then(() => {
                    this.emit(this.EVENT_LOGGED_IN); // @todo Actually at this moment we have no idea if access token is valid
                    q.resolve();
                }, (err) => {
                    this.emit(this.EVENT_ERROR, err);
                    q.reject(err);
                });
            } else if (this.storage.get("refresh_token")) {
                return this.refreshTokens();
            } else {
                q.reject("No tokens available");
            }

            return q.promise;
        }

        public refreshTokens(): IPromise<any> {
            let q: IDeferred<any> = this.$q.defer();

            let refreshToken: string = this.storage.get("refresh_token");

            if (!refreshToken){
                this.logout();
                q.reject();
                return q.promise;
            }

            this.ippApi.refreshAccessTokens(refreshToken).then((res) => {
                this.storage.create("access_token", res.data.access_token);
                this.storage.create("refresh_token", res.data.refresh_token);

                // @todo Code repetition from this.authenticate - just call that
                this.getUserInfo().then(() => {
                    this.emit(this.EVENT_RE_LOGGED_IN); // @todo do we need this?
                    this.emit(this.EVENT_LOGGED_IN);
                    q.resolve();
                }, (err) => {
                    this.emit(this.EVENT_ERROR, err);
                    q.reject(err);
                });
            }, (err) => {
                this.emit(this.EVENT_ERROR, err);
                q.reject(err);
            });

            return q.promise;
        }

        // @todo What a mess...
        public login(username: string, password: string): IPromise<any> {
            let q: IDeferred<any> = this.$q.defer();

            this.ippApi.userLogin({
                grant_type: "password",
                client_id: this.config.api_key,
                client_secret: this.config.api_secret,
                email: username,
                password: password,
            }).then((res) => {
                this.storage.create("access_token", res.data.access_token);
                this.storage.create("refresh_token", res.data.refresh_token);

                // @todo Code repetition from this.authenticate - just call that
                this.getUserInfo().then(() => {
                    this.emit(this.EVENT_LOGGED_IN);
                    q.resolve();
                }, (err) => {
                    this.emit(this.EVENT_ERROR, err);
                    q.reject(err);
                });

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
            this.emit(this.EVENT_LOGGED_OUT);

            this.storage.remove("access_token");
            this.storage.remove("refresh_token");
        }

        private getUserInfo(): IPromise<IUserSelf> {
            let q: IDeferred<IUserSelf> = this.$q.defer();

            this.ippApi.getSelfInfo().then((res) => {
                this._user = res.data; // going outside function scope..
                q.resolve();
            }, (err) => {
                q.reject(err);
            });

            return q.promise;
        }
    }

    ipushpull.module.service("ippAuthService", Auth);
}
