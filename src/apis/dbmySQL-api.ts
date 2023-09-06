import TestRunInfo from "@data-objects/general/test-run-info";
import { JenkinsBuildExecution } from "@data-objects/XrayJira/jenkinsBuildExecution";
import ProjectPath from "@test-data/general/project-path";
import { APICore, Method, Options } from "@utilities/general/api-core";
import { Utility } from "@utilities/general/utility";
import { LGReportConfig } from "@utilities/new-report/lg-hook";
import moment from "moment";

export default class dbmySQL {

    private static dbUrl: string = "http://172.28.11.220:3000";

    /**
     * Encode string to base64
     * @static
     * @param {*} file
     * @returns
     * @memberof dbmySQL
     */
    public static async base64_encode(file) {
        var fs = require('fs');
        var bitmap = await fs.readFileSync(file);
        return await Buffer.from(bitmap).toString('base64');
    }

    /**
     * Get build id from Database
     * @static
     * @returns {Promise<void>}
     * @memberof dbmySQL
     */
    public static async getBuildNumber(): Promise<void> {
        console.log(`Get Jenkins build from database`)
        try {
            let url = `${this.dbUrl}/builds/all`;
            let options = new Options(url, Method.GET);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let apiRes = await APICore.request(options);
            let dataTestCaseFile = require(Utility.getPath('src/data-objects/XrayJira/jenkinsInfo.json'))
            JenkinsBuildExecution.jenkins_build_name = dataTestCaseFile.Buildname;

            let apiResBody = JSON.parse(apiRes.body)
            for (let i = 0; i < apiResBody.length; i++) {
                if (apiResBody[i].name == JenkinsBuildExecution.jenkins_build_name) {
                    JenkinsBuildExecution.jenkins_build_id = apiResBody[i].id;
                    JenkinsBuildExecution.jenkins_build_number = dataTestCaseFile.buildNumber;
                    console.log(`Protractor run build test of ${dataTestCaseFile.Buildname} with id ${JenkinsBuildExecution.jenkins_build_id} on database `)
                    return apiResBody[i].id
                }
            }
            return null
        } catch (e) {
            console.log(`Error when getting build number from database`)
        }
    }

    /**
     * Get test agent id from Database
     * @static
     * @returns {Promise<string>}
     * @memberof dbmySQL
     */
    public static async getTestAgentID(): Promise<string> {
        console.log(`Get Test Agent machine`)
        try {
            let dataTestCaseFile = require(Utility.getPath('src/data-objects/XrayJira/jenkinsInfo.json'))
            let url = `${this.dbUrl}/testAgent/name`;
            let options = new Options(url, Method.GET);
            options.addParam('name', dataTestCaseFile.NODE_NAME)
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let apiRes = await APICore.request(options);
            let apiResBody = JSON.parse(apiRes.body)
            JenkinsBuildExecution.jenkins_test_agent_id = apiResBody[0].id
            console.log(`Protractor run build test on machine ${dataTestCaseFile.NODE_NAME} with id ${JenkinsBuildExecution.jenkins_test_agent_id} on database `)
            return apiResBody[0].id
        } catch (e) {
            console.log(`Error when getting Test Agent machine from database`)
        }
    }

    /**
     * Push pictures to database
     * @static
     * @param {*} test_result_id
     * @param {*} name
     * @returns {Promise<void>}
     * @memberof dbmySQL
     */
    public static async addPictureError(test_result_id, name): Promise<void> {
        try {
            const request = require('request');
            const fs = require('fs');

            let url = `${this.dbUrl}/test-results/addTestResultPictureError`;
            let filePath = `${ProjectPath.conf}/test/reports/screenshots/` + name;
            var formData = {
                test_result_id: test_result_id,
                image_name: name,
                source: filePath,
                image: fs.createReadStream(filePath),
            };

            request.post({ url: url, formData: formData }, function (err, httpResponse, body) {
                if (err) {
                    return console.error('upload failed:', err);
                }
                console.log(`Protractor add picture error of test case with status ${httpResponse.statusCode}`)
            });
        } catch (e) {
            console.log(`Error when pushing Error picture to database`)
        }
    }

    /**
     * Get cluster id from Database
     * @static
     * @returns {Promise<string>}
     * @memberof dbmySQL
     */
    public static async getClusterIDbyName(): Promise<string> {
        try {
            let url = `${this.dbUrl}/general/clusters/name/${TestRunInfo.clusterID.toLowerCase()}`;
            let options = new Options(url, Method.GET);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let apiRes = await APICore.request(options);
            let apiResBody = JSON.parse(apiRes.body)
            JenkinsBuildExecution.cluster_id = apiResBody[0].id
            console.log(`Protractor run build test on cluster ${TestRunInfo.clusterID} with id ${JenkinsBuildExecution.cluster_id} on database `)
            return apiResBody[0].id
        } catch (e) {
            console.log(`Error when getting Cluster from database`)
        }
    }

