require('module-alias/register');

import TestRunInfo from '@data-objects/general/test-run-info';
import ProjectPath from '@test-data/general/project-path';
import { TestCondition } from '@test-helpers/test-condition';
import TestBase from '@testcases/test-base';
import { LGMatchers } from '@utilities/matcher/LGMatchers';
import { ConfigReport } from "@utilities/report-email/config-report";
import { Config } from 'protractor';
import XrayAPI from '@apis/xray-api';
import { Utility } from '@utilities/general/utility';
import dbmySQL from '@apis/dbmySQL-api';

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
        await ConfigReport.convertXMLtoPieChart('Report');
        await Utility.delay(5);
        await dbmySQL.addTestExecutionAssociations();
        await Utility.delay(5);
        let testExecutionKey = await XrayAPI.importResultTestExecution();
        console.log("testExecutionKey: " + testExecutionKey)
    },

    framework: 'jasmine',
    capabilities: {
        browserName: `${TestRunInfo.browser}`,
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,

    specs: [
        `${ProjectPath.testCases}/inContact/UI/max-second-list/103035.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/180356.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/180362.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/248695.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/248696.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/248829.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/249306.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/249307.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/249401.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/249402.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/249403.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/249406.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/249443.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/249444.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/249445.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/249458.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/270062.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/276987.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/291485.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/291486.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/294339.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/295877.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/297138.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/297139.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/297368.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/304899.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/344452.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/344981.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/344991.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/369162.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/374617.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/389227.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/389314.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/392873.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/392904.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/399601.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/403353.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/407309.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/414327.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/417154.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/421088.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/421107.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/432908.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/443299.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/443850.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/443851.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/443852.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/443973.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/444002.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/444170.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/444291.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/444309.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/445448.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/446757.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/455882.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/455033.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/455444.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/455740.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/455777.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/455826.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/455989.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/296295.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/443290.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/443296.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/443847.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/446758.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/475251.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/224847.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/317353.js`,

    ]
};