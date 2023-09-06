require('module-alias/register');
let jsLogger = require('js-logger');
import dbmySQL from '@apis/dbmySQL-api';
import XrayAPI from '@apis/xray-api';
import ProjectPath from "@test-data/general/project-path";
import TestBase from "@testcases/test-base";
import { HTMLBuilder } from '@utilities/new-report/html-builder';
import { LGReport } from '@utilities/new-report/lg-hook';
import { ConfigReport } from "@utilities/report-email/config-report";
import { Config } from 'protractor';

ConfigReport.pushResultToXray = false;
TestBase.setUpTestRunInfo();

export let config: Config = {

    onPrepare: async function () {
        await ConfigReport.setTimeReportStart();
        new LGReport().configHook();

        jsLogger.useDefaults({
            defaultLevel: jsLogger.INFO,
            formatter: function (messages, context) {
                messages.unshift(new Date().toLocaleString())
            }
        });
    },

    onComplete: async function () {
        await ConfigReport.setTimeReportFinish();
        await HTMLBuilder.buildTemplate();
        await dbmySQL.addTestExecutionAssociations();
        await XrayAPI.importResultTestExecution();
    },

    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome',
    },


    seleniumAddress: 'http://localhost:4444/wd/hub',

    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,
    specs: [

       // `${ProjectPath.testCases}/CXone/UI/max-userhub-brandembassy/IC-108849.js`,// need WFM and WFI features be enabled in Tenant management
       // `${ProjectPath.testCases}/CXone/UI/max-userhub-brandembassy/IC-107371.js`,
       // `${ProjectPath.testCases}/CXone/UI/max-userhub-brandembassy/IC-107740.js`,
       // `${ProjectPath.testCases}/CXone/UI/max-userhub-brandembassy/IC-107741.js`,
       // `${ProjectPath.testCases}/CXone/UI/max-userhub-brandembassy/IC-107742.js`,
        `${ProjectPath.testCases}/CXone/UI/max-userhub-brandembassy/MAX-882.js`

    ]
};