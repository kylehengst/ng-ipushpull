/**
 * Todo list
 * ------------------------------
 * @todo Implement page access polling
 * @todo Emit something to indicate initial load
 * @todo expose function to trigger decryption
 * @todo alter page special page type for better manipulation later (reports 1000+)
 * @todo proper interfaces and constants
 * @todo parse all styles - convert from our model to cell-by-cell model
 */
namespace ipushpull {
    "use strict";
    import IDeferred = angular.IDeferred;
    import Socket = SocketIOClient.Socket;
    import IPromise = angular.IPromise;
    import IEventEmitter = Wolfy87EventEmitter.EventEmitter;

    export interface IPageContentLink {
        external: boolean;
        address: string;
    }

    export interface IPageCellStyle {
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
        style?: IPageCellStyle;
    }

    export interface IPageContent {
        length: number; // Hack
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

    export interface IPage extends IPageServiceMeta {

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
    let $q, $timeout, api, storage, crypto, config;

    class PageWrap {
        public static $inject: string[] = ["$q", "$timeout", "ippApiService", "ippGlobalStorageService", "ippCryptoService", "ipushpull_conf"];

        constructor(q, timeout, ippApi, ippStorage, ippCrypto, ippConf){
            // @todo This should not be here
            // @todo Handle last "/" in url
            let defaults: any = {
                url: "https://www.ipushpull.com",
            };

            $q = q;
            $timeout = timeout;
            api = ippApi;
            storage = ippStorage;
            crypto = ippCrypto;
            config = angular.merge({}, defaults, ippConf);

            return Page;
        }
    }

    ipushpull.module.service("ippPageService", PageWrap);

    // @todo extend event emitter interface
    export interface IPageService {
        ready: boolean;
        decrypted: boolean;

        passphrase: string;
        data;

        start: () => void;
        stop: () => void;
        push: () => void;
        destroy: () => void;
    }

    class Page extends EventEmitter implements IPageService {
        public static get TYPE_REGULAR(): number { return 0; }
        public static get TYPE_ALERT(): number { return 5; }
        public static get TYPE_PDF(): number { return 6; }
        public static get TYPE_PAGE_ACCESS_REPORT(): number { return 1001; }
        public static get TYPE_DOMAIN_USAGE_REPORT(): number { return 1002; }
        public static get TYPE_GLOBAL_USAGE_REPORT(): number { return 1003; }
        public static get TYPE_PAGE_UPDATE_REPORT(): number { return 1004; }
        public static get TYPE_LIVE_USAGE_REPORT(): number { return 1007; }

        public static get EVENT_NEW_CONTENT(): string { return "new_content"; }
        public static get EVENT_NEW_META(): string { return "new_meta"; }
        public static get EVENT_ERROR(): string { return "error"; }

        public ready: boolean = false;
        public decrypted: boolean = true;

        private _supportsWS: boolean = true; // let's be optimistic by default
        private _provider: IPageProvider;

        private _data: IPage;
        private _pageId: number;
        private _folderId: number;
        private _pageName: string;
        private _folderName: string;

        private _passphrase: string = "";

        // @todo Using type "any" for page and folder ids, because string | number throws compiler error http://stackoverflow.com/questions/39467714
        constructor(pageId?: number | string, folderId?: number | string, autoStart: boolean = true){
            super();

            // Decide if client can use websockets
            this._supportsWS = "WebSocket" in window || "MozWebSocket" in window;

            // Process page and folder id/name
            this._folderId = (!isNaN(+folderId)) ? <number>folderId : undefined;
            this._pageId = (!isNaN(+pageId)) ? <number>pageId : undefined;
            this._folderName = (isNaN(+folderId)) ? <string>folderId : undefined;
            this._pageName = (isNaN(+pageId)) ? <string>pageId : undefined;

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

        public get data(): IPage{ return this._data; }
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
            this.removeEvent();
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

        private registerListeners(): void{
            // Setup listeners
            this._provider.on("content_update", (data) => {
                // @todo should change only on initial load, so might move it somewhere else
                this.ready = true;

                data.special_page_type = this.updatePageType(data.special_page_type);

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
                        this.emit(Page.EVENT_ERROR, "Decryption failed");
                    }
                } else {
                    this.decrypted = true;
                }

                // Decompress styles
                data.content = PageStyles.decompressStyles(data.content);

                this._data = angular.merge({}, this._data, data);

                // @todo This should be emitted before decryption probably
                this.emit(Page.EVENT_NEW_CONTENT, data);
            });

            this._provider.on("meta_update", (data) => {
                data.special_page_type = this.updatePageType(data.special_page_type);

                // Remove content fields (should not be here and in the future will not be here)
                delete data.content;
                delete data.encrypted_content;

                this._data = angular.merge({}, this._data, data);

                this.emit(Page.EVENT_NEW_META, data);
            });

            this._provider.on("error", (err) => {
                this.emit(Page.EVENT_ERROR, err);
            });
        }

