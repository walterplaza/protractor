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
import MaxCall from "@page-objects/inContact/max/max-call";
import { ContactName } from "@data-objects/general/max";

/** 
 * Type: inContact
 * Suite: MAX-Common > MAX-Email
 * TC ID: IC-101965
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX-Common > MAX-Email - IC-101965", function () {
    TestBase.scheduleTestBase();
    let serverMail: string;
    let ibMail: InboundEmail;
    let emailJson: string = `{"emailParking":true,"enableParking":true}`;
    let obPhone1: string = "(400) 001-0001";
    let obPhoneName: SkillType = SkillType.OB_PHONE;
    let skillId: number;
    let ibEmailAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let maxEmailPage: MaxEmail;
    let emailContactIdArr: number[];


    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101965 -  [MAX] [IB Mail] [Parked] Validate that Call button on address book is enabled after refesh `);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson, TestRunInfo.longTimeout);
        await TestCondition.setUpAndAssignSkill(ibEmailAgent, SkillType.OB_PHONE);

        // Pre-condition: Basic email.
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL, "TCSubject-IC-101965");

        // Pre-condition: Central Login
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-101965 - [MAX] [IB Mail] [Parked] Validate that Call button on address book is enabled after refesh ', async () => {

        // Pre-condition: Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 3. Send multiple emails to your agent
        await Utility.sendIBEmail(serverMail, ibMail);
        await Utility.sendIBEmail(serverMail, ibMail);
        await Utility.sendIBEmail(serverMail, ibMail);

        // 2. Set the MAX status to AVAILABLE
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // 4. Click on Park button to Park email.
        emailContactIdArr = await TestHelpers.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL), true);
        await maxEmailPage.unparkEmail(EmailParkMode.PARK_EMAIL, emailContactIdArr[0]);
        emailContactIdArr = await TestHelpers.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL), true);
        await maxEmailPage.unparkEmail(EmailParkMode.PARK_EMAIL, emailContactIdArr[1]);
        emailContactIdArr = await TestHelpers.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL), true);
        await maxEmailPage.unparkEmail(EmailParkMode.PARK_EMAIL, emailContactIdArr[2]);


        //VP:the Email will be parked and will be shown on "Parked" section
        await maxEmailPage.waitForParkedEmailDisplays(emailContactIdArr[0], true);        
        expect(await maxEmailPage.isEmailParked(emailContactIdArr[0])).toBe(true, "Emails doesn't park")
        expect(await maxEmailPage.isEmailParked(emailContactIdArr[1])).toBe(true, "Emails doesn't park")
        expect(await maxEmailPage.isEmailParked(emailContactIdArr[2])).toBe(true, "Emails doesn't park")


        // 6. Refresh MAX
        await maxPage.refreshMaxPage();

        // 7. Click on "3 parked emails" text on Glance.
        await maxEmailPage.clickParkedContactLabel();

        // VP: the email should be shown but no one parked email should be focused and highlighted on the parked section on left panel.
        await maxEmailPage.waitForParkedEmailDisplays(emailContactIdArr[0], true);
        expect(await maxEmailPage.isEmailParkedListItemSelected(emailContactIdArr[0], 3)).toBe(false, "Parked email is selected")
        expect(await maxEmailPage.isEmailParkedListItemSelected(emailContactIdArr[1], 3)).toBe(false, "Parked email is selected")
        expect(await maxEmailPage.isEmailParkedListItemSelected(emailContactIdArr[2], 3)).toBe(false, "Parked email is selected")       
        
        // 8. Click on New button, fill a phone number and click on Call button
        await maxPage.showMaxGlance();
        await maxPage.clickNew();
        expect(await maxPage.isSearchAddressDisplayed()).toBe(true, "Search textbook does not exist");        
        maxCall = await maxPage.makeOutboundCall(obPhone1, obPhoneName);

        // VP: Call button must be enabled and the call must be started.
        skillId = await CustomAPIs.getSkillIdFromSkillName(ibEmailAgent, obPhoneName);
        expect(await maxCall.isSkillInfoDisplayed(obPhoneName, skillId)).toBe(true, "Skill information is not displayed");        

        // end call.
        await maxPage.showContactWorkSpace(ContactName.PHONE_CALL);
        await maxCall.endCallContact();
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
                await TestCondition.setUpAndRemoveSkill(ibEmailAgent, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});