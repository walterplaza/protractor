import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 426411
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe("MAX suite - IC-62598", function () {
    TestBase.scheduleTestBase();
    let ibPhoneAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62598 - MAX>Tool Bar> Launch Button> Verify in IB Phone Contact, the Launch Button is displayed active.`);
        ibPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_Phone);
    }, TestRunInfo.conditionTimeout);

    it('IC-62598 - MAX Tool Bar Launch Button Verify in IB Phone Contact the Launch Button is displayed active', async () => {

        // 1. Central Login
        await TestHelpers.getSkillIdFromSkillName(ibPhoneAgent, SkillType.IB_Phone);
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibPhoneAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibPhoneAgent.phoneNumber);

        // 3. Set the Available status in MAX
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: The agent has the available state.
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.AVAILABLE, "Agent status is not Available");

        // 4. Generate an IB Phone Contact
        await TestHelpers.startInboundCall(ibPhoneAgent);
        maxCall = await maxPage.waitForCallWorkspace();

        // VP: The IB Phone Contact delivers in MAX
        expect(await maxPage.isCallWorkspaceDisplayed()).toBe(true, "The IB Phone Contact does not deliver in MAX");

        // 5. From IB Phone works space, click on "Launch" button
        await maxCall.clickLaunchButton();

        // VP: Verify the "Launch" Button is displayed active and it is expand it from IB Phone works space.
        expect(await maxCall.isLaunchButtonActivated()).toBe(true, "Launch Button is not displayed active");
        expect(await maxCall.isIndicatorDisplayed()).toBe(true, "Launch menu is not displayed");


    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Clean up
            await maxCall.closePopover();
            await maxCall.clickEndContactButton();
            maxPage = await maxCall.clickConfirmEndContactButton();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) {}
        finally{
            try{
                await TestCondition.setAgentSkillsToDefault(ibPhoneAgent, SkillType.IB_Phone);
            }
            catch (err) {}
        }
    }, TestRunInfo.conditionTimeout);
});