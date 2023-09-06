import { Agent, CxOneAgentRole } from "@data-objects/general/agent";
import SetPasswordPage from "@page-objects/CXone/general/set-password-page";
import TopMenu from "@page-objects/CXone/general/top-menu";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import TestRunInfo from "@data-objects/general/test-run-info";
import TenantPage from "@page-objects/CXone/tenant/tenant-page";

export default class EmployeesPage extends TopMenu {

	constructor() { super(); }

	private static _employeesPage: EmployeesPage = null;

	public static async getInstance(): Promise<EmployeesPage> {
		// this._employeesPage = (this._employeesPage == null) ? new EmployeesPage() : this._employeesPage;
		this._employeesPage = new EmployeesPage();
		await this._employeesPage.waitForPageLoad();
		return this._employeesPage;
	}

	protected btnNewEmployee = new ElementWrapper(by.xpath("//button[@id='newUser']"));
	protected txtSearchEmployee = new ElementWrapper(by.xpath("//input[@ng-model='$parent.searchCriteria']"));
	protected lblSuccessMessage = new ElementWrapper(by.xpath("//div[@class='toast-message'][text()='Employee was created successfully!']"));
	protected lblDeleteMessage = new ElementWrapper(by.xpath("//div[@class='toast-message'][contains(text(),'Employee was deleted successfully']"));
	protected btnDelete = new ElementWrapper(by.xpath("//button[contains(@class,'delete-button')]"));
	protected btnDeactivateUser = new ElementWrapper(by.xpath("//div[@class='popover-content']//li[./span[text()='Deactivate']]"));
	protected divEmployeeContainer = new ElementWrapper(by.xpath("//div[@class='ag-body-container']"));
	protected lblEmployeePageTitle = new ElementWrapper(by.xpath("//div[contains(@class,'user-management-page')]//h1[@class='page-title ng-binding']"));
	protected lblLoading = new ElementWrapper(by.xpath("//span[@class='ag-overlay-loading-center']"));
	protected createNewEmployeeForm = CreateNewEmployeeForm.getInstance();
	protected btnStopImpersonated = new ElementWrapper(by.xpath("//div[@class='nice-action-bar']//button[@class='bar-button']"));

	// Dynamic controls
	protected btnInviteEmployee(email: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@col-id='emailAddress'][.//div[text()='${email}']]/following-sibling::div[@col-id='status'][.//button[contains(@class,'btn-invite')]]`));
	}

	protected btnActionIcon(email: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@col-id='emailAddress'][.//div[text()='${email}']]/following-sibling::div[@col-id='actions']//button`));
	}

	protected btnInvite(employeeName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//span[text()='${employeeName}']/ancestor::div[contains(@class,'ag-row ag-row')]//button[@class='btn btn-primary btn-invite ng-isolate-scope progress-button progress-button-dir-horizontal progress-button-style-shrink']`));
	}

	protected lblEmployeeActive(employeeName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//span[text()='${employeeName}']/ancestor::div[contains(@class,'ag-row ag-row')]//span[text()='Active']`));
	}

	protected lblEmployeeStatus(employeeName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//span[@class='user-full-name'][text()='${employeeName}']/ancestor::div[contains(@class,'ag-row ag-row')]//div[@col-id='status']/span`));
	}

	protected lblProcessBar(employeeName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//span[@class='user-full-name'][text()='${employeeName}']/ancestor::div[contains(@class,'ag-row ag-row')]//div[@col-id='status']//span[@class='progress']`));
	}

	protected btnProcess(employeeName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//span[text()='${employeeName}']/ancestor::div[contains(@class,'ag-row ag-row')]//button[@class='btn btn-primary btn-invite ng-isolate-scope progress-button progress-button-dir-horizontal progress-button-style-shrink disabled state-success']`));
	}

