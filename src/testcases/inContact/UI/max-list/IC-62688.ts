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
 * Suite: MAX suite
 * TC ID: 249106
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe('MAX suite - IC-62688', function () {
    TestBase.scheduleTestBase();
    let agent2: Agent;
    let randomNumber: string = Utility.getRandomNumber(10).toString();

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62688 - MAX > Search > Search for custom address book`);
        agent2 = await TestCondition.setUpAgent(SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-62688 - MAX Search for custom address book', async () => {

        // Pre Conditions
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent2);
        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(agent2.phoneNumber);

        // 3. Open Max address book
        await maxPage.clickNew();

        // 4. Select Outbound Call
        await maxPage.selectAddNewOption(ContactName.PHONE_CALL);

        // VP: Call panel is open (displaying tabs: History, My Team, Other) with search box at top of panel.
        expect(await maxPage.isAddressBookDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Address book is not displayed");
        expect(await maxPage.isSearchFieldOnTopAddressBook()).toBe(true, "Search field is not on the top of address book address book");
        expect(await maxPage.isAdvancedAddressBookTabDisplayed(TransferTab.RECENT, TestRunInfo.shortTimeout)).toBe(true, "History tab field doesn't display in address book");
        expect(await maxPage.isAdvancedAddressBookTabDisplayed(TransferTab.MY_TEAM, TestRunInfo.shortTimeout)).toBe(true, "My team tab field doesn't display in address book")
        expect(await maxPage.isAdvancedAddressBookTabDisplayed(TransferTab.OTHER, TestRunInfo.shortTimeout)).toBe(true, "Other field doesn't display in address book");

        // 5. Check the location of your focus
        // VP: Focus is currently in the search bar
        expect(await maxPage.isSearchAddressDisplayed()).toBe(true, "Search field is not displayed on the top of address book address book");

        // 6. Start typing in one of the names from the custom address book
        await maxPage.inputAddressBook(randomNumber);

        // VP: The tabs are removed and the search list comes up
        expect(await maxPage.isAdvancedAddressBookTabDisplayed(TransferTab.RECENT, TestRunInfo.shortTimeout)).toBe(false, "History tab field displays in address book");
        expect(await maxPage.isAdvancedAddressBookTabDisplayed(TransferTab.MY_TEAM, TestRunInfo.shortTimeout)).toBe(false, "My team tab field displays address book")
        expect(await maxPage.isAdvancedAddressBookTabDisplayed(TransferTab.OTHER, TestRunInfo.shortTimeout)).toBe(false, "Other field displays address book");

        // VP: The result will display any matches found from the custom address book entries.
        expect(await maxPage.isContactInAddressBookDisplayed(randomNumber, TestRunInfo.shortTimeout)).toBe(true, "The result doesn't display any matches found from the custom address book entries.");
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
                await TestCondition.setAgentSkillsToDefault(agent2, SkillType.OB_PHONE);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
});