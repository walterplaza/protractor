import * as fileSystem from 'fs';
import * as fs from 'fs-extra';
import * as filePath from 'path';
import * as xmlDocument from 'xmldoc';
import { ConfigReport } from './config-report';

// Variable:
let testCase = { id: '', name: '', result: '', duration: '' };
let allTestCaseList = [];
let allSuiteInfo = { no: 0, buildnumber: '', childSuite: 0, tests: 0, failed: 0, skipped: 0, passed: 0, startTime: '', totalTime: '' };
let listAllSuite = [];
let listPath = [];

function getDateTimeNow() {
  let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let date = new Date();
  let hour = date.getHours();
  let timeGTM = 'AM';
  if (hour > 12) {
    hour = hour - 12;
    timeGTM = 'PM';
  }
  let hourTemp = (hour < 10 ? "0" : "").toString() + hour.toString();
  var min = date.getMinutes();
  let minTemp = (min < 10 ? "0" : "") + min;
  let sec = date.getSeconds();
  let secTemp = (sec < 10 ? "0" : "").toString() + sec.toString();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let dayTemp = (day < 10 ? "0" : "").toString() + day.toString();
  return monthNames[month] + " " + dayTemp + " " + year + " - " + hourTemp + ":" + minTemp + ":" + secTemp + " " + timeGTM;
}

function getTime(time: number): string {
  let hoursN = Math.floor(time / 3600);
  let minutesN = Math.floor(time % 3600 / 60);
  let secondsN = Math.floor((time % 3600) % 60);
  return formatTime(hoursN) + ':' + formatTime(minutesN) + ':' + formatTime(secondsN);
}

function formatTime(time: number): string {
  if (time < 10) {
    let timeS = "0" + time.toString();
    return timeS;
  }
  return time.toString();
}

function getPath(filename, dir) {
  if (dir) {
    fs.ensureDirSync(dir);
    return filePath.join(dir, filename);
  } else {
    return filePath.join(__dirname, filename);
  }
}

