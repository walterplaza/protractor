import { Agent } from "@data-objects/general/agent";
import { ContactLabel } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 301912
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11
 */

describe("MAX suite - IC-62659", function () {
    TestBase.scheduleTestBase();
    let multiSkillsAgent: Agent;
    let queueCount: number;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62659 - MAX > UI > Main Panel > Waiting Panel (bar) > 1 Chanel displayed as per assigned to agent - icon display.`);
        multiSkillsAgent = await TestCondition.setUpAgent(SkillType.IB_Phone);
        await TestCondition.setUpAndAssignSkill(multiSkillsAgent, SkillType.OB_PHONE);
        await TestCondition.setUpAndAssignSkill(multiSkillsAgent, SkillType.CHAT);
        await TestCondition.setUpAndAssignSkill(multiSkillsAgent, SkillType.WORK_ITEM);
        await TestCondition.setUpAndAssignSkill(multiSkillsAgent, SkillType.IB_EMAIL);
        await TestCondition.setUpAndAssignSkill(multiSkillsAgent, SkillType.VOICEMAIL);
    }, TestRunInfo.conditionTimeout);

    it('IC-62659 - MAX UI Main Panel Waiting Panel bar 1 Chanel displayed as per assigned to agent icon display', async () => {

        // 1. Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(multiSkillsAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(multiSkillsAgent.phoneNumber);

        // 3. User has 1 @skill assigned
        // VP: Agent has skill assigned
        expect(await TestHelpers.isSkillNameAssignedToAgent(multiSkillsAgent, SkillType.IB_Phone)).toBe(true, "Agent hasn't inbound phone skill assigned");
        expect(await TestHelpers.isSkillNameAssignedToAgent(multiSkillsAgent, SkillType.CHAT)).toBe(true, "Agent hasn't chat skill assigned");
        expect(await TestHelpers.isSkillNameAssignedToAgent(multiSkillsAgent, SkillType.WORK_ITEM)).toBe(true, "Agent hasn't work item skill assigned");
        expect(await TestHelpers.isSkillNameAssignedToAgent(multiSkillsAgent, SkillType.IB_EMAIL)).toBe(true, "Agent hasn't inbound email skill assigned");
        expect(await TestHelpers.isSkillNameAssignedToAgent(multiSkillsAgent, SkillType.VOICEMAIL)).toBe(true, "Agent hasn't voicemail skill assigned");

        // 4. Observe waiting panel for icon 
        // VP: User's agent waiting panel displays the appropriate icon for the skill's media
        expect(await maxPage.isIcoSkillDisplayed(ContactLabel.INBOUND_PHONE)).toBe(true, "Waiting panel is not displays icon for the inbound phone skill");
        expect(await maxPage.isIcoSkillDisplayed(ContactLabel.CHAT)).toBe(true, "Waiting panel is not displays icon for the chat skill");
        expect(await maxPage.isIcoSkillDisplayed(ContactLabel.WORKITEM)).toBe(true, "Waiting panel is not displays icon for the work item skill");
        expect(await maxPage.isIcoSkillDisplayed(ContactLabel.INBOUND_EMAIL)).toBe(true, "Waiting panel is not displays icon for the inbound email item skill");
        expect(await maxPage.isIcoSkillDisplayed(ContactLabel.VOICE_MAIL)).toBe(true, "Waiting panel is not displays icon for the Voicemail skill");

        // 5. Observe waiting panel for queue count
        queueCount = await maxPage.getSkillQueue(ContactLabel.INBOUND_PHONE);

        // VP: Queue count is displayed next to (right) of icon
        expect(await maxPage.checkQueueCountFormat(queueCount)).toBe(true, "Inbound phone number format is not 0 = 0, n = n, nn = nn, nnn = 99+");
        expect(await maxPage.isQueueCountDisplayedBelowIcon(ContactLabel.INBOUND_PHONE, TestRunInfo.shortTimeout)).toBe(true, "Inbound phone queue count is not displayed below of icon");

        // Observe waiting panel for queue count
        queueCount = await maxPage.getSkillQueue(ContactLabel.CHAT);

        // VP: Queue count is displayed next to (right) of icon
        expect(await maxPage.checkQueueCountFormat(queueCount)).toBe(true, "Chat queue number format is not 0 = 0, n = n, nn = nn, nnn = 99+");
        expect(await maxPage.isQueueCountDisplayedBelowIcon(ContactLabel.CHAT, TestRunInfo.shortTimeout)).toBe(true, "Chat queue count is not displayed below of icon");

        // Observe waiting panel for queue count
        queueCount = await maxPage.getSkillQueue(ContactLabel.WORKITEM);

        // VP: Queue count is displayed next to (right) of icon
        expect(await maxPage.checkQueueCountFormat(queueCount)).toBe(true, "Work item number format is not 0 = 0, n = n, nn = nn, nnn = 99+");
        expect(await maxPage.isQueueCountDisplayedBelowIcon(ContactLabel.WORKITEM, TestRunInfo.shortTimeout)).toBe(true, "Work item queue count is not displayed below of icon");

        // Observe waiting panel for queue count
        queueCount = await maxPage.getSkillQueue(ContactLabel.INBOUND_EMAIL);

        // VP: Queue count is displayed next to (right) of icon
        expect(await maxPage.checkQueueCountFormat(queueCount)).toBe(true, "Inbound email number format is not 0 = 0, n = n, nn = nn, nnn = 99+");
        expect(await maxPage.isQueueCountDisplayedBelowIcon(ContactLabel.INBOUND_EMAIL, TestRunInfo.shortTimeout)).toBe(true, "Inbound email queue count is not displayed below of icon");

        // Observe waiting panel for queue count
        queueCount = await maxPage.getSkillQueue(ContactLabel.VOICE_MAIL);

        // VP: Queue count is displayed next to (right) of icon
        expect(await maxPage.checkQueueCountFormat(queueCount)).toBe(true, "Voicemail number format is not 0 = 0, n = n, nn = nn, nnn = 99+");
        expect(await maxPage.isQueueCountDisplayedBelowIcon(ContactLabel.VOICE_MAIL, TestRunInfo.shortTimeout)).toBe(true, "Voicemail queue count is not displayed below of icon");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Logout
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(multiSkillsAgent, SkillType.OB_PHONE);
                await TestCondition.setUpAndRemoveSkill(multiSkillsAgent, SkillType.CHAT);
                await TestCondition.setUpAndRemoveSkill(multiSkillsAgent, SkillType.WORK_ITEM);
                await TestCondition.setUpAndRemoveSkill(multiSkillsAgent, SkillType.IB_EMAIL);
                await TestCondition.setUpAndRemoveSkill(multiSkillsAgent, SkillType.VOICEMAIL);
                await TestCondition.setAgentSkillsToDefault(multiSkillsAgent, SkillType.IB_Phone);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});