import { SearchColumnName, SearchTimeRange } from "@data-objects/general/cluster";
import InteractionPlayer from "@page-objects/CXone/general/cxone-player";
import TopMenu from "@page-objects/CXone/general/top-menu";
import SelectQMFormPage from "@page-objects/CXone/search/select-qm-form-page";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from '@utilities/protractor-wrappers/element-wrapper';
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import TestRunInfo from "@data-objects/general/test-run-info";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import SelfAssessment from "@page-objects/CXone/search/create-new-self-assessment";
import ProjectPath from "@test-data/general/project-path";

export default class SearchPage extends TopMenu {

	private static _searchPage: SearchPage = null;

	protected btnTimeSelection = new ElementWrapper(by.xpath("//button[@id='single-button']"));
	protected txtSearch = new ElementWrapper(by.xpath("//input[@id='search-input']"));
	protected btnSearch = new ElementWrapper(by.xpath("//button[@class='search-box-button btn']"));
	protected lblTotalFound = new ElementWrapper(by.xpath("//div[@class='total-label']"));
	protected divListRecordedResult = new ElementWrapper(by.xpath("//div[@class='search-grid']//div[@class='grid-wrapper']"));
	protected pnlThreeDots = new ElementWrapper(by.xpath("//div[@class='more-items ng-scope']"));
	protected btnSelectEvaluation = new ElementWrapper(by.xpath("//button[@class='btn btn-primary btn-footer ng-scope ng-isolate-scope']"));
	protected lblSelectedDate = new ElementWrapper(by.xpath("//div[@class='date-range-picker']//span[@class='b-dd-flex-item b-dd-flex-item-text ng-binding']"));
	protected lblEvaluate = new ElementWrapper(by.xpath("//div[@class='popover-content']//div[@class='popover-action']//label[text()='Evaluate']"));
	protected lblCalibrate = new ElementWrapper(by.xpath("//div[@class='popover-content']//div[@class='popover-action']//label[text()='Calibrate']"));
	protected lblShare = new ElementWrapper(by.xpath("//div[@class='popover-content']//div[contains(@class,'popover-action')]//label[text()='Share']"));
	protected lblSelfAssessment = new ElementWrapper(by.xpath("//div[@class='popover-content']//div[contains(@class,'popover-action')]//label[text()='Self Assessment']"));
	protected msgSelfAssessmentInitiated = new ElementWrapper(by.xpath("//div[@class='toast-bottom-right']//div[text()='Self-Assessment initiated']"));
	protected createNewSelfAssessment = CreateNewSelfAssessment.getInstance();
	// Dynamic controls

	protected lblEvaluationDropdownItem(itemName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//span[@class='ng-binding'][text()='${itemName}']/..`));
	}

	protected lblContactRow(agentName: string, contactID: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[text()='${agentName}']/../../following-sibling::div[@col-id='acdContactId']//div/em[text()='${contactID}']`));
	}

	protected lblSearchResult(rowNumber: number, columnName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='ag-body-container']/div[@row-index='${rowNumber}']/div[count(//span[text()='${columnName}']/ancestor::div[@colid]/preceding-sibling::div) + 1]`));

		// return new ElementWrapper(by.xpath(`//div[@class='ag-body-container']/div[${rowNumber}]/div[count(//span[text()='${columnName}']/ancestor::div[@colid]/preceding-sibling::div) + 1]`));
	}

	protected lblthreeDotsItem(itemName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//label[@class='ng-binding'][text()='${itemName}']/..`));
	}

	protected lblItemTimeSelection(time: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//a[text()='${time}']`));
	}

	protected btnPlayRecord(index: number): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[contains(@class,'ag-row ag-row')][@row-index='${index}']//button[@class='play-button']`));
	}

	protected lblRecordedSegment(contactID: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@col-id='segmentContactId'][.//div[text()='${contactID}']]/ancestor::div[@role='row']`));
	}

	protected lblAgentRecorded(agentName: string, customerPhoneNumber: number) {
		return new ElementWrapper(by.xpath(`(//div[@class='ag-body ag-row-no-animation']//div[text()='${agentName}']/ancestor::div[contains(@class,'ag-row ag-row')]/preceding-sibling::div//div[contains(text(),'${customerPhoneNumber}')])[1]`));
	}

	protected lblAgentNameRecorded(agentName: string) {
		return new ElementWrapper(by.xpath(`//div[@col-id='agentNames']//div[text()='${agentName}']/ancestor::div[contains(@class,'ag-row ag-row')]`));
	}

