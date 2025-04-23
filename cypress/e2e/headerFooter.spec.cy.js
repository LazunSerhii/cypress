describe('Header and Footer Elements Tests', () => {
  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space');
  });

  it('Should verify all header elements', () => {
    const headerElements = [
      { selector: 'header .header_logo', name: 'Logo' },
      { selector: 'header a[href="/"]', name: 'Home Link' },
      { selector: 'header button[appscrollto="aboutSection"]', name: 'About Button' },
      { selector: 'header button[appscrollto="contactsSection"]', name: 'Contacts Button' },
      { selector: 'header .header-link.-guest', name: 'Guest Login' },
      { selector: 'header .header_signin', name: 'Sign In Button' }
    ];

    headerElements.forEach((element) => {
      cy.get(element.selector)
        .should('be.visible')
        .and('exist');
      cy.log(`Verified header element: ${element.name}`);
    });
  });

  it('Should verify all footer elements', () => {
    const footerElements = [
      { selector: 'footer p:contains("Hillel IT school")', name: 'Copyright' },
      { selector: 'footer p:contains("educational purposes")', name: 'Description' },
      { selector: 'footer .icon-facebook', name: 'Facebook Icon' },
      { selector: 'footer .icon-telegram', name: 'Telegram Icon' },
      { selector: 'footer .icon-youtube', name: 'YouTube Icon' },
      { selector: 'footer .icon-instagram', name: 'Instagram Icon' },
      { selector: 'footer .icon-linkedin', name: 'LinkedIn Icon' },
      { selector: 'footer a[href="https://ithillel.ua"]', name: 'Website Link' },
      { selector: 'footer a[href^="mailto"]', name: 'Email Link' }
    ];

    footerElements.forEach((element) => {
      cy.get(element.selector)
        .should('be.visible')
        .and('exist');
      cy.log(`Verified footer element: ${element.name}`);
    });
  });
});
