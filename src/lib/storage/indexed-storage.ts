import {StorageInterface} from './storage-interface';

class IndexedStorage<T> implements StorageInterface<T> {
    _db = null;
    dbName;
    dbVerson;
    storageName;

    constructor() {
        this.dbName = 'valtech';
        this.dbVerson = 1;
        this.storageName = 'valtech';
    }

    get db() {
        if (this._db === null) {
            return this.open();
        } else {
            return Promise.resolve<any>(this._db);
        }
    };

    open(): Promise<any> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVerson);
            request.onupgradeneeded = (event: any) => {
                const db = event.target.result;

                event.target.transaction.onerror = reject;

                if (db.objectStoreNames.contains(this.storageName)) {
                    db.deleteObjectStore(this.storageName);
                }

                db.createObjectStore(this.storageName, {keyPath: 'key'});
            };

            request.onsuccess = (event: any) => {
                this._db = event.target.result;
                resolve(this._db);
            };

            request.onerror = reject;
        });

    }

    set(key: string, value: T): Promise<any> {
        return this.db
            .then(db => db.transaction([this.dbName], 'readwrite').objectStore(this.storageName))
            .then(store => {
                return new Promise((resolve, reject) => {
                    const request = store.put({key, value});
                    request.onerror = reject;
                    request.onsuccess = resolve;
                });
            });
    }

    remove(key: string): Promise<any> {
        return this.db
            .then(db => db.transaction([this.dbName], 'readwrite').objectStore(this.storageName))
            .then(store => {
                return new Promise((resolve, reject) => {
                    const request = store.delete(key);
                    request.onerror = reject;
                    request.onsuccess = resolve;
                });
            });
    }

    get(key: string): Promise<T> {
        return this.db
            .then(db => db.transaction([this.dbName], 'readwrite').objectStore(this.storageName))
            .then(store => {
                return new Promise((resolve, reject) => {
                    const request = store.get(key);
                    request.onerror = reject;
                    request.onsuccess = () => {
                        if (request.result) {
                            resolve(request.result.value);
                        } else {
                            resolve(undefined);
                        }
                    };
                });
            });
    }

}

export default IndexedStorage;
export {IndexedStorage};
