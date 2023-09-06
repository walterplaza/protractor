import { State } from "@data-objects/general/general";
import TestRunInfo from "@data-objects/general/test-run-info";
import { SkillTabs } from "@data-objects/inContact/central/routing/skills/skill-tabs";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import ParametersPage from "@page-objects/inContact/central/routing/skills/parameters-page";
import PostContactPage from "@page-objects/inContact/central/routing/skills/post-contact-page";
import ProjectPath from "@test-data/general/project-path";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { Browser, by } from "protractor";
import SkillsListPage from "./skills-list-page";
import { SkillType } from "@data-objects/general/skill-core";

export default class SkillsDetailPage extends NavigationBar {

    private static _skillsDetailPage: SkillsDetailPage = null;

    public static async getInstance(): Promise<SkillsDetailPage> {
        this._skillsDetailPage = new SkillsDetailPage();
        await this._skillsDetailPage.waitForLoading();
        return await this._skillsDetailPage;
    }

    protected lnkDetails = new ElementWrapper(by.xpath("//a[contains(@id,'tcSkillDetails_tpnlSkillDetails')]"));
    protected tabPostContact = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_header']//a[@id='__tab_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlACW']"));
    protected btnEdit = new ElementWrapper(by.xpath("//button[./span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_btnEdit_ShadowButtonSpan']]"));
    protected chkChatMessagingTimeOutChecked = new ElementWrapper(by.xpath("//tr[./td/span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_uctSkillsEdit_lblEnableChatMessagingTimeout']]//input"));
    protected btnDiscardChanges = new ElementWrapper(by.xpath("//button[./span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_btnDiscardChanges_ShadowButtonSpan']]"));
    protected btnDone = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_btnUpdate_btnMain_ShadowButtonSpan']"));
    protected txtTimeToInactiveChatMessage = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_uctSkillsEdit_txtInactiveChatMessageTime']"));
    protected txtInactiveChatMessage = new ElementWrapper(by.xpath("//textarea[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_uctSkillsEdit_txtInactiveChatMessage']"));
    protected txtChatTerminationCountDown = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_uctSkillsEdit_txtChatTerminationCountDown']"));
    protected txtChatTerminatedMessage = new ElementWrapper(by.xpath("//textarea[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_uctSkillsEdit_txtChatTerminatedMessage']"));

    protected chkUseScreenPops = new ElementWrapper(by.xpath("//input[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_uctSkillsEdit_cbxScreenPops')]"));
    protected chkUseCustomScreenPops = new ElementWrapper(by.xpath("//input[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_uctSkillsEdit_cbxCustomScreenPops')]"));
    protected rdoWebpage = new ElementWrapper(by.xpath("//input[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_uctSkillsEdit_rdoWebpage')]"));
    protected txtWebpage = new ElementWrapper(by.xpath("//input[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_uctSkillsEdit_tbxScreenPopsApplication')]"));
    protected rdoApplication = new ElementWrapper(by.xpath("//input[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_uctSkillsEdit_rdoApplication')]"));

    // Email
    protected chkInterruptible = new ElementWrapper(by.xpath("//input[contains(@id,'BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_uctSkillsEdit_cbxInterruptible')]"));
    protected chkParking = new ElementWrapper(by.xpath("//input[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_uctSkillsEdit_cbxEmailParking')]"));
    protected txtInitialPriority = new ElementWrapper(by.xpath("//input[contains(@id,'BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_uctSkillsEdit_tbxInitialPriority')]"));
    protected txtMinimumWorkingTime = new ElementWrapper(by.xpath("//input[contains(@id,'BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_uctSkillsEdit_txtMinWorkTime')]"));
    protected txtAcceleration = new ElementWrapper(by.xpath("//input[contains(@id,'BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_uctSkillsEdit_tbxAcceleration')]"));
    protected txtMaximumPriority = new ElementWrapper(by.xpath("//input[contains(@id,'BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_uctSkillsEdit_tbxMaximumPriority')]"));
    protected txtEmailFromAddress = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_uctSkillsEdit_txtEmailFromAddress']"));

    // Dynamic controls
    protected lblTableItem(value: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//td[text()='${value}']`));
    }

    protected pnlTab(tabName: SkillTabs): ElementWrapper {
        return new ElementWrapper(by.xpath(`//span[@class='ajax__tab_inner']//span[text()='${tabName}']`));
    }

