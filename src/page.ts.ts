/**
 * Todo list
 * ------------------------------
 * @todo Implement page access polling
 * @todo Emit something to indicate initial load
 * @todo expose function to trigger decryption
 * @todo alter page special page type for better manipulation later (reports 1000+)
 * @todo proper interfaces and constants
 */
namespace ipushpull {
    "use strict";
    import IDeferred = angular.IDeferred;
    import Socket = SocketIOClient.Socket;

    export interface IPageContentLink {
        external: boolean;
        address: string;
    }

    export interface IPageContentStyle {
        "background-color"?: string;
        "color"?: string;
        "font-family"?: string;
        "font-size"?: string;
        "font-style"?: string;
        "font-weight"?: string;
        "height"?: string;
        "number-format"?: string;
        "text-align"?: string;
        "text-wrap"?: string;
        "width"?: string;
        "tbs"?: string;
        "rbs"?: string;
        "bbs"?: string;
        "lbs"?: string;
        "tbc"?: string;
        "rbc"?: string;
        "bbc"?: string;
        "lbc"?: string;
        "tbw"?: string;
        "rbw"?: string;
        "bbw"?: string;
        "lbw"?: string;
    }

    export interface IPageContentCell {
        value: string | number;
        formatted_value: string | number;
        link?: IPageContentLink;
        style?: IPageContentStyle;
    }

    export interface IPageContent {
        [index: number]: IPageContentCell[];
    }

    export interface IPageServiceContent {
        id: number;
        seq_no: number;
        content_modified_timestamp: Date;
        content: IPageContent;
        content_modified_by: any;
        push_interval: number;
        pull_interval: number;
        is_public: boolean;
        description: string;
        encrypted_content: string;
        encryption_key_used: string;
        encryption_type_used: number;
        special_page_type: number;
    }

    export interface IPageServiceMeta {
        by_name_url: string;
        id: number;
        name: string;
        description: string;
        url: string;
        uuid: string;
        access_rights: string;
        background_color: string;
        content: IPageContent;
        content_modified_by: any;
        content_modified_timestamp: Date;
        created_by: any;
        created_timestamp: Date;
        domain_id: number;
        domain_name: string;
        domain_url: string;
        encrypted_content: string;
        encryption_key_to_use: string;
        encryption_key_used: number;
        encryption_type_to_use: string;
        encryption_type_used: number;
        is_obscured_public: boolean;
        is_public: boolean;
        is_template: boolean;
        modified_by: any;
        modified_timestamp: Date;
        pull_interval: number;
        push_interval: number;
        record_history: boolean;
        seq_no: number;
        show_gridlines: boolean;
        special_page_type: number;
    }

    export interface IPageRangeRights {
        ro: number[];
        no: number[];
    }

    export interface IPageRange {
        name: string;
        start: string;
        end: string;
        rights: IPageRangeRights;
        freeze: boolean;
    }

    // Main/public page service
    let $q, $timeout, api, auth, crypto, config;

    class PageWrap {
        public static $inject: string[] = ["$q", "$timeout", "ippApi", "ippAuth", "ippCrypto", "ipushpull_conf"];

        constructor(q, timeout, ippApi, ippAuth, ippCrypto, ippConf){
            // @todo This should not be here
            // @todo Handle last "/"
            let defaults: any = {
                url: "https://www.ipushpull.com",
            };

            $q = q;
            $timeout = timeout;
            api = ippApi;
            auth = ippAuth;
            crypto = ippCrypto;
            config = angular.merge({}, defaults, ippConf);

            return Page;
        }
    }

    ipushpull.module.service("ippPage", PageWrap);

    // @todo extend event emitter interface
    export interface IIPushPullPageService {
        ready: boolean;
        decrypted: boolean;

        passphrase: string;
        data;

        start: () => void;
        stop: () => void;
        push: () => void;
        destroy: () => void;
    }

    class Page extends EventEmitter implements IIPushPullPageService {
        public ready: boolean = false;
        public decrypted: boolean = true;

        private _supportsWS: boolean = true; // let's be optimistic by default
        private _provider;

        private _data;
        private _pageId: number;
        private _folderId: number;
        private _pageName: string;
        private _folderName: string;

        private _passphrase: string = "";

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

        public get data(){ return this._data; }
        public set passphrase(passphrase: string){ this._passphrase = passphrase; }

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
                // @todo should change only on initial load, so might move it somewhere else
                this.ready = true;

                // Check for encryption and decrypt
                if (data.encryption_type_used) {
                    let decrypted: any = crypto.decryptContent({
                        name: data.encryption_key_used,
                        passphrase: this._passphrase,
                    }, data.encrypted_content);

                    if (decrypted){
                        this.decrypted = true;
                        data.content = decrypted;
                    } else {
                        this.decrypted = false;
                        this.emit("error", "Decryption failed");
                    }
                } else {
                    this.decrypted = true;
                }

                this._data = angular.merge({}, this._data, data);

                this.emit("new_content", data);
            });

            this._provider.on("meta_update", (data) => {
                this._data = angular.merge({}, this._data, data);

                this.emit("new_meta", data);
            });

            this._provider.on("error", (err) => {
                this.emit("error", err);
            });
        }

        /*private encrypt(key?: any): boolean {
            if (!key) {
                key = ippKeyring.getKey(this.folderName, this.data.encryption_key_to_use);
            }

            if (!key) {
                let passphrase = prompt("This page should be encrypted with key " + this.data.encryption_key_to_use + ". Please input the passphrase");

                if (!passphrase) return false;

                key = {
                    name: this.data.encryption_key_to_use,
                    passphrase: passphrase
                };

                ippKeyring.saveKey(this.folderName, key, false);
            }

            this.data.encrypted_content = ippCrypto.encryptContent(key, this.data.content); // @todo: Handle encryption error
            this.data.content = [];

            this.data.encryption_type_used = 1;
            this.data.encryption_key_used = key.name;

            return true;
        }*/
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
                        this.emit("content_update", this.tempGetContentOb(res.data));
                        this.emit("meta_update", this.tempGetSettingsOb(res.data));
                    } else {
                        // @todo do we need this?
                        this.emit("empty_update");
                    }

                    q.resolve(res.data);
                } else {
                    this.emit("error", res.data);
                    q.reject({});
                }
            }, (err) => {
                this.emit("error", err.httpText);
                q.reject(err);
            }).finally(() => {
                this._requestOngoing = false;
            });

            return q.promise;
        }

        /**
         * Temporary solution to get the required subset of data from full page object
         *
         * @param data
         * @returns {{id: number, seq_no: number, content_modified_timestamp: Date, content: any, content_modified_by: any, push_interval: number, pull_interval: number, is_public: boolean, description: string, encrypted_content: string, encryption_key_used: number, encryption_type_used: number, special_page_type: number}}
         */
        private tempGetContentOb(data): any {
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
        }

        /**
         * Temporary solution to get the required subset of data from full page object
         *
         * @param data
         * @returns {any}
         */
        private tempGetSettingsOb(data): any {
            return JSON.parse(JSON.stringify(data));
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

            return io.connect(`${config.url}/page/${this._pageId}`, {
                query: query.join("&"),
                forceNew: true,
            });
        }

        private onConnect: any = () => {
            return;
        };

        private onPageContent = (data): void => {
            $timeout(() => {
                this.emit("content_update", data);
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
