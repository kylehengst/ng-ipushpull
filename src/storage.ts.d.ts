declare namespace ipushpull {
    interface IStorageService {
        create: (key: string, value: string) => void;
        get: (key: string, defaultValue: any) => string;
        remove: (key: string) => void;
    }
}