    /**
     * Get browser id from Database
     * @static
     * @returns {Promise<string>}
     * @memberof dbmySQL
     */
    public static async getBrowserIDbyName(): Promise<string> {
        try {
            let url = `${this.dbUrl}/general/browsers/name/${TestRunInfo.browser.toLowerCase()}`;
            let options = new Options(url, Method.GET);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let apiRes = await APICore.request(options);
            let apiResBody = JSON.parse(apiRes.body)
            JenkinsBuildExecution.browser_id = apiResBody[0].id
            console.log(`Protractor run build test on browser ${TestRunInfo.browser} with id ${JenkinsBuildExecution.browser_id} on database `)
            return apiResBody[0].id;
        } catch (e) {
            console.log(`Error when getting Cluster from database`)
        }
    }

    /**
     * Add Jenkins build execution
     * @static
     * @returns {Promise<void>}
     * @memberof dbmySQL
     */
    public static async postJenkinsBuildExecution(): Promise<void> {
        try {
            // Get test build common info
            console.log("Post Jenkins Build Execution to Database")
            await dbmySQL.getBuildNumber()
            await dbmySQL.getTestAgentID();
            await dbmySQL.getClusterIDbyName();
            await dbmySQL.getBrowserIDbyName();

            // Post jenkins build execution
            let url = `${this.dbUrl}/builds/executions`;
            let checkPass = 0;
            let checkFailed = 0;

            for (let suite of LGReportConfig.allSuite) {
                if (suite.status == "passed") {
                    checkPass++;
                }
                else {
                    checkFailed++;
                }
            }

            if (checkPass > 0 && checkFailed == 0) {
                JenkinsBuildExecution.jenkins_build_status_id = "1";
            } else if (checkPass == 0 && checkFailed > 0) {
                JenkinsBuildExecution.jenkins_build_status_id = "4";
            } else if (checkPass > 0 && checkFailed > 0) {
                JenkinsBuildExecution.jenkins_build_status_id = "2";
            }

            let options = new Options(url, Method.POST);
            options.addHeader("Content-Type", "application/json; charset=utf-8");

            let jsonData = `{"jenkins_build_id": ${JenkinsBuildExecution.jenkins_build_id}, 
            "jenkins_build_number": ${JenkinsBuildExecution.jenkins_build_number}, 
            "jenkins_build_status_id": ${JenkinsBuildExecution.jenkins_build_status_id}, 
            "triggered_by_user_id": 1,
            "jenkins_test_agent_id": ${JenkinsBuildExecution.jenkins_test_agent_id}, 
            "browser_id": ${JenkinsBuildExecution.browser_id}, 
            "cluster_id": ${JenkinsBuildExecution.cluster_id}, 
            "start_date": "${moment(JenkinsBuildExecution.start_date).format("YYYY-MM-DD HH:mm:ss")}", 
            "end_date": "${moment(JenkinsBuildExecution.end_date).format("YYYY-MM-DD HH:mm:ss")}", 
            "jenkins_full_log": "" }`;

            console.log(`Post Jenkins Build Execution to Database with ${jsonData}`)

            let apiRes = await APICore.request(options, jsonData);

            console.log(`Protractor post result run build to database with id ${JSON.parse(apiRes.body).id}`)
            return JSON.parse(apiRes.body).id
        } catch (e) {
            console.log(`Error when pushing jenkins execution to database`)
        }
    }

    /**
     * Get test case info by tfs or xray id
     * @static
     * @param {string} XrayID
     * @returns {Promise<string>}
     * @memberof dbmySQL
     */
    public static async getDataBasesTestCaseID(XrayID: string): Promise<string> {
        try {
            let url = `${this.dbUrl}/test-cases/xrayOrTfs`;
            let options = new Options(url, Method.GET);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("xrayOrTfs", XrayID)
            let apiRes = await APICore.request(options);
            if (JSON.parse(apiRes.body).length == 0) {
                return null
            } else {
                return JSON.parse(apiRes.body)[0].id
            }
        } catch (e) {
            console.log(`Error when getting jenkins test case from database with id ${XrayID}`)
        }
    }

