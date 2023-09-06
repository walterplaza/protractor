import { Browser } from "@data-objects/general/platform";
import TestRunInfo from "@data-objects/general/test-run-info";
import { CallingList } from "@data-objects/inContact/central/personal-connection/lists/calling/calling-list";
import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import { FunctionType, Logger } from '@utilities/general/logger';
import { Utility } from "@utilities/general/utility";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";

export default class CallingListUploadPage extends NavigationBar {
    private static _callingListUploadPage: CallingListUploadPage = null;

    protected txtListName = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_uctUpload_txtListName']"));
    protected cbbSkill = new SelectElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_uctUpload_ddlSkills']"));
    protected uploadFile = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_uctUpload_uploadFileSelector_ctlFileUpload']"));
    protected formCallingListUpload = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_uctUpload_upnlAddressBook']"));
    protected btnNext = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_btnNext_ShadowButton']"));
    protected spanImportStatus = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_lblImportStatus']"));
    protected imgSpinner = new ElementWrapper(by.xpath("//td[@class='form_details']//img[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_imgSpinner']"));
    protected spanSucceeded = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_lblImportStatus'][text()='Succeeded']"));
    protected spanNameOtherDetail = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_whMainNav']//li[@class='current']//span[text()='Name & Other Details']"));

    public static getInstance(): CallingListUploadPage {
        this._callingListUploadPage = new CallingListUploadPage();
        return this._callingListUploadPage;
    }

    /**
     * Check Calling list upload page is displayed or not 
	 * @returns {Promise<boolean>} the existence of Calling list upload page
	 * @memberof CallingListUploadPage
	 */
    public async isPageDisplayed(): Promise<boolean> {
        try {
            return await this.formCallingListUpload.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
	 * Select skill
     * @param skillName Skill name want to select
	 * @returns {Promise<CallingListUploadPage>} Calling list upload page
	 * @memberof CallingListUploadPage
	 */
    public async selectSkill(skillName: string): Promise<CallingListUploadPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting '${skillName}' skill`);
            await this.cbbSkill.selectOptionByText(skillName);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectSkill, err.message);
        }
    }

    /**
     * Fill data in Calling list upload page
     * @param {CallingList} callingList information of callingList to create 
     * @returns {Promise<CallingListUploadPage>} Calling list upload page
     * @memberof CallingListUploadPage
     */
    public async fillCallingList(callingList: CallingList): Promise<CallingListUploadPage> {
        try {
            await Logger.write(FunctionType.UI, "Filling fields in Calling List");
            await this.txtListName.type(callingList.listName);
            await this.selectSkill(callingList.skillName);
            await this.uploadFile.uploadFile(callingList.listCallingFile);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillCallingList, err.message);
        }
    }

    /**
     * Get list name is entered
     * @returns {Promise<string>} inputted list name
     * @memberof CallingListUploadPage
     */
    public async getEnteredListName(): Promise<string> {
        try {
            return await this.txtListName.getControlValue();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEnteredListName, err.message);
        }
    }

    /**
     * Get skill name is selected
     * @returns {Promise<string>} skill name
     * @memberof CallingListUploadPage
     */
    public async getSkillSelected(): Promise<string> {
        try {
            return await this.cbbSkill.getSelectedItem();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillSelected, err.message);
        }
    }

    /**
     * Get file name is uploaded
     * @returns {Promise<string>} inputted file name
     * @memberof CallingListUploadPage
     */
    public async getUploadedFileName(): Promise<string> {
        try {
            let lengthSplitString: number;

            if (TestRunInfo.browser == Browser.IE) {
                let fileCalling = Utility.getPath("src/test-data/inContact/");
                lengthSplitString = fileCalling.length;
            } else {
                lengthSplitString = "C:\\fakepath\\".length;
            }

            let filePath: string = await this.uploadFile.getControlValue();
            let lengthFilePath: number = await filePath.length;

            return await filePath.slice(lengthSplitString, lengthFilePath);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getUploadedFileName, err.message);
        }
    }

    /**
     * Click next button
     * @returns {Promise<CallingListUploadPage>} Calling list upload page
     * @memberof CallingListUploadPage
     */
    public async clickNext(): Promise<CallingListUploadPage> {
        try {
            await Logger.write(FunctionType.UI, "Going to next step");
            await this.btnNext.click();

            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickNext, err.message);
        }
    }

    /**
    * Wait for next step
    * @returns {Promise<CallingListUploadPage>} Calling list upload page
    * @memberof CallingListUploadPage
    */
    public async waitForNextStep(): Promise<CallingListUploadPage> {
        if (await this.spanNameOtherDetail.isDisplayed()) {
            await this.spanNameOtherDetail.waitUntilDisappear();
        }
        return this;
    }

    /**
     * Wait for calling list upload
     * @returns {Promise<CallingListUploadPage>} Calling list upload page
     * @memberof CallingListUploadPage
     */
    public async waitForCallingListUpload(): Promise<CallingListUploadPage> {
        try {
            await this.imgSpinner.waitUntilDisappear();
            await this.spanSucceeded.wait();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForCallingListUpload, err.message);
        }
    }

    /**
     * Get import status
     * @returns {Promise<string>} status
     * @memberof CallingListUploadPage
     */
    public async getImportStatus(): Promise<string> {
        try {

            await this.waitForCallingListUpload();
            return await this.spanImportStatus.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getImportStatus, err.message);
        }
    }
}