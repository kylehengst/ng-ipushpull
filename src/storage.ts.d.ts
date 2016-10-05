declare namespace ipushpull {
    interface IStorageService {
        prefix: string;
        suffix: string;
        create: (key: string, value: string, expireDays?: number) => void;
        save: (key: string, value: string, expireDays?: number) => void;
        get: (key: string, defaultValue?: any) => any;
        remove: (key: string) => void;
    }
}
