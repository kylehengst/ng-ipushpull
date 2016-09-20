/**
 * Todo list
 * ------------------------------
 * @todo Even if autostart is off we should probably do the initial load....
 * @todo Socket should have proper implementation of start/stop mechanism
 * @todo Clonning encrypted pages - possible ?
 */

// Interfaces - separating for easier IDE collapsing
namespace ipushpull {
    "use strict";

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
        encryption_key_used: string;
        encryption_type_to_use: number;
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

    export interface IPageDeltaContentCol {
        col_index: number;
        cell_content: IPageContentCell;
    }

    export interface IPageDeltaContentRow {
        row_index: number;
        cols: IPageDeltaContentCol[];
    }

    export interface IPageDelta {
        new_rows: number[];
        new_cols: number[];
        content_delta: IPageDeltaContentRow[];
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

    // @todo This should be in some domain/folder service
    export interface IUserPageDomainCurrentUserAccess {
        default_page_id: number;
        default_page_url: string;
        domain_id: number;
        domain_url: string;
        is_active: boolean;
        is_administrator: boolean;
        is_default_domain: boolean;
        is_pending: boolean;
        page_count: number;
        user_id: number;
        user_url: string;
    }

    // @todo This should be probably in some domain/folder service
    export interface IUserPageDomainAccess {
        alerts_enabled: boolean;
        by_name_url: string;
        current_user_domain_access: IUserPageDomainCurrentUserAccess;
        description: string;
        display_name: string;
        domain_type: number;
        encryption_enabled: boolean;
        id: number;
        is_page_access_mode_selectable: boolean;
        is_paying_customer: boolean;
        login_screen_background_color: "";
        logo_url: string;
        name: string;
        page_access_mode: number;
        page_access_url: string;
        url: string;
    }

    export interface IUserPageAccess {
        by_name_url: string;
        content_by_name_url: string;
        content_url: string;
        domain: IUserPageDomainAccess;
        domain_id: number;
        domain_name: string;
        domain_url: string;
        encryption_to_use: number;
        encryption_key_to_use: string;
        id: number;
        is_administrator: boolean;
        is_public: boolean;
        is_users_default_page: boolean;
        name: string;
        pull_interval: number;
        push_interval: number;
        special_page_type: number;
        url: string;
        write_access: boolean;
    }

    export interface IPageTemplate {
        by_name_url: string;
        category: string;
        description: string;
        domain_id: number;
        domain_name: string;
        id: number;
        name: string;
        special_page_type: number;
        url: string;
        uuid: string;
    }

    export interface IPageCloneOptions {
        clone_ranges?: boolean;
    }

    export interface IPageService extends IEventEmitter {
        TYPE_REGULAR: number;
        TYPE_ALERT: number;
        TYPE_PDF: number;
        TYPE_PAGE_ACCESS_REPORT: number;
        TYPE_DOMAIN_USAGE_REPORT: number;
        TYPE_GLOBAL_USAGE_REPORT: number;
        TYPE_PAGE_UPDATE_REPORT: number;
        TYPE_LIVE_USAGE_REPORT: number;

        EVENT_READY: string;
        EVENT_NEW_CONTENT: string;
        EVENT_NEW_META: string;
        EVENT_DECRYPTED: string;
        EVENT_ERROR: string;

        ready: boolean;
        decrypted: boolean;
        updatesOn: boolean;

        encryptionKeyPull: IEncryptionKey;
        encryptionKeyPush: IEncryptionKey;

        data: IPage;
        access: IUserPageAccess;

        start: () => void;
        stop: () => void;
        push: (data: IPageContent | IPageDelta, delta?: boolean, encryptionKey?: IEncryptionKey) => IPromise<any>;
        destroy: () => void;
        decrypt: (key: IEncryptionKey) => void;
        clone: (folderId: number, name: string, options?: IPageCloneOptions) => IPromise<IPageService>;
    }
}

namespace ipushpull {
    "use strict";
    import IDeferred = angular.IDeferred;
    import Socket = SocketIOClient.Socket;
    import IPromise = angular.IPromise;
    import IEventEmitter = Wolfy87EventEmitter.EventEmitter;
    import IQService = angular.IQService;
    import ITimeoutService = angular.ITimeoutService;
    import IIntervalService = angular.IIntervalService;

    // Main/public page service
    let $q: IQService, $timeout: ITimeoutService, $interval: IIntervalService, api: IApiService, auth: IAuthService, storage: IStorageService, crypto: ICryptoService, config: IIPPConfig;

