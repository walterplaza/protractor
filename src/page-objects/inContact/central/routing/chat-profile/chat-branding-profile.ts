import { ChatProfileDataTest } from "@data-objects/inContact/central/routing/chat-profile/chat-profile-data";
import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import CreateNewChatProfilePage from "@page-objects/inContact/central/routing/chat-profile/create-new-chat-profile";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class ChatBrandingProfilePage extends NavigationBar {

    private static _chatBrandingProfilePage: ChatBrandingProfilePage = null;

    public static getInstance(): ChatBrandingProfilePage {
        this._chatBrandingProfilePage = new ChatBrandingProfilePage();
        return this._chatBrandingProfilePage;
    }

    protected btnCreateNew = new ElementWrapper(by.xpath("//button[contains(@id,'btnCreateNewInAdvancedGridView_ShadowButton')]"));
    protected btxSearchChatProfile = new ElementWrapper(by.xpath("//input[contains(@id,'agvsChatProfiles_tbxSearchText')]"));
    protected btnSearchIcon = new ElementWrapper(by.xpath("//input[contains(@id,'agvsChatProfiles_btnSearch')]"));

    // Dynamic controls
    protected lblChatProfileItem(chatProfileName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//tr[.//td[text()='${chatProfileName}']]`));
    }

    /**
     * Click to Create New button to open Create New Chat Profile page
     * 
     * @returns {Promise<CreateNewChatProfilePage>} 
     * @memberof ChatBrandingProfilePage
     */
    public async createNewChatProfile(): Promise<CreateNewChatProfilePage> {
        try {
            await Logger.write(FunctionType.UI, 'Create new Chat Profile');
            await this.btnCreateNew.click();
            await this.btnCreateNew.waitUntilDisappear();
            return await CreateNewChatProfilePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.createNewChatProfile, err.message);
        }
    }
    /**
     * Search Chat Profile by Name
     * 
     * @param {string} chatProfileName 
     * @returns {Promise<this>} 
     * @memberof ChatBrandingProfilePage
     */
    public async searchChatProfile(chatProfileName: string): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, 'Search Chat Profile');
            await this.btxSearchChatProfile.type(chatProfileName);
            await this.btnSearchIcon.click();
            return await this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchChatProfile, err.message);
        }
    }
    /**
     * Check a Chat Profile is existed
     * 
     * @param {string} chatProfileName 
     * @returns {Promise<boolean>} 
     * @memberof ChatBrandingProfilePage
     */
    public async isChatProfileExisted(chatProfileName: string): Promise<boolean> {
        try {
            await Logger.write(FunctionType.UI, "Check a Chat Profile is existed")
            let resultList = await this.searchChatProfile(chatProfileName);
            return await resultList.lblChatProfileItem(chatProfileName).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isChatProfileExisted, err.message);
        }
    }

    public async createChatProfileDefault(data: ChatProfileDataTest): Promise<CreateNewChatProfilePage | ChatBrandingProfilePage> {
        try {
            if (!this.isChatProfileExisted(ChatProfileDataTest.name)) {
                let chatProfileDefault = await this.createNewChatProfile();
                await chatProfileDefault.editChatProfile(data);
                return await chatProfileDefault.saveChatProfile();
            }
            else {
                return await this;
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.createChatProfileDefault, err.message);
        }
    }


}
