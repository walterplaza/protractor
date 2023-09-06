import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, MaxState, PageName, SearchColumnName, SearchTimeRange } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { Email } from "@data-objects/inContact/max/email/email-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import InteractionPlayer from "@page-objects/CXone/general/cxone-player";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxEmailPage from "@page-objects/CXone/max/max-email";
import MaxPage from "@page-objects/CXone/max/max-page";
import SearchPage from "@page-objects/CXone/search/search-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: CXone
 * Suite: CXone E2E
 * TC ID: IC-58715
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 * Note:
 */

describe('CXone E2E - IC-58715', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let contactId: number;
    let actualAgents: string;
    let rowAgentName: number;
    let agentsName: string;
    let email: Email = new Email();

    // Declare page object
    let loginPageAdmin: LoginPage;
    let employeesPageAdmin: EmployeesPage;
    let maxPageAdmin: MaxPage;
    let basePage: PageBase;
    let maxEmailAdmin: MaxEmailPage;
    let searchPage: SearchPage;
    let player: InteractionPlayer;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-58715 - CxOne > Screen Record > Outbound Email`);
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agentsName = `${admin.name}`;
        email.initFullData("test@email.com", "Test Subject", "Test Body", "");
        basePage = new PageBase();
    }, TestRunInfo.conditionTimeout);

    it('IC-58715 - CxOne Screen Record Outbound Email', async () => {

        // 2. Login access to evolve.
        loginPageAdmin = LoginPage.getInstance();

        // VP: Sig In page is displayed with User name text box
        expect(await loginPageAdmin.isPageDisplayed()).toBe(true, "Login page is not displayed");
        expect(await loginPageAdmin.isUserNameTextBoxDisplayed()).toBe(true, "User name text box is not displayed");

        // 3. In the Sign In page you could see user name entered in step 1 and in the Password text box enter:
        await loginPageAdmin.enterUsername(admin);
        await loginPageAdmin.clickNextButton();
        await loginPageAdmin.enterPassword(admin);

        // VP: 	User name value not editable is displayed, Password text box, Back and Sign In buttons ,  Forgot your password link at the bottom
        expect(await loginPageAdmin.isUserNameTextBoxDisplayed(TestRunInfo.shortTimeout)).toBe(false, "User name value editable is displayed");
        expect(await loginPageAdmin.isPasswordTextBoxEditable()).toBe(true, "Password is not editable");
        expect(await loginPageAdmin.isForgotPasswordDisplayed()).toBe(true, "User name text box is not displayed");
        expect(await loginPageAdmin.isBackButtonDisplayed()).toBe(true, "Back button is not displayed");
        expect(await loginPageAdmin.isSignInButtonDisplayed()).toBe(true, "Sign in button is not displayed");

        // click Sign In button
        employeesPageAdmin = await loginPageAdmin.clickSignInButton();

        // 4. Launch MAX
        maxPageAdmin = await employeesPageAdmin.launchMax();
        await admin.createPhoneNumber();
        await maxPageAdmin.enterLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber, false);
        let actualPhoneNumber = await maxPageAdmin.getEnteredPhone(MaxConnectOption.PHONE);

        // VP: Phone number text box is filled correctly
        expect(admin.phoneNumber).toMatch(actualPhoneNumber, "Phone number doesn't match");

        // Click Connect button
        await maxPageAdmin.connectMax();

        // VP: MAX agent is connected and Agent status is Unavailable
        expect(await maxPageAdmin.getAgentStatus()).toBe(MaxState.UNAVAILABLE.toUpperCase(), "Agent status is not correct")

        // 5. On the bottom of MAX Click New button --> on the field put an email address
        await maxPageAdmin.clickNew();
        await maxPageAdmin.searchAddressBook(email.toAddress);

        // VP: Email address was entered
        expect(await maxPageAdmin.getValueInSearchAddressBook()).toBe(email.toAddress, "Email address is not correct")

        // 6. Press the Email button
        maxEmailAdmin = await maxPageAdmin.selectEmailFromAddressBook(email.toAddress);
        contactId = await TestHelpers.getCurrentContactId(admin, SkillCore.getSkillName(SkillType.OB_EMAIL));

        // VP: The Email is displayed on the Max
        expect(await maxEmailAdmin.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email is not displayed");

        // 7. Fill the Subject of the email and a body.
        await maxEmailAdmin.enterEmailSubject(email.emailSubject);
        await maxEmailAdmin.enterEmailBody(email.emailBody);

        // VP: Subject and body are entered.
        expect(await maxEmailAdmin.getEmailSubject()).toBe(email.emailSubject, "Email subject is not correct");
        expect(await maxEmailAdmin.getEmailContentInEditMode()).toBe(email.emailBody, "Email body is not correct");

        // 8. Click on the send button.
        await maxEmailAdmin.clickSend();

        // VP: Email sent.
        await maxEmailAdmin.waitForContactWorkSpaceDisappeared(ContactName.EMAIL);
        expect(await maxEmailAdmin.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "Email is not sent");

        // 9. In the toolbar of the left side press ADMIN >Search button
        await maxPageAdmin.logOut();
        searchPage = await employeesPageAdmin.gotoSearchPage();

        // VP: The Search page is displayed
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search page is not displayed");

        // 10. Make sure time picker has Today selected and click search icon
        await searchPage.selectTime(SearchTimeRange.TODAY);
        await searchPage.clickSearch();

        // VP: Today recordings are displayed
        expect(await searchPage.isListRecordedSegmentDisplayed()).toBe(true, "Agents who made calls are not listed");

        // 11. Find the ob email sent
        rowAgentName = await searchPage.getAgentRecordIndexByContactID(agentsName, contactId.toString());
        actualAgents = await searchPage.getSearchResult(rowAgentName, SearchColumnName.AGENT_NAME);

        // VP: Segment of recording is found the same contact ID and the same number of segment(1)
        expect(agentsName).toMatch(actualAgents, "Agents who made calls are not listed");

        // 12. Select the segment and click on the play icon
        player = await searchPage.playRecord(rowAgentName);

        // VP: The NICE SaasS player is launch and you are able to see
        // The NICE SaasS player is launch and you are able to see:
        // Agent Name
        // Customer Name
        // Duration
        // Start Time
        // End Time
        // The Body is displayed 
        expect(await player.isEmailAgentNameDisplayed()).toBe(true, "Email agent name is not displayed");
        expect(await player.isEmailDurationDisplayed()).toBe(true, "Email duration time is not displayed");
        expect(await player.isEmailStartTimeDisplayed()).toBe(true, "Email start time is not displayed");
        expect(await player.isEmailEndTimeDisplayed()).toBe(true, "Email end time is not displayed");
        expect(await player.isEmailBodyDisplayed()).toBe(true, "Email body is not displayed");

        // 13. Close the player 
        await player.close();

        // VP: Player is closed
        expect(await player.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Player is displayed.");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout
            await searchPage.logOut();
        } catch (err) { }
        finally {
            try {
                await basePage.closeExcessBrowser();
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});