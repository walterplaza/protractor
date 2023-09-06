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
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62610.js`,
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

        ]
    }
    ],

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,
};