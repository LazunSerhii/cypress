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

  describe('Car and Expense Tests', () => {
    let carId;
  
    before(() => {
      cy.login('guest', 'welcome2qauto');
    });
  
    it('Creates a car and saves its ID', () => {
      cy.intercept('POST', 'https://qauto.forstudy.space/api/cars').as('createCar');
  
      // UI-кроки для створення машини (адаптуйте селектори)
      cy.visit('https://qauto.forstudy.space/garage');
      cy.get('button').contains('Add car').click();
      cy.get('#brand').select('BMW');
      cy.get('#model').select('3');
      cy.get('#mileage').type('100');
      cy.get('button').contains('Save').click();
  
      // Чекаємо відповіді та зберігаємо ID
      cy.wait('@createCar').then((interception) => {
        expect(interception.response.statusCode).to.eq(201);
        carId = interception.response.body.data.id;
        cy.wrap(carId).as('carId');
      });
    });
  
    it('Verifies the car via API', () => {
      cy.get('@carId').then((id) => {
        cy.request({
          method: 'GET',
          url: 'https://qauto.forstudy.space/api/cars',
          headers: { accept: 'application/json' },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data.some(car => car.id === id)).to.be.true;
        });
      });
    });
  
    it('Creates an expense via API', () => {
      const testExpense = {
        reportedAt: "2025-04-30",
        mileage: 150,
        liters: 10,
        totalCost: 50,
      };
  
      cy.get('@carId').then((id) => {
        cy.createExpense(id, testExpense).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.data.carId).to.eq(id);
        });
      });
    });
  
    it('Verifies the expense in UI', () => {
      cy.get('@carId').then((id) => {
        cy.visit(`https://qauto.forstudy.space/garage/${id}`);
        cy.contains('50 USD').should('exist'); // Адаптуйте селектор
      });
    });
  });
