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
        value: string | number;
        formatted_value: string | number;
        link?: IPageContentLink;
        style?: IPageCellStyle;
    }
    interface IPageContent {
        [index: number]: IPageContentCell[];
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
    interface IPageService {
        ready: boolean;
        decrypted: boolean;
        passphrase: string;
        data: any;
        start: () => void;
        stop: () => void;
        push: () => void;
        destroy: () => void;
    }
}
