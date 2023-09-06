import { DispositionName } from "@data-objects/general/max";
import TestRunInfo from "@data-objects/general/test-run-info";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";


export default class ContactHistoryPage {

    private static _contactHistoryPage: ContactHistoryPage = null;

    protected btnApplysOptions = new ElementWrapper(by.xpath("//button[@id='btnApplyOptions_ShadowButton']"));

    // Dynamic controls
    protected lblContact(contactId: number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//tr[./td[.='${contactId}']]`));
    }
    protected lblContactWithInfo(contactId: number, info: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//tr[./td[.='${contactId}']/following-sibling::td[count(../td[.='${info}']/preceding-sibling::td)-1]]`));
    }

    public static getInstance(): ContactHistoryPage {
        this._contactHistoryPage = new ContactHistoryPage();
        return this._contactHistoryPage;
    }

    /**
	 * Click on Apply Options button
     * @author Tuan.Vu
	 * @returns {Promise<void>}
	 * @memberof ContactHistoryPage
	 */
    public async clickApplyOptionsButton(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on Apply Options button`);
            await this.btnApplysOptions.waitForVisibilityOf();
            await this.btnApplysOptions.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickApplyOptionsButton, err.message);
        }
    }

    /**
     * Wait for contact disposition data displays
     * @author Tuan.Vu
     * @param {string} contactId
     * @param {string} disposition
     * @returns {Promise<void>} the existence of active contact in report
     * @memberof ContactHistoryPage
     */
    public async waitForContactWithInfoDisplay(contactId: number, disposition: DispositionName): Promise<void> {
        try {
            for (let count: number = 0; count < 8; count++) {
                if (await this.lblContactWithInfo(contactId, disposition).isDisplayed(TestRunInfo.shortTimeout)) {
                    break;
                }

                // Refresh page every 30s to observe if disposition data were appeared
                await BrowserWrapper.sleepInSecond(30);
                await BrowserWrapper.refreshPage();
                await this.clickApplyOptionsButton();
            }

        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForContactWithInfoDisplay, err.message);
        }
    }

    /**
     * Wait for contact disposition data displays
     * @author Tuan.Vu
     * @param {string} contactId
     * @param {string} disposition
     * @param {number} timeOutInSecond
     * @returns {Promise<boolean>} the existence of active contact in report
     * @memberof ContactHistoryPage
     */
    public async isContactDisplayed(contactId: number, info?: string, timeOutInSecond?: number): Promise<boolean> {
        try {
            if (info == "" || info == null) {
                return await this.lblContact(contactId).isDisplayed(timeOutInSecond);

            } else {
                return await this.lblContactWithInfo(contactId, info).isDisplayed(timeOutInSecond);
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForContactWithInfoDisplay, err.message);
        }
    }
}