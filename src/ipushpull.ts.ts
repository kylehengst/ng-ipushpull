namespace ipushpull {
    "use strict";

    import IModule = angular.IModule;
    import IProvideService = angular.auto.IProvideService;

    export interface IIPPConfig {
        api_url?: string;
        ws_url?: string;
        api_key: string;
        api_secret: string;
        transport?: string;
        storage_prefix?: string;
    }

    class ConfigProvider {
        private _config: IIPPConfig;
        
        public set(config: IIPPConfig): void {
            let defaults: any = {
                api_url: "https://www.ipushpull.com/api/1.0",
                ws_url: "https://www.ipushpull.com",
            };

            if (config.api_url && !config.ws_url){
                let parts: string[] = config.api_url.split("/");
                defaults.ws_url = parts[0] + "//" + parts[2];
            }

            this._config = angular.merge({}, defaults, config);
        }

        public $get(): IIPPConfig {
            return this._config;
        }
    }

    export const module: IModule = angular.module("ipushpull", [])
        .provider("ippConfig", ConfigProvider);

    // @todo do this
    /*module.run(["$rootScope", "Cookie", "ippGlobalStorageService", ($rootScope, Cookie, globalStorage) => {
        // Check if we have already uui stored
        let uuid: String = globalStorage.get(ipp.config.cookie.uuid);

        if (!uuid){
            uuid = ipp.utils.generateUUID();
            globalStorage.create(ipp.config.cookie.uuid, uuid);
        }

        $rootScope.uuid = uuid;
    }]);*/
}
