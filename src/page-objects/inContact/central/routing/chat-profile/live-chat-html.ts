import TestRunInfo from '@data-objects/general/test-run-info';
import { FunctionType, Logger } from '@utilities/general/logger';
import BrowserWrapper from '@utilities/protractor-wrappers/browser-wrapper';
import ElementWrapper from '@utilities/protractor-wrappers/element-wrapper';
import { errorwrapper } from '@utilities/protractor-wrappers/error-wrapper';
import * as fs from 'fs';
import { by } from 'protractor';

export class LiveChatHTML {

    protected btnLiveChat = new ElementWrapper(by.xpath("//iframe[@id='icChat']"));
    protected pnlPreFormChat = new ElementWrapper(by.xpath("//div[@id='preChatForm']"));
    protected txtFirstName = new ElementWrapper(by.xpath("//*[@id='singleLine0']"));
    protected txtLastName = new ElementWrapper(by.xpath("//*[@id='singleLine1']"));
    protected txtEmailAddress = new ElementWrapper(by.xpath("//*[@id='singleLine2']"));
    protected txtHelp = new ElementWrapper(by.xpath("//*[@id='singleLine3']"));
    protected btnSubmit = new ElementWrapper(by.xpath("//button[@id='btnSubmit']"));
    protected divWaitingMessage = new ElementWrapper(by.xpath("//div[@id = 'waitingMessageWrap']"));
    protected btnMoveHere = new ElementWrapper(by.xpath("//a[@id = 'btnResume']"));
    protected lblResumeQues = new ElementWrapper(by.xpath("//p[@id='spanResumeQues']"));
    protected btnPopOut = new ElementWrapper(by.xpath("//span[@id='spanPopOut']"));
    protected btnPopIn = new ElementWrapper(by.xpath("//span[@id='spanPopIn']"));
    protected btnMinimize = new ElementWrapper(by.xpath("//span[@id='spanMinimize']"));

    private static _liveChat: LiveChatHTML = null;

    public static getInstance(): LiveChatHTML {
        this._liveChat = new LiveChatHTML();
        return this._liveChat;
    }

    /**
     * Injecting embedded code to html file
     * @param {string} filePath 
     * @param {string} embeddedCode 
     * @memberof LiveChatHTML
     */
    public injectEmbeddedCodeToHTML(filePath: string, embeddedCode: string): void {
        try {
            Logger.write(FunctionType.UI, "Injecting embedded code to html file");
            let htmlFile = fs.createWriteStream(filePath, { encoding: 'utf-8' });
            htmlFile.write(`<!DOCTYPE html>\n<html>\n<body>\n<h2>HTML Customer URL</h2>\n${embeddedCode}\n</body>\n</html>`);
        } catch (err) {
            throw new errorwrapper.CustomError(this.injectEmbeddedCodeToHTML, err.message);
        }
    }

