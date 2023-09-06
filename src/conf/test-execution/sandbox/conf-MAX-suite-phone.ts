require('module-alias/register');

import { Config } from 'protractor';
import { ConfigReport } from "@utilities/report-email/config-report";
import { LGMatchers } from '@utilities/matcher/LGMatchers';
import ProjectPath from '@test-data/general/project-path';
import TestBase from '@testcases/test-base';
import TestRunInfo from '@data-objects/general/test-run-info';
import { TestCondition } from '@test-helpers/test-condition';
import { Utility } from '@utilities/general/utility';
import dbmySQL from '@apis/dbmySQL-api';
import { TestReporter } from '@utilities/report-email/custom-report';
import XrayAPI from '@apis/xray-api';

let jsLogger = require('js-logger');
ConfigReport.pushResultToXray = true;
TestBase.setUpTestRunInfo();

export let config: Config = {

    onPrepare: async function () {
        beforeEach(async function () {
            await ConfigReport.reportSetupConfig();
            await ConfigReport.setTimeReportStart();
            await jasmine.getEnv().addReporter(TestReporter);
            jasmine.addMatchers(LGMatchers);
        });

        jsLogger.useDefaults({
            defaultLevel: jsLogger.INFO,
            formatter: function (messages, context) {
                messages.unshift(new Date().toLocaleString())
            }
        });

        afterEach(async () => {
            try {
                if (!ConfigReport.checkErrorPic) {
                    for (let i = 0; i < TestRunInfo.agentList.length; i++) {
                        await TestCondition.cleanUpAgentSkills(TestRunInfo.agentList[i]);
                    }
                }
                TestRunInfo.agentList.length = 0;
            } catch (err) {
                TestRunInfo.agentList.length = 0;
            };
            await ConfigReport.setTimeReportFinish();
        });

        await ConfigReport.createXMLReport();
    },

    onComplete: async function () {
        await ConfigReport.convertXMLtoPieChart('Report');
        await Utility.delay(5);
        await dbmySQL.addTestExecutionAssociations();
        await Utility.delay(5);
        let testExecutionKey = await XrayAPI.importResultTestExecution();
        console.log("testExecutionKey: " + testExecutionKey)
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

        ]
    }],

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,
};