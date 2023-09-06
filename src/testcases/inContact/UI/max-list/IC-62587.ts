
import {Agent} from "@data-objects/general/agent"
import TestRunInfo from "@data-objects/general/test-run-info"
import CentralPage from "@page-objects/inContact/central/general/central-page"
import LoginPage from "@page-objects/inContact/central/general/login-page"
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import {FunctionType,Logger} from "@utilities/general/logger"
import MaxMoreToolsPage from "@page-objects/inContact/max/max-more-tools-page"
import { ToolbarButton } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 4373\79
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe('MAX suite - IC-62587', function () {
    TestBase.scheduleTestBase();
    let agent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxMoreToolsPage: MaxMoreToolsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62587 - Max More Information Log`);
        agent = await TestCondition.setUpAgent(SkillType.CHAT);
        
        // login specific skill user inC-UI
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);

    }, TestRunInfo.conditionTimeout);

    it('IC-62587 - Max More Information', async () => {

        // launch agent inC-UI
        maxPage = await centralPage.launchMAX(agent.phoneNumber);

        // 2. open toolbar in MAX inC-UI
        maxMoreToolsPage = await maxPage.openToolbarButton(ToolbarButton.MORE);

        // 3. select MAX more tool options inC-UI
        await maxMoreToolsPage.goToMoreInformation();

        // Vp: 4. check more information inC-UI
        expect(await maxMoreToolsPage.isHeaderInformationDisplayed()).toBe(true,"Header Information in More Information does not exists");
        expect(await maxMoreToolsPage.isLabelAgentIDDisplayed()).toBe(true,"Agent ID in More Information does not exists");
        expect(await maxMoreToolsPage.isLabelStationIDDisplayed()).toBe(true,"Station ID in More Information does not exists");
        expect(await maxMoreToolsPage.isLabelPhoneNumberDisplayed()).toBe(true,"Phone Number in More Information does not exists");
        expect(await maxMoreToolsPage.isLabelCallerIDDisplayed()).toBe(true,"Caller ID in More Information does not exists");
        expect(await maxMoreToolsPage.isLabelCurrentContactsDisplayed()).toBe(true,"Current Contacts in More Information does not exists");
        expect(await maxMoreToolsPage.isLabelBrowserLanguageDisplayed()).toBe(true,"Browser Language in More Information does not exists");
        expect(await maxMoreToolsPage.isLabelBrowserVersionDisplayed()).toBe(true,"Browser Version in More Information does not exists");
        expect(await maxMoreToolsPage.isLabelVersionDisplayed()).toBe(true,"Version in More Information does not exists");
        expect(await maxMoreToolsPage.isLabelSessionIDDisplayed()).toBe(true,"Session ID in More Information does not exists");
        expect(await maxMoreToolsPage.isLabelAgentLegIDDisplayed()).toBe(true,"Agent Leg ID in More Information does not exists");
        expect(await maxMoreToolsPage.isLabelWebserverDisplayed()).toBe(true,"Web Server in More Information does not exists");
        expect(await maxMoreToolsPage.isLabelVirtualClusterDisplayed()).toBe(true,"Virtual Cluster in More Information does not exists");
        expect(await maxMoreToolsPage.isLabelBrowserLocalizationDisplayed()).toBe(true,"Browser Localization in More Information does not exists");
        expect(await maxMoreToolsPage.isLabelCurrentTimeTimezoneDisplayed()).toBe(true,"Current Time Timezone in More Information does not exists");
        expect(await maxMoreToolsPage.isLabelTeamNameDisplayed()).toBe(true,"Team Name in More Information does not exists");
        expect(await maxMoreToolsPage.isLabelRoutingDisplayed()).toBe(true,"Routing in More Information does not exists");
        expect(await maxMoreToolsPage.isLabelConcurrentChatsDisplayed()).toBe(true,"Concurrent Chats in More Information does not exists");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try{   
        // logout MAX inC-UI
        maxPage = await maxMoreToolsPage.closeToolbar()
        centralPage = await maxPage.logOut();

        // logout inC-UI
        await centralPage.logOut();
        }
        catch (err){}
        finally{
        try{
            await TestCondition.setAgentSkillsToDefault(agent, SkillType.CHAT);
        }
        catch (err){
            console.log(err);
        }
    }
    }, TestRunInfo.conditionTimeout);
});