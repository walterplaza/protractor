import { Agent } from "@data-objects/general/agent";
import { Cluster } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: SMOKE Test
 * TC ID: IC-62707
 * Tested browser: -
 * Tested OS: Windows 10
 * Tested cluster: -
 * Note:
 * - Blocked by ticket IC-30149: Failed to login to the Sonus gateway when using softphone
 */

describe("MAX suite - IC-62665", function () {

    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let cluster: Cluster = TestRunInfo.cluster;
    let searchname: string = 'SmokeDeploy 002';

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62665 - MAX > IE > Address book entries not showing up initially when searching for contacts in Max History.`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);

    }, TestRunInfo.conditionTimeout);

    it('IC-62665 - MAX IE Address book entries not showing up initially when searching for contacts in Max History.', async () => {

        // 1. Central login let loginPage: LoginPage = LoginPage.getInstance();
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(obPhoneAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);

        // 3. Place an outbound call
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.PHONE_CALL);
        await maxPage.makeOutboundCall(cluster.outboundNumber, SkillType.OB_PHONE);
        maxCall = await maxPage.waitForCallWorkspace();

        // VP: OB call placed
        expect(await maxCall.isCallWorkspaceDisplayed()).toBe(true, "Call workspace is not displayed");

        // 4.  Open address book (Click Xfer/Conf)
        await maxCall.clickTransferConferenceButton();

        // VP: Address book opens
        expect(await maxCall.isAddressBookDisplayed()).toBe(true, "Address book is not displayed");

        // 5. Observe address book entries
        await maxCall.fillTransferAddress(searchname);

        // VP: Address book entries are displayed as expected
        expect(await maxCall.isNoResultMsgDisplayed(1)).toBe(false, "There is no contact displayed");

        // Close Transfer/Conference address book
        await maxCall.closePopover();

        // Hang up call
        await maxCall.clickEndContactButton();

        // End contact
        maxPage = await maxCall.clickConfirmEndContactButton();
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
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