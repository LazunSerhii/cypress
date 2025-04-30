// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createExpense', (carId, expenseData) => {
    const authToken = window.localStorage.getItem('authToken');
    return cy.request({
      method: 'POST',
      url: 'https://qauto.forstudy.space/api/expenses',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: {
        carId,
        reportedAt: expenseData.reportedAt,  // "2025-04-30"
        mileage: expenseData.mileage,       // 150
        liters: expenseData.liters,         // 10
        totalCost: expenseData.totalCost,    // 50
      },
    });
  });

Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {
    cy.request({
      method: 'POST',
      url: 'https://qauto.forstudy.space/api/auth/signin',
      body: { email, password },
    }).then((response) => {
      expect(response.status).to.eq(200);
      window.localStorage.setItem('authToken', response.body.data.token);
    });
  });
});


Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login'); 
  
  cy.get('#email').type(email); 
  cy.get('#password').type(password, { sensitive: true }); 
  
  cy.get('#login-button').click(); /
  
 
  cy.url().should('include', '/dashboard');
  cy.get('.welcome-message').should('contain', 'Welcome');
});
