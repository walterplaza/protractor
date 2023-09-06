import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import { ConfigReport } from "@utilities/report-email/config-report";
import { Locator } from "protractor";
import { LGReportTestCaseTempResult } from "@utilities/new-report/lg-reporter";

export namespace errorwrapper {
    class IError extends Error {
        constructor(opt_error?: string) { super(); }
    }

    class WebDriverError extends IError {
        constructor(opt_error?: string) { super(); };
    }

    export class CustomError extends WebDriverError {
        private static getFunctionName(funcName: Function): string {
            return funcName.name;
        }

        constructor(functionName: Function, errorMessage: string) {
            super(errorMessage);
            if (LGReportTestCaseTempResult.errorPictureName == "") {
                let nameOfErrorPicture = (new Date()).getTime().toString()
                LGReportTestCaseTempResult.errorPictureName = nameOfErrorPicture;
                BrowserWrapper.takeScreenShot(nameOfErrorPicture);
            }
            this.message = `${errorMessage} -> Action '${CustomError.getFunctionName(functionName)}'`;
            throw new Error(`${this.message}`);
        }
    }

    export class ElementNotSelectTableError extends WebDriverError {
        constructor(by: Locator) {
            super();
            this.message = `ElementNotSelectTableError - The element ${by} could not be selected.`;
        };
    }

    export class ElementNotVisibleError extends WebDriverError {
        constructor(by: Locator) {
            super();
            this.message = `ElementNotVisibleError - The element ${by} is not visible.`;
        };
    }

    export class InvalidArgumentError extends WebDriverError {
        constructor() {
            super();
            this.message = `InvalidArgumentError - The arguments are either invalid or malformed.`;
        };
    }

    export class InvalidCookieDomainError extends WebDriverError {
        constructor() {
            super();
            this.message = `InvalidCookieDomainError - Error when setting a cookie under a different domain than the current page.`;
        };
    }

    export class InvalidElementCoordinatesError extends WebDriverError {
        constructor() {
            super();
            this.message = `InvalidElementCoordinatesError - The coordinates provided to an interactions operation are invalid.`;
        };
    }

    export class InvalidElementStateError extends WebDriverError {
        constructor(by: Locator) {
            super();
            this.message = `InvalidElementStateError - The element ${by} is in an invalid state.`;
        };
    }

    export class InvalidSelectorError extends WebDriverError {
        constructor() {
            super();
            this.message = `InvalidSelectorError - Argument was an invalid selector.`;
        };
    }

    export class NoSuchSessionError extends WebDriverError {
        constructor() {
            super();
            this.message = `NoSuchSessionError - Session did not exist.`;
        };
    }

    export class JavascriptError extends WebDriverError {
        constructor() {
            super();
            this.message = `JavascriptError - An error occurred while executing JavaScript.`;
        };
    }

    export class MoveTargetOutOfBoundsError extends WebDriverError {
        constructor() {
            super();
            this.message = `MoveTargetOutOfBoundsError - The target for mouse interaction is not in the browser’s viewport and cannot be brought into that viewport.`;
        };
    }

    export class NoSuchAlertError extends WebDriverError {
        constructor() {
            super();
            this.message = `NoSuchAlertError - No alert found `;
        };
    }

    export class NoSuchElementError extends WebDriverError {
        constructor(by: Locator) {
            super();
            this.message = `NoSuchElementError - The element ${by} could not be located on the page.`;
        };
    }

    export class NoSuchFrameError extends WebDriverError {
        constructor(by: Locator) {
            super();
            this.message = `NoSuchFrameError - The frame ${by} could not be found.`;
        };
    }

    export class NoSuchWindowError extends WebDriverError {
        constructor(by: Locator) {
            super();
            this.message = `NoSuchWindowError - The window ${by} could not be found.`;
        };
    }

    export class ScriptTimeoutError extends WebDriverError {
        constructor() {
            super();
            this.message = `ScriptTimeoutError - Script Timeout.`;
        };
    }

    export class SessionNotCreatedError extends WebDriverError {
        constructor() {
            super();
            this.message = `SessionNotCreatedError - A new session could not be created.`;
        };
    }

    export class StaleElementReferenceError extends WebDriverError {
        constructor(by: Locator) {
            super();
            this.message = `StaleElementReferenceError - The element ${by} is no longer attached to the DOM.`;
        };
    }

    export class TimeoutError extends WebDriverError {
        constructor() {
            super();
            this.message = `TimeoutError - Exceeded timeout.`;
        };
    }

    export class UnableToSetCookieError extends WebDriverError {
        constructor() {
            super();
            this.message = `UnableToSetCookieError - A request to set a cookie’s value could not be satisfied.`;
        };
    }

    export class UnableToCaptureScreenError extends WebDriverError {
        constructor() {
            super();
            this.message = `UnableToCaptureScreenError - A screen capture operation was not possible.`;
        };
    }

    export class UnexpectedAlertOpenError extends WebDriverError {
        constructor() {
            super();
            this.message = `UnexpectedAlertOpenError - Unable to open alert dialog.`;
        };
    }

    export class UnknownCommandError extends WebDriverError {
        constructor() {
            super();
            this.message = `UnknownCommandError - The command could not be executed because the remote end is not aware of it.`;
        };
    }

    export class UnknownMethodError extends WebDriverError {
        constructor() {
            super();
            this.message = `UnknownMethodError - The requested command matched a known URL but did not match an method for that URL.`;
        };
    }

    export class UnsupportedOperationError extends WebDriverError {
        constructor() {
            super();
            this.message = `UnsupportedOperationError - Reports an unsupport operation.`;
        };
    }
}