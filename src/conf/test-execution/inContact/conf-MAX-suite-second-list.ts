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

    framework: 'jasmine',
    capabilities: {
        browserName: `${TestRunInfo.browser}`,
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,

    specs: [
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101265.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101240.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101231.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101282.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101276.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101275.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101271.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101253.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101299.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101290.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101287.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101286.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101284.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101283.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101272.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101256.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101281.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101280.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101278.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101258.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101247.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101229.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101246.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101245.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101268.js`,

        //Need repair
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62640.js`,
        `${ProjectPath.testCases}/inContact/UI/max-list/IC-62686.js`,

    ]
};