import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import { DispositionName } from "@data-objects/general/max";
import { TestCondition } from "@test-helpers/test-condition";
import { SkillType } from "@data-objects/general/skill-core";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 392\867
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe('MAX suite - IC-62628', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let note: string = "Test Automation";

    //Declare page objects
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62628 - Max Contacts get stuck in acw state - Chat - Closed by Agent - Required Dispo`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT, true);
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // Run an inbound Chat Contact.
        await TestHelpers.startChatContact(chatAgent);
    }, TestRunInfo.conditionTimeout);


    it('IC-62628 - Max Contacts get stuck in acw state - Chat - Closed by Agent - Required Dispo', async () => {

        // Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();

        // VP: Contact is delivered to MAX
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up doesn't display");

        // 3. Make a few conversations back and forth.
        maxChatPage = await maxPage.acceptNewChatContact();

        // Close the contact by the Agent.
        maxDispositionPage = await maxChatPage.endChatRequireDisposition();

        // VP: Disposition window opens
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition window is not displayed")

        // 4. Select a Disposition and Save the Dispo
        maxPage = await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, note);

        // VP: Connection window closes. Agent returns to Available.
        expect(await maxChatPage.isNewContactPopUpDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Chat working space is still displayed");
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "User State is not correct");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Log out central
            centralPage = await maxPage.logOut();
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



