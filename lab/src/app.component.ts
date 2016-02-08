import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {UpcomingShows} from './upcoming/upcoming.component';
import {SearchComponent} from './search/search.component';
import {MyInputComponent} from './testing/my-input.component';

@Component({
    selector: 'my-app',
    templateUrl: './base-template.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'UpcomingShows', component: UpcomingShows, useAsDefault: true},
    {path: '/test', name: 'MyInput', component: MyInputComponent},
    {path: '/search', name: 'SearchShow', component: SearchComponent}
])
class AppComponent {

}

export {AppComponent};
