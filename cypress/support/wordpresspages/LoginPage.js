import {verifyElementPresence} from "../../src/browser-functions.js"
class LoginPage {
    loginToWordPress() {
        verifyElementPresence('div[class="login__form-header"]', () => {
            if(global.tagLength > 0)
            {
               cy.get('input[id="usernameOrEmail"]').type(Cypress.env("USERNAME"))
               cy.get('button[type="submit"]').click()
               cy.get('input[id="password"]').type(Cypress.env("PASSWORD"))
               cy.get('button[type="submit"]').click()
               cy.wait(5000)
            }
        })
    }
}
export default LoginPage