import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import PageBase from "@page-objects/page-base";


/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 444291
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101237", function () {
    TestBase.scheduleTestBase();
    let obPhoneReqAgent: Agent;
    let dispositionNote: string = "Test Automation";
    let obPhone1: string = "(400) 001-0001";
    let glanceWidthBeforeContact: number;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let maxDispositionPage: MaxDispositionPage;
    let basePage: PageBase;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101237 - [MAX] [SCH] [OB] [Phone] Generate a OB Phone Contact with Disposition`);
        obPhoneReqAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE, false, true);
        basePage = new PageBase();
    }, TestRunInfo.conditionTimeout);

    it('IC-101237 - MAX SCH OB Phone Generate a OB Phone Contact with Disposition', async () => {

        // Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneReqAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(obPhoneReqAgent.phoneNumber);
        glanceWidthBeforeContact = await maxPage.getMaxGlanceSize();

        // 3 .Set the "Available" state
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX is in available state
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.AVAILABLE, "MAX isn't in available state");

        // 4. Generate a OB Phone Contact- Go to 'New+' button- Enter a valid number- Press 'Call' button 
        await maxPage.clickNew();
        maxCall = await maxPage.makeOutboundCall(obPhone1, SkillType.OB_PHONE);
        await maxCall.waitForCallWorkspace();

        // VP: Verify The OB Phone Contact delivery in MAX without errors. The workspace is shown according to the attached picture. Check the controls, colors, labels and size.
        expect(await maxPage.isCallWorkspaceDisplayed()).toBe(true, "OB Phone workspace is not displayed");
        expect(await maxCall.isToTalContactTimeDisplayed()).toBe(true, "ToTal Contact Time is not displayed");
        expect(await maxCall.isCustomerContactIconDisplayed()).toBe(true, "Customer Contact Icon is not displayed");
        expect(await maxCall.isCustomerContactLabelDisplayed()).toBe(true, "Customer Contact Label is not displayed");
        expect(await maxCall.isAniDisplayed()).toBe(true, "Ani is not displayed");
        expect(await maxCall.isHoldButtonDisplayed()).toBe(true, "Hold button is not displayed");
        expect(await maxCall.isMuteButtonDisplayed()).toBe(true, "Mute button is not displayed");
        expect(await maxCall.isMaskButtonDisplayed()).toBe(true, "Mask button is not displayed");
        expect(await maxCall.isRecordButtonDisplayed()).toBe(true, "Record button is not displayed");
        expect(await maxCall.isCommitButtonDisplayed()).toBe(true, "Commit button is not displayed");
        expect(await maxCall.isTransferContactButtonDisplayed()).toBe(true, "Transfer Contact button is not displayed");
        expect(await maxCall.isEndButtonDisplayed()).toBe(true, "End Contact button is not displayed");
        expect(await maxCall.isLaunchButtonDisplayed()).toBe(true, "Launch button is not displayed");
        expect(await maxCall.isKeyPadDisplayed()).toBe(true, "Key Pad is not displayed");
        expect(await maxCall.getMaxWrapPanelSize()).toBeGreaterThan(glanceWidthBeforeContact, "Panel doesn't resize into interaction window space as before the contact routed and panels resized");

        maxDispositionPage = new MaxDispositionPage();
        await maxDispositionPage.toggleDispositionPopup(State.ON);
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition form  is not displayed");
        await maxDispositionPage.toggleDispositionPopup(State.OFF);

        // 5. Hang up the Call
        maxDispositionPage = await maxCall.hangUpCallACW();

        // VP: Verify the pop over of disposition displays automatically.
        expect(await maxCall.isDispositionDisplayed()).toBe(true, "Disposition controls is not displayed");

        // VP: Verify the ACW time configured in disposition begins to run in countdown.
        expect(await maxCall.isACWTimerCountCorrectly()).toBe(true, "The ACW time configured in disposition doesn't count down.");

        // 6. Select a disposition and click on "Save" button
        await maxDispositionPage.saveAndCloseDisposition();

        // wait for ACW time out
        await basePage.waitInSecond(15);

        // VP: When the ACW time configured in disposition has been completed, verify the Ob Phone workspace closes and MAX displays the glance.
        expect(await maxPage.isCallWorkspaceDisplayed()).toBe(false, "OB Phone workspace is displayed");

        // VP: Verify that MAX still displaying the same size before start the OB Phone Contact.
        expect(await maxPage.getMaxGlanceSize()).toBe(glanceWidthBeforeContact, "MAX isn't displaying the same size before start the OB Phone Contact");

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