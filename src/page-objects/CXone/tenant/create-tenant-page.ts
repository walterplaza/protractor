import { ApplicationType, QMFeature, Tenant, TenantType } from "@data-objects/CXone/tenant/tenant";
import UserTenant from "@data-objects/CXone/tenant/user-tenant";
import { State } from "@data-objects/general/general";
import TopMenu from "@page-objects/CXone/general/top-menu";
import AddApplicationPage from "@page-objects/CXone/tenant/add-application-page";
import TenantPage from "@page-objects/CXone/tenant/tenant-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";
import TestRunInfo from "@data-objects/general/test-run-info";

export default class CreateTenantPage extends TopMenu {

  private static _createTenantPage: CreateTenantPage = null;

  protected lblCreateTenant = new ElementWrapper(by.xpath("//div[@class='container page-container create-tenant-data']//h1[@class='page-title ng-binding']"));
  protected tabGeneral = new ElementWrapper(by.xpath("//li[@id='general-tab']"));
  protected tabApplicationsFeature = new ElementWrapper(by.xpath("//li[(@class='uib-tab nav-item ng-scope ng-isolate-scope' or @class='uib-tab nav-item ng-scope ng-isolate-scope active') and @heading='APPLICATIONS & FEATURES']/a"));
  protected tabUsers = new ElementWrapper(by.xpath("//li[@id='users-tab']"));

  // General
  protected divGeneralTab = new ElementWrapper(by.xpath("//div[@class='tab-pane ng-scope active']//div[@class='tenant-general-tab tab']"));
  protected txtName = new ElementWrapper(by.xpath("//input[@name='tenantName']"));
  protected txtExpirationDate = new ElementWrapper(by.xpath("//input[@name='expirationDate']"));
  protected txtBillingId = new ElementWrapper(by.xpath("//input[@name='billingId']"));
  protected txtClusterId = new ElementWrapper(by.xpath("//input[@name='clusterId']"));
  protected txtBillingCycle = new ElementWrapper(by.xpath("//input[@name='billingCycle']"));
  protected txtBillingTelephoneNumber = new ElementWrapper(by.xpath("//input[@name='billingTelephoneNumber']"));
  protected txtUserCap = new ElementWrapper(by.xpath("//input[@name='userSoftLimit']"));
  protected txtFirstName = new ElementWrapper(by.xpath("//input[@name='firstName']"));
  protected txtLastName = new ElementWrapper(by.xpath("//input[@name='lastName']"));
  protected txtUsername = new ElementWrapper(by.xpath("//input[@name='username']"));
  protected txtEmailAddress = new ElementWrapper(by.xpath("//input[@name='emailAddress']"));
  protected txtPassword = new ElementWrapper(by.xpath("//input[@name='password']"));
  protected txtConfirmPassword = new ElementWrapper(by.xpath("//input[@name='confirmPassword']"));
  protected cbbTimeZone = new SelectElementWrapper(by.xpath("//div[contains(@data-options,'timeZones')]"));
  protected cbbTenantType = new SelectElementWrapper(by.xpath("//div[contains(@data-options,'tenantTypes')]"));
  protected btnCreateActive = new ElementWrapper(by.xpath("//button[@id='create-tenant-create-btn-validate' or @id='create-tenant-save-btn-validate']"));
  protected btnCancel = new ElementWrapper(by.xpath("//button[contains(@class,'cancel')]"));
  protected btnAddApplication = new ElementWrapper(by.xpath("//button[@id='add-application-btn']"));
  protected btnNext = new ElementWrapper(by.xpath("//button[contains(@class,'next')]"));
  protected lblUserCap = new ElementWrapper(by.xpath("//label[text()='User Cap']"));
  protected lblConfirmPassword = new ElementWrapper(by.xpath("//label[@translate='tenantUsersTab.confirmPassword']"))

  //Application & Features
  protected divApplicationsAndFeatures = new ElementWrapper(by.xpath("//div[@class='tab-pane ng-scope active']//div[@class='tenant-applications-features-tab']"));
  protected chkQMState = new ElementWrapper(by.xpath("//button[@id='configure-QM']"));
  protected btnStateYes = new ElementWrapper(by.xpath("//button[@id='popup-button-yes']"));
  protected btnStateNo = new ElementWrapper(by.xpath("//button[@id='popup-button-no']"));
  protected lblStateMessage = new ElementWrapper(by.xpath("//div[@id='status-popover']//span"));
  protected divAddQAConfig = new ElementWrapper(by.xpath("//div[@class='modal-content']"));
  protected popStateMessage = new ElementWrapper(by.xpath("//div[@id='status-popover']"));
  protected pnlQMSettings = new ElementWrapper(by.xpath("//div[@class='settings-container ng-scope'][.//h4[text()='QM Settings:']]"));

