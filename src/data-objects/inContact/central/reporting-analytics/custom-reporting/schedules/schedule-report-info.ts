import { Utility } from "@utilities/general/utility";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import TestRunInfo from "@data-objects/general/test-run-info";

export enum ScheduleType {
    ONE_TIME = "One Time",
    RECURRING = "Recurring"
}

export enum StartOn {
    TODAY = "today",
    TOMORROW = "tomorrow"
}

export enum ReportFormat {
    XML = "XML",
    TAB_DELIMITED = "Tab Delimited File",
    COMMA_SEPARATED = "Comma Separated",
}

export enum ReportType {
    AGENT_BY_DAY = "Agent By Day",
    AGENT_LIST = "Agent List",
    AGENT_STATES = "Agent States",
    AGENT_SUMMARY = "Agent Summary",
    ALL_CALLBACKS = "All Callbacks",
    CALL_DETAIL_REPORT = "Call Detail Report",
    CAMPAINT_LIST = "Campaint list",
    CUSTOME_TEST = "CustomeTest"
}

export enum ReportTemplate {
    REG_GLOBAL = "[Maba] Reg 18 2 Global - (-5083)",
    MABA_FAILOVER = "[Regression][RC] Maba Failover - (-4075)",
    GLOBAL_MABA = "[Regression][SC10] Global Maba CD Agent",
    AUTOMATED_REPORT_TEMPLATE = "AutomatedReportTemplate_636697552254646833 - (681)",
    LGVN_REPORT = "lgvn_report_2018813104424 - (664)",
    MABA_SC10_PERSONAL_C_GLOBAL = "Maba SC10 Personal C Global - (-4068)",
    TEST_AUTOMATION = "Test Automation BU2017103019045 - (-4065)",
    TEST_VN = "TestVN2018813105236 - (669)",
    TEST_AUTOAMTION25 = "Test Automation201792121225 - (-2)",
    TEST_AUTOAMTION55 = "Test Automation201792183455 - (-1)",
    TEST_AUTOAMTION51 = "Test Automation20179223551 - (-3)"
}

export class Schedule {
    reportName: string;
    scheduleType: ScheduleType;
    startOn: string;
    reportType: ReportType;
    reportFormat: ReportFormat;
    reportFileName: string;
    reportTemplate: ReportTemplate;
    deleteAfter: string;

    public initData(reportName: string, reportFileName: string): Schedule {
        try {

            this.reportName = reportName + Utility.createRandomString(15);
            this.reportTemplate = ReportTemplate.GLOBAL_MABA;
            if (TestRunInfo.clusterID + "" == "HC25") {
                this.reportTemplate = ReportTemplate.TEST_AUTOAMTION25;
            }
            this.scheduleType = ScheduleType.ONE_TIME;
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
            let tmpDate: Date = new Date();
            let date: Date = new Date(tmpDate.setDate(tmpDate.getDate() + 1));
            this.startOn = date.toLocaleDateString("en-US", options);
            this.reportFileName = reportFileName + " " + Utility.createRandomString(15);
            this.reportType = ReportType.AGENT_BY_DAY;
            this.reportFormat = ReportFormat.XML;
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}
