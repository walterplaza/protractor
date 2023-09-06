import { ChatProfileDataTest } from "@data-objects/inContact/central/routing/chat-profile/chat-profile-data";
import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";

export default class CreateNewChatProfilePage extends NavigationBar {

    private static _createNewChatProfilePage: CreateNewChatProfilePage = null;

    public static getInstance(): CreateNewChatProfilePage {
        this._createNewChatProfilePage = new CreateNewChatProfilePage();
        return this._createNewChatProfilePage;
    }

    protected btnRevertToLastSaved = new ElementWrapper(by.xpath("//button[contains(@id,'btnResetToDefault_ShadowButton')]"));
    protected btnSave = new ElementWrapper(by.xpath("//button[contains(@id,'btnSave_ShadowButton')]"));
    protected btnCancel = new ElementWrapper(by.xpath("//button[contains(@id,'btnCancel_ShadowButtonSpan')]"));
    protected txtFieldName = new ElementWrapper(by.xpath("//input[contains(@id,'Content_txtName')]"));
    protected tabAppearance = new ElementWrapper(by.xpath("//span[contains(@id,'pnlAppearance_tab')]"));
    protected tabPreChatForm = new ElementWrapper(by.xpath("//span[contains(@id,'pnlPreChat_tab')]"));
    protected tabWaitingQueue = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_ctrlChatProfileDetailsEditV2_TabContainer_pnlWaitingQueue_tab']"));
    protected enablePreChatFormCheckbox = new ElementWrapper(by.xpath("//input[contains(@id,'pnlPreChat_chkEnablePreChat')]"));
    protected txtWelcomeMessage = new ElementWrapper(by.xpath("//textarea[contains(@id,'txtWelcomeMessage')]"));
    protected btnAddDynamicControls = new ElementWrapper(by.xpath("//button[contains(@id,'btnAddDynamicControls_ShadowButton')]"));
    protected clsDynamicLabel = new ElementWrapper(by.xpath("//input[@class = 'Label clsDynamicLabel']"));
    protected chkEnableWaitingQueue = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_ctrlChatProfileDetailsEditV2_TabContainer_pnlWaitingQueue_chkEnableWaitingQueue']"));
    protected txtWaitingMessage = new ElementWrapper(by.xpath("//textarea[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_ctrlChatProfileDetailsEditV2_TabContainer_pnlWaitingQueue_txtWaitingMessage']"));
    protected dropInterface = new SelectElementWrapper(by.xpath("//select[contains(@id,'ddlInterfaceVersion')]"));

    // Dynamic controls
    protected btnDynamicControls(index: number): SelectElementWrapper {
        return new SelectElementWrapper(by.xpath(`(//select[contains(@id,'ctl01_ddlFiledType')])[${index}]`));
    }

    protected lblclsDynamicLabel(index: number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//tr[@class="dynamicTr"][${index}]//td/input[@class="Label clsDynamicLabel"]`));
    }

