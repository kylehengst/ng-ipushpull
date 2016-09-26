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
