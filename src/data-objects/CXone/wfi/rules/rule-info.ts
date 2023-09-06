import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { Utility } from "@utilities/general/utility";

export enum WorkforceRuleType {
    AUTOMATIC = "Automatic",
    NON_AUTOMATIC = "Non Automatic"
}

export enum RecurrenceEnd {
    NONE = "None",
    AFTER = "After",
    BY = "by"
}

export enum RecurrenceFrequency {
    AUTOMATICALLY = "Automatically",
    HOURLY = "Hourly",
    DAILY = "Daily",
    WEEKLY = "Weekly"
}

export enum ConditionsCategory {
    ACD_HISTORICAL = "ACD Historical",
    ACD_INTRADAY = "ACD Intraday",
    INCONTACT_QM = "inContact QM",
    VERINT_QM = "Verint QM"
}

export enum ConditionsDataPoint {
    TOTAL_CONTACTS_HANDLED_FOR_THE_CURRENT_DAY = "Total Contacts Handled for the Current Day",
    TOTAL_CONTACTS_REFUSED_FOR_THE_CURRENT_DAY = "Total Contacts Refused for the Current Day",
    SERVICE_LEVEL_FOR_THE_CURRENT_DAY = "Service Level for the Current Day",
    QUEUE_SIZE = "Queue Size",
    LONGEST_WAIT_TIME = "Longest Wait Time"
}

export enum ConditionsOperator {
    EQUAL_SMALLER = "<=",
    EQUAL_BIGGER = ">=",
    EQUAL = "=",
    DIFFERENT = "<>"
}

