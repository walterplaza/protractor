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

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 455989
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe("MAX suite - IC-101226", function () {
    TestBase.scheduleTestBase();
    let workitemAgent: Agent;
    let textUrl: string = "https://www.google.com";
    let Json: string = `{"useScreenPops": true, "useCustomScreenPops": true, "screenPopType": "webpage","screenPopDetails": "${textUrl}"}`;
    let sizeTolerance: number = 10;
    let workitemSize: number = 309;
    let maxGlanceWithoutContactSize: number = 300;
    let screenPopDefaultSize = 300;
    let maxWorkSpaceSize: number = maxGlanceWithoutContactSize + workitemSize;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxWorkitemPage: MaxWorkItemPage;
    let skillListPage: SkillsListPage;
    let detailPage: SkillsDetailPage;


    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101226 - [MAX][Summer'18][IC-21061][WI -Without Inbox][Whit ContacPanels] Verify the WI Workspace has the 309 px.`);
        workitemAgent = await TestCondition.setUpAgent(SkillType.WORK_ITEM, null, null, Json);
    }, TestRunInfo.conditionTimeout);

    it('IC-101226 - MAX Summer 18 IC-21061 WI -Without Inbox Whit Contact Panels Verify the WI Workspace has the 309 px.', async () => {
        // Requirements:
        // - It must have an Agent 
        // - It must have an IB Work Item skill with a valid POC and a valid script in Studio.
        // - The WI skill must have configured a Screen Pop. (You can set this from your Ib WI Skill> Edit Mode> Screen Pops Section> Check the "Use Screen Pops"> Check the "Use Custom Screen Pops"> Select the "Web Page" radio button> Enter an URL in "Webpage" field) 
        // - everything related with pixels has +/- 10 pixel tolerance

        //Prerequisite(s)
        //3. Login on MAX
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(workitemAgent);

        //4. Start a  Work Item
        await TestHelpers.startWorkItemContact(workitemAgent);

        //5. Launch MAX
        maxPage = await centralPage.launchMAX(workitemAgent.phoneNumber);

        //6. Set Panel = On in MAX
        await maxPage.showMaxGlance();
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxPanelsSetting(State.ON, false);

        //Close more tool bar
        await maxPage.closePopover();
        await maxPage.hideMaxGlance();

        //7. Verify the size of Glance is 300 px (Height)
        expect(await maxPage.isMaxGlanceSizeInRange(maxGlanceWithoutContactSize, 10)).toBe(true, "MAX glance size is not correct");

        //8. Change MAX to Available.
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();
        maxWorkitemPage = await maxPage.acceptNewWorkItemContact();

        //VP: The WI contact has been delivered in agent.
        expect(await maxWorkitemPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM)).toBe(true, "Workitem working space is not displayed");

        //9. Verify the size of WI work space is 309 px (Height)- everything related with pixels has +/- 10 pixel tolerance
        expect(await maxWorkitemPage.isWorkitemSizeInRange(workitemSize, sizeTolerance)).toBe(true, "Workitem size is not correct");

        //10. Verify the size of Panel work space is 300 px (Height) - everything related with pixels has +/- 10 pixel tolerance
        expect(await maxWorkitemPage.isScreenPopSizeInRange(screenPopDefaultSize, sizeTolerance)).toBe(true, "Screen Pops size is not correct");

        //11. Verify the size of WI work space + Panel work space is 609 px (Height)
        expect(await maxWorkitemPage.isMaxWorkSpaceSizeInRange(maxWorkSpaceSize, sizeTolerance)).toBe(true, "MAX workspace size is not correct");

        //12. Using the mouse and drag and drop action, try to change only the size of "WI" work space.
        //13. Using the mouse and drag and drop action, try to change only the size of "Panel" work space.
        await maxPage.resizeMaxByDropAndDrag(100, 0);

        //VP: Verify the WI work space can not be resized.
        expect(await maxWorkitemPage.isWorkitemSizeInRange(workitemSize, sizeTolerance)).toBe(true, "Workitem size is not correct");

        //VP: Verify that the Panel work space is responsive and and it can be resized.
        expect(await maxWorkitemPage.isScreenPopSizeInRange(380, sizeTolerance)).toBe(true, "Screen Pops size is not correct");

        //14. Using the mouse and drag and drop action to the left, try to change the size to the min in MAX, when it has the "WI" work space and "Panel" work pace.
        await maxPage.resizeMaxByDropAndDrag(-600, 0);

        //VP: Verify that the MAX snapback when resized below min, WI returns to his own size 309px.         
        expect(await maxWorkitemPage.isWorkitemSizeInRange(workitemSize, sizeTolerance)).toBe(true, "Workitem size is not correct");
        expect(await maxWorkitemPage.isMaxWorkSpaceSizeInRange(workitemSize, sizeTolerance)).toBe(true, "MAX workspace size is not correct");

        //15. Finish the WI Contact	
        await maxWorkitemPage.endWorkItemContact();

        //VP: Verify the WIwork space and Panel work space have been closed and MAX displays the Glance
        expect(await maxWorkitemPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM)).toBe(false, "Workitem working space is still displayed");

        //16. Using the "Dev Tools" select the Glance in MAX
        //VP: Verify the size of Glance continue being 300 px (Width)
        expect(await maxWorkitemPage.isMaxGlanceSizeInRange(maxGlanceWithoutContactSize, sizeTolerance)).toBe(true, "MAX glance size is not correct");

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            //Clean up
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(workitemAgent, SkillType.WORK_ITEM);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});