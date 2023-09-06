import ACDMenu from "@page-objects/CXone/acd/acd-general/acd-menu";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by, ProtractorBrowser } from "protractor";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { Logger, FunctionType } from "@utilities/general/logger";
import { CustomerWorkspace } from "@data-objects/CXone/acd/customer_workspace";
import TestRunInfo from "@data-objects/general/test-run-info";
import { EditMode } from "@data-objects/general/general";
import { lookup } from "dns";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

export default class BusinessUnitDetailsPage extends ACDMenu {

    constructor() { super(); }

    private static _businessUnitDetails: BusinessUnitDetailsPage = null;

    public static getInstance(): BusinessUnitDetailsPage {
        // this._businessUnitDetails = (this._businessUnitDetails == null) ? new BusinessUnitDetailsPage() : this._businessUnitDetails;
        this._businessUnitDetails = new BusinessUnitDetailsPage();
        return this._businessUnitDetails;
    }

    protected tabBusinessUnitDetails = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabDetails']"));
    protected btnEdit = new ElementWrapper(by.xpath("//button[contains(@id,'UnitDetails_btnEdit_ShadowButton')]"));
    protected btnDone = new ElementWrapper(by.xpath("//button[contains(@id,'btnNext_ShadowButton')]"));
    protected btnDiscardChange = new ElementWrapper(by.xpath("//button[contains(@id,'btnCancelOrDiscard_ShadowButton')]"));
    protected phoneTimeOutField = new SelectElementWrapper(by.xpath("//select[contains(@id,'ddlPhoneNumberTimeout')]"));
    protected startDayOfWeekFiled = new SelectElementWrapper(by.xpath("//select[contains(@id,'ddStartDayOfWeek')]"));
    protected cbbUseFacedeRouting = new ElementWrapper(by.xpath("//input[contains(@id,'tabDetails_UnitDetails_BusinessUnitForm1_cbUseFacadeRouting')]"));
    protected btnRemoveCustomerWorkspace = new ElementWrapper(by.xpath("//table[@id='customWorkspaceTable']//tr[count(//table[@id='customWorkspaceTable']//tr)]//input[contains(@id,'btnRemoveCustomWorkspace')]"));
    protected btnAddCustomerWorkspace = new ElementWrapper(by.xpath("//button[contains(@id,'btnAddCustomWorkspace_ShadowButton')]//span[contains(@id,'btnAddCustomWorkspace_ShadowButtonSpan')]"));
    protected txtCustomerWorkspaceLabel = new ElementWrapper(by.xpath("//table[@id='customWorkspaceTable']//tr[count(//table[@id='customWorkspaceTable']//tr)]//input[contains(@id,'txtWorkspaceLabel')]"))
    protected txtCustomerUrl = new ElementWrapper(by.xpath("//table[@id='customWorkspaceTable']//tr[count(//table[@id='customWorkspaceTable']//tr)]//input[contains(@id,'txtUrl')]"));
    protected lblCustomerLabel = new ElementWrapper(by.xpath("//table[@id='customWorkspaceTable']//tr[count(//table[@id='customWorkspaceTable']//tr)]//span[contains(@id,'lblWorkspaceLabel')]"));
    protected lblCustomerUrl = new ElementWrapper(by.xpath("//table[@id='customWorkspaceTable']//tr[count(//table[@id='customWorkspaceTable']//tr)]//span[contains(@id,'lblWorkspaceUrl')]"));
    protected btnCustomerPreview = new ElementWrapper(by.xpath("//table[@id='customWorkspaceTable']//tr[count(//table[@id='customWorkspaceTable']//tr)]//input[contains(@id,'btnPreview')]"))
    protected lblNumberCustomerWorkspace = new ElementWrapper(by.xpath("//td[@class='form_label nobr CustomWorkspace']"));

    protected lblCustomerWorkspaceByIndex(index: number) {
        return new ElementWrapper(by.xpath(`//table[@id='customWorkspaceTable']//tr[${index}]//span[contains(@id,'lblWorkspaceLabel')]`));
    }

