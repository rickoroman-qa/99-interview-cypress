/* 
  rroyahinf@gmail.com
*/

describe("Test Suite 2", () => {
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

  it('should check all links under "Rekomendasi Sesuai Pencarianmu"', () => {
    // Ensure the title exists on the page
    //cy.contains('Rekomendasi Sesuai Pencarianmu', { timeout: 10000 }).should('be.visible');

    // Find the section containing the links
    cy.contains('Rekomendasi Sesuai Pencarianmu')
      .parents('.ui-home-page__recommendation') // Adjust this selector if needed
      .find('a') // Get all links in the section
      .each(($link) => {
        const url = $link.prop('href'); // Get the link URL

        if (url && url.startsWith('http')) {
          cy.request(url).then((response) => {
            expect(response.status).to.be.oneOf([200, 301, 302]); // ✅ Check if the link is valid
          });

          cy.wrap($link).invoke('removeAttr', 'target').click({ force: true }); // Click the link
          cy.url().should('include', url.split('/')[2]); // ✅ Verify navigation
          cy.go('back'); // Go back to the previous page
        }
      })
    });
});

