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

/** 
 * Type: inContact
 * Suite: MAX-Common > Chat > Contact Panels
 * TC ID: IC-107619
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('MAX-Common > Chat > Contact Panels - IC-107619', function () {
    let skillListPage: SkillsListPage;
    let detailPage: SkillsDetailPage;

    // Declare Page object
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let textUrl: string = "https://www.NiceIncontact.com?icAgentPanelTitle='Welcome to NiceIncontact Title Page'";
    let textUrl1: string = "'Welcome to NiceIncontact Title Page'";    

    let Json: string = `{"useScreenPops": true, "useCustomScreenPops": true, "screenPopType": "webpage","screenPopDetails": "${textUrl}"}`;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-107619 - [MAX] [Chat] [Panel] [Screen Pops] Validate that is being set the value of the URL itself on Contact Panel when icAgentPanelTitle is empty`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT, null, null, Json);

    }, TestRunInfo.conditionTimeout);

    it('IC-107619 - [MAX] [Chat] [Panel] [Screen Pops] Validate that is being set the value of the URL itself on Contact Panel when icAgentPanelTitle is empty', async () => {

        // Prerequisite: 1
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // 1. Login on MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 2. Go to Glance> More> Settings> Click on Panels.
        await maxPage.showMaxGlance();
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxPanelsSetting(State.ON, false);

        // Close more tool bar
        await maxPage.closePopover();
        await maxPage.hideMaxGlance();

        // 3. Change MAX status to Available from Unavailable 
        await maxPage.changeState(MaxState.AVAILABLE);

        // Generate a chat contact  
        await TestHelpers.startChatContact(chatAgent);
        await maxPage.waitForNewContactPopUp();

        // VP: Contact is generated 
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up isn't display");

        // 4. Accept chat contact
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: MAX opens the chat
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat working space isn't displayed");

        // VP: A chat window should open -Nice InContact website should open next to Chat window 
        expect(await maxChatPage.isScreenPopsDisplayed()).toBe(true, "Screen Pops isn't displayed");

        // VP: User should not see any parameter value as no value was added in the Contact Panel
        expect(await maxChatPage.getScreenPopsTitle()).toBe(textUrl1, "Screen Pops title isn't displayed correctly");

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