  // Dynamic controls
  protected lblTenantTypeItem(tenantType: string): ElementWrapper {
    return new ElementWrapper(by.xpath(`//div[contains(@data-options,'tenantTypes')]//span[text()='${tenantType}']`));
  }

  protected lblTimeZoneItem(timeZone: string): ElementWrapper {
    return new ElementWrapper(by.xpath(`//div[contains(@data-options,'timeZones')]//span[contains(text(),'${timeZone}')]`));
  }

  protected lblApplication(application: string): ElementWrapper {
    return new ElementWrapper(by.xpath(`//div[contains(@class,'application') and @id='${application}']`));
  }

  protected chkApplicationState(application: ApplicationType): ElementWrapper {
    return new ElementWrapper((by.xpath(`//button[@id='configure-${application}']`)));
  }

  protected btnApplicationState(application: ApplicationType): ElementWrapper {
    return new ElementWrapper((by.xpath(`//button[@id='configure-${application}']/preceding-sibling::label`)));
  }

  protected icoPullDownArrow(application: ApplicationType): ElementWrapper {
    return new ElementWrapper((by.xpath(`//span[@id='${application}']/preceding-sibling::i[@class='pull-left ng-scope icon-open-down']`)));
  }

  protected chkFeature(feature: string): ElementWrapper {
    return new ElementWrapper((by.xpath(`//label[@class='features-checkbox'][.//span[text()='${feature}']]//div[contains(@class,'nice-checkbox')]`)));
  }

  protected chkSubFeature(subFeature: string): ElementWrapper {
    return new ElementWrapper((by.xpath(`//label[@class='features-checkbox ng-scope'][.//span[text()='${subFeature}']]//div[contains(@class,'nice-checkbox')]`)));
  }

  protected btnDisabledState(recordingSource: string): ElementWrapper {
    return new ElementWrapper((by.xpath(`//button[@class='configure-button ${recordingSource} configure-button-disabled']/..//div[@class='slider round']`)));
  }

  protected addQMApplicationConfig = AddQMApplicationConfig.getInstance();

  public static getInstance(): CreateTenantPage {
    // this._createTenantPage = (this._createTenantPage == null) ? new CreateTenantPage() : this._createTenantPage;
    this._createTenantPage = new CreateTenantPage();
    return this._createTenantPage;
  }

  /**
   * Check "Create Tenant" page is displayed
   * @returns {Promise<boolean>} Display=>true, not displayed=>false
   * @memberof CreateTenantPage
   */
  public async isPageDisplayed(): Promise<boolean> {
    try {
      return await this.lblCreateTenant.isDisplayed();
    } catch (err) {
      throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
    }
  }

  /**
   * Go to "General" tab by clicking "General" tab
   * @returns {Promise<CreateTenantPage>} Create Tenant page
   * @memberof CreateTenantPage
   */
  public async gotoGeneralTab(): Promise<CreateTenantPage> {
    try {
      await Logger.write(FunctionType.UI, "Going to General Tab");
      await BrowserWrapper.scrollToTop();
      await this.tabGeneral.click();
      await this.tabGeneral.waitForControlStable();
      return this;
    } catch (err) {
      throw new errorwrapper.CustomError(this.gotoGeneralTab, err.message);
    }
  }

  /**
   * Go to "Applications & Features" tab by clicking "Applications & Features" tab
   * @returns {Promise<CreateTenantPage>} Create Tenant page
   * @memberof CreateTenantPage
   */
  public async gotoApplicationsFeaturesTab(): Promise<CreateTenantPage> {
    try {
      await Logger.write(FunctionType.UI, "Going to Applications & Features Tab");
      await BrowserWrapper.scrollToTop();
      await this.tabApplicationsFeature.click();
      return this;
    } catch (err) {
      throw new errorwrapper.CustomError(this.gotoApplicationsFeaturesTab, err.message);
    }
  }

  /**
   * Go to "Users" tab by clicking "Users" tab
   * @returns {Promise<CreateTenantPage>} Create Tenant page
   * @memberof CreateTenantPage
   */
  public async gotoUsersTab(): Promise<CreateTenantPage> {
    try {
      await Logger.write(FunctionType.UI, "Going to Users Tab");
      await BrowserWrapper.scrollToTop();
      await this.tabUsers.click();
      await this.tabGeneral.waitForControlStable();
      return this;
    } catch (err) {
      throw new errorwrapper.CustomError(this.gotoUsersTab, err.message);
    }
  }

