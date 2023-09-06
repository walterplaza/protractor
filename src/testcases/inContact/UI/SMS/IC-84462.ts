import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxSMSPage from "@page-objects/inContact/max/max-sms-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import MaxPage from "@page-objects/inContact/max/max-page";
import CustomAPIs from "@apis/custom-apis";

/** 
 * Type: inContact
 * Suite: SMS
 * TC ID: IC-84462
 * Tested browser: Chrome, Firefox
 * Tested OS: Windows 10
 * Tested cluster: DO36
 */

describe('SMS - IC-84462', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxSMSPage: MaxSMSPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-84462 - Verify "+ More History" button is displayed`);
        chatAgent = await TestCondition.setUpAgent(SkillType.SMS);
        await TestHelpers.startSMSContact(chatAgent, "other 456");
    }, TestRunInfo.testTimeout);

    it('IC-84462 - Verify "+ More History" button is displayed', async () => {

        await Logger.write(FunctionType.NONE, `IC-84462- Verify "+ More History" button is displayed\n`);

        // inContact Central login
        let loginPage: LoginPage = LoginPage.getInstance();
        let centralPage: CentralPage = await loginPage.loginInContact(chatAgent);

        // Launch MAX
        let maxPage: MaxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();

        // Accept/Reject message is displayed
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up doesn't display");

        // Accept New contact
        let maxSMSPage: MaxSMSPage = await maxPage.acceptNewSMSContact();
        expect(await maxSMSPage.isContactWorkSpaceDisplayed(ContactName.SMS)).toBe(true, "SMS working space isn't displayed");

        // Check if the + More History button in SMS exist
        expect(await maxSMSPage.isMoreHistoryButtonDisplayed()).toBe(true, "+ More History button is not displayed");
       
        // End SMS contact
        maxPage = await maxSMSPage.endSMSContact();
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.SMS);

        // Agent ends SMS
        expect(await maxSMSPage.isContactWorkSpaceDisplayed(ContactName.SMS, TestRunInfo.shortTimeout)).toBe(false, "SMS working space is still displayed");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (error) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
});



