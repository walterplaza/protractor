import { Browser } from "@data-objects/general/platform";
import TestRunInfo from "@data-objects/general/test-run-info";
import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";
import { ILocation } from "selenium-webdriver";

export default class Dashboards extends NavigationBar {

    private static _dashboards: Dashboards = null;

    public static async getInstance(): Promise<Dashboards> {
        this._dashboards = new Dashboards();
        await this._dashboards.waitForPageLoad();
        return this._dashboards;
    }

    protected pnlDashboardContent = new ElementWrapper(by.xpath("//div[@id='ctl00_pageContentDiv'][.//div[@id='dashboardUpdateDiv']]"));
    protected btnCreateNew = new ElementWrapper(by.xpath("//input[@id='createNew']"));
    protected pnlDashboard = new ElementWrapper(by.xpath("//div[@class='dashViewLeftDiv show showdashViewLeftDiv']"));
    protected pnlNewAgentCountWidget = new ElementWrapper(by.xpath("//div[contains(@id,'newDashboardWidget')][.//label[text()='Agent Count By State']]"));
    protected pnlAgentCountWidget = new ElementWrapper(by.xpath("//div[contains(@id,'dashboardWidget')][@widgettype='agentCountByState']"));
    protected txtDashboardsName = new ElementWrapper(by.xpath("//input[@id='dashboardName']"));
    protected btnSave = new ElementWrapper(by.xpath("//input[@id='saveBtn']"));
    protected btnEdit = new ElementWrapper(by.xpath("//input[@id='editBtn']"));
    protected btnDelete = new ElementWrapper(by.xpath("//input[@id='deleteBtn']"));
    protected pnlDashboardsComponent = new ElementWrapper(by.xpath("//div[@id='componentTab']"));
    protected dlgConfirmDelete = new ElementWrapper(by.xpath("//div[contains(@class,'showMessageDialogbox')][./div[contains(@class,'delete_Confirmaton_Dialog')]]"));
    protected btnConfirmYes = new ElementWrapper(by.xpath("//div[contains(@class,'showMessageDialogbox')]//span[text()='Yes']"));
    protected btnConfirmNo = new ElementWrapper(by.xpath("//div[contains(@class,'showMessageDialogbox')]//span[text()='No']"));
    protected pnlDashboardsContainer = new ElementWrapper(by.xpath("//div[@id='dashboardContainer']"));
    protected icoAgentCountWidget = new ElementWrapper(by.xpath("//div[@class='realTimeWidget']//div[@class='widgetLeftImg widgetAgentCountByState']"));
    protected imgGearIcon = new ElementWrapper(by.xpath("//div[@class='widgetHeader realtimewidgetHeader']//img[@title='Component Editor']"));
    protected lstItemAvailable = new SelectElementWrapper(by.xpath("//div[@class='reportproperties tabProperties ui-tabs-panel ui-widget-content ui-corner-bottom'][contains(@style,'display: block')]//select[@class='availableDiv']"));
    protected lstAvailable = new SelectElementWrapper(by.xpath("//div[@class='reportproperties tabProperties ui-tabs-panel ui-widget-content ui-corner-bottom'][contains(@style,'display: block')]//select[@class='availableDiv']"));
    protected btnMoveRight = new ElementWrapper(by.xpath("//div[@class='reportproperties tabProperties ui-tabs-panel ui-widget-content ui-corner-bottom'][contains(@style,'display: block')]//input[@id='moveRight']"));
    protected btnApply = new ElementWrapper(by.xpath("//div[@class='buttonDiv applybtn-position']/input[@value='Apply']"));
    protected lstItemSelect = new SelectElementWrapper(by.xpath("//div[@class='reportproperties tabProperties ui-tabs-panel ui-widget-content ui-corner-bottom'][contains(@style,'display: block')]//select[@class='selectedDiv']"));
    protected btnCancel = new ElementWrapper(by.xpath("//div[@class='buttonDiv applybtn-position']/input[@value='Cancel']"));
    protected lstDashboard = new SelectElementWrapper(by.xpath("//div[@class='dashViewDiv']//select[@id='dashboardUserViewList']"));
    protected lnkRealTimeTab = new ElementWrapper(by.xpath("//div[@class='dashViewLeftDiv show showdashViewLeftDiv']//li[@aria-selected='true']/a[@title='Real-Time']"));
    protected divPropertiesDialog = new ElementWrapper(by.xpath("//div[contains(@aria-describedby,'properties_dialog') and contains(@style,'display: block')]"));

