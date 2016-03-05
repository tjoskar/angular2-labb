import { provide } from 'angular2/core';
import { Http, BaseRequestOptions, Response, ResponseOptions } from 'angular2/http';
import { it, describe, expect, beforeEach, beforeEachProviders, injectAsync } from 'angular2/testing';
import { MockBackend } from 'angular2/http/testing';
import { spy } from 'simple-spy';
import { SubscribeService } from '../subscribe.service';
import { TVMaze } from '../tv-maze';
import { Storage } from '../storage/storage';

const storageMock = {
    data: undefined,
    get: spy(() => Promise.resolve(storageMock.data)),
    set: spy((key, data) => {
        storageMock.data = data;
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
        provide(Storage, {useValue: storageMock}),
        SubscribeService
    ]);

    beforeEach(() => {
        storageMock.data = undefined;
        storageMock.get.reset();
        storageMock.set.reset();
    });

    it('should be able to get all subscribe shows', injectAsync([SubscribeService], (service: SubscribeService) => {
        // Arrange
        const shows = [1, 2, 3];
        storageMock.data = shows;

        // Act
        return service.getAllSubscribeShows()
            .then(subscribeShows => {
                expect(subscribeShows).toEqual(shows);
                expect(storageMock.get.callCount).toEqual(1);
                expect(storageMock.set.callCount).toEqual(0);
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
            expect(storageMock.data[0].name).toEqual('Dexter');
            expect(storageMock.data[0].episodes).toBeAnInstanceOf(Array);
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
        storageMock.data = [1];

        // Act and assert
        return service.subscribeShow(5)
            .then(() => {
                expect(storageMock.data[0]).toEqual(1);
                expect(storageMock.data[1].name).toEqual('Dexter');
                expect(storageMock.data[1].episodes).toBeAnInstanceOf(Array);
            });
    }));

    it('should unsubscribe show', injectAsync([SubscribeService], (service: SubscribeService) => {
        // Arrange
        storageMock.data = [{
            id: 5,
            name: 'Dexter',
        }, {
            id: 6,
            name: 'Lost',
        }];

        // Act
        return service.unSubscribeShow(<any>{id: 5}).then(() => {
            expect(storageMock.data.length).toEqual(1);
            expect(storageMock.data[0].name).toEqual('Lost');
        });
    }));

});
