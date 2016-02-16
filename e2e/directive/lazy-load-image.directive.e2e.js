const GameOfThrones = require('../data/show').GameOfThrones
const shows = JSON.stringify(Array.from({length: 10}, () => GameOfThrones));

const slowScroll = () => {
    const c = Math.floor((document.body.scrollHeight - 1024) / 50);
    const t = setInterval(() => {
        if (c <= 0) {
            clearInterval(t)
        };

        window.scrollBy(0,50);
        c = c - 1;
    }, 100);
};

describe('Lazy load images', () => {

    beforeEach(() => {
        browser.manage().window().setSize(1024, 768);
        browser.get('/');
        browser.executeScript(`window.localStorage.setItem('valtech_subscribed-shows', '${shows}');`);
    });

    it('should not show series poster before it is in viewport', () => {
        // Arrange
        browser.get('/');
        const emptyImages = by.css('img[src="https://www.placecage.com/210/295"]');
        const gotImages = by.css('img[src="http://tvmazecdn.com/uploads/images/medium_portrait/0/581.jpg"]');

        // Assert
        expect(element.all(emptyImages).count()).toEqual(5);
        expect(element.all(gotImages).count()).toEqual(5);

        browser.executeScript(slowScroll);

        browser.wait(() => {
            const deferred = protractor.promise.defer();
            setTimeout(() => deferred.fulfill(true), 5000)
            return deferred.promise;
        });

        expect(element.all(emptyImages).count()).toEqual(0);
        expect(element.all(gotImages).count()).toEqual(10);
    });

});
