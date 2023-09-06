import TestRunInfo from "@data-objects/general/test-run-info";
import { QuickReply } from "@data-objects/inContact/central/admin/communication/quick-replies/quick-reply";
import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import { SkillCore } from "@data-objects/general/skill-core";
import { SkillType } from "@data-objects/general/skill-core";
import { Browser } from "@data-objects/general/platform";

export default class QuickRepliesPage extends NavigationBar {

    private static _quickRepliesPage: QuickRepliesPage = null;

    protected tblQuickReplies = new ElementWrapper(by.xpath("//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsQuickReply_gridView']"));

    protected btnCreateNew = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsQuickReply_btnCreateNewInAdvancedGridView_ShadowButton']"));
    protected btnCreatQuickReply = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_ManagerContent_btnSend_ShadowButton']"));
    protected btnCancel = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_ManagerContent_btnCancel_ShadowButton']"));
    protected btnAddSkill = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcQuickReplyDetails_tpnlQuickReplySkills_ctrlQuickReplySkills_btnAddSkills_ShadowButton']"));
    protected btnSearch = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcQuickReplyDetails_tpnlQuickReplySkills_ctrlQuickReplySkills_gsUnassigned_btnSearch_ShadowButton']"));
    protected btnDelete = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcQuickReplyDetails_tpnlQuickReplyDetails_btnDelete_btnMain_ShadowButton']"));
    protected btnYes = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcQuickReplyDetails_tpnlQuickReplyDetails_btnDelete_btnConfirmOk_ShadowButton']"));
    protected txtTitle = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_ManagerContent_ctrlCreateAndEditQuickReplyControl_txtTitle']"));
    protected txtKeyword = new ElementWrapper(by.xpath("//textarea[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_ManagerContent_ctrlCreateAndEditQuickReplyControl_txtKeywords']"));
    protected txtContent = new ElementWrapper(by.xpath("//body[@id='tinymce']"));
    protected txtSearchBox = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcQuickReplyDetails_tpnlQuickReplySkills_ctrlQuickReplySkills_gsUnassigned_tbSearchCriteria']"));
    protected tabDetail = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcQuickReplyDetails_tpnlQuickReplyDetails_tab']"));
    protected tabSkill = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcQuickReplyDetails_tpnlQuickReplySkills_tab']"));
    protected tabAuditHistory = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcQuickReplyDetails_body']"));
    protected ifrmQuickReplyContent = new ElementWrapper(by.xpath("//iframe[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_ManagerContent_ctrlCreateAndEditQuickReplyControl_txtContent_ifr']"));
    protected iSidebar = new ElementWrapper(by.xpath("//i[@class='icon-sidebar_toggle']"));
    protected tblAddSkills = new ElementWrapper(by.xpath("//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcQuickReplyDetails_tpnlQuickReplySkills_ctrlQuickReplySkills_GridView2']"))

    // Dynamic controls
    protected tbrQuickReply(skill: string) {
        return new ElementWrapper(by.xpath(`//table[contains(@id,'tcQuickReplyDetails_tpnlQuickReplySkills_ctrlQuickReplySkills_GridView1')]//td[text()='${skill}']`));
    }

    protected chkQuickReplyDetail(searchString: string) {
        return new ElementWrapper(by.xpath(`//td[text()='${searchString}']/preceding-sibling::td/span[@class='checkbox']/input`));
    }
    protected lblQuickReply(title: string) {
        return new ElementWrapper(by.xpath(`//span[text()='${title}']`));
    }

    public static getInstance(): QuickRepliesPage {
        this._quickRepliesPage = new QuickRepliesPage();
        return this._quickRepliesPage;
    }

    protected tbrCellQuickReply(rowIndex: number, cellIndex: number) {
        return new ElementWrapper(by.xpath(`//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsQuickReply_gridView']//tr[${rowIndex}]/td[${cellIndex}]`));
    }

