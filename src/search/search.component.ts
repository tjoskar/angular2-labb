import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { SearchInputComponent } from './search-input.component';
import { SearchResult } from './search-result.component';
import { TVMaze, SubscribeService } from '../lib/providers';

@Component({
    selector: 'search-show',
    template: `
        <search-input (searchChange)="onSearch($event)"></search-input>
        <search-result [resultStream]="searchResultStream" (subscribe)="onSubscribeShow($event)"></search-result>
    `,
    directives: [ SearchInputComponent, SearchResult ]
})
class SearchComponent {
    tvMaze: TVMaze;
    service: SubscribeService;
    router: Router;
    searchEmitter = new EventEmitter<string>();
    searchResultStream;

    constructor(tvMaze: TVMaze, router: Router, service: SubscribeService) {
        this.tvMaze = tvMaze;
        this.service = service;
        this.router = router;
        this.bindSearchEvent();
    }

    onSearch(term) {
        console.log('We have a new serach string:', term);
    }

    onSubscribeShow(show) {
        this.service.subscribeShow(show.id)
            .then(() => this.router.navigate(['UpcomingShows']));
    }

    bindSearchEvent() {
        // TODO: Fix me
        this.searchResultStream = this.searchEmitter
            // .filter - Make a search request if the search string is longer than 2 characters (google for "rxjs filter")
            // .debounceTime - Wait for more user input before making the request
            // .switchMap - Create a new stream and merge it into the "base" stream. However, unsubscribe to streams when
            //      the new stream emits. Take a look at this page: https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/flatmaplatest.md (switchMap was named flatmaplatest in v4, we are using v5).
            //      http://reactivex.io/documentation/operators/images/switchMap.png
            //      SPOILER: You will basically use it like this: ".switchMap((term: string) => this.tvMaze.searchShow(term))"
            .map(searchString => { // TODO: remove me
                console.log('searchString: ', searchString);
                return [];
            });
    }

}

export default SearchComponent;
export { SearchComponent };
