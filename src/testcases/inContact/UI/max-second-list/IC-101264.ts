import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import SkillsDetailPage from "@page-objects/inContact/central/routing/skills/skills-detail-page";
import SkillsListPage from "@page-objects/inContact/central/routing/skills/skills-list-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 389227
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('MAX suite - IC-101264', function () {
    let skillListPage: SkillsListPage;
    let detailPage: SkillsDetailPage;

    // Declare Page object
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let textUrl: string = "https://www.google.com";
    let Json: string = `{"useScreenPops": true, "useCustomScreenPops": true, "screenPopType": "webpage","screenPopDetails": "${textUrl}"}`;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101264 - [MAX] [Chat] [Panles=On] Verify that Chat Contacts with screen pops (and panels enabled) open upon delivery to the agent`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT, null, null, Json);

    }, TestRunInfo.conditionTimeout);

    it('IC-101264 - MAX Chat Panles=On Verify that Chat Contacts with screen pops (and panels enabled) open upon delivery to the agent', async () => {

        // Prerequisite(s)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // 1. Login on MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // Agent has panels 'on'
        await maxPage.showMaxGlance();
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxPanelsSetting(State.ON, false);

        // Close more tool bar
        await maxPage.closePopover();
        await maxPage.hideMaxGlance();

        // Change MAX to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // 2. Generate a chat contact  
        await TestHelpers.startChatContact(chatAgent);
        await maxPage.waitForNewContactPopUp();

        // VP: Contact is generated 
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up isn't display");

        // 3. Accept chat contact
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: MAX opens the chat
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat working space isn't displayed");

        // VP: Screen pop is in the panel (at the right side of the Chat workspace), and the panel is opened automatically - delivered open
        expect(await maxChatPage.isScreenPopsDisplayed()).toBe(true, "Screen Pops isn't displayed");
        expect(await maxChatPage.getScreenPopsTitle()).toContain(textUrl, "Screen Pops title isn't displayed correctly");
        expect(await maxChatPage.isScreenPopPositionedAtRightSide()).toBe(true, "Screen Pops isn't positioned correctly");

        // Post-condition
        await maxChatPage.endChatContact();
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
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



