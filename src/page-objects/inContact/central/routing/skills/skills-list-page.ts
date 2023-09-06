import { Browser } from "@data-objects/general/platform";
import { OutBoundCall, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import CreateSkillPage from "@page-objects/inContact/central/routing/skills/create-skill-page";
import SkillsDetailPage from "@page-objects/inContact/central/routing/skills/skills-detail-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class SkillsListPage extends NavigationBar {

    private static _skillsListPage: SkillsListPage = null;

    public static getInstance(): SkillsListPage {
        this._skillsListPage = new SkillsListPage();
        return this._skillsListPage;
    }

    protected btnCreateNew = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsSkills_divCreateNew']"));
    protected lnkSingleSkill = new ElementWrapper(by.xpath("//li[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsSkills_liSingleSkill']"));
    protected tblSkill = new ElementWrapper(by.xpath("//table[contains(@id,'agvsSkills_gridView')]"));
    protected txtSearchSkill = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsSkills_tbxSearchText']"));
    protected btnSearchSkill = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsSkills_btnSearch']"));
    protected btnClearSearchSkill = new ElementWrapper(by.xpath("//input[contains(@id,'BaseContent_Content_ManagerContent_agvsSkills_btnClearSearch')]"));

    // Dynamic controls
    protected tbrSkill(skillName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsSkills_gridView']//td[span[text()='${skillName}'] or text()='${skillName}']`));
    }

    protected tbrSkillFf(skillName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsSkills_gridView']//tr[./td[span[text()='${skillName}'] or text()='${skillName}']]/td[@class='skillNameExtraWidth']`));
    }

    /**
    * Click on Create New button to go to Create Skill Page
    * @returns {Promise<CreateSkillPage>}
    * @memberof CreateSkillPage
    */
    public async createNewSkill(): Promise<CreateSkillPage> {
        try {
            await Logger.write(FunctionType.UI, "Creating new skill");

            await this.btnCreateNew.click();
            await this.lnkSingleSkill.click();
            return CreateSkillPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.createNewSkill, err.message);
        }
    }

    /**
    * Is Skill List Page displayed?
    * @returns {Promise<boolean>}
    * @memberof SkillsListPage
    */
    public async isDisplayed(): Promise<boolean> {
        try {
            return await this.tblSkill.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDisplayed, err.message);
        }
    }

    /**
    * Go to skill detail
    * @returns {Promise<SkillsDetailPage>}
    * @memberof SkillsDetailPage
    */
    public async selectSkillDetail(skillType: SkillType): Promise<SkillsDetailPage> {
        try {
            let skillName: string = SkillCore.getSkillName(skillType);

            await Logger.write(FunctionType.UI, `Selecting ${skillName} skill`);
            if (await this.btnClearSearchSkill.isDisplayed(TestRunInfo.shortTimeout)) {
                await this.btnClearSearchSkill.click();
                await this.btnClearSearchSkill.waitUntilDisappear(TestRunInfo.shortTimeout);
                await this.waitForSpinnerComponentDisappear();
            }
            await this.txtSearchSkill.type(skillName);
            await this.btnSearchSkill.click();
            await this.waitForSpinnerComponentDisappear();
            if (TestRunInfo.browser == Browser.FIREFOX) {
                await this.tbrSkillFf(skillName).click();
            } else {
                await this.tbrSkill(skillName).click();
            }
            return await SkillsDetailPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectSkillDetail, err.message);
        }
    }

    /**
    * Create New skill if skill not exist
    * @author Nhat.Nguyen
    * @returns {Promise<SkillsDetailPage>}
    * @memberof SkillsListPage
    */
    public async createPCSkillIfSkillNotExist(skill: OutBoundCall, skillType: SkillType, timeoutInSecond?: number): Promise<SkillsDetailPage> {
        try {
            let skillName: string = SkillCore.getSkillName(skillType);
            await this.searchSkill(skillName);
            let isSkillExist: boolean = await this.tbrSkill(skillName).isDisplayed(timeoutInSecond);
            if (!isSkillExist) {

                let createSkillPage: CreateSkillPage = await this.createNewSkill();
                await createSkillPage.fillCreateSkillFields(skill);
                await createSkillPage.clickCreateButton();
            }
            else {
                await this.tbrSkill(skillName).click();
            }
            return await SkillsDetailPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.createPCSkillIfSkillNotExist, err.message);
        }
    }

    /**
    * Search Skill Name
    * @returns {Promise<SkillsListPage>}
    * @memberof SkillsListPage
    */
    public async searchSkill(skillName: string): Promise<SkillsListPage> {
        try {
            await Logger.write(FunctionType.UI, `Searching ${skillName} skill`);
            if (await this.btnClearSearchSkill.isDisplayed(TestRunInfo.shortTimeout)) {
                await this.btnClearSearchSkill.click();
                await this.btnClearSearchSkill.waitUntilDisappear(TestRunInfo.shortTimeout);
                this.waitForPageLoad();
                this.waitForSpinnerComponentDisappear();
            }
            await this.txtSearchSkill.type(skillName);
            await this.btnSearchSkill.click();
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchSkill, err.message);
        }
    }
}