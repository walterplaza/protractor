import { CoachingPackage, DragElement, Duration } from "@data-objects/CXone/coaching/coaching-package";
import TestRunInfo from "@data-objects/general/test-run-info";
import TopMenu from "@page-objects/CXone/general/top-menu";
import CoachingPackagePage from "@page-objects/CXone/coaching/coaching-package/coaching-package-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";
import { ILocation, ISize } from "selenium-webdriver";
import CentralPage from "@page-objects/inContact/central/general/central-page";

export default class CoachingPackageDesigner extends TopMenu {

    private static _CoachingPackageDesigner: CoachingPackageDesigner = null;

    protected lblCoachingPackageDesigner = new ElementWrapper(by.xpath("//h1[@id='form-designer-page-title']"));
    protected btnCPSave = new ElementWrapper(by.xpath("//button[@id='form-designer-save-btn']"));
    protected btnCPNameSave = new ElementWrapper(by.xpath("//button[@id='save']"));
    protected btnCPSaveAndActivate = new ElementWrapper(by.xpath("//button[@id='form-designer-publish-btn']"));
    protected txtName = new ElementWrapper(by.xpath("//input[@id='form-designer-save-form-name']"));
    protected txtSubTitle = new ElementWrapper(by.xpath("//input[@id='form-designer-name-form-title']"));
    protected cbbDuration = new SelectElementWrapper(by.xpath("//div[@id='form-desinger-duration-drp-dwn']"));
    protected pnlElementArea = new ElementWrapper(by.xpath("//div[@class='full-page flex-container f-hori ng-scope']"));
    protected txtElementTitle = new ElementWrapper(by.xpath(`//textarea[@id='form-designer-name-question']`));
    protected popSaveCoachingPackage = new ElementWrapper(by.xpath("//h3[text()='Save Coaching Package']/ancestor::div[@class='modal-content']"));

    //Dynamic controls

    protected divDragElement(element: DragElement): ElementWrapper {
        return new ElementWrapper(by.xpath(`//li[contains(@id,'form-designer-components-${element}')]//div[@class='element-box-title ng-binding']`));
    }

    protected divDropElement(index: number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[contains(@class,'form-element-div ng-scope')][${index + 1}]`))
    }

    protected divHoveredDragElement(element: DragElement): ElementWrapper {
        return new ElementWrapper(by.xpath(`//li[contains(@id,'form-designer-components-${element}')]//div[@class='tooltip ng-scope ng-isolate-scope right customTooltip fade in']`));
    }

    protected divElementTitle(index: number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[contains(@class,'form-element-div ng-scope')][${index + 1}]//div[@class='fr-element fr-view']`))
    }

    public static getInstance(): CoachingPackageDesigner {
        this._CoachingPackageDesigner = new CoachingPackageDesigner();
        return this._CoachingPackageDesigner;
    }

