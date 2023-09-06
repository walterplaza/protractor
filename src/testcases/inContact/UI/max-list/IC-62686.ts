import { Agent } from "@data-objects/general/agent";
import { Cluster, MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
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

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 249265
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe("MAX suite - IC-62686", function () {

    TestBase.scheduleTestBase();
    let cluster: Cluster = TestRunInfo.cluster;
    let ibEmailAgent: Agent;
    let ibMail: InboundEmail;
    let serverMail: string;

    // Declare page object
    let loginPage: LoginPage
    let centralPage: CentralPage
    let maxPage: MaxPage
    let maxEmailPage: MaxEmailPage

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62686 - MAX> Personal Queue> Email> Personal Queue IB Email`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, true);
    }, TestRunInfo.conditionTimeout);

    it('IC-62686 - MAX Personal Queue Email Personal Queue IB Email', async () => {

        // 2. Launch MAX
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 3. Place agent state to unavailable
        await maxPage.changeState(MaxState.UNAVAILABLE);

        // VP: Agent state unavailable
        expect(await maxPage.getAgentStatus()).toBe(MaxState.UNAVAILABLE, "Agent status doesn't change to Unavailable");

        // 4. Send ib email to address From the email POC in the requirements
        ibMail = new InboundEmail();
        serverMail = cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);
        await Utility.sendIBEmail(serverMail, ibMail);

        // VP: Email sent to agent
        expect(await maxPage.isContactInQueue(ContactName.EMAIL)).toBe(true, "IB email contact is not in queue");

        // 5. Verify email is in agents Glance view
        // VP: Email is in personal queue
        expect(await maxPage.isPersonalQueueContactDisplayed()).toBe(true, "Email is not moved to the Personal Queue");

        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();
        maxPage = await maxEmailPage.endEmailContact(false);
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        // Clean up
        try {
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});