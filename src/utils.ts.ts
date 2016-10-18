namespace ipushpull {
    "use strict";

    export interface IUtils {
        parseApiError: (err: any, def: string) => string;
        clonePageContent: (content: IPageContent) => IPageContent;
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

        public clonePageContent(content: IPageContent): IPageContent {
            let copy: IPageContent = [];
            for (let i: number = 0; i < content.length; i++){
                copy.push([]);
                for (let j: number = 0; j < content[i].length; j++){
                    let vals: IPageContentCell = {};

                    // @todo: styles are still probably copied with refernce, but its nothing to worry about much
                    for (let k in content[i][j]){
                        if (!content[i][j].hasOwnProperty(k)){
                            continue;
                        }

                        vals[k] = content[i][j][k];
                    }

                    copy[i].push(vals);
                }
            }

            return copy;
        }
    }

    export let Utils: IUtils = new UtilsProvider();
}
