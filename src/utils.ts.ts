namespace ipushpull {
    "use strict";

    export interface IUtils {
        parseApiError: (err: any, def: string) => string;
    }

    class UtilsProvider implements IUtils {
        public parseApiError(err: any, def: string): string {
            let msg: string = def;

            if (err.data){
                let keys: string[] = Object.keys(err.data);
                if (keys.length){
                    if (angular.isArray(err.data[keys[0]])){
                        msg = err.data[keys[0]][0];
                    } else if (typeof err.data[keys[0]] === "string"){
                        msg = err.data[keys[0]];
                    } else {
                        msg = def;
                    }

                } else {
                    msg = def;
                }
            } else {
                msg = def;
            }

            return msg;
        }
    }

    export let Utils: IUtils = new UtilsProvider();
}
