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

    onComplete: function () {
        ConfigReport.convertXMLtoPieChart('inContact Smoke Test');
    },

    framework: 'jasmine',
    capabilities: {
        browserName: `${TestRunInfo.browser}`,
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,

    specs: [
        //`${ProjectPath.testCases}/inContact/UI/max-smoke/434626.js`, // Smoke > Chat
        // `${ProjectPath.testCases}/inContact/UI/max-smoke/IC-62719.js`, // Smoke > IB Email
        // `${ProjectPath.testCases}/inContact/UI/max-smoke/IC-54782.js`, // Smoke > IB Call
        // `${ProjectPath.testCases}/inContact/UI/max-smoke/IC-62718.js`, // VNEXT MAX > Open and set Available
        // `${ProjectPath.testCases}/inContact/UI/max-smoke/IC-62696.js`, // Check OB Email Exploratory
        // `${ProjectPath.testCases}/inContact/UI/max-list/111205.js`, // Check Voicemail
        // `${ProjectPath.testCases}/inContact/UI/max-smoke/IC-62717.js`, // Smoke > Work Item
        // `${ProjectPath.testCases}/inContact/UI/max-smoke/IC-62707.js`, //Blocked by ticket IC-30149
        `${ProjectPath.testCases}/inContact/UI/MAX Common/MAX-Phone/IC-63482.js`, // Page action IB phone Panel ON
        `${ProjectPath.testCases}/inContact/UI/MAX Common/MAX-Phone/IC-63484.js`,// Page action IB phone Panel OFF
        // `${ProjectPath.testCases}/inContact/UI/Phone/Contact Panels/IC-63493.js`, // screen pops

    ]
};