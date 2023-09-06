import { ClusterID } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export class Forecast {

    public static generateForecasterName(): string {
        try {
            let forecasterName: string;

            if (TestRunInfo.clusterID == ClusterID.TO31 && TestRunInfo.tenantName == "perm_automation2_to31") {
                forecasterName = "Forecastingto31";
            } else if (TestRunInfo.clusterID == ClusterID.TO32 && TestRunInfo.tenantName == "perm_autom2_to32") {
                forecasterName = "TO32Forecast";
            } else if (TestRunInfo.clusterID == ClusterID.SO31 && TestRunInfo.tenantName == "PERM AUTOMATIONSO31 E2E") {
                forecasterName = "ForecastingSO31";
            } else if (TestRunInfo.clusterID == ClusterID.SO32 && TestRunInfo.tenantName == "PERM AUTOMATIONSO32 E2E") {
                forecasterName = "ForecastingSO32";
            }

            return forecasterName;
        } catch (err) {
            throw new errorwrapper.CustomError(this.generateForecasterName, err.message);

        }
    }
}