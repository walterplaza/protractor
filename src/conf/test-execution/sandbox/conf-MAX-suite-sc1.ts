require('module-alias/register');

import { Config } from 'protractor';
import { ConfigReport } from "@utilities/report-email/config-report";
import { LGMatchers } from '@utilities/matcher/LGMatchers';
import ProjectPath from '@test-data/general/project-path';
import TestBase from '@testcases/test-base';
import TestRunInfo from '@data-objects/general/test-run-info';
import { TestCondition } from '@test-helpers/test-condition';

let jsLogger = require('js-logger');
TestBase.setUpTestRunInfo();

export let config: Config = {

    onPrepare: async function () {
        beforeEach(function () {
            ConfigReport.reportSetupConfig();
            jasmine.addMatchers(LGMatchers);
        });

        jsLogger.useDefaults({
            defaultLevel: jsLogger.INFO,
            formatter: function (messages, context) {
                messages.unshift(new Date().toLocaleString())
            }
        });

        await ConfigReport.createXMLReport();

        afterEach(async () => {
            try {
                if (!ConfigReport.checkErrorPic) {
                    for (let i = 0; i < TestRunInfo.agentList.length; i++) {
                        await TestCondition.cleanUpAgentSkills(TestRunInfo.agentList[i]);
                    }
                }
                TestRunInfo.agentList.length = 0;
            } catch (err) {
                TestRunInfo.agentList.length = 0;
            };
        });
    },

    onComplete: async function () {
        await ConfigReport.convertXMLtoPieChart('inContact Smoke Test');
    },

    framework: 'jasmine',
    capabilities: {
        browserName: `${TestRunInfo.browser}`,
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,

    specs: [
        `${ProjectPath.testCases}/inContact/UI/369351.js`, // MAX > Multi-Chat reject chat
        `${ProjectPath.testCases}/inContact/UI/294342.js`, // MAX > UI > Panel > Resizing Panel > Email IB
        `${ProjectPath.testCases}/inContact/UI/437939.js`, // [MAX] Launch Button highlights them all
        `${ProjectPath.testCases}/inContact/UI/443657.js`, // [MAX][Resize] Email inbox minimums
        `${ProjectPath.testCases}/inContact/UI/409890.js`, // MAX> Quick Reply> Digital Contacts> Verify the quick replies window is expanded (window out)  or collapse (window in) when we have a Digital Contact
        `${ProjectPath.testCases}/inContact/UI/369007.js`, // PC > Business Unit > Verify "Max # of calls" accepts only integer values between 1 and 10
        `${ProjectPath.testCases}/inContact/UI/426411.js`, // MAX>Tool Bar> Launch Button> Verify in IB Phone Contact, the Launch Button is displayed active.
        `${ProjectPath.testCases}/inContact/UI/426868.js`, // MAX> Phone> Verify the Phone workspace doesn't resize too large upon ending contact
        `${ProjectPath.testCases}/inContact/UI/369161.js`, // PC > Skill > General Settings > Verify "Max # of calls" accepts only integer values between 1 and 10
        `${ProjectPath.testCases}/inContact/UI/414292.js`, // [MAX] internal transfers are showing as "Unknown" until the call is accepted
        `${ProjectPath.testCases}/inContact/UI/423353.js`, // MAX> SCH> Disposition> Verify the Disposition panel is popping out automatically when Chat and WI contacts are ended.
        `${ProjectPath.testCases}/inContact/UI/369017.js`, // PC > Business Unit > Verify tooltip is displayed for "Max # of calls" field in BU's Details page in Edit mode
        `${ProjectPath.testCases}/inContact/UI/369018.js`, // PC > Business Unit > Verify tooltip is displayed for "Maximum Wait Time to Consider" field in BU's Details page in Edit mode
        `${ProjectPath.testCases}/inContact/UI/416401.js`, // [MAX] Accept reject border is transparent - WI
        `${ProjectPath.testCases}/inContact/UI/297143.js`, // MAX > Callback Dispostion > Save and Callback Button > UI verification
        `${ProjectPath.testCases}/inContact/UI/420370.js`, // [MAX] Launch is offset in ADA high contrast
        `${ProjectPath.testCases}/inContact/UI/295575.js`, // MAX > Email > Reply > Copy&Paste email reply
        `${ProjectPath.testCases}/inContact/UI/416400.js`, // [MAX] Accept reject border is transparent - Email
        `${ProjectPath.testCases}/inContact/UI/398187.js`, // [MAX] Add contact icons where they are missing
        `${ProjectPath.testCases}/inContact/UI/301968.js`, // MAX > After Call Work > Dispostion not required > Timer
        `${ProjectPath.testCases}/inContact/UI/301913.js`, // MAX > UI > Main Panel > Waiting Panel (bar) > 1 Chanel displayed as per assigned to agent - counter display
        `${ProjectPath.testCases}/inContact/UI/341360.js`, // MAX>Multi Chat>Glance View Notification
        `${ProjectPath.testCases}/inContact/UI/301912.js`, // MAX > UI > Main Panel > Waiting Panel (bar) > 1 Chanel displayed as per assigned to agent - icon display
        `${ProjectPath.testCases}/inContact/UI/381829.js`, // [SCH][CHAT][MAX] chat in personal queue "from address" is visible in glance preview
        `${ProjectPath.testCases}/inContact/UI/380476.js`, // Max>Information>Verify Data displayed on Information  pane about agent
        `${ProjectPath.testCases}/inContact/UI/278035.js`, // [MAX] Valid Number
        `${ProjectPath.testCases}/inContact/UI/278034.js`, // [MAX] Bad Number Notification
        `${ProjectPath.testCases}/inContact/UI/268719.js`, // [MAX] > NWay > Drop patron from Conference and retain call with others
        `${ProjectPath.testCases}/inContact/UI/279142.js`, // [MAX] Change Agent State timer from Minutes to Seconds> Verify that the timer in the glace for ACW state is correct with Required Disposition
        `${ProjectPath.testCases}/inContact/UI/268723.js`, // [MAX] > NWay > Drop Patron > Transfer call with outbound
        `${ProjectPath.testCases}/inContact/UI/392870.js`, // Max Contacts get stuck in acw state - Voicemail - Required Dispo
        `${ProjectPath.testCases}/inContact/UI/268725.js`, // [MAX] > NWay > Multi-party Conference >Hang up call doesn't end other conversations
        `${ProjectPath.testCases}/inContact/UI/335690.js`, // MAX>Disposition>New Disposition Dialog
        `${ProjectPath.testCases}/inContact/UI/392876.js`, // Max Contacts get stuck in acw state - Email - Forward the email- Non-Required Dispo
        `${ProjectPath.testCases}/inContact/UI/249265.js`, // MAX> Personal Queue> Email> Personal Queue IB Email
        `${ProjectPath.testCases}/inContact/UI/248874.js`, // MAX > Email Interactions > Inbound > Forward > Quick Reply for email > Verify that the agent must be able to add quick reply by clicking the quick reply button
        `${ProjectPath.testCases}/inContact/UI/249392.js`, // MAX > Email > Basic Inbound Email Required Disposition
        `${ProjectPath.testCases}/inContact/UI/248678.js`, // MAX > Failover - Voicemail
        `${ProjectPath.testCases}/inContact/UI/180351.js`, // MAX > Agent Reports > Agent Reports panel layout - Performance ui
        `${ProjectPath.testCases}/inContact/UI/249405.js`, // MAX > Email > Inbound email interrupted by call after minimum work time setting
        `${ProjectPath.testCases}/inContact/UI/249411.js`, // MAX > Email > Inbound email interrupted by call - forward
        `${ProjectPath.testCases}/inContact/UI/335685.js`, // MAX>Disposition> Verify the Disposition dialog pops up at the end of a contact.
        `${ProjectPath.testCases}/inContact/UI/111205.js`, // Check Voicemail
        `${ProjectPath.testCases}/inContact/UI/455743.js`, // MAX> SCH> Email Ib> Verify the email reply box is not resizable and is encoding specific characters and the edit controls are displayed on it.
        `${ProjectPath.testCases}/inContact/UI/423369.js`, // [MAX] [Email] Email replies options
        `${ProjectPath.testCases}/inContact/UI/421639.js`, // MAX>PC>Disposition> Verify the Disposition controls are displayed in PC call.
        `${ProjectPath.testCases}/inContact/UI/399309.js`, // MAX>Accept Reject Dialog>Skill name
        `${ProjectPath.testCases}/inContact/UI/401212.js`, // MCH> MAX> Chat> Disposition> Note> It must possible to write in “Note” field from “Disposition Dialog” in Chat Contact
        `${ProjectPath.testCases}/inContact/UI/455032.js`, // MAX> PC>Timer for ACW is not visible (countdown) - Agent Unavailable State is not happening
        `${ProjectPath.testCases}/inContact/UI/422767.js`, // MAX> SCH> Email> Verify the “Email workspace” resizes correctly when we have an Email and Phone Contact delivers in Agent
        `${ProjectPath.testCases}/inContact/UI/399435.js`, // MCH > Omnichannel > Multi-party conference
        `${ProjectPath.testCases}/inContact/UI/410301.js`, // [MAX] Randomly resizes when handling multiple chats and you reply back
        `${ProjectPath.testCases}/inContact/UI/383665.js`, // [MAX] Omnichannel - Icons correctly displayed on Assigned Skills pane        
    ]
};