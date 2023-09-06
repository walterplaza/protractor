import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { DeleteCommitment } from "@data-objects/inContact/central/internal-admin/business-unit/business-unit-info";
import TestRunInfo from "@data-objects/general/test-run-info";
import { Browser } from "@data-objects/general/platform";

export default class BusinessUnitDetailsPage extends NavigationBar {
    private static _BusinessUnitDetailsPage: BusinessUnitDetailsPage = null;

    protected btnEditFeature = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabFeatures_BusinessUnitFeatures_btnEdit_ShadowButton']/span[text()='Edit']"));
    protected btnSaveFeature = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabFeatures_BusinessUnitFeatures_btnEdit_ShadowButton']/span[text()='Save']"));
    protected divAgentList = new ElementWrapper(by.xpath("//div[@id='uimanager_container']"));
    protected divSpinner = new ElementWrapper(by.xpath("//div[@id='Spinner_msgPanelLoading']"));
    protected chkNiceWorkForceManagement = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabFeatures_BusinessUnitFeatures_chkinContactWorkforceManagement']"));
    protected chkNiceCapacityPlanner = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabFeatures_BusinessUnitFeatures_chkInContactCapacityPlanner']"));
    protected btnDoneDetail = new ElementWrapper(by.xpath("//button[.//span[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabDetails') and text()='Done']]"));
    protected btnEditDetail = new ElementWrapper(by.xpath("//button[.//span[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabDetails') and text()='Edit']]"));
    protected cbbDeleteCommitment = new SelectElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabDetails_UnitDetails_BusinessUnitForm1_CommitmentPermissionDropdown']"));

    // Dynamic controls
    protected tabBusiness(tabName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_header']//span[text()='${tabName}']`));
    }

    public static getInstance(): BusinessUnitDetailsPage {
        this._BusinessUnitDetailsPage = new BusinessUnitDetailsPage();
        return this._BusinessUnitDetailsPage;
    }

    /**
	 * Select a Business tab
	 * @returns {Promise<BusinessUnitPageDetails>} Business unit Details page
	 * @param {string} tabName Business tab
	 * @memberof BusinessUnitPageDetails
	 */
    public async selectBusinessTab(tabName: string): Promise<BusinessUnitDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting Business ${tabName} tab`);
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
            await this.btnEditDetail.click();
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editBusinessDetail, err.message);
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
   * Select delete commitment type
   * @author Huy.Nguyen
   * @param {string} tenantType type of tenant to select
   * @returns {Promise<CreateTenantPage>} Create Tenant page
   * @memberof CreateTenantPage
   */
  public async selectDeleteCommitmentType(commitmentType: DeleteCommitment): Promise<BusinessUnitDetailsPage> {
    try {
      await this.cbbDeleteCommitment.selectOptionByText(commitmentType);
      return this;
    } catch (err) {
      throw new errorwrapper.CustomError(this.selectDeleteCommitmentType, err.message);
    }
  }
} 