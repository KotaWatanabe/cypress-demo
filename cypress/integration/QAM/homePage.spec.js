describe('homepage UI', () => {
    before(function () {
        cy.visit('/')
    })
    it('has a header for non-login user', () => {
        cy.get('li').contains('Developers')
        cy.get('li').contains('Register')
        cy.get('li').contains('Login')
    })
    it('has a Sign Up button', () => {
        cy.get('.buttons').children().as('button')
        cy.get('@button').contains('Sign Up').click()
        cy.url().should('include', 'register')
        cy.go('back')
    })
    it('has a Login button', () => {
        cy.get('.buttons').children().as('button')
        cy.get('@button').contains('Login').click()
        cy.url().should('include', 'login')
    })
})
