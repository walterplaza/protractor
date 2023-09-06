import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { DispositionName } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 297143
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('MAX suite - IC-62661', function () {
    TestBase.scheduleTestBase();
    let ibPhoneAgent: Agent;
    let ibPhoneRqAgent: Agent;
    let dispositionNote: string = "Test Automation";
    let helpText: string = "Save & Redial";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62661 - MAX > Callback Dispostion > Save and Callback Button > UI verification`);
        ibPhoneAgent = await TestCondition.setUpAgent(SkillType.CHAT);
        ibPhoneRqAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, true);
        await TestCondition.setUpAndAssignSkill(ibPhoneAgent, SkillType.IB_Phone, true);
        await TestHelpers.startOrJoinSession(ibPhoneAgent, ibPhoneAgent.phoneNumber);
        await TestHelpers.makeInboundCall(ibPhoneAgent, SkillCore.getSkillName(SkillType.IB_Phone));
    }, TestRunInfo.conditionTimeout);

    it('IC-62661 - MAX Callback Dispostion Save and Callback Button UI verification', async () => {

        // 1. Launch MAX
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibPhoneRqAgent);
        maxPage = await centralPage.launchMAX(ibPhoneRqAgent.phoneNumber);

        // VP: MAX Launches
        expect(await maxPage.isPageDisplayed()).toBe(true, "MAX does not lauch");

        // 2. Complete a voice contact and disconnect contact
        await maxPage.changeState(MaxState.AVAILABLE);
        maxCall = await maxPage.waitForCallWorkspace();

        // 3. Call ends, verify new button exists
        maxDispositionPage = await maxCall.endCallRequireDispositionContact();

        // VP: "Save and Callback" button exists
        expect(await maxCall.isSaveAndRedialButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, `'Save and Callback' button does not exist`);

        // 4. Verify in IE, Chrome, and Firefox when hovered over, help text displays "Save and Callback"
        expect(await maxCall.getSaveAndRedialButtonHelpText()).toBe(helpText, `Help text is not displayed "Save and Callback"`)

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // End contact
            await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

            // Logout
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibPhoneRqAgent, SkillType.IB_Phone);
                await TestCondition.setUpAndRemoveSkill(ibPhoneAgent, SkillType.IB_Phone);
                await TestCondition.setAgentSkillsToDefault(ibPhoneAgent, SkillType.CHAT);

            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});