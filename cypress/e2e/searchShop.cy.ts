it('ищет товары', () => {
  cy.visit('http://localhost:5173');
  cy.get('[data-test="search-input"]').click().type('shirt');
  cy.get('[data-test="search-results"]', { timeout: 10000 }).should('exist');
  cy.get('[data-test="search-results"]').children().should('have.length.greaterThan', 0);
});