  /**
   * Select tenant type
   * @param {string} tenantType type of tenant to select
   * @returns {Promise<CreateTenantPage>} Create Tenant page
   * @memberof CreateTenantPage
   */
  public async selectTenantType(tenantType: string): Promise<CreateTenantPage> {
    try {
      await this.cbbTenantType.selectOptionByText(tenantType);
      return this;
    } catch (err) {
      throw new errorwrapper.CustomError(this.selectTenantType, err.message);
    }
  }

  /**
   * Select timezone
   * @param {string} timeZone timezone to select
   * @returns {Promise<CreateTenantPage>} "Create Tenant" page
   * @memberof CreateTenantPage
   */
  public async selectTimeZone(timeZone: string): Promise<CreateTenantPage> {
    try {
      await this.cbbTimeZone.selectOptionByText(timeZone);
      return this;
    } catch (err) {
      throw new errorwrapper.CustomError(this.selectTimeZone, err.message);
    }
  }

  /**
   * Open "Add Application" page by clicking "Add Application" button
   * @returns {Promise<AddApplicationPage>} "Add Application" page
   * @memberof CreateTenantPage
   */
  public async addApplication(): Promise<AddApplicationPage> {
    try {
      await Logger.write(FunctionType.UI, "Going to Add Application Page");
      await this.btnAddApplication.click();
      return AddApplicationPage.getInstance();
    } catch (err) {
      throw new errorwrapper.CustomError(this.addApplication, err.message);
    }
  }

  /**
   * Fill data in "General" tab
   * @param {Tenant} tenant information of tenant to create 
   * @returns {Promise<CreateTenantPage>} "Create Tenant" page
   * @memberof CreateTenantPage
   */
  public async fillGeneralTab(tenant: Tenant): Promise<CreateTenantPage> {
    try {
      await Logger.write(FunctionType.UI, "Filling all information on General Tab");
      await this.txtName.type(tenant.name);
      await this.selectTenantType(tenant.tenantType);

      if (tenant.tenantType != TenantType.CUSTOMER) {
        await this.txtExpirationDate.type(tenant.expirationDate);
      }

      await this.selectTimeZone(tenant.timezone);
      await this.txtBillingId.type(tenant.billingId);
      await this.txtClusterId.type(tenant.clusterId);
      await this.waitForSpinner();
      await this.txtBillingCycle.type(tenant.billingCycle);
      await this.txtBillingTelephoneNumber.type(tenant.billingTelephoneNumber);
      await this.txtUserCap.scrollTo();
      await this.txtUserCap.waitForControlStable();
      await this.txtUserCap.type(tenant.userCap);
      await this.lblUserCap.click();
      return this;
    } catch (err) {
      throw new errorwrapper.CustomError(this.fillGeneralTab, err.message);
    }
  }

  /**
   * Fill data in "users" tab
   * @param {UserTenant} user user information to create 
   * @returns {Promise<CreateTenantPage>} "Create Tenant" page
   * @memberof CreateTenantPage
   */
  public async fillUserTab(user: UserTenant): Promise<CreateTenantPage> {
    try {
      await Logger.write(FunctionType.UI, "Filling all information in Users Tab");
      await this.txtFirstName.type(user.firstName);
      await this.txtLastName.type(user.lastName);
      await this.txtUsername.type(user.email);
      await this.waitForSpinner();
      await this.txtEmailAddress.type(user.email);
      await this.txtPassword.type(user.password);
      await this.txtConfirmPassword.type(user.password);
      await this.lblConfirmPassword.click();
      return this;
    } catch (err) {
      throw new errorwrapper.CustomError(this.fillUserTab, err.message);
    }
  }

  /**
   * Get entered tenant name
   * @returns {Promise<string>} inputted tenant name
   * @memberof CreateTenantPage
   */
  public async getEnteredName(): Promise<string> {
    try {
      return await this.txtName.getControlValueByName();
    } catch (err) {
      throw new errorwrapper.CustomError(this.getEnteredName, err.message);
    }
  }

  /**
   * Get selected tenant type
   * @returns {Promise<string>} inputted tenant type
   * @memberof CreateTenantPage
   */
  public async getSelectedTenantType(): Promise<string> {
    try {
      return await this.cbbTenantType.getText();
    } catch (err) {
      throw new errorwrapper.CustomError(this.getSelectedTenantType, err.message);
    }
  }

  /**
   * Get entered expiration date is entered
   * @returns {Promise<string>} inputted expiration date 
   * @memberof CreateTenantPage
   */
  public async getEnteredExpirationDate(): Promise<string> {
    try {
      return await this.txtExpirationDate.getControlValueById();
    } catch (err) {
      throw new errorwrapper.CustomError(this.getEnteredExpirationDate, err.message);
    }
  }

