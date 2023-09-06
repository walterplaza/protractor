import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class CentralPage extends NavigationBar {

    private static _centralPage: CentralPage = null;

    public static async getInstance(): Promise<CentralPage> {
        this._centralPage = new CentralPage();
        await this._centralPage.waitForPageLoad();
        await this._centralPage.dlgDashBoardUpdate.waitUntilDisappear();
        return this._centralPage;
    }

	/**
     * Check login page is displayed or not 
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof LoginPage
	 */
    public async isPageDisplayed(timeout?: number): Promise<boolean> {
        try {
            let state: boolean = false;
            if (await this.lgNice.isDisplayed() == true) {
                state = await this.lgNice.isDisplayed(timeout);
            } else {
                state = await this.btnLogout.isDisplayed(timeout);
            }
            return state;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }
}