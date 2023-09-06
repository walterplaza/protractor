import * as filePath from 'path';
import * as fileSystem from 'fs';
import * as fs from 'fs-extra';
import * as xmlDocument from 'xmldoc';
import { ConfigReport } from './config-report';

//stores information for every suite
var suitesData = [];

//stores data that is used for the whole report
var report = {
    name: '',
    browser: '',
    browserVersion: '',
    platform: '',
    time: new Date(),
    screenshotPath: '',
    modifiedSuiteName: false,
    screenshotsOnlyOnFailure: true
};

//stores statistics per one suite
var suite = {
    name: '',
    tests: 0,
    failed: 0,
    errors: 0,
    skipped: 0,
    passed: 0
};

//stores statistics for all suites
var allSuites = {
    tests: 0,
    failed: 0,
    errors: 0,
    skipped: 0,
    passed: 0,
    totalTime: 0,
    reportAs: 'TestCases'
};

//stores all suites summary (needed for pie charts)
var suitesSummary = {
    suites: 0,
    passed: 0,
    failed: 0
};

function getPath(filename, dir) {
    if (dir) {
        fs.ensureDirSync(dir);
        return filePath.join(dir, filename);
    } else {
        return filePath.join(__dirname, filename);
    }
}

function readFile(filename) {
    return fileSystem.readFileSync(filename, 'utf-8');
}

//time passed in seconds
function getTime(time) {
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor(time % 3600 / 60);
    var seconds = (time % 3600) % 60;

    return hours + 'h ' + minutes + 'min ' + seconds + 's';
}

