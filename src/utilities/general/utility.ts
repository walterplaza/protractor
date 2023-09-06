import XrayAPI from '@apis/xray-api';
import { Environment, GBU, InContactClusterID, PageName } from '@data-objects/general/cluster';
import { ConfigInfo } from '@data-objects/general/config';
import { Browser } from '@data-objects/general/platform';
import { InboundEmail } from '@data-objects/general/skill-core';
import TestRunInfo from "@data-objects/general/test-run-info";
import { TimeZone } from '@data-objects/general/time-zone';
import { ConditionsOperator } from "@data-objects/inContact/central/admin/workforce-intelligence/rules/workforce-rule-info";
import { JenkinsBuildExecution } from '@data-objects/XrayJira/jenkinsBuildExecution';
import { XrayJiraTestInfo } from '@data-objects/XrayJira/xrayJiraTestInfo';
import { XrayJiraTestPlan } from '@data-objects/XrayJira/XrayJiraTestPlan';
import ProjectPath from '@test-data/general/project-path';
import { FunctionType, Logger } from "@utilities/general/logger";
import StopWatch from "@utilities/general/stop-watch";
import BrowserWrapper from '@utilities/protractor-wrappers/browser-wrapper';
import { errorwrapper } from '@utilities/protractor-wrappers/error-wrapper';
import { ConfigReport } from '@utilities/report-email/config-report';
import * as fileSystem from 'fs';
import * as fs from 'fs-extra';
import { google } from 'googleapis';
import Imap from 'imap';
import { Base64 } from 'js-base64';
import { JsonConvert, ValueCheckingMode } from 'json2typescript';
import moment from "moment";
import * as filePath from 'path';
import readline from 'readline';
import uuidv4 from 'uuid/v4';
import { APICore, APIResponse, Method, Options } from './api-core';
import { LGReportTestCaseTempResult } from '@utilities/new-report/lg-reporter';
import { XrayTestCaseInfo } from '@data-objects/XrayJira/XrayTestCaseInfo';

let path = require('path');

export class Utility {

