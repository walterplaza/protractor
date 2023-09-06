import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { Cluster, ClusterID, Environment } from "@data-objects/general/cluster";
import { JsonUtility, Utility } from "@utilities/general/utility";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { JsonObject, JsonProperty } from "json2typescript";
import TestRunInfo from "@data-objects/general/test-run-info";
import { Logger, FunctionType } from "@utilities/general/logger";

@JsonObject
export class BUSkillInfo {
    @JsonProperty("type", String)
    type: string = undefined;

    @JsonProperty("skillName", String)
    skillName: string = undefined;

    @JsonProperty("poc", String)
    poc: string = undefined;
}

@JsonObject
export class SkillDisposition {
    @JsonProperty("dispositionId", Number)
    dispositionId: number = undefined;

    @JsonProperty("dispositionName", String)
    dispositionName: string = undefined;

    @JsonProperty("priority", Number)
    priority: number = undefined;

    @JsonProperty("isPreviewDisposition", Boolean)
    isPreviewDisposition: boolean = false;
}

@JsonObject
export class StateIdACW {
    @JsonProperty("cluster", String)
    cluster: string = undefined;

    @JsonProperty("acw", Number)
    acw: number = undefined;

    @JsonProperty("dispositionRequired", Number)
    dispositionRequired: number = undefined;
}

@JsonObject
export class SkillCore {
    skillId: number = undefined;

    @JsonProperty("skillName", String)
    skillName: string = undefined;

    @JsonProperty("isActive", Boolean)
    isActive: boolean = true;

    @JsonProperty("campaignId", Number)
    campaignId: number = undefined;

    @JsonProperty("campaignName", String)
    campaignName: string = "MAXAutomation";

    @JsonProperty("notes", String)
    notes: string = "";

    @JsonProperty("acwTypeId", Number)
    acwTypeId: number = 1; // Post Contact Setup: 1 = None, 2 = Disposition, 3 = Automatic Wrap-up	

    @JsonProperty("stateIdACW", Number)
    stateIdACW: number = undefined; // 539 if stateNameACW = "ACW", 540 if stateNameACW = "Disposition Required"

    @JsonProperty("stateNameACW", String)
    stateNameACW: string = "";

    @JsonProperty("maxSecondsACW", Number)
    maxSecondsACW: number = 0;

    @JsonProperty("acwPostTimeoutStateId", Number)
    acwPostTimeoutStateId: number = undefined;

    @JsonProperty("acwPostTimeoutStateName", String)
    acwPostTimeoutStateName: string = "";

    @JsonProperty("requireDisposition", Boolean)
    requireDisposition: boolean = false;

    @JsonProperty("allowSecondaryDisposition", Boolean)
    allowSecondaryDisposition: boolean = false;

    @JsonProperty("scriptDisposition", Boolean)
    scriptDisposition: boolean = false;

    @JsonProperty("agentRestTime", Number)
    agentRestTime: number = 0;

    @JsonProperty("makeTranscriptAvailable", Boolean)
    makeTranscriptAvailable: boolean = false;

    @JsonProperty("transcriptFromAddress", String)
    transcriptFromAddress: string = "";

    @JsonProperty("displayThankyou", Boolean)
    displayThankyou: boolean = false;

    @JsonProperty("thankYouLink", String)
    thankYouLink: string = "";

    @JsonProperty("popThankYou", Boolean)
    popThankYou: boolean = false;

    @JsonProperty("popThankYouURL", String)
    popThankYouURL: string = "";

    @JsonProperty("isOutbound", Boolean)
    isOutbound: boolean = false;

    @JsonProperty("outboundStrategy", String)
    outboundStrategy: string = "";

    @JsonProperty("isRunning", Boolean)
    isRunning: boolean = false;

    @JsonProperty("priorityBlending", Boolean)
    priorityBlending: boolean = false;

    @JsonProperty("callerIdOverride", String)
    callerIdOverride: string = "";

    @JsonProperty("scriptId", Number)
    scriptId: number = 0;

