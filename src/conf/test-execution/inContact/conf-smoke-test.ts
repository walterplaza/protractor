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
        `${ProjectPath.testCases}/inContact/UI/max-smoke/434626.js`, // Smoke > Chat
        `${ProjectPath.testCases}/inContact/UI/max-smoke/IC-62719.js`, // Smoke > IB Email
        `${ProjectPath.testCases}/inContact/UI/max-smoke/IC-54782.js`, // Smoke > IB Call
        `${ProjectPath.testCases}/inContact/UI/max-smoke/IC-62718.js`, // VNEXT MAX > Open and set Available
        `${ProjectPath.testCases}/inContact/UI/max-smoke/IC-62696.js`, // Check OB Email Exploratory
        `${ProjectPath.testCases}/inContact/UI/max-list/111205.js`, // Check Voicemail
        `${ProjectPath.testCases}/inContact/UI/max-smoke/IC-62717.js`, // Smoke > Work Item
        // `${ProjectPath.testCases}/inContact/UI/max-smoke/IC-62707.js`, //Blocked by ticket IC-30149
    ]
};