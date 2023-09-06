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
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: General(Glance) > Address Book
 * TC ID: IC-76333
 * Tested browser: Chrome,Firefox, IE.
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe("General(Glance) > Address Book - IC-76333", function () {
    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let skillName: string = SkillCore.getSkillName(SkillType.OB_PHONE);
    let obPhone1: string = "(400) 001-0001";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-76333 - [MAX] [Address Book] [Call] Validate that when click on contact button a menu of contact methods available for this person it's being displayed.`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        await TestCondition.setUpAndAssignSkill(obPhoneAgent, SkillType.OB_PHONE_ALT);
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-76333 - [MAX] [Address Book] [Call] Validate that when click on contact button a menu of contact methods available for this person its being displayed', async () => {

        // 1. Launch MAX 
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);

        // 2. From the Glance, click  on the "New" button
        await maxPage.clickNew();

        // VP: Main search text box appears
        expect(await maxPage.isSearchAddressDisplayed()).toBe(true, "Search textbook does not exist");
        await maxPage.inputAddressBook(obPhone1);

        // VP: The result will display any matches found from the custom address book entries.
        expect(await maxPage.isContactInAddressBookDisplayed(obPhone1, TestRunInfo.shortTimeout)).toBe(true, "The result doesn't display any matches found from the custom address book entries.");

        // 3. From Address Book click call button 
        await maxPage.clickCallButton();

        // VP: a dropdwon menu will display skill names assigned to the user.
        expect(await maxPage.getCallButtonDropdownSkillName(skillName)).toBe(skillName, "Skill is not found");  
        
        await maxPage.closePopover();
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
                await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.OB_PHONE);
                await TestCondition.setUpAndRemoveSkill(obPhoneAgent, SkillType.OB_PHONE_ALT);
            } catch (err) {
            }
        }

    }, TestRunInfo.conditionTimeout);
});