import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactLabel, ContactName } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { Email, EmailMode } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 399525
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11, HC18
 * Bug: IC-40243 [TestAutomation][inC-UI] IB Phone takes long time to interrupt IB or OB Email (HC25)
 */

describe("MAX suite - 399525", function () {

    TestBase.scheduleTestBase();
    let homeWindowHandle: string;
    let pageBase: PageBase;
    let workitemAgent: Agent;
    let email: Email = new Email()
    let workitemJson = `{"interruptible":true}`;

    // Declare page object
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmailPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `399525 - MAX>WI> Initate ob call or email`);
        workitemAgent = await TestCondition.setUpAgent(SkillType.WORK_ITEM, null, null, workitemJson)
        await TestCondition.setUpAndAssignSkill(workitemAgent, SkillType.OB_EMAIL);

        // Pre-condition
        // Login Incontact
        email.initFullData("test@email.com", "Test Subject", "Test Body", "");
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(workitemAgent);
        pageBase = new PageBase();
        homeWindowHandle = await pageBase.getCurrentWindowHandle();
    }, TestRunInfo.conditionTimeout);

    it('399525 - MAX WI Initate ob call or email', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(workitemAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        await TestHelpers.startWorkItem(workitemAgent);
        await maxPage.waitForNewContactPopUp();
        let maxWorkItemPage = await maxPage.acceptNewWorkItemContact();
        await maxWorkItemPage.holdAWorkitem()
        expect(await maxWorkItemPage.isWorkitemHeld(true, TestRunInfo.shortTimeout)).toBe(true, "The work item is not held");

        // 3. Click "New + button"> Outbound Email and select an ob email skill    
        await maxWorkItemPage.showMaxGlance();
        maxEmailPage = await maxPage.openOBEmailWorkspace(email.toAddress);
        let emailContactId = await CustomAPIs.getCurrentContactId(workitemAgent, SkillCore.getSkillName(SkillType.OB_EMAIL));

        // VP: Email window opens and you can write on it
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The OB Email Contact doesn't deliver in Agent");
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "The email is not in edit mode");

        //End email
        await maxEmailPage.endEmailContact(false);
        await maxEmailPage.waitForQueueValue(ContactLabel.OUTBOUND_EMAIL, 0);

        //Unhold workitem
        //End workitem
        await maxWorkItemPage.unholdAWorkitem();
        maxPage = await maxWorkItemPage.endWorkItemContact();
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
                await TestCondition.setAgentSkillsToDefault(workitemAgent, SkillType.WORK_ITEM);
                await TestCondition.setUpAndRemoveSkill(workitemAgent, SkillType.OB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});