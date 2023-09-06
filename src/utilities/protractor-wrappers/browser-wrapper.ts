import { Button } from '@data-objects/general/general';
import { Browser } from '@data-objects/general/platform';
import ProjectPath from '@test-data/general/project-path';
import TestBase from '@testcases/test-base';
import { FunctionType, Logger } from '@utilities/general/logger';
import StopWatch from '@utilities/general/stop-watch';
import { errorwrapper } from '@utilities/protractor-wrappers/error-wrapper';
import { ConfigReport } from '@utilities/report-email/config-report';
import { ActionSequence, By, Capabilities, Locator, ProtractorBrowser } from 'protractor';
import hotkeys from "protractor-hotkeys";
import { Condition, ILocation, ISize, promise, WebDriver, WebElementPromise } from 'selenium-webdriver';
import ElementWrapper from './element-wrapper';
let protractor = require("protractor");

export default class BrowserWrapper {

    private static _currentBrowser: ProtractorBrowser;
    private static readonly _browserArray: ProtractorBrowser[] = new Array();

    /**
     * Switch between Drivers Instance
     * @static
     * @param {number} index of Browser Driver
     * @memberof BrowserWrapper
     */
    public static switchDriverInstance(index: number): void {
        try {
            let numberBrowsers: number = BrowserWrapper._browserArray.length;
            if (index > numberBrowsers + 1)
                throw Error(`There are only ${numberBrowsers} driver browser(s), please create new one.`);
            else
                BrowserWrapper._currentBrowser = BrowserWrapper._browserArray[index - 1];
        } catch (err) {
            throw new errorwrapper.CustomError(this.switchDriverInstance, err.message);
        }
    }

    /**
     * Close all browsers
     * @author Tan.Ta
     * @static
     * @returns {Promise<void>}
     * @memberof BrowserWrapper
     */
    public static async  closeAllBrowser(): Promise<void> {
        try {
            let numberBrowsers: number = BrowserWrapper._browserArray.length;
            if (numberBrowsers > 1) {
                for (let i: number = 2; i <= numberBrowsers; i++) {
                    this.switchDriverInstance(i);
                    await BrowserWrapper.quit();
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.closeAllBrowser, err.message);
        }
    }

    /**
     * Fork new Driver Instance
     * @static
     * @memberof BrowserWrapper
     */
    public static createDriverInstance(): void {
        try {
            if (BrowserWrapper._browserArray.length != 0)
                BrowserWrapper._browserArray.push(BrowserWrapper._browserArray[0].forkNewDriverInstance());
        } catch (err) {
            throw new errorwrapper.CustomError(this.createDriverInstance, err.message);
        }
    }

    /**
     * 
     * @static
     * @returns {ProtractorBrowser}
     * @memberof BrowserWrapper
     */
    public static getDriverInstance(): ProtractorBrowser {
        try {
            if (BrowserWrapper._browserArray.length == 0) {
                BrowserWrapper._currentBrowser = protractor.browser;
                BrowserWrapper._browserArray.push(BrowserWrapper._currentBrowser);
                return BrowserWrapper._currentBrowser;
            } else {
                return BrowserWrapper._currentBrowser;
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDriverInstance, err.message);
        }
    }

    /**
    * Get number of all window handles
    * @static
    * @returns {Promise<string[]>} number of window handles
    * @memberof BrowserWrapper
    */
    public static async getAllWindowHandles(): Promise<string[]> {
        try {
            return await BrowserWrapper.getDriverInstance().getAllWindowHandles();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAllWindowHandles, err.message);
        }
    }

    /**
     * Switch window by index
     * @static
     * @param {number} index index of selected window which start from 0
     * @returns {Promise<void>} 
     * @memberof BrowserHelper
     */
    public static async switchWindow(index: number): Promise<void> {
        try {
            let currentBrowser: ProtractorBrowser = BrowserWrapper.getDriverInstance();
            let allWindowHandles: string[] = await currentBrowser.getAllWindowHandles();
            await currentBrowser.switchTo().window(allWindowHandles[index]);
            await this.switchToDefaultContent();
        } catch (err) {
            throw new errorwrapper.CustomError(this.switchWindow, err.message);
        }
    }

