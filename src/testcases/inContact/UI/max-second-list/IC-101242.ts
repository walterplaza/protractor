import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { Email } from "@data-objects/inContact/max/email/email-info";
import QuickRepliesPage from "@page-objects/inContact/central/admin/communication/quick-replies/quick-replies";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import SkillsDetailPage from "@page-objects/inContact/central/routing/skills/skills-detail-page";
import SkillsListPage from "@page-objects/inContact/central/routing/skills/skills-list-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 443852
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101242", function () {

    TestBase.scheduleTestBase();

    let emailJson = `{"interruptible":true,"minWorkingTime":15}`;
    let chatJson = `{"initialPriority":5,"acceleration":10,"maxPriority":100}`;
    let obEmailChatAgent: Agent;
    let email: Email = new Email();
    email.initFullData("test@email.com", "Test Subject", "Test Body", "");
    let timeoutMultiChat: number = 180;
    let countDownChat: number = 10;

    // Declare page object
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let skillPage: SkillsListPage;
    let skillDetailPage: SkillsDetailPage;
    let colorLine = "rgb(255, 255, 255)";
    let colorEmailWorkspace = "rgba(0, 0, 0, 0)";
    let colorChatWorkspace = "rgb(157, 163, 165)";
    let maxSize = 300;
    let emailWorkspaceSize = 500;
    let toleranceSize = 10;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101242 - MAX SCH One Contact Interrupt with Digital Contact Interrupt an Email Ob Contact where it doesn't have Quick Replies Panels Disposition Screen Pops, etc.`);
        obEmailChatAgent = await TestCondition.setUpAgent(SkillType.OB_EMAIL, null, null, emailJson);
        await TestCondition.setUpAndAssignSkill(obEmailChatAgent, SkillType.CHAT, null, null, chatJson);

        // Pre-condition
        // Login InContact
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(obEmailChatAgent);
        await TestCondition.cleanUpQuickReply(obEmailChatAgent);

        // Set Max Chat Time out 180s
        skillPage = await centralPage.gotoSkillsListPage();
        skillDetailPage = await skillPage.selectSkillDetail(SkillType.CHAT);
        await skillDetailPage.clickEditButton();
        await skillDetailPage.setChatTimeOut(true, timeoutMultiChat, countDownChat);
        await skillDetailPage.completeChanges();
    }, TestRunInfo.conditionTimeout);

    it('IC-101242 - MAX SCH One Contact Interrupt with Digital Contact Interrupt an Email Ob Contact where it doesnt have Quick Replies Panels Disposition Screen Pops, etc.', async () => {

        // 2. Launch MAX
        maxPage = await skillDetailPage.launchMAX(obEmailChatAgent.phoneNumber);

        // 3. Change your MAX Status to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX has the "Available" state
        expect(await maxPage.getStateStatus()).toBe(MaxState.AVAILABLE, 'MAX does not have the "Available" state');

        //4. From MAX> Toolbar, click on "New> Add New> Outbound Email> Pop Over Dialog> Select your Ob Email Skill" 
        maxEmailPage = await maxPage.openOBEmailWorkspace(email.toAddress);

        //VP: The Ob Email Contact workspace displays in MAX without errors.    
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The OB Email Contact does not deliver in Agent");

        //VP: The email workspace  must not be displayed cut off or overlap
        expect(await maxEmailPage.isEmailWorkingSpaceSizeInRange(emailWorkspaceSize, toleranceSize)).toBe(true, "The email workspace is displayed cut off or overlap");

        // VP: Check the controls, colors, labels, email inbox.
        await Logger.write(FunctionType.UI, `Verifying OB email displayed completely with correct controls, colors, labels, email inbox and size`);
        //Controls
        //Elements of Max left side        
        expect(await maxEmailPage.isEmailSearchDisplayed()).toBe(true, "Search text box is not displayed");
        expect(await maxEmailPage.isOBEmailDetailBoxDisplayed()).toBe(true, "outbound email contact details is not displayed")
        expect(await maxEmailPage.isCustomerIconDisplayed()).toBe(true, "Customer Card icon is not displayed");
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
        expect(await maxEmailPage.getSkillNameLabel()).toBe(SkillCore.getSkillName(SkillType.OB_EMAIL), "Skill Name label is not correct");
        expect(await maxEmailPage.getEmailHeaderLabel()).toBe(email.toAddress, "Email Header is not correct");
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

        //The body of email is displayed completely.
        expect(await maxEmailPage.isEmailBodyDisplayed()).toBe(true, "End body is not displayed");

        // 5. Enter a valid email in "TO" 
        // Verify the "TO" field populates according the value entered.
        // Also verify from the Inbox Email section>Outbound section> the Email has the value entered in "TO" field.
        expect(await maxEmailPage.isSendButtonDisabled()).toBe(false, "Send button is disabled");
        expect(await maxEmailPage.getFormHeaderPatronAddress()).toBe(email.toAddress, "The name does not update on Form header");
        expect(await maxEmailPage.getContactBoxPatronAddress()).toBe(email.toAddress, "The name does not update on contact box");

        // Validate Email workspace "Subject" value
        // VP: Upon entering a "Subject" value, the name updates on the contact box only (below skill name)
        await maxEmailPage.enterEmailSubject(email.emailSubject);
        expect(await maxEmailPage.getContactBoxEmailSubject()).toBe(email.emailSubject, "The subject does not update on the contact box");

        //6. generate the Ib Chat Contact 
        await TestHelpers.startChatContact(obEmailChatAgent);
        await maxEmailPage.waitForNewContactPopUp();
        let maxChatPage = await maxEmailPage.acceptNewChatContact();

        // VP: the Agent gets interrupted and IB Chat is delivered.
        // the Email has the "Email Interrupted" label
        expect(await maxEmailPage.isEmailInterruptedHeaderDisplayed()).toBe(true, "The Agent doesn't get interrupted");
        await maxEmailPage.showContactWorkSpace(ContactName.CHAT);
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "MAX still displays the Email Ob workspace");
        await maxChatPage.showMaxGlance();
        expect(await maxChatPage.isContactTitleParked()).toBe(true, "Contact Title is not parked");
        await maxChatPage.hideMaxGlance();
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "MAX does not displays the Chat workspace");

        // Check the controls, colors, labels in Chat.
        expect(await maxChatPage.isTransferButtonDisplayed()).toBe(true, "Transfer button is not displayed");
        expect(await maxChatPage.isLaunchButtonDisplayed()).toBe(true, "Launch button is not displayed");
        expect(await maxChatPage.isEndButtonDisplayed()).toBe(true, "End button is not displayed");

        //Label
        expect(await maxChatPage.getTransferButtonLabel()).toBe("Transfer", "Transfer button label is not correct");
        expect(await maxChatPage.getChatContactLabel()).toBe("Unknown", "Chat contact label is not correct");
        expect(await maxChatPage.getLaunchButtonLabel()).toBe("Launch", "Launch button label is not correct");
        expect(await maxChatPage.getEndButtonLabel()).toBe("End", "End button label is not correct");

        //Color
        expect(await maxChatPage.getTransferButtonColor()).toBe(colorLine, "Transfer button color is not correct");
        expect(await maxChatPage.getLaunchButtonColor()).toBe(colorLine, "Launch button color is not correct");
        expect(await maxChatPage.getEndButtonColor()).toBe(colorLine, "End button color is not correct");
        expect(await maxChatPage.getChatWorkspaceColor()).toBe(colorChatWorkspace, "Chat workspace color is not correct");

        //7. Finish the Chat Contact
        maxPage = await maxChatPage.endChatContact();

        //VP: the Ib Chat workspace closes and MAX displays the Email Ob workspace.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.CHAT, TestRunInfo.shortTimeout)).toBe(false, "MAX still displays the Chat workspace");
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "MAX is not displays the Email workspace");
        expect(await maxEmailPage.isEmailInterruptedHeaderDisplayed(TestRunInfo.shortTimeout)).toBe(false, "The Agent Email still get interrupted");

        // the Ob Email still displaying in the same size before interrupt by the Ib Chat Contact.
        expect(await maxEmailPage.isEmailWorkingSpaceSizeInRange(emailWorkspaceSize, toleranceSize)).toBe(true, "The email workspace is displayed cut off or overlap");

        // 8. Enter a Subject and text in the body of email and click on "Send" button
        await maxEmailPage.sendOutboundEmail(email.toAddress, email.emailSubject, email.emailBody);

        //VP: Verify the Ob Email workspace closes and MAX displays the glance.
        //Verify that MAX still displaying the same size before start the Ob Email Contact.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "MAX still displays the Email workspace");
        expect(await maxPage.isGlanceSizeInRange(maxSize, toleranceSize)).toBe(true, "MAX size is not correct in range");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            centralPage = await maxPage.logOut();

            // Set disable Max Chat Time
            await skillDetailPage.clickEditButton();
            await skillDetailPage.setChatTimeOut(false);
            await skillDetailPage.completeChanges();

            // Logout InContact
            await skillDetailPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(obEmailChatAgent, SkillType.CHAT);
                await TestCondition.setAgentSkillsToDefault(obEmailChatAgent, SkillType.OB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});