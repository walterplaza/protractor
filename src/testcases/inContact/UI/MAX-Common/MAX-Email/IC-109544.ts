import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { ContactState } from "@data-objects/inContact/central/reporting-analytics/canned-reports/active-contacts-info";
import { EmailButtonTitle, EmailMode } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import ActiveContactsPage from "@page-objects/inContact/central/reporting-analytics/canned-reports/active-contacts-page";
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
 * Suite: MAX suite
 * TC ID: 249403
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18 
 */

describe("MAX suite - IC-101287", function () {

    TestBase.scheduleTestBase();
    let homeWindowHandle: string;
    let pageBase: PageBase;
    let emailContent: string = Utility.createRandomString(15);
    let emailJson = `{"interruptible":true,"minWorkingTime":30}`;
    let serverMail: string;
    let ibMail: InboundEmail;
    let ibEmailChatAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let maxWindowHandle: string;
    let emailContactId: number;
    let callContactId: number;
    let maxCall: MaxCall;
    let activeContactsPage: ActiveContactsPage;
    let testEmailAddress: string = "test@niceincontact.com";
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101287 - MAX > Email > Inbound email interrupted by call - save reply draft progress, discard`);

        // 2. Basic Email Precondition
        ibEmailChatAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson);

        // 3. Basic Chat Precondition
        await TestCondition.setUpAndAssignSkill(ibEmailChatAgent, SkillType.CHAT);

        // Setup email
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailChatAgent, SkillType.IB_EMAIL);

        // 1.1  Precondition: MAX - Central login 
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailChatAgent);
        pageBase = new PageBase();
        homeWindowHandle = await pageBase.getCurrentWindowHandle();
    }, TestRunInfo.conditionTimeout);

    it('IC-101287 - MAX Email Inbound email interrupted by call - save reply draft progress, discard', async () => {

        // 1.2  Precondition: MAX - Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailChatAgent.phoneNumber);

        //VP: MAX is launched and Agent status is set to Available, 
        await maxPage.changeState(MaxState.AVAILABLE);               


         // 2. Generate IB Email and accept it on agent side. IC-104015
         await Utility.sendIBEmail(serverMail, ibMail);
         maxEmailPage = await maxPage.waitForEmailWorkspace();
         emailContactId = await CustomAPIs.getCurrentContactId(ibEmailChatAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));

        // 3. Click on Forward button and fill "To" field with a valid email.
        await maxEmailPage.clickForward();
        await maxEmailPage.enterToAddress(testEmailAddress);

        //VP: "To" field is filled.
        expect(await maxEmailPage.getToAddressValue()).toBe(testEmailAddress, "Email 'TO' value is wrong");

        // 4. Generate a Chat and accept it
        await TestHelpers.startChatContact(ibEmailChatAgent);
        maxChatPage = await maxPage.acceptNewChatContact();
        

        // VP: Chat is received, Email is interrupted.
        expect(await maxEmailPage.isEmailInterruptedHeaderDisplayed()).toBe(true, "The Agent doesn't get interrupted");
        await maxEmailPage.showContactWorkSpace(ContactName.CHAT);        

        // 5. Close MAX clicking on "X" not logging out

        // VP: Max is closed





        

        

        

        
        // 10. IB Phone call ends
        await pageBase.switchWindowByHandle(maxWindowHandle);
        await maxCall.clickEndContactButton();
        maxPage = await maxCall.clickConfirmEndContactButtonInterruptedEmail();
        await maxEmailPage.waitForEmailWorkspace();

        // VP: Phone call ends and the Agent displays the IB Email items.
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "Phone call doesn't end");
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace does not display");

        // VP: Verify the email continues on edit mode and the text entered in reply body is continue to displayed and it is not lost.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "Email is not in edit mode");
        expect(await maxEmailPage.getEmailContentInEditMode()).toBe(emailContent, "The added text in email content is lost after ending interrupted call");

        // 11. Click on "Discard Draft" button
        await pageBase.switchWindowByHandle(maxWindowHandle);
        await maxEmailPage.discardEmailDraft();

        // VP: Verify the text entered in reply body is lost and the Email window is in mode to read.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "Email is not in read mode");
        expect(await maxEmailPage.getEmailContentInReadMode() != `${emailContent}`).toBe(true, "The text entered in reply body is not lost");

        // 12. In Central go to Reporting/ Analytics> Canned Reports> Contact> Active Contacts and open/ execute it.
        await pageBase.switchWindowByHandle(homeWindowHandle);
        activeContactsPage = await centralPage.gotoActiveContacts();
        await activeContactsPage.clickRun();

        // VP: Verify the States for the IB Email contact is Active
        expect(await activeContactsPage.isActiveContactDisplayed(emailContactId, ContactState.ACTIVE, TestRunInfo.shortTimeout)).toBe(true, "The report about the IB Email contact is not Active");

        // VP: Verify the report contains the 1 contact (IB Email)        
        expect(await activeContactsPage.isActiveContactDisplayed(callContactId)).toBe(false, "The IB Phone contact still exists on the report");

        // 13. Click on "End Email" button
        await pageBase.switchWindowByHandle(maxWindowHandle);
        await maxEmailPage.endEmailContact(false);

        // VP: Verify the Email is closed and the Agent is in available status.                
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "Email workspace is still displayed")
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Agent status doesn't change to Available");
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
                await TestCondition.setUpAndRemoveSkill(ibEmailChatAgent, SkillType.IB_Phone);
                await TestCondition.setAgentSkillsToDefault(ibEmailChatAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});