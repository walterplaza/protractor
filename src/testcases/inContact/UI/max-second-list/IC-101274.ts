import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 297138
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe("MAX suite - IC-101274", function () {
    TestBase.scheduleTestBase();
    let obPhoneReqAgent: Agent;
    let obPhone: string = "(400) 001-0001";
    let obPhonehistory: string = "4000010001";
    
    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let skillName: string ;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101274 - [MAX] [OB] [Phone] Verify that OB Call made is displayed in Contact history.`);
        obPhoneReqAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-101274 - MAX OBPhone Verify that OB Call made is displayed in Contact history.', async () => {
        // 1. PRECONDITION: Agent with access to make and/or receive inbound and outbound calls on MAX agent	
        // 2. PRECONDITION:Ability to generate an outbound call (skill assigned)	
        skillName = SkillCore.getSkillName(SkillType.OB_PHONE);

        // Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneReqAgent);

        // 3. Launch MAX Agent
        maxPage = await centralPage.launchMAX(obPhoneReqAgent.phoneNumber);

        // 4. Place outbound call	
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.clickNew();
        maxCall = await maxPage.makeOutboundCall(obPhone, SkillType.OB_PHONE);

        // VP: Agent handles call
        await maxCall.waitForCallWorkspace();
        expect(await maxCall.isCallWorkspaceDisplayed()).toBe(true, "OB Phone workspace is not displayed");
        
        // 5. End call
        await maxCall.endCallContact();
       
        // 6. Observe Main panel and its elements (See also summary)
        await Logger.write(FunctionType.UI, `Observe Main panel and its elements`);

        // VP: Headers: Personal Queue, Coming Up, Contact History
        expect(await maxPage.isHeaderDisplayed("PersonalQueue")).toBe(true, "Personal Queue header is not displayed in MAX");
        expect(await maxPage.isHeaderDisplayed("ComingUp")).toBe(true, "Coming Up header is not displayed in MAX");
        expect(await maxPage.isHeaderDisplayed("CallHistory")).toBe(true, "Call History header is not displayed in MAX");
              
        // 7. Contact History element	
        await Logger.write(FunctionType.UI, `Observe Contact History element`);

        // VP: Elements include: Outbound call icon, Name of contact (if known - i.e. Address book) or Number, Time duration, and Skill name
        expect(await maxPage.isCallHistoryOBIconDisplayed()).toBe(true, "OB Phone icon is not displayed in Contact History");
        expect(await maxPage.isCallHistoryNumberDisplayed(obPhonehistory)).toBe(true, "Call number is not displayed in Contact History");
        expect(await maxPage.isCallHistoryActiveDurationDisplayed()).toBe(true, "Active duration is not displayed in Contact History");
        expect(await maxPage.isCallHistorySkillDisplayed(skillName)).toBe(true, "Skill name is not displayed in Contact History");

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Clean up
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(obPhoneReqAgent, SkillType.OB_PHONE);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});