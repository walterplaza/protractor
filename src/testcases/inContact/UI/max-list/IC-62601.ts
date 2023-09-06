import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { InboundEmail } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 422767
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 * Bug: IC-40243 [TestAutomation][inC-UI] IB Phone takes long time to interrupt IB or OB Email (HC25)
 */

describe("MAX suite - IC-62601", function () {

    TestBase.scheduleTestBase();
    let serverMail: string;
    let emailJson: string = `{"initialPriority":0,"interruptible":true}`;
    let phoneJson: string = `{"initialPriority":0}`;
    let ibMail: InboundEmail;
    let ibEmailPhoneAgent: Agent;

    //Declare page object
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let ibPhoneAgent: Agent;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62601 - MAX> SCH> Email> Verify the Email workspace resizes correctly when we have an Email and Phone Contact delivers in Agent`);

        ibEmailPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson);
        await TestCondition.setUpAndAssignSkill(ibEmailPhoneAgent, SkillType.IB_Phone, null, null, phoneJson);
        ibPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, null, null, phoneJson);

        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailPhoneAgent, SkillType.IB_EMAIL);

        // Login Incontact
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailPhoneAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62601 - MAX SCH Email Verify the Email workspace resizes correctly when we have an Email and Phone Contact delivers in Agent', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailPhoneAgent.phoneNumber);

        // 3. Set the Available status in agent.
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: The agent has the available state
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.AVAILABLE, "The agent hasn't the available state");

        // 4. Generate the IB Email Contact 
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Verify the IB Email Contact delivers in Agent
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The IB Email Contact doesn't deliver in Agent");

        // 5. Generate the IB/OB Phone Contact
        await TestHelpers.startInboundCall(ibPhoneAgent);
        maxCall = await maxPage.waitForCallWorkspace(TestRunInfo.longTimeout*5);
        await maxCall.waitForCallDialling();

        // VP: Verify the Phone automatically is delivered in the Agent, after the time configured to interrupt the email passed
        expect(await maxCall.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "Failed by ticket IC-40243 - [TestAutomation][inC-UI] IB Phone takes long time to interrupt IB or OB Email (HC25)");

        // 6. Go to “Glance” and select the Email contact. 
        await maxCall.showMaxGlance();
        await maxPage.selectMAXActiveContact(ContactName.EMAIL);

        // VP: Verify the Email workspace is displayed completely.It has a label in the header: Email Interrupted
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The Email workspace isn't displayed completely");
        expect(await maxEmailPage.isEmailInterruptedHeaderDisplayed()).toBe(true, "Email doesn't have a label in the header: Email Interrupted");

        // 7. Go to “Glance” and select the Phone contact. 
        await maxCall.showMaxGlance();
        await maxPage.selectMAXActiveContact(ContactName.PHONE_CALL);

        // VP: Verify the Phone workspace is displayed completely.
        expect(await maxCall.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "The Phone workspace isn't displayed completely");

        // 8. Hang up the call 
        await maxCall.endCallContact();

        // VP: Verify the call contact has been finished and the Email workspace is displayed completely.
        expect(await maxCall.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "The call contact hasn't been finished");
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The Email workspace isn't displayed completely");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout MAX
            maxPage = await maxEmailPage.endEmailContact(false);
            centralPage = await maxPage.logOut();

            // Logout InContact
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(ibEmailPhoneAgent, SkillType.IB_Phone);
                await TestCondition.setAgentSkillsToDefault(ibEmailPhoneAgent, SkillType.IB_EMAIL);
                await TestCondition.setAgentSkillsToDefault(ibPhoneAgent, SkillType.IB_Phone);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});