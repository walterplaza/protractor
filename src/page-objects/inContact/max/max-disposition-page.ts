import { State } from "@data-objects/general/general";
import TestRunInfo from "@data-objects/general/test-run-info";
import MaxPage from "@page-objects/inContact/max/max-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";

export default class MaxDispositionPage {
    private static _maxDispositionPage: MaxDispositionPage = null;

    protected pnlDisposition = new ElementWrapper(by.xpath("//div[@class='acw-omni-controls']"));
    protected frmDisposition = new ElementWrapper(by.xpath("//div[@class='acw-ui acwui']/form[@class='acw-form' or @class='acw-form ie']"));
    protected txaDispositionNote = new ElementWrapper(by.xpath("//div[@class='notes-wrapper']/textarea[@class='notes']"));
    protected btnSaveAndCloseDisposition = new ElementWrapper(by.xpath("//div[@class='button-wrapper']/button[@class='save-close-acw-submit submit']"));
    protected btnSaveDisposition = new ElementWrapper(by.xpath("//div[@class='button-wrapper']/button[@class='save submit']"));
    protected chkDispositionCheckbox = new ElementWrapper(by.xpath("//div[@class='toggle-acw-button']"));
    protected pnlAddTagDisposition = new ElementWrapper(by.xpath("//ul[@class='tags']/li[@class='tag-add']"));
    protected lstDispositionItem = new ElementWrapper(by.xpath("//div[@class='primary-disposition-wrapper']/div[@class='selectmenu-container noselect']"));
    protected icoDispositionSelect = new ElementWrapper(by.xpath("//div[@class='primary-disposition-wrapper']//div[@class='selectmenu-icon']"));
    protected cbbDispositionSelect = new SelectElementWrapper(by.xpath("//select[@class='primary-disposition']"));
    protected lblSelectedDispositionItem = new ElementWrapper(by.xpath("//div[contains(@class,'selectmenu-button primary-disposition')]/div[@class='selectmenu-text']"));

