import { State } from "@data-objects/general/general";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { DispositionName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import SkillsDetailPage from "@page-objects/inContact/central/routing/skills/skills-detail-page";
import { TestCondition } from "@test-helpers/test-condition";
import SkillsListPage from "@page-objects/inContact/central/routing/skills/skills-list-page";
import postContactPage from "@page-objects/inContact/central/routing/skills/post-contact-page";
import CustomAPIs from "@apis/custom-apis";
import TestHelpers from "@test-helpers/test-helpers";
import { Utility } from "@utilities/general/utility";


/** 
 * Type: inContact
 * Suite: MAX-Common > MAX-Phone
 * TC ID: IC-103910
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC6
 */

describe("MAX-Common > MAX-Phone - IC-103910", function () {
    TestBase.scheduleTestBase();
    let ibPhoneReqAgent: Agent;
    let tagId: number;
    let skillID: number;
    let tagName: string;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let maxDispositionPage: MaxDispositionPage;
    let skillListPage: SkillsListPage;
    let skillDetailPage: SkillsDetailPage;
    let postContactPage: postContactPage;


    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-103910 - [MAX] [IB] [Phone] Validate that dispositions are not being shown when udpate from dispositions to Automatic Wrap up`);
        
        // 1. Create an IB Phone with dispositions and tags.
        ibPhoneReqAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, true);
        tagName = Utility.createRandomString(20, "maxAutomation_");
        tagId = await CustomAPIs.createNewSkillTag(ibPhoneReqAgent, tagName, "testTagNotest");
        skillID = await CustomAPIs.getSkillIdFromSkillName(ibPhoneReqAgent, SkillType.IB_Phone);
        await CustomAPIs.assignsATagToASkillID(ibPhoneReqAgent, skillID, tagId);        
    }, TestRunInfo.conditionTimeout);

    it('IC-103910 - [MAX] [IB] [Phone] Validate that dispositions are not being shown when udpate from dispositions to Automatic Wrap up', async () => {

        // Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibPhoneReqAgent);

        // 2. Go to ACD> Skills> "Select your skill"> Post Contact.
        skillListPage = await centralPage.gotoSkillsListPage();            
        skillDetailPage = await skillListPage.selectSkillDetail(SkillType.IB_Phone);                
        postContactPage = await skillDetailPage.gotoPostContactTab();

        // 3. Select Automatic Wrap-up. Note: Do not remove the dispositions.
        await postContactPage.clickAutomaticWrapUpRadioButton();
        await postContactPage.setMaxTimeLimit(5);     
        
        // 4. Click on Save button.
        await postContactPage.clickSave();

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibPhoneReqAgent.phoneNumber);

        // 5. Make an IB call
        await TestHelpers.startInboundCall(ibPhoneReqAgent);        
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: IB  Phone is accepted and Phone Workspace its displayed.
        maxCall = await maxPage.waitForCallWorkspace();  
                                          
        maxDispositionPage = await MaxDispositionPage.getInstance();

        // 6. Click on Dispositions button.
       await  maxDispositionPage.toggleDispositionPopup(State.ON);         

        // Only tags must be displayed.(No dispositions must be shown.)
        expect(await maxDispositionPage.isDispositionAddTagDisplayed()).toBe(true, "Disposition controls is not displayed");
        expect(await maxDispositionPage.isDispositionSelected(DispositionName.DISPOSITION_1)).toBe(false, "Disposition is not selected");

        // save the Disposition and en the call
        await maxDispositionPage.saveDisposition();  
        await maxCall.endCallContact();                    
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
                await TestCondition.setAgentSkillsToDefault(ibPhoneReqAgent, SkillType.IB_Phone);
                await CustomAPIs.removesTagsFromASkillID(ibPhoneReqAgent, skillID, tagId);    
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});