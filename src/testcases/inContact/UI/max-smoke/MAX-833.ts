import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { ConfirmButtonTitle, Email, ErrorMessageContent } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: SMOKE test
 * TC ID: 168002
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('SMOKE Test - IC-62696', function () {
    TestBase.scheduleTestBase();
    let obEmailAgent: Agent;
    let emailData = new Email();

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxEmail: MaxEmailPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62696 - [MAX][Email][OB Email] Generate an OB Email contact.`);
        emailData.initFullData("test@email.com", "Test Subject", "Test Body", "");
        obEmailAgent = await TestCondition.setUpAgent(SkillType.OB_EMAIL);
    }, TestRunInfo.conditionTimeout);

    it('IC-62696 - MAX Email OB Email Generate an OB Email contact', async () => {

        // 2. Launch MAX
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obEmailAgent);
        maxPage = await centralPage.launchMAX(obEmailAgent.phoneNumber);
        emailData.initData('lgvn@logigear.com', 'AutomationTest', 'Attachment.txt');

        // 3. From the Glance, click  on the "New" button
        await maxPage.clickNew();

        // VP: New button clicked
        expect(await maxPage.isAddNewDialogDisplayed()).toBe(true, "New button is not clicked");

        // 4. Select Outbound Email option from Add New menu
        await maxPage.selectAddNewOption(ContactName.EMAIL);

        // VP: Outbound Email selected
        expect(await maxPage.isAddressBookDisplayed()).toBe(true, "Outbound Email is not selected");

        // 5. Select OB email skill from list
        maxEmail = await maxPage.selectEmailFromAddressBook(SkillType.OB_EMAIL, emailData.toAddress);

        // VP: OB email skill selected. OB Email workspace displayed.
        expect(await maxEmail.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "OB email skill is not selected.");

        // VP: On skill selection agent is placed into 'Working' state. 
        expect(await maxEmail.getAgentStatus()).toMatch(MaxState.WORKING, "Agent is not placed into 'Working' state");

        // 6. Validate Email workspace Top left components

        // VP: Top left "Inbox" displays control button for :
        // VP: - "Date & Time Ascending"
        expect(await maxEmail.getSortButtonTitle()).toBe(emailData.dateTimeSortType, "Date & Time Ascending is not displayed");

        // VP: - "Search" text box
        expect(await maxEmail.isEmailSearchDisplayed()).toBe(true, "Search text box is not displayed");

        // 7. Validate Email workspace Mid left components

        // VP: Mid left displays outbound email contact details
        expect(await maxEmail.isOBEmailDetailBoxDisplayed()).toBe(true, "outbound email contact details is not displayed")

        // VP: Customer Card icon (or placeholder colored pawn)
        expect(await maxEmail.isCustomerIconDisplayed()).toBe(true, "Customer Card icon is not displayed");

        // VP: Timestamp of contact start, and skill name
        expect(await maxEmail.isTimeStampDisplayed()).toBe(true, "Timestamp of contact start is not displayed");
        expect(await maxEmail.getEmailSkillName()).toBe(emailData.emailAddress, "skill name is not displayed");

        // 8. Validate Email workspace  Below "Inbox" components

        // VP: Below "Inbox" control there are the "Outbound", "Working" and "Parked" boxes with counters (if any, else 0) and expand/collapse controls 
        expect(await maxEmail.isOBBoxDisplayed()).toBe(true, "The Outbound box is not displayed");
        expect(await maxEmail.isWorkingBoxDisplayed()).toBe(true, "The Working box is not displayed");
        expect(await maxEmail.isParkedBoxDisplayed()).toBe(true, "The Parked box is not displayed");
        expect(await maxEmail.isOBExpanderDisplayed()).toBe(true, "The Outbound expand/collapse control is not displayed");
        expect(await maxEmail.isWorkingExpanderDisplayed()).toBe(true, "The Working expand/collapse control is not displayed");
        expect(await maxEmail.isParkedExpanderDisplayed()).toBe(true, "The Parked expand/collapse control is not displayed");

        // 9. Validate Email workspace Right frame components

        // VP: Right frame of workspace is the email form:
        // VP: Top displays contact information with 
        // VP: - Customer Contact Card icon (or placeholder colored pawn)
        // VP: - Time counter 
        // VP: - Skill name and from email address with timestamp of contact start time as "Day DD, HH:MM XM"
        // VP: - Control buttons: Discard Draft, Send, Transfer, Requeue, Launch, End Email
        // VP: - Recipient line: To with CC and BCC controls at right
        // VP: - Subject line with control to add attachment
        // VP: - Rich Text Control bar displays above body
        // VP: Text box body fills remainder of form
        expect(await maxEmail.isRightFrameCustomerIconDisplayed()).toBe(true, "Right frame customer iscon is not displayed");
        expect(await maxEmail.isRightFrameTimeCounterDisplayed()).toBe(true, "Right frame time counter is not displayed");
        expect(await maxEmail.isRightFrameSkillNameDisplayed()).toBe(true, "Right frame skill name is not displayed");
        expect(await maxEmail.isDiscardButtonDisplayed()).toBe(true, "Right frame discard button is not displayed");
        expect(await maxEmail.isSendButtonDisplayed()).toBe(true, "Right frame Send button is not displayed");
        expect(await maxEmail.isTransferButtonDisplayed()).toBe(true, "Right frame Transfer button is not displayed");
        expect(await maxEmail.isRequeueButtonDisplayed()).toBe(true, "Right frame Requeue button is not displayed");
        expect(await maxEmail.isLaunchButtonDisplayed()).toBe(true, "Right frame Launch button is not displayed");
        expect(await maxEmail.isEndButtonDisplayed()).toBe(true, "Right frame End button is not displayed");
        expect(await maxEmail.isToAddressDisplayed()).toBe(true, "Right frame To address is not displayed");
        expect(await maxEmail.isCCAddressDisplayed()).toBe(true, "Right frame CC Address is not displayed");
        expect(await maxEmail.isBCCAddressDisplayed()).toBe(true, "Right frame BCC Address is not displayed");
        expect(await maxEmail.isSubjectDisplayed()).toBe(true, "Right frame Subject is not displayed");
        expect(await maxEmail.isRichTextBarDisplayed()).toBe(true, "Right frame Rich text tool bar is not displayed");
        expect(await maxEmail.isEmailBodyDisplayed()).toBe(true, "Right frame Email body is not displayed");
        expect(await maxEmail.isAttachmentButtonDisplayed()).toBe(true, "Right frame Attachment button is not displayed");
        expect(await maxEmail.isRightFrameContactStartTimeDisplayed()).toBe(true, "Right frame contact start time is not displayed");
        expect(await maxEmail.isRightFrameFromAddressDisplayed()).toBe(true, "Right frame from address is not displayed");

        // 10. Validate Email workspace "Send" button

        // VP: "Send" button displayed but disabled until "To" value entered (or CC or BCC)
        await maxEmail.enterToAddress(emailData.toAddress);
        expect(await maxEmail.isSendButtonDisabled()).toBe(false, "Send button is disabled");

        // 11. Validate Email workspace "Transfer" and "Requeue" buttons

        // VP: "Transfer" and "Requeue" buttons are disabled on OB email
        expect(await maxEmail.isRequeueButtonDisabled()).toBe(true, "Requeue button is not disabled");
        expect(await maxEmail.isTransferButtonDisabled()).toBe(true, "Transfer button is not disabled");

        // 12. Validate Email workspace "To" recipient 

        // VP: Upon entering a "To" recipient value the name updates on both the contact box and form header (TO only, CC and BCC do not update other artifacts).
        expect(await maxEmail.getFormHeaderPatronAddress()).toBe(emailData.toAddress, "The name does not update on Form header");
        expect(await maxEmail.getContactBoxPatronAddress()).toBe(emailData.toAddress, "The name does not update on contact box");

        // 13. Validate Email workspace "Subject" value

        // VP: Upon entering a "Subject" value, the name updates on the contact box only (below skill name)
        await maxEmail.enterEmailSubject("AutomationTest");
        expect(await maxEmail.getContactBoxEmailSubject()).toBe(emailData.emailSubject, "The subject does not update on the contact box");

        // VP: Delete entered "Subject" value and validate the name should get deleted from the contact box (below skill name)
        await maxEmail.cleanUpEmailSubject();
        expect(await maxEmail.getContactBoxEmailSubject()).toBe("", "The subject does not update on the contact box");

        // VP: Upon entering a "Subject" value, the name updates on the contact box only (below skill name)
        await maxEmail.enterEmailSubject("AutomationTest");
        expect(await maxEmail.getContactBoxEmailSubject()).toBe(emailData.emailSubject, "The subject does not update on the contact box");

        // 14. Validate Email workspace "Add Attachment" button

        // VP: If a file is selected/attached then its name and size is listed directly under the subject line with paperclip icon.
        await maxEmail.addEmailAttachment();
        expect(await maxEmail.isEmailAttachmentDisplayed()).toBe(true, "Attached file is not listed");

        // VP: If you hover on it, this displays full name and X to remove attachment
        await maxEmail.moveMouseOverAttachedFile();
        expect(await maxEmail.isRemoveEmailAttachmentIconDisplayed()).toBe(true, "X to remove attachment is not displayed");
        expect(await maxEmail.getAttachedFileTooltip()).toBe(emailData.attachmentFileName, "Attached file's full name is not displayed");

        // 15. Validate Email workspace "Launch" button

        // VP: Open "Launch" button and it displays the Launch menu:
        await maxEmail.clickLaunch();
        expect(await maxEmail.isLaunchMenuDisplayed()).toBe(true, "The Launch menu is not displayed");

        // VP: if the skill has an Indicator configured, the indicator controls are displayed here, Otherwise the defaults state is : "No Results Found"
        expect(await maxEmail.getLaunchMenuNotice()).toBe(emailData.launchMenuNotice, "The indicator controls are not displayed");
        await maxEmail.closePopover();

        // 16. Validate Email workspace "Send" button 

        // VP: "Send" button validates recipient address format. 
        // VP: Invalid form receives error message and does not send.
        // VP: Valid address sends email and closes form and agent enters next state (if set) else returns to previous state.
        await maxEmail.clickSend();
        expect(await maxEmail.isErrorDialogDisplayed()).toBe(true, "Error message is not displayed");
        await maxEmail.confirmError();

        // 17. Validate Email workspace "Discard Draft" button

        // VP: "Discard Draft" button prompts agent with confirmation dialogue something like: "Would you like to discard this draft?" and "Discard"/ "Cancel" buttons.
        await maxEmail.clickDiscard();
        expect(await maxEmail.getErrorMessageContent()).toBe(ErrorMessageContent.DISCARD_ERROR, "Error message is not displayed");
        expect(await maxEmail.getConfirmErrorTitle()).toBe(ConfirmButtonTitle.DISCARD, "Discard button is not displayed");
        expect(await maxEmail.isCancelButtonDisplayed()).toBe(true, "Cancel button is not displayed");

        // VP: "Discard" buton discards the draft (not sent) and ends form. And  the agent returns to previous state
        await maxEmail.clickDiscardError();
        expect(await maxEmail.getAgentStatus()).toMatch(MaxState.UNAVAILABLE, "Agent is not placed into 'unavailable' state");

        // VP: "Cancel" button closes prompt and returns agent to workspace
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.EMAIL);
        await maxPage.selectEmailFromAddressBook(SkillType.OB_EMAIL, emailData.toAddress);
        await maxEmail.clickDiscard();
        await maxEmail.clickCancelError();
        expect(await maxEmail.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "OB email workspace is not displayed.");

        // 18. Validate Email workspace "End Email" button 

        // VP: "End Email" button prompts agent with confirmation dialogue something like: "This will permanently delete this contact" and "Proceed"/ "Cancel" buttons.
        await maxEmail.endEmail();
        expect(await maxEmail.getErrorMessageContent()).toBe(ErrorMessageContent.PROCEED_ERROR, "Error message is not displayed");
        expect(await maxEmail.getConfirmErrorTitle()).toBe(ConfirmButtonTitle.PROCEED, "Proceed button is not displayed");
        expect(await maxEmail.isCancelButtonDisplayed()).toBe(true, "Cancel button is not displayed");

        // VP: "Cancel" button closes prompt and returns agent to workspace
        await maxEmail.clickCancelError();
        expect(await maxEmail.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "OB email workspace is not displayed.");

        // VP: "Process" button closes the contact (not sent) and ends form. And the agent returns to previous state
        await maxEmail.endEmail();
        await maxEmail.proceedEndEmail();
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.UNAVAILABLE, "Agent is not placed into 'unavailable' state");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Log out
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(obEmailAgent, SkillType.OB_EMAIL);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



