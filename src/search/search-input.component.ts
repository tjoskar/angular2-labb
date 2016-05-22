import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'search-input',
    template: `
        <input type="search" class="form-control" (keyup)="onKeyUp($event)">
    `,
    changeDetection: ChangeDetectionStrategy.Detached
})
class SearchInputComponent {
    @Output() searchChange = new EventEmitter<string>();

    onKeyUp(event) {
        this.searchChange.emit(event.target.value);
    }
}

export { SearchInputComponent };
