import fs = require("fs-extra");
import * as _ from "lodash";
import { Utility } from "@utilities/general/utility";
import { LGReportTestCaseTempResult, TestSuiteResultInfo, TestCaseResultInfo } from "@utilities/new-report/lg-reporter";
import { LGReportConfig } from "@utilities/new-report/lg-hook";
import ProjectPath from "@test-data/general/project-path";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import TestRunInfo from "@data-objects/general/test-run-info";
import { ConfigReport } from "@utilities/report-email/config-report";

export class HTMLBuilder {
    private static numberOfSuite: number = LGReportConfig.allSuite.length;
    private static numberOfPassedSuite: number = 0;
    private static numberOfFailedSuite: number = 0;
    private static numberOfKnowBugSuite: number = 0;
    private static numberOfSpec: number = 0;
    private static numberOfPassedSpec: number = 0;
    private static numberOfFailedSpec: number = 0;
    private static numberOfFailedWithBugSpec: number = 0;

    private static failTemplate: string = "";
    private static htmlTemplate: string = "";
    private static suiteTemplate: string = "";
    private static specTemplate: string = "";
    private static specDetailTemplate: string = "";
    private static specMessageTemplate: string = "";
    private static specMsgPicTemplate: string = "";
    private static emailTemplate: string = "";
    private static emailTestCaseTemplate: string = "";

    private static resultPath: string = `${ProjectPath.conf}/test/reports/chrome-test-report.html`;
    private static jsonResultPath: string = `${ProjectPath.conf}/test/reports/jsonResult.json`;
    private static emailResultPath: string = `${ProjectPath.conf}/test/reports/emailHtml/chrome-email-report.html`;

    public static async getTimeDurationFormat(duration: number): Promise<string> {
        let timeTotalSecond: number = Math.round(duration / 1000);
        let hour: number = parseInt((timeTotalSecond / 3600).toString());
        let minus: number = parseInt(((timeTotalSecond - (hour * 3600)) / 60).toString());
        let second: number = parseInt((timeTotalSecond - (hour * 3600) - minus * 60).toString());
        return "" + (hour >= 10 ? hour : `0${hour}`) + ":" + (minus >= 10 ? minus : `0${minus}`) + ":" + (second >= 10 ? second : `0${second}`);
    }

    public static async getDurationTime(timeFist: string, timeSecond: string): Promise<string> {
        let timeInMili = new Date(timeSecond).getTime() - new Date(timeFist).getTime();
        return this.getTimeDurationFormat(timeInMili);
    }

    public static async returnTimeString(dateTime: any): Promise<string> {
        let hourTemp = (dateTime.split("T"))[1]
        if (hourTemp.indexOf("-") > -1) {
            let arr = hourTemp.split("-");
            arr = arr[1].split(":")
            let time = arr[0].replace("-", "")
            return ((((new Date(new Date(dateTime).getTime() - parseInt(time) * 3600 * 1000)).toString().split("."))[0]))
        } else {
            let arr = hourTemp.split("+");
            arr = arr[1].split(":")
            let time = arr[0].replace("+", "")
            return ((((new Date(new Date(dateTime).getTime() + parseInt(time) * 3600 * 1000)).toString().split("."))[0]))
        }
    }

    public static async getBugErrorMessage(testCaseID, errorMess = ""): Promise<string> {
        let jsonPath: string = Utility.getPath(`src/test-data/bug-data/bug-data.json`);
        let data = require(jsonPath);

        for (let dataBug of data) {
            let data = dataBug.Data;
            for (let b = 0; b < data.length; b++) {
                let testCaseIDs = data[b].TestcaseID;
                let testcaseErrors = data[b].TestcaseError

                for (let a = 0; a < testCaseIDs.length; a++) {
                    if (testCaseIDs[a] == testCaseID) {
                        for (let c = 0; c < testcaseErrors.length; c++) {
                            if (errorMess.indexOf(testcaseErrors[c]) > -1) {
                                return `Failed by Bug: ${dataBug.BugIdJira} - ${dataBug.BugDescription}`
                            }
                        }
                    }
                }
            }
        }

        return ""
    }

