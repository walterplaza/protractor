import { JsonProperty } from "json2typescript";

export class XrayJiraTestInfo {
    @JsonProperty("ProjectKey", String)
    ProjectKey: string = undefined;
    @JsonProperty("TestPlanKey", String)
    TestPlanKey: string = undefined;
    @JsonProperty("TestSetKey", String)
    TestSetKey: string = undefined;
    @JsonProperty("TestCaseKey", String)
    TestCaseKey: string = undefined;
    @JsonProperty("Cluster", String)
    Cluster: string = undefined;
    @JsonProperty("Browser", String)
    Browser: string = undefined;
    @JsonProperty("GBU", String)
    GBU: string = undefined;
    @JsonProperty("TenantName", String)
    TenantName: string = undefined;
    @JsonProperty("TestAgent", String)
    TestAgent: string = undefined;
    @JsonProperty("TestExecutionKey", String)
    TestExecutionKey: string = undefined;
    @JsonProperty("TestExecutionTitle", String)
    TestExecutionTitle: string = undefined;
    @JsonProperty("Version", String)
    Version: string = undefined;
    @JsonProperty("Revision", String)
    Revision: string = undefined;
    @JsonProperty("Release", String)
    Release: string = undefined;
}