    protected selectedDispositionItem(dispositionName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='primary-disposition-wrapper']//ul[@class='selectmenu-menu-list primary-disposition' or @class='selectmenu-menu-list']/li[@class='selectmenu-menu-item selected'][@title='${dispositionName}']`));
    }

    protected dispositionItem(dispositionName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='primary-disposition-wrapper']//ul[@class='selectmenu-menu-list primary-disposition' or @class='selectmenu-menu-list']/li[text()='${dispositionName}']`));
    }

    public static async getInstance(): Promise<MaxDispositionPage> {
        this._maxDispositionPage = new MaxDispositionPage();
        return this._maxDispositionPage;
    }

    /**
     * Check disposition is displayed
	 * @author Tan.Ta
     * @param {boolean} [state=true]
     * @returns {Promise<boolean>}
     * @memberof MaxDispositionPage
     */
    public async isDispositionFormDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.frmDisposition.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDispositionFormDisplayed, err.message);
        }
    }

    /**
	 * Select Disposition, type note, and save disposition
	 * Default is save and close
	 * @author Tan.Ta
	 * @param {string} dispositionName
	 * @param {string} note
	 * @param {string} mode
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxDispositionPage
	 */
    public async submitDispositionForm(dispositionName: string, note?: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Selecting and saving disposition.");
            await this.fillDispositionForm(dispositionName, note);
            await this.btnSaveDisposition.click();
            await this.frmDisposition.waitUntilDisappear();
        } catch (err) {
            throw new errorwrapper.CustomError(this.submitDispositionForm, err.message);
        }
    }

    /**
	 * Select Disposition, type note, and close disposition window
	 * @author Tan.Ta
	 * @param {string} dispositionName
	 * @param {string} note
	 * @param {string} mode
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxDispositionPage
	 */
    public async submitAndCloseDispositionForm(dispositionName: string, note?: string): Promise<MaxPage> {
        try {
            await this.fillDispositionForm(dispositionName, note);
            await Logger.write(FunctionType.UI, "Closing disposition.");
            await this.saveAndCloseDisposition();
            return await MaxPage.getMaxInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.submitAndCloseDispositionForm, err.message);
        }
    }

    /** 
	 * Check disposition panel is displayed
	 * @author Huy.Nguyen
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof MaxDispositionPage
	 */
    public async isDispositionPanelDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.pnlDisposition.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDispositionPanelDisplayed, err.message);
        }
    }

    /**
	 * Select disposition
	 * @author Tan.Ta
	  * @param {string} dispositionName
	 * @param {string} [note]
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxDispositionPage
	 */
    public async fillDispositionForm(dispositionName: string, note?: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Selecting disposition ${dispositionName}`);
            await this.dispositionItem(dispositionName).click();
            if (note != null) {
                await this.txaDispositionNote.type(note);
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillDispositionForm, err.message);
        }
    }

    /**
	 * Click on save and close disposition button
	 * @author Tan.Ta
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxDispositionPage
	 */
    public async saveAndCloseDisposition(waitForControlStable:boolean = true): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Saving and Closing disposition");
            if(waitForControlStable){
                await this.btnSaveAndCloseDisposition.waitForControlStable();                
            }            
            await this.btnSaveAndCloseDisposition.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.saveAndCloseDisposition, err.message);
        }
    }

    /**
	 * Check disposition is selected
	 * @author Tan.Ta
	 * @param {string} dispositionName
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxDispositionPage
	 */
    public async isDispositionSelected(dispositionName: string,timeoutInSecond?: number): Promise<boolean> {
        try {

            let state: boolean = false;
            state = await this.selectedDispositionItem(dispositionName).isDisplayed(timeoutInSecond);
            return state;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDispositionSelected, err.message);
        }
    }

    /**
	 * Get disposition note
	 * @author Tan.Ta
	 * @param {string} dispositionName
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxDispositionPage
	 */
    public async getDispositionNote(): Promise<string> {
        try {
            return await this.txaDispositionNote.getControlValue();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDispositionNote, err.message);
        }
    }

    /**
    * Toggle disposition to show on or show off disposition popup
    * @author Huy.Nguyen
    * @param {string} mode
    * @returns {Promise<MaxPage>}
    * @memberof MaxDispositionPage
    */
    public async toggleDispositionPopup(mode: string): Promise<MaxDispositionPage> {
        try {
            await Logger.write(FunctionType.UI, `Toggling disposition popup ${mode}`);
            await this.chkDispositionCheckbox.waitForPresenceOf();
            let stateDispoPopup: boolean = await this.isDispositionFormDisplayed(TestRunInfo.shortTimeout);

            if ((mode == State.ON && !stateDispoPopup) || (mode == State.OFF && stateDispoPopup)) {
                await this.chkDispositionCheckbox.click();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.toggleDispositionPopup, err.message);
        }
    }

    /**	
	 * Wait for disposition window disappear
	 * @author Huy.Nguyen
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<MaxPage>} MAX page
	 * @memberof MaxDispositionPage
	 */
    public async waitForDispositionFormDisappear(timeoutInSecond?: number): Promise<MaxDispositionPage> {
        try {
            await this.pnlDisposition.waitUntilDisappear(timeoutInSecond);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForDispositionFormDisappear, err.message);
        }
    }

    /**
	 * Get background color of disposition checkbox
	 * @author Huy.Nguyen
	 * @returns {Promise<String>}
	 * @memberof MaxPage
	 */
    public async getColorDispositionCheckbox(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting background color of disposition checkbox");
            await this.chkDispositionCheckbox.waitUntilCssValueNotChange("background-color");
            return Utility.convertRgbToHex(await this.chkDispositionCheckbox.getCssValue("background-color"));
        } catch (err) {
            throw new errorwrapper.CustomError(this.getColorDispositionCheckbox, err.message);
        }
    }

	/**	
	* Get chat disposition color
	* @author Anh.Ho
	* @param {string} dispositionName
	* @returns {Promise<string>} color
	* @memberof MaxPage
	*/
    public async getDispositionItemColor(dispositionName: string): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting chat disposition color");
            return Utility.convertRgbToHex(await this.dispositionItem(dispositionName).getCssValue("color"));
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDispositionItemColor, err.message);
        }
    }

    /**
     * Check if disposition note is editable
     * @author Tuan.Vu
     * @param {boolean} 
     * @returns {Promise<boolean>}
     * @memberof MaxGeneral
     */
    public async isDispositionEditable(): Promise<boolean> {
        try {
            if (await this.txaDispositionNote.getAttribute("readonly") == null && await this.txaDispositionNote.getAttribute("disabled") == null) {
                return true;
            }
            return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDispositionEditable, err.message);
        }
    }

    /**
	 * Select disposition
	 * @author Chinh.Nguyen
	 * @param {string} note
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
    public async enterDispositionNote(note: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Entering disposition note");
            await this.txaDispositionNote.type(note);
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterDispositionNote, err.message);
        }
    }

    /**
	 * Check elements in disposition dialog were displayed
	 * @author Huy.Nguyen
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
    public async isDispositionListItemsDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.lstDispositionItem.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDispositionListItemsDisplayed, err.message);
        }
    }

	/**
	 * Check elements in disposition dialog were displayed
	 * @author Huy.Nguyen
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
    public async isDispositionNoteDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.txaDispositionNote.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDispositionNoteDisplayed, err.message);
        }
    }

	/**
	 * Check elements in disposition dialog were displayed
	 * @author Huy.Nguyen
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
    public async isDispositionAddTagDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.pnlAddTagDisposition.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDispositionAddTagDisplayed, err.message);
        }
    }

    /**
     * Huy.Nguyen
     * Get ACW status of disposition with "data-status" attribute
     * @returns {Promise<string>}
     * @memberof MaxDispositionPage
     */
    public async getDispositionAcwStatus(timeOut?: number): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting Disposition ACW status");
            return await this.frmDisposition.getAttribute("data-status", timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDispositionAcwStatus, err.message);
        }
    }

    /**
	 * Check disposition checkbox is displayed
	 * @author Huy.Nguyen
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
    public async isDispositionCheckboxDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.chkDispositionCheckbox.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDispositionCheckboxDisplayed, err.message);
        }
    }

    /**
	 * Click on save disposition button
	 * @author Huy.Nguyen
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxDispositionPage
	 */
    public async saveDisposition(): Promise<MaxChatPage> {
        try {
            await Logger.write(FunctionType.UI, "Saving disposition");
            await this.btnSaveDisposition.waitForControlStable();
            await this.btnSaveDisposition.click();
            await this.frmDisposition.waitUntilDisappear();
            return await MaxChatPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.saveDisposition, err.message);
        }
    }

    /**
	 * Check disposition note textarea is displayed
	 * @author Phat TTruong
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
    public async isDispositionNoteTextboxDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.txaDispositionNote.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDispositionNoteTextboxDisplayed, err.message);
        }
    }

    /**
	 * Check save and close disposition button is displayed
	 * @author Phat TTruong
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
    public async isSaveAndCloseDispositionButtonDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.btnSaveAndCloseDisposition.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSaveAndCloseDispositionButtonDisplayed, err.message);
        }
    }

    /**	
	 * Get save and close disposition button background color
     * @author Phat TTruong
     * @param {string} dispositionName
	 * @returns {Promise<string>}
	 * @memberof MaxPage
	 */
    public async getSaveAndCloseDispositionButtonBackgroundColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting save and close disposition button background color`);
            return Utility.convertRgbToHex(await this.btnSaveAndCloseDisposition.getCssValue("background-color"));
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSaveAndCloseDispositionButtonBackgroundColor, err.message);
        }
    }

    /**	
	 * Get disposition checkbox background color
     * @author Phat TTruong
     * @param {string} dispositionName
	 * @returns {Promise<string>}
	 * @memberof MaxPage
	 */
    public async getDispositionCheckboxBackgroundColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting disposition checkbox background color`);
            return Utility.convertRgbToHex(await this.chkDispositionCheckbox.getCssValue("background-color"));
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDispositionCheckboxBackgroundColor, err.message);
        }
    }
}