  /**
   * Get selected timezone
   * @returns {Promise<string>} inputted timezone
   * @memberof CreateTenantPage
   */
  public async getSelectedTimezone(): Promise<string> {
    try {
      let timeZone: string = await this.cbbTimeZone.getText();
      return timeZone.substring(timeZone.indexOf(" ") + 1);
    } catch (err) {
      throw new errorwrapper.CustomError(this.getSelectedTimezone, err.message);
    }
  }

  /**
   * Get entered billing id
   * @returns {Promise<number>} inputted billing Id
   * @memberof CreateTenantPage
   */
  public async getEnteredBillingId(): Promise<string> {
    try {
      return await this.txtBillingId.getControlValueByName();
    } catch (err) {
      throw new errorwrapper.CustomError(this.getEnteredBillingId, err.message);
    }
  }

  /**
   * Get entered cluster id
   * @returns {Promise<number>} inputted cluster Id
   * @memberof CreateTenantPage
   */
  public async getEnteredClusterId(): Promise<string> {
    try {
      return await this.txtClusterId.getControlValueByName();
    } catch (err) {
      throw new errorwrapper.CustomError(this.getEnteredClusterId, err.message);
    }
  }

  /**
   * Get entered billing cycle
   * @returns {Promise<number>} inputted billing cycle
   * @memberof CreateTenantPage
   */
  public async getEnteredBillingCycle(): Promise<number> {
    try {
      return parseInt(await this.txtBillingCycle.getControlValueByName());
    } catch (err) {
      throw new errorwrapper.CustomError(this.getEnteredBillingCycle, err.message);
    }
  }

  /**
   * Get entered billing telephone number
   * @returns {Promise<string>} inputted billing telephone number
   * @memberof CreateTenantPage
   */
  public async getEnteredBillingTelephoneNumber(): Promise<string> {
    try {
      return await this.txtBillingTelephoneNumber.getControlValueByName();
    } catch (err) {
      throw new errorwrapper.CustomError(this.getEnteredBillingTelephoneNumber, err.message);
    }
  }

  /**
   * Get entered user cap
   * @returns {Promise<number>} inputted user cap
   * @memberof CreateTenantPage
   */
  public async getEnteredUserCap(): Promise<number> {
    try {
      return parseInt(await this.txtUserCap.getControlValueByName());
    } catch (err) {
      throw new errorwrapper.CustomError(this.getEnteredUserCap, err.message);
    }
  }

  /**
   * Get entered first name
   * @returns {Promise<string>} inputted first name
   * @memberof CreateTenantPage
   */
  public async getEnteredFirstName(): Promise<string> {
    try {
      return await this.txtFirstName.getControlValueByName();
    } catch (err) {
      throw new errorwrapper.CustomError(this.getEnteredUserCap, err.message);
    }
  }

  /**
   * Get entered last name
   * @returns {Promise<string>} inputted last name
   * @memberof CreateTenantPage
   */
  public async getEnteredLastName(): Promise<string> {
    try {
      return await this.txtLastName.getControlValueByName();
    } catch (err) {
      throw new errorwrapper.CustomError(this.getEnteredLastName, err.message);
    }
  }

  /**
   * Get entered username
   * @returns {Promise<string>} inputted username
   * @memberof CreateTenantPage
   */
  public async getEnteredUsername(): Promise<string> {
    try {
      return await this.txtUsername.getControlValueByName();
    } catch (err) {
      throw new errorwrapper.CustomError(this.getEnteredUsername, err.message);
    }
  }

  /**
   * Get entered email address
   * @returns {Promise<string>} inputted email address
   * @memberof CreateTenantPage
   */
  public async getEnteredEmailAddress(): Promise<string> {
    try {
      return await this.txtEmailAddress.getControlValueByName();
    } catch (err) {
      throw new errorwrapper.CustomError(this.getEnteredEmailAddress, err.message);
    }
  }

  /**
   * Get entered password
   * @returns {Promise<string>} inputted password
   * @memberof CreateTenantPage
   */
  public async getEnteredPassword(): Promise<string> {
    try {
      return await this.txtPassword.getControlValueByName();
    } catch (err) {
      throw new errorwrapper.CustomError(this.getEnteredPassword, err.message);
    }
  }

  /**
   * Get entered confirm password
   * @returns {Promise<string>} inputted confirmPassword
   * @memberof CreateTenantPage
   */
  public async getEnteredConfirmPassword(): Promise<string> {
    try {
      return await this.txtConfirmPassword.getControlValueByName();
    } catch (err) {
      throw new errorwrapper.CustomError(this.getEnteredConfirmPassword, err.message);
    }
  }

