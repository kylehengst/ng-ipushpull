namespace ipushpull {
    "use strict";
    import IQService = angular.IQService;
    import IHttpService = angular.IHttpService;
    import IHttpParamSerializer = angular.IHttpParamSerializer;

    class Auth extends EventEmitter {
        public static $inject: string[] = ["$q", "$http", "$httpParamSerializerJQLike", "ipushpull_conf"];

        private _accessToken: string;
        private _refreshToken: string;

        public get token(): string {return this._accessToken; }

        constructor(private $q: IQService, private $http: IHttpService, private $httpParamSerializerJQLike: IHttpParamSerializer, private config: any){
            super();
        }

        public login(username: string, password: string) {
            let q = this.$q.defer();

            this.$http({
                method: "POST",
                data: this.$httpParamSerializerJQLike({
                    grant_type: "password",
                    client_id: this.config.api_key,
                    client_secret: this.config.api_secret,
                    username: username,
                    password: password,
                }),
                url: `${this.config.api_url}/api/1.0/oauth/token/`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }).then((res) => {
                this._accessToken = res.data.access_token;
                this._refreshToken = res.data.refresh_token;

                this.emit("logged_in");

                q.resolve();
            }, (err) => {
                this.emit("error", err);
                q.reject(err);
            });

            return q.promise;
        }

        public refreshTokens() {
            let q = this.$q.defer();

            if (!this._refreshToken){
                this.logout();
                q.reject();
                return q.promise;
            }

            this.$http({
                method: "POST",
                data: this.$httpParamSerializerJQLike({
                    grant_type: "refresh_token",
                    client_id: this.config.api_key,
                    client_secret: this.config.api_secret,
                    refresh_token: this._refreshToken,
                }),
                url: `${this.config.api_url}/api/1.0/oauth/token/`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }).then((res) => {
                this._accessToken = res.data.access_token;
                this._refreshToken = res.data.refresh_token;

                this.emit("re_logged");

                q.resolve();
            }, (err) => {
                this.emit("error", err);
                q.reject(err);
            });

            return q.promise;
        }

        public logout(): void{
            this.emit("logged_out");

            this._accessToken = undefined;
            this._refreshToken = undefined;
        }
    }

    ipushpull.module.service("ippAuth", Auth);
}
