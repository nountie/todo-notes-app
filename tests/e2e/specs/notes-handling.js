describe('Notes handling', () => {
  it('creates new todo', () => {
    cy.visit('/')
    cy.get('.todos-table__button-add').should('not.be.disabled')
    cy.get('.todos-table__button-add')
      .click()
    cy.get('input[placeholder="Add title"]')
      .type('New todo')
    cy.get('textarea[placeholder="Content"]')
      .type('Lorem ipsum')
    cy.contains('Save')
      .click()

    cy.contains('New todo')
      .should('exist')

    cy.contains('Lorem ipsum')
      .should('exist')
  })

  it('creates new todo with XSS', () => {
    cy.visit('/')
    cy.get('.todos-table__button-add').should('not.be.disabled')
    cy.get('.todos-table__button-add')
      .click()
    cy.get('input[placeholder="Add title"]')
      .type('New todo 2"><script>alert("XSS")</script>')
    cy.get('textarea[placeholder="Content"]')
      .type('Lorem ipsum 2 <script>alert("Hello")</script>')
    cy.contains('Save')
      .click()

    cy.contains('New todo 2"&gt;')
      .should('exist')
    cy.contains('Lorem ipsum 2')
      .should('exist')
  })

  it('deletes second todo', () => {
    cy.visit('/')
    cy.get('.todos-table__button-add').should('not.be.disabled')
    cy.get('#check-2')
      .click()
    cy.wait(500)
    cy.contains('Yes')
      .click()

    cy.contains('quis ut nam facilis et officia qui')
      .should('not.exist')
  })

  it('deletes all todos', () => {
    cy.visit('/')
    cy.get('.todos-table__button-add').should('not.be.disabled')
    cy.get('#check-all')
      .click()
    cy.wait(500)
    cy.contains('Yes')
      .click()

    cy.contains('You have no todos :( Add one!')
      .should('exist')
  })
})
