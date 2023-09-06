import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { JsonUtility } from "@utilities/general/utility";

/** 
 * Type: API
 * Suite: SMOKE_Automated_Orange_Full, Smoke_Automated_Blue_Full
 * TC ID: 314458
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Orange_OF - 314458", function () {

    let adminAgent: Agent;
    let getTeamUnavailableCode: APIResponse;
    let currentOutState: string;
    let outStateId: string;
    let assignTeamUnavailableCode: APIResponse;
    let deleteTeamUnavailableCode: APIResponse;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `314458 - inContact API > Admin > Add / Remove Team Unavailable Code`);
        adminAgent = await TestCondition.setUpAgent(SkillType.CONFIG);

        // Pre-condition
        getTeamUnavailableCode = await TestHelpers.getAdminUnavailableCodes(adminAgent, APIVersion.V2);
        currentOutState = JsonUtility.getFieldValue(getTeamUnavailableCode.body, "unavailableList[0].OutStateId");
        outStateId = `{"codes": [{"outstateId": ${currentOutState}}]}`;
        await TestHelpers.deleteTeamsTeamIdUnavailableCodes(adminAgent, APIVersion.V7, adminAgent.teamID, outStateId);

    }, TestRunInfo.conditionTimeout);

    it('314458 - Add or Remove Team Unavailable Code', async () => {

        // ASSIGN UNAVAILABLE CODE
        // 1. Calls Admin> POST v7.0/teams/{teamId}/unavailable-codes and from Data(Json) enter in "outstateId" the Unavailable Code ID 20067
        assignTeamUnavailableCode = await TestHelpers.postTeamsTeamIdUnavailableCodes(adminAgent, APIVersion.V7, adminAgent.teamID, outStateId);
        // You get a Status Code: 200
        expect(await assignTeamUnavailableCode.status).toBe(200, "Unavailable code is not Re-assigned to Team");

        // 2. Verify that the Team has the Unavailable Code assigned in
        getTeamUnavailableCode = await TestHelpers.getTeamsTeamIdUnavailableCodes(adminAgent, APIVersion.V7, adminAgent.teamID);
        expect(await getTeamUnavailableCode.body.includes(currentOutState)).toBe(true, "Unavailable code is not assigned to Team");

        // DELETE UNAVAILABLE CODE
        // 3. Calls Admin> DELETE v7.0/teams/{teamId}/unavailable-codes and from Data(Json) enter in "outstateId" the Unavailable Code ID
        deleteTeamUnavailableCode = await TestHelpers.deleteTeamsTeamIdUnavailableCodes(adminAgent, APIVersion.V7, adminAgent.teamID, outStateId);

        // VP: You get a Status Code: 200
        expect(await deleteTeamUnavailableCode.status).toBe(200, "Unavailable code is not deleted");

        // 4. Verify that that the Team doesn't have the Unavailable Code assigned in step 3.
        getTeamUnavailableCode = await TestHelpers.getTeamsTeamIdUnavailableCodes(adminAgent, APIVersion.V7, adminAgent.teamID);
        expect(await getTeamUnavailableCode.body.includes(currentOutState)).toBe(false, "Unavailable code is not deleted");

        // RE-ASSIGN UNAVAILABLE CODE
        await TestHelpers.postTeamsTeamIdUnavailableCodes(adminAgent, APIVersion.V7, adminAgent.teamID, outStateId);
    });
});