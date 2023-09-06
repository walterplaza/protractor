import GeneralReportPage from "@page-objects/inContact/central/reporting-analytics/general/general-report-page";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class ActiveContactsPage extends GeneralReportPage {

    private static _activeContactsPage: ActiveContactsPage = null;

    // Dynamic controls
    protected lblActiveContactWithStatus(contactId: number, status: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//tr[./td[.='${contactId}']/following-sibling::td[count(../td[.='${status}']/preceding-sibling::td)-1]]`));
    }
    protected lblActiveContact(contactId: number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//tr[./td[.='${contactId}']]`));
    }
    public static getInstance(): ActiveContactsPage {
        this._activeContactsPage = new ActiveContactsPage();
        return this._activeContactsPage;
    }

    /**
     * Check active contact is displayed in report or not 
     * @author Chinh.Nguyen
     * @param {string} contactId
     * @param {string} status
     * @returns {Promise<boolean>} the existence of active contact in report
     * @memberof ActiveContactsPage
     */
    public async isActiveContactDisplayed(contactId: number, status?: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            if (status == null) {
                return await this.lblActiveContact(contactId).isDisplayed(timeoutInSecond);
            } else {
                return await this.lblActiveContactWithStatus(contactId, status).isDisplayed(timeoutInSecond);
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.isActiveContactDisplayed, err.message);
        }
    }

}