import CallingDNCGroupManagementInstance from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management";
import PhoneCallManagementInstance from "@apis/agent/phone-call-management/phone-call-management";
import CustomAPIs from "@apis/custom-apis";
import inContactAPIs from "@apis/incontact-apis";
import { Agent, AgentType } from "@data-objects/general/agent";
import { APIVersion, Cluster, MaxState, PageName } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import QuickRepliesPage from "@page-objects/inContact/central/admin/communication/quick-replies/quick-replies";
import UserDetailsPage from "@page-objects/inContact/central/admin/users/user-details-page";
import UserDetailsSystemPage from "@page-objects/inContact/central/admin/users/user-details/user-details-system-page";
import UsersPage from "@page-objects/inContact/central/admin/users/users-page";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import SkillsDetailPage from "@page-objects/inContact/central/routing/skills/skills-detail-page";
import SkillsListPage from "@page-objects/inContact/central/routing/skills/skills-list-page";
import { APIResponse } from "@utilities/general/api-core";
import { JsonUtility, Utility } from "@utilities/general/utility";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import * as fs from 'fs';
import { FunctionType, Logger } from "../utilities/general/logger";
import TestHelpers from "./test-helpers";
export class TestCondition {

    /**
     * Register a agent
     * @author Phat.Ngo
     * @static
     * @param {SkillType} skillType
     * @returns {Agent}
     * @memberof TestCondition
     */
    public static async registerAgent(skillType: SkillType): Promise<Agent> {
        try {
            let agent: Agent = TestRunInfo.cluster.getInContactAgent(skillType);
            await CustomAPIs.authorize(agent);
            return agent
        } catch (err) {
            throw new errorwrapper.CustomError(this.registerAgent, err.message);
        }
    }

    /**
     * Register a CxOne agent
     * @author Phat.Ngo
     * @static
     * @param {AgentType} agentType
     * @returns {Promise<Agent>}
     * @memberof TestCondition
     */
    public static async registerCxOneAgent(agentType: AgentType): Promise<Agent> {
        try {
            let agent: Agent = TestRunInfo.cluster.getCxOneAgent(agentType);

            if (agentType != AgentType.CXONE_SUPERADMIN && agentType != AgentType.TMA) {
                await CustomAPIs.authorize(agent);
            }

            if (agentType == AgentType.TMA) {
                await CustomAPIs.authorizeTMAUser(agent);
            }

            return agent;
        } catch (err) {
            throw new errorwrapper.CustomError(this.registerCxOneAgent, err.message);
        }
    }

