import { State } from "@data-objects/general/general";
import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class SecurityProfilesPage extends NavigationBar {

    private static _securityProfilesPage: SecurityProfilesPage = null;

    protected tblSecurityProfiles = new ElementWrapper(by.xpath("//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_ctrlProfileList_agvsSecurityProfile_gridView']"));
    protected chkEditDialingByProficiency = new ElementWrapper(by.xpath("//div[./div[@class='form_details permLabel' and normalize-space()='Dialing by Proficiency']]//tr[./td[text()='Edit']]/..//input"));
    protected chkViewDialingByProficiency = new ElementWrapper(by.xpath("//div[./div[@class='form_details permLabel' and normalize-space()='Dialing by Proficiency']]//tr[./td[text()='View']]/..//input"));
    protected btnEditPermission = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcDetails_tpPermissions_btnEditPermissions_ShadowButton']"));
    protected btnDone = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcDetails_tpPermissions_btnEditPermissionsSave_ShadowButton']"));
    protected txtSearchBox = new ElementWrapper(by.xpath("//input[@name='ctl00$ctl00$ctl00$BaseContent$Content$ManagerContent$ctrlProfileList$agvsSecurityProfile$tbxSearchText']"));
    protected tabPermission = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcDetails_tpPermissions_tab']"));
    protected btnCreateNew = new ElementWrapper(by.xpath("//span[contains(@id,'BaseContent_Content_ManagerContent_ctrlProfileList_agvsSecurityProfile_btnCreateNewInAdvancedGridView_ShadowButtonSpan')]"));
    protected txtProfileName = new ElementWrapper(by.xpath("//input[contains(@id,'BaseContent_Content_ManagerContent_Content_ctrlSecurityProfileDetails_txtName')]"));
    protected btnNext = new ElementWrapper(by.xpath("//span[contains(@id,'BaseContent_Content_ManagerContent_Content_btnNext_ShadowButtonSpan')]"));
    protected btnDeactiveProfile = new ElementWrapper(by.xpath("//span[contains(@id,'BaseContent_Content_ManagerContent_tcDetails_tpDetails_btnDeactivateSecurityProfile_ShadowButtonSpan')]"));

    // Dynamic controls
    protected tbrSecurityProfilesByName(name: string) {
        return new ElementWrapper(by.xpath(`//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_ctrlProfileList_agvsSecurityProfile_gridView']//td[@class='secProfileTypeColumn']/*[name()='svg'][contains(@id,'CustomProfile')]/../preceding-sibling::td[@class='secProfileNameColumn wordWrap' and text()='${name}']`));
    }

    protected tbrSecurityProfilesByIndex(index: number) {
        return new ElementWrapper(by.xpath(`//tr[count(//*[name()='svg'][contains(@id,'imgCustomProfile')]/ancestor::tr/preceding-sibling::tr)+${index - 1}]/td[@class='secProfileIdColumn']`));
    }

    public static getInstance(): SecurityProfilesPage {
        this._securityProfilesPage = new SecurityProfilesPage();
        return this._securityProfilesPage;
    }

    /**
	 * Select a security profiles
     * @author Tung.Vo
	 * @returns {Promise<SecurityProfilesPage>}
	 * @memberof SecurityProfilesPage
	 */
    public async selectACustomSecurityProfiles(type: string = "name", value: string): Promise<SecurityProfilesPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting a security profiles`);
            if (type == "name") {
                await this.tbrSecurityProfilesByName(value).click();
            }
            else {
                await this.tbrSecurityProfilesByIndex(parseInt(value)).click();
            }
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectACustomSecurityProfiles, err.message);
        }
    }

    /**
    * Go To Permission Tab
    * @author Tung.Vo
    * @returns {Promise<SecurityProfilesPage>}
    * @memberof SecurityProfilesPage
    */
    public async goToPermissionTab(): Promise<SecurityProfilesPage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Permission tab`);
            await this.tabPermission.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.goToPermissionTab, err.message);
        }
    }

    /**
    * Set View Dialing By Proficiency
    * @author Tung.Vo
    * @returns {Promise<SecurityProfilesPage>}
    * @memberof SecurityProfilesPage
    */
    public async setViewDialingByProficiency(mode: State): Promise<SecurityProfilesPage> {
        try {
            if (mode == State.ON) {
                await this.chkViewDialingByProficiency.setCheckBox(true);
            } else {
                await this.chkViewDialingByProficiency.setCheckBox(false);
            }
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setViewDialingByProficiency, err.message);
        }
    }

    /**
	 * Set Edit Dialing By Proficiency
     * @author Tung.Vo
	 * @returns {Promise<SecurityProfilesPage>}
	 * @memberof SecurityProfilesPage
	 */
    public async setEditDialingByProficiency(mode: State): Promise<SecurityProfilesPage> {
        try {
            if (mode == State.ON) {
                await this.chkEditDialingByProficiency.setCheckBox(true);
            } else {
                await this.chkEditDialingByProficiency.setCheckBox(false);
            }
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setEditDialingByProficiency, err.message);
        }
    }

    /**
	 * Complete Changes
     * @author Tung.Vo
	 * @returns {Promise<SecurityProfilesPage>}
	 * @memberof SecurityProfilesPage
	 */
    public async completeChanges(): Promise<SecurityProfilesPage> {
        try {
            await Logger.write(FunctionType.UI, `Completing changes`);
            await this.btnDone.scrollToElement();
            await this.btnDone.click();
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.completeChanges, err.message);
        }
    }

    /**
    * Edit Permission
    * @author Tung.Vo
    * @returns {Promise<SecurityProfilesPage>}
    * @memberof SecurityProfilesPage
    */
    public async editPermission(): Promise<SecurityProfilesPage> {
        try {
            await Logger.write(FunctionType.UI, `Editing Permission`);
            await this.btnEditPermission.click();
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editPermission, err.message);
        }
    }

    /**
    * Deactivate security profile
    * @author Chinh.Nguyen
    * @returns {Promise<SecurityProfilesPage>}
    * @memberof SecurityProfilesPage
    */
    public async deactivateSecurityProfile(): Promise<SecurityProfilesPage> {
        try {
            await Logger.write(FunctionType.UI, `Deactivate Permission`);
            await this.btnDeactiveProfile.click();
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.deactivateSecurityProfile, err.message);
        }
    }

    /**
    * Create new security profile
    * @author Chinh.Nguyen
    * @returns {Promise<SecurityProfilesPage>}
    * @memberof SecurityProfilesPage
    */
    public async createSecurityProfile(profileName: string): Promise<SecurityProfilesPage> {
        try {
            await Logger.write(FunctionType.UI, `Creating new security profile`);
            await this.btnCreateNew.click();

            // Step 1
            await this.txtProfileName.type(profileName);
            await this.btnNext.click();
            await this.waitForSpinnerComponentDisappear();

            // Step 2 
            await this.btnNext.click();
            await this.waitForSpinnerComponentDisappear();

            // Step 3 
            await this.btnNext.click();
            await this.waitForSpinnerComponentDisappear();

            // Step 4 
            await this.btnNext.click();
            await this.waitForSpinnerComponentDisappear();

            // Step 5 
            await this.btnNext.click();
            await this.waitForSpinnerComponentDisappear();

            // Step 6 
            await this.btnNext.click();
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.createSecurityProfile, err.message);
        }
    }
}