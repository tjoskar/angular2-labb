import {Component, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'search-input',
    template: `
        <form>
            <div class="input-group">
                <input type="search" class="form-control" (keyup)="onKeyUp($event)">
                <span class="input-group-btn">
                    <button class="btn btn-primary">Search</button>
                </span>
            </div>
        </form>
    `
})
class SearchInputComponent {
    @Output('search') searchEmitter = new EventEmitter<string>();

    onKeyUp(event) {
        this.searchEmitter.emit(event.target.value);
    }
}

export default SearchInputComponent;
export {SearchInputComponent};
