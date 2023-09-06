import { Agent } from "@data-objects/general/agent";
import { Cluster, MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName, DispositionName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { InboundEmail } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 395640
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe("MAX suite - IC-62620", function () {
    TestBase.scheduleTestBase();
    let cluster: Cluster = TestRunInfo.cluster;
    let ibEmailRq1Agent: Agent;
    let ibMail: InboundEmail;
    let serverMail: string;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmailPage;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62620 - Email > Disposition > Not able to disposition contact - Required Disposition`);
        ibEmailRq1Agent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, true);
    }, TestRunInfo.conditionTimeout);

    it('IC-62620 - Email Disposition Not able to disposition contact - Required Disposition', async () => {

        // 1. Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailRq1Agent);

        // 2. Set Status of Agent to Available
        maxPage = await centralPage.launchMAX(ibEmailRq1Agent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: Set without issue
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Agent status does not change to Available");

        // 3. Create inbound email. Send to to Agent using skill with required Dispo.
        ibMail = new InboundEmail();
        serverMail = cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailRq1Agent, SkillType.IB_EMAIL);
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: MAX opens email
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace is not displayed")

        // 4. End the email.
        maxDispositionPage = await maxEmailPage.endEmailWithDisposition();

        // VP: Disposition window opens. fields are usable
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition window does not open");

        // 5. Complete the Disposition window, click Save and Close
        await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, "Automation_Test");

        // VP: When the ACW times out, the contact closes.
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "Email workspace is still displayed")
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        // Clean up
        try {
            // Logout
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailRq1Agent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});