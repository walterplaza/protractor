import TestRunInfo from "@data-objects/general/test-run-info";
import { ClusterID } from "@data-objects/general/cluster";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export class SchedulingUnit {

    public static generateSchedulingUnitName(): string {
        try {

            let schedulingUnit: string;

            if (TestRunInfo.clusterID == ClusterID.TO31 && TestRunInfo.tenantName == "perm_automation2_to31") {
                schedulingUnit = "perm_automation2_to31";
            } else if (TestRunInfo.clusterID == ClusterID.TO32 && TestRunInfo.tenantName == "perm_autom2_to32") {
                schedulingUnit = "perm_autom2_to32";
            } else if (TestRunInfo.clusterID == ClusterID.SO31 && TestRunInfo.tenantName == "PERM AUTOMATIONSO31 E2E") {
                schedulingUnit = "PERM_AUTOMATIONSO31_E2E";
            } else if (TestRunInfo.clusterID == ClusterID.SO32 && TestRunInfo.tenantName == "PERM AUTOMATIONSO32 E2E") {
                schedulingUnit = "perm_automationso32";
            } else if (TestRunInfo.clusterID == ClusterID.SO31 && TestRunInfo.tenantName == "Perm Automation staging") {
                schedulingUnit = "Perm_Automation_staging (Default)";
            }
            
            return schedulingUnit;
        } catch (err) {
            throw new errorwrapper.CustomError(this.generateSchedulingUnitName, err.message);
        }
    }
}