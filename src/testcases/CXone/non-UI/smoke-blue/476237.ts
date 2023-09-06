import inContactAPIs from "@apis/incontact-apis";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: API
 * Suite: Smoke_Automated_Blue_Full
 * TC ID: 476237
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Blue_Full - 476237", function () {

    let ibPhoneAgent: Agent;
    let currentDate = new Date();
    let lastUpdateTime: number = Utility.convertDateToTimestamp(currentDate.getTime().toString(), "yyyy/mm/dd");
    let json: string = `{"userId":"108948","cacheRows":true,"campaigns":[1001],"forceRequest":false,"interval":0,"last30Mins":"false","lastUpdateTime":${lastUpdateTime},"mediaTypes":[],"offset":0,"skills":""}`;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `CXone > Dashboards > Skill Summary > Capture JSON response > Report Service > Verify the status 200 (OK) of the service for Skill Summary`);
        ibPhoneAgent = await TestCondition.registerAgent(SkillType.IB_Phone);
    }, TestRunInfo.conditionTimeout);

    it('476237 - Verify the status 200 for Skill Summary', async () => {

        // Execute API ReportService/WCFEvolveService.svc/rest/Reporting/GetSkillActivityEntryList
        let getSkillActivityEntryList: APIResponse = await inContactAPIs.postSkillActivityEntryList(ibPhoneAgent, json);

        // VP: Status code 200 (OK)
        expect(await getSkillActivityEntryList.status).toBe(200, "Status code is not correct.");
    });
});