import {Component, EventEmitter} from 'angular2/core';
import {SearchInputComponent} from './search-input';
import {SearchResult} from './search-result';
import {TVMaze} from '../lib/tv-maze';

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
    searchEmitter = new EventEmitter<string>();
    searchResultStream;

    constructor(tvMaze: TVMaze) {
        this.tvMaze = tvMaze;
        this.bindSearchEvent();
    }

    onSearch(term) {
        this.searchEmitter.emit(term);
    }

    onSubscribeShow(show) {
        console.log(show);
    }

    bindSearchEvent() {
        this.searchResultStream = this.searchEmitter
            .filter(term => term.length >= 2)
            .debounceTime(500)
            .switchMap((term: any) => this.tvMaze.searchShow(term));
    }

}

export default SearchComponent;
export {SearchComponent};