    public static async getTotalBasicInfo(): Promise<string> {
        let allSuiteInfo: string = ""
        for (let suite of LGReportConfig.allSuite) {
            let testCases = suite.testCasesInSuite;
            this.numberOfSpec += testCases.length;
            let suiteInfo: string = "";
            if (suite.status == "finished") {
                let tempCountFailed: number = 0;
                for (let testCase of testCases) {
                    if (testCase.status == "passed") {

                    } else if (testCase.status == "failed") {
                        tempCountFailed++;
                    }
                }

                if (tempCountFailed > 0) {
                    this.numberOfFailedSuite++;
                    suite.status = "failed";
                } else {
                    this.numberOfPassedSuite++;
                    suite.status = "passed"
                }
            } else if (suite.status == "pending") {

            }
            allSuiteInfo += await this.writeSuiteResult(suite)
        }
        return allSuiteInfo;
    }

    public static async getTotalEmailHtmlBasicInfo(): Promise<string> {
        let allSpecInfo: string = "";
        let count = 0;
        for (let suite of LGReportConfig.allSuite) {
            let testCases = suite.testCasesInSuite;
            for (let testCase of testCases) {
                count++;
                allSpecInfo += await this.writeEmailSpecResult(testCase, count)
            }
        }
        return allSpecInfo;
    }

