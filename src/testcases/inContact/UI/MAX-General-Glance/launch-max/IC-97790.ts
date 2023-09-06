import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import StationsPage from "@page-objects/inContact/central/admin/stations/stations-page";
import StationDetailsPage from "@page-objects/inContact/central/admin/stations/station-details-page";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: General(Glance) > launch-max
 * TC ID: IC-97790
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC6
 */

describe('General(Glance) > launch-max - IC-97790', function () {
    TestBase.scheduleTestBase();
    let agent: Agent;
    let currentDate = new Date();
    let date: string;
    let tempPhoneNumber: string;
    let tempStationName: string; 
    let tempCalleId: string;
    let tempAgentName: string;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let stationDetailsPage: StationDetailsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-97790 - [MAX] [Station ID] Validate that on Station History the details of login with Phone number are being shown `);
        agent = await TestCondition.setUpAgent(SkillType.IB_Phone);
    }, TestRunInfo.conditionTimeout);

    it('IC-97790 - [MAX] [Station ID] Validate that on Station History the details of login with Phone number are being shown .', async () => {
        
        tempPhoneNumber = "4000010088";
        tempStationName = "MaxAutomationStation3";
        tempAgentName = "Max03 IbPhone"; 
        tempCalleId = "12345";
        date = Utility.formatDateTime(currentDate.toString(), "ddd MMM DD YYYY hh:mm:ss", "M/D/YYYY");

        // 1. Precondition - Login to Central 
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);

        // 1. Launch MAX
        maxPage = await centralPage.launchMAX(tempPhoneNumber);

        // 2. Log out MAX
        centralPage = await maxPage.logOut();

        // 3. In central go to ACD>ACD settings> and click on "Station".
        let stationsPage: StationsPage = await centralPage.gotoStationsPage();

        // 4. Select your station and click on it.
        stationDetailsPage = await stationsPage.selectStation(tempStationName);

        // 5. select Login History tab
        await stationDetailsPage.selectLoginHistoryTab();
          
        // 5.1 search for user phone number
        await stationDetailsPage.searchLoginHistory(tempPhoneNumber);

        // VP: Phone Number - Caller ID (the caller ID used in the station ID Creation.) - Agent Name - Login Date.   
        expect(await stationDetailsPage.isLoginHistoryValueLogged(tempPhoneNumber)).toBe(true, "Phone number is not correct");
        expect(await stationDetailsPage.isLoginHistoryValueLogged(tempCalleId)).toBe(true, "Caller ID name is not correct");        
        expect(await stationDetailsPage.isLoginHistoryValueLogged(tempAgentName)).toBe(true, "Agent name is not correct");
        expect(await stationDetailsPage.isTodayLoginHistoryValueLogged(date)).toBe(true, "Login for today was not created");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Log out MAX
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.IB_Phone);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});