import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { QuickReply } from "@data-objects/inContact/central/admin/communication/quick-replies/quick-reply";
import { Email } from "@data-objects/inContact/max/email/email-info";
import QuickRepliesPage from "@page-objects/inContact/central/admin/communication/quick-replies/quick-replies";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 248829
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18 
 */  


describe("MAX suite - IC-101295", function () {

    TestBase.scheduleTestBase();
    let obEmailAgent: Agent;    
    let email: Email = new Email();
    let quickReply: QuickReply = new QuickReply();

    // Declare page object
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let quickRepliesPage: QuickRepliesPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101295 - MAX > Email Interactions > Outbound > Quick Reply for email > Verify that the agent must be able to add quick reply by clicking the quick reply button`);
        obEmailAgent = await TestCondition.setUpAgent(SkillType.OB_EMAIL);

        // Pre-condition
        // Login Central        
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(obEmailAgent);

        // Create new quick reply
        await TestCondition.cleanUpQuickReply(obEmailAgent); 
        quickReply.initData();
        quickRepliesPage = await centralPage.gotoQuickRepliesPage();      
        await quickRepliesPage.createQuickReply(quickReply);
        await quickRepliesPage.assignQuickReplyToSkill(SkillType.OB_EMAIL);

        // Launch MAX
        maxPage = await quickRepliesPage.launchMAX(obEmailAgent.phoneNumber);
        email.initFullData(`test248829@email.com`, `Test Subject for TC 248829`, `Test Body for TC 248829`, "");
    }, TestRunInfo.conditionTimeout);

    it('IC-101295 - MAX Email Interactions Outbound Quick Reply for email Verify that the agent must be able to add quick reply by clicking the quick reply button', async () => {

        // 2. Click the New +> Outbound Mail button
        // VP: Email template should be opened
        // 3. Select the email skill from the drop down list of outbound skills
        maxEmailPage = await maxPage.openOBEmailWorkspace(email.toAddress);

        // VP: OB email skill should be selected
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Cannot select OB Email skill");

        // 4. Click the "Quick Replies" button
        await maxEmailPage.clickQuickRepliesButton();

        // VP: List with all quick replies should be displayed
        await maxEmailPage.isQuickRepliesPanelDisplayed();

        // 5. Select a quick reply
        await maxEmailPage.selectQuickReply(quickReply.title);

        // VP: The options "Insert" and "Cancel" should be appeared
        expect(await maxEmailPage.isInsertQuickReplyButtonDisplayed()).toBe(true, "Insert Quick Reply button is not displayed");
        expect(await maxEmailPage.isCancelQuickReplyButtonDisplayed()).toBe(true, "Cancel Quick Reply button is not displayed");

        // 6. Click in "Insert" button
        await maxEmailPage.cleanUpEmailContent();
        await maxEmailPage.insertQuickReply();

        // VP: The text that we configured in central should be displayed in the body section
        expect(await maxEmailPage.getEmailContentInEditMode()).toBe(quickReply.content, "The text that we configured in central is not displayed");


    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout MAX
            await maxEmailPage.endEmailContact();
            centralPage = await maxPage.logOut();

            // Clean up quick reply and logout central
            await TestCondition.cleanUpQuickReply(obEmailAgent); 
            await quickRepliesPage.logOut();
        } catch (err) { }
        finally {
            try {
                await CustomAPIs.endAllContacts(obEmailAgent);
                await TestCondition.setAgentSkillsToDefault(obEmailAgent, SkillType.OB_EMAIL);                
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});