import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { DispositionName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 103035
 * Jira ID:  IC-101302
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101302", function () {
    TestBase.scheduleTestBase();
    let chatReqAgent: Agent;
    let dispositionNote: string = "Test Automation";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChat: MaxChatPage;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101302 - MAX > Chat Interactions > ACW > ACW timer increasing`);
        chatReqAgent = await TestCondition.setUpAgent(SkillType.CHAT, true)

        // Start a chat
        await TestHelpers.startChatContact(chatReqAgent);

        // 1. Login to Central
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatReqAgent);

        // Login to MAX with a valid credential
        maxPage = await centralPage.launchMAX(chatReqAgent.phoneNumber);

        await maxPage.changeState(MaxState.AVAILABLE);

        // Chat in course between agent and patron
        await maxPage.waitForNewContactPopUp();
        await maxPage.acceptNewChatContact();
        maxChat = await maxPage.waitForChatWorkspace();
    }, TestRunInfo.conditionTimeout);

    it('IC-101302 - MAX Chat Interactions ACW ACW timer increasing', async () => {

        // 2. Click on End button
        maxDispositionPage = await maxChat.endChatRequireDisposition();

        // VP: ACW timer must be increasing until the time defined on Unavailable code
        expect(await maxPage.isChatDispositionTimerIncreased()).toBe(true, "Disposition timer is not increasing");

        // Select a disposition and click on save button 
        await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Clean up
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatReqAgent, SkillType.CHAT);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});