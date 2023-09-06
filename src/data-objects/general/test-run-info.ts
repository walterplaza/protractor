import { Agent } from '@data-objects/general/agent';
import { APIVersion, Cluster, ClusterID, Environment } from '@data-objects/general/cluster';
import { ConfigInfo } from '@data-objects/general/config';
import { clusterArray } from '@test-data/general/cluster-info';
import { JsonUtility } from '@utilities/general/utility';
import { errorwrapper } from '@utilities/protractor-wrappers/error-wrapper';
import fs from 'fs';

export default class TestRunInfo {
    static browser: string;
    static clusterID: ClusterID;
    static environment: Environment;
    static tenantName: string;
    static gbu: string;
    static cluster: Cluster;
    static elementTimeout: number;
    static pageTimeout: number;
    static testTimeout: number;
    static timeout: number;
    static shortTimeout: number;
    static middleTimeout: number;
    static longTimeout: number;
    static conditionTimeout: number;
    static agentList: Array<Agent> = new Array();
    static versionAPI: APIVersion;
    static apiTestCasesID: Array<string> = [];

    /**
     * Get cluster information
     * @param {ClusterID} id cluster id
     * @returns {Cluster} result information of cluster
     * @memberof Clusters
     */
    private static getCluster(clusters: Cluster[], id: ClusterID): Cluster {
        try {
            let result: Cluster;

            if (TestRunInfo.environment.match(Environment.INCONTACT)) {
                for (let i = 0; i < clusters.length; i++) {
                    if (clusters[i].id == "inC") {
                        if (clusters[i].gbu == TestRunInfo.gbu) {
                            result = clusters[i];
                            break;
                        }
                    }
                }
            } else if (TestRunInfo.environment.match(Environment.CXONE)) {

                for (let i = 0; i < clusters.length; i++) {
                    if (clusters[i].id == id.toString()) {
                        if (clusters[i].tenantName == TestRunInfo.tenantName) {
                            result = clusters[i];
                            break;
                        }
                    }
                }
            } else if (TestRunInfo.environment.match(Environment.USERHUB)){
                for (let i = 0; i < clusters.length; i++) {
                    if (clusters[i].id == id.toString()) {
                        if (clusters[i].gbu == TestRunInfo.gbu) {
                            result = clusters[i];
                            break;
                        }
                    }
                }
            }
            return result;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCluster, err.message);
        }
    }

    /**
     * Setup test run information to execute test case
     * @static
     * @param {string} jsonPath
     * @memberof TestRunInfo
     */
    public static setUpTestRunInfo(jsonPath: string): void {
        try {
            let jsonString: string = fs.readFileSync(jsonPath, 'utf8');
            let configData: ConfigInfo = JsonUtility.deserialize(JSON.parse(jsonString), ConfigInfo);
            TestRunInfo.clusterID = <ClusterID>configData.clusterId;
            TestRunInfo.environment = <Environment>configData.environment;
            TestRunInfo.tenantName = <string>configData.tenantName;
            TestRunInfo.gbu = <string>configData.gbu;
            TestRunInfo.browser = configData.browser.toLocaleLowerCase();
            TestRunInfo.cluster = this.getCluster(JsonUtility.deserializeArray(clusterArray, Cluster), TestRunInfo.clusterID);
            TestRunInfo.elementTimeout = configData.elementTimeout;
            TestRunInfo.timeout = 60;
            TestRunInfo.shortTimeout = TestRunInfo.timeout / 12;
            TestRunInfo.middleTimeout = TestRunInfo.timeout / 4;
            TestRunInfo.longTimeout = TestRunInfo.timeout / 2;
            TestRunInfo.pageTimeout = configData.pageTimeout;
            TestRunInfo.testTimeout = configData.testTimeout;
            TestRunInfo.conditionTimeout = configData.testTimeout / 2;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setUpTestRunInfo, err.message);
        }
    }
}