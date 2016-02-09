import {provide} from 'angular2/core';
import {TVMaze} from './tv-maze';
import {SubscribeService} from './subscribe.service';
import {Storage} from './storage/storage';
import {LocalStorage} from './storage/local-storage';

const providers = [
    TVMaze,
    SubscribeService,
    provide(Storage, {useClass: LocalStorage})
];

export {TVMaze, SubscribeService, LocalStorage, Storage, providers};
export default providers;
