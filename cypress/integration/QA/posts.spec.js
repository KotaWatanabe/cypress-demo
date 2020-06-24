describe('posts page UI', () => {
    before(() => {
        cy.SignIn() 
        cy.visit('/posts')
    })

    it('has title and welcome message',() => {
        cy.get('.large').should('have.text','Posts')
        cy.get('.fa-user').should('be.visible')
        cy.get('.lead').should('have.text', ' Welcome to the community')
    })

    it('has already one post',() => {
        cy.get('.posts').children().should('have.length', 1)
    })
})

describe('create new post',() => {
    it('can not create new post without input', () => {
        cy.get('form').within(($form) => {
            cy.root().submit()
        })
        cy.get('.posts').children().should('have.length', 1)
    })

    it('creates new post', () => {
        const postText = 'this post is created with cypress'
        cy.get('form').within(($form) => {
            cy.get('textarea').type(postText)
            cy.root().submit()
        })
        cy.get('.posts').children().should('have.length', 2)
        cy.contains('Post Created').should('be.visible')
        cy.get('.post').eq(0).within(($post) => {
            cy.get('h4').should('have.text','valid name')
            cy.get('p').eq(0).should('have.text',postText)
        })
    })
})

describe('like post and unlike post', () => {

    
    it('can like post by clicking like button', function () {
        cy.get('.fa-thumbs-up').first().as('likeBtn').click()
        cy.get('@likeBtn').click()
        cy.get('.btn-light').first().children('span').children('span').then(($like) => {
            return $like.text()
        }).as('likeCount')
        cy.get('@likeCount').then(($count) => {
            expect(parseInt($count)).to.eq(1)
        })
    })

    it('can not like more than one time', () => {
        cy.get('.fa-thumbs-up').first().as('likeBtn').click()
        cy.get('@likeBtn').click()
        cy.get('.btn-light').first().children('span').children('span').then(($like) => {
            return $like.text()
        }).as('likeCount')
        cy.get('@likeCount').then(($count) => {
            expect(parseInt($count)).to.eq(1)
        })
    })

    it('can unlike post by clicking unlike button', () => {
        cy.get('.fa-thumbs-down').first().as('unlikeBtn').click()
        cy.get('.btn-light').first().children().as('children')
        cy.get('@children').eq(1).as('zero')
        cy.get('@zero').should('not.be.visible')
    })

    it('can not unlike more than one time',() => {
        cy.get('.fa-thumbs-down').first().as('unlikeBtn').click()
        cy.get('.btn-light').first().children().as('children')
        cy.get('@children').eq(1).as('zero')
        cy.get('@zero').should('not.be.visible')
    })

    it('can unlike only own like', () => {
        cy.get('.fa-thumbs-down').eq(1).click()
        cy.get('.btn-light').first().children().as('children')
        cy.get('@children').eq(1).as('zero')
        cy.get('@zero').should('not.be.visible')
    })
})

describe('create new comment',() => {
    it('has no comment at first', function () {
        cy.get('.btn-primary').first().as('descCount')
        cy.get('@descCount').children().should('not.exist')
    })

    it('goes to individual post page',() => {
        cy.SignIn() 
        cy.visit('/posts')
        const authorName = 'valid name'
        cy.get('.btn-primary').contains('Discussion').click()
        cy.get('.post').first().within($post => {
            cy.get('h4').then($name => {
                expect($name.text()).to.eq(authorName)
            })
        })
    })
    it('can not create a new comment without input',() => {
        cy.get('.post-form').within(($form) => {
            cy.get('h3').contains('Leave a Comment').should('be.visible')
            cy.get('.btn-dark').contains('Submit').click()
            cy.get('.comments').should('not.exist')
        })
    })

    it('create a new comment and shows on the top',() => {
        const commentText = 'this comment is made with cypress'
        cy.get('.post-form').within(($form) => {
            cy.get('textarea').type(commentText)
            cy.get('.btn-dark').contains('Submit').click()
        })

        cy.get('.comments').children().should('have.length', 1)
        cy.contains('Comment Added').should('be.visible')

        cy.get('.post').within(($post) => {
            cy.get('h4').contains('valid name').should('be.visible')
            cy.get('p').contains(commentText).should('be.visible')
            cy.get('.btn-danger').should('be.visible')   
        })
    })

    it('shows comment count', () => {
        cy.get('.btn').contains('Back To Posts').click()

        cy.get('.btn-primary').first().children().then(($count) => {
            expect(parseInt($count.text())).to.eq(1)
        })
    })
 
})

describe('delete post',() => {
    it('can delete only own post', () => {
        cy.get('.post').eq(1).within(($othersPost) => {
            cy.get('.btn-danger').should('not.exist')
        })
    })
    it('delete post', function () {
        cy.get('.btn-danger').click()
        cy.contains('Post removed')
    })
})




