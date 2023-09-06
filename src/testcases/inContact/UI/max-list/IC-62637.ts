import { Agent } from "@data-objects/general/agent";
import { ContactLabel } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
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
 * TC ID: 383665
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC11
 */

describe('MAX suite - IC-62637', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;

    // Declare page object 
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62637 - [MAX] Omnichannel - Icons correctly displayed on Assigned Skills pane`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
        await TestCondition.setUpAndAssignSkill(chatAgent, SkillType.IB_Phone);
        await TestCondition.setUpAndAssignSkill(chatAgent, SkillType.OB_PHONE);
        await TestCondition.setUpAndAssignSkill(chatAgent, SkillType.IB_EMAIL);
        await TestCondition.setUpAndAssignSkill(chatAgent, SkillType.VOICEMAIL);
        await TestCondition.setUpAndAssignSkill(chatAgent, SkillType.OB_EMAIL);
        await TestCondition.setUpAndAssignSkill(chatAgent, SkillType.WORK_ITEM);
    }, TestRunInfo.conditionTimeout);

    it('IC-62637 - MAX Omnichannel Icons correctly displayed on Assigned Skills pane', async () => {

        // 1. inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 3. Open Agent Reports
        await maxPage.openAgentReports();

        // 4. Open master report
        await maxPage.openAssignedSkillsMaster();

        // VP: Check icons of Assigned Skills on master section are displayed correctly
        expect(await maxPage.isIcoAssignedSkillMasterDisplayed(ContactLabel.INBOUND_PHONE)).toBe(true, "Master Assigned Skill Inbound Phone is not displayed correctly");
        expect(await maxPage.isIcoAssignedSkillMasterDisplayed(ContactLabel.OUTBOUND_PHONE)).toBe(true, "Master Assigned Skill Outbound Phone is not displayed correctly");
        expect(await maxPage.isIcoAssignedSkillMasterDisplayed(ContactLabel.CHAT)).toBe(true, "Master Assigned Skill Inbound Chat is not displayed correctly");
        expect(await maxPage.isIcoAssignedSkillMasterDisplayed(ContactLabel.INBOUND_EMAIL)).toBe(true, "Master Assigned Skill Inbound Email is not displayed correctly");
        expect(await maxPage.isIcoAssignedSkillMasterDisplayed(ContactLabel.VOICE_MAIL)).toBe(true, "Master Assigned Skill Inbound Voicemail is not displayed correctly");
        expect(await maxPage.isIcoAssignedSkillMasterDisplayed(ContactLabel.WORKITEM)).toBe(true, "Master Assigned Skill Inbound Work Item is not displayed correctly");

        // 5. Click on detailed section
        await maxPage.openAssignedSkillsDetail();

        // VP: Check icons of Assigned Skills on detailed section are displayed correctly
        expect(await maxPage.isIcoAssignedSkillDetailedDisplayed(SkillCore.getSkillName(SkillType.OB_EMAIL), ContactLabel.OUTBOUND_EMAIL)).toBe(true, "Detailed Assigned Skill Outbound Email is not displayed correctly");
        expect(await maxPage.isIcoAssignedSkillDetailedDisplayed(SkillCore.getSkillName(SkillType.IB_EMAIL), ContactLabel.INBOUND_EMAIL)).toBe(true, "Detailed Assigned Skill Inbound Email is not displayed correctly");
        expect(await maxPage.isIcoAssignedSkillDetailedDisplayed(SkillCore.getSkillName(SkillType.OB_PHONE), ContactLabel.OUTBOUND_PHONE)).toBe(true, "Detailed Assigned Skill Outbound Phone is not displayed correctly");
        expect(await maxPage.isIcoAssignedSkillDetailedDisplayed(SkillCore.getSkillName(SkillType.IB_Phone), ContactLabel.INBOUND_PHONE)).toBe(true, "Detailed Assigned Skill Inbound Phone is not displayed correctly");
        expect(await maxPage.isIcoAssignedSkillDetailedDisplayed(SkillCore.getSkillName(SkillType.CHAT), ContactLabel.CHAT)).toBe(true, "Detailed Assigned Skill Inbound Chat is not displayed correctly");
        expect(await maxPage.isIcoAssignedSkillDetailedDisplayed(SkillCore.getSkillName(SkillType.VOICEMAIL), ContactLabel.VOICE_MAIL)).toBe(true, "Detailed Assigned Skill Inbound VoiceMail is not displayed correctly");
        expect(await maxPage.isIcoAssignedSkillDetailedDisplayed(SkillCore.getSkillName(SkillType.WORK_ITEM), ContactLabel.WORKITEM)).toBe(true, "Detailed Assigned Skill Inbound Work Item is not displayed correctly");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // 6. Clean up        
            await maxPage.closePopover();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(chatAgent, SkillType.WORK_ITEM);
                await TestCondition.setUpAndRemoveSkill(chatAgent, SkillType.OB_EMAIL);
                await TestCondition.setUpAndRemoveSkill(chatAgent, SkillType.VOICEMAIL);
                await TestCondition.setUpAndRemoveSkill(chatAgent, SkillType.IB_EMAIL);
                await TestCondition.setUpAndRemoveSkill(chatAgent, SkillType.OB_PHONE);
                await TestCondition.setUpAndRemoveSkill(chatAgent, SkillType.IB_Phone);
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



