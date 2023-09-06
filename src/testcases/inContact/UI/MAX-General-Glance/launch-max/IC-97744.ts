import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import UsersPage from "@page-objects/inContact/central/admin/users/users-page";
import UserDetailsPage from "@page-objects/inContact/central/admin/users/user-details-page";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: General(Glance) > Launch Max
 * TC ID: IC-97744
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC6
 */

describe('General(Glance) > launch-max - IC-97744', function () {
    TestBase.scheduleTestBase();
    let agent: Agent;
    let currentDate = new Date();
    let date: string;
    let tempPhoneNumber: string;
    let tempStationName: string; 
    let tempCalleId: string;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-97744 - [MAX] [Station ID] Validate that using phone number related to Station ID the details of login are being shown on User history`);
        agent = await TestCondition.setUpAgent(SkillType.IB_Phone);
    }, TestRunInfo.conditionTimeout);

    it('IC-97744 - [MAX] [Station ID] Validate that using phone number related to Station ID the details of login are being shown on User history.', async () => {

        tempPhoneNumber = "4000010088";
        tempStationName = "MaxAutomationStation3"; 
        tempCalleId = "12345";
        date = Utility.formatDateTime(currentDate.toString(), "ddd MMM DD YYYY hh:mm:ss", "M/D/YYYY");        

        // 1. Precondition - Login to Central 
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);        

        // 1. Launch MAX        
        maxPage = await centralPage.launchMAX(tempPhoneNumber);

        // 2. Log out MAX
        centralPage = await maxPage.logOut();

        // 3. In central go to Admin>users
        let usersPage: UsersPage = await centralPage.gotoUsersPage();

        // 4. Select your user and click on it
        let userDetailsPage: UserDetailsPage = await usersPage.selectUser(agent.agentID);

        // 5. select Login History
        await userDetailsPage.selectLoginHistoryTab();
          
        // 5.1 search for user phone number
        await userDetailsPage.searchLoginHistory(tempPhoneNumber);
        
        // VP: Phone Number - Caller ID (the caller ID used in the station ID Creation.) - Station Name - Login Date.
        expect(await userDetailsPage.isLoginHistoryValueLogged(tempPhoneNumber)).toBe(true, "Phone number is not correct");
        expect(await userDetailsPage.isLoginHistoryValueLogged(tempCalleId)).toBe(true, "Caller ID name is not correct");        
        expect(await userDetailsPage.isLoginHistoryValueLogged(tempStationName)).toBe(true, "Station name is not correct");
        expect(await userDetailsPage.isTodayLoginHistoryValueLogged(date)).toBe(true, "Login for today was not created");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Log out MAX
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.IB_Phone);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});