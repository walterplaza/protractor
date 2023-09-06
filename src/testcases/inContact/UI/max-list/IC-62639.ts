import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { EmailButtonTitle, EmailParkMode } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 383359
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 * Bug: IC-70045: CFBP1 - [18.5][MAX][VC] Email does not deliver to Agent after being interrupted/parked (Will be fixed 18.7.0.5)
 */

describe("MAX suite - IC-62639", function () {
    TestBase.scheduleTestBase();
    let serverMail: string;
    let ibMail: InboundEmail;
    let emailJson: string = `{"emailParking":true}`;
    let ibEmailAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let emailContactIdArr: number[];

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62639 - [MAX][SCH]>Emails> Parked emails should not lose their icons when you click through`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson);

        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);

        // 2. Central Login
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
        let skillListPage = await centralPage.gotoSkillsListPage();
        let skillDetailsPage = await skillListPage.selectSkillDetail(SkillType.IB_EMAIL);
        await skillDetailsPage.clickEditButton();
        await skillDetailsPage.setEmailParkingMode(State.ON);
        centralPage = await skillDetailsPage.completeChanges();
    }, TestRunInfo.conditionTimeout);

    it('IC-62639 - MAX SCH Emails Parked emails should not lose their icons when you click through', async () => {

        // 3. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 4. Send multiple emails to your agent
        await Utility.sendIBEmail(serverMail, ibMail);
        await Utility.sendIBEmail(serverMail, ibMail);
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Agent should receive and accept all the emails
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The IB Email Contact doesn't deliver in Agent");

        // 5. Park the emails
        await maxEmailPage.selectEmailButton(EmailButtonTitle.PARK_EMAIL);
        emailContactIdArr = await maxEmailPage.waitForCurrentContactIdReturn(2, ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));

        // VP: Emails parked successfully 
        await maxEmailPage.waitForParkedEmailDisplays(emailContactIdArr[0], true);
        expect(await maxEmailPage.isEmailParked(emailContactIdArr[0])).toBe(true, "Emails doesn't park")

        // 6. Click through them 
        // VP: The list should retain their patron icons
        await maxEmailPage.selectItemInParkedList(emailContactIdArr[0]);
        await maxEmailPage.waitForParkedEmailDisplays(emailContactIdArr[0], true);
        expect(await maxEmailPage.isEmailPatronIconDisplayed()).toBe(true, "The list doesn't retain their patron icons");

        await maxEmailPage.selectItemInWorkingList(emailContactIdArr[1]);
        await maxEmailPage.waitForParkedEmailDisplays(emailContactIdArr[0], false, TestRunInfo.shortTimeout);
        expect(await maxEmailPage.isEmailPatronIconDisplayed()).toBe(true, "The list doesn't retain their patron icons");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await maxEmailPage.clickEndEmailButton(emailContactIdArr[1]);
            await maxEmailPage.waitForParkedEmailDisplays(emailContactIdArr[0], true);
            await maxEmailPage.unparkEmail(EmailParkMode.UNPARK_WORK_NOW, emailContactIdArr[0]);
            await maxEmailPage.waitForParkedEmailDisplays(emailContactIdArr[0], false, TestRunInfo.shortTimeout);
            await maxEmailPage.clickEndEmailButton(emailContactIdArr[0]);
            await maxPage.waitForMAXStateChangeTo(MaxState.AVAILABLE);

            // Logout MAX
            centralPage = await maxPage.logOut();

            // Logout InContact
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});