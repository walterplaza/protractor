import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from '@utilities/protractor-wrappers/element-wrapper';
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import InteractionPlayer from '@page-objects/CXone/general/cxone-player';
import TopMenu from '@page-objects/CXone/general/top-menu';

export default class SelfAssessment extends TopMenu {
    private static _selfAssessment: SelfAssessment = null;
    public static getInstance(): SelfAssessment {
        this._selfAssessment = new SelfAssessment();
        return this._selfAssessment;
    }

    protected lblSelfAssessmentTitlePage = new ElementWrapper(by.xpath("//div[contains(@class,'self-assessment-page')]//h1[text()='Self Assessments']"));
    protected btnAwaiting = new ElementWrapper(by.xpath("//div[@class='ag-body-container']/div[1]//span[text()='Awaiting']"));

    /**
     * Is Self Assessment Displayed
     * @author Nhat.Nguyen
     * @param {number} [timeOutInSecond]
     * @returns {Promise<boolean>}
     * @memberof SelfAssessment
     */
    public async isSelfAssessmentDisplayed(timeOutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblSelfAssessmentTitlePage.isDisplayed(timeOutInSecond);
        } catch (error) {
            throw new errorwrapper.CustomError(this.isSelfAssessmentDisplayed, error.message);
        }
    }

    /**
     * click Awaiting Button
     * @author Nhat.Nguyen
     * @returns {Promise<InteractionPlayer>}
     * @memberof SelfAssessment
     */
    public async clickAwaitingButton(): Promise<InteractionPlayer> {
        try {
            await Logger.write(FunctionType.UI, "Clicking awaiting button");
            await this.btnAwaiting.click();
            return InteractionPlayer.getInstance();
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.clickAwaitingButton, err.message);
        }
    }
}