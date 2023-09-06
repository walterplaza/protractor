import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { QuickReply } from "@data-objects/inContact/central/admin/communication/quick-replies/quick-reply";
import { EmailButtonTitle, EmailMode } from "@data-objects/inContact/max/email/email-info";
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
 * TC ID: 443290 (Question 4)
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101252", function () {
    TestBase.scheduleTestBase();
    let serverMail: string;
    let emailContent: string = Utility.createRandomString(15);
    let validEmail: string = "valid_email@email.com";
    let quickReply: QuickReply = new QuickReply;
    quickReply.initData();
    let expectedGlanceSize: number = 300;
    let range: number = 10;
    let ibMail: InboundEmail;
    let ibEmailAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let quickRepliesPage: QuickRepliesPage;
    TestRunInfo.testTimeout = 800000;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101252 - MAX> SCH> One Contact> Generate an Email Ib Contact with Quick Replies`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL);
        await ibEmailAgent.createPhoneNumber();

        // 1. Pre-condition: an email skill setup
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);

        // Central Login
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);

        // The Ib Email skill must have associated only a Quick Reply
        await TestCondition.cleanUpQuickReply(ibEmailAgent);
        quickRepliesPage = await centralPage.gotoQuickRepliesPage();
        await quickRepliesPage.createQuickReply(quickReply);
        await quickRepliesPage.assignQuickReplyToSkill(SkillType.IB_EMAIL);
    }, TestRunInfo.conditionTimeout);

    it('IC-101252 - MAX SCH One Contact Generate an Email Ib Contact with Quick Replies', async () => {
        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 3. Change Max status to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // 4. Generate the Ib Email Contact
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: The mail workspace is displayed
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The mail workspace is not displayed");

        // VP: Check Quick Reply appears
        expect(await maxPage.isQuickRepliesPanelDisplayed()).toBe(true, "Quick Reply Section is not displayed");

        // VP: Check that the email workspace must not be displayed cut off or overlap
        expect(await maxEmailPage.isEmailWorkSpaceCutOff()).toBe(false, "The email workspace is displayed cut off or overlap");

        // VP: Check the controls, colors, labels, email inbox and size
        expect(await maxEmailPage.isRightFrameCustomerIconDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame customer icon is not displayed");
        expect(await maxEmailPage.isRightFrameTimeCounterDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame time counter is not displayed");
        expect(await maxEmailPage.isRightFrameSkillNameDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame skill name is not displayed");
        expect(await maxEmailPage.isDiscardButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame discard button is not displayed");
        expect(await maxEmailPage.isSendButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame Send button is not displayed");
        expect(await maxEmailPage.isTransferButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame Transfer button is not displayed");
        expect(await maxEmailPage.isRequeueButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame Requeue button is not displayed");
        expect(await maxEmailPage.isLaunchButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame Launch button is not displayed");
        expect(await maxEmailPage.isEndButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame End button is not displayed");
        expect(await maxEmailPage.isToAddressDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame To address is not displayed");
        expect(await maxEmailPage.isCCAddressDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame CC Address is not displayed");
        expect(await maxEmailPage.isBCCAddressDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame BCC Address is not displayed");
        expect(await maxEmailPage.isSubjectDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame Subject is not displayed");
        expect(await maxEmailPage.isRichTextBarDisplayed()).toBe(true, "Right frame Rich text tool bar is not displayed");
        expect(await maxEmailPage.isEmailBodyDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame Email body is not displayed");
        expect(await maxEmailPage.isAttachmentButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame Attachment button is not displayed");
        expect(await maxEmailPage.isRightFrameContactStartTimeDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame contact start time is not displayed");
        expect(await maxEmailPage.isRightFrameFromAddressDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame from address is not displayed");

        // 5. Expand and collapse the Quick Reply 
        // 5.1 Collapse the Quick Reply
        await maxPage.openQuickRepliesPanel(false);

        // VP: Check that the email workspace must not be displayed cut off or overlap
        expect(await maxEmailPage.isEmailWorkSpaceCutOff()).toBe(false, "The email workspace is displayed cut off or overlap");

        // 5.2 Expand the Quick Reply
        await maxPage.openQuickRepliesPanel(true);

        // VP: Check that the email workspace must not be displayed cut off or overlap
        expect(await maxEmailPage.isEmailWorkSpaceCutOff()).toBe(false, "The email workspace is displayed cut off or overlap");

        // 6. Click on "Reply" button        
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);

        // VP: Verify the email is in edit mode
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "The email is not in edit mode");

        // VP: Able to add text in the body and the the original body of email continues to displayed completely.
        await maxEmailPage.enterEmailBody(emailContent, true);
        expect(await maxEmailPage.getEmailContentInEditMode()).toBe(emailContent, "Cannot enter email body content");

        // VP: Check that the email workspace and Quick Reply panel are displayed correctly
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The mail workspace is not displayed");
        expect(await maxPage.isQuickRepliesPanelDisplayed()).toBe(true, "Quick Reply Section is not displayed");

        // VP: The "TO" field populate automatically.
        expect(await maxEmailPage.isToAddressDisplayed()).toBe(true, "To address is not displayed");

        // VP: The Tiny tool displays and we can use it for give format in text
        expect(await maxEmailPage.isEmailTinyToolbarDisplays()).toBe(true, "The Tiny tool does not display");

        // VP: An the email work space must not be displayed cut off or overlap    
        expect(await maxEmailPage.isEmailWorkSpaceCutOff()).toBe(false, "The email workspace is displayed cut off or overlap");

        // 7. Click on "Discard" button
        await maxEmailPage.discardEmailDraft();

        // VP. Verify the email is in read mode and the text entered in the previous step has been lost.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "The email is not in read mode");
        expect(await maxEmailPage.getEmailContentInReadMode() != `${emailContent}`).toBe(true, "The text entered in the previous step 8. has been not lost");

        // 8. Click on "Reply All" button
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY_ALL);

        // VP: Verify the email is in edit mode
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "The email is not in edit mode");

        // VP: Able to add text in the body and the the original body of email continues to displayed completely.
        await maxEmailPage.enterEmailBody(emailContent, true);
        expect(await maxEmailPage.getEmailContentInEditMode()).toBe(emailContent, "Cannot enter email body content");

        // VP: Check that the email workspace and Quick Reply panel are displayed correctly
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The mail workspace is not displayed");
        expect(await maxPage.isQuickRepliesPanelDisplayed()).toBe(true, "Quick Reply Section is not displayed");

        // VP: The "TO" and "CC" fields populate automatically.
        expect(await maxEmailPage.isToAddressDisplayed()).toBe(true, "To address is not displayed");
        expect(await maxEmailPage.isCCAddressDisplayed()).toBe(true, "CC address is not displayed");

        // VP: The Tiny tool displays and we can use it for give format in text
        expect(await maxEmailPage.isEmailTinyToolbarDisplays()).toBe(true, "The Tiny tool does not display");

        // VP: An the email work space must not be displayed cut off or overlap    
        expect(await maxEmailPage.isEmailWorkSpaceCutOff()).toBe(false, "The email workspace is displayed cut off or overlap");

        // 9. Click on "Discard" button
        await maxEmailPage.discardEmailDraft();

        // VP. Verify the email is in read mode and the text entered in the previous step has been lost.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "The email is not in read mode");
        expect(await maxEmailPage.getEmailContentInReadMode() != `${emailContent}`).toBe(true, "The text entered in the previous step 8. has been not lost");

        // 10. Click on "Forward" button 
        await maxEmailPage.selectEmailButton(EmailButtonTitle.FORWARD);

        // VP: Verify the email is in edit mode
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "The email is not in edit mode");

        // VP: Able to add text in the body and the the original body of email continues to displayed completely.
        await maxEmailPage.enterEmailBody(emailContent, true);
        expect(await maxEmailPage.getEmailContentInEditMode()).toBe(emailContent, "Cannot enter email body content");

        // VP: Check that the email workspace and Quick Reply panel are displayed correctly
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The mail workspace is not displayed");
        expect(await maxPage.isQuickRepliesPanelDisplayed()).toBe(true, "Quick Reply Section is not displayed");

        // VP: The "TO" and "CC" fields populate automatically.
        expect(await maxEmailPage.isToAddressDisplayed()).toBe(true, "To address is not displayed");
        expect(await maxEmailPage.isCCAddressDisplayed()).toBe(true, "CC address is not displayed");

        // VP: The Tiny tool displays and we can use it for give format in text
        expect(await maxEmailPage.isEmailTinyToolbarDisplays()).toBe(true, "The Tiny tool does not display");

        // VP: An the email work space must not be displayed cut off or overlap    
        expect(await maxEmailPage.isEmailWorkSpaceCutOff()).toBe(false, "The email workspace is displayed cut off or overlap");

        // 11. Click on "Discard" button
        await maxEmailPage.discardEmailDraft();

        // VP. Verify the email is in read mode and the text entered in the previous step has been lost.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "The email is not in read mode");
        expect(await maxEmailPage.getEmailContentInReadMode() != `${emailContent}`).toBe(true, "The text entered in the previous step 8. has been not lost");

        // 12. Again click on "Reply" button        
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);

        // Insert the Quick Reply in the body of email
        await maxEmailPage.selectQuickReply(quickReply.title);
        await maxEmailPage.insertQuickReply();

        // Click on "Send" button
        await maxEmailPage.clickSend();
        await maxPage.waitForMAXStateChangeTo(MaxState.AVAILABLE);

        //VP: Verify the Ib Email workspace closes and MAX displays the glance.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "MAX still displays the Email workspace");

        //VP: Verify that MAX still displaying the same size before start the Ib Email Contact.
        expect(await maxPage.isGlanceSizeInRange(expectedGlanceSize, range)).toBe(true, "MAX size is not correct in range");

        // 13. Repeat the step 4 in order to have an IB Email Contact to verify Reply function
        // Generate the Ib Email Contact           
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // Click on "Reply" button  
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);

        // Insert the Quick Reply in the body of email
        await maxEmailPage.selectQuickReply(quickReply.title);
        await maxEmailPage.insertQuickReply();

        // Click on "Send" button 
        await maxEmailPage.clickSend();
        await maxPage.waitForMAXStateChangeTo(MaxState.AVAILABLE);

        //VP: Verify the Ib Email workspace closes and MAX displays the glance.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "MAX still displays the Email workspace");

        //VP: Verify that MAX still displaying the same size before start the Ib Email Contact.
        expect(await maxPage.isGlanceSizeInRange(expectedGlanceSize, range)).toBe(true, "MAX size is not correct in range");

        // 14. Repeat the step 4 in order to have an IB Email Contact to verify forward function
        // Generate the Ib Email Contact        
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // Click on "Forward" button  
        await maxEmailPage.selectEmailButton(EmailButtonTitle.FORWARD);

        // Insert the Quick Reply in the body of email
        await maxEmailPage.selectQuickReply(quickReply.title);
        await maxEmailPage.insertQuickReply();

        // Click on "Send" button
        await maxEmailPage.enterToAddress(validEmail);
        await maxEmailPage.clickSend();
        await maxPage.waitForMAXStateChangeTo(MaxState.AVAILABLE);

        //VP: Verify the Ib Email workspace closes and MAX displays the glance.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "MAX still displays the Email workspace");

        //VP: Verify that MAX still displaying the same size before start the Ib Email Contact.
        expect(await maxPage.isGlanceSizeInRange(expectedGlanceSize, range)).toBe(true, "MAX size is not correct in range");

        // 15. Repeat the step 4 in order to have an IB Email Contact 
        // Generate the Ib Email Contact
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // End email
        maxPage = await maxEmailPage.endEmailContact(false);
        await maxPage.waitForMAXStateChangeTo(MaxState.AVAILABLE);

        //VP: Verify the Ib Email workspace closes and MAX displays the glance.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "MAX still displays the Email workspace");

        //VP: Verify that MAX still displaying the same size before start the Ib Email Contact.
        expect(await maxPage.isGlanceSizeInRange(expectedGlanceSize, range)).toBe(true, "MAX size is not correct in range");
    }, 800000);

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Clean up
            centralPage = await maxPage.logOut();
            await TestCondition.cleanUpQuickReply(ibEmailAgent);
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