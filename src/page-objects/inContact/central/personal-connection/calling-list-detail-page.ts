import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import CallingPage from "@page-objects/inContact/central/personal-connection/calling-page";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class CallingListDetailsPage extends NavigationBar {

    private static _callingListDetailPage: CallingListDetailsPage = null;

    protected dialogConfirmDeactivate = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_divConfirmDeactivate']"));
    protected dialogConfirmDelete = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_divConfirmDelete']"));
    protected btnDeactivate = new ElementWrapper(by.xpath("//button[@id='btnStatusChange_ShadowButton']"));
    protected btnDelete = new ElementWrapper(by.xpath("//button[@id='btnRemoveStatus_ShadowButton']"));
    protected btnDownload = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcCallingListDetails_tpnlCallingListDetails_btnDownload_ShadowButton']"));
    protected btnConfirmDelete = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_btnConfirmDelete_ShadowButton']"));
    protected btnCancelDelete = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_btnConfirmDeleteCancel_ShadowButton']"));
    protected btnConfirmDeactivate = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_btnConfirmDeactivate_ShadowButton']"));
    protected btnCancelDeactivate = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_btnConfirmDeactivateCancel_ShadowButton']"));

    public static getInstance(): CallingListDetailsPage {
        this._callingListDetailPage = new CallingListDetailsPage();
        return this._callingListDetailPage;
    }

    /**
	 * Deactivate calling list
	 * @returns {Promise<CallingPage>} Calling page
	 * @memberof CallingListDetailsPage
	 */
    public async deactivateCallingList(): Promise<CallingPage> {
        try {
            await Logger.write(FunctionType.UI, "Deactivating Calling List");
            await this.btnDeactivate.click();
            await this.dialogConfirmDeactivate.waitForControlStable();
            await this.btnConfirmDeactivate.click();
            await this.dialogConfirmDelete.waitForControlStable();
            await this.btnConfirmDelete.click();
            return CallingPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.deactivateCallingList, err.message);
        }
    }
}