  /**
   * Create and active tenant by clicking "Create & Activate" button
   * @returns {Promise<TenantPage>} "Tenant" page
   * @memberof CreateTenantPage
   */
  public async createAndActivateTenant(): Promise<TenantPage> {
    try {
      await Logger.write(FunctionType.UI, "Clicking on 'Create & Activate' button");
      await BrowserWrapper.scrollToTop();
      await this.btnCreateActive.click();
      await this.waitForSpinner();
      return TenantPage.getInstance();
    } catch (err) {
      throw new errorwrapper.CustomError(this.createAndActivateTenant, err.message);
    }
  }

  /**
   * Check "New Application" page is displayed
   * @param {string} application name of the new application
   * @returns {Promise<boolean>} Display=>true, not displayed=>false
   * @memberof CreateTenantPage
   */
  public async isNewApplicationDisplayed(application: string): Promise<boolean> {
    try {
      return await this.lblApplication(application).isDisplayed();
    } catch (err) {
      throw new errorwrapper.CustomError(this.isNewApplicationDisplayed, err.message);
    }
  }

  /**
   * Change Application State
   * @param {ApplicationType} application name of the new application
   * @param {State} state On or Off
   * @returns {Promise<CreateTenantPage>}
   * @memberof CreateTenantPage
   */
  public async changeApplicationState(application: ApplicationType, state: State): Promise<CreateTenantPage> {
    try {
      await Logger.write(FunctionType.UI, `Changing Application state`);

      let classState: boolean = await this.chkApplicationState(application).isEnabled();

      if (state == State.ON && classState == false) {
        await this.btnApplicationState(application).click();
      }
      else if (state == State.OFF && classState == true) {
        await this.btnApplicationState(application).click();
      }

      await this.popStateMessage.wait();
      return this;
    } catch (err) {
      throw new errorwrapper.CustomError(this.changeApplicationState, err.message);
    }
  }

  /**
   * Is Application State On or Off
   * @param {ApplicationType} application name of the new application
   * @param {State} state On or Off
   * @returns {Promise<boolean>}
   * @memberof CreateTenantPage
   */
  public async isApplicationStateCorrect(application: ApplicationType, state: State): Promise<boolean> {
    try {
      let classState: string = await this.chkApplicationState(application).getAttribute("class");

      if ((state == State.ON && classState.includes("enabled"))
        || (state == State.OFF && classState.includes("disabled"))) {
        return true;
      } else
        return false;

    } catch (err) {
      throw new errorwrapper.CustomError(this.isApplicationStateCorrect, err.message);
    }
  }

  /**
   * Get Change State Message
   * @param {string} application name of the new application
   * @returns {Promise<string>}
   * @memberof CreateTenantPage
   */
  public async getChangeStateMessage(): Promise<string> {
    try {
      return await this.lblStateMessage.getText();
    } catch (err) {
      throw new errorwrapper.CustomError(this.getChangeStateMessage, err.message);
    }
  }

  /**
   * Click Yes button of change state message
   * @param {string} application name of the new application
   * @returns {Promise<CreateTenantPage>}
   * @memberof CreateTenantPage
   */
  public async clickStateYesButton(): Promise<CreateTenantPage> {
    try {
      await this.btnStateYes.click();
      return this;
    } catch (err) {
      throw new errorwrapper.CustomError(this.clickStateYesButton, err.message);
    }
  }

  /**
  * Select Feature and Sub Feature on QM Application Configuration page
  * @param {QMFeature} feature want to select
  * @returns {Promise<AddQMApplicationConfig>}
  * @memberof CreateTenantPage
  */
  public async selectQMSubFeature(feature: QMFeature): Promise<CreateTenantPage> {
    try {
      await this.addQMApplicationConfig.selectQMSubFeature(feature);
      return this;
    } catch (err) {
      throw new errorwrapper.CustomError(this.selectQMSubFeature, err.message);
    }
  }

  /**
	 * Click Next button on QM Application Configuration page
	 * @returns {Promise<AddQMApplicationConfig>}
	 * @memberof CreateTenantPage
	 */
  public async clickNextButton(): Promise<CreateTenantPage> {
    try {
      await this.addQMApplicationConfig.clickNextButton();
      return this;
    } catch (err) {
      throw new errorwrapper.CustomError(this.clickNextButton, err.message);
    }
  }

  /**
     * Select recording source 
     * @param {string} recordingSource recording source type
     * @returns {Promise<CreateTenantPage>} Add Application page
     * @memberof CreateTenantPage
     */
  public async selectRecordingSource(recordingSource: string): Promise<CreateTenantPage> {
    try {
      await this.addQMApplicationConfig.selectRecordingSource(recordingSource);
      return this;
    } catch (err) {
      throw new errorwrapper.CustomError(this.selectRecordingSource, err.message);
    }
  }

