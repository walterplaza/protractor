import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { by } from "protractor";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { Logger, FunctionType } from "@utilities/general/logger";
import QMFormPage from "@page-objects/CXone/search/qm-form-page";

export default class SelectQMFormPage {

    private static _selectQMFormPage: SelectQMFormPage = null;

    protected frmSelectQM = new ElementWrapper(by.xpath("//body[@class='bg-grey modal-open']"));
    protected txtSearchForm = new ElementWrapper(by.xpath("//input[@id='search-txt']"));
    protected btnSelect = new ElementWrapper(by.xpath("//div[@class='button-row text-right']//button[@id='save']"));
    protected btnCancel = new ElementWrapper(by.xpath("//div[@class='button-row text-right']//button[@class='btn btn-cancel btn-footer ng-scope']"));


    protected lblQMItem(name: string) {
        return new ElementWrapper(by.xpath(`//div[@class='form-selection-list']//span[text()='${name}']`));
    }

    public static getInstance(): SelectQMFormPage {
        // this._searchPage = (this._searchPage == null) ? new SearchPage() : this._searchPage;
        this._selectQMFormPage = new SelectQMFormPage();
        return this._selectQMFormPage;
    }

    /**
     * Check page is displayed or not
     * @author Tan.Ta
     * @returns {Promise<boolean>}
     * @memberof SelectQMFormPage
     */
    public async isPageDisplayed(): Promise<boolean> {
        try {
            return this.frmSelectQM.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Select QM form
     * @author Tan.Ta
     * @param {string} name
     * @returns {Promise<QMFormPage>}
     * @memberof SelectQMFormPage
     */
    public async selectQMForm(name: string): Promise<QMFormPage> {
        try {
            await Logger.write(FunctionType.UI, "Selecting QM form");

            await this.txtSearchForm.type(name);
            await this.lblQMItem(name).click();
            await this.btnSelect.click();
            return await QMFormPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectQMForm, err.message);
        }
    }
}