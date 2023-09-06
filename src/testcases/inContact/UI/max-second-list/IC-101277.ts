import { Agent } from "@data-objects/general/agent";
import { Cluster } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 294339
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101277", function () {

    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let cluster: Cluster = TestRunInfo.cluster;
    let glanceWidthBeforeContact: number;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101277 - [MAX] [OB] [Phone] [Panel] [Resizing Panel] Verify that Panel Resizes when contact is routed to agent.`);
        // 1. Precondition: User has rights to add/remove skills to self
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-101277 - MAX OB Phone Panel Resizing Panel Verify that Panel Resizes when contact is routed to agent.', async () => {

        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(obPhoneAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);
        glanceWidthBeforeContact = await maxPage.getMaxGlanceSize();

        // 3. User has OB Phone skill assigned
        // VP: Agent has skill assigned

        // 4.  Initiate OB Phone contact
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.PHONE_CALL);
        maxCall = await maxPage.makeOutboundCall(cluster.outboundNumber, SkillType.OB_PHONE);
        await maxCall.waitForCallWorkspace(TestRunInfo.shortTimeout);

        // VP: Contact is iniated. "Connecting Agent Leg" dialog shows. Nail up the agent leg.
        expect(await maxCall.isCallWorkspaceDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Call workspace is not displayed");

        // 5. Panel Resizes when contact is routed to agent
        expect(await maxCall.getMaxWrapPanelSize()).toBeGreaterThan(glanceWidthBeforeContact, "Panel doesn't resize into interaction window space as before the contact routed and panels resized");

        // 6. End contact
        maxPage = await maxCall.endCallContact();

        // 7. Verify panel resizes into interaction window space as before the contact routed and panels resized.
        expect(await maxPage.getMaxGlanceSize()).toBe(glanceWidthBeforeContact, "Panel doesn't resize into interaction window space as before the contact routed and panels resized");

        // 8. Verify resizes happen automatically if multiple contacts are handled in succession
        // Multiple contacts 1
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.PHONE_CALL);
        await maxPage.makeOutboundCall(cluster.outboundNumber, SkillType.OB_PHONE);
        maxCall = await maxPage.waitForCallWorkspace();

        // VP: Panel Resizes when contact is routed to agent
        expect(await maxCall.getMaxWrapPanelSize()).toBeGreaterThan(glanceWidthBeforeContact, "Panel doesn't resize into interaction window space as before the contact routed and panels resized");

        await maxCall.endCallContact();

        // VP: Verify panel resizes into interaction window space as before the contact routed and panels resized.
        expect(await maxPage.getMaxGlanceSize()).toBe(glanceWidthBeforeContact, "Panel doesn't resize into interaction window space as before the contact routed and panels resized");

        // Multiple contacts 2
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.PHONE_CALL);
        await maxPage.makeOutboundCall(cluster.outboundNumber, SkillType.OB_PHONE);
        maxCall = await maxPage.waitForCallWorkspace();

        // VP: Panel Resizes when contact is routed to agent
        expect(await maxCall.getMaxWrapPanelSize()).toBeGreaterThan(glanceWidthBeforeContact, "Panel doesn't resize into interaction window space as before the contact routed and panels resized");

        await maxCall.endCallContact();

        // VP: Verify panel resizes into interaction window space as before the contact routed and panels resized.
        expect(await maxPage.getMaxGlanceSize()).toBe(glanceWidthBeforeContact, "Panel doesn't resize into interaction window space as before the contact routed and panels resized");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
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