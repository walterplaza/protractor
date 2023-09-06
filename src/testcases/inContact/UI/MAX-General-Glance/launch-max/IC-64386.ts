import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

/** 
 * Type: inContact
 * Suite: General(Glance) > lunch-max
 * TC ID: IC-64386
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe("General(Glance) > lunch-max - IC-64386", function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-64386 - Launch MAX, refresh and set to Available and Log Out`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it('IC-64386 - Launch MAX, refresh and set to Available and Log Out', async () => {

        loginPage = LoginPage.getInstance();

        // IC Central login.
        centralPage = await loginPage.loginInContact(chatAgent);

        // Launch MAX.
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // VP: Check MAX exist.
        expect(await maxPage.isPageDisplayed()).toBe(true, "MAX is not existed");

        // Refresh MAX
        BrowserWrapper.refreshPage();

        // VP: Check MAX exist.
        expect(await maxPage.isPageDisplayed()).toBe(true, "MAX is not existed");

        //Click MAX states drop down
        await maxPage.clickMAXStateDropDown();

        //VP : Check if MAX state "AVAILABLE" exists
        expect(await maxPage.isMAXStateDisplayed(MaxState.AVAILABLE)).toBe(true, "MAX state AVAILABLE doesn't exists");

        //VP : Check if MAX state "UNAVAILABLE" exists
        expect(await maxPage.isMAXStateDisplayed(MaxState.UNAVAILABLE)).toBe(true, "MAX state UNAVAILABLE doesn't exists ");

        //VP : Check if MAX state "LOGOUT" exists
        expect(await maxPage.isMAXStateDisplayed(MaxState.LOGOUT)).toBe(true, "MAX state LOGOUT doesn't exists ");

        //Click MAX states drop down
        await maxPage.clickMAXStateDropDown();

        // Set MAX agent state "Available".
        await maxPage.changeState(MaxState.AVAILABLE)

        // VP: Status change to Available
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.AVAILABLE, "Agent status doesn't change to Available");

        // Log out max and central pages
        centralPage = await maxPage.logOut();
        await centralPage.logOut();
    });
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
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