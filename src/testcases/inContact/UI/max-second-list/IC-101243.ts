import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { Email } from "@data-objects/inContact/max/email/email-info";
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

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 443851
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101243", function () {

    TestBase.scheduleTestBase();
    let pageBase: PageBase;
    let obEmailAgent: Agent;
    let ibPhoneNotReqAgent: Agent;
    let email: Email = new Email();
    let emailJson: string = `{"interruptible": true,"minWorkingTime":15}`;
    let phoneJson: string = `{"initialPriority":5,"acceleration":10,"maxPriority":100}`;
    let glanceWidthBeforeContact: number;

    // Declare page object
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let maxCall: MaxCall;
    let activeContactsPage: ActiveContactsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101243 - [MAX][SCH][OB Email][One Contact][Interrupt with Non-Digital contact] Interrupt an Email Ob Contact`);
        obEmailAgent = await TestCondition.setUpAgent(SkillType.OB_EMAIL, null, null, emailJson);
        await TestCondition.setUpAndAssignSkill(obEmailAgent, SkillType.IB_Phone, null, null, phoneJson);
        ibPhoneNotReqAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, null, null, phoneJson);

        // Pre-condition
        // Login Incontact
        email.initFullData("test@email.com", "Test Subject", "Test Body", "");
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(obEmailAgent);
        pageBase = new PageBase();
    }, TestRunInfo.conditionTimeout);

    it('IC-101243 - MAX SCH OB Email One Contact Interrupt with Non-Digital contact Interrupt an Email Ob Contact', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(obEmailAgent.phoneNumber);
        glanceWidthBeforeContact = await maxPage.getMaxGlanceSize();

        // 3. Set the "Available" state  
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX has the available state 
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.AVAILABLE, "MAX isn't in available state");

        // 4. From MAX> Toolbar, click on "New> Add New> Outbound Email> Pop Over Dialog> Select your Ob Email Skill" 
        await maxPage.makeOutboundEmail(SkillType.OB_EMAIL, email.toAddress, false);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Verify:
        // - the Ob Email Contact workspace displays in MAX without errors.
        // - the email workspace must not be displayed cut off or overlap
        // - check the controls, colors, labels, email inbox and size.
        // - the body of email is displayed completely.
        await Logger.write(FunctionType.UI, `Verifying OB email displayed completely with correct controls, colors, labels, email inbox and size`);
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Ob Email Contact workspace doesn't display in MAX");
        expect(await maxEmailPage.isEmailWorkSpaceCutOff()).toBe(false, "The email workspace is displayed cut off or overlap");
        expect(await maxEmailPage.getMaxWrapPanelSize()).toBeGreaterThan(glanceWidthBeforeContact, "Panel doesn't resize into interaction window space as before the contact routed and panels resized");
        expect(await maxEmailPage.isRightFrameCustomerIconDisplayed()).toBe(true, "Right frame customer icon isn't displayed");
        expect(await maxEmailPage.isRightFrameTimeCounterDisplayed()).toBe(true, "Right frame time counter isn't displayed");
        expect(await maxEmailPage.isRightFrameSkillNameDisplayed()).toBe(true, "Right frame skill name isn't displayed");
        expect(await maxEmailPage.isDiscardButtonDisplayed()).toBe(true, "Right frame discard button isn't displayed");
        expect(await maxEmailPage.isSendButtonDisplayed()).toBe(true, "Right frame Send button isn't displayed");
        expect(await maxEmailPage.isTransferButtonDisplayed()).toBe(true, "Right frame Transfer button isn't displayed");
        expect(await maxEmailPage.isRequeueButtonDisplayed()).toBe(true, "Right frame Requeue button isn't displayed");
        expect(await maxEmailPage.isLaunchButtonDisplayed()).toBe(true, "Right frame Launch button isn't displayed");
        expect(await maxEmailPage.isEndButtonDisplayed()).toBe(true, "Right frame End button isn't displayed");
        expect(await maxEmailPage.isToAddressDisplayed()).toBe(true, "Right frame To address isn't displayed");
        expect(await maxEmailPage.isCCAddressDisplayed()).toBe(true, "Right frame CC Address isn't displayed");
        expect(await maxEmailPage.isBCCAddressDisplayed()).toBe(true, "Right frame BCC Address isn't displayed");
        expect(await maxEmailPage.isSubjectDisplayed()).toBe(true, "Right frame Subject isn't displayed");
        expect(await maxEmailPage.isRichTextBarDisplayed()).toBe(true, "Right frame Rich text tool bar isn't displayed");
        expect(await maxEmailPage.isEmailBodyDisplayed()).toBe(true, "Right frame Email body isn't displayed");
        expect(await maxEmailPage.isAttachmentButtonDisplayed()).toBe(true, "Right frame Attachment button isn't displayed");
        expect(await maxEmailPage.isRightFrameContactStartTimeDisplayed()).toBe(true, "Right frame contact start time isn't displayed");
        expect(await maxEmailPage.isRightFrameFromAddressDisplayed()).toBe(true, "Right frame from address isn't displayed");

        // 5. Enter a valid email in "TO" 
        await maxEmailPage.enterToAddress(email.toAddress);

        // VP: Verify the "TO" field populates according the value entered.
        // VP: Also verify from the Inbox Email section>Outbound section> the Email has the value entered in "TO" field.
        expect(await maxEmailPage.isToAddressContentPopulated()).toBe(true, `The "TO" field doesn't populate according the value entered`);
        expect(await maxEmailPage.getFormHeaderPatronAddress()).toBe(email.toAddress, "The name doesn't update on Form header");

        // 6. After 15 seconds, generate the Ib Phone Contact 
        await pageBase.waitInSecond(TestRunInfo.middleTimeout);
        await TestHelpers.startInboundCall(ibPhoneNotReqAgent);
        maxCall = await maxPage.waitForCallWorkspace();
        await maxCall.waitForCallDialling();

        // VP: Verify:
        // - the Agent gets interrupted and IB phone is delivered.
        // - the Email is interrupted and has the label 'Email Interrupted"
        // - check the controls, colors, labels and size.
        expect(await maxEmailPage.isEmailInterruptedHeaderDisplayed(TestRunInfo.shortTimeout)).toBe(true, "The Agent doesn't get interrupted");
        expect(await maxCall.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "IB phone isn't delivered");
        expect(await maxCall.isToTalContactTimeDisplayed()).toBe(true, "ToTal Contact Time isn't displayed");
        expect(await maxCall.isCustomerContactIconDisplayed()).toBe(true, "Customer Contact Icon isn't displayed");
        expect(await maxCall.isCustomerContactLabelDisplayed()).toBe(true, "Customer Contact Label isn't displayed");
        expect(await maxCall.isAniDisplayed()).toBe(true, "Ani isn't displayed");
        expect(await maxCall.isHoldButtonDisplayed()).toBe(true, "Hold button isn't displayed");
        expect(await maxCall.isMuteButtonDisplayed()).toBe(true, "Mute button isn't displayed");
        expect(await maxCall.isMaskButtonDisplayed()).toBe(true, "Mask button isn't displayed");
        expect(await maxCall.isRecordButtonDisplayed()).toBe(true, "Record button isn't displayed");
        expect(await maxCall.isCommitButtonDisplayed()).toBe(true, "Commit button isn't displayed");
        expect(await maxCall.isCallTransferContactButtonDisplayed()).toBe(true, "Transfer Contact button isn't displayed");
        expect(await maxCall.isEndButtonDisplayed()).toBe(true, "End Contact button isn't displayed");
        expect(await maxCall.isLaunchButtonDisplayed()).toBe(true, "Launch button isn't displayed");
        expect(await maxCall.isKeyPadDisplayed()).toBe(true, "Key Pad isn't displayed");
        expect(await maxCall.getMaxWrapPanelSize()).toBeGreaterThan(glanceWidthBeforeContact, "Panel doesn't resize into interaction window space as before the contact routed and panels resized");

        // 7. Hang up the Call 
        maxPage = await maxCall.endCallContact();
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Verify:
        // - the Ib Phone workspace closes and MAX displays the Email Ob workspace.
        // - the Ob Email still displaying in the same size before interrupt by the Ib Phone Contact.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "MAX doesn't display the Email Ob workspace");
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(false, "The Ib Phone workspace doesn't close");

        // 8. Enter a subject and text in the body of email and click on "Send" button
        maxPage = await maxEmailPage.sendOutboundEmail(email.toAddress, email.emailBody, email.emailSubject);
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.EMAIL);

        // VP: Verify the Ob Email workspace closes and MAX displays the glance.
        // VP: Verify that MAX still displaying the same size before start the Ob Email Contact.  
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(false, "MAX displays the Email Ob workspace");
        expect(await maxPage.getMaxGlanceSize()).toBe(glanceWidthBeforeContact, "MAX isn't displaying the same size before starting the Ob Email Contact");
    },TestRunInfo.testTimeout*2);

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
                await CustomAPIs.endAllContacts(obEmailAgent);
                await TestCondition.setUpAndRemoveSkill(obEmailAgent, SkillType.IB_Phone);
                await TestCondition.setAgentSkillsToDefault(obEmailAgent, SkillType.OB_EMAIL);
                await TestCondition.setAgentSkillsToDefault(ibPhoneNotReqAgent, SkillType.IB_Phone);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});