export default class NewReportHTML {
    static generateSummaries = async function (reportXml, report) {

        var testStartedOn;
        var testCases;
        var totalCasesPerSuite;
        var xmlData = fileSystem.readFileSync(reportXml, 'utf8');
        var testResultXml = new xmlDocument.XmlDocument(xmlData);
        var testSuites = testResultXml.childrenNamed('testsuite');
        testStartedOn = testSuites[0].attr.timestamp;
        let totalSuites = testSuites.length;
        suitesSummary.suites = testSuites.length;

        for (var i = 0; i < totalSuites; i++) {
            //suite statistics
            suite.name = testSuites[i].attr.name;
            suite.tests = parseInt(testSuites[i].attr.tests);
            suite.failed = parseInt(testSuites[i].attr.failures);
            suite.errors = parseInt(testSuites[i].attr.errors);
            suite.skipped = parseInt(testSuites[i].attr.skipped);
            suite.passed = suite.tests - suite.failed - suite.errors - suite.skipped;

            if (suite.failed > suite.tests) {
                suite.failed = suite.tests;
                suite.passed = 0;
            }

            //test cases statistics
            var testCasesNames = [];
            var testCasesResults = [];
            var testCasesTimes = [];
            var testCasesMessages = [];
            var screenshotsNamesOnFailure = [];
            testCases = testSuites[i].childrenNamed('testcase');

            totalCasesPerSuite = testCases.length;

            for (let j = 0; j < totalCasesPerSuite; j++) {
                //get test cases results
                let testCaseId = (testCases[j].attr.name.split("-")[0].trim());
                if (testCases[j].childrenNamed('failure').length == 0) {
                    testCasesResults.push('Passed');
                    testCasesMessages.push('None');
                } else if (testCases[j].childrenNamed('failure').length > 0) {
                    let failureT = testCases[j].childrenNamed('failure');
                    let tempReportMess = ""
                    for (let n = 0; n < failureT.length; n++) {
                        tempReportMess += " " + failureT[n].attr.message
                    }
                    if (tempReportMess != "") {
                        tempReportMess = `${ConfigReport.getBugErrorMessage(testCaseId, tempReportMess)}. ${tempReportMess}`;
                    } else {
                        tempReportMess += ConfigReport.getBugErrorMessage(testCaseId, tempReportMess)
                    }
                    if (tempReportMess.indexOf("<iframe") > -1) {
                        testCasesMessages.push(tempReportMess.replace(/<iframe/g, '').replace("</iframe", '').replace("</iframe", '').replace("</iframe", ''))
                    } else {
                        testCasesMessages.push(tempReportMess);
                    }
                    if (tempReportMess.indexOf("Failed by") > -1) {
                        suite.skipped++;
                        testCasesResults.push('Failed with Known Bug');
                    } else {
                        testCasesResults.push('Failed');
                    }
                } else {
                    testCasesResults.push('Skipped');
                    testCasesMessages.push('None');
                }

                //get test cases times
                testCasesTimes.push(Math.ceil(testCases[j].attr.time));

                //get test cases names
                testCasesNames.push(testCases[j].attr.name);

                let arrTempId = testCases[j].attr.name.split(" ");
                let picName = arrTempId[0].trim() + '.png';

                //get test cases screenshots names (on failure only)
                if (testCasesResults[j] != 'Failed' && report.screenshotsOnlyOnFailure) {
                    screenshotsNamesOnFailure.push(picName);
                } else {
                    if (report.modifiedSuiteName) {
                        screenshotsNamesOnFailure.push(report.browser + '-' + suite.name.substring(suite.name.indexOf(".") + 1) + ' ' + testCasesNames[j] + '.png');
                        // screenshotsNamesOnFailure.push(report.browser +'-'+ testSuites[i].attr.name.substring(testSuites[i].attr.name.indexOf(".")+1) + ' ' + testCasesNames[j] + '.png');
                    } else {
                        screenshotsNamesOnFailure.push(picName);
                    }
                }
            }

            //store suite data
            suitesData.push({ 'keyword': 'TestSuite', 'name': suite.name, 'testcases': testCasesNames, 'testcasesresults': testCasesResults, 'testcasestimes': testCasesTimes, 'testcasesmessages': testCasesMessages, 'screenshotsNames': screenshotsNamesOnFailure, 'tests': suite.tests, 'failed': suite.failed, 'errors': suite.errors, 'skipped': suite.skipped, 'passed': suite.passed });

            //total statistics
            allSuites.tests += suite.tests;
            allSuites.failed += (suite.failed - suite.skipped);
            allSuites.errors += suite.errors;
            allSuites.passed += suite.passed;
            allSuites.skipped += suite.skipped;
            allSuites.totalTime += Math.ceil(parseFloat(testSuites[i].attr.time));

            //suites summary
            if (suite.failed > 0) {
                suitesSummary.failed += 1;
            } else {
                suitesSummary.passed += 1;
            }
        }
    }

