namespace ipushpull {
    "use strict";
    import IDeferred = angular.IDeferred;
    import Socket = SocketIOClient.Socket;

    // Main/public page service
    let $q, $timeout, api, auth, config;

    class PageWrap {
        public static $inject: string[] = ["$q", "$timeout", "ippApi", "ippAuth", "ipushpull_conf"];

        constructor(q, timeout, ippApi, ippAuth, ippConf){
            let defaults: any = {
                api_url: "https://www.ipushpull.dev",
            };

            $q = q;
            $timeout = timeout;
            api = ippApi;
            auth = ippAuth;
            config = angular.merge({}, defaults, ippConf);

            return Page;
        }
    }

    ipushpull.module.service("ippPage", PageWrap);

    // @todo extend event emitter interface
    export interface IIPushPullPageService {
        start: () => void;
        stop: () => void;
        push: () => void;
        destroy: () => void;
    }

    class Page extends EventEmitter implements IIPushPullPageService {
        private _supportsWS: boolean = true; // let's be optimistic by default
        private _provider;

        private _pageId: number;
        private _folderId: number;
        private _pageName: string;
        private _folderName: string;

        constructor(pageId?: string | number, folderId?: string | number, autoStart: boolean = true){
            super();

            // Decide if client can use websockets
            this._supportsWS = "WebSocket" in window || "MozWebSocket" in window;

            // Process page and folder id/name
            this._folderId = (!isNaN(folderId)) ? folderId : undefined;
            this._pageId = (!isNaN(pageId)) ? pageId : undefined;
            this._folderName = (isNaN(folderId)) ? folderId : undefined;
            this._pageName = (isNaN(pageId)) ? pageId : undefined;

            // If we dont have page id, cannot start autopulling
            // @todo Should we emit some error to user?
            if (!this._pageId){
                autoStart = false;
            }

            // @todo If we get folder name and page name, first get page id from REST and then continue with sockets - fiddly, but only way around it at the moment
            if (!this._pageId) {
                this.getPageId(this._folderName, this._pageName).then(
                    (res) => {
                        this._pageId = res.pageId;
                        this._folderId = res.folderId;

                        this.init(autoStart);
                    }, (err) => {
                        // @todo Handle error
                    }
                );
            } else {
                this.init(autoStart);
            }
        }

        public start(): void{
            this._provider.start();
        }

        public stop(): void{
            this._provider.stop();
        }

        public push(): void{
            return;
        }

        public destroy(): void {
            this._provider.destroy();
            this.removeAllListeners();
        }

        private init(autoStart: boolean = true): void{
            // Create provider
            this._provider = (!this._supportsWS || config.transport === "polling")
                ? new ProviderREST(this._pageId, this._folderId, autoStart)
                : new ProviderSocket(this._pageId, this._folderId, autoStart);

            this.registerListeners();
        }

        private getPageId(folderName: string, pageName: string) {
            let q = $q.defer();

            // @todo Need specific/lightweight endpoint - before arguing my way through this, I can use page detail (or write my own)

            api.getPageByName({domainId: folderName, pageId: pageName}).then((res) => {
                q.resolve({pageId: res.data.id, folderId: res.data.domain_id});
            }, (err) => {
                // Convert it into socket error
                q.reject(err);
            });

            return q.promise;
        }

        private registerListeners(){
            // Setup listeners
            this._provider.on("content_update", (data) => {
                this.emit("new_content", data);
            });

            this._provider.on("meta_update", (data) => {
                this.emit("new_meta", data);
            });

            this._provider.on("error", (err) => {
                this.emit("error", err);
            });
        }
    }

    // @todo extend event emitter interface
    interface IPageProvider {
        start: () => void;
        stop: () => void;
        destroy: () => void;
    }

    // Page rest/polling service
    class ProviderREST extends EventEmitter implements IPageProvider {
        private _stopped: boolean = false;
        private _requestOngoing: boolean = false;
        private _timer: any;
        private _timeout: number = 1000;

        private _seqNo: number = 0;

        constructor(private _pageId?: number, private _folderId?: number, autoStart: boolean = true){
            super();

            if (autoStart){
                this.start();
            }
        }

        public start(): void {
            this._stopped = false;
            this.startPolling();
        }

        public stop(): void {
            this._stopped = true;
            clearTimeout(this._timer);
        }

