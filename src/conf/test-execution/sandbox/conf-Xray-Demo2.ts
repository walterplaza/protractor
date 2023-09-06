require('module-alias/register');
let jsLogger = require('js-logger');
import { Config } from 'protractor';
import { ConfigReport } from "@utilities/report-email/config-report";
import { LGMatchers } from '@utilities/matcher/LGMatchers';
import TestBase from "@testcases/test-base";
import { TestReporter } from '@utilities/report-email/custom-report';
import { Utility, XrayJiraUtility } from '@utilities/general/utility';
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
        console.log("testExecutionKey: " + testExecutionKey)
        await ConfigReport.convertXMLtoPieChart('Report');
        await Utility.delay(10);
    },

    framework: 'jasmine2',
    capabilities: {
        browserName: 'chrome',
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: true,
    SELENIUM_PROMISE_MANAGER: false,
    
    specs: XrayJiraUtility.getListSpec()
};