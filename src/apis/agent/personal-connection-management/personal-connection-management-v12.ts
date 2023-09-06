import { IPersonalConnectionManagement } from "@apis/agent/personal-connection-management/personal-connection-management";
import { Agent } from "@data-objects/general/agent";
import { APICore, Method, Options, APIResponse } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
export default class PersonalConnectionManagementVersion12 implements IPersonalConnectionManagement {
    async logIntoADialerCampaign(agent: Agent, skillName: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/dialer-login`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("skillName", skillName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.logIntoADialerCampaign, err.message);
        }
    }
    async logOutOfADialerCampaign(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/dialer-logout`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.logOutOfADialerCampaign, err.message);
        }
    }
    snoozeAPreviewContact() {
        throw new Error("Method not implemented.");
    }
}