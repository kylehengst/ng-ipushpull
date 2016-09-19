declare namespace ipushpull {
    interface IStorageService {
        create: (key: string, value: string) => void;
        save: (key: string, value: string) => void;
        get: (key: string, defaultValue?: any) => any;
        remove: (key: string) => void;
    }
}
