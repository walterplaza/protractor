import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { ContactName, TransferTab } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { SkillCore } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { ContactType } from "@data-objects/inContact/central/reporting-analytics/canned-reports/active-contacts-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import ActiveContactsPage from "@page-objects/inContact/central/reporting-analytics/canned-reports/active-contacts-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";


/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 268725
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe("MAX suite - IC-62671", function () {

    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let pageBase = new PageBase();
    let centralHandle: string;
    let maxHandle: string;
    let callContactId: number;
    let obPhone1: string = "(400) 001-0001";
    let obPhone2: string = "(400) 515-0002";
    let obPhone3: string = "(400) 515-0003";
    let obPhone4: string = "(400) 515-0004";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let activeContactsPage: ActiveContactsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62671 - [MAX] > NWay > Multi-party Conference >Hang up call doesn't end other conversations`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    it(`IC-62671 - MAX NWay Multi party Conference Hang up call doesn't end other conversations`, async () => {

        // 2. Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneAgent);
        centralHandle = await pageBase.getCurrentWindowHandle();

        // 3. Launch MAX
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);
        maxHandle = await pageBase.getCurrentWindowHandle();

        // 4. Click on the New Button (Select Call is agent has an ob phone skill)
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.PHONE_CALL);

        // VP: Address book opens
        expect(await maxPage.isAddressBookDisplayed()).toBe(true, " Address book is not opened");

        // 5. Type in a telephone number into the text box. Place an outbound call to the number entered by clicking the "Call" button and selecting an outbound call type.
        maxCall = await maxPage.makeOutboundCall(obPhone1, SkillType.OB_PHONE);
        await maxCall.waitForCallDialling();
        callContactId = await CustomAPIs.getCurrentContactId(obPhoneAgent, SkillCore.getSkillName(SkillType.OB_PHONE));

        // VP: Contact status changes to "Outbound Contact" (see this on Reporting/Analytics> Canned Reports> ActiveContacts) and timer for call begins. 
        await pageBase.switchWindowByHandle(centralHandle);
        activeContactsPage = await centralPage.gotoActiveContacts();
        expect(await activeContactsPage.isActiveContactDisplayed(callContactId, ContactType.OUTBOUND)).toBe(true, "Contact status not changes to 'Outbound Contact'");

        // VP: Outbound calling shows "Dialing" and a timer begins for dialing time. The "Hang Up" button becomes active.
        await pageBase.switchWindowByHandle(maxHandle);
        expect(await maxCall.isToTalContactTimeDisplayed()).toBe(true, "Total contact time is not displayed");
        expect(await maxCall.isHangUpDisabled(TestRunInfo.shortTimeout)).toBe(false, "Hang up button is disabled");

        // 6. When the Call is answered, Click the "Hold" button to put the Outbound individual on hold.
        await maxCall.clickHoldButton();

        // VP: The call does not end. The "Resume" button replaces the "Hold" button. "Holding" shows and a timer appears where "Dialing" and its timer had been. The "Hang Up" button is not active.
        expect(await maxCall.isCallHeld()).toBe(true, "The call is not held");
        expect(await maxCall.isHoldTitleDisplayed()).toBe(true, "'Holding' title is not shown");
        expect(await maxCall.isHoldTimerDisplayed()).toBe(true, "Hold timer is not appeared");
        expect(await maxCall.isHungUpDisplayed()).toBe(true, "The 'Hang Up' button is not displayed");

        // VP: The "New" button becomes active for the Agent.
        await maxCall.showMaxGlance();
        expect(await maxCall.isNewButtonDisabled(TestRunInfo.shortTimeout)).toBe(false, "Failed by ticket IC-77031 [TestAutomation][inC-UI] The 'New' button is disabled after clicking Hold button");
        await maxCall.hideMaxGlance();

        // 7. Click the Transfer/Conf button
        await maxCall.clickTransferConferenceButton();

        // VP: Address book opens; Text box for direct dial number, with tabs: Recent, Top Hits, My Team and Other
        expect(await maxCall.isAddressBookDisplayed()).toBe(true, " Address book is not opened");
        expect(await maxCall.isSearchFieldOnTopAddressBook()).toBe(true, "Search field is not on the top of address book address book");
        expect(await maxCall.isAdvancedAddressBookTabDisplayed(TransferTab.RECENT)).toBe(true, "History tab field doesn't display in address book");
        expect(await maxCall.isAdvancedAddressBookTabDisplayed(TransferTab.MY_TEAM)).toBe(true, "My team tab field doesn't display in address book")
        expect(await maxCall.isAdvancedAddressBookTabDisplayed(TransferTab.OTHER)).toBe(true, "Other field doesn't display in address book");

        // 8. Type in a telephone number into the text box. Place an outbound call to the number entered by clicking the "Call" button 
        await maxCall.inputAddressBook(obPhone2);
        await maxCall.callExternalTransfer(obPhone2);

        // VP: Contact status changes to "Hold" and timer for Hold continue. 
        expect(await maxCall.isHoldTitleDisplayed()).toBe(true, "'Holding' title is not shown");
        expect(await maxCall.isHoldTimerDisplayed()).toBe(true, "Hold timer is not appeared");

        // 9. Click "Conference" button
        await maxCall.clickConference();

        // VP: Calls become conferences
        await maxCall.isConferenceDisplayed();

        // 10. Click "Add Contact" button
        await maxCall.clickAddContactButton();

        // VP: Address book opens
        expect(await maxPage.isAddressBookDisplayed()).toBe(true, "Address book is not opened");

        // 11. Type in a telephone number into the text box. Place an outbound call to the number entered by clicking the "Call" button 
        await maxCall.inputAddressBook(obPhone3)
        await maxCall.callExternalTransfer(obPhone3);

        // VP: Call is placed, and contact pane is added to existing call panel; all contacts (calls) are immediately in conference
        expect(await maxCall.checkNewCallActive(obPhone3)).toBe(true, "The third Outbound individual is not active");

        // 12. Repeat steps 10-11 with a different Outbound phone number.
        await maxCall.addContactConference(obPhone4);

        // VP: The On-Hold Outbound individual should be "Holding" and the second Outbound individual should be active.
        expect(await maxCall.checkNewCallActive(obPhone4)).toBe(true, "The fourth Outbound individual is not active");

        // 13. Click the hang up button on any of the individual contacts
        await maxCall.clickHangUpWithPhoneNumber(obPhone3);

        // VP: Only specified contact is disconnected
        expect(await maxCall.checkNewCallActive(obPhone3, TestRunInfo.shortTimeout)).toBe(false, "The third Outbound individual is active");

        // 14. Verify that conference is still active
        // VP: Conference still active without patron dropped in step 13
        expect(await maxCall.isConferenceDisplayed()).toBe(true, "Conference is not active without main patron");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        // Clean up
        try {
            await maxCall.endConference();
            await maxCall.endCallContactConference();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});