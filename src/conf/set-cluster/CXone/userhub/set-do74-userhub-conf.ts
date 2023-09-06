require('module-alias/register');
import { ClusterID, Environment } from '@data-objects/general/cluster';
import ProjectPath from '@test-data/general/project-path';
import { Config } from 'protractor';
import { GBU } from '@data-objects/general/cluster';

let jsLogger = require('js-logger');

export let config: Config = {

    params: {
        cluster: ClusterID.DO74,
        testEnv: Environment.USERHUB,
        gbu: GBU.USERHUB_DO74
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
        `${ProjectPath.testCases}/set-environment/set-cluster.js`,
        `${ProjectPath.testCases}/set-environment/set-gbu.js`
    ],
};