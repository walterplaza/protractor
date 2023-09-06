require('module-alias/register');

import dbmySQL from '@apis/dbmySQL-api';
import XrayAPI from '@apis/xray-api';
import TestRunInfo from '@data-objects/general/test-run-info';
import ProjectPath from '@test-data/general/project-path';
import TestBase from '@testcases/test-base';
import { HTMLBuilder } from '@utilities/new-report/html-builder';
import { LGReport } from '@utilities/new-report/lg-hook';
import { ConfigReport } from "@utilities/report-email/config-report";
import { Config } from 'protractor';

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

    multiCapabilities: [{
        browserName: `${TestRunInfo.browser}`,
        // Chat contact
        specs: [
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62687.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62643.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62644.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62582.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62608.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62614.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62580.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62633.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62649.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62650.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62642.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62631.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62651.js`,
            // `${ProjectPath.testCases}/inContact/UI/max-list/IC-62640.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62654.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62685.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62674.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62641.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62628.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62632.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62583.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62590.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62584.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62586.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62593.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62587.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62615.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62695.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62694.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62693.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62636.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62611.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62609.js`,

            // From second list
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101302.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101270.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101269.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101267.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101264.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101239.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101234.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101233.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101228.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101298.js`,
        ]
    }],

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,
};