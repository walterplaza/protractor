import { TestExecution } from "@data-objects/XrayJira/TestExecution";
import ProjectPath from "@test-data/general/project-path";
import { APICore, Method, Options } from "@utilities/general/api-core";
import { Utility, XrayJiraUtility } from "@utilities/general/utility";
import { ConfigReport } from "@utilities/report-email/config-report";
export default class XrayAPI {

    // private static XrayAPIBaseUrl = "https://tlvjira02.nice.com";
    static XrayAPIBaseUrl = "https://192.114.150.5:1443/nice/external-prod";
    static XrayAuthorizationToken = "";
    // Client_Key: 25579a4e-1d76-4664-862d-87f4323ef0f2 && Secret_Key: uF5mO8oO2dF8xS1sN1kG5vF6vE0hN8rE6pE4lL4lE3rF3rA6vY
    static xray_Authorization = "Basic MjU1NzlhNGUtMWQ3Ni00NjY0LTg2MmQtODdmNDMyM2VmMGYyOnVGNW1POG9PMmRGOHhTMXNOMWtHNXZGNnZFMGhOOHJFNnBFNGxMNGxFM3JGM3JBNnZZ";
    static jsonResultPath: string = `${ProjectPath.conf}/test/reports/jsonResult.json`;

    /**
     * Full API: POST /nice/external-prod/oauth-end/oauth2/token
     * @static
     * @returns {Promise<void>}
     * @memberof XrayAPI
     */
    public static async authorize(): Promise<void> {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        try {
            let url = `${this.XrayAPIBaseUrl}/oauth-end/oauth2/token`;
            let options = new Options(url, Method.POST);
            options.addHeader("Authorization", "Basic MjU1NzlhNGUtMWQ3Ni00NjY0LTg2MmQtODdmNDMyM2VmMGYyOnVGNW1POG9PMmRGOHhTMXNOMWtHNXZGNnZFMGhOOHJFNnBFNGxMNGxFM3JGM3JBNnZZ");
            options.addHeader("Content-Type", "application/x-www-form-urlencoded");
            options.addParam("grant_type", "client_credentials");
            options.addParam("scope", "jira_api");
            let apiRes = await APICore.request(options);

            this.XrayAuthorizationToken = "Bearer " + JSON.parse(apiRes.body).access_token;
        } catch (e) {
            console.log(`Authorize Xray API with errors`)
        }
    }


    /**
     * Full API: GET /rest/raven/1.0/api/testplan/${testPlan}/test`
     * To view the Test associated with a Test Plan, you need to specify the key of the Test Plan you wish to view.
     * @static
     * @param {string} testPlan
     * @memberof XrayAPI
     */
    public static async getTestCasesFromTestPlan(testPlan: string): Promise<Array<string>> {
        let url = `${this.XrayAPIBaseUrl}/rest/raven/1.0/api/testplan/${testPlan}/test`;
        let options = new Options(url, Method.GET);
        options.addHeader("Authorization", this.XrayAuthorizationToken);
        options.addHeader("Content-Type", "application/x-www-form-urlencoded");

        let apiRes = await APICore.request(options);

        let apiResBody = JSON.parse(apiRes.body)
        let listTestCases = []
        for (let i = 0; i < apiResBody.length; i++) {
            listTestCases.push(apiResBody[i].key)
        }
        return listTestCases
    }

    /**
     * Full API: GET /rest/raven/1.0/api/testexec/${testExecution}/test
     * To view the Test associated with a Test Execution, you need to specify the key of the Test Execution you wish to view.
     * @static
     * @param {string} testPlan
     * @memberof XrayAPI
     */
    public static async getTestCasesFromTestExecution(testExecution: string): Promise<Array<string>> {
        let url = `${this.XrayAPIBaseUrl}/rest/raven/1.0/api/testexec/${testExecution}/test`;
        let options = new Options(url, Method.GET);
        options.addHeader("Authorization", this.XrayAuthorizationToken);
        options.addHeader("Content-Type", "application/x-www-form-urlencoded");

        let apiRes = await APICore.request(options);

        let apiResBody = JSON.parse(apiRes.body)
        let listTestCases = []
        for (let i = 0; i < apiResBody.length; i++) {
            listTestCases.push(apiResBody[i].key)
        }
        return listTestCases
    }

