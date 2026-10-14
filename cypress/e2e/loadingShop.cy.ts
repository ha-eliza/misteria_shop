describe('Каталог', () => {
  it('загружает товары', () => {
    cy.visit('http://localhost:5173');
    cy.get('[data-test="product-card"]').should('have.length.greaterThan', 0);
  });
});
