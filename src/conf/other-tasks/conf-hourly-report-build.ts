require('module-alias/register');

import { Config } from 'protractor';
import { ConfigReport } from "@utilities/report-email/config-report";
import ProjectPath from '@test-data/general/project-path';
import TestBase from '@testcases/test-base';

export let config: Config = {

    onPrepare: function() {      
        TestBase.setUpTestRunInfo();
    },

    specs: [
        `${ProjectPath.utilities}/report-email/email-daily-report-spec.js`
    ],

    onComplete: function () {
        ConfigReport.createHtmlLastedReport();
    },

    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome',
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,
};