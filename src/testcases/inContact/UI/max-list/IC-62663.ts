import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { InboundEmail } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { EmailButtonTitle } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";
import fs from 'fs';

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 295575
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe("MAX suite - IC-62663", function () {
    TestBase.scheduleTestBase();
    let ibEmailAgent: Agent;

    // Declare page object 
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail

    let strHeaderText: string;
    let strUnderlineText: string;
    let strItalicText: string;
    let strInputFile: string;
    let strInputFilePath: string;
    let strInputContent: string;
    let ibMail: InboundEmail;
    let serverMail: string;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62663 - MAX > Email > Reply > Copy&Paste email reply`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL);
    }, TestRunInfo.conditionTimeout);

    it('IC-62663 - MAX Email Reply Copy&Paste email reply', async () => {

        strHeaderText = "This is a Heading";
        strUnderlineText = "This text is underlined";
        strItalicText = "This text is italic";

        // 1. Read inbound mail content
        strInputFile = "src/test-data/inContact/ibmail-content.txt";
        strInputFilePath = Utility.getPath(strInputFile);
        strInputContent = fs.readFileSync(strInputFilePath, 'utf8');

        // 2. Setup inbound mail with content         
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL, "Automation Test Subject", strInputContent);
        await Utility.sendIBEmail(serverMail, ibMail);

        // 3. Launch MAX
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 4. Send an Email to the agent, and accept it
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Email is accepted
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace is not displayed")

        // 5. Click on 'Reply' button 
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);

        // 6. Copy and paste all email content
        await maxEmailPage.copyPasteAllEmailContents(TestRunInfo.shortTimeout);

        // VP: Verify that the Email is copied and pasted correctly         
        expect(await maxEmailPage.isHeaderTextCopiedPasted(strHeaderText, TestRunInfo.shortTimeout)).toBe(true, "Header text is copied and pasted incorrectly");
        expect(await maxEmailPage.isUnderlineTextCopiedPasted(strUnderlineText, TestRunInfo.shortTimeout)).toBe(true, "Underline text is copied and pasted incorrectly");
        expect(await maxEmailPage.isItalicTextCopiedPasted(strItalicText, TestRunInfo.shortTimeout)).toBe(true, "Italic text is copied and pasted incorrectly");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // 7. Logout pages and clean up
            await maxEmailPage.discardEmailDraft();
            maxPage = await maxEmailPage.endEmailContact(false);
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});