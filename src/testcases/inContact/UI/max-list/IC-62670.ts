import { Agent } from "@data-objects/general/agent";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 278034
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe('MAX suite - IC-62670', function () {
    TestBase.scheduleTestBase();
    let agent: Agent;
    let invalidPhoneNumber: string = "123123123123";
    let badNumberMessage: string = "Bad Number";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62670 - [MAX] Bad Number Notification`);
        agent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-62670 - MAX Bad Number Notification', async () => {

        // Login central page
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(agent.phoneNumber);
        maxCall = new MaxCall();

        // 3. Click the new call button
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.PHONE_CALL);

        // VP: Check address book popover displays inC-UI
        expect(await maxPage.isAddressBookDisplayed()).toBe(true, "Address book popover is not displayed.");

        // 4. Input an invalid telephone number
        // 5. Click call
        await maxPage.makeOutboundCall(invalidPhoneNumber, SkillType.OB_PHONE);

        // VP: Check MAX notification is diplayed inC-UI
        expect(await maxPage.isMaxNotificationDisplayed()).toBe(true, "MAX notification is not displayed");

        // VP: Check MAX notification content is correct
        expect(await maxPage.getDialogContent()).toBe(badNumberMessage, "Bad Number Notification has not the expected content.");

        // Click accept button on force out confirm dialog
        await maxCall.clickAcceptErrorDialog();

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Logout
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});