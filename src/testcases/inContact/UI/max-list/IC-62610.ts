import { Agent } from "@data-objects/general/agent";
import { Cluster, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import TestHelpers from "@test-helpers/test-helpers";
import { SkillType } from "@data-objects/general/skill-core";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 414292 
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC16, HC25
 */

describe('MAX suite - IC-62610', function () {
    TestBase.scheduleTestBase();
    let cluster: Cluster = TestRunInfo.cluster;
    TestBase.scheduleTestBase();
    let ibPhoneAgent: Agent;
    let obPhoneAgent: Agent;
    let driverAgent1: number = 1;
    let driverAgent2: number = 2;

    // Declare page object
    let loginPage1: LoginPage;
    let loginPage2: LoginPage;
    let centralPage1: CentralPage;
    let centralPage2: CentralPage;
    let maxPage1: MaxPage;
    let maxPage2: MaxPage;
    let maxPage1WindowHandle: string;
    let maxPage2WindowHandle: string;
    let maxCall1: MaxCall;
    let pageBase: PageBase;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62610 - [MAX] Internal transfers must show calling agent first and last name on accept dialog box`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);        
        ibPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_Phone);
        await TestHelpers.getAgentInfo(obPhoneAgent);
        await TestHelpers.getAgentInfo(ibPhoneAgent);

    }, TestRunInfo.conditionTimeout);

    it('IC-62610 - MAX Internal transfers must show calling agent first and last name on accept dialog box', async () => {

        // 1. PREREQ
        // 2 users (in that belongs to the same Team) logged into 2 different browsers
        // MAX launched and Unavailable state for both users
        // IB and OB phone skills for each agent

        // Login Central and launch MAX for Agent 1
        loginPage1 = LoginPage.getInstance();
        pageBase = new PageBase();
        centralPage1 = await loginPage1.loginInContact(obPhoneAgent);
        maxPage1 = await centralPage1.launchMAX(obPhoneAgent.phoneNumber);
        maxPage1WindowHandle = await pageBase.getCurrentWindowHandle();

        pageBase.createDriverInstance();
        pageBase.switchDriverInstance(driverAgent2);
        await pageBase.navigateWeb(cluster.getURL(PageName.LOGIN_PAGE));

        // Login Central and launch MAX for Agent 2
        loginPage2 = LoginPage.getInstance();
        centralPage2 = await loginPage2.loginInContact(ibPhoneAgent);
        maxPage2 = await centralPage2.launchMAX(ibPhoneAgent.phoneNumber);
        maxPage2WindowHandle = await pageBase.getCurrentWindowHandle();

        // 2. Agent 1 clicks New> Outbound Call> in the My Team tab type or scroll until you find the name of the second user. Click on the black 'Call' button.
        await pageBase.switchDriverInstance(driverAgent1);
        await pageBase.switchWindowByHandle(maxPage1WindowHandle);
        await maxPage1.clickNew();
        maxCall1 = await maxPage1.makeInBoundPhoneToAgent(ibPhoneAgent.name);

        // VP: Call Connect
        expect(await maxPage1.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "Call is not connected");

        // 3. Agent 2 sees the Accept window show up
        await pageBase.switchDriverInstance(driverAgent2);
        await pageBase.switchWindowByHandle(maxPage2WindowHandle);

        // VP: Agent 2 sees the Accept window show up and the calling agent first and last name displayed
        expect(await maxPage2.isCallContactPopUpDisplayed()).toBe(true, "Call contact popup isn't displayed");
        expect(await maxPage2.getPopupPhoneContactName()).toBe(obPhoneAgent.name, "Caller name is not displayed correctly");

    });
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Log out max and central pages for agent 1           
            await pageBase.switchDriverInstance(driverAgent1);
            await pageBase.switchWindowByHandle(maxPage1WindowHandle);
            await maxCall1.endCallContact();
            await maxPage1.logOut();
            await centralPage1.logOut();

            // Log out max and central pages for agent 2
            await pageBase.switchDriverInstance(driverAgent2);
            await pageBase.switchWindowByHandle(maxPage2WindowHandle);
            await maxPage2.logOut();
            await centralPage2.logOut();
        }
        catch (error) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.OB_PHONE);
                await TestCondition.setAgentSkillsToDefault(ibPhoneAgent, SkillType.IB_Phone);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
});