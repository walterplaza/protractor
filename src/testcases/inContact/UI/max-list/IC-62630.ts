import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { InboundEmail } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { EmailButtonTitle, EmailColor, EmailFont, EmailFontSize, EmailMode, EmailTinyToolButton } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 391553
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC1, SC10
 */

describe("MAX suite - IC-62630", function () {

    TestBase.scheduleTestBase();
    let serverMail: string;
    let ibMail: InboundEmail;
    let ibEmailAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let emailNewContent: string = Utility.createRandomString(15);
    let color: string;
    let backgroundColor: string;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62630 - MAX > Email Client > Font Family, Font Sizes, Other Font Features`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL);

        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);

    }, TestRunInfo.conditionTimeout);

    it('IC-62630 - MAX Email Client Font Family Font Sizes Other Font Features', async () => {

        // 2. Launch MAX
        loginPage = new LoginPage();
        await ibEmailAgent.createPhoneNumber();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 3. Send and email to the queue
        await Utility.sendIBEmail(serverMail, ibMail);
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: The contact is created and accepted 
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The contact isn't created and accepted");

        // 4. Click reply on the email client 
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);

        // VP: The email client is in editing mode 
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "The email isn't in edit mode");

        // 5. Click on Font Family 
        await maxEmailPage.cleanUpEmailContent();
        await maxEmailPage.enterEmailBody(emailNewContent);
        await maxEmailPage.highLightEmailBodyText();
        await maxEmailPage.changeTextFont(EmailFont.ARIAL);

        // VP: The Font Family is populated with fonts 
        expect(await maxEmailPage.getEmailTextStyle()).toContain(EmailFont.ARIAL.toLocaleLowerCase(), "The Tiny tool doesn't give a format");

        // 6. Click on Font Sizes 
        await maxEmailPage.changeTextFontSize(EmailFontSize.PT_14);

        // VP: The Font Size is populated with Sizes 
        expect(await maxEmailPage.getEmailTextStyle()).toContain(EmailFontSize.PT_14, "The Tiny tool doesn't give a format");

        // 7. Enter text in the body of the email and highlight it
        // VP: The body text is highlighted 
        expect(await maxEmailPage.getHighLightedEmailBodyText()).toBe(emailNewContent, "The body text isn't highlighted");

        // 8. Click on Font Color, Font Background Color, Bold, Italics, Underline, and Strike Through  
        // VP: The body text is changed in accordance to the function clicked 

        // Change Font color
        color = await maxEmailPage.changeTextColor(EmailColor.YELLOW_GREEN);
        expect(await maxEmailPage.getEmailTextStyle()).toContain(color.toLocaleLowerCase(), "The Tiny tool doesn't give a format");

        //Change Font Background color
        backgroundColor = await maxEmailPage.changeTextBackgroundColor(EmailColor.OLIVE);
        expect(await maxEmailPage.getEmailTextStyle()).toContain(backgroundColor.toLocaleLowerCase(), "The Tiny tool doesn't give a format");

        // Bold
        await maxEmailPage.selectEmailTinyToolButton(EmailTinyToolButton.BOLD);
        expect(await maxEmailPage.isEmailBodyTextInFormat(EmailTinyToolButton.BOLD)).toBe(true, "The Tiny tool doesn't give a format");

        // Italics
        await maxEmailPage.selectEmailTinyToolButton(EmailTinyToolButton.ITALIC);
        expect(await maxEmailPage.isEmailBodyTextInFormat(EmailTinyToolButton.ITALIC)).toBe(true, "The Tiny tool doesn't give a format");

        // Underline
        await maxEmailPage.selectEmailTinyToolButton(EmailTinyToolButton.UNDERLINE);
        expect(await maxEmailPage.getEmailTextStyle()).toContain(EmailTinyToolButton.UNDERLINE.toLocaleLowerCase(), "The Tiny tool doesn't give a format");

        // Strike through
        await maxEmailPage.selectEmailTinyToolButton(EmailTinyToolButton.STRIKETHROUGH);
        expect(await maxEmailPage.isEmailBodyTextInFormat(EmailTinyToolButton.STRIKETHROUGH)).toBe(true, "The Tiny tool doesn't give a format");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // End email
            await maxEmailPage.discardEmailDraft();
            maxPage = await maxEmailPage.endEmailContact(false);

            // Logout MAX
            centralPage = await maxPage.logOut();

            // Logout InContact
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});