import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactLabel, ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { InboundEmail } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";
import { EmailButtonTitle, EmailMode } from "@data-objects/inContact/max/email/email-info";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 249407
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3, SC10, HC25
 */

describe("MAX suite - IC-62678", function () {

    TestBase.scheduleTestBase();
    let serverMail: string;
    let ibMail: InboundEmail;
    let ibEmailAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmailPage;
    let invalidEmail: string = Utility.createRandomString(10);
    let emailwithTrailingSpecialChar: string = "david.herrera@niceincontact.com>";
    let numberQueue: number;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62678 - MAX > Email > Forward Basic Inbound Email Invalid`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL);
        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);
    }, TestRunInfo.conditionTimeout);

    it('IC-62678 - MAX Email Forward Basic Inbound Email Invalid', async () => {

        // 2. Studio Standard Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailAgent);

        // 3. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);
        numberQueue = await maxPage.getSkillQueue(ContactLabel.INBOUND_EMAIL);

        // 4. Send an inbound email to your configured POC (Basic Email No Attachments)        
        await Utility.sendIBEmail(serverMail, ibMail);

        // 5. On your MAX (While having your state as unavailable) Validate email is in queue 
        // VP: There are currently 1 email in queue
        await maxPage.waitForQueueValue(ContactLabel.INBOUND_EMAIL, numberQueue + 1);
        expect(await maxPage.getSkillQueue(ContactLabel.INBOUND_EMAIL)).toBe(numberQueue + 1, "Inbound email is not routed to Agents Queue");

        // 6. Change your MAX Status to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // 7. Verify Email Routes to agent             
        // VP: Email is automatically delivered to Agent and Email windows is displayed
        maxEmailPage = await maxPage.waitForEmailWorkspace();
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email is not delivered");

        // 8. Click the "forward" icon. Input an invalid email address  
        // 9. Click the sent button       
        await maxEmailPage.forwardIBEmail(invalidEmail);

        // VP: Error states invalid email address
        expect(await maxEmailPage.getErrorMessageTitle()).toBe("Invalid email address", "Invalid email error message does not display");

        // 10. close confirm dialog  
        await maxEmailPage.confirmError();

        // 11. discard email draft
        await maxEmailPage.discardEmailDraft();

        // 12. Click on 'Reply' button 
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);

        // VP: Verify  the email is in edit mode and you can add text in the body and the original body of email continues to displayed completely.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "The email isn't in edit mode");
        
        // VP: Input an invalid email address by adding a trailing special char
        await maxEmailPage.enterToAddress(emailwithTrailingSpecialChar);        

        // 13. Click the sent button   
        await maxEmailPage.clickSend();

        // VP: Error states invalid email address.
        expect(await maxEmailPage.getErrorMessageContent()).toBe("One or more of the email addresses you entered is invalid. Please fix or remove them", "Invalid email error message does not display");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Clean up
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