	/**
	* Wait for Employee table displayed
	* @returns {Promise<void>}
	* @memberof EmployeesPage
	*/
	public async waitForEmployeeTable(): Promise<void> {
		try {
			await this.lblLoading.wait();
			await this.lblLoading.waitUntilDisappear();
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForEmployeeTable, err.message);
		}
	}

	/**
	* Check New Employee is created in "Employee" page
	* @returns {Promise<boolean>} Display=>true, not displayed=>false
	* @memberof EmployeesPage
	*/
	public async isNewEmployeeCreated(email: string): Promise<boolean> {
		try {
			return await this.btnInviteEmployee(email).isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isNewEmployeeCreated, err.message);
		}
	}

	/**
	 * Check "Agent Option" field is displayed in "Employee" page
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof EmployeesPage
	 */
	public async isPageDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblEmployeePageTitle.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
		}
	}

	/**
	 * Is "Success" Messages displayed in "Employee" page
	 * @author Phat.Ngo
	 * @param {number} [timeoutInSecond] Time to wait for element before checking
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof EmployeesPage
	 */
	public async isSuccessMessageDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblSuccessMessage.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isSuccessMessageDisplayed, err.message);
		}
	}

	/**
	 * Is "Delete" Message displayed in "Employee" page
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof EmployeesPage
    */
	public async isDeleteMessageDisplayed(): Promise<boolean> {
		try {
			return await this.lblDeleteMessage.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isDeleteMessageDisplayed, err.message);
		}
	}

	/**
	 * Click "New Employee" button to open "New Employee" form
	 * @returns {Promise<EmployeesPage>} "Create new employee" form
	 * @memberof EmployeesPage
	 */
	public async openNewEmployeeForm(): Promise<EmployeesPage> {
		try {
			await Logger.write(FunctionType.UI, "Opening new employee");
			await this.btnNewEmployee.click();
			await this.waitForSpinner();
			await this.createNewEmployeeForm.waitForCreateNewEmployeeForm();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.openNewEmployeeForm, err.message);
		}
	}

	/**
	 * Search employee using employee's name
	 * @param {string} employeeName name of employee to search 
	 * @returns {Promise<EmployeesPage>} "Employee" page
	 * @memberof EmployeesPage
	 */
	public async searchEmployeeName(employeeName: string): Promise<EmployeesPage> {
		try {
			await Logger.write(FunctionType.UI, `Searching '${employeeName}' in employee page`);
			await this.txtSearchEmployee.type(employeeName);
			await this.divEmployeeContainer.waitUntilPropertyChange("height", TestRunInfo.shortTimeout);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.searchEmployeeName, err.message);
		}
	}

	/**
	 * Delete employee in "Employee" Page
	 * @param {string} email email of employee to delete
	 * @returns {Promise<EmployeesPage>} "Employee" page
	 * @memberof EmployeesPage
	 */
	public async deleteEmployee(email: string): Promise<EmployeesPage> {
		try {
			await Logger.write(FunctionType.UI, `Deleting '${email}'`);
			await this.btnActionIcon(email).click();
			await this.btnDeactivateUser.click();
			await this.btnActionIcon(email).waitUntilDisappear();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.deleteEmployee, err.message);
		}
	}

	/**
	 * Activate New Employee 
	 * @param {string} emailUrl Email URL used to activate New Employee
	 * @returns {SetPasswordPage} Return to SetPasswordPage
	 * @memberof EmployeesPage
	 */
	public async activateNewEmployee(emailUrl: string): Promise<SetPasswordPage> {
		try {
			await Logger.write(FunctionType.UI, `Activating '${emailUrl}'`);
			await BrowserWrapper.get(emailUrl);
			return SetPasswordPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.activateNewEmployee, err.message);
		}
	}

	/**
	 * Is "Create New Employee" form displayed ?
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof EmployeesPage
	 */
	public async isCreateNewEmployeeFormDisplayed(): Promise<boolean> {
		try {
			return await this.createNewEmployeeForm.isCreateNewEmployeeFormDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCreateNewEmployeeFormDisplayed, err.message);
		}
	}

	/**
	 * Select the role of new employee
	 * @param {AgentRole} role role of new employee
	 * @returns {Promise<EmployeesPage>} "Create new employee" form
	 * @memberof EmployeesPage
	 */
	public async selectRole(role: CxOneAgentRole): Promise<EmployeesPage> {
		try {
			await this.createNewEmployeeForm.selectRole(role);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectRole, err.message);
		}
	}

	/**
	 * Fill information of new employee
	 * @param {Agent} employee information of employee to create
	 * @returns {Promise<EmployeesPage>} "Create New Employee" Form
	 * @memberof EmployeesPage
	 */
	public async fillNewEmployeeForm(employee: Agent): Promise<EmployeesPage> {
		try {
			await this.createNewEmployeeForm.fillNewEmployeeForm(employee);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.fillNewEmployeeForm, err.message);
		}
	}

	/**
	 * Create new employee
	 * @param {Agent} employee name of new employee
	 * @returns {Promise<EmployeesPage>} "Create New Employee" Form
	 * @memberof EmployeesPage
	 */
	public async createNewEmployee(employee: Agent): Promise<EmployeesPage> {
		try {
			await this.createNewEmployeeForm.createNewEmployee(employee);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.createNewEmployee, err.message);
		}
	}

	/**
	 * Delete employee using Delete icon button in "Employee" list.
	 * @returns {Promise<EmployeesPage>} "Employee" page
	 * @memberof EmployeesPage
	 */
	public async clickSaveButton(): Promise<EmployeesPage> {
		try {
			return await this.createNewEmployeeForm.clickSaveButton();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickSaveButton, err.message);
		}
	}

	/**
	 * Check employee created info
	 * @returns {Promise<boolean>} "Employee" page
	 * @memberof EmployeesPage
	 * */
	public async isEmployeeInfoCorrect(employee: Agent): Promise<boolean> {
		try {
			return this.createNewEmployeeForm.isEmployeeInfoCorrect(employee);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isEmployeeInfoCorrect, err.message);
		}
	}

	/**
	 * Get entered first name
	 * @returns {Promise<string>} inputted first name
	 * @memberof CreateNewEmployeeForm
	 */
	public async getEnteredFirstName(): Promise<string> {
		try {
			return this.createNewEmployeeForm.getEnteredFirstName();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getEnteredFirstName, err.message);
		}
	}

	/**
	 * Get entered last name
	 * @returns {Promise<string>} inputted last name
	 * @memberof CreateNewEmployeeForm
	 */
	public async getEnteredLastName(): Promise<string> {
		try {
			return this.createNewEmployeeForm.getEnteredLastName();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getEnteredLastName, err.message);
		}
	}

	/**
	 * Get selected role
	 * @returns {Promise<string>} Selected role
	 * @memberof CreateNewEmployeeForm
	 */
	public async getSelectedRole(): Promise<string> {
		try {
			return this.createNewEmployeeForm.getSelectedRole();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getSelectedRole, err.message);
		}
	}

	/**
	 * Get entered email address
	 * @returns {Promise<string>} inputted email address
	 * @memberof CreateNewEmployeeForm
	 */
	public async getEnteredEmailAddress(): Promise<string> {
		try {
			return this.createNewEmployeeForm.getEnteredEmailAddress();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getEnteredEmailAddress, err.message);
		}
	}

	/**
	 * Get entered user name
	 * @returns {Promise<string>} inputted user name
	 * @memberof CreateNewEmployeeForm
	 */
	public async getEnteredUserName(): Promise<string> {
		try {
			return this.createNewEmployeeForm.getEnteredUserName();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getEnteredUserName, err.message);
		}
	}

	/**
	 * Wait for Create New Employee Form
	 * @returns {Promise<ElementWrapper>}
	 * @memberof CreateNewEmployeeForm
	 */
	public async waitForCreateNewEmployeeForm(): Promise<void> {
		try {
			return await this.createNewEmployeeForm.waitForCreateNewEmployeeForm();
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForCreateNewEmployeeForm, err.message);
		}
	}

	/**
	 * Click Stop Impersonated
	 * @author Tan.Ta
	 * @returns {Promise<TenantPage>}
	 * @memberof EmployeesPage
	 */
	public async stopImpersonated(): Promise<TenantPage> {
		try {
			await Logger.write(FunctionType.UI, `Stopping Impersonated`);
			await this.btnStopImpersonated.click();
			return TenantPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.stopImpersonated, err.message);
		}
	}

	/**
	 * Click invite Employee button
	 * @author Tan.Ta
	 * @param {string} name
	 * @returns {Promise<void>}
	 * @memberof EmployeesPage
	 */
	public async inviteEmployee(name: string): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, `Clicking Invite button`);
			await this.btnInvite(name).click();
			await this.lblProcessBar(name).waitUntilDisappear();
			await this.btnProcess(name).waitUntilDisappear();
			await this.waitForSpinnerDisappear();
			await this.lblEmployeeStatus(name).waitUntilPropertyChange("text");
		} catch (err) {
			throw new errorwrapper.CustomError(this.inviteEmployee, err.message);
		}
	}

	/**
	 * Check new employee is active or not
	 * @author Tan.Ta
	 * @param {string} name
	 * @returns {Promise<boolean>}
	 * @memberof EmployeesPage
	 */
	public async isEmployeeActive(name: string): Promise<boolean> {
		try {
			return await this.lblEmployeeActive(name).isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isEmployeeActive, err.message);
		}
	}

	/**
	 * Get Employee status
	 * @author Tan.Ta
	 * @param {string} name
	 * @returns {Promise<string>}
	 * @memberof EmployeesPage
	 */
	public async getEmployeeStatus(name: string): Promise<string> {
		try {
			return await this.lblEmployeeStatus(name).getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getEmployeeStatus, err.message);
		}
	}
}

