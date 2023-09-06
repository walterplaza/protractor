import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxTransferPage from "@page-objects/inContact/max/max-transfer-page";
import MaxWorkItemPage from "@page-objects/inContact/max/max-workitem-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 403353
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe('MAX suite - IC-101259', function () {
    TestBase.scheduleTestBase();
    let workItemAgent: Agent;
    let chatAgent: Agent;


    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxWorkItemPage: MaxWorkItemPage;
    let maxTransferPage: MaxTransferPage;
    

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101259 - MAX Work Item Transfer Search for people and skills`);
        workItemAgent = await TestCondition.setUpAgent(SkillType.WORK_ITEM);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT)
    }, TestRunInfo.conditionTimeout);

    it('IC-101259 - MAX Work Item Transfer Search for people and skills', async () => {

        // 1. Central login and launch MAX
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(workItemAgent);
        maxPage = await centralPage.launchMAX(workItemAgent.phoneNumber);

        //2. Send a work item to your agent
        await TestHelpers.startWorkItemContact(workItemAgent);
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();
        maxWorkItemPage = await maxPage.acceptNewWorkItemContact();

        // VP: The work item is created and accepted 
        expect(await maxWorkItemPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM)).toBe(true, "Work Item working space is not displayed");

        // 4. Click the transfer button 
        maxTransferPage = await maxWorkItemPage.clickTransferConferenceButton();

        // VP:The Transfer drop down appears
        expect(await maxTransferPage.isSearchAddressDisplayed()).toBe(true, "Transfer address drop down is not displayed");

        //5.In the search box enter the first few letters of a name or skill 
        let firstLettersName: string = chatAgent.name.slice(0,3)
        await maxTransferPage.inputAddressBook(firstLettersName);

        // VP: Displays agents that are logged in
        expect(await maxTransferPage.isAgentSearchResultDisplayedList(chatAgent.name)).toBe(true, "The agent isn't logged in");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {

            await maxWorkItemPage.closePopover();
            await maxWorkItemPage.endWorkItemContact();
            // 6. Log out MAX and Central Page.
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (error) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(workItemAgent, SkillType.WORK_ITEM);
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
});



