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
    ipushpull.module = angular.module("ipushpull", []);
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
                    _this._locked = true;
                    _this.storage.remove("access_token");
                    var ippAuth = _this.$injector.get("ippAuthService");
                    console.log("Attempting to re-login");
                    ippAuth.authenticate(true).finally(function () {
                        _this._locked = false;
                    });
                    ippAuth.on(ippAuth.EVENT_LOGGED_IN, function () {
                        _this._locked = false;
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
            this._endPoint = this.config.url + "/api/1.0/";
        }
        Api.prototype.parseError = function (err, def) {
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
        Api.prototype.getSelfInfo = function () {
            return this
                .send(Request.get(this._endPoint + "users/self/")
                .cache(false)
                .overrideLock());
        };
        Api.prototype.refreshAccessTokens = function (refreshToken) {
            return this.send(Request.post(this._endPoint + "oauth/token/")
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
            return this.send(Request.post(this._endPoint + "oauth/token/")
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
            return this.send(Request.get(this._endPoint + "domains/"));
        };
        Api.prototype.getDomain = function (domainId) {
            return this.send(Request.get(this._endPoint + "domains/" + domainId + "/"));
        };
        Api.prototype.createFolder = function (data) {
            return this.send(Request.post(this._endPoint + "domains/").data(data.data));
        };
        Api.prototype.updateDomain = function (data) {
            return this.send(Request
                .put(this._endPoint + "domains/" + data.domainId + "/")
                .data(data.data));
        };
        Api.prototype.getDomainPages = function (domainId) {
            return this.send(Request.get(this._endPoint + "domains/" + domainId + "/page_access/"));
        };
        Api.prototype.getDomainsAndPages = function () {
            return this.send(Request.get(this._endPoint + "domain_page_access/"));
        };
        Api.prototype.getPage = function (data) {
            return this.send(Request
                .get(this._endPoint + "domains/id/" + data.domainId + "/page_content/id/" + data.pageId + "/")
                .params({ client_seq_no: data.seq_no }));
        };
        Api.prototype.getPageByName = function (data) {
            return this.send(Request
                .get(this._endPoint + "domains/name/" + data.domainId + "/page_content/name/" + data.pageId + "/")
                .params({ client_seq_no: data.seq_no }));
        };
        Api.prototype.getPageAccess = function (data) {
            return this.send(Request.get(this._endPoint + "domains/id/" + data.domainId + "/page_access/id/" + data.pageId + "/"));
        };
        Api.prototype.createPage = function (data) {
            return this.send(Request
                .post(this._endPoint + "domains/" + data.domainId + "/pages/")
                .data({ name: data.data.name }));
        };
        Api.prototype.savePageContent = function (data) {
            return this.send(Request
                .put(this._endPoint + "domains/id/" + data.domainId + "/page_content/id/" + data.pageId + "/")
                .data(data.data));
        };
        Api.prototype.savePageContentDelta = function (data) {
            return this.send(Request
                .put(this._endPoint + "domains/id/" + data.domainId + "/page_content_delta/id/" + data.pageId + "/")
                .data(data.data));
        };
        Api.prototype.savePageSettings = function (data) {
            return this.send(Request
                .put(this._endPoint + "domains/" + data.domainId + "/pages/" + data.pageId + "/")
                .data(data.data));
        };
        Api.prototype.deletePage = function (data) {
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/pages/" + data.pageId + "/"));
        };
        Api.prototype.saveUserInfo = function (data) {
            return this.send(Request.put(this._endPoint + "users/self/").data(data));
        };
        Api.prototype.changePassword = function (data) {
            return this.send(Request.put(this._endPoint + "credentials/self/").data(data));
        };
        Api.prototype.changeEmail = function (data) {
            return this.send(Request.put(this._endPoint + "credentials/self/").data(data));
        };
        Api.prototype.forgotPassword = function (data) {
            return this.send(Request.post(this._endPoint + "password_reset/").data(data));
        };
        Api.prototype.resetPassword = function (data) {
            return this.send(Request.post(this._endPoint + "password_reset/confirm/").data(data));
        };
        Api.prototype.inviteUsers = function (data) {
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/invitations/").data(data.data));
        };
        Api.prototype.acceptInvitation = function (data) {
            return this.send(Request.post(this._endPoint + "users/invitation/confirm/").data(data));
        };
        Api.prototype.refuseInvitation = function (data) {
            return this.send(Request.del(this._endPoint + "users/invitation/confirm/").data(data));
        };
        Api.prototype.domainInvitations = function (data) {
            return this.send(Request
                .get(this._endPoint + "domains/" + data.domainId + "/invitations/")
                .params({ is_complete: "False" }));
        };
        Api.prototype.userInvitations = function () {
            return this.send(Request
                .get(this._endPoint + "users/self/invitations/")
                .params({ is_complete: "False" }));
        };
        Api.prototype.domainAccessLog = function (data) {
            return this.send(Request
                .get(this._endPoint + "domain_access/" + data.domainId + "/events/")
                .params({ page_size: data.limit }));
        };
        Api.prototype.domainUsers = function (data) {
            return this.send(Request.get(this._endPoint + "domain_access/" + data.domainId + "/users/"));
        };
        Api.prototype.activateUser = function (data) {
            return this.send(Request.post(this._endPoint + "users/signup/confirm/").data(data));
        };
        Api.prototype.setDomainDefault = function (data) {
            return this.send(Request.put(this._endPoint + "domain_access/" + data.domainId + "/users/self/").data(data.data));
        };
        Api.prototype.resendInvite = function (data) {
            return this.send(Request.put(this._endPoint + "domains/" + data.domainId + "/invitations/" + data.inviteId + "/resend/"));
        };
        Api.prototype.updateDomainAccess = function (data) {
            return this.send(Request.put(this._endPoint + "domain_access/" + data.domainId + "/users/").data(data.data));
        };
        Api.prototype.removeUsersFromDomain = function (data) {
            return this.send(Request.del(this._endPoint + "domain_access/" + data.domainId + "/users/").data(data.data));
        };
        Api.prototype.getInvitation = function (data) {
            return this.send(Request.get(this._endPoint + "users/invitations/" + data.token + "/"));
        };
        Api.prototype.cancelInvitations = function (data) {
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/invitations/").data(data.data));
        };
        Api.prototype.getDomainAccessGroups = function (data) {
            return this.send(Request.get(this._endPoint + "domains/" + data.domainId + "/access_groups/"));
        };
        Api.prototype.getDomainAccessGroup = function (data) {
            return this.send(Request.get(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.groupId + "/"));
        };
        Api.prototype.addDomainAccessGroup = function (data) {
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/access_groups/").data(data.data));
        };
        Api.prototype.putDomainAgroupMembers = function (data) {
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.agroupId + "/members/").data(data.data));
        };
        Api.prototype.putDomainAgroupPages = function (data) {
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.agroupId + "/pages/").data(data.data));
        };
        Api.prototype.updateDomainAgroup = function (data) {
            return this.send(Request.put(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.agroupId + "/").data(data.data));
        };
        Api.prototype.deleteDomainAGroup = function (data) {
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.agroupId + "/"));
        };
        Api.prototype.getDomainPageAccess = function (data) {
            return this.send(Request.get(this._endPoint + "domain_page_access/" + data.domainId + "/"));
        };
        Api.prototype.getDomainCustomers = function (data) {
            return this.send(Request.get(this._endPoint + "domains/" + data.domainId + "/customers/"));
        };
        Api.prototype.saveDomainPageAccess = function (data) {
            return this.send(Request.put(this._endPoint + "domain_page_access/" + data.domainId + "/basic/").data(data.data));
        };
        Api.prototype.getTemplates = function (data) {
            return this.send(Request.get(this._endPoint + "templates/"));
        };
        Api.prototype.saveCustomer = function (data) {
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/customers/").data(data.data));
        };
        Api.prototype.updateCustomer = function (data) {
            return this.send(Request.put(this._endPoint + "domains/" + data.domainId + "/customers/" + data.data.id + "/").data(data.data));
        };
        Api.prototype.removeCustomer = function (data) {
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/customers/" + data.customerId + "/"));
        };
        Api.prototype.getDocEmailRules = function (data) {
            return this.send(Request.get(this._endPoint + "domains/" + data.domainId + "/docsnames/"));
        };
        Api.prototype.createDocEmailRule = function (data) {
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/docsnames/").data(data.data));
        };
        Api.prototype.updateDocEmailRule = function (data) {
            return this.send(Request.put(this._endPoint + "domains/" + data.domainId + "/docsnames/" + data.docRuleId + "/").data(data.data));
        };
        Api.prototype.deleteDocEmailRule = function (data) {
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/docsnames/" + data.docRuleId + "/"));
        };
        Api.prototype.send = function (request) {
            var token = this.storage.get("access_token");
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
        Api.$inject = ["$http", "$httpParamSerializerJQLike", "$q", "$injector", "ippGlobalStorageService", "ipushpull_conf"];
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
        function Auth($q, ippApi, storage, config) {
            _super.call(this);
            this.$q = $q;
            this.ippApi = ippApi;
            this.storage = storage;
            this.config = config;
            this._user = {};
            this._authenticated = false;
            this._authInProgress = false;
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
                _this._authenticated = true;
                _this.emit(_this.EVENT_LOGGED_IN);
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
                            err.message = _this.ippApi.parseError(err.data, "Unknown error");
                            break;
                    }
                }
                _this.emit(_this.EVENT_ERROR, err);
                q.reject(err);
            });
            return q.promise;
        };
        Auth.prototype.logout = function () {
            this.storage.remove("access_token");
            this.storage.remove("refresh_token");
            this._authenticated = false;
            this.emit(this.EVENT_LOGGED_OUT);
        };
        Auth.prototype.processAuth = function () {
            var _this = this;
            var q = this.$q.defer();
            var accessToken = this.storage.get("access_token");
            var refreshToken = this.storage.get("refresh_token");
            if (accessToken) {
                return this.getUserInfo();
            }
            else {
                if (refreshToken) {
                    this.refreshTokens().then(function (data) {
                        _this.saveTokens(data.data);
                        _this.getUserInfo().then(q.resolve, q.reject);
                    }, function (err) {
                        _this.storage.remove("refresh_token");
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
            var refreshToken = this.storage.get("refresh_token");
            this.emit(this.EVENT_RE_LOGGING);
            return this.ippApi.refreshAccessTokens(refreshToken);
        };
        Auth.prototype.saveTokens = function (tokens) {
            this.storage.create("access_token", tokens.access_token);
            this.storage.create("refresh_token", tokens.refresh_token);
        };
        Auth.prototype.getUserInfo = function () {
            var _this = this;
            var q = this.$q.defer();
            this.ippApi.getSelfInfo().then(function (res) {
                _this._user = res.data;
                q.resolve();
            }, q.reject);
            return q.promise;
        };
        Auth.$inject = ["$q", "ippApiService", "ippGlobalStorageService", "ipushpull_conf"];
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
            var defaults = {
                url: "https://www.ipushpull.com",
            };
            $q = q;
            $timeout = timeout;
            $interval = interval;
            api = ippApi;
            auth = ippAuth;
            storage = ippStorage;
            crypto = ippCrypto;
            config = angular.merge({}, defaults, ippConf);
            return Page;
        }
        PageWrap.$inject = ["$q", "$timeout", "$interval", "ippApiService", "ippAuthService", "ippGlobalStorageService", "ippCryptoService", "ipushpull_conf"];
        return PageWrap;
    }());
    ipushpull.module.service("ippPageService", PageWrap);
    var Page = (function (_super) {
        __extends(Page, _super);
        function Page(pageId, folderId, autoStart) {
            var _this = this;
            if (autoStart === void 0) { autoStart = true; }
            _super.call(this);
            this.ready = false;
            this.decrypted = true;
            this.updatesOn = false;
            this._supportsWS = true;
            this._encryptionKeyPull = {
                name: "",
                passphrase: "",
            };
            this._encryptionKeyPush = {
                name: "",
                passphrase: "",
            };
            this._supportsWS = "WebSocket" in window || "MozWebSocket" in window;
            this._folderId = (!isNaN(+folderId)) ? folderId : undefined;
            this._pageId = (!isNaN(+pageId)) ? pageId : undefined;
            this._folderName = (isNaN(+folderId)) ? folderId : undefined;
            this._pageName = (isNaN(+pageId)) ? pageId : undefined;
            if (!this._pageId) {
                autoStart = false;
            }
            this.updatesOn = autoStart;
            if (!this._pageId) {
                this.getPageId(this._folderName, this._pageName).then(function (res) {
                    _this._pageId = res.pageId;
                    _this._folderId = res.folderId;
                    _this.init(autoStart);
                }, function (err) {
                });
            }
            else {
                this.init(autoStart);
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
            this._provider.start();
            this.updatesOn = true;
        };
        Page.prototype.stop = function () {
            this._provider.stop();
            this.updatesOn = false;
        };
        Page.prototype.push = function (data, delta) {
            if (delta === void 0) { delta = true; }
            if (delta) {
                return this.pushDelta(data);
            }
            else {
                return this.pushFull(data);
            }
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
                    this.emit(this.EVENT_DECRYPTED);
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
                this._data.content = PageStyles.decompressStyles(this._data.content);
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
            Page.create(this._folderId, name, this._data.special_page_type).then(function (newPage) {
                $q.all([
                    newPage.push(_this._data.content, false),
                ]).then(function (res) {
                    q.resolve(newPage);
                }, q.reject);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        };
        Page.prototype.init = function (autoStart) {
            var _this = this;
            if (autoStart === void 0) { autoStart = true; }
            this.Ranges = new Ranges(this._folderId, this._pageId);
            if (!this._supportsWS || typeof io === "undefined") {
                console.warn("[iPushPull] Cannot use websocket technology it is not supported or websocket library is not included. " +
                    "Make sure socket-io client is incldued or use ng-ipushpull-standalone.min.js");
            }
            this._provider = (!this._supportsWS || typeof io === "undefined" || config.transport === "polling")
                ? new ProviderREST(this._pageId, this._folderId, autoStart)
                : new ProviderSocket(this._pageId, this._folderId, autoStart);
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
                _this._data = angular.merge({}, _this._data, data);
                _this.decrypt();
                _this._contentLoaded = true;
                _this.checkReady();
                _this.emit(_this.EVENT_NEW_CONTENT, _this._data);
            });
            this._provider.on("meta_update", function (data) {
                data.special_page_type = _this.updatePageType(data.special_page_type);
                delete data.content;
                delete data.encrypted_content;
                _this._data = angular.merge({}, _this._data, data);
                _this.Ranges.parse(data.access_rights || "[]");
                _this._metaLoaded = true;
                _this.checkReady();
                _this.emit(_this.EVENT_NEW_META, data);
            });
            this._provider.on("error", function (err) {
                err.code = err.httpCode || err.code;
                err.message = err.httpText || err.message;
                if (err.code === 404) {
                    _this.stop();
                }
                _this.emit(_this.EVENT_ERROR, err.message);
            });
        };
        Page.prototype.pushFull = function (content) {
            var _this = this;
            var q = $q.defer();
            if (this._data.encryption_type_to_use) {
                if (!this._encryptionKeyPull || this._data.encryption_key_to_use !== this._encryptionKeyPush.name) {
                    q.reject("None or wrong encryption key");
                    return q.promise;
                }
                var encrypted = this.encrypt(this._encryptionKeyPush, content);
                if (encrypted) {
                    this._data.encrypted_content = encrypted;
                    this._data.encryption_type_used = 1;
                    this._data.encryption_key_used = this._encryptionKeyPush.name;
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
                content: this._data.content,
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
            if (this._contentLoaded && this._metaLoaded && !this.ready) {
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
        Ranges.prototype.removeRange = function (range) {
            if (this._ranges.indexOf(range) >= 0) {
                this._ranges.splice(this._ranges.indexOf(range), 1);
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
        function ProviderREST(_pageId, _folderId, autoStart) {
            if (autoStart === void 0) { autoStart = true; }
            _super.call(this);
            this._pageId = _pageId;
            this._folderId = _folderId;
            this._stopped = false;
            this._requestOngoing = false;
            this._timeout = 1000;
            this._seqNo = 0;
            if (autoStart) {
                this.start();
            }
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
        function ProviderSocket(_pageId, _folderId, autoStart) {
            var _this = this;
            if (autoStart === void 0) { autoStart = true; }
            _super.call(this);
            this._pageId = _pageId;
            this._folderId = _folderId;
            this._stopped = false;
            this.onConnect = function () {
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
                        auth.authenticate(true).then(function () {
                            _this.start();
                        });
                    }
                    else {
                        _this.emit("error", data);
                    }
                });
            };
            this.onOAuthError = function (data) {
            };
            this.supportsWebSockets = function () { return "WebSocket" in window || "MozWebSocket" in window; };
            if (autoStart) {
                this.start();
            }
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
            this._socket.disconnect();
            this.stop();
            this.removeEvent();
        };
        ProviderSocket.prototype.init = function () {
            this._socket = this.connect();
            this._socket.on("connect", this.onConnect);
            this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_CONTENT, this.onPageContent);
            this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_SETTINGS, this.onPageSettings);
            this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_ERROR, this.onPageError);
            this._socket.on("oauth_error", this.onOAuthError);
            this._socket.on("disconnect", function () {
                return;
            });
            this._stopped = false;
        };
        ProviderSocket.prototype.connect = function () {
            var query = [
                ("access_token=" + storage.get("access_token")),
            ];
            query = query.filter(function (val) {
                return (val.length > 0);
            });
            return io.connect(config.url + "/page/" + this._pageId, {
                query: query.join("&"),
                transports: (this.supportsWebSockets()) ? ["websocket"] : ["polling"],
                forceNew: true,
            });
        };
        return ProviderSocket;
    }(EventEmitter));
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
        PageStyles.prototype.reset = function () {
            this.currentStyle = {};
            this.currentBorders = { top: {}, right: {}, bottom: {}, left: {} };
        };
        PageStyles.prototype.makeStyle = function (cellStyle) {
            var styleName, style = angular.copy(cellStyle);
            for (var item in style) {
                if (this.ignoreStyles.indexOf(item) >= 0) {
                    continue;
                }
                styleName = this.excelToCSS(item);
                var prefix = "", suffix = "";
                if ((styleName === "color" || styleName === "background-color") && style[item] !== "none") {
                    prefix = "#";
                }
                if (styleName === "font-family") {
                    suffix = ", Arial, Helvetica, sans-serif";
                }
                if (styleName === "white-space") {
                    style[item] = (style[item] === "normal") ? "pre" : "pre-wrap";
                }
                if (styleName === "width" || styleName === "height") {
                    suffix = " !important";
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
                resultStyles["border-" + borderPos] = this.currentBorders[borderPos].width + " " + this.currentBorders[borderPos].style + " " + this.currentBorders[borderPos].color + ";";
            }
            return resultStyles;
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
                if (this.excelBorderWeights[weight] === pixels) {
                    bWeight = weight;
                    break;
                }
            }
            return bWeight;
        };
        return PageStyles;
    }());
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
    ipushpull.module.service("ippUserStorageService", ["ippAuthService", "ipushpull_conf", function (ippAuth, config) {
            var storage = new LocalStorage();
            storage.suffix = "GUEST";
            if (config.storage_prefix) {
                storage.prefix = config.storage_prefix;
            }
            ippAuth.on("logged_in", function () {
                storage.suffix = "" + ippAuth.user.id;
            });
            return storage;
        }]);
    ipushpull.module.service("ippGlobalStorageService", ["ipushpull_conf", function (config) {
            var storage = new LocalStorage();
            if (config.storage_prefix) {
                storage.prefix = config.storage_prefix;
            }
            return storage;
        }]);
})(ipushpull || (ipushpull = {}));
