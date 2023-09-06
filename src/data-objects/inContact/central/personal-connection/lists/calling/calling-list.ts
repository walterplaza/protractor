import { Utility } from "@utilities/general/utility";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export class CallingList {
    listName: string;
    skillName: string;
    listCallingFile: string;

    /**
     * Initialize data for CallingList
     * @param {string} skillName
     * @param {string} [listCallingFile]
     * @returns {CallingList}
     * @memberof CallingList
     */
    public initData(skillName: string, listCallingFile?: string): CallingList {
        try {
            let fileCalling = Utility.getPath("src/test-data/inContact/SmokeCallingList.csv");

            if (listCallingFile != null) {
                fileCalling = Utility.getPath(listCallingFile);
            }

            this.listName = Utility.createRandomString(16, "lgvn_");
            this.skillName = skillName;
            this.listCallingFile = fileCalling;
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}