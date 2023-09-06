import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 420370
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe("MAX suite - IC-62604", function () {
    TestBase.scheduleTestBase();
    let ibPhoneAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62604 - [MAX] Launch is offset in ADA high contrast`);
        ibPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_Phone);
    }, TestRunInfo.conditionTimeout);

    it('IC-62604 - MAX Launch is offset in ADA high contrast', async () => {

        // 1. Central Login        
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibPhoneAgent);

        // 2. Launch MAX
        await ibPhoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(ibPhoneAgent.phoneNumber);

        // 3. Change state
        await maxPage.changeState(MaxState.AVAILABLE);

        // 4. Wait the IB Phone Contact delivers in MAX
        await TestHelpers.startInboundCall(ibPhoneAgent);
        maxCall = await maxPage.waitForCallWorkspace();

        // 5. Change ADA setting to on
        await maxPage.showMaxGlance();
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxADASetting(State.ON, false);

        // VP: High Contrast ADA mode is on
        expect(await maxPage.getADAHighContrastStatus()).toBe(State.ON.toLocaleLowerCase(), "High Contrast ADA mode isn't correct");

        // 6. Hide Max glance and click Launch button
        await maxPage.closePopover();
        await maxPage.hideMaxGlance();
        await maxPage.waitForMAXGlanceStable();
        await maxCall.clickLaunchButton();

        // VP: The indicating arrow pointed to the center of the Launch button
        expect(await maxCall.isNarrowCenterBelowLaunchButton(TestRunInfo.middleTimeout)).toBe(true, "The narrow is not at below center of Launch button");
        await maxPage.closePopover();
        maxPage = await maxCall.endCallContact();
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await BrowserWrapper.switchWindowByTitle("inContact");
            await CustomAPIs.endAllContacts(ibPhoneAgent);
            centralPage = await CentralPage.getInstance();
            maxPage = await centralPage.launchMAX(ibPhoneAgent.phoneNumber);
            await maxPage.changeMaxADASetting(State.OFF, true);
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (error) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibPhoneAgent, SkillType.IB_Phone);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
});