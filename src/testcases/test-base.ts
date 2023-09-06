import { PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { ConfigReport } from "@utilities/report-email/config-report";

export default class TestBase {

    public static async scheduleTestBase(webPage: PageName = PageName.LOGIN_PAGE) {

        beforeEach(async () => {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = TestRunInfo.testTimeout;
            await BrowserWrapper.setPageLoadTimeout();

            await Logger.write(FunctionType.NONE, `Initial - Setting Up\n`);
            await this.navigateToWebPage(TestRunInfo.cluster.getURL(webPage));
        }, TestRunInfo.conditionTimeout);
    };

    public static getTestCaseJiraId(TFSID: string) {
        try {
            let dataTestCaseFile = require(Utility.getPath("src/data-objects/XrayJira/xrayJiraTestCaseMap.json"));
            for (let dataTestCase of dataTestCaseFile) {
                if (dataTestCase.Cluster == TestRunInfo.clusterID && dataTestCase.Internal.ID == TFSID) {
                    return dataTestCase.JiraXray.KeyID;
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTestCaseJiraId, err.message);
        }
    };

    /**
     * Navigate to web url
     * @author Nhat.Nguyen
     * @static
     * @param {string} url
     * @memberof TestBase
     */
    public static async navigateToWebPage(url: string) {
        await BrowserWrapper.restart();
        await BrowserWrapper.maximize();
        await BrowserWrapper.get(url);
    };

    /**
     * Setup test run information
     * @static
     * @memberof TestBase
     */
    public static setUpTestRunInfo() {
        try {
            if (ConfigReport.pushResultToXray) {
                try {
                    console.log(`Set environment for pushing result to Xray`)
                    Utility.setTestEnvironmentByXrayJira()
                } catch (e) {

                }
            }
            let pathFile: string = Utility.getPath("src/test-data/config-info.json");
            TestRunInfo.setUpTestRunInfo(pathFile);
        } catch (err) {
            throw new errorwrapper.CustomError(this.setUpTestRunInfo, err.message);
        }
    }
}
