import { provide } from '@angular/core';
import { TVMaze } from './tv-maze';
import { SubscribeService } from './subscribe.service';
import { Storage } from './storage/storage';
import { LocalStorage } from './storage/local-storage';
import { IndexedStorage } from './storage/indexed-storage';

const providers = [
    TVMaze,
    SubscribeService,
    provide(Storage, {useClass: LocalStorage})
];

export { TVMaze, SubscribeService, LocalStorage, IndexedStorage, Storage, providers };
export default providers;
