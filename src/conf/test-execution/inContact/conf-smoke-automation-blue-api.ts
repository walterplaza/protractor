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
        `${ProjectPath.testCases}/CXone/non-UI/smoke-blue/474373.js`, // CXone > Dashboards > Unavailable Statistics > Capture JSON response > Verify the status 200 (OK) of the service for Unavailable statistics
        `${ProjectPath.testCases}/CXone/non-UI/smoke-blue/474379.js`, // CXone > Dashboards > ACD > Agent Performance by Hour > JSON - Verify the status 200 (OK) of the service for Agent Performance by Hour
        `${ProjectPath.testCases}/CXone/non-UI/smoke-blue/476213.js`, // CXone > Dashboards > Skill Summary > Capture JSON response > Cachesite > Verify the status 200 (OK) of the service for Skill Summary
        `${ProjectPath.testCases}/CXone/non-UI/smoke-blue/476237.js`, // CXone > Dashboards > Skill Summary > Capture JSON response > Report Service > Verify the status 200 (OK) of the service for Skill Summary
    ]
};