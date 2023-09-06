import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { Utility } from "@utilities/general/utility";

export class ChatCustomerInfo {
    firstName: string;
    lastName: string;
    email: string;
    help: string;
    
/**
 * Initialize data for chat customer
 * @returns {ChatCustomerInfo} 
 * @memberof ChatCustomerInfo
 */
public initData(): ChatCustomerInfo {
        try {
            this.firstName = Utility.createRandomString(10, "lgvn");
            this.lastName = Utility.createRandomString(10, 'test');
            this.email = Utility.createRandomString(10, "lgvn_test") + "@gmail.com";
            this.help = "No";
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}