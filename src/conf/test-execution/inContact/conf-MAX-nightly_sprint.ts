require('module-alias/register');
let jsLogger = require('js-logger');
import { Config } from 'protractor';
import { ConfigReport } from "@utilities/report-email/config-report";
import { LGMatchers } from '@utilities/matcher/LGMatchers';
import ProjectPath from "@test-data/general/project-path";
import TestBase from "@testcases/test-base";
import { TestReporter } from '@utilities/report-email/custom-report';
import { Utility } from '@utilities/general/utility';
import XrayAPI from '@apis/xray-api';

ConfigReport.pushResultToXray = true;

TestBase.setUpTestRunInfo();

export let config: Config = {

    onPrepare: async function () {
        beforeEach(async function () {
            ConfigReport.reportSetupConfig();
            ConfigReport.setTimeReportStart();
            await jasmine.getEnv().addReporter(TestReporter);
            await jasmine.addMatchers(LGMatchers);
        });

        afterEach(async function () {
            ConfigReport.setTimeReportFinish();
            await Utility.delay(2);
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
        await ConfigReport.convertXMLtoPieChart('Report');
        await Utility.delay(5);
        let testExecutionKey = await XrayAPI.importResultTestExecution();
        console.log("testExecutionKey: " + testExecutionKey)
    },

    framework: 'jasmine2',
    capabilities: {
        browserName: 'chrome',
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: true,
    SELENIUM_PROMISE_MANAGER: false,
    specs: [
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Chat/IC-63024.js`, // Verify a Screen Pop form can be opened for Chat Contact
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Chat/IC-64395.js`, // Verify chat function
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Chat/IC-80910.js`, // Verify if it possible to add notes to dispositions 
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Chat/IC-89959.js`, // Verify that Insert button is sending the quick reply text to the customer 
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Chat/IC-98650.js`, // Generate chat with MAX window maximized
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Email/IC-98651.js`, // [MAX][Email] Verify if it is possible to make a Call when the Email is parked
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Email/IC-98676.js`, // [MAX][SCH][Email] Verify if it is not possible to make a Call when the Email is not parked
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Email/IC-101965.js`, // [MAX] [IB Mail] [Parked] Validate that Call button on address book is enabled after refesh
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Email/IC-102132.js`, // [MAX][SCH][Email] Email parking
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Email/IC-104266.js`, // [MAX][Email] TO field should maintain the mail filled after change of focus        
        // // `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Phone/IC-63482.js`, // [MAX][Phone][Page Action][Panel= On] Verify the "Page" can be opened for Ib Phone Contact
        // // `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Phone/IC-63484.js`, // [MAX][Phone][Page Action][Panel= Off] Verify the "Page" can be opened for Ib Phone Contact
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Phone/IC-77931.js`, // Verify that the panel (screenpop) does not disappears on MAX when an outbound call is placed (Transfer/Conf)
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Phone/IC-100927.js`, // [MAX] [OB Phone] [Hold] [OB Email] Validate that when hold a call agent is able to begin an OB Mail.
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Phone/IC-100945.js`, // [MAX] [IB Phone] [Hold] [OB Email] Validate that when hold a call agent is able to begin an OB Mail.         
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Phone/IC-103910.js`, // [MAX] [IB] [Phone] Validate that dispositions are not being shown when udpate from dispositions to Automatic Wrap up
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Phone/IC-104198.js`, // [MAX][Glance][Station ID]First option of radio buttons must be selected by default when launching MAX
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Phone/Contact Panels/IC-63489.js`, // [MAX ][Phone][Launch Button][Screen Pops][Panel=Off] Verify a Screen Pop form can be opened for Ib Phone Contact
        `${ProjectPath.testCases}/inContact/UI/MAX-Common/MAX-Phone/Contact Panels/IC-63493.js`, // [MAX ][Phone][Screen Pops][Panel=On] Verify a Screen Pop form can be opened for Ib Phone Contact                
        `${ProjectPath.testCases}/inContact/UI/MAX-General-Glance/address-book/IC-62688.js`, // [MAX][Search] Search for custom address book 
        `${ProjectPath.testCases}/inContact/UI/MAX-General-Glance/address-book/IC-76333.js`, // [MAX] [Address Book] [Call] Validate that when click on contact button a menu of contact methods available for this person it's being displayed. 
        `${ProjectPath.testCases}/inContact/UI/MAX-General-Glance/address-book/IC-88139.js`, // [MAX] [IC-71155] [Address Book] [OSH] [Phone] Validate that while on Call and click on transfer Email button is disabled inside address book
        `${ProjectPath.testCases}/inContact/UI/MAX-General-Glance/address-book/IC-100622.js`, // [MAX][Address Book][All Agents] Team is shown in Agents        
        `${ProjectPath.testCases}/inContact/UI/MAX-General-Glance/Commitment/IC-103116.js`, // [MAX][Schedule][ADA=ON] Verify that "next" and "back"  arrows are displayed on the calendar
        `${ProjectPath.testCases}/inContact/UI/MAX-General-Glance/launch-max/IC-64386.js`, // Launch MAX, refresh and set to Available and Log Out
        `${ProjectPath.testCases}/inContact/UI/MAX-General-Glance/launch-max/IC-97744.js`, // [MAX] [Station ID] Validate that using phone number related to Station ID the details of login are being shown on User history
        `${ProjectPath.testCases}/inContact/UI/MAX-General-Glance/launch-max/IC-97790.js`, // [MAX] [Station ID] Validate that on Station History the details of login with Phone number are being shown
        `${ProjectPath.testCases}/inContact/UI/MAX-General-Glance/IC-100710.js`, // [MAX][Agent Reports][Performance][OB Calls] Show details correctly
        `${ProjectPath.testCases}/inContact/UI/MAX-General-Glance/IC-100716.js`, // [MAX][Agent Reports][Performance][IB Calls] Show details correctly 
    ]
};