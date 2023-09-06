import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
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
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 405757
 * Tested browser: -
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('MAX suite - IC-62614', function () {

    TestBase.scheduleTestBase();
    let chatStartTimeColor: string = "#ffffff";
    let chatAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62614 - MAX>ADA = on>Chat start time is visible when high contrast ADA is on`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it('IC-62614 - MAX ADA on Chat start time is visible when high contrast ADA is on', async () => {

        // 2. Launch MAX
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(chatAgent);
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 3. Set the “Available” status in agent
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: Agent status is "Available"
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Agent status isn't Available");

        // 4. Send a chat to the agent and accept it
        await TestHelpers.startChatContact(chatAgent);
        await maxPage.waitForNewContactPopUp();
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: Chat is established
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat working space isn't displayed");

        // 5. Turn High Contrast ADA mode on - More>Settings>ADA High Contrast
        await maxPage.showMaxGlance();
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxADASetting(State.ON);

        // VP: High Contrast ADA mode is on
        expect(await maxPage.getADAHighContrastStatus()).toBe(State.ON.toLocaleLowerCase(), "High Contrast ADA mode isn't correct");

        // 6. Look for the Chat start time
        await maxPage.closePopover();
        await maxPage.hideMaxGlance();
        await maxPage.waitForMAXGlanceStable();

        // VP: Chat start time is visible 
        expect(await maxChatPage.getChatStartTimeColor()).toBe(chatStartTimeColor, "Chat start time is invisible ");

        maxPage = await maxChatPage.endChatContact();
        await maxChatPage.waitForContactWorkSpaceDisappeared(ContactName.CHAT);
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await BrowserWrapper.switchWindowByTitle("inContact");
            await CustomAPIs.endAllContacts(chatAgent);
            centralPage = await CentralPage.getInstance();
            maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);
            await maxPage.changeMaxADASetting(State.OFF, true);
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



