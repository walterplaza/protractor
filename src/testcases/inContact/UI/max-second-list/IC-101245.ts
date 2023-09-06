import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { ContactName, MAXWorkspaceSize } from "@data-objects/general/max";
import { InboundEmail, SkillType, SkillCore } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import SkillsDetailPage from "@page-objects/inContact/central/routing/skills/skills-detail-page";
import SkillsListPage from "@page-objects/inContact/central/routing/skills/skills-list-page";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { EmailMode, EmailTinyToolButton, EmailButtonTitle } from "@data-objects/inContact/max/email/email-info";
import { ISize } from "selenium-webdriver";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 443847
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('MAX suite - IC-101245', function () {

    TestRunInfo.testTimeout = 1200000

    let ibMail: InboundEmail;
    let serverMail: string;
    let textUrl: string = "https://www.google.com";
    let Json: string = `{"useScreenPops": true, "useCustomScreenPops": true, "screenPopType": "webpage","screenPopDetails": "${textUrl}"}`;
    let enteredText: string = Utility.createRandomString(20, "entered_text_1");
    let emailBodyText: string;
    let colorLine = "rgb(255, 255, 255)";
    let colorEmailWorkspace = "rgba(0, 0, 0, 0)";
    let maxSize = parseInt(MAXWorkspaceSize.WIDTH_MAX_GLANCE);
    let emailWorkspaceSize: ISize;
    let emailWorkspaceReSize: ISize;
    let toleranceSize = 10;
    let emailForward: string = Utility.createRandomString(15, "test.") + "@mailinator.com";

    // Declare Page object
    TestBase.scheduleTestBase();
    let ibEmailAgent: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let skillListPage: SkillsListPage;
    let detailPage: SkillsDetailPage;
    let maxEmailPage: MaxEmailPage

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101245 - MAX> SCH> One Contact> Generate an Email Ib Contact with Screen Pops and Panels = On`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, Json);

        // Prepare inbound email data:
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);

    }, TestRunInfo.conditionTimeout);

    it('IC-101245 - MAX SCH One Contact Generate an Email Ib Contact with Screen Pops and Panels On', async () => {

        // Requirement(s)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailAgent);

        // The Ib Email skill must have configured a Screen Pop
        // Check the "Use Screen Pops" check box
        // Check the "Use Custom Screen Pops" check box
        // Select the "Webpage" radio button
        // Enter a page in "Webpage" field. E.g. https://www.latam.com/)

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 3. From Toolbar, click on More> Settings> Panels and set ON value 
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxPanelsSetting(State.ON, false,TestRunInfo.middleTimeout*1.5);
        await maxPage.closePopover();

        // VP: The panels has been configured in Max
        expect(await maxPage.getPanelSettingStatus()).toBe(State.ON.toLocaleLowerCase(), "The panels hasn't been configured in Max");
        await maxPage.closePopover();

        // 4. Set the Available state
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: Max has available state
        expect(await maxPage.getStateStatus()).toBe(MaxState.AVAILABLE, "Max doesn't have available state");

        // 5. Generate an inbound email contact
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();
        emailWorkspaceSize = await maxEmailPage.getContactWorkSpaceSize(ContactName.EMAIL);

        // VP: The IB email contact delivery automatically in Max without errors and next to the email workspace there is a panel work space 
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The IB email contact doesn't delivery automatically in MAX");

        // VP: The panel must have the screen pop configured in requirement.
        expect(await maxPage.isScreenPopsDisplayed()).toBe(true, "The screen pop panel doesn't display");
        expect(await maxPage.getScreenPopsTitle()).toContain(textUrl, "The screen pop has been displayed with the url as configured in requirement");

        // VP: The workspace must not be displayed cut off or overlap
        expect(await maxEmailPage.isEmailWorkSpaceCutOff(emailWorkspaceSize.width)).toBe(false, "The email workspace is displayed cut off or overlap");

        // VP: Check the controls, colors, labels, email inbox and size
        await Logger.write(FunctionType.UI, `Verifying IB email displayed completely with correct controls, colors, labels, email inbox and size`);
        //Controls
        //Elements of Max left side
        expect(await maxEmailPage.isEmailSearchDisplayed()).toBe(true, "Search text box is not displayed");
        expect(await maxEmailPage.isOBEmailDetailBoxDisplayed()).toBe(true, "outbound email contact details is not displayed");
        expect(await maxEmailPage.isTimeStampDisplayed()).toBe(true, "Timestamp of contact start is not displayed");
        expect(await maxEmailPage.isOBBoxDisplayed()).toBe(true, "The Outbound box is not displayed");
        expect(await maxEmailPage.isWorkingBoxDisplayed()).toBe(true, "The Working box is not displayed");
        expect(await maxEmailPage.isParkedBoxDisplayed()).toBe(true, "The Parked box is not displayed");
        expect(await maxEmailPage.isOBExpanderDisplayed()).toBe(true, "The Outbound expand/collapse control is not displayed");
        expect(await maxEmailPage.isWorkingExpanderDisplayed()).toBe(true, "The Working expand/collapse control is not displayed");
        expect(await maxEmailPage.isParkedExpanderDisplayed()).toBe(true, "The Parked expand/collapse control is not displayed");

        //Element of Email Workspace on right side
        expect(await maxEmailPage.isRightFrameCustomerIconDisplayed()).toBe(true, "Right frame customer iscon is not displayed");
        expect(await maxEmailPage.isRightFrameTimeCounterDisplayed()).toBe(true, "Right frame time counter is not displayed");
        expect(await maxEmailPage.isRightFrameSkillNameDisplayed()).toBe(true, "Right frame skill name is not displayed");
        expect(await maxEmailPage.isDiscardButtonDisplayed()).toBe(true, "Right frame discard button is not displayed");
        expect(await maxEmailPage.isSendButtonDisplayed()).toBe(true, "Right frame Send button is not displayed");
        expect(await maxEmailPage.isTransferButtonDisplayed()).toBe(true, "Right frame Transfer button is not displayed");
        expect(await maxEmailPage.isRequeueButtonDisplayed()).toBe(true, "Right frame Requeue button is not displayed");
        expect(await maxEmailPage.isLaunchButtonDisplayed()).toBe(true, "Right frame Launch button is not displayed");
        expect(await maxEmailPage.isEndButtonDisplayed()).toBe(true, "Right frame End button is not displayed");
        expect(await maxEmailPage.isToAddressDisplayed()).toBe(true, "Right frame To address is not displayed");
        expect(await maxEmailPage.isCCAddressDisplayed()).toBe(true, "Right frame CC Address is not displayed");
        expect(await maxEmailPage.isBCCAddressDisplayed()).toBe(true, "Right frame BCC Address is not displayed");
        expect(await maxEmailPage.isSubjectDisplayed()).toBe(true, "Right frame Subject is not displayed");
        expect(await maxEmailPage.isRichTextBarDisplayed()).toBe(true, "Right frame Rich text tool bar is not displayed");
        expect(await maxEmailPage.isAttachmentButtonDisplayed()).toBe(true, "Right frame Attachment button is not displayed");
        expect(await maxEmailPage.isRightFrameContactStartTimeDisplayed()).toBe(true, "Right frame contact start time is not displayed");
        expect(await maxEmailPage.isRightFrameFromAddressDisplayed()).toBe(true, "Right frame from address is not displayed");

        //Labels
        expect(await maxEmailPage.getSkillNameLabel()).toBe(SkillCore.getSkillName(SkillType.IB_EMAIL), "Skill Name label is not correct");
        expect(await maxEmailPage.getDiscardDraftLabel()).toBe("Discard Draft", "Discard Draft button label is not correct");
        expect(await maxEmailPage.getSendButtonLabel()).toBe("Send", "Send button label is not correct");
        expect(await maxEmailPage.getTransferButtonLabel()).toBe("Transfer", "Transfer button label is not correct");
        expect(await maxEmailPage.getRequeueButtonLabel()).toBe("Requeue", "Requeue button label is not correct");
        expect(await maxEmailPage.getLaunchButtonLabel()).toBe("Launch", "Launch button label is not correct");
        expect(await maxEmailPage.getEndButtonLabel()).toBe("End Email", "End button label is not correct");

        //Colors
        expect(await maxEmailPage.getSkillNameColor()).toBe("rgb(166, 168, 171)", "Skill Name color is not correct");
        expect(await maxEmailPage.getEmailHeaderColor()).toBe("rgb(255, 136, 0)", "Email Header color is not correct");
        expect(await maxEmailPage.getDiscardButtonColor()).toBe(colorLine, "Discard Draft button color is not correct");
        expect(await maxEmailPage.getSendButtonColor()).toBe(colorLine, "Send button color is not correct");
        expect(await maxEmailPage.getTransferButtonColor()).toBe(colorLine, "Transfer button color is not correct");
        expect(await maxEmailPage.getRequeueButtonColor()).toBe(colorLine, "Requeue button color is not correct");
        expect(await maxEmailPage.getLaunchButtonColor()).toBe(colorLine, "Launch button color is not correct");
        expect(await maxEmailPage.getEndButtonColor()).toBe(colorLine, "End button color is not correct");
        expect(await maxEmailPage.getEmailWorkspaceColor()).toBe(colorEmailWorkspace, "Email workspace color is not correct");

        // VP: The body email is displayed completely
        expect(await maxEmailPage.isEmailBodyDisplayed()).toBe(true, "End body is not displayed");

        // 6. Click on "Reply" button
        await maxEmailPage.clickReplyButton();
        await maxEmailPage.enterEmailBody(enteredText);

        // VP: The email is in edit mode and email add text in the body
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "The email isn't in edit mode and email add text in the body");
        expect(await maxEmailPage.getEmailContentInEditMode()).toContain(enteredText, "email cannot add text in the body");

        // VP: The original body of email continues to displayed completely
        expect(await maxEmailPage.isEmailBodyDisplayed()).toBe(true, "End body is not displayed");

        // VP: Tiny tool displays and we can use it for give format in text.
        expect(await maxEmailPage.isEmailTinyToolbarDisplays()).toBe(true, "Tiny tool doesn't display and we can use it for give format in text.")
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.BOLD)).toBe(true, "The bold button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.ITALIC)).toBe(true, "The italic button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.STRIKETHROUGH)).toBe(true, "The strike through button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.UNDERLINE)).toBe(true, "The underline button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.FONTFAMILY)).toBe(true, "The font family button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.FONTSIZES)).toBe(true, "The font sizes button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.TEXTCOLOR)).toBe(true, "The text color button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.BACKGROUNDCOLOR)).toBe(true, "The background color button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.BULLETLIST)).toBe(true, "The bullet let button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.NUMBERLIST)).toBe(true, "The number list button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.DECREASEINDENT)).toBe(true, "The decrease indent button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.INCRESEINDENT)).toBe(true, "The increase indent button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.UNDO)).toBe(true, "The undo button is not displayed");

        // VP: the "TO" field populates automatically
        expect(await maxEmailPage.isToAddressContentPopulated()).toBe(true, "The 'TO' field doesn't populate automatically")

        // VP: the email workspace  must not be displayed cut off or overlap
        expect(await maxEmailPage.isEmailWorkSpaceCutOff(emailWorkspaceSize.width)).toBe(false, "The email workspace is displayed cut off or overlap");

        // VP: the panel workspace must continue to be shown and keeps its size.
        emailWorkspaceReSize = await maxEmailPage.getContactWorkSpaceSize(ContactName.EMAIL);
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The panel workspace does not continue to be shown");
        expect(emailWorkspaceReSize.width).toBe(emailWorkspaceSize.width, "The email work space does not keep its size");

        // 7. Click on "Discard" button
        await maxEmailPage.discardEmailDraft();
        emailBodyText = await maxEmailPage.getEmailContentInReadMode();

        // VP: Verify the email is in read mode and the text entered in step 5 has lost.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "Email isn't in read mode");
        expect(emailBodyText.includes(enteredText)).toBe(false, "the text entered in step 5 hasn't lost");

        // 8. Click "Reply All" 
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY_ALL);
        await maxEmailPage.enterEmailBody(enteredText);

        // VP: The email is in edit mode and email add text in the body
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "The email isn't in edit mode");
        expect(await maxEmailPage.getEmailContentInEditMode()).toContain(enteredText, "email cannot add text in the body")

        // VP: The original body of email continues to displayed completely
        expect(await maxEmailPage.isEmailBodyDisplayed()).toBe(true, "End body is not displayed");

        // VP: Tiny tool displays and we can use it for give format in text.
        expect(await maxEmailPage.isEmailTinyToolbarDisplays()).toBe(true, "Tiny tool doesn't display and we can use it for give format in text.")
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.BOLD)).toBe(true, "The bold button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.ITALIC)).toBe(true, "The italic button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.STRIKETHROUGH)).toBe(true, "The strike through button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.UNDERLINE)).toBe(true, "The underline button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.FONTFAMILY)).toBe(true, "The font family button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.FONTSIZES)).toBe(true, "The font sizes button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.TEXTCOLOR)).toBe(true, "The text color button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.BACKGROUNDCOLOR)).toBe(true, "The background color button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.BULLETLIST)).toBe(true, "The bullet let button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.NUMBERLIST)).toBe(true, "The number list button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.DECREASEINDENT)).toBe(true, "The decrease indent button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.INCRESEINDENT)).toBe(true, "The increase indent button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.UNDO)).toBe(true, "The undo button is not displayed");

        // VP: the "TO" and "CC" fields populate automatically
        expect(await maxEmailPage.isToAddressContentPopulated()).toBe(true, "the 'TO' fields populate automatically");

        // VP:  the panel workspace must continue to be shown and keeps its size.
        emailWorkspaceReSize = await maxEmailPage.getContactWorkSpaceSize(ContactName.EMAIL);
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The panel workspace does not continue to be shown");
        expect(emailWorkspaceReSize.width).toBe(emailWorkspaceSize.width, "The email work space does not keep its size");

        // 9. Click discard button
        await maxEmailPage.discardEmailDraft();
        emailBodyText = await maxEmailPage.getEmailContentInReadMode();

        // VP: Verify the email is in read mode and the text entered in step 7 has been lost.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "the email is not in read mode");
        expect(emailBodyText.includes(enteredText)).toBe(false, "the text entered in step 7 has not been lost")

        // 10. Click forward button
        await maxEmailPage.selectEmailButton(EmailButtonTitle.FORWARD);
        await maxEmailPage.enterEmailBody(enteredText);

        // VP: the email is in edit mode and you can add text in the body.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "The email is not in edit mode");
        expect(await maxEmailPage.getEmailContentInEditMode()).toContain(enteredText, "email cannot add text in the body")

        // VP: the original body of email continues to displayed completely
        expect(await maxEmailPage.isEmailBodyDisplayed()).toBe(true, "End body is not displayed");

        // VP: the Tiny tool displays and we can use it for give format in text.
        expect(await maxEmailPage.isEmailTinyToolbarDisplays()).toBe(true, "Tiny tool doesn't display and we can use it for give format in text.")
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.BOLD)).toBe(true, "The bold button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.ITALIC)).toBe(true, "The italic button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.STRIKETHROUGH)).toBe(true, "The strike through button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.UNDERLINE)).toBe(true, "The underline button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.FONTFAMILY)).toBe(true, "The font family button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.FONTSIZES)).toBe(true, "The font sizes button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.TEXTCOLOR)).toBe(true, "The text color button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.BACKGROUNDCOLOR)).toBe(true, "The background color button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.BULLETLIST)).toBe(true, "The bullet let button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.NUMBERLIST)).toBe(true, "The number list button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.DECREASEINDENT)).toBe(true, "The decrease indent button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.INCRESEINDENT)).toBe(true, "The increase indent button is not displayed");
        expect(await maxEmailPage.isEmailTinyToolButtonDisplayed(EmailTinyToolButton.UNDO)).toBe(true, "The undo button is not displayed");

        // VP: the "TO" and "CC" fields are displayed empty.
        expect(await maxEmailPage.getToAddressValue()).toBe("", "the 'TO' fields are displayed empty");

        // VP: the email workspace  must not be displayed cut off or overlap
        expect(await maxEmailPage.isEmailWorkSpaceCutOff(emailWorkspaceSize.width)).toBe(false, "The email workspace is displayed cut off or overlap");

        // VP: the panel workspace must continue to be shown and keeps its size.
        emailWorkspaceReSize = await maxEmailPage.getContactWorkSpaceSize(ContactName.EMAIL);
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The panel workspace does not continue to be shown");
        expect(emailWorkspaceReSize.width).toBe(emailWorkspaceSize.width, "The email work space does not keep its size");

        // 11. Click on "Discard" button 
        await maxEmailPage.discardEmailDraft();

        // VP: Verify the email is in read mode and the text entered in step 7 has been lost
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "The email is not in read mode");
        expect(enteredText.includes(await maxEmailPage.getEmailContentInReadMode())).toBe(false, "the text entered in step 10 has not been lost")

        // 12. Again click on "Reply" button. Enter a text in the body of email and click send button
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);
        await maxEmailPage.enterEmailBody(Utility.createRandomString(15, "lgvn_"));
        await maxEmailPage.clickSend();
        await maxEmailPage.waitForContactWorkSpaceDisappeared(ContactName.EMAIL);

        // VP: Verify the ib email workspace and panel close and MAX displays in glance
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "The ib email workspace does not close");
        expect(await maxPage.isScreenPopsDisplayed(TestRunInfo.shortTimeout)).toBe(false, "The panel does not close");

        // VP: Verify that MAX still displaying same size before start ib email
        expect(await maxPage.isMaxGlanceSizeInRange(maxSize, toleranceSize)).toBe(true, "MAX does not display same size before start ib email")

        // 13. Repeat step 4 in order to have ib email contact
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // Click Reply all button. Enter an email in body of email and click send button
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY_ALL);
        await maxEmailPage.enterEmailBody(Utility.createRandomString(15, "lgvn_"));
        await maxEmailPage.clickSend();
        await maxEmailPage.waitForContactWorkSpaceDisappeared(ContactName.EMAIL);

        // VP: Verify the ib email workspace and panel close and MAX displays in glance
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "The ib email workspace does not close");
        expect(await maxPage.isScreenPopsDisplayed(TestRunInfo.shortTimeout)).toBe(false, "The panel does not close");

        // VP: Verify that MAX still displaying same size before start ib email
        expect(await maxPage.isMaxGlanceSizeInRange(maxSize, toleranceSize)).toBe(true, "MAX does not display same size before start ib email")

        // 14: Repeat the step 4 in order to have an IB Email Contact 
        await Utility.sendIBEmail(serverMail, ibMail);
        await maxPage.waitForEmailWorkspace();

        // Click on "Forward" button
        await maxEmailPage.selectEmailButton(EmailButtonTitle.FORWARD);
        await maxEmailPage.enterToAddress(emailForward);
        await maxEmailPage.enterEmailBody(Utility.createRandomString(15, "lgvn_"));
        await maxEmailPage.clickSend();
        await maxEmailPage.waitForContactWorkSpaceDisappeared(ContactName.EMAIL);

        // VP: Verify the ib email workspace and panel close and MAX displays in glance
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "The ib email workspace does not close");
        expect(await maxPage.isScreenPopsDisplayed(TestRunInfo.shortTimeout)).toBe(false, "The panel does not close");

        // VP: Verify that MAX still displaying same size before start ib email
        expect(await maxPage.isMaxGlanceSizeInRange(maxSize, toleranceSize)).toBe(true, "MAX does not display same size before start ib email");

        // 15. Repeat the step 4 in order to have an IB Email Contact
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // Click on "End Email"  button and in the pop up click on "Proceed" button
        await maxEmailPage.endEmailContact();
        await maxEmailPage.waitForContactWorkSpaceDisappeared(ContactName.EMAIL);

        // VP: Verify the ib email workspace and panel close and MAX displays in glance
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "The ib email workspace does not close");
        expect(await maxPage.isScreenPopsDisplayed(TestRunInfo.shortTimeout)).toBe(false, "The panel does not close");

        // VP: Verify that MAX still displaying same size before start ib email
        expect(await maxPage.isMaxGlanceSizeInRange(maxSize, toleranceSize)).toBe(true, "MAX does not display same size before start ib email")
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



