import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import usersPage from "@page-objects/inContact/central/admin/users/users-page";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import {EmailButtonTitle, EmailParkMode} from "@data-objects/inContact/max/email/email-info";
import PageBase from "@page-objects/page-base";
import MaxCall from "@page-objects/inContact/max/max-call";

/** 
 * Type: inContact
 * Suite: MAX-Common > MAX-Email
 * TC ID: IC-98651
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX > MAX Common > MAX-Email - IC-98651", function () {
    TestBase.scheduleTestBase();
    let serverMail: string;
    let ibMail: InboundEmail;
    let obPhone1: string = "(400) 001-0001";
    let emailJson: string = `{"emailParking":true,"enableParking":true}`;
    let ibEmailAgent: Agent;
    let skillId: number;
    let obPhoneName: SkillType = SkillType.OB_PHONE;

    // Declare page object
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let usersPage: usersPage;
    let pageBase: PageBase;
    let emailContactId: number;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-98651 - [MAX][Email] Verify if it is possible to make a Call when the Email is parked`);
        // Pre-condition - IB Email Skill with Email Parking option as YES.
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson, TestRunInfo.longTimeout);
        await TestCondition.setUpAndAssignSkill(ibEmailAgent, SkillType.OB_PHONE);
        pageBase = new PageBase();

        // Pre-condition - MAX - Basic Email Precondition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);

        // Pre-condition - MAX - Central login and Launch MAX
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
        
        // 1. IB Email Skill with Email Parking option as YES.
        await TestCondition.editEmailParkingMode(ibEmailAgent, State.ON);
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

    }, TestRunInfo.conditionTimeout);

    it('IC-98651 - [MAX][Email] Verify if it is possible to make a Call when the Email is parked', async () => {

        //2 . Generate an IB email contact
        await Utility.sendIBEmail(serverMail, ibMail);
        await maxPage.changeState(MaxState.AVAILABLE);       
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Works without issue. MAX connects and Email workspace is displayed 
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The IB Email Contact doesn't deliver to Agent");        
        
        // 3. Attempt to Park the email
        await maxEmailPage.selectEmailButton(EmailButtonTitle.PARK_EMAIL);
        emailContactId = await CustomAPIs.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));

        // VP: Parks without issue 
        await maxEmailPage.waitForParkedEmailDisplays(emailContactId, true);
        expect(await maxEmailPage.isEmailParked(emailContactId)).toBe(true, "Emails doesn't park");

        // 4. Generate OB Phone contact by Clicking on +New button
        await maxPage.showMaxGlance();

        // click  on the "New" button
        await maxPage.clickNew();

        // VP: Main search text box appears
        expect(await maxPage.isSearchAddressDisplayed()).toBe(true, "Search textbook does not exist");

        // Data: Enter some Phone number or Select some entry from address book
        maxCall = await maxPage.makeOutboundCall(obPhone1, obPhoneName);

        //Phone call is made
        skillId = await CustomAPIs.getSkillIdFromSkillName(ibEmailAgent, obPhoneName);
        expect(await maxCall.isSkillInfoDisplayed(obPhoneName, skillId)).toBe(true, "Skill information is not displayed");

        // Click to unpark the email
        await maxEmailPage.unparkEmail(EmailParkMode.UNPARK_WORK_NOW, emailContactId);

        // 4. End contacts
        await maxCall.endCallContact();

        // VP: The contact is ended
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, 5)).toBe(false, "The contact is not ended");

        // Email is delivered to the Agent
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The IB Email Contact doesn't deliver to Agent");
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