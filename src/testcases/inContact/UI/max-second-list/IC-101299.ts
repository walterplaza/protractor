
import { Agent } from "@data-objects/general/agent";
import { State } from "@data-objects/general/general";
import { AgentReportOption, ContactLabel } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 180362
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe('MAX suite - IC-101299', function () {

    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let reportHeaderWhiteColor: string = '#ffffff';
    let favoriteWhiteColor: string = '#f1f1f2';
    let reportHeaderBlackColor: string = '#1c639c';
    let homeWindowHandle: string;
    let maxWindowHandle: string;

    // Declare Page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let pageBase = new PageBase();

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101299 - MAX > Agent Reports > Agent Reports panel layout - Assigned Skills ui`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE)
        await TestCondition.setUpAndAssignSkill(obPhoneAgent, SkillType.IB_EMAIL);
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneAgent);
        homeWindowHandle = await pageBase.getCurrentWindowHandle();
    }, TestRunInfo.conditionTimeout);

    it('IC-101299 - MAX Agent Reports Agent Reports panel layout - Assigned Skills ui', async () => {

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
        expect(await maxPage.getAgentReportHeaderBGColor()).toContain(reportHeaderBlackColor, "Background Header isn't dark gray");
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

        // 6. Click on > Carat of "Assigned SKills" panel
        await maxPage.clickDrillIconAgentReportOption(AgentReportOption.ASSIGN_SKILLS);

        // VP: Verify it has the following info: 
        // VP: Back Button (<)
        expect(await maxPage.isBackButtonReportOptionDisplayed(AgentReportOption.ASSIGN_SKILLS)).toBe(true, "Back button does not display in Assigned Skills");

        // VP: Header: Assigned Skills (#%)
        expect(await maxPage.getAgentReportHeader(AgentReportOption.ASSIGN_SKILLS)).toContain('Assigned Skills', "Header title is not Assigned Skills");

        // VP: List with different skills assigned (Format: Icon of Media Type + Name of Skill)
        expect(await maxPage.isIcoAssignedSkillDetailedDisplayed(SkillCore.getSkillName(SkillType.OB_PHONE), ContactLabel.OUTBOUND_PHONE)).toBe(true, "Detailed Assigned Skill Outbound Phone is not displayed correctly");
        expect(await maxPage.isIcoAssignedSkillDetailedDisplayed(SkillCore.getSkillName(SkillType.IB_EMAIL), ContactLabel.CHAT)).toBe(true, "Detailed Assigned Skill Inbound Chat is not displayed correctly");

        // 7. Click on "Favorite" button ( the star icon)
        await maxPage.setFavoriteIconMode(AgentReportOption.ASSIGN_SKILLS, State.ON.toLowerCase());

        // VP: Verify the "Favorite" button changes color (white)
        expect(await maxPage.getAgentReportFavoriteIconColor()).toBe(favoriteWhiteColor, `The "Favorite" button doesn't change color (white)`);

        // VP: The "Agent Reports" in "Activity Bar" has been changed to "Productivity: #%"
        expect(await maxPage.getAgentReportText()).toContain("Assigned Skills", `The "Agent Reports" in "Activity Bar" has not been changed to "Assigned Skills: #%"`);

        // 8. Go to "Activity Bar" and Click on "Assigned Skills #%"
        await maxPage.closePopover();

        // VP: Verify the Popover closes
        expect(await maxPage.isReportAgentPopOverDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Agent report pop over does not close");

        // 9. Hover over the "Assigned Skills #%" area
        await maxPage.hoverAgentReportButton();

        // VP: Verify a tool tip is displayed. This tool tip correspond to the button selected
        expect(await maxPage.getAgentReportTooltip()).toContain('Assigned Skills', "Button tooltip is not Today");

        maxWindowHandle = await pageBase.getCurrentWindowHandle();
        await pageBase.switchWindowByHandle(homeWindowHandle);

        //10.Go to Central> Admin> Users> Users and open the user used in agent.
        let usersPage = await centralPage.gotoUsersPage()
        let usersDetailsPage = await usersPage.selectUser(obPhoneAgent.agentID);

        //11. Go to Skill Tab and remove some skills.Save the changes
        await usersDetailsPage.selectUserDetailsMenu("UserSkills");
        await usersDetailsPage.removeASkillFromSelectedUser(SkillCore.getSkillName(SkillType.IB_EMAIL));

        //12. Go MAX agent and review the "Assigned Skills"
        await pageBase.switchWindowByHandle(maxWindowHandle);
        await maxPage.openAgentReports();

        //VP: Verify the skills removed in step 11 are not displayed and the "Assigned Skills" has been updated.
        await pageBase.waitInSecond(5) //Wait here due to MAX need a small time to update UI
        expect(await maxPage.isIcoAssignedSkillDetailedDisplayed(SkillCore.getSkillName(SkillType.IB_EMAIL), ContactLabel.CHAT, TestRunInfo.shortTimeout)).toBe(false, "Detailed Assigned Skill Inbound Chat is still displayed");

        //13. Repeat the step 11 and 12 but now add skills. 
        await pageBase.switchWindowByHandle(homeWindowHandle);
        await usersDetailsPage.assignASkillToSelectedUser(SkillCore.getSkillName(SkillType.IB_EMAIL));

        //14. Verify the skills added in step 11 are displayed and the "Assigned Skills" has been updated.
        await pageBase.switchWindowByHandle(maxWindowHandle);
        await pageBase.waitInSecond(5) //Wait here due to MAX need a small time to update UI
        expect(await maxPage.isIcoAssignedSkillDetailedDisplayed(SkillCore.getSkillName(SkillType.IB_EMAIL), ContactLabel.CHAT)).toBe(true, "Detailed Assigned Skill Inbound Chat is not displayed");

        // Set the Agent Report toolbar back to default
        await maxPage.setFavoriteIconMode(AgentReportOption.ASSIGN_SKILLS, State.OFF.toLowerCase());

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
        } catch (err) { }
        finally {
            try {
                // Logout Central Page
                await maxPage.closePopover();
                centralPage = await maxPage.logOut();
                await centralPage.logOut();

                await TestCondition.setUpAndRemoveSkill(obPhoneAgent, SkillType.IB_EMAIL);
                await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});