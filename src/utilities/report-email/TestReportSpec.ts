import { XrayJiraUtility, Utility } from "@utilities/general/utility";
import XrayAPI from "@apis/xray-api";
import TestBase from "@testcases/test-base";
import { ConfigReport } from "@utilities/report-email/config-report";
var fs = require('fs');

ConfigReport.pushResultToXray = true;
TestBase.setUpTestRunInfo();

describe(`asdasdas`, function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    it('', async function () {
        
        let ListCase = await XrayJiraUtility.getPathOfTestSpec();

		let configFile: string = `src/data-objects/XrayJira/xrayListSpec.json`;
		let jsonPath: string = Utility.getPath(configFile);
        let file = fs.createWriteStream(jsonPath);
        file.on('error', function (err) { /* error handling */ });
        file.write("[")
        for (let i = 0; i < ListCase.length; i++){
            if (i == ListCase.length - 1) {
                file.write(`"${ListCase[i].replace(/\\/g, "\\\\")}"`)
            } else {
                file.write(`"${ListCase[i].replace(/\\/g, "\\\\")}"` + ", ")
            }
        }
        file.write("]")
        file.end();
    })
});
