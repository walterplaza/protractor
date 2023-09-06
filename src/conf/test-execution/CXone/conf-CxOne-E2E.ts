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
    ]
};