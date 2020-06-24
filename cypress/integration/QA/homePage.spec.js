describe('homepage UI', () => {
    before(function () {
        cy.visit('/')
    })
    it('has title', () => {
        cy.get('h1').eq(1)
            .should('have.class','x-large')
            .should('have.text','Developer Talk')
    })
    it('has a Sign Up button', () => {
        cy.get('.buttons').children().as('button')
        cy.get('@button').eq(0).contains('Sign Up').click()
        cy.url().should('include', 'register')
        cy.go('back')
    })
    it('has a Login button', () => {
        cy.get('.buttons').children().as('button')
        cy.get('@button').eq(1).contains('Login').click()
        cy.url().should('include', 'login')
    })
})
