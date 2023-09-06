import { FunctionType, Logger } from '@utilities/general/logger';
import { Key, by } from "protractor";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import StationDetailsPage from './station-details-page';

export default class StationsPage extends NavigationBar {
    private static _StationsPage: StationsPage = null;

    protected btnCreateNew = new ElementWrapper(by.xpath("//li[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsStations_panelCreateButton']"));
    protected txtSearch = new ElementWrapper(by.xpath("//input[contains(@name,'User$tbxSearch')]"));

    // Dynamic controls    
    protected cellName(cellName: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//table[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsStations_gridView')]//td[text()='${cellName}']`)));
    }    

    public static getInstance(): StationsPage {
        this._StationsPage = new StationsPage();
        return this._StationsPage;
    }

	/**
     * Check Stations page is displayed or not 
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof StationsPage
	 */
    public async isPageDisplayed(): Promise<boolean> {
        try {
            return await this.txtSearch.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Search station in Stations page
	 * @returns {Promise<StationsPage>} return a page object StationsPage
	 * @memberof StationsPage
	 */
    public async searchStation(stationName: string): Promise<StationsPage> {
        try {
            await Logger.write(FunctionType.UI, `Searching station '${stationName}'`);
            await this.txtSearch.type(stationName);
            await this.txtSearch.pressButton(Key.ENTER);
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchStation, err.message);
        }
    }

    /**
     * Select station on Statins page
	 * @returns {Promise<StationDetailsPage>} return a page object StationDetailsPage
	 * @memberof StationsPage
	 */
    public async selectStation(stationName: string): Promise<StationDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting station '${stationName}'`);
            await this.cellName(stationName).click();
            return await StationDetailsPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectStation, err.message);
        }
    }    
}
