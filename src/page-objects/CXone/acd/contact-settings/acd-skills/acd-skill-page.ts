import SkillsDetailPage from "@page-objects/CXone/acd/contact-settings/acd-skills/skills-detail";
import TopMenu from "@page-objects/CXone/general/top-menu";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class ACDSkillPage extends TopMenu {
    private static _acdSkillPage: ACDSkillPage = null;

    protected txtSearch = new ElementWrapper(by.xpath("//input[@name='ctl00$ctl00$ctl00$BaseContent$Content$ManagerContent$agvsSkills$tbxSearchText']"));
    protected btnSearch = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsSkills_btnSearch']"));
    protected btnEdit = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_btnEdit_ShadowButtonSpan']"));
    protected btnDone = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_btnUpdate_btnMain_ShadowButtonSpan']"));
    protected btnDiscard = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlSkillDetails_btnDiscardChanges_ShadowButtonSpan']"));

    // Dynamic controls
    protected lblSkill(skillName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsSkills_gridView']//td[text()='${skillName}']`));
    }

    constructor() { super(); }

    public static getInstance() {
        // this._acdSkillPage = (this._acdSkillPage == null) ? new ACDSkillPage() : this._acdSkillPage;
        this._acdSkillPage = new ACDSkillPage();
        return this._acdSkillPage;
    }

    /**
     * Select skill in "ACD skills" page
     * @param {string} skillName name of ACD skill
     * @returns {Promise<SkillsDetailPage>} "Skill details" page
     * @memberof ACDSkillPage
     */
    public async selectSkill(skillName: string): Promise<SkillsDetailPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting '${skillName}' skill`);
            await this.txtSearch.type(skillName);
            await this.btnSearch.click();
            await this.waitForSpinnerComponentDisappear();
            await this.lblSkill(skillName).click();
            return SkillsDetailPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectSkill, err.message);
        }
    }

    
}