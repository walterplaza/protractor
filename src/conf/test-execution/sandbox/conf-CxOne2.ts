require('module-alias/register');
let jsLogger = require('js-logger');
import { Config } from 'protractor';
import { ConfigReport } from "@utilities/report-email/config-report";
import { LGMatchers } from '@utilities/matcher/LGMatchers';
import ProjectPath from "@test-data/general/project-path";
import TestBase from "@testcases/test-base";
import { TestReporter } from '@utilities/report-email/custom-report';

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
        `${ProjectPath.testCases}/CXone/UI/IC-65914.js`,
        `${ProjectPath.testCases}/CXone/UI/IC-59085.js`,
    ]
};