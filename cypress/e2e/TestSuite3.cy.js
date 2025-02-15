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
    cy.url().should('include', 'https://www.rumah123.com/');
    cy.title().should('contain', 'Jual Beli Properti Rumah Apartemen | Rumah123');
    cy.wait(3000)
  });

  it('close pop up', () =>{
    //cy.get('.pdp-splash-screen__content__container__link > .ui-atomic-image').click(); // Change the selector based on your site
    cy.get('body').click(0, 0); // Clicks top-left corner of the page
  })

  it('Verify searching feature', () =>{
    // Type the keyword into the search box
    cy.get('.search-input__container')
    .should('be.visible')
    .type('Apartment');

    // Click the "Cari" button
    cy.get('body').click(0, 0); // Clicks top-left corner of the page
    cy.get('.search-suggestion__button-wrapper > .ui-atomic-button')
      .contains('Cari').click({ force: true });

    // Wait for results to load
    //cy.wait(3000); 

    // Verify search results are displayed
    cy.get('.search-input__container > .search-input__token > span', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Apartment'); // Ensure results contain the keyword
  })
});
