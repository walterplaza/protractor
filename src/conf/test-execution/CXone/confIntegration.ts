require('module-alias/register');
let jsLogger = require('js-logger');
import dbmySQL from '@apis/dbmySQL-api';
import ProjectPath from "@test-data/general/project-path";
import TestBase from "@testcases/test-base";
import { Utility } from '@utilities/general/utility';
import { LGMatchers } from '@utilities/matcher/LGMatchers';
import { ConfigReport } from "@utilities/report-email/config-report";
import { TestReporter } from '@utilities/report-email/custom-report';
import { Config } from 'protractor';
import XrayAPI from '@apis/xray-api';

TestBase.setUpTestRunInfo();

function test(){
    let configFile: string = `src/data-objects/XrayJira/xrayListSpec.json`;
    let dataJconfigFile = require(Utility.getPath(configFile))
    return dataJconfigFile;
}

export let config: Config = {

    onPrepare: async function () {
        beforeEach(async function () {
            await ConfigReport.reportSetupConfig();
            await ConfigReport.setTimeReportStart();
            await jasmine.getEnv().addReporter(TestReporter);
            await jasmine.addMatchers(LGMatchers);
        });

        afterEach(function () {
            ConfigReport.setTimeReportFinish();
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
        await ConfigReport.convertXMLtoPieChart('CxOne Sanity Test');
        await Utility.delay(5);
        await dbmySQL.addTestExecutionAssociations();
        await Utility.delay(5);
        await XrayAPI.importResultTestExecution();
    },

    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome',
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,
    specs: test()
};