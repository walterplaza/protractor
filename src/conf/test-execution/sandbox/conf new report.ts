require('module-alias/register');
let jsLogger = require('js-logger');
import ProjectPath from "@test-data/general/project-path";
import TestBase from "@testcases/test-base";
import { HTMLBuilder } from '@utilities/new-report/html-builder';
import { LGReport } from '@utilities/new-report/lg-hook';
import { ConfigReport } from "@utilities/report-email/config-report";
import { Config } from 'protractor';

ConfigReport.pushResultToXray = true;
TestBase.setUpTestRunInfo();

// XrayJiraTestPlan.testPlanKey = "IC-86700"

export let config: Config = {

    onPrepare: async function () {
        new LGReport().configHook(); 

        jsLogger.useDefaults({
            defaultLevel: jsLogger.INFO,
            formatter: function (messages, context) {
                messages.unshift(new Date().toLocaleString())
            }
        });
    },

    onComplete: async function () {
        await HTMLBuilder.buildTemplate();
    },

    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome',
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: true,
    SELENIUM_PROMISE_MANAGER: false,
    specs: [
        `${ProjectPath.testCases}/CXone/sanity/469642.js`, // Impersonate and configure
        `${ProjectPath.testCases}/CXone/sanity/449554.js`, // Inbound Call Agent hangs up call
        // `${ProjectPath.testCases}/CXone/sanity/449552.js`, // Create new employee
        // `${ProjectPath.testCases}/CXone/sanity/449556.js`, // Create Tenant
        // `${ProjectPath.testCases}/CXone/sanity/449558.js` // Outbound call Agent hangs up call
    ]
};