export default class HTMLEmailReport {
  static generateReportLastedBuilds(suiteTest, clusterId, outPutResult) {
    let jenkinsJobsFolderPath = 'C:/Jenkins/jobs/';
    let jenkinsFolderBuildPath = jenkinsJobsFolderPath + suiteTest + ' - ' + clusterId + '/builds'
    let timeNow = new Date();
    let dateEnd = timeNow.getTime();
    let dateStart = (timeNow.setDate(timeNow.getDate() - 1));
    let options = {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true
    };

    try {
      // Code get all build from previous 24hours
      fileSystem.readdirSync(jenkinsFolderBuildPath).forEach(function (file) {
        let newPath = jenkinsFolderBuildPath + '/' + file;
        let fileState = fileSystem.statSync(newPath);
        let fileTime = fileState.birthtime.getTime();
        if (fileTime > dateStart && fileTime < dateEnd) {
          try {
            let temp = parseInt(file.toString());
            if (temp / 1) {
              listPath.push(temp);
            }
          } catch (e) { }
        }
      });
    } catch (e) {
    } finally {
      listPath = listPath.reverse();
    }

    for (let i = 0; i < listPath.length; i++) {
      allSuiteInfo = { no: 0, buildnumber: '', childSuite: 0, tests: 0, failed: 0, skipped: 0, passed: 0, startTime: '', totalTime: '' };
      allSuiteInfo.no = i + 1;
      allSuiteInfo.buildnumber = suiteTest + ' - ' + clusterId + ' - Build #' + listPath[i];
      try {
        if (fileSystem.existsSync(jenkinsFolderBuildPath + '/' + listPath[i] + '/changelog.xml')) {
          let fileLogState = fileSystem.statSync(jenkinsFolderBuildPath + '/' + listPath[i] + '/changelog.xml')
          let fileLogTime = fileLogState.mtime;
          allSuiteInfo.startTime = fileLogTime.toLocaleTimeString('en-us', options).replace(',', '').replace(',', ' -');

        } else {
          allSuiteInfo.startTime = '';
        }
      } catch (e) {
      }

      if (fileSystem.existsSync(jenkinsFolderBuildPath + '/' + listPath[i] + '/htmlreports/CxOneSanityTestReport/xmlresults.xml')) {
        let xmlData = fileSystem.readFileSync(jenkinsFolderBuildPath + '/' + listPath[i] + '/htmlreports/CxOneSanityTestReport/xmlresults.xml', 'utf8');
        let testResultXml = new xmlDocument.XmlDocument(xmlData);
        let testSuites = testResultXml.childrenNamed('testsuite');

        allSuiteInfo.totalTime = getTime(parseFloat(testResultXml.attr.time));
        // Add information from test suite:
        for (let i = 0; i < testSuites.length; i++) {
          let testCasesInSuite = testSuites[i].childrenNamed('testcase')
          for (let j = 0; j < testCasesInSuite.length; j++) {
            testCase.name = testCasesInSuite[j].attr.classname;
            if (testCasesInSuite[j].firstChild == null) {
              testCase.result = 'Passed';
              allSuiteInfo.passed += 1;
            } else if (testCasesInSuite[j].childrenNamed('failure').length > 0) {
              let failureT = testCasesInSuite[j].childrenNamed('failure');
              let tempReportMess = ""
              for (let n = 0; n < failureT.length; n++) {
                tempReportMess += failureT[n].attr.message
              }
              if (tempReportMess.indexOf("Failed by") > -1) {
                allSuiteInfo.skipped++;
                testCase.result = 'Failed by Bug';
              } else {
                allSuiteInfo.failed += 1;
                testCase.result = 'Failed';
              }
            }
          }
        }
      }
      listAllSuite.push(allSuiteInfo);
    }

    let htmlContent = '<!DOCTYPE html><html><head><title>Html email daily report</title><meta charset="UTF-8">';
    htmlContent += '<style>table, th, td {border: 1px solid black; text-align: center; font-family: Calibri; font-size:11pt; border-collapse: collapse}th{text-align: center; font-size:13pt; padding: 8px; font-weight:700; background-color:Gray}td {text-align: center; padding: 8px}</style></head>';
    htmlContent += '<body><center><table style="width:80%"><tr><th style="WIDTH:100px">No</th> <th style="WIDTH:400px; background-color:Olive">Build Number</th><th style="WIDTH:150px">Passed</th> <th style="WIDTH:150px">Failed</th><th style="WIDTH:300px">Start Time</th><th style="WIDTH:200px">Duration</th></tr>';

    for (let j = 0; j < listAllSuite.length; j++) {
      listAllSuite[j].childSuite;
      htmlContent += '<tr><td>' + listAllSuite[j].no + '</td>';
      htmlContent += '<td style="font-weight:700">' + listAllSuite[j].buildnumber + '</td>';
      htmlContent += '<td style="color:green">' + listAllSuite[j].passed + '</td>';
      htmlContent += '<td style="color:red">' + listAllSuite[j].failed + '</td>';
      htmlContent += '<td>' + listAllSuite[j].startTime + '</td>';
      htmlContent += '<td>' + listAllSuite[j].totalTime + '</td></tr>';
    }
    htmlContent += '</table></center><br><p style="position:relative; left:70%">Last updated on: '
    htmlContent += getDateTimeNow() + '</p></br></body></html>';
    let testOutputPath = getPath('/' + 'daily-lasted-report.html', outPutResult);
    fileSystem.writeFileSync(testOutputPath, htmlContent);
  }

