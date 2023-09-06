import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 437386
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe('MAX suite - IC-62583', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62583 - Max Accept Chat`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT)
        // login specific skill user inC-UI
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        //start chat inC-API
        await TestHelpers.startChatContact(chatAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62583 - Max Accept Chat', async () => {

        // launch agent inC-UI
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // set MAX agent state inC-UI
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();

        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "Chat workspace does not exists");

        // 2. accept contact inC-UI
        maxChatPage = await maxPage.acceptNewChatContact();

        // 3. check workspace section exists inC-UI
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat workspace does not exists");

        // end chat on MAX inC-UI
        maxPage = await maxChatPage.endChatContact();
        await maxChatPage.waitForContactWorkSpaceDisappeared(ContactName.CHAT);

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // logout MAX inC-UI
            centralPage = await maxPage.logOut();

            // logout inC-UI
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (err) {
                console.log(err);
            }
        }
    }, TestRunInfo.conditionTimeout);
});