import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import CallingListDetailPage from "@page-objects/inContact/central/personal-connection/calling-list-detail-page";
import CallingListUploadPage from "@page-objects/inContact/central/personal-connection/calling-list-upload-page";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class CallingPage extends NavigationBar {

    private static _callingPage: CallingPage = null;

    protected btnSelectFile = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsCallingList_btnUploadCallingList_ShadowButton']"));
    protected btnAccept = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_btnAccept_ShadowButton']"));
    protected btnSearch = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsCallingList_btnSearch']"));
    protected btnDecline = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_btnDecline_ShadowButton']"));
    protected tabCallingList = new ElementWrapper(by.xpath("//div[@class='list-body']//div[contains(@id,'BaseContent_Content_ManagerContent_upCallingList')]"));
    protected txtSearchCallingList = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsCallingList_tbxSearchText']"));

    // Dynamic controls
    protected lblCallingList(listName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsCallingList_gvCallingList']//td[text()='${listName}']`));
    }

    public static getInstance(): CallingPage {
        this._callingPage = new CallingPage();
        return this._callingPage;
    }

    /**
     * Check calling page is displayed or not
     * @returns {Promise<boolean>} the existence of calling page
     * @memberof CallingPage
     */
    public async isPageDisplayed(): Promise<boolean> {
        try {
            return await this.tabCallingList.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Open calling list upload page
     * @returns {Promise<CallingListUploadPage>} Calling list upload page
     * @memberof CallingPage
     */
    public async openCallingListUpload(): Promise<CallingListUploadPage> {
        try {
            await Logger.write(FunctionType.UI, "Opening Calling List Upload page");
            await this.btnSelectFile.click();

            await this.btnAccept.click();

            return CallingListUploadPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.openCallingListUpload, err.message);
        }
    }

    /**
     * Open calling list detail page
     * @param listName Calling list want to open
     * @returns {Promise<CallingListDetailPage>} Calling list detail page
     * @memberof CallingPage
     */
    public async openCallingListDetail(listName: string): Promise<CallingListDetailPage> {
        try {
            await Logger.write(FunctionType.UI, "Opening Calling List Detail page");
            await this.txtSearchCallingList.type(listName);
            await this.btnSearch.click();
            await this.waitForSpinnerComponentDisappear();
            await this.lblCallingList(listName).click();

            return CallingListDetailPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.openCallingListDetail, err.message);
        }
    }
}