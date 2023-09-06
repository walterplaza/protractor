import { ICallbackAPI } from "@apis/patron/callback-api/callback-api"
import { Agent } from "@data-objects/general/agent";
import { Options, APICore, APIResponse, Method } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class CallbackAPIVersion12 implements ICallbackAPI {
    async requestAnImmediateCallback(agent: Agent, phoneNumber: any = "",callerId: any = "", callDelaySec: any = "",skill: any = "", targetAgent: any = "", priorityManagement: any = "",initialPriority: any = "",acceleration: any = "", maxPriority: any = "",sequence: any = "",zipTone: any = "",screenPopSrc: any = "",screenPopUrl: any = "",timeout: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/queuecallback`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("phoneNumber", phoneNumber);
            options.addParam("callerId", callerId);
            options.addParam("callDelaySec", callDelaySec);
            options.addParam("skill", skill);
            options.addParam("targetAgent", targetAgent);
            options.addParam("priorityManagement", priorityManagement);
            options.addParam("initialPriority", initialPriority);
            options.addParam("acceleration", acceleration);
            options.addParam("maxPriority", maxPriority);
            options.addParam("sequence", sequence);
            options.addParam("zipTone", zipTone);
            options.addParam("screenPopSrc", screenPopSrc);
            options.addParam("screenPopUrl", screenPopUrl);
            options.addParam("timeout", timeout);

            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.requestAnImmediateCallback, err.message);
        }
    }
    async scheduleACallback(agent:Agent,firstName:any = "",lastName: any = "", phoneNumber: any = "",skill: any = "", promiseDate: any = "",targetAgent: any = "", promiseTime: any = "",notes: any = "",timeZone: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/promise`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("firstName", firstName);
            options.addParam("lastName", lastName);
            options.addParam("phoneNumber", phoneNumber);
            options.addParam("skill", skill);
            options.addParam("promiseDate", promiseDate);
            options.addParam("targetAgent", targetAgent);
            options.addParam("promiseTime", promiseTime);
            options.addParam("notes", notes);
            options.addParam("timeZone", timeZone);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.scheduleACallback, err.message);
        }
    }
}