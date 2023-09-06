import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName, DispositionName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/*Type: inContact
* Suite: MAX suite
* TC ID: 103037
* Tested browser: Chrome, Firefox
* Tested OS: Windows 10
* Tested cluster: TC4
*/

describe("MAX suite - IC-62693", function () {
  TestBase.scheduleTestBase();
  let chatAgent: Agent;
  let note: string = "Test Automation";
  let dispositionName: string = DispositionName.DISPOSITION_1;

  // Declare page object
  let loginPage: LoginPage;
  let centralPage: CentralPage;
  let maxPage: MaxPage;
  let maxChatPage: MaxChatPage;
  let maxDispositionPage: MaxDispositionPage;

  beforeEach(async () => {
    await Logger.write(FunctionType.TESTCASE, "IC-62693 - MAX > Chat Interactions > ACW > Agent can change state from ACW before time is over");
    chatAgent = await TestCondition.setUpAgent(SkillType.CHAT, true);

    // Start a chat
    await TestHelpers.startChatContact(chatAgent);

    // 1. Pre-requisites:
    loginPage = LoginPage.getInstance();
    centralPage = await loginPage.loginInContact(chatAgent);

    maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

    // Change State
    await maxPage.changeState(MaxState.AVAILABLE);
    await maxPage.waitForNewContactPopUp();

    // Accept chat
    maxChatPage = await maxPage.acceptNewChatContact();

  }, TestRunInfo.conditionTimeout);

  it("IC-62693 - MAX Chat Interactions ACW Agent can change state from ACW before time is over", async () => {

    // 2. Click End button 
    maxDispositionPage = await maxChatPage.endChatRequireDisposition();

    // VP: Disposition appears
    expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition panel isn't displayed");

    // 3. Select disposition
    await maxDispositionPage.fillDispositionForm(dispositionName, note);

    // VP: Disposition is selected
    expect(await maxDispositionPage.isDispositionSelected(dispositionName)).toBe(true, "Disposition doesn't selected");

    // 4. Click on Finish button 
    await maxDispositionPage.saveAndCloseDisposition();
    await maxChatPage.waitForContactWorkSpaceDisappeared(ContactName.CHAT);

    // VP: Agent state should be changed to next agent state and all chat controls should be removed
    expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT, TestRunInfo.shortTimeout)).toBe(false, "Chat working space is still displayed");
    expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Agent state doesn't changed to next agent state")
  });

  afterEach(async () => {
    await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
    try {
      // Log out max and central pages
      centralPage = await maxPage.logOut();
      await centralPage.logOut();
    }
    catch (error) { }
    finally {
      try {
        await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
      }
      catch (error) { }
    }
  }, TestRunInfo.conditionTimeout);
});
