require('module-alias/register');

import dbmySQL from '@apis/dbmySQL-api';
import XrayAPI from '@apis/xray-api';
import TestRunInfo from '@data-objects/general/test-run-info';
import ProjectPath from '@test-data/general/project-path';
import TestBase from '@testcases/test-base';
import { ConfigReport } from "@utilities/report-email/config-report";
import { Config } from 'protractor';
import { HTMLBuilder } from '@utilities/new-report/html-builder';
import { LGReport } from '@utilities/new-report/lg-hook';

let jsLogger = require('js-logger');
ConfigReport.pushResultToXray = true;
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

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,

    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome',
        'chromeOptions': {
            args: ['--lang=en-US']
        }
    },

    specs: [
        // WI contact
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62595.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62648.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62645.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62655.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62647.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62646.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62606.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62575.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62589.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62638.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62576.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62634.js`,

        // Multiple skills
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62612.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62605.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62600.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62661.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62618.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62658.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62659.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62652.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62684.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62680.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62679.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62677.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62653.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62617.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62601.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62637.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62675.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62610.js`,

        // From second list 
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101285.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101259.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101238.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101236.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101227.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101226.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101300.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101266.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101244.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101243.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101242.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101235.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101263.js`,
    ]
};