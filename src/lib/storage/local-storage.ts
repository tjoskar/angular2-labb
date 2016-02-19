import {StorageInterface} from './storage-interface';

const PREFIX = 'valtech_';

class LocalStorage<T> implements StorageInterface<T> {

    get(key: string): Promise<T | void> {
        const data = localStorage.getItem(PREFIX + key);
        if (data === undefined) {
            return Promise.resolve(undefined);
        }

        try {
            return Promise.resolve(JSON.parse(data));
        } catch (error) {
            console.warn(error);
            this.remove(key);
            return Promise.reject(error);
        }
    }

    set(key: string, value: T): Promise<void> {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
        return Promise.resolve();
    }

    remove(key: string): Promise<void> {
        localStorage.removeItem(key);
        return Promise.resolve();
    }

    __clearAll() {
        localStorage.clear();
    }

}

export default LocalStorage;
export {LocalStorage};
