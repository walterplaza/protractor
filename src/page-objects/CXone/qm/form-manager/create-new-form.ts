import FormManagerPage from "@page-objects/CXone/qm/form-manager/form-manager-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import { ILocation, ISize } from "selenium-webdriver";
import QMMenu from "@page-objects/CXone/qm/qm-general/qm-menu";

export default class CreateNewForm extends QMMenu {

    protected formAreaDesign = new ElementWrapper(by.xpath("//div[@id='form-area-designer-mode']//div[@id='formArea']"));
    protected btnSaveAndActive = new ElementWrapper(by.xpath("//button[@id='form-designer-publish-btn']"));
    protected txtFormName = new ElementWrapper(by.xpath("//div[@class='modal-name-fields ng-scope']//input[@id='form-designer-save-form-name']"));
    protected btnActive = new ElementWrapper(by.xpath("//div[@class='modal-content']//button[@id='save']"));

    private static _createNewForm: CreateNewForm = null;
    public static getInstance(): CreateNewForm {
        this._createNewForm = new CreateNewForm();
        return this._createNewForm;
    }

    protected tltElementBox(elementTitle: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//li[@id='form-designer-components-${elementTitle}']//div[@class='element-box-title ng-binding']`));
    }

    protected popElementBox(elementTitle: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//li[@id='form-designer-components-${elementTitle}']//div[@class='tooltip ng-scope ng-isolate-scope right customTooltip fade in'`));
    }

    /**
     * Select elements for QM form
     * @author Y.Le
     * @param {string[]} elementItems
     * @returns {Promise<this>}
     * @memberof CreateNewForm
     */
    public async dragElements(elementItems: string[]): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Adding Elements and give them names");
            let elementsContainerLocation: ILocation = await this.formAreaDesign.getLocation();
            let size: ISize = await this.formAreaDesign.getSize()
            elementsContainerLocation.x = (Math.floor(elementsContainerLocation.x - size.height / 2)) - 15;
            elementsContainerLocation.y = (Math.floor(elementsContainerLocation.y - size.width / 2)) - 15;
            for (let i = 0; i < elementItems.length; i++) {

                await this.tltElementBox(elementItems[i]).moveMouse();
                await this.popElementBox(elementItems[i]).wait();
                await this.tltElementBox(elementItems[i]).dragAndDrop(elementsContainerLocation);
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.dragElements, err.message);
        }
    }

    /**
     * Clicking Save and Active button
     * @author Y.Le
     * @returns {Promise<void>}
     * @memberof CreateNewForm
     */
    public async clickSaveAndActiveButton(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Clicking save and active button");
            await this.btnSaveAndActive.click();
            await this.btnActive.wait();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickSaveAndActiveButton, err.message);
        }
    }

    /**
     * Saving new QM form
     * @author Y.Le
     * @param {string} formName
     * @returns {Promise<FormManagerPage>}
     * @memberof CreateNewForm
     */
    public async saveNewQMForm(formName: string): Promise<FormManagerPage> {
        try {
            await Logger.write(FunctionType.UI, "Saving new QM form");
            await this.txtFormName.type(formName);
            await this.btnActive.click();
            return FormManagerPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.saveNewQMForm, err.message);
        }
    }
}