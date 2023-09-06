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
import {Email} from "@data-objects/inContact/max/email/email-info";
import MaxCallPage from "@page-objects/inContact/max/max-call";

/**
 * Type: inContact
 * Suite: MAX-Common > MAX-Phone
 * TC ID: IC-100927
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC6
 */

describe('MAX-Common > MAX-Phone - IC-100927', function () {
    TestBase.scheduleTestBase();
    let agent: Agent;
    let eMail: Email = new Email();
    let obPhone1: string = "(400) 001-0001";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let maxEmailPage: MaxEmailPage;
    let maxCallPage: MaxCallPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-100927 - [MAX] [OB Phone] [Hold] [OB Email] Validate that when hold a call agent is able to begin an OB Mail.`);
        agent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        await TestCondition.setUpAndAssignSkill(agent, SkillType.OB_EMAIL);
        eMail.initFullData("test@email.com", "Test Subject", "Test Body", "");
    }, TestRunInfo.conditionTimeout);

    it('IC-100927 - [MAX] [OB Phone] [Hold] [OB Email] Validate that when hold a call agent is able to begin an OB Mail.', async () => {

        // Precondition - Login InContact
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);

        // Precondition - Launch MAX
        maxPage = await centralPage.launchMAX(agent.phoneNumber);

        // 1. Generate OB Phone contact by Clicking on +New button 
        await maxPage.clickNew();

        // VP: *For SCH* +New button should open the address book and after typing the Phone number the "call' button should not be available.
        await maxPage.makeOutboundCall(TestRunInfo.cluster.outboundNumber, SkillType.OB_PHONE);
        maxCall = await maxPage.waitForCallWorkspace();

        // 2. Press Hold button
        await maxCall.clickHoldButton();

        // Show MaxGlance
        await maxPage.showMaxGlance();

        // 3. Click on New+
        await maxPage.clickNew();

        // 3.1 Fill a valid email in the search field and click on Email button to Generate an OB email contact
        maxEmailPage = await maxPage.selectEmailFromAddressBook(SkillType.OB_EMAIL, eMail.toAddress);

        // VP: Works without issue. MAX connects and Email workspace is displayed
        await maxEmailPage.waitForEmailWorkspace();
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

        // VP: Works without issue. MAX connects and Email workspace is displayed
        await maxEmailPage.waitForEmailWorkspace();
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
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.OB_PHONE);
                
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});