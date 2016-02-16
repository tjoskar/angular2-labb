import {Directive, ElementRef, Renderer, Input} from 'angular2/core';
import {Observable, Subscription} from 'rxjs';

@Directive({
    selector: '[lazyLoad]'
})
class LazyLoadImageDirective {
    @Input('lazyLoad') lazyImage;
    @Input('src') defaultImg;
    @Input() offset;
    scrollSubscription: Subscription;
    errorSubscription: Subscription;
    viewportSize = {
        height: 0,
        width: 0
    };
    elementRef: ElementRef;

    constructor(el: ElementRef, renderer: Renderer) {
        this.elementRef = el;
    }

    ngAfterContentInit() {
        this.updateViewportOffset();

        this.errorSubscription = Observable
            .fromEvent(this.elementRef.nativeElement, 'error')
            .take(1)
            .subscribe(() => this.setDefaultImage());

        this.scrollSubscription = Observable
            .merge(
                Observable.of(1), // Fake a scroll event
                Observable.fromEvent(window, 'scroll')
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