  /**
     * Check the "Config Setting" is selected
     * @param {string} recordingSource name of recording source
     * @returns {Promise<boolean>} the state of config setting in "QM Setting" page
     * @memberof CreateTenantPage
     */
  public async isConfigSettingSelected(recordingSource: string): Promise<boolean> {
    try {
      return await this.addQMApplicationConfig.isConfigSettingSelected(recordingSource);
    } catch (err) {
      throw new errorwrapper.CustomError(this.isConfigSettingSelected, err.message);
    }
  }

  /**
  * Check the "Cancel" button is enabled
  * @returns {Promise<boolean>}
  * @memberof AddQMApplicationConfig
  */
  public async isCancelButtonEnabled(): Promise<boolean> {
    try {
      return await this.addQMApplicationConfig.isCancelButtonEnabled();
    } catch (err) {
      throw new errorwrapper.CustomError(this.isCancelButtonEnabled, err.message);
    }
  }

  /**
   * Check the "Next" button is enabled
   * @returns {Promise<boolean>}
   * @memberof AddQMApplicationConfig
   */
  public async isNextButtonEnabled(): Promise<boolean> {
    try {
      return await this.addQMApplicationConfig.isNextButtonEnabled();
    } catch (err) {
      throw new errorwrapper.CustomError(this.isNextButtonEnabled, err.message);
    }
  }

  /**
   * Check the "Back" button is enabled
   * @returns {Promise<boolean>}
   * @memberof AddQMApplicationConfig
   */
  public async isBackButtonEnabled(): Promise<boolean> {
    try {
      return await this.addQMApplicationConfig.isBackButtonEnabled();
    } catch (err) {
      throw new errorwrapper.CustomError(this.isBackButtonEnabled, err.message);
    }
  }

  /**
   * Check the "Back" button is blue
   * @returns {Promise<boolean>}
   * @memberof AddQMApplicationConfig
   */
  public async isNextButtonBlue(): Promise<boolean> {
    try {
      return await this.addQMApplicationConfig.isNextButtonBlue();
    } catch (err) {
      throw new errorwrapper.CustomError(this.isNextButtonBlue, err.message);
    }
  }

  /**
     * Complete Add QM Application by clicking "Finish" button
     * @returns {Promise<CreateTenantPage>} "Create Tenant" page
     * @memberof CreateTenantPage
     */
  public async finishAddQMApplication(): Promise<CreateTenantPage> {
    try {
      return await this.addQMApplicationConfig.finishAddQMApplication();
    } catch (err) {
      throw new errorwrapper.CustomError(this.finishAddQMApplication, err.message);
    }
  }

  /**
     * Expand application by clicking on pull down arrow
     * @returns {Promise<CreateTenantPage>} "Create Tenant" page
     * @memberof CreateTenantPage
     */
  public async expandApplication(application: ApplicationType): Promise<CreateTenantPage> {
    try {
      await Logger.write(FunctionType.UI, `Expanding application`);
      await this.icoPullDownArrow(application).click();
      return this;
    } catch (err) {
      throw new errorwrapper.CustomError(this.expandApplication, err.message);
    }
  }

  /**
     * Check Feature is checked
     * @returns {Promise<boolean>} "Create Tenant" page
     * @memberof CreateTenantPage
     */
  public async isQMFeatureChecked(feature: QMFeature): Promise<boolean> {
    try {
      return (await this.chkFeature(feature).getAttribute("class")).includes("ng-not-empty")
    } catch (err) {
      throw new errorwrapper.CustomError(this.isQMFeatureChecked, err.message);
    }
  }

  /**
   * Check Sub Feature is checked
   * @returns {Promise<boolean>} "Create Tenant" page
   * @memberof CreateTenantPage
   */
  public async isQMSubFeatureChecked(feature: QMFeature): Promise<boolean> {
    try {
      return (await this.chkSubFeature(feature).getAttribute("class")).includes("ng-not-empty")
    } catch (err) {
      throw new errorwrapper.CustomError(this.isQMSubFeatureChecked, err.message);
    }
  }

  /**
     * Check Feature is disabled
     * @returns {Promise<boolean>} "Create Tenant" page
     * @memberof CreateTenantPage
     */
  public async isQMFeatureDisabled(feature: QMFeature): Promise<boolean> {
    try {
      return await this.chkFeature(feature).isEnabled();
    } catch (err) {
      throw new errorwrapper.CustomError(this.isQMFeatureDisabled, err.message);
    }
  }

