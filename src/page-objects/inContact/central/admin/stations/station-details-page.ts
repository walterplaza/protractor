import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by, Key } from "protractor";

export default class StationDetailsPage extends NavigationBar {

    private static _StationDetailsPage: StationDetailsPage = null;

    protected btnCreateNew = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_btnCreateNew_ShadowButton']"));
    protected btnDeativate = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcStation_tpnlStationDetails_btnStatusChange_ShadowButton']"));
    protected btnActivate = new ElementWrapper(by.xpath("ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcStation_tpnlStationDetails_btnStatusChange_ShadowButton']"));
    protected btnEdit = new ElementWrapper(by.xpath("ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcStation_tpnlStationDetails_btnEditDetails_ShadowButton']"));
    protected btnDone = new ElementWrapper(by.xpath("ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcStation_tpnlStationDetails_btnSaveDetails_ShadowButton']"));
    protected btnDiscardChanges = new ElementWrapper(by.xpath("ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcStation_tpnlStationDetails_lbCancelDetails_ShadowButton"));
    protected lblDetailsTab = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcStation_tpnlStationDetails_tab']"));
    protected tabLoginHistory = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcStation_tpnlStationLoginHistory_tab']"));
    protected lblNotesTab = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcStation_tpnlNotes_tab']"));
    protected lblAuditHistoryTab = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcStation_tpnlAuditHistory_tab']"));    
    protected txtLoginHistorySearch = new ElementWrapper(by.xpath("//input[contains(@name,'StationLoginHistory$tbSearchCriteria')]"));
    
    // Dynamic controls    
    protected cellLoginHistory(stationName: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcStation_tpnlStationLoginHistory_ctrlStationLoginHistory_gvStationLoginHistory']//td[text()='${stationName}']`)));
    }
    protected cellPartialLoginHistory(partialValue: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcStation_tpnlStationLoginHistory_ctrlStationLoginHistory_gvStationLoginHistory']//td[contains(text(),'${partialValue}')]`)));
    }

    public static getInstance(): StationDetailsPage {
        this._StationDetailsPage = new StationDetailsPage();
        return this._StationDetailsPage;
    }

	/**
     * Check Station Details page is displayed or not 
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof StationDetailsPage
	 */
    public async isPageDisplayed(): Promise<boolean> {
        try {
            return await this.btnCreateNew.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }
        
    /**
     * Select History Login tab on StationDetailsPage
     * @author W.Plaza
     * @returns {Promise<StationDetailsPage>}
     * @memberof StationDetailsPage
     */
    public async selectLoginHistoryTab(): Promise<StationDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting Login History tab on Station Details Page`);
            await this.tabLoginHistory.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectLoginHistoryTab, err.message);
        }
    } 
    
    /**
     * Is a value logged in stationDetailsPage
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof UserDetailsPage
	 */
    public async isLoginHistoryValueLogged(logValue: string): Promise<boolean> {
        try {
            await Logger.write(FunctionType.UI, `validating if '${logValue}' is logged on Station Details Page`);
            return this.cellLoginHistory(logValue).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLoginHistoryValueLogged, err.message);
        }
    }

    /**
     * Is today value logged in stationDetailsPage
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof UserDetailsPage
	 */
    public async isTodayLoginHistoryValueLogged(logValue: string): Promise<boolean> {
        try {
            await Logger.write(FunctionType.UI, `validating if '${logValue}' is logged on Station Details Page`);
            return this.cellPartialLoginHistory(logValue).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTodayLoginHistoryValueLogged, err.message);
        }
    }

    /**
     * Search for a value on the Station Details Login History page
     * @author W.Plaza
	 * @returns {Promise<StationDetailsPage>}
	 * @memberof StationDetailsPage
	 */
    public async searchLoginHistory(value: string): Promise<StationDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Searching on StationDetailsPage page for: '${value}'`);
            await this.txtLoginHistorySearch.type(value);
            await this.txtLoginHistorySearch.pressButton(Key.ENTER);
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchLoginHistory, err.message);
        }
    }
}