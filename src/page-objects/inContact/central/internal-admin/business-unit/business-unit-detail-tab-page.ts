import { Browser } from "@data-objects/general/platform";
import TestRunInfo from "@data-objects/general/test-run-info";
import BusinessUnitPage from "@page-objects/inContact/central/internal-admin/business-unit/internal-business-unit-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";

export default class BusinessUnitDetailsPage extends BusinessUnitPage {

    private static _businessUnitDetailPage: BusinessUnitDetailsPage = null;

    public static getInstance(): BusinessUnitDetailsPage {
        this._businessUnitDetailPage = new BusinessUnitDetailsPage();
        return this._businessUnitDetailPage;
    }

    protected tabFeature = new ElementWrapper(by.xpath("//span[contains(@id,'tcBusinessUnit_tabFeatures_tab')]"));
    protected divAgentList = new ElementWrapper(by.xpath("//div[@id='uimanager_container']"));
    protected divSpinner = new ElementWrapper(by.xpath("//div[@id='Spinner_msgPanelLoading']"));
    protected btnEditDetail = new ElementWrapper(by.xpath("//button[.//span[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabDetails') and text()='Edit']]"));
    protected ddlUserInterfaceTheme = new SelectElementWrapper(by.xpath("//select[contains(@id,'ddlUserInterfaceTheme')]"));
    protected btnDoneDetail = new ElementWrapper(by.xpath("//button[.//span[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabDetails') and text()='Done']]"));
    protected chkEnableDialingByProficiency = new ElementWrapper(by.xpath("//input[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabDetails')][contains(@id,'BusinessUnitForm1_chkEnableDialingByProficiency')]"));
    protected txtMaxOfCall = new ElementWrapper(by.xpath("//span[text()='Max # of Calls']/parent::td/following-sibling::td/input"));
    protected lblMaxOfCall = new ElementWrapper(by.xpath("//td[contains(text(),'Max # of Calls')]/following-sibling::td/span"));
    protected lblErrorMsg = new ElementWrapper(by.xpath("//div[@class='msg_outer_box']/div[@class='msg error' and contains(text(),'error')]"));
    protected btnDiscardChanges = new ElementWrapper(by.xpath("//button[./span[text()='Discard Changes']]"));
    protected icoMaxOfCall = new ElementWrapper(by.xpath("//span[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabDetails')][contains(@id,'BusinessUnitForm1_ttMaxNumOfCalls_Trigger')]"));
    protected lblQsmMaxOfCall = new ElementWrapper(by.xpath("//span[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabDetails')][contains(@id,'BusinessUnitForm1_ttMaxNumOfCalls_Trigger')]/span[@class='ToolTip-Yellow']"));
    protected txtMaxWaitTime = new ElementWrapper(by.xpath("//span[text()='Maximum Wait Time to Consider']/parent::td/following-sibling::td/input"));
    protected lblQuestionIcon = new ElementWrapper(by.xpath("//span[text()='Maximum Wait Time to Consider']/following-sibling::span/img"));
    protected pnlToolTip = new ElementWrapper(by.xpath("//div[@class='ToolTip-Yellow']"));

    // Dynamic controls
    protected tabBusiness(tabName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_header']//span[text()='${tabName}']`));
    }

