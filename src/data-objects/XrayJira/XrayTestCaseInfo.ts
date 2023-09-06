import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export class XrayTestCaseInfo {
    testKey: string;
    start: string;
    finish: string;
    comment: string;
    status: string;

    /**
     *
     *
     * @param {string} testKeyID
     * @param {string} startTime
     * @param {string} finishTime
     * @param {string} comment
     * @param {string} status
     * @returns {XrayTestCaseInfo}
     * @memberof XrayTestCaseInfo
     */
    public initData(testKeyID: string, startTime: string, finishTime: string, comment: string, status: string): XrayTestCaseInfo {
        try {
            this.testKey = testKeyID;
            this.start = startTime;
            this.finish = finishTime;
            this.comment = comment;
            this.status = status;
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}
