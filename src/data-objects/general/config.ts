import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class ConfigInfo {
    @JsonProperty("clusterId", String)
    clusterId: string = undefined;
    @JsonProperty("environment", String)
    environment: string = undefined;
    @JsonProperty("tenantName", String)
    tenantName: string = undefined;
    @JsonProperty("gbu", String)
    gbu: string = undefined;
    @JsonProperty("browser", String)
    browser: string = undefined;
    @JsonProperty("elementTimeout", Number)
    elementTimeout: number = undefined;
    @JsonProperty("pageTimeout", Number)
    pageTimeout: number = undefined;
    @JsonProperty("testTimeout", Number)
    testTimeout: number = undefined;
}