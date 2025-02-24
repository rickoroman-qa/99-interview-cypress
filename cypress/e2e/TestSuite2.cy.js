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

  it('Should load the home page successfully', () => {
    cy.url().should('include', 'https://www.rumah123.com/');
    cy.title().should('contain', 'Jual Beli Properti Rumah Apartemen | Rumah123');
    cy.wait(3000)
  });

  it('Close pop up', () =>{
    cy.get('body').click(0, 0);
  })

  it('Should check all links under "Info Properti"', () => {
    cy.contains('Info Properti')
      .parents('.ui-home-page__article')
      .find('a')
      .each(($link) => {
        const url = $link.prop('href');

        if (url && url.startsWith('http')) {
          cy.request(url).then((response) => {
            expect(response.status).to.be.oneOf([200, 301, 302]);
          });

          cy.wrap($link).invoke('removeAttr', 'target').click({ force: true });
          cy.url().should('include', url.split('/')[2]);
          cy.go('back');
        }
      })
    });
});
