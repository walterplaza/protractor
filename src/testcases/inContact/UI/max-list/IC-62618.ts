import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 398187
 * Tested browser: -
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('MAX suite - IC-62618', function () {
    TestBase.scheduleTestBase();
    let agent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62618 - [MAX] Add contact icons where they are missing`);
        agent = await TestCondition.setUpAgent(SkillType.CHAT);
        await TestCondition.setUpAndAssignSkill(agent, SkillType.IB_Phone);

        // Login central page
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(agent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62618 - Add contact icons where they are missing', async () => {

        // 1. MAX launched and Available.
        maxPage = await centralPage.launchMAX(agent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // 2. Complete connections to MAX At least 1 digital
        await TestHelpers.startChatContact(agent);
        await maxPage.waitForNewContactPopUp();

        // 3. Viewing icons for connections...  Contact icons should be displayed:
        // On the Accept/Reject dialog
        expect(await maxPage.isCustomerContactCardDisplayed()).toBe(true, "Contact icons should be displayed on the Accept/Reject dialog");
        // Accept chat contact
        maxChatPage = await maxPage.acceptNewChatContact();
        await maxChatPage.waitForChatWorkspace();

        // VP: In Glance contact items shows
        expect(await maxChatPage.isContactItemInGlanceDisplayed(ContactName.CHAT, TestRunInfo.shortTimeout)).toBe(true, "Chat contact icons is not displayed in max glance");

        // VP: On Inbox items for all media types shows
        expect(await maxChatPage.isContactIconSummaryDisplayed(ContactName.CHAT, TestRunInfo.shortTimeout)).toBe(true, "Contact icons is not displayed on inbox items for all media types ")

        // VP: Contact icon within the contact UI for all media types shows
        expect(await maxChatPage.isContactIconInfoDisplayed(ContactName.CHAT, TestRunInfo.shortTimeout)).toBe(true, "Contact icons is not displayed within the contact UI for all media types");

        maxPage = await maxChatPage.endChatContact();

        // Start non digital skill
        await TestHelpers.startInboundCall(agent);
        maxCall = await maxPage.waitForCallWorkspace();

        // VP: Contact icon in glance contact items shows
        expect(await maxCall.isContactItemInGlanceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(true, "Phone contact icons is not displayed in max glance");

        // VP: Contact icon within the contact UI for all media types shows
        expect(await maxCall.isContactIconInfoDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(true, "Contact icons is not displayed within the contact UI for all media types");

        // End Call
        maxPage = await maxCall.endCallContact();

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(agent, SkillType.IB_Phone);
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.CHAT);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});
