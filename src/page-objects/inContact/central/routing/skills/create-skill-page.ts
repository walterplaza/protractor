import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import SkillsDetailPage from "@page-objects/inContact/central/routing/skills/skills-detail-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";
import { OutBoundCall } from "@data-objects/general/skill-core";

export default class CreateSkillPage extends NavigationBar {

    private static _createSkillPage: CreateSkillPage = null;

    public static getInstance(): CreateSkillPage {
        this._createSkillPage = new CreateSkillPage();
        return this._createSkillPage;
    }

    protected btnCreate = new ElementWrapper(by.xpath("//button[contains(@id,'btnUpdate_btnMain_ShadowButton')]"));
    protected btnCancel = new ElementWrapper(by.xpath("//button[contains(@id,'btnCancel_ShadowButton')]"));
    protected cbbMediaType = new SelectElementWrapper(by.xpath("//select[contains(@id,'ctrlCreateAndEditSkill_lbxMediaType')]"));
    protected txtSkillName = new ElementWrapper(by.xpath("//input[contains(@id,'ctrlCreateAndEditSkill_tbxSkillName')]"));
    protected cbbDirection = new SelectElementWrapper(by.xpath("//select[contains(@id,'ctrlCreateAndEditSkill_ddlDirection')]"));
    protected cbbObStrategy = new SelectElementWrapper(by.xpath("//select[contains(@id,'ctrlCreateAndEditSkill_ddlOutboundStrategy')]"));
    protected cbbCampaign = new SelectElementWrapper(by.xpath("//select[contains(@id,'ctrlCreateAndEditSkill_lbxCampaign')]"));
    protected lblSkillName = new ElementWrapper(by.xpath("//td[contains(text(),'Skill Name')]"));

    // Dynamic controls
    protected lblMediaTypeOption(value: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//select[contains(@id,'ctrlCreateAndEditSkill_lbxMediaType')]//option[text()='${value}']`));
    }

    protected lblDirectionOption(value: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//select[contains(@id,'ctrlCreateAndEditSkill_ddlDirection')]//option[text()='${value}']`));
    }

    protected lblObStrategyOption(value: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//select[contains(@id,'ctrlCreateAndEditSkill_ddlOutboundStrategy')]//option[text()='${value}']`));
    }

    protected lblCampaignOption(value: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//select[contains(@id,'ctrlCreateAndEditSkill_lbxCampaign')]//option[text()='${value}']`));
    }

    protected lblSelectOption(value: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//option[text()='${value}']`));
    }

    /**
    * Fill all fields on Create Skill Page
    * @param {OutBoundCall} skill Skill to create
    * @returns {Promise<CreateSkillPage>}
    * @memberof CreateSkillPage
    */
    public async fillCreateSkillFields(skill: OutBoundCall): Promise<CreateSkillPage> {
        try {
            await Logger.write(FunctionType.UI, "Filling create skill fields");
            await this.cbbMediaType.selectOptionByText(skill.mediaType);
            await this.waitForSpinnerComponentDisappear();
            await this.cbbDirection.selectOptionByText(skill.direction);
            await this.waitForSpinnerComponentDisappear();
            await this.cbbObStrategy.selectOptionByText(skill.obStrategy);
            await this.waitForSpinnerComponentDisappear();
            await this.cbbCampaign.selectOptionByText(skill.campaign);
            await this.waitForSpinnerComponentDisappear();
            await this.txtSkillName.waitForControlStable();
            await this.txtSkillName.type(skill.skillName);
            return await CreateSkillPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillCreateSkillFields, err.message);
        }
    }

    /**
    * Click on Create button
    * @returns {Promise<SkillsDetailPage>}
    * @memberof CreateSkillPage
    */
    public async clickCreateButton(): Promise<SkillsDetailPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking create button");
            await this.btnCreate.click();
            await this.waitForSpinnerComponentDisappear();
            return await SkillsDetailPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickCreateButton, err.message);
        }
    }

    /**
    * Is Create Skill Page displayed?
    * @returns {Promise<boolean>}
    * @memberof CreateSkillPage
    */
    public async isDisplayed(): Promise<boolean> {
        try {
            return await this.btnCreate.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDisplayed, err.message);
        }
    }

    /**
    * Is Media Type Selected?
    * @param {string} mediaType
    * @returns {Promise<boolean>}
    * @memberof CreateSkillPage
    */
    public async isMediaTypeSelected(mediaType: string): Promise<boolean> {
        try {
            return await this.lblMediaTypeOption(mediaType).isSelected();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isMediaTypeSelected, err.message);
        }
    }

    /**
    * Get Skill Name
    * @returns {Promise<string>}
    * @memberof CreateSkillPage
    */
    public async getSkillName(): Promise<string> {
        try {
            return await this.txtSkillName.getControlValue();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillName, err.message);
        }
    }

    /**
    * Is Direction Selected?
    * @param {string} direction Direction
    * @returns {Promise<boolean>}
    * @memberof CreateSkillPage
    */
    public async isDirectionSelected(direction: string): Promise<boolean> {
        try {
            return await this.lblDirectionOption(direction).isSelected();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDirectionSelected, err.message);
        }
    }

    /**
    * Is Campaign Selected?
    * @param {string} campaign Campaign
    * @returns {Promise<boolean>}
    * @memberof CreateSkillPage
    */
    public async isCampaignSelected(campaign: string): Promise<boolean> {
        try {
            return await this.lblCampaignOption(campaign).isSelected();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCampaignSelected, err.message);
        }
    }

    /**
    * Is Outbound Strategy Selected?
    * @param {string} obStrategy: Outbound Strategy
    * @returns {Promise<boolean>}
    * @memberof CreateSkillPage
    */
    public async isOutboundStrategySelected(obStrategy: string): Promise<boolean> {
        try {
            return await this.lblObStrategyOption(obStrategy).isSelected();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isOutboundStrategySelected, err.message);
        }
    }
}
