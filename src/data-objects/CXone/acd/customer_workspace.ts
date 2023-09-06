import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export class CustomerWorkspace {
    label: string;
    url: string;

    public initData(label: string, url: string): CustomerWorkspace {
        try {
            this.label = label;
            this.url = url;
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}