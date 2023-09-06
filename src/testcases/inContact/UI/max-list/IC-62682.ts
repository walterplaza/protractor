import { Agent } from "@data-objects/general/agent";
import { Cluster, MaxState, PageName } from "@data-objects/general/cluster";
import { ContactLabel, ContactName, DispositionName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { InboundEmail } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 249393
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('MAX suite - IC-62682', function () {

    let cluster: Cluster = TestRunInfo.cluster;
    TestBase.scheduleTestBase();
    let ibMail: InboundEmail;
    let dispositionNote: string = "Test Automation";
    let serverMail: string;
    let ibEmailNonReqAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let numberQueue: number;
    let maxEmailPage: MaxEmailPage;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62682 - MAX > Email > Basic Inbound Email Non Required Disposition`);
        ibEmailNonReqAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, false, true);
        ibMail = new InboundEmail();
        serverMail = cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailNonReqAgent, SkillType.IB_EMAIL);
    }, TestRunInfo.conditionTimeout);

    it('IC-62682 - MAX Email Basic Inbound Email Non Required Disposition', async () => {

        // 2. Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailNonReqAgent);

        // 3. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailNonReqAgent.phoneNumber);
        numberQueue = await maxPage.getSkillQueue(ContactLabel.INBOUND_EMAIL);

        // 4. Send an inbound email to your configured POC (Basic Email No Attachments)
        await Utility.sendIBEmail(serverMail, ibMail);

        // 5. On your MAX (While having your state as unavailable) Validate email is in queue 
        // VP: There are currently 1 email in queue
        await maxPage.waitForQueueValue(ContactLabel.INBOUND_EMAIL, numberQueue + 1);
        expect(await maxPage.getSkillQueue(ContactLabel.INBOUND_EMAIL)).toBe(numberQueue + 1, "Inbound email is not routed to Agents Queue");

        // 6. Change your MAX Status to Available
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Email is automatically delivered to Agent and Email windows is displayed
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email is not displayed");

        // 7. Verify Email Routes to agent
        // VP: Email window opens
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email is not displayed");

        // 8. Click the "End Email" button
        maxDispositionPage = await maxEmailPage.endEmailWithDisposition();

        // 9. Try to change the status in your agent. E.g. Available
        await maxEmailPage.showMaxGlance();
        await maxEmailPage.changeState(MaxState.AVAILABLE);
        await maxEmailPage.waitForContactWorkSpaceDisappeared(ContactName.EMAIL);

        // VP: Verify it is possible and the Disposition Dialog disappear.
        expect(await maxDispositionPage.isDispositionFormDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Disposition window is not disappeared");

        // VP: The Agent has the new status.
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Agent status doesn't change to Available");

        // 10. Repeat the steps 3 - 8 but now select an Disposition
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();
        await maxEmailPage.endEmailWithDisposition();
        await maxDispositionPage.fillDispositionForm(DispositionName.DISPOSITION_1);

        // VP: Disposition filled out
        expect(await maxDispositionPage.isDispositionSelected(DispositionName.DISPOSITION_1,TestRunInfo.shortTimeout)).toBe(true, "Disposition is not selected");        

        // 11. Submit Disposition
        await maxDispositionPage.saveAndCloseDisposition(false);

        // VP: Disposition submitted
        expect(await maxDispositionPage.isDispositionFormDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Disposition window is not disappeared");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        // Clean up
        try {
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailNonReqAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



