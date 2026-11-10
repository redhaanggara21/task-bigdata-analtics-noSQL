describe('System Test: Full E2E Journey', () => {
  it('navigates to Swagger UI documentation page', () => {
    cy.visit('/')
    cy.contains('Swagger API Docs').click()
    cy.url().should('include', '/api-docs')
    cy.contains('Dokumentasi API (Swagger UI)')
  })
})