  static generateReportHourly(reportXml, path, reportType) {
    // Read result report xml:
    let testResultXml = new xmlDocument.XmlDocument(fileSystem.readFileSync(reportXml, 'utf8'));
    let testSuites = testResultXml.childrenNamed('testsuite');

    // Add information from test suite:
    allSuiteInfo.childSuite = testSuites.length;
    allSuiteInfo.totalTime = getTime(parseFloat(testResultXml.attr.time));

    // Add information test case to list test case:
    for (let i = 0; i < testSuites.length; i++) {


      let testCasesInSuite = testSuites[i].childrenNamed('testcase')
      for (let j = 0; j < testCasesInSuite.length; j++) {
        testCase.name = testCasesInSuite[j].attr.name;
        let tempId = testCasesInSuite[j].attr.classname.trim();
        let arrTempId = tempId.split(" ");
        testCase.id = arrTempId[arrTempId.length - 1];
        let nameTemp = testCasesInSuite[j].attr.name
        testCase.name = nameTemp.substring(testCase.id.length + 3, nameTemp.length)
        testCase.duration = getTime(parseFloat(testCasesInSuite[j].attr.time));
        if (testCasesInSuite[j].firstChild == null) {
          testCase.result = 'Passed';
          allSuiteInfo.passed += 1;
        } else if (testCasesInSuite[j].childrenNamed('failure').length > 0) {
          testCase.result = 'Failed';
          let failureT = testCasesInSuite[j].childrenNamed('failure');
          let tempReportMess = ""
          for (let n = 0; n < failureT.length; n++) {
            tempReportMess += failureT[n].attr.message
          }
          tempReportMess += ConfigReport.getBugErrorMessage(testCase.id, tempReportMess)
          if (tempReportMess.indexOf("Failed by") > -1) {
            allSuiteInfo.skipped++;
            testCase.result = 'Failed with Known Bug';
          } else {
            allSuiteInfo.failed += 1;
            testCase.result = 'Failed';
          }
        }
        allTestCaseList.push(testCase);
        testCase = { id: '', name: '', result: '', duration: '' };
      }
    }

    let htmlContent = '<!DOCTYPE html><html><head><title>Report</title><meta charset="UTF-8"><style> table, th, td {border: 1px solid black; border-collapse: collapse; text-align: center; font-family: Calibri; font-size:11pt } th{padding: 7px; text-align: center; font-size:12pt; border: 1px solid white; font-weight:700; background-color:DarkGray} td {padding: 7px; text-align: center; border: 1px solid black} </style></head>';
    htmlContent += '<body><center><table style="width:50%;border: 2px solid white"><tr><th style="WIDTH:500mm; background-color:#548235">Suite</th><th style="WIDTH:200mm">Passed</th> <th style="WIDTH:200mm">Failed</th><th style="WIDTH:200mm">Known Bugs</th><th style="WIDTH:200mm">Skipped</th><th style="WIDTH:200mm">TOTAL</th></tr><tr><td style="WIDTH: 400; border: 1px solid white; background-color:#a9d08e">Regression Test Results</td>';
    htmlContent += '<td style="border: 1px solid white">' + allSuiteInfo.passed + '</td>';
    htmlContent += '<td style="border: 1px solid white">' + allSuiteInfo.failed + '</td>';
    htmlContent += '<td style="border: 1px solid white">' + allSuiteInfo.skipped + '</td>';
    htmlContent += '<td style="border: 1px solid white">0</td>';
    htmlContent += '<td style="border: 1px solid white">' + '<b>' + (allSuiteInfo.passed + allSuiteInfo.failed + allSuiteInfo.skipped) + '</b>' + '</td></tr></table></center><br></br>';
    htmlContent += '<center><table style="width:60%"><tr><th style="border: 1px solid black">#</th><th style="border: 1px solid black">Test Case ID</th><th style="border: 1px solid black">Test Case name</th><th style="border: 1px solid black">Result</th><th style="border: 1px solid black">Duration <br>(hh:mm:ss)</br></th></tr>';
    for (let i = 0; i < allTestCaseList.length; i++) {
      htmlContent += '<tr><td style="color:black;font-weight:700">' + (i + 1) + '</td>';
      htmlContent += '<td style="color:black;font-weight:700">' + allTestCaseList[i].id + '</td>';
      htmlContent += '<td style="color:black;font-weight:700;text-align: left">' + allTestCaseList[i].name + '</td>';
      if (allTestCaseList[i].result == 'Passed') {
        htmlContent += '<td style="color:green">Passed</td>';
        htmlContent += '<td>' + allTestCaseList[i].duration + '</td></tr>'
      } else if (allTestCaseList[i].result == 'Failed') {
        htmlContent += '<td style="color:red">Failed</td>';
        htmlContent += '<td>' + allTestCaseList[i].duration + '</td></tr>'
      } else if (allTestCaseList[i].result == 'Failed with Known Bug') {
        htmlContent += '<td style="color:red">Failed with Known Bug</td>';
        htmlContent += '<td>' + allTestCaseList[i].duration + '</td></tr>'
      } else if (allTestCaseList[i].result == 'Skipped') {
        htmlContent += '<td style="color:grey">Skipped</td>';
        htmlContent += '<td>' + allTestCaseList[i].duration + '</td></tr>'
      }
    }
    htmlContent += '<tr><td colspan="4" style="text-align: right;font-weight:700">Total Execution Time</td>';
    htmlContent += '<td>' + allSuiteInfo.totalTime + '</td></tr></table></center></body></html>'

    let testOutputPath = getPath('/' + 'chrome-email-report.html', path);
    fileSystem.writeFileSync(testOutputPath, htmlContent);
  }

