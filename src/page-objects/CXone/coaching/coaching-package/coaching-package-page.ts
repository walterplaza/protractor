import { coachingPackageState } from "@data-objects/CXone/coaching/coaching-package";
import TopMenu from "@page-objects/CXone/general/top-menu";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import TestRunInfo from "@data-objects/general/test-run-info";
import CoachingPlansPage from "@page-objects/CXone/coaching/coaching-plans/coaching-plans-page";
import CoachingPackageDesigner from "@page-objects/CXone/coaching/coaching-package/coaching-package-designer";

export default class CoachingPackagePage extends TopMenu {

    private static _CoachingPackagePage: CoachingPackagePage = null;

    protected lblCoachingPackages = new ElementWrapper(by.xpath("//h1[@id='coaching-package-page-title']"));
    protected btnNewCoachingPackage = new ElementWrapper(by.xpath("//button[@id='createForm']"));
    protected btnDeactivate = new ElementWrapper(by.xpath("//button[.='Deactivate']"));
    protected btnDelete = new ElementWrapper(by.xpath("//button[.='Delete']"));
    protected btnOK = new ElementWrapper(by.xpath("//button[@id='popup-unpublish']"));
    protected btnCancel = new ElementWrapper(by.xpath("//button[@id='popup-cancel']"));
    protected tblPackagesList = new ElementWrapper(by.xpath("//div[@class='nice-grid-component coaching-package-grid']//div[@role='grid']"));
    protected txtSearch = new ElementWrapper(by.xpath("//input[contains(@class,'search-on-keypress')]"));
    protected tblCoachingPackages = new ElementWrapper(by.xpath("//div[@class='coaching-package-grid-wrapper']//div[@class='ag-body-container']"));
    protected pnlExpandedSubItems = new ElementWrapper(by.xpath("//ul[@id='coaching-sub-menu-items' and @class='sub-menu-items ng-scope ng-hide']"));
    protected btnCoachingPlans = new ElementWrapper(by.xpath("//a[@id='coachingPlans']"));

    // Dynamic controls
    protected popSuccessMessage(message: string) {
        return new ElementWrapper(by.xpath(`//div[@class='toast-message'][.='${message}']/ancestor::div[@class='toast toast-success animated fadeIn']`));
    }
    protected chkPackage(coachingPackageName: string) {
        return new ElementWrapper(by.xpath(`//span[.='${coachingPackageName}']/ancestor::div[@role='row']//input[@type='checkbox']`));
    }
    protected lblPackageStatus(coachingPackageName: string) {
        return new ElementWrapper(by.xpath(`//span[.='${coachingPackageName}']/ancestor::div[@role='row']//div[@col-id='formStatus']`));
    }
    protected tbrCoachingPackage(coachingPackageName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//span[text()='${coachingPackageName}']/ancestor::div[@role='row']`));
    }

    public static getInstance(): CoachingPackagePage {
        this._CoachingPackagePage = new CoachingPackagePage();
        return this._CoachingPackagePage;
    }

    /**
     * Check if title of coaching package page displayed
     * @returns {Promise<boolean>}
     * @memberof CoachingPackagePage
     */
    public async isPageDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblCoachingPackages.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Clicking New Coaching Package button
     * @returns {Promise<CoachingPackageDesigner>}
     * @memberof CoachingPackagePage
     */
    public async clickNewCoachingPackageButton(): Promise<CoachingPackageDesigner> {
        try {
            await Logger.write(FunctionType.UI, "Clicking New Coaching Package button");
            await this.btnNewCoachingPackage.click();
            return CoachingPackageDesigner.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickNewCoachingPackageButton, err.message);
        }
    }

    /**
     * Check if list of packages were created
     * @returns {Promise<boolean>}
     * @memberof CoachingPackagePage
     */
    public async isPackagesListDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.tblPackagesList.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPackagesListDisplayed, err.message);
        }
    }

    /**
     * Check if successful message was displayed
     * @returns {Promise<boolean>}
     * @memberof CoachingPackagePage
     */
    public async isSuccessfulMessageDisplayed(message: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.popSuccessMessage(message).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSuccessfulMessageDisplayed, err.message);
        }
    }

    /**
     * Check if successful message was displayed in green
     * @returns {Promise<boolean>}
     * @memberof CoachingPackagePage
     */
    public async isSuccessfulMessageGreen(message: string): Promise<boolean> {
        try {
            let colorCode: string = await this.popSuccessMessage(message).getCssValue('background-color');
            return await Utility.convertRgbToHex(colorCode) == "#23762d";
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSuccessfulMessageGreen, err.message);
        }
    }

    /**
     * Get a coaching Package state
     * @returns {Promise<string>}
     * @memberof CoachingPackagePage
     */
    public async getPackageState(coachingPackageName: string): Promise<string> {
        try {
            return await this.lblPackageStatus(coachingPackageName).getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getPackageState, err.message);
        }
    }

    /**
     * Deactivate a coaching Package
     * @returns {Promise<CoachingPackagePage>}
     * @memberof CoachingPackagePage
     */
    public async deactivateCoachingPackage(coachingPackageName: string): Promise<CoachingPackagePage> {
        try {
            await Logger.write(FunctionType.UI, "Deactivating Coaching Package button");
            await this.chkPackage(coachingPackageName).click();
            await this.btnDeactivate.click();
            await this.btnOK.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.deactivateCoachingPackage, err.message);
        }
    }



    /**
     * Delete a coaching Package
     * @returns {Promise<CoachingPackagePage>}
     * @memberof CoachingPackagePage
     */
    public async deleteCoachingPackage(coachingPackageName: string): Promise<CoachingPackagePage> {
        try {
            await Logger.write(FunctionType.UI, "Deleting Coaching Package: ");
            if (await this.getPackageState(coachingPackageName) == coachingPackageState.ACTIVE) {
                await this.deactivateCoachingPackage(coachingPackageName);
            }
            await this.chkPackage(coachingPackageName).click();
            await this.btnDelete.click();
            await this.btnOK.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteCoachingPackage, err.message);
        }
    }

    /**
     * Check if coaching package was created or not
     * @author Tuan.Vu
     * @returns {Promise<boolean>}
     * @memberof CoachingPackagePage
     */
    public async isCoachingPackageCreated(coachingPackageName: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            await this.tblCoachingPackages.waitUntilPropertyChange("height", TestRunInfo.shortTimeout);
            await this.txtSearch.type(coachingPackageName);
            return await this.tbrCoachingPackage(coachingPackageName).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCoachingPackageCreated, err.message);
        }
    }

    /**
     * Go to Coaching plans page
     * @author Tan.Ta
     * @returns {Promise<CoachingPlansPage>}
     * @memberof CoachingPackagePage
     */
    public async gotoCoachingPlansPage(): Promise<CoachingPlansPage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Coaching Plans Page`);
            let subItemExpanded: boolean = await this.pnlExpandedSubItems.isDisplayed(TestRunInfo.shortTimeout);
            if (subItemExpanded) {
                await this.btnCoaching.click();
                await this.btnCoachingPlans.click();
            } else {
                await this.btnCoachingPlans.click();
            }
            return CoachingPlansPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoCoachingPlansPage, err.message);
        }
    }
}