    public static async buildTemplate(): Promise<void> {
        try {
            await Utility.delay(10);
            await this.prepareTemplate();
            let suiteInfoResult = await this.getTotalBasicInfo();
            let result = {
                LG_BROWSER_INFO: LGReportConfig.environment.browserName,
                LG_PLATFORM_INFO: LGReportConfig.environment.platform,
                LG_CLUSTER_INFO: TestRunInfo.clusterID,
                LG_GBU_INFO: TestRunInfo.gbu,
                LG_GBU_ENV: TestRunInfo.environment,
                LG_TENANT_NAME: TestRunInfo.tenantName,
                LG_RUN_TITLE: "",
                LG_GENERATE_TIME: await this.returnTimeString(LGReportTestCaseTempResult.getTimeForJira()),
                LG_TEST_STARTTIME: new Date(LGReportTestCaseTempResult.timeRun),
                LG_TEST_ENDTIME: new Date(LGReportTestCaseTempResult.timeFinish),
                LG_PRODUCT_NAME: "Html Reporter",
                LG_PRODUCT_VERSION: "1.0 - 08/07/2019",
                LG_ENV_ENTRIES: "",
                LG_NUMBER_OF_TESTS: this.numberOfSuite,
                LG_TEST_DURATION: await this.getTimeDurationFormat(LGReportTestCaseTempResult.timeFinish - LGReportTestCaseTempResult.timeRun),
                LG_NUM_OF_PASSED: this.numberOfPassedSpec,
                LG_NUM_OF_FAILED: this.numberOfFailedSpec,
                LG_NUM_OF_SKIPPED: 0,
                LG_NUM_OF_DISABLED: 0,
                LG_NUM_OF_ERROR: 0,
                LG_NUM_OF_BUG: this.numberOfFailedWithBugSpec,
                LG_TEST_DETAIL: suiteInfoResult,
                LG_NUM_OF_PASSED_SUITES: this.numberOfPassedSuite,
                LG_NUM_OF_FAILED_SUITES: this.numberOfFailedSuite,
                LG_NUM_OF_PASSED_CHECKPOINTS: 0,
                LG_NUM_OF_FAILED_CHECKPOINTS: 0,
                LG_NUM_OF_SKIPPED_CHECKPOINTS: 0,
                LG_NUM_OF_ERROR_CHECKPOINTS: 0,
                LG_SHOW_GBU_INFO: "",
                LG_SHOW_TENANT_INFO: ""
            };

            let suiteEmailInfoResult = await this.getTotalEmailHtmlBasicInfo();
            let emailResult = {
                LG_BROWSER_INFO: LGReportConfig.environment.browserName,
                LG_PLATFORM_INFO: LGReportConfig.environment.platform,
                LG_CLUSTER_INFO: TestRunInfo.clusterID,
                LG_GBU_INFO: TestRunInfo.gbu,
                LG_GBU_ENV: TestRunInfo.environment,
                LG_TENANT_NAME: TestRunInfo.tenantName,
                LG_NUMBER_OF_TESTS: this.numberOfPassedSpec + this.numberOfFailedSpec + this.numberOfFailedWithBugSpec,
                LG_TEST_DURATION: await this.getTimeDurationFormat(LGReportTestCaseTempResult.timeFinish - LGReportTestCaseTempResult.timeRun),
                LG_NUM_OF_PASSED: this.numberOfPassedSpec,
                LG_NUM_OF_FAILED: this.numberOfFailedSpec,
                LG_NUM_OF_BUG: this.numberOfFailedWithBugSpec,
                LG_NUM_OF_SKIPPED: 0,
                LG_NUM_OF_DISABLED: 0,
                LG_NUM_OF_ERROR: 0,
                LG_TEST_DETAIL: suiteEmailInfoResult,
                LG_SHOW_GBU_INFO: "",
                LG_SHOW_TENANT_INFO: ""
            }

            if (emailResult.LG_GBU_ENV == "CXONE") {
                result.LG_SHOW_GBU_INFO = "hidden";
                emailResult.LG_SHOW_GBU_INFO = "hidden";
            } else if (emailResult.LG_GBU_ENV == "INCONTACT") {
                result.LG_SHOW_TENANT_INFO = "hidden";
                emailResult.LG_SHOW_TENANT_INFO = "hidden";
            }

            console.log(`Write file html report`)
            fs.writeFileSync(this.resultPath, await this.interpolate(this.htmlTemplate, result), "utf-8");
            console.log(`Write file email html report`)
            fs.writeFileSync(this.emailResultPath, await this.interpolate(this.emailTemplate, emailResult), "utf-8");

            if (ConfigReport.pushResultToXray == true) {
                console.log(`Write file json report`)
                fs.writeFileSync(this.jsonResultPath, await this.writeJsonResult(), "utf-8");
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.buildTemplate, err.message);
        }
    }

    private static async writeJsonResult(): Promise<string> {
        try {
            let xrayTests = []
            for (let suite of LGReportConfig.allSuite) {
                let testCases = suite.testCasesInSuite;
                for (let testCase of testCases) {
                    let xrayTest = {
                        "testKey": `${testCase.testCaseID}`,
                        "start": `${testCase.startTime}`,
                        "finish": `${testCase.endTime}`,
                        "comment": `${testCase.failedExpectation}`,
                        "status": `${testCase.status == "passed" ? "PASS" : "FAIL"}`,
                        "executedBy": "UCN\\_TFSLab",
                    }
                    xrayTests.push(xrayTest)
                }
            }

            let jsonResultString =
                `{ "info": 
                        { "version": "${LGReportTestCaseTempResult.xrayJiraTestInfo.Version != "" ? LGReportTestCaseTempResult.xrayJiraTestInfo.Version : ""}",
                        "startDate": "${LGReportTestCaseTempResult.timeSuiteStartXray}",
                        "testEnvironments":
                            [ "${TestRunInfo.clusterID}",
                            "${TestRunInfo.gbu}",
                            "${TestRunInfo.environment}",
                            "${TestRunInfo.tenantName}" ],
                        "testPlanKey": "${LGReportTestCaseTempResult.xrayJiraTestInfo.TestPlanKey}",
                        "description": "${LGReportTestCaseTempResult.xrayJiraTestInfo.TestPlanKey} ${LGReportTestCaseTempResult.xrayJiraTestInfo.TestExecutionTitle}",
                        "summary": "Test Execution of ${LGReportTestCaseTempResult.xrayJiraTestInfo.TestPlanKey} ${LGReportTestCaseTempResult.xrayJiraTestInfo.Version} ${LGReportTestCaseTempResult.xrayJiraTestInfo.Revision}",
                        "finishDate": "${LGReportTestCaseTempResult.timeSuiteEndXray}",
                        "revision": "${LGReportTestCaseTempResult.xrayJiraTestInfo.Revision}"
                        },
                    "tests": ${JSON.stringify(xrayTests)}
                }`

            return jsonResultString
        } catch (err) {
            throw new errorwrapper.CustomError(this.writeJsonResult, err.message);
        }
    }

