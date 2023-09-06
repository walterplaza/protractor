require('module-alias/register');

import { Config } from 'protractor';
import { ConfigReport } from "@utilities/report-email/config-report";
import { LGMatchers } from '@utilities/matcher/LGMatchers';
import ProjectPath from '@test-data/general/project-path';
import TestBase from '@testcases/test-base';
import TestRunInfo from '@data-objects/general/test-run-info';
import { TestCondition } from '@test-helpers/test-condition';

let jsLogger = require('js-logger');
TestBase.setUpTestRunInfo();

export let config: Config = {

    onPrepare: async function () {
        beforeEach(function () {
            ConfigReport.reportSetupConfig();
            jasmine.addMatchers(LGMatchers);
        });

        jsLogger.useDefaults({
            defaultLevel: jsLogger.INFO,
            formatter: function (messages, context) {
                messages.unshift(new Date().toLocaleString())
            }
        });

        await ConfigReport.createXMLReport();

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
        });
    },

    onComplete: async function () {
        await ConfigReport.convertXMLtoPieChart('inContact Smoke Test');
    },

    framework: 'jasmine',
    capabilities: {
        browserName: `${TestRunInfo.browser}`,
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,

    specs: [
        `${ProjectPath.testCases}/inContact/UI/103030.js`,
        `${ProjectPath.testCases}/inContact/UI/103033.js`,
        `${ProjectPath.testCases}/inContact/UI/103037.js`,
        `${ProjectPath.testCases}/inContact/UI/111205.js`,
        `${ProjectPath.testCases}/inContact/UI/180351.js`,
        `${ProjectPath.testCases}/inContact/UI/248678.js`,
        `${ProjectPath.testCases}/inContact/UI/248874.js`,
        `${ProjectPath.testCases}/inContact/UI/249264.js`,
        `${ProjectPath.testCases}/inContact/UI/249285.js`,
        `${ProjectPath.testCases}/inContact/UI/249390.js`,
        `${ProjectPath.testCases}/inContact/UI/249393.js`,
        `${ProjectPath.testCases}/inContact/UI/249407.js`,
        `${ProjectPath.testCases}/inContact/UI/249412.js`,
        `${ProjectPath.testCases}/inContact/UI/249567.js`,
        `${ProjectPath.testCases}/inContact/UI/278034.js`,
        `${ProjectPath.testCases}/inContact/UI/278035.js`,
        `${ProjectPath.testCases}/inContact/UI/279417.js`,
        `${ProjectPath.testCases}/inContact/UI/334406.js`,
        `${ProjectPath.testCases}/inContact/UI/335412.js`,
        `${ProjectPath.testCases}/inContact/UI/335685.js`,
        `${ProjectPath.testCases}/inContact/UI/344442.js`,
        `${ProjectPath.testCases}/inContact/UI/344986.js`,
        `${ProjectPath.testCases}/inContact/UI/369351.js`,
        `${ProjectPath.testCases}/inContact/UI/369352.js`,
        `${ProjectPath.testCases}/inContact/UI/389440.js`,
        `${ProjectPath.testCases}/inContact/UI/392867.js`,
        `${ProjectPath.testCases}/inContact/UI/392870.js`,
        `${ProjectPath.testCases}/inContact/UI/392875.js`,
        `${ProjectPath.testCases}/inContact/UI/392890.js`,
        `${ProjectPath.testCases}/inContact/UI/394802.js`,
    ]
};