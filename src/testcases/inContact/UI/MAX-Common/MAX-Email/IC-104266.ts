import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType, SkillCore } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { Email } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import SkillsDetailPage from "@page-objects/inContact/central/routing/skills/skills-detail-page";
import { InboundEmail } from "@data-objects/general/skill-core";
import { Utility } from "@utilities/general/utility";
import { EmailButtonTitle } from "@data-objects/inContact/max/email/email-info";

/** 
 * Type: inContact
 * Suite: MAX-Common > MAX-Email
 * TC ID: IC-104266
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe("MAX-Common > MAX-Email - IC-104266", function () {

    TestBase.scheduleTestBase();

    let emailJson = `{"interruptible":true,"minWorkingTime":15}`;
    let chatJson = `{"initialPriority":5,"acceleration":10,"maxPriority":100}`;
    let ibEmailAgent: Agent;
    let email: Email = new Email();
    email.initFullData("test@email.com", "Test Subject", "Test Body", "");
    let ibMail: InboundEmail;
    let serverMail: string;

    // Declare page object
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let skillDetailPage: SkillsDetailPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-104266 - [MAX][Email] 'TO' field should maintain the mail filled after change of focus`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson);
        await TestCondition.setUpAndAssignSkill(ibEmailAgent, SkillType.CHAT, null, null, chatJson);

        // Pre-condition - MAX - Basic Email Precondition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);

        // Pre-condition
        // Login InContact
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);    
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);    

    }, TestRunInfo.conditionTimeout);

    it('IC-104266 - [MAX][Email] TO field should maintain the mail filled after change of focus', async () => {

         // 1. For precondition IC-98647 Add interruption (data tab)
         await Utility.sendIBEmail(serverMail, ibMail);
         await maxPage.changeState(MaxState.AVAILABLE);       
         maxEmailPage = await maxPage.waitForEmailWorkspace();
 
         // 2. In Glance Accept the mail and click in Reply all button
         expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The IB Email Contact doesn't deliver to Agent");                
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);

        // 3. Fill the TO field with some mails address 
        await maxEmailPage.enterToAddress(email.toAddress);                                 

        // 4. Accept the Chat
        await TestHelpers.startChatContact(ibEmailAgent);
        await maxEmailPage.waitForNewContactPopUp();
        let maxChatPage = await maxEmailPage.acceptNewChatContact();

        // VP: the Agent gets interrupted and IB Chat is delivered.
        expect(await maxEmailPage.isEmailInterruptedHeaderDisplayed()).toBe(true, "The Agent doesn't get interrupted");
        await maxEmailPage.showContactWorkSpace(ContactName.CHAT);
        await maxChatPage.hideMaxGlance();
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "MAX still displays the Email Ob workspace");
        await maxChatPage.showMaxGlance();
        expect(await maxChatPage.isContactTitleParked()).toBe(true, "Contact Title is not parked");
        await maxChatPage.hideMaxGlance();
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "MAX does not displays the Chat workspace");        

        // 5. Finish the Chat 
        maxPage = await maxChatPage.endChatContact();

        // VP: and verify that mail is opened again
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.CHAT, TestRunInfo.shortTimeout)).toBe(false, "MAX still displays the Chat workspace");
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "MAX is not displays the Email workspace");
        expect(await maxEmailPage.isEmailInterruptedHeaderDisplayed(TestRunInfo.shortTimeout)).toBe(false, "The Agent Email still get interrupted");

        // VP: Verify that the Email value entered in "TO" field persisted after the chat is terminated.
        expect(await maxEmailPage.getToAddressValue()).toBe(email.toAddress, "To address field is failing to shiow the correct values");

        await maxEmailPage.endEmailContact(false);
        
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            centralPage = await maxPage.logOut();

            // Logout InContact
            await skillDetailPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
                await TestCondition.setUpAndRemoveSkill(ibEmailAgent, SkillType.CHAT);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});