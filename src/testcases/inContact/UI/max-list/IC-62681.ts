import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactLabel, ContactName, DispositionName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { InboundEmail } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 249394
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('MAX suite - IC-62681', function () {
    TestBase.scheduleTestBase();
    let ibEmailNonReqAgent: Agent;
    let timeACWOut: number = 15;
    let dispositionNote: string = "Note";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmailPage;
    let maxDispositionPage: MaxDispositionPage;
    let numberQueue: number;
    let ibMail: InboundEmail;
    let serverMail: string;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62681 - MAX > Email > Basic Inbound Email Non Required Disposition Max Time Limit`);
        ibEmailNonReqAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, false, true);
    }, TestRunInfo.conditionTimeout);

    it('IC-62681 - MAX Email Basic Inbound Email Non Required Disposition', async () => {

        // 1. Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailNonReqAgent, SkillType.IB_EMAIL);

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
        await maxEmailPage.endEmailWithDisposition();

        // VP: Email discarded
        expect(await maxEmailPage.isEmailDiscarded()).toBe(true, "Email is not discarded");

        // VP: Verify that there is a Time Counter next to "ACW" label.
        expect(await maxEmailPage.isACWTimerCountDisplayed()).toBe(true, "There isn't a Time Counter next to ACW label");
        expect(await maxEmailPage.isACWNameNextToTimeCounter()).toBe(true, "ACW name is not next to time counter");

        // VP: This time counter starts a countdown according the setting made in requirements for Max Time Limit field.
        await maxEmailPage.waitACWDisappear(timeACWOut);
        expect(await maxEmailPage.isACWTimerCountDisplayed(TestRunInfo.shortTimeout)).toBe(false, "This time counter starts a countdown according the setting made in requirements for Max Time Limit field.");

        // 9. Once the time counter ends its time.
        // VP: Verify the Agent automatically changes to Available status.
        expect(await maxEmailPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "The agent doesn't automatically change to Available status");

        // 10. Repeat the steps 4 - 9 but now select an Disposition
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();
        maxDispositionPage = await maxEmailPage.endEmailWithDisposition();
        await maxDispositionPage.fillDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

        // VP: Disposition filled out
        expect(await maxDispositionPage.isDispositionSelected(DispositionName.DISPOSITION_1)).toBe(true, "Disposition is not selected");

        // Submit Disposition
        await maxDispositionPage.saveAndCloseDisposition();

        // 11. Change the agent state to available
        await maxEmailPage.changeState(MaxState.AVAILABLE);

        // VP: Agent state changed to available/ disposition closed
        expect(await maxEmailPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Max state is not changed to available");
        expect(await maxDispositionPage.isDispositionFormDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Disposition window is still displayed")
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Post-condition
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (error) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailNonReqAgent, SkillType.IB_EMAIL);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
});



