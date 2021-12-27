import "cypress-xpath"
import { getText,assertCompareTwoStrings, storeXpathValue } from "../../src/browser-functions.js"
class MyProfilePage {
    clickOnMyProfileIcon() {
        cy.get('img[alt="My Profile"]').click()
        cy.wait(1000)
    }
    updateProfile(data) {
        var count = data.Users.length;
        var firstname, lastname, description, displayname;
        for (var i = 0; i < count; i++) {
            if (data.Users[i].email === Cypress.env("USERNAME")) {
                firstname = data.Users[i].firstname
                lastname = data.Users[i].lastname
                description = data.Users[i].description
                displayname = data.Users[i].displayname
            }
        }
        this.enterFirstName(firstname)
        this.enterLastName(lastname)
        this.enterDisplayName(displayname)
        this.enterDescription(description)
        this.clickOnSaveProfileDetailsButton()
    }
    enterFirstName(firstname) {
        cy.get('input[id="first_name"]').clear()
        cy.get('input[id="first_name"]').type(firstname)
    }
    enterLastName(lastname) {
        cy.get('input[id="last_name"]').clear()
        cy.get('input[id="last_name"]').type(lastname)
    }
    enterDescription(description) {
        cy.get('textarea[name="description"]').clear()
        cy.get('textarea[name="description"]').type(description)
    }
    enterDisplayName(displayname) {
        cy.get('input[id="display_name"]').clear()
        cy.get('input[id="display_name"]').type(displayname)
    }
    clickOnSaveProfileDetailsButton() {
        cy.xpath('//button[.="Save profile details"]').then(($btn) => {
            if ($btn.is(":disabled")) {
                return
            } else {
                cy.wrap($btn).click()
                cy.wait(2000)
                //this.verifyProfileUpdateSuccessMessage()
            }
        })
    }
    verifyProfileUpdateSuccessMessage() {
        cy.xpath('//span[.="Settings saved successfully!"]').should('be.visible');
    }''
    logoutUser() {
        cy.xpath('//button[.="Log out"]').click()
        cy.get('a[title="Log in"]').click()
    }
    validateProfile(data) {
        var count = data.Users.length;
        var firstname, lastname, description, displayname;
        for (var i = 0; i < count; i++) {
            if (data.Users[i].email === Cypress.env("USERNAME")) {
                firstname = data.Users[i].firstname
                lastname = data.Users[i].lastname
                description = data.Users[i].description
                displayname = data.Users[i].displayname
            }
        }
        this.verifyFirstName(firstname)
        this.verifyLastName(lastname)
        this.verifyDescription(description)
        this.verifyDisplayName(displayname)
    }
    verifyFirstName(firstname) {
        cy.get('input[id="first_name"]').should('have.attr', 'value', firstname)
    }
    verifyLastName(lastname) {
        cy.get('input[id="last_name"]').should('have.attr', 'value', lastname)
    }
    verifyDescription(description) {
        getText('textarea[name="description"]', () => {
            var actualDescription = global.elementText
            assertCompareTwoStrings(description, actualDescription)
        })
    }
    verifyDisplayName(displayname) {
        cy.get('input[id="display_name"]').should('have.attr', 'value', displayname)
    }
    addLink(data)
    {
        var count = data.Users.length;
        var urllink, linkdescription;
        for (var i = 0; i < count; i++) {
            if (data.Users[i].email === Cypress.env("USERNAME")) {
                urllink = data.Users[i].urllink
                linkdescription = data.Users[i].linkdescription
            }
        }
        this.clickOnAddButtonUnderProfileLink()
        cy.wait(1000)
        this.clickOnAddUrlButton()
        cy.wait(1000)
        this.enterUrl(urllink)
        cy.wait(1000)
        this.enterURLDescription(linkdescription)
        cy.wait(1000)
        this.clickOnAddSite()
        cy.wait(1000)
        this.verifyAddedSite(urllink)
    }
    clickOnAddButtonUnderProfileLink()
    {
        cy.get('button[class="button is-compact"]').click()
    }
    clickOnAddUrlButton()
    {
        cy.xpath('//button[.="Add URL"]').click()


    }
    enterUrl(urllink)
    {
        cy.xpath('//input[@type="text" and @name="value"]').type(urllink)
   
    }
    enterURLDescription(linkdescription)
    {
        cy.xpath('//input[@type="text" and @name="title"]').type(linkdescription)

    }
    clickOnAddSite()
    {
        cy.xpath('//button[.="Add Site"]').click()
    }
    verifyAddedSite(urllink)
    {
        
        storeXpathValue('(//span[@class="profile-link__url"])[last()]', () => {
            var actualLink = global.visited
            assertCompareTwoStrings(urllink, actualLink)
        })
    }
    removeSiteLink(data)
    {
        var count = data.Users.length;
        var urllink;
        for (var i = 0; i < count; i++) {
            if (data.Users[i].email === Cypress.env("USERNAME")) {
                urllink = data.Users[i].urllink
            }
        }
        cy.xpath(' //span[.="'+urllink+'"]/../..//button[@class="button profile-link__remove is-borderless"]').click()
        cy.wait(1000)
        this.verifyRemovalOfLink(urllink)
        cy.wait(1000)
    }
    verifyRemovalOfLink(urllink)
    {
        cy.get('li[class="profile-link"] a').should('not.have.attr', 'href',urllink)
    }
}
export default MyProfilePage
