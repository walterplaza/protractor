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
            defaultLevel: jsLogger.DEBUG,
            formatter: function (messages, context) {
                messages.unshift(new Date().toLocaleString())
            }
        });

        // await ConfigReport.createXMLReport();

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

    onComplete: function () {
        // ConfigReport.convertXMLtoPieChart('inContact Smoke Test');
    },

    framework: 'jasmine',
    capabilities: {
        browserName: `${TestRunInfo.browser}`,
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,

    specs: [
        `${ProjectPath.testCases}/sandbox/test_api_newFramework.js`, // Smoke > Chat
        // `${ProjectPath.testCases}/inContact/UI/IC-62719.js`, // Smoke > IB Email
        // `${ProjectPath.testCases}/inContact/UI/IC-54782.js`, // Smoke > IB Call
        // `${ProjectPath.testCases}/inContact/UI/IC-62718.js`, // VNEXT MAX > Open and set Available
        // `${ProjectPath.testCases}/inContact/UI/IC-62696.js`, // Check OB Email Exploratory
        // `${ProjectPath.testCases}/inContact/UI/111205.js`, // Check Voicemail
        // `${ProjectPath.testCases}/inContact/UI/IC-62717.js`, // Smoke > Work Item
        // `${ProjectPath.testCases}/inContact/UI/IC-62707.js`, //Blocked by ticket IC-30149
    ]
};