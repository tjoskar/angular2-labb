import { Component } from '@angular/core';
import { SubscribeService } from '../lib/providers';
import { ShowComponent } from './show.component';
import { Show } from '../lib/contracts/show';

@Component({
    selector: 'upcoming-shows',
    template: `
        <h1>Upcoming shows</h1>
        <show *ngFor="let show of shows" [show]="show" (unsubscribe)=unsubscribeShow($event)></show>
    `,
    directives: [ShowComponent]
})
class UpcomingShows {
    service: SubscribeService;
    shows: Show[];

    constructor(service: SubscribeService) {
        this.service = service;
        service.getAllSubscribeShows().then(shows => this.shows = shows);
    }

    unsubscribeShow(show: Show) {
        this.shows = this.shows.filter(s => s.id !== show.id);
        this.service.unSubscribeShow(show);
    }

}

export default UpcomingShows;
export { UpcomingShows };
