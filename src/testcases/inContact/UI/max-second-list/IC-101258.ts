import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { QuickReply } from "@data-objects/inContact/central/admin/communication/quick-replies/quick-reply";
import { EmailButtonTitle, EmailMode, EmailParkMode } from "@data-objects/inContact/max/email/email-info";
import QuickRepliesPage from "@page-objects/inContact/central/admin/communication/quick-replies/quick-replies";
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
 * TC ID: 407309
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101258", function () {
    TestBase.scheduleTestBase();
    let serverMail: string;
    let ibMail: InboundEmail;
    let emailJson: string = `{"emailParking":true}`;
    let quickReply: QuickReply = new QuickReply;
    quickReply.initData();
    let ibEmailAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let quickRepliesPage: QuickRepliesPage;
    let emailContactId: number;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101258 - Quick Replies Verify the "Insert" button is not displayed when the Email is in read mode or parking mode`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson, TestRunInfo.longTimeout);

        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL, "TC-IC-101258");

        // 1. Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
        await TestCondition.editEmailParkingMode(ibEmailAgent, State.ON);

        await TestCondition.cleanUpQuickReply(ibEmailAgent);
        quickRepliesPage = await centralPage.gotoQuickRepliesPage();
        await quickRepliesPage.createQuickReply(quickReply);
        await quickRepliesPage.assignQuickReplyToSkill(SkillType.IB_EMAIL);

    }, TestRunInfo.conditionTimeout);

    it('IC-101258 - Quick Replies Verify the "Insert" button is not displayed when the Email is in read mode or parking mode', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 3. Generate the IB Email contact.
        await Utility.sendIBEmail(serverMail, ibMail);
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Reply email workspace opens and it is possible to edit the email
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "it is possible to edit the email");


        // 4. Click the "Quick Replies" button.
        await maxEmailPage.openQuickRepliesPanel();
        await maxEmailPage.selectQuickReply(quickReply.title);

        // 5. Park the email 
        await maxEmailPage.selectEmailButton(EmailButtonTitle.PARK_EMAIL);
        emailContactId = await CustomAPIs.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL), false);

        // VP: Parks without issue 
        await maxEmailPage.waitForParkedEmailDisplays(emailContactId, true);
        expect(await maxEmailPage.isEmailParked(emailContactId)).toBe(true, "Emails doesn't park");

        // 6. Click the "Quick Replies" button.
        await maxEmailPage.openQuickRepliesPanel();
        await maxEmailPage.selectQuickReply(quickReply.title);

        //VP: The options "Insert" should not be appeared.
        expect(await maxEmailPage.isInsertQuickReplyButtonDisplayed()).toBe(false, `The options Insert is appeared`);

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await maxEmailPage.unparkEmail(EmailParkMode.UNPARK_WORK_NOW, emailContactId);
            await maxEmailPage.endEmailContact();

            // Logout MAX
            centralPage = await maxPage.logOut();

            await TestCondition.cleanUpQuickReply(ibEmailAgent);
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





