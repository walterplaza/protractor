import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { EmailButtonTitle, EmailMode, EmailParkMode } from "@data-objects/inContact/max/email/email-info";
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
 * TC ID: 421107
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101254", function () {
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
        await Logger.write(FunctionType.TESTCASE, `IC-101254 - MAX Parked email unselectable Reply then unpark`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson, TestRunInfo.longTimeout);

        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);

        // 1. Central Login
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
        await TestCondition.editEmailParkingMode(ibEmailAgent, State.ON);

    }, TestRunInfo.conditionTimeout);

    it('IC-101254 - MAX Parked email unselectable Reply then unpark', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 3. Deliver an IB email to the user
        await Utility.sendIBEmail(serverMail, ibMail);
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Email delivers without issue. 
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The IB Email Contact doesn't deliver to Agent");

        //4.Click Reply
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);

        // VP: Reply email workspace opens and it is possible to edit the email
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "it is not possible to edit the email");

        // 5. Park the email 
        await maxEmailPage.selectEmailButton(EmailButtonTitle.PARK_EMAIL);
        emailContactId = await CustomAPIs.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));

        // VP: Parks without issue 
        await maxEmailPage.waitForParkedEmailDisplays(emailContactId, true);
        expect(await maxEmailPage.isEmailParked(emailContactId)).toBe(true, "Emails doesn't park")

        // 6. Click to unpark the email
        await maxEmailPage.unparkEmail(EmailParkMode.UNPARK_WORK_NOW, emailContactId);

        // Email is delivered to the Agent
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The IB Email Contact doesn't deliver to Agent");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await maxEmailPage.discardEmailDraft();
            await maxEmailPage.endEmailContact(false);
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