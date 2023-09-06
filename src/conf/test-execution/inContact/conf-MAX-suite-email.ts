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
        // Email contact
        specs: [
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62664.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62579.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62663.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62607.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62668.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62667.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62626.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62629.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62678.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62620.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62624.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62622.js`,
            // `${ProjectPath.testCases}/inContact/UI/max-list/IC-62686.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62639.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62619.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62676.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62689.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62683.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62682.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62681.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62577.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62599.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62635.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62630.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62621.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62597.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62623.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62625.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62627.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62690.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62692.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62594.js`,

            // From second list
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101297.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101296.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101295.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101289.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101279.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101260.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101255.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101254.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101230.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101252.js`,
        ]
    }],

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,
};