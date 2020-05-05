describe('login page UI', () => {
    before(() => {
        cy.SignIn() 
        cy.visit('/posts')
    })
    it('creates new post', () => {
        const postText = 'this post is created with cypress'
        cy.get('.fa-user').should('be.visible')
        cy.get('.lead').contains('Welcome to the community').should('be.visible')
        cy.get('form').within(($form) => {
            cy.get('textarea').type(postText)
            cy.root().submit()
        })
        cy.wait(500)
        cy.get('.posts').children().should('have.length', 2)
        cy.get('.post').within(($post) => {
            cy.get('h4').contains('valid name')
            cy.get('p').contains(postText)
        })
    })

    it('Mark-unmark as favourite', function () {
        cy.get('.fa-thumbs-up').first().click()
        cy.get('.btn-light').first().children('span').children('span').then(($like) => {
            return $like.text()
        }).as('likeCount')
        cy.get('@likeCount').then(($count) => {
            expect(parseInt($count)).to.eq(1)
        })
        cy.get('.fa-thumbs-down').first().click()
        cy.get('.btn-light').first().children().as('children')
        cy.get('@children').eq(1).as('zero')
        cy.get('@zero').should('not.be.visible')
    })
    it('create new comment', function () {
        const commentText = 'this comment is made with cypress'
        cy.get('.btn-primary').first().as('default')
        cy.get('@default').children().should('not.exist')
        cy.get('.btn-primary').contains('Discussion').click()
        cy.get('.post-form').within(($form) => {
            cy.get('h3').contains('Leave a Comment').should('be.visible')
            cy.get('textarea').type(commentText)
            cy.get('.btn-dark').contains('Submit').click()
        })
        cy.wait(500)
        cy.get('.comments').children().should('have.length', 1)
        cy.contains('Comment Added').should('be.visible')
        cy.get('.post').within(($post) => {
            cy.get('h4').contains('valid name').should('be.visible')
            cy.get('p').contains(commentText).should('be.visible')
            cy.get('.btn-danger').should('be.visible')   
        })
        cy.get('.btn').contains('Back To Posts').click()
        cy.get('@default').children().then(($count) => {
            expect(parseInt($count.text())).to.eq(1)
        })
    })
    it('delete post', function () {
        cy.get('.btn-danger').click()
        cy.contains('Post removed')
    })

})
