import './style/index.scss';
import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { SearchComponent } from './search/search.component';
import { MyInputComponent } from './hello-world/my-input.component';

@Component({
    selector: 'my-app',
    template: require('./base-template.html'),
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/hello-world', name: 'MyInput', component: MyInputComponent, useAsDefault: true},
    {path: '/search', name: 'SearchShow', component: SearchComponent}
])
class AppComponent {}

export { AppComponent };
