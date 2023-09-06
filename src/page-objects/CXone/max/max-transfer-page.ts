import { OtherItem, TransferTab } from "@data-objects/general/max";
import MaxPage from "@page-objects/CXone/max/max-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import MaxCall from "./max-call-page";
import { MainTransferTabItem, AgentTransferTabItem } from "@data-objects/general/general";

export default class MaxTransfer extends MaxPage {

    private static _maxTransfer: MaxTransfer = null;

    constructor() { super(); }

    protected txtSearchAgentAddressBook = new ElementWrapper(by.xpath("//div[contains(@id,'advancedaddressbooksearchui')]//input[@type='search']"));
    protected tabOther = new ElementWrapper(by.xpath("//li[contains(@id,'advancedaddressbookui')][@data-tab-type='other']"));
    protected tabSkill = new ElementWrapper(by.xpath("//div[@class='advanced-address-book-other-ui advancedaddressbookotherui']//li[@data-id='skills']"));
    protected btnColdTransfer = new ElementWrapper(by.xpath("//div[@id='callcontactui-1_container']//button[@class='cold-transfer-contact']"));
    protected pnlAddressBook = new ElementWrapper(by.xpath("//div[@id='contactSection']//div[@class='popover-panel advanced-address-book-ui']"));
    protected tabMyTeamAddressBook = new ElementWrapper(by.xpath("//li[contains(@id,'advancedaddressbookui')][@data-tab-type='my-team']"));
    protected pnlTransferConferenceControls = new ElementWrapper(by.xpath('//div[@id="callcontactui-1_container"]//div[@class="conference-transfer-controls"]'))
    protected skillListItems = new ElementWrapper(by.xpath('//div[@id="advancedaddressbookmainui-0"][@data-context="Skills"]//ul[@class="item-list"]'))
    protected listOfAgentsAssignedToTheSkillList = new ElementWrapper(by.xpath('//div[@id="advancedaddressbookmainui-0"][@data-context="SkillAgents"]//ul[@class="item-list"]'))

