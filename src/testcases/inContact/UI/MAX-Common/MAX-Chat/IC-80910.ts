import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName, DispositionName } from "@data-objects/general/max";
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
import { State } from "@data-objects/general/general";

/*Type: inContact
* Suite: Max-Common > MAX-Chat
* TC ID: IC-80910
* Tested browser: Chrome, Firefox
* Tested OS: Windows 10
* Tested cluster: HC25
*/

describe("Max-Common > MAX-Chat - IC-80910", function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let note: string = "Test Automation";
    let dispositionName: string = DispositionName.DISPOSITION_1;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, "IC-80910 - Verify if it possible to add notes to dispositions");
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT, true);

        // Start a chat
        await TestHelpers.startChatContact(chatAgent);

        // Login to Central and launch MAX
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // Change State
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();

        // Accept chat
        maxChatPage = await maxPage.acceptNewChatContact();

    }, TestRunInfo.conditionTimeout);

    it("IC-80910 - Verify if it possible to add notes to dispositions", async () => {

        // Click the Disposition toggle
        maxDispositionPage = await maxChatPage.toggleDispositionPopup(State.ON);


        // VP: Disposition appears
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition panel isn't displayed");

        // Select disposition and save notes
        await maxDispositionPage.submitDispositionForm(dispositionName, note);

        // Click the Disposition toggle
        maxDispositionPage = await maxChatPage.toggleDispositionPopup(State.ON);

        //VP: Check the Disposition notes saved is correct
        let notesSaved: string = await maxDispositionPage.getDispositionNote();
        expect(notesSaved).toContain(note, "Disposition notes saved is not correct")

        await maxDispositionPage.toggleDispositionPopup(State.OFF);

        // Post condition

        await maxChatPage.endChatRequireDisposition();
        await maxDispositionPage.saveAndCloseDisposition();

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Log out max and central pages
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
