import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export class ChatProfileDataTest {
    profileName: string
    interface: string
    enablePreChatForm: boolean;
    welcomeMessage: string
    fields: Array<Array<string>>;
    enableWaitingQueue: boolean;
    waitingMessage: string;

/**
 * Inititialize data for chat profile
 * @returns {ChatProfileDataTest} 
 * @memberof ChatProfileDataTest
 */
public initData(): ChatProfileDataTest {
        try {
            this.profileName = "lgvn_test";
            this.interface = "V2 (HTML5)";
            this.enablePreChatForm = true;
            this.welcomeMessage = "Hello World";
            this.fields = [["Single Line", "First Name", "Yes"], ["Single Line", "Last Name", "Yes"], ["Single Line", "Email Address", "Yes"], ["Single Line", "How can I help you?", "No"]];
            this.enableWaitingQueue = true;
            this.waitingMessage = "Taking few minutes to connect to agent ...";
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}