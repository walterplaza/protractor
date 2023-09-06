import { Button } from "@data-objects/general/general";
import { ToolsOption } from "@data-objects/general/max";
import TestRunInfo from "@data-objects/general/test-run-info";
import MaxOverviewPage from "@page-objects/inContact/max/max-overview-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { FunctionType, Logger } from '@utilities/general/logger';
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { Browser, by } from "protractor";
import { protractor } from "protractor/built/ptor";

export default class MaxMoreToolsPage {

	private static _maxMoreToolsPage: MaxMoreToolsPage = null;

	public static async getInstance(): Promise<MaxMoreToolsPage> {
		this._maxMoreToolsPage = new MaxMoreToolsPage();
		return this._maxMoreToolsPage;
	}

	
	protected tbInformation = new ElementWrapper(by.xpath("//li[contains(@data-button-type, 'information')]"))
	protected bntReloadApplication = new ElementWrapper(by.xpath("//button[@title='Reload Application']"))

	// Dynamic controls
	
	/**
	 * Show Information
	 * @author: Anh.Le
	 * @returns {Promise<MaxMoreToolsPage>}
	 * @memberof MaxMoreToolsPage
	 */
	public async goToMoreInformation(): Promise<MaxMoreToolsPage> {
		try {
			await Logger.write(FunctionType.UI, "Going To More Information");
			await this.tbInformation.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.goToMoreInformation, err.message);
		}
	}

	/**
	 * Click Reload Application to load latest update
	 * @author: Anh.Le
	 * @returns {Promise<MaxMoreToolsPage>}
	 * @memberof MaxMoreToolsPage
	 */
	public async clickReloadApplication(): Promise<MaxMoreToolsPage> {
		try {
			await Logger.write(FunctionType.UI, "Going To Reload Application");
			await this.bntReloadApplication.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickReloadApplication, err.message);
		}
	}

}