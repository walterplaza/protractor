require('module-alias/register');
let jsLogger = require('js-logger');
import { Config } from 'protractor';
import { ConfigReport } from "@utilities/report-email/config-report";
import { LGMatchers } from '@utilities/matcher/LGMatchers';
import ProjectPath from "@test-data/general/project-path";
import TestBase from "@testcases/test-base";
import { TestReporter } from '@utilities/report-email/custom-report';
import { Utility } from '@utilities/general/utility';
import dbmySQL from '@apis/dbmySQL-api';

TestBase.setUpTestRunInfo();

export let config: Config = {

    onPrepare: async function () {
        beforeEach(async function () {
            await ConfigReport.reportSetupConfig();
            await ConfigReport.setTimeReportStart();
            await jasmine.getEnv().addReporter(TestReporter);
            jasmine.addMatchers(LGMatchers);
        });

        afterEach(async function () {
            await ConfigReport.setTimeReportFinish();
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
        // await Utility.delay(5);
        // await dbmySQL.addTestExecutionAssociations();
    },

    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome',
        'chromeOptions': {
            args: ['--lang=en-US']
        }
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,
    specs: [
        `${ProjectPath.testCases}/CXone/UI/IC-58723.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-58724.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-58725.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-58726.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-58728.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-58730.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-58731.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-58732.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-58733.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-58568.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-58735.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-65914.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-58574.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-58575.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-59085.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-68403.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-58715.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-58689.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-58602.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-58604.js`,
    ]
};