export enum RuleSkill {
    IB_SKILL = "IBPhoneSkillAutomation",
    CHAT = "Chat",
    CHAT_REQUIREDDISPOSITION = "Chat_RequiredDisposition",
    LGVN_SKILL_123 = "lgvn_skill_123",
    MAX_CHAT = "MAX_Chat",
    MAX_CHAT_REQUIREDDISPOSITION = "MAX_Chat_RequiredDisposition",
    MAX_CHAT_SCREENPOPS = "MAX_Chat_ScreenPops",
    REGSKILL636697656223896351 = "RegSkill636697656223896351",
    IBEMAIL = "IBEmail",
    IBEMAIL_ACW = "IBEmail_ACW",
    IBEMAIL_NONREQUIREDDISPOSITION = "IBEmail_NonRequiredDisposition",
    IBEMAIL_REQUIREDDISPOSITION = "IBEmail_RequiredDisposition",
    IBEMAIL636698087560843642 = "IBEmail636698087560843642",
    MAX_IBEMAIL = "MAX_IBEmail",
    MAX_IBEMAIL_NONREQUIREDDISPOSI = "MAX_IBEmail_NonRequiredDisposi",
    MAX_IBEMAIL_REQUIREDDISPOSITIO = "MAX_IBEmail_RequiredDispositio",
    MAX_IBEMAIL_SCREENPOPS = "MAX_IBEmail_ScreenPops",
    MAX_OBEMAIL = "MAX_OBEmail",
    MAX_OBEMAIL_ACW = "MAX_OBEmail_ACW",
    MAX_OBEMAIL_NONREQUIREDDISPOSI = "MAX_OBEmail_NonRequiredDisposi",
    MAX_OBEMAIL_REQUIREDDISPOSITIO = "MAX_OBEmail_RequiredDispositio",
    OBEMAIL = "OBEmail",
    OBEMAIL_ACW = "OBEmail_ACW",
    OBEMAIL_NONREQUIREDDISPOSITION = "OBEmail_NonRequiredDisposition",
    OBEMAIL_REQUIREDDISPOSITION = "OBEmail_RequiredDisposition",
    PCEMAILTEST = "PCEmailTest",
    DEFAULTINBOUND = "DefaultInbound",
    IBPHONE = "IBPhone",
    IBPHONE_ACW = "IBPhone_ACW",
    IBPHONE_NOASSIGNEDAGENTS = "IBPhone_NoAssignedAgents",
    IBPHONE_NONREQUIREDDISPOSITION = "IBPhone_NonRequiredDisposition",
    IBPHONE_REQUIREDDISPOSITION = "IBPhone_RequiredDisposition",
    MAX_IBPHONE = "MAX_IBPhone",
    MAX_IBPHONE_NONREQUIREDDISPOSI = "MAX_IBPhone_NonRequiredDisposi",
    MAX_IBPHONE_REQUIREDDISPOSITIO = "MAX_IBPhone_RequiredDispositio",
    MAX_IBPHONE_SCREENPOPS = "MAX_IBPhone_ScreenPops",
    MAX_OBPHONE = "MAX_OBPhone",
    MAX_OBPHONE_ACW = "MAX_OBPhone_ACW",
    MAX_OBPHONE_NONREQUIREDDISPOSI = "MAX_OBPhone_NonRequiredDisposi",
    MAX_OBPHONE_REQUIREDDISPOSITIO = "MAX_OBPhone_RequiredDispositio",
    OBPHONE = "OBPhone",
    OBPHONE_ACW = "OBPhone_ACW",
    OBPHONE_NONREQUIREDDISPOSITION = "OBPhone_NonRequiredDisposition",
    OBPHONE_REQUIREDDISPOSITION = "OBPhone_RequiredDisposition",
    OBPHONECOMPRESS = "OBPhoneCompress",
    OUTBOUNDPHONE = "OutboundPhone",
    PCPHONE = "PCPhone",
    PCPHONE_ACW = "PCPhone_ACW",
    PCPHONE_ACW_DISPOSETINSCRIPT = "PCPhone_ACW_DispoSetInScript",
    PCPHONE_ACW_DISPOSITION = "PCPhone_ACW_Disposition",
    PCPHONE_BLEND_ACW = "PCPhone_Blend_ACW",
    PCPHONE_QUEUE_CONTACTS = "PCPhone_Queue_Contacts",
    REGSKILL_636698089762598333 = "RegSkill 636698089762598333",
    MAX_VOICEMAIL = "MAX_VoiceMail",
    MAX_VOICEMAIL_NONREQUIREDDISPO = "MAX_VoiceMail_NonRequiredDispo",
    MAX_VOICEMAIL_REQUIREDDISPOSIT = "MAX_VoiceMail_RequiredDisposit",
    MAX_VOICEMAIL_SCREENPOPS = "MAX_VoiceMail_ScreenPops",
    VOICEMAIL = "VoiceMail",
    VOICEMAIL_ACW = "VoiceMail_ACW",
    VOICEMAIL_NONREQUIREDDISPO = "VoiceMail_NonRequiredDispo",
    VOICEMAIL_REQUIREDDISPOSITION = "VoiceMail_RequiredDisposition",
    MAX_WORK_ITEM = "MAX_Work Item",
    MAX_WORK_ITEM_NONREQUIREDDISPO = "MAX_Work Item_NonRequiredDispo",
    MAX_WORK_ITEM_REQUIREDDISPOSIT = "MAX_Work Item_RequiredDisposit",
    MAX_WORK_ITEM_SCREENPOPS = "MAX_Work Item_ScreenPops",
    WORK_ITEM = "Work Item",
    WORK_ITEM_ACW = "Work Item_ACW",
    WORK_ITEM_NONREQUIREDDISPO = "Work Item_NonRequiredDispo",
    WORK_ITEM_REQUIREDDISPOSITION = "Work Item_RequiredDisposition"
}

export enum Proficiency {
    HIGHEST = "1 - Highest",
    TWO = "2",
    THREE = "3",
    FOUR = "4",
    FIVE = "5",
    SIX = "6",
    SEVEN = "7",
    EIGHT = "8",
    NINE = "9",
    TEN = "10",
    ELEVEN = "11",
    TWELVE = "12",
    THIRTEEN = "13",
    FOURTEEN = "14",
    FIFTEEN = "15",
    SIXTEEN = "16",
    SEVENTEEN = "17",
    EIGHTTEEN = "18",
    NINETEEN = "19",
    LOWEST = "20 - Lowest"
}

