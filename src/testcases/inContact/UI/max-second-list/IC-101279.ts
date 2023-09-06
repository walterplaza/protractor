import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { EmailButtonTitle, EmailParkMode } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 291485
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101279", function () {
    TestBase.scheduleTestBase();
    let serverMail: string;
    let ibMail: InboundEmail;
    let emailJson: string = `{"emailParking":true}`;
    let ibEmailAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let emailContactId: number;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101279 - Unparked Email in Personal Queue - Click NO`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson, TestRunInfo.longTimeout);

        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);

        // 1. Central Login
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
        await TestCondition.editEmailParkingMode(ibEmailAgent, State.ON);

    }, TestRunInfo.conditionTimeout);

    it('IC-101279 - MAX- Unparked Email in Personal Queue - Click NO', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 3. Send an Inbound Email 
        await Utility.sendIBEmail(serverMail, ibMail);
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Email is Routed to the Agent 
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The IB Email Contact doesn't deliver to Agent");

        // 4. Click Park Email 
        await maxEmailPage.selectEmailButton(EmailButtonTitle.PARK_EMAIL);
        emailContactId = await CustomAPIs.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));

        // VP: Email is Parked 
        await maxEmailPage.waitForParkedEmailDisplays(emailContactId, true);
        expect(await maxEmailPage.isEmailParked(emailContactId)).toBe(true, "Emails doesn't park")

        // 5. Set Agent State to Unavailable 
        await maxPage.showMaxGlance();
        await maxPage.changeState(MaxState.UNAVAILABLE);

        //VP:Agent State is Unavailable 
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.UNAVAILABLE, "Agent status is not Unavailable");

        //6. Click the email and Unpark Move to queue
        await maxPage.hideMaxGlance
        await maxEmailPage.unparkEmail(EmailParkMode.UNPARK_MOVE_TO_QUEUE, emailContactId);

        //VP:Email is moved to the Personal Queue of the Agents after unparking
        await maxPage.showMaxGlance();
        expect(await maxPage.isPersonalQueueContactDisplayed()).toBe(true, "Failed by ticket 438302 - [TestAutomation][inC-UI] Email is not stored in personal queue when the agent's state is unavailable and email was sent to agent.");

        //7. Log off the agent > Click No on the Requeue Personal Queue Items 
        await maxPage.logOut(true);

        //VP Verify the Email is Requeued
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);
        expect(await maxPage.isPersonalQueueContactDisplayed()).toBe(true, "Failed by ticket 438302 - [TestAutomation][inC-UI] Email is not stored in personal queue when the agent's state is unavailable and email was sent to agent.");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await maxPage.changeState(MaxState.AVAILABLE);
            maxEmailPage = await maxPage.waitForEmailWorkspace();
            await maxEmailPage.endEmailContact();
            await maxPage.logOut();

            // Logout InContact
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});