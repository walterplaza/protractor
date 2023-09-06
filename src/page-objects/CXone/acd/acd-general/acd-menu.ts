import TopMenu from "@page-objects/CXone/general/top-menu";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { by } from "protractor";
import BusinessUnitDetailsPage from "@page-objects/CXone/acd/acd-configuration/business-unit-details-page";
import { Logger, FunctionType } from "@utilities/general/logger";
import TestRunInfo from "@data-objects/general/test-run-info";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class ACDMenu extends TopMenu {
    private static _ACDMenu: ACDMenu = null;

    protected rowACDSetting = new ElementWrapper(by.xpath("//li[@class='menu-items-wrapper ng-scope']/a[@id='acdSettings-sub-menu-header']"));
    protected rowAgentSupport = new ElementWrapper(by.xpath("//li[@class='menu-items-wrapper ng-scope']/a[@id='AgentMessageList']"));
    protected rowACDConfigurationOpen = new ElementWrapper(by.xpath("//li[@id='acdConfiguration-wrapper'][contains(@class,'menu-open')]/a[@id='acdConfiguration-sub-menu-header']"));
    protected rowACDConfiguration = new ElementWrapper(by.xpath("//li[@id='acdConfiguration-wrapper']/a[@id='acdConfiguration-sub-menu-header']"));
    protected rowACDSupport = new ElementWrapper(by.xpath("//li[@class='menu-items-wrapper ng-scope']/a[@id='support-sub-menu-header']"));
    protected rowACDRetention = new ElementWrapper(by.xpath("//li[@class='menu-items-wrapper ng-scope']/a[@id='retention-sub-menu-header']"))
    protected businessUnitLink = new ElementWrapper(by.xpath("//li[@class='menu-items-wrapper ng-scope menu-open'][@id='acdConfiguration-wrapper']//a[@id='Details-link']"));
    protected dbConnectorsLinks = new ElementWrapper(by.xpath("//ul[@id='acdConfiguration-sub-menu-items']//a[@id='ManageGroup-link']"))
    public static getInstance(): ACDMenu {
        this._ACDMenu = new ACDMenu();
        return this._ACDMenu;
    }

    /**
     * Going to Business Unit Page
     * @author Y.Le
     * @returns {Promise<BusinessUnitDetailsPage>}
     * @memberof ACDMenu
     */
    public async gotoBusinessUnitPage(): Promise<BusinessUnitDetailsPage>{
        try{
            await Logger.write(FunctionType.UI, "Going to Business Unit Page");
            if ( await this.businessUnitLink.isDisplayed(TestRunInfo.middleTimeout)){
                await this.businessUnitLink.click();
            } else {
                await this.rowACDConfiguration.click();
                await this.businessUnitLink.wait();
                await this.businessUnitLink.click();
            }
            return BusinessUnitDetailsPage.getInstance();
        } catch( err){
            throw new errorwrapper.CustomError(this.gotoBusinessUnitPage, err.message);
        }
    }
}