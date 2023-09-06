import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { Utility } from "@utilities/general/utility";

export enum FileName {
    SD_AGENTSTATS_BY_X = "211SD_AgentStats_By_X.rpt",
    SD_AGENTSTATS_BY_X2 = "211SD_AgentStats_By_X2.rpt",
    WNY_PHANTOM = "211WNYPhantom.rpt",
    WNY_ROTARY = "211WNYRotary.rpt",
    ABANDONED_CALLS = "AbandonedCalls.rpt",
    ACCLARIS_AGENTSTATS = "Acclaris_AgentStats.rpt",
    ACCLARIS_AGENTSTATS2 = "Acclaris_AgentStats2.rpt",
    ADMIN_VIEW = "Admin_View.rpt",
    ADVANCED_BODY_CARE_DETAIL = "AdvancedBodyCareDetail.rpt",
    AGENT_LIST = "Agent List.rpt",
    AGENT_TEST_REPORT = "Agent Test Report.rpt",
}

export class ExtensibleReport {
    reportName: string;
    fileName: FileName;
    global: string;
    description: string;

    /**
     * Initialize data for ExtensibleReport
     * @param {string} reportName
     * @returns {ExtensibleReport}
     * @memberof ExtensibleReport
     */
    public initData(reportName: string): ExtensibleReport {
        try {
            this.reportName = reportName + Utility.createRandomString(15);
            this.fileName = FileName.AGENT_LIST;
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}