class CreateNewEmployeeForm {
	private static _createNewEmployeeForm: CreateNewEmployeeForm = null;

	public static getInstance(): CreateNewEmployeeForm {
		this._createNewEmployeeForm = new CreateNewEmployeeForm();
		// this._createNewEmployeeForm = (this._createNewEmployeeForm == null) ? new CreateNewEmployeeForm() : this._createNewEmployeeForm;
		return this._createNewEmployeeForm;
	}

	protected txtFirstName = new ElementWrapper(by.xpath("//input[@id='firstName']"));
	protected txtLastName = new ElementWrapper(by.xpath("//input[@id='lastName']"));
	protected btnRoleSelection = new ElementWrapper(by.xpath("//div[@id='user_roles']"));
	protected txtEmailAddress = new ElementWrapper(by.xpath("//input[@id='emailAddress']"));
	protected txtUsername = new ElementWrapper(by.xpath("//input[@id='username']"));
	protected btnSave = new ElementWrapper(by.xpath("//button[@id='saveWithPopoverBtn']"));
	protected btnCancel = new ElementWrapper(by.id("cancel"));
	protected createEmployeeForm = new ElementWrapper(by.xpath("//div[@ng-form='userForm']"));
	protected divRowSpinner = new ElementWrapper(by.xpath("//div[@class='row wfmspinner']"));
	protected lblUserName = new ElementWrapper(by.xpath("//label[@translate='createUserModal.formLabels.username']"));
	protected lblEmailErrorMsg = new ElementWrapper(by.xpath("//input[@id='emailAddress']//following-sibling::div/div[@ng-message='emailCharacters']"));
	protected lblUserNameErrorMsg = new ElementWrapper(by.xpath("//input[@id='username']//following-sibling::div/div[@ng-message='emailCharacters']"));

