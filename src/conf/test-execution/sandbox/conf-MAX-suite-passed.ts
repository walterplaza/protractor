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
        `${ProjectPath.testCases}/inContact/UI/249106.js`,
        `${ProjectPath.testCases}/inContact/UI/249264.js`,
        `${ProjectPath.testCases}/inContact/UI/249285.js`,
        `${ProjectPath.testCases}/inContact/UI/249390.js`,
        `${ProjectPath.testCases}/inContact/UI/249393.js`,
        `${ProjectPath.testCases}/inContact/UI/249394.js`,
        `${ProjectPath.testCases}/inContact/UI/249407.js`,
        `${ProjectPath.testCases}/inContact/UI/249412.js`,
        `${ProjectPath.testCases}/inContact/UI/278034.js`,
        `${ProjectPath.testCases}/inContact/UI/278035.js`,
        `${ProjectPath.testCases}/inContact/UI/278460.js`,
        `${ProjectPath.testCases}/inContact/UI/279142.js`,
        `${ProjectPath.testCases}/inContact/UI/279417.js`,
        `${ProjectPath.testCases}/inContact/UI/290414.js`,
        `${ProjectPath.testCases}/inContact/UI/294342.js`,
        `${ProjectPath.testCases}/inContact/UI/295575.js`,
        `${ProjectPath.testCases}/inContact/UI/297140.js`,
        `${ProjectPath.testCases}/inContact/UI/297685.js`,
        `${ProjectPath.testCases}/inContact/UI/301912.js`,
        `${ProjectPath.testCases}/inContact/UI/318369.js`,
        `${ProjectPath.testCases}/inContact/UI/334406.js`,
        `${ProjectPath.testCases}/inContact/UI/335412.js`,
        `${ProjectPath.testCases}/inContact/UI/335690.js`,
        `${ProjectPath.testCases}/inContact/UI/344442.js`,
        `${ProjectPath.testCases}/inContact/UI/344986.js`,
        `${ProjectPath.testCases}/inContact/UI/369007.js`,
        `${ProjectPath.testCases}/inContact/UI/369017.js`,
        `${ProjectPath.testCases}/inContact/UI/369018.js`,
        `${ProjectPath.testCases}/inContact/UI/369161.js`,
        `${ProjectPath.testCases}/inContact/UI/369351.js`,
        `${ProjectPath.testCases}/inContact/UI/369352.js`,
        `${ProjectPath.testCases}/inContact/UI/379375.js`,
        `${ProjectPath.testCases}/inContact/UI/380476.js`,
        `${ProjectPath.testCases}/inContact/UI/383359.js`,
        `${ProjectPath.testCases}/inContact/UI/383395.js`,
        `${ProjectPath.testCases}/inContact/UI/383665.js`,
        `${ProjectPath.testCases}/inContact/UI/383672.js`,
        `${ProjectPath.testCases}/inContact/UI/383685.js`,
        `${ProjectPath.testCases}/inContact/UI/383687.js`,
        `${ProjectPath.testCases}/inContact/UI/387128.js`,
        `${ProjectPath.testCases}/inContact/UI/389440.js`,
        `${ProjectPath.testCases}/inContact/UI/390743.js`,
        `${ProjectPath.testCases}/inContact/UI/391553.js`,
        `${ProjectPath.testCases}/inContact/UI/392867.js`,
        `${ProjectPath.testCases}/inContact/UI/392874.js`,
        `${ProjectPath.testCases}/inContact/UI/392875.js`,
        `${ProjectPath.testCases}/inContact/UI/392890.js`,
        `${ProjectPath.testCases}/inContact/UI/IC-62622.js`,
        `${ProjectPath.testCases}/inContact/UI/394802.js`,
        `${ProjectPath.testCases}/inContact/UI/395650.js`,
        `${ProjectPath.testCases}/inContact/UI/398187.js`,
        `${ProjectPath.testCases}/inContact/UI/399309.js`,
        `${ProjectPath.testCases}/inContact/UI/401212.js`,
        `${ProjectPath.testCases}/inContact/UI/405757.js`,
        `${ProjectPath.testCases}/inContact/UI/408286.js`,
        `${ProjectPath.testCases}/inContact/UI/410301.js`,
        `${ProjectPath.testCases}/inContact/UI/415162.js`,
        `${ProjectPath.testCases}/inContact/UI/416387.js`,
        `${ProjectPath.testCases}/inContact/UI/416400.js`,
        `${ProjectPath.testCases}/inContact/UI/416401.js`,
        `${ProjectPath.testCases}/inContact/UI/416650.js`,
        `${ProjectPath.testCases}/inContact/UI/420370.js`,
        `${ProjectPath.testCases}/inContact/UI/423353.js`,
        `${ProjectPath.testCases}/inContact/UI/423369.js`,
        `${ProjectPath.testCases}/inContact/UI/426411.js`,
        `${ProjectPath.testCases}/inContact/UI/426866.js`,
        `${ProjectPath.testCases}/inContact/UI/426876.js`,
        `${ProjectPath.testCases}/inContact/UI/433739.js`,
        `${ProjectPath.testCases}/inContact/UI/437365.js`,
        `${ProjectPath.testCases}/inContact/UI/437369.js`,
        `${ProjectPath.testCases}/inContact/UI/437371.js`,
        `${ProjectPath.testCases}/inContact/UI/437373.js`,
        `${ProjectPath.testCases}/inContact/UI/437375.js`,
        `${ProjectPath.testCases}/inContact/UI/437379.js`,
        `${ProjectPath.testCases}/inContact/UI/437380.js`,
        `${ProjectPath.testCases}/inContact/UI/437382.js`,
        `${ProjectPath.testCases}/inContact/UI/437384.js`,
        `${ProjectPath.testCases}/inContact/UI/437386.js`,
        `${ProjectPath.testCases}/inContact/UI/437939.js`,
        `${ProjectPath.testCases}/inContact/UI/443012.js`,
        `${ProjectPath.testCases}/inContact/UI/443013.js`,
        `${ProjectPath.testCases}/inContact/UI/443657.js`,
        `${ProjectPath.testCases}/inContact/UI/455743.js`,
        `${ProjectPath.testCases}/inContact/UI/459263.js`,
        `${ProjectPath.testCases}/inContact/UI/459981.js`,
    ]
};