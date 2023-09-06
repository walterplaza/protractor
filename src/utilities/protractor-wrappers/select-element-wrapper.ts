import TestRunInfo from "@data-objects/general/test-run-info";
import StopWatch from "@utilities/general/stop-watch";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by, Locator } from "protractor";

export default class SelectElementWrapper {

    private _elementTimeout: number = TestRunInfo.elementTimeout;// in second
    private _by: Locator;
    private _element: ElementWrapper;

    constructor(by: Locator) {
        this._by = by;
        this._element = new ElementWrapper(this._by);
    }

    /**
     * Click <div> tag and select child option by ID
     * @param {string} id ID of child element
     * @param {number} [timeoutInSecond=this._elementTimeout] maximum time to wait 
     * @returns {Promise<void>} 
     * @memberof SelectElementWrapper
     */
    public async selectByID(id: string, timeoutInSecond: number = this._elementTimeout): Promise<void> {
        let sw = new StopWatch();
        sw.startClock();
        try {
            await this._element.waitForControlStable();
            await this._element.click(sw.getTimeLeftInSecond(timeoutInSecond));
            let e: ElementWrapper = await this._element.element(by.xpath(`//*[@id='${id}']`), sw.getTimeLeftInSecond(timeoutInSecond));
            await e.click();
        } catch (_err) {
            let err: Error = _err;
            if (err.message.includes("element not visible") || err.message.includes("element not interactable")) {
                await this.selectByID(id, sw.getTimeLeftInSecond(timeoutInSecond));
            } else {
                throw new errorwrapper.CustomError(this.selectByID, err.message);
            }
        }
    }

    /**
     * Click <select> tag and choose <option> tab  
     * @param {Locator} by select locator
     * @param {number} [timeoutInSecond=this._elementTimeout] maximum time to wait
     * @returns {Promise<void>}
     * @memberof SelectElementWrapper
     */
    private async selectOption(by: Locator, timeoutInSecond: number = this._elementTimeout): Promise<void> {
        let sw = new StopWatch();
        sw.startClock();

        try {
            await this._element.waitForControlStable();
            await this._element.click(sw.getTimeLeftInSecond(timeoutInSecond));
            let optionElement: ElementWrapper = await this._element.element(by, sw.getTimeLeftInSecond(timeoutInSecond));
            await optionElement.click();
            await this._element.waitForControlStable();
        } catch (err) {
            if ((<Error>err).message.includes("element not interactable")) {
                await this.selectOption(by, sw.getTimeLeftInSecond(timeoutInSecond));
            } else {
                throw new errorwrapper.CustomError(this.selectOption, err.message);
            }
        }
    }