	/**
	 * Send IBEmail
	 * @static
	 * @param {string[]} restArgs strings to sort. For example, you can input string1, string 2, string 3 as params
	 * @returns {string} a string contains sorted inputs separated by comma ","
	 * @memberof Utility
	 */
	public static async sendIBEmail(serverMail: string, inboundEmail: InboundEmail): Promise<any> {
		return new Promise(async function (resolve, reject) {
			var nodemailer = require('nodemailer');

			let transporter = nodemailer.createTransport({
				host: serverMail,
				port: 9100,
			})

			let mailOptions: Object = {
				from: inboundEmail.from,
				to: inboundEmail.to,
				subject: inboundEmail.subject,
				text: inboundEmail.text
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					reject(new errorwrapper.CustomError(Utility.sendIBEmail, `API failed: Can't send email from server with + ${error}`));
				} else {
					resolve();
				}
			});
		});
	}

	/**
	 * Sort unordered strings
	 * @static
	 * @param {string[]} restArgs strings to sort. For example, you can input string1, string 2, string 3 as params
	 * @returns {string} a string contains sorted inputs separated by comma ","
	 * @memberof Utility
	 */
	public static sortStrings(...restArgs: string[]): string {
		try {
			return restArgs.sort().toString().replace(",", ", ");
		} catch (err) {
			throw new errorwrapper.CustomError(this.sortStrings, err.message);
		}
	}

	/**
	 * Split strings
	 * @static
	 * @param {string} text
	 * @param {string} separator
	 * @returns { Array<string>} Array string after split
	 * @memberof Utility
	 */
	public static splitString(text: string, separator: string): Array<string> {
		try {
			let splitter: Array<string> = text.split(separator);
			return splitter.map(str => str.trim());
		} catch (err) {
			throw new errorwrapper.CustomError(this.splitString, err.message);
		}
	}

	/**
	 * get Name of machine system
	 * @returns Name of machine system
	 * @memberof Utility
	 */
	public static getCurrentUser(): string {
		try {
			var path = require('path');
			var userName = process.env['USERPROFILE'].split(path.sep)[2];
			return userName;

		} catch (err) {
			throw new errorwrapper.CustomError(this.getCurrentUser, err.message);
		}
	}

	/**
	 * Generate a string that contains random numbers
	 * @static
	 * @param {number} length length of the generated number
	 * @param {number} [min=-1] min value of the generated number. Ignore this param by entering -1
	 * @param {number} [max=-1] max value of the generated number. Ignore this param by entering -1
	 * @returns {number} a random number
	 * @memberof Utility
	 */
	public static getRandomNumber(length: number, min: number = -1, max: number = -1): number {
		try {
			let randomNumber: number;
			if (min == -1 && max == -1) {
				let firstNumber = Math.floor((Math.random() * 9) + 1);
				let result = "";

				for (let i = 1; i < length; i++) {
					result += Math.floor(Math.random() * 10).toString();
				}
				randomNumber = parseInt(firstNumber + result);
			}
			else {
				randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
			}
			return randomNumber;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getRandomNumber, err.message);
		}
	}

	/**
	 * Generate a string that contains random numbers and alphabet characters
	 * @static
	 * @param {number} length length of the string, must be longer than prefix
	 * @param {string} [prefix=""] text which will be put in front of the random string
	 * @returns {string} a random string with fixed length including prefix
	 * @memberof Utility
	 */
	public static createRandomString(length: number, prefix: string = ""): string {
		try {
			if (length < 1 || isNaN(length)) {
				throw 'Invalid input. Should be a number greater than 0';
			}
			let uuid = uuidv4().replace(/-/g, '');
			let uuidLength = uuid.length;
			let prefixLength = prefix.length;

			if (length > uuidLength) {
				let repetition = Math.ceil(length / uuidLength);
				uuid = uuid.repeat(repetition);
			}

			let randomString: string = prefix + uuid.substring(0, length - prefixLength);
			return randomString;
		} catch (err) {
			throw new errorwrapper.CustomError(this.createRandomString, err.message);
		}
	}

	/**
	 * Create config file to setup environment
	 * @static
	 * @param {string} filePath
	 * @memberof Utility
	 */
	public static createConfigJSONFile(filePath: string): void {
		try {
			let isFileExist: boolean = fs.existsSync(filePath);

			if (isFileExist == false) {
				let fileData: string = `{"clusterId":"","environment":"","tenantName":"","browser":"","elementTimeout":60,"pageTimeout":60,"testTimeout":180000}`;
				fs.writeFileSync(filePath, fileData);
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.createConfigJSONFile, err.message);
		}
	}

	/**
	 * Get the current file directory
	 * @static
	 * @param {string} filename
	 * @memberof Utility
	 */
	public static getPath(filename?: string): string {
		try {
			let splitString: number = "built\\utilities\\general".length;
			let projectPath: string = __dirname.slice(0, __dirname.length - splitString);

			if (filename == null) {
				return projectPath;
			} else {
				return filePath.join(projectPath, filename);
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.getPath, err.message);
		}
	}

	/**
	 * Set test environment
	 * @static
	 * @param {string} type type of value want to edit
	 * @param {string} value value want to input
	 * @memberof Utility
	 */
	public static setTestEnvironment(type: string, value: string, filePath: string = "src/test-data/config-info.json"): void {
		try {
			let configFile: string = filePath;
			let jsonPath: string = this.getPath(configFile);
			Utility.createConfigJSONFile(jsonPath);
			let jsonString: string = fs.readFileSync(jsonPath, 'utf8');
			let configData: ConfigInfo = JsonUtility.deserialize(JSON.parse(jsonString), ConfigInfo);
			if (type.match("cluster")) {
				configData.clusterId = value;
			}

			if (type.match("browser")) {
				configData.browser = value;
			}

			if (type.match("environment")) {
				configData.environment = value;
			}

			if (type.match("tenantName")) {
				configData.tenantName = value;
			}

			if (type.match("gbu")) {
				configData.gbu = value;
			}

			fs.writeFileSync(jsonPath, JSON.stringify(configData));
		} catch (err) {
			throw new errorwrapper.CustomError(this.setTestEnvironment, err.message);
		}
	}

	/**
	 * Set cluster
	 * @static
	 * @param {InContactClusterID} cluster
	 * @memberof Utility
	 */
	public static setGBU(gbu: GBU): void {
		try {
			this.setTestEnvironment("gbu", gbu);
		} catch (err) {
			throw new errorwrapper.CustomError(this.setGBU, err.message);
		}
	}

	/**
	 * Set cluster
	 * @static
	 * @param {InContactClusterID} cluster
	 * @memberof Utility
	 */
	public static setCluster(cluster: InContactClusterID): void {
		try {
			this.setTestEnvironment("cluster", cluster);
		} catch (err) {
			throw new errorwrapper.CustomError(this.setCluster, err.message);
		}
	}

	/**
	 * Set browser
	 * @static
	 * @param {Browser} browser
	 * @memberof Utility
	 */
	public static setBrowser(browser: Browser): void {
		try {
			this.setTestEnvironment("browser", browser);
		} catch (err) {
			throw new errorwrapper.CustomError(this.setBrowser, err.message);
		}
	}

	/**
	 * Set Environment
	 * @static
	 * @param {Environment} environment
	 * @memberof Utility
	 */
	public static setEnvironment(environment: Environment): void {
		try {
			this.setTestEnvironment("environment", environment);
		} catch (err) {
			throw new errorwrapper.CustomError(this.setEnvironment, err.message);
		}
	}

	/**
	 * Set tenant
	 * @static
	 * @param {Environment} tenantName
	 * @memberof Utility
	 */
	public static setTenant(tenantName: string = ""): void {
		try {
			this.setTestEnvironment("tenantName", tenantName);
		} catch (err) {
			throw new errorwrapper.CustomError(this.setTenant, err.message);
		}
	}

	/**
	 * Add a mount of time to a current date
	 * @static
	 * @param {number} day number of added day
	 * @param {number} month number of added day
	 * @param {number} year number of added day
	 * @param {string} dayFormat day type ("numeric", "2-digit")
	 * @param {string} monthFormat month type ("numeric", "2-digit", "narrow", "short", "long")
	 * @param {string} yearFormat year type ("numeric", "2-digit")
	 * @returns
	 * @memberof Utility
	 */
	public static addDateToCurrentDate(day: number = 0, month: number = 0, year: number = 0, dayFormat: string = "", monthFormat: string = "", yearFormat: string = ""): any {
		try {
			let tmpdate: Date = new Date(Date.now());
			if (day != null) {
				var date: Date = new Date(tmpdate.setDate(tmpdate.getDate() + day));
			}
			if (month != null) {
				var date: Date = new Date(tmpdate.setMonth(tmpdate.getMonth() + month));
			}
			if (year != null) {
				var date: Date = new Date(tmpdate.setFullYear(tmpdate.getFullYear() + year));
			}

			if (dayFormat == "") {
				dayFormat = "numeric";
			}

			if (monthFormat == "") {
				monthFormat = "2-digit";
			}

			if (yearFormat == "") {
				yearFormat = "numeric";
			}

			var options = { year: `${yearFormat}`, month: `${monthFormat}`, day: `${dayFormat}` };
			return date.toLocaleString('en-US', options);

		} catch (err) {
			throw new errorwrapper.CustomError(this.addDateToCurrentDate, err.message);
		}

	}

	/**
	 * Convert Date time format
	 * @static
	 * @param {string} dateTime
	 * @param {string} oldFormat
	 * @param {string} newFormat
	 * @returns {string} Date time with new format
	 * @memberof Utility
	 */
	public static getNowDate(delimeters: string, addDate: number): string {
		try {
			//return string
			let returnDate = "";
			//get datetime now
			let today = new Date();
			//add day to date
			today.setDate(today.getDate() + addDate);
			//split
			let dd = today.getDate();
			let mm = today.getMonth() + 1; //because January is 0
			let yyyy = today.getFullYear();
			//Interpolation date
			if (mm < 10) {
				returnDate += `0${mm}${delimeters}`;
			} else {
				returnDate += `${mm}${delimeters}`;
			}
			if (dd < 10) {
				returnDate += `0${dd}${delimeters}`;
			} else {
				returnDate += `${dd}${delimeters}`;
			}
			return returnDate += yyyy;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getNowDate, err.message);
		}
	}

	/**
	 * Convert Date time format
	 * @static
	 * @param {string} dateTime
	 * @param {string} oldFormat
	 * @param {string} newFormat
	 * @returns {string} Date time with new format
	 * @memberof Utility
	 */
	public static formatDateTime(dateTime: string, oldFormat: string, newFormat: string): string {
		try {
			let dateStr: string = moment(dateTime, oldFormat).format(newFormat);
			return dateStr;
		} catch (err) {
			throw new errorwrapper.CustomError(this.formatDateTime, err.message);
		}
	}

	/**
	 * Convert Date time to Timestamp
	 * @static
	 * @param {string} [dateTime] Date time want to convert
	 * @param {string} [format] Format of date time is inputted
	 * @returns {number} Timestamp
	 * @memberof Utility
	 */
	public static convertDateToTimestamp(dateTime: string, format: string): number {
		try {
			let dateString = this.formatDateTime(dateTime, format, "YYYY-MMM-DD hh:mm:ss");
			let date: Date = new Date(dateString);
			let timestamp: number = date.getTime() / 1000;

			return timestamp;
		} catch (err) {
			throw new errorwrapper.CustomError(this.convertDateToTimestamp, err.message);
		}
	}

	/**
     * Verifying data is downloaded
     * @param {fileName} text report name
     * @returns boolean
     * @memberof Utility
     */
	public static async isFileDownloaded(fileName: string): Promise<boolean> {
		try {
			await Logger.write(FunctionType.UI, "Verifying " + fileName + " is downloaded");
			let currentUserName: string = await Utility.getCurrentUser();
			let filePath: string = "C:\\Users\\" + currentUserName + "\\Downloads\\" + fileName;
			let fileExist: boolean = await fileSystem.existsSync(filePath);
			// Wait until downloading complete
			let stopTime: number = 0;
			let stopWatch = new StopWatch();
			stopWatch.startClock();
			while (fileExist == false && stopTime <= 20) {
				stopTime = stopWatch.getElapsedTimeInSecond();
				fileExist = await fileSystem.existsSync(filePath);
			}
			return fileExist;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isFileDownloaded, err.message);
		}
	}

    /**
     * Cleaning up downloaded data
     * @param {fileName} text report name
     * @memberof Utility
     */
	public static async cleanUpDownloadFile(fileName: string): Promise<void> {
		try {
			let currentUserName: string = await Utility.getCurrentUser();
			let filePath: string = await "C:\\Users\\" + currentUserName + "\\Downloads\\" + fileName;
			await Logger.write(FunctionType.UI, "Deleting " + filePath);
			if (await fileSystem.existsSync(filePath)) {
				await fileSystem.unlinkSync(filePath);
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.cleanUpDownloadFile, err.message);
		}
	}

	/**
	* Cleaning up downloaded data with extension
	* @param {fileName} text file extension
	* @memberof Utility
	*/
	public static async cleanUpDownloadFileWithExtension(fileType: string): Promise<void> {
		try {
			let listfile: Array<string> = await this.getListOfFilesInFolder();
			for (let i = 0; i < listfile.length; i++) {
				let fileName: string = listfile[i];
				if (fileName.endsWith(fileType)) {
					let filePath: string = "C:\\Users\\" + Utility.getCurrentUser() + "\\Downloads\\" + fileName;
					await Logger.write(FunctionType.UI, "Deleting " + filePath);
					if (await fileSystem.existsSync(filePath)) {
						await fileSystem.unlinkSync(filePath);
					}
				}
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.cleanUpDownloadFileWithExtension, err.message);
		}
	}

	/**
	* Wait until new file is download
	* @param {fileType} text file extension
	* @memberof Utility
	*/
	public static async waitForFileDownloaded(fileType: string): Promise<void> {
		try {
			let listfile: Array<string> = await this.getListOfFilesInFolder();
			let counter: number = 1
			while (listfile.toString().indexOf(fileType) < 0 && counter < 5) {
				await BrowserWrapper.sleepInSecond(2);
				counter++;
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.cleanUpDownloadFileWithExtension, err.message);
		}
	}

	/**
	* Get all files in Downloads folder
	* @param {fileType} text file extension
	* @memberof Utility
	*/
	public static async getListOfFilesInFolder(): Promise<Array<string>> {
		try {
			let currentUserName: string = Utility.getCurrentUser();
			let fPath: string = "C:\\Users\\" + currentUserName + "\\Downloads\\";
			let listfile: Array<string> = fileSystem.readdirSync(fPath);
			return listfile;
		}
		catch (err) {
			throw new errorwrapper.CustomError(this.cleanUpDownloadFileWithExtension, err.message);
		}
	}



	/**
	 * Getting system time zone
	 * @author Y.Le
	 * @static
	 * @returns {TimeZone} return TimeZone
	 * @memberof Utility
	 */
	public static getSystemTimeZone(isDayLightSaving?: boolean): TimeZone {
		try {
			let currentDate = new Date();
			let timeZone;
			let offSet: number = currentDate.getTimezoneOffset(); // Ex: offset = -420 if timezone GMT-07:00
			let timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone; // Ex: Asia/Bangkok
			let timeStandard = currentDate.toUTCString().slice(currentDate.toUTCString().length - 3, currentDate.toUTCString().length); // Return time standard
			let round = Math.abs(offSet);

			if (isDayLightSaving) {

				// Check whether daylight saving or not
				let date = new Date();
				let jan = new Date(date.getFullYear(), 0, 1);
				let jul = new Date(date.getFullYear(), 6, 1);
				let dayLightSaving: number = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());

				if (offSet < dayLightSaving) {
					// If in daylight saving then timezone +1
					timeZone = (offSet < 0 ? "+" : "-") + ("00" + (Math.floor(round / 60) + 1)).slice(-2) + ":" + ("00" + (round % 60)).slice(-2); // Ex: Return to -07:00
					return new TimeZone().init(timeStandard, timeZone, timeZoneName);
				}
			}
			timeZone = (offSet < 0 ? "+" : "-") + ("00" + Math.floor(round / 60)).slice(-2) + ":" + ("00" + (round % 60)).slice(-2); // Ex: Return to -07:00
			return new TimeZone().init(timeStandard, timeZone, timeZoneName);
		} catch (err) {
			throw new errorwrapper.CustomError(this.getSystemTimeZone, err.message);
		}
	}

	public static getSystemTimeZoneNumber(): string {
		try {
			let toDay = new Date();
			let offset: number = -toDay.getTimezoneOffset();
			toDay.setHours(toDay.getHours() - offset / 60)


			let tzo: number = -toDay.getTimezoneOffset(),
				dif = tzo >= 0 ? '+' : '-',

				pad = function (num) {
					var norm = Math.floor(Math.abs(num));
					return (norm < 10 ? '0' : '') + norm;
				};

			let time: string = toDay.getFullYear() +
				'-' + pad(toDay.getMonth() + 1) +
				'-' + pad(toDay.getDate()) +
				'T' + pad(toDay.getHours()) +
				':' + pad(toDay.getMinutes()) +
				':' + pad(toDay.getSeconds()) +
				dif + pad(tzo / 60) +
				':' + pad(tzo % 60);

			return time.substring(time.lastIndexOf("+") > 0 ? time.lastIndexOf("+") : time.lastIndexOf("-"))
		} catch (err) {
			throw new errorwrapper.CustomError(this.getSystemTimeZoneNumber, err.message);
		}
	}




	/**
	 * Getting color name
	 * @author Nhat.Nguyen
	 * @static rgbaCode
	 * @returns {string} color Name
	 * @memberof Utility
	 */
	public static getColorNameByCode(rgbaCode: string): string {
		try {
			rgbaCode = rgbaCode.replace(/rgba\(|\)| /gi, "");
			let rgbaArray: Array<string> = rgbaCode.split(",");
			let red: number = parseInt(rgbaArray[0]);
			let green: number = parseInt(rgbaArray[1]);
			let blue: number = parseInt(rgbaArray[2]);

			red = red / 255;
			green = green / 255;
			blue = blue / 255;

			let max: number = Math.max(red, green, blue);
			let min: number = Math.min(red, green, blue);

			let hue: number;
			let saturation: number;
			let bright: number = max;
			let d: number = max - min;
			if (max == 0) {
				saturation = 0;
			}
			else {
				saturation = d / max;
			}

			if (max == min) {
				hue = 0;
			} else {
				switch (max) {
					case red:
						hue = (green - blue) / d + (green < blue ? 6 : 0);
						break;
					case green:
						hue = (blue - red) / d + 2;
						break;
					case blue:
						hue = (red - green) / d + 4;
						break;
				}
				hue /= 6;
			}
			let color: string = "false";
			if (saturation[1] < 0.1 && bright[2] > 0.9) {
				color = 'nearlyWhite';
			} else if (bright[2] < 0.1) {
				color = 'nearlyBlack';
			} else {
				let deg: number = hue[0] * 360;
				if (deg >= 0 && deg < 30) {
					color = 'red';
				} else if (deg >= 30 && deg < 90) {
					color = 'yellow';
				} else if (deg >= 90 && deg < 150) {
					color = 'green';
				} else if (deg >= 150 && deg < 210) {
					color = 'cyan';
				} else if (deg >= 210 && deg < 270) {
					color = 'blue';
				} else if (deg >= 270 && deg < 330) {
					color = 'magenta';
				} else {
					color = 'red';
				}
			}
			return color;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getColorNameByCode, err.message);
		}
	}

	/**
	* Compare strings	 
	* @param {string} str1, str2 
	* @returns {boolean} return true if two strings are the same
	* @memberof Utility
	*/
	public static compareStrings(str1: string, str2: string): boolean {
		try {
			if (str1 == str2) {
				return true;
			}
			return false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.compareStrings, err.message);
		}
	}

	/**
	 * Convert color code of rgba or rgb  to hex code. (Format: rbg(255,255,255) ---> #ffffff)
	 * @author Huy.Nguyen
	 * @param {string} colorCode
	 * @returns {string}
	 * @memberof Utility
	 */
	public static convertRgbToHex(colorCode: string): string {
		try {
			let hexCode: string = "#";
			let colorType: string = colorCode.match(/\w*/i)[0];
			colorCode = colorCode.replace(/\w*\(|\)| /gi, "");
			let arrayCode: Array<string> = colorCode.split(",");
			for (let i = 0; i < arrayCode.length; i++) {
				let unitHex: string = ("0" + parseInt(arrayCode[i]).toString(16)).slice(-2);
				hexCode += (colorType == "rgba" && i != arrayCode.length - 1) ? unitHex : "";
				hexCode += (colorType == "rgb") ? unitHex : "";
			}
			return hexCode;
		} catch (err) {
			throw new errorwrapper.CustomError(this.convertRgbToHex, err.message);
		}
	}

	/**
	 * Compare two values
	 * @param {value1} number value 1 number
	 * @param {operation} index compare operation
	 * @param {value2} value value 2 number
	  * @returns {boolean} return true or false
	 * @memberof Utility
	 */
	public static compareTwoValues(value1: number, operation: ConditionsOperator, value2: number): boolean {
		try {
			switch (operation) {
				case ConditionsOperator.EQUAL:
					if (value1 == value2) {
						return true;
					}
					break;
				case ConditionsOperator.BIGGER:
					if (value1 > value2) {
						return true;
					}
					break;
				case ConditionsOperator.EQUAL_BIGGER:
					if (value1 >= value2) {
						return true;
					}
					break;
				case ConditionsOperator.SMALLER:
					if (value1 < value2) {
						return true;
					}
					break;
				case ConditionsOperator.EQUAL_SMALLER:
					if (value1 <= value2) {
						return true;
					}
					break;
			}
			return false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.compareTwoValues, err.message);
		}
	}

	/**
	 * Compare two value with tolerance
	 * @param {value1} number value 1 number
	 * @param {operation} index compare operation
	 * @param {value2} value value 2 number
	 * @param {tolerance} Number tolerance after operator
	 * @returns {boolean} return true or false
	 * @memberof Utility
	 */
	public static compareTwoValuesTolerance(value1: number, operation: ConditionsOperator, value2: number, tolerance: number = 0): boolean {
		try {
			let result = value1 - value2;
			switch (operation) {

				case ConditionsOperator.EQUAL:
					if (Math.abs(result) < tolerance) {
						return true;
					}
					break;
				case ConditionsOperator.BIGGER:
					if (value1 > value2 && Math.abs(result) < tolerance) {
						return true;
					}
					break;
				case ConditionsOperator.EQUAL_BIGGER:
					if (value1 >= value2 && Math.abs(result) < tolerance) {
						return true;
					}
					break;
				case ConditionsOperator.SMALLER:
					if (value1 < value2 && Math.abs(result) < tolerance) {
						return true;
					}
					break;
				case ConditionsOperator.EQUAL_SMALLER:
					if (value1 <= value2 && Math.abs(result) < tolerance) {
						return true;
					}
					break;
			}
			return false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.compareTwoValuesTolerance, err.message);
		}
	}

	/**
	 * Get new window handle from two arrays
	 * @author Tan.Ta
	 * @static
	 * @param {string[]} array1 Array after generating new window handle.
	 * @param {string[]} array2 Array before generating new window handle.
	 * @returns {string} new value
	 * @memberof Utility
	 */
	public static getUniqueValueInTwoArrays(array1: string[], array2: string[]): string {
		try {
			let value: string;
			let tempArray: string[] = [];
			array1.sort();
			array2.sort();

			if (array1.length > array2.length) {
				tempArray = array1;
				array1 = array2;
				array2 = tempArray;
			}
			for (let i: number = 0; i < array1.length; i++) {

				for (let j: number = 0; j < array2.length; j++) {
					if (array1[i] == array2[j]) {
						i++;
					} else {
						value = array2[j];
					}
				}
			}
			return value;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getUniqueValueInTwoArrays, err.message);
		}
	}

	/**
	 * Convert string minutes to seconds
	 * @author Nhat.Nguyen
	 * @static
	 * @param {string} minutes
	 * @returns {number} seconds
	 * @memberof Utility
	 */
	public static convertStringMinutesToSeconds(minutes: string): number {
		try {
			let timeString: Array<string> = minutes.split(":");
			return (parseInt(timeString[0]) * 60) + parseInt(timeString[1]);
		} catch (err) {
			throw new errorwrapper.CustomError(this.convertStringMinutesToSeconds, err.message);
		}
	}

	/**
     * Sleep without using browser.
     * @author Tan.Ta
     * @static
     * @param {number} second
     * @returns
     * @memberof Utility
     */
	public static delay(second: number): Promise<void> {
		try {
			return new Promise(resolve => setTimeout(resolve, second * 1000));
		} catch (err) {
			throw new errorwrapper.CustomError(this.delay, err.message);
		}
	}

	/**
	 * Read API Json file and return data
	 * @static
	 * @param {string} path
	 * @returns {*}
	 * @memberof Utility
	 */
	public static readJsonAPI(path: string): any {
		try {
			let configFile: string = `src/test-data/inContact/apis/${path}`;
			let jsonPath: string = Utility.getPath(configFile);
			let data = require(jsonPath);

			if (TestRunInfo.apiTestCasesID.length != 0) {
				let filterBy = { Id: TestRunInfo.apiTestCasesID },
					result = data.filter(o => Object.keys(filterBy).every(k => filterBy[k].some(f => o[k] === f)));
				return result;
			}
			return data;
		} catch (err) {
			throw new errorwrapper.CustomError(this.readJsonAPI, err.message);
		}

	}

	/**
	 * Capitalize First Letter
	 * @author Nhat.Nguyen
	 * @static
	 * @param {string} name
	 * @returns {number} seconds
	 * @memberof Utility
	 */
	public static capitalizeFirstLetter(name: string): string {
		try {
			return name = name.split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
		} catch (err) {
			throw new errorwrapper.CustomError(this.convertStringMinutesToSeconds, err.message);
		}
	}

	/**
	 * Inject character into text
	 * @author Anh.Ho
	 * @static
	 * @param {string} text	 
	 * @returns {Array<string>} 
	 * @memberof Utility
	 */
	public static injectTextWithSpecChars(text: string, filter: string = ""): Array<string> {
		try {
			let specialChars: string = "$-._!()'=^~`@|[]{}";
			for (let char of filter) {
				specialChars = specialChars.replace(char, "");
			}
			let newTextArr: string[] = new Array();
			for (let char of specialChars) {
				let randomIndex: number = this.getRandomNumber(0, 0, text.length);
				newTextArr.push(text.substr(0, randomIndex) + char + text.substr(randomIndex, text.length));
			}
			return newTextArr;
		} catch (err) {
			throw new errorwrapper.CustomError(this.injectTextWithSpecChars, err.message);
		}
	}

	/**
	 * Convert color hex code to rgb. ( Format: #ffffff ---> rbg(255, 255, 255) )
	 * @author Huy.Nguyen
	 * @param {string} colorCode
	 * @returns {string}
	 * @memberof Utility
	 */
	public static convertHexToRgb(colorCode: string): string {
		try {
			let rgbCode: string = "rgb(";
			let colorString: string = colorCode.slice(1);
			let rValue: number = parseInt(colorString.slice(0, 2), 16);
			let gValue: number = parseInt(colorString.slice(2, 4), 16);
			let bValue: number = parseInt(colorString.slice(4, 6), 16);
			rgbCode += `${rValue}, ${gValue}, ${bValue})`;
			return rgbCode;
		} catch (err) {
			throw new errorwrapper.CustomError(this.convertHexToRgb, err.message);
		}
	}

	/**
	 * Convert normal date to julian date (Example: 01/02/2019 -> 2458515 )
	 * Refer formula in link: https://en.wikipedia.org/wiki/Julian_day
	 * Refer link for detail: https://stackoverflow.com/questions/26370688/convert-a-julian-date-to-regular-date-in-javascript
	 * @author Huy.Nguyen
	 * @param {Date} date
	 * @returns {number}
	 * @memberof Utility
	 */
	public static convertDateToJulianNumber(date: Date): number {
		try {
			let x: number = Math.floor((14 - (date.getMonth() + 1)) / 12);
			let y: number = date.getFullYear() + 4800 - x;
			let z: number = (date.getMonth() + 1) - 3 + 12 * x;
			let julianNumber: number = date.getDate() + Math.floor(((153 * z) + 2) / 5) + (365 * y) + Math.floor(y / 4) + Math.floor(y / 400) - Math.floor(y / 100) - 32045;
			return julianNumber;
		} catch (err) {
			throw new errorwrapper.CustomError(this.convertDateToJulianNumber, err.message);
		}
	}


	/**
	 * Convert julian date to normal date (Example: 2458515 -> 01/02/2019 )
	 * Refer formula in link for detail: https://en.wikipedia.org/wiki/Julian_day
	 * @author Huy.Nguyen
	 * @param {number} julianNumber
	 * @returns {Promise<Date>}
	 * @memberof Utility
	 */
	public static convertJulianNumberToDate(julianNumber: number): string {
		try {
			let f: number = julianNumber + 1401 + Math.floor((Math.floor((4 * julianNumber + 274277) / 146097) * 3) / 4) - 38;
			let e: number = f * 4 + 3;
			let g: number = Math.floor((e % 1461) / 4);
			let h: number = g * 5 + 2;

			let D: number = Math.floor((h % 153) / 5) + 1;
			let M: number = ((Math.floor(h / 153) + 2) % 12) + 1;
			let Y: number = Math.floor(e / 1461) - 4716 + Math.floor((2 + 12 - M) / 12);
			let month: string = (M < 10) ? `0${M}` : M.toString();
			let date: string = (D < 10) ? `0${D}` : D.toString();

			let fullDateString: string = `${month}/${date}/${Y}`;
			return fullDateString;
		} catch (err) {
			throw new errorwrapper.CustomError(this.convertJulianNumberToDate, err.message);
		}
	}

	/**
	 * Add minutes to current time 
	 * @author Chinh.Nguyen
	 * @static
	 * @param {number} addMinute
	 * @returns {string}
	 * @memberof Utility
	 */
	public static addMinutesToCurrentTime(addMinute: number): string {
		try {
			let currentTime = new Date();
			currentTime.setMinutes(currentTime.getMinutes() + addMinute);
			let meridiem = currentTime.getHours() >= 12 ? "pm" : "am";
			return currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + meridiem;
		} catch (err) {
			throw new errorwrapper.CustomError(this.addMinutesToCurrentTime, err.message);
		}
	}

	/**
	 * Generate time for WFM activity
	 * @author Chinh.Nguyen
	 * @static
	 * @param {number} addHour
	 * @param {boolean} [fullClock=false]
	 * @returns {string}
	 * @memberof Utility
	 */
	public static generateTimeForWFMActivity(addHour: number, fullClock: boolean = false): string {
		try {
			let scheduleTime = <string>moment().add(addHour, 'hour').format("LLL");
			if (fullClock) {
				scheduleTime = Utility.formatDateTime(scheduleTime, 'LLL', 'MMM D, YYYY HH:mm');
			}
			return scheduleTime;
		} catch (err) {
			throw new errorwrapper.CustomError(this.generateTimeForWFMActivity, err.message);
		}
	}

	/**
	* Check number is in expected range 
	* @param {number,expected,range} number
	* @returns {boolean} return true number is inrange
	* @memberof Utility
	*/
	public static isNumberInRange(input: number, expected: number, range: number): boolean {
		try {
			let isInRange = false;
			let minSize = expected - range;
			let maxSize = expected + range;
			if (input >= minSize && input < maxSize) {
				isInRange = true;
			}
			return isInRange;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isNumberInRange, err.message);
		}
	}


	/**
	 * Parse current hour to format 12 and add more hours (Example: 24 => 12)
	 * @author Huy.Nguyen
	 * @static
	 * @param {number} addHour
	 * @returns {string}
	 * @memberof Utility
	 */
	public static addHoursFromCurrent(addHour: number): string {
		try {
			let currentHour: number = new Date().getHours();
			let extraHour: number = currentHour + addHour;
			let hourConverted: number = extraHour % 12;
			let hour: string;
			if (hourConverted >= 10) {
				hour = hourConverted.toString();
			} else {
				hour = "0" + hourConverted.toString();
			}
			return hour;
		} catch (err) {
			throw new errorwrapper.CustomError(this.addHoursFromCurrent, err.message);
		}
	}

	public static setTestEnvironmentByXrayJira(filePath: string = "src/test-data/config-info.json"): void {
		try {
			let configFile: string = filePath;
			let jsonPath: string = this.getPath(configFile);
			Utility.createConfigJSONFile(jsonPath);
			let jsonString: string = fs.readFileSync(jsonPath, 'utf8');
			let configData: ConfigInfo = JsonUtility.deserialize(JSON.parse(jsonString), ConfigInfo);

			let xrayJiraInfoFile: string = "src/data-objects/XrayJira/xrayJiraTestInfo.json";

			let xrayJiraInfoJsonPath: string = Utility.getPath(xrayJiraInfoFile);
			let xrayJiraInfoJsonString: string = fs.readFileSync(xrayJiraInfoJsonPath, 'utf8');
			let xrayJiraTestInfo: XrayJiraTestInfo = JsonUtility.deserialize(JSON.parse(xrayJiraInfoJsonString), XrayJiraTestInfo);
			LGReportTestCaseTempResult.xrayJiraTestInfo = xrayJiraTestInfo;
			
			ConfigReport.xrayJiraTestInfo = xrayJiraTestInfo;
			configData.clusterId = xrayJiraTestInfo.Cluster;
			configData.browser = xrayJiraTestInfo.Browser.toLocaleLowerCase();
			XrayJiraTestPlan.testPlanKey = xrayJiraTestInfo.TestPlanKey;
			if (xrayJiraTestInfo.Cluster.startsWith("SO") || xrayJiraTestInfo.Cluster.startsWith("TO") || xrayJiraTestInfo.Cluster.startsWith("B") || xrayJiraTestInfo.Cluster.startsWith("C")) {
				configData.environment = "CXONE";
			} else {
				configData.environment = "INCONTACT";
			}
			configData.tenantName = xrayJiraTestInfo.TenantName;
			configData.gbu = xrayJiraTestInfo.GBU;

			fs.writeFileSync(jsonPath, JSON.stringify(configData));
		} catch (err) {
			throw new errorwrapper.CustomError(this.setTestEnvironmentByXrayJira, err.message);
		}
	}
}

