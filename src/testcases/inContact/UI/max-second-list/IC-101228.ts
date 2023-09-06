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
import QuickRepliesPage from "@page-objects/inContact/central/admin/communication/quick-replies/quick-replies";
import CustomAPIs from "@apis/custom-apis";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 455826
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe("MAX suite - IC-101228", function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let quickRepliesPage: QuickRepliesPage;
    let textUrl: string = "https://www.google.com";
    let Json: string = `{"useScreenPops": true, "useCustomScreenPops": true, "screenPopType": "webpage","screenPopDetails": "${textUrl}"}`;
    let expectedWidth: number = 790;
    let range: number = 10;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101228 - [MAX][Summer '18 added][IC-38619][Chat][With Contact Panels][Non Digital Conta][Without Inbox] Verify the Chat Workspace has the ~309 px. and the Contact Panels has the ~300 px`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT, null, null, Json);
        await TestHelpers.startChatContact(chatAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-101228 - MAX Summer 18 added IC-38619 Chat With Contact Panels Non Digital Conta Without Inbox Verify the Chat Workspace has the ~309 px. and the Contact Panels has the ~300 px', async () => {

        // Prerequisite(s)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        quickRepliesPage = await centralPage.gotoQuickRepliesPage();
        await quickRepliesPage.cleanUpQuickReplies();

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

        // VP: the Panel must have the screen pop configured in requirement.
        expect(await maxChatPage.isScreenPopsDisplayed()).toBe(true, "Screen Pops isn't displayed");
        expect(await maxChatPage.getScreenPopsTitle()).toContain(textUrl, "Screen Pops title isn't displayed correctly");

        //VP: Check the controls, labels and size in chat workspace
        expect(await maxChatPage.isTransferButtonDisplayed()).toBe(true, "Transfer Button isn't displayed");
        expect(await maxChatPage.isLaunchButtonDisplayed()).toBe(true, "Launch Button isn't displayed");
        expect(await maxChatPage.isEndButtonDisplayed()).toBe(true, "End Button isn't displayed");
        expect(await maxChatPage.isMaxGlanceSizeInRange(expectedWidth, range)).toBe(true, "Failed by IC-5984: [MAX][Edge][IE][Email] Email workspace is not displayed entirely caused by the size text of the screen");

        await maxChatPage.showMaxGlance();
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Clean up
            maxPage = await maxChatPage.endChatContact();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await CustomAPIs.endAllContacts(chatAgent);
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});