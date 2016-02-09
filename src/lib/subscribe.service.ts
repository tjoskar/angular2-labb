import {Injectable} from 'angular2/core';
import {Storage} from './storage/storage';
import {TVMaze} from './tv-maze';

const STORAGE_KEY = 'subscribed-shows';

@Injectable()
class SubscribeService {
    storage: Storage;
    tvMaze: TVMaze;

    constructor(storage: Storage, tvMaze: TVMaze) {
        this.storage = storage;
        this.tvMaze = tvMaze;
    }

    getAllSubscribeShows() {
        const subscribedShows = this.storage.get(STORAGE_KEY);
        return Array.isArray(subscribedShows) ? subscribedShows : [];
    }

    subscribeShow(showId: number) {
        return this.tvMaze.getShow(showId)
            .map(show => {
                const subscribedShows = this.storage.get(STORAGE_KEY);
                if (!Array.isArray(subscribedShows)) {
                    this.storage.set(STORAGE_KEY, [show]);
                } else {
                    subscribedShows.push(show);
                    this.storage.set(STORAGE_KEY, subscribedShows);
                }
            }
        );
    }

    unSubscribeShow(show) {
        const subscribedShows = this.storage.get(STORAGE_KEY);
        if (!Array.isArray(subscribedShows)) {
            return;
        } else {
            const index = subscribedShows.findIndex(s => s.id === show.id);
            if (index > -1) {
                subscribedShows.splice(index, 1);
                this.storage.set(STORAGE_KEY, subscribedShows);
            }
        }
    }
}

export {SubscribeService};
export default SubscribeService;
