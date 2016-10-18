declare namespace ipushpull {
    interface IUtils {
        parseApiError: (err: any, def: string) => string;
        clonePageContent: (content: IPageContent) => IPageContent;
    }
    let Utils: IUtils;
}
