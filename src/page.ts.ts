/**
 * Todo list
 * ------------------------------
 * @todo Socket should have proper implementation of start/stop mechanism
 * @todo Clonning encrypted pages - possible ?
 */

// Interfaces - separating for easier IDE collapsing
namespace ipushpull {
    "use strict";
    import IPromise = angular.IPromise;
    import IEventEmitter = Wolfy87EventEmitter.EventEmitter;

    export interface IPageTypes {
        regular: number;
        pageAccessReport: number;
        domainUsageReport: number;
        globalUsageReport: number;
        pageUpdateReport: number;
        alert: number;
        pdf: number;
        liveUsage: number;
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
        types: IPageTypes;

        encryptionKeyPull: IEncryptionKey;
        encryptionKeyPush: IEncryptionKey;

        data: IPage;
        access: IUserPageAccess;
        Content: IPageContentProvider;
        Ranges: IPageRangesCollection;

        start: () => void;
        stop: () => void;
        push: (forceFull?: boolean) => IPromise<any>;
        saveMeta: (data: any) => IPromise<any>;
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
        public static $inject: string[] = ["$q", "$timeout", "$interval", "ippApiService", "ippAuthService", "ippStorageService", "ippCryptoService", "ippConfig"];

        constructor(
            q: IQService,
            timeout: ITimeoutService,
            interval: IIntervalService,
            ippApi: IApiService,
            ippAuth: IAuthService,
            ippStorage: IStorageService,
            ippCrypto: ICryptoService,
            ippConf: IIPPConfig){

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

        /**
         * Indicates when page is ready (both content and settings/meta are loaded)
         * @type {boolean}
         */
        public ready: boolean = false;

        /**
         * Indicates if page is decrypted.
         * @type {boolean}
         */
        public decrypted: boolean = true;

        /**
         * Indicates if page updates are on - page is requesting/receiving new updates
         * @type {boolean}
         */
        public updatesOn: boolean = true; // @todo I dont like this...

        /**
         * Mapping list of page types label - id
         * @type {IPageTypes}
         */
        public types: IPageTypes;

        /**
         * Class for page range manipulation
         * @type {IPageRangesCollection}
         */
        public Ranges: IPageRangesCollection;

        /**
         * Page content provider class
         * @type {IPageContentProvider}
         */
        public Content: IPageContentProvider;

        /**
         * Indicates if client supports websockets
         * @type {boolean}
         * @private
         */
        private _supportsWS: boolean = true; // let's be optimistic by default

        /**
         * Object that holds page data provider
         * @type {IPageProvider}
         */
        private _provider: IPageProvider;

        /**
         * Object that holds the setInterval object for requesting page access data
         * @type {number}
         */
        private _accessInterval: IPromise<any>;

        /**
         * Holds page content and page meta together
         * @type {IPage}
         */
        private _data: IPage;

        /**
         * Holds page access values
         * @type {IUserPageAccess}
         */
        private _access: IUserPageAccess;

        private _pageId: number;
        private _folderId: number;
        private _pageName: string;
        private _folderName: string;

        // Ouch... but what else can I do....
        private _contentLoaded: boolean;
        private _metaLoaded: boolean;
        private _accessLoaded: boolean;

        private _encryptionKeyPull: IEncryptionKey = {
            name: "",
            passphrase: "",
        };
        private _encryptionKeyPush: IEncryptionKey = {
            name: "",
            passphrase: "",
        };

        /**
         * Creates new page in the system
         *
         * @param folderId
         * @param name
         * @param type
         * @param template
         * @returns {IPromise<IPageService>}
         */
        public static create(folderId: number, name: string, type: number = 0, template?: IPageTemplate): IPromise<IPageService>{
            let q: IDeferred<IPageService> = $q.defer();

            if (template){
                let page: IPageService = new Page(template.id, template.domain_id);
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
                    // @todo Why ?
                    let page: IPageService = new Page(res.data.id, folderId);
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

        /**
         * Starts new page object
         *
         * @param pageId
         * @param folderId
         */
        constructor(pageId: number | string, folderId: number | string){
            super();

            // Types
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

            // Decide if client can use websockets
            this._supportsWS = "WebSocket" in window || "MozWebSocket" in window;

            // Process page and folder id/name
            this._folderId = (!isNaN(+folderId)) ? <number>folderId : undefined;
            this._pageId = (!isNaN(+pageId)) ? <number>pageId : undefined;
            this._folderName = (isNaN(+folderId)) ? <string>folderId : undefined;
            this._pageName = (isNaN(+pageId)) ? <string>pageId : undefined;

            if (!this._pageId) {
                // If we dont have page id, cannot start autopulling
                // @todo Should we emit some error to user?
                this.updatesOn = false;

                // If we get folder name and page name, first get page id from REST and then continue with sockets - fiddly, but only way around it at the moment
                this.getPageId(this._folderName, this._pageName).then((res: any) => {
                    this._pageId = res.pageId;
                    this._folderId = res.folderId;
                    this.updatesOn = true;
                    this.init();
                }, (err) => {
                    this.onPageError(err);
                });
            } else {
                this.init();
            }
        }

        /**
         * Setter for pull encryption key
         * @param key
         */
        public set encryptionKeyPull(key: IEncryptionKey){ this._encryptionKeyPull = key; }

        /**
         * Setter for push encryption key
         * @param key
         */
        public set encryptionKeyPush(key: IEncryptionKey){ this._encryptionKeyPush = key; }

        /**
         * Getter for page data
         * @returns {IPage}
         */
        public get data(): IPage{ return this._data; }

        /**
         * Getter for page access
         * @returns {IUserPageAccess}
         */
        public get access(): IUserPageAccess { return this._access; }

        /**
         * Start page updates
         */
        public start(): void{
            if (!this.updatesOn) {
                this._provider.start();
                this.updatesOn = true;
            }
        }

        /**
         * Stop page updates
         */
        public stop(): void{
            if (this.updatesOn) {
                this._provider.stop();
                this.updatesOn = false;
            }
        }

        /**
         * Push new data to a page. This method accepts either full page content or delta content update
         * @param forceFull
         * @returns {IPromise<any>}
         */
        public push(forceFull: boolean = false): IPromise<any> {
            let q: IDeferred<any> = $q.defer();

            let onSuccess: any = (data) => {
                this.Content.cleanDirty();
                this.Content.update(this.Content.getFull()); // @todo Ouch!
                // @todo this._data.content has old value
                this._data = angular.extend({}, this._data, data.data);

                if (this._provider instanceof ProviderREST){
                    this._provider.seqNo = this._data.seq_no;
                }

                this.emit(this.EVENT_NEW_CONTENT, this._data);

                q.resolve(data);
            };

            if (!this._data.encryption_type_to_use && !this._data.encryption_type_used && this.Content.canDoDelta && !forceFull){
                this.pushDelta(<IPageDelta>this.Content.getDelta()).then(onSuccess, q.reject);
            } else {
                this.pushFull(<IPageContent>this.Content.getFull()).then(onSuccess, q.reject);
            }

            return q.promise;
        }

        /**
         * Save page settings/meta
         * @param data
         * @returns {IPromise<any>}
         */
        public saveMeta(data: any): IPromise<any>{
            let q: IDeferred<any> = $q.defer();
            // Remove access rights (if any)
            delete data.access_rights;

            // Just a small condition - this seems to be left behind quite often
            if (data.encryption_type_to_use === 0){
                data.encryption_key_to_use = "";
            }

            // @todo Validation
            api.savePageSettings({
                domainId: this._folderId,
                pageId: this._pageId,
                data: data,
            }).then((res) => {
                // Apply data to current object
                this._data = angular.extend({}, this._data, res.data);
                // this.emit(this.EVENT_NEW_META, res.data); // @todo I am not sure about this...
                q.resolve(res);
            }, (err) => {
                q.reject(ipushpull.Utils.parseApiError(err, "Could not save page settings"));
            });

            return q.promise;
        }

        /**
         * Sets current page as folders default for current user
         * @returns {IPromise<IRequestResult>}
         */
        public setAsFoldersDefault(): IPromise<any>{
            let q: IDeferred<any> = $q.defer();

            let requestData: any = {
                domainId: this._folderId,
                data: {
                    default_page_id: this._pageId,
                },
            };

            api.setDomainDefault(requestData).then((res) => {
                // @todo probably not a best way to do that, but is there any other option?
                this._access.is_users_default_page = true;
                q.resolve(res);
            }, q.reject);

            return q.promise;
        }

        /**
         * Deletes current page
         * @returns {IPromise<IRequestResult>}
         */
        public del(): IPromise<any>{
            let requestData: any = {
                domainId: this._folderId,
                pageId: this._pageId,
            };

            return api.deletePage(requestData);
        }

        /**
         * Check if page is encrypted and decrypt it if it is
         * @param key
         */
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
                if (this.Content){
                    this.Content.update(this._data.content);
                } else {
                    this.Content = new PageContent(this._data.content);
                }

                // @todo Emitting Decrypted and New content events will lead to confusion. Eventually you will want to subscribe to both for rendering, so you will have double rendering
                this.emit(this.EVENT_DECRYPTED);
            }
        }

        /**
         * Destroy page object
         */
        public destroy(): void {
            if (this._provider) {
                this._provider.destroy();
            }

            $interval.cancel(this._accessInterval);
            this.removeEvent();
        }

        /**
         * Clone current page. Clones page content and some settings, can specify more options via options param
         * @param folderId
         * @param name
         * @param options
         * @returns {IPromise<IPageService>}
         */
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
            Page.create(folderId, name, this._data.special_page_type).then((newPage: IPageService) => {
                newPage.Content = this.Content;

                $q.all([
                    // @todo Page Settings
                    // Push content
                    newPage.push(true),
                ]).then((res) => {
                    q.resolve(newPage);
                }, q.reject); // @todo Handle properly
            }, (err) => {
                q.reject(err);
            });

            return q.promise;
        }

