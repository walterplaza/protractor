import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export class TestExecution {
    public projectKey: string;
    public summary: string;
    public description: string;
    public assignee: string;
    public fixVersion: string;
    public version: string;
    public environment: string;
    public revision: string;
    public testCases: Array<string>;
    public user: string;
    public startDate: string;
    public finishDate: string;
    public testPlanKey: string;
    public testEnvironments: string;
    public testExecutionKey: string;
    
    /**
     *
     * @param {string} projectK
     * @param {string} summaryNTE
     * @param {string} assigneeNTE
     * @param {Array<string>} [testCasesNTE=[]]
     * @param {string} [fixVersionNTE="null"]
     * @param {string} [environmentNTE="null"]
     * @param {string} [revisionNTE="null"]
     * @returns {NewTestExecution}
     * @memberof NewTestExecution
     */
    public initData(projectK: string, testPlan: string, assigneeNTE: string, testCasesNTE: Array<string> = [], fixVersionNTE: string = "null", environmentNTE: string = "null", revisionNTE: string = "null"): TestExecution {
        try {
            this.projectKey = projectK;
            this.description = this.summary = `Test Execution for Test Plan ${testPlan}`;
            this.user = this.assignee = assigneeNTE;
            this.fixVersion = fixVersionNTE;
            this.testEnvironments = this.environment = environmentNTE;
            this.revision = revisionNTE;
            this.testCases = testCasesNTE;
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}

