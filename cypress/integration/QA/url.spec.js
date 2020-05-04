describe('Create and mark-unmark as Favourite', function() {
    it('Sign in', function() {
        cy.visit('https://react-redux.realworld.io/#/login')
        cy.title().should('eq','Conduit')
        cy.location('protocol').should('eq',('https:'))
        cy.get('input[type="email"]').type('test331@gmail.com')
        cy.get('input[type="password"]').type('testtest')
        cy.get('.btn').contains('Sign in').should('be.visible').click()
        cy.contains('Your Feed', {timeout:10000}).should('be.visible')
    })

    it('Create a post', function() {
        cy.contains('New Post').click()
        cy.hash().should('include', '#/editor')
        cy.get('input[placeholder="Article Title"]').type('Test')
        cy.get('input[placeholder="What\'s this article about?"]').type('Test')
        cy.get('textarea[placeholder="Write your article (in markdown)"]').type('Test')
        cy.contains('Publish Article').click()
        cy.url().should('include','article')
    })

    it('Mark-unmark as favourite', function() {
        cy.get('.nav-link').contains('kota3316').click()
        cy.contains('My Articles').should('be.visible')
        cy.get('.ion-heart').click()
        cy.contains('Favorited Articles').should('be.visible').click()
        cy.url().should('include','favorites')
        cy.get('.ion-heart').click()
        cy.reload()
        cy.contains('No articles are here... yet.').should('be.visible')
        cy.go('back')
    })
})