        /**
         * Actual bootstrap of the page, starts page updates, registeres provider, starts page access updates
         */
        private init(): void{
            this.Ranges = new Ranges(this._folderId, this._pageId);

            if (!this._supportsWS || typeof io === "undefined"){
                console.warn("[iPushPull] Cannot use websocket technology it is not supported or websocket library is not included. " +
                    "Make sure socket-io client is incldued or use ng-ipushpull-standalone.min.js");
            }

            // Create provider
            this._provider = (!this._supportsWS || typeof io === "undefined" || config.transport === "polling")
                ? new ProviderREST(this._pageId, this._folderId)
                : new ProviderSocket(this._pageId, this._folderId);

            // Start pulling page access
            this.getPageAccess();
            this._accessInterval = $interval(() => {
                this.getPageAccess();
            }, 30000);

            this.registerListeners();
        }

        /**
         * In case page is requested with name, get page ID from service
         * @param folderName
         * @param pageName
         * @returns {IPromise<any>}
         */
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

        /**
         * Load page access
         * @returns {IPromise<any>}
         */
        private getPageAccess(): IPromise<any>{
            let q: IDeferred<any> = $q.defer();

            api.getPageAccess({
                domainId: this._folderId,
                pageId: this._pageId,
            }).then((res: any) => {
                this._access = res.data;

                this._accessLoaded = true;
                this.checkReady(); // @todo ouch...

                // @todo this should be only emitted when access actually changes
                this.emit(this.EVENT_ACCESS_UPDATED);
                q.resolve();
            }, (err) => {
                this.onPageError(err);
                // @todo Should we emit something?
                // @todo Handle error?
                q.reject();
            });

            return q.promise;
        }

