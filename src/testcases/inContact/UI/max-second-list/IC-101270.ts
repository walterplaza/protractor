import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 317353
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe("MAX suite - IC-101270", function () {

    let chatAgent: Agent;
    let htmlMessage: string = "<p>Hello</p><p>World</p><br>!</br>";
    let displayMessage: string = "HelloWorld!"
    let copiedText: string;

    // Declare page object
    TestBase.scheduleTestBase();
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;

    let pageBase: PageBase;


    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101270 - [MAX] [Chat] Verify Agent copy/paste from Notepad displays in Agent window without HTML tags`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

    }, TestRunInfo.conditionTimeout);

    it('IC-101270 - MAX Chat Verify Agent copy/paste from Notepad displays in Agent window without HTML tags', async () => {

        //1. Launch MAX Agent
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        //2. Place an inbound chat
        await TestHelpers.startChatContact(chatAgent);
        await maxPage.waitForNewContactPopUp();
        maxChatPage = await maxPage.acceptNewChatContact();

        //3. Open Notepad and enter some text with carriage returns and shift+enter
        // Set the clipboard with html tag
        pageBase = new PageBase();
        await pageBase.setClipboardContent(htmlMessage);

        //4. Copy the text and paste in MAX agent window for the chat	
        copiedText = await pageBase.getClipboardContent();
        //5. Click send or hit enter
        await maxChatPage.sendAgentMessage(copiedText);

        //VP:Text does not contain html tags for line breaks and such. The text displays with the correct formatting with no raw tags.
        expect(await maxChatPage.isChatMessageDisplayed("Me", displayMessage)).toBe(true, "Text displays with html tags");

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
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});