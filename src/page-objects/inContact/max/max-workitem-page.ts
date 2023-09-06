import MaxDispositionPage from '@page-objects/inContact/max/max-disposition-page';
import MaxPage from '@page-objects/inContact/max/max-page';
import MaxTransferPage from '@page-objects/inContact/max/max-transfer-page';
import ProjectPath from '@test-data/general/project-path';
import { FunctionType, Logger } from '@utilities/general/logger';
import { Utility } from '@utilities/general/utility';
import BrowserWrapper from '@utilities/protractor-wrappers/browser-wrapper';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import { ISize } from 'selenium-webdriver';

export default class MaxWorkItemPage extends MaxPage {
    private static _maxWorkItemPage: MaxWorkItemPage = null;

    protected pnlWorkItem = new ElementWrapper(by.xpath("//div[@class='work-item-section']"));
    protected btnEnd = new ElementWrapper(by.xpath("//button[@class='end']"));
    protected btnConfirmEnd = new ElementWrapper(by.xpath("//button[@class='confirm-end-contact']"));
    protected pnlDisposition = new ElementWrapper(by.xpath("//div[@class='acw-ui acwui']/form[@class='acw-form']"));
    protected btnTransferContact = new ElementWrapper(by.xpath("//div[@class='secondary-controls']//button[@class='init-transfer-contact' or @class='transfer']"));
    protected btnLaunch = new ElementWrapper(by.xpath("//button[@class='launch']"))
    protected btnHold = new ElementWrapper(by.xpath("//button[@class='hold']"));
    protected workItemBody = new ElementWrapper(by.xpath("//body[contains(.,'Phone Number Or Station ID')]"));
    protected workItemWorkspace = new ElementWrapper(by.xpath("//div[@id='workItemWorkspace']"));
    protected lblWorkItemSkillName = new ElementWrapper(by.xpath("//div[@id='workItemWorkspace']//h2[@class='skill-name']"));

    public static async getInstance(): Promise<MaxWorkItemPage> {
        this._maxWorkItemPage = new MaxWorkItemPage();
        return this._maxWorkItemPage;
    }

