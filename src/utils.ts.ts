namespace ipushpull {
    "use strict";

    export class Utils {
        public static parseApiError(err: any, def: string): string {
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
}