  /**
   * Check Sub Feature is checked
   * @returns {Promise<boolean>} "Create Tenant" page
   * @memberof CreateTenantPage
   */
  public async isQMSubFeatureDisabled(feature: QMFeature): Promise<boolean> {
    try {
      return await this.chkSubFeature(feature).isEnabled();
    } catch (err) {
      throw new errorwrapper.CustomError(this.isQMSubFeatureDisabled, err.message);
    }
  }

  /**
  * Check Application is collapsed or not
  * @returns {Promise<boolean>} "Create Tenant" page
  * @memberof CreateTenantPage
  */
  public async isApplicationCollapsed(application: ApplicationType): Promise<boolean> {
    try {
      return await this.icoPullDownArrow(application).isDisplayed();
    } catch (err) {
      throw new errorwrapper.CustomError(this.isApplicationCollapsed, err.message);
    }
  }

  /**
   * Check State Application is Off or On
   * @returns {Promise<boolean>} "Create Tenant" page
   * @memberof CreateTenantPage
   */
  public async isStateButtonOff(application: ApplicationType): Promise<boolean> {
    try {
      return await this.btnDisabledState(application).isDisplayed();
    } catch (err) {
      throw new errorwrapper.CustomError(this.isStateButtonOff, err.message);
    }
  }

  /**
   * Check "Qm Setting" section displays
   * @returns {Promise<boolean>} the existence of "Qm Setting" page
   * @memberof CreateTenantPage
   */
  public async isQMSettingDisplayed(): Promise<boolean> {
    try {
      return await this.pnlQMSettings.isDisplayed();
    } catch (err) {
      throw new errorwrapper.CustomError(this.isQMSettingDisplayed, err.message);
    }
  }

  public async isApplicationsAndFeaturesTabDisplayed(timeOut?: number): Promise<boolean> {
    try {
      return await this.divApplicationsAndFeatures.isDisplayed(timeOut);
    } catch (err) {
      throw new errorwrapper.CustomError(this.isApplicationsAndFeaturesTabDisplayed, err.message);
    }
  }

  /**
   * Check general tab is displayed or not
   * @author Tan.Ta
   * @param {number} [timeOut]
   * @returns {Promise<boolean>}
   * @memberof CreateTenantPage
   */
  public async isGeneralTabDisplayed(timeOut?: number): Promise<boolean> {
    try {
      return await this.divGeneralTab.isDisplayed(timeOut);
    } catch (err) {
      throw new errorwrapper.CustomError(this.isGeneralTabDisplayed, err.message);
    }
  }


  /**
   * Check Add QM Application Configuration page step 1 is displayed or not
   * @author Tan.Ta
   * @param {number} [timeOut]
   * @returns {Promise<boolean>}
   * @memberof CreateTenantPage
   */
  public async isAddQMApplicationConfigurationPageStep1Displayed(timeOut?: number): Promise<boolean> {
    try {
      return await this.addQMApplicationConfig.isAddQMApplicationConfigurationPageStep1Displayed(timeOut);
    } catch (err) {
      throw new errorwrapper.CustomError(this.isAddQMApplicationConfigurationPageStep1Displayed, err.message);
    }
  }

  /**
   * Check Add QM Application Configuration page step 2 is displayed or not
   * @author Tan.Ta
   * @param {number} [timeOut]
   * @returns {Promise<boolean>}
   * @memberof CreateTenantPage
   */
  public async isAddQMApplicationConfigurationPageStep2Displayed(timeOut?: number): Promise<boolean> {
    try {
      return await this.addQMApplicationConfig.isAddQMApplicationConfigurationPageStep2Displayed(timeOut);
    } catch (err) {
      throw new errorwrapper.CustomError(this.isAddQMApplicationConfigurationPageStep2Displayed, err.message);
    }
  }
}

class AddQMApplicationConfig {
  private static _addQMApplicationConfig: AddQMApplicationConfig = null;

  public static getInstance(): AddQMApplicationConfig {
    this._addQMApplicationConfig = new AddQMApplicationConfig();
    return this._addQMApplicationConfig;
  }

  protected btnNext = new ElementWrapper(by.xpath("//button[@ng-click='$ctrl.next()']"));
  protected btnBack = new ElementWrapper(by.xpath("//button[@ng-click='$ctrl.prev()']"));
  protected btnCancel = new ElementWrapper(by.xpath("//button[@ng-click='$ctrl.onCancelClicked()']"));
  protected cbbRecordingSource = new SelectElementWrapper(by.xpath("//div[@id='QMSourceDropdown']"));
  protected divAddQAConfigForm = new ElementWrapper(by.xpath("//div[@class='modal-content']"));
  protected divSelectFeatures = new ElementWrapper(by.xpath("//div[@class='step-content']/step[@label='Select Features']/div[@class='step-content ng-scope']"));
  protected divConfigureSettings = new ElementWrapper(by.xpath("//div[@class='step-content']/step[@label='Configure Settings']/div[@class='step-content ng-scope']"));

