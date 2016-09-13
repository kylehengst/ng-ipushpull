// @note: This service requires FORGE library that is loaded in index. It WON"T work without it
namespace ipushpull {
    "use strict";

    export interface IEncryptionKey {
        name: string;
        passphrase: string;
    }

    export interface ICryptoService {
        decryptContent: (key: any, data: string) => IPageContent;
        encryptContent: (key: IEncryptionKey, data: IPageContent) => string;
    }

    class Crypto implements ICryptoService {
        public static _instance(): Crypto {
            return new Crypto();
        }

        /**
         * Decrypt page content using encryption key and encrypted string
         *
         * @param key
         * @param data
         * @returns {any}
         */
        public decryptContent(key: any, data: string): IPageContent {
            if (!data) return undefined;

            let rawData: string = forge.util.decode64(data);
            let iv: string = rawData.substring(0,16);
            let cleanData: string = rawData.substring(16);

            cleanData = forge.util.createBuffer(cleanData, "latin1");
            iv = forge.util.createBuffer(iv, "latin1");

            let decipher: any = forge.cipher.createDecipher("AES-CBC", this.hashPassphrase(key.passphrase));
            decipher.start({iv: iv});
            decipher.update(cleanData);
            let pass: boolean = decipher.finish();

            let decrypted: IPageContent;

            try{
                decrypted = JSON.parse(decipher.output.toString());
            } catch(e){
                decrypted = undefined;
            }

            return decrypted;
        }

        /**
         * Encrypt raw page content with supplied encryption key
         *
         * @param key
         * @param data
         * @returns {any}
         */
        public encryptContent (key: IEncryptionKey, data: IPageContent): string {
            let readyData: string = JSON.stringify(data); // Stringify JS object data

            let hash: string = this.hashPassphrase(key.passphrase);
            let iv: string = forge.random.getBytesSync(16);

            let cipher: any = forge.cipher.createCipher("AES-CBC", hash);
            cipher.start({iv:iv});
            cipher.update(forge.util.createBuffer(readyData,"utf8"));
            cipher.finish();

            let encrypted: any = cipher.output;

            let buffer: any = forge.util.createBuffer();

            buffer.putBytes(iv);
            buffer.putBytes(encrypted.bytes());

            let output: any = buffer.getBytes();

            return forge.util.encode64(output);
        }

        /**
         * Use forge library"s util to hash passphrase
         *
         * @param passphrase
         * @returns {any}
         */
        private hashPassphrase(passphrase: string): string {
            let md: any = forge.md.sha256.create();
            md.update(passphrase);
            return md.digest().bytes();
        }
    }

    ipushpull.module.factory("ippCryptoService", Crypto._instance);
}
