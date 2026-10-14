it('ставит лайк', () => {
  cy.visit('http://localhost:5173');
  cy.get('[data-test="like-button"]').first().click();
  cy.get('[data-test="like-button"]').first();
});
