/**
 * Todos
 * @todo Well... overall better/proper implementation
 */

namespace ipushpull {
    "use strict";

    // @todo In progress....
    /*interface IStorageProvider {
        create: (key: string, value: string) => void;
        get: (key: string, defaultValue: any) => string;
        remove: (key: string) => void;
        global: () => void;
    }*/

    /*interface ICookieProvider extends IStorageProvider {
        expire: (days: number) => void;
    }*/

    /*class StorageProvider{
        private _prefix: string = "ipp_";
        private _suffix: string = "GUEST";

        public global(){
            this._suffix = "";
            return this;
        }
        public user(userId: number){
            this._suffix = "" + userId;
            return this;
        }

        public makeKey(key: string): string{
            if (key.indexOf(this._prefix) !== 0) {
                key = this._prefix + key;
            }

            return `${key}_${this._suffix}`;
        }
    }*/

    /*class LocalStorage extends StorageProvider implements IStorageProvider {
        public create(key: string, value: string): void {
            localStorage.setItem(this.makeKey(key), value);
        }

        public get(key: string, defaultValue: any): string {
            return localStorage.getItem(this.makeKey(key));
        }

        public remove(key: string): void {
            localStorage.removeItem(this.makeKey(key));
        }
    }*/

    /*class Memory extends StorageProvider implements IStorageProvider {
        private _storage: any = {};

        public create(key: string, value: string): void {
            this._storage[this.makeKey(key)] = value;
        }

        public get(key: string, defaultValue: any): string {
            return this._storage[this.makeKey(key)] || undefined;
        }

        public remove(key: string): void {
            delete this._storage[this.makeKey(key)];
        }
    }*/

    /*export interface IStorageProvider {
        any: () => IStorageProvider;
        cookie: () => IStorageProvider;
        local: () => IStorageProvider;
        memory: () => IStorageProvider;
    }*/

    /*class StorageService implements IStorageProvider {
        public static $inject: string[] = [];

        constructor(){
            // auth = ippAuth;
        }

        // @todo Bleh!
        public any(): IStorageProvider {
            let hasLocalStorage: any = (): boolean => {
                try{
                    localStorage.setItem("ipp_test", "1");
                    localStorage.removeItem("ipp_test");
                    return true;
                } catch (e){
                    return false;
                }
            };

            // Priority of storage: 1. Local, 2. Cookie, 3. Memory
            if (!hasLocalStorage()){
                if (!navigator.cookieEnabled){
                    return new Memory();
                } else {
                    return new Cookies();
                }
            } else {
                return new LocalStorage();
            }
        }

        public cookie(): ICookieProvider{
            return new Cookies();
        }

        public local(): IStorageProvider{
            return new LocalStorage();
        }

        public memory(): IStorageProvider{
            return new Memory();
        }
    }*/

    export interface IStorageProvider {
        prefix: string;
        suffix: string;

        create: (key: string, value: string, expireDays?: number) => void;
        save: (key: string, value: string, expireDays?: number) => void;
        get: (key: string, defaultValue?: any) => any;
        remove: (key: string) => void;
    }

    class LocalStorage implements IStorageProvider{
        public prefix: string = "ipp";
        public suffix: string;

        public create(key: string, value: string): void {
            localStorage.setItem(this.makeKey(key), value);
        }

        // Alias
        public save(key: string, value: string): void {
            return this.create(key, value);
        }

        public get(key: string, defaultValue: any = null): string {
            let val: any = localStorage.getItem(this.makeKey(key));

            if (!val){
                return defaultValue;
            }

            if (this.isValidJSON(val)){
                return JSON.parse(val);
            } else {
                return val;
            }
        }

        public remove(key: string): void {
            localStorage.removeItem(this.makeKey(key));
        }

        private makeKey(key: string): string{
            if (this.prefix && key.indexOf(this.prefix) !== 0) {
                key = `${this.prefix}_${key}`;
            }
            
            if (this.suffix) {
                key = `${key}_${this.suffix}`;
            }

            return key;
        }

        private isValidJSON(val: any): boolean{
            try{
                let json: any = JSON.parse(val);
                return true;
            } catch (e){
                return false;
            }
        }
    }

    class CookieStorage implements IStorageProvider {
        public prefix: string = "ipp";
        public suffix: string;

        private _domain: string;

        constructor(){
            // @todo There is pretty much no way to generalize this.... - Really?
            this._domain = document.domain.replace(/(www)|(test)|(stable)/, "");
        }

        public create(key: string, value: string, expireDays?: number): void {
            let expires: string = "";

            if (expireDays) {
                let date: Date = new Date();
                date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }

            document.cookie = `${this.makeKey(key)}=${value}${expires}; path=/; domain=${this._domain}${(this.isSecure() ? ";secure;" : "")}`;
        }

        public save(key: string, value: string, expireDays?: number): void{
            this.create(key, value, expireDays);
        }

        public get(key: string, defaultValue: any): string {
            key = this.makeKey(key);

            let nameEQ: string = key + "=";
            let ca: string[] = document.cookie.split(";");

            for (let i: number = 0; i < ca.length; i++) {
                let c: string = ca[i];
                while (c.charAt(0) === " "){
                    c = c.substring(1, c.length);
                }

                if (c.indexOf(nameEQ) === 0){
                    let val: string = c.substring(nameEQ.length, c.length);

                    if (this.isValidJSON(val)){
                        return JSON.parse(val);
                    } else {
                        return val;
                    }
                }
            }

            return;
        }

        public remove(key: string): void {
            this.create(this.makeKey(key), "", -1);
        }

        private isSecure(): boolean{
            return window.location.protocol === "https:";
        }

        private makeKey(key: string): string{
            if (this.prefix && key.indexOf(this.prefix) !== 0) {
                key = `${this.prefix}_${key}`;
            }

            if (this.suffix) {
                key = `${key}_${this.suffix}`;
            }

            return key;
        }

        private isValidJSON(val: any): boolean{
            try{
                let json: any = JSON.parse(val);
                return true;
            } catch (e){
                return false;
            }
        }
    }

    export interface IStorageService {
        user: IStorageProvider;
        global: IStorageProvider;
        persistent: IStorageProvider;
    }

    class StorageService {
        public static $inject: string[] = ["ippConfig"];

        public constructor(ippConfig: IIPPConfig){
            // User Storage
            let userStorage: IStorageProvider = new LocalStorage();
            userStorage.suffix = "GUEST";

            // Global storage
            let globalStorage: IStorageProvider = new LocalStorage();

            // Persistent storage
            // @todo Should log some warning at least
            let persistentStorage: IStorageProvider = (navigator.cookieEnabled) ? new CookieStorage() : new LocalStorage();

            if (ippConfig.storage_prefix){
                userStorage.prefix = ippConfig.storage_prefix;
                globalStorage.prefix = ippConfig.storage_prefix;
                persistentStorage.prefix = ippConfig.storage_prefix;
            }

            return {
                user: userStorage,
                global: globalStorage,
                persistent: persistentStorage,
            };
        }
    }

    // @Todo This is NOT ideal (user should not be aware of persistent or not persistent - should be automatic)
    ipushpull.module.factory("ippStorageService", StorageService);
}
