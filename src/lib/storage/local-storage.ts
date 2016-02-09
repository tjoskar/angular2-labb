import {StorageInterface} from './storage-interface';

const PREFIX = 'valtech_';

class LocalStorage implements StorageInterface {

    get<T>(key: string): T {
        const data = localStorage.getItem(PREFIX + key);
        if (data === undefined) {
            return undefined;
        }

        try {
            return JSON.parse(data);
        } catch (e) {
            console.warn(e);
            this.remove(key);
        }
    }

    set(key: string, value: any): boolean {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
        return true;
    }

    remove(key: string): boolean {
        localStorage.removeItem(key);
        return true;
    }

}

export default LocalStorage;
export {LocalStorage};
