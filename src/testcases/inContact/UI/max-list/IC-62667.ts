import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { Email } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 279142
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe('MAX suite - IC-62667', function () {
    TestBase.scheduleTestBase();
    let obMailAgent: Agent;
    let eMail: Email = new Email()

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmailPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62667 - [MAX] Change Agent State timer from Minutes to Seconds> Verify that the timer in the glace for ACW state is correct with Requiered Disposition`);
        obMailAgent = await TestCondition.setUpAgent(SkillType.OB_EMAIL, false, true);
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obMailAgent);
        // Pre Conditions
        eMail.initFullData("test@email.com", "Test Subject", "Test Body", "");

    }, TestRunInfo.conditionTimeout);

    it('IC-62667 - MAX Change Agent State timer from Minutes to Seconds The timer in the glace for ACW state is correct with Requiered Disposition', async () => {

        // 2. Launch MAX
        // 3. Wait until the agent's console is displayed 
        maxPage = await centralPage.launchMAX(obMailAgent.phoneNumber);

        // 4. Change agent state to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // 5. Place a contact to the agent(phone, email,chat,wi, vm)
        // 6. End contact and wait until ACW is displayed
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.EMAIL);
        maxEmailPage = await maxPage.selectEmailFromAddressBook(SkillType.OB_EMAIL, eMail.toAddress,false);
        maxEmailPage = await maxPage.waitForEmailWorkspace();
        await maxEmailPage.sendOutboundEmailACW(eMail);

        // VP: ACW should be displayed
        expect(await maxEmailPage.isACWTimerCountDisplayed()).toBe(true, "ACW counter Time is not displayed");

        // VP: 7. Review the elapsed time in ACW state(glance view) is correct MM:SS
        expect(await maxEmailPage.isACWTimeFormattedMMSS()).toBe(true, "ACW time does not formatted mm:ss");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout Central
            await maxEmailPage.waitACWDisappear();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(obMailAgent, SkillType.OB_EMAIL);
            }
            catch (err) {
            }
        }
    }, TestRunInfo.conditionTimeout);
});



