namespace ipushpull {
    "use strict";

    import IModule = angular.IModule;

    export interface IIPPConfig {
        url?: string;
        api_key: string;
        api_secret: string;
        transport?: string;
    }

    export const module: IModule = angular.module("ipushpull", []);
}