    protected lblAgentName(agentName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`(//li[.//h1[text()='${agentName}']][@data-type='agent' or @data-type='queue'])[1]`));
    }

    protected btnCallAddressBook(agentName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`(//li[.//h1[text()='${agentName}']]//button[@title='Call'])[1]`));
    }

    protected btnTransferCallAddressBook(agentName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`(//li[.//h1[text()='${agentName}']]//button[@class='call-pq' and @title='Transfer'])[1]`));
    }

    protected btnTransferInAllAgentsTab(agentName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`(//li[contains(@id,'abEntry_addressBookOtherAvailableTeamsAgents')][.//h1[text()='${agentName}']]//button[@class='transfer'][@title='Transfer'])`));
    }

    protected pnlCallAgentSection(agentName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@id='call-container'][.//h1[text()='${agentName}']]`));
    }

    protected tabAddressBook(tabName: TransferTab): ElementWrapper {
        return new ElementWrapper(by.xpath(`//li[contains(@id,'advancedaddressbookui')][@data-tab-type='${tabName}']`));
    }

    protected lblOtherItem(itemName: OtherItem): ElementWrapper {
        return new ElementWrapper(by.xpath(`//ul[@class='item-list']/li[@class='clickable custom-address-book-template popover-panel-item-template'][@data-addressbookname='${itemName}']`));
    }

    protected lblSkillItem(itemName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//ul[@class='item-list']/li[contains(@class,'clickable queue-template popover-panel-item-template')][@data-skillname='${itemName}']`));
    }

    protected btnSkillCall(itemName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//li[@data-skillname='${itemName}']/parent::ul[@class='item-list']//h1[@title='${itemName}']/parent::div//button[@title='Call']`));
    }

    protected btnRightArrow(itemName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//li[@data-skillname='${itemName}']//div[@class='right navigation-arrow-forward']`));
    }

    protected tabTransfer(tabName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//li[@data-tab-type='${tabName}']`));
    }

    protected lblMainItem(item: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='advanced-address-book-other-ui advancedaddressbookmainui']//li[@data-addressbookname='${item}']`));
    }

    protected lblAgentItem(item: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='advanced-address-book-other-ui advancedaddressbookmainui']//li[@data-teamname='${item}']`));
    }

    public static async getInstance(): Promise<MaxTransfer> {
        this._maxTransfer = new MaxTransfer();
        return this._maxTransfer;
    }

    /**
     * Filtering agent name in address book
     * @author Y.Le
     * @param {string} agentName
     * @returns {Promise<this>}
     * @memberof MaxTransfer
     */
    public async filterAgentNameAddressBook(agentName: string): Promise<MaxTransfer> {
        try {
            await Logger.write(FunctionType.UI, "Filtering agent name in address book");
            await this.txtSearchAgentAddressBook.type(agentName);
            await this.lblAgentName(agentName).waitForPresenceOf();
            await this.lblAgentName(agentName).waitForControlStable();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.filterAgentNameAddressBook, err.message);
        }
    }

    /**
     * Calling to agent from address book agent list
     * @author Y.Le
     * @param {string} agentName
     * @returns {Promise<this>}
     * @memberof MaxTransfer
     */
    public async callAgentFromAddressBook(agentName: string): Promise<MaxTransfer> {
        try {
            await Logger.write(FunctionType.UI, "Calling to agent from address book agent list");
            await this.lblAgentName(agentName).moveMouse();
            await this.btnCallAddressBook(agentName).wait();
            await this.btnCallAddressBook(agentName).moveMouse();
            await this.btnCallAddressBook(agentName).click();
            await this.pnlCallAgentSection(agentName).waitForVisibilityOf();
            return MaxTransfer.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.callAgentFromAddressBook, err.message);
        }
    }

    /**
     * Filtering agent name in address book
     * @author Tung.Vo
     * @param {string} skill
     * @returns {Promise<this>}
     * @memberof MaxCall
     */
    public async filterSkillAddressBook(skill: string): Promise<MaxTransfer> {
        try {
            await Logger.write(FunctionType.UI, "Filtering agent name in address book");
            await this.txtSearchAgentAddressBook.type(skill);
            await this.lblAgentName(skill).waitForControlStable();
            return MaxTransfer.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.filterSkillAddressBook, err.message);
        }
    }

    /* Calling to agent from address book agent list
    * @author Y.Le
    * @param {string} agentName
    * @returns {Promise<MaxTransfer>}
    * @memberof MaxTransfer
    */
    public async transferCallToAgentFromAddressBook(agentName: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Transferring call to agent from address book agent list");
            await this.lblAgentName(agentName).moveMouse();
            await this.btnTransferCallAddressBook(agentName).wait();
            await this.btnTransferCallAddressBook(agentName).moveMouse();
            await this.btnTransferCallAddressBook(agentName).click();
            await this.pnlCallAgentSection(agentName).waitForVisibilityOf();
        } catch (err) {
            throw new errorwrapper.CustomError(this.transferCallToAgentFromAddressBook, err.message);
        }
    }

    public async transferToAgentInAllAgentsTab(agentName: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Transferring call to agent from address book agent list");
            await this.lblAgentName(agentName).moveMouse();
            await this.btnTransferInAllAgentsTab(agentName).wait();
            await this.btnTransferInAllAgentsTab(agentName).moveMouse();
            await this.btnTransferInAllAgentsTab(agentName).click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.transferToAgentInAllAgentsTab, err.message);
        }
    }

    /**	
	 * Check if Address Book is displayed or not
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>}
	 * @memberof MaxTransfer
	 */
    public async isAddressBookDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.pnlAddressBook.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAddressBookDisplayed, err.message);
        }
    }

    /**
     * Calling to agent from address book agent list
     * @author Tung.Vo
     * @param {string} skillName
     * @returns {Promise<this>}
     * @memberof MaxCall
     */
    public async callSkillFromAddressBook(skillName: string): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Calling to agent from address book agent list");
            await this.lblAgentName(skillName).moveMouse();
            await this.btnCallAddressBook(skillName).wait();
            await this.btnCallAddressBook(skillName).moveMouse();
            await this.btnCallAddressBook(skillName).click();
            await this.pnlCallAgentSection(skillName).waitForVisibilityOf();
            return await this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.callSkillFromAddressBook, err.message);
        }
    }

    /* Opening my team tab in address book
    * Click cold transfer button
    * @author Tuan.Vu     
    * @returns {Promise<MaxPage>}
    * @memberof MaxTransfer
    */
    public async clickColdTransferButton(): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking cold transfer button");
            await this.btnColdTransfer.moveMouse();
            await this.btnColdTransfer.click();
            await this.divCallWorkspace.waitUntilDisappear();
            return await MaxPage.getMaxInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickColdTransferButton, err.message);
        }
    }

    /**
     * Click cold transfer button
     * @author Tuan.Vu     
     * @returns {Promise<MaxPage>}
     * @memberof MaxTransfer
     */
    public async coldTransferCallToAgent(agentName: string): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, `Cold transferring call to agent ${agentName}`);
            await this.filterAgentNameAddressBook(agentName);
            await this.transferCallToAgentFromAddressBook(agentName);

            // Add duration time for transfer call
            await BrowserWrapper.sleepInSecond(5);
            await this.clickColdTransferButton();
            return await MaxPage.getMaxInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.coldTransferCallToAgent, err.message);
        }
    }
    /**
     * Opening my team tab in address book
     * @author Nhat.Nguyen
     * @returns {Promise<this>}
     * @memberof MaxTransfer
     */
    public async openMyTabAddressBook(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Opening my team tab in address book");
            await this.tabMyTeamAddressBook.click();
            return await this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.openMyTabAddressBook, err.message);
        }
    }
    /**
     * Opening my other tab in address book
     * @author Lien.Nguyen
     * @returns {Promise<MaxTransfer>}
     * @memberof MaxTransfer
     */
    public async openOtherTab(): Promise<MaxTransfer> {
        try {
            await Logger.write(FunctionType.UI, "Opening other tab in address book");
            await this.tabOther.click();
            return await MaxTransfer.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.openOtherTab, err.message);
        }
    }
    /**
     * Checked agent result displayed
     * @author Nhat.Nguyen
     * @param {string} agentName
     * @returns {Promise<boolean>}
     * @memberof MaxTransfer
     */
    public async isAgentResultDisplayed(agentName: string, timeOut?: number): Promise<boolean> {
        try {
            return await this.lblAgentName(agentName).isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAgentResultDisplayed, err.message);
        }
    }

    /**
     * Check transfer conference control display
     *
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof MaxTransfer
     */
    public async isTransferConferenceControlsDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.pnlTransferConferenceControls.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTransferConferenceControlsDisplayed, err.message);
        }
    }

    /**
     * Check Consult and Initiate Transfer Sub menu displays or not
     * @author Chinh.Nguyen
     * @param {string} agentName
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof MaxTransfer
     */
    public async isConsultAndInitiateTransferSubmenuDisplayed(agentName: string, timeOut?: number): Promise<boolean> {
        try {
            return await this.pnlCallAgentSection(agentName).isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isConsultAndInitiateTransferSubmenuDisplayed, err.message);
        }
    }

    /**	
    * Select address book tab
    * @author Chinh.Nguyen
    * @param {TransferTab} tabName
    * @returns {Promise<MaxCall>}
    * @memberof MaxTransfer
    */
    public async selectAddressBookTab(tabName: TransferTab): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Selecting Address Book tab`);
            await this.tabAddressBook(tabName).click();
            return MaxCall.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectAddressBookTab, err.message);
        }
    }

    /**	
     * Select other address book tab item
     * @author Chinh.Nguyen
     * @param {TransferTab} itemName
     * @returns {Promise<MaxCall>}
     * @memberof MaxTransfer
     */
    public async selectOtherItem(itemName: OtherItem): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Selecting Other Address Book item`);
            await this.lblOtherItem(itemName).click();
            return MaxCall.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectOtherItem, err.message);
        }
    }

    /**
     * Check Skill list is displayed or not
     * @author Tan.Ta
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof MaxTransfer
     */
    public async isSkillListDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return this.skillListItems.isDisplayed(timeOut)
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectOtherItem, err.message);
        }
    }

    /**	
     * Select other skill item
     * @author Chinh.Nguyen
     * @param {TransferTab} itemName
     * @returns {Promise<MaxCall>}
     * @memberof MaxCall
     */
    public async selectOtherSkillItem(itemName: string): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Selecting Other skill item`);
            await this.lblSkillItem(itemName).moveMouse();
            await this.btnSkillCall(itemName).click();
            return MaxCall.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectOtherSkillItem, err.message);
        }
    }

    /**
     * Open Agent list of Skill
     * @author Tan.Ta
     * @param {string} itemName
     * @returns {Promise<MaxCall>}
     * @memberof MaxTransfer
     */
    public async openSkillItem(itemName: string): Promise<MaxTransfer> {
        try {
            await Logger.write(FunctionType.UI, `Selecting Other skill item`);
            await this.lblSkillItem(itemName).moveMouse();
            await this.btnRightArrow(itemName).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.openSkillItem, err.message);
        }
    }

    /**
   * Check agents assigned to the skill List is displayed or not
   * @author Tan.Ta
   * @param {number} [timeOut]
   * @returns {Promise<boolean>}
   * @memberof MaxTransfer
   */
    public async isListOfAgentsAssignedToTheSkillDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return this.listOfAgentsAssignedToTheSkillList.isDisplayed(timeOut)
        } catch (err) {
            throw new errorwrapper.CustomError(this.isListOfAgentsAssignedToTheSkillDisplayed, err.message);
        }
    }

    /**	
	* Select Transfer tab
	* @param {string} tabName
	* @returns {Promise<MaxVoiceMailPage>}
	* @memberof MaxVoiceMailPage
	*/
    public async selectTransferTab(tabName: TransferTab): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Selecting Transfer Tab");
            await this.tabTransfer(tabName).click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectTransferTab, err.message);
        }
    }

    /**
     * Select Main tab item
     * @author Tan.Ta
     * @param {string} item
     * @returns {Promise<void>}
     * @memberof MaxTransfer
     */
    public async selectMainTabItem(item: MainTransferTabItem): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Selecting Main Tab Item");
            await this.lblMainItem(item).click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectMainTabItem, err.message);
        }
    }

    public async selectAgentTabItem(item: AgentTransferTabItem): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Selecting Agent Tab Item");
            await this.lblAgentItem(item).click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectMainTabItem, err.message);
        }
    }


}