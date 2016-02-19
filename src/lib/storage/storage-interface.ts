interface StorageInterface<T> {
    get(key: string): Promise<T | void>;
    set(key: string, value: T): Promise<any>;
    remove(key: string): Promise<any>;
}

export default StorageInterface;
export {StorageInterface};
