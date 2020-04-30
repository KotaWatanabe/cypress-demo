describe('working with plugin', function() {
    it('File upload',function() {
        cy.visit('https://cgi-lib.berkeley.edu/ex/fup.html')

        const fileName = 'sample.pdf';
        cy.get('[type="file"]').attachFile(fileName);
        cy.get('[type="submit"]').click()
        cy.contains("You\'ve uploaded a file")
    })

})

