import ProjectPath from "@test-data/general/project-path";
import { Utility } from "@utilities/general/utility";
import { LGMatchers } from "@utilities/matcher/LGMatchers";
import { EnvironmentTest, LGReporter, LGReportTestCaseTempResult, TestSuiteResultInfo } from "@utilities/new-report/lg-reporter";
import * as fileSystem from 'fs';

export class LGReport {
    public async configHook(config?: LGReportConfig): Promise<void> {
        beforeAll(async () => {
            await LGReportTestCaseTempResult.setTimeStart();
            jasmine.addMatchers(LGMatchers);
            let mkdirp = require('mkdirp');
            mkdirp(`${ProjectPath.conf}/test/reports/screenshots`, function (err) {
            });
        }, 30000);

        beforeEach(async () => {
            await LGReportTestCaseTempResult.setTimeSpecStart();
            await LGReportTestCaseTempResult.setTimeSuiteStart();

            if (LGReportTestCaseTempResult.errorPictureName != "") {
                await Utility.delay(5)
                LGReportTestCaseTempResult.errorPictureName = "";
            }

        }, 30000);

        afterEach(async () => {
            if (!fileSystem.existsSync(`${ProjectPath.conf}/test/reports/screenshots/` + LGReportTestCaseTempResult.errorPictureName + '.png')) {
                await Utility.delay(5)
            }

            await LGReportTestCaseTempResult.setTimeSpecFinish();
            await LGReportTestCaseTempResult.setTimeSuiteFinish();
        }, 30000);

        afterAll(async () => {
            await LGReportTestCaseTempResult.setTimeEnd();
        }, 30000);

        LGReportConfig.environment = await (new EnvironmentTest()).setValue();

        const env: jasmine.Env = jasmine.getEnv();
        let reporter = new LGReporter();
        env.addReporter(reporter);
    }
}

export class LGReportConfig {
    public static environment: EnvironmentTest = null;
    public static allSuite: Array<TestSuiteResultInfo> = [];
}
