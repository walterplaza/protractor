import { LGReportTestCaseTempResult } from "@utilities/new-report/lg-reporter";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

export let LGMatchers: jasmine.AsyncCustomMatcherFactories = {

	toBe: function (): jasmine.AsyncCustomMatcher {
		return {
			compare: function (actual: any, expected: any): jasmine.AsyncCustomMatcherResult {
				const result: jasmine.AsyncCustomMatcherResult = {
					pass: jasmine.matchersUtil.equals(actual, expected),
					message: arguments[2]
				}
				if (!result.pass) {
					if (LGReportTestCaseTempResult.errorPictureName == "") {
						let nameOfErrorPicture = (new Date()).getTime().toString()
						LGReportTestCaseTempResult.errorPictureName = nameOfErrorPicture;
						BrowserWrapper.takeScreenShot(nameOfErrorPicture);
						throw new Error(result.message + ". " + actual + " does not equal to " + expected);
					}
				}
				return result;
			}
		}
	}
};