/* 
  rroyahinf@gmail.com
*/

/**describe('99.co Home Page Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.99.co/singapore', {
      onBeforeLoad: (win) => {
        Object.defineProperty(win.navigator, 'webdriver', {
            get: () => undefined
        });
      },
      failOnStatusCode: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        //'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.google.com/'
      }
    });
  });

  it('should load the home page successfully', () => {
    cy.url().should('include', 'https://www.99.co/singapore');
    //cy.title().should('contain', 'Jual Beli Properti Rumah Apartemen | Rumah123');
    cy.pause(); // 🔴 Cypress waits here until you resume manually
    // After clicking the checkbox, continue execution
    cy.contains('Continue').click();  
  });
});**/

describe('99.co Home Page Tests', () => {
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

  const textsToVerify = [
    'Rekomendasi Sesuai Pencarianmu',
    'Properti Pilihan Kami',
    'Properti Terpopuler',
    'Daftar Properti Baru',
    'Kenapa Rumah123?',
    'Kata Mereka yang Sudah Menggunakan Layanan Rumah123',
    'Info Properti'
  ];

  it('should load the home page successfully', () => {
    cy.url().should('include', 'https://www.rumah123.com/');
    cy.title().should('contain', 'Jual Beli Properti Rumah Apartemen | Rumah123');
    cy.wait(3000)
  });

  it('close pop up', () =>{
    cy.get('body').click(0, 0);
  })
  
  it('should verify all required texts are visible', () => {
    textsToVerify.forEach((text) => {
      cy.contains(text, { timeout: 10000 }).scrollIntoView().should('be.visible');
    });
  });
});