	protected btnMoreMenu(rowId: string) {
		return new ElementWrapper(by.xpath(`//div[@class='ag-pinned-right-cols-container']/div[@row-id='${rowId}']//span[@class='search-icon-more-items']`));
	}

	protected lblAgentScoreWithPhoneNumber(agentName: string, phoneNumber: string, score: string) {
		return new ElementWrapper(by.xpath(`//div[contains (@class,'ag-row') and div[.//span[text()='${agentName}']]/following-sibling::div[.//span[contains (text(),'${phoneNumber}')]]/following-sibling::div[.//span[contains (text(),'${score}')]]]`));
	}

	protected lblAgentScore(agentName: string, score: string) {
		return new ElementWrapper(by.xpath(`(//div[contains (@class,'ag-row') and div[.//div[text()='${agentName}']]/following-sibling::div[@col-id='customerPhoneNumbers']/following-sibling::div[.//span[contains (text(),'${score}')]]])[1]`));
	}

	protected rowAgentItem(agentName: string, contactID: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@col-id='agentNames'][.//div[text()='${agentName}']]/following-sibling::div[@col-id='acdContactId'][.//*[text()='${contactID}']]/parent::div`));
	}

	protected rowItemEvaluateScore(rowIndex: number, score: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@col-id='qualityManagement'][.//span[text()='${score}']]/parent::div[@row-index='${rowIndex}']`));
	}

