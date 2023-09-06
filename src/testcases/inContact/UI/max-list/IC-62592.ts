import { Agent } from "@data-objects/general/agent";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 437367
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe("MAX suite - IC-62592", function () {

    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62592 - [MAX]MAX OB Phone Call.`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62592 - MAX OB Phone Call', async () => {

        // 1. Launch MAX 
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);

        // 2. From the Glance, click  on the "New" button
        await maxPage.clickNew();

        // VP: Main search text box appears
        expect(await maxPage.isSearchAddressDisplayed()).toBe(true, "Search textbook does not exist");

        // 3. Make a phone call
        maxCall = await maxPage.makeOutboundCall(obPhoneAgent.phoneNumber, SkillType.OB_PHONE);

        // VP: Main controls of inbound call workspace exist
        expect(await maxPage.isIbPhoneIconDisplayed()).toBe(true, "ObPhone Icon is not displayed");
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

        // 4. End contact
        await maxCall.endCallContact();

        // VP: The contact is ended
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, 5)).toBe(false, "The contact is not ended");

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
            } catch (err) {
            }
        }

    }, TestRunInfo.conditionTimeout);
});