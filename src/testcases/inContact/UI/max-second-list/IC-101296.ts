import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactLabel, ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 248696   
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101296", function () {

    TestBase.scheduleTestBase();
    let serverMail: string;
    let ibMail: InboundEmail;
    let ibEmailAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmailPage;
    let emptyEmailBody: string = "";
    let numberQueue: number;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101296 - MAX > Email > Reply to an Inbound Email with an empty email body`);

        // Pre-condition: setup agent and email
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL);
        await ibEmailAgent.createPhoneNumber();
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);
    }, TestRunInfo.conditionTimeout);

    it('IC-101296 - MAX Email Reply to an Inbound Email with an empty email body', async () => {

        // 1. Login page
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 3. Send an inbound email to configured POC (Basic Email No Attachments)        
        await Utility.sendIBEmail(serverMail, ibMail);

        // 4. On your MAX (While having your state as unavailable) Validate email is in queue 
        // VP: There are currently 1 email in queue
        numberQueue = await maxPage.getSkillQueue(ContactLabel.INBOUND_EMAIL);
        await maxPage.waitForQueueValue(ContactLabel.INBOUND_EMAIL, numberQueue + 1);
        expect(await maxPage.getSkillQueue(ContactLabel.INBOUND_EMAIL)).toBe(numberQueue + 1, "Inbound email is not routed to Agents Queue");

        // 5. Change your MAX Status to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: Email is automatically delivered to Agent and Email windows is displayed
        maxEmailPage = await maxPage.waitForEmailWorkspace();
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace does not display");

        // 6. Click on Reply button, enter empty email body and Send         
        await maxEmailPage.replyEmailWithContent(true, emptyEmailBody, true);

        // VP: Error message title and error message content are displayed     
        expect(await maxEmailPage.getErrorMessageTitle()).toBe("Email body is empty", "Error message title does not display");
        expect(await maxEmailPage.getErrorMessageContent()).toBe("You're trying to send an empty email. Please fill in the email body", "Error message content does not display");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {

            // Click on "Got it" button and End email
            await maxEmailPage.confirmError();
            await maxEmailPage.discardEmailDraft();
            await maxEmailPage.endEmailContact(false);

            // Logout
            await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});