const GameOfThrones = require('../data/show').GameOfThrones
const shows = JSON.stringify(Array.from({length: 10}, () => GameOfThrones));

const slowScroll = () => {
    'use strict';
    const scrollPrecision = 50;
    let scrollCounter = Math.floor(document.body.scrollHeight / scrollPrecision);
    const intervalIndex = setInterval(() => {
        if (scrollCounter <= 0) {
            clearInterval(intervalIndex)
        };

        window.scrollBy(0, scrollPrecision);
        scrollCounter = scrollCounter - 1;
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

        browser.wait(() => {
            const deferred = protractor.promise.defer();
            setTimeout(() => deferred.fulfill(true), 1000);
            return deferred.promise;
        });

        // Assert
        expect(element.all(emptyImages).count()).toEqual(6);
        expect(element.all(gotImages).count()).toEqual(4);

        browser.executeScript(slowScroll);

        // If you have a better solution, please let me know
        browser.wait(() => {
            const deferred = protractor.promise.defer();
            setTimeout(() => deferred.fulfill(true), 7000);
            return deferred.promise;
        });

        expect(element.all(emptyImages).count()).toEqual(0);
        expect(element.all(gotImages).count()).toEqual(10);
    });

});
