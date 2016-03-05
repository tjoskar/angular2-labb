interface Storage<T> {
    get(key: string): Promise<T | void>;
    set(key: string, value: T): Promise<any>;
    remove(key: string): Promise<any>;
}

export default Storage;
export { Storage };
