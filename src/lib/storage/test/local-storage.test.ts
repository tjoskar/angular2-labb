import { it, describe, expect, beforeEach } from '@angular/core/testing';
import { LocalStorage } from '../local-storage';

describe('Local Storage: ', () => {
    let _storage: LocalStorage<any>;

    beforeEach(() => {
        _storage = new LocalStorage();
        _storage.__clearAll();
    });

    it('should be able to store a string', () => {
        // Arrange
        const key = 'key';
        const val = 'value';

        // Act
        _storage.set(key, val);

        return _storage.get(key)
            .then(actual => {
                expect(actual).toEqual(val);
            });
    });

    it('should be able to store an object', () => {
        // Arrange
        const key = 'key';
        const val = {
            key: 'val'
        };

        // Act
        _storage.set(key, val);

        return _storage.get(key)
            .then(actual => {
                expect(actual).toEqual(val);
            });
    });

});
