import { CoachingPlan } from "@data-objects/CXone/coaching/coaching-plan";
import TestRunInfo from "@data-objects/general/test-run-info";
import TopMenu from "@page-objects/CXone/general/top-menu";
import CoachingPlansPage from "@page-objects/CXone/coaching/coaching-plans/coaching-plans-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by, Key } from "protractor";

export default class CoachingPlansDetailsPage extends TopMenu {

    private static _CoachingPlansDetailsPage: CoachingPlansDetailsPage = null;

    protected lblCreateCoachingPlan = new ElementWrapper(by.xpath("//div[@class='title']/div[@class='plan-name ng-binding']"));
    protected txtCoachingPlanName = new ElementWrapper(by.xpath("//input[@id='coaching-plan-text-plan-name']"));
    protected cbbCoachingPackage = new ElementWrapper(by.xpath("//input[@class='ui-select-search ui-select-toggle ng-pristine ng-untouched ng-valid ng-empty']"));
    protected btnAddEmployees = new ElementWrapper(by.xpath("//div[./div[@id='zeroItemsCountLbl']]/button[text()='Add Employees']"));
    protected btnSave = new ElementWrapper(by.xpath("//button[@id='addEntityBtn']"));
    protected btnSubmit = new ElementWrapper(by.xpath("//button[@id='coaching-plan-btn-submit']"));
    protected pnlSelectEmployees = new ElementWrapper(by.xpath("//div[./h3[.='Select Employees']]"));
    protected txtSearchEmployee = new ElementWrapper(by.xpath("//div[@class='grid-search-bar']//div[contains(@class,'search-field')]//input"));
    protected lblSelectedCoachingPackage = new ElementWrapper(by.xpath("//div[@class='ui-select-match ng-scope']"));
    protected pnlAddedEmployee = new ElementWrapper(by.xpath(`//div[@class='ag-body-container']`));
    protected tblSelectEmployee = new ElementWrapper(by.xpath("//div[contains(@class,'item-count')]//div[@id='itemsCountAvailableEntity']"))
    protected txtCoachingPlanNameDetails = new ElementWrapper(by.xpath("//input[@id='coaching-plan-text-plan-name']"));
    protected txtCoachingPlanPackageDetails = new ElementWrapper(by.xpath("//div[@id='coaching-plan-dropdown-package']"));
    protected txtCoachingPlanStartDateDetails = new ElementWrapper(by.xpath("//date-picker[@id='coaching-plan-dp-start-date']//input[@name='startDate']"));
    protected txtCoachingPlanEndDateDetails = new ElementWrapper(by.xpath("//date-picker[@id='coaching-plan-dp-end-date']//input[@name='endDate']"));

    //Dynamic control
    protected lblEmployee(employeeName: string) {
        return new ElementWrapper(by.xpath(`//div[contains(@class,'ag-row')]//span[text()='${employeeName}']`));
    }
    protected lblTestEmployee(index: number) {
        return new ElementWrapper(by.xpath(`//div[@role='row' and @row-index='${index}']//div[@col-id='employeeName']/span//span`));
    }
    protected lblCoachingPackageOption(coachingPackageName: string) {
        return new ElementWrapper(by.xpath(`//div[@role='option']/div/span[text()='${coachingPackageName}']`));
    }
    protected pnlCheckedEmployee(employeeName: string) {
        return new ElementWrapper(by.xpath(`//ol[@id='selected-entity-list']//div[text()='${employeeName}']`));
    }

    protected pnlCheckedTestEmployee(index: number) {
        return new ElementWrapper(by.xpath(`(//div[@class='user-name ng-binding'][contains(text(),'lgvn test')]/ancestor::div[@class='user-element checked'])[${index}]`));
    }

    protected lblAddedEmployeeName(index: number) {
        return new ElementWrapper(by.xpath(`//div[./div[@col-id='employeeName'] and @role='row'][${index}]`));
    }
    protected lblEmployeeName(employeeName: string) {
        return new ElementWrapper(by.xpath(`//span[text()='${employeeName}']`));
    }

