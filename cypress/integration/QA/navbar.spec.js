describe('login page UI', () => {
    before(function () {
        cy.SignIn()
    })
    context('720p resolution', () => {
        beforeEach(() => {
          cy.viewport(1280, 720)
        })
    
        it('displays full header', () => {
            cy.get('li').contains('Developers').should('be.visible')
            cy.get('li').contains('Posts').should('be.visible')
            cy.get('.fa-user').should('be.visible')
            cy.get('li').contains('Dashboard').should('be.visible')
            cy.get('.fa-sign-out-alt').should('be.visible')
            cy.get('li').contains('Logout').should('be.visible')
        })
    })
    
    context('iphone-5 resolution', () => {
        beforeEach(() => {
          cy.viewport('iphone-5')
        })
    
        it('displays mobile menu on click', () => {
            cy.get('li').contains('Developers').should('be.visible')
            cy.get('li').contains('Posts').should('be.visible')
            cy.get('.fa-user').should('be.visible')
            cy.get('.hide-sm').first().should('not.be.visible')
            cy.get('.fa-sign-out-alt').should('be.visible')
            cy.get('.hide-sm').eq(1).should('not.be.visible')

        })
    })
})