    /**
     * Launching html local file on specific browser
     * @param {string} filePath 
     * @returns {Promise<string>} 
     * @memberof LiveChatHTML
     */
    public async launchHTMLFile(filePath: string): Promise<string> {
        try {
            Logger.write(FunctionType.UI, "Launching html local file on specific browser");
            let file: string;

            if (TestRunInfo.browser == "firefox" || TestRunInfo.browser == "internet explorer") {
                file = "file:///" + filePath;
            } else {
                file = filePath;
            }

            let handle: string = await BrowserWrapper.openNewTab(file);
            await this.btnLiveChat.wait();
            await this.btnLiveChat.waitForControlStable();
            return handle;
        } catch (err) {
            throw new errorwrapper.CustomError(this.launchHTMLFile, err.message);
        }
    }
    /**
     * Opening pre-chat form 
     * @returns {Promise<this>} 
     * @memberof LiveChatHTML
     */
    public async openPreChatForm(): Promise<this> {
        try {
            Logger.write(FunctionType.UI, "Clicking on Live Chat button");
            await this.btnLiveChat.click();
            await BrowserWrapper.switchToFrame(0);
            return await this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.openPreChatForm, err.message);
        }
    }

    /**
     * Filling Pre-Chat Chat Form
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} email 
     * @param {string} help 
     * @returns {Promise<this>} 
     * @memberof LiveChatHTML
     */
    public async fillPreChatForm(firstName: string, lastName: string, email: string, help: string): Promise<this> {
        try {
            Logger.write(FunctionType.UI, "Filling Pre-Chat Chat Form");

            await this.txtFirstName.type(firstName);
            await this.txtLastName.type(lastName);
            await this.txtEmailAddress.type(email);
            await this.txtHelp.type(help);
            return await this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillPreChatForm, err.message);
        }
    }

    /**
     * Submitting PreChat Form 
     * @returns {Promise<void>} 
     * @memberof LiveChatHTML
     */
    public async submitPreChatForm(): Promise<void> {
        try {
            Logger.write(FunctionType.UI, "Submitting PreChat Form");
            await this.btnSubmit.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.submitPreChatForm, err.message);
        }
    }

    /**
     * Connecting Customer with Agent
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} email 
     * @param {string} help 
     * @returns {Promise<void>} 
     * @memberof LiveChatHTML
     */
    public async connectCustomerToAgent(firstName: string, lastName: string, email: string, help: string): Promise<void> {
        try {
            Logger.write(FunctionType.UI, "Connecting Customer with Agent");
            await this.openPreChatForm();
            await this.fillPreChatForm(firstName, lastName, email, help);
            await this.submitPreChatForm();
        } catch (err) {
            throw new errorwrapper.CustomError(this.connectCustomerToAgent, err.message);
        }
    }

    /**
     * Moving chat session to another tab
     * @returns {Promise<this>} 
     * @memberof LiveChatHTML
     */
    public async moveChatSession(): Promise<this> {
        try {
            Logger.write(FunctionType.UI, "Moving Chat session to another tab");
            await this.btnMoveHere.click();
            return await this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.moveChatSession, err.message);
        }
    }

    public async isLiveChatButtonDisplayed(): Promise<boolean> {
        try {
            return await this.btnLiveChat.isDisplayed()
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLiveChatButtonDisplayed, err.message);
        }
    }

    public async isPreChatFormDisplayed(): Promise<boolean> {
        try {
            return await this.pnlPreFormChat.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPreChatFormDisplayed, err.message);
        }
    }

    public async isWaitingMessageDisplayed(): Promise<boolean> {
        try {
            return await this.divWaitingMessage.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isWaitingMessageDisplayed, err.message);
        }
    }

    /**
     * Getting move screen chat session text
     * @returns {Promise<string>} 
     * @memberof LiveChatHTML
     */
    public async getMoveScreenText(): Promise<string> {
        try {
            Logger.write(FunctionType.UI, "Getting move screen chat session text");
            return await this.lblResumeQues.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getMoveScreenText, err.message);
        }
    }

    /**
     * Waiting for waiting message disappear
     * @returns {Promise<void>} 
     * @memberof LiveChatHTML
     */
    public async waitForWaitingMessageDisappear(): Promise<void> {
        try {
            await this.divWaitingMessage.waitUntilDisappear();
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForWaitingMessageDisappear, err.message);
        }
    }

    /**
     * Click on pop out button
     * @returns {Promise<void>}
     * @memberof LiveChatHTML
     */
    public async clickPopOut(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on Pop out button`);
            let lengthHandles: number = await BrowserWrapper.getTotalWindows();
            await BrowserWrapper.switchToFrame(0);
            await BrowserWrapper.executeScript(`document.getElementById('spanPopOut').click();`);
            await BrowserWrapper.waitForNumberOfWindows(lengthHandles + 1);
            let newHandle: string = await BrowserWrapper.getNewWindowHandle();
            await BrowserWrapper.switchWindowByHandle(newHandle);
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickPopOut, err.message);
        }
    }

    /**
     * Check Minimize button is displayed or not 
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof LiveChatHTML
     */
    public async isMinimizeButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnMinimize.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isMinimizeButtonDisplayed, err.message);
        }
    }

    /**
     * Check Pop in button is displayed or not 
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof LiveChatHTML
     */
    public async isPopInButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnPopIn.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPopInButtonDisplayed, err.message);
        }
    }

}