    protected lblCustomerWorkspaceURLDetails(indexCustomerWorkspace: number, indexLabel: number) {
        return new ElementWrapper(by.xpath(`//span[contains(@id,'LblCustomWorkspaceUrlDetails')]/br[${indexCustomerWorkspace}]/preceding-sibling::span[${indexLabel}]`));
    }

    /**
     * Check "Business Unit Details" page is displayed or not
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof BusinessUnitDetailsPage
     */
    public async isBusinessUnitDetailsPageDisplayed(): Promise<boolean> {
        try {
            return await this.tabBusinessUnitDetails.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isBusinessUnitDetailsPageDisplayed, err.message);
        }
    }

    /**
     * Clicking edit button
     * @author Y.Le
     * @returns {Promise<this>}
     * @memberof BusinessUnitDetailsPage
     */
    public async editBusinessDetailPage(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Clicking edit button");
            await this.btnEdit.click();
            await this.waitForSpinner();
            await this.btnDone.waitForPresenceOf();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editBusinessDetailPage, err.message);
        }
    }

    /**
     * Click add customer workspace button
     * @author Y.Le
     * @returns {Promise<this>}
     * @memberof BusinessUnitDetailsPage
     */
    public async clickAddCustomerWorkspaceButton(): Promise<this> {
        try {
            await this.btnAddCustomerWorkspace.click();
            await this.waitForSpinner();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickAddCustomerWorkspaceButton, err.message);
        }
    }

    /**
     * Filling Customer workspace
     * @author Y.Le
     * @param {CustomerWorkspace} customerworkspace
     * @returns {Promise<this>}
     * @memberof BusinessUnitDetailsPage
     */
    public async fillCustomerWorkspace(customerworkspace: CustomerWorkspace): Promise<this> {
        try {
            await this.txtCustomerWorkspaceLabel.waitForPresenceOf();
            await this.txtCustomerWorkspaceLabel.type(customerworkspace.label);
            await this.txtCustomerUrl.type(customerworkspace.url);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillCustomerWorkspace, err.message);
        }
    }

    /**
     * Adding number of customer workspace
     * @author Y.Le
     * @param {...CustomerWorkspace[]} customerWorkspace
     * @returns {Promise<this>}
     * @memberof BusinessUnitDetailsPage
     */
    public async addCustomerWorkspace(...customerWorkspace: CustomerWorkspace[]): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Adding Customer workspace");
            for (var i = 0; i < customerWorkspace.length; i++) {
                await this.clickAddCustomerWorkspaceButton();
                await this.fillCustomerWorkspace(customerWorkspace[i]);
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.addCustomerWorkspace, err.message);
        }
    }

    /**
     * Remove all customer workspace
     * @author Y.Le
     * @returns {Promise<this>}
     * @memberof BusinessUnitDetailsPage
     */
    public async removeAllCustomerWorkspace(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Remove all customer workspace");
            while (await this.btnRemoveCustomerWorkspace.isDisplayed(TestRunInfo.middleTimeout)) {
                await this.btnRemoveCustomerWorkspace.click();
                await this.waitForSpinner();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.removeAllCustomerWorkspace, err.message);
        }
    }

    /**
     * Saving Business Unit
     * @author Y.Le
     * @returns {Promise<this>}
     * @memberof BusinessUnitDetailsPage
     */
    public async saveBusinessUnit(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Saving Business Unit");
            await this.btnDone.scrollToElement();
            await this.btnDone.click();
            await this.waitForSpinner();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.saveBusinessUnit, err.message);
        }
    }

    /**
     * Getting edit mode of business unit page
     * @author Y.Le
     * @returns {Promise<EditMode>}
     * @memberof BusinessUnitDetailsPage
     */
    public async getModeBusinessUnitPage(): Promise<EditMode> {
        try {
            await Logger.write(FunctionType.UI, "Getting edit mode of business unit page");
            if (await this.btnEdit.isDisplayed(TestRunInfo.middleTimeout)) {
                return EditMode.READ;
            } else {
                return EditMode.EDIT;
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getModeBusinessUnitPage, err.message);
        }
    }

    /**
     * Getting entered label customer workspace
     * @author Y.Le
     * @returns {Promise<string>}
     * @memberof BusinessUnitDetailsPage
     */
    public async getEnteredLabelCustomerWorkspace(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting entered label customer workspace");
            return <string>await BrowserWrapper.executeScript(`return document.evaluate("//table[@id='customWorkspaceTable']//tr[count(//table[@id='customWorkspaceTable']//tr)]//input[contains(@id,'txtWorkspaceLabel')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value`);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEnteredLabelCustomerWorkspace, err.message);
        }
    }

    /**
     * Getting entered URL customer workspace
     * @author Y.Le
     * @returns {Promise<string>}
     * @memberof BusinessUnitDetailsPage
     */
    public async getEnteredUrlCustomerWorkspace(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting entered URL customer workspace")
            return <string>await BrowserWrapper.executeScript(`return document.evaluate("//table[@id='customWorkspaceTable']//tr[count(//table[@id='customWorkspaceTable']//tr)]//input[contains(@id,'txtUrl')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value`)
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEnteredUrlCustomerWorkspace, err.message);
        }
    }

    /**
     * Check add customer workspace 
     * @author Y.Le
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof BusinessUnitDetailsPage
     */
    public async isAddCustomerWorkspaceButtonDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.btnAddCustomerWorkspace.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAddCustomerWorkspaceButtonDisplayed, err.message);
        }
    }

    /**
     * Check customer workspace label is displayed
     * @author Y.Le
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof BusinessUnitDetailsPage
     */
    public async isNumberCustomerLabelDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.lblNumberCustomerWorkspace.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isNumberCustomerLabelDisplayed, err.message);
        }
    }

    /**
     * 
     *
     * @param {number} index
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof BusinessUnitDetailsPage
     */
    public async isCustomerWorkspaceByIndex(index: number, timeOut?: number): Promise<boolean> {
        try {
            return await this.lblCustomerWorkspaceByIndex(index).isDisplayed(timeOut)
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCustomerWorkspaceByIndex, err.message);
        }
    }

    /**
     * Check label 
     *
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof BusinessUnitDetailsPage
     */
    public async isLabelCustomerWorkspaceDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.txtCustomerWorkspaceLabel.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLabelCustomerWorkspaceDisplayed, err.message);
        }
    }

    /**
     * Check URL field displayed
     * @author Y.Le
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof BusinessUnitDetailsPage
     */
    public async isURLCustomerWorkspaceDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.txtCustomerUrl.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isURLCustomerWorkspaceDisplayed, err.message);
        }
    }

    /**
     * Check preview button displayed
     * @author Y.Le
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof BusinessUnitDetailsPage
     */
    public async isCustomerWorkspacePreviewButtonDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.btnCustomerPreview.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCustomerWorkspacePreviewButtonDisplayed, err.message);
        }
    }

    /**
     * Check remove customer workspace button is 
     * @author Y.Le
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof BusinessUnitDetailsPage
     */
    public async isRemoveCustomerWorkspaceButtonDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.btnRemoveCustomerWorkspace.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRemoveCustomerWorkspaceButtonDisplayed, err.message);
        }
    }

    /**
     * Getting customer workspace details
     * @author Y.Le
     * @param {number} customerIndex
     * @returns {Promise<string>}
     * @memberof BusinessUnitDetailsPage
     */
    public async getCustomerWorkspaceDetailsByIndex(customerIndex: number): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting customer workspace details ${customerIndex}`);
            let customerDetail: string = "";
            for (let i = 3; i > 0; i--) {
                let customerSegmentDetail: string = await this.lblCustomerWorkspaceURLDetails(customerIndex, i).getAttribute('title');
                customerDetail = customerDetail+ customerSegmentDetail;
            }
            return customerDetail;
        } catch(err){
            throw new errorwrapper.CustomError(this.getCustomerWorkspaceDetailsByIndex, err.message);
        }
    }

}
