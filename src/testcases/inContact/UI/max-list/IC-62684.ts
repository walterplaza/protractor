import { Agent } from "@data-objects/general/agent";
import { Cluster, MaxState, PageName } from "@data-objects/general/cluster";
import { ContactLabel, ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxTransferPage from "@page-objects/inContact/max/max-transfer-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**  
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 249390
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe("MAX suite - IC-62684", function () {

    TestBase.scheduleTestBase();
    let cluster: Cluster = TestRunInfo.cluster;
    let ibEmailAgent: Agent;
    let chatAgent: Agent;
    let ibMail: InboundEmail;
    let numberQueue: number;
    let serverMail: string;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let maxTransferPage: MaxTransferPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62684 - MAX > Email > Basic Inbound Email Transfer To a Skill where agent is logged off`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL);
        chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it('IC-62684 - MAX Email Basic Inbound Email Transfer To a Skill where agent is logged off', async () => {

        // 2. Central Login
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);

        // 3. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);
        numberQueue = await maxPage.getSkillQueue(ContactLabel.INBOUND_EMAIL);

        // 4. Send an inbound email to your configured POC (Basic Email No Attachments)
        ibMail = new InboundEmail();
        serverMail = cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);
        await Utility.sendIBEmail(serverMail, ibMail);

        // 5. On your MAX (While having your state as unavailable) Validate email is in queue 
        // VP: There are currently 1 email in queue
        await maxPage.waitForQueueValue(ContactLabel.INBOUND_EMAIL, numberQueue + 1);
        expect(await maxPage.getSkillQueue(ContactLabel.INBOUND_EMAIL)).toBe(numberQueue + 1, "Inbound email is not routed to Agents Queue");

        // 6. Change your MAX Status to Available
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Email is automatically delivered to Agent and Email windows is displayed
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace is not displayed");

        // 7. Verify Email Routes to agent
        // VP: Email window opens
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace is not displayed");

        // 8. Click on the transfer button
        maxTransferPage = await maxEmailPage.clickTransferConferenceButton();

        // VP: Address book opens
        expect(await maxEmailPage.isAddressBookDisplayed()).toBe(true, "Address book is not displayed");

        // 9. Search for logged off agent by using the search text box
        await maxEmailPage.inputAddressBook(chatAgent.name);

        // VP: Agent located
        expect(await maxEmailPage.isContactInAddressBookDisplayed(chatAgent.name)).toBe(true, "Agent is not displayed");

        // 10. Validate the transfer button is not available and we cannot click it
        // VP: No transfer button located
        expect(await maxTransferPage.isTransferButtonInAddressBookDisplayed(chatAgent.name)).toBe(false, "Transfer button is displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        // Clean up
        try {
            await maxEmailPage.closePopover();
            maxPage = await maxEmailPage.endEmailContact(false);
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});