it('добавляет товар в корзину', () => {
  cy.visit('http://localhost:5173');
  cy.get('[data-test="add-to-cart"]', { timeout: 10000 })
    .should('have.length.greaterThan', 0)
    .first()
    .click();
});