export enum StartTime {
    TWELVE_AM = "12:00 AM",
    HALFTWELVE_AM = "12:30 AM",
    ONE_AM = "1:00 AM",
    HALF_AM = "1:30 AM",
    TWO_AM = "2:00 AM",
    HALFTWO_AM = "2:30 AM",
    THREEE_AM = "3:00 AM",
    HALFTHREE_AM = "3:30 AM",
    FOUR_AM = "4:00 AM",
    HALFFOUR_AM = "4:30 AM",
    FIVE_AM = "5:00 AM",
    HALFFIVE_AM = "5:30 AM",
    SIX_AM = "6:00 AM",
    HALFSIX_AM = "6:30 AM",
    SEVEN_AM = "7:00 AM",
    HALFSEVEN_AM = "7:30 AM",
    EIGHT_AM = "8:00 AM",
    HALFEIGHT_AM = "8:30 AM",
    NINE_AM = "9:00 AM",
    HALFNINE_AM = "9:30 AM",
    TEN_AM = "10:00 AM",
    HALFTEN_AM = "10:30 AM",
    ELEVEN_AM = "11:00 AM",
    HALFELEVEN_AM = "11:30 AM",
    TWELVE_PM = "12:00 PM",
    HALFTWELVE_PM = "12:30 PM",
    ONE_PM = "1:00 PM",
    HALFONE_PM = "1:30 PM",
    TWO_PM = "2:00 PM",
    HALFTWO_PM = "2:30 PM",
    THREE_PM = "3:00 PM",
    HALFTHREE_PM = "3:30 PM",
    FOUR_PM = "4:00 PM",
    HALFFOUR_PM = "4:30 PM",
    FIVE_PM = "5:00 PM",
    HALFFIVE_PM = "5:30 PM",
    SIX_PM = "6:00 PM",
    HALFSIX_PM = "6:30 PM",
    SEVEN_PM = "7:00 PM",
    HALFSEVEN_PM = "7:30 PM",
    EIGHT_PM = "8:00 PM",
    HALFEIGHT_PM = "8:30 PM",
    NINE_PM = "9:00 PM",
    HALFNINE_PM = "9:30 PM",
    TEN_PM = "10:00 PM",
    HALFTEN_PM = "10:30 PM",
    ELEVEN_PM = "11:00 PM",
    HALFELEVEN_PM = "11:30 PM"
}

export enum RuleAgent {
    ADMIN_IMPERSONATED = "Admin, Impersonated",
    SUPERVISORSMOKEDEPLOY = "0001, SupervisorSmokeDeploy",
    SMOKEDEPLOY01 = "0001, SmokeDeploy",
    SMOKEDEPLOY02 = "0002, SmokeDeploy",
    SMOKEDEPLOY03 = "0003, SmokeDeploy",
    CHAT01 = "Chat, Max",
    CHAT02 = "Chat, Max",
    CHAT03 = "Chat, Max",
    CHATREQUIRED01 = "ChatRequired, Max",
    CHATREQUIRED02 = "ChatRequired, Max",
    DOE = "Doe, John",
    IBEMAIL_CHAT = "Ibemail Chat, Max",
    IBEMAIL_IBPHONE_CHAT = "Ibemail IbPhone Chat, Max",
    IBEMAIL_IBPHONE = "Ibemail IbPhone, Max",
    IBEMAIL_OBPHONE = "Ibemail OBPhone, Max",
    IBEMAIL_VOICEMAIL = "Ibemail VoiceMail, Max",
    IBEMAIL_WORKITEM = "Ibemail WorkItem, Max",
    IBEMAIL = "Ibemail, Max",
    IBEMAIL_NR = "Ibemail_nr, Max",
    IBEMAIL_RIBPHONE = "Ibemail_r Ibphone, Max",
    IBEMAIL_R = "Ibemail_r, Max",
    IBPHONE = "IbPhone, Max",
    IBPHONE_NR = "IbPhone_nr, Max",
    IBPHONE_ROBPHONE = "IbPhone_r Obphone, Max",
    IBPHONE_R01 = "IbPhone_r, Max",
    IBPHONE_R02 = "IbPhone_r, Max",
    OBEMAIL_ACW = "Obemail ACW, Max",
    OBEMAIL_CHAT = "Obemail Chat, Max",
    OBEMAIL_IBPHONE = "Obemail IbPhone, Max",
    OBEMAIL_IBPHONE_R = "Obemail IbPhone_r, Max",
    OBEMAIL_OBPHONE = "Obemail OBPhone, Max",
    OBEMAIL_VOICEMAIL = "Obemail Voicemail, Max",
    OBEMAIL_WORKITEM = "Obemail WorkItem, Max",
    OBEMAIL = "Obemail, Max",
    OBEMAIL_NR = "Obemail_nr, Max",
    OBEMAIL_RIBPHONE = "Obemail_r IbPhone, Max",
    OBEMAIL_R = "Obemail_r, Max",
    OBPHONE_ACW = "Obphone ACW, Max",
    OBPHONE_VOICE_MAIL = "Obphone Voicemail, Max",
    OBPHONE1 = "Obphone, Max",
    OBPHONE2 = "ObPhone, Max2",
    OBPHONE3 = "ObPhone, Max2",
    OBPHONE_NR = "Obphone_nr, Max",
    OBPHONE_R = "Obphone_r, Max",
    RD_OBPHONE_CHAT_VOICEMAIL = "RD ObPhone Chat Voicemail, Max",
    SMOKEDEPLOYSC0001COM1 = "SmokeDeploySC0001.com, Administrator",
    SMOKEDEPLOYSC0001COM2 = "SmokeDeploySC0001.com, Manager",
    TRANSFER = "Transfer, Max",
    VOICEMAIL = "Voicemail, Max",
    VOICEMAIL_NR = "Voicemail_nr, Max",
    VOICEMAIL_R = "Voicemail_r, Max"
}