	protected rowAgentSegment(index: number): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='ag-body-container']/div[@role='row'][${index}]/div[@col-id='agentNames']/div`))
	}

	protected lblCallReason(rowIndex: number) {
		return new ElementWrapper(by.xpath(`//div[contains(@class,'ag-row ag-row')][@row-index='${rowIndex}']/div[@col-id="callTagging"]//div[@class="overflow-tooltip-wrapper ng-isolate-scope"]`));
	}

	protected btnThreeDots(index: number): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[contains(@class,'ag-row ag-row')][@row-index='${index}']//div[@class='actions']//span[@class='search-icon-more-items']`));
	}

	protected lblCategory(rowIndex: number) {
		return new ElementWrapper(by.xpath(`//div[contains(@class,'ag-row ag-row')][@row-index='${rowIndex}']/div[@col-id="category"]//div[@class="overflow-tooltip-wrapper ng-isolate-scope"]`))
	}

	protected constructor() { super(); }

	public static getInstance(): SearchPage {
		// this._searchPage = (this._searchPage == null) ? new SearchPage() : this._searchPage;
		this._searchPage = new SearchPage();
		return this._searchPage;
	}

	/**
	 * Select time
	 * @param {SearchTimeRange} time Time to select
	 * @returns {Promise<void>} 
	 * @memberof SearchPage
	 */
	public async selectTime(time: SearchTimeRange): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Selecting Time Range");
			await this.btnTimeSelection.click();
			await this.lblItemTimeSelection(time).click();
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectTime, err.message);
		}
	}

	/**
	 * Search item by given time and value
	 * @param {SearchTimeRange} time Time to search
	 * @param {string} value value to search
	 * @returns {Promise<SearchPage>} Search page
	 * @memberof SearchPage
	 */
	public async search(time: SearchTimeRange, value: string): Promise<SearchPage> {
		try {
			await Logger.write(FunctionType.UI, "Searching in Search page");
			await this.selectTime(time);
			await this.txtSearch.type(value);
			await this.btnSearch.waitForControlStable();
			await this.btnSearch.click();
			await this.waitForSpinner();
			return await this.waitForSearch();
		} catch (err) {
			throw new errorwrapper.CustomError(this.search, err.message);
		}
	}

	/**
	 * Wait for search 
	 * @returns {Promise<SearchPage>} Search Page
	 * @memberof SearchPage
	 */
	public async waitForSearch(): Promise<SearchPage> {
		try {
			await this.lblTotalFound.wait();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForSearch, err.message);
		}
	}

	/**
	 * Get search result
	 * @param {number} rowNumber row number value
	 * @param {SearchColumnName} columnName column number value
	 * @returns {Promise<string>}  search result
	 * @memberof SearchPage
	 */
	public async getSearchResult(rowNumber: number, columnName: SearchColumnName): Promise<string> {
		try {
			return await this.lblSearchResult(rowNumber, columnName).getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getSearchResult, err.message);
		}
	}

	/**
	 * Check search page is displayed or not 
	 * @returns {Promise<boolean>} the existence of the search page 
	 * @memberof SearchPage
	 */
	public async isPageDisplayed(): Promise<boolean> {
		try {
			return await this.btnSearch.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
		}
	}

	/**
	 * Click "Play record" button
	 * @param {number} index index value
	 * @returns {Promise<InteractionPlayer>} Interaction Player page
	 * @memberof SearchPage
	 */
	public async playRecord(index: number): Promise<InteractionPlayer> {
		try {
			await Logger.write(FunctionType.UI, `Playing record at index ${index}`);
			let playBtnAttribute: string = await this.btnPlayRecord(index).getAttribute("disabled");
			if (playBtnAttribute != "true") {
				await this.btnPlayRecord(index).waitForControlStable();
				await this.btnPlayRecord(index).click();
				return await InteractionPlayer.getInstance();
			} else {
				throw Error("Play icon is disabled");
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.playRecord, err.message);
		}
	}

	/**
	 * Checking recorded segment is displayed
	 * @author Y.Le
	 * @param {string} contactID
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof SearchPage
	 */
	public async isRecordedSegmentDisplayed(contactID: string, timeOut?: number): Promise<boolean> {
		try {
			return await this.lblRecordedSegment(contactID).isDisplayed(timeOut);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isRecordedSegmentDisplayed, err.message);
		}
	}

	/**
	 * Checking list recorded segment is displayed
	 * @author Y.Le
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof SearchPage
	 */
	public async isListRecordedSegmentDisplayed(timeOut?: number): Promise<boolean> {
		try {
			return await this.divListRecordedResult.isDisplayed(timeOut);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isListRecordedSegmentDisplayed, err.message);
		}
	}

	/**
	 * Get selected date
	 * @author Tan.Ta
	 * @returns {Promise<string>}
	 * @memberof SearchPage
	 */
	public async getSelectedDate(): Promise<string> {
		try {
			return await this.lblSelectedDate.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getSelectedDate, err.message);
		}
	}

	/**
	 * Click search button
	 * @author Tan.Ta
	 * @returns {Promise<void>}
	 * @memberof SearchPage
	 */
	public async clickSearch(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, `Clicking Search button`);
			await this.btnSearch.click();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickSearch, err.message);
		}
	}

	/**
	 * Click on more menu option by agent name
	 * @author Tan.Ta
	 * @param {string} agentName
	 * @param {number} [customerPhoneNumber]
	 * @returns {Promise<void>}
	 * @memberof SearchPage
	 */
	public async openMoreMenuOption(agentName: string, customerPhoneNumber?: number): Promise<void> {
		try {
			let rowId: string;

			if (customerPhoneNumber != null) {
				rowId = await this.lblAgentRecorded(agentName, customerPhoneNumber).getAttribute("row-id");;
			} else {
				rowId = await this.lblAgentNameRecorded(agentName).getAttribute("row-id");
			}

			if (rowId != null) {
				await this.btnMoreMenu(rowId).waitForControlStable();
				await this.btnMoreMenu(rowId).click();
			} else {
				throw Error("Cannot get row ID");
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.openMoreMenuOption, err.message);
		}
	}

	/**
	 * Check Evaluation option is displayed
	 * @author Tan.Ta
	 * @returns {Promise<boolean>}
	 * @memberof SearchPage
	 */
	public async isEvaluationOptionDisplayed(): Promise<boolean> {
		try {
			return await this.lblEvaluate.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isEvaluationOptionDisplayed, err.message);
		}
	}

	/**
	 * Select Three Dots item 
	 * @author Chinh.Nguyen
	 * @returns {Promise<String>}
	 * @memberof SearchPage
	 */
	public async selectThreeDotsItem(itemName: string): Promise<SearchPage> {
		try {
			await Logger.write(FunctionType.UI, `Selecting three dots item`);
			await this.lblthreeDotsItem(itemName).click();
			return SearchPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectThreeDotsItem, err.message);
		}
	}

	/**
	 * Check Calibrate option is displayed
	 * @author Tan.Ta
	 * @returns {Promise<boolean>}
	 * @memberof SearchPage
	 */
	public async isCalibrateOptionDisplayed(): Promise<boolean> {
		try {
			return await this.lblCalibrate.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCalibrateOptionDisplayed, err.message);
		}
	}

	/**
	 * Check that all evaluation option are displayed in evaluation dropdown list 
	 * @author Chinh.Nguyen
	 * @returns {Promise<String>}
	 * @memberof SearchPage
	 */
	public async isAllEvaluationDisplayedDropDownList(itemList: string[]): Promise<boolean> {
		try {
			for (let i = 0; i < itemList.length; i++) {
				if (!(await this.lblEvaluationDropdownItem(itemList[i]).isDisplayed())) {
					return false;
				}
			}
			return true;
		} catch (err) {

			throw new errorwrapper.CustomError(this.isAllEvaluationDisplayedDropDownList, err.message);
		}
	}

	/** 
	 * Select evaluation option
	 * @author Tan.Ta
	 * @returns {Promise<SelectQMFormPage>}
	 * @memberof SearchPage
	 */
	public async selectEvaluateOption(): Promise<SelectQMFormPage> {
		try {
			await Logger.write(FunctionType.UI, `Clicking on Evaluation Option`);
			await this.lblEvaluate.waitForControlStable();
			await this.lblEvaluate.click();
			return SelectQMFormPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectEvaluateOption, err.message);
		}
	}

	/**
	 * Check evaluation score is displayed or not
	 * @author Tan.Ta
	 * @param {string} agentName
 	 * @param {string} [customerPhoneNumber=""]
	 * @param {string} score
	 * @returns {Promise<boolean>}
	 * @memberof SearchPage
	 */
	public async isEvaluationScoreDisplayed(agentName: string, customerPhoneNumber: string = "", score: string): Promise<boolean> {
		try {
			let state: boolean = false;

			if (customerPhoneNumber != "") {
				state = await this.lblAgentScoreWithPhoneNumber(agentName, customerPhoneNumber, score).isDisplayed();
			} else {
				state = await this.lblAgentScore(agentName, score).isDisplayed();;
			}

			return state;
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectEvaluateOption, err.message);
		}
	}

    /**
	 * Check if agent with contact infomation displayed in search table 
	 * @author Chinh.Nguyen
	 * @param {string} agentName
	 * @param {number} contactID
	 * @returns {Promise<boolean>}
	 * @memberof SearchPage
	 */
	public async isAgentDisplayedInSearchTable(agentName: string, contactID: string): Promise<boolean> {
		try {
			return await this.lblContactRow(agentName, contactID).isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAgentDisplayedInSearchTable, err.message);
		}
	}

	/**
	 * Get row index from search table base on agent name and contact ID
	 * @author Huy.Nguyen
	 * @param {string} agentName
	 * @param {string} contactID
	 * @returns {Promise<number>}
	 * @memberof SearchPage
	 */
	public async getAgentRecordIndexByContactID(agentName: string, contactID: string): Promise<number> {
		try {
			let rowIndex: string = await this.rowAgentItem(agentName, contactID).getAttribute("row-index");
			let realRowNumber: number = parseInt(rowIndex);
			return realRowNumber;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getAgentRecordIndexByContactID, err.message);
		}
	}

	/**
	 * Check evaluation score is displayed correctly within specific row
	 * @author Huy.Nguyen
	 * @param {number} rowIndex
	 * @param {number} score
	 * @returns {Promise<boolean>}
	 * @memberof SearchPage
	 */
	public async isEvaluationScoreMatchedAtRowIndex(rowIndex: number, evaluationScore: string): Promise<boolean> {
		try {
			return await this.rowItemEvaluateScore(rowIndex, evaluationScore).isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isEvaluationScoreMatchedAtRowIndex, err.message);
		}
	}

	/**
	 * Getting segment index using agent name
	 * @author Y.Le
	 * @param {string} agentName
	 * @returns {Promise<number>}
	 * @memberof SearchPage
	 */
	public async getSegmentIndex(agentName: string): Promise<number> {
		try {
			await Logger.write(FunctionType.UI, "Getting segment index using agent name");
			let exitedRow: boolean = true;
			let index: number = 1;
			let agent: string;
			while (exitedRow) {
				exitedRow = await this.rowAgentSegment(index).isDisplayed(TestRunInfo.shortTimeout);
				if (exitedRow) {
					agent = await this.rowAgentSegment(index).getText();
				}
				if (agent == agentName) {
					return index
				} else {
					index = index + 1
				}
			}
			return 1;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getSegmentIndex, err.message);
		}
	}
	/**
	 * Is "Create New Employee" form displayed ?
	 * @returns {Promise<SearchPage>} Display=>true, not displayed=>false
	 * @memberof SearchPage
	 */
	public async clickCreateButton(): Promise<SearchPage> {
		try {
			return await this.createNewSelfAssessment.clickCreateButton();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickCreateButton, err.message);
		}
	}
	/**
     * Checking Message Panel is displayed 
     * @author Anh.Le
     * @returns {Promise<boolean>} the existence of Evaluations Panel
     * @memberof SearchPage
     */
    public async isSelfAssessmentInitiatedDisplayed(): Promise<boolean> {
        try {
            return this.msgSelfAssessmentInitiated.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSelfAssessmentInitiatedDisplayed, err.message);
        }
	}
	
	/**
	 * Selecting evaluation form
	 * @author Y.le
	 * @param {string} evaluationName
	 * @returns {Promise<SearchPage>}
	 * @memberof SearchPage
	 */
	public async selectEvaluationForm(evaluationName: string): Promise<SearchPage>{
		try{
			await this.createNewSelfAssessment.selectEvaluationForm(evaluationName);
			return this;
		} catch(err){
			throw new errorwrapper.CustomError(this.selectEvaluationForm, err.message);
		}
	}

	/**
	 * Check Share option is displayed
	 * @author Tan.Ta
	 * @returns {Promise<boolean>}
	 * @memberof SearchPage
	 */
	public async isShareOptionDisplayed(): Promise<boolean> {
		try {
			return await this.lblShare.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isShareOptionDisplayed, err.message);
		}
	}

	/**
	 * Check Self Assessment option is displayed
	 * @author Tan.Ta
	 * @returns {Promise<boolean>}
	 * @memberof SearchPage
	 */
	public async isSelfAssessmentOptionDisplayed(): Promise<boolean> {
		try {
			return await this.lblSelfAssessment.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isSelfAssessmentOptionDisplayed, err.message);
		}
	}

	/**
	 * Get Call Reason
	 * @author Tan.Ta
	 * @param {number} rowIndex
	 * @returns {Promise<string>}
	 * @memberof SearchPage
	 */
	public async getCallReason(rowIndex: number): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting Call Reason");
			return await this.lblCallReason(rowIndex).getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getCallReason, err.message);
		}
	}

	/**
	 * Click three dots
	 * @author Nhat.Nguyen
	 * @param {number} index
	 * @returns {Promise<void>}
	 * @memberof SearchPage
	 */
	public async clickThreeDots(index: number): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Clicking three dots");
			await this.btnThreeDots(index).click();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickThreeDots, err.message);
		}
	}

	/**
	 * Click Self Assessment
	 * @author Nhat.Nguyen
	 * @returns {Promise<void>}
	 * @memberof SearchPage
	 */
	public async clickSelfAssessment(): Promise<SelfAssessment> {
		try {
			await Logger.write(FunctionType.UI, "Clicking Self Assessment");
			await this.lblSelfAssessment.click();
			let selfAssessment = require(`${ProjectPath.pageObjects}/CXone/search/create-new-self-assessment`).default;
			return selfAssessment.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickSelfAssessment, err.message);
		}
	}

	/* Get Category 
	* @author Tan.Ta
	* @param {number} rowIndex
	* @returns {Promise<string>}
	* @memberof SearchPage
	*/
	public async getCategory(rowIndex: number): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting Category");
			return await this.lblCategory(rowIndex).getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getCategory, err.message);
		}
	}

}
class CreateNewSelfAssessment {
	private static _createNewSelfAssessment: CreateNewSelfAssessment = null;
	public static getInstance(): CreateNewSelfAssessment {
		this._createNewSelfAssessment = new CreateNewSelfAssessment();
		return this._createNewSelfAssessment;
	}
	
