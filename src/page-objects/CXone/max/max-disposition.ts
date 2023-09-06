import TestRunInfo from "@data-objects/general/test-run-info";
import MaxPage from "@page-objects/CXone/max/max-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class MaxDispositionPage {
    private static _maxDispositionPage: MaxDispositionPage = null;

    protected pnlDisposition = new ElementWrapper(by.xpath("//div[@class='acw-omni-controls']"));
    protected frmDisposition = new ElementWrapper(by.xpath("//div[@class='acw-ui acwui']/form[@class='acw-form']"));
    protected txaDispositionNote = new ElementWrapper(by.xpath("//div[@class='notes-wrapper']/textarea[@class='notes']"));
    protected btnSaveAndCloseDisposition = new ElementWrapper(by.xpath("//div[@class='button-wrapper']/button[@class='save-close-acw-submit submit']"));
    protected btnSaveDisposition = new ElementWrapper(by.xpath("//div[@class='button-wrapper']/button[@class='save submit']"));
    protected chkDispositionCheckbox = new ElementWrapper(by.xpath("//div[@class='toggle-acw-button']"));
    protected pnlAddTagDisposition = new ElementWrapper(by.xpath("//ul[@class='tags']/li[@class='tag-add']"));
    protected lstDispositionItem = new ElementWrapper(by.xpath("//div[@class='primary-disposition-wrapper']/div[@class='selectmenu-container noselect']"));

    protected selectedDispositionItem(dispositionName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//form[@class='acw-form']//li[@class='selectmenu-menu-item selected'][@title='${dispositionName}']`));
    }

    protected dispositionItem(dispositionName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//ul[@class='selectmenu-menu-list primary-disposition']/li[text()='${dispositionName}']`));
    }

    public static async getInstance(): Promise<MaxDispositionPage> {
        this._maxDispositionPage = new MaxDispositionPage();
        return this._maxDispositionPage;
    }

    /**
     * Check disposition is displayed
	 * @author Y.Le
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
	 * @author Y.Le
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
        } catch (err) {
            throw new errorwrapper.CustomError(this.submitDispositionForm, err.message);
        }
    }

    /**
	 * Select Disposition, type note, and close disposition window
	 * @author Y.Le
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
            let maxPage: MaxPage = await this.saveAndCloseDisposition();
            return maxPage;
        } catch (err) {
            throw new errorwrapper.CustomError(this.submitAndCloseDispositionForm, err.message);
        }
    }

    /** 
	 * Check disposition panel is displayed
	 * @author Y.Le
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
	 * @author Y.Le
	  * @param {string} dispositionName
	 * @param {string} [note]
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxDispositionPage
	 */
    public async fillDispositionForm(dispositionName: string, note?: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Selecting disposition");
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
	 * @author Y.Le
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxDispositionPage
	 */
    public async saveAndCloseDisposition(): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, "Saving and Closing disposition");
            await this.btnSaveAndCloseDisposition.click();
            return await MaxPage.getMaxInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.saveAndCloseDisposition, err.message);
        }
    }

    /**
	 * Check disposition is selected
	 * @author Y.Le
	 * @param {string} dispositionName
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxDispositionPage
	 */
    public async isDispositionSelected(dispositionName: string): Promise<boolean> {
        try {
            return await this.selectedDispositionItem(dispositionName).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDispositionSelected, err.message);
        }
    }

    /**
	 * Get disposition note
	 * @author Y.Le
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
    * @author Y.Le
    * @param {string} mode
    * @returns {Promise<MaxPage>}
    * @memberof MaxDispositionPage
    */
    public async toggleDispositionPopup(mode: string): Promise<MaxDispositionPage> {
        try {
            await Logger.write(FunctionType.UI, `Toggling disposition popup ${mode}`);
            let stateDispoPopup: boolean = await this.isDispositionFormDisplayed(TestRunInfo.shortTimeout);

            if ((mode == "on" && !stateDispoPopup) || (mode == "off" && stateDispoPopup)) {
                await this.chkDispositionCheckbox.click();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.toggleDispositionPopup, err.message);
        }
    }

    /**	
	 * Wait for disposition window disappear
	 * @author Y.Le
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
	 * @author Y.Le
	 * @returns {Promise<String>}
	 * @memberof MaxPage
	 */
    public async getColorDispositionCheckbox(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting background color of disposition checkbox");
            return await this.chkDispositionCheckbox.getCssValue("background-color");
        } catch (err) {
            throw new errorwrapper.CustomError(this.getColorDispositionCheckbox, err.message);
        }
    }

	/**	
	* Get chat disposition color
	* @author Y.Le
	* @param {string} dispositionName
	* @returns {Promise<string>} color
	* @memberof MaxPage
	*/
    public async getDispositionItemColor(dispositionName: string): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting chat disposition color");
            return await this.dispositionItem(dispositionName).getCssValue("color");
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDispositionItemColor, err.message);
        }
    }

    /**
     * Check if disposition note is editable
     * @author Y.Le
     * @param {boolean} 
     * @returns {Promise<boolean>}
     * @memberof MaxGeneral
     */
    public async isDispositionEditable(): Promise<boolean> {
        try {
            let testString: string = Utility.createRandomString(5);
            let defaultString: string = await this.txaDispositionNote.getControlValue();
            await this.txaDispositionNote.type(testString);
            if (await this.txaDispositionNote.getControlValue() == testString) {
                await this.txaDispositionNote.type(defaultString);
                return true;
            } else {
                await this.txaDispositionNote.type(defaultString);
                return false;
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDispositionEditable, err.message);
        }
    }

    /**
	 * Select disposition
	 * @author Y.Le
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
	 * @author Y.Le
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
	 * @author Y.Le
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
	 * @author Y.Le
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
}