    /**
     * Check if title of coaching package designer page displayed
     * @returns {Promise<boolean>}
     * @memberof CoachingPackageDesigner
     */
    public async isPageDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblCoachingPackageDesigner.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Enter Coaching Package Sub Title
     * @author Tuan.Vu
     * @param {string} subTitle
     * @returns {Promise<CoachingPackageDesigner>}
     * @memberof CoachingPackageDesigner
     */
    public async enterSubTitle(subTitle: string): Promise<CoachingPackageDesigner> {
        try {
            await Logger.write(FunctionType.UI, "Entering Coaching Package Sub Title");
            await this.txtSubTitle.type(subTitle + Utility.createRandomString(15));
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterSubTitle, err.message);
        }
    }

    /**
     * Enter Coaching Package name
     * @author Tuan.Vu
     * @param {string} name
     * @returns {Promise<CoachingPackageDesigner>}
     * @memberof CoachingPackageDesigner
     */
    public async enterTitle(name: string): Promise<CoachingPackageDesigner> {
        try {
            await Logger.write(FunctionType.UI, "Entering Coaching Package name");
            await this.txtName.type((name));
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterTitle, err.message);
        }
    }

    /**
     * Select duration
     * @author Tuan.Vu
     * @param {Duration} duration
     * @returns {Promise<CoachingPackageDesigner>}
     * @memberof CoachingPackageDesigner
     */
    public async selectDuration(duration: Duration): Promise<CoachingPackageDesigner> {
        try {
            await Logger.write(FunctionType.UI, "Selecting duration");
            await this.cbbDuration.selectOptionByText(duration);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectDuration, err.message);
        }
    }

    /**
     * Drag Elements and give them names
     * @author Tuan.Vu
     * @param {DragElement[]} elementItems
     * @returns {Promise<CoachingPackageDesigner>}
     * @memberof CoachingPackageDesigner
     */
    public async dragElements(elementItems: DragElement[]): Promise<CoachingPackageDesigner> {
        try {
            await Logger.write(FunctionType.UI, "Adding Elements and give them names");
            let elementsContainerLocation: ILocation = await this.pnlElementArea.getLocation();
            let size: ISize = await this.pnlElementArea.getSize()
            elementsContainerLocation.x = (Math.floor(elementsContainerLocation.x - size.height / 2)) - 15;
            elementsContainerLocation.y = (Math.floor(elementsContainerLocation.y - size.width / 2)) - 15;
            for (let i = 0; i < elementItems.length; i++) {

                while (await this.divDropElement(i).isDisplayed(TestRunInfo.shortTimeout) == false) {
                    await this.divDragElement(elementItems[i]).moveMouse();
                    await this.divHoveredDragElement(elementItems[i]).wait();
                    await this.divDragElement(elementItems[i]).dragAndDrop(elementsContainerLocation);
                    await this.divDropElement(i).waitForVisibilityOf(TestRunInfo.shortTimeout);
                }
                if (await this.divElementTitle(i).isDisplayed(TestRunInfo.shortTimeout)) {
                    await BrowserWrapper.executeScript(`document.getElementsByClassName("fr-element fr-view")[0].innerHTML="<p><strong><span>QATest_${elementItems[i]}</span></strong></p>"`);
                } else if (await this.txtElementTitle.isDisplayed(TestRunInfo.shortTimeout)) {
                    await this.txtElementTitle.type(`QATest_${elementItems[i]}`);
                }

            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.dragElements, err.message);
        }
    }

    /**
    * Clicking on Save button
    * @author Tuan.Vu
    * @returns {Promise<CoachingPackageDesigner>}
    * @memberof CoachingPackageDesigner
    */
    public async saveCoachingPackage(): Promise<CoachingPackageDesigner> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Save button");
            await this.btnCPSave.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.saveCoachingPackage, err.message);
        }
    }

    /**
     * Clicking on Save and Activate button
     * @author Tuan.Vu
     * @returns {Promise<CoachingPackageDesigner>}
     * @memberof CoachingPackageDesigner
     */
    public async saveAndActivateCoachingPackage(): Promise<CoachingPackagePage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Save and Activate button");
            await this.btnCPSaveAndActivate.click();
            return CoachingPackagePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.saveAndActivateCoachingPackage, err.message);
        }
    }

    /**
     * Selecting Coaching Package name
     * @author Tuan.Vu
     * @param {string} coachingPackageName
     * @returns {Promise<CoachingPackageDesigner>}
     * @memberof CoachingPackageDesigner
     */
    public async selectCoachingPackageName(coachingPackageName: string): Promise<CoachingPackageDesigner> {
        try {
            await Logger.write(FunctionType.UI, "Selecting Coaching Package name");
            await this.txtName.type(coachingPackageName);
            await this.btnCPNameSave.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectCoachingPackageName, err.message);
        }
    }

    /**
     * Create Coaching Package created
     * @author Tuan.Vu
     * @param {CoachingPackage} coachingPackage
     * @returns {Promise<any>}
     * @memberof CoachingPackageDesigner
     */
    public async createCoachingPackage(coachingPackage: CoachingPackage): Promise<CoachingPackageDesigner> {
        try {
            await Logger.write(FunctionType.UI, `Creating coaching package ${coachingPackage.name}`);
            await this.enterSubTitle(coachingPackage.subTitle);
            await this.selectDuration(coachingPackage.duration);
            await this.dragElements(coachingPackage.elements);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.createCoachingPackage, err.message);
        }
    }

    /**
     * Check if Save window displayed
     * @author Tuan.Vu
     * @returns {Promise<boolean>}
     * @memberof CoachingPackageDesigner
     */
    public async isSaveWindowDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.popSaveCoachingPackage.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSaveWindowDisplayed, err.message);
        }
    }

/**
     * Create an coaching package data 
     * @author Phat.Truong
     * @returns {Promise<boolean>}
     * @memberof CoachingPackageDesigner
     */
    public async createACoachingPackage(coachingPackage: CoachingPackage): Promise<CoachingPackageDesigner> {
        try {         
            await this.createCoachingPackage(coachingPackage);
            await this.saveCoachingPackage();
            await this.selectCoachingPackageName(coachingPackage.name);
            await this.saveAndActivateCoachingPackage();
            return this;            
        } catch (err) {
            throw new errorwrapper.CustomError(this.createACoachingPackage, err.message);
        }
    }





}