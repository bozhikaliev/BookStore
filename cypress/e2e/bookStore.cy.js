describe ('BookStore app', () => {

    //defining a function for asserting the successful response from API calls
    function assertSuccessfulResponse(alias) {
        return cy
        .wait(alias)
        .its('response.statusCode')
        .should('be.within', 200, 399);
        }

    //test for login/logut
    it('Login and Logout', () => {

        //intercepting the response from the API call
        cy.intercept('Post', 'https://demoqa.com/Account/v1/Login').as('login')

        //logging in and logging out
        cy.visit('https://demoqa.com/books')
        cy.contains('Login').click()
        cy.get('[id="userName"]').click().type('VasilB')
        cy.get('[id="password"]').click().type('x6J32#yz!$#fJAH')
        cy.get('[id="login"]').click()
        cy.contains('Log out').click()

        //asserting the response from the API call
        assertSuccessfulResponse("@login")
    })

    //test with a whole user flow
    it('User flow', () => {

        //intercepting the responses from the API calls
        cy.intercept('Post', 'https://demoqa.com/Account/v1/Login').as('login')
        cy.intercept('Get', 'https://demoqa.com/BookStore/v1/Books').as('bookList')
        cy.intercept('Delete', 'https://demoqa.com/BookStore/v1/Books?UserId=fe48fb5b-4cc9-422d-9f46-6162d3395254').as('deletedBooks')
        
        //adjusting the size of the screen
        cy.viewport('macbook-16')

        //logging in to the app
        cy.visit('https://demoqa.com/books')
        cy.contains('Login').click()
        cy.get('[id="userName"]').click().type('VasilB')
        cy.get('[id="password"]').click().type('x6J32#yz!$#fJAH')
        cy.get('[id="login"]').click()

        //searching and adding Book 1 to the collection
        cy.get('[id="gotoStore"]').click({ force: true })
        cy.get('[placeholder="Type to search"]').click().type('elo')
        cy.contains('Eloquent JavaScript, Second Edition').click()
        cy.contains('Add To Your Collection').click()

        //searching and adding Book 2 to the collection
        cy.contains('Back To Book Store').click()
        cy.get('[placeholder="Type to search"]').click().type('program')
        cy.contains('Programming JavaScript Applications').click()
        cy.contains('Add To Your Collection').click()

        //searching and adding Book 3 to the collection
        cy.contains('Back To Book Store').click()
        cy.get('[placeholder="Type to search"]').click().type('understand')
        cy.contains('Understanding ECMAScript 6').click()
        cy.contains('Add To Your Collection').click()

        //going to the profile
        cy.visit('https://demoqa.com/profile')

        //asserting that the Book1 is added to the profile list
        cy.get('[id="see-book-Eloquent JavaScript, Second Edition"]')
        .should('contain', 'Eloquent JavaScript, Second Edition')

        //asserting that the Book2 is added to the profile list
        cy.get('[id="see-book-Programming JavaScript Applications"]')
        .should('contain', 'Programming JavaScript Applications')

        //asserting that the Book3 is added to the profile list
        cy.get('[id="see-book-Understanding ECMAScript 6"]')
        .should('contain', 'Understanding ECMAScript 6')

        //searching for a book and deleting it
        cy.get('[placeholder="Type to search"]').click().type('elo')
        cy.get('[id="delete-record-undefined"]').click()
        cy.get('[id="closeSmallModal-ok"]').click()

        //clearing the search bar
        cy.get('[placeholder="Type to search"]').clear()

        //deleting all books from the profile list
        cy.contains('Delete All Books').click()
        cy.get('[id="closeSmallModal-ok"]').click()

        //loggin out
        cy.contains('Log out').click()

        //asserting successful responses from the API calls
        assertSuccessfulResponse('@login')
        assertSuccessfulResponse('@bookList')
        assertSuccessfulResponse('@deletedBooks')

    })

  })




