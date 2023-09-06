import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
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
 * TC ID: 392876
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3, SC10, HC25
 */

describe("MAX suite - IC-62624", function () {

    TestBase.scheduleTestBase();
    let serverMail: string;
    let ibMail: InboundEmail;
    let ibEmailNonReqAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmailPage;
    let dispositionNote: string = "Test Automation";
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62624 - Max Contacts get stuck in acw state - Email - Forward the email- Non-Required Dispo`);
        ibEmailNonReqAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, false);
        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailNonReqAgent, SkillType.IB_EMAIL);
    }, TestRunInfo.conditionTimeout);

    it("IC-62624 - Max Contacts get stuck in acw state Email Forward the email NonRequired Dispo", async () => {

        // 1. PREREQ: User logged into Central. Max running and Available with Email Skill that has Non-Required Disposition

        // Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailNonReqAgent);

        // Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailNonReqAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // 2.Run an inbound Email Contact      
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Contact is delivered to MAX
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "MAX does not open email");

        // 3. Forward the email. Close the contact
        await maxEmailPage.forwardIBEmail();

        // VP: Disposition window opens
        maxDispositionPage = new MaxDispositionPage();
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition window does not open");

        // 4. Select a Disposition and Save the Dispo
        await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

        // VP: Connection window closes. Agent returns to Available
        await maxPage.waitACWDisappear(TestRunInfo.longTimeout);
        expect(await maxDispositionPage.isDispositionFormDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Disposition window still displays");
        expect(await maxPage.getStateStatus()).toBe(MaxState.AVAILABLE, "Agent does not return to Available");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout
            await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailNonReqAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});