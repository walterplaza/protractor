import CustomReporter = jasmine.CustomReporter;
import { Utility } from "@utilities/general/utility";
import { XrayTestCaseInfo } from "@data-objects/XrayJira/XrayTestCaseInfo";
import { ConfigReport } from "./config-report";

export const TestReporter: CustomReporter = {
    specDone: async function (result) {
        try {
            let messError = ""
            for (let a = 0; a < result.failedExpectations.length; a++) {
                messError += result.failedExpectations[a].message;
            }

            let testCaseSumaryArr = result.description.split(" ");
            let testCaseID = testCaseSumaryArr[0];
            let testacaseSum = result.description.substr(result.description.split(" ")[0].length + 3, result.description.length)
            let dataTestCaseFile = require(Utility.getPath('src/data-objects/XrayJira/xrayJiraTestCaseMap.json'))
            let testCaseXray: XrayTestCaseInfo = new XrayTestCaseInfo();
            ConfigReport.listReportStatus.push(result.status.toLowerCase())

            let xrayTestCaseID = "";
            let xrayTestCaseSum = "";

            // use for XRAY
            let check: boolean = false
            for (let testCaseMap of dataTestCaseFile) {
                let internalTestData = testCaseMap.Internal;
                let xrayTestData = testCaseMap.JiraXray;
                if (internalTestData.ID == testCaseID) {
                    check = true;
                    xrayTestCaseID = xrayTestData.KeyID;
                    xrayTestCaseSum = xrayTestData.Sumary;
                    testCaseXray.initData(xrayTestData.KeyID, ConfigReport.timeSpecStart, ConfigReport.timeSpecFinish, "", result.status.toLowerCase() == "passed" ? "PASS" : "FAIL")
                    ConfigReport.listTestCaseResult.push(testCaseXray);
                    break;
                }
            }

            if (!check) {
                testCaseXray.initData(testCaseID, ConfigReport.timeSpecStart, ConfigReport.timeSpecFinish, "Not Associated", result.status.toLowerCase() == "passed" ? "PASS" : "FAIL")
                ConfigReport.listTestCaseResult.push(testCaseXray);
            }

            if (xrayTestCaseID != "") {
                let check2 = false;
                let jenkinsCaseInfo = {
                    xray_key: xrayTestCaseID,
                    tfs_id: testCaseID,
                    test_case_script_summary: testacaseSum,
                    test_case_xray_summary: xrayTestCaseSum,
                    author_id: "1",
                    created_date: ConfigReport.timeSpecStart.split("+")[0],
                    test_result_type_id: result.status.toLowerCase() == "passed" ? "1" : "2",
                    start_date: ConfigReport.timeSpecStart,
                    end_date: ConfigReport.timeSpecFinish,
                    test_message: messError
                }
                for (let a = 0; a < ConfigReport.listJenkinsTestCase.length; a++) {
                    if (ConfigReport.listJenkinsTestCase[a].testKey == testCaseID) {
                        check2 = true;
                        break;
                    }
                }
                if (!check2) {
                    ConfigReport.listJenkinsTestCase.push(jenkinsCaseInfo)
                }
            } else {
                let check2 = false;
                let messE = ConfigReport.getBugErrorMessage(testCaseID, messError);
                let resultTest = result.status.toLowerCase() == "passed" ? "1" : "2";
                if (messE.indexOf("Failed by") > -1) {
                    resultTest = "6";
                }
                let jenkinsCaseInfo = {
                    xray_key: "",
                    tfs_id: testCaseID,
                    test_case_script_summary: testacaseSum,
                    test_case_xray_summary: xrayTestCaseSum,
                    author_id: "1",
                    created_date: ConfigReport.timeSpecStart.split("+")[0],
                    test_result_type_id: resultTest,
                    start_date: ConfigReport.timeSpecStart,
                    end_date: ConfigReport.timeSpecFinish,
                    test_message: messE == "" ? messError : messE + '. ' + messError
                }

                for (let a = 0; a < ConfigReport.listJenkinsTestCase.length; a++) {
                    if (ConfigReport.listJenkinsTestCase[a].testKey == testCaseID) {
                        check2 = true;
                        break;
                    }
                }
                if (!check2) {
                    ConfigReport.listJenkinsTestCase.push(jenkinsCaseInfo)
                }
            }
        } catch (e) {
            console.log(`Error on specDone: ${e}`)
        }
    }
};