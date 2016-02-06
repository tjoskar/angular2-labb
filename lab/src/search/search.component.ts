import {Component, EventEmitter} from 'angular2/core';
import {TVMaze} from '../lib/tv-maze';

@Component({
    selector: 'serach-show',
    template: `
        <form>
            <div class="input-group">
                <input type="search" class="form-control" (keyup)="onKeyUp($event)">
                <span class="input-group-btn">
                    <button class="btn btn-primary">Search</button>
                </span>
            </div>
        </form>
        <div *ngFor="#show of searchResult">
            {{show.name}}
        </div>
    `
})
class SearchComponent {
    tvMaze: TVMaze;
    searchEmitter = new EventEmitter<string>();
    searchResult = [];

    constructor(tvMaze: TVMaze) {
        this.tvMaze = tvMaze;
        this.bindSearchEvent();
    }

    onKeyUp(event) {
        this.searchEmitter.emit(event.target.value);
    }

    bindSearchEvent() {
        this.searchEmitter
            .filter(term => term.length >= 2)
            .debounceTime(500)
            .switchMap((term: any) => this.tvMaze.searchShow(term))
            .subscribe(
                (result: any) => this.searchResult = result
            );
    }

}

export default SearchComponent;
export {SearchComponent};
