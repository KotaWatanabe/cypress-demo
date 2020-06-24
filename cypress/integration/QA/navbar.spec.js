describe('navbar UI', () => {
    describe('navbar UI for no-login user', () => {
        it('has three navbar menus for non-login user', () => {
            cy.visit('/')
            cy.get('ul').children().as('navbar-menus').should('have.length', 3)
            cy.get('@navbar-menus').eq(0).contains('Developers').click()
            cy.url().should('include', 'profiles')
            cy.go('back')
            cy.get('@navbar-menus').eq(1).contains('Register').click()
            cy.url().should('include', 'register')
            cy.go('back')
            cy.get('@navbar-menus').eq(2).contains('Login').click()
            cy.url().should('include', 'login')
            cy.go('back')
        })
    })
    
    describe('navbar UI for loggedIn user', () => {
        before(function () {
            cy.SignIn()
        })
        it('has four navbar menus for loggedIn user', () => {
            cy.get('ul').children().as('navbar-menus').should('have.length', 4)
            cy.get('@navbar-menus').eq(0).contains('Developers').click()
            cy.url().should('include', 'profiles')
            cy.go('back')
            cy.get('@navbar-menus').eq(1).contains('Posts').click()
            cy.url().should('include', 'posts')
            cy.go('back')
            cy.get('@navbar-menus').eq(2).contains('Dashboard').click()
            cy.url().should('include', 'dashboard')
            cy.go('back')
            cy.get('@navbar-menus').eq(3).contains('Logout').click()
            cy.url().should('include', 'login')
        })
    });

    describe('navbar responsive UI', () => {
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

})

