import { Agent } from "@data-objects/general/agent";
import { Cluster, MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { InboundEmail } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";
import { ISize } from "selenium-webdriver";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 443657
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe("MAX suite - IC-62579", function () {

    TestBase.scheduleTestBase();
    let cluster: Cluster = TestRunInfo.cluster;
    let ibEmailAgent: Agent;
    let ibMail: InboundEmail;
    let emailInboxSize: ISize;
    let serverMail: string;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62579 - [MAX][Resize] Email inbox minimums`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL);
        ibMail = new InboundEmail();
        serverMail = cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);
    }, TestRunInfo.conditionTimeout);

    it('IC-62579 - Email inbox minimums', async () => {

        // 1. Login and Launch MAX
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 2. Send 2 emails to your agent
        await Utility.sendIBEmail(serverMail, ibMail);
        await Utility.sendIBEmail(serverMail, ibMail);

        // Change Max state
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: The emails are created and accepted 
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The emails are not created and accepted ")

        // 3. Using a pixel ruler confirm the email inbox at the time of delivery is around 260 to 265px wide
        emailInboxSize = await maxEmailPage.getSizeEmailInbox();

        // VP: The email inbox is set around 260 to 265px
        expect(maxEmailPage.isWidthSizeEmailInboxCorrect(emailInboxSize.width)).toBe(true, "the email inbox is not set around 260 to 265px");

        // 4. confirm the email inbox is not re-sizeable
        // Expend Email Inbox panel
        await maxEmailPage.resizeMaxByDropAndDrag(200, 0);
        emailInboxSize = await maxEmailPage.getSizeEmailInbox();

        // VP: The email inbox is not re-sizeable  
        expect(maxEmailPage.isWidthSizeEmailInboxCorrect(emailInboxSize.width)).toBe(true, "the email inbox is re-sizeable");

        // Collapse Email Inbox panel
        await maxEmailPage.resizeMaxByDropAndDrag(-500, 0);
        emailInboxSize = await maxEmailPage.getSizeEmailInbox();

        // VP: The email inbox is not re-sizeable  
        expect(maxEmailPage.isWidthSizeEmailInboxCorrect(emailInboxSize.width)).toBe(true, "the email inbox is re-sizeable");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        // Clean up
        try {
            // End Inbound mail contact
            maxPage = await maxEmailPage.endEmailContact(false);
            // End second email
            await maxPage.waitForEmailWorkspace();
            await maxEmailPage.endEmailContact(false);
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



