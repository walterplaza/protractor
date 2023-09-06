require('module-alias/register');
import { ClusterID, Environment } from '@data-objects/general/cluster';
import { Config } from 'protractor';
import ProjectPath from '@test-data/general/project-path';
import { GBU } from '@data-objects/general/cluster';

let jsLogger = require('js-logger');

export let config: Config = {

    params: {
        cluster: ClusterID.SO32,
        testEnv: Environment.USERHUB,
        gbu: GBU.USERHUB_BRANDEMBASSY_SO32
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