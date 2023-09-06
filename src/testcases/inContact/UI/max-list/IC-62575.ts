
import { Agent } from "@data-objects/general/agent";
import { MaxConnectOption } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import BusinessUnitDetailsPage from "@page-objects/inContact/central/internal-admin/business-unit/business-unit-detail-tab-page";
import FeatureTabPage from "@page-objects/inContact/central/internal-admin/business-unit/business-unit-feature-tab-page";
import InternalBusinessUnitPage from "@page-objects/inContact/central/internal-admin/business-unit/internal-business-unit-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 459981
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11
 */

describe('MAX suite - IC-62575', function () {

    TestBase.scheduleTestBase();
    let adminAgent: Agent;
    let phoneNumber1: string = "2342342342356";
    let phoneNumber2: string = "#234234234234";
    let phoneNumber3: string = "99988877766655544433123456789876";
    let expectedErrorMsg: string = "Invalid Station or Phone Number";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let internalBusinessUnitPage: InternalBusinessUnitPage;
    let internalBusinessUnitDetailsPage: BusinessUnitDetailsPage;
    let businessUnitFeatureTabPage: FeatureTabPage;


    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62575 - [Update Setup Session page]: Phone number valid and invalid values on MAX and Thin agent`);
        adminAgent = await TestCondition.setUpAgent(SkillType.CONFIG);
        // Pre Conditions: set on Agent Thin
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(adminAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62575 - Update Setup Session page Phone number valid and invalid values on MAX and Thin agent', async () => {

        internalBusinessUnitPage = await centralPage.gotoInternalBusinessUnitPage();
        internalBusinessUnitDetailsPage = await internalBusinessUnitPage.selectBusinessUnit(adminAgent.businessNumber);
        businessUnitFeatureTabPage = await internalBusinessUnitDetailsPage.gotoFeatureTab();
        await businessUnitFeatureTabPage.editFeatureTab();
        await businessUnitFeatureTabPage.setChkThinAgent(true);
        await businessUnitFeatureTabPage.saveFeatureTab();

        // 5. launch agent inC-UI
        maxPage = await businessUnitFeatureTabPage.launchMAX(phoneNumber1);

        // VP: 6. check MAX exists inC-UI
        expect(await maxPage.isPageDisplayed()).toBe(true, "MAX is not launched");

        // 8. logout MAX inC-UI
        centralPage = await maxPage.logOut();

        // 9. select launch agent option inC-UI
        // 10. fill in agent session inC-UI
        // 11. click agent join session button inC-UI
        maxPage = await centralPage.launchMAX(phoneNumber2);

        // VP: 12. check MAX exists inC-UI
        expect(await maxPage.isPageDisplayed()).toBe(true, "MAX is not launched");

        // 14. logout MAX inC-UI
        centralPage = await maxPage.logOut();

        // 15. select launch agent option inC-UI
        // 16. fill in agent session inC-UI
        // 17. click agent join session button inC-UI

        // Workaround for smoke deploy gbu
        if (!await centralPage.isUsingBlueTheme(TestRunInfo.shortTimeout)) {
            await centralPage.launchMAXWithError(phoneNumber3, MaxConnectOption.PHONE);

            // VP: 18. check agent join error message displays inC-UI
            expect(await centralPage.isErrorMessageDisplayed()).toBe(true, "Error message is not displayed");
            expect(await centralPage.getErrorMessage()).toBe(expectedErrorMsg, "Error message is not correct");
        }

        // Workaround for MAX internal gbu
        else if (await centralPage.isUsingBlueTheme(TestRunInfo.shortTimeout)) {
            maxPage = await centralPage.launchMAXWithErrorNewBU(phoneNumber3);

            // VP: 18. check agent join error message displays inC-UI
            expect(await maxPage.isErrorMessageDisplayedNewBU()).toBe(true, "Error message is not displayed");
            expect(await maxPage.getMAXErrorMessage()).toBe(expectedErrorMsg, "Failed by ticket IC-93653 [TestAutomation][inC-UI] Validation error of phone number is displayed incorrect.");

            await maxPage.fillAgentSession(phoneNumber1, MaxConnectOption.PHONE);
            await maxPage.clickContinueButton();
            await maxPage.logOut();
        }

        // Post conditions: set off Agent Thin
        internalBusinessUnitPage = await centralPage.gotoInternalBusinessUnitPage();
        internalBusinessUnitDetailsPage = await internalBusinessUnitPage.selectBusinessUnit(adminAgent.businessNumber, false);
        businessUnitFeatureTabPage = await internalBusinessUnitDetailsPage.gotoFeatureTab();
        await businessUnitFeatureTabPage.editFeatureTab();
        await businessUnitFeatureTabPage.setChkThinAgent(false);
        internalBusinessUnitDetailsPage = await businessUnitFeatureTabPage.saveFeatureTab();

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // logout central
            await internalBusinessUnitDetailsPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(adminAgent, SkillType.CONFIG);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});
