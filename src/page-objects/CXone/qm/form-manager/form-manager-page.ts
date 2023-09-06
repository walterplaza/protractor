import { FormElement } from "@data-objects/CXone/qm/form-manager/new-form-QM";
import CreateNewForm from "@page-objects/CXone/qm/form-manager/create-new-form";
import QMMenu from "@page-objects/CXone/qm/qm-general/qm-menu";
import TestRunInfo from "@data-objects/general/test-run-info";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import { Logger, FunctionType } from "@utilities/general/logger";

export default class FormManagerPage extends QMMenu {

    protected lblFormManager = new ElementWrapper(by.xpath("//h1[@id='manage-forms-page-title']"));
    protected lblQMFormCount = new ElementWrapper(by.xpath("//div[@id='itemsCountLbl']/span"));
    protected btnNewForm = new ElementWrapper(by.xpath("//button[@id='createForm']"));

    private static _FormManagerPage: FormManagerPage = null;
    public static getInstance(): FormManagerPage {
        this._FormManagerPage = new FormManagerPage();
        return this._FormManagerPage;
    }

    protected rowQMForm(formName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@col-id='formName'][./span[text()='${formName}']]`))
    }
    
    // Dynamic controls
    protected lblQMItem(itemIndex: number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='ag-body-container']/div[@row-index='${itemIndex}']/div[@col-id='formName']/span`));
    }

    /**
	 * Check form manager page displayed or not
     * @author Tuan.Vu
	 * @returns {Promise<boolean>} the existence of form manager page
	 * @memberof TopMenu
	 */
    public async isPageDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblFormManager.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Clicking create new form button
     * @author Y.Le
     * @returns {Promise<CreateNewForm>}
     * @memberof FormManagerPage
     */
    public async clickCreateNewFormButton(): Promise<CreateNewForm> {
        try {
            await Logger.write(FunctionType.UI,"Clicking create new form button")
            await this.btnNewForm.click();
            return CreateNewForm.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickCreateNewFormButton, err.message);
        }
    }

    /** Check Qm form table is empty or not 
     * @author Chinh.Nguyen
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>} the state of form manager table
     * @memberof FormManagerPage
     */
    public async isQmFormTableEmpty(timeoutInSecond?: number): Promise<boolean> {
        try {
            return (await this.lblQMItem(0).isDisplayed(timeoutInSecond)) ? false : true;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isQmFormTableEmpty, err.message);
        }
    }

    /**
     * Checking QM form is existed
     * @author Y.Le
     * @param {string} formName
     * @returns {Promise<boolean>}
     * @memberof FormManagerPage
     */
    public async isQMFormExisted(formName: string): Promise<boolean> {
        try {
            return await this.rowQMForm(formName).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isQMFormExisted, err.message);
        }
    }

    /**
     * Creating default QM form
     * @author Y.Le
     * @returns {Promise<this>}
     * @memberof FormManagerPage
     */
    public async createDefaultQMForm(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI,"Creating default QM form")
            if (! await this.isQMFormExisted("QA Form")) {
                let createFormManager: CreateNewForm = await this.clickCreateNewFormButton();
                await createFormManager.dragElements([FormElement.CHECKBOX, FormElement.RADIO]);
                await createFormManager.clickSaveAndActiveButton();
                await createFormManager.saveNewQMForm("QA Form");
                return this;
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.createDefaultQMForm, err.message);
        }
    }

    /** Get all Qm form item 
     * @author Chinh.Nguyen
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>} the state of form manager table
     * @memberof FormManagerPage
     */
    public async getAllQmFormItem(): Promise<string[]> {
        try {
            let exist: boolean = await this.lblQMItem(0).isDisplayed(TestRunInfo.shortTimeout / 5);
            let i: number = 0;
            let itemArr: string[] = new Array();
            while (exist) {
                itemArr.push(await this.lblQMItem(i).getText());
                exist = await this.lblQMItem(i + 1).isDisplayed(TestRunInfo.shortTimeout / 5);
                i++;
            }
            return itemArr;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAllQmFormItem, err.message);
        }
    }

}