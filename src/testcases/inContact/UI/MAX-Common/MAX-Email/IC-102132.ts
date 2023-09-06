import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { EmailButtonTitle, EmailParkMode } from "@data-objects/inContact/max/email/email-info";
import PageBase from "@page-objects/page-base";
import MaxCall from "@page-objects/inContact/max/max-call";

/** 
 * Type: inContact
 * Suite: MAX-Common > MAX-Email
 * TC ID: IC-102132
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX-Common > MAX-Email - IC-102132", function () {
    TestBase.scheduleTestBase();
    let serverMail: string;
    let ibMail: InboundEmail;
    let emailJson: string = `{"emailParking":true,"enableParking":true}`;
    let ibEmailAgent: Agent;

    // Declare page object
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let pageBase: PageBase;
    let emailContactId: number;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-102132 - [MAX][SCH][Email] Email parking`);
        // Pre-condition - IB Email Skill with Email Parking option as YES.
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson, TestRunInfo.longTimeout);
        await TestCondition.setUpAndAssignSkill(ibEmailAgent, SkillType.IB_Phone);
        pageBase = new PageBase();

        // Pre-condition - MAX - Basic Email Precondition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);        

        // Pre-condition - MAX - Central login
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);    
        
        // Pre-condition - MAX - Launch MAX        
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

    }, TestRunInfo.conditionTimeout);

    it('IC-102132 - [MAX][SCH][Email] Email parking', async () => {        

        //2 . Generate an IB email contact
        await Utility.sendIBEmail(serverMail, ibMail);
        await maxPage.changeState(MaxState.AVAILABLE);       
        maxEmailPage = await maxPage.waitForEmailWorkspace();    

         // VP: Works without issue. MAX connects and Email workspace is displayed 
         expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The IB Email Contact doesn't deliver to Agent");            
        
        // 3. Click on Park button
        await maxEmailPage.selectEmailButton(EmailButtonTitle.PARK_EMAIL);
        emailContactId = await CustomAPIs.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));

         // VP: Parks without issue 
         await maxEmailPage.waitForParkedEmailDisplays(emailContactId, true);
         expect(await maxEmailPage.isEmailParked(emailContactId)).toBe(true, "Emails doesn't park")

        // 4. Generate an IB Phone contact
        await TestHelpers.startInboundCall(ibEmailAgent);

         // VP: Works without issue. MAX connects and Phone workspace is displayed 
        maxCall = await maxPage.waitForCallWorkspace();    
        
        // End IB phone contact
        await maxCall.endCallContact();

        // Click to unpark the email
        await maxEmailPage.unparkEmail(EmailParkMode.UNPARK_WORK_NOW, emailContactId);

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
                await TestCondition.setUpAndRemoveSkill(ibEmailAgent, SkillType.IB_Phone);
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);                
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});