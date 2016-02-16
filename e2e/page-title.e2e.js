describe('App', () => {

    beforeEach(() => {
        browser.get('/');
    });

    it('should have a title', () => {
        // Arrange
        const result  = 'Angular 2';

        // Act
        const subject = browser.getTitle();

        // Assert
        expect(subject).toEqual(result);
    });

});
