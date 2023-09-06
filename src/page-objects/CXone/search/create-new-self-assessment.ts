import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from '@utilities/protractor-wrappers/element-wrapper';
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import SearchPage from '@page-objects/CXone/search/search-page';
import ProjectPath from '@test-data/general/project-path';

export default class CreateNewSelfAssessment {
    private static _createNewSelfAssessment: CreateNewSelfAssessment = null;
    public static getInstance(): CreateNewSelfAssessment {
        this._createNewSelfAssessment = new CreateNewSelfAssessment();
        return this._createNewSelfAssessment;
    }

    protected sllFrom = new ElementWrapper(by.xpath("//div[contains(@class,'self-assessment-select-form-dropdown ')]//div[@class='ui-caret']"));
    protected bntCreate = new ElementWrapper(by.xpath("//div[contains(@class,'button-row')]//button[@id='save']"));
    
    protected divFormName(formName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[contains(@class,'ui-select-choices-row ng-scope')]//span[text()='${formName}']`));
    }
    
    /**
     * Select form name
     * @author Nhat.Nguyen
     * @param {string} formName
     * @returns {Promise<void>}
     * @memberof SelfAssessment
     */
    public async selectForm(formName: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Selecting '${formName}' Form`);
            await this.sllFrom.click();
            await this.divFormName(formName).click();
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.clickCreateButton, err.message);
        }
    }

    /**
     * Click create button
     * @author Nhat.Nguyen
     * @returns {Promise<SearchPage>}
     * @memberof SelfAssessment
     */
    public async clickCreateButton(): Promise<SearchPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Save Button on Create Employee Form");
            await this.bntCreate.click();
            let searchPage = require(`${ProjectPath.pageObjects}/CXone/search/search-page`).default;
			return searchPage.getInstance();
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.clickCreateButton, err.message);
        }
    }
}