export class JsonUtility {

	/**
	 * Convert json object to redefined object
	 * @static
	 * @param {*} json 
	 * @param {new () => any} classReference 
	 * @returns {*} 
	 * @memberof JsonUtility
	 */
	public static deserialize(json: any, classReference: new () => any): any {
		try {
			let jsonConvert = new JsonConvert();
			jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
			jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null

			try {
				return jsonConvert.deserialize(json, classReference);
			} catch (e) {
				console.log((<Error>e));
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.deserialize, err.message);
		}
	}

	/**
	 * Convert json Array to redefined object
	 * @static
	 * @param {*} jsonArray
	 * @param {{ new(): any }} classReference
	 * @returns {any[]}
	 * @memberof JsonUtility
	 */
	public static deserializeArray(jsonArray: any, classReference: { new(): any }): any[] {
		try {
			let jsonConvert = new JsonConvert();
			jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
			jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null

			try {
				return jsonConvert.deserializeArray(jsonArray, classReference);
			} catch (e) {
				console.log((<Error>e));
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.deserializeArray, err.message);
		}
	}

	/**
	 * Convert redefined object to json object
	 * @author Phat.Ngo
	 * @static
	 * @param {*} classReference
	 * @returns {*}
	 * @memberof JsonUtility
	 */
	public static serialize(classReference: any): any {
		try {
			let jsonConvert = new JsonConvert();
			jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
			jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null

			try {
				return jsonConvert.serialize(classReference);
			} catch (e) {
				console.log((<Error>e));
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.serialize, err.message);
		}
	}

