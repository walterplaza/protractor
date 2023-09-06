import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
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
 * Suite: MAX suite
 * TC ID: 444002
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('MAX suite - IC-101239', function () {
    let skillListPage: SkillsListPage;
    let detailPage: SkillsDetailPage;

    // Declare Page object
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let textUrl: string = "https://www.latam.com";
    let Json: string = `{"useScreenPops": true, "useCustomScreenPops": true, "screenPopType": "webpage","screenPopDetails": "${textUrl}"}`;
    let webPageTitle: string = "Country Selector LATAM";
    let transferLabel: string = "Transfer";
    let endLabel: string = "End";
    let launchLabel: string = "Launch";
    let chatWorkspaceWidth: number = 490;
    let maxPageWidth: number = 300;
    let range: number = 5;
    let white: string = "#ffffff";
    let gray: string = "#9da3a5";

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101239 - MAX> SCH> One Contact> Generate a IB Chat Contact with Screen Pops and Panels = Off`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT, null, null, Json);

        // Prerequisite(s)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-101239 - MAX SCH One Contact Generate a IB Chat Contact with Screen Pops and Panels Off', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 3. Change MAX to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX is in available state
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Max state is not changed to available");

        // 4. Generate a IB Chat Contact and accept it
        await TestHelpers.startChatContact(chatAgent);
        await maxPage.waitForNewContactPopUp();
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: The IB Chat Contact delivery in MAX without errors
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat working space isn't displayed");

        // VP: Check the controls
        await maxChatPage.clickOnChatWorkspace();
        expect(await maxChatPage.isTransferButtonDisplayed()).toBe(true, "Transfer Button isn't displayed");
        expect(await maxChatPage.isLaunchButtonDisplayed()).toBe(true, "Launch Button isn't displayed");
        expect(await maxChatPage.isEndButtonDisplayed()).toBe(true, "End Button isn't displayed");
       
        // VP: Check the label
        expect(await maxChatPage.isLabelTransferButtonDisplayed(transferLabel)).toBe(true, "Transfer label Button isn't matched");
        expect(await maxChatPage.isLabelLaunchButtonDisplayed(launchLabel)).toBe(true, "Launch label Button isn't matched");
        expect(await maxChatPage.isLabelEndButtonDisplayed(endLabel)).toBe(true, "End label Button isn't matched");
     
        // VP: Check the colors
        expect(await maxChatPage.getColorTransferButton()).toBe(white, "Color Transfer Button isn't matched");
        expect(await maxChatPage.getColorLaunchButton()).toBe(white, "Color Launch Button isn't matched");
        expect(await maxChatPage.getColorEndButton()).toBe(white, "Color End Button isn't matched");
        expect(await maxChatPage.getColorChatWorkspace()).toBe(gray, "Color chat workspace isn't matched ");

        // VP: Check the chat workspace size
        expect(await maxChatPage.isMaxGlanceSizeInRange(chatWorkspaceWidth, range)).toBe(true, "Failed by IC-5984 it is the limitation of the MS Edge browser");

        // 5. End the IB Chat
        maxPage = await maxChatPage.endChatContact();

        // VP: Verify the IB Chat workspace closes and MAX displays the glance.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.CHAT, TestRunInfo.shortTimeout)).toBe(false, "Chat workspace is still displayed");
        expect(await maxPage.isPageDisplayed()).toBe(true, "Max page is not dispalyed");

        //VP: Verify that MAX still displaying the same size before start the Ib Phone Contact.
        expect(await maxPage.isMaxGlanceSizeInRange(maxPageWidth, range)).toBe(true, "Failed by IC-5984 it is the limitation of the MS Edge browser");
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



