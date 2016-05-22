import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'search-input',
    template: `
        <input type="search" class="form-control" (keyup)="onKeyUp($event)">
    `
})
class SearchInputComponent {
    @Output() searchChange = new EventEmitter<string>();

    onKeyUp(event) {
        console.log(event.target.value);
    }
}

export { SearchInputComponent };
