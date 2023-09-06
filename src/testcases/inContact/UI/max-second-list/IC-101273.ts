import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import TestHelpers from "@test-helpers/test-helpers";
import PageBase from "@page-objects/page-base";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 297139
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe("MAX suite - IC-101273", function () {
    TestBase.scheduleTestBase();
    let ibPhoneAgent: Agent;
    let obPhonehistory: string = "4005150001";
    let skillName: string;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let pageBase: PageBase;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101273 - [MAX] [IB] [Phone] Verify that IB Call made is displayed in Contact history.`);
        ibPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_Phone);
        await TestCondition.setUpAndAssignSkill(ibPhoneAgent, SkillType.OB_PHONE);
        pageBase = new PageBase();
    }, TestRunInfo.conditionTimeout);

    it('IC-101273 - MAX IBPhone Verify that IB Call made is displayed in Contact history.', async () => {

        skillName = SkillCore.getSkillName(SkillType.IB_Phone);

        // 1. PRECONDITION: Agent with access to make and/or receive inbound and outbound calls on MAX agent	
        // 2. PRECONDITION: Ability to generate an inbound call to be handled by the agent	
        // Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibPhoneAgent);

        // 3. Launch MAX Agent
        await ibPhoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(ibPhoneAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // 4. Generate inbound call for agent	        
        await TestHelpers.startInboundCall(ibPhoneAgent);

        // VP Agent handles call
        maxCall = await maxPage.waitForCallWorkspace();
        expect(await maxCall.isCallWorkspaceDisplayed()).toBe(true, "IB Phone workspace is not displayed");

        // 5. End call
        // Wait for 5 seconds to make call valid
        await pageBase.waitInSecond(5);
        await maxCall.endCallContact();

        // VP: The call is ended
        expect(await maxCall.isCallWorkspaceDisplayed(5)).toBe(false, "Call is not ended");

        // 6. Observe Main panel and its elements (See also summary)
        await Logger.write(FunctionType.UI, `Observe Main panel and its elements`);

        // VP Headers: Personal Queue, Coming Up, Contact History
        expect(await maxPage.isHeaderDisplayed("PersonalQueue")).toBe(true, "Personal Queue header is not displayed in MAX");
        expect(await maxPage.isHeaderDisplayed("ComingUp")).toBe(true, "Coming Up header is not displayed in MAX");
        expect(await maxPage.isHeaderDisplayed("CallHistory")).toBe(true, "Call History header is not displayed in MAX");

        // 7. Contact History element	
        await Logger.write(FunctionType.UI, `Observe Contact History element`);

        // VP Elements include: Inbound call icon, Name of contact (if known - i.e. Address book) or Number, Time duration, and Skill name
        expect(await maxPage.isCallHistoryIBIconDisplayed()).toBe(true, "IB Phone icon is not displayed in Contact History");
        expect(await maxPage.isCallHistoryNumberDisplayed(obPhonehistory)).toBe(true, "Call number is not displayed in Contact History");
        expect(await maxPage.isCallHistoryActiveDurationDisplayed()).toBe(true, "Active duration is not displayed in Contact History");
        expect(await maxPage.isCallHistorySkillDisplayed(skillName)).toBe(true, "Skill name is not displayed in Contact History");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Clean up
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(ibPhoneAgent, SkillType.OB_PHONE);
                await TestCondition.setAgentSkillsToDefault(ibPhoneAgent, SkillType.IB_Phone);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});