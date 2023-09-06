import WFMMenu from "@page-objects/CXone/wfm/wfm-general/wfm-menu";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { by } from "protractor";
import { Logger, FunctionType } from "@utilities/general/logger";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";;

export default class RequestsPage extends WFMMenu {

    private static _requestsPage: RequestsPage = null;

    // Dynamic controls
    protected btnApprove(userName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[text()='${userName}']/ancestor::div[@class='ag-body-container']//button[@class='btn btn-secondary btn-default btn-accept']`));
    }

    protected btnDecline(userName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[text()='${userName}']/ancestor::div[@class='ag-body-container']//button[@class='btn btn-secondary btn-default btn-decline ']`));
    }

    public static getInstance(): RequestsPage {
        this._requestsPage = new RequestsPage();
        return this._requestsPage;
    }

    /**
     * Click Approve Button
     * @author Anh.Le
     * @param {string} userName
     * @returns {Promise<RequestsPage>}
     * @memberof RequestsPage
     */
    public async approveRequest(userName: string): Promise<RequestsPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Approve Button");
            await this.btnDecline(userName).waitForPresenceOf();
            await this.btnApprove(userName).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.approveRequest, err.message);
        }
    }

    /**
     * Click Approve Button
     * @author Anh.Le
     * @param {string} userName
     * @returns {Promise<RequestsPage>}
     * @memberof RequestsPage
     */
    public async declineRequest(userName: string): Promise<RequestsPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Decline Button");
            await this.btnDecline(userName).waitForPresenceOf();
            await this.btnDecline(userName).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.declineRequest, err.message);
        }
    }

}