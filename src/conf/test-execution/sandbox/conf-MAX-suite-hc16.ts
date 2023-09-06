require('module-alias/register');

import { Config } from 'protractor';
import { ConfigReport } from "@utilities/report-email/config-report";
import { LGMatchers } from '@utilities/matcher/LGMatchers';
import ProjectPath from '@test-data/general/project-path';
import TestBase from '@testcases/test-base';
import TestRunInfo from '@data-objects/general/test-run-info';

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
        `${ProjectPath.testCases}/inContact/UI/426876.js`, // [MAX] Accept reject is cut off
        `${ProjectPath.testCases}/inContact/UI/408286.js`, // MAX>Setting machine's time zone is the same MAX' time zone
        `${ProjectPath.testCases}/inContact/UI/416650.js`, // [MAX] [New] [OutboundEmail] List of Skills are displayed without duplicated ones.
        `${ProjectPath.testCases}/inContact/UI/369352.js`, // MAX > Chat times out
        `${ProjectPath.testCases}/inContact/UI/416387.js`, // [MAX] Accept reject border is transparent - Chat
        `${ProjectPath.testCases}/inContact/UI/405757.js`, // MAX>ADA = on>Chat start time is visible when high contrast ADA is on
        `${ProjectPath.testCases}/inContact/UI/318369.js`, // Max> Schedule Commitment> Look for + symbol
        `${ProjectPath.testCases}/inContact/UI/290414.js`, // MAX>IE>Address book entries not showing up initially when searching for contacts in Max History.
        `${ProjectPath.testCases}/inContact/UI/297140.js`, // MAX > Call back from Dispostion > Cleared with refresh/close
        `${ProjectPath.testCases}/inContact/UI/443013.js`, // US 435866-Max Agent- Validate Phone Number is displayed correctly under Agent Leg 'Information' pop up
        `${ProjectPath.testCases}/inContact/UI/334406.js`, // [MAX - Error Escalation] Test auth failure
        `${ProjectPath.testCases}/inContact/UI/387128.js`, // MAX>Contextual Panel>quick replies Should wrap text
        `${ProjectPath.testCases}/inContact/UI/344986.js`, // MAX>Multi Chat>Accept/Reject in Unavailable
        `${ProjectPath.testCases}/inContact/UI/443012.js`, // US 435866-Max Agent-Validate Phone Number field in 'Phone Number or Station ID' pop up is able to accept only  maximum of 30 characters
        `${ProjectPath.testCases}/inContact/UI/297685.js`, // MAX > Commitment > UI verification
        `${ProjectPath.testCases}/inContact/UI/344442.js`, // MAX>Chat Interface>Updated bubble UI
        `${ProjectPath.testCases}/inContact/UI/379375.js`, // [MAX] SCH > customer contact card icon loading icon in empty placeholder .
        `${ProjectPath.testCases}/inContact/UI/390743.js`, // [MAX] : Can't tell when you select an item in Disposition Window
        `${ProjectPath.testCases}/inContact/UI/459981.js`, // [Update Setup Session page]: Phone number valid and invalid values on MAX and Thin agent
        `${ProjectPath.testCases}/inContact/UI/421434.js`, // [MAX] Save close appears upon contact ending
        `${ProjectPath.testCases}/inContact/UI/426866.js`, // [MAX] Voice mails appear cut off
        `${ProjectPath.testCases}/inContact/UI/335412.js`, // [MAX] Chat UI update TC
        `${ProjectPath.testCases}/inContact/UI/249285.js`, // MAX > Chat Happy Path accept chat with disposition
        `${ProjectPath.testCases}/inContact/UI/252853.js`, // Quicky reply> Keywords with associated QR to be seen for Chats
        `${ProjectPath.testCases}/inContact/UI/392867.js`, // Max Contacts get stuck in acw state - Chat - Closed by Agent - Required Dispo
        `${ProjectPath.testCases}/inContact/UI/249264.js`, // MAX> Personal Queue> Chat> Personal Queue IB Chat
        `${ProjectPath.testCases}/inContact/UI/278460.js`, // [MAX] Change Agent State timer from Minutes to Seconds> Verify that the agent state in the Glance View shows the time HH:MM:SS starting in MM:SS for ACW state
        `${ProjectPath.testCases}/inContact/UI/279417.js`, // [MAX] Ending Conference Call after Patron is dropped> Verify that all other functions in conference (transfer to agent, etc.) continue to work as designed
        `${ProjectPath.testCases}/inContact/UI/392890.js`, // Max Contacts get stuck in acw state - Voicemail -  Non-Required Dispo - Allow to timeout without Dispo
        `${ProjectPath.testCases}/inContact/UI/392875.js`, // Max Contacts get stuck in acw state - Voicemail -  Non-Required Dispo
        `${ProjectPath.testCases}/inContact/UI/392874.js`, // Max Contacts get stuck in acw state - Email - Non-Required Dispo
        `${ProjectPath.testCases}/inContact/UI/392866.js`, // Max Contacts get stuck in acw state - Email  - Required Dispo
        `${ProjectPath.testCases}/inContact/UI/249407.js`, // MAX > Email > Forward Basic Inbound Email Invalid
        `${ProjectPath.testCases}/inContact/UI/395640.js`, // Email > Disposition > Not able to disposition contact - Required Disposition
        `${ProjectPath.testCases}/inContact/UI/IC-62622.js`, // Max Contacts get stuck in acw state - Email -  Non-Required Dispo - Allow to timeout without Dispo
        `${ProjectPath.testCases}/inContact/UI/383359.js`, // [MAX][SCH]>Emails> Parked emails should not lose their icons when you click through
        `${ProjectPath.testCases}/inContact/UI/395650.js`, // Email > Disposition > Not able to disposition contact - Optional Disposition
        `${ProjectPath.testCases}/inContact/UI/249390.js`, // MAX > Email > Basic Inbound Email Transfer To a Skill where agent is logged off
        `${ProjectPath.testCases}/inContact/UI/249412.js`, // MAX > Email > Forward Basic Inbound Email Discard
        `${ProjectPath.testCases}/inContact/UI/249393.js`, // MAX > Email > Basic Inbound Email Non Required Disposition
        `${ProjectPath.testCases}/inContact/UI/249394.js`, // MAX > Email > Basic Inbound Email Non Required Disposition Max Time Limit
        `${ProjectPath.testCases}/inContact/UI/389440.js`, // MAX Cannot select text in UI to copy and paste from chat.
        `${ProjectPath.testCases}/inContact/UI/249106.js`, // MAX > Search > Search for custom address book
        `${ProjectPath.testCases}/inContact/UI/249400.js`, // MAX > Email > Inbound email interrupted by call - save reply draft progress
        `${ProjectPath.testCases}/inContact/UI/437386.js`, // MAX Accept Chat
        `${ProjectPath.testCases}/inContact/UI/437371.js`, // MAX Clear Event Log
        `${ProjectPath.testCases}/inContact/UI/437369.js`, // MAX IB Phone Call
        `${ProjectPath.testCases}/inContact/UI/437384.js`, // MAX Launch Help
        `${ProjectPath.testCases}/inContact/UI/437380.js`, // MAX More Event Log
        `${ProjectPath.testCases}/inContact/UI/437367.js`, // MAX OB Phone Call
        `${ProjectPath.testCases}/inContact/UI/437365.js`, // MAX Set Available
        `${ProjectPath.testCases}/inContact/UI/437373.js`, // MAX WorkItem
        `${ProjectPath.testCases}/inContact/UI/437375.js`, // MAX > Main Panel elements > Call History > No recent calls
        `${ProjectPath.testCases}/inContact/UI/437382.js`, // MAX > Main Panel elements > Contact History > 1 recent call (outbound)
        `${ProjectPath.testCases}/inContact/UI/437379.js`, // MAX More Information
        `${ProjectPath.testCases}/inContact/UI/433739.js`, // [MAX] Transfer to skills
        `${ProjectPath.testCases}/inContact/UI/103030.js`, // MAX > Chat Interactions > ACW > After ending chat, agent state should be ACW disposition
        `${ProjectPath.testCases}/inContact/UI/103033.js`, // MAX > Chat Interactions > ACW > After expiration of ACW time, agent state should be changed to next state
        `${ProjectPath.testCases}/inContact/UI/103037.js`, // MAX > Chat Interactions > ACW > Agent can change state from ACW before time is over
        `${ProjectPath.testCases}/inContact/UI/249567.js`, // MAX > Voice - Interactions> Agent with OB Skills Cold Transfer To An External Number
        `${ProjectPath.testCases}/inContact/UI/383395.js`, // MAX> Disposition> WI> verify the ACW for active contact should be marked as Active on Accept new contact
        `${ProjectPath.testCases}/inContact/UI/459263.js`, // MAX> SCH> WI> Generate a Work item contact
        `${ProjectPath.testCases}/inContact/UI/383672.js`, // [MAX] Omnichannel - Continue chatting after changing ADA configuration
        `${ProjectPath.testCases}/inContact/UI/415162.js`, // [MAX] The omni workspaces do not correctly position accept/reject contact window. Chat
        `${ProjectPath.testCases}/inContact/UI/383685.js`, // [MAX] Omnichannel UI - Disabled Transfer button on OB email
        `${ProjectPath.testCases}/inContact/UI/391553.js`, // MAX > Email Client > Font Family, Font Sizes, Other Font Features
        `${ProjectPath.testCases}/inContact/UI/394802.js`, // MCH> MAX> Email> Email body displays their content when is received and when is replied
        `${ProjectPath.testCases}/inContact/UI/383687.js`, // MAX> OSH> WI> Reject> Verify the Reject option in a WI is placed correctly in Agent queue
    ]
};