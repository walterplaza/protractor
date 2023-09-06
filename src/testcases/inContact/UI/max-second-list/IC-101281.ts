import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { EmailButtonTitle, EmailMode, EmailParkMode } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import PageBase from "@page-objects/page-base";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 270062
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101281", function () {
    TestBase.scheduleTestBase();
    let serverMail: string;
    let ibMail: InboundEmail;
    let emailJson: string = `{"emailParking":true}`;
    let ibEmailAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let pageBase: PageBase;
    let emailContactIdArr: number[];


    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101281 - MAX Email Park Multiples Emails and see items in Glance View`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson, TestRunInfo.longTimeout);
        pageBase = new PageBase();

        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL, "TCSubject-IC-101281");

        // 2. Central Login
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
        await TestCondition.editEmailParkingMode(ibEmailAgent, State.ON);
    }, TestRunInfo.conditionTimeout);

    it('IC-101281 - MAX Email Park Multiples Emails and see items in Glance View', async () => {

        // 3. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 4. Send multiple emails to your agent
        await Utility.sendIBEmail(serverMail, ibMail);
        await Utility.sendIBEmail(serverMail, ibMail);
        await Utility.sendIBEmail(serverMail, ibMail);
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // 5. When emails are received click the "park button. Repeat the step 3 and 4 for multiples emails.
        emailContactIdArr = await maxEmailPage.waitForCurrentContactIdReturn(1, ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));
        await maxEmailPage.unparkEmail(EmailParkMode.PARK_EMAIL, emailContactIdArr[0]);
        emailContactIdArr = await maxEmailPage.waitForCurrentContactIdReturn(2, ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));
        await maxEmailPage.unparkEmail(EmailParkMode.PARK_EMAIL, emailContactIdArr[1]);
        emailContactIdArr = await maxEmailPage.waitForCurrentContactIdReturn(3, ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));
        await maxEmailPage.unparkEmail(EmailParkMode.PARK_EMAIL, emailContactIdArr[2]);

        //VP: Emails should be parked and the Parked email list should be displayed in the glance
        await maxEmailPage.waitForParkedEmailDisplays(emailContactIdArr[0], true);
        expect(await maxEmailPage.isEmailParked(emailContactIdArr[0])).toBe(true, "Emails doesn't park")
        expect(await maxEmailPage.isEmailParked(emailContactIdArr[1])).toBe(true, "Emails doesn't park")
        expect(await maxEmailPage.isEmailParked(emailContactIdArr[2])).toBe(true, "Emails doesn't park")

        // 6. Click on the parked emails tab in the glance view
        await maxPage.showMaxGlance();

        // VP: Parked emails window opens
        expect(await maxEmailPage.isParkedEmailOnGlanceViewDisplayed(TestRunInfo.shortTimeout)).toBe(true, "The list doesn't retain their patron icons");

        //7. Click one of the parked emails
        await pageBase.waitInSecond(TestRunInfo.shortTimeout);
        await maxPage.hideMaxGlance();
        await maxEmailPage.selectItemInParkedList(emailContactIdArr[0]);
        await maxEmailPage.waitForParkedEmailDisplays(emailContactIdArr[0], true);
        expect(await maxEmailPage.isEmailPatronIconDisplayed()).toBe(true, "The list doesn't retain their patron icons");

        //8. Click on "Unpark Email (Move to your queue)" button
        await maxEmailPage.unparkEmail(EmailParkMode.UNPARK_MOVE_TO_QUEUE, emailContactIdArr[0]);

        // VP: Verify the item for email selected disappears to the Glance View for a seconds and again it is redirected to same agent and the email is displayed in read mode.
        await pageBase.waitInSecond(3); //Add buffer time to wait for email parked
        expect(await maxEmailPage.isEmailParked(emailContactIdArr[0])).toBe(false, "Emails is not unparked")
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "it is possible to edit the email");

        //VP.Verify user can reply email
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "it is possible to edit the email");

        //VP.Verify user can reply all email
        await maxEmailPage.discardEmailDraft(true);
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY_ALL);
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "it is possible to edit the email");

        //VP.Verify user can forward email
        await maxEmailPage.discardEmailDraft(true);
        await maxEmailPage.selectEmailButton(EmailButtonTitle.FORWARD);
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "it is possible to edit the emaile");

        //VP.Verify user can discard email
        await maxEmailPage.discardEmailDraft(true);
        await maxEmailPage.selectEmailButton(EmailButtonTitle.PARK_EMAIL);
        expect(await maxEmailPage.isEmailParked(emailContactIdArr[0])).toBe(true, "Emails doesn't park")


    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {

            maxEmailPage.showMaxGlance();
            // Logout MAX
            centralPage = await maxPage.logOut();

            // Logout InContact
            await CustomAPIs.unparkEmail(ibEmailAgent);
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});