import RulesListPage from "@page-objects/CXone/wfi/rules/rule-list-page";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import TopMenu from "@page-objects/CXone/general/top-menu";
import ProjectPath from "@test-data/general/project-path";

export default class WFIMenu extends TopMenu {

    private static _WFIMenu: WFIMenu = null;

    protected btnRules = new ElementWrapper(by.xpath("//a[@id='RuleList']"));

    public static getInstance(): WFIMenu {
        this._WFIMenu = new WFIMenu();
        return this._WFIMenu;
    }

	/**
      * Go to rule list page
      * @returns {Promise<RulesListPage>} rule Page
      * @memberof WFIMenu
      */
    public async gotoRuleListPage(): Promise<any> {
        try {
            await Logger.write(FunctionType.UI, `Going to Rule List Page`);
            await this.btnRules.click();
            let rulePage = require(`${ProjectPath.pageObjects}/CXone/wfi/rules/rule-list-page`).default;
            return rulePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoRuleListPage, err.message);
        }
    }

}