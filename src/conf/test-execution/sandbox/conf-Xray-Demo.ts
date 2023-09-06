require('module-alias/register');
let jsLogger = require('js-logger');
import { Config } from 'protractor';
import { ConfigReport } from "@utilities/report-email/config-report";
import { LGMatchers } from '@utilities/matcher/LGMatchers';
import ProjectPath from "@test-data/general/project-path";
import TestBase from "@testcases/test-base";
import { TestReporter } from '@utilities/report-email/custom-report';
import { Utility } from '@utilities/general/utility';
import XrayAPI from '@apis/xray-api';

ConfigReport.pushResultToXray = true;

TestBase.setUpTestRunInfo();

export let config: Config = {

    onPrepare: async function () {
        beforeEach(function () {
            ConfigReport.reportSetupConfig();
            ConfigReport.setTimeReportStart();
            jasmine.getEnv().addReporter(TestReporter);
            jasmine.addMatchers(LGMatchers);
        });

        afterEach(async function () {
            ConfigReport.setTimeReportFinish();
            await Utility.delay(2);
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
        await Utility.delay(10);
        let testExecutionKey = await XrayAPI.importResultTestExecution();
        await Utility.delay(2);
        console.log("Test Execution Key: " + testExecutionKey)
        await ConfigReport.convertXMLtoPieChart('Report');
    },

    framework: 'jasmine2',
    capabilities: {
        browserName: 'chrome',
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: true,
    SELENIUM_PROMISE_MANAGER: false,
    specs: [
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Chat/IC-98650.js`,
    ]
};