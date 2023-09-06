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
        // Email contact
        specs: [
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62664.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62579.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62663.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62607.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62668.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62667.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62626.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62629.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62678.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62620.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62624.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62622.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62686.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62639.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62619.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62676.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62689.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62683.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62682.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62681.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62577.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62599.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62635.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62630.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62621.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62597.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62623.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62625.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62627.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62690.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62692.js`, 
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62594.js`,     
        ]
    }],

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,
};