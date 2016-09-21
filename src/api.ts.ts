namespace ipushpull {
    "use strict";

    import IHttpService = angular.IHttpService;
    import IHttpParamSerializer = angular.IHttpParamSerializer;
    import IQService = angular.IQService;
    import IPromise = angular.IPromise;
    import IDeferred = angular.IDeferred;
    import IInjectorService = angular.auto.IInjectorService;

    interface IRequest{
        method: (method: string) => IRequest;
        url: (method: string) => IRequest;
        headers: (method: {[s: string]: string}) => IRequest;
        data: (method: any) => IRequest;
        params: (method: {[s: string]: string}) => IRequest;
        cache: (method: boolean) => IRequest;
    }

    export interface IRequestResult {
        success: boolean;
        data: any;
        httpCode: number;
        httpText: string;
    }

    class Request implements IRequest {
        private _method: string;
        private _url: string;
        private _headers: {[s: string]: string} = {};
        private _data: any;
        private _params: any;
        private _cache: boolean = false;
        private _overrideLock: boolean = false;

        public static get(url: string): Request{
            return new Request("GET", url);
        }

        public static post(url: string): Request{
            return new Request("POST", url);
        }

        public static put(url: string): Request{
            return new Request("PUT", url);
        }

        public static del(url: string): Request{
            return new Request("DELETE", url);
        }
        
        constructor (method: string, url: string){
            this._method = method;
            this._url = url;

            this._headers = {
                "Content-Type": "application/json",
                "x-requested-with": "XMLHttpRequest",
                "x-ipp-device-uuid": "", // @todo get uuid somehow - local storage
                "x-ipp-client": "", // @todo get client id - ipp config
                "x-ipp-client-version": "", // @todo get client version - ipp config
            };
        }

        // @todo Bleh...
        public get METHOD(): string { return this._method; }
        public get URL(): string { return this._url; }
        public get HEADERS(): {[s: string]: string} { return this._headers; }
        public get DATA(): any { return this._data; }
        public get PARAMS(): {[s: string]: string} { return this._params; }
        public get CACHE(): boolean { return this._cache; }
        public get OVERRIDE_LOCK(): boolean { return this._overrideLock; }

        public method(method: string): Request {
            this._method = method;
            return this;
        }

        public url(url: string): Request {
            this._url = url;
            return this;
        }

        public headers(headers: {[s: string]: string|number}, overwrite: boolean = false): Request {
            this._headers = (overwrite) ? headers : angular.merge({}, this._headers, headers);
            return this;
        }

        public data(data: any): Request {
            this._data = data;
            return this;
        }

        public params(params: {[s: string]: string|number}, overwrite: boolean = false): Request {
            this._params = (overwrite) ? params : angular.merge({}, this._params, params);
            return this;
        }

        public cache(cache: boolean): Request {
            // Allow cache only for GET requests
            if (cache && this._method === "GET") {
                this._cache = cache;
            }

            return this;
        }
        
        public overrideLock(override: boolean = true): Request {
            this._overrideLock = override;
            return this;
        }
    }

    export interface IApiService {
        parseError: (err: any, def: string) => string;
        getSelfInfo: () => IPromise<IRequestResult>;
        refreshAccessTokens: (refreshToken: string) => IPromise<IRequestResult>;
        userLogin: (data: any) => IPromise<IRequestResult>;
        createFolder: (data: any) => IPromise<IRequestResult>;
        getDomains: () => IPromise<IRequestResult>;
        getDomain: (domainId: number) => IPromise<IRequestResult>;
        updateDomain: (data: any) => IPromise<IRequestResult>;
        getDomainPages: (domainId: number) => IPromise<IRequestResult>;
        getDomainsAndPages: () => IPromise<IRequestResult>;
        getPage: (data: any) => IPromise<IRequestResult>;
        getPageByName: (data: any) => IPromise<IRequestResult>;
        getPageAccess: (data: any) => IPromise<IRequestResult>;
        createPage: (data: any) => IPromise<IRequestResult>;
        savePageContent: (data: any) => IPromise<IRequestResult>;
        savePageContentDelta: (data: any) => IPromise<IRequestResult>;
        savePageSettings: (data: any) => IPromise<IRequestResult>;
        deletePage: (data: any) => IPromise<IRequestResult>;
        saveUserInfo: (data: any) => IPromise<IRequestResult>;
        changePassword: (data: any) => IPromise<IRequestResult>;
        changeEmail: (data: any) => IPromise<IRequestResult>;
        forgotPassword: (data: any) => IPromise<IRequestResult>;
        resetPassword: (data: any) => IPromise<IRequestResult>;
        inviteUsers: (data: any) => IPromise<IRequestResult>;
        acceptInvitation: (data: any) => IPromise<IRequestResult>;
        refuseInvitation: (data: any) => IPromise<IRequestResult>;
        domainInvitations: (data: any) => IPromise<IRequestResult>;
        userInvitations: () => IPromise<IRequestResult>;
        domainAccessLog: (data: any) => IPromise<IRequestResult>;
        domainUsers: (data: any) => IPromise<IRequestResult>;
        activateUser: (data: any) => IPromise<IRequestResult>;
        setDomainDefault: (data: any) => IPromise<IRequestResult>;
        resendInvite: (data: any) => IPromise<IRequestResult>;
        updateDomainAccess: (data: any) => IPromise<IRequestResult>;
        removeUsersFromDomain: (data: any) => IPromise<IRequestResult>;
        getInvitation: (data: any) => IPromise<IRequestResult>;
        cancelInvitations: (data: any) => IPromise<IRequestResult>;
        getDomainAccessGroups: (data: any) => IPromise<IRequestResult>;
        getDomainAccessGroup: (data: any) => IPromise<IRequestResult>;
        addDomainAccessGroup: (data: any) => IPromise<IRequestResult>;
        putDomainAgroupMembers: (data: any) => IPromise<IRequestResult>;
        putDomainAgroupPages: (data: any) => IPromise<IRequestResult>;
        updateDomainAgroup: (data: any) => IPromise<IRequestResult>;
        deleteDomainAGroup: (data: any) => IPromise<IRequestResult>;
        getDomainPageAccess: (data: any) => IPromise<IRequestResult>;
        getDomainCustomers: (data: any) => IPromise<IRequestResult>;
        saveDomainPageAccess: (data: any) => IPromise<IRequestResult>;
        getTemplates: (data: any) => IPromise<IRequestResult>;
        saveCustomer: (data: any) => IPromise<IRequestResult>;
        updateCustomer: (data: any) => IPromise<IRequestResult>;
        removeCustomer: (data: any) => IPromise<IRequestResult>;
        getDocEmailRules: (data: any) => IPromise<IRequestResult>;
        createDocEmailRule: (data: any) => IPromise<IRequestResult>;
        updateDocEmailRule: (data: any) => IPromise<IRequestResult>;
        deleteDocEmailRule: (data: any) => IPromise<IRequestResult>;
    }

    class Api implements IApiService {
        public static $inject: string[] = ["$http", "$httpParamSerializerJQLike", "$q", "$injector", "ippGlobalStorageService", "ipushpull_conf"];

        private _endPoint: string;
        private _locked: boolean = false;

        constructor(private $http: IHttpService, private $httpParamSerializerJQLike: IHttpParamSerializer, private $q: IQService, private $injector: IInjectorService, private storage, private config: IIPPConfig){
            this._endPoint = `${this.config.url}/api/1.0/`;
        }

        public parseError(err: any, def: string): string {
            let msg: string = def;

            if (err.data){
                let keys: string[] = Object.keys(err.data);
                if (keys.length){
                    if (angular.isArray(err.data[keys[0]])){
                        msg = err.data[keys[0]][0];
                    } else if (typeof err.data[keys[0]] === "string"){
                        msg = err.data[keys[0]];
                    } else {
                        msg = def;
                    }

                } else {
                    msg = def;
                }
            } else {
                msg = def;
            }

            return msg;
        }

        public getSelfInfo(): IPromise<IRequestResult>{
            return this
                .send(Request.get(this._endPoint + "users/self/")
                .cache(false)
                .overrideLock());
        }

        public refreshAccessTokens(refreshToken: string): IPromise<IRequestResult>{
            return this.send(
                Request.post(this._endPoint + "oauth/token/")
                    .data(this.$httpParamSerializerJQLike({
                        grant_type: "refresh_token",
                        client_id: this.config.api_key,
                        client_secret: this.config.api_secret,
                        refresh_token: refreshToken,
                    }))
                    .headers({
                        "Content-Type": "application/x-www-form-urlencoded",
                    })
                    .overrideLock()
            );
        }

        public userLogin(data: any): IPromise<IRequestResult>{
            return this.send(
                Request.post(this._endPoint + "oauth/token/")
                    .data(this.$httpParamSerializerJQLike({
                        grant_type: "password",
                        client_id: this.config.api_key,
                        client_secret: this.config.api_secret,
                        username: data.email,
                        password: data.password,
                    }))
                    .headers({
                        "Content-Type": "application/x-www-form-urlencoded",
                    })
            );
        }

        public getDomains(): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "domains/"));
        }

        public getDomain(domainId: number): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "domains/" + domainId + "/"));
        }

        public createFolder(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "domains/").data(data.data));
        }

        public updateDomain(data: any): IPromise<IRequestResult>{
            return this.send(
                Request
                    .put(this._endPoint + "domains/" + data.domainId + "/")
                    .data(data.data)
            );
        }

        public getDomainPages(domainId: number): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "domains/" + domainId + "/page_access/"));
        }

        public getDomainsAndPages(): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "domain_page_access/"));
        }

        public getPage(data: any): IPromise<IRequestResult>{
            return this.send(
                Request
                    .get(this._endPoint + "domains/id/" + data.domainId + "/page_content/id/" + data.pageId + "/")
                    .params({client_seq_no: data.seq_no})
            );
        }

        public getPageByName(data: any): IPromise<IRequestResult>{
            return this.send(
                Request
                    .get(this._endPoint + "domains/name/" + data.domainId + "/page_content/name/" + data.pageId + "/")
                    .params({client_seq_no: data.seq_no})
            );
        }

        public getPageAccess(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "domains/id/" + data.domainId + "/page_access/id/" + data.pageId + "/"));
        }

        public createPage(data: any): IPromise<IRequestResult>{
            return this.send(
                Request
                    .post(this._endPoint + "domains/" + data.domainId + "/pages/")
                    .data({name: data.data.name})
            );
        }

        public savePageContent(data: any): IPromise<IRequestResult>{
            return this.send(
                Request
                    .put(this._endPoint + "domains/id/" + data.domainId + "/page_content/id/" + data.pageId + "/")
                    .data(data.data)
            );
        }

        public savePageContentDelta(data: any): IPromise<IRequestResult>{
            return this.send(
                Request
                    .put(this._endPoint + "domains/id/" + data.domainId + "/page_content_delta/id/" + data.pageId + "/")
                    .data(data.data)
            );
        }

        public savePageSettings(data: any): IPromise<IRequestResult>{
            return this.send(
                Request
                    .put(this._endPoint + "domains/" + data.domainId + "/pages/" + data.pageId + "/")
                    .data(data.data)
            );
        }

        public deletePage(data: any): IPromise<IRequestResult>{
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/pages/" + data.pageId + "/"));
        }

        public saveUserInfo(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "users/self/").data(data));
        }

        public changePassword(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "credentials/self/").data(data));
        }

        public changeEmail(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "credentials/self/").data(data));
        }

        public forgotPassword(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "password_reset/").data(data));
        }

        public resetPassword(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "password_reset/confirm/").data(data));
        }

        public inviteUsers(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/invitations/").data(data.data));
        }

        public acceptInvitation(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "users/invitation/confirm/").data(data));
        }

        public refuseInvitation(data: any): IPromise<IRequestResult>{
            return this.send(Request.del(this._endPoint + "users/invitation/confirm/").data(data));
        }

        public domainInvitations(data: any): IPromise<IRequestResult>{
            return this.send(
                Request
                    .get(this._endPoint + "domains/" + data.domainId + "/invitations/")
                    .params({is_complete: "False"})
            );
        }

        public userInvitations(): IPromise<IRequestResult>{
            return this.send(
                Request
                    .get(this._endPoint + "users/self/invitations/")
                    .params({is_complete: "False"})
            );
        }

        public domainAccessLog(data: any): IPromise<IRequestResult>{
            return this.send(
                Request
                    .get(this._endPoint + "domain_access/" + data.domainId + "/events/")
                    .params({page_size: data.limit})
            );
        }

        public domainUsers(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "domain_access/" + data.domainId + "/users/"));
        }

        public activateUser(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "users/signup/confirm/").data(data));
        }

        public setDomainDefault(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "domain_access/" + data.domainId + "/users/self/").data(data.data));
        }

        public resendInvite(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "domains/" + data.domainId + "/invitations/" + data.inviteId + "/resend/"));
        }

        public updateDomainAccess(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "domain_access/" + data.domainId + "/users/").data(data.data));
        }

        public removeUsersFromDomain(data: any): IPromise<IRequestResult>{
            return this.send(Request.del(this._endPoint + "domain_access/" + data.domainId + "/users/").data(data.data));
        }

        public getInvitation(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "users/invitations/" + data.token + "/"));
        }

        public cancelInvitations(data: any): IPromise<IRequestResult>{
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/invitations/").data(data.data));
        }

        public getDomainAccessGroups(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "domains/" + data.domainId + "/access_groups/"));
        }

        public getDomainAccessGroup(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.groupId + "/"));
        }

        public addDomainAccessGroup(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/access_groups/").data(data.data));
        }

        public putDomainAgroupMembers(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.agroupId + "/members/").data(data.data));
        }

        public putDomainAgroupPages(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.agroupId + "/pages/").data(data.data));
        }

        public updateDomainAgroup(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.agroupId + "/").data(data.data));
        }

        public deleteDomainAGroup(data: any): IPromise<IRequestResult>{
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.agroupId + "/"));
        }

        public getDomainPageAccess(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "domain_page_access/" + data.domainId + "/"));
        }

        public getDomainCustomers(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "domains/" + data.domainId + "/customers/"));
        }

        public saveDomainPageAccess(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "domain_page_access/" + data.domainId + "/basic/").data(data.data));
        }

        public getTemplates(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "templates/"));
        }

        public saveCustomer(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/customers/").data(data.data));
        }

        public updateCustomer(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "domains/" + data.domainId + "/customers/" + data.data.id + "/").data(data.data));
        }

        public removeCustomer(data: any): IPromise<IRequestResult>{
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/customers/" + data.customerId + "/"));
        }

        public getDocEmailRules(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "domains/" + data.domainId + "/docsnames/"));
        }

        public createDocEmailRule(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/docsnames/").data(data.data));
        }

        public updateDocEmailRule(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "domains/" + data.domainId + "/docsnames/" + data.docRuleId + "/").data(data.data));
        }

        public deleteDocEmailRule(data: any): IPromise<IRequestResult>{
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/docsnames/" + data.docRuleId + "/"));
        }

        private send(request: Request): IPromise<IRequestResult> {
            // Add auth header
            let token: string = this.storage.get("access_token");
            request.headers({
                "Authorization": `Bearer ${(token) ? token : "null"}`,
            });

            // @todo Proper type...
            let provider: any = (this._locked && !request.OVERRIDE_LOCK) ? this.dummyRequest : this.$http;

            // for now, disabled cache on all requests
            request.cache(false);

            // @todo Add micro time to get requests - !!STUPID IE!!
            /*if (request.METHOD === "GET" && ipp.config.isIE){
                request.params({ie: new Date().getTime()});
            }*/

            let r: IPromise<any> = provider({
                url: request.URL,
                cache: request.CACHE,
                method: request.METHOD,
                params: request.PARAMS,
                data: request.DATA,
                headers: request.HEADERS,
            });

            return r.then(this.handleSuccess, this.handleError);
        }

        private dummyRequest = (data: any): IPromise<any> => {
            // console.log("Api is locked down, preventing call " + data.url);

            let q: IDeferred<any> = this.$q.defer();

            q.reject({
                data: {},
                status: 666,
                statusText: "Api is locked",
                config: data,
            });

            return q.promise;
        };

        private handleSuccess = (response: any): IPromise<IRequestResult> => {
            let q: IDeferred<IRequestResult> = this.$q.defer();

            q.resolve({
                success: true,
                data: response.data,
                httpCode: parseInt(response.status, 10),
                httpText: response.statusText,
            });

            return q.promise;
        };

        private handleError = (response: any): IPromise<IRequestResult> => {
            let q: IDeferred<IRequestResult> = this.$q.defer();

            // Run authentication if 401
            if (parseInt(response.status, 10) === 401 && !this._locked && response.data.error !== "invalid_grant"){
                // Lock down api
                this._locked = true;

                // Make sure access token is gone
                this.storage.remove("access_token");

                let ippAuth: IAuthService = this.$injector.get<IAuthService>("ippAuthService");

                // Attempt to re-log in - no matter what the result is, resolve this promise - @todo cannot remember why?
                console.log("Attempting to re-login");

                ippAuth.authenticate(true).finally(() => {
                    this._locked = false;
                    // console.log("Unblocking Api");
                });
            }

            q.reject({
                success: false,
                data: response.data,
                httpCode: parseInt(response.status, 10),
                httpText: response.statusText,
            });

            return q.promise;
        };
    }

    ipushpull.module.service("ippApiService", Api);
}
