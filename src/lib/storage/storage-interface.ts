interface StorageInterface {
    get<T>(key: string): T;
    set(key: string, value: any): void;
    remove(key: string): void;
}

export default StorageInterface;
export {StorageInterface};