	/**
	 * Get value from a Json string using JSONPath
	 * @static
	 * @param {string} jsonString content of Json string
	 * @param {string} jsonPath path to Json node
	 * @returns {string} field value
	 * @memberof JsonUtility
	 */
	public static getFieldValue(jsonString: string, jsonPath: string): string {
		try {
			let jsonObj = JSON.parse(jsonString);
			let returnValue = eval("jsonObj." + jsonPath);
			return JSON.stringify(returnValue);
		} catch (err) {
			throw new errorwrapper.CustomError(this.getFieldValue, err.message);
		}
	}

	/**
	 * Get field count from a Json string using JSONPath
	 * @static
	 * @param {string} jsonString content of Json string
	 * @param {string} jsonPath path to Json node
	 * @returns {string} field value
	 * @memberof JsonUtility
	 */
	public static getFieldCount(jsonString: string, jsonPath?: string): number {
		try {
			let jsonFullString;
			let jsonObj = JSON.parse(jsonString);
			if (jsonPath != null) {
				jsonFullString = eval("jsonObj." + jsonPath);
			} else {
				jsonFullString = eval("jsonObj");
			}

			return Object.keys(jsonFullString).length;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getFieldCount, err.message);
		}
	}

	/**
	 * Return a Boolean value to indicate whether a specified field in a json content.
	 * @static
	 * @param {string} jsonString content of Json string
	 * @param {string} jsonPath path to Json node
	 * @returns {boolean} field value
	 * @memberof JsonUtility
	 */
	public static isFieldExisted(jsonString: string, jsonPath: string): boolean {
		try {
			let jsonObj = JSON.parse(jsonString);
			let jsonFullString = eval("jsonObj." + jsonPath);

			if (jsonFullString) {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.isFieldExisted, err.message);
		}
	}

	/**
	 * Update property of object by json string
	 * @author Tan.Ta
	 * @static
	 * @param {Object} object Object want to update
	 * @param {string} jsonString Json that contain property want to modify in special case
	 * @memberof JsonUtility
	 */
	public static update(object: Object, jsonString: string): void {
		try {
			function getAllKeys(o) {
				Object.keys(o).forEach(function (k) {
					if (typeof o[k] === 'object') {
						return getAllKeys(o[k]);
					}
					keys[k] = o;
				});
			}

			let keys = Object.create(null);

			getAllKeys(object);
			Object.keys(jsonString).forEach(function (k) {
				if (keys[k] && k in keys[k]) { // check if key for update exist
					keys[k][k] = jsonString[k];
				}
			});
		} catch (err) {
			throw new errorwrapper.CustomError(this.update, err.message);
		}
	}
}