    class PageWrap {
        public static $inject: string[] = ["$q", "$timeout", "$interval", "ippApiService", "ippAuthService", "ippGlobalStorageService", "ippCryptoService", "ipushpull_conf"];

        constructor(
            q: IQService,
            timeout: ITimeoutService,
            interval: IIntervalService,
            ippApi: IApiService,
            ippAuth: IAuthService,
            ippStorage: IStorageService,
            ippCrypto: ICryptoService,
            ippConf: IIPPConfig){

            // @todo This should not be here
            // @todo Handle last "/" in url
            let defaults: any = {
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
    }

    ipushpull.module.service("ippPageService", PageWrap);

    class Page extends EventEmitter implements IPageService {
        public get TYPE_REGULAR(): number { return 0; }
        public get TYPE_ALERT(): number { return 5; }
        public get TYPE_PDF(): number { return 6; }
        public get TYPE_PAGE_ACCESS_REPORT(): number { return 1001; }
        public get TYPE_DOMAIN_USAGE_REPORT(): number { return 1002; }
        public get TYPE_GLOBAL_USAGE_REPORT(): number { return 1003; }
        public get TYPE_PAGE_UPDATE_REPORT(): number { return 1004; }
        public get TYPE_LIVE_USAGE_REPORT(): number { return 1007; }

        public get EVENT_READY(): string { return "ready"; }
        public get EVENT_DECRYPTED(): string { return "decrypted"; }
        public get EVENT_NEW_CONTENT(): string { return "new_content"; }
        public get EVENT_NEW_META(): string { return "new_meta"; }
        public get EVENT_ACCESS_UPDATED(): string { return "access_updated"; }
        public get EVENT_ERROR(): string { return "error"; }

        public ready: boolean = false;
        public decrypted: boolean = true;
        public updatesOn: boolean = false; // @todo I dont like this...

        private _supportsWS: boolean = true; // let's be optimistic by default
        private _provider: IPageProvider;

        private _accessInterval: IPromise<any>;

        private _data: IPage;
        private _access: IUserPageAccess;

        private _pageId: number;
        private _folderId: number;
        private _pageName: string;
        private _folderName: string;

        // Ouch... but what else can I do....
        private _contentLoaded: boolean;
        private _metaLoaded: boolean;

        private _encryptionKeyPull: IEncryptionKey = {
            name: "",
            passphrase: "",
        };

        private _encryptionKeyPush: IEncryptionKey = {
            name: "",
            passphrase: "",
        };

        public static create(folderId: number, name: string, type: number, template?: IPageTemplate): IPromise<IPageService>{
            let q: IDeferred<IPageService> = $q.defer();

            if (template){
                let page: IPageService = new Page(template.id, template.domain_id);
                // @todo this business with autostart and receiving data etc is quite fiddly to say the least
                page.on(page.EVENT_READY, () => {
                    page.clone(folderId, name)
                        .then(q.resolve, q.reject)
                        .finally(() => {
                            page.destroy();
                        });
                });
            } else {
                api.createPage({
                    domainId: folderId,
                    data: {
                        name: name,
                        special_page_type: type,
                    },
                }).then((res) => {
                    // Start new page
                    let page: IPageService = new Page(res.data.id, folderId);
                    // @todo this business with autostart and receiving data etc is quite fiddly to say the least
                    page.on(page.EVENT_READY, () => {
                        page.stop();
                        q.resolve(page);
                    });
                }, (err) => {
                    q.reject(err);
                });
            }

            return q.promise;
        };

        constructor(pageId: number | string, folderId: number | string, autoStart: boolean = true){
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

            this.updatesOn = autoStart;

            // If we get folder name and page name, first get page id from REST and then continue with sockets - fiddly, but only way around it at the moment
            if (!this._pageId) {
                this.getPageId(this._folderName, this._pageName).then((res: any) => {
                    this._pageId = res.pageId;
                    this._folderId = res.folderId;

                    this.init(autoStart);
                }, (err) => {
                        // @todo Handle error
                });
            } else {
                this.init(autoStart);
            }
        }

        public set encryptionKeyPull(key: IEncryptionKey){ this._encryptionKeyPull = key; }
        public set encryptionKeyPush(key: IEncryptionKey){ this._encryptionKeyPush = key; }

        public get data(): IPage{ return this._data; }
        public get access(): IUserPageAccess { return this._access; }

        public start(): void{
            this._provider.start();
            this.updatesOn = true;
        }

        public stop(): void{
            this._provider.stop();
            this.updatesOn = false;
        }

        public push(data: IPageContent|IPageDelta, delta: boolean = true): IPromise<any> {
            if (delta){
                return this.pushDelta(<IPageDelta>data);
            } else {
                return this.pushFull(<IPageContent>data);
            }
        }

        // @todo This is NOT good
        public decrypt(key?: IEncryptionKey): void {
            // @todo Oh lord...
            if (!key){
                key = this._encryptionKeyPull;
            }

            // Fail silently if we dont have passphrase
            // @todo oh sweet jesus...
            if (this._data.encryption_type_used && !key.passphrase){
                this.decrypted = false;
                return;
            }

            // Check for encryption and decrypt
            if (this._data.encryption_type_used) {
                let decrypted: any = crypto.decryptContent({
                    name: key.name,
                    passphrase: key.passphrase,
                }, this._data.encrypted_content);

                if (decrypted){
                    this.decrypted = true;
                    this._data.content = decrypted;
                    this._encryptionKeyPull = key;

                    // @todo Emitting Decrypted and New content events will lead to confusion. Eventually you will want to subscribe to both for rendering, so you will have double rendering
                    this.emit(this.EVENT_DECRYPTED);
                } else {
                    this.decrypted = false;
                    // @todo I am pretty sure we will want something more specific for decryption than just message
                    this.emit(this.EVENT_ERROR, new Error(`Could not decrypt page with key "${key.name}" and passphrase "${key.passphrase}"`));
                }
            } else {
                this.decrypted = true;
            }

            // @todo ouch... should not be here
            if (this.decrypted){
                this._data.content = PageStyles.decompressStyles(this._data.content);
            }
        }

        public destroy(): void {
            this._provider.destroy();
            $interval.cancel(this._accessInterval);
            this.removeEvent();
        }

        public clone(folderId: number, name: string, options: IPageCloneOptions = {}): IPromise<IPageService> {
            let q: IDeferred<IPageService> = $q.defer();

            if (!this.ready){
                q.reject("Page is not ready");
                return q.promise;
            }

            // Prevent cloning ranges between folders
            // @todo This is done silently at the moment, should it reject the transaction?
            if (options.clone_ranges && this._folderId !== folderId){
                options.clone_ranges = false;
            }

            // Create new page
            Page.create(this._folderId, name, this._data.special_page_type).then((newPage: IPageService) => {
                $q.all([
                    // @todo Save settings
                    newPage.push(this._data.content, false), // Push content
                ]).then((res) => {
                    q.resolve(newPage);
                }, q.reject); // @todo Handle properly
            }, (err) => {
                q.reject(err);
            });

            return q.promise;
        }

        private init(autoStart: boolean = true): void{
            if (!this._supportsWS || typeof io === "undefined"){
                console.warn("[iPushPull] Cannot use websocket technology it is not supported or websocket library is not included. " +
                    "Make sure socket-io client is incldued or use ng-ipushpull-standalone.min.js");
            }

            // Create provider
            this._provider = (!this._supportsWS || typeof io === "undefined" || config.transport === "polling")
                ? new ProviderREST(this._pageId, this._folderId, autoStart)
                : new ProviderSocket(this._pageId, this._folderId, autoStart);

            // Start pulling page access
            this.getPageAccess();
            this._accessInterval = $interval(() => {
                this.getPageAccess();
            }, 30000);

            this.registerListeners();
        }

        private getPageId(folderName: string, pageName: string): IPromise<any> {
            let q: IDeferred<any> = $q.defer();

            // @todo Need specific/lightweight endpoint - before arguing my way through this, I can use page detail (or write my own)

            api.getPageByName({domainId: folderName, pageId: pageName}).then((res) => {
                q.resolve({pageId: res.data.id, folderId: res.data.domain_id});
            }, (err) => {
                // Convert it into socket error
                q.reject(err);
            });

            return q.promise;
        }

        private getPageAccess(): IPromise<any>{
            let q: IDeferred<any> = $q.defer();

            api.getPageAccess({
                domainId: this._folderId,
                pageId: this._pageId,
            }).then((res: any) => {
                this._access = res.data;

                this.emit(this.EVENT_ACCESS_UPDATED);
                q.resolve();
            }, (err) => {
                // @todo Should we emit something?
                // @todo Handle error?
                q.reject();
            });

            return q.promise;
        }

        private registerListeners(): void{
            // Setup listeners
            this._provider.on("content_update", (data) => {
                data.special_page_type = this.updatePageType(data.special_page_type);

                this._data = angular.merge({}, this._data, data);

                this.decrypt();

                this._contentLoaded = true;
                this.checkReady();

                // @todo This should be emitted before decryption probably
                this.emit(this.EVENT_NEW_CONTENT, this._data);
            });

            this._provider.on("meta_update", (data) => {
                data.special_page_type = this.updatePageType(data.special_page_type);

                // Remove content fields (should not be here and in the future will not be here)
                delete data.content;
                delete data.encrypted_content;

                this._data = angular.merge({}, this._data, data);

                this._metaLoaded = true;
                this.checkReady();

                this.emit(this.EVENT_NEW_META, data);
            });

            this._provider.on("error", (err) => {
                err.code = err.httpCode || err.code;
                err.message = err.httpText || err.message;

                if (err.code === 404){
                    this.stop();
                }

                this.emit(this.EVENT_ERROR, err.message);
            });
        }

        private pushFull(content: IPageContent): IPromise<any>{
            let q: IDeferred<any> = $q.defer();

            // If encrypted
            if (this._data.encryption_type_to_use) {
                if (!this._encryptionKeyPull || this._data.encryption_key_to_use !== this._encryptionKeyPush.name){
                    // @todo Proper error
                    q.reject("None or wrong encryption key");
                    return q.promise;
                }

                let encrypted: string = this.encrypt(this._encryptionKeyPush, content);

                if (encrypted) {
                    this._data.encrypted_content = encrypted;
                    this._data.encryption_type_used = 1;
                    this._data.encryption_key_used = this._encryptionKeyPush.name;
                } else {
                    // @todo proper error
                    q.reject("Encryption failed");
                    return q.promise;
                }
            } else {
                // @todo: webservice should do this automatically
                this._data.encryption_key_used = "";
                this._data.encryption_type_used = 0;
                this._data.content = content;
            }

            let data: any = {
                content: this._data.content,
                encrypted_content: this._data.encrypted_content,
                encryption_type_used: this._data.encryption_type_used,
                encryption_key_used: this._data.encryption_key_used,
            };

            let requestData: any = {
                domainId: this._folderId,
                pageId: this._pageId,
                data: data,
            };

            api.savePageContent(requestData).then((res: any) => {
                // @todo Do we need this? should be probably updated in rest - if not updated rest will load update even though it already has it
                this._data.seq_no = res.data.seq_no;
                q.resolve(res);
            }, q.reject);

            return q.promise;
        }

        private pushDelta(data: IPageDelta): IPromise<any>{
            let q: IDeferred<any> = $q.defer();

            let requestData: any = {
                domainId: this._folderId,
                pageId: this._pageId,
                data: data,
            };

            api.savePageContentDelta(requestData).then(q.resolve, q.reject);

            return q.promise;
        }

        // @todo Not a great logic - When do we consider for a page to actually be ready?
        private checkReady(): void {
            if (this._contentLoaded && this._metaLoaded && !this.ready){
                this.ready = true;
                this.emit(this.EVENT_READY);
            }
        }

        private updatePageType(pageType: number): number{
            if (pageType > 0 && pageType < 5 || pageType === 7){
                pageType += 1000;
            }

            return pageType;
        }

        private encrypt(key: IEncryptionKey, content: IPageContent): string {
            // @todo: Handle encryption error
            return crypto.encryptContent(key, content);
        }
    }

    export interface IPageRangeItem {
        name: string;
        toObject: () => IPageRange;
    }
    
    export interface IPagePermissionRange extends IPageRangeItem {
        rowStart: number;
        rowEnd: number;
        colStart: number;
        colEnd: number;

        setPermission: (userId: number, permission: string) => void
    }

    export interface IPageFreezingRange extends IPageRangeItem {
        subject: string;
        count: number;
    }

    export class PermissionRange implements IPagePermissionRange {
        // @todo Constants for permissions ro, no etc

        private _permissions: IPageRangeRights;

        constructor(public name: string, public rowStart: number = 0, public rowEnd: number = 0, public colStart: number = 0, public colEnd: number = 0){}
        
        public setPermission(userId: number, permission: string): void {
            // First remove user rom all ranges
            this._permissions.ro.splice(this._permissions.ro.indexOf(userId), 1);
            this._permissions.no.splice(this._permissions.no.indexOf(userId), 1);

            this._permissions[permission].push(userId);
        }

        public toObject(): IPageRange {
            return {
                name: this.name,
                start: `${this.rowStart}:${this.colStart}`,
                end: `${this.rowEnd}:${this.colEnd}`,
                rights: this._permissions,
                freeze: false,
            };
        }
    }

    export type TFreezeSubject = "rows" | "cols";

    export class FreezingRange implements IPageRangeItem{
        public static get SUBJECT_ROWS(): string { return "rows"; };
        public static get SUBJECT_COLUMNS(): string { return "cols"; };

        constructor(public name: string, public subject: TFreezeSubject = "rows", public count: number = 1){}

        public toObject(): IPageRange {
            let range: IPageRange = {
                name: this.name,
                start: "0:0",
                end: "",
                rights: {ro: [], no: []},
                freeze: true,
            };

            if (this.subject === FreezingRange.SUBJECT_ROWS){
                range.end = `${this.count - 1}:-1`;
            } else {
                range.end = `-1:${this.count - 1}`;
            }

            return range;
        }
    }

    class Ranges {
        private _ranges: IPageRangeItem[] = [];

        constructor(pageAccessRights?: string){
            if (pageAccessRights){
                this.parse(pageAccessRights);
            }
        }

        public parse(pageAccessRights: string): void {
            let ar: IPageRange[] = JSON.parse(pageAccessRights);

            for (let i: number = 0; i < ar.length; i++){
                let rowStart: number = parseInt(ar[i].start.split(":")[0], 10);
                let rowEnd: number = parseInt(ar[i].end.split(":")[0], 10);
                let colStart: number = parseInt(ar[i].start.split(":")[1], 10);
                let colEnd: number = parseInt(ar[i].end.split(":")[1], 10);

                if (ar[i].freeze){
                    let subject: TFreezeSubject = (colEnd >= 0) ? "cols" : "rows";
                    let count: number = (colEnd >= 0) ? colEnd + 1 : rowEnd + 1;

                    this._ranges.push(new FreezingRange(ar[i].name, subject, count));
                } else {
                    this._ranges.push(new PermissionRange(ar[i].name, rowStart, rowEnd, colStart, colEnd));
                }
            }
        }
    }

    interface IPageProvider extends IEventEmitter {
        start: () => void;
        stop: () => void;
        destroy: () => void;
    }

    // Page rest/polling service
    class ProviderREST extends EventEmitter implements IPageProvider {
        private _stopped: boolean = false;
        private _requestOngoing: boolean = false;
        private _timer: IPromise<any>;
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
            $timeout.cancel(this._timer);
        }

        public destroy(): void {
            this.stop();
            this.removeEvent();
        }

        // @todo Not great
        private startPolling(): void {
            this.load();

            this._timer = $timeout(() => {
                this.startPolling();
            }, this._timeout);
        }

        private load(ignoreSeqNo: boolean = false): IPromise<IPage> {
            let q: IDeferred<IPage> = $q.defer();

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
                this.emit("error", err);
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
        private tempGetContentOb(data: IPage): any {
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
        private tempGetSettingsOb(data: IPage): any {
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
        private _socket: Socket;

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

        // @todo Disconnecting socket on stop might be too wasteful. Better just throw away updates? or is that wasteful?
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
                transports: (this.supportsWebSockets()) ? ["websocket"] : ["polling"],
                // forceNew: true,
            });
        }

        private onConnect: any = () => {
            return;
        };

        private onPageContent = (data: IPageServiceContent): void => {
            $timeout(() => {
                this.emit("content_update", data);
            });
        };

        private onPageSettings = (data: IPageServiceMeta): void => {
            $timeout(() => {
                this.emit("meta_update", data);
            });
        };

        private onPageError = (data: any): void => {
            $timeout(() => {
                if (data.code === 401){
                    auth.refreshTokens().then(() => {
                        this.start();
                    });
                } else {
                    this.emit("error", data);
                }
            });
        };

        private onOAuthError = (data: any): void => {
            // @todo Do something

            // @todo should we watch auth service for re-logged and re-connect?

            // @todo Emit page error ?
        };

        private supportsWebSockets = () => { return "WebSocket" in window || "MozWebSocket" in window; };
    }

    interface IPageStyler {
        makeStyle: (cellStyle: IPageCellStyle) => IPageCellStyle;
        reset: () => void;
    }

    class PageStyles implements IPageStyler {
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
            "hairline": "dotted", // Hairline is weight not style in excel (Whaaaat??),
            "mediumdashdotdot": "dotted",
            "dashdotdot": "dotted",

            "double": "double",
        };

        /**
         * Map excel border weights to css border weights (with some compromise)
         * @type {{thin: string, medium: string, thick: string, hair: string, hairline: string, double: string}}
         */
        private excelBorderWeights: any = {
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
            let styler: IPageStyler = new PageStyles();

            for (let i: number = 0; i < content.length; i++){
                for (let j: number = 0; j < content[i].length; j++) {
                    content[i][j].style = styler.makeStyle(content[i][j].style);
                }
            }

            return content;
        }

        public reset(): void{
            this.currentStyle = {};
            this.currentBorders = {top: {}, right: {}, bottom: {}, left: {}};
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
