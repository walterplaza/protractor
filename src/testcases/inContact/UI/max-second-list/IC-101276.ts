
import { Agent } from "@data-objects/general/agent";
import { State } from "@data-objects/general/general";
import { AgentReportOption } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 295877
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe('MAX suite - IC-101276', function () {

    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let whiteColor: string = '#ffffff';
    let blackColor: string = '#1c639c';
    let agentReportBGColor: string;
    let agentReportBGColorHovered: string;
    let agentReportHeader: string;

    // Declare Page object
    let basePage: PageBase;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101276 - MAX > Agent Reports > Productivity > API time changes`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        basePage = new PageBase();
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneAgent);
        TestRunInfo.testTimeout = 1100000;
    }, TestRunInfo.conditionTimeout);

    it('IC-101276 - MAX Agent Reports Productivity API time changes', async () => {

        // 2. Launch MAX
        await obPhoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);

        // 3. Observe main agent layout
        // VP: Activity bar exists (gray bar) above control buttons along the bottom.
        expect(await maxPage.isAgentReportsButtonDisplayed()).toBe(true, "Activity bar doesn't exist (gray bar) above control buttons along the bottom");

        // VP: The second half of the activity bar is a button that reads "Agent Reports"
        expect(await maxPage.getAgentReportText()).toContain('Agent Reports', `The second half of the activity bar isn't a button that reads "Agent Reports"`);

        // 4. Hover over the "Agent Reports" area
        await maxPage.hoverAgentReportButton();

        // VP: Button changes color (darker)
        agentReportBGColorHovered = await maxPage.getAgentReportBackGroundColor();
        expect(agentReportBGColor == agentReportBGColorHovered).toBe(false, "Button doesn't change color (darker)");

        // VP: Tool tip is displayed as "Agent Reports" -or- "Assigned Skills: X" unless one of the reports is selected Performance (##%) -or- Productivity (##%) then display will show the date range setting of the report selected as "Today", "Yesterday" or "Last 7 Days"
        expect(await maxPage.getAgentReportTooltip()).toBe("Agent Reports", `Tool tip doesn't display name like 'Agent Reports'`);

        // 5. Click Agent Reports button (second half of activity bar) 
        await maxPage.openAgentReports();

        // VP: Agent Reports popover opens
        expect(await maxPage.isReportAgentPopOverDisplayed()).toBe(true, "Agent Reports popover doesn't open");

        // VP: Header is dark gray with white letters
        expect(await maxPage.getAgentReportHeaderBGColor()).toContain(blackColor, " Background Header isn't dark gray");
        expect(await maxPage.getAgentReportHeaderColor()).toContain(whiteColor, "Header Letters aren't white");

        // VP: Three panel options displayed: Performance, Productivity, and Assigned Skills.
        expect(await maxPage.isAgentReportOptionDisplayed(AgentReportOption.PERFORMANCE)).toBe(true, "Performance option does not exist");
        expect(await maxPage.isAgentReportOptionDisplayed(AgentReportOption.PRODUCTIVITY)).toBe(true, "Productivity option does not exist");
        expect(await maxPage.isAgentReportOptionDisplayed(AgentReportOption.ASSIGN_SKILLS)).toBe(true, "Assign skills option does not exist");

        // VP: There is no star to indicate favorite selection listed by one of these options. 
        expect(await maxPage.isOptionFavoriteIconDisplayed(AgentReportOption.PERFORMANCE, TestRunInfo.shortTimeout)).toBe(false, "Performance Favorite icon does not exist");
        expect(await maxPage.isOptionFavoriteIconDisplayed(AgentReportOption.PRODUCTIVITY, TestRunInfo.shortTimeout)).toBe(false, "Productivity Favorite icon not exist");
        expect(await maxPage.isOptionFavoriteIconDisplayed(AgentReportOption.ASSIGN_SKILLS, TestRunInfo.shortTimeout)).toBe(false, "Assign skills Favorite icon not exist");

        // VP: There is a > carat next to each for drill down access.
        expect(await maxPage.isOptionDrillIconDisplayed(AgentReportOption.PERFORMANCE)).toBe(true, "Performance Favorite icon does not exist");
        expect(await maxPage.isOptionDrillIconDisplayed(AgentReportOption.PRODUCTIVITY)).toBe(true, "Productivity Favorite icon not exist");
        expect(await maxPage.isOptionDrillIconDisplayed(AgentReportOption.ASSIGN_SKILLS)).toBe(true, "Assign skills Favorite icon not exist");

        // 6. Click Productivity (##%) panel right carat >
        await maxPage.clickDrillIconAgentReportOption(AgentReportOption.PRODUCTIVITY);

        // VP: Productivity report slides open left
        agentReportHeader = await maxPage.getAgentReportHeader(AgentReportOption.PRODUCTIVITY);
        expect(agentReportHeader).toContain('Productivity', "Productivity report doesn't slide open left");

        // 7. Verify Productivity report refreshes after 15 minutes
        await Logger.write(FunctionType.UI, `Verifying Productivity report refreshes after 15 minutes`);
        await basePage.waitInSecond(920);

        // VP: Productivity report updates data after 15 minutes instead of on the quarter hour.
        expect(await maxPage.isAgentReportHeaderChanged(agentReportHeader)).toBe(true, "Productivity report doesn't update data after 15 minutes instead of on the quarter hour");

        // Logout Central Page
        await maxPage.closePopover();
        centralPage = await maxPage.logOut();
        await centralPage.logOut();
    }, 1100000);

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // 1. Login Central Page
            loginPage = LoginPage.getInstance();
            centralPage = await loginPage.loginInContact(obPhoneAgent);

            // 2. Launch MAX
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