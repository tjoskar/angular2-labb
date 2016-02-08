import {StorageInterface} from './storage-interface';

class Storage implements StorageInterface {

    get<T>(key: string): T {
        throw new Error('Can not call method on abstract class');
    }

    set(key: string, value: any): boolean {
        throw new Error('Can not call method on abstract class');
    }

    remove(key: string): boolean {
        throw new Error('Can not call method on abstract class');
    }

}

export default Storage;
export {Storage};
