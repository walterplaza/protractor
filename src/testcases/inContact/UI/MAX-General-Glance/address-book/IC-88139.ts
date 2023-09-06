import TestBase from "@testcases/test-base";
import CustomAPIs from "@apis/custom-apis";
import inContactAPIs from "@apis/incontact-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { AddressBook, AddressBookEntries } from "@data-objects/inContact/central/admin/users/address-books/address-book";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestHelpers from "@test-helpers/test-helpers";
import MaxCall from "@page-objects/inContact/max/max-call";
import { Browser } from "@data-objects/general/platform";

/** 
 * Type: inContact
 * Suite: General(Glance) > Address Book
 * TC ID: IC-88139
 * Tested browser: Chrome, Firefox, IE, Edge.
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe("General(Glance) > Address Book - IC-88139", function () {

    TestBase.scheduleTestBase();
    let multiSkillsAgent: Agent;

    // Declare page object    
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let addressBookId: number;
    let addressBookEntriesId: number

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-88139 - [MAX] [IC-71155] [Address Book] [OSH] [Phone] Validate that while on Call and click on transfer Email button is disabled inside address book`);
        multiSkillsAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        await TestCondition.setUpAndAssignSkill(multiSkillsAgent, SkillType.OB_EMAIL);
    }, TestRunInfo.conditionTimeout);

    it('IC-88139 - [MAX] [IC-71155] [Address Book] [OSH] [Phone] Validate that while on Call and click on transfer Email button is disabled inside address book', async () => {

        // 1. Pre-Condition 
        // 1.1 Contact with Phone, cell and email assigned (Custom Address Book).
        let addressBook = new AddressBook().initData()
        let addressBookName = addressBook.addressBookName;
        let addressBookEntriesData = new AddressBookEntries().initData(multiSkillsAgent.email);
        let entriesInfo: string = '{"addressBookEntries":[{"firstName":"' + addressBookEntriesData.firstName + '","middleName":"","lastName":"' + addressBookEntriesData.lastName + '","company":"","phone":"4000010045","mobile":"4000010041","email":"' + addressBookEntriesData.email + '"}]}';
        addressBookId = await CustomAPIs.getAddressBookId(multiSkillsAgent, addressBook);
        addressBookEntriesId = await CustomAPIs.getAddressBookEntryId(multiSkillsAgent, addressBookId, entriesInfo);
        let userSkill: APIResponse = await TestHelpers.getAgentsAgentIdSkills(multiSkillsAgent, APIVersion.V9); 
        let assignedSkillId: number = TestHelpers.getSkillIdAssignedToAgent(userSkill);
        let entityId: number = await CustomAPIs.getAddressBookEntitiesId(multiSkillsAgent, addressBookId, "Skill", assignedSkillId); 
        let contactName: string = addressBookEntriesData.firstName + " " + addressBookEntriesData.lastName;

        // 2. Login to Central
        loginPage = new LoginPage();
        await multiSkillsAgent.createPhoneNumber();
        centralPage = await loginPage.loginInContact(multiSkillsAgent);

        // 3. Launch MAX
        maxPage = await centralPage.launchMAX(multiSkillsAgent.phoneNumber);
        
        // 3.1 From the Glance, click  on the "New" button
        await maxPage.clickNew();

        // 3.2 Click on Address book list created
        await maxPage.clickAddressBookTabPanelItem(addressBookName);

        // 3.3 Hover the mouse over a contact with 3 contact types
        await maxPage.hoverCustomAddressBookName(contactName);
        
        // 4. start a phone call 
        await maxPage.clickCustomAddressBookButton("call-phone");
        maxCall = await maxPage.waitForCallWorkspace();

        // 5. click transfer / conf-button
        await maxCall.clickTransferConferenceButton();

        // 6 Click on Address book list created
        await maxPage.clickAddressBookTabPanelItem(addressBookName);

        // 7. Look for a contact with the 3 contact types and select it.
        await maxPage.hoverCustomAddressBookName(contactName);

        // VP: email: disabled, call and movile: enabled.
          
        expect(await maxPage.getCustomAddressBookButtonColor("call-phone")).toBe(maxPage.getAddressBookContactButtonColorByBrowser("enabled", TestRunInfo.browser), "call contact button is not enabled.");        
        expect(await maxPage.getCustomAddressBookButtonColor("call-mobile")).toBe(maxPage.getAddressBookContactButtonColorByBrowser("enabled", TestRunInfo.browser), "movile contact button is not enabled.");
        expect(await maxPage.getCustomAddressBookButtonColor("email")).toBe(maxPage.getAddressBookContactButtonColorByBrowser("disabled", TestRunInfo.browser), "Email contact button is not disabled.");   

        // Close popover
        await maxPage.closePopover();
        await maxPage.waitForPopAddressBookDisappear();

        // End call
        maxPage = await maxCall.endCallContact();        
        
    });

    afterEach(async () => {       
        try {
            // clean up- delete createad address book entries & address book
            await CustomAPIs.removeAddressBookEntities(multiSkillsAgent, addressBookId, addressBookEntriesId);                        
            await CustomAPIs.removeAddressBook(multiSkillsAgent, addressBookId);

            // logout 
            centralPage = await maxPage.logOut();            
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
                await TestCondition.setUpAndRemoveSkill(multiSkillsAgent, SkillType.OB_EMAIL);
                await TestCondition.setAgentSkillsToDefault(multiSkillsAgent, SkillType.OB_PHONE);
            }
            catch (err) {
            }
        }
    }, TestRunInfo.conditionTimeout);
});