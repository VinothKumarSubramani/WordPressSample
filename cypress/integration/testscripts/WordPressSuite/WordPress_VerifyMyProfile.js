/// <reference types="Cypress" />
import * as data from "../../../fixtures/testData.json"
import MyProfilePage from '../../../support/wordpresspages/MyProfilePage.js'
import LoginPage from '../../../support/wordpresspages/LoginPage.js'
describe('MY Profile Page Validations', () => {
    const myProfilePage = new MyProfilePage()
    const loginPage = new LoginPage()
    before(function () {
        cy.visit(Cypress.env("WORDPRESS_URL"))
        cy.info("LAUNCH URL WORDPRESS")
    })
    it('login as valid user', function () {
        cy.info("LOGIN TO WORDPRESS")
        loginPage.loginToWordPress()
        cy.info("NAVIGATE TO MY PROFILE SECTION")
        myProfilePage.clickOnMyProfileIcon()
    })
    it('Update the Profile', function () {
        cy.info("UPDATE PROFILE")
        myProfilePage.updateProfile(data)
    })
    it('Logout from application', function () {
        cy.info("LOGOUT FROM THE APPLICATION")
        myProfilePage.logoutUser()
    })
    it('Login and Validate Updated Profile', function () {
        cy.info("VERIFY WHETHER PROFILE IS DISPLAYED WITH UPDATED DETAILS")
        loginPage.loginToWordPress()
        myProfilePage.clickOnMyProfileIcon()
        myProfilePage.validateProfile(data)
    })
    it('Add URL under profile links and validate', function () {
        cy.info("ADD LINK UNDER PROFILE LINK AND VALIDATE WHETHER SITE IS ADDED")
        myProfilePage.addLink(data)
    })
    it('Remove links under profile links and validate', function () {
        cy.info("REMOVE LINK UNDER PROFILE LINK AND VALIDATE WHETHER SITE IS ADDED")
        myProfilePage.removeSiteLink(data)
    })

})
