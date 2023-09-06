import { Agent } from "@data-objects/general/agent";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Email } from "@data-objects/inContact/max/email/email-info";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 416650
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe('MAX suite - IC-62605', function () {
    TestBase.scheduleTestBase();
    let agent: Agent;
    let eMail: Email = new Email();
    eMail.initFullData("test@email.com", "Test Subject", "Test Body", "");

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62605 - [MAX] [New] [OutboundEmail] List of Skills are displayed without duplicated ones`);
        agent = await TestCondition.setUpAgent(SkillType.OB_EMAIL);
        await TestCondition.setUpAndAssignSkill(agent, SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-62605 - MAX New OutboundEmail List of Skills are displayed without duplicated ones.', async () => {

        // Login InContact
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);

        // Launch MAX
        maxPage = await centralPage.launchMAX(agent.phoneNumber);

        // 1. Click on 'New' button
        await maxPage.clickNew();

        // VP: Check popover exist inC UI
        expect(await maxPage.isAddNewDialogDisplayed(TestRunInfo.shortTimeout)).toBe(true,'Popover with a list of OB Email Skills is not displayed');

        // 2. Click on 'Outbounb Email' options
        await maxPage.selectAddNewOption(ContactName.EMAIL);
        await maxPage.enterEmailAddress(eMail.toAddress);

        // VP: Check email address list does not duplicate inC UI
        expect(await maxPage.isDuplicateListEmailAddress()).toBe(true, "Email address is duplicated.");

        // Close popover
        await maxPage.closePopover();
        await maxPage.waitForPopAddressBookDisappear();

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Logout
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(agent, SkillType.OB_PHONE);
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.OB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});