import { Agent } from "@data-objects/general/agent";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Email } from "@data-objects/inContact/max/email/email-info";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 383685
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe('MAX suite - IC-62635', function () {
    TestBase.scheduleTestBase();
    let agent: Agent;
    let eMail: Email = new Email()

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmailPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62635 - [MAX] Omnichannel UI - Disabled Transfer button on OB email`);
        agent = await TestCondition.setUpAgent(SkillType.OB_EMAIL);
        // Pre Conditions
        // 3. Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);
        // Pre Conditions
        eMail.initFullData("test@email.com", "Test Subject", "Test Body", "");

    }, TestRunInfo.conditionTimeout);

    it('IC-62635 - MAX Omnichannel UI Disabled Transfer button on OB email', async () => {

        // 5. Launch MAX
        maxPage = await centralPage.launchMAX(agent.phoneNumber);

        // 6. Start an OB email (New > Outbound email)
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.EMAIL);
        maxEmailPage = await maxPage.selectEmailFromAddressBook(SkillType.OB_EMAIL,eMail.toAddress);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Email workspace is displayed
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace is not displayed")

        // VP: "Transfer" button is disabled for Ob email
        expect(await maxEmailPage.isTransferButtonDisabled()).toBe(true, "Transfer button is not disabled");

        // End OBEmail
        await maxEmailPage.endEmailContact();
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.OB_EMAIL);
            }
            catch (err) {
            }
        }
    }, TestRunInfo.conditionTimeout);
});