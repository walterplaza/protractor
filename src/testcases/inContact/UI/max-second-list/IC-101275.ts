import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { AgentReportOption, ContactName } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 296295
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe('MAX suite - IC-101275', function () {

    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let whiteColor: string = '#ffffff';
    let blackColor: string = '#1c639c';
    let agentReportBGColor: string;
    let agentReportBGColorHovered: string;
    let agentReportHeader: string;
    let startDate: string;
    let endDate: string;
    let outboundNumber: string;
    let callContactId: string;
    let response: APIResponse;

    // Declare Page object
    let basePage: PageBase;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101275 - MAX > Agent Reports > Productivity > Today > Request time and result`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        basePage = new PageBase();
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneAgent);

        TestRunInfo.testTimeout = TestRunInfo.testTimeout * 3;
        startDate = await Utility.getNowDate("/", 0);
        endDate = await Utility.getNowDate("/", 0);
        outboundNumber = "40000100" + Utility.getRandomNumber(2);
    }, TestRunInfo.conditionTimeout);

    it('IC-101275 - MAX Agent Reports Productivity Today Request time and result', async () => {

        // Pre-condition: Agent has handled contacts previously that have been warehoused (>15 min.) in order to populate statistics
        await obPhoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.PHONE_CALL);
        await maxPage.makeOutboundCall(outboundNumber, SkillType.OB_PHONE);
        maxCall = await maxPage.waitForCallWorkspace();
        callContactId = await TestHelpers.getCurrentContactId(obPhoneAgent, SkillCore.getSkillName(SkillType.OB_PHONE));
        maxPage = await maxCall.endCallContact();
        centralPage = await maxPage.logOut();

        // Wait 15 minutes 
        await Logger.write(FunctionType.UI, `Waiting 15 minutes after ending a call contact`);
        await basePage.waitInSecond(910);

        // 6. Launch MAX
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);

        // 7. Observe main agent layout
        // VP: Activity bar exists (gray bar) above control buttons along the bottom.
        expect(await maxPage.isAgentReportsButtonDisplayed()).toBe(true, "Activity bar does not exist (gray bar) above control buttons along the bottom");

        // VP: The second half of the activity bar is a button that reads "Agent Reports"
        expect(await maxPage.getAgentReportText()).toContain('Agent Reports', `The second half of the activity bar is not a button that reads "Agent Reports"`);

        // 8. Hover over the "Agent Reports" area
        await maxPage.hoverAgentReportButton();

        // VP: Button changes color (darker)
        agentReportBGColorHovered = await maxPage.getAgentReportBackGroundColor();
        expect(agentReportBGColor == agentReportBGColorHovered).toBe(false, "Button does not change color (darker)");

        // VP: Tool tip is displayed as "Agent Reports" -or- "Assigned Skills: X" unless one of the reports is selected Performance (##%) -or- Productivity (##%) then display will show the date range setting of the report selected as "Today", "Yesterday" or "Last 7 Days"
        expect(await maxPage.getAgentReportTooltip()).toBe("Agent Reports", `Tool tip does not display name like 'Agent Reports'`);

        // 9. Click Agent Reports button (second half of activity bar) 
        await maxPage.openAgentReports();

        // VP: Agent Reports popover opens
        expect(await maxPage.isReportAgentPopOverDisplayed()).toBe(true, "Agent Reports popover does not open");

        // VP: Header is dark gray with white letters
        expect(await maxPage.getAgentReportHeaderBGColor()).toContain(blackColor, " Background Header is not dark gray");
        expect(await maxPage.getAgentReportHeaderColor()).toContain(whiteColor, "Header Letters are not white");

        // VP: Three panel options displayed: Performance, Productivity, and Assigned Skills.
        expect(await maxPage.isAgentReportOptionDisplayed(AgentReportOption.PERFORMANCE)).toBe(true, "Performance option does not exist");
        expect(await maxPage.isAgentReportOptionDisplayed(AgentReportOption.PRODUCTIVITY)).toBe(true, "Productivity option does not exist");
        expect(await maxPage.isAgentReportOptionDisplayed(AgentReportOption.ASSIGN_SKILLS)).toBe(true, "Assign skills option does not exist");

        // VP: There is no star to indicate favorite selection listed by one of these options. 
        expect(await maxPage.isOptionFavoriteIconDisplayed(AgentReportOption.PERFORMANCE, TestRunInfo.shortTimeout)).toBe(false, "Performance Favorite icon does not exist");
        expect(await maxPage.isOptionFavoriteIconDisplayed(AgentReportOption.PRODUCTIVITY, TestRunInfo.shortTimeout)).toBe(false, "Productivity Favorite icon does not exist");
        expect(await maxPage.isOptionFavoriteIconDisplayed(AgentReportOption.ASSIGN_SKILLS, TestRunInfo.shortTimeout)).toBe(false, "Assign skills Favorite icon does not exist");

        // VP: There is a > carat next to each for drill down access.
        expect(await maxPage.isOptionDrillIconDisplayed(AgentReportOption.PERFORMANCE)).toBe(true, "Performance Favorite icon does not exist");
        expect(await maxPage.isOptionDrillIconDisplayed(AgentReportOption.PRODUCTIVITY)).toBe(true, "Productivity Favorite icon does not exist");
        expect(await maxPage.isOptionDrillIconDisplayed(AgentReportOption.ASSIGN_SKILLS)).toBe(true, "Assign skills Favorite icon does not exist");

        // 10. Click Productivity (##%) panel right carat > select today
        await maxPage.clickDrillIconAgentReportOption(AgentReportOption.PRODUCTIVITY);

        // VP: Productivity report slides open left
        agentReportHeader = await maxPage.getAgentReportHeader(AgentReportOption.PRODUCTIVITY);
        expect(agentReportHeader).toContain('Productivity', "Productivity report does not slide open left");

        // 11. Verify in the Dev tools window that v3.0/agents/performance returns 200 for the today tab, and the end date is on a quarter hour.
        response = await CustomAPIs.returnsAPerformanceSummaryOfAllAgents(obPhoneAgent, APIVersion.V3, "", startDate, endDate);

        //API returns successful and as expected
        expect(response.status).toBe(200, "Status code does not match expected");

        // Logout Central Page
        await maxPage.closePopover();
        centralPage = await maxPage.logOut();
    }, TestRunInfo.testTimeout * 3);

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);

            // Set favorite to Off
            await maxPage.openAgentReports();
            await maxPage.setFavoriteIconMode(AgentReportOption.PRODUCTIVITY, State.OFF.toLowerCase());
            await maxPage.closePopover();

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