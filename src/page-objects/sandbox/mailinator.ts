import { FunctionType, Logger } from '@utilities/general/logger';
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export class Mailinator {

    private static _mailinator: Mailinator = null;

    protected emailActivate = new ElementWrapper(by.xpath("//div[@class='all_message-min']"));
    protected activateLink = new ElementWrapper(by.xpath("//a[text()='Activate Account']"));
    protected messageIframe = new ElementWrapper(by.xpath("//iframe[@id='msg_body']"));

    // Dynamic controls
    protected lblEmailActivateLink(email: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//td[@class='bodyContent']/a[contains(@href,'${email}')]`));
    }

    constructor() { }

    public static getInstance(): Mailinator {
        // this._mailinator = (this._mailinator == null) ? new Mailinator() : this._mailinator;
        this._mailinator = new Mailinator();
        return this._mailinator;
    }
    /**
     * Go to mailinator and activate new employee based on email.
     * @param {string} email email address to activate new employee
     * @returns {Promise<string>} activation link
     * @memberof Mailinator
     */
    public async getActivateLink(email: string): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting Activation Link");
            let posEmail = email.indexOf("@");
            let emailName = email.substr(0, posEmail);
            let mailinatorURL = "https://www.mailinator.com/v2/inbox.jsp?zone=public&query=" + emailName;
            await BrowserWrapper.get(mailinatorURL);
            await BrowserWrapper.maximize();
            await this.emailActivate.click();
            await BrowserWrapper.switchToFrame(1);
            let emailLink: string = await this.lblEmailActivateLink(email).getAttribute("href");
            await BrowserWrapper.close();
            return emailLink;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getActivateLink, err.message);
        }
    }
}