    private static async writeEmailSpecResult(testCase: TestCaseResultInfo, noN: number): Promise<string> {
        try {
            let testCaseResult = {
                LG_TEST_DURATION: await this.getDurationTime(testCase.startTime, testCase.endTime),
                LG_TEST_NO: noN,
                LG_ID: testCase.testCaseID,
                // LG_STATUS: testCase.status,
                LG_STATUS: testCase.status.charAt(0).toUpperCase() + testCase.status.substring(1),
                LG_SPEC_TEXT: testCase.testCaseSummary,
                LG_SPEC_STATUS: testCase.status.toLocaleUpperCase(),
                LG_SPEC_START: testCase.startTime,
                LG_SPEC_END: testCase.endTime,
                LG_TEST_COLOR: testCase.status == "passed" ? "green" : "red"
            };
            return await this.interpolate(this.emailTestCaseTemplate, testCaseResult);
        } catch (err) {
            throw new errorwrapper.CustomError(this.writeEmailSpecResult, err.message);
        }
    }

    private static async prepareTemplate(): Promise<void> {
        try {
            this.htmlTemplate =
                fs.readFileSync(await this.getTemplateHtml("MasterTemplate.html"), "utf8");
            this.suiteTemplate =
                fs.readFileSync(await this.getTemplateHtml("TestSuiteTemplate.html"), "utf8");
            this.specTemplate =
                fs.readFileSync(await this.getTemplateHtml("TestCaseTemplate.html"), "utf8");
            this.specDetailTemplate =
                fs.readFileSync(await this.getTemplateHtml("TestCaseDetailTemplate.html"), "utf8");
            this.specMessageTemplate =
                fs.readFileSync(await this.getTemplateHtml("MessageTemplate.html"), "utf8");
            this.specMsgPicTemplate =
                fs.readFileSync(await this.getTemplateHtml("PictureTemplate.html"), "utf8");
            this.failTemplate =
                fs.readFileSync(await this.getTemplateHtml("FailTemplate.html"), "utf8");
            this.emailTemplate =
                fs.readFileSync(await this.getTemplateHtml("EmailMasterTemplate.html"), "utf8");
            this.emailTestCaseTemplate =
                fs.readFileSync(await this.getTemplateHtml("EmailTestCaseTemplate.html"), "utf8");
        } catch (err) {
            throw new errorwrapper.CustomError(this.prepareTemplate, err.message);
        }
    }

