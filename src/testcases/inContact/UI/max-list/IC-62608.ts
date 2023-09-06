import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 416387
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe('MAX suite - IC-62608', function () {

    TestBase.scheduleTestBase();
    let chatAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62608 - [MAX] Accept reject border is transparent - Chat`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
        await TestHelpers.startChatContact(chatAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62608 - MAX Suite Accept reject border is transparent Chat', async () => {

        // 1. inContact Central login     
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 3. Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();

        // VP: There is no colorless border.
        expect(await maxPage.isControlWithColorlessBorder(ContactName.CHAT, TestRunInfo.shortTimeout)).toBe(false, "Accept reject border is not transparent on Chat");

        // 4. Accept New contact
        maxChatPage = await maxPage.acceptNewChatContact();

        // 5. End chat contact
        maxPage = await maxChatPage.endChatContact();
        await maxChatPage.waitForContactWorkSpaceDisappeared(ContactName.CHAT);
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // 6. Log out MAX and central
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



