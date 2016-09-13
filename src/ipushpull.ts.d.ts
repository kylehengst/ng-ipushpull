declare namespace ipushpull {
    import IModule = angular.IModule;
    interface IIPPConfig {
        url?: string;
        api_key: string;
        api_secret: string;
        transport?: string;
    }
    const module: IModule;
}
