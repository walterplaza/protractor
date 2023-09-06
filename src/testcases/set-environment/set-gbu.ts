import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { browser } from "protractor";

describe("Set GBU'", function () {

    it('Set GBU', async () => {
        await Logger.write(FunctionType.NONE, `Set BBU: ${browser.params.gbu}`);
        Utility.setGBU(browser.params.gbu);
    });
})