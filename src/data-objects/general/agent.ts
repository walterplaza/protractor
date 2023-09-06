import inContactAPIs from "@apis/incontact-apis";
import { APIVersion, Environment } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { JsonObject, JsonProperty } from "json2typescript";

export enum CxOneAgentRole {
	ADMINISTRATOR = "Administrator",
	AGENT = "Agent",
	EVALUATOR = "Evaluator",
	MANAGER = "Manager"
}

@JsonObject
export class Agent {

	@JsonProperty("type", String)
	type: string = undefined;

	@JsonProperty("email", String)
	email: string = undefined;

	@JsonProperty("password", String)
	password: string = undefined;

	@JsonProperty("name", String)
	name: string = undefined;

	@JsonProperty("agentID", String)
	agentID: string = undefined;

	// @JsonProperty("skillList", [Skill])
	// skillList: Skill[] = undefined;

	firstName: string;
	lastName: string;
	cxOneRole: CxOneAgentRole;
	accessToken: string;
	baseUri: string;
	tokenType: string;
	teamID: string;
	businessNumber: string;
	sessionId: string;
	phoneNumber: string;
	refreshToken: string;

	/**
	 * Random a phone number for each environment
	 * @returns {string} return phone number as a string
	 * @memberof Agent
	 */
	public randomPhoneNumber(): string {
		let randomPhone: string;

		if (TestRunInfo.environment.match(Environment.CXONE)) {
			let clusterType: string = TestRunInfo.clusterID.substr(0, 1).toLowerCase();

			if (clusterType == "t") {
				if (TestRunInfo.tenantName == "perm_automation_TO31" || TestRunInfo.tenantName == "perm_automation_TO32") {
					randomPhone = "400515000" + Utility.getRandomNumber(1, 0, 4);
				} else {
					randomPhone = "400515000" + Utility.getRandomNumber(1, 5, 9);
				}
			}
			else if (clusterType == "s") {
				if (TestRunInfo.tenantName == "Perm Automation staging" || TestRunInfo.tenantName == "perm SO32Load 100007") {
					randomPhone = "40000100" + Utility.getRandomNumber(2, 10, 50);
				} else {
					randomPhone = "40000100" + Utility.getRandomNumber(2, 51, 99);
				}
			}
			else if (clusterType == "b") {
				randomPhone = "777320549" + Utility.getRandomNumber(1);
			}
			else if (clusterType == "b" || clusterType == "c" || clusterType == "a" || clusterType == "e") {
				randomPhone = "777320549" + Utility.getRandomNumber(1);
			}
		} else {
			randomPhone = "40000100" + Utility.getRandomNumber(2);
		}

		return randomPhone;
	}

	/**
	 * Create unique phone number
	 * @returns {Promise<void>}
	 * @memberof Agent
	 */
	public async createPhoneNumber(isAdmin: boolean = false): Promise<void> {
		try {
			await Logger.write(FunctionType.API, `Generating new phone number`);
			let response: APIResponse = await inContactAPIs.getAgentsStates(this, APIVersion.V12);
			await Logger.write(FunctionType.API, `Get agent status with status ` + response.status);

			for (let i = 0; i < 2; i++) {
				if (response.status != 200) {

					// Buffer time before API requests again
					await Utility.delay(3);
					response = await inContactAPIs.getAgentsStates(this, APIVersion.V12);

				}
			}

			if (response.status != 200) {
				throw new Error("API fail to get agents states");
			}

			if (TestRunInfo.environment.match(Environment.INCONTACT)) {
				let usablePhoneNumberArr: string[] = new Array();
				for (let j = 10; j < 100; j++) {
					if (response.body.indexOf("40000100" + j) < 0) {
						usablePhoneNumberArr.push("40000100" + j);
					}
				}
				if (usablePhoneNumberArr.length == 0) {
					await Logger.write(FunctionType.API, `All phone number list is in use`);
				} else {
					this.phoneNumber = usablePhoneNumberArr[Math.floor(Math.random() * usablePhoneNumberArr.length)]
				}

			} else {

				let count = 0;
				this.phoneNumber = '';
				let clusterType: string = TestRunInfo.clusterID.substr(0, 1).toLowerCase();
				if (clusterType == "c" && isAdmin == true) {
					this.phoneNumber = '13852534098';
				}
				else {
					while ((response.body.includes(this.phoneNumber) || this.phoneNumber == '7773205496' || this.phoneNumber == '') && count <= 100) {
						count++;
						this.phoneNumber = await this.randomPhoneNumber();
						response = await inContactAPIs.getAgentsStates(this, APIVersion.V12);
						await Logger.write(FunctionType.API, `Get agent status with status` + response.status);
					}
				}
			}
			await Logger.write(FunctionType.API, `Create phone number successfully: ` + this.phoneNumber);

		} catch (err) {
			throw new errorwrapper.CustomError(this.createPhoneNumber, err.message);
		}
	}

