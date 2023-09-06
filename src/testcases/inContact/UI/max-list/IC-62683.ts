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
import { State } from "@data-objects/general/general";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 249392
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3, SC10, HC25
 */

describe("MAX suite - IC-62683", function () {
    TestBase.scheduleTestBase();
    let cluster: Cluster = TestRunInfo.cluster;
    let ibEmailRq1Agent: Agent;
    let dispositionNote: string = "Automation_Test";
    let ibMail: InboundEmail;
    let serverMail: string;
    let numberQueue: number;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmailPage;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62683 - MAX > Email > Basic Inbound Email Required Disposition`);
        ibEmailRq1Agent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, true);
        ibMail = new InboundEmail();
        serverMail = cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailRq1Agent, SkillType.IB_EMAIL);
    }, TestRunInfo.conditionTimeout);

    it('IC-62683 - MAX Email Basic Inbound Email Required Disposition', async () => {

        // 2. Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailRq1Agent);

        // 3. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailRq1Agent.phoneNumber);
        numberQueue = await maxPage.getSkillQueue(ContactLabel.INBOUND_EMAIL);

        // 4. Send an inbound email to your configured POC (Basic Email No Attachments)
        await Utility.sendIBEmail(serverMail, ibMail);

        // VP: Email is sent
        await maxPage.waitForQueueValue(ContactLabel.INBOUND_EMAIL, numberQueue + 1);
        expect(await maxPage.getSkillQueue(ContactLabel.INBOUND_EMAIL)).toBe(numberQueue + 1, "Inbound email is not routed to Agents Queue");

        // 5. On your MAX (While having your state as unavailable) Validate email is in queue        
        // VP: There are currently 1 email in queue
        expect(await maxPage.getSkillQueue(ContactLabel.INBOUND_EMAIL)).toBe(1, "There are not 1 email in queue currently");

        // 6. Change your MAX Status to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // 7. Verify Email Routes to agent 
        // VP: Email is automatically delivered to Agent and Email windows is displayed               
        maxEmailPage = await maxPage.waitForEmailWorkspace();
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email windows is displayed");

        // 8. Click the "End Email" button
        maxDispositionPage = await maxEmailPage.endEmailWithDisposition();

        // VP: Email discarded. Verify the Disposition Dialog is displayed
        expect(await maxDispositionPage.isDispositionPanelDisplayed()).toBe(true, "Disposition window is not displayed.");

        // 9. Try to change the status in your agent. E.g. Available
        await maxPage.showMaxGlance();
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.hideMaxGlance();

        // VP: Verify it is not possible and the Disposition Dialog is continuing to display
        expect(await maxDispositionPage.isDispositionFormDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Disposition window is displaying.");

        // 10. Fill out the disposition 
        await maxDispositionPage.toggleDispositionPopup(State.ON);
        await maxDispositionPage.fillDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

        // VP: Disposition filled out
        expect(await maxDispositionPage.getDispositionNote()).toBe(dispositionNote, "Disposition is not filled out");

        // 11. Submit disposition
        await maxDispositionPage.saveAndCloseDisposition();

        // VP: Disposition submitted
        expect(await maxDispositionPage.isDispositionFormDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Disposition is not submitted");
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
                await TestCondition.setAgentSkillsToDefault(ibEmailRq1Agent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});