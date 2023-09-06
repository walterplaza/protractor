
import {Agent} from "@data-objects/general/agent"
import TestRunInfo from "@data-objects/general/test-run-info"
import CentralPage from "@page-objects/inContact/central/general/central-page"
import LoginPage from "@page-objects/inContact/central/general/login-page"
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import {FunctionType,Logger} from "@utilities/general/logger"
import MaxMoreToolsPage from "@page-objects/inContact/max/max-more-tools-page"
import { ToolbarButton, ToolsOption } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 437380
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe('MAX suite - IC-62586', function () {
    TestBase.scheduleTestBase();
    let agent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxMoreToolsPage: MaxMoreToolsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62586 - Max More Event Log`);
        agent = await TestCondition.setUpAgent(SkillType.CHAT);
        
        // login specific skill user inC-UI
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);

    }, TestRunInfo.conditionTimeout);

    it('IC-62586 - Max More Event Log', async () => {

        // launch agent inC-UI
        maxPage = await centralPage.launchMAX(agent.phoneNumber);

        // 2. open toolbar in MAX inC-UI
        maxMoreToolsPage = await maxPage.openToolbarButton(ToolbarButton.MORE);

        // 3. select MAX more tool options inC-UI
        await maxMoreToolsPage.showMoreTools(ToolsOption.EVENT_LOG);

        // VP: 4. check event log inC-UI
        expect(await maxMoreToolsPage.isButtonClearEventLogDisplayed()).toBe(true,"More event log does not exists");
        expect(await maxMoreToolsPage.isHeaderEventLogDisplayed()).toBe(true,"More event log does not exists");
        expect(await maxMoreToolsPage.isLabelEventLogSessionDisplayed()).toBe(true,"More event log does not exists");
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