import { Utility } from "@utilities/general/utility";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export class QuickReply {
    title: string;
    keyword: string;
    content: string;

    /**
     * Initialize data for AddressBook
     * @returns {AddressBook}
     * @memberof AddressBook
     */
    public initData(): QuickReply {
        try {
            this.title = "Protractor" + Utility.createRandomString(7);
            this.keyword = "Keyword" + Utility.createRandomString(7);
            this.content = "We are bringing together NICE and inContact solutions to more effectively meet today omnichannel contact center needs with our CXone unified cloud customer experience platform.";
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}