  // suiteEvolve, TestRunInfo.cluster.id, './test/reports/emailHtml/resultEmailDaily'
  static generateReportDaily(suiteTest, clusterId, outPutResult) {
    let jenkinsJobsFolderPath = 'C:/Jenkins/jobs/';
    let jenkinsFolderBuildPath = jenkinsJobsFolderPath + suiteTest + ' - ' + clusterId + '/builds'

    try {
      fileSystem.readdirSync(jenkinsFolderBuildPath).forEach(function (file) {
        let newPath = jenkinsFolderBuildPath + '/' + file;
        let fileState = fileSystem.statSync(newPath);
        let date = new Date();
        date.setDate(date.getDate() - 1);
        if (fileState.birthtime.toLocaleDateString() == date.toLocaleDateString()) {
          try {
            let temp = parseInt(file.toString());
            if (temp / 1) {
              listPath.push(temp);
            }
          } catch (e) { }
        }
      });
    } catch (e) {
    } finally {
      listPath = listPath.sort();
    }

    for (let i = 0; i < listPath.length; i++) {
      allSuiteInfo = { no: 0, buildnumber: '', childSuite: 0, tests: 0, failed: 0, skipped: 0, passed: 0, startTime: '', totalTime: '' };
      allSuiteInfo.no = i + 1;
      allSuiteInfo.buildnumber = suiteTest + ' - ' + clusterId + ' - Build #' + listPath[i];
      try {
        if (fileSystem.existsSync(jenkinsFolderBuildPath + '/' + listPath[i] + '/changelog.xml')) {
          let fileLogState = fileSystem.statSync(jenkinsFolderBuildPath + '/' + listPath[i] + '/changelog.xml')
          let fileLogTime = fileLogState.mtime;

          let options = {
            year: "numeric", month: "short", day: "numeric",
            hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true
          };
          allSuiteInfo.startTime = fileLogTime.toLocaleTimeString('en-us', options).replace(',', '').replace(',', ' -');

        } else {
          allSuiteInfo.startTime = '';
        }
      } catch (e) {
      }

      if (fileSystem.existsSync(jenkinsFolderBuildPath + '/' + listPath[i] + '/htmlreports/CxOneSanityTestReport/xmlresults.xml')) {
        let xmlData = fileSystem.readFileSync(jenkinsFolderBuildPath + '/' + listPath[i] + '/htmlreports/CxOneSanityTestReport/xmlresults.xml', 'utf8');
        let testResultXml = new xmlDocument.XmlDocument(xmlData);
        let testSuites = testResultXml.childrenNamed('testsuite');

        // Add information from test suite:
        for (let i = 0; i < testSuites.length; i++) {
          let testCasesInSuite = testSuites[i].childrenNamed('testcase')
          for (let j = 0; j < testCasesInSuite.length; j++) {
            testCase.name = testCasesInSuite[j].attr.classname;
            testCase.duration = getTime(parseFloat(testCasesInSuite[j].attr.time));
            if (testCasesInSuite[j].firstChild == null) {
              testCase.result = 'Passed';
              allSuiteInfo.passed += 1;
            } else if (testCasesInSuite[j].childrenNamed('failure').length > 0) {
              testCase.result = 'Failed';
              allSuiteInfo.failed += 1;
            } else if (testCasesInSuite[j].childrenNamed('skipped').length > 0) {
              testCase.result = 'Skipped';
              allSuiteInfo.skipped += 1;
            }
          }
        }
      }
      listAllSuite.push(allSuiteInfo);
    }

    let htmlContent = '<!DOCTYPE html><html><head><title>Html email daily report</title><meta charset="UTF-8">';
    htmlContent += '<style>table, th, td {border: 1px solid black; text-align: center; font-family: Calibri; font-size:11pt; border-collapse: collapse}th{text-align: center; font-size:13pt; padding: 8px; font-weight:700; background-color:Gray}td {text-align: center; padding: 8px}</style></head>';
    htmlContent += '<body><center><table style="width:80%"><tr><th style="WIDTH:100px">No</th> <th style="WIDTH:400px; background-color:Olive">Build Number</th><th style="WIDTH:150px">Passed</th> <th style="WIDTH:150px">Failed</th><th style="WIDTH:300px">Start Time</th><th style="WIDTH:200px">Duration</th></tr>';

    for (let j = 0; j < listAllSuite.length; j++) {
      listAllSuite[j].childSuite;

      htmlContent += '<tr><td>' + listAllSuite[j].no + '</td>';
      htmlContent += '<td style="font-weight:700">' + listAllSuite[j].buildnumber + '</td>';
      htmlContent += '<td style="color:green">' + listAllSuite[j].passed + '</td>';
      htmlContent += '<td style="color:red">' + listAllSuite[j].failed + '</td>';
      htmlContent += '<td>' + listAllSuite[j].startTime + '</td>';
      htmlContent += '<td>' + listAllSuite[j].totalTime + '</td></tr>';

    }
    htmlContent += '</table></center><br></br></body></html>';
    let testOutputPath = getPath('/' + 'daily-email-report.html', outPutResult);
    fileSystem.writeFileSync(testOutputPath, htmlContent);
  }
}