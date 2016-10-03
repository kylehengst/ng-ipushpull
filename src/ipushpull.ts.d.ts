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
