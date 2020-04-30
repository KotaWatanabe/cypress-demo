Cypress.Commands.add('SignIn', () => {
    cy.visit('/#/login')
    cy.title().should('eq', 'Conduit')
    cy.location('protocol').should('eq', ('https:'))

    cy.get('form').within(($form) => {
        cy.get('input[type="email"]').type('test331@gmail.com')
        cy.get('input[type="password"]').type('testtest')
        cy.root().submit()
    })
    cy.contains('Your Feed', {
        timeout: 10000
    }).should('be.visible')
})