    /**
     * Select a Business tab
     * @returns {Promise<BusinessUnitPageDetails>} Business unit Details page
     * @param {string} tabName Business tab
     * @memberof BusinessUnitDetailsPage
     */
    public async selectBusinessTab(tabName: string): Promise<BusinessUnitDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting Business ${tabName} tab`);
            await this.waitForSpinnerComponentDisappear();
            await this.tabBusiness(tabName).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectBusinessTab, err.message);
        }
    }

    /**
     * Click on Edit button of Business Detail
     * @returns {Promise<BusinessUnitPageDetails>} Business unit Details page
     *  @memberof BusinessUnitDetailsPage
     */
    public async editBusinessDetail(): Promise<BusinessUnitDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on Edit Business Detail button`);
            if (TestRunInfo.browser == Browser.IE) {
                await this.btnEditDetail.scrollToElement();
            }
            await this.btnEditDetail.waitForVisibilityOf();
            await this.btnEditDetail.click();
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editBusinessDetail, err.message);
        }
    }

    /**
     * Click on Discard Changes button of Business Detail
     * @returns {Promise<BusinessUnitPageDetails>} Business unit Details page
     *  @memberof BusinessUnitDetailsPage
     */
    public async discardChangesBusinessDetail(): Promise<BusinessUnitDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on Discard Changes button`);
            if (TestRunInfo.browser == Browser.IE) {
                await this.btnDiscardChanges.scrollToElement();
            }
            await this.btnDiscardChanges.click();
            await this.waitForPageLoad();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.discardChangesBusinessDetail, err.message);
        }
    }

    /**
     * Select theme of Business Detail
     * @returns {Promise<BusinessUnitPageDetails>} Business unit Details page
     *  @memberof BusinessUnitDetailsPage
     */
    public async changeUserInterfaceTheme(themeName: string): Promise<BusinessUnitDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Changing User Interface Theme - ${themeName}`);
            if (TestRunInfo.browser == Browser.IE) {
                await this.ddlUserInterfaceTheme.scrollToElement();
            }
            await this.ddlUserInterfaceTheme.selectOptionByText(themeName);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.changeUserInterfaceTheme, err.message);
        }
    }

    /**
     * Save Business Detail
     * @returns {Promise<BusinessUnitPageDetails>} Business unit Details page
     *  @memberof BusinessUnitDetailsPage
     */
    public async saveBusinessDetail(): Promise<BusinessUnitDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on 'Done' button`);
            if (TestRunInfo.browser == Browser.IE || TestRunInfo.browser == Browser.EDGE) {
                await this.waitForSpinnerComponentDisappear();
            }
            await this.btnDoneDetail.scrollToElement();
            await this.btnDoneDetail.wait();
            await this.btnDoneDetail.moveMouse();
            await this.btnDoneDetail.click();
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.saveBusinessDetail, err.message);
        }
    }


    /**
     * is Details Page in edit mode
     * @returns {Promise<Boolean>} display: true not display: false
     * @memberof BusinessUnitPage
     */
    public async isDetailsPageInEditMode(): Promise<Boolean> {
        try {
            await this.waitForSpinnerComponentDisappear();
            return await this.btnDoneDetail.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDetailsPageInEditMode, err.message);
        }
    }

    /**
     * Click "Enable Dialing By Proficiency" checkbox
     * @returns {Promise<BusinessUnitPageDetails>} Business unit Details page
     * @memberof BusinessUnitDetailsPage
     */
    public async selectEnableDialingByProficiency(): Promise<BusinessUnitDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Checking 'Enable Dialing By Proficiency' checkbox`);
            if (TestRunInfo.browser == Browser.IE) {
                await this.chkEnableDialingByProficiency.scrollToElement();
            }
            await this.chkEnableDialingByProficiency.setCheckBox(true);
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectEnableDialingByProficiency, err.message);
        }
    }

    /**
     * Unclick "Enable Dialing By Proficiency" checkbox
     * @returns {Promise<BusinessUnitPageDetails>} Business unit Details page
     * @memberof BusinessUnitDetailsPage
     */
    public async deselectEnableDialingByProficiency(): Promise<BusinessUnitDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Unchecking 'Enable Dialing By Proficiency' checkbox`);
            if (TestRunInfo.browser = Browser.IE) {
                await this.chkEnableDialingByProficiency.scrollToElement();
            }
            await this.chkEnableDialingByProficiency.setCheckBox(false);
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.deselectEnableDialingByProficiency, err.message);
        }
    }

    /**
     * Check "Enable Dialing By Proficiency" is checked
     * @returns {Promise<boolean>} check: true not check: false
     * @memberof BusinessUnitDetailsPage
     */
    public async isEnableDialingByProficiencyChecked(): Promise<boolean> {
        try {
            return await this.chkEnableDialingByProficiency.isSelected();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEnableDialingByProficiencyChecked, err.message);
        }
    }

    /**
     * Input value to Max Of Call text box
     * @returns {Promise<BusinessUnitPageDetails>} Business unit Details page
     * @memberof BusinessUnitDetailsPage
     */
    public async inputMaxOfCallTextbox(numberCall): Promise<BusinessUnitDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Entering value ${numberCall}`);
            await this.txtMaxOfCall.type(numberCall);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.inputMaxOfCallTextbox, err.message);
        }
    }

    /**
     * Get Max Of Call value textbox
     * @returns {Promise<number>} number of Max Of Call
     * @memberof BusinessUnitDetailsPage
     */
    public async getMaxOfCallValue(): Promise<number> {
        try {
            await this.lblMaxOfCall.wait();
            let maxOfCall: string = await this.lblMaxOfCall.getText()
            return parseInt(maxOfCall.trim());
        } catch (err) {
            throw new errorwrapper.CustomError(this.getMaxOfCallValue, err.message);
        }
    }

    /**
     * Is Detail Tab Page displayed
     * @returns {Promise<boolean>} display: true not display: false
     * @memberof BusinessUnitDetailsPage
     */
    public async isDetailTabPageDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            await this.waitForSpinnerComponentDisappear();
            return await this.btnEditDetail.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDetailTabPageDisplayed, err.message);
        }
    }

    /**
     * Get error message
     * @returns {Promise<string>} Error message on top page
     * @memberof BusinessUnitDetailsPage
     */
    public async getErrorMessage(): Promise<string> {
        try {
            return await this.lblErrorMsg.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getErrorMessage, err.message);
        }
    }

    /**
     * Verify the error message on top page
     * @returns {Promise<boolean>} error message is match
     * @memberof BusinessUnitDetailsPage
     */
    public async verifyErrorMessage(errorMsg: string): Promise<boolean> {
        try {
            return ((await this.lblErrorMsg.getText()).replace(`\n`, "") == errorMsg);
        } catch (err) {
            throw new errorwrapper.CustomError(this.verifyErrorMessage, err.message);
        }
    }


    /**
     * Get question mark Max of Calls tooltips
     * @returns {Promise<string>} question mark Max of Calls tooltips
     * @author Tung Vo
     * @memberof BusinessUnitDetailsPage
     */
    public async getMaxOfCallIconTooltip(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting question mark Max of Calls tooltips`);
            await this.icoMaxOfCall.scrollToElement();
            await this.icoMaxOfCall.moveMouse();
            await this.lblQsmMaxOfCall.waitForVisibilityOf();
            let id: string = await this.lblQsmMaxOfCall.getAttribute("id");
            let tooltip: string = String(await BrowserWrapper.executeScript(`return document.getElementById("${id}").textContent;`));
            return tooltip.trim();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getMaxOfCallIconTooltip, err.message);
        }
    }

    /**
     * is question mark Maximum wait time tooltips displayed
     * @returns {Promise<boolean>} displayed or not
     * @author Nhat.Nguyen
     * @memberof BusinessUnitDetailsPage
     */
    public async isMaximumWaitTimeIconTooltipDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            await this.lblQuestionIcon.scrollToElement(); // Handle for move mouse in firefox
            await this.lblQuestionIcon.moveMouse();
            return await this.pnlToolTip.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isMaximumWaitTimeIconTooltipDisplayed, err.message);
        }
    }

    /**
     * is "Maximum Wait Time to Consider" field is displayed
     * @returns {Promise<boolean>} displayed or not
     * @author Nhat.Nguyen
     * @memberof BusinessUnitDetailsPage
     */
    public async isMaximumWaitTimeTextBoxDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.txtMaxWaitTime.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isMaximumWaitTimeTextBoxDisplayed, err.message);
        }
    }
}