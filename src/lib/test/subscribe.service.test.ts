import {provide} from 'angular2/core';
import {Http, BaseRequestOptions, Response, ResponseOptions} from 'angular2/http';
import {it, describe, expect, beforeEach, beforeEachProviders, injectAsync} from 'angular2/testing';
import {MockBackend} from 'angular2/http/testing';
import {spy} from 'simple-spy';
import {SubscribeService} from '../subscribe.service';
import {TVMaze} from '../tv-maze';
import {Storage} from '../storage/storage';

const storage = {
    data: undefined,
    get: spy(() => Promise.resolve(storage.data)),
    set: spy((key, data) => {
        storage.data = data;
        return Promise.resolve();
    })
};

// Integration test
describe('Subscribe service', () => {

    beforeEachProviders(() => [
        MockBackend,
        BaseRequestOptions,
        provide(Http, {
            deps: [MockBackend, BaseRequestOptions],
            useFactory: (backend, defaultOptions) => {
                return new Http(backend, defaultOptions);
            }
        }),
        TVMaze,
        provide(Storage, {useValue: storage}),
        SubscribeService
    ]);

    beforeEach(() => {
        storage.data = undefined;
        storage.get.reset();
        storage.set.reset();
    });

    it('should be able to get all subscribe shows', injectAsync([SubscribeService], (service: SubscribeService) => {
        // Arrange
        const shows = [1, 2, 3];
        storage.data = shows;

        // Act
        return service.getAllSubscribeShows()
            .then(subscribeShows => {
                expect(subscribeShows).toEqual(shows);
                expect(storage.get.callCount).toEqual(1);
                expect(storage.set.callCount).toEqual(0);
            });
    }));

    it('should fetch show when subscribe', injectAsync([SubscribeService, MockBackend], (service: SubscribeService, backend: MockBackend) => {
        // Arange
        const response = JSON.stringify({
            id: 5,
            name: 'Dexter',
            _embedded: {
                episodes: []
            }
        });
        const responseOptions = new ResponseOptions({body: response});
        backend.connections.subscribe(c => c.mockRespond(new Response(responseOptions)));

        // Act and assert
        return service.subscribeShow(5).then(() => {
            expect(storage.data[0].name).toEqual('Dexter');
            expect(storage.data[0].episodes).toBeAnInstanceOf(Array);
        });
    }));

    it('should append show to an existing list', injectAsync([SubscribeService, MockBackend], (service: SubscribeService, backend: MockBackend) => {
        // Arrange
        const response = JSON.stringify({
            id: 5,
            name: 'Dexter',
            _embedded: {
                episodes: []
            }
        });
        const responseOptions = new ResponseOptions({body: response});
        backend.connections.subscribe(c => c.mockRespond(new Response(responseOptions)));
        storage.data = [1];

        // Act and assert
        return service.subscribeShow(5)
            .then(() => {
                expect(storage.data[0]).toEqual(1);
                expect(storage.data[1].name).toEqual('Dexter');
                expect(storage.data[1].episodes).toBeAnInstanceOf(Array);
            });
    }));

    it('should unsubscribe show', injectAsync([SubscribeService], (service: SubscribeService) => {
        // Arrange
        storage.data = [{
            id: 5,
            name: 'Dexter',
        }, {
            id: 6,
            name: 'Lost',
        }];

        // Act
        return service.unSubscribeShow(<any>{id: 5}).then(() => {
            expect(storage.data.length).toEqual(1);
            expect(storage.data[0].name).toEqual('Lost');
        });
    }));

});
