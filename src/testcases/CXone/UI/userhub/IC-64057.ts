import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, MaxState, PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxChatPage from "@page-objects/CXone/max/max-chat-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

/** 
 * Type: CXone
 * Suite: UserHub
 * TC ID: IC-64057
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */

describe('UserHub - IC-64057', function () {
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let homeWindowHandleAdmin: string;
    let maxWindowHandleAdmin: string;
    let sessionID: string;

    // Declare page object
    let basePage: PageBase;
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-64057 - [MAX][UserHub][Role: Agent] Verify that MAX remains its session after logout the Cxone session.`);
        admin = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_OBPHONE);

        //Pre-Condition:
        //MAX - UserHub Login
        basePage = new PageBase();
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(admin);
        homeWindowHandleAdmin = await BrowserWrapper.getNewWindowHandle();

        //MAX - Launch MAX
        maxPage = await employeesPage.launchMax();
        await admin.createPhoneNumber();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber);
        maxWindowHandleAdmin = await BrowserWrapper.getNewWindowHandle();
        sessionID = admin.sessionId;

    }, TestRunInfo.conditionTimeout);

    it('IC-64057 - MAX UserHub Role  Agent  Verify that MAX remains its session after logout the Cxone session', async () => {

        //2. Return to Cxone page and logout
        await basePage.switchWindowByHandle(homeWindowHandleAdmin);
        await employeesPage.logOut();

        //VP: Verify the session of Cxone must be logout but MAX page must remain open.
        expect(await loginPage.isPageDisplayed()).toBe(true, "Login page is not displayed");
        await basePage.switchWindowByHandle(maxWindowHandleAdmin);
        expect(await maxPage.isPageDisplayed()).toBe(true, "MAX page is not displayed");

        //3. Return to MAX and click on F5 
        await basePage.refreshPage();

        //VP: Verify that MAX remains its session after logout the Cxone session.
        expect(admin.sessionId).toBe(sessionID, "SessionID is not matched");

        //4. Generate a contact using the skill requested in requirements.
        await maxPage.changeState(MaxState.AVAILABLE);
        await TestHelpers.startChatContact(admin);

        //VP: Verify the contact arrive in MAX without errors. 
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up doesn't display");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            maxChatPage = await maxPage.acceptNewChatContact();
            await maxChatPage.endChatContact();
            await maxPage.logOut();
        } catch (err) { }
    }, TestRunInfo.conditionTimeout);
});