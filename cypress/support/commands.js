// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })


//   Cypress.Commands.add("bypassRecaptchaCheckbox", () => {
//     cy.window().then((win) => {
//       // Replace 'grecaptcha' with the actual variable name used by reCAPTCHA
//       win.grecaptcha.execute(); // Simulate checkbox click
//     });
//   });


// Cypress.Commands.add("clickRecaptchaCheckbox", () => {
//     // Replace 'your-iframe-selector' with the actual selector for the reCAPTCHA iframe
//     cy.get('[class="mt-2 justify-content-center row"]').then($iframe => {
//       const $body = $iframe.contents().find('body');
//       const $checkbox = $body.find('.recaptcha-checkbox');
  
//       cy.wrap($checkbox).click();
//     });
//   });
  


// Cypress.Commands.add('solveGoogleReCAPTCHA', () => {
//     // Wait until the iframe (Google reCAPTCHA) is totally loaded
//     cy.wait(500);
//     cy.get('[id="g-recaptcha"]')
//       .then($iframe => {
//         const $body = $iframe.contents().find('body');
//         cy.wrap($body)
//           .find('.recaptcha-checkbox-border')
//           .should('be.visible')
//           .click();
//       });
//   });
  


// Cypress.Commands.add('confirmCaptcha', function () {
//     cy.get('[id="g-recaptcha"]')
//       .first()
//       .then((recaptchaIframe) => {
//         const body = recaptchaIframe.contents()
//         cy.wrap(body).find('.recaptcha-checkbox-border', { timeout: 10000 }).should('be.visible').click()
//       })
//   })



Cypress.Commands.add("clickRecaptcha", () => {
    cy.window().then(win => {
      win.document
        .querySelector("iframe[src*='recaptcha']")
        .contentDocument.getElementById("recaptcha-token")
        .click();
    });
  });



