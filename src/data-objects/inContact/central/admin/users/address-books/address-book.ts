import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { Utility } from "@utilities/general/utility";

export enum AddressBookType {
    STANDARD = "Standard",
    DYNAMIC = "Dynamic"
}

export class AddressBook {
    addressBookName: string;
    addressBookType: AddressBookType;

    /**
     * Initialize data for AddressBook
     * @returns {AddressBook}
     * @memberof AddressBook
     */
    public initData(): AddressBook {
        try {
            this.addressBookName = Utility.createRandomString(10, "lgvn");
            this.addressBookType = AddressBookType.STANDARD;
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}

export class AddressBookEntries {
    firstName: string;
    middleName: string;
    lastName: string;
    company: string;
    phone: string;
    mobile: string;
    email: string;

    /**
     * Initialize data for AddressBookEntries
     * @param {string} email
     * @param {string} [middleName]
     * @param {string} [company]
     * @param {string} [phone]
     * @param {string} [mobile]
     * @returns {AddressBookEntries}
     * @memberof AddressBookEntries
     */
    public initData(email: string, middleName?: string, company?: string, phone?: string, mobile?: string): AddressBookEntries {
        try {
            this.firstName = "lgvn";
            this.middleName = middleName;
            this.lastName = Utility.createRandomString(2, "test");
            this.email = email;
            this.company = company;
            this.phone = phone;
            this.mobile = mobile;
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}
