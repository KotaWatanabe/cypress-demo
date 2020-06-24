describe.skip('register page UI', () => {
    beforeEach(function () {
        cy.visit('/register')
    })
    it('shows error message', () => {
        cy.get('form').within(($form) => {
            cy.get('input').first().type('valid name')
            cy.get('input').eq(1).type('valid@gmail.com')
            cy.get('input').eq(2).type('123456')
            cy.get('input').eq(3).type('123456')
            cy.root().submit()
        })
        cy.get('.alert').contains('User already exists')
    })
    it('register user and redirect to dashboard', () => {
        cy.get('form').within(($form) => {
            cy.get('input').first().type('test name')
            cy.get('input').eq(1).type('testemail@gmail.com')
            cy.get('input').eq(2).type('123456')
            cy.get('input').eq(3).type('123456')
            cy.root().submit()
        })
        cy.url().should('include', 'dashboard')
        cy.contains('Welcome test name').should('be.visible')
        
    })
    it('has a link to Sign In page', () => {
        cy.contains('Sign In').should('be.visible').click()
        cy.url().should('include','login')
    })
})
