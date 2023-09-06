require('module-alias/register');
import { Config } from 'protractor';
import { ClusterID, Environment } from '@data-objects/general/cluster';
import ProjectPath from '@test-data/general/project-path';

let jsLogger = require('js-logger');

export let config: Config = {
    params: {
        cluster: ClusterID.SO32,
        testEnv: Environment.CXONE,
        tenantName:"PERM AUTOMATIONSO32 E2E"
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
        `${ProjectPath.testCases}/set-environment/set-cluster.js`
    ],
};