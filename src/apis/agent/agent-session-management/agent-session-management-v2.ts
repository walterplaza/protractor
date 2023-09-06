import { IAgentSessionManagement } from "@apis/agent/agent-session-management/agent-session-management";
import { Options, APICore, APIResponse, Method } from "@utilities/general/api-core";
import { Agent } from "@data-objects/general/agent";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class AgentSessionManagementVersion2 implements IAgentSessionManagement {

    async startsAnAgentSession(agent: Agent, stationPhoneNumber: any, stationId: any = "", inactivityTimeout: any = 45, inactivityForceLogout: any = false, apiApplicationContext?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("stationId", stationId);
            options.addBody("stationPhoneNumber", stationPhoneNumber);
            options.addBody("inactivityTimeout", inactivityTimeout);
            options.addBody("inactivityForceLogout", inactivityForceLogout);
            options.addBody("apiApplicationContext", apiApplicationContext);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.startsAnAgentSession, err.message);
        }
    }

    async joinsAnExistingAgentSession(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/join`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("asAgentId", agent.agentID);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.joinsAnExistingAgentSession, err.message);
        }
    }

    async endingAnAgentSession(agent: Agent, forceLogoff: any = "", endContacts: any = "", ignorePersonalQueue: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("forceLogoff", forceLogoff);
            options.addParam("endContacts", endContacts);
            options.addParam("ignorePersonalQueue", ignorePersonalQueue);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.endingAnAgentSession, err.message);
        }
    }

    async getsTheNextAgentEventDescription(agent: Agent, timeout: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/get-next-event`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("timeout", timeout);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getsTheNextAgentEventDescription, err.message);
        }
    }

    async continueOrCancelAReskillCallDuringClosedHours(agent: Agent, continueReskill: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/continue-reskill`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("continueReskill", continueReskill);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.continueOrCancelAReskillCallDuringClosedHours, err.message);
        }
    }

    async dispositionsAContact(agent: Agent, contactId: any, primaryDispositionId: any = "", primaryDispositionNotes: any = "", primaryCallbackTime: any = "", primaryCallbackNumber: any = "", secondaryDispositionId: any = "", primaryCommitmentAmount: any = "", previewDispositionId: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/disposition`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("primaryDispositionId", primaryDispositionId);
            options.addBody("primaryDispositionNotes", primaryDispositionNotes);
            options.addBody("primaryCommitmentAmount", primaryCommitmentAmount);
            options.addBody("primaryCallbackTime", primaryCallbackTime);
            options.addBody("primaryCallbackNumber", primaryCallbackNumber);
            options.addBody("secondaryDispositionId", secondaryDispositionId);
            options.addBody("previewDispositionId", previewDispositionId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.dispositionsAContact, err.message);
        }
    }

    async setAgentStatus(agent: Agent, state: any, reason: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/state`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("state", state);
            options.addBody("reason", reason);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.setAgentStatus, err.message);
        }
    }

    async postAFeedback(agent: Agent, categoryId: any = "", priority: any = "", comment: any = "", customData: any = "", contactId: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/submit-feedback`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("categoryId", categoryId);
            options.addBody("priority", priority);
            options.addBody("comment", comment);
            options.addBody("customData", customData);
            options.addBody("contactId", contactId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAFeedback, err.message);
        }
    }

    async postCustomDataToAContact(agent: Agent, contactId: any, indicatorName: any = "", data: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/custom-data`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("indicatorName", indicatorName);
            options.addBody("data", data);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postCustomDataToAContact, err.message);
        }
    }

    async addsAMediaTypeToRoute(agent: Agent, chat: any = "", email: any = "", workItem: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/add-contact`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("chat", chat);
            options.addBody("email", email);
            options.addBody("workItem", workItem);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.addsAMediaTypeToRoute, err.message);
        }
    }


    async getAgentSessionsSessionIdGetNextEvent(agent: Agent, timeout: number = 10): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/get-next-event`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("timeout", timeout)
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentSessionsSessionIdGetNextEvent, err.message);
        }
    }

    async movesAnEmailIntoFocus(agent: Agent, contactId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/activate`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.movesAnEmailIntoFocus, err.message);
        }
    }

}