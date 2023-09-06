import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { Email, EmailButtonTitle } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 443850
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101244", function () {

    TestBase.scheduleTestBase();

    let emailJson = `{"interruptible":true,"minWorkingTime":15}`;
    let chatJson = `{"initialPriority":5,"acceleration":10,"maxPriority":100}`;
    let ibEmailChatAgent: Agent;
    let email: Email = new Email();
    let serverMail: string;
    let ibMail: InboundEmail;
    let colorLine = "rgb(255, 255, 255)";
    let colorEmailWorkspace = "rgba(0, 0, 0, 0)";
    let colorChatWorkspace = "rgb(157, 163, 165)";
    let maxSize = 300;
    let emailWorkspaceSize = 500;
    let toleranceSize = 10;
    let emailContactId: number;
    let chatContactId: string[] = new Array();
    email.initFullData("test@email.com", "Test Subject", "Test Body", "");

    // Declare page object
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101244 - MAX> SCH> One Contact> Interrupt with Digital contact> Interrupt an Email Ib Contact where it does not have Quick Replies/ Panels/ Disposition/ Screen Pops, etc.`);
        ibEmailChatAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson);
        await TestCondition.setUpAndAssignSkill(ibEmailChatAgent, SkillType.CHAT, null, null, chatJson);
        TestRunInfo.testTimeout = 2 * TestRunInfo.testTimeout;

        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailChatAgent, SkillType.IB_EMAIL);

        // Login InContact
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailChatAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-101244 - MAX SCH One Contact Interrupt with Digital contact Interrupt an Email Ib Contact where it doesnt have Quick Replies Panels Disposition Screen Pops, etc.', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailChatAgent.phoneNumber);

        // 3. Change your MAX Status to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX has the "Available" state
        expect(await maxPage.getStateStatus()).toBe(MaxState.AVAILABLE, `MAX does not have the "Available" state`);

        //4. Generate a Ib Email Contact
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        //VP: The Ib Email Contact workspace displays in MAX without errors.    
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The OB Email Contact does not deliver in Agent");
        emailContactId = await CustomAPIs.getCurrentContactId(ibEmailChatAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));

        //VP: The email workspace  must not be displayed cut off or overlap
        expect(await maxEmailPage.isEmailWorkingSpaceSizeInRange(emailWorkspaceSize, toleranceSize)).toBe(true, "The email workspace is displayed cut off or overlap");

        // VP: Check the controls, colors, labels, email inbox.
        //Controls
        //Elements of Max left side
        expect(await maxEmailPage.isEmailSearchDisplayed()).toBe(true, "Search text box is not displayed");
        expect(await maxEmailPage.isTimeStampDisplayed()).toBe(true, "Timestamp of contact start is not displayed");
        expect(await maxEmailPage.isOBBoxDisplayed()).toBe(true, "The Outbound box is not displayed");
        expect(await maxEmailPage.isWorkingBoxDisplayed()).toBe(true, "The Working box is not displayed");
        expect(await maxEmailPage.isParkedBoxDisplayed()).toBe(true, "The Parked box is not displayed");
        expect(await maxEmailPage.isOBExpanderDisplayed()).toBe(true, "The Outbound expand/collapse control is not displayed");
        expect(await maxEmailPage.isWorkingExpanderDisplayed()).toBe(true, "The Working expand/collapse control is not displayed");
        expect(await maxEmailPage.isParkedExpanderDisplayed()).toBe(true, "The Parked expand/collapse control is not displayed");

        //Element of Email Workspace on right side
        expect(await maxEmailPage.isRightFrameCustomerIconDisplayed()).toBe(true, "Right frame customer icon is not displayed");
        expect(await maxEmailPage.isRightFrameTimeCounterDisplayed()).toBe(true, "Right frame time counter is not displayed");
        expect(await maxEmailPage.isRightFrameSkillNameDisplayed()).toBe(true, "Right frame skill name is not displayed");
        expect(await maxEmailPage.isReplyButtonDisplayed()).toBe(true, "Right frame reply button is not displayed");
        expect(await maxEmailPage.isReplyAllButtonDisplayed()).toBe(true, "Right frame reply all button is not displayed");
        expect(await maxEmailPage.isTransferButtonDisplayed()).toBe(true, "Right frame Transfer button is not displayed");
        expect(await maxEmailPage.isRequeueButtonDisplayed()).toBe(true, "Right frame Requeue button is not displayed");
        expect(await maxEmailPage.isLaunchButtonDisplayed()).toBe(true, "Right frame Launch button is not displayed");
        expect(await maxEmailPage.isEndButtonDisplayed()).toBe(true, "Right frame End button is not displayed");
        expect(await maxEmailPage.isForwardButtonDisplayed()).toBe(true, "Right frame forward button is not displayed");
        expect(await maxEmailPage.isSubjectDisplayed()).toBe(true, "Right frame Subject is not displayed");
        expect(await maxEmailPage.isRightFrameContactStartTimeDisplayed()).toBe(true, "Right frame contact start time is not displayed");
        expect(await maxEmailPage.isRightFrameFromAddressDisplayed()).toBe(true, "Right frame from address is not displayed");

        //Labels
        expect(await maxEmailPage.getSkillNameLabel()).toBe(SkillCore.getSkillName(SkillType.IB_EMAIL), "Skill Name label is not correct");
        expect(await maxEmailPage.getEmailHeaderLabel()).toBe("NoReply@incontact.com", "Email Header is not correct");

        //Colors
        expect(await maxEmailPage.getSkillNameColor()).toBe("rgb(166, 168, 171)", "Skill Name color is not correct");
        expect(await maxEmailPage.getEmailHeaderColor()).toBe("rgb(255, 136, 0)", "Email Header color is not correct");
        expect(await maxEmailPage.getReplyButtonColor()).toBe(colorLine, "Reply button color is not correct");
        expect(await maxEmailPage.getReplyAllButtonColor()).toBe(colorLine, "Reply all button color is not correct");
        expect(await maxEmailPage.getForwardButtonColor()).toBe(colorLine, "Forward button color is not correct");
        expect(await maxEmailPage.getTransferButtonColor()).toBe(colorLine, "Transfer button color is not correct");
        expect(await maxEmailPage.getRequeueButtonColor()).toBe(colorLine, "Requeue button color is not correct");
        expect(await maxEmailPage.getLaunchButtonColor()).toBe(colorLine, "Launch button color is not correct");
        expect(await maxEmailPage.getEndButtonColor()).toBe(colorLine, "End button color is not correct");
        expect(await maxEmailPage.getEmailWorkspaceColor()).toBe(colorEmailWorkspace, "Email workspace color is not correct");

        //The body of email is displayed completely.
        expect(await maxEmailPage.isEmailBodyDisplayed(TestRunInfo.middleTimeout)).toBe(true, "Email body is not displayed");

        //5. generate the Ib Chat Contact 
        await TestHelpers.startChatContact(ibEmailChatAgent);
        await maxEmailPage.waitForNewContactPopUp();
        maxChatPage = await maxEmailPage.acceptNewChatContact();

        // VP: the Agent gets interrupted and IB Chat is delivered.
        // the Email is parked and displays in Parked section from inbox email.
        expect(await maxEmailPage.isEmailInterruptedHeaderDisplayed()).toBe(true, "The Agent does not get interrupted");
        await maxEmailPage.showContactWorkSpace(ContactName.CHAT);
        await maxChatPage.hideMaxGlance();
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "MAX still displays the Email Ob workspace");
        await maxChatPage.showMaxGlance();
        expect(await maxChatPage.isContactTitleParked(TestRunInfo.middleTimeout)).toBe(true, "Contact Title is not parked");
        await maxChatPage.hideMaxGlance();
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "MAX does not display the Chat workspace");

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

        //6. End the Chat Contact
        maxPage = await maxChatPage.endChatContact();
        await maxPage.waitForEmailWorkspace();

        //VP: the Ib Chat workspace closes and MAX displays the Email Ib workspace.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.CHAT, TestRunInfo.shortTimeout)).toBe(false, "MAX still displays the Chat workspace");
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.middleTimeout)).toBe(true, "MAX is not displays the Email workspace");
        expect(await maxEmailPage.isEmailInterruptedHeaderDisplayed(TestRunInfo.shortTimeout)).toBe(false, "The Agent Email still get interrupted");

        // the Ib Email still displaying in the same size before interrupt by the Ib Chat Contact.
        expect(await maxEmailPage.isEmailWorkingSpaceSizeInRange(emailWorkspaceSize, toleranceSize)).toBe(true, "The Ib Email is not displayed in the same size before interrupt by the Ib Chat Contact");

        // 7. Un-park the email
        // Email auto unpark after chat was ending

        // VP: Verify the email has been un-parked and you can continues to work on it.
        expect(await maxEmailPage.isEmailParked(emailContactId, TestRunInfo.middleTimeout)).toBe(false, "The email has not been un-parked");

        // 8. Click on "Reply" button Enter a text in the body of email and click on "Send" button
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);
        await maxEmailPage.enterEmailBody("Test" + Utility.createRandomString(6), true);
        await maxEmailPage.selectEmailButton(EmailButtonTitle.SEND);
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.EMAIL);

        //VP: Verify the Ib Email workspace closes and MAX displays the glance.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "MAX still displays the Email workspace");

        //VP: Verify that MAX still displaying the same size before start the Ib Email Contact.
        expect(await maxPage.isMaxGlanceSizeInRange(maxSize, toleranceSize)).toBe(true, "MAX size is not correct in range");

        // 9. Repeat the step 4 -7 in order to have an IB Email Contact to verify Reply all function when interrupted(Note: In step 5 and 6 you can generate a Work Item)
        // Generate the Ib email Contact 
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // Generate the Ib Chat Contact 
        await TestHelpers.startChatContact(ibEmailChatAgent);
        await maxEmailPage.waitForNewContactPopUp();
        await maxEmailPage.acceptNewChatContact();
        chatContactId[0] = await CustomAPIs.getCurrentContactId(ibEmailChatAgent, SkillCore.getSkillName(SkillType.CHAT));
        await maxPage.showMaxGlance();
        await maxPage.selectGlanceActiveContact(chatContactId[0]);
        maxChatPage = await maxPage.waitForChatWorkspace();

        // End the Chat Contact
        maxPage = await maxChatPage.endChatContact();

        // Click on "Reply All"  button
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY_ALL);

        // Enter a text in the body of email and click on "Send" button
        await maxEmailPage.enterEmailBody("Test" + Utility.createRandomString(6), true);
        await maxEmailPage.selectEmailButton(EmailButtonTitle.SEND);
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.EMAIL);

        //VP: Verify the Ib Email workspace closes and MAX displays the glance.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "MAX still displays the Email workspace");

        //VP: Verify that MAX still displaying the same size before start the Ib Email Contact.
        expect(await maxPage.isMaxGlanceSizeInRange(maxSize, toleranceSize)).toBe(true, "MAX size is not correct in range");

        // 10. Repeat the step 4 - 7 in order to have an IB Email Contact to verify Forward function when interrupted (Note: In step 5 and 6 you can generate a Work Item)
        // Generate the Ib email Contact 
        await Utility.sendIBEmail(serverMail, ibMail);

        // Generate the Ib Chat Contact 
        await TestHelpers.startChatContact(ibEmailChatAgent);
        await maxEmailPage.waitForNewContactPopUp();
        await maxEmailPage.acceptNewChatContact();
        chatContactId[1] = await CustomAPIs.getCurrentContactId(ibEmailChatAgent, SkillCore.getSkillName(SkillType.CHAT));
        await maxPage.showMaxGlance();
        await maxPage.selectGlanceActiveContact(chatContactId[1]);
        maxChatPage = await maxPage.waitForChatWorkspace();

        // End the Chat Contact
        maxPage = await maxChatPage.endChatContact();

        // Click on "Forward" button
        await maxEmailPage.selectEmailButton(EmailButtonTitle.FORWARD);

        // Enter an email and text in the body of email and click on "Send" button
        await maxEmailPage.enterToAddress("Automation@test.com");
        await maxEmailPage.enterEmailBody("Test" + Utility.createRandomString(6), true);
        await maxEmailPage.selectEmailButton(EmailButtonTitle.SEND);
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.EMAIL);

        //VP: Verify the Ib Email workspace closes and MAX displays the glance.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "MAX still displays the Email workspace");

        //VP: Verify that MAX still displaying the same size before start the Ib Email Contact.
        expect(await maxPage.isMaxGlanceSizeInRange(maxSize, toleranceSize)).toBe(true, "MAX size is not correct in range");

        // 11. Repeat the step 4 - 7 in order to have an IB Email Contact to verify End function when interrupted  (Note: In step 5 and 6 you can generate a Work Iteml)
        // Generate the Ib email Contact 
        await Utility.sendIBEmail(serverMail, ibMail);

        // Generate the Ib Chat Contact 
        await TestHelpers.startChatContact(ibEmailChatAgent);
        await maxEmailPage.waitForNewContactPopUp();
        await maxEmailPage.acceptNewChatContact();
        chatContactId[2] = await CustomAPIs.getCurrentContactId(ibEmailChatAgent, SkillCore.getSkillName(SkillType.CHAT));
        await maxPage.showMaxGlance();
        await maxPage.selectGlanceActiveContact(chatContactId[2]);
        maxChatPage = await maxPage.waitForChatWorkspace();

        // End the Chat Contact
        maxPage = await maxChatPage.endChatContact();

        // Click on "End Email"  button and in the pop up click on "Proceed" button
        maxPage = await maxEmailPage.endEmailContact();
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.EMAIL);

        //VP: Verify the Ib Email workspace closes and MAX displays the glance.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "MAX still displays the Email workspace");

        //VP: Verify that MAX still displaying the same size before start the Ib Email Contact.
        expect(await maxPage.isMaxGlanceSizeInRange(maxSize, toleranceSize)).toBe(true, "MAX size is not correct in range");

    }, TestRunInfo.testTimeout * 2);

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            centralPage = await maxPage.logOut();

            // Logout InContact
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(ibEmailChatAgent, SkillType.CHAT);
                await TestCondition.setAgentSkillsToDefault(ibEmailChatAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});