    protected lblSkillDetailValue(skillDetailName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//tr[./td[contains(text(),'${skillDetailName}')]]//span`));
    }

    /**
    * Is Skill Detail Page displayed?
    * @returns {Promise<boolean>}
    * @memberof SkillsDetailPage
    */
    public async isDisplayed(): Promise<boolean> {
        try {
            return await this.lnkDetails.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDisplayed, err.message);
        }
    }

    /**
    * Wait for page loaded
    * @returns {Promise<boolean>}
    * @memberof SkillsDetailPage
    */
    public async waitForLoading(): Promise<SkillsDetailPage> {
        try {
            await this.divLoading.waitUntilDisappear();
            await this.lnkDetails.isDisplayed();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForLoading, err.message);
        }
    }

    /**
    * Is skill displayed on table?
    * @param {string} skillValue Value of table
    * @returns {Promise<boolean>}
    * @memberof SkillsDetailPage
    */
    public async isSkillDisplayed(skillValue: string): Promise<boolean> {
        try {
            return await this.lblTableItem(skillValue).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSkillDisplayed, err.message);
        }
    }

    /**
     * Go to Post Contact page
     * @returns {Promise<PostContactPage>} Post Contact page
     * @memberof SkillsDetailPage
     */
    public async gotoPostContactTab(): Promise<PostContactPage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Post Contact page`);
            await this.tabPostContact.click();
            let postContactPage = require(`${ProjectPath.pageObjects}/inContact/central/routing/skills/post-contact-page`).default;
            return postContactPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoPostContactTab, err.message);
        }
    }

    /** 
    * Get skill detail value
    * @returns {Promise<string>}
    * @memberof SkillsDetailPage
    */
    public async getSkillDetailValue(skillDetailName: string): Promise<string> {
        try {
            return await this.lblSkillDetailValue(skillDetailName).getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillDetailValue, err.message);
        }
    }

    /**
    * Go to edit skill detail
    * @returns {Promise<SkillsDetailPage>}
    * @memberof SkillsDetailPage
    */
    public async clickEditButton(): Promise<SkillsDetailPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Edit Skill Detail' button`);
            if (TestRunInfo.browser == Browser.IE) {
                await this.btnEdit.scrollToElement();
            }
            await this.btnEdit.click();
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickEditButton, err.message);
        }
    }

    /**
    * Is chat messaging time out checked
    * @returns {Promise<boolean>}
    * @memberof SkillsDetailPage
    */
    public async isChatMessagingTimeOutChecked(): Promise<boolean> {
        try {
            return await this.chkChatMessagingTimeOutChecked.isSelected();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isChatMessagingTimeOutChecked, err.message);
        }
    }

    /**
    * Discard skill detail changes
    * @returns {Promise<SkillsDetailPage>}
    * @memberof SkillsDetailPage
    */
    public async discardChanges(): Promise<SkillsDetailPage> {
        try {
            await Logger.write(FunctionType.UI, `Discarding changes`);
            await this.btnDiscardChanges.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.discardChanges, err.message);
        }
    }

    /**
    * Is skill detail edit page displayed
    * @returns {Promise<boolean>}
    * @memberof SkillsDetailPage
    */
    public async isSkillDetailEditPageDisplayed(): Promise<boolean> {
        try {
            return await this.btnDone.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSkillDetailEditPageDisplayed, err.message);
        }
    }

    /**
        * Enable Chat Messaging Time Out checkbox
        * @returns {Promise<boolean>}
        * @memberof SkillsDetailPage
        */
    public async enableChatMessagingTimeOutCheckbox(): Promise<SkillsDetailPage> {
        try {
            await Logger.write(FunctionType.UI, `Enabling Chat Messaging Time Out checkbox`);
            await this.chkChatMessagingTimeOutChecked.setCheckBox(true);
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enableChatMessagingTimeOutCheckbox, err.message);
        }
    }

    /**
    * Is 'Time to inactive Chat Message' textbox enabled
    * @returns {Promise<boolean>}
    * @memberof SkillsDetailPage
    */
    public async isTimeToInactiveChatMessageEnabled(): Promise<boolean> {
        try {
            return await this.txtTimeToInactiveChatMessage.isEnabled();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTimeToInactiveChatMessageEnabled, err.message);
        }
    }

    /**
    * Is 'Inactive Chat Message' textbox enabled
    * @returns {Promise<boolean>}
    * @memberof SkillsDetailPage
    */
    public async isInactiveChatMessageEnabled(): Promise<boolean> {
        try {
            return await this.txtInactiveChatMessage.isEnabled();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isInactiveChatMessageEnabled, err.message);
        }
    }

    /**
    * Is 'Chat Termination Count Down' textbox enabled
    * @returns {Promise<boolean>}
    * @memberof SkillsDetailPage
    */
    public async isChatTerminationCountDownEnabled(): Promise<boolean> {
        try {
            return await this.txtChatTerminationCountDown.isEnabled();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isChatTerminationCountDownEnabled, err.message);
        }
    }

    /**
    * Is 'Chat Terminated Message' textbox enabled
    * @returns {Promise<boolean>}
    * @memberof SkillsDetailPage
    */
    public async isChatTerminatedMessageEnabled(): Promise<boolean> {
        try {
            return await this.txtChatTerminatedMessage.isEnabled();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isChatTerminatedMessageEnabled, err.message);
        }
    }

    /**
     * Set email interruptible mode
     * @author Chinh.Nguyen
     * @param {string} mode
     * @returns {Promise<SkillsDetailPage>}
     * @memberof SkillsDetailPage
     */
    public async setEmailInterruptibleMode(mode: string): Promise<SkillsDetailPage> {
        try {
            await Logger.write(FunctionType.UI, `Setting Interruptible mode for skill`);
            if (mode == State.ON) {
                await this.chkInterruptible.setCheckBox(true);
            } else {
                await this.chkInterruptible.setCheckBox(false);
            }
            await this.waitForPageLoad();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setEmailInterruptibleMode, err.message);
        }
    }

    /**
     * Set email parking mode
     * @author Chinh.Nguyen
     * @param {string} mode
     * @returns {Promise<SkillsDetailPage>}
     * @memberof SkillsDetailPage
     */
    public async setEmailParkingMode(mode: string): Promise<SkillsDetailPage> {
        try {
            await Logger.write(FunctionType.UI, `Setting Parking mode for skill`);
            if (mode == State.ON) {
                await this.chkParking.setCheckBox(true);
            } else {
                await this.chkParking.setCheckBox(false);
            }
            await this.waitForPageLoad();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setEmailParkingMode, err.message);
        }
    }

    /**
     * Set initial priority for skill
     * @author Chinh.Nguyen
     * @param {string} [initialPriority=0]
     * @returns {Promise<SkillsDetailPage>}
     * @memberof SkillsDetailPage
     */
    public async setSkillInitialPriority(initialPriority: string = '0'): Promise<SkillsDetailPage> {
        try {
            await Logger.write(FunctionType.UI, `Setting Initial Priority for skill`);
            await this.txtInitialPriority.type(initialPriority);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setSkillInitialPriority, err.message);
        }
    }

    /**
     * Set minimum working time for skill
     * @author Chinh.Nguyen
     * @param {string} [minimumWorkingTime=30]
     * @returns {Promise<SkillsDetailPage>}
     * @memberof SkillsDetailPage
     */
    public async setMinimumWorkingTime(minimumWorkingTime: string = '30'): Promise<SkillsDetailPage> {
        try {
            await Logger.write(FunctionType.UI, `Setting Minimum Working Time for skill`);
            await this.txtMinimumWorkingTime.type(minimumWorkingTime);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setMinimumWorkingTime, err.message);
        }
    }

    /**
     * Set acceleration for skill
     * @author Chinh.Nguyen
     * @param {string} [acceleration=1]
     * @returns {Promise<SkillsDetailPage>}
     * @memberof SkillsDetailPage
     */
    public async setAcceleration(acceleration: string = '1'): Promise<SkillsDetailPage> {
        try {
            await Logger.write(FunctionType.UI, `Setting Acceleration for skill`);
            await this.txtAcceleration.type(acceleration);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setAcceleration, err.message);
        }
    }

    /**
     * Set maximum priority for skill
     * @author Chinh.Nguyen
     * @param {string} [maxPriority=1000]
     * @returns {Promise<SkillsDetailPage>}
     * @memberof SkillsDetailPage
     */
    public async setMaximumPriority(maxPriority: string = '1000'): Promise<SkillsDetailPage> {
        try {
            await Logger.write(FunctionType.UI, `Setting Maximum Priority for skill`);
            await this.txtMaximumPriority.type(maxPriority);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setMaximumPriority, err.message);
        }
    }

    /**
     * Completed skill detail changes
     * @author Chinh.Nguyen
     * @returns {Promise<CentralPage>}
     * @memberof CentralPage
     */

    public async completeChanges(): Promise<CentralPage> {
        try {
            await this.waitForSpinnerComponentDisappear();
            await Logger.write(FunctionType.UI, `Completing setting changes`);
            await this.btnDone.scrollToElement();
            await this.btnDone.click();
            await this.waitForSpinnerComponentDisappear();
            let centralPage = require(`${ProjectPath.pageObjects}/inContact/central/general/central-page`).default;
            return centralPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.completeChanges, err.message);
        }
    }

    /**
     * Go to Parameters page
     * @author Nhat.Nguyen
     * @returns {Promise<ParametersPage>} Parameters page
     * @memberof SkillsDetailPage
     */
    public async gotoParametersTab(): Promise<ParametersPage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Parameters page`);
            await this.pnlTab(SkillTabs.PARAMETERS).click();
            let parameterPage = require(`${ProjectPath.pageObjects}/inContact/central/routing/skills/parameters-page`).default;
            return parameterPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoParametersTab, err.message);
        }
    }
    /**
     * Set Max Chat Time Out
     * @author Anh.Le
     * @param {number} duration
     * @returns {Promise<this>}
     * @memberof SkillsDetailPage
     */
    public async setChatTimeOut(timeOutEnable: boolean, duration?: number, countdown?: number): Promise<this> {
        try {
            if (timeOutEnable) {
                await Logger.write(FunctionType.UI, "Set Max Chat Time Out");
                if (TestRunInfo.browser == Browser.IE) {
                    await this.chkChatMessagingTimeOutChecked.scrollToElement();
                    await this.chkChatMessagingTimeOutChecked.waitForControlStable();
                }
                await this.chkChatMessagingTimeOutChecked.setCheckBox(true);
                if (TestRunInfo.browser == Browser.IE) {
                    await this.txtTimeToInactiveChatMessage.scrollToElement();
                    await this.txtTimeToInactiveChatMessage.waitForControlStable();
                    await this.txtTimeToInactiveChatMessage.click();
                }
                await this.txtTimeToInactiveChatMessage.type(duration);
                if (TestRunInfo.browser == Browser.IE) {
                    await this.txtInactiveChatMessage.scrollToElement();
                    await this.txtInactiveChatMessage.waitForControlStable();
                }
                await this.txtInactiveChatMessage.type(`Chat will be inactive in ${duration} seconds`)
                if (TestRunInfo.browser == Browser.IE) {
                    await this.txtChatTerminationCountDown.scrollToElement();
                    await this.txtChatTerminationCountDown.waitForControlStable();
                }
                await this.txtChatTerminationCountDown.type(countdown);
                await this.txtChatTerminatedMessage.scrollToElement();
                await this.txtChatTerminatedMessage.waitForVisibilityOf();
                await this.txtChatTerminatedMessage.type(`Chat will be inactive in ${countdown} seconds`)
            } else {
                await this.txtTimeToInactiveChatMessage.clear();
                await this.txtInactiveChatMessage.clear();
                await this.txtChatTerminationCountDown.clear();
                await this.txtChatTerminatedMessage.clear();
                await this.chkChatMessagingTimeOutChecked.setCheckBox(false, TestRunInfo.shortTimeout);
            }
            return this;

        } catch (err) {
            throw new errorwrapper.CustomError(this.setChatTimeOut, err.message);
        }
    }

    /**
     * Fill in email from address
     * @author Tan.Ta
     * @param {string} emailAddress
     * @returns {Promise<void>}
     * @memberof SkillsDetailPage
     */
    public async fillInEmailFromAddress(emailAddress: string): Promise<void> {
        try {
            await this.txtEmailFromAddress.type(emailAddress);
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillInEmailFromAddress, err.message);
        }
    }
    
    /**
     * edit EmailParkingMode
     * @author Lien.Nguyen
     * @param {State} state
     * @returns {Promise<void>}
     * @memberof SkillsDetailPage
     */

    public async editEmailParkingMode(state: State): Promise<this> {
        try {
            await this.clickEditButton();
            await this.setEmailParkingMode(state);
            await this.completeChanges();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editEmailParkingMode, err.message);
        }
    }

    /**
    * Enable Use Screen Pops
    * @returns {Promise<boolean>}
    * @memberof SkillsDetailPage
    */
    public async setUseScreenPopsCheckbox(mode: string): Promise<SkillsDetailPage> {
        try {
            await Logger.write(FunctionType.UI, `Enabling Use Screen Pops checkbox`);
            if (TestRunInfo.browser == Browser.IE) {
                await this.chkUseScreenPops.waitForControlStable();
                await this.chkUseScreenPops.scrollToElement();
            }
            if (mode == State.ON) {
                await this.chkUseScreenPops.setCheckBox(true);
            } else {
                await this.chkUseScreenPops.setCheckBox(false);
            }
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setUseScreenPopsCheckbox, err.message);
        }
    }



    /**
    * Enable Use Custom Screen Pops
    * @author Tung.Vo
    * @returns {Promise<boolean>}
    * @memberof SkillsDetailPage
    */
    public async setUseCustomScreenPopsCheckbox(mode: string): Promise<SkillsDetailPage> {
        try {
            await Logger.write(FunctionType.UI, `Enabling Use Custom Screen Pops checkbox`);
            if (TestRunInfo.browser == Browser.IE) {
                await this.chkUseCustomScreenPops.waitForControlStable();
                await this.chkUseCustomScreenPops.scrollToElement();
            }
            if (mode == State.ON) {
                await this.chkUseCustomScreenPops.setCheckBox(true);
            } else {
                await this.chkUseCustomScreenPops.setCheckBox(false);
            }
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setUseCustomScreenPopsCheckbox, err.message);
        }
    }

    /**
    * Enable Webpage
    * @author Tung.Vo
    * @returns {Promise<boolean>}
    * @memberof SkillsDetailPage
    */
    public async setWebpageRadiobutton(mode: string): Promise<SkillsDetailPage> {
        try {
            await Logger.write(FunctionType.UI, `Enabling Webpage radio button`);
            if (TestRunInfo.browser == Browser.IE) {
                await this.rdoWebpage.waitForControlStable();
                await this.rdoWebpage.scrollToElement();
            }
            if (mode == State.ON) {
                await this.rdoWebpage.setCheckBox(true);
            } else {
                await this.rdoWebpage.setCheckBox(false);
            }
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setWebpageRadiobutton, err.message);
        }
    }

    /**
    * Enable Application
    * @author Tung.Vo
    * @returns {Promise<boolean>}
    * @memberof SkillsDetailPage
    */
    public async setApplicationRadiobutton(mode: string): Promise<SkillsDetailPage> {
        try {
            await Logger.write(FunctionType.UI, `Enabling Application radio button`);
            if (TestRunInfo.browser == Browser.IE) {
                await this.rdoApplication.waitForControlStable();
                await this.rdoApplication.scrollToElement();
            }
            if (mode == State.ON) {
                await this.rdoApplication.setCheckBox(true);
            } else {
                await this.rdoApplication.setCheckBox(false);
            }
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setApplicationRadiobutton, err.message);
        }
    }

    /**
    * Set Webpage for screen pops
    * @author Tung.Vo
    * @returns {Promise<SkillsDetailPage>}
    * @memberof SkillsDetailPage
    */
    public async setWebpage(webpage: string): Promise<SkillsDetailPage> {
        try {
            await Logger.write(FunctionType.UI, `Setting Webpage for screen pops`);
            if (TestRunInfo.browser == Browser.IE) {
                await this.txtWebpage.waitForControlStable();
                await this.txtWebpage.scrollToElement();
            }
            await this.txtWebpage.type(webpage);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setWebpage, err.message);
        }
    }

    /**
    * Set Screen Pops Options
    * @author Tung.Vo
    * @returns {Promise<SkillsListPage>}
    * @memberof SkillsListPage
    */
    public async setScreenPopsOptions(mode: string, useScreenPops: State, useCustomScreenPops: State, textUrl: string): Promise<SkillsDetailPage> {
        try {
            await Logger.write(FunctionType.UI, `Setting Screen Pops options`);
            await this.clickEditButton();
            await this.setUseScreenPopsCheckbox(useScreenPops);
            await this.setUseCustomScreenPopsCheckbox(useCustomScreenPops);
            if (mode == "Webpage") {
                await this.setWebpageRadiobutton(State.ON);
            }
            else {
                await this.setApplicationRadiobutton(State.ON);
            }
            await this.setWebpage(textUrl);
            await this.completeChanges();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setScreenPopsOptions, err.message);
        }
    }
}