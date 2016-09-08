namespace ipushpull {
    "use strict";

    import IHttpService = angular.IHttpService;
    import IHttpParamSerializer = angular.IHttpParamSerializer;
    import IQService = angular.IQService;
    import IPromise = angular.IPromise;

    interface IRequest{
        method: (method: string) => IRequest;
        url: (method: string) => IRequest;
        headers: (method: {[s: string]: string}) => IRequest;
        data: (method: any) => IRequest;
        params: (method: {[s: string]: string}) => IRequest;
        cache: (method: boolean) => IRequest;
    }

    interface IRequestResult {
        success: boolean;
        data: any;
        httpCode: number;
        httpText: string;
    }

    class Request implements IRequest {
        private _method: string;
        private _url: string;
        private _headers: {[s: string]: string} = {
            "Content-Type": "application/json",
        };
        private _data: any;
        private _params: any;
        private _cache: boolean = false;
        private _overrideLock: boolean = false;
        
        constructor (method: string, url: string){
            this._method = method;
            this._url = url;
        }

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
        getSelfInfo: () => IPromise<IRequestResult>;
        refreshAccessTokens: (refreshToken: string) => IPromise<IRequestResult>;
        userLogin: (data: any) => IPromise<IRequestResult>;
        createFolder: () => IPromise<IRequestResult>;
        getDomains: () => IPromise<IRequestResult>;
        getDomain: (domainId: number) => IPromise<IRequestResult>;
        updateDomain: (data: any) => IPromise<IRequestResult>;
        getDomainPages: (domainId) => IPromise<IRequestResult>;
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
        public static $inject: string[] = ["$http", "$httpParamSerializerJQLike", "$q", "ippAuth", "ipushpull_conf"];

        private _endPoint: string;

        constructor(private $http: IHttpService, private $httpParamSerializerJQLike: IHttpParamSerializer, private $q: IQService, private auth, private config){
            this._endPoint = `${this.config.api_url}/api/1.0/`;

            return;
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
                    .params({
                        grant_type: "refresh_token",
                        client_id: this.config.api_key,
                        client_secret: this.config.api_secret,
                        refresh_token: refreshToken,
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

        public createFolder(data: number): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "domains/").data(data.data));
        }

        public updateDomain(data: any): IPromise<IRequestResult>{
            return this.send(
                Request
                    .put(this._endPoint + "domains/" + data.domainId + "/")
                    .data(data.data)
            );
        }

        public getDomainPages(domainId): IPromise<IRequestResult>{
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
                    .params({client_seq_no:data.seq_no})
            );
        }

        getPageAccess(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "domains/id/" + data.domainId + "/page_access/id/" + data.pageId + "/"));
        }

        createPage(data: any): IPromise<IRequestResult>{
            return this.send(
                Request
                    .post(this._endPoint + "domains/" + data.domainId + "/pages/")
                    .data({name: data.data.name})
            );
        }

        savePageContent(data: any): IPromise<IRequestResult>{
            return this.send(
                Request
                    .put(this._endPoint + "domains/id/" + data.domainId + "/page_content/id/" + data.pageId + "/")
                    .data(data.data)
            );
        }

        savePageContentDelta(data: any): IPromise<IRequestResult>{
            return this.send(
                Request
                    .put(this._endPoint + "domains/id/" + data.domainId + "/page_content_delta/id/" + data.pageId + "/")
                    .data(data.data)
            );
        }

        savePageSettings(data: any): IPromise<IRequestResult>{
            return this.send(
                Request
                    .put(this._endPoint + "domains/" + data.domainId + "/pages/" + data.pageId + "/")
                    .data(data.data)
            );
        }

        deletePage(data: any): IPromise<IRequestResult>{
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/pages/" + data.pageId + "/"));
        }

        saveUserInfo(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "users/self/").data(data));
        }

        changePassword(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "credentials/self/").data(data));
        }

        changeEmail(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "credentials/self/").data(data));
        }

        forgotPassword(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "password_reset/").data(data));
        }

        resetPassword(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "password_reset/confirm/").data(data));
        }

        inviteUsers(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/invitations/").data(data.data));
        }

        acceptInvitation(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "users/invitation/confirm/").data(data));
        }

        refuseInvitation(data: any): IPromise<IRequestResult>{
            return this.send(Request.del(this._endPoint + "users/invitation/confirm/").data(data));
        }

        domainInvitations(data: any): IPromise<IRequestResult>{
            return this.send(
                Request
                    .get(this._endPoint + "domains/" + data.domainId + "/invitations/")
                    .params({is_complete: "False"})
            );
        }

        userInvitations(): IPromise<IRequestResult>{
            return this.send(
                Request
                    .get(this._endPoint + "users/self/invitations/")
                    .params({is_complete: "False"})
            );
        }

        domainAccessLog(data: any): IPromise<IRequestResult>{
            return this.send(
                Request
                    .get(this._endPoint + "domain_access/" + data.domainId + "/events/")
                    .params({page_size: data.limit})
            );
        }

        domainUsers(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "domain_access/" + data.domainId + "/users/"));
        }

        activateUser(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "users/signup/confirm/").data(data));
        }

        setDomainDefault(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "domain_access/" + data.domainId + "/users/self/").data(data.data));
        }

        resendInvite(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "domains/" + data.domainId + "/invitations/" + data.inviteId + "/resend/"));
        }

        updateDomainAccess(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "domain_access/" + data.domainId + "/users/").data(data.data));
        }

        removeUsersFromDomain(data: any): IPromise<IRequestResult>{
            return this.send(Request.del(this._endPoint + "domain_access/" + data.domainId + "/users/").data(data.data));
        }

        getInvitation(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "users/invitations/" + data.token + "/"));
        }

        cancelInvitations(data: any): IPromise<IRequestResult>{
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/invitations/").data(data.data));
        }

        getDomainAccessGroups(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "domains/" + data.domainId + "/access_groups/"));
        }

        getDomainAccessGroup(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.groupId + "/"));
        }

        addDomainAccessGroup(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/access_groups/").data(data.data));
        }

        putDomainAgroupMembers(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.agroupId + "/members/").data(data.data));
        }

        putDomainAgroupPages(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.agroupId + "/pages/").data(data.data));
        }

        updateDomainAgroup(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.agroupId + "/").data(data.data));
        }

        deleteDomainAGroup(data: any): IPromise<IRequestResult>{
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.agroupId + "/"));
        }

        getDomainPageAccess(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "domain_page_access/" + data.domainId + "/"));
        }

        getDomainCustomers(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "domains/" + data.domainId + "/customers/"));
        }

        saveDomainPageAccess(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "domain_page_access/" + data.domainId + "/basic/").data(data.data));
        }

        getTemplates(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint + "templates/"));
        }

        saveCustomer(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/customers/").data(data.data));
        }

        updateCustomer(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint + "domains/" + data.domainId + "/customers/" + data.data.id + "/").data(data.data));
        }

        removeCustomer(data: any): IPromise<IRequestResult>{
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/customers/" + data.customerId + "/"));
        }

        getDocEmailRules(data: any): IPromise<IRequestResult>{
            return this.send(Request.get(this._endPoint2 + "domains/" + data.domainId + "/docsnames/"));
        }

        createDocEmailRule(data: any): IPromise<IRequestResult>{
            return this.send(Request.post(this._endPoint2 + "domains/" + data.domainId + "/docsnames/").data(data.data));
        }

        updateDocEmailRule(data: any): IPromise<IRequestResult>{
            return this.send(Request.put(this._endPoint2 + "domains/" + data.domainId + "/docsnames/" + data.docRuleId + "/").data(data.data));
        }

        deleteDocEmailRule(data: any): IPromise<IRequestResult>{
            return this.send(Request.del(this._endPoint2 + "domains/" + data.domainId + "/docsnames/" + data.docRuleId + "/"));
        }

        private send(request: Request): IPromise<IRequestResult> {
            // Add auth header
            request.headers({
                "Authorization": `Bearer ${(this.auth.token) ? this.auth.token : "null"}`,
            });

            // let provider = (this.$rootScope.blockApi && !request.OVERRIDE_LOCK) ? this.dummyRequest : this.$http;
            let provider = this.$http;

            // for now, disabled cache on all requests
            request.cache(false);

            // Add micro time to get requests - !!STUPID IE!!
            /*if (request.METHOD === "GET" && ipp.config.isIE){
                request.params({ie: new Date().getTime()});
            }*/

            let r = provider({
                url: request.URL,
                cache: request.CACHE,
                method: request.METHOD,
                params: request.PARAMS,
                data: request.DATA,
                headers: request.HEADERS,
            });

            return r.then(this.handleSuccess, this.handleError);
        }

        /*private dummyRequest(data: any): IPromise<any> {
            this._logger.log("Api is locked down, preventing call " + data.url);

            let q = this.$q.defer();

            q.reject({
                data: {},
                status: 666,
                statusText: "Api is locked"
            });

            return q.promise;
        }*/

        private handleSuccess = (response: any): IPromise<IRequestResult> => {
            let q = this.$q.defer();

            q.resolve({
                success: true,
                data: response.data,
                httpCode: parseInt(response.status, 10),
                httpText:response.statusText,
            });

            return q.promise;
        };

        private handleError = (response: any): IPromise<IRequestResult> => {
            let q = this.$q.defer();

            // Run authentication if 401
            if (parseInt(response.status, 10) === 401){
                this.auth.refreshTokens();
            }

            q.reject({
                success: false,
                data: response.data,
                httpCode: parseInt(response.status, 10),
                httpText: response.statusText
            });

            return q.promise;
        };
    }

    ipushpull.module.service("ippApi", Api);
}
