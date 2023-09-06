import { Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

/** 
 * Type: inContact
 * Suite: MAX Suite
 * TC ID: 294342
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe('MAX Suite - 294342', function () {
    // TestBase.setUpTestRunInfo();
    // let cluster: Cluster = TestRunInfo.cluster;
    // let agent: Agent = cluster.getAgent(AgentType.IBEMAIL1);
    // let testRunInfo = new TestRunInfo();
    // testRunInfo.agentList = testRunInfo.registerAgents(agent);
    // TestBase.configTestBase(cluster.getURL(PageName.LOGIN_PAGE));


    it('test size', async () => {

        Logger.write("asasd", "await BrowserWrapper.setSize(400, 1024)");
        await BrowserWrapper.setSize(1000, 1000);
        await BrowserWrapper.sleepInSecond(2);

        await BrowserWrapper.setSize(980, 980);
        await BrowserWrapper.sleepInSecond(2);

        await BrowserWrapper.setSize(970, 970);
        await BrowserWrapper.sleepInSecond(2);

        await BrowserWrapper.setSize(965, 965);
        await BrowserWrapper.sleepInSecond(2);



        await BrowserWrapper.setSize(120, 0);
        await BrowserWrapper.sleepInSecond(2);


        await BrowserWrapper.setSize(96, 1024);
        await BrowserWrapper.sleepInSecond(2);

        await BrowserWrapper.setSize(1280, 1024);
        await BrowserWrapper.sleepInSecond(2);

        await BrowserWrapper.maximize();
        //    Logger.write("asasd", "await BrowserWrapper.setSize(1000, 500)");
        //    await BrowserWrapper.setSize(1000, 500);
        //    await BrowserWrapper.sleepInSecond(5);

        //    Logger.write("asasd", "await BrowserWrapper.setSize(600, 800)");
        //    await BrowserWrapper.setSize(600, 800);
        //    await BrowserWrapper.sleepInSecond(5);



    });
});



