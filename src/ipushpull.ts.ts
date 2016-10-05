namespace ipushpull {
    "use strict";

    import IModule = angular.IModule;

    export interface IIPPConfig {
        api_url?: string;
        ws_url?: string;
        api_key: string;
        api_secret: string;
        transport?: string;
        storage_prefix?: string;
    }

    export const module: IModule = angular.module("ipushpull", []);

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

    module.factory("ippConfig", ["ipushpull_conf", (cfg: IIPPConfig) => {
        let defaults: any = {
            api_url: "https://www.ipushpull.com/api/1.0",
            ws_url: "https://www.ipushpull.com",
        };

        // @todo Still not correct - do this better
        if (cfg.api_url && !cfg.ws_url){
            let parts: string[] = cfg.api_url.split("/");
            defaults.ws_url = parts[0] + "//" + parts[2];
        }

        return angular.merge({}, defaults, cfg);
    }]);
}
