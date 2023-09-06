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
 * TC ID: IC-84335
 * Tested browser: Chrome, Firefox, IE
 * Tested OS: Windows 10
 * Tested cluster: DO36
 */

describe('SMS - IC-84335', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxSMSPage: MaxSMSPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-84335 - Verify that the character counter is displayed for SMS contact`);
        chatAgent = await TestCondition.setUpAgent(SkillType.SMS);
        await TestHelpers.startSMSContact(chatAgent, "other 456");
    }, TestRunInfo.testTimeout);

    it('IC-84335 - Verify that the character counter is displayed for SMS contact', async () => {

        await Logger.write(FunctionType.NONE, `IC-84335-Verify that the character counter is displayed for SMS contact\n`);

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

        // Check if the Text Counter in SMS workspace exist
        expect(await maxSMSPage.isTextCounterDisplayed()).toBe(true, "TextCounter is not displayed");

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



