import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { InboundEmail, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import PageBase from "@page-objects/page-base";

/** 
 * Type: inContact
 * Suite: MAX-Common > MAX-Email
 * TC ID: IC-98676
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe("MAX > MAX Common > MAX-Email - IC-98676", function () {
    TestBase.scheduleTestBase();
    let serverMail: string;
    let ibMail: InboundEmail;
    let ibEmailAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let pageBase: PageBase;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-98676 - [MAX][SCH][Email] Verify if it is not possible to make a Call when the Email is not parked`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL);
        await TestCondition.setUpAndAssignSkill(ibEmailAgent, SkillType.OB_PHONE);
        pageBase = new PageBase();

        // Pre-condition: MAX - Basic IB/OB Phone Precondition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);

        // Pre-condition: MAX - Central login
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);

    }, TestRunInfo.conditionTimeout);

    it('IC-98676 - [MAX][SCH][Email] Verify if it is not possible to make a Call when the Email is not parked', async () => {

        // Pre-condition: Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);
        
        // Pre-condition: Set the Status Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // 2. Generate an IB email contact
        await Utility.sendIBEmail(serverMail, ibMail);

        // VP: Works without issue. MAX connects and Email workspace is displayed 
        maxEmailPage = await maxPage.waitForEmailWorkspace();         

        // 3.1 show Glance
        await maxPage.showMaxGlance();

        // 3.2 Click on New+
        await maxPage.clickNew();

        // Data: - Enter some Phone number or - Select some entry from address book
        expect(await maxPage.isSearchAddressDisplayed()).toBe(true, "Search textbook does not exist");
        await maxPage.inputAddressBook(ibEmailAgent.phoneNumber);

        // VP: New button should open the address book and after typing the Phone number the "call' button should not be available.
        expect(await maxPage.getCallButtonColor()).toBe(maxPage.getAddressBookContactButtonColorByBrowser("disabled", TestRunInfo.browser), "call contact button is enabled");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await maxEmailPage.endEmailContact(false);
            await maxPage.waitForMAXStateChangeTo(MaxState.AVAILABLE);

            // Logout MAX
            centralPage = await maxPage.logOut();

            // Logout InContact
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try { 
                await TestCondition.setUpAndRemoveSkill(ibEmailAgent, SkillType.OB_PHONE);
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);               
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});