    /**
	 * End Workitem Contact
	 * @returns {Promise<MaxPage>} Return MaxPage
	 * @memberof MaxWorkItemPage
	 */
    public async endWorkItemContact(multiContact: boolean = false): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, "Ending Work Item contact");
            await this.btnEnd.click();
            await this.btnConfirmEnd.click();
            let maxPage = require(`${ProjectPath.pageObjects}/inContact/max/max-page`).default;
            return await maxPage.getMaxInstance(false, multiContact);
                   
        } catch (err) {
            throw new errorwrapper.CustomError(this.endWorkItemContact, err.message);
        }
    }

    /**
     * End Work item require disposition Contact
     * @returns {Promise<MaxWorkItemPage>} Return MaxWorkItemPage
     * @memberof MaxWorkItemPage
     */
    public async endWorkItemRequireDisposition(): Promise<MaxDispositionPage> {
        try {
            await Logger.write(FunctionType.UI, "Ending Work Item contact");
            await this.btnEnd.click();
            await this.btnConfirmEnd.click();
            return MaxDispositionPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.endWorkItemRequireDisposition, err.message);
        }
    }
    /**	
	 * Hold A Workitem
	 * @returns {Promise<MaxWorkItemPage>}
	 * @memberof MaxWorkItemPage
	 */
    public async holdAWorkitem(): Promise<MaxWorkItemPage> {
        try {
            await this.btnEnd.waitForControlStable();
            let isEndButtonDisabled = await BrowserWrapper.executeScript(`return document.getElementsByClassName("end")[0].disabled`);
            if (isEndButtonDisabled == false) {
                await Logger.write(FunctionType.UI, `Clicking Hold button`);
                await this.btnHold.click();
                await this.btnHold.waitForControlStable()
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.holdAWorkitem, err.message);
        }
    }

    /**	
    * Click on Transfer and Conference button
    * @author Lien.Nguyen
    * @returns {Promise<MaxTransfer>}
    * @memberof MaxCall
    */
    public async clickTransferConferenceButton(): Promise<MaxTransferPage> {
        try {
            await this.btnTransferContact.click();
            return MaxTransferPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickTransferConferenceButton, err.message);
        }
    }
    /**	
	 * Unhold A Workitem
	 * @returns {Promise<MaxWorkItemPage>}
	 * @memberof MaxWorkItemPage
	 */
    public async unholdAWorkitem(): Promise<MaxWorkItemPage> {
        try {
            await this.btnEnd.waitForControlStable();
            let isEndButtonDisabled = await BrowserWrapper.executeScript(`return document.getElementsByClassName("end")[0].disabled`);
            if (isEndButtonDisabled == true) {
                await Logger.write(FunctionType.UI, `Clicking Hold button`);
                await this.btnHold.click();
                await this.btnHold.waitForControlStable()
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.unholdAWorkitem, err.message);
        }
    }
    /**	
    * Check if workitem is held or not
    * @param {boolean} [state=true]
    * @param {number} [timeoutInSecond]
    * @returns {Promise<boolean>}
    * @memberof MaxWorkItemPage
    */
    public async isWorkitemHeld(state: boolean = true, timeoutInSecond?: number): Promise<boolean> {
        try {
            await this.btnEnd.waitForControlStable(timeoutInSecond);
            let isEndButtonDisabled = await BrowserWrapper.executeScript(`return document.getElementsByClassName("end")[0].disabled`);
            if (state == true && isEndButtonDisabled == true || state == false && isEndButtonDisabled == false)
                return true;
            else
                return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isWorkitemHeld, err.message);
        }
    }

	/**	
	 * Get Work Item workspace size
	 * @returns {Promise<any>}
	 * @memberof MaxPage
	 */
    public async getWorkItemSize(): Promise<ISize> {
        try {
            await Logger.write(FunctionType.UI, `Getting work item workspace size`);
            let locationWorkItemWorkspace: ISize = await this.workItemWorkspace.getSize();
            return locationWorkItemWorkspace;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getWorkItemSize, err.message);
        }
    }

    /**	
	 * Get Work Item background color
	 * @returns {Promise<string>}
	 * @memberof MaxPage
	 */
    public async getWorkItemBackgroundColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting work item background color`);
            return Utility.convertRgbToHex(await this.workItemBody.getCssValue("background-color"));
        } catch (err) {
            throw new errorwrapper.CustomError(this.getWorkItemBackgroundColor, err.message);
        }
    }

    /**	
    * Get skill name of Work Item workspace
    * @author Phat TTruong
 	* @returns {Promise<string>}
 	* @memberof MaxPage
 	*/
    public async getSkillNameOfWorkItem(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting skill name of workitem`);
            return await this.lblWorkItemSkillName.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillNameOfWorkItem, err.message);
        }
    }


    /**
	* This method is used to check current max glance size is matched with expectation with the allowable range (default is +-10)
	* @author Phat.Truong
	* @param {number} expectedSize expected size to check
	* @param {number} range tolerance to adjust acceptable checking value
	* @returns {Promise<boolean>}
	* @memberof MaxPage
	*/
    public async isWorkitemSizeInRange(expectedSize: number, range: number): Promise<boolean> {
        try {
            let workitemSize: ISize = await this.pnlWorkItem.getSize();
            let maxCurrentSize = workitemSize.width;
            return await Utility.isNumberInRange(maxCurrentSize, expectedSize, range);

        } catch (err) {
            throw new errorwrapper.CustomError(this.isWorkitemSizeInRange, err.message);
        }
    }



    /**	
	 * Check if End Button is displayed or not
     * @author Tuan.Vu
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isEndButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnEnd.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEndButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Transfer Button is displayed or not
     * @author Tuan.Vu
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isTransferButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnTransferContact.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTransferButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Launch Button is displayed or not
     * @author Tuan.Vu
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isLaunchButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnLaunch.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLaunchButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Hold Button is displayed or not
     * @author Tuan.Vu
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isHoldButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnHold.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isHoldButtonDisplayed, err.message);
        }
    }
}