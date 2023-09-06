import TopMenu from '@page-objects/CXone/general/top-menu';
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class SkillsDetailPage extends TopMenu {

	private static _skillsDetailPage: SkillsDetailPage = null;

	protected tabUser = new ElementWrapper(by.xpath("//span[contains(@id,'tcSkillDetails_tpnlSkillsAgents_tab')]"));
	protected txtAssignSearch = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillsAgents_SkillsAgents_gsUnassigned_tbSearchCriteria']"));
	protected btnAssignSearch = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillsAgents_SkillsAgents_gsUnassigned_btnSearch_ShadowButton']"));
	protected btnAddUsers = new ElementWrapper(by.xpath("//button[contains(@id,'tcSkillDetails_tpnlSkillsAgents_SkillsAgents_btnAddAgents_ShadowButton')]"));

	// Dynamic controls
	protected chkAssignUser(text: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//td[text()='${text}']/preceding-sibling::td/span[@class='checkbox']`));
	}

	constructor() { super(); }

	public static getInstance(): SkillsDetailPage {
		this._skillsDetailPage = new SkillsDetailPage();
		return this._skillsDetailPage;
	}

	/**
	 * Go to "User" tab in "Skill Details" page
	 * @returns {Promise<SkillsDetailPage>}
	 * @memberof SkillsDetailPage
	 */
	public async gotoUserTab(): Promise<SkillsDetailPage> {
		try {
			await Logger.write(FunctionType.UI, "Going to User tab");
			await this.tabUser.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.gotoUserTab, err.message);
		}
	}

	/**
	 * Assign skill for user
	 * @param {string} email email of user
	 * @returns {Promise<this>} "Skill Detail" page
	 * @memberof SkillsDetailPage
	 */
	public async assignUserSkill(email: string): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, `Assigning skill to ${email}`);
			await this.txtAssignSearch.type(email);
			await this.btnAssignSearch.click();
			await this.chkAssignUser(email).click();
			await this.btnAddUsers.click();
			await this.waitForSpinnerComponentDisappear();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.assignUserSkill, err.message);
		}
	}
}