    @JsonProperty("scriptName", String)
    scriptName: string = "";

    @JsonProperty("emailFromAddress", String)
    emailFromAddress: string = "test@email.com";

    @JsonProperty("emailFromEditable", Boolean)
    emailFromEditable: boolean = true;

    @JsonProperty("emailBccAddress", String)
    emailBccAddress: string = "";

    @JsonProperty("emailParking", Boolean)
    emailParking: boolean = false;

    @JsonProperty("chatWarningThreshold", Number)
    chatWarningThreshold: number = 0;

    @JsonProperty("agentTypingIndicator", Boolean)
    agentTypingIndicator: boolean = false;

    @JsonProperty("patronTypingPreview", Boolean)
    patronTypingPreview: boolean = false;

    @JsonProperty("interruptible", Boolean)
    interruptible: boolean = false;

    // @JsonProperty("callSuppressionScriptId", Number) // Cannot update OBPhone when callSuppressionScriptId is null
    // callSuppressionScriptId: number = undefined;

    @JsonProperty("reskillHours", Number)
    reskillHours: number = undefined;

    @JsonProperty("reskillHoursName", String)
    reskillHoursName: string = "";

    @JsonProperty("countReskillHours", Boolean)
    countReskillHours: boolean = false;

    @JsonProperty("minWFIAgents", String)
    minWFIAgents: string = "";

    @JsonProperty("minWFIAvailableAgents", String)
    minWFIAvailableAgents: string = "";

    @JsonProperty("useScreenPops", Boolean)
    useScreenPops: boolean = false;

    @JsonProperty("screenPopTriggerEvent", Number)
    screenPopTriggerEvent: number = undefined;

    @JsonProperty("useCustomScreenPops", Boolean)
    useCustomScreenPops: boolean = false;

    @JsonProperty("screenPopType", String)
    screenPopType: string = "";

    @JsonProperty("screenPopDetails", String)
    screenPopDetails: string = "";

    @JsonProperty("screenPopDetail", String)
    screenPopDetail: string = "";

    @JsonProperty("minWorkingTime", Number)
    minWorkingTime: number = 30;

    @JsonProperty("agentless", Boolean)
    agentless: boolean = false;

    @JsonProperty("agentlessPorts", Number)
    agentlessPorts: number = undefined;

    @JsonProperty("initialPriority", Number)
    initialPriority: number = 0;

    @JsonProperty("acceleration", Number)
    acceleration: number = 1;

    @JsonProperty("maxPriority", Number)
    maxPriority: number = 1000;

    @JsonProperty("serviceLevelThreshold", Number)
    serviceLevelThreshold: number = 30;

    @JsonProperty("serviceLevelGoal", Number)
    serviceLevelGoal: number = 90;

    @JsonProperty("enableShortAbandon", Boolean)
    enableShortAbandon: boolean = false;

    @JsonProperty("shortAbandonThreshold", Number)
    shortAbandonThreshold: number = 15;

    @JsonProperty("countShortAbandons", Boolean)
    countShortAbandons: boolean = true;

    @JsonProperty("countOtherAbandons", Boolean)
    countOtherAbandons: boolean = true;

    @JsonProperty("messageTemplateId", Number)
    messageTemplateId: number = undefined;

    @JsonProperty("smsTransportCodeId", Number)
    smsTransportCodeId: number = undefined;

    @JsonProperty("smsTransportCode", String)
    smsTransportCode: string = "";

    @JsonProperty("dispositions", [SkillDisposition])
    dispositions: SkillDisposition[] = [];

    @JsonProperty("deliverMultipleNumbersSerially", Boolean)
    deliverMultipleNumbersSerially: boolean = false;

    @JsonProperty("cradleToGrave", Boolean)
    cradleToGrave: boolean = false;

    @JsonProperty("priorityInterrupt", Boolean)
    priorityInterrupt: boolean = false;

    @JsonProperty("enableParking", Boolean)
    enableParking: boolean = false;

