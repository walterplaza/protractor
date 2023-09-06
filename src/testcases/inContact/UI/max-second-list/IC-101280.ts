import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { EmailMode, EmailParkMode } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 276987
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101280", function () {
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
        await Logger.write(FunctionType.TESTCASE, `IC-101280 -  E-mail Inbox Settings, View and Sort- Verify that The Email Inbox will be default sorted by Date/Time`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson, TestRunInfo.longTimeout);

        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL, "TCSubject-IC-101280");

        // 2. Central Login
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
        await TestCondition.editEmailParkingMode(ibEmailAgent, State.ON);
    }, TestRunInfo.conditionTimeout);

    it('IC-101280 - E-mail Inbox Settings, View and Sort- Verify that The Email Inbox will be default sorted by Date/Time', async () => {

        // 3. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 4. Send multiple emails to your agent
        await Utility.sendIBEmail(serverMail, ibMail);
        await Utility.sendIBEmail(serverMail, ibMail);
        await Utility.sendIBEmail(serverMail, ibMail);
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // 5. In Max > Change state to available and park the ib emails.
        emailContactIdArr = await TestHelpers.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL), true);
        await maxEmailPage.unparkEmail(EmailParkMode.PARK_EMAIL, emailContactIdArr[0]);

        // Adding delay 30s for each email send to test sort Date & Time function
        await Utility.delay(30);
        emailContactIdArr = await TestHelpers.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL), true);
        await maxEmailPage.unparkEmail(EmailParkMode.PARK_EMAIL, emailContactIdArr[1]);
        await Utility.delay(30);
        emailContactIdArr = await TestHelpers.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL), true);
        await maxEmailPage.unparkEmail(EmailParkMode.PARK_EMAIL, emailContactIdArr[2]);

        //VP: Emails should be parked and the Parked email list should be displayed in the glance
        await maxEmailPage.waitForParkedEmailDisplays(emailContactIdArr[0], true);
        expect(await maxEmailPage.isEmailParked(emailContactIdArr[0])).toBe(true, "Emails doesn't park")
        expect(await maxEmailPage.isEmailParked(emailContactIdArr[1])).toBe(true, "Emails doesn't park")
        expect(await maxEmailPage.isEmailParked(emailContactIdArr[2])).toBe(true, "Emails doesn't park")

        // 6. Display glance and click at the Parked emails sections to display the inbox
        await maxEmailPage.selectItemInParkedList(emailContactIdArr[0]);

        // VP: Email inbox should be displayed with mode read
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "it is possible to edit the email");

        //VP. Date/Time sorting option should be displayed
        expect(await maxEmailPage.isDateTimeSortOptionDisPlayed()).toBe(true, "Date Time option does not appear")

        //VP. Email Inbox will be default sorted by Date/Time
        expect(await maxEmailPage.isDateTimeSorted()).toBe(true, "Email Inbox is not default sorted by Date/Time");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            maxEmailPage.showMaxGlance();
            await CustomAPIs.startOrJoinSession(ibEmailAgent, ibEmailAgent.phoneNumber);
            await CustomAPIs.unparkEmail(ibEmailAgent);
            await CustomAPIs.endContact(ibEmailAgent, emailContactIdArr[0]);
            await CustomAPIs.endContact(ibEmailAgent, emailContactIdArr[1]);
            await CustomAPIs.endContact(ibEmailAgent, emailContactIdArr[2]);

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