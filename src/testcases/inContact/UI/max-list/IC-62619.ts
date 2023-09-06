import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
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
 * TC ID: 395650
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3, HC25
 */

describe('MAX suite - IC-62619', function () {
    TestBase.scheduleTestBase();
    let ibEmailNonReqAgent: Agent;
    let acwTimeOut: number = 3;
    let ibMail: InboundEmail;
    let serverMail: string;
    let emailJson: string = `{"maxSecondsACW":${acwTimeOut}}`;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmailPage;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62619 - Email > Disposition > Not able to disposition contact - Optional Disposition`);
        ibEmailNonReqAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, false, true, emailJson);

        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailNonReqAgent, SkillType.IB_EMAIL);

        // 2. InContact central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailNonReqAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62619 - MAX Email Basic Inbound Email Non Required Disposition', async () => {

        // 3. Set Status of Agent to Available     
        maxPage = await centralPage.launchMAX(ibEmailNonReqAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: Set without issue
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Agent status does not change to Available");

        // 4. Create inbound email. Send to to Agent using skill with optional Dispo
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: MAX opens email
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "MAX does not open email");

        // 5. End the email
        maxDispositionPage = await maxEmailPage.endEmailWithDisposition();

        // VP: Disposition window opens. fields are usable
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition window does not open");
        expect(await maxDispositionPage.isDispositionEditable()).toBe(true, "Disposition fields are not usable");

        // 6. Wait for 3 seconds of ACW times out
        await maxEmailPage.waitACWDisappear(acwTimeOut);
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.EMAIL, TestRunInfo.shortTimeout);

        // VP: When the ACW times out, the contact closes.        
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "The contact does not close");

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            //Logout MAX
            await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailNonReqAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});