    /**
     * Select option element by text
     * @param {string} text text of option
     * @returns {Promise<void>} 
     * @memberof SelectElementWrapper
     */
    public async selectOptionByText(text: string): Promise<void> {
        try {
            let tagName = await this._element.getAttribute("tagName");
            let locator: Locator;
            let tagNameLowerCase = await tagName.toLowerCase();
            if (tagNameLowerCase == "select") {
                locator = by.xpath(`//option[text()="${text}"]`);
            } else if (tagNameLowerCase == "div") {
                locator = by.xpath(`//div[@role='option']//span[contains(text(),'${text}')]`);
            }
            await this.selectOption(locator);
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectOptionByText, err.message);
        }
    }

    /**
    * Select option element by text with index
    * @param {string} text text of option
    * @param {number} index index of option
    * @returns {Promise<void>} 
    * @memberof SelectElementWrapper
    */
    public async selectOptionByTextWithIndex(text: string, index: number): Promise<void> {
        try {
            let tagName: string = await this._element.getAttribute("tagName");
            let locator: Locator;

            if (tagName.toLowerCase() == "select") {
                locator = by.xpath(`(//option[text()='${text}'])[${index}]`);
            } else if (tagName.toLowerCase() == "div") {
                locator = by.xpath(`(//div[@role='option']//span[text()='${text}'])[${index}]`);
            }

            await this.selectOption(locator);
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectOptionByTextWithIndex, err.message);
        }
    }

    /**
     * Select option element by text contains
     * @param {string} text text of option
     * @returns {Promise<void>} 
     * @memberof SelectElementWrapper
     */
    public async selectOptionByTextContains(text: string): Promise<void> {
        try {
            let tagName: string = await this._element.getAttribute("tagName");
            let locator: Locator;

            if (tagName.toLowerCase() == "select") {
                locator = by.xpath(`//option[contains(text(),'${text}')]`);
            } else if (tagName.toLowerCase() == "div") {
                locator = by.xpath(`//div[@role='option']//span[contains(text(),'${text}')]`);
            }

            await this.selectOption(locator);
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectOptionByTextContains, err.message);
        }
    }

    /**
     * Select option element by index
     * @param {number} index index of option
     * @returns {Promise<void>} 
     * @memberof SelectElementWrapper
     */
    public async selectOptionByIndex(index: number): Promise<void> {
        try {
            let tagName: string = await this._element.getAttribute("tagName");
            let locator: Locator;

            if (tagName.toLowerCase() == "select") {
                let elementId: string = await this._element.getAttribute("id");
                if (elementId == null) {
                    let elementClass: string = await this._element.getAttribute("className");
                    await BrowserWrapper.executeScript(`document.getElementsByClassName("${elementClass}").selectedIndex = ${index}`);
                } else
                    await BrowserWrapper.executeScript(`document.getElementById("${elementId}").selectedIndex = ${index}`);
            } else if (tagName.toLowerCase() == "div") {
                locator = by.xpath(`//div[@role='option'][${index}]`);
                await this.selectOption(locator);
            }

        } catch (err) {
            throw new errorwrapper.CustomError(this.selectOptionByIndex, err.message);
        }
    }

    /**
     * Wait for element to be clickable
     * @param {number} [timeoutInSecond=this._elementTimeout] maximum time to wait 
     * @returns {Promise<SelectElementWrapper>} 
     * @memberof SelectElementWrapper
     */
    public async wait(timeoutInSecond: number = this._elementTimeout): Promise<SelectElementWrapper> {
        try {
            await this._element.wait(timeoutInSecond);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.wait, err.message);
        }
    }

    /**
     * Check element displays or not
     * @param {number} [timeoutInSecond=this._elementTimeout] maximum time to wait
     * @returns {Promise<boolean>} true or false
     * @memberof SelectElementWrapper
     */
    public async isDisplayed(): Promise<boolean> {
        try {
            return await this._element.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDisplayed, err.message);
        }
    }

    /**
     * Get item is selected
     * @returns {Promise<string>} Return item is selected
     * @memberof SelectElementWrapper
     */
    public async getSelectedItem(timeoutInSecond: number = this._elementTimeout): Promise<string> {
        try {
            await this._element.wait(timeoutInSecond);
            let id: string = await this._element.getAttribute("id");
            return <string>await BrowserWrapper.executeScript(`return document.getElementById('${id}').options[document.getElementById('${id}').selectedIndex].text`);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSelectedItem, err.message);
        }
    }

    /**
     * Get element content
     * @param {number} [timeoutInSecond=this._elementTimeout] maximum time to wait
     * @returns {Promise<string>} 
     * @memberof SelectElementWrapper
     */
    public async getText(timeoutInSecond: number = this._elementTimeout): Promise<string> {
        try {
            return await this._element.getText(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getText, err.message);
        }
    }

    /**
     * Scroll to element
     * @static
     * @returns {Promise<void>} 
     * @memberof SelectElementWrapper
     */
    public async scrollToElement(timeoutInSecond: number = this._elementTimeout): Promise<this> {
        try {
            let id: string = await this._element.getAttribute("id");
            await BrowserWrapper.executeScript(`document.getElementById('${id}').scrollIntoView(false)`);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.scrollToElement, err.message);
        }
    }
}