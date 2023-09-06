require('module-alias/register');
let jsLogger = require('js-logger');
import dbmySQL from '@apis/dbmySQL-api';
import XrayAPI from '@apis/xray-api';
import ProjectPath from "@test-data/general/project-path";
import TestBase from "@testcases/test-base";
import { HTMLBuilder } from '@utilities/new-report/html-builder';
import { LGReport } from '@utilities/new-report/lg-hook';
import { ConfigReport } from "@utilities/report-email/config-report";
import { Config } from 'protractor';

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
        browserName: 'chrome',
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,
    specs: [
        `${ProjectPath.testCases}/CXone/sanity/469642.js`, // Impersonate and configure
        // `${ProjectPath.testCases}/CXone/sanity/449554.js`, // Inbound Call Agent hangs up call
        // `${ProjectPath.testCases}/CXone/sanity/449552.js`, // Create new employee
        // `${ProjectPath.testCases}/CXone/sanity/449556.js`, // Create Tenant
        // `${ProjectPath.testCases}/CXone/sanity/449558.js` // Outbound call Agent hangs up call
    ]
};