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
        // Chat contact
        specs: [
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62687.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62643.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62644.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62582.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62608.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62614.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62580.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62633.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62649.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62650.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62642.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62631.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62651.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62640.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62654.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62685.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62674.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62641.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62628.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62632.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62583.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62590.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62584.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62586.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62593.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62587.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62615.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62695.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62694.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62693.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62636.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62611.js`,  
            `${ProjectPath.testCases}/inContact/UI/max-list/IC-62609.js`, 
        ]
    }],

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,
};