import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { EmailButtonTitle, EmailMode, EmailParkMode } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX-Common > MAX-Email
 * TC ID: MAX-857
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */


describe("MAX-Common > MAX-Email - MAX-857", function () {

    TestBase.scheduleTestBase();
    let pageBase: PageBase;
    let emailContent: string = Utility.createRandomString(15);
    let emailContent_2 = Utility.createRandomString(15);
    let emailJson = `{"interruptible":true,"emailParking":true,"enableParking":true}`;
    let phoneJson = `{"initialPriority":5,"acceleration":10,"maxPriority":100}`;
    let serverMail: string;
    let ibMail: InboundEmail;
    let ibEmailPhoneAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let emailContactId: number;
    let maxCall: MaxCall;
    let callContactId: number;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `MAX-857 - [MAX] [park] [interrupt] validate that content is saved for an interrupted email after an unpark`);

        // Pre-condition - Basic Email Precondition -Configure email interruption
        ibEmailPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson);
        await TestCondition.setUpAndAssignSkill(ibEmailPhoneAgent, SkillType.IB_Phone, null, null, phoneJson);
        await ibEmailPhoneAgent.createPhoneNumber();

        // Setup email
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailPhoneAgent, SkillType.IB_EMAIL);

        // Precontion - Central login
        loginPage = new LoginPage();        
        centralPage = await loginPage.loginInContact(ibEmailPhoneAgent);
        pageBase = new PageBase();
    }, TestRunInfo.conditionTimeout);

    it('MAX-857 - [MAX] [park] [interrupt] validate that content is saved for an interrupted email after an unpark', async () => {

        // Precontion Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailPhoneAgent.phoneNumber);

        // 1.1
        await Utility.sendIBEmail(serverMail, ibMail);

        // VP: Email is sent
        expect(await maxPage.isContactInQueue(ContactName.EMAIL)).toBe(true, "Email contact is not in queue");

        // 1.2 Change your MAX Status to Available
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();
        emailContactId = await CustomAPIs.getCurrentContactId(ibEmailPhoneAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));

        // VP: Email workspace is displayed in agent side.
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace does not display");
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "Email is not in read mode");

        // 2. Click on Reply button 
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);

        // VP: Reply email workspace opens and it is possible to edit the email
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "Email is not in edit mode");

        // 3. Add text to the body of the email.     
        await maxEmailPage.enterEmailBody(emailContent, true);

        // VP: Reply response populated into reply body After that wait that the "Time Counter" available in "MAX" is > to the "Minimum Working Time" configured in requirement In this case is 30 Seconds. 
        expect(await maxEmailPage.getEmailContentInEditMode()).toBe(emailContent, "Reply response doesn't populate into reply body");
        await pageBase.waitInSecond(TestRunInfo.longTimeout);
        

        // 4. Click on Park button.
        await maxEmailPage.selectEmailButton(EmailButtonTitle.PARK_EMAIL);
        emailContactId = await CustomAPIs.getCurrentContactId(ibEmailPhoneAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));

        // VP: Parks without issue 
        await maxEmailPage.waitForParkedEmailDisplays(emailContactId, true);
        expect(await maxEmailPage.isEmailParked(emailContactId)).toBe(true, "Emails doesn't park");

        // 5. Click on Unpark button.
        await maxEmailPage.unparkEmail(EmailParkMode.UNPARK_WORK_NOW, emailContactId);
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The IB Email Contact doesn't deliver to Agent");

        // 6. Set agent status to unavailable
        await maxPage.showMaxGlance();
        await maxPage.changeState(MaxState.UNAVAILABLE);

        // 7. Add/Change the reply text.
        await maxPage.hideMaxGlance();
        await maxEmailPage.cleanUpEmailContent();
        await maxEmailPage.enterEmailBody(emailContent_2, true);

        //VP: text is modified
        expect(await maxEmailPage.getEmailContentInEditMode()).toBe(emailContent_2, "Reply response doesn't populate into reply body");        

        // 8. interrupt the email via Call IB Phone     
        await TestHelpers.startInboundCall(ibEmailPhoneAgent);

        // VP: Email is interrupted
        maxCall = await maxPage.waitForCallWorkspace();
        await maxCall.waitForCallDialling();
        callContactId = await CustomAPIs.getCurrentContactId(ibEmailPhoneAgent, SkillCore.getSkillName(SkillType.IB_Phone), false);

        // end pnoe call 
        await maxCall.clickEndContactButton();
        maxPage = await maxCall.clickConfirmEndContactButtonInterruptedEmail();
        await maxEmailPage.waitForEmailWorkspace();

        // 9. Change status to available
        await maxPage.showMaxGlance();
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: The draft should be saved and shown as in previous steps
        expect(await maxCall.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace does not display");
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "Email is not in edit mode");
        expect(await maxEmailPage.getEmailContentInEditMode()).toBe(emailContent_2, "The added text in email content is lost after ending interrupted call");

        await maxEmailPage.clickSend();
        await maxEmailPage.waitForContactWorkSpaceDisappeared(ContactName.EMAIL, TestRunInfo.shortTimeout);
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {

            // Logout MAX
            centralPage = await maxPage.logOut();

            // Logout InContact
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {

                // Remove skills
                await TestCondition.setUpAndRemoveSkill(ibEmailPhoneAgent, SkillType.IB_Phone);
                await TestCondition.setAgentSkillsToDefault(ibEmailPhoneAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});