    /**
     * Get and return total of open windows
     * @static
     * @returns {Promise<number>} number of open windows
     * @memberof BrowserHelper
     */
    public static async getTotalWindows(): Promise<number> {
        try {
            return (await BrowserWrapper.getDriverInstance().getAllWindowHandles()).length;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTotalWindows, err.message);
        }
    }

    /**
     * Get current window handle string
     * @static
     * @returns {Promise<string>} window handle
     * @memberof BrowserWrapper
     */
    public static async getNewWindowHandle(): Promise<string> {
        try {
            let allWindowHandles: string[] = await this.getAllWindowHandles();
            return allWindowHandles[allWindowHandles.length - 1];
        } catch (err) {
            throw new errorwrapper.CustomError(this.getNewWindowHandle, err.message);
        }
    }

    /**
     * Switch to window by window handle
     * @static
     * @param handle input window handle for switching window
     * @returns {Promise<void>}
     * @memberof BrowserWrapper
     */
    public static async switchWindowByHandle(handle: string): Promise<void> {
        try {
            await BrowserWrapper.getDriverInstance().switchTo().window(handle);
        } catch (err) {
            throw new errorwrapper.CustomError(this.switchWindowByHandle, err.message);
        }
    }

    /**
    * Switch to window by window title
    * @author Tan.Ta
    * @static
    * @param title input title for switching window
    * @returns {Promise<void>}
    * @memberof BrowserWrapper
    */
    public static async switchWindowByTitle(title: string): Promise<void> {
        try {

            let TestRunInfo = require(`@data-objects/general/test-run-info`).default;
            let stopTime: number = 0;
            let stopWatch = new StopWatch();
            let allHandles: string[] = await this.getAllWindowHandles();
            stopWatch.startClock();

            for (let handle of allHandles) {

                await this.switchWindowByHandle(handle);
                let titleHandle = await BrowserWrapper.getDriverInstance().getTitle();

                while (titleHandle == "" && stopTime <= TestRunInfo.middleTimeout) {
                    titleHandle = await BrowserWrapper.getDriverInstance().getTitle();
                    await this.sleepInSecond(1);
                    stopTime = stopWatch.getElapsedTimeInSecond();
                }

                if (titleHandle == title) {
                    break;
                }
            }

        } catch (err) {
            throw new errorwrapper.CustomError(this.switchWindowByTitle, err.message);
        }
    }

    /**
     * Check window is displayed or not
     * @param {string} window Window want to check
     * @returns {Promise<boolean>} the existence of window
     * @memberof BrowserWrapper
     */
    public static async isWindowHandleDisplayed(windowHandle: string): Promise<boolean> {
        try {
            let allWindowHandles: string[] = await this.getAllWindowHandles();
            let state: boolean = false;

            for (let i: number = 0; i < allWindowHandles.length; i++) {
                if (windowHandle == allWindowHandles[i]) {
                    state = true;
                }
            }

            return state;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isWindowHandleDisplayed, err.message);
        }
    }

    /**
     * Open URL in new tab
     * @static
     * @param url URL want to navigate
     * @returns {Promise<number>} index of tab
     * @memberof BrowserWrapper
     */
    public static async openNewTab(url: string): Promise<string> {
        try {
            let windowHandle: string;
            let allWindowHandles: string[] = await this.getAllWindowHandles();
            await this.executeScript("window.open();");
            await BrowserWrapper.waitForNumberOfWindows(allWindowHandles.length + 1);
            let newWindowHandles: string[] = await this.getAllWindowHandles();
            windowHandle = (allWindowHandles.filter(x => !newWindowHandles.toString().includes(x)).concat(newWindowHandles.filter(x => !allWindowHandles.toString().includes(x)))).toString();
            await this.switchWindowByHandle(windowHandle);
            await this.get(url);
            return windowHandle;
        } catch (err) {
            throw new errorwrapper.CustomError(this.openNewTab, err.message);
        }
    }

    /**
     * Set Page load timeout
     * @static
     * @param {number} [timeoutInSecond] Time out to wait for page load
     * @returns {Promise<void>}
     * @memberof BrowserWrapper
     */
    public static async setPageLoadTimeout(timeoutInSecond?: number): Promise<void> {
        try {
            let TestRunInfo = require(`@data-objects/general/test-run-info`).default

            if (timeoutInSecond == null)
                timeoutInSecond = TestRunInfo.pageTimeout;

            await BrowserWrapper.getDriverInstance().manage().timeouts().pageLoadTimeout(timeoutInSecond * 1000);
        } catch (err) {
            throw new errorwrapper.CustomError(this.setPageLoadTimeout, err.message);
        }
    }

    /**
     * Switch to default content
     * @static
     * @returns {Promise<void>} 
     * @memberof BrowserHelper
     */
    public static async switchToDefaultContent(): Promise<void> {
        try {
            await BrowserWrapper.getDriverInstance().switchTo().defaultContent();
        } catch (err) {
            throw new errorwrapper.CustomError(this.switchToDefaultContent, err.message);
        }
    }

    /**
     * Maximize the browser window
     * @static
     * @returns {Promise<BrowserWrapper>} maximized window
     * @memberof BrowserWrapper
     */
    public static async maximize(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Maximizing window`);
            await BrowserWrapper.getDriverInstance().manage().window().maximize();
        } catch (err) {
            throw new errorwrapper.CustomError(this.maximize, err.message);
        }
    }

    /**
     * Navigate to URL
     * @static
     * @param {string} url want to navigate to 
     * @returns {Promise<BrowserWrapper>} 
     * @memberof BrowserWrapper
     */
    public static async get(url: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Navigating to ${url}`);
            let currentBrowser: ProtractorBrowser = await BrowserWrapper.getDriverInstance();
            await currentBrowser.waitForAngularEnabled(false);
            await currentBrowser.get(url);
            await currentBrowser.waitForAngularEnabled(false);
        } catch (err) {
            throw new errorwrapper.CustomError(this.get, err.message);
        }
    }

    /** 
     * Wait for number of windows opens
     * @static
     * @param {number} expectedNumberOfWindows number of windows want to open
     * @param {number} [timeout=this._pageTimeout] maximum time to wait 
     * @returns {Promise<BrowserWrapper>} 
     * @memberof BrowserWrapper
     */
    public static async waitForNumberOfWindows(expectedNumberOfWindows: number, timeOut?: number): Promise<void> {
        try {
            let TestRunInfo = require(`@data-objects/general/test-run-info`).default
            let crWindows: number = await this.getTotalWindows();
            let step: number = 1;
            if (timeOut == null)
                timeOut = TestRunInfo.pageTimeout;

            while (expectedNumberOfWindows != crWindows) {
                await this.sleepInSecond(step);
                timeOut = timeOut - step;
                crWindows = await this.getTotalWindows();

                if (timeOut < 0) {
                    throw new errorwrapper.TimeoutError();
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForNumberOfWindows, err.message);
        }
    }

    /**
     * Close all browsers
     * @static
     * @returns {Promise<void>} 
     * @memberof BrowserWrapper
     */
    public static async quit(): Promise<void> {
        try {
            await BrowserWrapper.getDriverInstance().quit();
        } catch (err) {
            throw new errorwrapper.CustomError(this.quit, err.message);
        }
    }

    /**
     * Restart browser
     * @static
     * @param {boolean} [waitForAngularEnabled=false] wait for angular enabled mode
     * @returns {Promise<void>} 
     * @memberof BrowserWrapper
     */
    public static async restart(waitForAngularEnabled: boolean = false): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Restarting browser`);
            let currentBrowser: ProtractorBrowser = BrowserWrapper.getDriverInstance();
            await currentBrowser.restart();
            BrowserWrapper._browserArray.length = 0;
            currentBrowser = BrowserWrapper.getDriverInstance();
            await currentBrowser.waitForAngularEnabled(waitForAngularEnabled);
        } catch (err) {
            throw new errorwrapper.CustomError(this.restart, err.message);
        }
    }

    /**
     * Restart All browser
     * @static
     * @param {boolean} [waitForAngularEnabled=false] wait for angular enabled mode
     * @returns {Promise<void>} 
     * @memberof BrowserWrapper
     */
    public static async restartAllBrowsers(waitForAngularEnabled: boolean = false): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Restarting browser`);

            let numberBrowsers: number = BrowserWrapper._browserArray.length;
            let currentBrowser: ProtractorBrowser;
            if (numberBrowsers != 1) {
                for (let i: number = 1; i <= numberBrowsers; i++) {
                    BrowserWrapper._currentBrowser = BrowserWrapper._browserArray[i - 1];
                    currentBrowser = BrowserWrapper.getDriverInstance();
                    await currentBrowser.restart();
                    currentBrowser = BrowserWrapper.getDriverInstance();
                    await currentBrowser.waitForAngularEnabled(waitForAngularEnabled);
                }
            }

            currentBrowser = BrowserWrapper.getDriverInstance();
            await currentBrowser.restart();
            BrowserWrapper._browserArray.length = 0;
            currentBrowser = BrowserWrapper.getDriverInstance();
            await currentBrowser.waitForAngularEnabled(waitForAngularEnabled);
        } catch (err) {
            throw new errorwrapper.CustomError(this.restartAllBrowsers, err.message);
        }
    }

    /**
     * Get capabilities of browser
     * @static
     * @returns {Promise<Capabilities>}
     * @memberof BrowserWrapper
     */
    public static async getCapabilities(): Promise<Capabilities> {
        try {
            return await BrowserWrapper.getDriverInstance().getCapabilities();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCapabilities, err.message);
        }
    }

    /**
     * Execute script
     * @static
     * @param {(string | Function)} script script to execute
     * @param {...any[]} var_args input argument
     * @returns {Promise<{}>} 
     * @memberof BrowserWrapper
     */
    public static async executeScript(script: string | Function, ...var_args: any[]): Promise<{}> {
        try {
            return await BrowserWrapper.getDriverInstance().executeScript(script, var_args);
        } catch (err) {
            throw new errorwrapper.CustomError(this.executeScript, err.message);
        }
    }

    /**
     * Switch to target frame
     * @static
     * @param {number} index index of frame
     * @returns {Promise<void>} expected frame
     * @memberof BrowserWrapper
     */
    public static async switchToFrame(index: number): Promise<void> {
        try {
            await BrowserWrapper.getDriverInstance().switchTo().frame(index);
        } catch (err) {
            throw new errorwrapper.CustomError(this.switchToFrame, err.message);
        }
    }

    /**
     * Switch to target frame by id
     * @author Tan.Ta
     * @static
     * @param {number} index index of frame
     * @returns {Promise<void>} expected frame
     * @memberof BrowserWrapper
     */
    public static async switchToFrameById(id: string): Promise<void> {
        try {
            let webElement: WebElementPromise = BrowserWrapper.getDriverInstance().findElement(By.id('id'));
            await BrowserWrapper.getDriverInstance().switchTo().frame(webElement);
        } catch (err) {
            throw new errorwrapper.CustomError(this.switchToFrameById, err.message);
        }
    }

    /**
     * Wait for alert to be presented
     * @param {number} [timeoutInSecond=this._elementTimeout] maximum time to wait 
     * @returns {Promise<this>} 
     * @memberof BrowserWrapper
     */
    public static async waitForAlertDisplay(): Promise<void> {
        try {
            await BrowserWrapper.getDriverInstance().wait(protractor.ExpectedConditions.alertIsPresent());
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForAlertDisplay, err.message);
        }
    }

    /**
     * Check alert is presented
     * @returns {Promise<boolean>} 
     * @memberof BrowserWrapper
     */
    public static async isAlertDisplay(): Promise<boolean> {
        try {
            return protractor.ExpectedConditions.alertIsPresent();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAlertDisplay, err.message);
        }
    }

    /**
     * Accept alert popup
     * @param {number} [timeoutInSecond=this._elementTimeout] maximum time to wait 
     * @returns {Promise<this>} 
     * @memberof BrowserWrapper
     */
    public static async acceptAlert(): Promise<void> {
        try {
            await BrowserWrapper.getDriverInstance().switchTo().alert().accept();
        } catch (err) {
            throw new errorwrapper.CustomError(this.acceptAlert, err.message);
        }
    }

    /**
     * Close browser
     * @static
     * @returns {Promise<void>} 
     * @memberof BrowserWrapper
     */
    public static async close(): Promise<void> {
        try {
            await BrowserWrapper.getDriverInstance().close();
        } catch (err) {
            throw new errorwrapper.CustomError(this.close, err.message);
        }
    }

    /**
     * Scroll to Top
     * @static
     * @returns {Promise<void>} 
     * @memberof BrowserWrapper
     */
    public static async scrollToTop(): Promise<void> {
        try {
            await this.executeScript("window.scrollTo(0, 0);");
        } catch (err) {
            throw new errorwrapper.CustomError(this.scrollToTop, err.message);
        }
    }

    /**
     * Sleep in second
     * @static
     * @returns {Promise<void>} 
     * @memberof BrowserWrapper
     */
    public static async sleepInSecond(second: number): Promise<void> {
        try {
            await BrowserWrapper.getDriverInstance().sleep(second * 1000);
        } catch (err) {
            throw new errorwrapper.CustomError(this.sleepInSecond, err.message);
        }
    }

    /**
     * Press hotkey on keyboard
     * @param {string} button button want to press
     * @returns {Promise<void>} 
     * @memberof BrowserWrapper
     */
    public static async pressKey(button: Button): Promise<void> {
        try {
            let TestRunInfo = require(`@data-objects/general/test-run-info`).default;

            if (TestRunInfo.browser == Browser.IE || TestRunInfo.browser == Browser.EDGE) {
                await this.executeScript("document.activeElement.blur();");
                await this.sleepInSecond(2); // Need to sleep 2 seconds due to issue on IE
            }

            await hotkeys.trigger(button);

            if (TestRunInfo.browser == Browser.IE || TestRunInfo.browser == Browser.EDGE) {
                await this.sleepInSecond(2); // Need to sleep 2 seconds due to issue on IE
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.pressKey, err.message);
        }
    }

    /**
     * Schedules a command to wait for a condition to hold. The condition may be
     * specified by a {@link Condition}, as a custom function, or
     * as a {@link promise.Promise}.
     * @static 
     * @param {WebElementCondition} condition The condition to 
     * wait on, defined as a promise, condition object, or  a function to
     * evaluate as a condition.
     * @param {number} [opt_timeout] How long to wait for the condition to be true.
     * @param {string} [opt_message] An optional message to use if the wait times out.
     * @returns {WebElementPromise} A promise that will be fulfilled
     * with the first truthy value returned by the condition function, or
     * rejected if the condition times out.
     * @memberof BrowserWrapper
     */
    public static wait<T>(condition: PromiseLike<T> | Condition<T> | ((driver: WebDriver) => T | PromiseLike<T>) | Function, opt_timeout?: number, opt_message?: string): promise.Promise<T> {
        try {
            return BrowserWrapper.getDriverInstance().wait(condition, opt_timeout, opt_message);
        } catch (err) {
            throw new errorwrapper.CustomError(this.wait, err.message);
        }
    }

    /**
     * Find all elements by locator
     * @param {Locator} locator of elements
     * @returns {Array<ElementWrapper>} 
     */
    public static async getElements(locator: Locator): Promise<Array<ElementWrapper>> {
        try {
            let arr = await BrowserWrapper.getDriverInstance().element.all(locator);

            let arrWrapper = new Array<ElementWrapper>();
            for (let i = 0; i < arr.length; i++) {
                arrWrapper.push(new ElementWrapper(arr[i]));
            }

            return arrWrapper;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getElements, err.message);
        }
    }

    /**
     * Creates a new action sequence using this driver. The sequence will not be
     * scheduled for execution until {@link actions.ActionSequence#perform} is
     * called
     * @author Phat.Ngo
     * @static
     * @returns {ActionSequence}
     * @memberof BrowserWrapper
     */
    public static getActions(): ActionSequence {
        try {
            return BrowserWrapper.getDriverInstance().actions();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getActions, err.message);
        }
    }

    /**
     * Setting wait for angular enabled
     * @author Y.Le
     * @static
     * @param {boolean} waitForAngularEnabled
     * @returns {Promise<void>}
     * @memberof BrowserWrapper
     */
    public static async settingWaitForAngularEnabled(waitForAngularEnabled: boolean): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Setting wait for angular enabled");
            let currentBrowser: ProtractorBrowser = await BrowserWrapper.getDriverInstance();
            await currentBrowser.waitForAngularEnabled(waitForAngularEnabled);
        } catch (err) {
            throw new errorwrapper.CustomError(this.settingWaitForAngularEnabled, err.message);
        }
    }

    /**
     * This method will try to slowly resize window as a user would do. It will not immediately resize window which will lead to missing-bug case.
     * @author Thanh Le 
     * @static
     * @param {number} [width=null] expected width
     * @param {number} [height=null] expected height
     * @returns {Promise<void>}
     * @memberof BrowserWrapper
     */
    public static async setSize(width: number = null, height: number = null): Promise<void> {
        try {
            let currentBrowser: ProtractorBrowser = BrowserWrapper.getDriverInstance();
            let crSize = await this.getSize();
            let cr_width = crSize.width;
            let cr_height = crSize.height;
            let max_steps = 20;

            height = (height == null) ? cr_height : height;
            width = (width == null) ? cr_width : width;

            let a_width_step = Math.abs((cr_width - width) / max_steps);
            let a_height_step = Math.abs((cr_height - height) / max_steps);

            a_width_step = (cr_width < width) ? a_width_step : (-1 * a_width_step);
            a_height_step = (cr_height < height) ? a_height_step : (-1 * a_height_step);
            while (max_steps > 0) {
                cr_width += a_width_step;
                cr_height += a_height_step;
                await currentBrowser.driver.manage().window().setSize(cr_width, cr_height);

                max_steps--;
            }

            await currentBrowser.driver.manage().window().setSize(width, height);

        } catch (err) {
            throw new errorwrapper.CustomError(this.setSize, err.message);
        }
    }

    /**
    * Refresh page
    * @author Tan.Ta
    * @static 
    * @returns {Promise<void>}
    * @memberof BrowserWrapper
    */
    public static async refreshPage(): Promise<void> {
        try {
            let currentBrowser: ProtractorBrowser = BrowserWrapper.getDriverInstance();
            await this.executeScript("location.reload();");
            await currentBrowser.switchTo().alert().then(async (alert) => {
                await this.acceptAlert();
            },
                () => { }
            );
        } catch (err) {
            throw new errorwrapper.CustomError(this.refreshPage, err.message);
        }
    }


    /**
     * Getting Size of current window
     * @author Y.Le
     * @static
     * @returns {Promise<ISize>}
     * @memberof BrowserWrapper
     */
    public static async getSize(): Promise<ISize> {
        try {
            return await BrowserWrapper.getDriverInstance().driver.manage().window().getSize();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSize, err.message)
        }
    }

    /**
     * Setting wait for angular enabled
     * @author Y.Le
     * @static
     * @param {string} url want to navigate to 
     * @returns {Promise<BrowserWrapper>} 
     * @memberof BrowserWrapper
     */
    public static async waitForAngularEnabled(enabled?: boolean): Promise<void> {
        try {
            let currentBrowser: ProtractorBrowser = await BrowserWrapper.getDriverInstance();
            await currentBrowser.waitForAngularEnabled(enabled);
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForAngularEnabled, err.message);
        }
    }

    /** Getting selected text
     * @author Y.Le
     * @static
     * @returns {Promise<string>}
     * @memberof BrowserWrapper
     */
    public static async getSelectedText(): Promise<string> {
        try {
            return <string>await this.executeScript("return window.getSelection().toString()");
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSelectedText, err.message);
        }
    }

    /** set session storage
     * @author Nhat.Nguyen
     * @static
     * @returns {Promise<void>}
     * @memberof BrowserWrapper
     */
    public static async setSessionStorage(authToken: string, refreshToken: string): Promise<void> {
        try {
            let isCentral: string = <string>await this.executeScript("return window.IsCentral");
            let authBaseUrl: string = <string>await this.executeScript("return window.AuthBaseUrl");
            let niceBaseUrl: string = <string>await this.executeScript("return window.niceBaseUrl");
            let incontactBaseUrl: string = <string>await this.executeScript("return window.incontactBaseUrl");

            await this.executeScript(`sessionStorage.setItem('max_authToken','${authToken}')`);
            await this.executeScript(`sessionStorage.setItem('max_isCentral','"${isCentral}"')`);
            await this.executeScript(`sessionStorage.setItem('max_refreshToken','${refreshToken}')`);
            await this.executeScript(`sessionStorage.setItem('max_urls','{"authBaseUrl":"${authBaseUrl}","niceBaseUrl":"${niceBaseUrl}","incontactBaseUrl":"${incontactBaseUrl}"}')`);
        } catch (err) {
            throw new errorwrapper.CustomError(this.setSessionStorage, err.message);
        }
    }

    /** clear session storage
    * @author Nhat.Nguyen
    * @static
    * @returns {Promise<void>}
    * @memberof BrowserWrapper
    */
    public static async clearSessionStorage(): Promise<void> {
        try {
            await this.executeScript(`sessionStorage.clear();`);
        } catch (err) {
            throw new errorwrapper.CustomError(this.clearSessionStorage, err.message);
        }
    }


    /**
     * Wait for new window is opening
     * @author Huy.Nguyen
     * @static 
     * @returns {Promise<string>}
     * @memberof BrowserWrapper
     */
    public static async waitForNewTabIsOpening(): Promise<string> {
        try {
            let windowHandle: string;
            let allWindowHandles: string[] = await this.getAllWindowHandles();
            await BrowserWrapper.waitForNumberOfWindows(allWindowHandles.length + 1);
            let newWindowHandles: string[] = await this.getAllWindowHandles();
            windowHandle = (allWindowHandles.filter(x => !newWindowHandles.toString().includes(x)).concat(newWindowHandles.filter(x => !allWindowHandles.toString().includes(x)))).toString();
            await this.switchWindowByHandle(windowHandle);
            return windowHandle;
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForNewTabIsOpening, err.message);
        }
    }

    /**
     * Take screenshot of browser
     * @static
     * @param {string} nameOfPic
     * @memberof BrowserWrapper
     */
    public static takeScreenShot(nameOfPic: string): void {
        try {
            let fs = require('fs-extra');
            if (!fs.existsSync(`${ProjectPath.conf}/test/reports/screenshots/` + nameOfPic + '.png')) {
                BrowserWrapper.getDriverInstance().takeScreenshot().then(function (png) {
                    if (png == null || png == undefined) {
                        png = "";
                    }
                    let fs = require('fs-extra');
                    let stream = fs.createWriteStream(`${ProjectPath.conf}/test/reports/screenshots/` + nameOfPic + '.png');
                    stream.write(Buffer.from(png, 'base64'));
                    stream.end();
                });
            }
        } catch (err) {
            console.log(`Error when take screen shot with error: ${err}`)
        }
    }

    /**
     * Move mouse
     *
     * Mouse move   
     * @author Chinh.Nguyen
     * @static
     * @param {ILocation} opt_offset
     * @returns {Promise<void>}
     * @memberof BrowserWrapper
     */
    public static async mouseMove(opt_offset: ILocation): Promise<void> {
        try {
            let currentBrowser: ProtractorBrowser = await BrowserWrapper.getDriverInstance();
            await currentBrowser.actions().mouseMove(opt_offset).perform();
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForAngularEnabled, err.message);
        }
    }

}
