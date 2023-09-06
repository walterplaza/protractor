import { Agent, AgentType } from "@data-objects/general/agent";
import { BUSkillInfo, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { Domains } from "@test-data/general/domain-info";
import { PageURLs } from "@test-data/general/page-url-info";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { JsonObject, JsonProperty } from "json2typescript";
import { FunctionType, Logger } from "@utilities/general/logger";

@JsonObject
export class Cluster {
    @JsonProperty("id", String)
    id: string = undefined;

    @JsonProperty("environment", String)
    environment: string = undefined;

    @JsonProperty("agents", [Agent])
    agents: Agent[] = undefined;

    @JsonProperty("skills", [BUSkillInfo])
    skills: BUSkillInfo[] = undefined;

    @JsonProperty("tenantName", String)
    tenantName: string = undefined;

    @JsonProperty("gbu", String)
    gbu: string = undefined;

    encoded: string = 'Basic aW5Db250YWN0IFN0dWRpb0BpbkNvbnRhY3QgSW5jLjpaV0kxTUdFNE5tWTNOR1JsTkdJMU9EbG1ZMk14TUdFM1pUUmhOek0xWkRNPQ==';
    outboundNumber: string = '9990370014';
    inboundNumber: string = '9990370006';
    e2eOutboundNumber: string = '4000010042';

    /**
     * Get CxOne agent information
     * @author Phat.Ngo
     * @param {AgentType} agentType
     * @returns {Agent} result information of given agent
     * @memberof Cluster
     */
    public getCxOneAgent(agentType: AgentType): Agent {
        try {
            let length: number = this.agents.length;
            let agent: Agent;
            for (let i: number = 0; i < length; i++) {

                agent = this.agents[i];
                if (agent.type == agentType.toString()) {
                    agent = agent;
                    break;
                }
            }
            return agent;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCxOneAgent, err.message);
        }
    }

    /**
     * Get inContact agent information
     * @private
     * @param {AgentType} type
     * @returns {Agent}
     * @memberof Cluster
     */
    public getInContactAgent(skillType: SkillType): Agent {
        try {
            let length: number = this.agents.length;
            let agent: Agent = new Agent();
            for (let i: number = 0; i < length; i++) {
                if (this.agents[i].type == Agent.getAgentType(skillType).toString()) {
                    if (TestRunInfo.clusterID == ClusterID.DO45) {
                        agent.email = this.agents[i].email + "@niceincontact.com";
                    } else {
                        agent.email = this.agents[i].email + "@" + Cluster.getClusterName() + ".com";
                    }
                    agent.password = this.agents[i].password;
                    agent.name = this.agents[i].name;
                    break;
                }
            }

            return agent;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getInContactAgent, err.message);
        }
    }

    /**
     * Get UserHub agent information
     * @private
     * @param {AgentType} agentType
     * @returns {Agent}
     * @memberof Cluster
     */
    public getUserHubAgent(agentType: AgentType): Agent {
        try {
            let length: number = this.agents.length;
            let agent: Agent;

            for (let i: number = 0; i < length; i++) {
                agent = this.agents[i];
                if (agent.type == agentType.toString()) {
                    agent = agent;
                    break;
                }
            }
            return agent;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getUserHubAgent, err.message);
        }
    }

    /**
     * Get name of cluster
     * @static
     * @returns {string}
     * @memberof Cluster
     */
    public static getClusterName(): string {
        try {
            let regexStr: string[] = TestRunInfo.clusterID.match(/[a-z]+|[^a-z]+/gi);
            let letter: string = regexStr[0];
            let number: string = regexStr[1];

            if (parseInt(number) < 10) {
                number = "000" + number;
            } else {
                number = "00" + number;
            }

            return letter + number;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getClusterName, err.message);
        }
    }

    /**
     * Get URL base on page name
     * @param {PageName} pageName
     * @returns {string}
     * @memberof Cluster
     */
    public getURL(pageName: PageName): string {
        try {
            let prefix: string;
            let result: string[];
            let strPageName: string = PageName[pageName];
            let pageJson: string = JSON.stringify(PageURLs);
            let domainJson: string = JSON.stringify(Domains);
            let pageObj: string[] = JSON.parse(pageJson);
            let domainObj: string[] = JSON.parse(domainJson);
            let suffix: string = pageObj["pageURLs"][strPageName];
            let url: string;

            for (let i = 0; i < domainObj["domains"].length; i++) {
                if (domainObj["domains"][i]["cluster"] == TestRunInfo.clusterID) {
                    result = domainObj["domains"][i];
                    break;
                }
            }

            if (strPageName.match("SERVER_MAIL")) {
                url = result["servermail"];
            } else {
                if (strPageName.match("TOKEN")) {
                    prefix = result["token"];
                } else {
                    prefix = result["domain"];
                }
                url = prefix + suffix;
            }

            return url
        } catch (err) {
            throw new errorwrapper.CustomError(this.getURL, "The environment doesn't have this page")
        }
    }

    public getBUSkillInfo(type: string): BUSkillInfo {
        try {
            let length: number = this.skills.length;
            let skillInfo: BUSkillInfo;

            for (let i: number = 0; i < length; i++) {
                skillInfo = this.skills[i];
                if (skillInfo.type == type) {
                    skillInfo = skillInfo;
                    break;
                }
            }

            return skillInfo;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getBUSkillInfo, err.message);
        }
    }
}

