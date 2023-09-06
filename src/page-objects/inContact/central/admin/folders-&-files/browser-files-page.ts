import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by, Key } from "protractor";

export default class BrowserFilesPage extends NavigationBar {

    private static _browserFilesPage: BrowserFilesPage = null;

    protected btnDelete = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content2_FileManagerContent_agvsFiles_btnDeleteInAdvancedGridView_ShadowButton']"));
    protected btnSearch = new ElementWrapper(by.xpath("//input[contains(@id,'BaseContent_Content2_FileManagerContent_agvsFiles_btnSearch')]"));
    protected btnConfirm = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content2_FileManagerContent_btnConfirmDelete_ShadowButton']"));
    protected txtSearch = new ElementWrapper(by.xpath("//input[contains(@id,'BaseContent_Content2_FileManagerContent_agvsFiles_tbxSearchText')]"));

    // Dynamic controls
    protected lblCallingListFile(fileName: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//td[text()='${fileName}']/preceding-sibling::td//input[contains(@id,'FileManagerContent_agvsFiles_gridView')]`)));
    }

    protected lblFolder(folderName: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_FileManagerTreeviewContent_tvDirectory']//a[text()='${folderName}']`)));
    }

    public static getInstance(): BrowserFilesPage {
        this._browserFilesPage = new BrowserFilesPage();
        return this._browserFilesPage;
    }

	/**
     * Check Browser file page is displayed or not 
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof BrowserFilesPage
	 */
    public async isPageDisplayed(): Promise<boolean> {
        try {
            return await this.btnLogout.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Select folder in Browser Files page
	 * @returns {Promise<BrowserFilesPage>} Browser Files Page
	 * @memberof BrowserFilesPage
	 */
    public async selectFolder(folderName: string): Promise<BrowserFilesPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting folder '${folderName}'`);
            await this.lblFolder(folderName).click();
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectFolder, err.message);
        }
    }

    /**
     * Delete calling list file in Browser Files page
     * @param fileName File name want to delete
     * @returns {Promise<BrowserFilesPage>} Browser Files Page
     * @memberof BrowserFilesPage
     */
    public async deleteCallingListFile(fileName: string): Promise<BrowserFilesPage> {
        try {
            await Logger.write(FunctionType.UI, `Deleting '${fileName}'calling list`);
            await this.txtSearch.type(fileName);
            await this.txtSearch.pressButton(Key.ENTER);
            let isDeleteDisplayed: boolean = await this.lblCallingListFile(fileName).isDisplayed();

            if (isDeleteDisplayed) {
                await this.waitForSpinnerComponentDisappear();
                await this.lblCallingListFile(fileName).waitForControlStable();
                await this.lblCallingListFile(fileName).click();
                await this.btnDelete.click();
                await this.btnConfirm.click();
            }

            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteCallingListFile, err.message);
        }
    }

}
