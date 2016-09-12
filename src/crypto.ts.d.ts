declare namespace ipushpull {
    interface IEncryptionKey {
        name: string;
        passphrase: string;
    }
    interface ICryptoService {
        decryptContent: (key: any, data: string) => IPageContent;
        encryptContent: (key: IEncryptionKey, data: IPageContent) => string;
    }
}
