const GameOfThrones = require('./data/show').GameOfThrones
const shows = JSON.stringify([GameOfThrones]);

describe('Upcoming shows', () => {

    beforeEach(() => {
        browser.get('/');
        browser.executeScript(`window.localStorage.setItem('valtech_subscribed-shows', '${shows}');`);
    });

    it('should show Game of Thrones on the front page', () => {
        // Arrange
        browser.get('/');
        const expectedHeadline = 'Game of Thrones';
        const headlineLocator = by.tagName('h3');

        // Assert
        expect(element.all(headlineLocator).count()).toEqual(1);
        expect(element(headlineLocator).getText()).toEqual(expectedHeadline);
    });

});
