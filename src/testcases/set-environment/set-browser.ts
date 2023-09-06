import { Utility } from "@utilities/general/utility";
import { browser } from "protractor";

describe("Set Chrome Browser", function () {

    it('Set Chrome Browser', async () => {
        Utility.setBrowser(browser.params.browser);
    });

})
