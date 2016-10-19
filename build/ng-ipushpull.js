/*!
 * EventEmitter v5.1.0 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */
(function(){"use strict";function t(){}function i(t,n){for(var e=t.length;e--;)if(t[e].listener===n)return e;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var e=t.prototype,r=this,s=r.EventEmitter;e.getListeners=function(n){var r,e,t=this._getEvents();if(n instanceof RegExp){r={};for(e in t)t.hasOwnProperty(e)&&n.test(e)&&(r[e]=t[e])}else r=t[n]||(t[n]=[]);return r},e.flattenListeners=function(t){var e,n=[];for(e=0;e<t.length;e+=1)n.push(t[e].listener);return n},e.getListenersAsObject=function(n){var e,t=this.getListeners(n);return t instanceof Array&&(e={},e[n]=t),e||t},e.addListener=function(r,e){var t,n=this.getListenersAsObject(r),s="object"==typeof e;for(t in n)n.hasOwnProperty(t)&&-1===i(n[t],e)&&n[t].push(s?e:{listener:e,once:!1});return this},e.on=n("addListener"),e.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},e.once=n("addOnceListener"),e.defineEvent=function(e){return this.getListeners(e),this},e.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},e.removeListener=function(r,s){var n,e,t=this.getListenersAsObject(r);for(e in t)t.hasOwnProperty(e)&&(n=i(t[e],s),-1!==n&&t[e].splice(n,1));return this},e.off=n("removeListener"),e.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},e.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},e.manipulateListeners=function(r,t,i){var e,n,s=r?this.removeListener:this.addListener,o=r?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(e=i.length;e--;)s.call(this,t,i[e]);else for(e in t)t.hasOwnProperty(e)&&(n=t[e])&&("function"==typeof n?s.call(this,e,n):o.call(this,e,n));return this},e.removeEvent=function(e){var t,r=typeof e,n=this._getEvents();if("string"===r)delete n[e];else if(e instanceof RegExp)for(t in n)n.hasOwnProperty(t)&&e.test(t)&&delete n[t];else delete this._events;return this},e.removeAllListeners=n("removeEvent"),e.emitEvent=function(n,u){var r,e,t,i,o,s=this.getListenersAsObject(n);for(i in s)if(s.hasOwnProperty(i))for(r=s[i].slice(0),t=0;t<r.length;t++)e=r[t],e.once===!0&&this.removeListener(n,e.listener),o=e.listener.apply(this,u||[]),o===this._getOnceReturnValue()&&this.removeListener(n,e.listener);return this},e.trigger=n("emitEvent"),e.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},e.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},e._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},e._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return r.EventEmitter=s,t},"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:r.EventEmitter=t}).call(this);
var ipushpull;
(function (ipushpull) {
    "use strict";
    var ConfigProvider = (function () {
        function ConfigProvider() {
        }
        ConfigProvider.prototype.set = function (config) {
            var defaults = {
                api_url: "https://www.ipushpull.com/api/1.0",
                ws_url: "https://www.ipushpull.com",
                storage_prefix: "",
            };
            if (config.api_url && !config.ws_url) {
                var parts = config.api_url.split("/");
                defaults.ws_url = parts[0] + "//" + parts[2];
            }
            this._config = angular.merge({}, defaults, config);
        };
        ConfigProvider.prototype.$get = function () {
            return this._config;
        };
        return ConfigProvider;
    }());
    ipushpull.module = angular.module("ipushpull", [])
        .provider("ippConfig", ConfigProvider);
})(ipushpull || (ipushpull = {}));

