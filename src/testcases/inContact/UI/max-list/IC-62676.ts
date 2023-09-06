import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactLabel, ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { InboundEmail } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { EmailButtonTitle, EmailMode } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 249412
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe("MAX suite - IC-62676", function () {
    TestBase.scheduleTestBase();
    let ibEmailAgent: Agent;
    let validEmail: string = "valid_email@email.com";
    let serverMail: string;
    let numberQueue: number;
    let emailSubject: string;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmailPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62676 - MAX > Email > Basic Inbound Email Required Disposition`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL);

        // 2. Studio Standard Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62676 - MAX Email Basic Inbound Email Required Disposition', async () => {

        // 3. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);
        numberQueue = await maxPage.getSkillQueue(ContactLabel.INBOUND_EMAIL);

        // 4. Send an inbound email to your configured POC (Basic Email No Attachments)
        let ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);
        await Utility.sendIBEmail(serverMail, ibMail);

        // 5. On your MAX (While having your state as unavailable) Validate email is in queue 
        // VP: There are currently 1 email in queue        
        await maxPage.waitForQueueValue(ContactLabel.INBOUND_EMAIL, numberQueue + 1);
        expect(await maxPage.getSkillQueue(ContactLabel.INBOUND_EMAIL)).toBe(numberQueue + 1, "Inbound email is not routed to Agents Queue");

        // 6. Change your MAX Status to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: Email is automatically delivered to Agent and Email windows is displayed
        maxEmailPage = await maxPage.waitForEmailWorkspace();
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email is not delivered");

        // 7. Verify Email Routes to agent
        // VP: Email window opens and the display mode is read
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "Email is not in read mode");

        // 8. Click the "forward" icon
        await maxEmailPage.selectEmailButton(EmailButtonTitle.FORWARD);

        // VP: Email panel opens to forward settings and it is possible to edit the email. Input a valid email address
        emailSubject = await maxEmailPage.getEmailSubject();
        expect(await emailSubject.startsWith("FW:")).toBe(true, "Email does not open to forward setting");
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "Email is not in edit mode");
        await maxEmailPage.enterToAddress(validEmail);

        // 9. Click on "Discard Draft" button                
        await maxEmailPage.discardEmailDraft(true);

        // VP: Verify the the email entered is lost and the Email window is in mode to read.
        expect(await maxEmailPage.getToAddressValue() != validEmail).toBe(true, "Email entered is lost");
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "Email is not in read mode");

        // 10. Click on "End Email" button
        await maxEmailPage.endEmailContact(false);

        // VP: Verify after to accept in the pop up displays, the Email is closed and the Agent is in available status.
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "Email workspace is still displayed");;
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Agent status is not in available status");

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

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