	/**
	 * Initialize data for Agent
	 * @param {CxOneAgentRole} role of Agent
	 * @returns {Agent}
	 * @memberof Agent
	 */
	public initCxOneData(role: CxOneAgentRole): Agent {
		try {
			this.password = "Password1";
			this.firstName = "lgvn";
			this.lastName = Utility.createRandomString(12, "test");
			this.email = "lgvn_" + this.lastName + "@mailinator.com";
			this.name = this.firstName + " " + this.lastName;
			this.cxOneRole = role;
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.initCxOneData, err.message);
		}
	}

	/**
	 * Get agent type by skill type
	 * @author Phat.Ngo
	 * @static
	 * @param {SkillType} skillType
	 * @returns {string}
	 * @memberof Agent
	 */
	public static getAgentType(skillType: SkillType): string {
		switch (skillType) {
			case SkillType.CHAT:
				return "Chat1";
			case SkillType.IB_EMAIL:
				return "Ibemail1";
			case SkillType.IB_Phone:
				return "Ibphone1";
			case SkillType.OB_EMAIL:
				return "Obemail1";
			case SkillType.OB_PHONE:
				return "Obphone1";
			case SkillType.VOICEMAIL:
				return "Voicemail1";
			case SkillType.WORK_ITEM:
				return "Workitem1";
			case SkillType.CONFIG:
				return "Admin";
			case SkillType.SMS:
				return "SMS";
			case SkillType.IBPhone_PageAction:
				return "IBPhone_PageAction";
			default: throw `The ${skillType} is invalid`;
		}
	}
}

export enum AgentType {
	CXONE_SUPERADMIN = "SuperAdmin",
	CXONE_ADMIN = "Admin",
	CXONE_AGENT1 = "Agent1",
	CXONE_AGENT2 = "Agent2",
	CXONE_AGENT3 = "Agent3",
	USERHUB_IB_PHONE_REQUIRED = "IBPhone_RequiredDisposition",
	USERHUB_OB_PHONE_REQUIRED = "OBPhone_RequiredDisposition",
	USERHUB_CHAT = "Chat",
	USERHUB_OBPHONE = "OBPhone",
	USERHUB_IBPHONE = "IBPhone",
	USERHUB_PCPHONE = "PCPhone",
	USERHUB_IBEAMIL = "IBEmail",
	USERHUB_OBEMAIL = "OBEmail",
	USERHUB_VOICEMAIL = "VoiceMail",
	USERHUB_WORKITEM = "WorkItem",
	USERHUB_SMS = "Sms",
	USERHUB_AGENT1 = "Agent1",
	USERHUB_AGENT2 = "Agent2",
	USERHUB_ADMINISTRATOR = "Administrator",
	USERHUB_MANAGER = "Manager",
	USERHUB_CUSER = "CUser",
	TMA = "TMA"
}

export enum InContactAgentID {
	ADMIN_ID = "41418",
	TRANSFER1_ID = "42877",
	GENERAL1_ID = "42880",
	AGENT1_ID = "41419",
	AGENT2_ID = "41420",
	USER_NO_SKILL_ID = "41419",
	CREATE_CHAT1_ID = "42879",
	CHAT1_ID = "42857",
	CHAT_REQUIRED1_ID = "42856",
	IBPHONE1_ID = "42863",
	IBPHONE_NOT_REQUIRED1_ID = "42861",
	IBPHONE_REQUIRED1_ID = "42862",
	OBPHONE1_ID = "42869",
	OBPHONE_NOT_REQUIRED1_ID = "42867",
	OBPHONE_REQUIRED1_ID = "42868",
	OBPHONE2_ID = "42876",
	OBPHONE_ACW1_ID = "42884",
	IBEMAIL1_ID = "42860",
	IBEMAIL_NOT_REQUIRED1_ID = "42858",
	IBEMAIL_REQUIRED1_ID = "42859",
	OBEMAIL1_ID = "42866",
	OBEMAIL_NOT_REQUIRED1_ID = "42864",
	OBEMAIL_REQUIRED1_ID = "42865",
	OBEMAIL_ACW1_ID = "42885",
	VOICEMAIL1_ID = "42875",
	VOICEMAIL_NOT_REQUIRED1_ID = "42873",
	VOICEMAIL_REQUIRED1_ID = "42874",
	WORKITEM1_ID = "42872",
	WORKITEM_NOT_REQUIRED1_ID = "42870",
	WORKITEM_REQUIRED1_ID = "42871",
	IBEMAILPHONE2_ID = "42881",
	OBEMAILPHONE2_ID = "42882",
	OBPHONE_CHAT_VOICEMAIL_REQUIRED3_ID = "42883",
	CHAT_WORKITEM2_ID = "42886",
	IBEMAIL_REQ_IBPHONE2_ID = "42887",
	IBPHONE_REQ_OBPHONE2_ID = "42888",
	IBPHONE_OBPHONE2_ID = "42889",
	ALL_MEDIA_TYPES_ID = "42890",
	OBEMAIL_IBPHONE_REQ2_ID = "42891",
	OBEMAIL_REQ_IBPHONE2_ID = "42892",
	IBEMAIL_PHONE_CHAT3_ID = "42893",
	IBEMAIL_CHAT2_ID = "42894",
	OBPHONE_VOICEMAIL2_ID = "42895",
	IBEMAIL_WORKITEM2_ID = "42896",
	IBEMAIL_VOICEMAIL2_ID = "42897",
	IBEMAIL_OBPHONE2_ID = "42898",
	OBEMAIL_OBPHONE2_ID = "42899",
	OBEMAIL_CHAT2_ID = "42900",
	OBEMAIL_WORKITEM2_ID = "42901",
	OBEMAIL_VOICEMAIL2_ID = "42902"
}