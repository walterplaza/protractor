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
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxWorkItemPage from "@page-objects/inContact/max/max-workitem-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: Protractor MAX Suite
 * TC ID: 409890
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe('MAX Suite - IC-62612', function () {
    let quickReply: QuickReply = new QuickReply;
    quickReply.initData();
    TestBase.scheduleTestBase();
    let ibEmailAgent: Agent;
    let serverMail: string;
    let ibMail: InboundEmail;
    let cluster: Cluster = TestRunInfo.cluster;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let maxWorkItemPage: MaxWorkItemPage;
    let maxEmailPage: MaxEmailPage
    let quickRepliesPage: QuickRepliesPage

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62612 - MAX Quick Reply Digital Contacts Verify the quick replies window is expanded window out  or collapse window in when we have a Digital Contact.`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL);
        await TestCondition.setUpAndAssignSkill(ibEmailAgent, SkillType.CHAT);
        await TestCondition.setUpAndAssignSkill(ibEmailAgent, SkillType.WORK_ITEM);

        ibMail = new InboundEmail();
        serverMail = cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);

        // PreCondition Login and Create a New Quick Replies and assign Quick Replies
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailAgent);

        await TestCondition.cleanUpQuickReply(ibEmailAgent);
        quickRepliesPage = await centralPage.gotoQuickRepliesPage();
       
        await quickRepliesPage.createQuickReply(quickReply);
        await quickRepliesPage.assignQuickReplyToSkill(SkillType.IB_EMAIL, SkillType.CHAT, SkillType.WORK_ITEM);

    }, TestRunInfo.conditionTimeout);

    it('IC-62612 - MAX Quick Reply Digital Contacts Verify the quick replies window is expanded window out  or collapse window in when we have a Digital Contact', async () => {

        //1. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        //2. Create Email and receive Email
        await Utility.sendIBEmail(serverMail, ibMail);
        await maxPage.changeState(MaxState.AVAILABLE);

        //VP: Chat contact received on the agent,EmailWorkSpace Display
        maxEmailPage = await maxPage.waitForEmailWorkspace();
        expect(await maxEmailPage.isEmailWorkingSpaceDisplayed()).toBe(true, "Email workspace is not displayed");

        // VP: Check Quick Reply appear
        expect(await maxPage.isQuickRepliesPanelDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Quick Reply Section is not displayed");

        //3. Collapse Quick Reply by clicking to Toggle button
        await maxPage.openQuickRepliesPanel(false);

        // VP: Check Quick Reply disappears
        expect(await maxPage.isQuickRepliesPanelDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Quick Reply Section is not displayed");

        //4. Expanse Quick Reply by clicking to Toggle button
        await maxPage.openQuickRepliesPanel(true);

        //VP: Check Quick Reply appears by clicking to Toggle button
        expect(await maxPage.isQuickRepliesPanelDisplayed()).toBe(true, "Quick Reply Section is not displayed");

        //5. End Email Contact
        await maxEmailPage.endEmailContact();

        //------------------------Start to check for Call----------------------------
        // 6.Start Call
        await TestHelpers.startChatContact(ibEmailAgent);

        //7.  Receive Chat 
        maxChatPage = await maxPage.acceptNewChatContact();
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat workspace is not displayed");

        //VP: Check Quick Reply appear
        expect(await maxPage.isQuickRepliesPanelDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Quick Reply Section is not displayed");

        //8. Collapse Quick Reply by clicking to Toggle button
        await maxPage.openQuickRepliesPanel(false);

        // VP: Check Quick Reply disappears
        expect(await maxPage.isQuickRepliesPanelDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Quick Reply Section is displayed after hit Carot button");

        //9. Expanse Quick Reply by clicking to Toggle button
        await maxPage.openQuickRepliesPanel(true);

        // VP:Check Quick Reply appears
        expect(await maxPage.isQuickRepliesPanelDisplayed()).toBe(true, "Quick Reply Section is not displayed");

        // 10. End Chat
        await maxChatPage.endChatContact();

        //-------------------Start to check for Work Item----------------------------

        // 11. Place a work item skill
        await TestHelpers.startWorkItem(ibEmailAgent);

        // Receive Work Item
        maxWorkItemPage = await maxPage.acceptNewWorkItemContact();
        expect(await maxWorkItemPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM)).toBe(true, "Work Item contact is not displayed")

        //VP: Check Quick Reply appear
        expect(await maxPage.isQuickRepliesPanelDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Quick Reply Section is not displayed");

        // 12  Collapse Quick Reply by clicking to Toggle button
        await maxPage.openQuickRepliesPanel(false);

        //VP: Check Quick Reply disappears
        expect(await maxPage.isQuickRepliesPanelDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Quick Reply Section is displayed after hit Carot button");

        // 13. Expanse Quick Reply by clicking to Toggle button
        await maxPage.openQuickRepliesPanel(true);

        //VP: Check Quick Reply appear
        expect(await maxPage.isQuickRepliesPanelDisplayed()).toBe(true, "Quick Reply Section is not displayed");

        // 14. End WorkItem
        await maxWorkItemPage.endWorkItemContact();

    });
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        // Clean up
        try {
            await maxPage.logOut();
            await TestCondition.cleanUpQuickReply(ibEmailAgent); 
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(ibEmailAgent, SkillType.CHAT);
                await TestCondition.setUpAndRemoveSkill(ibEmailAgent, SkillType.WORK_ITEM);
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);

            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});