    /**
     * Get template html path for Report
     * @private
     * @static
     * @param {string} template
     * @returns {Promise<string>}
     * @memberof HTMLBuilder
     */
    private static async getTemplateHtml(template: string): Promise<string> {
        try {
            return Utility.getPath(`src/utilities/new-report/templates/${template}`);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTemplateHtml, err.message);
        }
    }

    public static async setStatusResult(suiteResult: any): Promise<any> {
        if (suiteResult.LG_STATUS == "passed") {
            suiteResult.LG_TEST_STATUS_CLS = "badge-success";
            suiteResult.LG_TEST_STATUS_CLS_TEXT = "text-success";
            suiteResult.LG_TEST_STATUS = "Passed";
            suiteResult.LG_CSS_ICO_STATUS = "glyphicon-ok";
        } else if (suiteResult.LG_STATUS == "failed") {
            suiteResult.LG_TEST_STATUS_CLS = "badge-danger";
            suiteResult.LG_TEST_STATUS_CLS_TEXT = "text-danger";
            suiteResult.LG_TEST_STATUS = "Failed";
            suiteResult.LG_CSS_ICO_STATUS = "glyphicon-remove";
        } else if (suiteResult.LG_STATUS == "pending" || suiteResult.LG_STATUS === "disabled") {
            suiteResult.LG_TEST_STATUS_CLS = "badge-warning";
            suiteResult.LG_TEST_STATUS_CLS_TEXT = "text-warning-disable";
            suiteResult.LG_TEST_STATUS = "Skipped";
            suiteResult.LG_CSS_ICO_STATUS = "glyphicon-ban-circle";
        } else if (suiteResult.LG_STATUS == "Known Bug") {
            suiteResult.LG_TEST_STATUS_CLS = "badge-warning text-white";
            suiteResult.LG_TEST_STATUS_CLS_TEXT = "text-warning";
            suiteResult.LG_TEST_STATUS = "Known Bug";
            suiteResult.LG_CSS_ICO_STATUS = "glyphicon-ban-circle";
        }
        return suiteResult;
    }

    private static async writeSuiteResult(suite: TestSuiteResultInfo): Promise<string> {
        try {
            let testCases = suite.testCasesInSuite;
            let suiteResult = {
                LG_ID: suite.id,
                LG_STATUS: suite.status,
                LG_TEST_NAME: suite.fullName,
                LG_TEST_START: suite.startTime,
                LG_TEST_END: suite.endTime,
                LG_TEST_DURATION: await this.getDurationTime(suite.startTime, suite.endTime),
                LG_TEST_URL: "",
                LG_TEST_DETAIL: "",
                LG_TEST_STDOUT: "",
                LG_NUM_OF_PASSED: "",
                LG_NUM_OF_BUG: "",
                LG_NUM_OF_FAILED: "",
                LG_NUM_OF_PASSED_SUITES: 0,
                LG_NUM_OF_FAILED_SUITES: 0,
                LG_MAPPED_TITLE: "Suite",
                LG_TEST_STATUS_CLS: "",
                LG_TEST_STATUS_CLS_TEXT: "",
                LG_TEST_STATUS: "",
                LG_CSS_ICO_STATUS: ""
            };

            let arrTestCaseResultStatus: Array<string> = [];

            for (let testCase of testCases) {
                if (testCase.status == "failed") {
                    let errorMes = await this.getBugErrorMessage(testCase.testCaseID, testCase.failedExpectation);
                    if (errorMes != "") {
                        this.numberOfFailedWithBugSpec++;
                        testCase.status = "Known Bug"
                        testCase.failedExpectation += `. ${errorMes}`
                    } else {
                        this.numberOfFailedSpec++;
                    }
                } else if (testCase.status == "passed") {
                    this.numberOfPassedSpec++;
                }

                arrTestCaseResultStatus.push(testCase.status);

                let temp = await this.writeSpecResult(testCase)
                suiteResult.LG_TEST_DETAIL += temp;
            }

            if (arrTestCaseResultStatus.indexOf("failed") < 0 && arrTestCaseResultStatus.indexOf("Known Bug") < 0 && arrTestCaseResultStatus.indexOf("passed") > -1) {
                suiteResult.LG_STATUS = "passed";
            } else if (arrTestCaseResultStatus.indexOf("failed") < 0 && arrTestCaseResultStatus.indexOf("Known Bug") > -1 && arrTestCaseResultStatus.indexOf("passed") < 0) {
                suiteResult.LG_STATUS = "Known Bug";
            } else {
                suiteResult.LG_STATUS = "failed";
            }

            suiteResult = await this.setStatusResult(suiteResult);
            return await this.interpolate(this.suiteTemplate, suiteResult);
        } catch (err) {
            throw new errorwrapper.CustomError(this.writeSuiteResult, err.message);
        }
    }

    private static async writePictureResult(detail: any): Promise<string> {
        try {
            let detailResult = {
                LG_TEST_SCREENSHOT_NAME: detail.LG_TEST_SCREENSHOT_NAME,
                LG_IS_SCRSH_HIDDEN: ""
            };

            return await this.interpolate(this.specMsgPicTemplate, detailResult);
        } catch (err) {
            throw new errorwrapper.CustomError(this.writeSpecResult, err.message);
        }
    }

    private static async writeMessageResult(detail: any): Promise<string> {
        try {
            let detailResult = {
                LG_TEST_MESSAGES: detail.LG_TEST_MESSAGES,
            };

            return await this.interpolate(this.specMessageTemplate, detailResult);
        } catch (err) {
            throw new errorwrapper.CustomError(this.writeMessageResult, err.message);
        }
    }

    private static async writeSpecResult(testCase: TestCaseResultInfo): Promise<string> {
        try {
            let specResult = {
                LG_TEST_DURATION: await this.getDurationTime(testCase.startTime, testCase.endTime),
                LG_ID: testCase.testCaseID,
                LG_STATUS: testCase.status,
                LG_SPEC_TEXT: testCase.testCaseSummary,
                LG_SPEC_STATUS: testCase.status,
                LG_SPEC_START: testCase.startTime,
                LG_SPEC_END: testCase.endTime,
                LG_MAPPED_TITLE: "Test Case",
                LG_TEST_DETAIL: "",
                LG_TEST_STATUS_CLS: "",
                LG_TEST_STATUS_CLS_TEXT: "",
                LG_TEST_STATUS: "",
                LG_CSS_ICO_STATUS: "",
            };

            specResult.LG_TEST_DETAIL = await this.buildSpecDetailReport(testCase);
            specResult = await this.setStatusResult(specResult);
            return await this.interpolate(this.specTemplate, specResult);
        } catch (err) {
            throw new errorwrapper.CustomError(this.writeSpecResult, err.message);
        }
    }

    private static async buildSpecDetailReport(testCase: TestCaseResultInfo): Promise<string> {
        try {
            let failedCount = testCase.failedExpectation != "" ? 1 : 0;
            let detailResult = {
                LG_TEST_DURATION: await this.getDurationTime(testCase.startTime, testCase.endTime),
                LG_PASSED_CHECKS_NUMBER: testCase.passedExpectation.length,
                LG_TOTAL_CHECKS_NUMBER: testCase.passedExpectation.length + failedCount,
                LG_TEST_MESSAGES: testCase.failedExpectation,
                LG_TEST_SCREENSHOT_NAME: testCase.errorPictureName,
                LG_IS_MSG_HIDDEN: "hidden",
                LG_IS_SCRSH_HIDDEN: "",
                LG_TEST_DETAIL: "",
            };

            if (detailResult.LG_TEST_SCREENSHOT_NAME != "") {
                detailResult.LG_IS_MSG_HIDDEN = "";
            }

            if (testCase.status == "failed" || testCase.status == "Known Bug") {
                detailResult.LG_TEST_MESSAGES = await this.writeMessageResult(detailResult)
                detailResult.LG_TEST_DETAIL = await this.writePictureResult(detailResult);
            }

            return await this.interpolate(this.specDetailTemplate, detailResult);
        } catch (err) {
            throw new errorwrapper.CustomError(this.buildSpecDetailReport, err.message);
        }
    }

    private static async interpolate(template: string, varMap: { [key: string]: any }): Promise<string> {
        _.templateSettings.interpolate = /\${([\s\S]+?)}/g;
        const compiled = _.template(template);
        return compiled(varMap);
    }
}
