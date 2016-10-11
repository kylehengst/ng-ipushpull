declare namespace ipushpull {
    interface IUtils {
        parseApiError: (err: any, def: string) => string;
    }
    let Utils: IUtils;
}