export enum RuleTeam {
    DEFAULT_TEAM = "DefaultTeam",
    ADMIN = "Admin",
    BULK_UPLOADER = "Bulk Uploader",
    FGCVBGVH = "fgcvbgvh",
    GBU_TEAM = "GBU Team",
    GBU636698564798073956 = "GBU636698564798073956",
    LGVN_TEST1 = "LGVN_test1",
    MAX_AUTOMATION = "MAX Automation",
    OTXAJZECWUHYWCJUHODZAFZJAAELEH = "OtxAjZEcwUhyWcjuhoDzafZJaaeLeh",
    REGTEAM164 = "RegTeam164",
    REGTEAM636697655265233622 = "RegTeam636697655265233622",
    REGTEAM843 = "RegTeam843"
}

export class WFIRule {
    ruleName: string;
    frequency: RecurrenceFrequency;
    startDate: string;
    startTime: StartTime;
    end: RecurrenceEnd;
    description: string;
    every: string;
    on: string;
    ruleType: string;
    category: ConditionsCategory;
    dataPoint: ConditionsDataPoint;
    operator: ConditionsOperator;
    value: number;
    numberOfContacts: number;
    skill: RuleSkill;
    proficiency: Proficiency;
    recoveryLevel: number;
    agent: RuleAgent;
    team: RuleTeam;
    occurrence: string;

    public initData(reportName: string): WFIRule {
        try {
            this.ruleName = reportName + Utility.createRandomString(15);
            this.frequency = RecurrenceFrequency.HOURLY;
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
            let tmpdate: Date = new Date();
            let date: Date = new Date(tmpdate.setDate(tmpdate.getDate() + 1));
            this.startDate = date.toLocaleDateString("en-US", options);
            this.startTime = StartTime.THREEE_AM;
            this.end = RecurrenceEnd.AFTER;
            this.category = ConditionsCategory.ACD_INTRADAY;
            this.dataPoint = ConditionsDataPoint.LONGEST_WAIT_TIME;
            this.operator = ConditionsOperator.EQUAL_SMALLER;
            this.value = Math.floor(Math.random() * 100) + 1;
            this.numberOfContacts = Math.floor(Math.random() * 10) + 1;
            this.skill = RuleSkill.IB_SKILL;
            this.proficiency = Proficiency.FIVE;
            this.recoveryLevel = Math.floor(Math.random() * 100) + this.value;
            this.agent = RuleAgent.ADMIN_IMPERSONATED;
            this.team = RuleTeam.DEFAULT_TEAM;
            this.every = "1";
            this.occurrence = "1";
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}
