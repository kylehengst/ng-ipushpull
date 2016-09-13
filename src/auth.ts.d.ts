declare namespace ipushpull {
    import IPromise = angular.IPromise;
    interface IAuthService {
        user: IUserSelf;
        authenticate: () => IPromise<any>;
        login: (username: string, password: string) => IPromise<any>;
        refreshTokens: () => IPromise<any>;
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
