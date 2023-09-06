
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { ISize } from "selenium-webdriver";

export default class PageBase {

	/**
	 * Scale page to an expected size
	 * @param width: expected width
	 * @param height: expected height
	 * @returns {Promise<void>}
	 * @memberof PageBase
	 */
	public async setPageSize(width: number = null, height: number = null): Promise<void> {
		try {
			await BrowserWrapper.setSize(width, height);
		} catch (err) {
			throw new errorwrapper.CustomError(this.setPageSize, err.message);
		}
	}
	/**
	 * Getting size of current window
	 * @author Y.Le
	 * @returns {Promise<ISize>}
	 * @memberof PageBase
	 */
	public async getPageSize(): Promise<ISize> {
		try {
			return await BrowserWrapper.getSize();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getPageSize, err.message);
		}
	}

	/**
	 * Get current window handle 
	 * @author Chinh.Nguyen
	 * @returns {Promise<string>}
	 * @memberof PageBase
	 */
	public async getCurrentWindowHandle(): Promise<string> {
		try {
			return await BrowserWrapper.getNewWindowHandle();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getCurrentWindowHandle, err.message);
		}
	}

    /**
	 * Switch window by handle 
	 * @author Chinh.Nguyen
	 * @param {string} handle
	 * @returns {Promise<void>}
	 * @memberof PageBase
	 */
	public async switchWindowByHandle(handle: string): Promise<void> {
		try {
			await BrowserWrapper.switchWindowByHandle(handle);
			BrowserWrapper.sleepInSecond(3);
		} catch (err) {
			throw new errorwrapper.CustomError(this.switchWindowByHandle, err.message);
		}
	}

    /**
	 * Wait in second 
	 * @author Chinh.Nguyen
	 * @param {string} second
	 * @returns {Promise<void>}
	 * @memberof PageBase
	 */
	public async waitInSecond(second: number): Promise<void> {
		try {
			await BrowserWrapper.sleepInSecond(second);
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitInSecond, err.message);
		}
	}

	/**
	 * Copying selected text by Ctrl+C
	 * @author Y.Le
	 * @returns {Promise<void>}
	 * @memberof PageBase
	 */
	public async copySelectedText(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Copying selected text");
			let clipboardy = require('clipboardy');
			await clipboardy.writeSync(await this.getSelectedText());
		} catch (err) {
			throw new errorwrapper.CustomError(this.copySelectedText, err.message);
		}
	}

	/**
	 * Getting selected text
	 * @author Y.Le
	 * @returns {Promise<string>}
	 * @memberof PageBase
	 */
	public async getSelectedText(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting selected text");
			return await BrowserWrapper.getSelectedText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getSelectedText, err.message);
		}
	}

	/**
	 * Opening new tab
	 * @author Nhat Nguyen
	 * @param {string} url
	 * @returns {Promise<void>}
	 * @memberof PageBase
	 */
	public async openNewTab(url: string): Promise<void> {
		try {
			await BrowserWrapper.openNewTab(url);
		} catch (err) {
			throw new errorwrapper.CustomError(this.openNewTab, err.message);
		}
	}

	/**
	 * Close browser window
	 * @author Chinh.Nguyen
	 * @returns {Promise<void>}
	 * @memberof PageBase
	 */
	public async closeWindow(): Promise<void> {
		try {
			await BrowserWrapper.close();
		} catch (err) {
			throw new errorwrapper.CustomError(this.closeWindow, err.message);
		}
	}


	/**
	 * Get total windows
	 * @author Chinh.Nguyen
	 * @returns {Promise<void>}
	 * @memberof PageBase
	 */
	public async getTotalWindows(): Promise<number> {
		try {
			return await BrowserWrapper.getTotalWindows();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getTotalWindows, err.message);
		}
	}


	/**
	 * Creating a new driver instance
	 * @author Y.Le
	 * @memberof PageBase
	 */
	public createDriverInstance(): void {
		try {
			BrowserWrapper.createDriverInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.createDriverInstance, err.message)
		}
	}

	/** Checking selected text is highlighted
	 * @author Y.Le
	 * @param {string} text
	 * @returns {Promise<boolean>}
	 * @memberof PageBase
	 */
	public async isSelectedTextHighlight(text: string): Promise<boolean> {
		try {
			let selectedText: string = await BrowserWrapper.getSelectedText();
			return selectedText == text;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isSelectedTextHighlight, err.message);
		}
	}

	/**
	 * switching driver instance
	 * @author Y.Le
	 * @param {number} index
	 * @memberof PageBase
	 */
	public switchDriverInstance(index: number): void {
		try {
			BrowserWrapper.switchDriverInstance(index);
		} catch (err) {
			throw new errorwrapper.CustomError(this.switchDriverInstance, err.message);
		}
	}

	/** Getting clipboard content
	 * @author Y.Le
	 * @returns {Promise<string>}
	 * @memberof PageBase
	 */
	public async getClipboardContent(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting clipboard content");
			let clipboardy = require('clipboardy');
			let clipboardContent = "";
			try {
				clipboardContent = await clipboardy.readSync()
			} catch (errClipboard) {
				if (errClipboard.message == "The operation completed successfully.") {
					await clipboardy.writeSync("");
				}
			}
			return clipboardContent;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getClipboardContent, err.message);
		}
	}

	/**
	 * Setting wait for angular web
	 * @author Y.Le
	 * @param {boolean} option
	 * @returns {Promise<void>}
	 * @memberof PageBase
	 */
	public async settingWaitForAngularEnabled(option: boolean): Promise<void> {
		try {
			await BrowserWrapper.settingWaitForAngularEnabled(option);
		} catch (err) {
			throw new errorwrapper.CustomError(this.settingWaitForAngularEnabled, err.message);
		}
	}

	/**
	 * Navigating to web with second driver
	 * @author Y.Le
	 * @param {string} url
	 * @returns {Promise<any>}
	 * @memberof PageBase
	 */
	public async navigateWeb(url: string): Promise<any> {
		try {
			await this.settingWaitForAngularEnabled(false);
			await BrowserWrapper.maximize();
			await BrowserWrapper.get(url);
			await BrowserWrapper.settingWaitForAngularEnabled(false)
		} catch (err) {
			throw new errorwrapper.CustomError(this.navigateWeb, err.message);
		}
	}

	/** Switch to default content 
	* @author Anh.Ho
	* @returns {Promise<void>}
	* @memberof PageBase
	*/
	public async switchToDefaultContent(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Switching to default content ")
			await BrowserWrapper.switchToDefaultContent();
		} catch (err) {
			throw new errorwrapper.CustomError(this.switchToDefaultContent, err.message);
		}
	}

	/**
	 * Close all browsers
	 * @author Tan.Ta
	 * @returns {Promise<void>}
	 * @memberof PageBase
	 */
	public async closeAllBrowsers(): Promise<void> {
		try {
			await BrowserWrapper.closeAllBrowser();
		} catch (err) {
			throw new errorwrapper.CustomError(this.closeAllBrowsers, err.message);
		}
	}

	/**
	 * Quit all browsers
	 * @author Tan.Ta
	 * @returns {Promise<void>}
	 * @memberof PageBase
	 */
	public async quit(): Promise<void> {
		try {
			await BrowserWrapper.quit();
		} catch (err) {
			throw new errorwrapper.CustomError(this.quit, err.message);
		}
	}

	/**
	 * Refresh page
	 * @author Y.Le
	 * @returns {Promise<void>}
	 * @memberof PageBase
	 */
	public async refreshPage(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Refresh page")
			await BrowserWrapper.refreshPage();
		} catch (err) {
			throw new errorwrapper.CustomError(this.refreshPage, err.message);
		}
	}

	/**
	 * Refresh page
	 * @author Phat TTruong
	 * @returns {Promise<void>}
	 * @memberof PageBase
	 */
	public async maximizePage(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Maximize page")
			await BrowserWrapper.maximize();
		} catch (err) {
			throw new errorwrapper.CustomError(this.maximizePage, err.message);
		}
	}

	/** Getting clipboard content
	 * @author Phat.Truong
	 * @param {string} Text to set to clipboard
	 * @returns {Promise<string>}
	 * 
	 * @memberof PageBase
	 */
	public async setClipboardContent(text: string): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Setting clipboard content");
			let clipboardy = require('clipboardy');
			try {
				await clipboardy.writeSync(text)
			} catch (errClipboard) {
				if (errClipboard.message == "The operation completed successfully.") {
					await clipboardy.writeSync("");
				}
			}

		} catch (err) {
			throw new errorwrapper.CustomError(this.setClipboardContent, err.message);
		}
	}

	/**
	 * Close excess browser
	 * @author Tan.Ta
	 * @returns {Promise<void>}
	 * @memberof PageBase
	 */
	public async closeExcessBrowser(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Closing excess browsers")
			await BrowserWrapper.closeAllBrowser();
			await BrowserWrapper.switchDriverInstance(1);
		} catch (err) {
			throw new errorwrapper.CustomError(this.closeExcessBrowser, err.message);
		}
	}

}