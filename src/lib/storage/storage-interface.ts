interface StorageInterface {
    get<T>(key: string): T;
    set(key: string, value: any): boolean;
    remove(key: string): boolean;
}

export default StorageInterface;
export {StorageInterface};