        private startPolling(): void {
            this.load();

            setTimeout(() => {
                this.startPolling();
            }, this._timeout);
        }

        private load(ignoreSeqNo: boolean = false) {
            let q: IDeferred = $q.defer();

            // @todo Returning promise, and rejecting before return? need test
            if (this._requestOngoing || this._stopped){
                // @todo Should we emit something?
                q.reject({});
                return q.promise;
            }

            this._requestOngoing = true;

            api.getPage({
                domainId: this._folderId,
                pageId: this._pageId,
                seq_no: (!ignoreSeqNo) ? this._seqNo : null
            }).then((res) => {
                if (res.httpCode === 200 || res.httpCode === 204) {
                    // New update
                    if (res.httpCode === 200){
                        this._seqNo = res.data.seq_no;
                        this.emit("content_update", res.data.content);
                        this.emit("meta_update"); // @todo Handle this
                    } else {
                        // @todo do we need this?
                        this.emit("empty_update");
                    }

                    q.resolve(page);
                } else {
                    this.emit("error", res.data);
                    q.reject({});
                }
            }, (err) => {
                // @todo do this better...
                if (err.httpCode === 401){
                    auth.refreshTokens().catch(() => {
                        // @todo emit something
                        this.stop();
                    });
                }

                this.emit("error", err.httpText);
                q.reject(err);
            }).finally(() => {
                this._requestOngoing = false;
            });

            return q.promise;
        }
    }

    // ipushpull.page.module.service("ippPageProviderRest", ProviderREST);

    // Page sockets service
    class ProviderSocket extends EventEmitter implements IPageProvider {
        public static get SOCKET_EVENT_PAGE_ERROR(): string { return "page_error"; }
        public static get SOCKET_EVENT_PAGE_CONTENT(): string { return "page_content"; }
        public static get SOCKET_EVENT_PAGE_PUSH(): string { return "page_push"; }
        public static get SOCKET_EVENT_PAGE_SETTINGS(): string { return "page_settings"; }
        public static get SOCKET_EVENT_PAGE_DATA(): string { return "page_data"; }
        public static get SOCKET_EVENT_PAGE_USER_JOINED(): string { return "page_user_joined"; }
        public static get SOCKET_EVENT_PAGE_USER_LEFT(): string { return "page_user_left"; }

        private _stopped: boolean = false;
        private _socket;

        constructor(private _pageId?: number, private _folderId?: number, autoStart: boolean = true){
            super();

            if (autoStart){
                this.start();
            }
        }

        // @todo Will be done better
        public start(): void {
            // Connect to socket
            this._socket = this.connect();

            // Register listeners
            this._socket.on("connect", this.onConnect);
            this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_CONTENT, this.onPageContent);
            this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_SETTINGS, this.onPageSettings);
            this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_ERROR, this.onPageError);
            this._socket.on("oauth_error", this.onOAuthError);
            /*this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_DATA, this.onPageData);
             this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_USER_JOINED, this.onPageUserJoined);
             this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_USER_LEFT, this.onPageUserLeft);*/
            this._socket.on("disconnect", () => {
                return;
            });

            this._stopped = false;
        }

        // @todo Will be done better
        public stop(): void {
            this._socket.disconnect();

            this._stopped = true;
        }

        private connect(): Socket {
            let query: string[] = [
                `access_token=${auth.token}`,
            ];

            query = query.filter((val: string) => {
                return (val.length > 0);
            });

            return io.connect(`${config.api_url}/page/${this._pageId}`, {
                query: query.join("&"),
                forceNew: true,
            });
        }

        private onConnect: any = () => {
            return;
        };

        private onPageContent = (data): void => {
            $timeout(() => {
                this.emit("content_update", data.content);
            });
        };

        private onPageSettings = (data): void => {
            $timeout(() => {
                this.emit("meta_update", data);
            });
        };

        private onPageError = (data): void => {
            $timeout(() => {
                this.emit("error", data);
            });
        };

        private onOAuthError = (data): void => {
            if (data.error === "expired_token"){
                auth.refreshTokens().then(() => {
                    // Reconnect socket
                    this.start();
                });
            }
        };
    }

    // ipushpull.page.module.service("ippPageProviderSocket", ProviderSocket);
}
