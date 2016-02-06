import {Component} from 'angular2/core';

const staticShows = [{
        'name': 'Game of Thrones',
        'image': {
            'medium': 'http://tvmazecdn.com/uploads/images/medium_portrait/0/581.jpg'
        },
        'summary': 'Based on the bestselling book series A Song of Ice and Fire by George R.R. Martin'
    }, {
        'name': 'Breaking Bad',
        'image': {
            'medium': 'http://tvmazecdn.com/uploads/images/medium_portrait/0/2400.jpg'
        },
        'summary': 'Breaking Bad follows protagonist Walter White'
    }
];

@Component({
  selector: 'upcoming-shows',
  template: `
    <h1>Upcoming shows</h1>
    <div *ngFor="#show of shows">
        <p>Name: {{show.name}}</p>
        <p>Summary: {{show.summary}}</p>
        <img [src]="show.image?.medium" />
    </div>
    <div class="alert alert-warning"
      [hidden]="shows.length > 0">
      You don't follow any shows
    </div>
  `
})
class UpcomingShows {
    public shows;

    constructor() {
      console.log('Upcoming shows');
      this.shows = staticShows;
    }

}

export default UpcomingShows;
export {UpcomingShows};
