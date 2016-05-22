import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { UpcomingShows } from './upcoming/upcoming.component';
import { SearchComponent } from './search/search.component';
import { MyInputComponent } from './hello-world/my-input.component';

@Component({
    selector: 'my-app',
    template: require('./base-template.html'),
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'UpcomingShows', component: UpcomingShows, useAsDefault: true},
    {path: '/hello-world', name: 'MyInput', component: MyInputComponent},
    {path: '/search', name: 'SearchShow', component: SearchComponent}
])
class AppComponent {}

export { AppComponent };
