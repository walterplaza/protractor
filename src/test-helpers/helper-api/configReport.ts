import ProjectPath from "@test-data/general/project-path";

var reporters = require('jasmine-reporters');
var junitReporter = new reporters.JUnitXmlReporter({
    framework: 'jasmine2',
    savePath: `${ProjectPath.conf}/test/reports`,
    filePrefix: "xmlresults",
    consolidateAll: true,

    // modifySuiteName: function (generatedSuiteName: any, suite: any) {
    //     return generatedSuiteName;
    // }
})

jasmine.getEnv().addReporter(junitReporter);
