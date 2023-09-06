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
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 399601
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101260", function () {
    TestBase.scheduleTestBase();
    let serverMail: string;
    let ibMail: InboundEmail;
    let emailJson: string = `{"emailParking":true}`;
    let ibEmailAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let emailContactId: number;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101260 - MAX>Parked emails don't persist`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson, TestRunInfo.longTimeout);
        await ibEmailAgent.createPhoneNumber();

        // 1. Pre-condition: an email skill setup with parking enabled
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);

        // Central Login
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);

        // Enable email parking mode
        await TestCondition.editEmailParkingMode(ibEmailAgent, State.ON);
    }, TestRunInfo.conditionTimeout);

    it('IC-101260 - MAX Parked emails dont persist', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 3. Send an email to your agent
        await Utility.sendIBEmail(serverMail, ibMail);

        // Then change Max status to Available
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: The mail workspace is displayed
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The mail workspace is not displayed");

        // 4. Park the email
        await maxEmailPage.selectEmailButton(EmailButtonTitle.PARK_EMAIL);
        emailContactId = await TestHelpers.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL), true);

        // VP: Emails parked successfully 
        await maxEmailPage.waitForParkedEmailDisplays(emailContactId, true);
        expect(await maxEmailPage.isEmailParked(emailContactId)).toBe(true, "Emails doesn't park")

        // 5. Logout MAX
        await maxPage.showMaxGlance();
        centralPage = await maxPage.logOut();

        // 6. Re launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);
        await maxPage.showContactWorkSpace(ContactName.EMAIL);

        // VP: The parked email is shown in the glance view        
        expect(await maxEmailPage.isParkedEmailOnGlanceViewDisplayed(TestRunInfo.shortTimeout)).toBe(true, "The parked email is not shown in the glance view ");

        // Unpark email
        await maxPage.hideMaxGlance();
        await maxEmailPage.selectItemInParkedList(emailContactId);
        await maxEmailPage.unparkEmail(EmailParkMode.UNPARK_WORK_NOW, emailContactId);

        // VP: Mail workspace is displayed for working                 
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The mail workspace is not displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {

            // End email            
            await maxEmailPage.endEmailContact(false);

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