	protected evaluationFormOption = new SelectElementWrapper(by.xpath("//div[@data-label='formName']"));
	protected bntCreate = new ElementWrapper(by.xpath("//span[@class='ng-binding ng-scope']"));

	/**
		 * Delete employee using Delete icon button in "Employee" list.
		 * @returns {Promise<SearchPage>} "Employee" page
		 * @memberof SearchPage
		 */
	public async clickCreateButton(): Promise<SearchPage> {
		await Logger.write(FunctionType.UI, "Clicking Save Button on Create Employee Form");
		await this.bntCreate.click();
		return SearchPage.getInstance();
	}
	catch(err) {
		throw new errorwrapper.CustomError(this.clickCreateButton, err.message);
	}

	/**
	 * Selecting evaluation form
	 * @author Y.Le
	 * @param {string} evaluationName
	 * @returns {Promise<this>}
	 * @memberof CreateNewSelfAssessment
	 */
	public async selectEvaluationForm(evaluationName: string): Promise<this> {
		try{
			await Logger.write(FunctionType.UI,"Selecting evaluation form");
			
			await this.evaluationFormOption.selectOptionByText(evaluationName);
			return this;
		} catch(err){
			throw new errorwrapper.CustomError(this.selectEvaluationForm, err.message);
		}
	}
	
}

