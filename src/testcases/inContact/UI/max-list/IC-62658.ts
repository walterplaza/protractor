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
 * Suite: MAX Suite
 * TC ID: 301913
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe("MAX suite - IC-62658", function () {
    // Set long time out for end 100 work items contact
    TestRunInfo.testTimeout = 2000000;
    TestBase.scheduleTestBase();
    let multiSkillsAgent: Agent;
    let queueCount: number;
    let numberOfChat: number = 10;
    let numberOfWorkItem: number = 100;
    let timeOutEndContact: number = 6.5;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62658 - MAX > UI > Main Panel > Waiting Panel (bar) > 1 Chanel displayed as per assigned to agent - counter display`);
        multiSkillsAgent = await TestCondition.setUpAgent(SkillType.IB_Phone);
        await TestCondition.setUpAndAssignSkill(multiSkillsAgent, SkillType.CHAT);
        await TestCondition.setUpAndAssignSkill(multiSkillsAgent, SkillType.IB_EMAIL);
        await TestCondition.setUpAndAssignSkill(multiSkillsAgent, SkillType.VOICEMAIL);
        await TestCondition.setUpAndAssignSkill(multiSkillsAgent, SkillType.WORK_ITEM);
    }, TestRunInfo.testTimeout); // Handle for end all contact

    it('IC-62658 - MAX UI Main Panel Waiting Panel bar 1 Chanel displayed as per assigned to agent counter display', async () => {

        // 1. Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(multiSkillsAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(multiSkillsAgent.phoneNumber);

        // 3. User has 1 @skill = IB Phone skill assigned
        // VP: Agent has skill assigned
        expect(await TestHelpers.isSkillNameAssignedToAgent(multiSkillsAgent, SkillType.IB_Phone)).toBe(true, "Agent hasn't inbound phone skill assigned");
        expect(await TestHelpers.isSkillNameAssignedToAgent(multiSkillsAgent, SkillType.CHAT)).toBe(true, "Agent hasn't chat skill assigned");
        expect(await TestHelpers.isSkillNameAssignedToAgent(multiSkillsAgent, SkillType.IB_EMAIL)).toBe(true, "Agent hasn't inbound email item skill assigned");
        expect(await TestHelpers.isSkillNameAssignedToAgent(multiSkillsAgent, SkillType.VOICEMAIL)).toBe(true, "Agent hasn't Voicemail skill assigned");
        expect(await TestHelpers.isSkillNameAssignedToAgent(multiSkillsAgent, SkillType.WORK_ITEM)).toBe(true, "Agent hasn't work item skill assigned");

        // 4. Observe waiting panel for icon 
        // VP: User's agent waiting panel displays the appropriate icon for the skill's media
        expect(await maxPage.isIcoSkillDisplayed(ContactLabel.INBOUND_PHONE)).toBe(true, "Call skill icon does not display in waiting panel");
        expect(await maxPage.isIcoSkillDisplayed(ContactLabel.CHAT)).toBe(true, "Chat skill icon does not display in waiting panel");
        expect(await maxPage.isIcoSkillDisplayed(ContactLabel.INBOUND_EMAIL)).toBe(true, "IB Email skill icon does not display in waiting panel");
        expect(await maxPage.isIcoSkillDisplayed(ContactLabel.VOICE_MAIL)).toBe(true, "Voicemail skill icon does not display in waiting panel");
        expect(await maxPage.isIcoSkillDisplayed(ContactLabel.WORKITEM)).toBe(true, "Work Item skill icon does not display in waiting panel");

        // 5. Observe waiting panel for queue count
        queueCount = await maxPage.getSkillQueue(ContactLabel.INBOUND_PHONE);

        // VP: Queue count is displayed below of icon
        expect(await maxPage.isQueueCountDisplayedBelowIcon(ContactLabel.INBOUND_PHONE)).toBe(true, "Queue count is not displayed below of icon");
        expect(await maxPage.checkQueueCountFormat(queueCount)).toBe(true, "Number format is not 0 = 0, n = n, nn = nn, nnn = 99+");

        // Observe waiting panel for queue count
        await TestHelpers.startMultiChatContact(multiSkillsAgent, numberOfChat);
        await maxPage.waitForQueueValue(ContactLabel.CHAT, queueCount + numberOfChat);
        queueCount = await maxPage.getSkillQueue(ContactLabel.CHAT);

        // VP: Queue count is displayed below of icon
        expect(await maxPage.isQueueCountDisplayedBelowIcon(ContactLabel.CHAT)).toBe(true, "Queue count is not displayed below of icon");
        expect(await maxPage.checkQueueCountFormat(queueCount)).toBe(true, "Number format is not 0 = 0, n = n, nn = nn, nnn = 99+");

        // Observe waiting panel for queue count
        queueCount = await maxPage.getSkillQueue(ContactLabel.INBOUND_EMAIL);

        // VP: Queue count is displayed below of icon
        expect(await maxPage.isQueueCountDisplayedBelowIcon(ContactLabel.INBOUND_EMAIL)).toBe(true, "Queue count is not displayed below of icon");
        expect(await maxPage.checkQueueCountFormat(queueCount)).toBe(true, "Number format is not 0 = 0, n = n, nn = nn, nnn = 99+");

        // Observe waiting panel for queue count
        queueCount = await maxPage.getSkillQueue(ContactLabel.VOICE_MAIL);

        // VP: Queue count is displayed below of icon
        expect(await maxPage.isQueueCountDisplayedBelowIcon(ContactLabel.VOICE_MAIL)).toBe(true, "Queue count is not displayed below of icon");
        expect(await maxPage.checkQueueCountFormat(queueCount)).toBe(true, "Number format is not 0 = 0, n = n, nn = nn, nnn = 99+");

        // Observe waiting panel for queue count
        await TestHelpers.startMultiWorkItem(multiSkillsAgent, numberOfWorkItem);
        await maxPage.waitForQueueValue(ContactLabel.WORKITEM, queueCount + numberOfWorkItem);
        queueCount = await maxPage.getSkillQueue(ContactLabel.WORKITEM);

        // VP: Queue count is displayed below of icon
        expect(await maxPage.isQueueCountDisplayedBelowIcon(ContactLabel.WORKITEM)).toBe(true, "Queue count is not displayed below of icon");
        expect(await maxPage.checkQueueCountFormat(queueCount)).toBe(true, "Number format is not 0 = 0, n = n, nn = nn, nnn = 99+");
    });

    afterEach(async () => {
        try {
            // Logout
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
                await TestHelpers.endAllContacts(multiSkillsAgent, timeOutEndContact * queueCount);
                await TestCondition.setUpAndRemoveSkill(multiSkillsAgent, SkillType.CHAT);
                await TestCondition.setUpAndRemoveSkill(multiSkillsAgent, SkillType.IB_EMAIL);
                await TestCondition.setUpAndRemoveSkill(multiSkillsAgent, SkillType.VOICEMAIL);
                await TestCondition.setUpAndRemoveSkill(multiSkillsAgent, SkillType.WORK_ITEM);
                await TestCondition.setAgentSkillsToDefault(multiSkillsAgent, SkillType.IB_Phone);
            }
            catch (err) { }
        }
    }, TestRunInfo.testTimeout); // Handle for end all contact
});