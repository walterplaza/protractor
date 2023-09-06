import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import {SkillCore} from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import MaxCall from "@page-objects/inContact/max/max-call";

/** 
 * Type: inContact
 * Suite: MAX-Common > MAX-Phone
 * TC ID: MAX-577
 * Tested browser: Chrome.
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe("MAX-Common > MAX-Phone - MAX-577", function () {
    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let skillName_A: string = SkillCore.getSkillName(SkillType.OB_PHONE);
    let skillName_B: string = SkillCore.getSkillName(SkillType.OB_PHONE_ALT);
    let testPhoneNumber: string = "(400) 001-0001";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `MAX-577 - [MAX][Glance][OB][Phone] - Validate that OB phone skill is not being shown after an OB skill is unassign`);
        
        // 1.0 Complete Precondition IC-97114 
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        await TestCondition.setUpAndAssignSkill(obPhoneAgent, SkillType.OB_PHONE_ALT);

        // 1.1 Complete Precondition IC-73938
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneAgent);
    }, TestRunInfo.conditionTimeout);

    it('MAX-577 - [MAX][Glance][OB][Phone] - Validate that OB phone skill is not being shown after an OB skill is unassign', async () => {

        // 1.2 Launch MAX 
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);

        // 2.0 Click on New button on glance
        await maxPage.clickNew();        
        expect(await maxPage.isSearchAddressDisplayed()).toBe(true, "Search textbook does not exist");

        // 2.1 fill a phone number on Search field
        await maxPage.inputAddressBook(testPhoneNumber);

        // VP: phone numbers are filtered and results are displayed.
        expect(await maxPage.isContactInAddressBookDisplayed(testPhoneNumber, TestRunInfo.shortTimeout)).toBe(true, "The result doesn't display any matches found from the custom address book entries.");

        // 3. Click on Call button
        await maxPage.clickCallButton();

        // VP: Dropdown list will be displayed with the 2 OB skills.
        expect(await maxPage.getCallButtonDropdownSkillName(skillName_A)).toBe(skillName_A, "Skill is not found in the dropdown menu");
        expect(await maxPage.getCallButtonDropdownSkillName(skillName_B)).toBe(skillName_B, "Skill is not found in the dropdown menu");  
        maxPage.closePopover();       
        
        // 4, 5, 6. Remove user's skill.
        await TestCondition.setUpAndRemoveSkill(obPhoneAgent, SkillType.OB_PHONE_ALT);
        maxPage.refreshMaxPage();        

        // fill a phone number on Search field
        await maxPage.clickNew();        
        expect(await maxPage.isSearchAddressDisplayed()).toBe(true, "Search textbook does not exist");
        await maxPage.inputAddressBook(testPhoneNumber);

        // VP: phone numbers are filtered and results are displayed.
        expect(await maxPage.isContactInAddressBookDisplayed(testPhoneNumber, TestRunInfo.shortTimeout)).toBe(true, "The result doesn't display any matches found from the custom address book entries.");

        // 8. Click on Call button. 
        await maxPage.clickCallButton();

        // VP: There is one OB phone skill available, so a call is generated
        maxCall = await maxPage.waitForCallWorkspace();

         // End OB phone
         await maxCall.endCallContact();  

    });
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Post-Condition
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) {
        } finally {
            try {
                await TestCondition.setUpAndRemoveSkill(obPhoneAgent, SkillType.OB_PHONE_ALT);            
                await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.OB_PHONE);                    
            } catch (err) {
            }
        }

    }, TestRunInfo.conditionTimeout);
});