import { Agent } from "@data-objects/general/agent";
import { MaxConnectOption } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import BusinessUnitDetailsPage from "@page-objects/inContact/central/internal-admin/business-unit/business-unit-detail-tab-page";
import FeatureTabPage from "@page-objects/inContact/central/internal-admin/business-unit/business-unit-feature-tab-page";
import InternalBusinessUnitPage from "@page-objects/inContact/central/internal-admin/business-unit/internal-business-unit-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import CustomAPIs from "@apis/custom-apis";

/** 
 * Type: CXone
 * Suite: UserHub
 * TC ID: IC-90828
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC1
 * Note:
 * - Failed by ticket IC-30149: Failed to login to the Sonus gateway when using softphone
 */

describe("UserHub - IC-90828", function () {

    TestBase.scheduleTestBase();
    let admin: Agent;
    let outboundPhoneNumber: string = "8012440005";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let internalBusinessUnitPage: InternalBusinessUnitPage;
    let detailBusinessUnitDetailsPage: BusinessUnitDetailsPage;
    let featureTabPage: FeatureTabPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let pageBase: PageBase;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-90828 - [MAX][SoftPhone][HappyPath+Refresh] Generate an OB Phone contact and refresh on the middle`);
        admin = await TestCondition.setUpAgent(SkillType.CONFIG);
        pageBase = new PageBase();
    }, TestRunInfo.conditionTimeout)

    it('IC-90828 - [MAX][SoftPhone][HappyPath+Refresh] Generate an OB Phone contact and refresh on the middle', async () => {

        // Pre-condition
        // Enable Soft phone Feature
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(admin);
        internalBusinessUnitPage = await centralPage.gotoInternalBusinessUnitPage();
        detailBusinessUnitDetailsPage = await internalBusinessUnitPage.selectBusinessUnit(admin.businessNumber);
        featureTabPage = await detailBusinessUnitDetailsPage.gotoFeatureTab();
        detailBusinessUnitDetailsPage = await featureTabPage.setSoftPhoneIntegrated(true);

        // Launch Max Soft phone
        maxPage = await detailBusinessUnitDetailsPage.launchMAX(admin.phoneNumber, MaxConnectOption.SOFT_PHONE);

        // It is necessary to wait at least 1 minute before to generate some contact
        await maxPage.waitForInitializeSoftPhone();

        // 1.  Generate a OB Phone Contact
        // - Go to 'New+' button
        // - Enter a valid number
        // - Press 'Call' button
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.PHONE_CALL);
        await maxPage.makeOutboundCall(outboundPhoneNumber, SkillType.OB_PHONE);
        maxCall = await maxPage.waitForCallWorkspace();

        // VP: Verify the OB Phone Contact delivery in MAX without errors.
        expect(await maxCall.isCallWorkspaceDisplayed()).toBe(true, "Failed by ticket IC-30149: Failed to login to the Sonus gateway when using softphone. The OB Phone Contact does not delivery in MAX");

        // 2. Refresh MAX using F5 or, More> Information> Reload Application
        await pageBase.refreshPage();

        // VP: MAX is refreshed and call is still active and agent still hearing the audio.
        expect(await maxCall.isCallWorkspaceDisplayed()).toBe(true, "Call is not active");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            maxPage = await maxCall.endCallContact();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await CustomAPIs.endAllContacts(admin);
            } catch (err) { }
        }

    }, TestRunInfo.conditionTimeout);
});