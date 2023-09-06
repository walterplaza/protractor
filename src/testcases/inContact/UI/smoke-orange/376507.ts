import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import { SkillCore } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { Folder } from "@data-objects/inContact/central/admin/folders-&-files/browser-files";
import { CallingList } from "@data-objects/inContact/central/personal-connection/lists/calling/calling-list";
import BrowserFilesPage from "@page-objects/inContact/central/admin/folders-&-files/browser-files-page";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import CallingListDetailsPage from "@page-objects/inContact/central/personal-connection/calling-list-detail-page";
import CallingListUploadPage from "@page-objects/inContact/central/personal-connection/calling-list-upload-page";
import CallingPage from "@page-objects/inContact/central/personal-connection/calling-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: SMOKE_Automated_Orange_Full, SMOKE_Automated_Blue_Full
 * TC ID: 376507
 * Tested browser: Chrome, Firefox, IE
 * Tested OS: Windows 10
 * Tested cluster: SC1
 * Note:
 * - Edge: Blocked because cannot upload file due to browser's limitation.
 */

describe("SMOKE_Automated_Orange_OF - 376507", function () {
    TestBase.scheduleTestBase();
    let adminAgent: Agent;
    let callingList: CallingList = new CallingList();
    callingList.initData(SkillCore.getSkillName(SkillType.PC_PHONE));
    let fileName = "SmokeCallingList.csv";

    //Declare page objects
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let browserFilesPage: BrowserFilesPage;
    let callingListUploadPage: CallingListUploadPage;
    let callingPage: CallingPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `376507 - inContact Outbound > Calling Lists > Upload and Verify Process Status > Success`);
        adminAgent = await TestCondition.setUpAgent(SkillType.CONFIG);
        // 1. Central credentials 
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(adminAgent);

    }, TestRunInfo.conditionTimeout);

    it('376507 - inContact Outbound Calling Lists Upload and Verify Process Status Success', async () => {
        // Post-condition: Delete calling list if the calling list is exists.
        browserFilesPage = await centralPage.gotoBrowserFilesPage();
        await browserFilesPage.selectFolder(Folder.CALLING_LISTS);
        await browserFilesPage.deleteCallingListFile(fileName);

        // 3. Go to:  Personal Connection: Lists> Calling
        callingPage = await centralPage.gotoCallingPage();

        // VP: Calling list page should be displayed 
        expect(await callingPage.isPageDisplayed()).toBe(true, "Calling page is not displayed");

        // 4. Click Select File> Accept
        callingListUploadPage = await callingPage.openCallingListUpload();

        // VP: Calling list Upload should be displayed
        expect(await callingListUploadPage.isPageDisplayed()).toBe(true, "Calling List Upload page is not displayed");

        // 5. Fill the fields
        await callingListUploadPage.fillCallingList(callingList);

        // VP: All fields should be filled up 
        expect(await callingListUploadPage.getEnteredListName()).toBe(callingList.listName, "List name doesn't match")
        expect(await callingListUploadPage.getSkillSelected()).toBe(SkillCore.getSkillName(SkillType.PC_PHONE), "Skill is not selected")
        expect(await callingListUploadPage.getUploadedFileName()).toBe(fileName, "List name doesn't match")

        // 6. Click: Next> Be sure the correct columns are mapped and Click Next
        await callingListUploadPage.clickNext();
        await callingListUploadPage.waitForNextStep();
        await callingListUploadPage.clickNext();

        // VP: List Processing should succeeded 
        expect(await callingListUploadPage.getImportStatus()).toBe("Succeeded", "Calling list upload is not succeeded");

        // Post-Condition: Deactivate Calling list
        await callingListUploadPage.gotoCallingPage();
        let callingListDetailsPage: CallingListDetailsPage = await callingPage.openCallingListDetail(callingList.listName);
        await callingListDetailsPage.deactivateCallingList();

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Post-Condition: Delete file after uploading
            await callingPage.gotoBrowserFilesPage();
            await browserFilesPage.selectFolder(Folder.CALLING_LISTS);
            await browserFilesPage.deleteCallingListFile(fileName);
            await browserFilesPage.logOut();
        }
        catch (err) { }
    }, TestRunInfo.conditionTimeout);
});