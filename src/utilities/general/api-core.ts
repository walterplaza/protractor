import { JsonUtility, Utility } from "@utilities/general/utility";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
let XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;

export class APICore {
	/**
	 * Send API request with data/body
	 * @static
	 * @param {Options} options 
	 * @returns {Promise<APIResponse>} API response
	 * @memberof APICore
	 */

	static request(options: Options, json?: string): Promise<APIResponse> {
		let response: Promise<APIResponse> = new Promise(async function (resolve, reject) {
			let http = new XMLHttpRequest();

			await Utility.delay(0.5);
			//Open request
			http.open(options.method.toString(), options.url + options.getParamString(), true);
			
			//Add headers
			options.headers.forEach((value: any, key: string) => {
				http.setRequestHeader(key, value);
			});

			if (json == null)
				http.send(options.getBodyString());
			else
				http.send(json);

			http.onerror = function () {
				reject(Error(`Error while requesting API. Status code: ${http.status}. Body: ${http.responseText}.`));
			};

			http.onload = function () {
				resolve(new APIResponse(http.status, http.responseText, http.getResponseHeader("icStatusDescription"), options));
			};
			// await Utility.delay(1);
		});

		// response.then(async function (response) {
		// 	await Utility.delay(1);
		// 	if (browser.params.testType == "API") {
		// 		let api = options.url.slice(options.url.indexOf("services") + "services".length, options.url.length)
		// 		await Logger.write(FunctionType.API, `Sending API ${options.method} '${api}'. Return status code '${response.status}'.`, LogType.INFO);
		// 	}

		// 	await Logger.write(FunctionType.API, `Header: ${response.header}`, LogType.DEBUG);
		// 	await Logger.write(FunctionType.API, `Status code: ${response.status}`, LogType.DEBUG);
		// 	await Logger.write(FunctionType.API, `Body: ${response.body}`, LogType.DEBUG);
		// });
		// Utility.delay(1);
		return response;
	}

	/**
	 * Send API request with body JSON
	 * @static
	 * @param {Options} options
	 * @param {string} json
	 * @returns {Promise<APIResponse>}
	 * @memberof APICore
	 */
	static requestJson(options: Options, json: string): Promise<APIResponse> {
		let response: Promise<APIResponse> = new Promise(async function (resolve, reject) {
			let http = new XMLHttpRequest();
			await Utility.delay(0.5);
			//Open request
			http.open(options.method.toString(), options.url + options.getParamString(), true);

			//Add headers
			options.headers.forEach((value: any, key: string) => {
				http.setRequestHeader(key, value);
			});

			http.send(json);

			http.onerror = function () {
				reject(Error(`Error while requesting API. Status code: ${http.status}. Body: ${http.responseText}.`));
			};

			http.onload = function () {
				resolve(new APIResponse(http.status, http.responseText, http.getResponseHeader("icStatusDescription"), options));
			};
		});

		// response.then(async function (response) {

		// 	if (browser.params.testType == "API") {
		// 		let api = options.url.slice(options.url.indexOf("services") + "services".length, options.url.length)
		// 		await Logger.write(FunctionType.API, `Sending API ${options.method} '${api}'. Return status code '${response.status}'.`, LogType.INFO);
		// 	}

		// 	await Logger.write(FunctionType.API, `Header: ${response.header}`, LogType.DEBUG);
		// 	await Logger.write(FunctionType.API, `Status code: ${response.status}`, LogType.DEBUG);
		// 	await Logger.write(FunctionType.API, `Body: ${response.body}`, LogType.DEBUG);
		// });

		return response;
	}
}

export enum Method {
	POST = "POST",
	PUT = "PUT",
	GET = "GET",
	DELETE = "DELETE"
}

export class Options {
	url: string;
	method: Method;
	headers: Map<string, any>;
	body: Map<string, any>;
	param: Map<string, any>

	constructor(url: string,
		method: Method,
		headers: Map<string, any> = new Map<string, any>(),
		body: Map<string, any> = new Map<string, any>(),
		param: Map<string, any> = new Map<string, any>(),
	) {
		this.url = url;
		this.method = method;
		this.headers = headers;
		this.body = body;
		this.param = param;
	}

	addHeader(key: string, value: any) {
		this.headers.set(key, value);
	}

	addBody(key: string, value: any) {
		if (value != "null") {
			this.body.set(key, value);
		}
	}

	addParam(key: string, value: any) {
		if (value != "null") {
			this.param.set(key, value);
		}
	}

	getParamString(): string {
		let result: string = "?";
		let i = 0;

		this.param.forEach((value: any, key: string) => {
			result += `${key}=${value}`;
			i++;
			if (i < this.param.size) {
				result += "&";
			}
		});
		result += "";

		if (result == "?") {
			return ""
		} else {
			return result;
		}
	}

	getBodyString(): string {
		let result: string = "{";
		let i = 0;

		this.body.forEach((value: any, key: string) => {
			result += `"${key}": "${value}"`;
			i++;
			if (i < this.body.size) {
				result += ", ";
			}
		});

		result += "}";

		return result;
	}
}

export class APIResponse {
	status: number;
	body: string;
	header: string;
	options: Options;

	constructor(status: number, body: string, header: string, options: Options) {
		this.status = status;
		this.body = body;
		this.header = header;
		this.options = options;
	}

	/**
	 * Get error description 
	 * @author Tan.Ta
	 * @returns {string}
	 * @memberof APIResponse
	 */
	getErrorDescription(): string {
		try {
			let err: string = "";
			if (this.body != "") {
				if (JsonUtility.isFieldExisted(this.body, "error_description")) {
					err = JsonUtility.getFieldValue(this.body, "error_description").replace(/"/g, "");
				}
			}
			return err;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getErrorDescription, err.message);
		}
	}
}