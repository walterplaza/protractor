import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";


export default class PointOfContactPage extends NavigationBar {

    private static _pointOfContact: PointOfContactPage = null;

    public static getInstance(): PointOfContactPage {
        this._pointOfContact = new PointOfContactPage();
        return this._pointOfContact;
    }

    protected btnSaveDetailTab = new ElementWrapper(by.xpath("//button[contains(@id,'btnSaveDetails_ShadowButton')]"));
    protected txtContactName = new ElementWrapper(by.xpath("//input[contains(@id,'txtContactName')]"));
    protected lblPointOfContact = new ElementWrapper(by.xpath("//span[contains(@id,'lblPointOfContact')]"));
    protected ddlChatProfiles = new SelectElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcPointOfContactDetails_tpnlPointOfContactDetails_ctrlPointOfContactEdit_ddlChatProfiles']"));
    protected lblEmbeddedCode = new ElementWrapper(by.xpath("//span[contains(@id,'lblEmbededCode')]"))
    protected btnEdit = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcPointOfContactDetails_tpnlPointOfContactDetails_btnEditDetails_ShadowButton']"));
    protected btnDone = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcPointOfContactDetails_tpnlPointOfContactDetails_btnSaveDetails_ShadowButton']"));
    protected dlgSpinner = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_uprgLoading'][@style='display: block;']"))

    /**
     * Getting customer url
     * @returns {Promise<string>} 
     * @memberof PointOfContactPage
     */
    public async getCustomerURL(): Promise<string> {
        try {
            Logger.write(FunctionType.UI, "Getting customer url");
            return await this.lblPointOfContact.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCustomerURL, err.message);
        }
    }
    /**
     * Mapping point of contact to chat profile
     * @param {string} chatProfileName 
     * @returns {Promise<this>} 
     * @memberof PointOfContactPage
     */
    public async mapPointOfContactToChatProfile(chatProfileName: string): Promise<this> {
        try {
            Logger.write(FunctionType.UI, "Mapping point of contact to chat profile");
            await this.btnEdit.click();
            await this.dlgSpinner.waitUntilDisappear();
            await this.ddlChatProfiles.selectOptionByText(chatProfileName);
            await this.btnDone.click();
            await this.dlgSpinner.waitUntilDisappear();
            return await this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.mapPointOfContactToChatProfile, err.message);
        }
    }
    /**
     * Getting embedded code
     * @returns {Promise<string>} 
     * @memberof PointOfContactPage
     */
    public async getEmbeddedCode(): Promise<string> {
        try {
            Logger.write(FunctionType.UI, "Getting embedded code");
            return await this.lblEmbeddedCode.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEmbeddedCode, err.message);
        }
    }
}