    /**
     * Initialize Data for Skill Core
     * @author Phat.Ngo
     * @param {Agent} agent which want to setup skill
     * @param {SkillType} skillType type of skill
     * @param {boolean} [requiredDisposition] Required Disposition = true, Non-Required Disposition = false, default = null
     * @param {boolean} [acw] Required ACW = true, Non-Required ACW = false, default = null
     * @param {string} [jsonString] Json that contain property want to modify in special case
     * @returns {Promise<SkillCore>}
     * @memberof SkillCore
     */
    public async initData(agent: Agent, skillType: SkillType, requiredDisposition?: boolean, acw?: boolean): Promise<SkillCore> {
        try {
            await Logger.write(FunctionType.API, `initData ${skillType}`);
            this.skillName = SkillCore.getSkillName(skillType);
            await Logger.write(FunctionType.API, `initData skillName ${this.skillName}`);
            this.skillId = await CustomAPIs.getSkillIdFromSkillName(agent, skillType);
            if (TestRunInfo.clusterID == ClusterID.DO45) {
                this.campaignName = "Campaign";
            }
            this.campaignId = await CustomAPIs.getCampaignIdFromCampaignName(agent, this.campaignName);

            if (skillType == SkillType.OB_PHONE || skillType == SkillType.OB_EMAIL || skillType == SkillType.OB_PHONE_ALT) {
                this.isOutbound = true;
                this.outboundStrategy = "Manual";
            }
            if (skillType == SkillType.OB_EMAIL || skillType == SkillType.IB_EMAIL) {
                this.emailFromAddress = `email@SmokeDeploy${Cluster.getClusterName()}.com`;
            }
            if (requiredDisposition != null) {
                this.dispositions = await CustomAPIs.getAllSkillDispositions(agent, this.skillId);
                this.acwTypeId = 2;
                this.maxSecondsACW = 15;
                this.requireDisposition = false;
                if (acw && !requiredDisposition) {
                    this.stateIdACW = await CustomAPIs.getOutStateId(agent, "ACW");
                    this.stateNameACW = "ACW";
                } else {
                    this.stateIdACW = await CustomAPIs.getOutStateId(agent, "Disposition Required");
                    this.stateNameACW = "Disposition Required";
                }
                if (requiredDisposition) {
                    this.requireDisposition = true;
                }
            } else if (requiredDisposition == null && acw == true) {
                this.acwTypeId = 3;
                this.maxSecondsACW = 15;
                this.stateIdACW = await CustomAPIs.getOutStateId(agent, "ACW");
                this.stateNameACW = "ACW";
            } else
                this.stateIdACW = 0;

            // Need to set these variables to 0 because it will be failed if we serialize undefined variables
            this.acwPostTimeoutStateId = 0;
            // this.callSuppressionScriptId = 0; // Cannot update OBPhone when callSuppressionScriptId is null
            this.messageTemplateId = 0;
            this.smsTransportCodeId = 0;
            this.reskillHours = 0;
            this.screenPopTriggerEvent = 0;
            this.agentlessPorts = 0;
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }

    /**
     * Generate Skill Core JSON
     * @author Phat.Ngo
     * @returns {string}
     * @memberof SkillCore
     */
    public generateSkillCoreJSON(): string {
        let jsonObj = JsonUtility.serialize(this);

        // Need to set these variables to null when converting to JSON
        if (jsonObj.stateIdACW == 0)
            jsonObj.stateIdACW = null;
        if (jsonObj.acwPostTimeoutStateId == 0)
            jsonObj.acwPostTimeoutStateId = null;
        if (jsonObj.callSuppressionScriptId == 0)
            jsonObj.callSuppressionScriptId = null;
        if (jsonObj.messageTemplateId == 0)
            jsonObj.messageTemplateId = null;
        if (jsonObj.smsTransportCodeId == 0)
            jsonObj.smsTransportCodeId = null;
        if (jsonObj.reskillHours == 0)
            jsonObj.reskillHours = null;
        if (jsonObj.screenPopTriggerEvent == 0)
            jsonObj.screenPopTriggerEvent = null;
        if (jsonObj.agentlessPorts == 0)
            jsonObj.agentlessPorts = null;
        return JSON.stringify(jsonObj);
    }

	/**
     * Get skill name by skill type
     * @author Phat.Ngo
     * @static
     * @param {SkillType} skillType
     * @returns {string}
     * @memberof SkillCore
     */
    public static getSkillName(skillType: SkillType): string {
        if (TestRunInfo.environment == Environment.INCONTACT || TestRunInfo.environment == Environment.USERHUB ) {
            switch (skillType) {
                case SkillType.CHAT:
                    return TestRunInfo.cluster.getBUSkillInfo("chat").skillName;
                case SkillType.IB_EMAIL:
                    return TestRunInfo.cluster.getBUSkillInfo("ibemail").skillName;
                case SkillType.IB_Phone:
                    return TestRunInfo.cluster.getBUSkillInfo("ibphone").skillName;
                case SkillType.OB_EMAIL:
                    return TestRunInfo.cluster.getBUSkillInfo("obemail").skillName;
                case SkillType.OB_PHONE:
                    return TestRunInfo.cluster.getBUSkillInfo("obphone").skillName;
                case SkillType.OB_PHONE_ALT:
                    return TestRunInfo.cluster.getBUSkillInfo("obphone_alt").skillName;
                case SkillType.VOICEMAIL:
                    return TestRunInfo.cluster.getBUSkillInfo("voicemail").skillName;
                case SkillType.WORK_ITEM:
                    return TestRunInfo.cluster.getBUSkillInfo("workitem").skillName;
                case SkillType.PC_PHONE:
                    return TestRunInfo.cluster.getBUSkillInfo("pcphone").skillName;
                case SkillType.SMS:
                    return TestRunInfo.cluster.getBUSkillInfo("SMS").skillName;
                case SkillType.IBPhone_PageAction:
                    return TestRunInfo.cluster.getBUSkillInfo("IBPhone_PageAction").skillName;
                default: throw `The ${skillType} is invalid`;
            }
        } else if (TestRunInfo.environment == Environment.CXONE) {
            switch (skillType) {
                case SkillType.CHAT:
                    return "ChatSkillAutomation";
                case SkillType.IB_EMAIL:
                    return "IBEmailSkillAutomation";
                case SkillType.IB_Phone:
                    return "IBPhoneSkillAutomation";
                case SkillType.OB_EMAIL:
                    return "OBEmailSkillAutomation";
                case SkillType.OB_PHONE:
                    return "OBPhoneSkillAutomation";
                default: throw `The ${skillType} is invalid`;
            }
        }
    }


	/**
     * Get skill POC by skill type
     * @author Phat.Ngo
     * @static
     * @param {SkillType} skillType
     * @returns {string}
     * @memberof SkillCore
     */
    public static getSkillPOC(skillType: SkillType): string {
        switch (skillType) {
            case SkillType.CHAT:
                return TestRunInfo.cluster.getBUSkillInfo("chat").poc;
            case SkillType.IB_EMAIL:
                return TestRunInfo.cluster.getBUSkillInfo("ibemail").poc;
            case SkillType.IB_Phone:
                return TestRunInfo.cluster.getBUSkillInfo("ibphone").poc;
            case SkillType.OB_EMAIL:
                return "";
            case SkillType.OB_PHONE:
                return "";
            case SkillType.OB_PHONE_ALT:
                return "";
            case SkillType.VOICEMAIL:
                return "";
            case SkillType.WORK_ITEM:
                return TestRunInfo.cluster.getBUSkillInfo("workitem").poc;
            case SkillType.SMS:
                return TestRunInfo.cluster.getBUSkillInfo("SMS").poc;
            default: throw `The ${skillType} is invalid`;
        }
    }

    /**
     * Get skill name by skill type
     * @author Phat.Ngo
     * @static
     * @param {SkillType} skillType
     * @returns {string}
     * @memberof SkillCore
     */
    public static getEvolveSkillName(skillType: SkillType, requiredDisposition?: boolean): string {
        switch (skillType) {
            case SkillType.IB_Phone:
                if (requiredDisposition == null) {
                    return "IBPhoneSkillAutomation";
                }
                else if (requiredDisposition) {
                    return "IBPhoneRequiredDisposition";
                }
                else if (!requiredDisposition) { }

            case SkillType.OB_PHONE:
                return "OBPhoneSkillAutomation";
            case SkillType.OB_PHONE_ALT:
                return "OBPhoneSkillAutomation";
            default: throw `The ${skillType} is invalid`;
        }
    }
}
export class OutBoundEmail {
    skillId: number;
    contactId: number;
    toAddress: string;
    fromAddress: string;
    ccAddress: string;
    bccAddress: string;
    subject: string;
    bodyHtml: string;
    attachments: string;
    attachmentNames: string;

