declare namespace ipushpull {
    interface IStorageProvider {
        prefix: string;
        suffix: string;
        create: (key: string, value: string, expireDays?: number) => void;
        save: (key: string, value: string, expireDays?: number) => void;
        get: (key: string, defaultValue?: any) => any;
        remove: (key: string) => void;
    }
    interface IStorageService {
        user: IStorageProvider;
        global: IStorageProvider;
        persistent: IStorageProvider;
    }
}
