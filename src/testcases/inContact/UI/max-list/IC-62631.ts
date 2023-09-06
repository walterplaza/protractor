import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { DispositionName } from "@data-objects/general/max";
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
 * TC ID: 390743
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: C11
 */

describe('MAX suite - IC-62631', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let note: string = "Test Automation";
    let strTextColor1: string;
    let strTextColor2: string;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62631 - [MAX] Can't tell when you select an item in Disposition Window`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT, true);
        await TestHelpers.startChatContact(chatAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62631 - MAX Cant tell when you select an item in Disposition Window', async () => {

        // 1. inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 3. Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();

        // VP: chatRequiredAgent1 will receive chat contact
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up doesn't display");

        // 4. Accept New contact
        maxChatPage = await maxPage.acceptNewChatContact();

        // 5. End chat contact
        maxDispositionPage = await maxChatPage.endChatRequireDisposition();

        // VP: Disposition Window is displayed
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition window is not displayed");

        // 6.1 Get text color of Disposition 1 before it's selected
        strTextColor1 = await maxDispositionPage.getDispositionItemColor(DispositionName.DISPOSITION_1);

        // 6.2 Select disposition 1
        await maxDispositionPage.fillDispositionForm(DispositionName.DISPOSITION_1);

        // 6.3 Get text color of Disposition 1 after it's selected
        strTextColor2 = await maxDispositionPage.getDispositionItemColor(DispositionName.DISPOSITION_1);

        // VP: Check text color of selected disposition and unselected disposition is different
        expect(Utility.compareStrings(strTextColor1, strTextColor2)).toBe(false, "Text color of two dispositions are the same");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            //Post-Condition        
            maxPage = await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, note);
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } 
        catch (error) {} 
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            } 
        catch (error) {}
        }
    }, TestRunInfo.conditionTimeout);
});



