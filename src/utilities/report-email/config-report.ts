import TestRunInfo from "@data-objects/general/test-run-info";
import ProjectPath from "@test-data/general/project-path";
import HTMLEmailReport from '@utilities/report-email/report-email';
import HTMLEmailHReport from '@utilities/report-email/report-html';
import jasmineReporters from "jasmine-reporters";
import { protractor } from 'protractor';
import { Utility } from "@utilities/general/utility";
import { XrayJiraUtility } from "@utilities/general/utility";
import { JenkinsBuildExecution } from "@data-objects/XrayJira/jenkinsBuildExecution";
import { XrayJiraTestInfo } from "@data-objects/XrayJira/xrayJiraTestInfo";
import moment = require("moment");

export class ConfigReport {
    static pushResultToXray: boolean = false;
    static xrayJiraTestInfo: XrayJiraTestInfo;
    static specNumber: number = -1;
    static checkErrorPic: boolean = true;
    static listTestCaseResult: Array<any> = [];
    static listJenkinsTestCase: Array<any> = [];
    static listTestCaseID: Array<any> = [];
    static timeSpecStart: string;
    static timeSpecFinish: string;
    static listReportStatus: Array<any> = [];
    static listNotAssociatedTestCase: Array<any> = [];
    static listAssociatedTestCase: Array<any> = [];
    static timeSpecStartXray: string;
    static timeSpecEndXray: string;

    static async setTimeReportStart(): Promise<void> {
        this.timeSpecStartXray = XrayJiraUtility.getTimeForJira();
        this.timeSpecStart = XrayJiraUtility.getDateISOString();
        if (JenkinsBuildExecution.start_date == "") {
            JenkinsBuildExecution.start_date = this.timeSpecStart;
        }
    }

    static async setTimeReportFinish(): Promise<void> {
        this.timeSpecEndXray = XrayJiraUtility.getTimeForJira();
        this.timeSpecFinish = XrayJiraUtility.getDateISOString();
        JenkinsBuildExecution.end_date = this.timeSpecFinish;
    }

    /**
     * Create xml report
     * @static
     * @memberof ConfigReport
     */
    static createXMLReport() {
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: `${ProjectPath.conf}/test/reports`,
            filePrefix: 'xmlresults'
        }));
    }

    static reportSetupConfig() {
        ConfigReport.specNumber++;
        ConfigReport.checkErrorPic = true;
        if (ConfigReport.specNumber < 1) {
            var mkdirp = require('mkdirp');
            mkdirp(`${ProjectPath.conf}/test/reports/screenshots`, function (err) {
            });
        }
    }

    /**
     * Convert xml report to pie chart
     * @static
     * @memberof ConfigReport
     */
    static async convertXMLtoPieChart(reportType): Promise<void> {
        let fs = require('fs')
        try {
            let check = false;
            let count = 0;
            while (!check && count < 7) {
                console.log(`Wait for result file on ${count}`)
                await Utility.delay(5)
                count++;
                if (fs.existsSync(`${ProjectPath.conf}/test/reports/xmlresults.xml`)) {
                    check = true;
                }
            }
        } catch (err) {
            console.error(err)
        }

        var browserName, browserVersion;
        var capsPromise = protractor.browser.getCapabilities();
        capsPromise.then(async function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            let testConfig = {
                reportTitle: 'Test Execution Report',
                outputPath: `${ProjectPath.conf}/test/reports/`,
                screenshotPath: 'screenshots',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true,
                cleanDestination: false,
            };
            await HTMLEmailHReport.from(`${ProjectPath.conf}/test/reports/xmlresults.xml`, testConfig);
            await HTMLEmailReport.generateReportHourly(`${ProjectPath.conf}/test/reports/xmlresults.xml`, `${ProjectPath.conf}/test/reports/emailHtml/`, reportType);
        });


    }

    /**
     * Convert xml report to pie chart
     * @static
     * @memberof ConfigReport
     */
    static createHtmlEmailDailyReport() {
        let suiteEvolve = 'CxOne Sanity Test';
        HTMLEmailReport.generateReportDaily(suiteEvolve, TestRunInfo.cluster.id, `${ProjectPath.conf}/test/reports/emailHtml/resultEmailDaily`)
    }

    static createHtmlLastedReport() {
        let suiteEvolve = 'CxOne Sanity Test';
        HTMLEmailReport.generateReportLastedBuilds(suiteEvolve, TestRunInfo.cluster.id, `${ProjectPath.conf}/test/reports/lastedReportBuild/`)
    }

    static getBugErrorMessage(testCaseI, errorMess = "") {
        let configFile: string = `src/test-data/bug-data/bug-data.json`;
        let jsonPath: string = Utility.getPath(configFile);
        let data = require(jsonPath);
        for (let dataBug of data) {
            let data = dataBug.Data;
            for (let b = 0; b < data.length; b++) {
                let testCaseIDs = data[b].TestcaseID;
                let testcaseErrors = data[b].TestcaseError

                for (let a = 0; a < testCaseIDs.length; a++) {
                    if (testCaseIDs[a] == testCaseI) {
                        // will handle error message after
                        if (errorMess != "") {
                            for (let c = 0; c < testcaseErrors.length; c++) {
                                if (errorMess.indexOf(testcaseErrors[c]) > -1) {
                                    return `Failed by Bug: ${dataBug.BugIdJira} - ${dataBug.BugDescription}`
                                }
                            }
                        }
                    }
                }
            }
        }
        return ""
    }
}