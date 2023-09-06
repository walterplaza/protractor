import inContactAPIs from "@apis/incontact-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";


/** 
 * Type: API
 * Suite: SMOKE_Automated_Orange_Full, Smoke_Automated_Blue_Full
 * TC ID: 331423
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Orange_OF - 331423", function () {

    let admin: Agent;
    let fileName: string = "331423.csv";

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `331423 - inContact API > Admin > DELETE files > V8 > Success`);
        admin = await TestCondition.setUpAgent(SkillType.CONFIG);
    }, TestRunInfo.conditionTimeout);

    it('331423 - inContact API Admin DELETE files V8 Success', async () => {

        // Upload file
        await inContactAPIs.postFiles(admin, APIVersion.V8, fileName);

        // Delete file
        let response: APIResponse = await inContactAPIs.deleteFiles(admin, APIVersion.V8, fileName);

        // Verify Status code
        expect(response.status).toBe(200, "Status code is not correct");
        expect(response.header).toBe("Success", "Status description is not correct");
    });
});