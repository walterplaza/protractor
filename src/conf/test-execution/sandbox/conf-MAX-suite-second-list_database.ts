require('module-alias/register');

import TestRunInfo from '@data-objects/general/test-run-info';
import ProjectPath from '@test-data/general/project-path';
import { TestCondition } from '@test-helpers/test-condition';
import TestBase from '@testcases/test-base';
import { LGMatchers } from '@utilities/matcher/LGMatchers';
import { ConfigReport } from "@utilities/report-email/config-report";
import { Config } from 'protractor';
import { TestReporter } from '@utilities/report-email/custom-report';
import { Utility } from '@utilities/general/utility';
import dbmySQL from '@apis/dbmySQL-api';
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
            await jasmine.addMatchers(LGMatchers);
        });

        afterEach(async () => {
            await ConfigReport.setTimeReportFinish();
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

        jsLogger.useDefaults({
            defaultLevel: jsLogger.INFO,
            formatter: function (messages, context) {
                messages.unshift(new Date().toLocaleString())
            }
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

    framework: 'jasmine',
    capabilities: {
        browserName: `${TestRunInfo.browser}`,
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,

    specs: [       
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101225.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101226.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101227.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101228.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101229.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101230.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101231.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101232.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101233.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101234.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101235.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101236.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101237.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101238.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101239.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101240.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101242.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101243.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101244.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101245.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101246.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101247.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101252.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101253.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101254.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101255.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101256.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101257.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101258.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101259.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101260.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101261.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101262.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101263.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101264.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101265.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101266.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101267.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101268.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101269.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101270.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101271.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101272.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101273.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101274.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101275.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101276.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101277.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101278.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101279.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101280.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101281.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101282.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101283.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101284.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101285.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101286.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101287.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101289.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101290.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101292.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101294.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101295.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101296.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101297.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101298.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101299.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101300.js`,
        `${ProjectPath.testCases}/inContact/UI/max-second-list/IC-101302.js`,


    ]
};