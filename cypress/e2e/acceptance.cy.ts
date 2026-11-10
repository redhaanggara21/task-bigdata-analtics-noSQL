describe('Acceptance Test: Add Product Flow', () => {
  it('allows user to navigate and view form', () => {
    cy.visit('/')
    cy.contains('Product Management CRUD')
    cy.get('input[placeholder="Contoh: John Doe"]').type('Testing User')
    cy.get('input[placeholder="Contoh: E-Book Next.js"]').type('Buku React')
  })
})
