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
        // Phone contact
        specs: [
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62672.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62613.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62656.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62598.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62596.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62665.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62662.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62581.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62660.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62604.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62603.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62657.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62669.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62670.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62673.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62666.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62671.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62691.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62688.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62591.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62592.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62588.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62585.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62602.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62578.js`,
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62616.js`,

            // From second list
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101294.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101292.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101277.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101274.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101273.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101262.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101261.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101257.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101237.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101232.js`,
            `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101225.js`,
        ]
    }],

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,
};