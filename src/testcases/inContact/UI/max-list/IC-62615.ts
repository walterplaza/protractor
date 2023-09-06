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
import { Utility } from "@utilities/general/utility";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 401212
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 * Implementation note: You can use Single Channel settings for this Test case and write tests for Chat.
 * Bug: IC-29706 [TestAutomation][inC-UI] Disposition window doesn't display when ending required or non required disposition inbound call
 */

describe('MAX suite - IC-62615', function () {

    TestBase.scheduleTestBase();
    let dispositionNote: string = Utility.createRandomString(15);
    let chatAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62615 - MCH> MAX> Chat> Disposition> Note> It must possible to write in Note field from Disposition Dialog in Chat Contact`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT, true);
    }, TestRunInfo.conditionTimeout);

    it('IC-62615 - MCH MAX Chat Disposition Note It must possible to write in Note field from Disposition Dialog in Chat Contact', async () => {

        // inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 3. Set the Available status in agent
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: Verify the Agent has the "Available" status
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Agent status doesn't change to Available");

        // 4. Generate the IB Chat Contact
        await TestHelpers.startChatContact(chatAgent);
        await maxPage.waitForNewContactPopUp();
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: Verify the IB Chat Contact delivers in Agent
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "The IB Chat Contact doesn't deliver in Agent");

        // Remove step 5 due to implementation note from client

        // 6. Go to Chat Contact and click on “End Chat” 
        maxDispositionPage = await maxChatPage.endChatRequireDisposition();

        // VP: Verify “Disposition Dialog” is displayed and you can select a disposition 
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, " IC-29706 [TestAutomation][inC-UI] Disposition window doesn't display when ending required or non required disposition inbound call: “Disposition Dialog” isn't displayed");
        await maxDispositionPage.fillDispositionForm(DispositionName.DISPOSITION_1);
        expect(await maxDispositionPage.isDispositionSelected(DispositionName.DISPOSITION_1)).toBe(true, "You cannot select a disposition");

        // 7. Try to write something in “Note” field 
        await maxDispositionPage.enterDispositionNote(dispositionNote);

        // VP: Verify that is possible to write on it.
        expect(await maxDispositionPage.getDispositionNote()).toBe(dispositionNote, "That isn't possible to write on it");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Clean up
            await maxDispositionPage.saveAndCloseDisposition();
            await maxPage.waitForContactWorkSpaceDisappeared(ContactName.CHAT);

            // Log out
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