var ipushpull;
(function (ipushpull) {
    "use strict";
    var Request = (function () {
        function Request(method, url) {
            this._headers = {};
            this._cache = false;
            this._overrideLock = false;
            this._method = method;
            this._url = url;
            this._headers = {
                "Content-Type": "application/json",
                "x-requested-with": "XMLHttpRequest",
                "x-ipp-device-uuid": "",
                "x-ipp-client": "",
                "x-ipp-client-version": "",
            };
        }
        Request.get = function (url) {
            return new Request("GET", url);
        };
        Request.post = function (url) {
            return new Request("POST", url);
        };
        Request.put = function (url) {
            return new Request("PUT", url);
        };
        Request.del = function (url) {
            return new Request("DELETE", url);
        };
        Object.defineProperty(Request.prototype, "METHOD", {
            get: function () { return this._method; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Request.prototype, "URL", {
            get: function () { return this._url; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Request.prototype, "HEADERS", {
            get: function () { return this._headers; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Request.prototype, "DATA", {
            get: function () { return this._data; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Request.prototype, "PARAMS", {
            get: function () { return this._params; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Request.prototype, "CACHE", {
            get: function () { return this._cache; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Request.prototype, "OVERRIDE_LOCK", {
            get: function () { return this._overrideLock; },
            enumerable: true,
            configurable: true
        });
        Request.prototype.method = function (method) {
            this._method = method;
            return this;
        };
        Request.prototype.url = function (url) {
            this._url = url;
            return this;
        };
        Request.prototype.headers = function (headers, overwrite) {
            if (overwrite === void 0) { overwrite = false; }
            this._headers = (overwrite) ? headers : angular.merge({}, this._headers, headers);
            return this;
        };
        Request.prototype.data = function (data) {
            this._data = data;
            return this;
        };
        Request.prototype.params = function (params, overwrite) {
            if (overwrite === void 0) { overwrite = false; }
            this._params = (overwrite) ? params : angular.merge({}, this._params, params);
            return this;
        };
        Request.prototype.cache = function (cache) {
            if (cache && this._method === "GET") {
                this._cache = cache;
            }
            return this;
        };
        Request.prototype.overrideLock = function (override) {
            if (override === void 0) { override = true; }
            this._overrideLock = override;
            return this;
        };
        return Request;
    }());
    var Api = (function () {
        function Api($http, $httpParamSerializerJQLike, $q, $injector, storage, config) {
            var _this = this;
            this.$http = $http;
            this.$httpParamSerializerJQLike = $httpParamSerializerJQLike;
            this.$q = $q;
            this.$injector = $injector;
            this.storage = storage;
            this.config = config;
            this._locked = false;
            this.dummyRequest = function (data) {
                console.log("Api is locked down, preventing call " + data.url);
                var q = _this.$q.defer();
                q.reject({
                    data: {},
                    status: 666,
                    statusText: "Api is locked",
                    config: data,
                });
                return q.promise;
            };
            this.handleSuccess = function (response) {
                var q = _this.$q.defer();
                q.resolve({
                    success: true,
                    data: response.data,
                    httpCode: parseInt(response.status, 10),
                    httpText: response.statusText,
                });
                return q.promise;
            };
            this.handleError = function (response) {
                var q = _this.$q.defer();
                if (parseInt(response.status, 10) === 401 && !_this._locked && response.data.error !== "invalid_grant") {
                    var ippAuth = _this.$injector.get("ippAuthService");
                    ippAuth.emit(ippAuth.EVENT_401);
                }
                q.reject({
                    success: false,
                    data: response.data,
                    httpCode: parseInt(response.status, 10),
                    httpText: response.statusText,
                });
                return q.promise;
            };
            this._endPoint = "" + this.config.api_url;
        }
        Api.prototype.block = function () {
            this._locked = true;
        };
        Api.prototype.unblock = function () {
            this._locked = false;
        };
        Api.prototype.getSelfInfo = function () {
            return this
                .send(Request.get(this._endPoint + "/users/self/")
                .cache(false)
                .overrideLock());
        };
        Api.prototype.refreshAccessTokens = function (refreshToken) {
            return this.send(Request.post(this._endPoint + "/oauth/token/")
                .data(this.$httpParamSerializerJQLike({
                grant_type: "refresh_token",
                client_id: this.config.api_key,
                client_secret: this.config.api_secret,
                refresh_token: refreshToken,
            }))
                .headers({
                "Content-Type": "application/x-www-form-urlencoded",
            })
                .overrideLock());
        };
        Api.prototype.userLogin = function (data) {
            return this.send(Request.post(this._endPoint + "/oauth/token/")
                .data(this.$httpParamSerializerJQLike({
                grant_type: "password",
                client_id: this.config.api_key,
                client_secret: this.config.api_secret,
                username: data.email,
                password: data.password,
            }))
                .headers({
                "Content-Type": "application/x-www-form-urlencoded",
            }));
        };
        Api.prototype.getDomains = function () {
            return this.send(Request.get(this._endPoint + "/domains/"));
        };
        Api.prototype.getDomain = function (domainId) {
            return this.send(Request.get(this._endPoint + "/domains/" + domainId + "/"));
        };
        Api.prototype.createFolder = function (data) {
            return this.send(Request.post(this._endPoint + "/domains/").data(data.data));
        };
        Api.prototype.updateDomain = function (data) {
            return this.send(Request
                .put(this._endPoint + "/domains/" + data.domainId + "/")
                .data(data.data));
        };
        Api.prototype.getDomainPages = function (domainId) {
            return this.send(Request.get(this._endPoint + "/domains/" + domainId + "/page_access/"));
        };
        Api.prototype.getDomainsAndPages = function () {
            return this.send(Request.get(this._endPoint + "/domain_page_access/"));
        };
        Api.prototype.getPage = function (data) {
            return this.send(Request
                .get(this._endPoint + "/domains/id/" + data.domainId + "/page_content/id/" + data.pageId + "/")
                .params({ client_seq_no: data.seq_no }));
        };
        Api.prototype.getPageByName = function (data) {
            return this.send(Request
                .get(this._endPoint + "/domains/name/" + data.domainId + "/page_content/name/" + data.pageId + "/")
                .params({ client_seq_no: data.seq_no }));
        };
        Api.prototype.getPageAccess = function (data) {
            return this.send(Request.get(this._endPoint + "/domains/id/" + data.domainId + "/page_access/id/" + data.pageId + "/"));
        };
        Api.prototype.createPage = function (data) {
            return this.send(Request
                .post(this._endPoint + "/domains/" + data.domainId + "/pages/")
                .data(data.data));
        };
        Api.prototype.savePageContent = function (data) {
            return this.send(Request
                .put(this._endPoint + "/domains/id/" + data.domainId + "/page_content/id/" + data.pageId + "/")
                .data(data.data));
        };
        Api.prototype.savePageContentDelta = function (data) {
            return this.send(Request
                .put(this._endPoint + "/domains/id/" + data.domainId + "/page_content_delta/id/" + data.pageId + "/")
                .data(data.data));
        };
        Api.prototype.savePageSettings = function (data) {
            return this.send(Request
                .put(this._endPoint + "/domains/" + data.domainId + "/pages/" + data.pageId + "/")
                .data(data.data));
        };
        Api.prototype.deletePage = function (data) {
            return this.send(Request.del(this._endPoint + "/domains/" + data.domainId + "/pages/" + data.pageId + "/"));
        };
        Api.prototype.saveUserInfo = function (data) {
            return this.send(Request.put(this._endPoint + "/users/self/").data(data));
        };
        Api.prototype.changePassword = function (data) {
            return this.send(Request.put(this._endPoint + "/credentials/self/").data(data));
        };
        Api.prototype.changeEmail = function (data) {
            return this.send(Request.put(this._endPoint + "/credentials/self/").data(data));
        };
        Api.prototype.forgotPassword = function (data) {
            return this.send(Request.post(this._endPoint + "/password_reset/").data(data));
        };
        Api.prototype.resetPassword = function (data) {
            return this.send(Request.post(this._endPoint + "/password_reset/confirm/").data(data));
        };
        Api.prototype.inviteUsers = function (data) {
            return this.send(Request.post(this._endPoint + "/domains/" + data.domainId + "/invitations/").data(data.data));
        };
        Api.prototype.acceptInvitation = function (data) {
            return this.send(Request.post(this._endPoint + "/users/invitation/confirm/").data(data));
        };
        Api.prototype.refuseInvitation = function (data) {
            return this.send(Request.del(this._endPoint + "/users/invitation/confirm/").data(data));
        };
        Api.prototype.domainInvitations = function (data) {
            return this.send(Request
                .get(this._endPoint + "/domains/" + data.domainId + "/invitations/")
                .params({ is_complete: "False" }));
        };
        Api.prototype.userInvitations = function () {
            return this.send(Request
                .get(this._endPoint + "/users/self/invitations/")
                .params({ is_complete: "False" }));
        };
        Api.prototype.domainAccessLog = function (data) {
            return this.send(Request
                .get(this._endPoint + "/domain_access/" + data.domainId + "/events/")
                .params({ page_size: data.limit }));
        };
        Api.prototype.domainUsers = function (data) {
            return this.send(Request.get(this._endPoint + "/domain_access/" + data.domainId + "/users/"));
        };
        Api.prototype.activateUser = function (data) {
            return this.send(Request.post(this._endPoint + "/users/signup/confirm/").data(data));
        };
        Api.prototype.setDomainDefault = function (data) {
            return this.send(Request.put(this._endPoint + "/domain_access/" + data.domainId + "/users/self/").data(data.data));
        };
        Api.prototype.resendInvite = function (data) {
            return this.send(Request.put(this._endPoint + "/domains/" + data.domainId + "/invitations/" + data.inviteId + "/resend/"));
        };
        Api.prototype.updateDomainAccess = function (data) {
            return this.send(Request.put(this._endPoint + "/domain_access/" + data.domainId + "/users/").data(data.data));
        };
        Api.prototype.removeUsersFromDomain = function (data) {
            return this.send(Request.del(this._endPoint + "/domain_access/" + data.domainId + "/users/").data(data.data));
        };
        Api.prototype.getInvitation = function (data) {
            return this.send(Request.get(this._endPoint + "/users/invitations/" + data.token + "/"));
        };
        Api.prototype.cancelInvitations = function (data) {
            return this.send(Request.del(this._endPoint + "/domains/" + data.domainId + "/invitations/").data(data.data));
        };
        Api.prototype.getDomainAccessGroups = function (data) {
            return this.send(Request.get(this._endPoint + "/domains/" + data.domainId + "/access_groups/"));
        };
        Api.prototype.getDomainAccessGroup = function (data) {
            return this.send(Request.get(this._endPoint + "/domains/" + data.domainId + "/access_groups/" + data.groupId + "/"));
        };
        Api.prototype.addDomainAccessGroup = function (data) {
            return this.send(Request.post(this._endPoint + "/domains/" + data.domainId + "/access_groups/").data(data.data));
        };
        Api.prototype.putDomainAgroupMembers = function (data) {
            return this.send(Request.post(this._endPoint + "/domains/" + data.domainId + "/access_groups/" + data.agroupId + "/members/").data(data.data));
        };
        Api.prototype.putDomainAgroupPages = function (data) {
            return this.send(Request.post(this._endPoint + "/domains/" + data.domainId + "/access_groups/" + data.agroupId + "/pages/").data(data.data));
        };
        Api.prototype.updateDomainAgroup = function (data) {
            return this.send(Request.put(this._endPoint + "/domains/" + data.domainId + "/access_groups/" + data.agroupId + "/").data(data.data));
        };
        Api.prototype.deleteDomainAGroup = function (data) {
            return this.send(Request.del(this._endPoint + "/domains/" + data.domainId + "/access_groups/" + data.agroupId + "/"));
        };
        Api.prototype.getDomainPageAccess = function (data) {
            return this.send(Request.get(this._endPoint + "/domain_page_access/" + data.domainId + "/"));
        };
        Api.prototype.getDomainCustomers = function (data) {
            return this.send(Request.get(this._endPoint + "/domains/" + data.domainId + "/customers/"));
        };
        Api.prototype.saveDomainPageAccess = function (data) {
            return this.send(Request.put(this._endPoint + "/domain_page_access/" + data.domainId + "/basic/").data(data.data));
        };
        Api.prototype.getTemplates = function (data) {
            return this.send(Request.get(this._endPoint + "/templates/"));
        };
        Api.prototype.saveCustomer = function (data) {
            return this.send(Request.post(this._endPoint + "/domains/" + data.domainId + "/customers/").data(data.data));
        };
        Api.prototype.updateCustomer = function (data) {
            return this.send(Request.put(this._endPoint + "/domains/" + data.domainId + "/customers/" + data.data.id + "/").data(data.data));
        };
        Api.prototype.removeCustomer = function (data) {
            return this.send(Request.del(this._endPoint + "/domains/" + data.domainId + "/customers/" + data.customerId + "/"));
        };
        Api.prototype.getDocEmailRules = function (data) {
            return this.send(Request.get(this._endPoint + "/domains/" + data.domainId + "/docsnames/"));
        };
        Api.prototype.createDocEmailRule = function (data) {
            return this.send(Request.post(this._endPoint + "/domains/" + data.domainId + "/docsnames/").data(data.data));
        };
        Api.prototype.updateDocEmailRule = function (data) {
            return this.send(Request.put(this._endPoint + "/domains/" + data.domainId + "/docsnames/" + data.docRuleId + "/").data(data.data));
        };
        Api.prototype.deleteDocEmailRule = function (data) {
            return this.send(Request.del(this._endPoint + "/domains/" + data.domainId + "/docsnames/" + data.docRuleId + "/"));
        };
        Api.prototype.send = function (request) {
            var token = this.storage.persistent.get("access_token");
            request.headers({
                "Authorization": "Bearer " + ((token) ? token : "null"),
            });
            var provider = (this._locked && !request.OVERRIDE_LOCK) ? this.dummyRequest : this.$http;
            request.cache(false);
            var r = provider({
                url: request.URL,
                cache: request.CACHE,
                method: request.METHOD,
                params: request.PARAMS,
                data: request.DATA,
                headers: request.HEADERS,
            });
            return r.then(this.handleSuccess, this.handleError);
        };
        Api.$inject = ["$http", "$httpParamSerializerJQLike", "$q", "$injector", "ippStorageService", "ippConfig"];
        return Api;
    }());
    ipushpull.module.service("ippApiService", Api);
})(ipushpull || (ipushpull = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ipushpull;
(function (ipushpull) {
    "use strict";
    var Auth = (function (_super) {
        __extends(Auth, _super);
        function Auth($q, $timeout, ippApi, storage, config) {
            var _this = this;
            _super.call(this);
            this.$q = $q;
            this.$timeout = $timeout;
            this.ippApi = ippApi;
            this.storage = storage;
            this.config = config;
            this._user = {};
            this._authenticated = false;
            this._authInProgress = false;
            this._selfTimeout = 15 * 1000;
            this.on401 = function () {
                _this.ippApi.block();
                _this.storage.persistent.remove("access_token");
                _this.emit(_this.EVENT_RE_LOGGING);
                _this.authenticate(true).then(function () {
                    _this.storage.user.suffix = _this._user.id;
                    _this.emit(_this.EVENT_LOGIN_REFRESHED);
                }, function () {
                    _this.emit(_this.EVENT_ERROR);
                }).finally(function () {
                    _this.ippApi.unblock();
                });
            };
            this.on("401", this.on401);
        }
        Object.defineProperty(Auth.prototype, "EVENT_LOGGED_IN", {
            get: function () { return "logged_in"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Auth.prototype, "EVENT_RE_LOGGING", {
            get: function () { return "re_logging"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Auth.prototype, "EVENT_LOGIN_REFRESHED", {
            get: function () { return "login_refreshed"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Auth.prototype, "EVENT_LOGGED_OUT", {
            get: function () { return "logged_out"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Auth.prototype, "EVENT_ERROR", {
            get: function () { return "error"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Auth.prototype, "EVENT_401", {
            get: function () { return "401"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Auth.prototype, "EVENT_USER_UPDATED", {
            get: function () { return "user_updated"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Auth.prototype, "user", {
            get: function () { return this._user; },
            enumerable: true,
            configurable: true
        });
        Auth.prototype.authenticate = function (force) {
            var _this = this;
            if (force === void 0) { force = false; }
            var q = this.$q.defer();
            if (this._authInProgress) {
                q.reject("Auth already in progress");
                return q.promise;
            }
            this._authInProgress = true;
            if (this._authenticated && !force) {
                this._authInProgress = false;
                q.resolve();
                return q.promise;
            }
            this.processAuth().then(function (res) {
                if (!_this._authenticated) {
                    _this._authenticated = true;
                    _this.storage.user.suffix = _this._user.id;
                    _this.emit(_this.EVENT_LOGGED_IN);
                    _this.startPollingSelf();
                }
                q.resolve();
            }, function (err) {
                _this.emit(_this.EVENT_ERROR, err);
                if (_this._authenticated) {
                    _this.logout();
                }
                q.reject(err);
            }).finally(function () {
                _this._authInProgress = false;
            });
            return q.promise;
        };
        Auth.prototype.login = function (username, password) {
            var _this = this;
            var q = this.$q.defer();
            this.ippApi.userLogin({
                grant_type: "password",
                client_id: this.config.api_key,
                client_secret: this.config.api_secret,
                email: username,
                password: password,
            }).then(function (res) {
                _this.saveTokens(res.data);
                _this.authenticate().then(q.resolve, q.reject);
            }, function (err) {
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
                        default:
                            err.message = ipushpull.Utils.parseApiError(err.data, "Unknown error");
                            break;
                    }
                }
                _this.emit(_this.EVENT_ERROR, err);
                q.reject(err);
            });
            return q.promise;
        };
        Auth.prototype.logout = function () {
            this.storage.persistent.remove("access_token");
            this.storage.persistent.remove("refresh_token");
            this._authenticated = false;
            this.$timeout.cancel(this._selfTimer);
            this.storage.user.suffix = "GUEST";
            this.emit(this.EVENT_LOGGED_OUT);
        };
        Auth.prototype.processAuth = function () {
            var _this = this;
            var q = this.$q.defer();
            var accessToken = this.storage.persistent.get("access_token");
            var refreshToken = this.storage.persistent.get("refresh_token");
            if (accessToken) {
                return this.getUserInfo();
            }
            else {
                if (refreshToken) {
                    this.refreshTokens().then(function (data) {
                        _this.saveTokens(data.data);
                        _this.getUserInfo().then(q.resolve, q.reject);
                    }, function (err) {
                        _this.storage.persistent.remove("refresh_token");
                        q.reject(err);
                    });
                }
                else {
                    q.reject("No tokens available");
                }
            }
            return q.promise;
        };
        Auth.prototype.refreshTokens = function () {
            var refreshToken = this.storage.persistent.get("refresh_token");
            return this.ippApi.refreshAccessTokens(refreshToken);
        };
        Auth.prototype.saveTokens = function (tokens) {
            this.storage.persistent.create("access_token", tokens.access_token, (tokens.expires_in / 86400));
            this.storage.persistent.create("refresh_token", tokens.refresh_token, 365);
        };
        Auth.prototype.getUserInfo = function () {
            var _this = this;
            var q = this.$q.defer();
            this.ippApi.getSelfInfo().then(function (res) {
                if (!angular.equals(_this._user, res.data)) {
                    _this._user = res.data;
                    _this.emit(_this.EVENT_USER_UPDATED);
                }
                q.resolve();
            }, q.reject);
            return q.promise;
        };
        Auth.prototype.startPollingSelf = function () {
            var _this = this;
            this.$timeout.cancel(this._selfTimer);
            this._selfTimer = this.$timeout(function () {
                _this.getUserInfo()
                    .then(angular.noop, angular.noop)
                    .finally(function () {
                    _this.startPollingSelf();
                });
            }, this._selfTimeout);
        };
        Auth.$inject = ["$q", "$timeout", "ippApiService", "ippStorageService", "ippConfig"];
        return Auth;
    }(EventEmitter));
    ipushpull.module.service("ippAuthService", Auth);
})(ipushpull || (ipushpull = {}));

var ipushpull;
(function (ipushpull) {
    "use strict";
    var Crypto = (function () {
        function Crypto() {
        }
        Crypto._instance = function () {
            return new Crypto();
        };
        Crypto.prototype.decryptContent = function (key, data) {
            if (!this.libCheck()) {
                return;
            }
            if (!data)
                return undefined;
            var rawData = forge.util.decode64(data);
            var iv = rawData.substring(0, 16);
            var cleanData = rawData.substring(16);
            cleanData = forge.util.createBuffer(cleanData, "latin1");
            iv = forge.util.createBuffer(iv, "latin1");
            var decipher = forge.cipher.createDecipher("AES-CBC", this.hashPassphrase(key.passphrase));
            decipher.start({ iv: iv });
            decipher.update(cleanData);
            var pass = decipher.finish();
            var decrypted;
            try {
                decrypted = JSON.parse(decipher.output.toString());
            }
            catch (e) {
                decrypted = undefined;
            }
            return decrypted;
        };
        Crypto.prototype.encryptContent = function (key, data) {
            if (!this.libCheck()) {
                return;
            }
            var readyData = JSON.stringify(data);
            var hash = this.hashPassphrase(key.passphrase);
            var iv = forge.random.getBytesSync(16);
            var cipher = forge.cipher.createCipher("AES-CBC", hash);
            cipher.start({ iv: iv });
            cipher.update(forge.util.createBuffer(readyData, "utf8"));
            cipher.finish();
            var encrypted = cipher.output;
            var buffer = forge.util.createBuffer();
            buffer.putBytes(iv);
            buffer.putBytes(encrypted.bytes());
            var output = buffer.getBytes();
            return forge.util.encode64(output);
        };
        Crypto.prototype.hashPassphrase = function (passphrase) {
            var md = forge.md.sha256.create();
            md.update(passphrase);
            return md.digest().bytes();
        };
        Crypto.prototype.libCheck = function () {
            if (typeof forge === "undefined") {
                console.error("[iPushPull]", "If you want to use encryption make sure you include forge library in your header or use ng-ipushpull-standalone.min.js");
            }
            return typeof forge !== "undefined";
        };
        return Crypto;
    }());
    ipushpull.module.factory("ippCryptoService", Crypto._instance);
})(ipushpull || (ipushpull = {}));

var ipushpull;
(function (ipushpull) {
    "use strict";
})(ipushpull || (ipushpull = {}));
var ipushpull;
(function (ipushpull) {
    "use strict";
    var PageContent = (function () {
        function PageContent(rawContent) {
            if (rawContent === void 0) { rawContent = [[]]; }
            this.canDoDelta = true;
            this._original = [];
            this._current = [];
            this._newRows = [];
            this._newCols = [];
            this.update(rawContent);
        }
        Object.defineProperty(PageContent.prototype, "current", {
            get: function () { return this._current; },
            enumerable: true,
            configurable: true
        });
        PageContent.prototype.update = function (rawContent) {
            this._original = rawContent;
            var current = ipushpull.Utils.clonePageContent(this._current);
            for (var i = 0; i < current.length; i++) {
                if (rawContent[i] && (current[i].length > rawContent[i].length)) {
                    current[i].splice(-(current[i].length - rawContent[i].length));
                }
                if (!rawContent[i]) {
                    current.splice(i, current.length - i);
                    break;
                }
            }
            for (var i = 0; i < rawContent.length; i++) {
                if (!current[i]) {
                    current.push(rawContent[i]);
                    continue;
                }
                for (var j = 0; j < rawContent[i].length; j++) {
                    if (!current[i][j]) {
                        current[i].push(rawContent[i][j]);
                        continue;
                    }
                    if (current[i][j].dirty) {
                        continue;
                    }
                    current[i][j] = rawContent[i][j];
                }
            }
            this._current = PageStyles.decompressStyles(current);
            if (!this._current.length) {
                this.addRow(0);
            }
            if (!this._current[0].length) {
                this.addColumn(0);
            }
        };
        PageContent.prototype.getCell = function (rowIndex, columnIndex) {
            if (!this._current[rowIndex]) {
                throw new Error("row out of bounds");
            }
            if (!this._current[rowIndex][columnIndex]) {
                throw new Error("column out of bounds");
            }
            return this._current[rowIndex][columnIndex];
        };
        PageContent.prototype.updateCell = function (rowIndex, columnIndex, data) {
            if (!this._current[rowIndex]) {
                throw new Error("row out of bounds");
            }
            if (!this._current[rowIndex][columnIndex]) {
                throw new Error("column out of bounds");
            }
            if (this._original[rowIndex] && this._original[rowIndex][columnIndex]) {
                data.dirty = (this._original[rowIndex][columnIndex].formatted_value !== data.formatted_value);
            }
            else {
                data.dirty = true;
            }
            angular.merge(this._current[rowIndex][columnIndex], data);
        };
        PageContent.prototype.addRow = function (index) {
            if (!index) {
                index = this._current.length;
            }
            var newRowData = [];
            if (this._current.length) {
                newRowData = angular.copy(this._current[index - 1]);
                for (var i = 0; i < newRowData.length; i++) {
                    newRowData[i].value = "";
                    newRowData[i].formatted_value = "";
                    newRowData[i].style = (newRowData[i].style) ? newRowData[i].style : {};
                    newRowData[i].dirty = true;
                }
            }
            else {
                newRowData.push({
                    value: "",
                });
            }
            this._current.splice(index, 0, newRowData);
            for (var i = 0; i < this._newRows.length; i++) {
                if (this._newRows[i] >= (index)) {
                    this._newRows[i]++;
                }
            }
            this._newRows.push(index);
            return newRowData;
        };
        PageContent.prototype.addColumn = function (index) {
            if (!index) {
                index = (this._current.length) ? this._current[0].length : 0;
            }
            if (this._current.length) {
                for (var i = 0; i < this._current.length; i++) {
                    var data = {
                        value: "",
                        formatted_value: "",
                        style: (index) ? angular.copy(this._current[i][index - 1].style) : {},
                    };
                    this._current[i].splice(index, 0, data);
                }
            }
            else {
                var data = [[{ value: "", formatted_value: "", style: {} }]];
                this._current.push(data);
            }
            for (var i = 0; i < this._newCols.length; i++) {
                if (this._newCols[i] >= index) {
                    this._newCols[i]++;
                }
            }
            this._newCols.push(index);
        };
        PageContent.prototype.removeRow = function () {
            this.canDoDelta = false;
        };
        PageContent.prototype.removeColumn = function () {
            this.canDoDelta = false;
        };
        PageContent.prototype.getDelta = function () {
            var current = PageStyles.compressStyles(ipushpull.Utils.clonePageContent(this._current));
            var deltaStructure = {
                new_rows: [],
                new_cols: [],
                content_delta: [
                    {
                        row_index: 0,
                        cols: [
                            {
                                col_index: 0,
                                cell_content: {
                                    value: "",
                                },
                            },
                        ],
                    },
                ],
            };
            deltaStructure.content_delta = [];
            deltaStructure.new_rows = this._newRows;
            deltaStructure.new_cols = this._newCols;
            var rowMovedBy = 0;
            var colMovedBy = 0;
            for (var i = 0; i < current.length; i++) {
                var rowData = {};
                var newRow = (this._newRows.indexOf(i) >= 0);
                colMovedBy = 0;
                if (newRow) {
                    rowData = {
                        row_index: i,
                        cols: [],
                    };
                    rowMovedBy++;
                }
                for (var j = 0; j < current[i].length; j++) {
                    if (newRow) {
                        var cell = angular.copy(current[i][j]);
                        delete cell.dirty;
                        rowData.cols.push({
                            col_index: j,
                            cell_content: cell,
                        });
                    }
                    else {
                        var newCol = (this._newCols.indexOf(j) >= 0);
                        if (newCol) {
                            colMovedBy++;
                        }
                        if (newCol || current[i][j].dirty) {
                            if (!Object.keys(rowData).length) {
                                rowData = {
                                    row_index: i,
                                    cols: [],
                                };
                            }
                            var cell = angular.copy(current[i][j]);
                            delete cell.dirty;
                            rowData.cols.push({
                                col_index: j,
                                cell_content: cell,
                            });
                        }
                    }
                }
                if (Object.keys(rowData).length) {
                    deltaStructure.content_delta.push(rowData);
                }
            }
            return deltaStructure;
        };
        PageContent.prototype.getFull = function () {
            var content = ipushpull.Utils.clonePageContent(this._current);
            for (var i = 0; i < content.length; i++) {
                for (var j = 0; j < content[i].length; j++) {
                    delete content[i][j].dirty;
                }
            }
            return PageStyles.compressStyles(content);
        };
        PageContent.prototype.cleanDirty = function () {
            for (var i = 0; i < this._current.length; i++) {
                for (var j = 0; j < this._current[i].length; j++) {
                    delete this._current[i][j].dirty;
                }
            }
        };
        return PageContent;
    }());
    ipushpull.PageContent = PageContent;
    var PageStyles = (function () {
        function PageStyles() {
            this.currentStyle = {};
            this.currentBorders = { top: {}, right: {}, bottom: {}, left: {} };
            this.excelStyles = {
                "text-wrap": "white-space",
                "tbs": "border-top-style",
                "rbs": "border-right-style",
                "bbs": "border-bottom-style",
                "lbs": "border-left-style",
                "tbc": "border-top-color",
                "rbc": "border-right-color",
                "bbc": "border-bottom-color",
                "lbc": "border-left-color",
                "tbw": "border-top-width",
                "rbw": "border-right-width",
                "bbw": "border-bottom-width",
                "lbw": "border-left-width",
            };
            this.excelBorderStyles = {
                "solid": "solid",
                "thin": "solid",
                "thick": "solid",
                "hair": "solid",
                "dash": "dashed",
                "dashed": "dashed",
                "dashdot": "dashed",
                "mediumdashed": "dashed",
                "mediumdashdot": "dashed",
                "slantdashdot": "dashed",
                "dot": "dotted",
                "dotted": "dotted",
                "hairline": "dotted",
                "mediumdashdotdot": "dotted",
                "dashdotdot": "dotted",
                "double": "double",
            };
            this.excelBorderWeights = {
                "thin": "1px",
                "medium": "1px",
                "thick": "2px",
                "hair": "1px",
                "hairline": "1px",
                "double": "3px",
            };
            this.ignoreStyles = [
                "number-format",
            ];
        }
        PageStyles.decompressStyles = function (content) {
            var styler = new PageStyles();
            for (var i = 0; i < content.length; i++) {
                for (var j = 0; j < content[i].length; j++) {
                    content[i][j].style = styler.makeStyle(content[i][j].style);
                }
            }
            return content;
        };
        PageStyles.compressStyles = function (content) {
            var styler = new PageStyles();
            for (var i = 0; i < content.length; i++) {
                for (var j = 0; j < content[i].length; j++) {
                    content[i][j].style = styler.reverseCellStyle(content[i][j].style);
                }
            }
            return styler.cleanUpReversed(content);
        };
        PageStyles.prototype.reset = function () {
            this.currentStyle = {};
            this.currentBorders = { top: {}, right: {}, bottom: {}, left: {} };
        };
        PageStyles.prototype.makeStyle = function (cellStyle) {
            var styleName, style = angular.copy(cellStyle);
            for (var item in style) {
                if (!style.hasOwnProperty(item)) {
                    continue;
                }
                if (this.ignoreStyles.indexOf(item) >= 0) {
                    continue;
                }
                styleName = this.excelToCSS(item);
                var prefix = "", suffix = "";
                if ((styleName === "color" || styleName === "background-color") && style[item] !== "none" && style[item].indexOf("#") < 0) {
                    prefix = "#";
                }
                if (styleName === "white-space") {
                    style[item] = (style[item] === "normal") ? "pre" : "pre-wrap";
                }
                if (styleName.indexOf("border") >= 0) {
                    var pos = styleName.split("-")[1];
                    if (styleName.indexOf("-style") >= 0) {
                        this.currentBorders[pos].style = this.excelBorderStyles[style[item]] || undefined;
                    }
                    if (styleName.indexOf("-width") >= 0) {
                        this.currentBorders[pos].width = (style[item] !== "none") ? this.excelBorderWeights[style[item]] : undefined;
                    }
                    if (styleName.indexOf("-color") >= 0) {
                        this.currentBorders[pos].color = (style[item] === "none") ? "transparent" : "#" + style[item];
                    }
                    continue;
                }
                this.currentStyle[styleName] = prefix + style[item] + suffix;
            }
            var resultStyles = angular.copy(this.currentStyle);
            for (var borderPos in this.currentBorders) {
                if (typeof this.currentBorders[borderPos].style === "undefined" || !this.currentBorders[borderPos].style) {
                    continue;
                }
                resultStyles["border-" + borderPos] = this.currentBorders[borderPos].width + " " + this.currentBorders[borderPos].style + " " + this.currentBorders[borderPos].color;
            }
            return resultStyles;
        };
        PageStyles.prototype.reverseCellStyle = function (cellStyle, fullStyles) {
            if (fullStyles === void 0) { fullStyles = true; }
            var genericStyle = {};
            for (var style in cellStyle) {
                if (!cellStyle.hasOwnProperty(style)) {
                    continue;
                }
                if (style.indexOf("border") < 0) {
                    if (style === "color" || style === "background-color") {
                        cellStyle[style] = cellStyle[style].replace("#", "");
                    }
                    if (style === "font-family") {
                        cellStyle[style] = cellStyle[style].split(",")[0];
                    }
                    genericStyle[this.CSSToExcel(style)] = cellStyle[style].trim();
                }
                else {
                    var pos = style.split("-")[1].charAt(0);
                    var parts = cellStyle[style].split(" ");
                    genericStyle[pos + "bw"] = this.excelBorderWeight(parts[0]);
                    genericStyle[pos + "bs"] = parts[1];
                    genericStyle[pos + "bc"] = parts[2].replace("#", "");
                }
            }
            if (fullStyles) {
                for (var eStyle in this.excelStyles) {
                    if (!this.excelStyles.hasOwnProperty(eStyle)) {
                        continue;
                    }
                    if (eStyle === "text-wrap") {
                        continue;
                    }
                    if (!genericStyle[eStyle]) {
                        genericStyle[eStyle] = "none";
                    }
                }
            }
            return genericStyle;
        };
        PageStyles.prototype.cleanUpReversed = function (content) {
            var styleCurrent = {};
            for (var i = 0; i < content.length; i++) {
                for (var j = 0; j < content[i].length; j++) {
                    var styleCopy = angular.copy(content[i][j].style);
                    for (var styleName in styleCopy) {
                        if (!styleCopy.hasOwnProperty(styleName)) {
                            continue;
                        }
                        if (styleCurrent[styleName] && (styleCurrent[styleName] === styleCopy[styleName])) {
                            delete content[i][j].style[styleName];
                        }
                        else {
                            styleCurrent[styleName] = styleCopy[styleName];
                        }
                    }
                    if (!Object.keys(content[i][j].style).length) {
                        delete content[i][j].style;
                    }
                }
            }
            return content;
        };
        PageStyles.prototype.excelToCSS = function (val) {
            return (this.excelStyles[val]) ? this.excelStyles[val] : val;
        };
        PageStyles.prototype.CSSToExcel = function (val) {
            var excelVal = val;
            for (var style in this.excelStyles) {
                if (this.excelStyles[style] === val) {
                    excelVal = style;
                    break;
                }
            }
            return excelVal;
        };
        PageStyles.prototype.excelBorderWeight = function (pixels) {
            var bWeight = "";
            for (var weight in this.excelBorderWeights) {
                if (!this.excelBorderWeights.hasOwnProperty(weight)) {
                    continue;
                }
                if (this.excelBorderWeights[weight] === pixels) {
                    bWeight = weight;
                    break;
                }
            }
            return bWeight;
        };
        PageStyles.prototype.rgbToHex = function (rgb) {
            rgb = rgb.replace("rgb(", "").replace(")", "");
            var parts = rgb.split(",");
            return this.componentToHex(parseInt(parts[0], 10)) + this.componentToHex(parseInt(parts[1], 10)) + this.componentToHex(parseInt(parts[2], 10));
        };
        PageStyles.prototype.componentToHex = function (c) {
            var hex = c.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };
        return PageStyles;
    }());
})(ipushpull || (ipushpull = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ipushpull;
(function (ipushpull) {
    "use strict";
})(ipushpull || (ipushpull = {}));
var ipushpull;
(function (ipushpull) {
    "use strict";
    var $q, $timeout, $interval, api, auth, storage, crypto, config;
    var PageWrap = (function () {
        function PageWrap(q, timeout, interval, ippApi, ippAuth, ippStorage, ippCrypto, ippConf) {
            $q = q;
            $timeout = timeout;
            $interval = interval;
            api = ippApi;
            auth = ippAuth;
            storage = ippStorage;
            crypto = ippCrypto;
            config = ippConf;
            return Page;
        }
        PageWrap.$inject = ["$q", "$timeout", "$interval", "ippApiService", "ippAuthService", "ippStorageService", "ippCryptoService", "ippConfig"];
        return PageWrap;
    }());
    ipushpull.module.service("ippPageService", PageWrap);
    var Page = (function (_super) {
        __extends(Page, _super);
        function Page(pageId, folderId) {
            var _this = this;
            _super.call(this);
            this.ready = false;
            this.decrypted = true;
            this.updatesOn = true;
            this._supportsWS = true;
            this._encryptionKeyPull = {
                name: "",
                passphrase: "",
            };
            this._encryptionKeyPush = {
                name: "",
                passphrase: "",
            };
            this.types = {
                regular: this.TYPE_REGULAR,
                pageAccessReport: this.TYPE_PAGE_ACCESS_REPORT,
                domainUsageReport: this.TYPE_DOMAIN_USAGE_REPORT,
                globalUsageReport: this.TYPE_GLOBAL_USAGE_REPORT,
                pageUpdateReport: this.TYPE_PAGE_UPDATE_REPORT,
                alert: this.TYPE_ALERT,
                pdf: this.TYPE_PDF,
                liveUsage: this.TYPE_LIVE_USAGE_REPORT,
            };
            this._supportsWS = "WebSocket" in window || "MozWebSocket" in window;
            this._folderId = (!isNaN(+folderId)) ? folderId : undefined;
            this._pageId = (!isNaN(+pageId)) ? pageId : undefined;
            this._folderName = (isNaN(+folderId)) ? folderId : undefined;
            this._pageName = (isNaN(+pageId)) ? pageId : undefined;
            if (!this._pageId) {
                this.updatesOn = false;
            }
            if (!this._pageId) {
                this.getPageId(this._folderName, this._pageName).then(function (res) {
                    _this._pageId = res.pageId;
                    _this._folderId = res.folderId;
                    _this.init();
                }, function (err) {
                });
            }
            else {
                this.init();
            }
        }
        Object.defineProperty(Page.prototype, "TYPE_REGULAR", {
            get: function () { return 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "TYPE_ALERT", {
            get: function () { return 5; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "TYPE_PDF", {
            get: function () { return 6; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "TYPE_PAGE_ACCESS_REPORT", {
            get: function () { return 1001; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "TYPE_DOMAIN_USAGE_REPORT", {
            get: function () { return 1002; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "TYPE_GLOBAL_USAGE_REPORT", {
            get: function () { return 1003; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "TYPE_PAGE_UPDATE_REPORT", {
            get: function () { return 1004; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "TYPE_LIVE_USAGE_REPORT", {
            get: function () { return 1007; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "EVENT_READY", {
            get: function () { return "ready"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "EVENT_DECRYPTED", {
            get: function () { return "decrypted"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "EVENT_NEW_CONTENT", {
            get: function () { return "new_content"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "EVENT_NEW_META", {
            get: function () { return "new_meta"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "EVENT_ACCESS_UPDATED", {
            get: function () { return "access_updated"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "EVENT_ERROR", {
            get: function () { return "error"; },
            enumerable: true,
            configurable: true
        });
        Page.create = function (folderId, name, type, template) {
            if (type === void 0) { type = 0; }
            var q = $q.defer();
            if (template) {
                var page_1 = new Page(template.id, template.domain_id);
                page_1.on(page_1.EVENT_READY, function () {
                    page_1.clone(folderId, name)
                        .then(q.resolve, q.reject)
                        .finally(function () {
                        page_1.destroy();
                    });
                });
            }
            else {
                api.createPage({
                    domainId: folderId,
                    data: {
                        name: name,
                        special_page_type: type,
                    },
                }).then(function (res) {
                    var page = new Page(res.data.id, folderId);
                    page.on(page.EVENT_READY, function () {
                        page.stop();
                        q.resolve(page);
                    });
                }, function (err) {
                    q.reject(err);
                });
            }
            return q.promise;
        };
        ;
        Object.defineProperty(Page.prototype, "encryptionKeyPull", {
            set: function (key) { this._encryptionKeyPull = key; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "encryptionKeyPush", {
            set: function (key) { this._encryptionKeyPush = key; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "data", {
            get: function () { return this._data; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "access", {
            get: function () { return this._access; },
            enumerable: true,
            configurable: true
        });
        Page.prototype.start = function () {
            if (!this.updatesOn) {
                this._provider.start();
                this.updatesOn = true;
            }
        };
        Page.prototype.stop = function () {
            if (this.updatesOn) {
                this._provider.stop();
                this.updatesOn = false;
            }
        };
        Page.prototype.push = function (forceFull) {
            var _this = this;
            if (forceFull === void 0) { forceFull = false; }
            var q = $q.defer();
            var onSuccess = function (data) {
                _this.Content.cleanDirty();
                _this._data.seq_no++;
                q.resolve(data);
            };
            if (!this._data.encryption_type_to_use && !this._data.encryption_type_used && this.Content.canDoDelta && !forceFull) {
                this.pushDelta(this.Content.getDelta()).then(onSuccess, q.reject);
            }
            else {
                this.pushFull(this.Content.getFull()).then(onSuccess, q.reject);
            }
            return q.promise;
        };
        Page.prototype.saveMeta = function (data) {
            var _this = this;
            var q = $q.defer();
            delete data.access_rights;
            if (data.encryption_type_to_use === 0) {
                data.encryption_key_to_use = "";
            }
            api.savePageSettings({
                domainId: this._folderId,
                pageId: this._pageId,
                data: data,
            }).then(function (res) {
                _this._data = angular.extend({}, _this._data, res.data);
                q.resolve(res);
            }, function (err) {
                q.reject(ipushpull.Utils.parseApiError(err, "Could not save page settings"));
            });
            return q.promise;
        };
        Page.prototype.setAsFoldersDefault = function () {
            var _this = this;
            var q = $q.defer();
            var requestData = {
                domainId: this._folderId,
                data: {
                    default_page_id: this._pageId,
                },
            };
            api.setDomainDefault(requestData).then(function (res) {
                _this._access.is_users_default_page = true;
                q.resolve(res);
            }, q.reject);
            return q.promise;
        };
        Page.prototype.del = function () {
            var requestData = {
                domainId: this._folderId,
                pageId: this._pageId,
            };
            return api.deletePage(requestData);
        };
        Page.prototype.decrypt = function (key) {
            if (!key) {
                key = this._encryptionKeyPull;
            }
            if (this._data.encryption_type_used && !key.passphrase) {
                this.decrypted = false;
                return;
            }
            if (this._data.encryption_type_used) {
                var decrypted = crypto.decryptContent({
                    name: key.name,
                    passphrase: key.passphrase,
                }, this._data.encrypted_content);
                if (decrypted) {
                    this.decrypted = true;
                    this._data.content = decrypted;
                    this._encryptionKeyPull = key;
                }
                else {
                    this.decrypted = false;
                    this.emit(this.EVENT_ERROR, new Error("Could not decrypt page with key \"" + key.name + "\" and passphrase \"" + key.passphrase + "\""));
                }
            }
            else {
                this.decrypted = true;
            }
            if (this.decrypted) {
                if (this.Content) {
                    this.Content.update(this._data.content);
                }
                else {
                    this.Content = new ipushpull.PageContent(this._data.content);
                }
                this.emit(this.EVENT_DECRYPTED);
            }
        };
        Page.prototype.destroy = function () {
            this._provider.destroy();
            $interval.cancel(this._accessInterval);
            this.removeEvent();
        };
        Page.prototype.clone = function (folderId, name, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            var q = $q.defer();
            if (!this.ready) {
                q.reject("Page is not ready");
                return q.promise;
            }
            if (options.clone_ranges && this._folderId !== folderId) {
                options.clone_ranges = false;
            }
            Page.create(folderId, name, this._data.special_page_type).then(function (newPage) {
                newPage.Content = _this.Content;
                $q.all([
                    newPage.push(true),
                ]).then(function (res) {
                    q.resolve(newPage);
                }, q.reject);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        };
        Page.prototype.init = function () {
            var _this = this;
            this.Ranges = new Ranges(this._folderId, this._pageId);
            if (!this._supportsWS || typeof io === "undefined") {
                console.warn("[iPushPull] Cannot use websocket technology it is not supported or websocket library is not included. " +
                    "Make sure socket-io client is incldued or use ng-ipushpull-standalone.min.js");
            }
            this._provider = (!this._supportsWS || typeof io === "undefined" || config.transport === "polling")
                ? new ProviderREST(this._pageId, this._folderId)
                : new ProviderSocket(this._pageId, this._folderId);
            this.getPageAccess();
            this._accessInterval = $interval(function () {
                _this.getPageAccess();
            }, 30000);
            this.registerListeners();
        };
        Page.prototype.getPageId = function (folderName, pageName) {
            var q = $q.defer();
            api.getPageByName({ domainId: folderName, pageId: pageName }).then(function (res) {
                q.resolve({ pageId: res.data.id, folderId: res.data.domain_id });
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        };
        Page.prototype.getPageAccess = function () {
            var _this = this;
            var q = $q.defer();
            api.getPageAccess({
                domainId: this._folderId,
                pageId: this._pageId,
            }).then(function (res) {
                _this._access = res.data;
                _this._accessLoaded = true;
                _this.checkReady();
                _this.emit(_this.EVENT_ACCESS_UPDATED);
                q.resolve();
            }, function (err) {
                q.reject();
            });
            return q.promise;
        };
        Page.prototype.registerListeners = function () {
            var _this = this;
            this._provider.on("content_update", function (data) {
                data.special_page_type = _this.updatePageType(data.special_page_type);
                _this._data = angular.extend({}, _this._data, data);
                _this.decrypt();
                _this._contentLoaded = true;
                _this.checkReady();
                _this.emit(_this.EVENT_NEW_CONTENT, _this._data);
            });
            this._provider.on("meta_update", function (data) {
                data.special_page_type = _this.updatePageType(data.special_page_type);
                delete data.content;
                delete data.encrypted_content;
                _this._data = angular.extend({}, _this._data, data);
                _this.Ranges.parse(data.access_rights || "[]");
                _this._metaLoaded = true;
                _this.checkReady();
                _this.emit(_this.EVENT_NEW_META, data);
            });
            this._provider.on("error", function (err) {
                err.code = err.httpCode || err.code;
                err.message = err.httpText || err.message;
                _this.emit(_this.EVENT_ERROR, err);
                if (err.code === 404) {
                    _this.destroy();
                }
            });
        };
        Page.prototype.pushFull = function (content) {
            var _this = this;
            var q = $q.defer();
            if (this._data.encryption_type_to_use) {
                if (!this._encryptionKeyPush || this._data.encryption_key_to_use !== this._encryptionKeyPush.name) {
                    q.reject("None or wrong encryption key");
                    return q.promise;
                }
                var encrypted = this.encrypt(this._encryptionKeyPush, content);
                if (encrypted) {
                    this._data.encrypted_content = encrypted;
                    this._data.encryption_type_used = 1;
                    this._data.encryption_key_used = this._encryptionKeyPush.name;
                    this._encryptionKeyPull = angular.copy(this._encryptionKeyPush);
                }
                else {
                    q.reject("Encryption failed");
                    return q.promise;
                }
            }
            else {
                this._data.encryption_key_used = "";
                this._data.encryption_type_used = 0;
                this._data.content = content;
            }
            var data = {
                content: (!this._data.encryption_type_used) ? this._data.content : "",
                encrypted_content: this._data.encrypted_content,
                encryption_type_used: this._data.encryption_type_used,
                encryption_key_used: this._data.encryption_key_used,
            };
            var requestData = {
                domainId: this._folderId,
                pageId: this._pageId,
                data: data,
            };
            api.savePageContent(requestData).then(function (res) {
                _this._data.seq_no = res.data.seq_no;
                q.resolve(res);
            }, q.reject);
            return q.promise;
        };
        Page.prototype.pushDelta = function (data) {
            var q = $q.defer();
            var requestData = {
                domainId: this._folderId,
                pageId: this._pageId,
                data: data,
            };
            api.savePageContentDelta(requestData).then(q.resolve, q.reject);
            return q.promise;
        };
        Page.prototype.checkReady = function () {
            if (this._contentLoaded && this._metaLoaded && this._accessLoaded && !this.ready) {
                this.ready = true;
                this.emit(this.EVENT_READY);
            }
        };
        Page.prototype.updatePageType = function (pageType) {
            if (pageType > 0 && pageType < 5 || pageType === 7) {
                pageType += 1000;
            }
            return pageType;
        };
        Page.prototype.encrypt = function (key, content) {
            return crypto.encryptContent(key, content);
        };
        return Page;
    }(EventEmitter));
    var PermissionRange = (function () {
        function PermissionRange(name, rowStart, rowEnd, colStart, colEnd, permissions) {
            if (rowStart === void 0) { rowStart = 0; }
            if (rowEnd === void 0) { rowEnd = 0; }
            if (colStart === void 0) { colStart = 0; }
            if (colEnd === void 0) { colEnd = 0; }
            this.name = name;
            this.rowStart = rowStart;
            this.rowEnd = rowEnd;
            this.colStart = colStart;
            this.colEnd = colEnd;
            this._permissions = {
                ro: [],
                no: [],
            };
            if (permissions) {
                this._permissions = permissions;
            }
        }
        PermissionRange.prototype.setPermission = function (userId, permission) {
            if (this._permissions.ro.indexOf(userId) >= 0) {
                this._permissions.ro.splice(this._permissions.ro.indexOf(userId), 1);
            }
            if (this._permissions.no.indexOf(userId) >= 0) {
                this._permissions.no.splice(this._permissions.no.indexOf(userId), 1);
            }
            if (permission) {
                this._permissions[permission].push(userId);
            }
        };
        PermissionRange.prototype.getPermission = function (userId) {
            var permission = "";
            if (this._permissions.ro.indexOf(userId) >= 0) {
                permission = "ro";
            }
            else if (this._permissions.no.indexOf(userId) >= 0) {
                permission = "no";
            }
            return permission;
        };
        PermissionRange.prototype.toObject = function () {
            return {
                name: this.name,
                start: this.rowStart + ":" + this.colStart,
                end: this.rowEnd + ":" + this.colEnd,
                rights: this._permissions,
                freeze: false,
            };
        };
        return PermissionRange;
    }());
    ipushpull.PermissionRange = PermissionRange;
    var FreezingRange = (function () {
        function FreezingRange(name, subject, count) {
            if (subject === void 0) { subject = "rows"; }
            if (count === void 0) { count = 1; }
            this.name = name;
            this.subject = subject;
            this.count = count;
        }
        Object.defineProperty(FreezingRange, "SUBJECT_ROWS", {
            get: function () { return "rows"; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(FreezingRange, "SUBJECT_COLUMNS", {
            get: function () { return "cols"; },
            enumerable: true,
            configurable: true
        });
        ;
        FreezingRange.prototype.toObject = function () {
            var range = {
                name: this.name,
                start: "0:0",
                end: "",
                rights: { ro: [], no: [] },
                freeze: true,
            };
            if (this.subject === FreezingRange.SUBJECT_ROWS) {
                range.end = (this.count - 1) + ":-1";
            }
            else {
                range.end = "-1:" + (this.count - 1);
            }
            return range;
        };
        return FreezingRange;
    }());
    ipushpull.FreezingRange = FreezingRange;
    var Ranges = (function () {
        function Ranges(folderId, pageId, pageAccessRights) {
            this._ranges = [];
            this._folderId = folderId;
            this._pageId = pageId;
            if (pageAccessRights) {
                this.parse(pageAccessRights);
            }
        }
        Object.defineProperty(Ranges.prototype, "TYPE_PERMISSION_RANGE", {
            get: function () { return "permissions"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ranges.prototype, "TYPE_FREEZING_RANGE", {
            get: function () { return "freezing"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ranges.prototype, "ranges", {
            get: function () { return this._ranges; },
            enumerable: true,
            configurable: true
        });
        Ranges.prototype.setRanges = function (ranges) {
            this._ranges = ranges;
            return this;
        };
        Ranges.prototype.addRange = function (range) {
            if (range instanceof FreezingRange) {
                for (var i = 0; i < this._ranges.length; i++) {
                    if (this._ranges[i].subject === range.subject) {
                        this.removeRange(this._ranges[i].name);
                        break;
                    }
                }
            }
            var nameUnique = false;
            var newName = range.name;
            var count = 1;
            while (!nameUnique) {
                nameUnique = true;
                for (var i = 0; i < this._ranges.length; i++) {
                    if (this._ranges[i].name === newName) {
                        nameUnique = false;
                        newName = range.name + "_" + count;
                        count++;
                    }
                }
            }
            range.name = newName;
            this._ranges.push(range);
            return this;
        };
        Ranges.prototype.removeRange = function (rangeName) {
            var index = -1;
            for (var i = 0; i < this._ranges.length; i++) {
                if (this._ranges[i].name === rangeName) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                this._ranges.splice(index, 1);
            }
            return this;
        };
        Ranges.prototype.save = function () {
            var ranges = [];
            for (var i = 0; i < this._ranges.length; i++) {
                ranges.push(this._ranges[i].toObject());
            }
            var requestData = {
                domainId: this._folderId,
                pageId: this._pageId,
                data: {
                    access_rights: JSON.stringify(ranges),
                },
            };
            return api.savePageSettings(requestData);
        };
        Ranges.prototype.parse = function (pageAccessRights) {
            var ar = JSON.parse(pageAccessRights);
            this._ranges = [];
            for (var i = 0; i < ar.length; i++) {
                var rowStart = parseInt(ar[i].start.split(":")[0], 10);
                var rowEnd = parseInt(ar[i].end.split(":")[0], 10);
                var colStart = parseInt(ar[i].start.split(":")[1], 10);
                var colEnd = parseInt(ar[i].end.split(":")[1], 10);
                if (ar[i].freeze) {
                    var subject = (colEnd >= 0) ? "cols" : "rows";
                    var count = (colEnd >= 0) ? colEnd + 1 : rowEnd + 1;
                    this._ranges.push(new FreezingRange(ar[i].name, subject, count));
                }
                else {
                    this._ranges.push(new PermissionRange(ar[i].name, rowStart, rowEnd, colStart, colEnd, ar[i].rights));
                }
            }
            return this._ranges;
        };
        return Ranges;
    }());
    var ProviderREST = (function (_super) {
        __extends(ProviderREST, _super);
        function ProviderREST(_pageId, _folderId) {
            _super.call(this);
            this._pageId = _pageId;
            this._folderId = _folderId;
            this._stopped = false;
            this._requestOngoing = false;
            this._timeout = 1000;
            this._seqNo = 0;
            this.start();
        }
        ProviderREST.prototype.start = function () {
            this._stopped = false;
            this.startPolling();
        };
        ProviderREST.prototype.stop = function () {
            this._stopped = true;
            $timeout.cancel(this._timer);
        };
        ProviderREST.prototype.destroy = function () {
            this.stop();
            this.removeEvent();
        };
        ProviderREST.prototype.startPolling = function () {
            var _this = this;
            this.load();
            this._timer = $timeout(function () {
                _this.startPolling();
            }, this._timeout);
        };
        ProviderREST.prototype.load = function (ignoreSeqNo) {
            var _this = this;
            if (ignoreSeqNo === void 0) { ignoreSeqNo = false; }
            var q = $q.defer();
            if (this._requestOngoing || this._stopped) {
                q.reject({});
                return q.promise;
            }
            this._requestOngoing = true;
            api.getPage({
                domainId: this._folderId,
                pageId: this._pageId,
                seq_no: (!ignoreSeqNo) ? this._seqNo : undefined,
            }).then(function (res) {
                if (res.httpCode === 200 || res.httpCode === 204) {
                    if (res.httpCode === 200) {
                        _this._seqNo = res.data.seq_no;
                        _this._timeout = res.data.pull_interval * 1000;
                        _this.emit("content_update", _this.tempGetContentOb(res.data));
                        _this.emit("meta_update", _this.tempGetSettingsOb(res.data));
                    }
                    else {
                        _this.emit("empty_update");
                    }
                    q.resolve(res.data);
                }
                else {
                    _this.emit("error", res.data);
                    q.reject({});
                }
            }, function (err) {
                _this.emit("error", err);
                q.reject(err);
            }).finally(function () {
                _this._requestOngoing = false;
            });
            return q.promise;
        };
        ProviderREST.prototype.tempGetContentOb = function (data) {
            return {
                id: data.id,
                domain_id: data.domain_id,
                seq_no: data.seq_no,
                content_modified_timestamp: data.content_modified_timestamp,
                content: data.content,
                content_modified_by: data.content_modified_by,
                push_interval: data.push_interval,
                pull_interval: data.pull_interval,
                is_public: data.is_public,
                description: data.description,
                encrypted_content: data.encrypted_content,
                encryption_key_used: data.encryption_key_used,
                encryption_type_used: data.encryption_type_used,
                special_page_type: data.special_page_type,
            };
        };
        ProviderREST.prototype.tempGetSettingsOb = function (data) {
            return JSON.parse(JSON.stringify(data));
        };
        return ProviderREST;
    }(EventEmitter));
    var ProviderSocket = (function (_super) {
        __extends(ProviderSocket, _super);
        function ProviderSocket(_pageId, _folderId) {
            var _this = this;
            _super.call(this);
            this._pageId = _pageId;
            this._folderId = _folderId;
            this._stopped = false;
            this.onConnect = function () {
                return;
            };
            this.onDisconnect = function () {
                return;
            };
            this.onPageContent = function (data) {
                $timeout(function () {
                    _this.emit("content_update", data);
                });
            };
            this.onPageSettings = function (data) {
                $timeout(function () {
                    _this.emit("meta_update", data);
                });
            };
            this.onPageError = function (data) {
                $timeout(function () {
                    if (data.code === 401) {
                        auth.emit(auth.EVENT_401);
                    }
                    else {
                        _this.emit("error", data);
                    }
                });
            };
            this.onOAuthError = function (data) {
            };
            this.onAuthRefresh = function () {
                var dummy = _this._pageId;
                _this.start();
            };
            this.supportsWebSockets = function () { return "WebSocket" in window || "MozWebSocket" in window; };
            this.start();
            auth.on(auth.EVENT_LOGIN_REFRESHED, this.onAuthRefresh);
        }
        Object.defineProperty(ProviderSocket, "SOCKET_EVENT_PAGE_ERROR", {
            get: function () { return "page_error"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProviderSocket, "SOCKET_EVENT_PAGE_CONTENT", {
            get: function () { return "page_content"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProviderSocket, "SOCKET_EVENT_PAGE_PUSH", {
            get: function () { return "page_push"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProviderSocket, "SOCKET_EVENT_PAGE_SETTINGS", {
            get: function () { return "page_settings"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProviderSocket, "SOCKET_EVENT_PAGE_DATA", {
            get: function () { return "page_data"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProviderSocket, "SOCKET_EVENT_PAGE_USER_JOINED", {
            get: function () { return "page_user_joined"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProviderSocket, "SOCKET_EVENT_PAGE_USER_LEFT", {
            get: function () { return "page_user_left"; },
            enumerable: true,
            configurable: true
        });
        ProviderSocket.prototype.start = function () {
            if (!this._socket || !this._socket.connected) {
                this.init();
            }
            else {
                this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_CONTENT, this.onPageContent);
            }
        };
        ProviderSocket.prototype.stop = function () {
            this._socket.off(ProviderSocket.SOCKET_EVENT_PAGE_CONTENT, this.onPageContent);
            this._stopped = true;
        };
        ProviderSocket.prototype.destroy = function () {
            this._socket.removeAllListeners();
            this._socket.disconnect();
            this.stop();
            auth.off(auth.EVENT_LOGIN_REFRESHED, this.onAuthRefresh);
            this.removeEvent();
        };
        ProviderSocket.prototype.init = function () {
            this._socket = this.connect();
            this._socket.on("connect", this.onConnect);
            this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_CONTENT, this.onPageContent);
            this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_SETTINGS, this.onPageSettings);
            this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_ERROR, this.onPageError);
            this._socket.on("oauth_error", this.onOAuthError);
            this._socket.on("disconnect", this.onDisconnect);
            this._stopped = false;
        };
        ProviderSocket.prototype.connect = function () {
            var query = [
                ("access_token=" + storage.persistent.get("access_token")),
            ];
            query = query.filter(function (val) {
                return (val.length > 0);
            });
            return io.connect(config.ws_url + "/page/" + this._pageId, {
                query: query.join("&"),
                transports: (this.supportsWebSockets()) ? ["websocket"] : ["polling"],
                forceNew: true,
            });
        };
        return ProviderSocket;
    }(EventEmitter));
})(ipushpull || (ipushpull = {}));

var ipushpull;
(function (ipushpull) {
    "use strict";
    var LocalStorage = (function () {
        function LocalStorage() {
            this.prefix = "ipp";
        }
        LocalStorage.prototype.create = function (key, value) {
            localStorage.setItem(this.makeKey(key), value);
        };
        LocalStorage.prototype.save = function (key, value) {
            return this.create(key, value);
        };
        LocalStorage.prototype.get = function (key, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            var val = localStorage.getItem(this.makeKey(key));
            if (!val) {
                return defaultValue;
            }
            if (this.isValidJSON(val)) {
                return JSON.parse(val);
            }
            else {
                return val;
            }
        };
        LocalStorage.prototype.remove = function (key) {
            localStorage.removeItem(this.makeKey(key));
        };
        LocalStorage.prototype.makeKey = function (key) {
            if (this.prefix && key.indexOf(this.prefix) !== 0) {
                key = this.prefix + "_" + key;
            }
            if (this.suffix) {
                key = key + "_" + this.suffix;
            }
            return key;
        };
        LocalStorage.prototype.isValidJSON = function (val) {
            try {
                var json = JSON.parse(val);
                return true;
            }
            catch (e) {
                return false;
            }
        };
        return LocalStorage;
    }());
    var CookieStorage = (function () {
        function CookieStorage() {
            this.prefix = "ipp";
            this._domain = document.domain.replace(/(www)|(test)|(stable)|(beta)/, "");
        }
        CookieStorage.prototype.create = function (key, value, expireDays) {
            var expires = "";
            if (expireDays) {
                var date = new Date();
                date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = this.makeKey(key) + "=" + value + expires + "; path=/; domain=" + this._domain + (this.isSecure() ? ";secure;" : "");
        };
        CookieStorage.prototype.save = function (key, value, expireDays) {
            this.create(key, value, expireDays);
        };
        CookieStorage.prototype.get = function (key, defaultValue) {
            key = this.makeKey(key);
            var nameEQ = key + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === " ") {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    var val = c.substring(nameEQ.length, c.length);
                    if (this.isValidJSON(val)) {
                        return JSON.parse(val);
                    }
                    else {
                        return val;
                    }
                }
            }
            return;
        };
        CookieStorage.prototype.remove = function (key) {
            this.create(this.makeKey(key), "", -1);
        };
        CookieStorage.prototype.isSecure = function () {
            return window.location.protocol === "https:";
        };
        CookieStorage.prototype.makeKey = function (key) {
            if (this.prefix && key.indexOf(this.prefix) !== 0) {
                key = this.prefix + "_" + key;
            }
            if (this.suffix) {
                key = key + "_" + this.suffix;
            }
            return key;
        };
        CookieStorage.prototype.isValidJSON = function (val) {
            try {
                var json = JSON.parse(val);
                return true;
            }
            catch (e) {
                return false;
            }
        };
        return CookieStorage;
    }());
    var StorageService = (function () {
        function StorageService(ippConfig) {
            var userStorage = new LocalStorage();
            userStorage.suffix = "GUEST";
            var globalStorage = new LocalStorage();
            var persistentStorage = (navigator.cookieEnabled) ? new CookieStorage() : new LocalStorage();
            if (ippConfig.storage_prefix) {
                userStorage.prefix = ippConfig.storage_prefix;
                globalStorage.prefix = ippConfig.storage_prefix;
                persistentStorage.prefix = ippConfig.storage_prefix;
            }
            return {
                user: userStorage,
                global: globalStorage,
                persistent: persistentStorage,
            };
        }
        StorageService.$inject = ["ippConfig"];
        return StorageService;
    }());
    ipushpull.module.factory("ippStorageService", StorageService);
})(ipushpull || (ipushpull = {}));

var ipushpull;
(function (ipushpull) {
    "use strict";
    var UtilsProvider = (function () {
        function UtilsProvider() {
        }
        UtilsProvider.prototype.parseApiError = function (err, def) {
            var msg = def;
            if (err.data) {
                var keys = Object.keys(err.data);
                if (keys.length) {
                    if (angular.isArray(err.data[keys[0]])) {
                        msg = err.data[keys[0]][0];
                    }
                    else if (typeof err.data[keys[0]] === "string") {
                        msg = err.data[keys[0]];
                    }
                    else {
                        msg = def;
                    }
                }
                else {
                    msg = def;
                }
            }
            else {
                msg = def;
            }
            return msg;
        };
        UtilsProvider.prototype.clonePageContent = function (content) {
            var copy = [];
            for (var i = 0; i < content.length; i++) {
                copy.push([]);
                for (var j = 0; j < content[i].length; j++) {
                    var vals = {};
                    for (var k in content[i][j]) {
                        if (!content[i][j].hasOwnProperty(k)) {
                            continue;
                        }
                        vals[k] = content[i][j][k];
                    }
                    copy[i].push(vals);
                }
            }
            return copy;
        };
        return UtilsProvider;
    }());
    ipushpull.Utils = new UtilsProvider();
})(ipushpull || (ipushpull = {}));
