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
        // `${ProjectPath.testCases}/inContact/UI/MAX-General-Glance/Commitment/IC-103116.js`, // [MAX][Schedule][ADA=ON] Verify that "next" and "back"  arrows are displayed on the calendar
        // `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Phone/IC-103910.js`, // [MAX] [IB] [Phone] Validate that dispositions are not being shown when udpate from dispositions to Automatic Wrap up
        // `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Phone/IC-104198.js`, // [MAX][Glance][Station ID]First option of radio buttons must be selected by default when launching MAX
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Phone/IC-63482.js`, // [MAX][Phone][Page Action][Panel= On] Verify the "Page" can be opened for Ib Phone Contact
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Phone/IC-63484.js`, // [MAX][Phone][Page Action][Panel= Off] Verify the "Page" can be opened for Ib Phone Contact
        // `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Phone/IC-100927.js`, // [MAX] [OB Phone] [Hold] [OB Email] Validate that when hold a call agent is able to begin an OB Mail.
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Chat/IC-98650.js`, // Generate chat with MAX window maximized
        // `${ProjectPath.testCases}/inContact/UI/MAX-General-Glance/address-book/IC-76333.js`, // [MAX] [Address Book] [Call] Validate that when click on contact button a menu of contact methods available for this person it's being displayed. 
        // `${ProjectPath.testCases}/inContact/UI/MAX-General-Glance/launch-max/IC-97744.js`, // [MAX] [Station ID] Validate that using phone number related to Station ID the details of login are being shown on User history
        // `${ProjectPath.testCases}/inContact/UI/MAX-General-Glance/launch-max/IC-97790.js`, // [MAX] [Station ID] Validate that on Station History the details of login with Phone number are being shown
        // `${ProjectPath.testCases}/inContact/UI/MAX-General-Glance/IC-100710.js`, // [MAX][Agent Reports][Performance][OB Calls] Show details correctly
        `${ProjectPath.testCases}/inContact/UI/MAX-General-Glance/IC-100716.js`, // [MAX][Agent Reports][Performance][IB Calls] Show details correctly 
    ]
};