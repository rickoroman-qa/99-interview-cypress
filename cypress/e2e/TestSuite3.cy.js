/* 
  rroyahinf@gmail.com
*/

describe("Test Suite 3", () => {
  beforeEach(() => {
    cy.visit('https://www.rumah123.com/', {
      failOnStatusCode: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.google.com/'
      }
    });
  });

  it('should load the home page successfully', () => {
    cy.url().should('include', 'https://www.rumah123.com/')
      .title().should('contain', 'Jual Beli Properti Rumah Apartemen | Rumah123')
      .wait(3000)
  });

  it('close pop up', () =>{
    cy.get('body').click(0, 0); // Clicks top-left corner of the page
  })

  it('Verify searching feature', () =>{
    // Type the keyword into the search box
    cy.get('.search-input__container input')
      .should('be.visible')
      .type('apartment', { force: true });

    // Click the "Cari" button
    cy.get('body').click(0, 0)
      .get('.search-suggestion__button-wrapper > .ui-atomic-button')
      .contains('Cari').click({ force: true });

    //Assert or verify keyword
    cy.get('h1.ui-atomic-text.ui-atomic-text--styling-featured.ui-atomic-text--typeface-primary')
      .invoke('text')
      .then((text) => {
          cy.log("Search result text:", text);
      expect(text.trim()).to.contain('apartment');
    });
  })
});
