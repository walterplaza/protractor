require('module-alias/register');

import dbmySQL from '@apis/dbmySQL-api';
import XrayAPI from '@apis/xray-api';
import TestRunInfo from '@data-objects/general/test-run-info';
import ProjectPath from '@test-data/general/project-path';
import TestBase from '@testcases/test-base';
import { HTMLBuilder } from '@utilities/new-report/html-builder';
import { LGReport } from '@utilities/new-report/lg-hook';
import { ConfigReport } from "@utilities/report-email/config-report";
import { Config } from 'protractor';

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
        `${ProjectPath.testCases}/inContact/non-UI/smoke-orange/314458.js`, //inContact API > Admin > Add / Remove Team Unavailable Code
        `${ProjectPath.testCases}/inContact/non-UI/smoke-orange/318939.js`, //inContact API > Admin > DELETE Address Book Standard Entries> V8 > Success
        `${ProjectPath.testCases}/inContact/non-UI/smoke-orange/331423.js`, //inContact API > Admin > DELETE files > V8 > Success
        `${ProjectPath.testCases}/inContact/non-UI/smoke-orange/380152.js`, //inContact API > Reporting > GET contacts/completed > V8 > Success
        `${ProjectPath.testCases}/inContact/non-UI/smoke-orange/380816.js`, //[VC] Verify Inbound Phone Routability & Contact End
        `${ProjectPath.testCases}/inContact/non-UI/smoke-orange/380818.js`, //[VC] Verify Work Item Routability & Contact End
        `${ProjectPath.testCases}/inContact/non-UI/smoke-orange/380819.js`, //[VC] Verify Single Chat Routability & Contact End
        `${ProjectPath.testCases}/inContact/non-UI/smoke-orange/391094.js`, //[VC] Verify Outbound Email Routability & Contact End With ACW
        `${ProjectPath.testCases}/inContact/non-UI/smoke-orange/407331.js`, //inContact API > Realtime > GET Specific Team Performance Summary (Single) > V3 > Success
        `${ProjectPath.testCases}/inContact/non-UI/smoke-orange/481900.js`, //API V13 - GET Skills
        `${ProjectPath.testCases}/inContact/non-UI/smoke-orange/481910.js`, //API V13 - PUT Update Skill
        `${ProjectPath.testCases}/inContact/non-UI/smoke-orange/482082.js`, //API V13 - GET Skill Schedule - /services/v13.0/skills/{skillId}/parameters/schedule-settings
        `${ProjectPath.testCases}/inContact/non-UI/smoke-orange/482982.js`, //API V13 - PUT Update Skill XS Settings
        `${ProjectPath.testCases}/inContact/UI/smoke-orange/223052.js`, //[SMOKE] Central > Reporting/Analytics > Canned Reports > BI Reports
        `${ProjectPath.testCases}/inContact/UI/smoke-orange/263080.js`, //[Supervisor] Force logout > Choose "yes" on the popup
        `${ProjectPath.testCases}/inContact/UI/smoke-orange/289753.js`, //Supervisor >Skills - Display Skill Assignments for an Agent> Click an agent to open up a drill down on that specific agent
        `${ProjectPath.testCases}/inContact/UI/smoke-orange/376507.js`, //inContact Outbound > Calling Lists > Upload and Verify Process Status > Success
        `${ProjectPath.testCases}/inContact/UI/smoke-orange/380067.js`, //380067 inContact Outbound > Personal Connection > Skill creation > Success
        `${ProjectPath.testCases}/inContact/UI/smoke-orange/414875.js`, //[SMOKE] Central > Reporting/Analytics > Data Download > Admin > Data Download > Smoke testing over Data download reports
        `${ProjectPath.testCases}/inContact/UI/smoke-orange/414876.js`, //[SMOKE] Central > Reporting/Analytics > Dashboards > Smoke testing over Dashboards
        `${ProjectPath.testCases}/inContact/UI/smoke-orange/414878.js`, //[SMOKE] Central > Reporting/Analytics > Custom > Smoke testing over Custom Reports
        `${ProjectPath.testCases}/inContact/UI/smoke-orange/414879.js`, //[SMOKE] Central > Reporting/Analytics > Schedules > Smoke testing over Schedules for Custom Reporting
        `${ProjectPath.testCases}/inContact/UI/smoke-orange/439710.js`, //Central > Admin > WFI > Rules > Create New > Action 'Manage Skill' - Multiple Action > Validate successful rule creation
        `${ProjectPath.testCases}/inContact/UI/smoke-orange/451955.js`, //[Customer Chat] Popping Out ActiveChat window when surfed away_Verify ActiveChat window session when the Customer surfs away in new tab with same domain
        `${ProjectPath.testCases}/inContact/UI/smoke-orange/470554.js`, //[Smoke] Central > Reporting/Analytics > Schedules > Smoke testing over Schedules for DataDownload report
        `${ProjectPath.testCases}/inContact/UI/smoke-orange/485697.js`, //Central>Internal Admin>Business Units>The dependencies of the check boxes are working correctly
        `${ProjectPath.testCases}/inContact/UI/smoke-orange/486005.js`, //Central changes to add new configuration fields on skill page_To validate disablement of 'Enable Chat Messaging Time Out' checkbox in existing chat skill
        `${ProjectPath.testCases}/inContact/UI/smoke-orange/454942.js`, //[Customer Chat] Support for PopOut and PopIn for ActiveChat window_Verify pop out functionality for Acitvechat window.
        `${ProjectPath.testCases}/inContact/UI/smoke-orange/486189.js`, //Central changes to add new configuration fields on skill page_To validate element and labels  of 'Enable Chat Messaging Time Out' checkbox in existing chat skill
        `${ProjectPath.testCases}/inContact/UI/smoke-orange/486371.js`, //Central Blue > Reporting/Analytics > Dashboards > Happy path testing over Dashboards     
    ]
};