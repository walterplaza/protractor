import TestRunInfo from "@data-objects/general/test-run-info";
import TopMenu from "@page-objects/CXone/general/top-menu";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
export default class QMSupervisor extends TopMenu {

    private static _qmSupervisor: QMSupervisor = null;

    protected boxPlanStatus = new ElementWrapper(by.xpath("//li[@class='widget-wrapper-container ng-scope gridster-item']//span[@title='Plan Status']"));
    protected btnCoachingPlans = new ElementWrapper(by.xpath("//div[@class='row-content row-data ng-scope'][count(//span[text()='LOW RATED']/parent::div/preceding-sibling::div)]"));
    protected divLowRate = new ElementWrapper(by.xpath("//div[@class='row-content row-header-high ng-scope']/span[text()='LOW RATED']"));
    protected divHighRate = new ElementWrapper(by.xpath("//div[@class='row-content row-header-high ng-scope']/span[text()='HIGH RATED']"));
    protected divAgentInLowRateGroup = new ElementWrapper(by.xpath("//div[@class='row-content row-data ng-scope'][count(//div[@class='row-content row-header-low ng-scope']/preceding-sibling::div)]"))
    protected divTeamGroup = new ElementWrapper(by.xpath("//div[contains(@class,'agent-scoring-widget')]//div[contains(@class,'teams-and-groups-display')]"));

    public static getInstance(): QMSupervisor {
        this._qmSupervisor = new QMSupervisor();
        return this._qmSupervisor;
    }

    protected boxWidget(boxWidgetName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//li[@class='widget-wrapper-container ng-scope gridster-item']//span[@title='${boxWidgetName}']`))
    }

    protected divAgentScoring(index: number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='row-content row-data ng-scope'][count(//span[text()='LOW RATED']/parent::div/preceding-sibling::div)-${index}]/span[@class='agent-score ng-binding']`));
    }

    /**
     * Checking box widget is displayed
     * @author Y.Le
     * @param {string} boxWidgetName
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof QMSupervisor
     */
    public async isBoxWidgetDisplayed(boxWidgetName: string, timeOut?: number): Promise<boolean> {
        try {
            return this.boxWidget(boxWidgetName).isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isBoxWidgetDisplayed, err.message);
        }
    }

    /**
     * Checking High Rate Score Descending
     * @author Tung.Vo
     * @returns {Promise<boolean>}
     * @memberof QMSupervisor
     */
    public async isHighRateScoreDescending(): Promise<boolean> {
        try {
            await Logger.write(FunctionType.UI, "is High Rate score group descending");
            if (await this.divHighRate.isDisplayed()) {
                let i = 1;
                let score: number = 0;
                while (await this.divAgentScoring(i).isDisplayed(TestRunInfo.shortTimeout)) {
                    let tmpScore = parseFloat(await this.divAgentScoring(i).getText());
                    if (tmpScore >= score) {
                        score = tmpScore;
                    } else {
                        return false;
                    }
                    i += 1;
                }
            }
            return true;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isHighRateScoreDescending, err.message);
        }
    }

    /**
     * Checking Low Rate Score Ascending
     * @author Tung.Vo
     * @returns {Promise<boolean>}
     * @memberof QMSupervisor
     */
    public async isLowRateScoreAscending(): Promise<boolean> {
        try {
            await Logger.write(FunctionType.UI, "is Low Rate score group ascending");
            if (await this.divHighRate.isDisplayed()) {
                let i = 0;
                let score: number = 0;
                while (await this.divAgentScoring(i).isDisplayed(TestRunInfo.shortTimeout)) {
                    let tmpScore = parseFloat(await this.divAgentScoring(i).getText());
                    if (tmpScore >= score) {
                        score = tmpScore;
                    } else {
                        return false;
                    }
                    i -= 1;
                }
            }
            return true;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLowRateScoreAscending, err.message);
        }
    }

    /**
     * Are there any agents in low rate group?
     * @author Y.Le
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof QMSupervisor
     */
    public async isAgentDisplayedInLowRateGroup(timeOut?: number): Promise<boolean> {
        try {
            return await this.divAgentInLowRateGroup.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAgentDisplayedInLowRateGroup, err.message);
        }
    }

    /**
     * Checking agent scoring information displayed
     * @author Y.Le
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof QMSupervisor
     */
    public async isAgentScoringInformationDisplayed(timeOut?: number): Promise<boolean> {
        try {
            let exitedTeamGroup: boolean = await this.divTeamGroup.isDisplayed(timeOut);
            let exitedHighRateGroup: boolean = await this.divHighRate.isDisplayed(timeOut);
            let exitedLowRateGroup: boolean = await this.divLowRate.isDisplayed(timeOut);
            return true == exitedTeamGroup == (exitedHighRateGroup || exitedLowRateGroup)
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAgentScoringInformationDisplayed, err.message);
        }
    }
}