    /**
     * Full API: GET /rest/raven/1.0/api/testset/${testSet}/test
     * To view the Test associated with a Test Set, you need to specify the key of the Test Set you wish to view.
     * @static
     * @param {string} testSet
     * @returns {Promise<Array<string>>}
     * @memberof XrayAPI
     */
    public static async getTestCasesFromTestSet(testSet: string): Promise<Array<string>> {
        try {
            await this.authorize();
            let url = `${this.XrayAPIBaseUrl}/rest/raven/1.0/api/testset/${testSet}/test`;
            let options = new Options(url, Method.GET);
            options.addHeader("Authorization", this.XrayAuthorizationToken);
            options.addHeader("Content-Type", "application/x-www-form-urlencoded");

            let apiRes = await APICore.request(options);
            let apiResBody = JSON.parse(apiRes.body)
            let listTestCases = []
            for (let i = 0; i < apiResBody.length; i++) {
                listTestCases.push(apiResBody[i].key)
            }
            return listTestCases
        } catch (e) {

        }
    }

    /**
     * Full API: GET /rest/raven/1.0/api/testplan/${testPlan}/testexecution
     * To view the Test Execution associated with a Test Plan, you need to specify the key of the Test Plan you wish to view.
     * @static
     * @param {string} testPlan
     * @returns {Promise<Array<string>>}
     * @memberof XrayAPI
     */
    public static async getTestExecutionFromTestPlan(testPlan: string): Promise<Array<string>> {
        let url = `${this.XrayAPIBaseUrl}/rest/raven/1.0/api/testplan/${testPlan}/testexecution`;
        let options = new Options(url, Method.GET);
        options.addHeader("Authorization", this.XrayAuthorizationToken);
        options.addHeader("Content-Type", "application/x-www-form-urlencoded");

        let apiRes = await APICore.request(options);

        let apiResBody = JSON.parse(apiRes.body)
        let listTestCases = []
        for (let i = 0; i < apiResBody.length; i++) {
            listTestCases.push(apiResBody[i].key)
        }
        return listTestCases
    }

    /**
     * Full API: POST /rest/raven/1.0/testplan/${testPlan}/createtestexec
     * Create a new Test Execution by default
     * @static
     * @param {string} testPlan
     * @param {NewTestExecution} newTestExecution
     * @returns {Promise<string>}
     * @memberof XrayAPI
     */
    public static async createNewTestExecution(testPlan: string, newTestExecution: TestExecution): Promise<string> {
        let url = `${this.XrayAPIBaseUrl}/rest/raven/1.0/testplan/${testPlan}/createtestexec`;
        let options = new Options(url, Method.POST);
        options.addHeader("Authorization", this.XrayAuthorizationToken);
        options.addHeader("Content-Type", "application/x-www-form-urlencoded");
        options.addParam("projectKey", newTestExecution.projectKey);
        newTestExecution.summary += (newTestExecution.summary != "null" ? (" on " + newTestExecution.environment) : "") + (newTestExecution.fixVersion != "null" ? (" with " + newTestExecution.fixVersion) : "")
        options.addParam("summary", newTestExecution.summary);
        options.addParam("assignee", newTestExecution.assignee);
        options.addParam("fixVersion", newTestExecution.fixVersion);
        options.addParam("environment", newTestExecution.environment);
        options.addParam("revision", newTestExecution.revision);
        var myJsonString = JSON.stringify(newTestExecution.testCases);
        let apiRes = await APICore.request(options, myJsonString);
        let apiResBody = JSON.parse(apiRes.body)
        return apiResBody.testExecKey
    }

