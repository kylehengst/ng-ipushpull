declare namespace ipushpull {
    import IPromise = angular.IPromise;
    interface IAuthService {
        token: string;
        login: (username: string, password: string) => IPromise<any>;
        refreshTokens: () => IPromise<any>;
    }
}
