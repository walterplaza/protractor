import { Agent } from "@data-objects/general/agent";
import { Cluster, MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { InboundEmail } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { QuickReply } from "@data-objects/inContact/central/admin/communication/quick-replies/quick-reply";
import QuickRepliesPage from "@page-objects/inContact/central/admin/communication/quick-replies/quick-replies";
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
 * TC ID: 248874
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe("MAX suite - IC-62689", function () {

    TestBase.scheduleTestBase();
    let ibEmailAgent: Agent;
    let cluster: Cluster = TestRunInfo.cluster;
    let quickReply: QuickReply = new QuickReply();
    quickReply.initData();
    let serverMail: string;
    let ibMail: InboundEmail;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let quickRepliesPage: QuickRepliesPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62689 - MAX > Email Interactions > Inbound > Forward > Quick Reply for email > Verify that the agent must be able to add quick reply by clicking the quick reply button`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL);
        ibMail = new InboundEmail();
        serverMail = cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);

        // Quick Reply Configured in Central and assigned to the skill IB Email.
        await TestCondition.cleanUpQuickReply(ibEmailAgent);   
        quickRepliesPage = await centralPage.gotoQuickRepliesPage();        
        await quickRepliesPage.createQuickReply(quickReply);
        await quickRepliesPage.assignQuickReplyToSkill(SkillType.IB_EMAIL);
    }, TestRunInfo.conditionTimeout);

    it('IC-62689 - MAX Email Interactions Inbound Forward Quick Reply for email Verify that the agent must be able to add quick reply by clicking the quick reply button', async () => {

        // 1. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 2. Send an inbound email to your configured POC (Basic Email No Attachments) .
        await Utility.sendIBEmail(serverMail, ibMail);
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Email should should be received and displayed on the Agent Window.
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace is not displayed");

        // 3. Click at the "Forward" button.
        await maxEmailPage.clickForward();

        // VP: Outgoing email template should be displayed.
        expect(await maxEmailPage.isEmailEditorDisplayed()).toBe(true, "Outgoing email template is not displayed");

        // 4. Click the "Quick Replies" button.
        await maxEmailPage.openQuickRepliesPanel();

        // VP: List with all quick replies should be displayed.
        expect(await maxEmailPage.isQuickReplyDisplayed(quickReply.title)).toBe(true, "Outgoing email template is not displayed");

        // 5. Select a quick reply 
        await maxEmailPage.selectQuickReply(quickReply.title);

        // VP: The options "Insert" and "Cancel" should be appeared.
        expect(await maxEmailPage.isInsertQuickReplyButtonDisplayed()).toBe(true, "Insert Quick Reply button is not displayed");
        expect(await maxEmailPage.isCancelQuickReplyButtonDisplayed()).toBe(true, "Cancel Quick Reply button is not displayed");

        // 6. Click in "Insert" button
        await maxEmailPage.cleanUpEmailContent();
        await maxEmailPage.insertQuickReply();

        // VP: The text that we configured in central should be displayed in the body section.
        expect(await maxEmailPage.getEmailContentInEditMode()).toBe(quickReply.content, "The text that we configured in central is not displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        // Clean up
        try {
            await maxEmailPage.discardEmailDraft();
            maxPage = await maxEmailPage.endEmailContact(false);
            centralPage = await maxPage.logOut();
            await TestCondition.cleanUpQuickReply(ibEmailAgent);   
            await quickRepliesPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.CHAT);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});