export enum ClusterID {
    TO31 = "TO31",
    TO32 = "TO32",
    SO31 = "SO31",
    SO32 = "SO32",
    C32 = "C32",
    B32 = "B32",
    A32 = "A32",
    E32 = "E32",
    DO45 = "DO45",
    DO33 = "DO33",
    DO74 = "DO74"
}

export enum MaxState {
    WORKING = "Working",
    AVAILABLE = "Available",
    UNAVAILABLE = "Unavailable",
    LOGOUT = "Logout",
    REFUSED = "Refused",
    DISPOSITION_REQUIRED = "Disposition Required",
    ACW = "ACW"
}

export enum MaxConnectOption {
    PHONE = "Phone",
    STATION_ID = "Station ID",
    SOFT_PHONE = "Integrated Softphone",
}

export enum APIVersion {
    V1 = "v1.0",
    V2 = "v2.0",
    V3 = "v3.0",
    V4 = "v4.0",
    V5 = "v5.0",
    V6 = "v6.0",
    V7 = "v7.0",
    V8 = "v8.0",
    V9 = "v9.0",
    V10 = "v10.0",
    V11 = "v11.0",
    V12 = "v12.0",
    V13 = "v13.0",
    V15 = "v15.0"
}

export enum SearchTimeRange {
    TODAY = "Today",
    LAST_2_DAYS = "Last 2 days",
    LAST_7_DAYS = "Last 7 days",
    CURRENT_MONTH = "Current month",
    PREVIOUS_MONTH = "Previous month",
    CUSTOM_RANGE = "Custom range",
    LAST_DAYS = "Last ... days"
}

export enum SearchColumnName {
    TYPE = "TYPE",
    AGENT_NAME = "AGENT NAME",
    CUSTOMER_INFO = "CUSTOMER INFO",
    START_TIME = "START TIME",
    DURATION = "DURATION",
    DIRECTION = "DIRECTION",
    ORGANIZATION_INFO = "ORGANIZATION INFO",
    EVALUATION_SCORE = "EVALUATION SCORE",
    CALL_REASON = "CALL REASON",
    SKILLS = "SKILLS",
    SEGMENT_ID = "SEGMENT ID",
    CONTACT_ID = "CONTACT ID",
    AGENT_ID = "AGENT ID",
    ACD_ID = "ACD ID",
    EMAIL_SUBJECT = "EMAIL SUBJECT"
}

export enum Timezone {
    PACIFIC_TIME = "Pacific Time (US & Canada)",
    MOUNTAIN_TIME = "Mountain Time (US & Canada)",
    CENTRAL_TIME = "Central Time (US & Canada)",
    BANGKOK_HANOI_JAKARTA = "Bangkok, Hanoi, Jakarta"
}