    /**
     * Register, clean up and set up skill for agent
     * @author Nhat.Nguyen
     * @static
     * @param {AgentType} agentType
     * @returns {Promise<Agent>}
     * @memberof TestCondition
     */
    public static async setUpCxOneAgent(agentType: AgentType, timeOut?: number): Promise<Agent> {
        try {
            await Logger.write(FunctionType.API, `Setting up CxOne agent`);
            let agent: Agent = await this.registerCxOneAgent(agentType);
            await agent.createPhoneNumber();
            await TestHelpers.endAllContacts(agent, timeOut);
            return agent;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setUpCxOneAgent, err.message);
        }
    }

    /**
     * Clean up CxOne Agent
     * @author Phat.Ngo
     * @static
     * @param {Agent} agent
     * @memberof TestCondition
     */
    public static async cleanUpCxOneAgent(agent: Agent) {
        try {
            await Logger.write(FunctionType.API, `Cleaning up all agent's skills`);
            await agent.createPhoneNumber();
            await CustomAPIs.endAllContacts(agent);
        } catch (err) {
            throw new errorwrapper.CustomError(this.cleanUpCxOneAgent, err.message);
        }
    }

    /**
     * Setting skill information before testing
     * @author Phat.Ngo
     * @static
     * @param {Agent} agent which want to setup skill
     * @param {SkillType} skillType type of skill
     * @param {boolean} [requiredDisposition] Required Disposition = true, Non-Required Disposition = false, default = null
     * @param {boolean} [acw] Required ACW = true, Non-Required ACW = false, default = null
     * @param {string} [jsonString] Json that contain property want to modify in special case
     * @returns {Promise<void>}
     * @memberof TestCondition
     */
    private static async setUpSkill(agent: Agent, skillType: SkillType, requiredDisposition?: boolean, acw?: boolean, jsonString?: string): Promise<void> {
        try {
            await Logger.write(FunctionType.API, `Setting skill information ${skillType}`);

            // Init default data for skill
            let skillCore = new SkillCore();
            await skillCore.initData(agent, skillType, requiredDisposition, acw);

            if (jsonString != null) {
                // Update property info for SkillCore and assign skill to agent
                JsonUtility.update(skillCore, JSON.parse(jsonString));
            }

            await CustomAPIs.updateSkillBySkillId(agent, skillCore.skillId, skillCore.generateSkillCoreJSON());
        } catch (err) {
            throw new errorwrapper.CustomError(this.setUpSkill, err.message);
        }
    }

    /**
     * Register, clean up and set up skill for agent
     * @author Phat.Ngo
     * @static
     * @param {SkillType} skillType type of skill
     * @param {boolean} [requiredDisposition] Required Disposition = true, Non-Required Disposition = false, default = null
     * @param {boolean} [acw] Required ACW = true, Non-Required ACW = false, default = null
     * @param {string} [jsonString] Json that contain property want to modify in special case
     * @returns {Promise<Agent>}
     * @memberof TestCondition
     */
    public static async setUpAgent(skillType: SkillType, requiredDisposition?: boolean, acw?: boolean, jsonString?: string, timeOut?: number): Promise<Agent> {
        try {
            await Logger.write(FunctionType.API, `Setting up agent`);
            let agent: Agent = await TestCondition.registerAgent(skillType);
            await Logger.write(FunctionType.API, `${Agent.name}, ${skillType}`);
            if (skillType != SkillType.CONFIG) {
                await agent.createPhoneNumber();
                await CustomAPIs.endAllContacts(agent, timeOut);

                await this.setUpSkill(agent, skillType, requiredDisposition, acw, jsonString);
            }

            // Workaround issue IC-83498
            // if (skillType == SkillType.OB_EMAIL || skillType == SkillType.IB_EMAIL) {
            //     await this.addEmailFromAddress(agent, skillType);
            // }

            return agent;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setUpAgent, err.message);
        }
    }

    /**
     * Set skills to default
     * @author Phat.Ngo
     * @static
     * @param {Agent} agent
     * @param {...SkillType[]} skillType
     * @memberof TestCondition
     */
    public static async setAgentSkillsToDefault(agent: Agent, skillType: SkillType) {
        try {
            await Logger.write(FunctionType.API, `Setting skill to default`);
            await TestCondition.setUpSkill(agent, skillType);
        } catch (err) {
            throw new errorwrapper.CustomError(this.setAgentSkillsToDefault, err.message);
        }
    }

    /**
     * Setup and assign agent to a skill
     * @author Phat.Ngo
     * @static
     * @param {Agent} agent which want to setup skill
     * @param {SkillType} skillType type of skill
     * @param {boolean} [requiredDisposition] Required Disposition = true, Non-Required Disposition = false, default = null
     * @param {boolean} [acw] Required ACW = true, Non-Required ACW = false, default = null
     * @param {string} [jsonString] Json that contain property want to modify in special case
     * @returns {Promise<void>}
     * @memberof TestCondition
     */
    public static async setUpAndAssignSkill(agent: Agent, skillType: SkillType, requiredDisposition?: boolean, acw?: boolean, jsonString?: string): Promise<void> {
        try {
            await TestCondition.setUpSkill(agent, skillType, requiredDisposition, acw, jsonString);
            let skillId: number = await CustomAPIs.getSkillIdFromSkillName(agent, skillType);
            await CustomAPIs.assignAgentToSkill(agent, skillId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.setUpAndAssignSkill, err.message);
        }
    }

    /**
     * Setup and remove Skill from agent
     * @author Phat.Ngo
     * @static
     * @param {Agent} agent
     * @param {SkillType} skillType
     * @returns {Promise<void>}
     * @memberof TestCondition
     */
    public static async setUpAndRemoveSkill(agent: Agent, skillType: SkillType): Promise<void> {
        try {
            await TestCondition.setUpSkill(agent, skillType);
            let skillId: number = await CustomAPIs.getSkillIdFromSkillName(agent, skillType);
            await CustomAPIs.removeSkillFromAgent(agent, skillId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.setUpAndRemoveSkill, err.message);
        }
    }

    /**
     * Get Skill Id From Skill Name
     * @author Anh.Le
     * @static
     * @param {Agent} agent,skillName: SkillType,timeoutMultiChat:number, countDown:number
     * @returns {Promise<void>}
     * @memberof TestCondition
     */
    public static async setChatSkillDetail(agent: Agent, skillName: SkillType, setChatTimeOutOption: boolean, timeoutMultiChat?: number, countDown?: number): Promise<void> {
        try {
            // Pre Condition
            let loginPage: LoginPage = LoginPage.getInstance();
            let centralPage: CentralPage = await loginPage.loginInContact(agent);

            //Set Max Chat Time out 60s
            let skillPage: SkillsListPage = await centralPage.gotoSkillsListPage();
            let skillDetailPage: SkillsDetailPage = await skillPage.selectSkillDetail(skillName);
            await skillDetailPage.clickEditButton();

            if (setChatTimeOutOption) {
                await skillDetailPage.setChatTimeOut(true, timeoutMultiChat, countDown);
            } else {
                await skillDetailPage.setChatTimeOut(false);
            }

            await skillDetailPage.completeChanges();
            await centralPage.logOut();
        } catch (err) {
            throw new errorwrapper.CustomError(this.setChatSkillDetail, err.message);
        }
    }

    /**
    * Get Skill Id From Skill Name
    * @author Anh.Le
    * @static
    * @param {Agent} agent,skillName: SkillType,timeoutMultiChat:number, countDown:number
    * @returns {Promise<void>}
    * @memberof TestCondition
    */
    public static async setRefusalChatTimeOut(agent: Agent, popUpChatTimeOut: number): Promise<void> {
        try {
            // Pre Condition
            let loginPage: LoginPage = await LoginPage.getInstance();
            let centralPage: CentralPage = await loginPage.loginInContact(agent);

            //Set Max Chat Time out 60s
            let usersPage: UsersPage = await centralPage.gotoUsersPage();
            await usersPage.searchUser(agent.agentID)
            let userDetailsPage: UserDetailsPage = await usersPage.selectUser(agent.agentID);
            let userDetailsSystemPage: UserDetailsSystemPage = await userDetailsPage.selectUserDetailsSystemTab();
            await userDetailsSystemPage.selectEditUserDetailsSystem();
            //Get default of Refusal Chat Time Out

            await userDetailsSystemPage.editRefusalChatTimeOut(popUpChatTimeOut);
            await userDetailsSystemPage.finishEditUserDetailsSystem();

            await centralPage.logOut();
        } catch (err) {
            throw new errorwrapper.CustomError(this.setRefusalChatTimeOut, err.message);
        }
    }

    // Workaround issue Email From Address field is empty when updating OB email skill by API
    public static async addEmailFromAddress(agent: Agent, skillType: SkillType): Promise<void> {
        try {
            let emailFromAddress: string = `email@SmokeDeploy${Cluster.getClusterName()}.com`;

            let loginPage: LoginPage = LoginPage.getInstance();
            let centralPage = await loginPage.loginInContact(agent);
            let skillListPage = await centralPage.gotoSkillsListPage();
            let skillDetailsPage = await skillListPage.selectSkillDetail(skillType);
            await skillDetailsPage.clickEditButton();
            await skillDetailsPage.fillInEmailFromAddress(emailFromAddress);
            centralPage = await skillDetailsPage.completeChanges();
            await centralPage.logOut();
        } catch (err) {
            throw new errorwrapper.CustomError(this.addEmailFromAddress, err.message);
        }
    }

    /**
     * Clean up all Agent Skills using API
     * @author Phat.Ngo
     * @static
     * @param {Agent} agent which is used to clean up agent skills
     * @returns {Promise<void>}
     * @memberof TestCondition
     */
    static async cleanUpAgentSkills(agent: Agent): Promise<void> {
        try {
            await Logger.write(FunctionType.API, `Cleaning up skills of Agent ${agent.email}`);
            await CustomAPIs.authorize(agent);
            await agent.createPhoneNumber();
            await CustomAPIs.endAllContacts(agent);
        } catch (err) {
            throw new errorwrapper.CustomError(this.cleanUpAgentSkills, err.message);
        }
    }

    /**
     * Used to initiate a transfer of a call to another agent
     * @author Tuan.Vu
     * @static
     * @param {Agent} agent
     * @param {Agent} targetAgent
     * @returns {Promise<void>}
     * @memberof TestCondition
     */

    public static async dialAnAgent(obPhoneAgent: Agent, targetAgent: Agent): Promise<void> {
        try {
            await Logger.write(FunctionType.API, `Initiating a transfer of call to Agent ID ${targetAgent.agentID}`);

            // Join session and set Available state to 2 agents
            await obPhoneAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(obPhoneAgent, obPhoneAgent.phoneNumber);
            await CustomAPIs.setAgentState(obPhoneAgent, MaxState.AVAILABLE);
            let skillID: number = await CustomAPIs.getSkillIdFromSkillName(obPhoneAgent, SkillType.OB_PHONE);
            await targetAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(targetAgent, targetAgent.phoneNumber);
            await CustomAPIs.setAgentState(targetAgent, MaxState.AVAILABLE);

            // Dial an outbound call
            let phoneCallManagementAPI = PhoneCallManagementInstance.getPhoneCallManagementInstance();
            await phoneCallManagementAPI.dialsAnOutboundCall(obPhoneAgent, TestRunInfo.cluster.outboundNumber, skillID);
            await CustomAPIs.waitForContactRouteToAgent(obPhoneAgent);

            // Initiate a transfer of call to target agent
            let contactID: number = await TestHelpers.getCurrentContactId(obPhoneAgent, SkillCore.getSkillName(SkillType.OB_PHONE));
            await CustomAPIs.waitForCallDialing(obPhoneAgent, contactID, TestRunInfo.middleTimeout);
            await CustomAPIs.holdContact(obPhoneAgent, contactID);
            await phoneCallManagementAPI.dialsAnAgentsPersonalQueue(obPhoneAgent, targetAgent.agentID);
            await CustomAPIs.waitForContactRouteToAgent(targetAgent);
        } catch (err) {
            throw new errorwrapper.CustomError(this.dialAnAgent, err.message);
        }
    }


    /**     
     * Create Inbound Email for Agent
     * @author Anh.Ho
     * @static
     * @param {Agent} agent
     * @memberof TestCondition
     */
    public static async createInboundEmailForAgent(agent: Agent) {
        try {
            await Logger.write(FunctionType.API, `Creating inbound email for agent`);
            let cluster: Cluster = TestRunInfo.cluster;
            await agent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(agent, agent.phoneNumber);
            await CustomAPIs.setAgentState(agent, MaxState.AVAILABLE);
            let ibMail: InboundEmail = new InboundEmail();
            let serverMail: string = cluster.getURL(PageName.SERVER_MAIL);
            await ibMail.initData(agent, SkillType.IB_EMAIL);
            await Utility.sendIBEmail(serverMail, ibMail);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createInboundEmailForAgent, err.message);

        }
    }

    /**
     * Create new admin jobId data
     * @author Chinh Nguyen
     * @static
     * @param {Agent} agent
     * @returns {Promise<string>}
     * @memberof TestCondition
     */
    public static async createAdminJobId(agent: Agent): Promise<string> {
        try {
            await Logger.write(FunctionType.API, `Create a JobId data for Calling/DNC Group Management API`);

            // Import data
            let callingDNCGroupManagementApi = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();
            let strInputFile: string = "src/test-data/inContact/apis/admin/calling-dnc-group-management/cancel-pending-processing-list-process/calling-list-list-file.txt";

            // Get List Id
            let fileName: string = "QA test " + Utility.createRandomString(5) + ".csv";
            let skillId: number = await CustomAPIs.getSkillIdFromSkillName(agent, SkillType.PC_PHONE);
            let listId: number = await this.getActiveCallingListId(agent);

            // Get Job Id
            let strInputFilePath: string = Utility.getPath(strInputFile);
            let listFile: string = fs.readFileSync(strInputFilePath, 'utf8');
            let uploadNewRecordRes: APIResponse = await callingDNCGroupManagementApi.uploadNewRecordsToACallList(agent, listId, skillId, fileName, listFile);

            return JsonUtility.getFieldValue(uploadNewRecordRes.body, `jobId`);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createAdminJobId, err.message);
        }
    }

    /**
     * Check and set Parking Mode
     * @author Lien.Nguyen
     * @static
     * @param {Agent} agent
     * @returns {Promise<void>}
     * @memberof TestCondition
     */
    public static async editEmailParkingMode(agent: Agent, status: State): Promise<void> {
        try {
            let assignedSkill: number = await CustomAPIs.getSkillIdFromSkillName(agent, SkillType.IB_EMAIL);
            let response: APIResponse = await inContactAPIs.getSkillsSkillId(agent, APIVersion.V13, assignedSkill);
            let result: string = await JsonUtility.getFieldValue(response.body, "emailParking");

            if ((result == "false" && status == State.ON) || (result == "true" && status == State.OFF)) {
                let centralPage = new CentralPage();
                let skillListPage = await centralPage.gotoSkillsListPage();
                let skillDetailsPage = await skillListPage.selectSkillDetail(SkillType.IB_EMAIL);
                await skillDetailsPage.editEmailParkingMode(status);
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.editEmailParkingMode, err.message);
        }
    }

    /**
   * Delete all quick reply in the list
   * @author Phat.Truong  
   * @param {Agent} agent
   * @returns {Promise<void>}
   * @memberof TestCondition
   */
    public static async cleanUpQuickReply(agent: Agent): Promise<void> {
        try {
            let response: APIResponse;
            let quickRepliesPage: QuickRepliesPage;
            response = await inContactAPIs.getAgentsQuickReplies(agent, APIVersion.V12);
            if (response.body != "") {
                let centralPage = new CentralPage();
                quickRepliesPage = await centralPage.gotoQuickRepliesPage();
                await quickRepliesPage.cleanUpQuickReplies();
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.cleanUpQuickReply, err.message);
        }
    }

    /**
     * Getting active calling list id
     * @author YLe
     * @static
     * @param {Agent} agent
     * @returns {Promise<number>}
     * @memberof TestCondition
     */
    public static async getActiveCallingListId(agent: Agent): Promise<number> {
        try {
            await Logger.write(FunctionType.API, "Getting active calling list id");
            let callListId: number = 0;
            let callingDNCGroupManagementApi = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();
            let allCallingListRes: APIResponse = await callingDNCGroupManagementApi.returnsAllCallingLists(agent);
            let callingListlength: number = JsonUtility.getFieldCount(allCallingListRes.body, "callingLists");
            for (let i = 0; i < callingListlength; i++) {
                if (JsonUtility.getFieldValue(allCallingListRes.body, `callingLists[${i}].status`).replace(/"/g, "") == "Active") {
                    callListId = parseInt(JsonUtility.getFieldValue(allCallingListRes.body, `callingLists[${i}].listId`).replace(/"/g, ""));
                    break;
                }
            }
            return callListId;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getActiveCallingListId, err.message);
        }
    }

    /**
     * Register a UserHub agent
     * @author Y.Le
     * @static
     * @param {AgentType} agentType
     * @returns {Promise<Agent>}
     * @memberof TestCondition
     */
    public static async registerUserHubAgent(agentType: AgentType): Promise<Agent> {
        try {
            let agent: Agent = TestRunInfo.cluster.getUserHubAgent(agentType);
            await CustomAPIs.authorize(agent);
            return agent
        } catch (err) {
            throw new errorwrapper.CustomError(this.registerAgent, err.message);
        }
    }

    /**
     * Setting up UserHub agent
     * @author Y.Le
     * @static
     * @param {AgentType} agentType
     * @param {number} [timeOut]
     * @returns {Promise<Agent>}
     * @memberof TestCondition
     */
    public static async setUpUserHubAgent(agentType: AgentType, timeOut?: number): Promise<Agent> {
        try {
            await Logger.write(FunctionType.API, `Setting up UserHub agent`);
            let agent: Agent = await this.registerUserHubAgent(agentType);
            await agent.createPhoneNumber();
            await TestHelpers.endAllContacts(agent, timeOut);
            return agent;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setUpCxOneAgent, err.message);
        }
    }
}