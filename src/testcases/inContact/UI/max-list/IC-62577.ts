import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { EmailButtonTitle, EmailColor, EmailFont, EmailFontSize, EmailMode } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { ISize } from "selenium-webdriver";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 455743
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC1
 * Bug: IC-70045: CFBP1 - [18.5][MAX][VC] Email does not deliver to Agent after being interrupted/parked (Will be fixed 18.7.0.5)
 */

describe("MAX suite - IC-62577", function () {
    TestBase.scheduleTestBase();
    let emailContent: string = "#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ";
    let emailNewContent: string = Utility.createRandomString(15);
    let serverMail: string;
    let ibMail: InboundEmail;
    let ibEmailAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let emailInboxSize: ISize;
    let color: string;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62577 - MAX> SCH> Email Ib> Verify the email reply box is not resizable and is encoding specific characters and the edit controls are displayed on it.`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL);

        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL, "", emailContent);

    }, TestRunInfo.conditionTimeout);

    it('IC-62577 - MAX SCH Email Ib Verify the email reply box is not resizable and is encoding specific characters and the edit controls are displayed on it', async () => {

        // 2. Launch MAX
        loginPage = new LoginPage();
        await ibEmailAgent.createPhoneNumber();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 3. Set the "Available" state in MAX
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX has the available state. 
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Agent status doesn't change to Available");

        // 4. Using the POC of Ib Email Skill, generate an Email contact.The body of Email contact must have special character. 
        // E.g."#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ" 
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Verify the Ib Email has been delivered in MAX. Also verify the body of Email displays all the specials character.
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace is not displayed");
        expect(await maxEmailPage.getEmailContentInReadMode()).toBe(emailContent, "The original body of email doesn't continue to display completely");

        // 5. Click on "Reply" button
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);

        // VP: Verify  the email is in edit mode and you can add text in the body and the original body of email continues to displayed completely.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "The email isn't in edit mode");
        expect(await maxEmailPage.getEmailContentInEditMode()).toContain(emailContent, "The original body of email doesn't continue to display completely");

        // Resize
        emailInboxSize = await maxEmailPage.getSizeEmailInbox();
        await maxEmailPage.resizeMaxByDropAndDrag(200, 0);

        // VP: Also verify the email reply box is not resizable.
        expect(maxEmailPage.isWidthSizeEmailInboxCorrect(emailInboxSize.width)).toBe(true, "The email reply box is resizable.");

        // 6. Add new text in the body and using the Tiny tool give a format, color and size.
        await maxEmailPage.cleanUpEmailContent();
        await maxEmailPage.enterEmailBody(emailNewContent);

        // VP: Verify the Tiny tool displays and we can use it for give format in text.        
        expect(await maxEmailPage.isEmailTinyToolbarDisplays()).toBe(true, "The Tiny tool doesn't display");

        // Format email text
        await maxEmailPage.highLightEmailBodyText();
        await maxEmailPage.changeTextFont(EmailFont.ARIAL);
        expect(await maxEmailPage.getEmailTextStyle()).toContain(EmailFont.ARIAL.toLocaleLowerCase(), "The Tiny tool doesn't give a format");

        // Format email text size
        await maxEmailPage.changeTextFontSize(EmailFontSize.PT_14);
        expect(await maxEmailPage.getEmailTextStyle()).toContain(EmailFontSize.PT_14, "The Tiny tool doesn't give a format");

        // Format mail text color
        color = await maxEmailPage.changeTextColor(EmailColor.YELLOW_GREEN);
        expect(await maxEmailPage.getEmailTextStyle()).toContain(color.toLocaleLowerCase(), "The Tiny tool doesn't give a format");

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