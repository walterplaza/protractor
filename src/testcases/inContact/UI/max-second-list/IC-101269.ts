import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName, DispositionName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import { State } from "@data-objects/general/general";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 344452
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe("MAX suite - IC-101269", function () {

    TestBase.scheduleTestBase();
    let agent: Agent;
    let dispositionNote: string = "Test Automation";
    let greenColor: string = "#29d28b";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101269 - MAX>Chat Interface>Updated Disposition Check Box`);
        agent = await TestCondition.setUpAgent(SkillType.CHAT, true);

        // 1. PREREQ: User logged into Central.
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);
    }, TestRunInfo.conditionTimeout);

    it("IC-101269 - MAX Chat Interface Updated Disposition Check Box", async () => {

        // 1. Launch MAX
        maxPage = await centralPage.launchMAX(agent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // 2. Using a chat skill/poc setup with dispositions send your agent a chat
        await TestHelpers.startChatContact(agent);
        await maxPage.waitForNewContactPopUp();
        maxChatPage = await maxPage.acceptNewChatContact();
        maxDispositionPage = new MaxDispositionPage();

        // VP: The chat is created and accepted 
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat workspace is not displayed.");

        // VP: The dispo checkbox is shown and usable 
        expect(await maxDispositionPage.isDispositionCheckboxDisplayed()).toBe(true, "Disposition checkbox is not displayed");

        // 4. Click the disposition checkbox 
        await maxDispositionPage.toggleDispositionPopup(State.ON);

        // VP: The dispo overlay pops over the chat
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition window is not displayed");

        //5. Fill out the disposition form 
        await maxDispositionPage.fillDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

        // VP: The dispo is populated with all required data 
        expect(await maxDispositionPage.isDispositionSelected(DispositionName.DISPOSITION_1)).toBe(true, `Disposition item ${DispositionName.DISPOSITION_1} is not selected`);
        expect(await maxDispositionPage.getDispositionNote()).toBe(dispositionNote, "Disposition note is not match with the expected disposition note");

        // 6. Click save on the disposition overlay 
        await maxDispositionPage.saveDisposition();

        // VP: The dispo overlay is saved and closed 
        expect(await maxDispositionPage.isDispositionFormDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Disposition window is still displayed");
    
        // VP: The dispo checkbox is now green
        expect(await maxDispositionPage.getColorDispositionCheckbox()).toBe(greenColor, "Disposition checkbox color is not match with the color expected");

        // 8. Click the disposition checkbox  
        await maxDispositionPage.toggleDispositionPopup(State.ON);

        // VP: The dispo overlay is brought back up 
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition window is not displayed");

        // VP: Confirm the data shown matches the data entered on step 5
        expect(await maxDispositionPage.isDispositionSelected(DispositionName.DISPOSITION_1)).toBe(true, `Disposition item ${DispositionName.DISPOSITION_1} is not selected`);
        expect(await maxDispositionPage.getDispositionNote()).toBe(dispositionNote, "Disposition note is not match with the expected disposition note");

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // End chat contact
            await maxDispositionPage.toggleDispositionPopup(State.OFF);
            await maxChatPage.endChatRequireDisposition();
            await maxChatPage.waitForContactWorkSpaceDisappeared(ContactName.CHAT);
            await maxDispositionPage.saveAndCloseDisposition(); 

            // MAX logout
            centralPage = await maxPage.logOut();

            // Logout central page
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.CHAT);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});