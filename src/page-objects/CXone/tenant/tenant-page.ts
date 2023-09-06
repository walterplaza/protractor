import TopMenu from '@page-objects/CXone/general/top-menu';
import CreateTenantPage from '@page-objects/CXone/tenant/create-tenant-page';
import UpdateTenantPage from '@page-objects/CXone/tenant/update-tenant-page';
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from '@utilities/protractor-wrappers/element-wrapper';
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class TenantPage extends TopMenu {

    private static _tenantPage: TenantPage = null;

    protected btnNewTenant = new ElementWrapper(by.xpath("//button[@class='btn btn-primary create-tenant-button ng-binding']"));
    protected btnFindTenant = new ElementWrapper(by.xpath("//i[@class='glyphicon glyphicon-search search-icon']"));
    protected txtTenant = new ElementWrapper(by.xpath("//input[@ng-model='$parent.searchCriteria']"));
    protected lstTenant = new ElementWrapper(by.xpath("//div[@class='tenant-management-list-grid nice-grid-directive']"));
    protected lnkTenants = new ElementWrapper(by.xpath("//a[@id='tenants']"));
    protected lnkEmployees = new ElementWrapper(by.xpath("//a[@id='tmUsers']"));
    protected icoActive = new ElementWrapper(by.xpath("(//div[@class='overflow-tooltip-wrapper ng-isolate-scope']//div[@class='status-text ng-scope'])[1]"));
    protected tblBody = new ElementWrapper(by.xpath("//div[@class='ag-body-container']"))

    //Dynamic controls
    protected lblSearchTenantValue(tenantName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@col-id='tenantName']//div[text()='${tenantName}']`));
    }

    protected lblTenant(tenantName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[text()='${tenantName}']`));
    }

    constructor() { super() }

    public static async getInstance(): Promise<TenantPage> {
        // this._tenantPage = (this._tenantPage == null) ? new TenantPage() : this._tenantPage;
        this._tenantPage = new TenantPage();
        await this._tenantPage.waitForPageLoad();
        return this._tenantPage;
    }

    /**
     * Create tenant by clicking "New Tenant" button 
     * @returns {Promise<CreateTenantPage>} Create Tenant Page
     * @memberof TenantPage
     */
    public async openCreateTenantPage(): Promise<CreateTenantPage> {
        try {
            await Logger.write(FunctionType.UI, "Opening Create Tenant page");
            await this.btnNewTenant.click();
            await this.waitForSpinner();
            return CreateTenantPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.openCreateTenantPage, err.message);
        }
    }

    /**
     * Search and select tenant 
     * @param {string} tenantName Name of tenant
     * @returns {Promise<UpdateTenantPage>} Update Tenant Page
     * @memberof TenantPage
     */
    public async selectTenant(tenantName: string): Promise<UpdateTenantPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting '${tenantName}' tenant in the list`);
            await this.tblBody.wait();
            await this.txtTenant.type(tenantName);
            await this.tblBody.waitUntilCssValueNotChange("height");
            await this.lblTenant(tenantName).waitForVisibilityOf();
            await this.lblTenant(tenantName).waitForControlStable();
            await this.lblTenant(tenantName).click();
            await this.waitForSpinner();
            return UpdateTenantPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectTenant, err.message);
        }
    }

    /**
     * Check tenant page is displayed or not
     * @returns {Promise<boolean>} the existence of tenant page
     * @memberof TenantPage
     */
    public async isPageDisplayed(): Promise<boolean> {
        try {
            return await this.btnNewTenant.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Check new tenant is displayed or not
     * @param {string} tenantName Name of tenant
     * @returns {Promise<boolean>} the existence of new tenant
     * @memberof TenantPage
     */
    public async isNewTenantDisplayed(tenantName: string, timeOut?: number): Promise<boolean> {
        try {
            await this.txtTenant.click();
            await this.txtTenant.type(tenantName);
            await this.lblSearchTenantValue(tenantName).waitForPresenceOf();
            return await this.lblSearchTenantValue(tenantName).isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isNewTenantDisplayed, err.message);
        }
    }
}
