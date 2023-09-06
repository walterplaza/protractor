import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { browser } from "protractor";

describe("Set Cluster'", function () {

    it('Set Cluster', async () => {
        await Logger.write(FunctionType.NONE, `Set cluster: ${browser.params.cluster}`);
        Utility.setCluster(browser.params.cluster);
        Utility.setEnvironment(browser.params.testEnv);
        Utility.setTenant(browser.params.tenantName);
    });
})