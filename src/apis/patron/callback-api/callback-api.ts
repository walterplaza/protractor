import CallbackAPIVersion12 from "@apis/patron/callback-api/callback-api-v12";
import TestRunInfo from "@data-objects/general/test-run-info";
import { APIVersion } from "@data-objects/general/cluster";
import { Agent } from "@data-objects/general/agent";

export interface ICallbackAPI {
    requestAnImmediateCallback(agent:Agent, phoneNumber: any,callerId?: any, callDelaySec?: any,skill?: any, targetAgent?: any, priorityManagement?: any,initialPriority?: any,acceleration?: any, maxPriority?: any,sequence?: any,zipTone?: any,screenPopSrc?: any,screenPopUrl?: any,timeout?: any)
    scheduleACallback(agent:Agent,firstName:any,lastName: any, phoneNumber: any,skill: any,promiseDate: any, targetAgent?: any, promiseTime?: any,notes?: any,timeZone?: any)
}

export default class CallbackAPI {
    static getCallbackAPIInstance(): ICallbackAPI {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new CallbackAPIVersion12();
        }
    }
}