    static from = function (reportXml, testConfig) {

        //set report data based on testConfig
        report.name = testConfig.reportTitle || 'Test Execution Report';
        report.screenshotPath = testConfig.screenshotPath || './screenshots';
        report.browser = testConfig.testBrowser || 'unknown';
        report.browserVersion = testConfig.browserVersion || 'unknownBrowser';
        report.modifiedSuiteName = testConfig.modifiedSuiteName || false;
        if (testConfig.screenshotsOnlyOnFailure == undefined) {
            report.screenshotsOnlyOnFailure = true;
        } else {
            report.screenshotsOnlyOnFailure = testConfig.screenshotsOnlyOnFailure;
        }

        //generate statistics
        var testDetails = this.generateSummaries(reportXml, report);

        let htmlContent = '<!DOCTYPE html><html><head><title>Protractor HTML Reporter</title><link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" ><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.8.1/css/lightbox.min.css" ><style type="text/css">.panel-heading { padding: 0; } .panel-heading a { padding: 10px 5px; display: block; position: relative; text-decoration: none; } .panel-heading i.glyphicon-chevron-down { display: none; } .panel-heading i.glyphicon-chevron-right { display: inline-block; } .panel-heading.open i.glyphicon-chevron-down { display: inline-block; } .panel-heading.open i.glyphicon-chevron-right { display: none; } .info { text-align: right; padding-bottom: 10px; } .panel-title b { padding-right: 10px; } .panel-heading .label-container { position: absolute; top: 8px; right: 8px; } .panel-heading .label-container label { margin-left: 5px; padding: 5px; } .navbar .label-container { position: absolute; right: 10px; top: 14px; } .navbar { margin-bottom: 10px; } .navbar .label { font-size: 20px; } .navbar .project-name { position: absolute; top: 10px; left: 50%; margin-left: -550px; text-align: center; font-size: 20px; font-weight: bold; } .chart { padding-bottom: 15px; } div.chart div div svg rect { fill: #f5f5f5; } table.arguments { margin-left: 30px; } .screenshot { padding: 2% 0 2% 0; } .scenarioTitle { width: 80% } .description { background-color: white; border-color: white; line-height: 1.6; color: #6f6f6f; font-weight: 400; font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif; font-size: 14px; padding: 0.1em 0.5em 1.2em 1.5em } #scenario-description { padding-bottom: 1em; padding-left: 0.2em; } .scrollBar { overflow-x: scroll; } table { border-collapse: collapse; } table, th, td { border: 1px solid black; } th, td { text-align: left; padding: 8px; } th { background-color: #f5f5f5; color: black; } .info { background-color: #fbfbfb; } .step-duration { float: right; } .footer-div { text-align: right; vertical-align: middle; height:3.5%; width:100%; } .footer-container { margin-right: 10px; margin-top: 5px; width:18%; z-index: 10; position: absolute; right: 0; bottom: 10px; text-align: center; background-color: transparent; } .footer-link { font-size: 13px; float: right; } .footer-link:hover { color: darkgray; }</style> <meta charset="UTF-8">';
        htmlContent += '</head> <body> <div class="navbar navbar-default navbar-static-top" role="navigation"> <div class="container"> <div class="navbar-header"><div class="project-name visible-md visible-lg" style="text-align: center">' + report.name + '</div>';
        htmlContent += '<div class="label-container"><span class="label label-success" title=' + allSuites.reportAs + '>Passed:' + allSuites.passed + '</span>';
        htmlContent += '<span class="label label-danger" title=' + allSuites.reportAs + '>Failed:' + allSuites.failed + '</span>';
        htmlContent += '<span class="label label-warning" title=' + allSuites.reportAs + '>Known Bug:' + allSuites.skipped + '</span>';
        htmlContent += '<span class="label label-info">Time Elapsed:' + getTime(allSuites.totalTime) + '</span>';
        htmlContent += '</div> </div> </div> </div> <div class="container">';
        htmlContent += '<!--<div class="generated-on"><b>Platform:</b>' + report.platform + '</div>-->';
        htmlContent += '<div class="info"><b>Browser:</b>' + report.browser + ' ' + report.browserVersion + '</div>';
        htmlContent += '<div class="info"><b>Generated on:</b>' + report.time.toLocaleString() + '</div>'
        htmlContent += '<div class="row"> <div class="chart col-lg-6 col-md-6" id="piechart_testsuites"></div> <div class="chart col-lg-6 col-md-6" id="piechart_testcases"></div> </div>';

        for (let i = 0; i < suitesData.length; i++) {
            htmlContent += '<div class="row"> <div class="col-lg-11 col-md-6"> <div class="panel panel-default"> <div class="panel-heading"> <h4 class="panel-title"> <a data-toggle="collapse" href="#collapseSuite' + i + '">';
            if (suitesData[i].skipped > 0) {
                htmlContent += '<span class="label label-warning"><i class="glyphicon glyphicon-remove"></i></span>';
            } else if (suitesData[i].failed > 0) {
                htmlContent += '<span class="label label-danger"><i class="glyphicon glyphicon-remove"></i></span>';
            } else {
                htmlContent += '<span class="label label-success"><i class="glyphicon glyphicon-ok"></i></span>';
            }

            if (suitesData[i].skipped > 0) {
                htmlContent += '<font color="orange"><b>' + suitesData[i].keyword + ':</b>' + suitesData[i].name + '</font>';
            } else if (suitesData[i].failed > 0) {
                htmlContent += '<font color="red"><b>' + suitesData[i].keyword + ':</b>' + suitesData[i].name + '</font>';
            } else {
                htmlContent += '<font color="green"><b>' + suitesData[i].keyword + ':</b>' + suitesData[i].name + '</font>';
            }

            htmlContent += '<span class="label-container">';
            if (suitesData[i].passed) {
                htmlContent += '<span class="label label-success">' + suitesData[i].passed + '</span>';
            } else if (suitesData[i].failed) {
                htmlContent += '<span class="label label-danger">' + suitesData[i].failed + '</span>';
            } else if (suitesData[i].skipped) {
                htmlContent += '<span class="label label-warning">' + suitesData[i].skipped + '</span>';
            } else if (suitesData[i].errors) {
                htmlContent += '<span class="label label-info">' + suitesData[i].errors + '</span>';
            }

            htmlContent += '</span> </a> </h4> </div>';
            htmlContent += '<div id="collapseSuite' + i + '" class="panel-collapse collapse"> <div class="panel-body">';

            for (let j = 0; j < suitesData[i].testcases.length; j++) {
                htmlContent += '<div class="panel panel-default"> <div class="panel-heading"> <h4 class="panel-title"> <a data-toggle="collapse" href="#collapseTestCase' + i + '_' + j + '">';
                if (suitesData[i].testcasesresults[j] == "Passed") {
                    htmlContent += '<span class="label label-success"><i class="glyphicon glyphicon-ok"></i></span>';
                    htmlContent += '<font color="green"><b>TestCase:</b>' + suitesData[i].testcases[j] + '</font>';
                    htmlContent += '<span class="label-container"><span class="label label-success" title="Passed">' + suitesData[i].testcasesresults[j] + '</span></span>'
                } else if (suitesData[i].testcasesresults[j] == "Skipped") {
                    htmlContent += '<span class="label label-warning"><i class="glyphicon glyphicon-minus"></i></span>';
                    htmlContent += '<font color="orange"><b>TestCase:</b>' + suitesData[i].testcases[j] + '</font>';
                    htmlContent += '<span class="label-container"><span class="label label-warning" title="Skipped">' + suitesData[i].testcasesresults[j] + '</span></span>';
                } else if (suitesData[i].testcasesresults[j] == "Failed with Known Bug") {
                    htmlContent += '<span class="label label-warning"><i class="glyphicon glyphicon-remove"></i></span>';
                    htmlContent += '<font color="red"><b>TestCase:</b>' + suitesData[i].testcases[j] + '</font>';
                    htmlContent += '<span class="label-container"><span class="label label-warning" title="Failed with Known Bug">' + suitesData[i].testcasesresults[j] + '</span></span>';
                } else if (suitesData[i].testcasesresults[j] == "Failed") {
                    htmlContent += '<span class="label label-danger"><i class="glyphicon glyphicon-remove"></i></span>';
                    htmlContent += '<font color="red"><b>TestCase:</b>' + suitesData[i].testcases[j] + '</font>';
                    htmlContent += '<span class="label-container"><span class="label label-danger" title="Failed">' + suitesData[i].testcasesresults[j] + '</span></span>';
                }
                htmlContent += '</a> </h4> </div>';
                htmlContent += '<div id="collapseTestCase' + i + '_' + j + '" class="panel-collapse collapse">';

                htmlContent += '<div class="panel-body"> <p class="scenario-container">';

                if (suitesData[i].testcasesresults[j] != "Skipped") {
                    htmlContent += '<span class="label label-primary" title="Success"><i class="glyphicon glyphicon-time"></i></span>';
                    htmlContent += '<font color="black">Time elapsed: ' + suitesData[i].testcasestimes[j] + 'seconds</font>';

                    if (suitesData[i].testcasesmessages[j] != "None") {
                        htmlContent += '<br /> <span class="label label-danger"><i class="glyphicon glyphicon-remove"></i></span>';
                        htmlContent += '<font color="red">' + suitesData[i].testcasesmessages[j] + '</font>';

                    }

                    if (!report.screenshotsOnlyOnFailure) {
                        htmlContent += '<br /> <span class="label label-primary"><i class="glyphicon glyphicon-camera"></i></span>';

                        if (suitesData[i].testcasesmessages[j] != "None" && suitesData[i].testcasesmessages[j].indexOf('API failed') == -1) {
                            htmlContent += 'Screenshot on failure:';
                        } else {
                            htmlContent += 'Screenshot:';
                        }
                        htmlContent += '<br /> <a class="screenshot"' + report.screenshotPath + '/' + suitesData[i].screenshotsNames[j] + '" data-lightbox="' + suitesData[i].screenshotsNames[j] + '">'
                        htmlContent += '<img src="' + report.screenshotPath + '/' + suitesData[i].screenshotsNames[j] + '" style="max-width:90%; height:auto" alt="Screenshot not found: ' + report.screenshotPath + '/' + suitesData[i].screenshotsNames[j] + '"/> </a>'

                    } else if (suitesData[i].testcasesmessages[j] != "None" && suitesData[i].testcasesmessages[j].indexOf('API failed') == -1) {
                        htmlContent += '<br /> <span class="label label-primary"><i class="glyphicon glyphicon-camera"></i></span> Screenshot on failure:';
                        htmlContent += '<br /> <a class="screenshot" href="' + report.screenshotPath + '/' + suitesData[i].screenshotsNames[j] + '" data-lightbox= "' + report.screenshotPath + '/' + suitesData[i].screenshotsNames[j] + '">';
                        htmlContent += '<img src="' + report.screenshotPath + '/' + suitesData[i].screenshotsNames[j] + '" style="max-width:90%; height:auto" alt="Screenshot not found:' + report.screenshotPath + '/' + suitesData[i].screenshotsNames[j] + '"/> </a>';
                    }
                }
                htmlContent += '</div> </div> </div>';
            }
            htmlContent += '</div> </div> </div> </div> </div>';
        }

        htmlContent += '</div><div class="navbar-fixed-bottom row-fluid footer-div "> <div class="navbar-inner"> <div class="footer-container"> <a target="_blank" href=""> <div class="text-muted footer-link"> </div> </a> </div> </div> </div>';
        htmlContent += '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script> <script src="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.8.1/js/lightbox.min.js"></script> <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script> <script type="text/javascript">'
        htmlContent += 'google.charts.load("current", {packages:["corechart"]}); google.charts.setOnLoadCallback(function() {drawChart({ "title": "TestSuites", "passed":' + suitesSummary.passed + ', "failed":' + suitesSummary.failed + ', }) });';
        htmlContent += 'google.charts.setOnLoadCallback(function() {drawChart({ "title": "TestCases", "passed":' + allSuites.passed + ', "skipped":' + allSuites.skipped + ', "errors":' + allSuites.errors + ', "failed":' + allSuites.failed + ' }) });'
        htmlContent += '</script> <script>function drawChart(chartData) { var data = google.visualization.arrayToDataTable([ ["Task", "Project Results"], ["Passed", chartData.passed], ["Known Bug", chartData.skipped], ["Errors", chartData.errors], ["Failed", chartData.failed] ]); var testsNumber = chartData.passed + chartData.failed + (chartData.skipped || 0) + (chartData.errors || 0); var title; if (testsNumber === 1) { title = testsNumber + " " + chartData.title.slice(0, -1); } else { title = testsNumber + " " + chartData.title; } var options = { width: "100%", height: 270, title: title, is3D: true, fontSize: "12", colors: ["#5cb85c", "#f0ad4e", "#5bc0de", "#d9534f"], pieStartAngle: 100, backgroundColor: "white", titleTextStyle: { fontSize: "13", color: "#5e5e5e" } }; var chart = new google.visualization.PieChart(document.getElementById("piechart_" + chartData.title.toLowerCase())); chart.draw(data, options); } </script> </body> </html>'
        let testOutputPath = getPath('/' + 'chrome-test-report.html', testConfig.outputPath);
        fileSystem.writeFileSync(testOutputPath, htmlContent);
    }
}