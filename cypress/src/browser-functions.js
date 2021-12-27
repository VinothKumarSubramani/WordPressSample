import StoreData from '../src/DataExport.js'
export function getText(css, onSuccess) {
    cy.get(css).then(ele => {
        return ele.text();
    }).then(eleValue => {
        StoreData({ 'elementText': eleValue });
        onSuccess()
    })
}
export const verifyElementPresence = (tag, OnSuccess) => {
    cy.get('body').then(($body) => {
        return $body.find(tag).length;
    }).then(tagLength => {
        StoreData({ 'tagLength': tagLength });
        OnSuccess()
    })
}
export const verifyElementDisabled = (tag, OnSuccess) => {
    cy.get(tag).then(($element) => {
        if ($element.is(":disabled")) {
            return true
        } else {
            return false
        }
    }).then(value => {
        StoreData({ 'boolean': value });
        OnSuccess()
    })
}
export function storeXpathValue(xpath, onSuccess) {
    cy.xpath(xpath).then(ele => {
        return ele.text();
    }).then(eleValue => {
        StoreData({ 'visited': eleValue });
        onSuccess()
    })
}
export const assertCompareTwoStrings = (actualValue, expectedValue) => {
    expect(actualValue).to.contain(expectedValue)
};
export function storeAttrValue(xpath, onSuccess) {
    cy.xpath(xpath).invoke('attr', 'value')
        .then((attrValue) => {
            return attrValue;
        }).then(eleValue => {
            StoreData({ 'visited': eleValue });
            onSuccess()
        })
}
export function setResoultion(x, y) {
    cy.viewport(x, y)
}
export function deleteCookies() {
    cy.window().then((win) => {
        win.sessionStorage.clear()
    })
}
export const preserveCookies = () => {
    Cypress.Cookies.defaults({
        preserve: (cookie) => {
            return true;
        }
    })
};
