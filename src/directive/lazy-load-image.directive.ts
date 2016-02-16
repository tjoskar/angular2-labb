import {Directive, ElementRef, Renderer, Input, EventEmitter} from 'angular2/core';
import {Observable, Subscription} from 'rxjs';

@Directive({
    selector: '[lazyLoad]'
})
class LazyLoadImageDirective {
    @Input('lazyLoad') lazyImage;
    @Input('src') defaultImg;
    @Input() offset;
    elementRef: ElementRef;
    renderer: Renderer;
    scroll = new EventEmitter();
    scrollSubscription: Subscription;
    errorSubscription: Subscription;
    viewportSize = {
        height: 0,
        width: 0
    };

    constructor(el: ElementRef, renderer: Renderer) {
        this.elementRef = el;
        this.renderer = renderer;
    }

    ngAfterContentInit() {
        this.updateViewportOffset();
        this.renderer.listenGlobal('window', 'scroll', () => this.scroll.emit(1));

        this.errorSubscription = Observable
            .fromEvent(this.elementRef.nativeElement, 'error')
            .take(1)
            .subscribe(() => this.setDefaultImage());

        this.scrollSubscription = Observable
            .merge(
                Observable.of(1), // Fake a scroll event
                this.scroll
            )
            .sampleTime(100)
            .filter(() => this.isVisible())
            .map(() => {
                this.setImage();
                this.ngOnDestroy();
            })
            .subscribe();
    }

    setImage(image = this.lazyImage) {
        this.elementRef.nativeElement.src = image;
    }

    setDefaultImage() {
        this.setImage(this.defaultImg || '');
    }

    isVisible() {
        const rect = this.elementRef.nativeElement.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            (rect.bottom - rect.height) <= this.viewportSize.height &&
            (rect.right - rect.width) <= this.viewportSize.width
        );
    }

    updateViewportOffset() {
        this.viewportSize.height = (window.innerHeight || document.documentElement.clientHeight) + (this.offset || 0);
        this.viewportSize.width = (window.innerWidth || document.documentElement.clientWidth) + (this.offset || 0);
    }

    ngOnDestroy() {
        [this.scrollSubscription, this.errorSubscription]
            .filter(subscription => subscription && !subscription.isUnsubscribed)
            .forEach(subscription => subscription.unsubscribe());
    }
}

export {LazyLoadImageDirective};
export default LazyLoadImageDirective;