    /**
	 * Create new quick reply
     * @author Tuan.Vu
	 * @returns {Promise<QuickRepliesPage>}
	 * @memberof QuickRepliesPage
	 */
    public async createQuickReply(quickReply: QuickReply): Promise<QuickRepliesPage> {
        try {
            await Logger.write(FunctionType.UI, `Creating new quick reply`);
            if (TestRunInfo.browser == Browser.IE) {
                await this.iSidebar.click();
                await this.btnCreateNew.waitForControlStable();
            }
            await this.btnCreateNew.scrollToElement();
            await this.btnCreateNew.click();
            await this.txtTitle.type(quickReply.title);
            await this.txtKeyword.click();
            await this.txtKeyword.type(quickReply.keyword);
            await this.ifrmQuickReplyContent.waitForVisibilityOf();
            await this.ifrmQuickReplyContent.switchToFrame();
            await this.txtContent.click();
            await this.txtContent.type(quickReply.content);
            await BrowserWrapper.switchToDefaultContent();
            await this.btnCreatQuickReply.scrollToElement();
            await this.btnCreatQuickReply.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.createQuickReply, err.message);
        }
    }

    /**
	 * Assign quick reply to chat skill
     * @author Tuan.Vu
     * @param {SkillType} skillType skill name
     * @param {search} boolean Option to use search box to search for skill
	 * @returns {Promise<QuickRepliesPage>}
	 * @memberof QuickRepliesPage
	 */
    public async assignQuickReplyToSkill(...skillType: SkillType[]): Promise<QuickRepliesPage> {
        try {
            await Logger.write(FunctionType.UI, `Assigning quick reply to Skill`);
            await this.tabSkill.click();
            for (let skillName of skillType) {
                await BrowserWrapper.sleepInSecond(2);
                let skill: string = SkillCore.getSkillName(skillName);
                if (TestRunInfo.browser == Browser.IE) {
                    await this.iSidebar.click();
                }
                let previousTblHeight: string = await this.tblAddSkills.getCssValue("height");
                await this.txtSearchBox.type(skill);
                await this.btnSearch.waitForVisibilityOf();
                await this.btnSearch.wait();
                await this.btnSearch.click();
                let currentTblHeight: string = await this.tblAddSkills.getCssValue("height");
                let i: number = 0;
                let j: number = 0;

                while (previousTblHeight == currentTblHeight && i <= TestRunInfo.shortTimeout) {
                    await BrowserWrapper.sleepInSecond(1);
                    currentTblHeight = await this.tblAddSkills.getCssValue("height");
                    i++;
                }

                await this.chkQuickReplyDetail(skill).waitForPresenceOf();
                await this.chkQuickReplyDetail(skill).waitForControlStable();
                await this.chkQuickReplyDetail(skill).setCheckBox(true);

                let isSelected: boolean = await this.chkQuickReplyDetail(skill).isSelected();

                while (isSelected == false && j <= TestRunInfo.shortTimeout) {
                    await BrowserWrapper.sleepInSecond(1);
                    j++;
                }

                await this.btnAddSkill.waitForControlStable();
                await this.btnAddSkill.scrollToElement();
                await this.btnAddSkill.moveMouse();
                await this.btnAddSkill.click();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.assignQuickReplyToSkill, err.message);
        }
    }

    /** 
     * Check quick reply is assigned to skill
     * @author Tuan.Vu
     * @param {string} skill
     * @returns {Promise<boolean>}
     * @memberof QuickRepliesPage
     */
    public async isQuickReplyAssignedToSkill(skillType: SkillType): Promise<boolean> {
        try {
            let skillName: string = SkillCore.getSkillName(skillType);
            return await this.tbrQuickReply(skillName).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isQuickReplyAssignedToSkill, err.message);
        }
    }

    /** 
      * Delete quick reply
      * @author Tuan.Vu
      * @param {quickReplyTitle} string Quick reply title
      * @returns {Promise<QuickRepliesPage>}
      * @memberof QuickRepliesPage
     */
    public async deleteQuickReply(quickReplyTitle: string): Promise<QuickRepliesPage> {
        try {
            await Logger.write(FunctionType.UI, `Deleting quick reply ${quickReplyTitle}`);
            await this.lblQuickReply(quickReplyTitle).click();
            await this.btnDelete.click();
            await this.btnYes.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteQuickReply, err.message);
        }
    }

    /** 
     * Clean up all quick replies if abt
     * @author Tuan.Vu
     * @param {quickReplyTitle} string Quick reply title
     * @returns {Promise<QuickRepliesPage>}
     * @memberof QuickRepliesPage
    */
    public async cleanUpQuickReplies(): Promise<QuickRepliesPage> {
        try {
            await Logger.write(FunctionType.UI, `Cleaning up quick replies`)

            while (await this.tbrCellQuickReply(2, 1).isDisplayed(TestRunInfo.middleTimeout)) {
                await this.tbrCellQuickReply(2, 1).click();
                await this.btnDelete.click();
                await this.btnYes.click();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.cleanUpQuickReplies, err.message);
        }
    }
}