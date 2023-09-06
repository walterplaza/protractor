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
        `${ProjectPath.testCases}/CXone/UI/smoke-blue/437407.js`, // [Evolve][WFI] - WFI > Rules > Create New > Periodic condition > Validate successful rule creation with Frequency 'Hourly' End 'After X Occurrences'
        `${ProjectPath.testCases}/CXone/UI/smoke-blue/457245.js`, // [SMOKE] CxOne > Reporting > Data Download  > Smoke testing
        `${ProjectPath.testCases}/CXone/UI/smoke-blue/457247.js`, // [SMOKE] CxOne > Reporting > Prebuilt Reports > Bi reports
        `${ProjectPath.testCases}/CXone/UI/smoke-blue/484801.js`, // CXOne>Logout smoke test
    ]
};