import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
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
 * TC ID: 394802 
 * Tested browser: Chrome, Firefox
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe("MAX suite - IC-62621", function () {
    TestBase.scheduleTestBase();
    let ibEmailAgent_1: Agent;
    let ibEmail_Subject: string = "Test case IC-62621";
    let ibEmail_Content: string = "Test Automation";
    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmailPage;
    let ibEmail: InboundEmail;
    let serverMail: string;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, "IC-62621 - MCH > MAX > Email > Email body displays their content when is received and when is replied");
        ibEmailAgent_1 = await TestCondition.setUpAgent(SkillType.IB_EMAIL);

        // 1. Pre-requisites
        ibEmail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibEmail.initData(ibEmailAgent_1, SkillType.IB_EMAIL, ibEmail_Subject, ibEmail_Content);

        // Login Central Page
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailAgent_1);

    }, TestRunInfo.conditionTimeout);

    it("IC-62621 - MCH MAX Email Email body displays their content when is received and when is replied", async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent_1.phoneNumber);

        // 3. Set the agent 'Available'
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: Agent is "Available"
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Agent is not 'Available'")

        // 4. Send an Email using the POC, and accept it
        await Utility.sendIBEmail(serverMail, ibEmail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Email body displays their content
        expect(await maxEmailPage.getEmailContentInReadMode()).toBe(ibEmail.text, "Email content is not displayed");

        // 5. Reply the Email by click on 'Reply' button
        maxEmailPage = await maxEmailPage.clickReplyButton()

        // VP: Email body displays the content below the reply section
        expect(await maxEmailPage.isEmailContentDisplayed(ibEmail.text)).toBe(true, "Email body doesn't displays the content correctly");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Log out max and central pages
            await maxEmailPage.discardEmailDraft();
            await maxEmailPage.endEmailContact();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (error) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent_1, SkillType.IB_EMAIL);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
});