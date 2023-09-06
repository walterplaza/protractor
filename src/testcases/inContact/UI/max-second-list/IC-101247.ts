import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName, DispositionName } from "@data-objects/general/max";
import { InboundEmail, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { EmailButtonTitle, EmailMode } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID:  443296
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe("MAX suite -  IC-101247", function () {
    TestBase.scheduleTestBase();
    let serverMail: string;
    let ibMail: InboundEmail;
    let validEmail: string = "valid_email@email.com";
    let emailContent: string = `Content1${Utility.createRandomString(15)}`;
    let emailContent2: string = `Content2${Utility.createRandomString(15)}`;
    let acwTimeOut: number = 15;
    let emailJson: string = `{"maxSecondsACW":${acwTimeOut}}`;
    let glanceWidthBeforeContact: number;
    let ibEmailAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let dispositionNote: string = "Test Automation";
    let maxDispositionPage: MaxDispositionPage;
    TestRunInfo.testTimeout = 1000000;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101247 - MAX> SCH> One Contact> Generate an Email Ib Contact with Disposition`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, false, true, emailJson);

        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL, "", emailContent);

        // 1. Central Login
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);

    }, TestRunInfo.conditionTimeout);

    it('IC-101247 - MAX SCH One Contact Generate an Email Ib Contact with Disposition', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);
        glanceWidthBeforeContact = await maxPage.getMaxGlanceSize();

        // 3. Set the "Available" state
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX has the available state
        expect(await maxPage.getAgentStatus(TestRunInfo.shortTimeout)).toBe(MaxState.AVAILABLE, "Agent state does not change to Available");

        // 4. Generate a Ib Email Contact
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Verify:
        // - Verify the Ib Email Contact delivery automatically in MAX without errors
        // - The workspace is shown according to the attached picture
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(true, "Ib Email Contact workspace does not display in MAX");

        // - The email workspace must not be displayed cut off or overlap
        expect(await maxEmailPage.isEmailWorkSpaceCutOff()).toBe(false, "The email workspace is displayed cut off or overlap");

        // - Check the controls, colors, labels, email inbox and size
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
        expect(await maxEmailPage.isRichTextBarDisplayed(TestRunInfo.middleTimeout)).toBe(true, "Right frame Rich text tool bar is not displayed");
        expect(await maxEmailPage.isEmailBodyDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame Email body is not displayed");
        expect(await maxEmailPage.isAttachmentButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame Attachment button is not displayed");
        expect(await maxEmailPage.isRightFrameContactStartTimeDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame contact start time is not displayed");
        expect(await maxEmailPage.isRightFrameFromAddressDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Right frame from address is not displayed");

        // 5. Click on "Reply" button   
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);

        // VP: Verify:
        // - the email is in edit mode and you can add text in the body
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "Email is not in edit mode");
        await maxEmailPage.enterEmailBody(emailContent2, false);

        // - the original body of email continues to displayed completely        
        expect(await maxEmailPage.getEmailContentInEditMode()).toContain(emailContent, "The original body of email does not continue to display completely");

        // - the Tiny tool displays and we can use it for give format in text
        expect(await maxEmailPage.isEmailTinyToolbarDisplays()).toBe(true, "The Tiny tool does not display");

        // - the "TO" field populates automatically
        expect(await maxEmailPage.isToAddressContentPopulated()).toBe(true, `The "TO" field does not populate`);

        // - the email workspace must not be displayed cut off or overlap        
        expect(await maxEmailPage.isEmailWorkSpaceCutOff()).toBe(false, "The email workspace is displayed cut off or overlap");

        // 6. Click on "Discard" button        
        await maxEmailPage.discardEmailDraft();

        // VP: Verify the email is in read mode and the text entered in step 5 has been lost
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "Email is not in read mode");
        expect((await maxEmailPage.getEmailContentInReadMode()).includes(emailContent2)).toBe(false, "Email body entered in step 5 is not lost");

        // 7. Click on "Reply All" button
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY_ALL);

        // VP: Verify:
        // - the email is in edit mode and you can add text in the body
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "Email is not in edit mode");
        await maxEmailPage.enterEmailBody(emailContent2, false);

        // - the original body of email continues to displayed completely
        expect(await maxEmailPage.getEmailContentInEditMode()).toContain(emailContent, "The original body of email does not continue to display completely");

        // - the Tiny tool displays and we can use it for give format in text
        expect(await maxEmailPage.isEmailTinyToolbarDisplays()).toBe(true, "The Tiny tool does not display");

        // - the "TO" and "CC" fields populate automatically
        expect(await maxEmailPage.isToAddressContentPopulated()).toBe(true, `The "TO" field does not populate`);

        // - the email workspace must not be displayed cut off or overlap
        expect(await maxEmailPage.isEmailWorkSpaceCutOff()).toBe(false, "The email workspace is displayed cut off or overlap");

        // 8. Click on "Discard" button         
        await maxEmailPage.discardEmailDraft();

        // VP: Verify the email is in read mode and the text entered in step 7 has been lost
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "Email is not in read mode");
        expect((await maxEmailPage.getEmailContentInReadMode()).includes(emailContent2)).toBe(false, "Email body entered in step 7 is not lost");

        // 9. Click on "Forward" button
        await maxEmailPage.selectEmailButton(EmailButtonTitle.FORWARD);

        // VP: Verify:
        // - the email is in edit mode and you can add text in the body
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "Email is not in edit mode");
        await maxEmailPage.enterEmailBody(emailContent2, false);

        // - the original body of email continues to displayed completely
        expect(await maxEmailPage.getEmailContentInEditMode()).toContain(emailContent2, "The original body of email does not continue to display completely");

        // - the Tiny tool displays and we can use it for give format in text
        expect(await maxEmailPage.isEmailTinyToolbarDisplays()).toBe(true, "The Tiny tool does not display");

        // - the "TO" and "CC" fields are displayed empty
        expect(await maxEmailPage.isToAddressContentPopulated()).toBe(false, `The "TO" field does not empty`);
        expect(await maxEmailPage.isCCAddressContentPopulated()).toBe(false, `The "CC" field does not empty`);

        // - the email workspace must not be displayed cut off or overlap
        expect(await maxEmailPage.isEmailWorkSpaceCutOff()).toBe(false, "The email workspace is displayed cut off or overlap");

        // 10. Click on "Discard" button        
        await maxEmailPage.discardEmailDraft();

        // VP: Verify the email is in read mode and the text entered in step 7 has been lost
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "Email is not in read mode");
        expect((await maxEmailPage.getEmailContentInReadMode()).includes(emailContent2)).toBe(false, "Email body entered in step 7 is not lost");

        // 11. Again click on "Reply" button. Enter a text in the body of email and click on "Send" button
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);
        await maxEmailPage.enterEmailBody(emailContent2, true);
        await maxEmailPage.selectEmailButton(EmailButtonTitle.SEND);
        maxDispositionPage = new MaxDispositionPage();

        // VP: Verify the pop over of disposition displays automatically
        expect(await maxDispositionPage.isDispositionPanelDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Disposition pop over does not display");

        // VP: Verify that MAX still displaying the same size before start the Ib Email Contact        
        expect(await maxPage.getMaxGlanceSize()).toBe(glanceWidthBeforeContact, "MAX is not displaying the same size before starting the IB Email Contact");

        // 12. Select a disposition and click on "Save" button
        await maxDispositionPage.fillDispositionForm(DispositionName.DISPOSITION_1);
        await maxDispositionPage.saveAndCloseDisposition();

        // VP: Verify the ACW time configured in disposition begins to run in countdown
        expect(await maxPage.isACWTimerCountCorrectly()).toBe(true, "The ACW time configured in disposition does not count down.");

        // VP: When the ACW time configured in disposition has been completed, verify the Ib Email workspace closes and MAX displays the glance        
        maxPage = await maxEmailPage.waitACWDisappear(acwTimeOut);
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "Email workspace does not close");

        // VP: Verify that MAX still displaying the same size before start the Ib Email Contact
        expect(await maxPage.getMaxGlanceSize()).toBe(glanceWidthBeforeContact, "MAX is not displaying the same size before starting the IB Email Contact");

        // 13. Repeat the step 4 in order to have an IB Email Contact to verify Reply All function
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // Click on "Reply All" button
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY_ALL);

        // Enter a text in the body of email and click on "Send" button
        await maxEmailPage.enterEmailBody(emailContent, true);
        await maxEmailPage.selectEmailButton(EmailButtonTitle.SEND);

        // VP: Verify the pop over of disposition displays automatically
        expect(await maxDispositionPage.isDispositionPanelDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Disposition pop over does not display");

        // 14. Select a disposition and click on "Save" button
        await maxDispositionPage.fillDispositionForm(DispositionName.DISPOSITION_1);
        await maxDispositionPage.saveAndCloseDisposition();

        // VP: When the ACW time configured in disposition has been completed, verify the Ib Email workspace closes and MAX displays the glance        
        maxPage = await maxEmailPage.waitACWDisappear(acwTimeOut);
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "Email workspace does not close");

        // VP: Verify that MAX still displaying the same size before start the Ib Email Contact
        expect(await maxPage.getMaxGlanceSize()).toBe(glanceWidthBeforeContact, "MAX is not displaying the same size before starting the IB Email Contact");

        // 15. Repeat the step 4 in order to have an IB Email Contact to verify Forward Email function
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // Click on "Forward" button
        await maxEmailPage.selectEmailButton(EmailButtonTitle.FORWARD);

        // Enter an email and text in the body of email and click on "Send" button
        await maxEmailPage.enterToAddress(validEmail);
        await maxEmailPage.enterEmailBody(emailContent, true);
        await maxEmailPage.selectEmailButton(EmailButtonTitle.SEND);

        // VP: Verify the pop over of disposition displays automatically
        expect(await maxDispositionPage.isDispositionPanelDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Disposition pop over does not display");

        // 16. Select a disposition and click on "Save" button
        await maxDispositionPage.fillDispositionForm(DispositionName.DISPOSITION_1);
        await maxDispositionPage.saveAndCloseDisposition();

        // VP: Verify the ACW time configured in disposition begins to run in countdown
        expect(await maxEmailPage.isACWTimerCountCorrectly()).toBe(true, "The ACW time configured in disposition does not count down.");

        // VP: When the ACW time configured in disposition has been completed, verify the Ib Email workspace closes and MAX displays the glance
        maxPage = await maxEmailPage.waitACWDisappear(acwTimeOut);
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "Email workspace does not close");

        // VP: Verify that MAX still displaying the same size before start the Ib Email Contact
        expect(await maxPage.getMaxGlanceSize()).toBe(glanceWidthBeforeContact, "MAX is not displaying the same size before starting the IB Email Contact");

        // 17. Repeat the step 4 in order to have an IB Email Contact to verify End mail function
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // Click on "End Email" button and in the pop up click on "Proceed" button
        await maxEmailPage.endEmailWithDisposition();

        // VP: Verify the pop over of disposition displays automatically
        expect(await maxDispositionPage.isDispositionPanelDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Disposition pop over does not display");

        // VP: Verify that MAX still displaying the same size before start the Ib Email Contact
        expect(await maxPage.getMaxGlanceSize()).toBe(glanceWidthBeforeContact, "MAX is not displaying the same size before starting the IB Email Contact");

        // 18. Select a disposition and click on "Save" button
        await maxDispositionPage.fillDispositionForm(DispositionName.DISPOSITION_1);
        await maxDispositionPage.saveAndCloseDisposition();

        // VP: Verify the ACW time configured in disposition begins to run in countdown
        expect(await maxEmailPage.isACWTimerCountCorrectly()).toBe(true, "The ACW time configured in disposition does not count down.");

        // VP: When the ACW time configured in disposition has been completed, verify the Ib Email workspace closes and MAX displays the glance
        maxPage = await maxEmailPage.waitACWDisappear(acwTimeOut);
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "Email workspace does not close");

        // VP: Verify that MAX still displaying the same size before start the Ib Email Contact
        expect(await maxPage.getMaxGlanceSize()).toBe(glanceWidthBeforeContact, "MAX is not displaying the same size before starting the IB Email Contact");

    }, 1000000);

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
                await CustomAPIs.endAllContacts(ibEmailAgent);
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});