    // Dynamic controls
    protected divWidget(widgetName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@id='widgetsRealTime']//div[.//label[text()='${widgetName}']]//div`));
    }
    protected lstComponentEditorTab(tabName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='historical_StatsTabDiv ui-tabs ui-widget ui-widget-content ui-corner-all']//li[.//a[text()='${tabName}']]`));
    }
    protected lblWidgetInDashboard(widgetName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@id='dashboardContainer']//label[@class='titleNode'][text()='${widgetName}']`));
    }

    /**
    * Is dashboards displayed?
    * @returns {Promise<boolean>}
    * @memberof Dashboards
    */
    public async isDisplayed(): Promise<boolean> {
        try {
            return await this.pnlDashboardContent.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDisplayed, err.message);
        }
    }

    /**
    * Clicking on create new button
    * @returns {Promise<void>}
    * @memberof Dashboards
    */
    public async clickCreateNewButton(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on 'Create New' button`);
            await this.waitForSpinnerComponentDisappear();
            await this.btnCreateNew.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickCreateNewButton, err.message);
        }
    }

    /**
    * Is dashboards panel displayed?
    * @returns {Promise<boolean>}
    * @memberof Dashboards
    */
    public async isDashboardsPanelDisplayed(): Promise<boolean> {
        try {
            return await this.pnlDashboard.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDashboardsPanelDisplayed, err.message);
        }
    }

    /**
    * is Agent Count by State widget displayed?
    * @returns {Promise<boolean>}
    * @memberof Dashboards
    */
    public async isNewAgentCountWidgetDisplayed(): Promise<boolean> {
        try {
            return await this.pnlNewAgentCountWidget.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isNewAgentCountWidgetDisplayed, err.message);
        }
    }

    /**
     * is Agent Count by State widget displayed?
     * @author Phat.Ngo
     * @param {number} [timeoutInSecond] Time to wait for element before checking
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof Dashboards
     */
    public async isAgentCountWidgetDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.pnlAgentCountWidget.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAgentCountWidgetDisplayed, err.message);
        }
    }

    /**
    * Enter Dashboards Name
    * @returns {Promise<void>}
    * @memberof Dashboards
    */
    public async enterDashboardsName(name: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Entering dashboards name`);
            await this.txtDashboardsName.type(name);
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterDashboardsName, err.message);
        }
    }
    /**
    * Get Dashboards Name
    * @returns {Promise<string>}
    * @memberof Dashboards
    */
    public async getDashboardsName(): Promise<string> {
        try {
            return await this.txtDashboardsName.getControlValue();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDashboardsName, err.message);
        }
    }

    /**
    * Clicking on Save button
    * @returns {Promise<void>}
    * @memberof Dashboards
    */
    public async clickSaveButton(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on 'Save' button`);
            await this.btnSave.scrollToElement();
            await this.btnSave.click();
            await this.btnSave.waitUntilDisappear();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickSaveButton, err.message);
        }
    }

    /**
    * Clicking on Edit button
    * @returns {Promise<void>}
    * @memberof Dashboards
    */
    public async clickEditButton(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on 'Edit' button`);
            await this.btnEdit.click();
            await this.btnEdit.waitUntilDisappear();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickEditButton, err.message);
        }
    }

    /**
    * Clicking on Delete button
    * @returns {Promise<void>}
    * @memberof Dashboards
    */
    public async clickDeleteButton(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on 'Delete' button`);
            await this.btnDelete.click();
            await this.dlgConfirmDelete.wait();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickDeleteButton, err.message);
        }
    }

    /**
    * Clicking on Confirm Yes button
    * @returns {Promise<void>}
    * @memberof Dashboards
    */
    public async clickConfirmYesButton(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on confirm 'Yes' button`);
            await this.btnConfirmYes.click();
            await this.waitForDashboardUpdated();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickConfirmYesButton, err.message);
        }
    }

    /**
    * Is Dashboards on Edit Mode
    * @returns {Promise<boolean>}
    * @memberof Dashboards
    */
    public async isDashboardsOnEditMode(): Promise<boolean> {
        try {
            return await this.pnlDashboardsComponent.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDashboardsOnEditMode, err.message);
        }
    }

    /**
    * Is Confirm Delete Dialog displayed
    * @returns {Promise<boolean>}
    * @memberof Dashboards
    */
    public async isConfirmDeleteDialogDisplayed(): Promise<boolean> {
        try {
            return await this.dlgConfirmDelete.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isConfirmDeleteDialogDisplayed, err.message);
        }
    }

    /**
    * Drag and drop Agent Count by State widget
    * @returns {Promise<boolean>}
    * @memberof Dashboards
    */
    public async dragAndDropAgentCountWidget(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Dragging and dropping Agent Count by State widget`);
            let containerLocation: ILocation = await this.pnlDashboardsContainer.getLocation();
            await this.icoAgentCountWidget.dragAndDrop(containerLocation);
        } catch (err) {
            throw new errorwrapper.CustomError(this.dragAndDropAgentCountWidget, err.message);
        }
    }

    /**
    * Add widget to Dashboards
    * @returns {Promise<boolean>}
    * @memberof Dashboards
    */
    public async addWidget(widgetName: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Adding '${widgetName}' to dashboard`);
            if (TestRunInfo.browser == Browser.IE) {
                await this.divWidget(widgetName).doubleClickByScript();
            }
            else {
                await this.divWidget(widgetName).moveMouse();
                await this.divWidget(widgetName).click();
                await this.divWidget(widgetName).doubleClick();
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.addWidget, err.message);
        }
    }

    /**
    * Clicking on Gear Icon
    * @returns {Promise<void>}
    * @memberof Dashboards
    */
    public async clickGearIcon(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on 'gear icon'`);
            await this.waitForSpinnerComponentDisappear();
            await this.imgGearIcon.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickGearIcon, err.message);
        }
    }

    /**
    * Select Component Tab
    * @returns {Promise<void>}
    * @memberof Dashboards
    */
    public async selectComponentTab(tabName: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on '${tabName}'`);
            await this.waitForSpinnerComponentDisappear();
            await this.lstComponentEditorTab(tabName).click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectComponentTab, err.message);
        }
    }

    /**
    * Selecting one item in list available
    * @returns {Promise<void>}
    * @memberof Dashboards
    */
    public async selectOneItemInListAvailable(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Selecting one item in available list`);
            await this.lstItemAvailable.selectOptionByIndex(0);
            return await this.lstItemAvailable.getSelectedItem();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectOneItemInListAvailable, err.message);
        }
    }

    /**
        * Clicking on move right button
        * @returns {Promise<void>}
        * @memberof Dashboards
        */
    public async clickMoveRightButton(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on 'Move right' button`);
            await this.btnMoveRight.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickMoveRightButton, err.message);
        }
    }

    /**
   * Getting item in list available
   * @returns {Promise<void>}
   * @memberof Dashboards
   */
    public async getItemInListSelect(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting item in available list`);
            await this.lstItemSelect.selectOptionByIndex(0);
            let itemText = await this.lstItemSelect.getSelectedItem();
            return itemText.trim();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getItemInListSelect, err.message);
        }
    }

    /**
       * Clicking on apply button
       * @returns {Promise<void>}
       * @memberof Dashboards
       */
    public async clickApplyButton(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on 'Apply' button`);
            await this.btnApply.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickApplyButton, err.message);
        }
    }

    /**
       * Clicking on close component editor button
       * @returns {Promise<void>}
       * @memberof Dashboards
       */
    public async clickCancelButton(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on 'Cancel' button`);
            await this.btnCancel.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickCancelButton, err.message);
        }
    }

    /**
    * Getting dashboard selected
    * @returns {Promise<boolean>}
    * @memberof Dashboards
    */
    public async getDashboardSelected(): Promise<string> {
        try {
            await this.waitForSpinnerComponentDisappear();
            return await this.lstDashboard.getSelectedItem();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDashboardSelected, err.message);
        }
    }

    /**
    * Is widget displayed on dashboard
    * @returns {Promise<boolean>}
    * @memberof Dashboards
    */
    public async isWidgetDisplayed(widgetName: string): Promise<boolean> {
        try {
            return await this.lblWidgetInDashboard(widgetName).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isWidgetDisplayed, err.message);
        }
    }

    /**
    * Is real time tab selected?
    * @returns {Promise<boolean>}
    * @memberof Dashboards
    */
    public async isRealTimeTabSelected(): Promise<boolean> {
        try {
            return await this.lnkRealTimeTab.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRealTimeTabSelected, err.message);
        }
    }

    /**
    * Is properties dialog displayed?
    * @returns {Promise<boolean>}
    * @memberof Dashboards
    */
    public async isPropertiesDialogDisplayed(): Promise<boolean> {
        try {
            return await this.divPropertiesDialog.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPropertiesDialogDisplayed, err.message);
        }
    }

    /**
    * Is properties dialog displayed?
    * @returns {Promise<boolean>}
    * @memberof Dashboards
    */
    public async isItemSelected(itemName: string): Promise<boolean> {
        try {
            return await this.lstAvailable.getSelectedItem() == itemName;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isItemSelected, err.message);
        }
    }
}