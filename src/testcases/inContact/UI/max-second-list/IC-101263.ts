import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import SkillsDetailPage from "@page-objects/inContact/central/routing/skills/skills-detail-page";
import SkillsListPage from "@page-objects/inContact/central/routing/skills/skills-list-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxWorkItemPage from "@page-objects/inContact/max/max-workitem-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 389314
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('MAX suite - IC-101263', function () {
    let skillListPage: SkillsListPage;
    let detailPage: SkillsDetailPage;

    // Declare Page object
    TestBase.scheduleTestBase();
    let workItemAgent: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxWorkItemPage: MaxWorkItemPage;
    let textUrl: string = "https://www.google.com";
    let Json: string = `{"useScreenPops": true, "useCustomScreenPops": true, "screenPopType": "webpage","screenPopDetails": "${textUrl}"}`;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101263 - MAX> WI> Screen Pop> Panel = on> WI Contacts with screen pops must be opened upon delivery to the agent`);
        workItemAgent = await TestCondition.setUpAgent(SkillType.WORK_ITEM, null, null, Json);

    }, TestRunInfo.conditionTimeout);

    it('IC-101263 - MAX WI Screen Pop Panel On WI Contacts with screen pops must be opened upon delivery to the agent', async () => {

        // Prerequisite(s)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(workItemAgent);

        // 2. Login on MAX
        maxPage = await centralPage.launchMAX(workItemAgent.phoneNumber);

        // VP: Max works
        expect(await maxPage.isPageDisplayed()).toBe(true, "Max does not work");

        // 3. Set panel = on in Max
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxPanelsSetting(State.ON, false,TestRunInfo.middleTimeout);

        // Wait for popover stable
        await Utility.delay(TestRunInfo.shortTimeout);
        // Close more tool bar
        await maxPage.closePopover();

        // 4. Generate a WI contact
        await maxPage.changeState(MaxState.AVAILABLE);
        await TestHelpers.startWorkItemContact(workItemAgent);
        await maxPage.waitForNewContactPopUp();

        // VP: Accept pop up shows
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up is not displayed");

        // 5. Accep WI contact
        maxWorkItemPage = await maxPage.acceptNewWorkItemContact()

        // VP: MAX opens the WI
        expect(await maxWorkItemPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM)).toBe(true, "WorkItem working space is not  displayed");

        // 6. Observe MAX
        // VP: Screen pop is in the panel (at the right side of the WI workspace), and the panel is opened automatically - delivered open
        expect(await maxWorkItemPage.isScreenPopsDisplayed()).toBe(true, "Screen Pops is not displayed");
        expect(await maxWorkItemPage.getScreenPopsTitle()).toContain(textUrl, "Screen Pops title is not displayed correctly");
        expect(await maxWorkItemPage.isScreenPopPositionedAtRightSide()).toBe(true, "Screen Pops is not positioned correctly");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Post-condition
            await maxWorkItemPage.endWorkItemContact();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(workItemAgent, SkillType.WORK_ITEM);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