    /**
     * Add new test case to Database
     * @static
     * @returns {Promise<void>}
     * @memberof dbmySQL
     */
    public static async addTestCaseToDataBase(): Promise<void> {
        try {

            let listTestCase = [];

            for (let suite of LGReportConfig.allSuite) {
                listTestCase.push(suite.testCasesInSuite);
            }
            // let listTestCase = await XrayJiraUtility.removeDuplicateJenkinsTestCase(ConfigReport.listJenkinsTestCase)
            for (let a = 0; a < listTestCase.length; a++) {
                let caseJenkinsID = await this.getDataBasesTestCaseID(listTestCase[a].testCaseID);
                if (caseJenkinsID == null) {
                    let url = `${this.dbUrl}/test-cases/add`;
                    let options = new Options(url, Method.POST);
                    options.addHeader("Content-Type", "application/json; charset=utf-8");
                    let jsonData = `{"xray_key": "${listTestCase[a].xray_key}", 
                    "tfs_id": "${listTestCase[a].testCaseID}", 
                    "test_case_script_summary": "${listTestCase[a].test_case_script_summary.replace(/\n|\r/g, "").replace(/\"/g, "")}", 
                    "test_case_xray_summary": "${listTestCase[a].test_case_xray_summary.replace(/\n|\r/g, "").replace(/\"/g, "")}", 
                    "author_id": "${listTestCase[a].author_id}", 
                    "created_date": "${listTestCase[a].created_date}"}`;

                    let apiRes = await APICore.request(options, jsonData);
                    console.log(`Add test case ${listTestCase[a].testCaseID} to database with status ${apiRes.status}`)
                }
            }
        } catch (e) {
            console.log(`Error when pushing jenkins test case to database`)
        }
    }

    /**
     * Add test case result to Database 
     * @static
     * @returns {Promise<void>}
     * @memberof dbmySQL
     */
    public static async addTestExecutionAssociations(): Promise<void> {
        try {
            await Utility.delay(5);
            console.log("Add Test Case To DataBase Method")
            await dbmySQL.addTestCaseToDataBase()

            let url1 = `${this.dbUrl}/test-results/test-case-execution/associations`;
            let url2 = `${this.dbUrl}/builds/test-results`;
            let testExecutionAssociationID = await this.postJenkinsBuildExecution();

            let listTestCase = [];

            for (let suite of LGReportConfig.allSuite) {
                listTestCase.push(suite.testCasesInSuite);
            }

            for (let testResultCaseInfo of listTestCase) {
                try {
                    let CaseID = await this.getDataBasesTestCaseID(testResultCaseInfo[0].testCaseID);
                    console.log(`Test case TFS ID: ${testResultCaseInfo[0].testCaseID} with ID on database: ${CaseID}`)

                    let options1 = new Options(url1, Method.POST);
                    options1.addHeader("Content-Type", "application/json; charset=utf-8");
                    let jsonData1 = `{"test_case_id": ${CaseID}, "test_set_id": 1, "test_plan_id": 1, "jenkins_build_execution_id": ${testExecutionAssociationID}}`;
                    console.log(`Add test case to test-case-execution with ${jsonData1}`)

                    let apiRes1 = await APICore.request(options1, jsonData1);
                    console.log(`Add test case to test-case-execution with status ${apiRes1.status}`)

                    let options2 = new Options(url2, Method.POST);
                    options2.addHeader("Content-Type", "application/json; charset=utf-8");

                    let jsonData2 = `{"test_execution_association_id": ${JSON.parse(apiRes1.body).id},
                         "test_result_type_id":${testResultCaseInfo[0].status == "passed" ? "1" : "2"},
                          "start_date": "${moment(testResultCaseInfo[0].startTime).format('YYYY-MM-DD HH:mm:ss')}",
                           "end_date": "${moment(testResultCaseInfo[0].endTime).format('YYYY-MM-DD HH:mm:ss')}",
                            "test_message": "${testResultCaseInfo[0].failedExpectation.replace(/\n|\r/g, "").replace(/\"/g, "").replace(/'/g, "").replace(/\//g, ">")}"}`;
                    console.log("Add result with json: " + jsonData2)
                    let apiRes2 = await APICore.request(options2, jsonData2);

                    console.log(`Add result ${testResultCaseInfo[0].testCaseID} to data base with status ${apiRes2.status}`)

                    if (testResultCaseInfo[0].status == "failed") {
                        await this.addPictureError(JSON.parse(apiRes2.body).id, testResultCaseInfo[0].errorPictureName + ".png");
                    }

                } catch (e) {
                    console.log(e);
                    console.log(`Error when pushing jenkins test case result of ${testResultCaseInfo[0]} to database`)
                }
            }

        } catch (e) {
            console.log(`Error when pushing jenkins test case result to database`)
        }
    }
}