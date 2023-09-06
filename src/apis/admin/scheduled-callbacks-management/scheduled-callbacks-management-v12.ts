import { IScheduledCallbacksManagement } from "@apis/admin/scheduled-callbacks-management/scheduled-callbacks-management";
import { APIResponse, APICore, Options, Method } from "@utilities/general/api-core";
import { Agent } from "@data-objects/general/agent";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class ScheduledCallbacksManagementVersion12 implements IScheduledCallbacksManagement {

    /**
     * @static
     * @param {Agent} agent
     * @returns {Promise<APIResponse>}
     * @memberof ScheduledCallbacksManagement
     */
    async returnsScheduledCallbacksForAnAgent(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/scheduled-callbacks`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createsAScheduledCallback, err.message);
        }
    }

    /**
     * Creates a scheduled callback
     * @param {Agent} agent
     * @param {string} firstName
     * @param {string} lastName
     * @param {number} phoneNumber
     * @param {number} skillId
     * @param {number} targetAgentId
     * @param {string} scheduleDate
     * @param {string} notes
     * @returns {Promise<APIResponse>}
     * @memberof ScheduledCallbacksManagement
     */
    async createsAScheduledCallback(agent: Agent, firstName: any = "", lastName: any = "", phoneNumber: any = "", skillId: any = "", targetAgentId: any = "", scheduleDate: any = "", notes: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/scheduled-callbacks`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("firstName", firstName);
            options.addBody("lastName", lastName);
            options.addBody("phoneNumber", phoneNumber);
            options.addBody("skillId", skillId);
            options.addBody("targetAgentId", targetAgentId);
            options.addBody("scheduleDate", scheduleDate);
            options.addBody("notes", notes);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createsAScheduledCallback, err.message);
        }
    }

    /**
     * Deletes a scheduled callback
     * @param {Agent} agent
     * @param {number} callbackId
     * @param {string} description
     * @returns {Promise<APIResponse>}
     * @memberof ScheduledCallbacksManagement
     */
    async deletesAScheduledCallback(agent: Agent, callbackId: any = "", description: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/scheduled-callbacks/${callbackId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("description", description);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deletesAScheduledCallback, err.message);
        }
    }
    async updatesAScheduledCallback(agent: Agent, callbackId: any = "", firstName: any = "", lastName: any = "", phoneNumber: any = "", skillId: any = "", targetAgentId: any = "", scheduleDate: any = "", notes: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/scheduled-callbacks/${callbackId}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("firstName", firstName);
            options.addBody("lastName", lastName);
            options.addBody("phoneNumber", phoneNumber);
            options.addBody("skillId", skillId);
            options.addBody("targetAgentId", targetAgentId);
            options.addBody("scheduleDate", scheduleDate);
            options.addBody("notes", notes);
            return await APICore.request(options);
        } catch (error) {
            throw new errorwrapper.CustomError(this.updatesAScheduledCallback, error.message);   
        }
    }
    async returnsScheduledCallbacksForASkill(agent: Agent, skillID: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillID}/scheduled-callbacks`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (error) {
            throw new errorwrapper.CustomError(this.returnsScheduledCallbacksForASkill, error.message);
        }
    }
}