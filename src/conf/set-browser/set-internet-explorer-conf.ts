require('module-alias/register');

import { Browser } from '@data-objects/general/platform';
import ProjectPath from '@test-data/general/project-path';
import { Config } from 'protractor';

let jsLogger = require('js-logger');

export let config: Config = {
    params: {
        browser: Browser.IE
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