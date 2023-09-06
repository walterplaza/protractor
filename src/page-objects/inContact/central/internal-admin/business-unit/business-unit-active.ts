import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import ProjectPath from "@test-data/general/project-path";

export default class InternalBusinessUnitActive {

    private static _internalBusinessUnitActive: InternalBusinessUnitActive = null;

    public static getInstance(): InternalBusinessUnitActive {
        this._internalBusinessUnitActive = new InternalBusinessUnitActive();
        return this._internalBusinessUnitActive;
    }

    protected btnCreateNew = new ElementWrapper(by.xpath("//button[contains(@id,'agvsBusinessUnits_btnCreateNewInAdvancedGridView_ShadowButton')]"));
    protected btxSearch = new ElementWrapper(by.xpath("//input[contains(@id,'agvsBusinessUnits_tbxSearchText')]"));
    protected btnSearchIcon = new ElementWrapper(by.xpath("//input[contains(@id,'agvsBusinessUnits_btnSearch')]"));

    // Dynamic controls
    protected lblBusinessUnitItem(busNo: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[contains(@id,'BaseContent_Content_ManagerContent_agvsBusinessUnits_GridViewControl')]//td[text()='${busNo}']`));
    }

    /**
     * Going to specific point of contact by nae and default skill
     * @param {string} busNo Business Unit number
     * @returns {Promise<any>} 
     * @memberof InternalBusinessUnitActive
     */
    public async openSpecificBusinessUnit(busNo: string): Promise<any> {
        try {
            Logger.write(FunctionType.UI, "Opening a specific business unit");
            await this.lblBusinessUnitItem(busNo).click();
            let detailTabPage = require(`${ProjectPath.pageObjects}/inContact/central/internal-admin/business-unit/business-unit-detail-tab-page`).default;
            return detailTabPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.openSpecificBusinessUnit, err.message);
        }
    }
}