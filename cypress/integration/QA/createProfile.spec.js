describe.skip('login page UI', () => {
    before(function () {
        cy.SignIn()
    })
    it('has a create profile button and link to the form', () => {
        cy.get('.btn').contains('Create Profile').should('be.visible').click()
        cy.url().should('include','create-profile')
        cy.contains('Go Back').should('be.visible').click()
        cy.url().should('include','dashboard')
        cy.get('.btn').contains('Create Profile').should('be.visible').click()
    })
    it('get error message', () => {
        cy.get('form').within(($form) => {
            cy.root().submit()
        })
        cy.contains('Status is required').should('be.visible')
        cy.contains('Skills is required').should('be.visible')
    })
    it('create a profile', () => {
        cy.get('form').within(($form) => {
            cy.get('select').select('Developer')
            cy.get('input[name="company"]').type('TestCompany Inc')
            cy.get('input[name="website"]').type('https://www.testcom.xyz')
            cy.get('input[name="location"]').type('Test City TC')
            cy.get('input[name="skills"]').type('HTML, CSS, JavaScript')
            cy.get('textarea[name="bio"]').type('This profile was made with Cypress')
            cy.get('button').contains('Add Social Network Links').click()
            cy.get('input[name="twitter"]').type('https://twitter.com/testtest')
            cy.get('input[name="facebook"]').type('https://facebook.com/testtest')
            cy.get('input[name="linkedin"]').type('https://linkedin.com/testtest')
            cy.root().submit()
            // cy.contains('Profile Created').should('be.visible')
        })       
    })
})