        /**
         * Register listeners. THese are listeners on events emitted from page providers, which are processed and then re-emitted to public
         */
        private registerListeners(): void{
            // Setup listeners
            this._provider.on("content_update", (data) => {
                data.special_page_type = this.updatePageType(data.special_page_type);

                this._data = angular.extend({}, this._data, data);

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

                this._data = angular.extend({}, this._data, data);

                // Process ranges
                this.Ranges.parse(data.access_rights || "[]");

                this._metaLoaded = true;
                this.checkReady();

                this.emit(this.EVENT_NEW_META, data);
            });

            this._provider.on("error", this.onPageError);
        }

        private onPageError: any = (err) => {
            err.code = err.httpCode || err.code;
            err.message = err.httpText || err.message;

            this.emit(this.EVENT_ERROR, err);

            // @todo Should not be here - cannot destroy this without user knowing about it
            if (err.code === 404){
                this.destroy();
            }
        };

        /**
         * Push full content update
         * @param content
         * @returns {IPromise<any>}
         */
        private pushFull(content: IPageContent): IPromise<any>{
            let q: IDeferred<any> = $q.defer();

            // If encrypted
            if (this._data.encryption_type_to_use) {
                if (!this._encryptionKeyPush || this._data.encryption_key_to_use !== this._encryptionKeyPush.name){
                    // @todo Proper error
                    q.reject("None or wrong encryption key");
                    return q.promise;
                }

                let encrypted: string = this.encrypt(this._encryptionKeyPush, content);

                if (encrypted) {
                    this._data.encrypted_content = encrypted;
                    this._data.encryption_type_used = 1;
                    this._data.encryption_key_used = this._encryptionKeyPush.name;

                    // Ehm...
                    this._encryptionKeyPull = angular.copy(this._encryptionKeyPush);
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
                content: (!this._data.encryption_type_used) ? this._data.content : "",
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

        /**
         * Push delta content update
         * @param data
         * @returns {IPromise<any>}
         */
        private pushDelta(data: IPageDelta): IPromise<any>{
            let q: IDeferred<any> = $q.defer();

            // @todo Handle empty data/delta

            let requestData: any = {
                domainId: this._folderId,
                pageId: this._pageId,
                data: data,
            };

            api.savePageContentDelta(requestData).then(q.resolve, q.reject);

            return q.promise;
        }

        /**
         * Check if page is considered to be ready
         */
        // @todo Not a great logic - When do we consider for a page to actually be ready?
        private checkReady(): void {
            if (this._contentLoaded && this._metaLoaded && this._accessLoaded && !this.ready){
                this.ready = true;
                this.emit(this.EVENT_READY);
            }
        }

        /**
         * Temporary fix to update page types. This will take any page report types and adds 1000 to them. This way can do easier filtering.
         * @param pageType
         * @returns {number}
         */
        private updatePageType(pageType: number): number{
            if (pageType > 0 && pageType < 5 || pageType === 7){
                pageType += 1000;
            }

            return pageType;
        }

        /**
         * Encrypt page content with given key
         * @param key
         * @param content
         * @returns {string}
         */
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

        setPermission: (userId: number, permission?: string) => void;
        getPermission: (userId: number) => string;
    }

    export interface IPageFreezingRange extends IPageRangeItem {
        subject: string;
        count: number;
    }

    export class PermissionRange implements IPagePermissionRange {
        // @todo Constants for permissions ro, no etc
        private _permissions: IPageRangeRights = {
            ro: [],
            no: [],
        };

        constructor(public name: string, public rowStart: number = 0, public rowEnd: number = 0, public colStart: number = 0, public colEnd: number = 0, permissions?: IPageRangeRights){
            if (permissions) {
                this._permissions = permissions;
            }
        }

        /**
         * Set permission for a user
         * @param userId
         * @param permission
         */
        public setPermission(userId: number, permission?: string): void {
            // First remove user rom all ranges
            if (this._permissions.ro.indexOf(userId) >= 0) {
                this._permissions.ro.splice(this._permissions.ro.indexOf(userId), 1);
            }

            if (this._permissions.no.indexOf(userId) >= 0){
                this._permissions.no.splice(this._permissions.no.indexOf(userId), 1);
            }

            if (permission){
                this._permissions[permission].push(userId);
            }
        }

        /**
         * Get permission for a user
         * @param userId
         * @returns {string}
         */
        public getPermission(userId: number): string {
            let permission: string = "";

            if (this._permissions.ro.indexOf(userId) >= 0){
                permission = "ro";
            } else if (this._permissions.no.indexOf(userId) >= 0) {
                permission = "no";
            }

            return permission;
        }

        /**
         * Serialize range to final service-accepted object
         * @returns {{name: string, start: string, end: string, rights: IPageRangeRights, freeze: boolean}}
         */
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

        /**
         * Serialize range to final service-accepted object
         * @returns {{name: string, start: string, end: string, rights: IPageRangeRights, freeze: boolean}}
         */
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

    export interface IPageRangesCollection {
        TYPE_PERMISSION_RANGE: string;
        TYPE_FREEZING_RANGE: string;
        ranges: (IPagePermissionRange|IPageFreezingRange)[];
        setRanges: (ranges: IPageRangeItem[]) => IPageRangesCollection;
        addRange: (range: IPageRangeItem) => IPageRangesCollection;
        removeRange: (rangeName: string) => IPageRangesCollection;
        save: () => IPromise<any>;
        parse: (pageAccessRights: string) => IPageRangeItem[];
    }

    class Ranges implements IPageRangesCollection {
        /**
         * List of ranges in collection
         * @type {Array}
         * @private
         */
        private _ranges: (IPagePermissionRange|IPageFreezingRange)[] = [];

        private _folderId: number;
        private _pageId: number;

        public get TYPE_PERMISSION_RANGE(): string { return "permissions"; }
        public get TYPE_FREEZING_RANGE(): string { return "freezing"; }

        /**
         * Getter for list of ranges
         * @returns {IPageRangeItem[]}
         */
        public get ranges(): (IPagePermissionRange|IPageFreezingRange)[] { return this._ranges; }

        constructor(folderId: number, pageId: number, pageAccessRights?: string){
            this._folderId = folderId;
            this._pageId = pageId;

            if (pageAccessRights){
                this.parse(pageAccessRights);
            }
        }

        /**
         * Rewrites current collection of ranges with given ranges
         * @param ranges
         * @returns {ipushpull.Ranges}
         */
        public setRanges(ranges: (IPagePermissionRange|IPageFreezingRange)[]): IPageRangesCollection {
            this._ranges = ranges;

            return this;
        }

        /**
         * Adds range to collection. Also prevents duplicate names
         * @param range
         * @returns {ipushpull.Ranges}
         */
        public addRange(range: IPagePermissionRange|IPageFreezingRange): IPageRangesCollection {
            // Only one range per freezing subject allowed
            if (range instanceof FreezingRange){
                for (let i: number = 0; i < this._ranges.length; i++){
                    if (this._ranges[i].subject === range.subject){
                        this.removeRange(this._ranges[i].name);
                        break;
                    }
                }
            }

            // Prevent duplicates
            let nameUnique: boolean = false;
            let newName: string = range.name;
            let count: number = 1;

            while (!nameUnique){
                nameUnique = true;

                for (let i: number = 0; i < this._ranges.length; i++){
                    if (this._ranges[i].name === newName){
                        nameUnique = false;
                        newName = range.name + "_" + count;
                        count++;
                    }
                }
            }

            range.name = newName;

            this._ranges.push(range);

            return this;
        }

        /**
         * Removes range from collection
         *
         * @param rangeName
         * @returns {ipushpull.Ranges}
         */
        public removeRange(rangeName: string): IPageRangesCollection {
            let index: number = -1;

            for (let i: number = 0; i < this._ranges.length; i++){
                if (this._ranges[i].name === rangeName){
                    index = i;
                    break;
                }
            }

            if (index >= 0) {
                this._ranges.splice(index, 1);
            }

            return this;
        }

        /**
         * Save ranges to a page
         * @returns {IPromise<IRequestResult>}
         */
        // @todo This is way out of scope
        public save(): IPromise<any> {
            let ranges: IPageRange[] = [];

            // Convert all ranges to objects
            for (let i: number = 0; i < this._ranges.length; i++){
                ranges.push(this._ranges[i].toObject());
            }

            let requestData: any = {
                domainId: this._folderId,
                pageId: this._pageId,
                data: {
                    access_rights: JSON.stringify(ranges),
                },
            };

            return api.savePageSettings(requestData);
        }

        /**
         * Parse range data loaded from service into range collection
         * @param pageAccessRights
         * @returns {IPageRangeItem[]}
         */
        public parse(pageAccessRights: string): IPageRangeItem[] {
            let ar: IPageRange[] = JSON.parse(pageAccessRights);

            this._ranges = [];

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
                    this._ranges.push(new PermissionRange(ar[i].name, rowStart, rowEnd, colStart, colEnd, ar[i].rights));
                }
            }

            return this._ranges;
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

        public set seqNo(seqNo: number) { this._seqNo = seqNo; };

        constructor(private _pageId?: number, private _folderId?: number){
            super();

            this.start();
        }

        /**
         * Start polling for page updates
         */
        public start(): void {
            this._stopped = false;
            this.startPolling();
        }

        /**
         * Stop polling for page updates
         */
        public stop(): void {
            this._stopped = true;
            $timeout.cancel(this._timer);
        }

        /**
         * Stop polling for page updates and stop all events
         */
        public destroy(): void {
            this.stop();
            this.removeEvent();
        }

        /**
         * Start the actual polling (loop)
         */
        // @todo Not great
        private startPolling(): void {
            this.load();

            this._timer = $timeout(() => {
                this.startPolling();
            }, this._timeout);
        }

        /**
         * Load page data from service
         * @param ignoreSeqNo
         * @returns {IPromise<IPage>}
         */
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
                        this._timeout = res.data.pull_interval * 1000;
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

        constructor(private _pageId?: number, private _folderId?: number){
            super();

            this.start();

            // Because socket is disconnected on lost access, we need to reconnect it
            auth.on(auth.EVENT_LOGIN_REFRESHED, this.onAuthRefresh);
        }

        /**
         * Start listening for content updates. If socket not connected yet, it will initialize the socket connection
         */
        public start(): void {
            if (!this._socket || !this._socket.connected){
                this.init();
            } else {
                this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_CONTENT, this.onPageContent);
            }
        }

        /**
         * Stop receiving page content updates (still keeps receiving settings/meta updates and other events)
         * This will NOT disconnect the socket, merely it will just stop listening for updates - throws them away
         */
        public stop(): void {
            // this._socket.disconnect();
            this._socket.off(ProviderSocket.SOCKET_EVENT_PAGE_CONTENT, this.onPageContent);

            this._stopped = true;
        }

        /**
         * Remove listeners for all socket events, disconnects socket and destroys object
         */
        public destroy(): void {
            this._socket.removeAllListeners();
            this._socket.disconnect();
            this.stop();
            auth.off(auth.EVENT_LOGIN_REFRESHED, this.onAuthRefresh);
            this.removeEvent(); // @todo this means that listeners will be still registered even though none are gonna get triggered - memory leak?
        }

        /**
         * Initialize socket connection with all listeners
         */
        private init(): void {
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
            this._socket.on("disconnect", this.onDisconnect);

            this._stopped = false;
        }

        /**
         * Connect socket to a server. If client doesnt support websockets, it tries to fall back to long polling
         * @returns {SocketIOClient.Socket}
         */
        private connect(): Socket {
            let query: string[] = [
                `access_token=${storage.persistent.get("access_token")}`,
            ];

            query = query.filter((val: string) => {
                return (val.length > 0);
            });

            return io.connect(`${config.ws_url}/page/${this._pageId}`, {
                query: query.join("&"),
                transports: (this.supportsWebSockets()) ? ["websocket"] : ["polling"],
                forceNew: true,
            });
        }

        /**
         * onConnect event action
         */
        private onConnect: any = () => {
            return;
        };

        /**
         * onDisconnect event action
         */
        private onDisconnect: any = () => {
            return;
        };

        /**
         * onPageContent eent action
         * @param data
         */
        private onPageContent = (data: IPageServiceContent): void => {
            $timeout(() => {
                this.emit("content_update", data);
            });
        };

        /**
         * onPageSettings event action
         * @param data
         */
        private onPageSettings = (data: IPageServiceMeta): void => {
            $timeout(() => {
                this.emit("meta_update", data);
            });
        };

        /**
         * onPageError event action
         * @param data
         */
        private onPageError = (data: any): void => {
            $timeout(() => {
                if (data.code === 401){
                    // @todo This is wrong
                    auth.emit(auth.EVENT_401);
                } else {
                    this.emit("error", data);
                }
            });
        };

        /**
         * onOAuthError event action
         * @param data
         */
        private onOAuthError = (data: any): void => {
            // @todo Do something

            // @todo should we watch auth service for re-logged and re-connect?

            // @todo Emit page error ?
        };

        /**
         * onAuthRefresh event action
         */
        private onAuthRefresh = (): void => {
            let dummy: number = this._pageId; // This is here just to make the callback different, otherwise event emitter prevents duplicates
            this.start();
        };

        /**
         * Determines if client supports websockets
         * @returns {boolean}
         */
        private supportsWebSockets = () => { return "WebSocket" in window || "MozWebSocket" in window; };
    }
}