export enum PageName {
    TOKEN,
    LOGIN_PAGE,
    USERS_PAGE,
    TEAMS_PAGE,
    GROUPS_PAGE,
    LOCATIONS_PAGE,
    UNAVAILABLE_CODES_PAGE,
    STATIONS_PAGE,
    STATION_PROFILES_PAGE,
    ADDRESS_BOOKS_PAGE,
    SECURITY_PROFILES_PAGE,
    AGENT_MESSAGES_PAGE,
    QUICK_REPLIES_PAGE,
    BROWSE_FILES_PAGE,
    USAGE_SUMMARY_PAGE,
    BUSINESS_UNITS_PAGE_INTERNAL,
    BUSINESS_UNITS_PAGE_EXTERNAL,
    DB_CONNECTORS_PAGE,
    AGENT_PATTERNS_PAGE,
    API_APPLICATIONS_PAGE,
    SMS_REGISTRATIONS_PAGE,
    EXTENSIBLE_REPORT_PAGE,
    NOTIFICATION_SETTINGS_PAGE,
    DATA_POINTS_PAGE,
    RULES_PAGE,
    PENDING_RULE_ACTIONS_PAGE,
    SOFTWARE_AND_UPDATES_PAGE,
    BROWSER_COMPATIBILITY_TEST_PAGE,
    AGENT_ISSUES_PAGE,
    ACCOUNT_SETTINGS_PAGE,
    SKILLS_PAGE,
    CAMPAIGNS_PAGE,
    DISPOSITIONS_PAGE,
    POINTS_OF_CONTACT_PAGE,
    SCRIPTS_PAGE,
    SCRIPT_SCHEDULES_PAGE,
    HOURS_OF_OPERATION_PAGE,
    CHAT_PROFILES_PAGE,
    TAGS_PAGE,
    SKILL_CONTROL_PAGE,
    CALLING_PAGE,
    PROCESS_QUEUE_PAGE,
    CALL_SUPPRESSION_PAGE,
    DNC_PAGE,
    CUSTOM_DATA_DEFINITIONS_PAGE,
    BUILD_SURVEYS_PAGE,
    DEFINE_BUSINESS_RULES_PAGE,
    PROCESS_SURVEY_REQUESTS_PAGE,
    EXPORT_SURVEY_RESULTS_PAGE,
    QA_FORMS_PAGE,
    SCORE_A_RECORDING_PAGE,
    EVENT_MANAGER_PAGE,
    ACTIVE_AGENTS_PAGE,
    AGENT_SNAPSHOT_PAGE,
    AGENT_SUMMARY_PAGE,
    AGENT_TIME_CARD_PAGE,
    AGENT_UNAVAILABLE_TIME_PAGE,
    AGENTS_BY_TEAM_PAGE,
    CAMPAIGN_PERFORMANCE_PAGE,
    CAMPAIGN_SUMMARY_BY_CAMPAIGN_PAGE,
    CAMPAIGN_SUMMARY_BY_SKILL_PAGE,
    CONFIGURED_STATIONS_PAGE,
    FORCED_LOGOUTS_PAGE,
    PROMISE_KEEPER_PAGE,
    SKILL_PERFORMANCE_PAGE,
    SKILL_PROFICIENCIES_DETAIL_PAGE,
    SKILL_PROFICIENCIES_SUMMARY_PAGE,
    SKILLS_BY_CAMPAIGN_PAGE,
    SUPERVISOR_SNAPSHOT_PAGE,
    TEAMS_AND_UNAVAILABLE_CODES_PAGE,
    BILLING_PAGE,
    ACTIVE_CONTACTS_PAGE,
    CALL_QUALITY_EXPLORER_PAGE,
    CONTACT_HISTORY_PAGE,
    EMAIL_INTERRUPTIONS_PAGE,
    EVENT_ACTIVITY_REPORT_PAGE,
    ASR_TUNING_PAGE,
    IVR_PRESS_PATH_PAGE,
    QUALITY_PERFORMANCE_PAGE,
    AGENT_CSR_REPORT_CARD_PAGE,
    CUSTOMER_COMMENTS_PAGE,
    CUSTOMER_LOYALTY_REPORT_PAGE,
    GENERAL_HEALTH_PAGE,
    SATISFACTION_INTERACTIVE_QUEUE_PAGE,
    PERFORMANCE_PAGE,
    RANKING_REPORT_PAGE,
    SATISFACTION_DISTRIBUTION_FLOOR_REPORT_PAGE,
    SUPERVISOR_COMPARISON_PAGE,
    SUPERVISOR_CSR_REPORT_CARD_PAGE,
    REPORT_TEMPLATES_PAGE,
    EXECUTED_REPORTS_PAGE,
    SCHEDULES_PAGE,
    CATEGORIES_PAGE,
    REPORT_SCHEDULES_PAGE,
    SCHEDULE_RUN_HISTORY_REPORT_PAGE,
    DATA_DOWNLOAD_PAGE,
    CALL_SUPPRESSION_AUDIT_HISTORY_REPORT_PAGE,
    ABANDON_RATE_COMPLIANCE_REPORT_PAGE,
    OUTBOUND_REPORT_STORE_PAGE,
    RULE_ACTION_HISTORY_PAGE,
    RULE_ACTION_SUMMARY_REPORT_PAGE,
    CUSTOM_REPORT_PAGE,
    CXONE_LOGIN_PAGE,
    CXONE_TENANTS_PAGE,
    CXONE_SET_PASSWORD_PAGE,
    SCHEDULES_LIST_PAGE,
    DASHBOARD_PAGE,
    SERVER_MAIL,
    CACHE_SITE_GET_SKILL_ACTIVITY_ENTRY_LIST,
    POST_UNAVAILABLE_STATISTICS,
    REPORT_SERVICE_GET_SKILL_ACTIVITY_ENTRY_LIST,
    POST_AGENT_PERFORMANCE_BY_HOUR_ENTRY_LIST,
    MAX_PAGE,
    SCHEDULE_USER_PAGE,
    AUTHORIZE_TMA_USER,
    POST_TENANT
}

