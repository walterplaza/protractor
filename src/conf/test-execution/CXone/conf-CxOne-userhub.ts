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
        `${ProjectPath.testCases}/CXone/UI/userhub/IC-90196.js`,       
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-84147.js`,
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-64057.js`,
                       
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-63283.js`,
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-64193.js`,
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-63257.js`,
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-63265.js`,
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-63268.js`,
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-63271.js`,
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-63273.js`,  
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-63301.js`,
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-63305.js`,
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-63312.js`,
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-64058.js`,
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-64167.js`,
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-90232.js`,
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-63296.js`,
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-63280.js`,
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-63277.js`,
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-69253.js`, 
                `${ProjectPath.testCases}/CXone/UI/userhub/IC-63290.js`,        
                // `${ProjectPath.testCases}/CXone/UI/userhub/IC-90828.js` // This test case only is run on SC1    
            
                `${ProjectPath.testCases}/CXone/UI/max-userhub-brandembassy/IC-108849.js`,// need WFM and WFI features be enabled in Tenant management
                `${ProjectPath.testCases}/CXone/UI/max-userhub-brandembassy/IC-107371.js`,
                `${ProjectPath.testCases}/CXone/UI/max-userhub-brandembassy/IC-107740.js`,
                `${ProjectPath.testCases}/CXone/UI/max-userhub-brandembassy/IC-107741.js`,
                `${ProjectPath.testCases}/CXone/UI/max-userhub-brandembassy/IC-107742.js`,        
            
    ]
};


