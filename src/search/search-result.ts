import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DateStringPipe } from './date-string.pipe';

@Component({
    selector: 'search-result',
    styles: [`
        figure {
            margin: 10px;
            width: 200px;
        }
    `],
    template: `
        <figure class="figure" *ngFor="let show of searchResultStream | async" (click)="onSubscribe(show)">
            <img [src]="show.image?.medium" [alt]="show.name" class="figure-img img-fluid img-rounded" />
            <figcaption class="figure-caption">{{show.name}} ({{ show.premiered | dateString:'year' }})</figcaption>
        </figure>
    `,
    pipes: [DateStringPipe]
})
class SearchResult {
    @Input('resultStream') searchResultStream;
    @Output() subscribe = new EventEmitter();

    onSubscribe(show) {
        this.subscribe.emit(show);
    }
}

export default SearchResult;
export { SearchResult };
