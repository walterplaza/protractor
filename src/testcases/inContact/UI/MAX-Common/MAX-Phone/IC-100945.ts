import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import { Email } from "@data-objects/inContact/max/email/email-info";

/**
 * Type: inContact
 * Suite: MAX Common > MAX-Phone
 * TC ID: IC-100945
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC6
 */

describe('MAX Common > MAX-Phone - IC-100945', function () {
    TestBase.scheduleTestBase();
    let agent: Agent;
    let eMail: Email = new Email();

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let maxEmailPage: MaxEmailPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-100945 - [MAX] [IB Phone] [Hold] [OB Email] Validate that when hold a call agent is able to begin an OB Mail.`);
        agent = await TestCondition.setUpAgent(SkillType.IB_Phone);
        await TestCondition.setUpAndAssignSkill(agent, SkillType.OB_EMAIL);
        eMail.initFullData("test@email.com", "Test Subject", "Test Body", "");
    }, TestRunInfo.conditionTimeout);

    it('IC-100945 - [MAX] [IB Phone] [Hold] [OB Email] Validate that when hold a call agent is able to begin an OB Mail.', async () => {

        // Precondition - Login InContact
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);

        // Precondition - Launch MAX
        maxPage = await centralPage.launchMAX(agent.phoneNumber);

        // 1. Generate IB Phone contact
        await TestHelpers.startInboundCall(agent);

        // VP: Check IB call exist in queue
        expect(await maxPage.isContactInQueue(ContactName.PHONE_CALL)).toBe(true, "Inbound phone is not exists in queue");

        // Set MAX agent state to available and wait for call workspace is displayed
        await maxPage.changeState(MaxState.AVAILABLE);
        maxCall = await maxPage.waitForCallWorkspace();

        // 2. Press Hold button
        await maxCall.clickHoldButton();

        // Show MaxGlance
        await maxPage.showMaxGlance();

        // VP: call is hold, and a counter is shown

        // 3. Click on New+
        await maxPage.clickNew();

        // 3.1 Fill a valid email in the search field and click on Email button to Generate an OB email contact
        maxEmailPage = await maxPage.selectEmailFromAddressBook(SkillType.OB_EMAIL, eMail.toAddress);
        await maxEmailPage.waitForEmailWorkspace();

        // VP: Works without issue. MAX connects and Email workspace is displayed
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace is not displayed")

        // 4. Click on End button
        await maxEmailPage.endEmailContact();

        // VP: Email should be ended        
        await maxCall.waitForCallWorkspace();

        // Show MaxGlance
        await maxPage.showMaxGlance();
        // 5. Click on New+
        await maxPage.clickNew();

        // 5.1 Fill a valid email in the search field and click on Email button to Generate an OB email contact
        maxEmailPage = await maxPage.selectEmailFromAddressBook(SkillType.OB_EMAIL, eMail.toAddress);
        await maxEmailPage.waitForEmailWorkspace();

        // VP: Works without issue. MAX connects and Email workspace is displayed
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace is not displayed")

        // Click on End button
        await maxEmailPage.endEmailContact();

        // VP: Email should be ended        
        await maxCall.waitForCallWorkspace();

        // Press Hold button
        await maxCall.clickUnHoldButton();

        // End IB phone
        await maxCall.endCallContact();
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Log out MAX
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(agent, SkillType.OB_EMAIL);
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.IB_Phone);                
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});