require('module-alias/register');

import ProjectPath from '@test-data/general/project-path';
import TestBase from '@testcases/test-base';
import { ConfigReport } from '@utilities/report-email/config-report';
import { TestReporter } from '@utilities/report-email/custom-report';
import { Config } from 'protractor';

export let config: Config = {

    onPrepare: async function () {
        TestBase.setUpTestRunInfo();

        beforeEach(async function () {
            ConfigReport.setTimeReportStart();
            jasmine.getEnv().addReporter(TestReporter);
        });
        afterEach(async function () {
            ConfigReport.setTimeReportFinish();
        });
    },

    onComplete: function () {
        ConfigReport.createHtmlEmailDailyReport();
    },

    specs: [
        `${ProjectPath.utilities}/report-email/email-daily-report-spec.js`,
    ],

    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome',
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,
};
