import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { EmailButtonTitle, EmailMode } from "@data-objects/inContact/max/email/email-info";
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
 * TC ID: 455740
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe("MAX suite - IC-101230", function () {
    TestBase.scheduleTestBase();
    let serverMail: string;
    let emailContent: string = Utility.createRandomString(15);
    let expectedEmailSize: number = 500;
    let expectedGlanceSize: number = 300;
    let range: number = 10;
    let ibMail: InboundEmail;
    let ibEmailAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101230 - [MAX][Summer'18][IC-21060][IB Email][Without Contact Panels][With Inbox] Verify the IB Email Workspace has the 765 px.`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL);
        await ibEmailAgent.createPhoneNumber();

        // 1. Pre-condition: an email skill setup
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);

        // 2. Central Login
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-101230 - MAX Summer 18 IC-21060 IB Email Without Contact Panels With Inbox Verify the IB Email Workspace has the 765 px.', async () => {
        // 3. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 4. Verify the size of Glance is 300 px +/_ 10px
        await maxPage.isMaxGlanceSizeInRange(expectedGlanceSize, range);

        // 5. Then change Max status to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // 6. Generate the Ib Email Contact
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: The mail workspace is displayed
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The mail workspace is not displayed");

        // 7. Verify the size of Email work space is 500 px +/_ 10px         
        expect(await maxEmailPage.isEmailWorkingSpaceSizeInRange(expectedEmailSize, range)).toBe(true, "Failed by IC-5984 [MAX][Edge][IE][Email] Email workspace is not displayed entirely caused by the size text of the screen");

        // 8. Click on "Reply" button        
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);

        // VP: Verify the email is in edit mode
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "The email is not in edit mode");

        // VP: Able to add text in the body and the the original body of email continues to displayed completely.
        await maxEmailPage.enterEmailBody(emailContent, false);
        expect(await maxEmailPage.getEmailContentInEditMode()).toContain(emailContent, "Cannot enter email body content");

        // VP: The "TO" and "CC" fields populate automatically.
        expect(await maxEmailPage.isToAddressDisplayed()).toBe(true, "To address is not displayed");
        expect(await maxEmailPage.isCCAddressDisplayed()).toBe(true, "CC Address is not displayed");

        // VP: An the email work space must not be displayed cut off or overlap    
        expect(await maxEmailPage.isEmailWorkSpaceCutOff()).toBe(false, "Failed by IC-5984 [MAX][Edge][IE][Email] Email workspace is not displayed entirely caused by the size text of the screen");

        // 9. Verify the size of Email work space is 500 px +/_ 10px        
        expect(await maxEmailPage.isEmailWorkingSpaceSizeInRange(expectedEmailSize, range)).toBe(true, "Failed by IC-5984 [MAX][Edge][IE][Email] Email workspace is not displayed entirely caused by the size text of the screen");

        // 10. Click on "Discard" button
        await maxEmailPage.discardEmailDraft();

        // VP. Verify the email is in read mode and the text entered in the previous step has been lost.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "The email is not in read mode");
        expect(await maxEmailPage.getEmailContentInReadMode() != `${emailContent}`).toBe(true, "The text entered in the previous step 8. has been not lost");

        // 11. Verify the size of Email work space is 500 px +/_ 10px        
        expect(await maxEmailPage.isEmailWorkingSpaceSizeInRange(expectedEmailSize, range)).toBe(true, "Failed by IC-5984 [MAX][Edge][IE][Email] Email workspace is not displayed entirely caused by the size text of the screen");

        // 12. Click on "Reply All" button
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY_ALL);

        // VP: Verify the email is in edit mode
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "The email is not in edit mode");

        // VP: Able to add text in the body and the the original body of email continues to displayed completely.
        await maxEmailPage.enterEmailBody(emailContent, false);
        expect(await maxEmailPage.getEmailContentInEditMode()).toContain(emailContent, "Cannot enter email body content");

        // VP: The "TO" and "CC" fields populate automatically.
        expect(await maxEmailPage.isToAddressDisplayed()).toBe(true, "To address is not displayed");
        expect(await maxEmailPage.isCCAddressDisplayed()).toBe(true, "CC Address is not displayed");

        // VP: An the email work space must not be displayed cut off or overlap    
        expect(await maxEmailPage.isEmailWorkSpaceCutOff()).toBe(false, "Failed by IC-5984 [MAX][Edge][IE][Email] Email workspace is not displayed entirely caused by the size text of the screen");

        // 13. Verify the size of Email work space is 500 px +/_ 10px        
        expect(await maxEmailPage.isEmailWorkingSpaceSizeInRange(expectedEmailSize, range)).toBe(true, "Failed by IC-5984 [MAX][Edge][IE][Email] Email workspace is not displayed entirely caused by the size text of the screen");

        // 14. Click on "Discard" button
        await maxEmailPage.discardEmailDraft();

        // VP. Verify the email is in read mode and the text entered in the previous step has been lost.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "The email is not in read mode");
        expect(await maxEmailPage.getEmailContentInReadMode() != `${emailContent}`).toBe(true, "The text entered in the previous step 8. has been not lost");

        // 15. Verify the size of Email work space is 500 px +/_ 10px        
        expect(await maxEmailPage.isEmailWorkingSpaceSizeInRange(expectedEmailSize, range)).toBe(true, "Failed by IC-5984 [MAX][Edge][IE][Email] Email workspace is not displayed entirely caused by the size text of the screen");

        // 16. Click on "Forward" button 
        await maxEmailPage.selectEmailButton(EmailButtonTitle.FORWARD);

        // VP: Verify the email is in edit mode
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "The email is not in edit mode");

        // VP: Able to add text in the body and the the original body of email continues to displayed completely.
        await maxEmailPage.enterEmailBody(emailContent, false);
        expect(await maxEmailPage.getEmailContentInEditMode()).toContain(emailContent, "Cannot enter email body content");

        // VP: The "TO" and "CC" fields populate automatically.
        expect(await maxEmailPage.isToAddressDisplayed()).toBe(true, "To address is not displayed");
        expect(await maxEmailPage.isCCAddressDisplayed()).toBe(true, "CC Address is not displayed");

        // VP: An the email work space must not be displayed cut off or overlap    
        expect(await maxEmailPage.isEmailWorkSpaceCutOff()).toBe(false, "Failed by IC-5984 [MAX][Edge][IE][Email] Email workspace is not displayed entirely caused by the size text of the screen");

        // 17. Verify the size of Email work space is 500 px +/_ 10px        
        expect(await maxEmailPage.isEmailWorkingSpaceSizeInRange(expectedEmailSize, range)).toBe(true, "Failed by IC-5984 [MAX][Edge][IE][Email] Email workspace is not displayed entirely caused by the size text of the screen");

        // 18. Click on "Discard" button
        await maxEmailPage.discardEmailDraft();

        // VP. Verify the email is in read mode and the text entered in the previous step has been lost.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "The email is not in read mode");
        expect(await maxEmailPage.getEmailContentInReadMode() != `${emailContent}`).toBe(true, "The text entered in the previous step 8. has been not lost");

        // 19. Using the mouse and drag and drop action to the left, try to change the size of Email work space
        await maxEmailPage.resizeMaxByDropAndDrag(-500, 0);

        // VP: Verify the Email work space continues to display 500 px +/_ 10px
        expect(await maxEmailPage.isEmailWorkingSpaceSizeInRange(expectedEmailSize, range)).toBe(true, "Failed by IC-5984 [MAX][Edge][IE][Email] Email workspace is not displayed entirely caused by the size text of the screen");

        // 20. Using the mouse and drag and drop action to the right, try to change the size of Email work space
        await maxEmailPage.resizeEmailWorkingSpace(100);

        // VP: Verify that the Email work space is a responsive element, therefore, its size will be changed
        expect(await maxEmailPage.isEmailWorkingSpaceSizeInRange(expectedEmailSize + 100, range)).toBe(true, "Failed by IC-5984 [MAX][Edge][IE][Email] Email workspace is not displayed entirely caused by the size text of the screen");

        // 21. Again click on "Reply" button
        // Enter a text in the body of email and click on "Send" button
        maxPage = await maxEmailPage.replyEmailWithContent(true, emailContent, true);

        // VP: Email window closes
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL,TestRunInfo.shortTimeout)).toBe(false, "Email is not closed");

        // 22. Verify the size of Glance is 300 px +/_ 10px
        await maxPage.isMaxGlanceSizeInRange(expectedGlanceSize, range);
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Clean up
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});