	protected getItemRoleSelection(role: CxOneAgentRole): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class="ui-select-choices ui-select-dropdown selectize-dropdown ng-scope single"]//span[text()='${role}']`));
	}

	/**
	 * Is "Create New Employee" form displayed ?
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof CreateNewEmployeeForm
	 */
	public async isCreateNewEmployeeFormDisplayed(): Promise<boolean> {
		return await this.createEmployeeForm.isDisplayed();
	}

	/**
	 * Select the role of new employee
	 * @param {AgentRole} role role of new employee
	 * @returns {Promise<CreateNewEmployeeForm>} "Create new employee" form
	 * @memberof CreateNewEmployeeForm
	 */
	public async selectRole(role: CxOneAgentRole): Promise<CreateNewEmployeeForm> {
		await Logger.write(FunctionType.UI, `Selecting '${role}' for agent`);
		await this.btnRoleSelection.click();
		await this.getItemRoleSelection(role).waitForControlStable();
		await this.getItemRoleSelection(role).click();
		await this.btnRoleSelection.waitForControlStable();
		return this;
	}

	/**
	 * Fill information of new employee
	 * @param {Agent} employee information of employee to create
	 * @returns {Promise<CreateNewEmployeeForm>} "Create New Employee" Form
	 * @memberof CreateNewEmployeeForm
	 */
	public async fillNewEmployeeForm(employee: Agent): Promise<CreateNewEmployeeForm> {
		await Logger.write(FunctionType.UI, `Filling employee information`);
		await this.createEmployeeForm.waitForControlStable();
		await this.txtFirstName.type(employee.firstName);
		await this.txtLastName.type(employee.lastName);
		await this.selectRole(employee.cxOneRole);
		await this.txtEmailAddress.type(employee.email);
		await this.lblEmailErrorMsg.waitUntilDisappear();
		await this.lblUserNameErrorMsg.waitUntilDisappear();
		await this.divRowSpinner.waitUntilDisappear();
		await this.lblUserName.click();
		return this;
	}

	/**
	 * Create new employee
	 * @param {Agent} employee name of new employee
	 * @returns {Promise<CreateNewEmployeeForm>} "Create New Employee" Form
	 * @memberof CreateNewEmployeeForm
	 */
	public async createNewEmployee(employee: Agent): Promise<CreateNewEmployeeForm> {
		await Logger.write(FunctionType.UI, `Creating new employee`);
		await this.fillNewEmployeeForm(employee);
		await this.btnSave.click();
		await this.createEmployeeForm.waitUntilDisappear();
		return this;
	}

	/**
	 * Delete employee using Delete icon button in "Employee" list.
	 * @returns {Promise<EmployeesPage>} "Employee" page
	 * @memberof CreateNewEmployeeForm
	 */
	public async clickSaveButton(): Promise<EmployeesPage> {
		await Logger.write(FunctionType.UI, "Clicking Save Button on Create Employee Form");
		await this.btnSave.click();
		await this.createEmployeeForm.waitUntilDisappear();
		return EmployeesPage.getInstance();
	}

	/**
	 * Is employee created info displayed correctly.
	 * @returns {Promise<boolean>} "Employee" page
	 * @memberof CreateNewEmployeeForm
	 */
	public async isEmployeeInfoCorrect(employee: Agent): Promise<boolean> {
		let firstNameString: string = await this.txtFirstName.getControlValue();
		let lastNameString: string = await this.txtLastName.getControlValue();
		let roleString: string = await this.btnRoleSelection.getText();
		let emailAddressString: string = await this.txtEmailAddress.getControlValue();
		let userNameString: string = await this.txtUsername.getControlValue();

		if (firstNameString == employee.firstName && lastNameString == employee.lastName
			&& roleString == employee.cxOneRole && emailAddressString == employee.email
			&& userNameString == employee.email) {
			return true;
		}
		else {
			return false;
		}
	}

	/**
	 * Get entered first name
	 * @returns {Promise<string>} inputted first name
	 * @memberof CreateNewEmployeeForm
	 */
	public async getEnteredFirstName(): Promise<string> {
		return await this.txtFirstName.getControlValueById();
	}

	/**
	 * Get entered last name
	 * @returns {Promise<string>} inputted last name
	 * @memberof CreateNewEmployeeForm
	 */
	public async getEnteredLastName(): Promise<string> {
		return await this.txtLastName.getControlValueById();
	}

	/**
	 * Get selected role
	 * @returns {Promise<string>} Selected role
	 * @memberof CreateNewEmployeeForm
	 */
	public async getSelectedRole(): Promise<string> {
		return await this.btnRoleSelection.getText();

	}

	/**
	 * Get entered email address
	 * @returns {Promise<string>} inputted email address
	 * @memberof CreateNewEmployeeForm
	 */
	public async getEnteredEmailAddress(): Promise<string> {
		return await this.txtEmailAddress.getControlValueById();
	}

	/**
	 * Get entered user name
	 * @returns {Promise<string>} inputted user name
	 * @memberof CreateNewEmployeeForm
	 */
	public async getEnteredUserName(): Promise<string> {
		return await this.txtUsername.getControlValueById();
	}

	/**
	 * Wait for Create New Employee Form
	 * @returns {Promise<ElementWrapper>}
	 * @memberof CreateNewEmployeeForm
	 */
	public async waitForCreateNewEmployeeForm(): Promise<void> {
		await Logger.write(FunctionType.UI, `Waiting for Create New Employee Form`);
		return await this.createEmployeeForm.waitForControlStable();
	}
}