export class Gmail {
	protected cxOneCluster = TestRunInfo.cluster;

	/**
	 * Get gmail body content
	 * @returns gmail content
	 * @memberof Gmail
	 */
	public async getGmailBodyContent(): Promise<{}> {
		try {
			let imap = new Imap({
				user: 'testautomationincontact@gmail.com',
				password: 'Logigear123!',
				host: 'imap.gmail.com',
				port: 993,
				tls: true
			});

			await imap.connect();

			let imapOnceReady = new Promise((resolve, reject) => {
				imap.once('ready', () => {
					let imapOpenBox = new Promise((resolve, reject) => {
						imap.openBox('INBOX', true, async function (err, box) {
							var f = await imap.seq.fetch("1:1", {
								bodies: ['HEADER.FIELDS (FROM)', 'TEXT']
							});
							await f.on('message', async function (msg, seqno) {
								await msg.on('body', function (stream, info) {
									var buffer = '';
									stream.on('data', function (chunk) {
										buffer += chunk.toString('utf8');
									});
									stream.once('end', function () {
										console.log(buffer);
										resolve(buffer);
									});
								});
								await msg.once('end', function () { });
							});

							await f.once('error', function (err) {
								console.log('Fetch error: ' + err);
							});
							await f.once('end', function () {
								imap.end();
							});
						});
					});
					resolve(imapOpenBox);
				});
			});

			return await imapOnceReady;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getGmailBodyContent, err.message);
		}
	}

	/**
	 * Get link in body content
	 * @param {any} str body content
	 * @returns url link
	 * @memberof Gmail
	 */
	public async getBodyLink(str): Promise<string> {
		try {
			let pos: string = await str.indexOf(TestRunInfo.cluster.getURL(PageName.CXONE_SET_PASSWORD_PAGE));
			let newString: string = await str.substr(pos, 175);
			return newString.split(`"`)[0];
		} catch (err) {
			throw new errorwrapper.CustomError(this.getBodyLink, err.message);
		}
	}

	/**
	 * Insert value
	 * @param {any} str string to be inserted
	 * @param {any} index location
	 * @param {any} value value to insert
	 * @returns new string
	 * @memberof Gmail
	 */
	public insert(str, index, value): string {
		try {
			return str.substr(0, index) + value + str.substr(index);
		} catch (err) {
			throw new errorwrapper.CustomError(this.insert, err.message);
		}
	}

	public numberToBinary(numb): string {
		try {
			numb = Math.round(numb);
			let binaryStr = ""
			while (numb > 0) {
				let remainder = numb % 2;
				if (remainder == 1) {
					numb = numb - 1
				}
				binaryStr = remainder + "" + binaryStr;
				numb = numb / 2;
			}

			return binaryStr;
		} catch (err) {
			throw new errorwrapper.CustomError(this.numberToBinary, err.message);
		}
	}

	/**
	 * get random Gmail by index
	 * @returns random gmail
	 * @memberof Gmail
	 */
	public getRandomGmailByIndex(): string {
		try {
			let today = (new Date().getTime());
			let dayRoot = (new Date(2019, 5, 25, 0, 0, 0).getTime())
			let index = Math.floor(Math.abs(today - dayRoot) / 1000);
			let email = "l.g.v.n.i.n.c.o.n.t.a.c.t.q.a.a.a.u.t.o.m.a.t.i.o.n.t.e.a.m";
			let hexIndex = this.numberToBinary(index)
			let hexIndexArray = hexIndex.split("");

			let emailTemp = email.substring(0, email.length - (hexIndexArray.length * 2 - 1))
			let emailTemp2 = email.substring(email.length - (hexIndexArray.length * 2 - 1), email.length)
			let emailTemp2Arr = emailTemp2.split("");

			let listPosSplice = [];
			for (let i = 0; i < hexIndexArray.length; i++) {
				let tempNum = (i * 2) + 1;
				if (hexIndexArray[i] == "0") {
					listPosSplice.push(tempNum)
				}
			}

			for (let x = listPosSplice.length - 1; x >= 0; x--) {
				emailTemp2Arr.splice(listPosSplice[x], 1)
			}

			for (let c of emailTemp2Arr) {
				emailTemp += c
			}

			return emailTemp + "@gmail.com";
		} catch (err) {
			throw new errorwrapper.CustomError(this.getRandomGmailByIndex, err.message);
		}
	}

	/**
	* Create an OAuth2 client with the given credentials, and then execute the
	* given callback function.
	* @author Nhat Nguyen
	* @param {Object} credentials The authorization client credentials.
	* @param {function} callback The callback to call with the authorized client.
	*/
	private async authorize(credentials: any, callback?: any): Promise<any> {
		let TOKEN_PATH = `${ProjectPath.project}/token.json`;
		console.log(credentials)
		const { client_secret, client_id, redirect_uris } = JSON.parse(credentials).installed;
		const oAuth2Client = new google.auth.OAuth2(
			client_id, client_secret, redirect_uris[0]);

		// Check if we have previously stored a token.
		await fs.readFile(TOKEN_PATH, async (err: any, token: any) => {
			if (err) return await this.getNewToken(oAuth2Client, callback);
			await oAuth2Client.setCredentials(JSON.parse(token));
			// await callback(oAuth2Client);
		});
	}

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @author Nhat Nguyen
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
	private async getNewToken(oAuth2Client: any, callback: any): Promise<void> {
		let SCOPES = ['https://mail.google.com/'];
		let TOKEN_PATH = `${ProjectPath.project}/token.json`;

		const authUrl = await oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: SCOPES,
		});
		console.log('Authorize this app by visiting this url:', authUrl);
		const rl = await readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		await rl.question('Enter the code from that page here: ', async (code: any) => {
			await rl.close();
			await oAuth2Client.getToken(code, async (err: any, token: any) => {
				if (err) return console.error('Error retrieving access token', err);
				await oAuth2Client.setCredentials(token);
				// Store the token to disk for later program executions
				await fs.writeFile(TOKEN_PATH, JSON.stringify(token), async (err: any) => {
					if (err) return console.error(err);
					console.log('Token stored to', TOKEN_PATH);
				});
				await callback(oAuth2Client);
			});
		});
	}

	/**
	 * Authorize Gmail
	 *
	 * @static
	 * @returns {Promise<void>}
	 * @memberof Gmail
	 */
	public static async authorizeGmail(): Promise<void> {
		try {
			let gmail = new Gmail();
			let credentialFile: string = fs.readFileSync(`${ProjectPath.project}/credentials.json`, "utf-8");
			await gmail.authorize(credentialFile);
		} catch (err) {
			throw new errorwrapper.CustomError(this.authorizeGmail, err.message);
		}
	}


	/**
	 * Get Access token
	 *
	 * @static
	 * @returns {Promise<APIResponse>}
	 * @memberof Gmail
	 */
	public static async getAccessToken(): Promise<APIResponse> {
		try {
			let credentialFile: string = fs.readFileSync(`${ProjectPath.project}/credentials.json`, "utf-8");
			let tokenFile: string = fs.readFileSync(`${ProjectPath.project}/token.json`, "utf-8");
			let client_id: string = JSON.parse(credentialFile).installed.client_id;
			let client_secret: string = JSON.parse(credentialFile).installed.client_secret;
			let refresh_token: string = JSON.parse(tokenFile).refresh_token;

			let url = "https://accounts.google.com/o/oauth2/token";
			let options = new Options(url, Method.POST);
			options.addHeader("Content-Type", "application/json; charset=utf-8");
			options.addBody("client_id", client_id);
			options.addBody("client_secret", client_secret);
			options.addBody("refresh_token", refresh_token);
			options.addBody("grant_type", "refresh_token");

			return await APICore.request(options);
		} catch (err) {
			throw new errorwrapper.CustomError(this.getAccessToken, err.message);
		}
	}

	/**
	 * Get email list
	 *
	 * @static
	 * @param {string} accessToken
	 * @returns {Promise<APIResponse>}
	 * @memberof Gmail
	 */
	public static async getEmailList(accessToken: string): Promise<APIResponse> {
		try {
			let url = "https://www.googleapis.com/gmail/v1/users/me/messages?access_token=" + accessToken;
			let options = new Options(url, Method.GET);
			options.addHeader("Content-Type", "application/json; charset=utf-8");
			return await APICore.request(options);
		} catch (err) {
			throw new errorwrapper.CustomError(this.getEmailList, err.message);
		}
	}

	/**
	 * Get active link by title email
	 *
	 * @param {string} title
	 * @returns
	 * @memberof Gmail
	 */
	public async getLinkActiveByTitle(title: string) {
		try {
			let getAccessTokenResponse: APIResponse = await Gmail.getAccessToken();
			let accessToken: string = JSON.parse(getAccessTokenResponse.body).access_token;
			let getEmailListResponse: APIResponse = await Gmail.getEmailList(accessToken);
			for (let message of JSON.parse(getEmailListResponse.body).messages) {

				let url = "https://www.googleapis.com/gmail/v1/users/me/messages/" + message.id + "?format=metadata&metadataHeaders=Subject&access_token=" + accessToken;
				let options = new Options(url, Method.GET);
				options.addHeader("Content-Type", "application/json; charset=utf-8");
				let getMessageResponse: APIResponse = await APICore.request(options);

				if (JSON.parse(getMessageResponse.body).payload.headers[0].value != undefined) {
					if (JSON.parse(getMessageResponse.body).payload.headers[0].name == "Subject" && JSON.parse(getMessageResponse.body).payload.headers[0].value == title) {
						let body: string = await JSON.parse(getMessageResponse.body).payload.parts[0].body.data;
						let emailBody = await Base64.decode(body);
						let gg = new Gmail();
						return await gg.getBodyLink(emailBody);;
					}
				}
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.getLinkActiveByTitle, err.message);
		}
	}

	/**
	 * Get active link by body email
	 *
	 * @param {string} body
	 * @returns {Promise<string>}
	 * @memberof Gmail
	 */
	public async getLinkActiveByBody(body: string): Promise<string> {
		try {
			let getAccessTokenResponse: APIResponse = await Gmail.getAccessToken();
			let accessToken: string = JSON.parse(getAccessTokenResponse.body).access_token;

			// Wait for active email send
			await Utility.delay(20);
			let getEmailListResponse: APIResponse = await Gmail.getEmailList(accessToken);

			for (let message of JSON.parse(getEmailListResponse.body).messages) {

				let url = "https://www.googleapis.com/gmail/v1/users/me/messages/" + message.id + "?access_token=" + accessToken;
				let options = new Options(url, Method.GET);
				options.addHeader("Content-Type", "application/json; charset=utf-8");
				let getMessageResponse: APIResponse = await APICore.request(options);

				let snippet: string = await JSON.parse(getMessageResponse.body).snippet;
				if (snippet != undefined) {

					if (snippet.includes(body)) {

						let body: string = await JSON.parse(getMessageResponse.body).payload.parts[0].body.data;
						let emailBody = await Base64.decode(body);
						let gg = new Gmail();
						return await gg.getBodyLink(emailBody);;
					}
				}
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.getLinkActiveByBody, err.message);
		}

	}
}

