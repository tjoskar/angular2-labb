import {Component} from 'angular2/core';
import {SubscribeService} from '../lib/providers';
import {ShowComponent} from './show.component';

@Component({
    selector: 'upcoming-shows',
    template: `
        <h1>Upcoming shows</h1>
        <show *ngFor="#show of shows" [show]="show"></show>
        <div class="alert alert-warning" [hidden]="shows.length > 0">
            You don't follow any shows
        </div>
    `,
    directives: [ShowComponent]
})
class UpcomingShows {
    shows = [];

    constructor(service: SubscribeService) {
        this.shows = service.getAllSubscribeShows();
    }

}

export default UpcomingShows;
export {UpcomingShows};
