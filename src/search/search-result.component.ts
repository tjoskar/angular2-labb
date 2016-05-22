import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DateStringPipe } from './date-string.pipe';
import { LazyLoadImageDirective } from '../directive/lazy-load-image.directive';

@Component({
    selector: 'search-result',
    styles: [`
        figure {
            margin: 10px;
            width: 200px;
            cursor: pointer;
        }
    `],
    template: `
        <figure class="figure" *ngFor="let show of resultStream | async" (click)="onSubscribe(show)">
            <img
                src="https://www.placecage.com/210/295"
                [lazyLoad]="show.image?.medium"
                [alt]="show.name"
                class="figure-img img-fluid img-rounded" />
            <figcaption class="figure-caption">{{show.name}} ({{ show.premiered | dateString:'year' }})</figcaption>
        </figure>
    `,
    pipes: [ DateStringPipe ],
    directives: [ LazyLoadImageDirective ],
    changeDetection: ChangeDetectionStrategy.Detached
})
class SearchResult {
    @Input() resultStream;
    @Output() subscribe = new EventEmitter();

    onSubscribe(show) {
        this.subscribe.emit(show);
    }
}

export { SearchResult };