  protected getFeature(feature: string): ElementWrapper {
    return new ElementWrapper((by.xpath(`//div[@class='features-selector ng-scope']//label[@class='features-checkbox']//span[text()='${feature}']`)));
  }

  protected getSubFeature(subFeature: string): ElementWrapper {
    return new ElementWrapper((by.xpath(`//div[contains(@class,'features-selector')]//label[@class='features-checkbox ng-scope'][.//span[text()='${subFeature}']]//div[contains(@class,'nice-checkbox')]`)));
  }

  protected getRecordingSourceItem(recordingSource: string): ElementWrapper {
    return new ElementWrapper((by.xpath(`//div[contains(@class,'nice-dropdown')][.//div[text()='${recordingSource}']]`)));
  }

  /**
	 * Select Feature and Sub Feature on QM Application Configuration page
   * @param {QMFeature} feature want to select
	 * @returns {Promise<AddQMApplicationConfig>}
	 * @memberof AddQMApplicationConfig
	 */
  public async selectQMSubFeature(feature: QMFeature): Promise<AddQMApplicationConfig> {
    await Logger.write(FunctionType.UI, `Selecting '${feature} feature'`);
    await this.getSubFeature(feature).click();
    return this;
  }

  /**
	 * Click Next button on QM Application Configuration page
   * @param {QMFeature} feature want to select
	 * @returns {Promise<AddQMApplicationConfig>}
	 * @memberof AddQMApplicationConfig
	 */
  public async clickNextButton(): Promise<AddQMApplicationConfig> {
    await Logger.write(FunctionType.UI, `Clicking Next button`);
    await this.btnNext.click();
    return this
  }

  /**
     * Select recording source 
     * @param {string} recordingSource recording source type
     * @returns {Promise<AddQMApplicationConfig>} Add Application page
     * @memberof AddQMApplicationConfig
     */
  public async selectRecordingSource(recordingSource: string): Promise<AddQMApplicationConfig> {
    await Logger.write(FunctionType.UI, `Selecting recording source ${recordingSource}`);
    await this.cbbRecordingSource.selectOptionByText(recordingSource);
    return this;
  }

  /**
     * Check the "Config Setting" is selected
     * @param {string} recordingSource name of recording source
     * @returns {Promise<boolean>} the state of config setting in "QM Setting" page
     * @memberof AddQMApplicationConfig
     */
  public async isConfigSettingSelected(recordingSource: string): Promise<boolean> {
    return await this.getRecordingSourceItem(recordingSource).isDisplayed();
  }

  /**
   * Check the "Cancel" button is enabled
   * @returns {Promise<boolean>}
   * @memberof AddQMApplicationConfig
   */
  public async isCancelButtonEnabled(): Promise<boolean> {
    return await this.btnCancel.isEnabled();
  }

  /**
   * Check the "Next" button is enabled
   * @returns {Promise<boolean>}
   * @memberof AddQMApplicationConfig
   */
  public async isNextButtonEnabled(): Promise<boolean> {
    return await this.btnNext.isEnabled();
  }

  /**
   * Check the "Back" button is enabled
   * @returns {Promise<boolean>}
   * @memberof AddQMApplicationConfig
   */
  public async isBackButtonEnabled(): Promise<boolean> {
    return await this.btnBack.isEnabled();
  }

  /**
   * Check the "Next" button is blue
   * @returns {Promise<boolean>}
   * @memberof AddQMApplicationConfig
   */
  public async isNextButtonBlue(): Promise<boolean> {
    let isBlue: string = await this.btnNext.getCssValue("background-color");
    if (isBlue == "rgba(0, 124, 190, 1)") {
      return true;
    } else return false;
  }

  /**
     * Complete Add QA Application by clicking "Finish" button
     * @returns {Promise<CreateTenantPage>} "Create Tenant" page
     * @memberof AddQMApplicationConfig
     */
  public async finishAddQMApplication(): Promise<CreateTenantPage> {
    await Logger.write(FunctionType.UI, `Clicking on 'Finish' button on Add QA Application`);
    await this.btnNext.click();
    await this.divAddQAConfigForm.waitUntilDisappear();
    return await CreateTenantPage.getInstance();
  }

  public async isAddQMApplicationConfigurationPageStep1Displayed(timeOut?: number): Promise<boolean> {
    return await this.divSelectFeatures.isDisplayed(timeOut);
  }

  public async isAddQMApplicationConfigurationPageStep2Displayed(timeOut?: number): Promise<boolean> {
    return await this.divConfigureSettings.isDisplayed(timeOut);
  }


}