require('module-alias/register');

import { Browser } from '@data-objects/general/platform';
import { Config } from 'protractor';
import ProjectPath from '@test-data/general/project-path';

let jsLogger = require('js-logger');

export let config: Config = {
    params: {
        browser: Browser.CHROME
    },
    onPrepare: function () {
        jsLogger.useDefaults({
            defaultLevel: jsLogger.DEBUG,
            formatter: function (messages, context) {
                messages.unshift(new Date().toLocaleString())
            }
        });
    },
    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,
    specs: [
        `${ProjectPath.testCases}/set-environment/set-browser.js`
    ],
};