import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {UpcomingShows} from './upcoming/upcoming.component';

@Component({
    selector: 'my-app',
    template: `
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'UpcomingShows', component: UpcomingShows, useAsDefault: true}
])
class AppComponent {

}

export {AppComponent};
