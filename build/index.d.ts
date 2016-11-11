declare namespace ipushpull {
    import IPromise = angular.IPromise;
    interface IRequestResult {
        success: boolean;
        data: any;
        httpCode: number;
        httpText: string;
    }
    interface IApiService {
        block: () => void;
        unblock: () => void;
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
}

declare namespace ipushpull {
    import IPromise = angular.IPromise;
    import IEventEmitter = Wolfy87EventEmitter.EventEmitter;
    interface IAuthService extends IEventEmitter {
        EVENT_LOGGED_IN: string;
        EVENT_RE_LOGGING: string;
        EVENT_LOGIN_REFRESHED: string;
        EVENT_LOGGED_OUT: string;
        EVENT_ERROR: string;
        EVENT_401: string;
        EVENT_USER_UPDATED: string;
        user: IUserSelf;
        authenticate: (force?: boolean) => IPromise<any>;
        login: (username: string, password: string) => IPromise<any>;
        logout: () => void;
    }
    interface IUserSelf {
        id: number;
        url: string;
        email: string;
        screen_name: string;
        first_name: string;
        last_name: string;
        mobile_phone_number: string;
        pushbullet_id: string;
        default_domain_id: number;
        default_page_id: number;
        default_domain_name: string;
        default_page_name: string;
        pending_invitation_count: number;
        can_create_folders: boolean;
        meta_data: any[];
    }
}

declare namespace ipushpull {
    interface IEncryptionKey {
        name: string;
        passphrase: string;
    }
    interface ICryptoService {
        decryptContent: (key: any, data: string) => IPageContent;
        encryptContent: (key: IEncryptionKey, data: IPageContent) => string;
    }
}

declare namespace ipushpull {
    import IModule = angular.IModule;
    interface IIPPConfig {
        api_url?: string;
        ws_url?: string;
        api_key: string;
        api_secret: string;
        transport?: string;
        storage_prefix?: string;
    }
    const module: IModule;
}

declare namespace ipushpull {
    interface IPageContentLink {
        external: boolean;
        address: string;
    }
    interface IPageCellStyle {
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
    interface IPageContentCell {
        value: string;
        formatted_value?: string;
        link?: IPageContentLink;
        style?: IPageCellStyle;
        dirty?: boolean;
    }
    interface IPageContent extends Array<any> {
        [index: number]: IPageContentCell[];
    }
    interface IPageDeltaContentCol {
        col_index: number;
        cell_content: IPageContentCell;
    }
    interface IPageDeltaContentRow {
        row_index: number;
        cols: IPageDeltaContentCol[];
    }
    interface IPageDelta {
        new_rows: number[];
        new_cols: number[];
        content_delta: IPageDeltaContentRow[];
    }
}
declare namespace ipushpull {
    interface IPageContentProvider {
        canDoDelta: boolean;
        update: (rawContent: IPageContent) => void;
        reset: () => void;
        getCell: (rowIndex: number, columnIndex: number) => IPageContentCell;
        updateCell: (rowIndex: number, columnIndex: number, data: IPageContentCell) => void;
        addRow: () => void;
        addColumn: () => void;
        removeRow: () => void;
        removeColumn: () => void;
        getDelta: () => IPageDelta;
        getFull: () => IPageContent;
        cleanDirty: () => void;
    }
    class PageContent implements IPageContentProvider {
        canDoDelta: boolean;
        private _original;
        private _current;
        private _newRows;
        private _newCols;
        current: IPageContent;
        constructor(rawContent: IPageContent);
        update(rawContent: IPageContent): void;
        reset(): void;
        getCell(rowIndex: number, columnIndex: number): IPageContentCell;
        updateCell(rowIndex: number, columnIndex: number, data: IPageContentCell): void;
        addRow(index?: number): IPageContentCell[];
        addColumn(index?: number): void;
        removeRow(): void;
        removeColumn(): void;
        getDelta(): IPageDelta;
        getFull(): IPageContent;
        cleanDirty(): void;
    }
}

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

declare namespace ipushpull {
    interface IStorageProvider {
        prefix: string;
        suffix: string;
        create: (key: string, value: string, expireDays?: number) => void;
        save: (key: string, value: string, expireDays?: number) => void;
        get: (key: string, defaultValue?: any) => any;
        remove: (key: string) => void;
    }
    interface IStorageService {
        user: IStorageProvider;
        global: IStorageProvider;
        persistent: IStorageProvider;
    }
}

declare namespace ipushpull {
    interface IUtils {
        parseApiError: (err: any, def: string) => string;
        clonePageContent: (content: IPageContent) => IPageContent;
    }
    let Utils: IUtils;
}