    /**
     * Full API: POST /rest/raven/1.0/import/execution
     * This action will automatically create new test execution and write all test results to test execution;
     * @static
     * @returns {Promise<string>}
     * @memberof XrayAPI
     */
    public static async importResultTestExecution(): Promise<string> {
        try {
            await Utility.delay(5);
            let fs = require('fs');
            await this.authorize();
            let result = JSON.parse(JSON.stringify(fs.readFileSync(this.jsonResultPath, 'utf8')));
            // let result = await XrayJiraUtility.generateJsonForExecution(ConfigReport.listTestCaseResult)

            if (result.length > 0) {
                let url = `${this.XrayAPIBaseUrl}/rest/raven/1.0/import/execution`;
                let options = new Options(url, Method.POST);
                options.addHeader("Authorization", this.XrayAuthorizationToken);
                options.addHeader("Content-Type", "application/json");
                let apiRes = await APICore.request(options, result);
                let apiResBody = JSON.parse(apiRes.body)
                return apiResBody.testExecIssue.key;
            }
            return "No push result"
        } catch (e) {
            console.log(`Can't push result to Xray with error: ${e}`)
        }
    }

    /**
     * Full API: POST /rest/raven/1.0/import/execution
     * This action will automatically create new test execution and write all test results to test execution;
     * @static
     * @returns {Promise<string>}
     * @memberof XrayAPI
     */
    public static async importTestExecutionResult(): Promise<string> {
        try {
            await this.authorize();

            let result = await XrayJiraUtility.generateJsonForExecution(ConfigReport.listTestCaseResult)
            if (ConfigReport.listAssociatedTestCase.length > 0) {
                let url = `${this.XrayAPIBaseUrl}/rest/raven/1.0/import/execution`;
                let options = new Options(url, Method.POST);
                options.addHeader("Authorization", this.XrayAuthorizationToken);
                options.addHeader("Content-Type", "application/json");
                let apiRes = await APICore.request(options, result);
                let apiResBody = JSON.parse(apiRes.body)
                console.log(apiResBody)
                return apiResBody.testExecIssue.key
            }
            return "No push result"
        } catch (e) {
            console.log(`Can't push result to Xray with error: ${e}`)
        }
    }

    /**
     * Full API: GET /rest/api/2/issue/{testKey}
     * Get test case summary by test case key
     * @static
     * @param {string} testcaseID
     * @returns {Promise<string>}
     * @memberof XrayAPI
     */
    public static async getTestCaseSummaryByTestCaseID(testcaseID: string): Promise<string> {
        try {
            let url = `${this.XrayAPIBaseUrl}/rest/api/2/issue/${testcaseID}`;
            let options = new Options(url, Method.GET);
            options.addHeader("Authorization", this.XrayAuthorizationToken);
            options.addHeader("Content-Type", "application/x-www-form-urlencoded");
            let apiRes = await APICore.request(options);
            return JSON.parse(apiRes.body).fields.summary
        } catch (e) {
            console.log(`Error when getting test case summary with test case ID ${testcaseID}`)
        }
    }

    /**
     * Full API: GET /rest/api/1.0/api/testplan/{testPlanKey}/test
     * Get all test cases by test plan key
     * @static
     * @param {string} testPlanKey
     * @returns
     * @memberof XrayAPI
     */
    public static async getAllTestCaseInfoFromTestPlan(testPlanKey: string) {
        let listTestCaseInfo = [];

        let url = `${this.XrayAPIBaseUrl}/rest/raven/1.0/api/testplan/${testPlanKey}/test`;
        let options = new Options(url, Method.GET);
        options.addHeader("Authorization", this.XrayAuthorizationToken);
        options.addHeader("Content-Type", "application/x-www-form-urlencoded");

        let apiRes = await APICore.request(options);
        let apiResBody = JSON.parse(apiRes.body)

        for (let i = 0; i < apiResBody.length; i++) {
            let testCaseSummary = await this.getTestCaseSummaryByTestCaseID(apiResBody[i].id);
            let TestCaseInfo = { id: apiResBody[i].key, summary: testCaseSummary };
            listTestCaseInfo.push(TestCaseInfo);
        }

        return listTestCaseInfo;
    }
}

