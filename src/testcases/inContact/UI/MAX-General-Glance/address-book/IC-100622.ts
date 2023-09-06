import { Agent } from "@data-objects/general/agent";
import { ContactName, TransferTab } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: General(Glance) > Address Book
 * TC ID: IC-100622
 * Tested browser: Chrome.
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('General(Glance) > Address Book - IC-100622', function () {
    TestBase.scheduleTestBase();
    let agent: Agent;
    let randomNumber: string = Utility.getRandomNumber(10).toString();

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-100622 - [MAX][Address Book][All Agents] Team is shown in Agents`);
        agent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-100622 - [MAX][Address Book][All Agents] Team is shown in Agents', async () => {

        // 0. Pre Conditions
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);
        // 0.1 Launch MAX
        maxPage = await centralPage.launchMAX(agent.phoneNumber);

        // 1. Open Max address book
        await maxPage.clickNew();

        // VP: Call panel is open (displaying tabs: History, My Team, Other) with search box at top of panel.
        expect(await maxPage.isAddressBookDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Address book is not displayed");
        expect(await maxPage.isSearchFieldOnTopAddressBook()).toBe(true, "Search field is not on the top of address book address book");
        expect(await maxPage.getSearchFieldPlaceholderValue()).toBe("Enter number, email, or search term", "Search field placeholder text is not correct");
        expect(await maxPage.isAdvancedAddressBookTabDisplayed(TransferTab.RECENT, TestRunInfo.shortTimeout)).toBe(true, "History tab field doesn't display in address book");
        expect(await maxPage.isAdvancedAddressBookTabDisplayed(TransferTab.MY_TEAM, TestRunInfo.shortTimeout)).toBe(true, "My team tab field doesn't display in address book")
        expect(await maxPage.isAdvancedAddressBookTabDisplayed(TransferTab.OTHER, TestRunInfo.shortTimeout)).toBe(true, "Other field doesn't display in address book");

        // 1.1 Click on Agents panel tab
        await maxPage.clickAddressBookTabPanelItem("Agents");

        //VP: "All Agents" and teams displays
        expect(await maxPage.isAddressBookHeaderDisplayed("Agents")).toBe(true, "Agents header is not displaying");
        expect(await maxPage.isAddressBookTabPanelItemDisplayed("All Agents")).toBe(true, "All Agents Address Book tab item is not displaying");
        expect(await maxPage.isAddressBookTabPanelItemDisplayed("MAX Automation")).toBe(true, "MAX Automation Address Book tab item is not displaying");
        expect(await maxPage.isAddressBookTabPanelItemDisplayed("Team")).toBe(true, "Team Address Book tab item is not displaying");

        //1.2 select "All Agents"
        await maxPage.clickAddressBookTabPanelItem("All Agents");

        //VP: "All Agents" display
        expect(await maxPage.isAddressBookHeaderDisplayed("All Agents")).toBe(true, "Agents header is not displaying");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Final
            await maxPage.closePopover();
            await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (error) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.OB_PHONE);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
});