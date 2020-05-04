describe('login page UI', () => {
    beforeEach(function () {
        cy.visit('/login')
    })
    it('shows error message', () => {
        cy.get('form').within(($form) => {
            cy.get('input').first().type('invalid@gmail.com')
            cy.get('input').eq(1).type('invalidpassowrd')
            cy.root().submit()
        })
        cy.get('.alert').contains('Invalid Credentials')
    })
    it('logged in and redirect to dashboard', () => {
        cy.get('form').within(($form) => {
            cy.get('input').first().type('valid@gmail.com')
            cy.get('input').eq(1).type('123456')
            cy.root().submit()
        })
        cy.url().should('include', 'dashboard')
        cy.contains('Welcome valid name').should('be.visible')
        
    })
    it('has a link to Sign up page', () => {
        cy.contains('Sign Up').should('be.visible').click()
        cy.url().should('include','register')
    })
})
