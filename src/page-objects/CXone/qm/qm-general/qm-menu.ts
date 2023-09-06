import TopMenu from "@page-objects/CXone/general/top-menu";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import TestRunInfo from "@data-objects/general/test-run-info";
import CoachingPlansPage from "@page-objects/CXone/coaching/coaching-plans/coaching-plans-page";
import CoachingPackagePage from "@page-objects/CXone/coaching/coaching-package/coaching-package-page";


export default class QMMenu extends TopMenu {

    private static _QMMenu: QMMenu = null;

    protected btnCoaching = new ElementWrapper(by.xpath("//a[@id='coaching-sub-menu-header']"));
    protected btnCoachingPlans = new ElementWrapper(by.xpath("//a[@id='coachingPlans-link']"));
    protected btnCoachingPackage = new ElementWrapper(by.xpath("//a[@id='coachingPackage-link']"));
    protected pnlExpandedSubItems = new ElementWrapper(by.xpath("//ul[@id='coaching-sub-menu-items' and @class='sub-menu-items ng-scope ng-hide']"));


    public static getInstance(): QMMenu {
        this._QMMenu = new QMMenu();
        return this._QMMenu;
    }

    /**
      * Go to Coaching Plans Page
      * @returns {Promise<CoachingPlansPage>} Coaching Plans Page
      * @memberof QMMenu
      */
    public async gotoCoachingPlansPage(): Promise<CoachingPlansPage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Coaching Plans Page`);
            let subItemExpanded: boolean = await this.pnlExpandedSubItems.isDisplayed(TestRunInfo.shortTimeout);
            if (subItemExpanded) {
                await this.btnCoaching.click();
                await this.btnCoachingPlans.click();
            } else {                
                await this.btnCoachingPlans.click();
            }
            return CoachingPlansPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoCoachingPlansPage, err.message);
        }
    }

    /**
      * Go to Coaching Package Page
      * @author Tuan.Vu
      * @returns {Promise<CoachingPackagePage>} Coaching Package Page
      * @memberof QMMenu
      */
    public async gotoCoachingPackagesPage(): Promise<CoachingPackagePage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Coaching Package Page`);
            let subItemExpanded: boolean = await this.pnlExpandedSubItems.isDisplayed(TestRunInfo.shortTimeout);
            if (subItemExpanded) {
                await this.btnCoaching.click();
                await this.btnCoachingPackage.click();
            } else {                
                await this.btnCoachingPackage.click();
            }

            return CoachingPackagePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoCoachingPlansPage, err.message);
        }
    }
}