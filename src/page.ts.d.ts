declare namespace ipushpull {
    import IPromise = angular.IPromise;
    import IEventEmitter = Wolfy87EventEmitter.EventEmitter;
    interface IPageTypes {
        regular: number;
        pageAccessReport: number;
        domainUsageReport: number;
        globalUsageReport: number;
        pageUpdateReport: number;
        alert: number;
        pdf: number;
        liveUsage: number;
    }
    interface IPageServiceContent {
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
    interface IPageServiceMeta {
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
    interface IPage extends IPageServiceMeta {
    }
    interface IPageRangeRights {
        ro: number[];
        no: number[];
    }
    interface IPageRange {
        name: string;
        start: string;
        end: string;
        rights: IPageRangeRights;
        freeze: boolean;
    }
    interface IUserPageDomainCurrentUserAccess {
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
    interface IUserPageDomainAccess {
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
    interface IUserPageAccess {
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
    interface IPageTemplate {
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
    interface IPageCloneOptions {
        clone_ranges?: boolean;
    }
    interface IPageService extends IEventEmitter {
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
declare namespace ipushpull {
    import IPromise = angular.IPromise;
    interface IPageRangeItem {
        name: string;
        toObject: () => IPageRange;
    }
    interface IPagePermissionRange extends IPageRangeItem {
        rowStart: number;
        rowEnd: number;
        colStart: number;
        colEnd: number;
        setPermission: (userId: number, permission?: string) => void;
        getPermission: (userId: number) => string;
    }
    interface IPageFreezingRange extends IPageRangeItem {
        subject: string;
        count: number;
    }
    class PermissionRange implements IPagePermissionRange {
        name: string;
        rowStart: number;
        rowEnd: number;
        colStart: number;
        colEnd: number;
        private _permissions;
        constructor(name: string, rowStart?: number, rowEnd?: number, colStart?: number, colEnd?: number, permissions?: IPageRangeRights);
        setPermission(userId: number, permission?: string): void;
        getPermission(userId: number): string;
        toObject(): IPageRange;
    }
    type TFreezeSubject = "rows" | "cols";
    class FreezingRange implements IPageRangeItem {
        name: string;
        subject: TFreezeSubject;
        count: number;
        static SUBJECT_ROWS: string;
        static SUBJECT_COLUMNS: string;
        constructor(name: string, subject?: TFreezeSubject, count?: number);
        toObject(): IPageRange;
    }
    interface IPageRangesCollection {
        TYPE_PERMISSION_RANGE: string;
        TYPE_FREEZING_RANGE: string;
        ranges: (IPagePermissionRange | IPageFreezingRange)[];
        setRanges: (ranges: IPageRangeItem[]) => IPageRangesCollection;
        addRange: (range: IPageRangeItem) => IPageRangesCollection;
        removeRange: (rangeName: string) => IPageRangesCollection;
        save: () => IPromise<any>;
        parse: (pageAccessRights: string) => IPageRangeItem[];
    }
}
