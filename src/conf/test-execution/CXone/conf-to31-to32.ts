require('module-alias/register');
let jsLogger = require('js-logger');
import dbmySQL from '@apis/dbmySQL-api';
import ProjectPath from "@test-data/general/project-path";
import TestBase from "@testcases/test-base";
import { Utility } from '@utilities/general/utility';
import { LGMatchers } from '@utilities/matcher/LGMatchers';
import { ConfigReport } from "@utilities/report-email/config-report";
import { TestReporter } from '@utilities/report-email/custom-report';
import { Config } from 'protractor';

TestBase.setUpTestRunInfo();
// XrayJiraTestPlan.testPlanKey = "IC-86700"

export let config: Config = {

    onPrepare: async function () {
        beforeEach(async function () {
            await ConfigReport.reportSetupConfig();
            await ConfigReport.setTimeReportStart();
            await jasmine.getEnv().addReporter(TestReporter);
            await jasmine.addMatchers(LGMatchers);
        });

        afterEach(function () {
            ConfigReport.setTimeReportFinish();
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
        await Utility.delay(5);
        await dbmySQL.addTestExecutionAssociations();
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