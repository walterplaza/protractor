import { XrayJiraTestInfo } from "@data-objects/XrayJira/xrayJiraTestInfo";
import { LGReportConfig } from "@utilities/new-report/lg-hook";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { browser } from "protractor";

export enum ItemType {
    suite = "suite",
    spec = "spec",
}

export class EnvironmentTest {
    public browserVersion: string = "";
    public platform: string = "";
    public browserName: string = "";

    constructor() {
    }

    public async setValue(): Promise<this> {
        try {
            let capsPromise = await browser.getCapabilities();
            this.browserVersion = capsPromise.get("browserVersion");
            this.browserName = capsPromise.get("browserName");
            this.platform = capsPromise.get("platformName");
        } catch (err) {

        }
        return this;
    }
}

export class TestCaseResultInfo {
    public id: string = "";
    public fullName: string = "";
    public testCaseID: string = "";
    public testCaseSummary: string = "";
    public failedExpectation: string = "";
    public passedExpectation: Array<any> = [];
    public pendingReason: string = "";
    public status: string = "";
    public startTime: string = "";
    public endTime: string = "";
    public errorPictureName: string = "";

    constructor(result: jasmine.CustomReporterResult) {
        this.id = result.id;
        this.fullName = result.fullName;
        this.testCaseID = this.getTestCaseID(result.description);
        this.testCaseSummary = this.getTestCaseSummary(result.description);
        this.pendingReason = result.pendingReason;
        this.status = result.status;
        this.failedExpectation = this.getError(result.failedExpectations);
        this.passedExpectation = this.getPassedExpectations(result.passedExpectations);
        this.startTime = LGReportTestCaseTempResult.timeSpecStartXray;
        this.endTime = LGReportTestCaseTempResult.timeSpecEndXray;
        this.errorPictureName = LGReportTestCaseTempResult.errorPictureName;
    }

    private getTestCaseID(testCaseDescription: string) {
        let testCaseDescriptionArray = testCaseDescription.split(" ");
        return testCaseDescriptionArray[0].trim();
    }

    private getTestCaseSummary(testCaseDescription: string) {
        let testCaseDescriptionArray = testCaseDescription.split(" ");
        return testCaseDescription.substring(testCaseDescriptionArray[0].trim().length + 2).trim();
    }

    private getError(failedExpectations: Array<any>) {
        return failedExpectations.length > 0 ? failedExpectations[0].message : ""
    }

    private getPassedExpectations(passedExpectations: Array<any>) {
        let listPassedExpectations = [];
        for (let x = 0; x < passedExpectations.length; x++) {
            listPassedExpectations.push(passedExpectations[x].message)
        }
        return listPassedExpectations;
    }
}

export class LGReportTestCaseTempResult {
    static timeSuiteStartXray: string = "";
    static timeSuiteEndXray: string = "";
    static timeSpecStartXray: string = "";
    static timeSpecEndXray: string = "";
    static timeRun: number = 0;
    static timeFinish: number = 0;
    static errorPictureName: string = "";
    static xrayJiraTestInfo: XrayJiraTestInfo = null;

    /**
     * Set time suite start for Report
     * @static
     * @returns {Promise<void>}
     * @memberof LGReportTestCaseTempResult
     */
    static async setTimeSuiteStart(): Promise<void> {
        this.timeSuiteStartXray = this.getTimeForJira();
    }

    /**
     * Set time spec start for Report
     * @static
     * @returns {Promise<void>}
     * @memberof LGReportTestCaseTempResult
     */
    static async setTimeSpecStart(): Promise<void> {
        this.timeSpecStartXray = this.getTimeForJira();
    }

    /**
     * Set time suite finish for Report
     * @static
     * @returns {Promise<void>}
     * @memberof LGReportTestCaseTempResult
     */
    static async setTimeSuiteFinish(): Promise<void> {
        this.timeSuiteEndXray = this.getTimeForJira();
    }

    /**
     * Set time spec finish for Report
     * @static
     * @returns {Promise<void>}
     * @memberof LGReportTestCaseTempResult
     */
    static async setTimeSpecFinish(): Promise<void> {
        try {
            this.timeSpecEndXray = this.getTimeForJira();
        } catch (err) {
            throw new errorwrapper.CustomError(this.setTimeSpecFinish, err.message);
        }

    }

    /**
     * Set time of first run for Report
     * @static
     * @returns {Promise<void>}
     * @memberof LGReportTestCaseTempResult
     */
    static async setTimeStart(): Promise<void> {
        if (this.timeRun == 0) {
            this.timeRun = (new Date()).getTime();
        }
    }

    /**
     * Set time of finish for Report
     * @static
     * @returns {Promise<void>}
     * @memberof LGReportTestCaseTempResult
     */
    static async setTimeEnd(): Promise<void> {
        this.timeFinish = (new Date()).getTime();
    }

    /**
     * Return time using for Jira
     * @static
     * @returns {string}
     * @memberof LGReportTestCaseTempResult
     */
    static getTimeForJira(): string {
        try {
            let toDay = new Date();
            let offset = -toDay.getTimezoneOffset();

            toDay.setHours(toDay.getHours() - offset / 60)

            let tzo = -toDay.getTimezoneOffset(),
                dif = tzo >= 0 ? '+' : '-',
                pad = function (num) {
                    var norm = Math.floor(Math.abs(num));
                    return (norm < 10 ? '0' : '') + norm;
                };
            return toDay.getFullYear() + '-' + pad(toDay.getMonth() + 1) + '-' + pad(toDay.getDate()) + 'T' + pad(toDay.getHours()) + ':' + pad(toDay.getMinutes()) + ':' + pad(toDay.getSeconds()) + dif + pad(tzo / 60) + ':' + pad(tzo % 60);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTimeForJira, err.message);
        }
    }
}

export class TestSuiteResultInfo {
    public id: string = "";
    public fullName: string = "";
    public failedExpectation: Array<any> = [];
    public status: string = "";
    public startTime: string = "";
    public endTime: string = "";
    public testCasesInSuite: Array<TestCaseResultInfo> = [];

    constructor(result: jasmine.CustomReporterResult) {
        this.id = result.id;
        this.fullName = result.fullName;
        this.status = result.status;
        this.failedExpectation = result.failedExpectations
        this.startTime = LGReportTestCaseTempResult.timeSuiteStartXray;
        this.endTime = LGReportTestCaseTempResult.timeSuiteEndXray;
    }
}

export class LGReporter implements jasmine.CustomReporter {
    public allTestCase: Array<TestCaseResultInfo> = [];
    public allSuite: Array<TestSuiteResultInfo> = [];
    public startTime: Date = new Date();
    public endTime: Date = new Date();

    public specDone(result: jasmine.CustomReporterResult) {
        let testCase: TestCaseResultInfo = new TestCaseResultInfo(result);
        this.allTestCase.push(testCase);
    }

    public suiteDone(result: jasmine.CustomReporterResult) {
        let suite: TestSuiteResultInfo = new TestSuiteResultInfo(result);
        suite.testCasesInSuite = this.allTestCase;
        LGReportConfig.allSuite.push(suite)
        this.allTestCase = []
    }

    public jasmineDone() {
    }
}
