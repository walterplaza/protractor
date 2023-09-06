require('module-alias/register');
let jsLogger = require('js-logger');
import ProjectPath from "@test-data/general/project-path";
import TestBase from "@testcases/test-base";
import { LGMatchers } from '@utilities/matcher/LGMatchers';
import { ConfigReport } from "@utilities/report-email/config-report";
import { Config } from 'protractor';

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
        await ConfigReport.convertXMLtoPieChart('CxOne Sanity Test');

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
        `${ProjectPath.testCases}/CXone/sanity/449554.js`, // Inbound Call Agent hangs up call
        `${ProjectPath.testCases}/CXone/sanity/449552.js`, // Create new employee
        `${ProjectPath.testCases}/CXone/sanity/IC-65937.js`, // Create Tenant
        `${ProjectPath.testCases}/CXone/sanity/449558.js` // Outbound call Agent hangs up call
    ]
};