export class XrayJiraUtility {

	public static getTimeForJira() {
		try {
			let toDay = new Date();
			let offset = -toDay.getTimezoneOffset();
			toDay.setHours(toDay.getHours() - offset / 60)

			let tzo = -toDay.getTimezoneOffset(),
				dif = tzo >= 0 ? '+' : '-',

				pad = function (num) {
					var norm = Math.floor(Math.abs(num));
					return (norm < 10 ? '0' : '') + norm;
				};

			let time = toDay.getFullYear() +
				'-' + pad(toDay.getMonth() + 1) +
				'-' + pad(toDay.getDate()) +
				'T' + pad(toDay.getHours()) +
				':' + pad(toDay.getMinutes()) +
				':' + pad(toDay.getSeconds()) +
				dif + pad(tzo / 60) +
				':' + pad(tzo % 60);

			return time;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getDateISOString, err.message);
		}
	}

	/**
	 * Change date to new Xray server format
	 * Example: 2019-02-21T13:30:41 >> 2019-02-21T13:30:41+07:00
	 * @param {string} dateTime
	 * @returns {string}
	 * @memberof XrayJiraUtility
	 */
	public static getDateISOString() {
		try {
			let toDay = new Date();
			let offset = -toDay.getTimezoneOffset();
			toDay.setHours(toDay.getHours() - offset / 60)

			let tzo = -toDay.getTimezoneOffset(),
				dif = tzo >= 0 ? '+' : '-',

				pad = function (num) {
					var norm = Math.floor(Math.abs(num));
					return (norm < 10 ? '0' : '') + norm;
				};

			let time = toDay.getFullYear() +
				'-' + pad(toDay.getMonth() + 1) +
				'-' + pad(toDay.getDate()) +
				'T' + pad(toDay.getHours()) +
				':' + pad(toDay.getMinutes()) +
				':' + pad(toDay.getSeconds()) +
				dif + pad(tzo / 60) +
				':' + pad(tzo % 60);

			if (time.indexOf("+") > -1) {
				return time;
			} else {
				let timeArr = time.split("-")
				return time.substr(0, time.length - (timeArr[timeArr.length - 1].length + 1)) + "+00:00"
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.getDateISOString, err.message);
		}
	}

	public static async generateJsonForExecution(testCasesInfo: Array<XrayTestCaseInfo>, testExecutionk?: string) {
		try {
			let testCaseXrayArray = await XrayJiraUtility.removeDuplicateXrayTestCase(testCasesInfo)
			testCaseXrayArray = await this.removeNotAssociatedXrayTestCase(testCaseXrayArray);
			let listNotAssociatedTestCase = "";
			let listAssociatedTestCase = "";
			for (let a = 0; a < ConfigReport.listNotAssociatedTestCase.length; a++) {
				listNotAssociatedTestCase += ConfigReport.listNotAssociatedTestCase[a].testKey
				if (a <= ConfigReport.listNotAssociatedTestCase.length - 1) {
					listNotAssociatedTestCase += ","
				}
			}
			console.log("Test Plan Key: " + ConfigReport.xrayJiraTestInfo.TestPlanKey)
			console.log("Not associated TCs: " + listNotAssociatedTestCase)

			for (let b = 0; b < ConfigReport.listAssociatedTestCase.length; b++) {
				listAssociatedTestCase += ConfigReport.listAssociatedTestCase[b].testKey
				if (b <= ConfigReport.listAssociatedTestCase.length - 1) {
					listAssociatedTestCase += ","
				}
			}
			console.log("Associated TCs: " + listAssociatedTestCase)
			let version = ConfigReport.xrayJiraTestInfo.Version != "" ? `with Version ${ConfigReport.xrayJiraTestInfo.Version}` : "";
			let revision = ConfigReport.xrayJiraTestInfo.Revision != "" ? `with Revision ${ConfigReport.xrayJiraTestInfo.Revision}` : "";

			let JsonString = `{ "info": { "version": "${ConfigReport.xrayJiraTestInfo.Version}", "startDate": "${JenkinsBuildExecution.start_date}", "testEnvironments": [ "${TestRunInfo.clusterID}" ], "testPlanKey": "${ConfigReport.xrayJiraTestInfo.TestPlanKey}", "description": "${ConfigReport.xrayJiraTestInfo.TestPlanKey} ${ConfigReport.xrayJiraTestInfo.TestExecutionTitle}", "summary": "Execution of automated tests ${ConfigReport.xrayJiraTestInfo.TestExecutionTitle} ${version} ${revision}", "finishDate": "${JenkinsBuildExecution.end_date}", "revision": "${ConfigReport.xrayJiraTestInfo.Revision}" }, "tests": ${JSON.stringify(testCaseXrayArray)} }`
			console.log("JsonString Result: " + JsonString)
			return await JsonString
		} catch (err) {
			throw new errorwrapper.CustomError(this.generateJsonForExecution, err.message);
		}

	}

	public static async removeNotAssociatedXrayTestCase(arr): Promise<Array<any>> {
		try {
			let allCaseInfo = [];
			ConfigReport.listAssociatedTestCase
			for (let b = 0; b < arr.length; b++) {
				if (arr[b].comment != "Not Associated") {
					allCaseInfo.push(arr[b]);
					ConfigReport.listAssociatedTestCase.push(arr[b]);
				} else {
					ConfigReport.listNotAssociatedTestCase.push(arr[b]);
				}
			}
			return await allCaseInfo
		} catch (err) {
			throw new errorwrapper.CustomError(this.removeNotAssociatedXrayTestCase, err.message);
		}

	}

	/**
	 * Remove duplicate value on array
	 * @param {Array} arr
	 * @returns {Array} without duplicate value
	 * @memberof XrayJiraUtility
	 */
	public static deduplicate(arr) {
		try {
			return arr.filter((value, index, arr) => arr.indexOf(value) === index)
		} catch (err) {
			throw new errorwrapper.CustomError(this.deduplicate, err.message);
		}
	}

	/**
	 * Remove duplicate value on test case array
	 * @param {*} arr
	 * @returns {Array} without duplicate value on test case array
	 * @memberof XrayJiraUtility
	 */
	public static removeDuplicateTestCase(arr) {
		try {
			let tempCaseIDDup = [];
			let tempCaseID = [];
			let allCaseInfo = [];
			for (let a = 0; a < arr.length; a++) {
				tempCaseIDDup.push(arr[a].testKey)
			}
			tempCaseID = this.deduplicate(tempCaseIDDup);
			for (let b = 0; b < tempCaseID.length; b++) {
				for (let c = 0; c < arr.length; c++) {
					if (tempCaseID[b] == arr[c].testKey) {
						allCaseInfo.push(arr[c]);
						break;
					}
				}
			}
			return allCaseInfo;
		} catch (err) {
			throw new errorwrapper.CustomError(this.removeDuplicateTestCase, err.message);
		}
	}

	/**
	 * Remove duplicate value on test case array
	 * @param {*} arr
	 * @returns {Array} without duplicate value on test case array
	 * @memberof XrayJiraUtility
	 */
	public static async removeDuplicateJenkinsTestCase(arr): Promise<Array<any>> {
		try {
			let tempCaseIDDup = [];
			let tempCaseID = [];
			let allCaseInfo = [];
			for (let a = 0; a < arr.length; a++) {
				tempCaseIDDup.push(arr[a].tfs_id)
			}
			tempCaseID = this.deduplicate(tempCaseIDDup);
			for (let b = 0; b < tempCaseID.length; b++) {
				for (let c = 0; c < arr.length; c++) {
					if (tempCaseID[b] == arr[c].tfs_id) {
						allCaseInfo.push(arr[c]);
						break;
					}
				}
			}
			return allCaseInfo;
		} catch (err) {
			throw new errorwrapper.CustomError(this.removeDuplicateJenkinsTestCase, err.message);
		}
	}

	/**
	 * Remove duplicate value on test case array
	 * @param {*} arr
	 * @returns {Array} without duplicate value on test case array
	 * @memberof XrayJiraUtility
	 */
	public static async removeDuplicateXrayTestCase(arr): Promise<Array<any>> {
		try {
			let tempCaseIDDup = [];
			let tempCaseID = [];
			let allCaseInfo = [];
			for (let a = 0; a < arr.length; a++) {
				tempCaseIDDup.push(arr[a].testKey)
			}
			tempCaseID = this.deduplicate(tempCaseIDDup);
			for (let b = 0; b < tempCaseID.length; b++) {
				for (let c = 0; c < arr.length; c++) {
					if (tempCaseID[b] == arr[c].testKey) {
						allCaseInfo.push(arr[c]);
						break;
					}
				}
			}
			return allCaseInfo
		} catch (err) {
			throw new errorwrapper.CustomError(this.removeDuplicateXrayTestCase, err.message);
		}

	}

	public static async getListAssociatedTestCaseAndNot(): Promise<any> {
		try {
			let dataTestCase = require(Utility.getPath('src/data-objects/XrayJira/xrayJiraTestCaseMap.json'))
			let dataJiraTestInfo = require(Utility.getPath('src/data-objects/XrayJira/xrayJiraTestInfo.json'))

			let listTestCaseXrayExistedOnLocalData = [];
			let listTestCaseTFSExistedOnLocalData = [];
			let listTestCaseNoExistedOnLocalData = [];

			dataJiraTestInfo.TestCaseKey = dataJiraTestInfo.TestCaseKey.split(",")
			let listTestCaseTestSet = [];

			if (ConfigReport.xrayJiraTestInfo.TestSetKey != "") {
				listTestCaseTestSet = await XrayAPI.getTestCasesFromTestSet(ConfigReport.xrayJiraTestInfo.TestSetKey)
			}

			dataJiraTestInfo.TestCaseKey = XrayJiraUtility.deduplicate(dataJiraTestInfo.TestCaseKey.concat(listTestCaseTestSet));

			for (let testCaseIDFromXray of dataJiraTestInfo.TestCaseKey) {
				let check = false;
				for (let dataTestCaseOnLocal of dataTestCase) {
					if (dataTestCaseOnLocal.JiraXray.KeyID == testCaseIDFromXray) {
						listTestCaseTFSExistedOnLocalData.push(dataTestCaseOnLocal.Internal.ID)
						check = true;
						break;
					}
				}
				if (check) {
					listTestCaseXrayExistedOnLocalData.push(testCaseIDFromXray)
				} else {
					listTestCaseNoExistedOnLocalData.push(testCaseIDFromXray)
				}
			}
			console.log(`List test case associate: ${listTestCaseXrayExistedOnLocalData}`)
			console.log(`List test case not associate: ${listTestCaseNoExistedOnLocalData}`)
			return { existedXrayTestCase: listTestCaseXrayExistedOnLocalData, existedLocalTestCase: listTestCaseTFSExistedOnLocalData, notExistedXrayTestCase: listTestCaseNoExistedOnLocalData }

		} catch (err) {
			throw new errorwrapper.CustomError(this.getListAssociatedTestCaseAndNot, err.message);
		}
	}

	public static async getPathOfTestSpec(): Promise<any> {
		try {
			let listPathSpec = [];
			let listTotal = await this.getListAssociatedTestCaseAndNot();
			let totalExistedLocalTestCase = listTotal.existedLocalTestCase;
			let totalPath = walkSync(ProjectPath.testCases)
			for (let i = 0; i < totalPath.length; i++) {
				for (let j = 0; j < totalExistedLocalTestCase.length; j++) {
					if (totalPath[i].indexOf(totalExistedLocalTestCase[j]) > -1) {
						listPathSpec.push(totalPath[i]);
						break;
					}
				}
			}
			return await listPathSpec;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getPathOfTestSpec, err.message);
		}

	}

	public static getListSpec() {
		let configFile: string = `src/data-objects/XrayJira/xrayListSpec.json`;
		let dataJconfigFile = require(Utility.getPath(configFile))
		return dataJconfigFile;
	}
}

function walkSync(dir, filelist = []) {
	fileSystem.readdirSync(dir).forEach(file => {
		const dirFile = path.join(dir, file);
		try {
			filelist = walkSync(dirFile, filelist);
		}
		catch (err) {
			if (err.code === 'ENOTDIR' || err.code === 'EBUSY') {
				if (file.indexOf(".map") < 0) {
					filelist = [...filelist, dirFile];
				}
			} else throw err;
		}
	});
	return filelist;
}

