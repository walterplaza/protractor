import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { ContactName, DispositionName } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import ContactHistoryPage from "@page-objects/inContact/central/reporting-analytics/canned-reports/contact-history-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 417154
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11, HC18 
 */

describe("MAX suite - IC-101256", function () {

    TestBase.scheduleTestBase();
    let ibPhoneReqAgent: Agent;
    let ibPhoneReqAgent2: Agent;
    let callContactId: number;
    let dispositionNote: string = "Test Automation";
    let pageBase: PageBase;
    let homeWindowHandle: string;
    let maxWindowHandle: string;

    // Declare page object
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let maxDispositionPage: MaxDispositionPage;
    let contactHistoryPage: ContactHistoryPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101256 - MAX>Dispositions>reports`);
        ibPhoneReqAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, true);
        ibPhoneReqAgent2 = await TestCondition.setUpAgent(SkillType.CHAT, true);
        await TestCondition.setUpAndAssignSkill(ibPhoneReqAgent2, SkillType.IB_Phone, true);

        // Pre-condition
        // Login Incontact        
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibPhoneReqAgent);
        pageBase = new PageBase();
        homeWindowHandle = await pageBase.getCurrentWindowHandle();

    }, TestRunInfo.conditionTimeout);

    it('IC-101256 - MAX Dispositions reports', async () => {

        // 1. Launch MAX
        maxPage = await centralPage.launchMAX(ibPhoneReqAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // 2. Send a Call to your agent setup with dispositions        
        await TestHelpers.startInboundCall(ibPhoneReqAgent2);
        maxCall = await maxPage.waitForCallWorkspace();
        await maxCall.waitForCallDialling();
        callContactId = await CustomAPIs.getCurrentContactId(ibPhoneReqAgent, SkillCore.getSkillName(SkillType.IB_Phone));

        // VP: The call is sent to the agent
        expect(await maxCall.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.middleTimeout)).toBe(true, "Call is not routed to agent");

        // 3. Select a Dispo and save it before the call ends
        maxDispositionPage = new MaxDispositionPage();
        await maxDispositionPage.toggleDispositionPopup(State.ON);
        await maxDispositionPage.submitDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

        // VP: The dispo is saved
        expect(await maxDispositionPage.isDispositionFormDisplayed(TestRunInfo.shortTimeout)).toBe(false, "The dispo is not saved");

        // 4. Change your next state to unavailable, EX a break
        await maxCall.showMaxGlance();
        await maxCall.changeState(MaxState.UNAVAILABLE);

        // VP: The next state is changed
        expect(await maxCall.getMAXNextState()).toBe(MaxState.UNAVAILABLE, "Next stage is not changed");

        // 5. End the call
        await maxCall.endCallContact();
        await maxCall.waitForContactWorkSpaceDisappeared(ContactName.PHONE_CALL, TestRunInfo.shortTimeout);

        // VP: The call is ended
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "Call is not ended");

        // 6. Check the contact history report for the disposition selected
        maxWindowHandle = await pageBase.getCurrentWindowHandle();
        await pageBase.switchWindowByHandle(homeWindowHandle);
        await centralPage.gotoCustomReportingScheduleListPage();
        contactHistoryPage = await centralPage.gotoContactHistoryPage();
        await contactHistoryPage.clickApplyOptionsButton();
        await contactHistoryPage.waitForContactWithInfoDisplay(callContactId, DispositionName.DISPOSITION_1);

        // VP: The disposition is shown on the contact history report
        expect(await contactHistoryPage.isContactDisplayed(callContactId, DispositionName.DISPOSITION_1, TestRunInfo.shortTimeout)).toBe(true, "Failed by ticket IC-29695 [TestAutomation][inC-UI] No primary disposition data is recorded after making inbound call with required disposition. Primary disposition data does not display");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout Max
            await pageBase.switchWindowByHandle(maxWindowHandle);
            await maxPage.logOut();

            // Logout InContact            
            await centralPage.logOut();

        } catch (err) { }
        finally {
            try {
                await CustomAPIs.endAllContacts(ibPhoneReqAgent);
                await TestCondition.setAgentSkillsToDefault(ibPhoneReqAgent, SkillType.IB_Phone);
                await TestCondition.setUpAndRemoveSkill(ibPhoneReqAgent2, SkillType.IB_Phone);
                await TestCondition.setAgentSkillsToDefault(ibPhoneReqAgent2, SkillType.CHAT);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});