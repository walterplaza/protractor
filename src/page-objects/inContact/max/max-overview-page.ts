import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
export default class MaxOverviewPage {
    private static _maxOverviewPage: MaxOverviewPage = null;

    protected lblLogo = new ElementWrapper(by.xpath("//a[@class = 'logo']"));
    protected txtSearch = new ElementWrapper(by.xpath("//input[@class = 'search-field needs-pie']"));

    public static async getInstance(): Promise<MaxOverviewPage> {
        this._maxOverviewPage = new MaxOverviewPage();
        return this._maxOverviewPage;
    }

    /**
	 * Check InContact Logo is displayed or not
	 * @returns {Promise<boolean>} the existence of InContact Logo
	 * @memberof MaxOverviewPage
	 */
    public async isIncontactLogoDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return this.lblLogo.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isIncontactLogoDisplayed, err.message);
        }
    }
}