    /**
     * Initialize data for OutBoundEmail
     * @returns {OutBoundEmail}
     * @memberof OutBoundEmail
     */
    public initData(): OutBoundEmail {
        try {
            this.toAddress = Utility.createRandomString(15, 'lgvn_email') + '@mailinator.com';
            this.fromAddress = Utility.createRandomString(15, 'lgvn_email') + '@mailinator.com';
            this.ccAddress = Utility.createRandomString(15, 'lgvn_email') + '@mailinator.com';
            this.bccAddress = Utility.createRandomString(15, 'lgvn_email') + '@mailinator.com';
            this.subject = Utility.createRandomString(15, 'lgvn_subject');
            this.bodyHtml = Utility.createRandomString(15, 'lgvn_body');
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}

export class InboundEmail {
    from: string;
    to: string;
    subject: string;
    text: string;

    /**
     * Initialize data for InboundEmail
     * @returns {InboundEmail}
     * @memberof InboundEmail
     */
    public async initData(agent: Agent, skillType: SkillType, emailSubject?: string, emailBody?: string): Promise<InboundEmail> {
        try {
            this.from = "NoReply@incontact.com";
            this.to = await CustomAPIs.getPointOfContactAddress(agent, skillType);
            if (emailSubject != null) {
                this.subject = emailSubject;
            } else {
                this.subject = "Test Automation";
            }
            if (emailBody != null) {
                this.text = emailBody;
            } else {
                this.text = "Test Automation";
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}
export class OutBoundCall {
    mediaType: string;
    skillName: string;
    direction: string;
    obStrategy: string;
    campaign: string;

    /**
     * Initialize data for OutBoundCall
     * @param {MediaType} mediaType
     * @returns {OutBoundCall}
     * @memberof OutBoundCall
     */
    public initData(): OutBoundCall {
        try {
            this.mediaType = "Phone Call";
            this.skillName = Utility.createRandomString(20, 'lgvn_skill_');
            this.direction = "Outbound";
            this.obStrategy = "Personal Connection";
            this.campaign = "Campaign";
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}

export class SkillTag {
    skillName: string = "";
    skillID: string = ""
    tagID: string = "";
    tagName: string = "";
    notes: string = "";
    isActive: boolean;

    /**
     * Initialize data for SkillTag
     * @returns {SkillTag}
     * @memberof SkillTag
     */
    public initData(): SkillTag {
        try {
            this.tagName = Utility.createRandomString(20, 'lgvn_tagName');
            this.notes = Utility.createRandomString(20, 'lgvn_notes');
            this.isActive = true;
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}

export enum SkillType {
    IB_Phone,
    IBPhone_PageAction,
    OB_PHONE,
    OB_PHONE_ALT,
    WORK_ITEM,
    CHAT,
    VOICEMAIL,
    IB_EMAIL,
    OB_EMAIL,
    CONFIG,
    PC_PHONE,
    SMS
}

export enum ContactEvent {
    CALL = "CallContactEvent",
    EMAIL = "EmailContactEvent",
    VOICE_MAIL = "VoiceMailContactEvent",
    CHAT = "ChatContactEvent",
    WORK_ITEM = "WorkItemContactEvent"
}