        private updatePageType(pageType: number): number{
            if (pageType > 0 && pageType < 5 || pageType === 7){
                pageType += 1000;
            }

            return pageType;
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
    interface IPageProvider extends IEventEmitter {
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

        public destroy(): void {
            this.stop();
            this.removeEvent();
        }

        private startPolling(): void {
            this.load();

            setTimeout(() => {
                this.startPolling();
            }, this._timeout);
        }

        private load(ignoreSeqNo: boolean = false): IPromise<IPage> {
            let q: IDeferred<IPage> = $q.defer();

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
                seq_no: (!ignoreSeqNo) ? this._seqNo : undefined,
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

        public destroy(): void {
            this.stop();
            this.removeEvent();
        }

        private connect(): Socket {
            let query: string[] = [
                `access_token=${storage.get("access_token")}`,
            ];

            query = query.filter((val: string) => {
                return (val.length > 0);
            });

            return io.connect(`${config.url}/page/${this._pageId}`, {
                query: query.join("&"),
                transports: (this.supportsWebSockets()) ? ["websocket", "polling"] : ["polling"],
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
            // @todo Do something

            // @todo should we watch auth service for re-logged and re-connect?
        };

        private supportsWebSockets = () => { return "WebSocket" in window || "MozWebSocket" in window; };
    }

    class PageStyles {
        private currentStyle: IPageCellStyle = {};
        private currentBorders: any = {top: {}, right: {}, bottom: {}, left: {}};

        /**
         * Linking names of excel/json styles to css styles
         * @type {{text-wrap: string, tbs: string, rbs: string, bbs: string, lbs: string, tbc: string, rbc: string, bbc: string, lbc: string, tbw: string, rbw: string, bbw: string, lbw: string}}
         */
        private excelStyles: any = {
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

        /**
         * Map excel border styles to css border styles (with some compromise)
         * @type {{solid: string, thin: string, thick: string, hair: string, dash: string, dashed: string, dashdot: string, mediumdashed: string, mediumdashdot: string, slantdashdot: string, dot: string, dotted: string, hairline: string, mediumdashdotdot: string, dashdotdot: string, double: string}}
         */
        private excelBorderStyles: any = {
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
            "mediumdashdotdot": "dotted", // @todo: Hairline is weight not style in excel (Whaaaat??),
            "dashdotdot": "dotted",

            "double": "double",
        };

        /**
         * Map excel border weights to css border weights (with some compromise)
         * @type {{thin: string, medium: string, thick: string, hair: string, hairline: string, double: string}}
         */
        private excelBorderWeights = {
            "thin": "1px",
            "medium": "1px",
            "thick": "2px",
            "hair": "1px",
            "hairline": "1px",
            "double": "3px",
        };

        /**
         * Styles to be ignored when rendering styles from excel/json - these styles cannot be represented in css
         * @type {string[]}
         */
        private ignoreStyles: string[] = [
            "number-format",
        ];

        public static decompressStyles(content: IPageContent): IPageContent {
            let styler = new PageStyles();

            for (let i: number = 0; i < content.length; i++){
                for (let j: number = 0; j < content[i].length; j++) {
                    content[i][j].style = styler.makeStyle(content[i][j].style);
                }
            }

            return content;
        }

        /**
         * Parses cell styles from provided style rules.
         *
         * @param styleOrig
         * @returns {string}
         */
        public makeStyle(cellStyle: IPageCellStyle): IPageCellStyle {
            let styleName: string,
                style: IPageCellStyle = angular.copy(cellStyle);

            for (let item in style) {
                if (this.ignoreStyles.indexOf(item) >= 0) {
                    continue;
                }

                styleName = this.excelToCSS(item);

                let prefix: string = "",
                    suffix: string = "";

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
                    let pos: string = styleName.split("-")[1];

                    if (styleName.indexOf("-style") >= 0) {
                        this.currentBorders[pos].style = this.excelBorderStyles[style[item]] || undefined;
                    }

                    if (styleName.indexOf("-width") >= 0) {
                        this.currentBorders[pos].width = (style[item] !== "none") ? this.excelBorderWeights[style[item]] : undefined; // use current value if not in array (if supplied number of px)
                    }

                    if (styleName.indexOf("-color") >= 0) {
                        this.currentBorders[pos].color = (style[item] === "none") ? "transparent" : "#" + style[item];
                    }

                    continue;
                }

                this.currentStyle[styleName] = prefix + style[item] + suffix;
            }

            let resultStyles: IPageCellStyle = angular.copy(this.currentStyle);

            // Process currentBorders
            for (let borderPos in this.currentBorders) {
                if (typeof this.currentBorders[borderPos].style === "undefined" || !this.currentBorders[borderPos].style){
                    continue;
                }

                resultStyles["border-" + borderPos] = `${this.currentBorders[borderPos].width} ${this.currentBorders[borderPos].style} ${this.currentBorders[borderPos].color};`;
            }


            return resultStyles;
        }

        public reset(): void{
            this.currentStyle = {};
            this.currentBorders = {top: {}, right: {}, bottom: {}, left: {}};
        }

        /**
         * Helper function to get right css name of style based on excel name
         * @param val
         * @returns {*}
         */
        private excelToCSS(val: string): string {
            return (this.excelStyles[val]) ? this.excelStyles[val] : val;
        }

        /**
         * Helper function to get right excel style name based on css name
         * @param val
         * @returns {*}
         * @constructor
         */
        private CSSToExcel(val: string): string {
            let excelVal: string = val;
            for (let style in this.excelStyles) {
                if (this.excelStyles[style] === val) {
                    excelVal = style;
                    break;
                }
            }

            return excelVal;
        }

        /**
         * Helper to get excel border weight value based on css pixel value
         * @param pixels
         * @returns {string}
         */
        private excelBorderWeight(pixels: number): string {
            let bWeight: string = "";

            for (let weight in this.excelBorderWeights) {
                if (this.excelBorderWeights[weight] === pixels) {
                    bWeight = weight;
                    break;
                }
            }

            return bWeight;
        }
    }
}
