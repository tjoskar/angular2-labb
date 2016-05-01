import { Component, Output, EventEmitter } from 'angular2/core';

@Component({
    selector: 'search-input',
    template: `
        <input type="search" class="form-control" (keyup)="onKeyUp($event)">
    `
})
class SearchInputComponent {
    @Output('search') searchEmitter = new EventEmitter<string>();

    onKeyUp(event) {
        this.searchEmitter.emit(event.target.value);
    }
}

export default SearchInputComponent;
export { SearchInputComponent };
