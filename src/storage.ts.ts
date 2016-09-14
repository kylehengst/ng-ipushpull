/**
 *
 * @todo Add expire field to cookie provider
 * @todo Provider names as constants
 */

namespace ipushpull {
    "use strict";

    // @todo In progress....
    /*interface IStorageProvider {
        create: (key: string, value: string) => void;
        get: (key: string, defaultValue: any) => string;
        remove: (key: string) => void;
        global: () => void;
    }

    interface ICookieProvider extends IStorageProvider {
        expire: (days: number) => void;
    }

    class StorageProvider{
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
    }

    class Cookies extends StorageProvider implements ICookieProvider {
        private _domain: string;
        private _expire: number;

        constructor(){
            super();

            // @todo There is pretty much no way to generalize this....
            this._domain = document.domain.replace(/(www)|(test)|(stable)/, "");
        }

        public expire(days: number): IStorageProvider {
            this._expire = days;
            return this;
        }

        public create(key: string, value: string): void {
            let expires: string = "";

            if (this._expire) {
                let date: Date = new Date();
                date.setTime(date.getTime() + (this._expire * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }

            document.cookie = `${this.makeKey(key)}=${value}${expires}; path=/; domain=${this._domain}${(this.isSecure() ? ";secure;" : "")}`;
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
                    return c.substring(nameEQ.length, c.length);
                }
            }

            return;
        }

        public remove(key: string): void {
            new Cookies().expire(-1).create(this.makeKey(key), "");
        }

        private isSecure(): boolean{
            return window.location.protocol === "https:";
        }
    }

    class LocalStorage extends StorageProvider implements IStorageProvider {
        public create(key: string, value: string): void {
            localStorage.setItem(this.makeKey(key), value);
        }

        public get(key: string, defaultValue: any): string {
            return localStorage.getItem(this.makeKey(key));
        }

        public remove(key: string): void {
            localStorage.removeItem(this.makeKey(key));
        }
    }

    class Memory extends StorageProvider implements IStorageProvider {
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
    }

    export interface IStorageService {
        any: () => IStorageProvider;
        cookie: () => IStorageProvider;
        local: () => IStorageProvider;
        memory: () => IStorageProvider;
    }

    class StorageService implements IStorageService {
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

    export interface IStorageService {
        create: (key: string, value: string) => void;
        get: (key: string, defaultValue: any) => string;
        remove: (key: string) => void;
    }

    class LocalStorage {
        // public static $inject: string[] = [];

        public prefix: string = "ipp";
        public suffix: string;

        public create(key: string, value: string): void {
            localStorage.setItem(this.makeKey(key), value);
        }

        public get(key: string, defaultValue: any): string {
            return localStorage.getItem(this.makeKey(key));
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
    }

    ipushpull.module.service("ippUserStorageService", ["ippAuthService", (ippAuth: IAuthService) => {
        let storage =  new LocalStorage();
        storage.suffix = "GUEST";

        ippAuth.on("logged_in", () => {
            storage.suffix = `${ippAuth.user.id}`;
        });

        return storage;
    }]);

    ipushpull.module.service("ippGlobalStorageService", [() => {
        return new LocalStorage();
    }]);
}
