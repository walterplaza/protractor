import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import PointOfContactPage from "@page-objects/inContact/central/routing/point-of-contact/point-of-contact";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class PointOfContactActivePage extends NavigationBar {

    private static _pointOfContactActive: PointOfContactActivePage = null;

    public static getInstance(): PointOfContactActivePage {
        this._pointOfContactActive = new PointOfContactActivePage();
        return this._pointOfContactActive;
    }

    protected btnCreateNew = new ElementWrapper(by.xpath("//div[contains(@id,'agvsPointOfContact_divCreateNew')]"));
    protected btxSearchChatProfile = new ElementWrapper(by.xpath("//input[contains(@id,'agvsPointOfContact_tbxSearchText')]"));
    protected btnSearchIcon = new ElementWrapper(by.xpath("//input[contains(@id,'agvsPointOfContact_btnSearch')]"));
    protected loadingIcon = new ElementWrapper(by.xpath("//div[@id='Spinner_msgPanelLoading']"));

    // Dynamic controls
    protected lblPointOfContactItem(name: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//td[text()='${name}']`));
    }

    /**
     * Searching point of contact
     * @param {string} keyWord 
     * @returns {Promise<this>} 
     * @memberof PointOfContactActivePage
     */
    public async searchPointOfContact(keyWord: string): Promise<this> {
        try {
            Logger.write(FunctionType.UI, "Searching point of contact");
            await this.btxSearchChatProfile.type(keyWord);
            await this.btnSearchIcon.click();
            await this.loadingIcon.waitUntilDisappear();
            return await this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchPointOfContact, err.message);
        }
    }
    /**
     * Going to a specific point of contact
     * @param {string} name 
     * @returns {Promise<PointOfContactPage>} 
     * @memberof PointOfContactActivePage
     */
    public async gotoSpecificPointOfContact(name: string): Promise<PointOfContactPage> {
        try {
            Logger.write(FunctionType.UI, "Going to a specific point of contact");
            await this.lblPointOfContactItem(name).click();
            await this.btnCreateNew.waitUntilDisappear();
            return await PointOfContactPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoSpecificPointOfContact, err.message);
        }
    }


}