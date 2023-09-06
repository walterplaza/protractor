
import { Agent } from "@data-objects/general/agent";
import { AgentReportOption, TimeRangeOption } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import MaxCall from "@page-objects/inContact/max/max-call";
import TestHelpers from "@test-helpers/test-helpers";
import { MaxState } from "@data-objects/general/cluster";

/** 
 * Type: inContact
 * Suite: General(Glance)
 * TC ID: IC-100716
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC6
 */

describe('General(Glance) - IC-100716', function () {

    TestBase.scheduleTestBase();
    let ibPhoneAgent: Agent;

    // Declare Page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-100716 - [MAX][Agent Reports][Performance][IB Calls] Show details correctly`);
        ibPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_Phone)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibPhoneAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-100716 - [MAX][Agent Reports][Performance][IB Calls] Show details correctly', async () => {

        // Precondition - Login and launch Max
        await ibPhoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(ibPhoneAgent.phoneNumber);

        // 1. Generate an IB Phone contact
        await TestHelpers.startInboundCall(ibPhoneAgent);

        // VP: IB contact is generated and the Workspace is displayed on MAX
        await maxPage.changeState(MaxState.AVAILABLE);
        maxCall = await maxPage.waitForCallWorkspace();

        // 2. End contact
        await maxCall.endCallContact();
        
        // 3. Navigate Max>Agent Reports>Performance
        await maxPage.openAgentReports();                
        await maxPage.clickDrillIconAgentReportOption(AgentReportOption.PERFORMANCE);

        // VP: Ensure that you are on Today tab                        
        expect(await maxPage.isPerformanceDateRangeDisplayed(TimeRangeOption.TODAY)).toBe(true, "Today button does not display in Performance");        

        // VP: Information for IB call for today should be appears on the details. 
        expect(await maxPage.isPerformanceTableHeaderDisplayed('Inbound')).toBe(true, "Inbound header does not exist");
                
        //VP: Review at 'You' column (this need to increase for Inbound option)
        let preinboundValue: number = await maxPage.getPerformanceTableCellValue('you-inbound');
        expect(preinboundValue).toBeGreaterThan(0, "You-inbound did not increase after a Inbound call");   

        // 4. Navigate between Today, Yesterday, and Last 7 days options, and then return to Today tab
        await maxPage.clickPerformanceTableDateRangeButton("Yesterday");
        await maxPage.clickPerformanceTableDateRangeButton("Last 7 Days");
        await maxPage.clickPerformanceTableDateRangeButton("Today");        

        let postinboundValue: number = await maxPage.getPerformanceTableCellValue('you-inbound');                  

        // VP: Information for IB call should be appears on the details as before.
        expect(preinboundValue).toBe(postinboundValue, "Number of You / inbound calls changed after refreshing table");

        await maxPage.closePopover();
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {            
            // Logout
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibPhoneAgent, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});