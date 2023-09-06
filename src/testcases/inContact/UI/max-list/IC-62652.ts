import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { ContactName, DispositionName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxVoiceMailPage from "@page-objects/inContact/max/max-voicemail";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 335690
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe("MAX suite - IC-62652", function () {
    TestBase.scheduleTestBase();
    let agent: Agent;
    let testTimeout: number = TestRunInfo.testTimeout * 3;
    let dispositionNote: string = "Test";
    let dispositionNoteEdited: string = "Test Automation";
    let greenColor: string = "#29d28b";
    let voiceMailID: number;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxVoiceMailPage: MaxVoiceMailPage;
    let maxDispositionPage: MaxDispositionPage;
    let maxCall: MaxCall;
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62652 - MAX>Disposition>New Disposition Dialog.`);
        agent = await TestCondition.setUpAgent(SkillType.VOICEMAIL, true);
        await TestCondition.setUpAndAssignSkill(agent, SkillType.IB_Phone, true);
        await TestCondition.setUpAndAssignSkill(agent, SkillType.CHAT, true);
    }, TestRunInfo.conditionTimeout);

    it("IC-62652 - MAX Disposition New Disposition Dialog", async () => {

        // Login central page
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);

        // 2. Launch MAX, set MAX agent state to available
        maxPage = await centralPage.launchMAX(agent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // =============== Start a voice mail contact ===============
        // 3. Using the "VoiceMail_RequiredDisposition" skill to send a voice mail contact to agent
        await TestHelpers.startVoiceMail(agent);
        maxVoiceMailPage = await maxPage.waitForVoiceMailWorkspace();

        // VP: Check voice mail workspace section exists inC-UI
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.VOICE_MAIL)).toBe(true, "Voice mail workspace is not displayed.");

        // 4. Click the disposition checkbox
        maxDispositionPage = new MaxDispositionPage();
        await maxDispositionPage.toggleDispositionPopup(State.ON);

        // VP: Check disposition window exists inC-UI
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition window is not displayed");

        // VP: Check all disposition data is shown correctly (Disposition, Notes, Tags). 
        expect(await maxDispositionPage.isDispositionListItemsDisplayed()).toBe(true, "Disposition list items is not displayed");
        expect(await maxDispositionPage.isDispositionNoteDisplayed()).toBe(true, "Disposition note is not displayed");
        expect(await maxDispositionPage.isDispositionAddTagDisplayed()).toBe(true, "Disposition add tag is not displayed");

        // 5. Select disposition, type some notes
        // 6. Click save
        await maxDispositionPage.submitDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

        // VP: Check the disposition dialog closes 
        expect(await maxDispositionPage.isDispositionFormDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Disposition window is still displayed");

        // VP: Check the Checkbox is highlighted green 
        expect(await maxDispositionPage.getColorDispositionCheckbox()).toBe(greenColor, "Disposition checkbox color is not match with the color expected");

        // Click the disposition checkbox to check data saved
        await maxDispositionPage.toggleDispositionPopup(State.ON);

        // VP: Check the data is saved 
        expect(await maxDispositionPage.isDispositionSelected(DispositionName.DISPOSITION_1)).toBe(true, `Disposition item ${DispositionName.DISPOSITION_1} is not selected`);
        expect(await maxDispositionPage.getDispositionNote()).toBe(dispositionNote, "Disposition note is not match with the expected disposition note");

        // 8. Click on the disposition green checkbox
        await maxDispositionPage.toggleDispositionPopup(State.ON);

        // 9. Click save new value
        await maxDispositionPage.submitDispositionForm(DispositionName.DISPOSITION_2, dispositionNoteEdited);

        // VP: Check the Checkbox is highlighted green 
        expect(await maxDispositionPage.getColorDispositionCheckbox()).toBe(greenColor, "Disposition checkbox color is not match with the color expected");

        // Click the disposition checkbox to check data saved
        await maxDispositionPage.toggleDispositionPopup(State.ON);

        // VP: Check the data is saved after edited
        expect(await maxDispositionPage.isDispositionSelected(DispositionName.DISPOSITION_2)).toBe(true, `Disposition item ${DispositionName.DISPOSITION_2} is not selected`);
        expect(await maxDispositionPage.getDispositionNote()).toBe(dispositionNoteEdited, "Disposition note is not match with the expected disposition note");

        // Turn off the disposition popup
        await maxDispositionPage.toggleDispositionPopup(State.OFF);

        // End voice mail contact
        await maxVoiceMailPage.endVoiceMailRequireDisposition(false);

        // Save and close disposition to end a contact
        await maxDispositionPage.saveAndCloseDisposition();

        // =============== Repeat steps 3 -> 9 to start an IB call ===============
        // 3. Using the "IBPhone_RequiredDisposition" skill to send an IB phone call contact to agent
        await TestHelpers.startInboundCall(agent);
        maxCall = await maxPage.waitForCallWorkspace();

        // VP: Check IBPhone call workspace section exists inC-UI
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "Failed by ticket IC-83757: [TestAutomation][inC-API] Skill is not assigned to agent when calling API /services/v7.0/skills/{skillId}/agents}. Call workspace is not display.");

        // 4. Click the disposition checkbox
        await maxDispositionPage.toggleDispositionPopup(State.ON);

        // VP: Check disposition window exists inC-UI
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition window is not displayed");

        // VP: Check all disposition data is shown correctly (Disposition, Notes, Tags). 
        expect(await maxDispositionPage.isDispositionListItemsDisplayed()).toBe(true, "Disposition list items is not displayed");
        expect(await maxDispositionPage.isDispositionNoteDisplayed()).toBe(true, "Disposition note is not displayed");
        expect(await maxDispositionPage.isDispositionAddTagDisplayed()).toBe(true, "Disposition add tag is not displayed");

        // 5. Select disposition, type some notes
        // 6. Click save
        await maxDispositionPage.submitDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

        // VP: Check the disposition dialog closes 
        expect(await maxDispositionPage.isDispositionFormDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Disposition window is still displayed");

        // VP: Check the Checkbox is highlighted green 
        expect(await maxDispositionPage.getColorDispositionCheckbox()).toBe(greenColor, "Disposition checkbox color is not match with the color expected");

        // Click the disposition checkbox to check data saved
        await maxDispositionPage.toggleDispositionPopup(State.ON);

        // VP: Check the data is saved 
        expect(await maxDispositionPage.isDispositionSelected(DispositionName.DISPOSITION_1)).toBe(true, `Disposition item ${DispositionName.DISPOSITION_1} is not selected`);
        expect(await maxDispositionPage.getDispositionNote()).toBe(dispositionNote, "Disposition note is not match with the expected disposition note");

        // 8. Click on the disposition green checkbox
        await maxDispositionPage.toggleDispositionPopup(State.ON);

        // 9. Click save new value
        await maxDispositionPage.submitDispositionForm(DispositionName.DISPOSITION_2, dispositionNoteEdited);

        // VP: Check the Checkbox is highlighted green 
        expect(await maxDispositionPage.getColorDispositionCheckbox()).toBe(greenColor, "Disposition checkbox color is not match with the color expected");

        // Click the disposition checkbox to check data saved
        await maxDispositionPage.toggleDispositionPopup(State.ON);

        // VP: Check the data is saved after edited
        expect(await maxDispositionPage.isDispositionSelected(DispositionName.DISPOSITION_2)).toBe(true, `Disposition item ${DispositionName.DISPOSITION_2} is not selected`);
        expect(await maxDispositionPage.getDispositionNote()).toBe(dispositionNoteEdited, "Disposition note is not match with the expected disposition note");

        // Turn off the disposition popup
        await maxDispositionPage.toggleDispositionPopup(State.OFF);

        // End call contact 
        await maxCall.endCallRequireDispositionContact();

        // Save and close disposition to end a contact
        await maxDispositionPage.saveAndCloseDisposition();

        // =============== Repeat steps 3 -> 9 to start a chat contact ===============
        // 3. Using the "_chatReqDispo" skill to send a chat contact to agent
        // await CustomAPIs.startChatContact(agent, Utility.getSkillPOC(SkillType.CHAT));
        await TestHelpers.startChatContact(agent);
        await maxPage.waitForNewContactPopUp();
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: Check the chat workspace section exists inC-UI
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat workspace is not displayed.");

        // 4. Click the disposition checkbox
        await maxDispositionPage.toggleDispositionPopup(State.ON);

        // VP: Check disposition window exists inC-UI
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition window is not displayed");

        // VP: Check all disposition data is shown correctly (Disposition, Notes, Tags). 
        expect(await maxDispositionPage.isDispositionListItemsDisplayed()).toBe(true, "Disposition list items is not displayed");
        expect(await maxDispositionPage.isDispositionNoteDisplayed()).toBe(true, "Disposition note is not displayed");
        expect(await maxDispositionPage.isDispositionAddTagDisplayed()).toBe(true, "Disposition add tag is not displayed");

        // 5. Select disposition, type some notes
        // 6. Click save
        await maxDispositionPage.submitDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

        // VP: Check the disposition dialog closes 
        expect(await maxDispositionPage.isDispositionFormDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Disposition window is still displayed");

        // VP: Check the Checkbox is highlighted green 
        expect(await maxDispositionPage.getColorDispositionCheckbox()).toBe(greenColor, "Disposition checkbox color is not match with the color expected");

        // Click the disposition checkbox to check data saved
        await maxDispositionPage.toggleDispositionPopup(State.ON);

        // VP: Check the data is saved 
        expect(await maxDispositionPage.isDispositionSelected(DispositionName.DISPOSITION_1)).toBe(true, `Disposition item ${DispositionName.DISPOSITION_1} is not selected`);
        expect(await maxDispositionPage.getDispositionNote()).toBe(dispositionNote, "Disposition note is not match with the expected disposition note");

        // 8. Click on the disposition green checkbox
        await maxDispositionPage.toggleDispositionPopup(State.ON);

        // 9. Click save new value
        await maxDispositionPage.submitDispositionForm(DispositionName.DISPOSITION_2, dispositionNoteEdited);

        // VP: Check the Checkbox is highlighted green 
        expect(await maxDispositionPage.getColorDispositionCheckbox()).toBe(greenColor, "Disposition checkbox color is not match with the color expected");

        // Click the disposition checkbox to check data saved
        await maxDispositionPage.toggleDispositionPopup(State.ON);

        // VP: Check the data is saved after edited
        expect(await maxDispositionPage.isDispositionSelected(DispositionName.DISPOSITION_2)).toBe(true, `Disposition item ${DispositionName.DISPOSITION_2} is not selected`);
        expect(await maxDispositionPage.getDispositionNote()).toBe(dispositionNoteEdited, "Disposition note is not match with the expected disposition note");

        // Turn off the disposition popup
        await maxDispositionPage.toggleDispositionPopup(State.OFF);

        // End chat contact
        await maxChatPage.endChatRequireDisposition();
        await maxChatPage.waitForContactWorkSpaceDisappeared(ContactName.CHAT);

        // Save and close disposition to end a contact
        await maxDispositionPage.saveAndCloseDisposition();

    }, testTimeout);

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Logout
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(agent, SkillType.IB_Phone);
                await TestCondition.setUpAndRemoveSkill(agent, SkillType.CHAT);
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.VOICEMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});