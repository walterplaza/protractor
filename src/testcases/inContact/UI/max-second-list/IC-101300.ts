
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
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
 * TC ID: 180356   
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe('MAX suite - IC-101300', function () {

    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let reportHeaderWhiteColor: string = '#ffffff';
    let favoriteWhiteColor: string = '#f1f1f2';
    let reportHeaderBlackColor: string = '#1c639c';

    // Declare Page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101300 - MAX > Agent Reports > Agent Reports panel layout - Productivity ui`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-101300 - MAX Agent Reports Agent Reports panel layout - Productivity ui', async () => {

        // 2. Launch MAX
        await obPhoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);

        // 3. Go to "Activity Bar"
        // VP: Activity bar exists (gray bar) above control buttons along the bottom. 
        expect(await maxPage.isAgentReportsButtonDisplayed()).toBe(true, "Activity bar doesn't exist (gray bar) above control buttons along the bottom");

        // VP: Verify in activity bar is a button that reads "Agent Reports"
        expect(await maxPage.getAgentReportText()).toContain('Agent Reports', `In activity bar there isn't a button "Agent Reports"`);

        // 4. Hover over the "Agent Reports" 
        await maxPage.hoverAgentReportButton();

        // VP: Tool tip displays name like "Agent Reports"
        expect(await maxPage.getAgentReportTooltip()).toBe("Agent Reports", `Tool tip doesn't displays name like 'Agent Reports'`);

        // 5. Click on "Agent Reports" 
        await maxPage.openAgentReports();

        // VP: Agent Reports popover opens
        expect(await maxPage.isReportAgentPopOverDisplayed()).toBe(true, "Agent Reports popover doesn't open");

        // VP: Header is dark gray with white letters
        expect(await maxPage.getAgentReportHeaderBGColor()).toContain(reportHeaderBlackColor, " Background Header isn't dark gray");
        expect(await maxPage.getAgentReportHeaderColor()).toContain(reportHeaderWhiteColor, "Header Letters aren't white");

        // VP: Three panel options displayed: Performance, Productivity, and Assigned Skills.
        expect(await maxPage.isAgentReportOptionDisplayed(AgentReportOption.PERFORMANCE)).toBe(true, "Performance option does not exist");
        expect(await maxPage.isAgentReportOptionDisplayed(AgentReportOption.PRODUCTIVITY)).toBe(true, "Productivity option does not exist");
        expect(await maxPage.isAgentReportOptionDisplayed(AgentReportOption.ASSIGN_SKILLS)).toBe(true, "Assign skills option does not exist");

        // VP: There is no star to indicate favorite selection listed by one of these options. 
        expect(await maxPage.isOptionFavoriteIconDisplayed(AgentReportOption.PERFORMANCE, TestRunInfo.shortTimeout)).toBe(false, "Performance Favorite icon does not exist");
        expect(await maxPage.isOptionFavoriteIconDisplayed(AgentReportOption.PRODUCTIVITY, TestRunInfo.shortTimeout)).toBe(false, "Productivity Favorite icon not exist");
        expect(await maxPage.isOptionFavoriteIconDisplayed(AgentReportOption.ASSIGN_SKILLS, TestRunInfo.shortTimeout)).toBe(false, "Assign skills Favorite icon not exist");

        // VP: There is a > carat next to each for drill down access.
        expect(await maxPage.isOptionDrillIconDisplayed(AgentReportOption.PERFORMANCE)).toBe(true, "There isn't a '>' carat next to each for drill down access");
        expect(await maxPage.isOptionDrillIconDisplayed(AgentReportOption.PRODUCTIVITY)).toBe(true, "There isn't a '>' carat next to each for drill down access");
        expect(await maxPage.isOptionDrillIconDisplayed(AgentReportOption.ASSIGN_SKILLS)).toBe(true, "There isn't a '>' carat next to each for drill down access");

        // 6. Click on > Carat of "Productivity" panel
        await maxPage.clickDrillIconAgentReportOption(AgentReportOption.PRODUCTIVITY);

        // VP: Verify it has the following info: 
        // VP: Back Button (<)
        expect(await maxPage.isBackButtonReportOptionDisplayed(AgentReportOption.PRODUCTIVITY)).toBe(true, "Back button does not display in Productivity");

        // VP: Header: Productivity (#%)
        expect(await maxPage.getAgentReportHeader(AgentReportOption.PRODUCTIVITY)).toContain('Productivity', "Header title is not Productivity (#%)");

        // VP: Canned Date Range section, where it has the following buttons: Today button, Yesterday button, Last 7 Days button
        expect(await maxPage.isProductivityDateRangeDisplayed(TimeRangeOption.TODAY)).toBe(true, "Today button does not display in Productivity");
        expect(await maxPage.isProductivityDateRangeDisplayed(TimeRangeOption.YESTERDAY)).toBe(true, "Yester button does not display in Productivity");
        expect(await maxPage.isProductivityDateRangeDisplayed(TimeRangeOption.LAST_7_DAYS)).toBe(true, "Last 7 Days button does not display in Productivity");

        // VP: A bar graphic, where it has information about: Available, Working and Unavailable productivity(See the picture attached, you can see the same picture in your agent.)
        expect(await maxPage.isProductivityTableHeaderDisplayed(MaxState.AVAILABLE.toLowerCase())).toBe(true, "Available header does not exist");
        expect(await maxPage.isProductivityTableHeaderDisplayed(MaxState.WORKING.toLowerCase())).toBe(true, "Working header does not exist");
        expect(await maxPage.isProductivityTableHeaderDisplayed(MaxState.UNAVAILABLE.toLowerCase())).toBe(true, "Unavailable header does not exist");

        // 7. Click on "Favorite" button ( the star icon)
        await maxPage.setFavoriteIconMode(AgentReportOption.PRODUCTIVITY, State.ON.toLowerCase());

        // VP: Verify the "Favorite" button changes color (white)
        expect(await maxPage.getAgentReportFavoriteIconColor()).toBe(favoriteWhiteColor, `The "Favorite" button doesn't change color (white)`);

        // VP: The "Agent Reports" in "Activity Bar" has been changed to "Productivity: #%"
        expect(await maxPage.getAgentReportText()).toContain("Productivity", `The "Agent Reports" in "Activity Bar" has been changed to "Productivity: #%"`);

        // 8. Go to "Activity Bar" and Click on "Productivity #%"
        await maxPage.closePopover();

        // VP: Verify the Popover closes
        expect(await maxPage.isReportAgentPopOverDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Agent report pop over does not close");

        // 9. Hover over the "Productivity #%" area
        await maxPage.hoverAgentReportButton();

        // VP: Verify a tool tip is displayed. This tool tip correspond to the button selected in Productivity (Today, Yesterday or  Last 7 Days)
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