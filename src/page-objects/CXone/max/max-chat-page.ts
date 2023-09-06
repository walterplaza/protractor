import ProjectPath from "@test-data/general/project-path";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by, Key } from "protractor";
import TestRunInfo from "@data-objects/general/test-run-info";
import MaxPage from "./max-page";
import MaxTransfer from "./max-transfer-page";

export default class MaxChatPage extends MaxPage {

    private static _maxChatPage: MaxChatPage = null;

    protected btnEndChat = new ElementWrapper(by.xpath("//div[@class='chat-contact-ui chatcontactui' and @data-status='Active']//button[@class = 'end-contact']"));
    protected btnConfirmEndChatContact = new ElementWrapper(by.xpath("//div[@class='chat-contact-ui chatcontactui' and @data-status='Active']//button[@class='confirm-end-contact']"));
    protected txtInputMessage = new ElementWrapper(by.xpath("//div[@class='chat-contact-ui chatcontactui' and @data-status='Active']//div[contains(@class,'message-text-input')]"));
    protected txtInputMssGpu = new ElementWrapper(by.xpath("//div[@class='chat-contact-ui chatcontactui' and @data-status='Active']//div[@class='message-text-input']"));
    protected btnTransferContact = new ElementWrapper(by.xpath("//div[@class='contact-section']//button[@class='init-transfer-contact' or @class='transfer']"));

    protected lblClientChatMessage(clientName: string, chatMessage: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='message-header']/span[@title='${clientName}']/../following-sibling::p[@class='message-text' and @title='${chatMessage}']`));
    }

    public static getInstance(): MaxChatPage {
        this._maxChatPage = new MaxChatPage();
        return this._maxChatPage;
    }

    /**
     * End chat contact on MAX
     * @returns {Promise<MaxPage>} MaxPage
     * @memberof MaxChatPage
     */
    public async endChatContact(): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, "Ending chat contact");
            await this.btnEndChat.wait();
            await this.btnEndChat.click();
            await this.btnEndChat.waitUntilDisappear();
            await this.btnConfirmEndChatContact.click();
            await this.pnlChatWorkspace.waitUntilDisappear();
            let maxPage = require(`${ProjectPath.pageObjects}/inContact/max/max-page`).default;
            return await maxPage.getMaxInstance(false);
        } catch (err) {
            throw new errorwrapper.CustomError(this.endChatContact, err.message);
        }
    }

    /**
	 * Send Agent message
	 * @author Nhat.Nguyen
	 * @returns {Promise<MaxChatPage>} MaxChatPage
	 * @memberof MaxChatPage
	 */
    public async sendAgentMessage(agentMessage: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Sending Agent message");
            if (await this.txtInputMessage.isDisplayed(TestRunInfo.longTimeout)) {
                await this.txtInputMessage.waitForControlStable();
                await this.txtInputMessage.click();
                await this.txtInputMessage.sendKeys(agentMessage);
                await this.txtInputMessage.sendKeys(Key.ENTER);
            }
            else {
                await this.txtInputMssGpu.waitForControlStable();
                await this.txtInputMessage.click();
                await this.txtInputMssGpu.sendKeys(agentMessage);
                await this.txtInputMssGpu.sendKeys(Key.ENTER);
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.sendAgentMessage, err.message);
        }
    }

    /**
	 * Chat Message displayed or not
	 * @author Nhat.Nguyen
	 * @param {string} clientName
	 * @param {string} chatMessage
	 * @returns {Promise<boolean>}
	 * @memberof MaxChatPage
	 */
    public async isChatMessageDisplayed(clientName: string, chatMessage: string): Promise<boolean> {
        try {
            return await this.lblClientChatMessage(clientName, chatMessage).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isChatMessageDisplayed, err.message);
        }
    }

    /**	
    * Click on Transfer and Conference button
    * @author Y.Le
    * @returns {Promise<MaxTransfer>}
    * @memberof MaxCall
    */
    public async clickTransferConferenceButton(): Promise<MaxTransfer> {
        try {
            await this.btnTransferContact.click();
            return MaxTransfer.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickTransferConferenceButton, err.message);
        }
    }



}