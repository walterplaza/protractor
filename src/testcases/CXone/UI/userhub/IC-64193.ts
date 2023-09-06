import { CustomerWorkspace } from "@data-objects/CXone/acd/customer_workspace";
import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import BusinessUnitDetailsPage from "@page-objects/CXone/acd/acd-configuration/business-unit-details-page";
import ACDMenu from "@page-objects/CXone/acd/acd-general/acd-menu";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { EditMode } from "@data-objects/general/general";
import PageBase from "@page-objects/page-base";

/** 
 * Type: CXone
 * Suite: UserHub
 * TC ID: IC-64193
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */

describe("UserHub - IC-64193", function () {
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let chatAgent: Agent;
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage
    let maxPage: MaxPage;
    let acdMenu: ACDMenu;
    let pageBase = new PageBase();
    let acdBUDetailPage: BusinessUnitDetailsPage
    let customerWorkspace1 = new CustomerWorkspace().initData('InContact', 'https://www.niceincontact.com/');
    let customerWorkspace2 = new CustomerWorkspace().initData('News', 'http://news.com');
    let customerWorkspace3 = new CustomerWorkspace().initData('HellWorld', 'http://world.com');
    let customerWorkspace4 = new CustomerWorkspace().initData('Network', 'http://network.com');
    let centralWindowHandle: string;
    let maxWindowHandle: string;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-64193 - [MAX][UserHub][Glance][Custom Workspace] Verify that Label of the configured URL is displayed on Custom Workspace section.`);
        chatAgent = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_OBPHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-64193 - MAX Userhub Glance Verify that Label of the configured URL is displayed on Custom Workspace section', async () => {
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(chatAgent);
        centralWindowHandle = await pageBase.getCurrentWindowHandle();
        acdMenu = await employeesPage.gotoACDPage();

        // 1. Open your Business Unit Profile
        acdBUDetailPage = await acdMenu.gotoBusinessUnitPage();

        // VP: The BU Profile opens.
        expect(await acdBUDetailPage.isBusinessUnitDetailsPageDisplayed()).toBe(true, "The BU Profile does not open");

        // 2. In "Details" Tab click on "Edit" button
        await acdBUDetailPage.editBusinessDetailPage();

        // VP: The "Detail" Tab in in edit mode.
        expect(await acdBUDetailPage.getModeBusinessUnitPage()).toBe(EditMode.EDIT, "The Detail Tab in in read mode")

        // 3. Go to "MAX Setting" section
        // VP: Verify the there is the label:
        // "Custom Workspaces (Up to 3 links)"
        expect(await acdBUDetailPage.isNumberCustomerLabelDisplayed()).toBe(true, "There is not the label Custom Workspace (Up to 3 links)")

        // "Add Custom Workspace" button
        expect(await acdBUDetailPage.isAddCustomerWorkspaceButtonDisplayed()).toBe(true, "There is not Add Custom Workspace button");

        // Three possible BU-level "Custom Workspace"
        await acdBUDetailPage.addCustomerWorkspace(customerWorkspace1, customerWorkspace2, customerWorkspace3, customerWorkspace4);
        expect(await acdBUDetailPage.isCustomerWorkspaceByIndex(4, TestRunInfo.shortTimeout)).toBe(false, "The fourth customer workspace is displayed");
        await acdBUDetailPage.removeAllCustomerWorkspace();

        // 4. Click on "Add Custom Workspace" button
        await acdBUDetailPage.clickAddCustomerWorkspaceButton()
 
        // VP: Verify:
        // a "Label" text value
        expect(await acdBUDetailPage.isLabelCustomerWorkspaceDisplayed()).toBe(true, "The 'Label' text is not displayed");

        // a “text box” for enter an URL
        expect(await acdBUDetailPage.isURLCustomerWorkspaceDisplayed()).toBe(true, "The URL text is not displayed");

        // a “remove quick link” button
        expect(await acdBUDetailPage.isRemoveCustomerWorkspaceButtonDisplayed()).toBe(true, "The 'remove quick link' is not displayed");

        // a “preview quick link” button are displaying
        expect(await acdBUDetailPage.isCustomerWorkspacePreviewButtonDisplayed()).toBe(true, "The 'remove quick link' is not displayed");

        // 5. Enter an URL in the “text box"
        // 6. Enter a Label on the "Label text Box" 
        await acdBUDetailPage.fillCustomerWorkspace(customerWorkspace1);

        // VP: Verify the URL is displayed in the “text box"
        expect(await acdBUDetailPage.getEnteredUrlCustomerWorkspace()).toBe(customerWorkspace1.url, "the URL is not displayed in the text box");

        // VP: Verify that the Label is displayed on the "text box"
        expect(await acdBUDetailPage.getEnteredLabelCustomerWorkspace()).toBe(customerWorkspace1.label, "the label is not displayed in the text box");

        // 7. Click on "Done" button
        await acdBUDetailPage.saveBusinessUnit();

        // VP: Verify the Detail Tab is now in read mode.
        expect(await acdBUDetailPage.getModeBusinessUnitPage()).toBe(EditMode.READ, "Detail Tab is now in edit mode")

        // 8. Go to "MAX Setting" section
        // VP: Verify the URLs entered in steps 6, 7 and 8 displays in MAX Settings> "Custom Workspace" field.
        expect(await acdBUDetailPage.getCustomerWorkspaceDetailsByIndex(1)).toContain(customerWorkspace1.label + customerWorkspace1.url, "MAX Settings shows Custom configured Workspace field.");

        // 9. Complete Pre-Condition *2*
        await chatAgent.createPhoneNumber();
        maxPage = await employeesPage.launchMax();
        maxWindowHandle = await pageBase.getCurrentWindowHandle();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, chatAgent.phoneNumber);

        // VP: MAX is launched with the FIRST CW configured auto opened.
        expect(await maxPage.getCustomerWorkspacePanelTitle()).toContain(customerWorkspace1.label.toLocaleLowerCase(), "MAX is launched with the FIRST CW configured auto is not opened");

        // 10. In the Glance, go to  "Custom Workspace" Section 
        // VP: Verify that all the configured URL has a Label that are displayed on the "Custom Workspace" Section
        await maxPage.showMaxGlance();
        expect(await maxPage.isCustomerWorkspaceLabelDisplayed(customerWorkspace1.label)).toBe(true, "The configured URL does not have a Label that are displayed on the Custom Workspace Section");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        await pageBase.switchWindowByHandle(centralWindowHandle);
        await employeesPage.gotoACDPage();
        await acdMenu.gotoBusinessUnitPage();
        await acdBUDetailPage.editBusinessDetailPage();
        await acdBUDetailPage.removeAllCustomerWorkspace();
        await acdBUDetailPage.saveBusinessUnit();
        await pageBase.switchWindowByHandle(maxWindowHandle);
        await maxPage.refreshMaxPage();
        await maxPage.logOut();
        await employeesPage.logOut();
        try {
        }
        catch (err) { }
        finally {
            try {               
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});