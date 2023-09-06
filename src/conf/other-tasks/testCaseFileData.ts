require('module-alias/register');
var Jasmine = require('jasmine');
var jas = new Jasmine();

import ProjectPath from "@test-data/general/project-path";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

jas.loadConfig({
    spec_files: [
        `${ProjectPath.utilities}/report-email/TestReportSpec.js`
    ]
});
jas.execute();