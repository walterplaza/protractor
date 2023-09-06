require('module-alias/register');

import TestRunInfo from '@data-objects/general/test-run-info';
import ProjectPath from '@test-data/general/project-path';
import TestBase from '@testcases/test-base';
import { LGReport } from '@utilities/new-report/lg-hook';
import { ConfigReport } from "@utilities/report-email/config-report";
import { Config } from 'protractor';
import { HTMLBuilder } from '@utilities/new-report/html-builder';
import dbmySQL from '@apis/dbmySQL-api';
import XrayAPI from '@apis/xray-api';

let jsLogger = require('js-logger');

ConfigReport.pushResultToXray = false;
TestBase.setUpTestRunInfo();

export let config: Config = {

    onPrepare: async function () {
        await ConfigReport.setTimeReportStart();
        new LGReport().configHook();

        jsLogger.useDefaults({
            defaultLevel: jsLogger.INFO,
            formatter: function (messages, context) {
                messages.unshift(new Date().toLocaleString())
            }
        });
    },

    onComplete: async function () {
        await ConfigReport.setTimeReportFinish();
        await HTMLBuilder.buildTemplate();
        await dbmySQL.addTestExecutionAssociations();
        await XrayAPI.importResultTestExecution();
    },

    framework: 'jasmine',
    capabilities: {
        browserName: `${TestRunInfo.browser}`,
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,

    specs: [
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62695.js`, //  MAX > Chat Interactions > ACW > After ending chat, agent state should be ACW disposition
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62694.js`, //  MAX > Chat Interactions > ACW > After expiration of ACW time, agent state should be changed to next state
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62693.js`, //  MAX > Chat Interactions > ACW > Agent can change state from ACW before time is over
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62692.js`, //  Check Voicemail
        `${ProjectPath.testCases}/inContact/UI/max-list/180351.js`, //  MAX > Agent Reports > Agent Reports panel layout - Performance ui
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62690.js`, //  MAX > Failover - Voicemail
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62689.js`, //  MAX > Email Interactions > Inbound > Forward > Quick Reply for email > Verify that the agent must be able to add quick reply by clicking the quick reply button
        `${ProjectPath.testCases}/inContact/UI/max-list/249106.js`, //  MAX > Search > Search for custom address book
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62687.js`, //  MAX> Personal Queue> Chat> Personal Queue IB Chat
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62686.js`, //  MAX> Personal Queue> Email> Personal Queue IB Email
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62685.js`, //  MAX > Chat Happy Path accept chat with disposition
        `${ProjectPath.testCases}/inContact/UI/max-list/249390.js`, //  MAX > Email > Basic Inbound Email Transfer To a Skill where agent is logged off
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62683.js`, //  MAX > Email > Basic Inbound Email Required Disposition
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62682.js`, //  MAX > Email > Basic Inbound Email Non Required Disposition
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62681.js`, //  MAX > Email > Basic Inbound Email Non Required Disposition Max Time Limit
        `${ProjectPath.testCases}/inContact/UI/max-list/249400.js`, //  MAX > Email > Inbound email interrupted by call - save reply draft progress
        `${ProjectPath.testCases}/inContact/UI/max-list/249405.js`, //  MAX > Email > Inbound email interrupted by call after minimum work time setting
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62678.js`, //  MAX > Email > Forward Basic Inbound Email Invalid
        `${ProjectPath.testCases}/inContact/UI/max-list/249411.js`, //  MAX > Email > Inbound email interrupted by call - forward
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62676.js`, //  MAX > Email > Forward Basic Inbound Email Discard
        `${ProjectPath.testCases}/inContact/UI/max-list/249567.js`, //  MAX > Voice - Interactions> Agent with OB Skills Cold Transfer To An External Number
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62674.js`, //  Quicky reply> Keywords with associated QR to be seen for Chats
        `${ProjectPath.testCases}/inContact/UI/max-list/268719.js`, //  [MAX] > NWay > Drop patron from Conference and retain call with others
        `${ProjectPath.testCases}/inContact/UI/max-list/268723.js`, //  [MAX] > NWay > Drop Patron > Transfer call with outbound
        `${ProjectPath.testCases}/inContact/UI/max-list/268725.js`, //  [MAX] > NWay > Multi-party Conference >Hang up call doesn't end other conversations
        `${ProjectPath.testCases}/inContact/UI/max-list/278034.js`, //  [MAX] Bad Number Notification
        `${ProjectPath.testCases}/inContact/UI/max-list/278035.js`, //  [MAX] Valid Number
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62668.js`, //  [MAX] Change Agent State timer from Minutes to Seconds> Verify that the agent state in the Glance View shows the time HH:MM:SS starting in MM:SS for ACW state
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62667.js`, //  [MAX] Change Agent State timer from Minutes to Seconds> Verify that the timer in the glace for ACW state is correct with Required Disposition
        `${ProjectPath.testCases}/inContact/UI/max-list/279417.js`, //  [MAX] Ending Conference Call after Patron is dropped> Verify that all other functions in conference (transfer to agent, etc.) continue to work as designed
        `${ProjectPath.testCases}/inContact/UI/max-list/290414.js`, //  MAX>IE>Address book entries not showing up initially when searching for contacts in Max History.
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62664.js`, //  MAX > UI > Panel > Resizing Panel > Email IB
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62663.js`, //  MAX > Email > Reply > Copy&Paste email reply
        `${ProjectPath.testCases}/inContact/UI/max-list/297140.js`, //  MAX > Call back from Dispostion > Cleared with refresh/close
        `${ProjectPath.testCases}/inContact/UI/max-list/297143.js`, //  MAX > Callback Dispostion > Save and Callback Button > UI verification
        `${ProjectPath.testCases}/inContact/UI/max-list/297685.js`, //  MAX > Commitment > UI verification
        `${ProjectPath.testCases}/inContact/UI/max-list/301912.js`, //  MAX > UI > Main Panel > Waiting Panel (bar) > 1 Chanel displayed as per assigned to agent - icon display
        `${ProjectPath.testCases}/inContact/UI/max-list/301913.js`, //  MAX > UI > Main Panel > Waiting Panel (bar) > 1 Chanel displayed as per assigned to agent - counter display
        `${ProjectPath.testCases}/inContact/UI/max-list/301968.js`, //  MAX > After Call Work > Dispostion not required > Timer
        `${ProjectPath.testCases}/inContact/UI/max-list/318369.js`, //  Max> Schedule Commitment> Look for + symbol
        `${ProjectPath.testCases}/inContact/UI/max-list/334406.js`, //  [MAX - Error Escalation] Test auth failure
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62654.js`, //  [MAX] Chat UI update TC
        `${ProjectPath.testCases}/inContact/UI/max-list/335685.js`, //  MAX>Disposition> Verify the Disposition dialog pops up at the end of a contact.
        `${ProjectPath.testCases}/inContact/UI/max-list/335690.js`, //  MAX>Disposition>New Disposition Dialog
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62651.js`, //  MAX>Multi Chat>Glance View Notification
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62650.js`, //  MAX>Chat Interface>Updated bubble UI
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62649.js`, //  MAX>Multi Chat>Accept/Reject in Unavailable
        `${ProjectPath.testCases}/inContact/UI/max-list/369007.js`, //  PC > Business Unit > Verify "Max # of calls" accepts only integer values between 1 and 10
        `${ProjectPath.testCases}/inContact/UI/max-list/369017.js`, //  PC > Business Unit > Verify tooltip is displayed for "Max # of calls" field in BU's Details page in Edit mode
        `${ProjectPath.testCases}/inContact/UI/max-list/369018.js`, //  PC > Business Unit > Verify tooltip is displayed for "Maximum Wait Time to Consider" field in BU's Details page in Edit mode
        `${ProjectPath.testCases}/inContact/UI/max-list/369161.js`, //  PC > Skill > General Settings > Verify "Max # of calls" accepts only integer values between 1 and 10
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62644.js`, //  MAX > Multi-Chat reject chat
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62643.js`, //  MAX > Chat times out
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62642.js`, //  [MAX] SCH > customer contact card icon loading icon in empty placeholder .
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62641.js`, //  Max>Information>Verify Data displayed on Information  pane about agent
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62640.js`, //  [SCH][CHAT][MAX] chat in personal queue "from address" is visible in glance preview
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62639.js`, //  [MAX][SCH]>Emails> Parked emails should not lose their icons when you click through
        `${ProjectPath.testCases}/inContact/UI/max-list/383395.js`, //  MAX> Disposition> WI> verify the ACW for active contact should be marked as Active on Accept new contact
        `${ProjectPath.testCases}/inContact/UI/max-list/383665.js`, //  [MAX] Omnichannel - Icons correctly displayed on Assigned Skills pane
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62636.js`, //  [MAX] Omnichannel - Continue chatting after changing ADA configuration
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62635.js`, //  [MAX] Omnichannel UI - Disabled Transfer button on OB email
        `${ProjectPath.testCases}/inContact/UI/max-list/383687.js`, //  MAX> OSH> WI> Reject> Verify the Reject option in a WI is placed correctly in Agent queue
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62633.js`, //  MAX>Contextual Panel>quick replies Should wrap text
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62632.js`, //  MAX Cannot select text in UI to copy and paste from chat.
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62631.js`, //  [MAX] : Can't tell when you select an item in Disposition Window
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62630.js`, //  MAX > Email Client > Font Family, Font Sizes, Other Font Features
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62629.js`, //  Max Contacts get stuck in acw state - Email  - Required Dispo
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62628.js`, //  Max Contacts get stuck in acw state - Chat - Closed by Agent - Required Dispo
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62627.js`, //  Max Contacts get stuck in acw state - Voicemail - Required Dispo
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62626.js`, //  Max Contacts get stuck in acw state - Email - Non-Required Dispo
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62625.js`, //  Max Contacts get stuck in acw state - Voicemail -  Non-Required Dispo
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62624.js`, //  Max Contacts get stuck in acw state - Email - Forward the email- Non-Required Dispo
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62623.js`, //  Max Contacts get stuck in acw state - Voicemail -  Non-Required Dispo - Allow to timeout without Dispo
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62622.js`, //  Max Contacts get stuck in acw state - Email -  Non-Required Dispo - Allow to timeout without Dispo
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62621.js`, //  MCH> MAX> Email> Email body displays their content when is received and when is replied
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62620.js`, //  Email > Disposition > Not able to disposition contact - Required Disposition
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62619.js`, //  Email > Disposition > Not able to disposition contact - Optional Disposition
        `${ProjectPath.testCases}/inContact/UI/max-list/398187.js`, //  [MAX] Add contact icons where they are missing
        `${ProjectPath.testCases}/inContact/UI/max-list/399309.js`, //  MAX>Accept Reject Dialog>Skill name
        `${ProjectPath.testCases}/inContact/UI/max-list/399435.js`, //  MCH > Omnichannel > Multi-party conference
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62615.js`, //  MCH> MAX> Chat> Disposition> Note> It must possible to write in “Note” field from “Disposition Dialog” in Chat Contact
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62614.js`, //  MAX>ADA = on>Chat start time is visible when high contrast ADA is on
        `${ProjectPath.testCases}/inContact/UI/max-list/408286.js`, //  MAX>Setting machine's time zone is the same MAX' time zone
        `${ProjectPath.testCases}/inContact/UI/max-list/409890.js`, //  MAX> Quick Reply> Digital Contacts> Verify the quick replies window is expanded (window out)  or collapse (window in) when we have a Digital Contact
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62611.js`, //  [MAX] Randomly resizes when handling multiple chats and you reply back
        `${ProjectPath.testCases}/inContact/UI/max-list/414292.js`, //  [MAX] internal transfers are showing as "Unknown" until the call is accepted
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62609.js`, //  [MAX] The omni workspaces do not correctly position accept/reject contact window. Chat
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62608.js`, //  [MAX] Accept reject border is transparent - Chat
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62607.js`, //  [MAX] Accept reject border is transparent - Email
        `${ProjectPath.testCases}/inContact/UI/max-list/416401.js`, //  [MAX] Accept reject border is transparent - WI
        `${ProjectPath.testCases}/inContact/UI/max-list/416650.js`, //  [MAX] [New] [OutboundEmail] List of Skills are displayed without duplicated ones.
        `${ProjectPath.testCases}/inContact/UI/max-list/420370.js`, //  [MAX] Launch is offset in ADA high contrast
        `${ProjectPath.testCases}/inContact/UI/max-list/421434.js`, //  [MAX] Save close appears upon contact ending
        `${ProjectPath.testCases}/inContact/UI/max-list/421639.js`, //  MAX>PC>Disposition> Verify the Disposition controls are displayed in PC call.
        `${ProjectPath.testCases}/inContact/UI/max-list/422767.js`, //  MAX> SCH> Email> Verify the “Email workspace” resizes correctly when we have an Email and Phone Contact delivers in Agent
        `${ProjectPath.testCases}/inContact/UI/max-list/423353.js`, //  MAX> SCH> Disposition> Verify the Disposition panel is popping out automatically when Chat and WI contacts are ended.
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62599.js`, //  [MAX] [Email] Email replies options
        `${ProjectPath.testCases}/inContact/UI/max-list/426411.js`, //  MAX>Tool Bar> Launch Button> Verify in IB Phone Contact, the Launch Button is displayed active.
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62597.js`, //  [MAX] Voice mails appear cut off
        `${ProjectPath.testCases}/inContact/UI/max-list/426868.js`, //  MAX> Phone> Verify the Phone workspace doesn't resize too large upon ending contact
        `${ProjectPath.testCases}/inContact/UI/max-list/426876.js`, //  [MAX] Accept reject is cut off
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62594.js`, //  [MAX] Transfer to skills
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62593.js`, //  MAX Set Available
        `${ProjectPath.testCases}/inContact/UI/max-list/437367.js`, //  MAX OB Phone Call
        `${ProjectPath.testCases}/inContact/UI/max-list/437369.js`, //  MAX IB Phone Call
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62590.js`, //  MAX Clear Event Log
        `${ProjectPath.testCases}/inContact/UI/max-list/437373.js`, //  MAX WorkItem
        `${ProjectPath.testCases}/inContact/UI/max-list/437375.js`, //  MAX > Main Panel elements > Call History > No recent calls
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62587.js`, //  MAX More Information
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62586.js`, //  MAX More Event Log
        `${ProjectPath.testCases}/inContact/UI/max-list/437382.js`, //  MAX > Main Panel elements > Contact History > 1 recent call (outbound)
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62584.js`, //  MAX Launch Help
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62583.js`, //  MAX Accept Chat
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62582.js`, //  [MAX] Launch Button highlights them all
        `${ProjectPath.testCases}/inContact/UI/max-list/443012.js`, //  US 435866-Max Agent-Validate Phone Number field in 'Phone Number or Station ID' pop up is able to accept only  maximum of 30 characters
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62580.js`, //  US 435866-Max Agent- Validate Phone Number is displayed correctly under Agent Leg 'Information' pop up
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62579.js`, //  [MAX][Resize] Email inbox minimums
        `${ProjectPath.testCases}/inContact/UI/max-list/455032.js`, //  MAX> PC>Timer for ACW is not visible (countdown) - Agent Unavailable State is not happening
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62577.js`, //  MAX> SCH> Email Ib> Verify the email reply box is not resizable and is encoding specific characters and the edit controls are displayed on it.
        `${ProjectPath.testCases}/inContact/UI/max-list/459263.js`, //  MAX> SCH> WI> Generate a Work item contact
        `${ProjectPath.testCases}/inContact/UI/max-list/459981.js`, //  [Update Setup Session page]: Phone number valid and invalid values on MAX and Thin agent

    ]
};