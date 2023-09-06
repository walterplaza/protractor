import BusinessUnitPageDetails from "@page-objects/inContact/central/admin/account-setting/business-unit/business-unit-page-details";
import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class BusinessUnitPage extends NavigationBar {
    private static _BusinessUnitPage: BusinessUnitPage = null;

    protected tblBusinessUnit = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsBusinessUnits_GridControl']"));
    protected txtSearchBusinessUnit = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsBusinessUnits_tbxSearchText']"));

    // Dynamic controls
    protected lblBusinessItem(businessUnitID: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsBusinessUnits_gridView']//td[text()='${businessUnitID}']`));
    }
    
    public static getInstance(): BusinessUnitPage {
        this._BusinessUnitPage = new BusinessUnitPage();
        return this._BusinessUnitPage;
    }

    /**
     * is Business Unit List Displayed
     * @returns {Promise<Boolean>}
     * @memberof BusinessUnitPage
     */
    public async isBusinessUnitListDisplayed(): Promise<Boolean> {
        try {
            return await this.tblBusinessUnit.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isBusinessUnitListDisplayed, err.message);
        }
    }

    /**
	 * Select a Business unit
	 * @returns {Promise<SupervisorPage>} MAX page
	 * @param {string} businessUnitID Business ID
	 * @memberof BusinessUnitPage
	 */
    public async selectBusinessUnit(businessUnitID: string): Promise<BusinessUnitPageDetails> {
        try {
            await Logger.write(FunctionType.UI, `Selecting Business ${businessUnitID}`);
            // await this.txtSearchBusinessUnit.type(businessUnitID);
            await this.lblBusinessItem(businessUnitID).click();
            return await BusinessUnitPageDetails.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectBusinessUnit, err.message);
        }
    }
} 