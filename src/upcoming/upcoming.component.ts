import {Component} from 'angular2/core';
import {SubscribeService} from '../lib/providers';
import {ShowComponent} from './show.component';
import {Show} from '../lib/interfaces/show';

@Component({
    selector: 'upcoming-shows',
    template: `
        <h1>Upcoming shows</h1>
        <show *ngFor="#show of shows | async" [show]="show"></show>
    `,
    directives: [ShowComponent]
})
class UpcomingShows {
    shows: Promise<Show[]>;

    constructor(service: SubscribeService) {
        this.shows = service.getAllSubscribeShows();
    }

}

export default UpcomingShows;
export {UpcomingShows};
