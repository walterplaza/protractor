    import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { InboundEmail } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { EmailButtonTitle } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 423369
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11
 */

describe("MAX suite - IC-62599", function () {

    TestBase.scheduleTestBase();
    let ibEmailAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let ibMail: InboundEmail;
    let serverMail: string;
    let maxEmailPage: MaxEmail;

    beforeEach(async () => {
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL);

        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);
        await Utility.sendIBEmail(serverMail, ibMail);
    }, TestRunInfo.conditionTimeout);

    it('IC-62599 - MAX Email Email replies options', async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62599 - [MAX] [Email] Email replies options`);

        loginPage = new LoginPage();

        // 2. Launch MAX
        centralPage = await loginPage.loginInContact(ibEmailAgent);
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 3. Send an Email to the agent, and accept it
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Email is accepted
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace is not displayed")

        // 4. Click on 'Reply' button 
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);

        // VP: Verify that the Email Body is being displayed
        expect(await maxEmailPage.isEmailBodyDisplayed()).toBe(true, "The Email Body isn't displayed");
        expect(await maxEmailPage.isToAddressContentPopulated()).toBe(true, "'To' field isn't populated");

        // 5. Cancel the reply. once the page returns to the original email click Reply All
        await maxEmailPage.discardEmailDraft();
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY_ALL);

        // VP: Verify that the Email Body is being displayeds
        expect(await maxEmailPage.isEmailBodyDisplayed()).toBe(true, "The Email Body isn't displayed")

        // 6. Observe the 'To' field
        // VP: Verify that 'To' field is populated for Reply and Reply All options
        expect(await maxEmailPage.isToAddressContentPopulated()).toBe(true, "'To' field isn't populated");

        // 7. Repeat step 5 and 6 and use the Forward option, Verify that the Email Body is being displayed
        await maxEmailPage.discardEmailDraft();
        await maxEmailPage.selectEmailButton(EmailButtonTitle.FORWARD);

        // VP: Email Body is being displayed
        expect(await maxEmailPage.isEmailBodyDisplayed()).toBe(true, "The Email Body isn't displayed");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout
            await maxEmailPage.discardEmailDraft();
            maxPage = await maxEmailPage.endEmailContact(false);
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