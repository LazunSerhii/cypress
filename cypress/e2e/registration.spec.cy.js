describe('Registration Tests', () => {
  beforeEach(() => {
    cy.visit('/registration'); 
  });

  it('should display registration form', () => {
    cy.get('h1').contains('Registration').should('be.visible');
    cy.get('#name').should('exist');
    cy.get('#lastname').should('exist');
    cy.get('#email').should('exist');
    cy.get('#password').should('exist');
    cy.get('#repassword').should('exist');
    cy.get('#register-button').should('exist');
  });

  describe('Authentication Tests', () => {
    it('should login with custom command', () => {
      
      cy.logout(); 
      cy.login('Lazunsm@gmail.com', 'Test1234'); 
      cy.get('.welcome-message').should('contain', 'Welcome, Sergii');
    });
  });

  describe('Register Button Tests', () => {
    beforeEach(() => {
      
      cy.intercept('POST', '/api/register', {
        statusCode: 200,
        body: { 
          success: true,
          user: {
            name: 'Sergii',
            lastname: 'Lazun',
            email: 'Lazunsm@gmail.com'
          }
        }
      }).as('registerRequest');
    });

    it('should create new user when form is submitted', () => {
      cy.get('#name').type('Sergii');
      cy.get('#lastname').type('Lazun');
      cy.get('#email').type('Lazunsm@gmail.com');
      cy.get('#password').type('Test1234', { sensitive: true });
      cy.get('#repassword').type('Test1234', { sensitive: true });
      
      cy.get('#register-button').click();
      
      cy.wait('@registerRequest').then((interception) => {
        expect(interception.request.body).to.deep.equal({
          name: 'Sergii',
          lastname: 'Lazun',
          email: 'Lazunsm@gmail.com',
          password: 'Test1234',
          repassword: 'Test1234'
        });
      });
      
      
      cy.url().should('include', '/dashboard'); 
    });

    it('should show error when passwords do not match', () => {
      cy.get('#password').type('Test1234');
      cy.get('#repassword').type('Different1234');
      
      cy.get('#register-button').click();
      
      cy.get('.error-message').should('contain', 'Passwords do not match');
      
      cy.get('@registerRequest.all').should('have.length', 0);
    });
  });
});
