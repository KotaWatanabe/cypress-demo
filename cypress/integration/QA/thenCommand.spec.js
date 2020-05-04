describe('Create and mark-unmark as Favourite', function () {
    before(function () {
        cy.SignIn()
    })

    it('Create a post', function () {
        cy.get('ul.navbar-nav').children().contains('New Post').click()

        cy.hash().should('include', '#/editor')

        cy.get('form').within(($form) => {
            cy.get('input').first().type('Test')
            cy.get('input').eq(1).type('Test')
            cy.get('textarea').type('Test')
            cy.contains('Publish Article').click()
        })

        cy.url().should('include', 'article')
    })

    it('Mark-unmark as favourite', function () {
        cy.get('ul.navbar-nav').children().contains('kota3316').click()
        cy.contains('My Articles').should('be.visible')
        cy.get('.ion-heart').first().click()
        cy.contains('Favorited Articles').should('be.visible').click()
        cy.url().should('include', 'favorites')
        cy.get('.btn-primary').first().then(($fav) => {
            const favCount = $fav.text()
            expect(parseInt(favCount)).to.eq(1)
        }).click()
        cy.reload()
        // cy.contains('No articles are here... yet.').should('be.visible')
        cy.go('back')
    })
})
