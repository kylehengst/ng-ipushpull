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
}
