import {it, describe, expect, beforeEach} from 'angular2/testing';
import {LocalStorage} from '../local-storage';

describe('Local Storage: ', () => {
    let _storage: LocalStorage;

    beforeEach(() => {
        _storage = new LocalStorage();
        _storage.__clearAll();
    });

    it('should be able to store a string', function() {
        // Arrange
        const key = 'key';
        const val = 'value';

        // Act
        _storage.set(key, val);
        const actual = _storage.get(key);

        // Assert
        expect(actual).toEqual(val);
    });

    it('should be able to store an object', function() {
        // Arrange
        const key = 'key';
        const val = {
            key: 'val'
        };

        // Act
        _storage.set(key, val);
        const actual = _storage.get(key);

        // Assert
        expect(actual).toEqual(val);
    });

});
