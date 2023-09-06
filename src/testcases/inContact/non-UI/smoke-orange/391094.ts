import CustomAPIs from "@apis/custom-apis";
import inContactAPIs from "@apis/incontact-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import { OutBoundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: API
 * Suite: SMOKE_Automated_Orange_Full, Smoke_Automated_Blue_Full
 * TC ID: 391094
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Orange_OF - 391094", function () {

    let obMailAgent: Agent;
    let emailObInfo = new OutBoundEmail().initData();
    let apiRes: APIResponse;
    let resp: APIResponse;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `391094 - [VC] Verify Outbound Email Routability & Contact End With ACW`);
        obMailAgent = await TestCondition.setUpAgent(SkillType.OB_EMAIL, false, true);
    }, TestRunInfo.conditionTimeout);

    it('391094 - VC Verify Outbound Email Routability Contact End With ACW', async () => {

        // 1. Establish agent session
        await CustomAPIs.startOrJoinSession(obMailAgent, obMailAgent.phoneNumber);

        // 2. Get skill ID by skill name
        // emailObInfo.skillId = await CustomAPIs.getSkillIdFromSkillName(user, SkillName.OBEMAIL_ACW)
        emailObInfo.skillId = await TestHelpers.getSkillIdFromSkillName(obMailAgent, SkillType.OB_EMAIL);

        // 3. Send an email using SmtpClient
        apiRes = await inContactAPIs.postAgentSessionsSessionIdInteractionsEmailOutbound(obMailAgent, APIVersion.V10, emailObInfo.skillId, emailObInfo.toAddress);

        // Validate outbound email is routed to agent
        expect(apiRes.status).toBe(202, "OutboundEmail is not routed to agent");

        // 4. Get contact details for the Email contact
        emailObInfo.contactId = await CustomAPIs.getCurrentContactId(obMailAgent, SkillCore.getSkillName(SkillType.OB_EMAIL));

        // Validate outbound email is activated
        expect(emailObInfo.contactId > 0).toBe(true, "Email contact is not active");

        // 5. Reply to the email which ends the contact
        resp = await CustomAPIs.sendEmail(obMailAgent, emailObInfo);

        // Validate outbound email is sent successfully
        expect(resp.status).toBe(202, "Outbound email is not sent");

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(obMailAgent, SkillType.OB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

})