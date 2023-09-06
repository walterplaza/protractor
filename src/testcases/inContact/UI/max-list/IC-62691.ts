
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

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 180351
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe('MAX suite - IC-62691', function () {

    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let reportHeaderWhiteColor: string = '#ffffff';
    let favoriteWhiteColor: string = '#f1f1f2';
    let reportHeaderBlackColor: string = '#1c639c';
    let agentReportBGColor: string;
    let agentReportBGColorHovered: string;

    // Declare Page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62691 - MAX > Agent Reports > Agent Reports panel layout - Performance ui`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62691 - MAX Agent Reports Agent Reports panel layout Performance ui', async () => {

        // 2. Launch MAX
        await obPhoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);

        // 3. Go to "Activity Bar"
        // VP: Activity bar exists (gray bar) above control buttons along the bottom. 
        expect(await maxPage.isAgentReportsButtonDisplayed()).toBe(true, "Agent report button does not exist");

        // VP: Verify in activity bar is a button that reads "Agent Reports"
        expect(await maxPage.getAgentReportText()).toContain('Agent Reports', "Button name is not Performance (#%)");

        // 4. Hover over the "Agent Reports" area
        agentReportBGColor = await maxPage.getAgentReportBackGroundColor();
        await maxPage.hoverAgentReportButton();

        // VP: Button changes color (darker)
        agentReportBGColorHovered = await maxPage.getAgentReportBackGroundColor();
        expect(agentReportBGColor == agentReportBGColorHovered).toBe(false, "Agent report button does not exist");

        // 5. Click Agent Reports button
        await maxPage.openAgentReports();

        // VP: Agent Reports popover opens
        expect(await maxPage.isReportAgentPopOverDisplayed()).toBe(true, "Agent report button does not exist");

        // VP: Header is dark gray with white letters
        expect(await maxPage.getAgentReportHeaderBGColor()).toContain(reportHeaderBlackColor, "Agent report button does not exist");
        expect(await maxPage.getAgentReportHeaderColor()).toContain(reportHeaderWhiteColor, "Agent report button does not exist");

        // VP: Three panel options displayed: Performance, Productivity, and Assigned Skills.
        expect(await maxPage.isAgentReportOptionDisplayed(AgentReportOption.PERFORMANCE)).toBe(true, "Performance option does not exist");
        expect(await maxPage.isAgentReportOptionDisplayed(AgentReportOption.PRODUCTIVITY)).toBe(true, "Productivity option does not exist");
        expect(await maxPage.isAgentReportOptionDisplayed(AgentReportOption.ASSIGN_SKILLS)).toBe(true, "Assign skills option does not exist");

        // VP: There is no star to indicate favorite selection listed by one of these options. 
        expect(await maxPage.isOptionFavoriteIconDisplayed(AgentReportOption.PERFORMANCE, 5)).toBe(false, "Performance Favorite icon does not exist");
        expect(await maxPage.isOptionFavoriteIconDisplayed(AgentReportOption.PRODUCTIVITY, 5)).toBe(false, "Productivity Favorite icon not exist");
        expect(await maxPage.isOptionFavoriteIconDisplayed(AgentReportOption.ASSIGN_SKILLS, 5)).toBe(false, "Assign skills Favorite icon not exist");

        // VP: There is a > carat next to each for drill down access.
        expect(await maxPage.isOptionDrillIconDisplayed(AgentReportOption.PERFORMANCE)).toBe(true, "Performance Favorite icon does not exist");
        expect(await maxPage.isOptionDrillIconDisplayed(AgentReportOption.PRODUCTIVITY)).toBe(true, "Productivity Favorite icon not exist");
        expect(await maxPage.isOptionDrillIconDisplayed(AgentReportOption.ASSIGN_SKILLS)).toBe(true, "Assign skills Favorite icon not exist");

        // 6. Click on > Carat of "Performance" panel
        await maxPage.clickDrillIconAgentReportOption(AgentReportOption.PERFORMANCE);

        // VP: Verify it has the following info: 
        // VP: Back Button (<)
        expect(await maxPage.isBackButtonReportOptionDisplayed(AgentReportOption.PERFORMANCE)).toBe(true, "Back button does not display in Performance");

        // VP: Header: Performance (#%)
        expect(await maxPage.getAgentReportHeader(AgentReportOption.PERFORMANCE)).toContain('Performance', "Header title is not Performance (#%)");

        // VP: Favorite button ( the star icon)
        expect(await maxPage.isFavoriteIconOptionDisplayed(AgentReportOption.PERFORMANCE)).toBe(true, "Performance Favorite icon not exist");

        // VP: Canned Date Range section, where it has the following buttons: Today button, Yesterday button, Last 7 Days button
        expect(await maxPage.isPerformanceDateRangeDisplayed(TimeRangeOption.TODAY)).toBe(true, "Today button does not display in Performance");
        expect(await maxPage.isPerformanceDateRangeDisplayed(TimeRangeOption.YESTERDAY)).toBe(true, "Yester button does not display in Performance");
        expect(await maxPage.isPerformanceDateRangeDisplayed(TimeRangeOption.LAST_7_DAYS)).toBe(true, "Last 7 Days button does not display in Performance");

        // VP: A table, where it has information about: Inbound, Outbound and Overall performances. (See the picture attached, you can see the same picture in your agent.)
        expect(await maxPage.isPerformanceTableDisplayed()).toBe(true, "Performance table does not exist");
        expect(await maxPage.isPerformanceTableHeaderDisplayed('Inbound')).toBe(true, "Inbound header does not exist");
        expect(await maxPage.isPerformanceTableHeaderDisplayed('Outbound')).toBe(true, "Outbound header does not exist");
        expect(await maxPage.isPerformanceTableHeaderDisplayed('Overall')).toBe(true, "Overall header does not exist");

        // 7. Click on "Favorite" button ( the star icon)
        await maxPage.setFavoriteIconMode(AgentReportOption.PERFORMANCE, 'on');

        // VP: Verify the "Favorite" button changes color (white) and 
        expect(await maxPage.getAgentReportFavoriteIconColor()).toBe(favoriteWhiteColor, `The "Favorite" button doesn't change color (white)`);

        // 8. Go to "Activity Bar" and Click on "Performance #%"
        await maxPage.closePopover();

        // VP: the "Agent Reports" in "Activity Bar" has been changed to "Performance: #%"
        expect(await maxPage.getAgentReportText()).toContain('Performance:', "Button name is not Performance (#%)");

        // VP: Verify the Popover closes
        expect(await maxPage.isReportAgentPopOverDisplayed(5)).toBe(false, "Agent report pop over does not close");

        // 9. Hover over the "Performance #%" area
        await maxPage.hoverAgentReportButton();

        // VP: Verify a tool tip is displayed. This tool tip correspond to the button selected in Performance (Today, Yesterday or  Last 7 Days)
        expect(await maxPage.getAgentReportTooltip()).toBe(TimeRangeOption.TODAY, "Button tooltip is not Today");

        // Logout Central Page
        centralPage = await maxPage.logOut();
        await centralPage.logOut();
    });

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
            await maxPage.setFavoriteIconMode(AgentReportOption.PERFORMANCE, 'off');
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