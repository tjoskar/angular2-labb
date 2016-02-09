import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';
import {NextEpisodePipe} from './next-episode.pipe';
import {LazyLoadImageDirective} from '../directive/lazy-load-image.directive';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'show',
    styles: [`
        .show-poster {
            margin: 0 10px 10px 0;
        }
    `],
    template: `
        <div class="show-poster">
            <img
                [lazyLoad]="show.image?.medium"
                defaultImg="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                [alt]="show.name"
                class="img-rounded" />
        </div>
        <div class="show-information">
            <h3>{{show.name}}</h3>
            <p>Next episode: {{ show.episodes | nextEpisode }}</p>
            <div [innerHTML]="show.summary"></div>
        </div>
    `,
    pipes: [NextEpisodePipe],
    directives: [LazyLoadImageDirective]
})
class ShowComponent {
    @Input() show;
}

export default ShowComponent;
export {ShowComponent};
