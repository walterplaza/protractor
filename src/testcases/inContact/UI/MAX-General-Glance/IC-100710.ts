
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

/** 
 * Type: inContact
 * Suite: General(Glance)
 * TC ID: IC-100710
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC6
 */

describe('General(Glance) - IC-100710', function () {

    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;

    // Declare Page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-100710 - [MAX][Agent Reports][Performance][OB Calls] Show details correctly`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-100710 - [MAX][Agent Reports][Performance][OB Calls] Show details correctly', async () => {

        // Precondition - Login and launch Max
        await obPhoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);

        // 1. Generate an OB Phone contact
        await maxPage.clickNew();
        expect(await maxPage.isSearchAddressDisplayed()).toBe(true, "Search textbook does not exist");
        maxCall = await maxPage.makeOutboundCall(obPhoneAgent.phoneNumber, SkillType.OB_PHONE);

        // VP: OB contact is generated and the Workspace is displayed on MAX
        expect(await maxPage.isIbPhoneIconDisplayed()).toBe(true, "ObPhone Icon is not displayed");

        // 1.2 End contact
        await maxCall.endCallContact();
        
        // 3. Navigate Max>Agent Reports>Performance
        await maxPage.openAgentReports();                
        await maxPage.clickDrillIconAgentReportOption(AgentReportOption.PERFORMANCE);

        // VP: Ensure that you are on Today tab                        
        expect(await maxPage.isPerformanceDateRangeDisplayed(TimeRangeOption.TODAY)).toBe(true, "Today button does not display in Performance");        

        // VP: Information for OB call for today should be appears on the details. Review at 'You' column (this need to increase for Inbound option)
        expect(await maxPage.isPerformanceTableHeaderDisplayed('Outbound')).toBe(true, "Outbound header does not exist");
                
        let preoutboundValue: number = await maxPage.getPerformanceTableCellValue('you-outbound');
        expect(preoutboundValue).toBeGreaterThan(0, "You-outbound did not increase after a outbound call");   

        // 4. Navigate between Today, Yesterday, and Last 7 days options, and then return to Today tab
        await maxPage.clickPerformanceTableDateRangeButton("Yesterday");
        await maxPage.clickPerformanceTableDateRangeButton("Last 7 Days");
        await maxPage.clickPerformanceTableDateRangeButton("Today");        

        let postoutboundValue: number = await maxPage.getPerformanceTableCellValue('you-outbound');                  

        // VP: Information for OB call should be appears on the details as before.
        expect(preoutboundValue).toBe(postoutboundValue, "Number of You / outbound calls changed after refreshing table");

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
                await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});