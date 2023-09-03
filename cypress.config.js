const { defineConfig } = require("cypress");

module.exports = defineConfig({

  chromeWebSecurity: false,
  modifyObstructiveCode: false,
  experimentalModifyObstructiveThirdPartyCode: true,
  e2e: {
    setupNodeEvents(on, config) {
      // baseUrl: 'https://demoqa.com/books'
      //specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
      // implement node event listeners here
      // uncaught:exception

      
    },
  },
});