export enum InContactClusterID {
    TC1 = "TC1",
    TC2 = "TC2",
    TC3 = "TC3",
    TC4 = "TC4",
    TC5 = "TC5",
    SC1 = "SC1",
    SC2 = "SC2",
    SC3 = "SC3",
    SC10 = "SC10",
    SC11 = "SC11",
    HC1 = "HC1",
    HC2 = "HC2",
    HC3 = "HC3",
    HC4 = "HC4",
    HC5 = "HC5",
    HC6 = "HC6",
    HC7 = "HC7",
    HC8 = "HC8",
    HC9 = "HC9",
    HC10 = "HC10",
    HC11 = "HC11",
    HC12 = "HC12",
    HC13 = "HC13",
    HC14 = "HC14",
    HC15 = "HC15",
    HC16 = "HC16",
    HC17 = "HC17",
    HC18 = "HC18",
    HC19 = "HC19",
    HC20 = "HC20",
    HC21 = "HC21",
    HC22 = "HC22",
    HC23 = "HC23",
    HC24 = "HC24",
    HC25 = "HC25",
    DO36 = "DO36",
    DO45 = "DO45"
}

export enum Environment {
    CXONE = "CXONE",
    INCONTACT = "INCONTACT",
    USERHUB = "USERHUB"
}

export enum GBU {
    SMOKE_DEPLOY = "SmokeDeploy",
    MAX_INTERNAL_GBU = "MaxInternalGBU",
    LOGIGEARGBU_DO45 = "perm_LogiGearGBU.do0045.9",
    USERHUB_SO32 = "SO32_UserHub",
    USERHUB_DO33 = "perm_MAXGBU.DO0033.5",
    USERHUB_DO74 = "perm_MAXGBU.DO0074.1",
    USERHUB_BRANDEMBASSY_DO33 = "perm_MaxGBU_BrandEmbassy.DO0033.2",
    USERHUB_BRANDEMBASSY_SO32 = "PERM MAXGBU BRANDEMBASSY SO32",
    USERHUB_BRANDEMBASSY_SMOKE_SO32 = "PERM SMOKEEXTERNALGBU V2",

}

export enum MaxAddressBookTab {
    MAIN = "main",
    MY_TEAM = "my team",
    HISTORY = "history"
}

