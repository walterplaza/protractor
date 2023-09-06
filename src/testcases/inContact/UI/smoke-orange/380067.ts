import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import { OutBoundCall } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import CreateSkillPage from "@page-objects/inContact/central/routing/skills/create-skill-page";
import SkillsDetailPage from "@page-objects/inContact/central/routing/skills/skills-detail-page";
import SkillsListPage from "@page-objects/inContact/central/routing/skills/skills-list-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: SMOKE_Automated_Orange_Full, SMOKE_Automated_Blue_Full
 * TC ID: 380067
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Orange_OF - 380067", function () {
    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let outBoundCall: OutBoundCall;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let skillsListPage: SkillsListPage;
    let createSkillPage: CreateSkillPage;
    let skillsDetailPage: SkillsDetailPage

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `380067 - inContact Outbound > Personal Connection > Skill creation > Success`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    it('380067 - inContact Outbound Personal Connection Skill creation Success', async () => {

        // 2. Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneAgent);

        // 3. Go to: Routing> Skills
        skillsListPage = await centralPage.gotoSkillsListPage();

        // VP:  Skills page should be displayed
        expect(await skillsListPage.isDisplayed()).toBe(true, "Skills List page is not displayed");

        // 4. Click Create New> Single Skill
        createSkillPage = await skillsListPage.createNewSkill();

        // VP: Skill creation page should be displayed
        expect(await createSkillPage.isDisplayed()).toBe(true, "Create Skill page is not displayed");

        // 5. Fill the next fields
        outBoundCall = new OutBoundCall();
        outBoundCall.initData();
        await createSkillPage.fillCreateSkillFields(outBoundCall);

        // VP: All fields are filled up
        expect(await createSkillPage.isMediaTypeSelected(outBoundCall.mediaType)).toBe(true, "Media Type isn't selected correctly");
        expect(await createSkillPage.getSkillName()).toBe(outBoundCall.skillName, "Skill Name doesn't match");
        expect(await createSkillPage.isDirectionSelected(outBoundCall.direction)).toBe(true, "Direction isn't selected correctly");
        expect(await createSkillPage.isOutboundStrategySelected(outBoundCall.obStrategy)).toBe(true, "Outbound Strategy isn't selected correctly");
        expect(await createSkillPage.isCampaignSelected(outBoundCall.campaign)).toBe(true, "Campaign isn't selected correctly");

        // 6. Click Create button
        skillsDetailPage = await createSkillPage.clickCreateButton();

        //VP: The Personal Connection skill should be created successfully
        expect(await skillsDetailPage.isDisplayed()).toBe(true, "Skill Detail page is not displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Log out
            await skillsDetailPage.logOut();
        }
        catch (error) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.OB_PHONE);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
})