    protected rowCoachingPlan(planName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='container page-container coaching-plan-details']//div[@class='plan-name ng-binding'][text()='${planName}']`));
    }


    public static getInstance(): CoachingPlansDetailsPage {
        this._CoachingPlansDetailsPage = new CoachingPlansDetailsPage();
        return this._CoachingPlansDetailsPage;
    }

    /**
     * Check if title of coaching package page displayed
     * @author Tuan.Vu
     * @returns {boolean} 
     * @memberof CoachingPlansDetailsPage
     */
    public async isPageDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblCreateCoachingPlan.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Create coaching plan
     * @author Tuan.Vu
     * @param {string} coachingPackageName name of coaching package to select in coaching plan
     * @returns {CoachingPlansDetailsPage}
     */
    public async selectCoachingPackage(coachingPackageName: string): Promise<CoachingPlansDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting Coaching Package: ${coachingPackageName}`);
            await this.cbbCoachingPackage.click();
            if (await this.lblCoachingPackageOption(coachingPackageName).isDisplayed(TestRunInfo.middleTimeout)) {
                await this.lblCoachingPackageOption(coachingPackageName).click();
                return this;
            } else {
                throw Error(`Package "${coachingPackageName}" is not available`)
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectCoachingPackage, err.message);
        }
    }

    /**
     * Create coaching plan
     * @author Tuan.Vu
     * @param {CoachingPlan} coachingPlan coaching Plan to be created
     * @returns {CoachingPlansDetailsPage}
     */
    public async createCoachingPlan(coachingPlan: CoachingPlan): Promise<CoachingPlansDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Creating New Coaching Plan: ${coachingPlan.name}`);
            await this.txtCoachingPlanName.type(coachingPlan.name);
            await this.selectCoachingPackage(coachingPlan.coachingPackage);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.createCoachingPlan, err.message);
        }
    }

    /**
     * Click on Add Employees button at Select Employees window
     * @author Tuan.Vu
     * @returns {CoachingPlansPage}
     */
    public async openSelectEmployeesWindow(): Promise<CoachingPlansDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Add Employees button");
            await this.btnAddEmployees.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.openSelectEmployeesWindow, err.message);
        }
    }

    /**
     * Click on Save button at Select Employees window
     * @author Tuan.Vu
     * @returns {CoachingPlansDetailsPage}
     */
    public async saveAddedEmployees(): Promise<CoachingPlansDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Save button");
            await this.btnSave.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.saveAddedEmployees, err.message);
        }
    }

    /**
     * Click on Submit button
     * @author Tuan.Vu
     * @returns {CoachingPlansPage}
     */
    public async submitCoachingPlan(): Promise<CoachingPlansPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Submit button");
            await this.btnSubmit.click();
            return CoachingPlansPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.submitCoachingPlan, err.message);
        }
    }

    /** 
     * Add employee to coaching plan
     * @author Tuan.Vu
     * @param {string} employeeName 
     * @returns {CoachingPlansDetailsPage}
     */
    public async addEmployee(employeeName: string): Promise<CoachingPlansDetailsPage> {
        try {
            await this.lblEmployee(employeeName).moveMouse();
            await this.lblEmployee(employeeName).click();
            return this
        } catch (err) {
            throw new errorwrapper.CustomError(this.addEmployee, err.message);
        }
    }

    /** 
     * Select employees to coaching plan
     * @author Tuan.Vu
     * @param {number} numberofEmployees number of employees to add to coaching plan
     * @param {string} employeeName optional to add a specific employee
     * @returns {CoachingPlansDetailsPage}
     */
    public async selectEmployees(numberofEmployees: number, employeeName?: string): Promise<string[]> {
        try {
            let checkArray: string[] = [];
            let tempName: string = "";
            let tempColor: string = "";
            if (employeeName != null) {
                await this.searchEmployee(employeeName);
                await this.addEmployee(employeeName);
                tempColor = await this.getCheckedEmployeePanelColor(employeeName);
                checkArray.push(`${employeeName}/${tempColor}`);
            }
            else {
                for (let i: number = 0; i < numberofEmployees; i++) {
                    await this.lblTestEmployee(i).wait();
                    await this.lblTestEmployee(i).moveMouse();
                    await this.lblTestEmployee(i).click();
                    tempName = await this.lblTestEmployee(i).getText();
                    tempColor = await this.getCheckedTestEmployeePanelColor(i);
                    checkArray.push(`${tempName}/${tempColor}`)
                }
            }
            return checkArray;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectEmployees, err.message);
        }
    }

    /** 
     * Get number of employees in Employees section
     * @author Tuan.Vu     
     * @returns {number}
     */
    public async countEmployees(): Promise<number> {
        try {
            let employeeNumber = await this.pnlAddedEmployee.getChildCountByTagName('div');
            return employeeNumber - 1;
        } catch (err) {
            throw new errorwrapper.CustomError(this.countEmployees, err.message);
        }
    }

    /** 
     * Get employees list in Employees section
     * @author Tuan.Vu
     * @param {number} index index of tested employee     
     * @returns {string}
     */
    public async getEmployeeList(): Promise<Array<string>> {
        try {
            let tempName: string = "";
            let employeeName: string[] = [];
            let total: number = await this.countEmployees();
            for (let i: number = 1; i <= total; i++) {
                tempName = await this.lblAddedEmployeeName(i).getText();
                employeeName.push(tempName);
            }
            return employeeName;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEmployeeList, err.message);
        }
    }

    /** 
     * Get employees panel color in HEX 
     * @author Tuan.Vu     
     * @param {string} employeeName employee name to add
     * @returns {CoachingPlansDetailsPage}
     */
    public async getCheckedEmployeePanelColor(employeeName: string): Promise<string> {
        try {
            let colorRGBA: string = await this.pnlCheckedEmployee(employeeName).getCssValue("background-color");
            return await Utility.convertRgbToHex(colorRGBA);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCheckedEmployeePanelColor, err.message);
        }
    }

    /** 
     * Get checked test employees panel color in HEX 
     * @author Tuan.Vu
     * @param {number} index index of tested employee     
     * @returns {string}
     */
    public async getCheckedTestEmployeePanelColor(index: number): Promise<string> {
        try {
            let colorRGBA: string = await this.pnlCheckedTestEmployee(index).getCssValue("background-color");
            return Utility.convertRgbToHex(colorRGBA);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCheckedTestEmployeePanelColor, err.message);
        }
    }

    /** 
     * Check if checked empplyee square changed to green
     * @author Tuan.Vu     
     * @param {string} employeeName employee name to check
     * @returns {boolean}
     */
    public async isCheckedEmployeePanelColorGreen(checkData: string[]): Promise<boolean> {
        try {
            let colorCode: string[] = [];
            for (let i: number = 0; i < checkData.length; i++) {
                colorCode = checkData[i].split("/");
                if (colorCode[1] != "#649015") {
                    return false;
                }
            }
            return true;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCheckedEmployeePanelColorGreen, err.message);
        }
    }

    /** 
     * Check if added empplyee listed in Employees section
     * @author Tuan.Vu     
     * @param {string} employeeName employee name to check
     * @returns {boolean}
     */
    public async isAddedEmployeesListed(checkData: string[]): Promise<boolean> {
        try {
            let employeeName: string = "";
            for (let i: number = 0; i < checkData.length; i++) {
                employeeName = checkData[i].split("/")[0];
                if (!await this.lblEmployeeName(employeeName).isDisplayed(TestRunInfo.shortTimeout)) {
                    return false;
                }
            }
            return true;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAddedEmployeesListed, err.message);
        }
    }

    /** 
     * Check if Select Employees window displayed
     * @author Tuan.Vu     
     * @param {string} employeeName employee name to check
     * @returns {boolean}
     */
    public async isSelectEmployeeWindowDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.pnlSelectEmployees.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSelectEmployeeWindowDisplayed, err.message);
        }
    }

    /** 
    * Search Employees
    * @author Nhat.Nguyen    
    * @param {string} employeeName employee name to search
    * @returns {void}
    */
    public async searchEmployee(employeeName: string): Promise<void> {
        try {
            await this.txtSearchEmployee.wait;
            await this.txtSearchEmployee.type(employeeName);
            await this.txtSearchEmployee.sendKeys(Key.ENTER);
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchEmployee, err.message);
        }
    }

    /**
     * Check coaching plan is displayed
     * @author Y.Le
     * @param {string} planName
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof CoachingPlansDetailsPage
     */
    public async isCoachingPlanDisplayed(planName: string, timeOut?: number): Promise<boolean> {
        try {
            return await this.rowCoachingPlan(planName).isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCoachingPlanDisplayed, err.message);
        }
    }

    /**
     * Getting entered coaching plan name
     * @author Y.Le
     * @returns {Promise<string>}
     * @memberof CoachingPlansDetailsPage
     */
    public async getEnteredCoachingPlanName(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting entered coaching plan name");
            return <string>await BrowserWrapper.executeScript("return document.getElementById('coaching-plan-text-plan-name').value;");
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEnteredCoachingPlanName, err.message);
        }
    }

    /**
     * Getting selected coaching package
     * @author Y.Le
     * @returns {Promise<string>}
     * @memberof CoachingPlansDetailsPage
     */
    public async getSelectedCoachingPackage(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting selected coaching package");
            return await this.lblSelectedCoachingPackage.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSelectedCoachingPackage, err.message);
        }
    }

    /**
     * Waiting for Select Employee pop up open
     * @author Y.Le
     * @returns {Promise<void>}
     * @memberof CoachingPlansDetailsPage
     */
    public async waitForSelectEmployeePopupOpen(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Waiting for Select Employee pop up open");
            await this.tblSelectEmployee.waitUntilPropertyChange('text', TestRunInfo.middleTimeout);
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForSelectEmployeePopupOpen, err.message);
        }
    }

    /**
     * Create general coaching plan
     * @author Phat Truong
     * @returns {Promise<CoachingPlansPage>}
     * @memberof CoachingPlansDetailsPage
     */
    public async createGeneralCoachingPlan(coachingPlan: CoachingPlan, employeeName: string): Promise<CoachingPlansPage> {
        try {
            await this.createCoachingPlan(coachingPlan);
            await this.openSelectEmployeesWindow();
            await this.selectEmployees(1, employeeName);
            await this.saveAddedEmployees();
            await this.submitCoachingPlan();
            return await CoachingPlansPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.createGeneralCoachingPlan, err.message);
        }
    }

    /**
     * is Plan end date editable
     * @author Phat.Truong
     * @returns  {Promise<boolean>} editable or not
     * @memberof CoachingPlansPage
     */
    public async isPlanEndDateEditable(): Promise<boolean> {
        try {
            if (await this.txtCoachingPlanEndDateDetails.getAttribute('ng-disabled') == "isDisabled") {
                return true
            }
            return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPlanEndDateEditable, err.message);
        }
    }

    /**
     * is Plan start date editable
     * @author Phat.Truong
     * @returns  {Promise<boolean>} editable or not
     * @memberof CoachingPlansPage
     */
    public async isPlanStartDateEditable(): Promise<boolean> {
        try {
            if (await this.txtCoachingPlanStartDateDetails.getAttribute('ng-disabled') == "isDisabled") {
                return true
            }
            return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPlanStartDateEditable, err.message);
        }
    }

    /**
    * is Plan name editable
    * @author Phat.Truong
    * @returns  {Promise<boolean>} editable or not
    * @memberof CoachingPlansPage
    */
    public async isPlanNameEditable(): Promise<boolean> {
        try {
            if (await this.txtCoachingPlanNameDetails.getAttribute('disabled')) {
                return true
            }
            return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPlanNameEditable, err.message);
        }
    }

    /**
    * is Plan Package editable
    * @author Phat.Truong
    * @returns  {Promise<boolean>} editable or not
    * @memberof CoachingPlansPage
    */
    public async isPlanPackageEditable(): Promise<boolean> {
        try {
            if (await this.txtCoachingPlanPackageDetails.getAttribute('disabled')) {
                return true
            }
            return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPlanPackageEditable, err.message);
        }
    }


}