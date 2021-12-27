import axios from 'axios';

const CYPRESS = 'cypress', PROTRACTOR = 'protractor';
const DetectTestRunners = {
    [CYPRESS]: false,
    [PROTRACTOR]: false
};
let IsInitialized = false, IsMemoizationEnabled = true;

export const getSupportedTestRunners = () => {
    return [CYPRESS, PROTRACTOR];
}

export const getCurrentTestRunner = () => {
    if (!IsInitialized) {
        try {
            if (Cypress) {
                DetectTestRunners[CYPRESS] = true;
            }
        } catch (cypressNotPresentException) {
            DetectTestRunners[CYPRESS] = false;
    
            try {
                if (browser) {
                    DetectTestRunners[PROTRACTOR] = true;
                }
            } catch (protractorNotPresentException) {
                DetectTestRunners[PROTRACTOR] = false;
            }
        }
        if (IsMemoizationEnabled) {
            IsInitialized = true;
        }
    }
    return DetectTestRunners;
}

export const isCypressTestRunner = () => {
    const CTR = getCurrentTestRunner();
    return CTR[CYPRESS];
}

export const isProtractorTestRunner = () => {
    const CTR = getCurrentTestRunner();
    return CTR[PROTRACTOR];
}

export const getEnvironmentVariable = (varName) => {
    if (isCypressTestRunner()) {
        return Cypress.env(varName);
    } else if(isProtractorTestRunner()) {
        return browser.params[varName];
    }
}

export const fetchTestData = (filePath) => {
    if (isCypressTestRunner()) {
        return cy.fixture(filePath);
    } else if(isProtractorTestRunner()) {
        // Might have to use https://www.protractortest.org/#/api?view=webdriver.WebDriver.prototype.wait
        return browser.executeAsyncScript(function() {
            return axios.get(filePath);
        });
    }
}

export const _resetInitialization = () => {
    IsInitialized = false;
}

export const _disableMemoization = () => {
    IsMemoizationEnabled = false;
}

export const _enableMemoization = () => {
    IsMemoizationEnabled = true;
}