    protected lblClsRequiredItem(index: number): SelectElementWrapper {
        return new SelectElementWrapper(by.xpath(`(//select[contains(@id, 'ptPreChatDynamicControls_ctl01_ddlRequired')])[${index}]`));
    }
    /**
     * Editting chat profile
     * @param {ChatProfileDataTest} chatProfileData 
     * @returns {Promise<this>} 
     * @memberof CreateNewChatProfilePage
     */
    public async editChatProfile(chatProfileData: ChatProfileDataTest): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Editting chat profile");
            await this.editChatProfileName(chatProfileData.profileName, chatProfileData.interface);
            await this.editPreChatForm(chatProfileData.enablePreChatForm, chatProfileData.welcomeMessage, chatProfileData.fields);
            await this.editWaitingQueue(chatProfileData.enableWaitingQueue, chatProfileData.waitingMessage);
            return await this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editChatProfile, err.message);
        }
    }
    /**
     * Editting chat profile name
     * @param {string} name 
     * @param {string} interfaces 
     * @returns {Promise<this>} 
     * @memberof CreateNewChatProfilePage
     */
    public async editChatProfileName(name: string, interfaces: string): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Editting chat profile name");
            if (name != "") {
                this.txtFieldName.type(name);
            }
            if (interfaces != "") {
                this.dropInterface.selectOptionByText(interfaces);
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editChatProfileName, err.message);
        }
    }
    /**
     * Editting pre-chat form
     * @param {boolean} enablePreChatCheckbox 
     * @param {string} msgWelcome 
     * @param {*} addFields 
     * @returns {Promise<this>} 
     * @memberof CreateNewChatProfilePage
     */
    public async editPreChatForm(enablePreChatCheckbox: boolean, msgWelcome: string, addFields: any): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Editting pre-chat form");
            await this.tabPreChatForm.click();

            let isEnablePreChatFormChecked: boolean = await Boolean(await BrowserWrapper.executeScript("return document.getElementById('ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_ctrlChatProfileDetailsEditV2_TabContainer_pnlPreChat_chkEnablePreChat').checked"));

            if (enablePreChatCheckbox == true) {
                if (isEnablePreChatFormChecked == false) {
                    await this.enablePreChatFormCheckbox.click();
                }
            } else {
                if (isEnablePreChatFormChecked) {
                    await this.enablePreChatFormCheckbox.click();
                }
            }

            if (msgWelcome != "") {
                await this.txtWelcomeMessage.type(msgWelcome);
            }

            if (addFields != undefined || "") {
                for (let i: number = 1; i < addFields.length + 1; i++) {
                    await this.btnAddDynamicControls.click();
                    await this.fillPreChatFormFields(addFields[i - 1][0], addFields[i - 1][1], addFields[i - 1][2], i);
                }
            }

            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editPreChatForm, err.message);
        }
    }
    /**
     * Editting waiting queue
     * @param {boolean} enableWaitingQueueBox 
     * @param {string} [msgWaitingQueue] 
     * @returns {Promise<this>} 
     * @memberof CreateNewChatProfilePage
     */
    public async editWaitingQueue(enableWaitingQueueBox: boolean, msgWaitingQueue?: string): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Editting waiting queue");
            await this.tabWaitingQueue.click();

            let isEnableWaitingQueue: boolean = await Boolean(await BrowserWrapper.executeScript("return document.getElementById('ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_ctrlChatProfileDetailsEditV2_TabContainer_pnlWaitingQueue_chkEnableWaitingQueue').checked"));

            if (enableWaitingQueueBox == true) {
                if (isEnableWaitingQueue == false) {
                    await this.chkEnableWaitingQueue.click();
                }
            } else {
                if (isEnableWaitingQueue) {
                    await this.chkEnableWaitingQueue.click();
                }
            }

            if (msgWaitingQueue != "") {
                await this.txtWaitingMessage.type(msgWaitingQueue);
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editWaitingQueue, err.message);
        }
    }
    /**
     * Filling pre-chat form
     * @param {string} fieldType 
     * @param {string} label 
     * @param {string} required 
     * @param {number} index 
     * @returns {Promise<this>} 
     * @memberof CreateNewChatProfilePage
     */
    public async fillPreChatFormFields(fieldType: string, label: string, required: string, index: number): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Filling pre-chat form");
            await this.btnDynamicControls(index).selectOptionByTextWithIndex(fieldType, index);
            await this.lblclsDynamicLabel(index).type(label);
            await this.lblClsRequiredItem(index).selectOptionByTextWithIndex(required, index);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillPreChatFormFields, err.message);
        }
    }

    /**
     * Saving chat profile
     * @returns {Promise<this>} 
     * @memberof CreateNewChatProfilePage
     */
    public async saveChatProfile(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Saving chat profile");
            await this.btnSave.click();
            await this.btnSave.waitUntilDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.saveChatProfile, err.message);
        }
    }
}
