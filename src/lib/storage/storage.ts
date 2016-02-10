import {StorageInterface} from './storage-interface';

class Storage implements StorageInterface {

    constructor() {
        throw new Error('Cannot create an instance of the abstract class Storage');
    }

    get<T>(key: string): T {
        throw new Error('Can not call method on abstract class');
    }

    set(key: string, value: any): void {
        throw new Error('Can not call method on abstract class');
    }

    remove(key: string): void {
        throw new Error('Can not call method on abstract class');
    }

}

export default Storage;
export {Storage};
