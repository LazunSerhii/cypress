describe('Car and Expense API + UI tests', () => {
    let carId;
  
    before(() => {
      // Логінимося (якщо потрібно)
      cy.login('guest', 'welcome2qauto');
    });
  
    it('Should intercept car creation and save car ID', () => {
      // Перехоплюємо API-запит створення машини
      cy.intercept('POST', '/api/cars').as('createCar');
  
      // Виконуємо дії для створення машини через UI
      cy.get('[data-testid="create-car-button"]').click();
      cy.get('#brand').select('BMW');
      cy.get('#model').select('3');
      cy.get('#mileage').type('100');
      cy.get('[data-testid="create-button"]').click();
  
      // Чекаємо на відповідь та зберігаємо `id`
      cy.wait('@createCar').then((interception) => {
        expect(interception.response.statusCode).to.eq(201);
        carId = interception.response.body.data.id;
        cy.wrap(carId).as('carId'); // Зберігаємо в `alias`
      });
    });
  });

  it('Should verify car exists in the list via API', () => {
    cy.get('@carId').then((id) => {
      cy.request({
        method: 'GET',
        url: '/api/cars',
        headers: { accept: 'application/json' },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.some(car => car.id === id)).to.be.true;
      });
    });
  });

  it('Should create expense via API and validate response', () => {
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
        expect(response.body.data.liters).to.eq(testExpense.liters);
        cy.wrap(response.body.data.id).as('expenseId');
      });
    });
  });

  it('Should verify expense in UI', () => {
    cy.get('@carId').then((id) => {
      cy.visit(`/garage/${id}`);
      cy.get('[data-testid="expense-item"]').should('contain', '50 USD');
    });
  });
