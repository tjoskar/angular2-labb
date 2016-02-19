import {Component, EventEmitter} from 'angular2/core';
import {Router} from 'angular2/router';
import {SearchInputComponent} from './search-input';
import {SearchResult} from './search-result';
import {TVMaze, SubscribeService} from '../lib/providers';

@Component({
    selector: 'search-show',
    template: `
        <search-input (search)="onSearch($event)"></search-input>
        <search-result [resultStream]="searchResultStream" (subscribe)="onSubscribeShow($event)"></search-result>
    `,
    directives: [SearchInputComponent, SearchResult]
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
        this.searchEmitter.emit(term);
    }

    onSubscribeShow(show) {
        this.service.subscribeShow(show.id)
            .then(() => this.router.navigate(['UpcomingShows']));
    }

    bindSearchEvent() {
        this.searchResultStream = this.searchEmitter
            .filter(term => term.length >= 2)
            .debounceTime(500)
            .switchMap((term: string) => this.tvMaze.searchShow(term));
    }

}

export default SearchComponent;
export {SearchComponent};
