import CustomAPIs from "@apis/custom-apis";
import { RuleSkill } from "@data-objects/CXone/wfi/rules/rule-info";
import { Agent } from "@data-objects/general/agent";
import { MaxConnectOption, MaxState } from "@data-objects/general/cluster";
import { Button, CoordinateType, State } from "@data-objects/general/general";
import { AgentReportOption, ContactLabel, ContactName, MAXWorkspaceSize, TimeRangeOption, TransferTab } from "@data-objects/general/max";
import { Browser } from "@data-objects/general/platform";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { ButtonTitle } from "@data-objects/inContact/max/max-workitem";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import MaxMoreToolsPage from "@page-objects/inContact/max/max-more-tools-page";
import MaxSMSPage from "@page-objects/inContact/max/max-sms-page";
import MaxSchedulePopUp from "@page-objects/inContact/max/max-toolbar/max-schedule";
import MaxVoiceMailPage from "@page-objects/inContact/max/max-voicemail";
import MaxWorkItemPage from "@page-objects/inContact/max/max-workitem-page";
import PageBase from '@page-objects/page-base';
import ProjectPath from "@test-data/general/project-path";
import { FunctionType, Logger } from '@utilities/general/logger';
import StopWatch from '@utilities/general/stop-watch';
import { Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { ILocation, ISize, Key } from "selenium-webdriver";
import { by } from "protractor";

export default class MaxPage extends PageBase {

	private static _maxPage: MaxPage = null;

	protected dlgInitializeSoftPhone = new ElementWrapper(by.xpath("//div[@class='dialog-contents']/h1[text()='Initializing Softphone']"));
	protected divSpinner = new ElementWrapper(by.xpath("//div[@id='index-loading-spinner']"));
	protected divMaxWrapper = new ElementWrapper(by.xpath("//div[@id='uimanager_container']"));
	protected btnStateSection = new ElementWrapper(by.xpath("//div[@id='agentStateSection']//div[@class='state-body']//span[@class='current-state']"));
	protected btnConfirmLogoutMAX = new ElementWrapper(by.xpath("//button[@class='confirm-button'][text()='Log out'or text()= 'Yes']"));
	protected divStateBar = new ElementWrapper(by.xpath("//div[@class='state-bar']"));
	protected divMaxLaunchForm = new ElementWrapper(by.xpath("//div[@class='set-station-container']"));
	protected lblDialogMessage = new ElementWrapper(by.xpath("//div[@class='dialog-contents']/div[@class='dialog-message']"));
	protected dlgMaxNotification = new ElementWrapper(by.xpath("//div[@id='dialogSection']//div[@class='dialog-contents']"));
	protected btnAcceptForceLogout = new ElementWrapper(by.xpath("//div[@class='dialog-contents']//button[@class='confirm-button']"));
	protected btnNew = new ElementWrapper(by.xpath("//div[@id='toolBarSection']//button[@data-button-type='new-contact']"));
	protected btnMore = new ElementWrapper(by.xpath("//div[@id='toolBarSection']//button[@data-button-type='more']"));
	protected btnSetting = new ElementWrapper(by.xpath("//li[@data-button-type='settings']"));
	protected btnADAHighContrast = new ElementWrapper(by.xpath("//li[@data-button-type='AdaHighContrast']"));
	protected btnPanels = new ElementWrapper(by.xpath("//li[@data-button-type='Panels']"));
	protected btnOutboundEmail = new ElementWrapper(by.xpath("//div[@class='clickthrough-content new']//li[@data-media-type='email']"));
	protected btnOutboundCall = new ElementWrapper(by.xpath("//div[@class='clickthrough-content new']//li[@data-media-type='call']"));
	protected btnCall = new ElementWrapper(by.xpath("//div[@class='advanced-address-book-search-ui advancedaddressbooksearchui']//button[@class='call']"));
	protected txtSearchAddress = new ElementWrapper(by.xpath("//div[@class='popover-panel advanced-address-book-ui']//input[@aria-label='Phone number or search term']"));
	protected dlgAddNew = new ElementWrapper(by.xpath("//div[@class='popover-panel new-media-panel']"))
	protected lblMAXNextState = new ElementWrapper(by.xpath("//div[@data-state='InboundContact|nextAway']//span[@class='next-state']"));
	protected lblMAXNextOutState = new ElementWrapper(by.xpath("//span[@class='next-out-state']"));
	protected lblPersonalQueueContact = new ElementWrapper(by.xpath("//div[@class='personal-queue-container']//li[@class='personal-queue-template']"));
	protected lblOutboundPhoneQueue = new ElementWrapper(by.xpath("//div[@class='phone-outbound-queue']"));
	protected lblInboundPhoneQueue = new ElementWrapper(by.xpath("//div[@class='phone-inbound-queue']"));
	protected lblInboundChatQueue = new ElementWrapper(by.xpath("//div[@class='chat-inbound-queue']"));
	protected lblInboundEmailQueue = new ElementWrapper(by.xpath("//div[@class='email-inbound-queue']"));
	protected lblInboundVoiceMailQueue = new ElementWrapper(by.xpath("//div[@class='voicemail-inbound-queue']"));
	protected lblInboundWorkItemQueue = new ElementWrapper(by.xpath("//div[@class='workitem-inbound-queue']"));
	protected lblAgentLegStatus = new ElementWrapper(by.xpath("//div[@id='agentLegSection']//span[@class='status-text ellipsis']"));
	protected lblPopupPhoneContactName = new ElementWrapper(by.xpath("//div[@class='contact-accept-container']//div[@class='contact-label']"));
	protected icoIbPhone = new ElementWrapper(by.xpath("//*[name()='svg'][@class='phone-inbound-svg injected-svg phone-inbound-icon icon']"));
	protected pnlCallWorkspace = new ElementWrapper(by.xpath("//div[@id='workspace']//div[contains(@id,'callcontactui') and contains(@id,'container')]"));
	protected pnlVoiceMailWorkspace = new ElementWrapper(by.xpath("//div[@id='workspace']//div[@class='voice-mail voicemailcontactui']"));
	protected pnlEmailWorkspace = new ElementWrapper(by.xpath("//div[@id='emailWorkspace']//div[@class='email-contact-ui emailcontactui']"));
	protected icoStatus = new ElementWrapper(by.xpath("//div[@class='state-bar']/div[@class='icon-status']"));
	protected pnlGlanceWorkspace = new ElementWrapper(by.xpath("//div[@class='glance-workspace']"));
	protected pnlModuleContainer = new ElementWrapper(by.xpath("//div[@id='uimanager_container']"));
	protected pnlColorlessBorder = new ElementWrapper(by.xpath("//div[@class='accept-body-colorless']"));
	protected lblADAHighContrastStatus = new ElementWrapper(by.xpath("//li[@data-button-type='AdaHighContrast']/span[@class='right settings-value']"));
	protected lblPanelsStatus = new ElementWrapper(by.xpath("//li[@data-button-type='Panels']/span[@class='right settings-value']"));
	protected lblTimeActiveDuration = new ElementWrapper(by.xpath("//ul[@class='call-history-item-list']//span[@class='time active duration']"));
	protected icoCallHistoryOutbound = new ElementWrapper(by.xpath("//ul[@class='call-history-item-list']//*[name()='svg'][contains(@class,'phone-outbound')]"));
	protected icoCallHistoryInbound = new ElementWrapper(by.xpath("//ul[@class='call-history-item-list']//*[name()='svg'][contains(@class,'phone-inbound')]"));
	protected lblNoContactHistory = new ElementWrapper(by.xpath("//div[@class='call-history-container']/span[@class='empty-call-history']"));
	protected lblOutState = new ElementWrapper(by.xpath("//span[@class='current-out-state']"));
	protected lblState = new ElementWrapper(by.xpath("//span[@class='current-state']"));
	protected btnAccept = new ElementWrapper(by.xpath("//button[@class='accept']"));
	protected btnReject = new ElementWrapper(by.xpath("//button[@class='reject']"));
	protected newContactPopUp = new ElementWrapper(by.xpath("//div[@class='contact-accept-container']"));
	protected btnEndChat = new ElementWrapper(by.xpath("//button[@class = 'end-contact']"));
	protected btnConfirmEndChatContact = new ElementWrapper(by.xpath("//button[@class='confirm-end-contact']"));
	protected btnSaveCloseButton = new ElementWrapper(by.xpath("//button[@class='save-close-acw-submit submit']"));
	protected btnBackArrow = new ElementWrapper(by.xpath("//div[@class='popover-panel more-panel']//div[@class='clickthrough-back']"));
	protected callWorkingSpace = new ElementWrapper(by.xpath("//div[@id='contactContainer']"));
	protected workItemWorkSpace = new ElementWrapper(by.xpath("//div[@class='work-item-section']"));
	protected emailWorkingSpace = new ElementWrapper(by.xpath("//div[@id='emailworkspaceui-0']//div[@class='email-contact-ui emailcontactui' and @data-status='Active']//div[@id='email-container']"));
	protected voiceMailWorkingSpace = new ElementWrapper(by.xpath("//div[@class='workspace']//div[@id='voice-mail-container']"));
	protected btnMaxSchedule = new ElementWrapper(by.xpath("//button[@data-button-type='schedule']"));
	protected popAddressBook = new ElementWrapper(by.xpath("//div[@class='popover-panel advanced-address-book-ui']"));
	protected resultListOBEmail = new ElementWrapper(by.xpath("//ul[@class='result-list']"));
	protected pnlColorlessBorderOfChat = new ElementWrapper(by.xpath("//div[@class='accept-body-colorless']"));
	protected icoActiveCallContact = new ElementWrapper(by.xpath("//div[@id='callGlanceSection']/div[@id='callcontactglanceui-0_container']"));
	protected icoActiveEmailContact = new ElementWrapper(by.xpath("//div[@id='emailGlanceSection']//div[@class='media-icon-shade']/*[name()='svg']"));
	protected icoCustomerContactCard = new ElementWrapper(by.xpath("//div[@id='contactAcceptSection']//div[@class='contact-info']//*[name()='svg']"));
	protected ddlSkill = new ElementWrapper(by.xpath("//div[@class='search-content']//ul[@aria-required='false']"));
	protected icoChatInbound = new ElementWrapper(by.xpath("//div[@id='chatGlanceSection']//*[name()='svg'][contains(@class,'chat-inbound-icon')]"));
	protected lblACWTime = new ElementWrapper(by.xpath("//span[@class='acw-time']"));
	protected pnlChatWorkspace = new ElementWrapper(by.xpath("//div[@class='chat-contact-ui chatcontactui']"));
	protected pnlMore = new ElementWrapper(by.xpath("//div[@class='popover-panel more-panel']"));
	protected icoChatInBoundContact = new ElementWrapper(by.xpath("//div[contains(@id,'contactglanceui')]//*[name()='svg'][@class='chat-inbound-svg injected-svg chat-inbound-icon icon']"));
	protected icoInboundPhoneContact = new ElementWrapper(by.xpath("//div[contains(@id,'callcontactglanceui')]//*[name()='svg'][@class='injected-svg contact-icon enabled']"));
	protected icoChatInfo = new ElementWrapper(by.xpath("//div[@id='chat-container']//*[name()='svg'][@class='injected-svg contact-icon enabled']"));
	protected icoInboundPhoneInfo = new ElementWrapper(by.xpath("//div[@class='call-contact-body-ui']//div[@class='primary-info']/*[name()='svg']"));
	protected icoChatSummary = new ElementWrapper(by.xpath("//div[@id='chatcontactsummaryui-0']//*[name()='svg'][@class='injected-svg contact-icon enabled']"));
	protected btnNewDisabled = new ElementWrapper(by.xpath("//button[@class='tiny secondary disabled' and ./div[text()='New']]"));
	protected pnlQuickReplies = new ElementWrapper(by.xpath("//div[@title='Quick Replies']/ancestor::div[@class='contact-panel-wrapper'][@data-open='true']"));
	protected btnForward = new ElementWrapper(by.xpath("//div[@class='email-header-section']//button[@class='forward']"));
	protected btnExpandQuickReplies = new ElementWrapper(by.xpath("//button[@class='contact-panel-toggle']"));
	protected btnInsertQuickReply = new ElementWrapper(by.xpath("//div[@class='quick-reply-detail']//button[@class='left insert-button' or @class='insert-button' or @class='send-button' ]"));
	protected btnInsertQuickReplyChat = new ElementWrapper(by.xpath("//div[@class='quick-reply-detail']//button[@class='send-button']"));
	protected btnCancelQuickReply = new ElementWrapper(by.xpath("//div[@class='quick-reply-detail']//button[@class='right cancel-button' or @class='cancel-button']"));
	protected pnlQuickReplySection = new ElementWrapper(by.xpath("//div[@class='quick-replies-section']"));
	protected btnAgentReport = new ElementWrapper(by.xpath("//button[contains(@class , 'agent-report')]"));
	protected icoSelectAssignedSkills = new ElementWrapper(by.xpath("//li[@class = 'main-list-item skills']/div[@class='right link-icon']"));
	protected icoFavoriteAssignedSkills = new ElementWrapper(by.xpath("//div[@class='item-list-container clickthrough-container skills-panel']//div[@class = 'favorite icon']"));
	protected btnBackAssignedSkillsMaster = new ElementWrapper(by.xpath("//div[@class='item-list-container clickthrough-container skills-panel']//div[@class = 'clickthrough-back skills-back']"));
	protected txtSearchQuickReplies = new ElementWrapper(by.xpath("//div[@class='quick-replies-section']//input[@class='search-input']"));
	protected pnlAgentReports = new ElementWrapper(by.xpath("//div[@class='popover-panel main-panel']"));
	protected pnlAgentReportsHeader = new ElementWrapper(by.xpath("//header[@class='item-list-title clickthrough-title ellipsis' and @title='Agent Reports']/parent::div[@class='item-list-header clickthrough-header']"));
	protected pnlPerformanceOption = new ElementWrapper(by.xpath("//li[@class='main-list-item performance']"));
	protected pnlProductivityOption = new ElementWrapper(by.xpath("//li[@class='main-list-item productivity']"));
	protected pnlAssignSkillsOption = new ElementWrapper(by.xpath("//li[@class='main-list-item skills']"));
	protected lblNoRecentCall = new ElementWrapper(by.xpath("//span[@title='You have no recent calls logged.']"));
	protected lblPersonalQueueHeader = new ElementWrapper(by.xpath("//div[@class='personal-queue-background']//h2[@title='Personal Queue']"));
	protected lblComingUpHeader = new ElementWrapper(by.xpath("//div[@class='personal-queue-background']//h2[@title='Coming Up']"));
	protected lblCallHistoryHeader = new ElementWrapper(by.xpath("//div[@class='personal-queue-background']//h2[@title='Call History']"));
	protected lblACWName = new ElementWrapper(by.xpath("//span[@class='acw-name']"));
	protected lblSkillNameOfContactPopup = new ElementWrapper(by.xpath("//div[@class='contact-info']//span[@class='skill-name']"));
	protected btnClose = new ElementWrapper(by.xpath("//button[@class='confirm-button']"));
	protected pnlErrorDialog = new ElementWrapper(by.xpath("//h1[@title='Client initialization error']"));
	protected btnAcceptCallContact = new ElementWrapper(by.xpath("//div[contains(@id,'contactacceptui')]//button[@title='Accept']"));
	protected tblPerformance = new ElementWrapper(by.xpath("//div[@class='item-list-container clickthrough-container performance-panel']//table[@class='performance-table']"));
	protected pnlMaxGlanceOverlay = new ElementWrapper(by.xpath("//div[@class='glance glance-overlay']"));
	protected pnlAssignedSkillsPanel = new ElementWrapper(by.xpath("//div[@class='popover-panel main-panel'][@data-current-context='Skills']"));
	protected lblTimeDurationPopUp = new ElementWrapper(by.xpath("//span[@class='duration contact-timer']"));
	protected lblTimeState = new ElementWrapper(by.xpath("//div[@class='state-time']"));
	protected pnlSelectSkill = new ElementWrapper(by.xpath("//div[@class='selectmenu-text' and text()='Choose a skill']"));
	protected plnNew = new ElementWrapper(by.xpath("//div[@class='advancedaddressbookui']/div[@class='popover-panel advanced-address-book-ui']"));
	protected smsWorkingSpace = new ElementWrapper(by.xpath("//div[@id='chatWorkspace']//div[@class='chat-contact-ui chatcontactui']"));
	protected pnlScreenPops = new ElementWrapper(by.xpath("//div[@class='contact-panel-wrapper' or @class='contact-panel-tab-wrapper'][./div[@class='contact-panel-tab']]"));
	protected lblScreenPopsPanel = new ElementWrapper(by.xpath("//div[@class='contact-panel-wrapper' or @class='contact-panel-tab-wrapper']//div[@class='contact-panel-tab-title']"));
	protected btnQuickReplies = new ElementWrapper(by.xpath("//div[@class='contact-panel-wrapper']//div[@class='contact-panel-tab-title'][@title='Quick Replies']"));
	protected pnlPageActionPage = new ElementWrapper(by.xpath("//div[@class='contact-panel-wrapper' or @class='contact-panel-tab-content-wrapper']//div[@class='contact-panel-tab-content']"));
	protected ifmPageActionPage = new ElementWrapper(by.xpath("//div[@class='contact-panel-wrapper' or @class='contact-panel-tab-content-wrapper']//div[@class='contact-panel-tab-content']//*[name()='iframe']"));
	protected btnPageActionPageNextButton = new ElementWrapper(by.xpath("//body//form[@name='form1']//input[@class='nav_button'and @value='Next']"));
	protected dispositionTimer = new ElementWrapper(by.xpath("//div[@class='auxiliary-timer']"));
	protected lblCustomerName = new ElementWrapper(by.xpath("//div[@class='primary-info']/h1[@class='contact-label']"));
	protected popPopOver = new ElementWrapper(by.xpath("//div[contains(@class,'popover-panel')][not(contains(@class,'hidden'))][not(contains(@class,'parent'))]"));
	protected icoFavoriteIcon = new ElementWrapper(by.xpath("//div[@class='item-list-container clickthrough-container productivity-panel']//div[@class='favorite icon']"));
	protected iconCallOBPhoneMaxGlance = new ElementWrapper(by.xpath("//div[@id='glanceActiveContact']/div[@id='callGlanceSection']//div[@class='media-icon-shade']//*[name()='svg'][contains(@class,'phone-outbound')]"))
	protected btnNoButton = new ElementWrapper(by.xpath("//button[@class='cancel-button' and @title='No']"));
	protected txtInputChatMss = new ElementWrapper(by.xpath("//div[@class='chat-contact-ui chatcontactui' and @data-status='Active']//textarea"));
	protected iconChatMaxGlance = new ElementWrapper(by.xpath("//div[@id='glanceActiveContact']/div[@id='chatGlanceSection']//div[@class='chat-multi-glance-ui chatmultiglanceui']//*[name()='svg'][contains(@class,'chat')]"))
	protected lblQuickRepliesSubject = new ElementWrapper(by.xpath("//div[@class='quick-replies-content']//span[@class='subject']"));
	protected lblQuickRepliesContent = new ElementWrapper(by.xpath("//div[@class='quick-replies-content']//span[@class='content']/p"));
	protected pnlWorkspaceWrapper = new ElementWrapper(by.xpath("//div[@class='workspace-wrapper']"));
	protected pnlWorkspaceContactActive = new ElementWrapper(by.xpath("//div[@class='contact-section' or @id='contactSection']//div[@class='inner-container']"));
	protected tabSkillLevel = new ElementWrapper(by.xpath("//div[@class='quick-replies-section']//div[@class='skill-level-tab']"));
	protected tabFavorites = new ElementWrapper(by.xpath("//div[@class='quick-replies-section']//div[@class='favorites-tab']"));
	protected lblCommitmentDuration = new ElementWrapper(by.xpath("//ul[@class='coming-up-item-list']//span[@class='time active duration']"));
	protected lblMAXCurrentOutState = new ElementWrapper(by.xpath("//span[@class='current-out-state']"));
	protected ddlHistoryCallSkill = new ElementWrapper(by.xpath("//div[@class='popover-panel advanced-address-book-ui']//div[contains(@class,'selectmenu-button skill-list')][@aria-disabled='false']"));
	protected pnlEmailWithQuickReply = new ElementWrapper(by.xpath("//div[@class='email-contact-ui emailcontactui']"));
	protected btnMultiChatDisplay = new ElementWrapper(by.xpath("//li[@data-button-type='MultiChatDisplayKeyStore']"));
	protected lblMultiChatDisplayStatus = new ElementWrapper(by.xpath("//li[@data-button-type='MultiChatDisplayKeyStore']/span[@class='right settings-value']"));
	protected btnGlanceSensitivity = new ElementWrapper(by.xpath("//li[@data-button-type='GlanceSensitivity']"));
	protected ddlGlanceSensitivity = new ElementWrapper(by.xpath("//div[@class='menu-container']/select[@class='selectmenu-button glance-sensitivity-menu']"));

	// Blue
	protected radPhone = new ElementWrapper(by.xpath("//div[@class='item phone-option'][./input[@id='radioPhone']]"));
	protected radStation = new ElementWrapper(by.xpath("//div[@class='item station-option'][./input[@id='radioStation']]"));
	protected radSoftPhone = new ElementWrapper(by.xpath("//div[@class='item softphone-option'][./input[@id='radioSoftPhone']]"));
	protected chkRememberMe = new ElementWrapper(by.xpath("//input[@id='cbRememberMe']"));
	protected txtPhone = new ElementWrapper(by.xpath("//input[@id='phoneNumberText']"));
	protected txtStation = new ElementWrapper(by.xpath("//input[@id='stationIdText']"));
	protected btnConnect = new ElementWrapper(by.xpath("//div[@class='select-options']/button[@class='button connect']/h4"));
	protected btnNewToolbar = new ElementWrapper(by.xpath("//li[@class='toolbar-button-template']//div[@class='button-text' and contains(text(),'New')]"));
	protected lblErrorMessage = new ElementWrapper(by.xpath("//div[@class='error-message-container']"));
	protected formLaunchMAX = new ElementWrapper(by.xpath("//div[@class='set-station-container']"));
	protected icoParkedContact = new ElementWrapper(by.xpath("//div[@id='emailGlanceSection']//div[@class='contact-name parked-contact-title']"));
	protected btnCloseMax = new ElementWrapper(by.xpath("//button[@class='button close']"));
	protected lblContactPanelToggle = new ElementWrapper(by.xpath("//span[@class='contact-panel-toggle']"));
	protected pnlContact = new ElementWrapper(by.xpath("//div[@class='contact-panel-pane']"));
	protected btnConnectAgentLeg = new ElementWrapper(by.xpath("//div[@id='agentLegSection']//button[@class='toggle-leg-button']"));
	protected dlgConnectAgent = new ElementWrapper(by.xpath("//div[@id='dialogSection']//div[@class='dialog-contents']//h1[@class='dialog-title']"))

	// Dynamic controls
	protected lblSkill(skillName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//li[@class='selectmenu-menu-item'][text()='${skillName}']`));
	}

	protected lblMaxStateItem(maxState: MaxState): ElementWrapper {
		return new ElementWrapper(by.xpath(`//li[@data-state='${maxState}' and not(@class ='state-item-template')]`));
	}

	protected lblEmailAddressBookItem(skillName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//li[@class='clickable queue-template popover-panel-item-template hover' or @class='clickable queue-template popover-panel-item-template'][@data-skillname='${skillName}']`));
	}

	protected icoSkill(skillName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[contains(@class,'queue-count-container')]//div[contains(@class,'${skillName}-set')][1]//*[name()='svg']`));
	}

	protected lblSkillQueue(skillName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[contains(@class,'queue-count-container')]//div[contains(@class,'${skillName}-set')][1]//div[@class='${skillName}-queue']`));
	}

	protected lblElementOBEmail(order: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//ul[@class='result-list']/li[${order}]`));
	}

	protected btnButton(buttonName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//button[@class='${buttonName}']`));
	}

	protected btnToolbar(buttonName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class = 'button-text' and text()='${buttonName}']`));
	}

	protected lblCallHistorySkillName(skillName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//ul[@class='call-history-item-list']//span[@class='skill' and text()='${skillName}']`));
	}

	protected lblCallHistoryPhoneNumber(phoneNumber: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//span[contains(text(),'${phoneNumber}')]`));
	}

	protected contactHistoryItem(phoneNumber: string, skillName: string) {
		return new ElementWrapper(by.xpath(`//li[@class='call-history-template'][.//span[@class='number'][text()='${phoneNumber}']][.//span[@class='skill'][text()='${skillName}']]`));
	}

	protected btnBackOption(backFromOption: string) {
		return new ElementWrapper(by.xpath(`//div[@data-current-context='${backFromOption}']//div[@class='clickthrough-back']`));
	}

	protected lblQuickReplyMessage(text: string) {
		return new ElementWrapper(by.xpath(`//span[@class='reply-content']/p[contains(text(),'${text}')]`));
	}

	protected lblQuickReplyTitle(title: string) {
		return new ElementWrapper(by.xpath(`//div[@class='quick-replies-section']//span[@class='subject'][text()='${title}']`));
	}

	protected lblPersonalQueueItem(phoneNumber: number): ElementWrapper {
		return new ElementWrapper(by.xpath(`//ul[@class='queue-item-list']//li[@class='personal-queue-template']//span[@title='${phoneNumber}']`));
	}

	protected icoAssignedSkillDetailed(ruleSkill: string, contactLabel: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//h1[@title='${ruleSkill}']/ancestor::div[@class='entry left']/preceding-sibling::div//*[name()='svg'][@data-src='${contactLabel}.svg']`));
	}

	protected icoAssignedSkillMaster(contactLabel: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='skill-counts']//*[name()='svg'][@data-src='${contactLabel}.svg']`));
	}

	protected addressBookItem(value: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//h1[text()='${value}']/ancestor::ul/li[contains(@class,'agent-template') or contains(@class,'popover-panel-item-template')][1]`));
	}

	protected tabAdvanceAddressBook(tabName: TransferTab): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[contains(@class,'advanced-address-book')]/ul[not(contains(@class,'hidden'))]/li[contains(@id,'${tabName}-tab')]`));
	}

	protected lblSearchResultAddressBook(text: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='search-content']/ul[@class='result-list']/li[.//h1[text()='${text}'] and .//button[text()='Call']]`))
	}

	protected icoAgentReportsFavorite(reportOption: AgentReportOption): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='popover-panel main-panel' and @data-favorite='${reportOption}']//li[@class='main-list-item performance']//div[@class='left icon']/*[name()='svg' and @data-src='favorite-selected.svg']`))
	}

	protected icoAgentReportsDrillIcon(reportOption: AgentReportOption): ElementWrapper {
		return new ElementWrapper(by.xpath(`//li[@class='main-list-item ${reportOption}']//div[@class='right link-icon']/*[name()='svg']`))
	}

	protected btnAgentReportsBack(reportOption: AgentReportOption): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='item-list-container clickthrough-container ${reportOption}-panel']//div[contains(@class,'clickthrough-back') and @role='button']`))
	}

	protected lblAgentReports(reportOption: AgentReportOption): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='item-list-container clickthrough-container ${reportOption}-panel']//div[contains(@class,'clickthrough-header')]//*[contains(@class,'list-title clickthrough-title ellipsis')]`))
	}

	protected toolbarItem(toolbarName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@id='toolBarSection']//button/div[contains(text(), '${toolbarName}')]`));
	}

	protected btnCallAddressBook(agentName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//ul[@class='result-list']/li[.//h1[text()='${agentName}']]//button[@title='Call']`));
	}

	protected icoFavoriteAgentOption(reportOption: AgentReportOption): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='item-list-container clickthrough-container ${reportOption}-panel']//div[@class='favorite icon']`))
	}

	protected btnPerformanceDateRange(Option: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='item-list-container clickthrough-container performance-panel']//button[@title='${Option}']`))
	}

	protected lblPerformanceTableHeader(title: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='item-list-container clickthrough-container performance-panel']//table[@class='performance-table']//th[@title='${title}']`))
	}

	protected icoFavoriteAgentOptionStatus(reportOption: AgentReportOption, mode: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='item-list-container clickthrough-container ${reportOption}-panel']//div[@class='favorite icon' and @title='${mode}']`))
	}

	protected btnEmailAddressBook(emailAddress: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='search-content']//li[.//h1[.='${emailAddress}']]//button[text()='Email']`));
	}

	protected lblEmailSkill(skillName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//ul[@class='selectmenu-menu-list']//li[text()='${skillName}']`));
	}

	protected lblCallHistoryNumber(number: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//ul[@class='call-history-item-list']//li[@class='call-history-template']//span[@class='number' and @title='${number}']`));
	}

	protected lblCallHistorySkill(skillName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//ul[@class='call-history-item-list']//li[@class='call-history-template']//span[@class='skill' and @title='${skillName}']`));
	}

	protected btnProductivityDateRange(Option: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='item-list-container clickthrough-container productivity-panel']//button[@title='${Option}']`))
	}

	protected lblProductivityTableHeader(title: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='item-list-container clickthrough-container productivity-panel']//div[@class='report-content']//div[@class='time-label']//h3[@class='${title}']`))

	}

	protected lblAddressBookTab(tabName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//ul[@class='tabs']//li[@class='tab-title ${tabName}']`));
	}

	protected lblHistoryItem(contactId: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//ul[@class='history-list']//li[@class='external-template popover-panel-item-template'][@data-id='${contactId}']`));
	}

	protected lblHistoryItemInformation(phoneNumber: string, contactId: string, agentName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//h1[text()='${phoneNumber}']/parent::div/parent::li[@data-id='${contactId}']//span[text()='${agentName}']`));
	}

	protected btnHistoryItemCallButton(contactId: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//li[contains(@class,'external-template popover-panel-item-template')][@data-id='${contactId}']//button[@title='Call']`));
	}

	protected lblAddressBookTabPanelItem(tabItemName: string, ): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='tabs-content']//ul[@class='item-list']/li[.//h1[text()='${tabItemName}']]`));
	}

	protected btnCustomAddressBookPanel(buttonName: string, ): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='tabs-content']//ul[@class='item-list']/li[@class='custom-address-book-entry-template popover-panel-item-template']//div[@class='contact-section-custom']//button[@class='${buttonName}']`));
	}

	protected lblCustomAddressBookPanelItem(text: string, ): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='tabs-content']//ul[@class='item-list']/li[@class='custom-address-book-entry-template popover-panel-item-template']//h1[text()='${text}']`));
	}
	protected lblItemScheduleComingUp(userSchedule: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//ul[@class='coming-up-item-list']//span[@title='${userSchedule}']/parent::li[@class='commitment-template']`));
	}
	protected activeContactSession(contactName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@id='glanceActiveContact']/div[@id='${contactName}GlanceSection']//div[@class='media-icon-shade']//*[name()='svg'][contains(@class,'${contactName}')]`));
	}

	protected lblComingUpItem(itemName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//ul[@class='coming-up-item-list']//li[@class='commitment-template']//span[@title='${itemName}']`));
	}

	protected lblQuickRepliesTitleByContactId(contactId: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[(contains(@id,'chatcontactui')) and @data-contactid='${contactId}']//div[@class='quick-replies-content']//span[@class='subject']`));
	}

	protected lblQuickRepliesContentByContactId(contactId: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[(contains(@id,'chatcontactui')) and @data-contactid='${contactId}']//div[@class='quick-replies-content']//span[@class='content']/p`));
	}

	protected btnExpandQuickRepliesByContactId(contactId: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[(contains(@id,'chatcontactui')) and @data-contactid='${contactId}']//button[@class='contact-panel-toggle']`));
	}

	protected lblGlanceActiveContact(contactId: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='contact-list']//div[@data-contact-id='${contactId}']`));
	}

	protected lblPerformanceTableCell(cellName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='item-list-container clickthrough-container performance-panel']//table[@class='performance-table']//td[@class='${cellName}']`))
	}
	protected lblAddressBookPanelHeader(headerTitle: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='item-list-header clickthrough-header']//div[@title='${headerTitle}']`))
	}

	protected lblGlanceSensitivityOption(option: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='menu-container']/select[@class='selectmenu-button glance-sensitivity-menu']/option[@value='${option}']`))
	}

	public static async getMaxInstance(newMax: boolean = true, multiContact: boolean = false): Promise<MaxPage> {
		this._maxPage = new MaxPage();
		if (newMax) {
			let handle: string = await BrowserWrapper.getNewWindowHandle();
			await BrowserWrapper.switchWindowByHandle(handle);
		}
		if (!multiContact){			
			await this._maxPage.btnStateSection.wait();
		}		
		await this._maxPage.waitForLoading(TestRunInfo.middleTimeout);
		return this._maxPage;
	}

	public static async getMaxNewBUInstance(newMax: boolean = true): Promise<MaxPage> {
		this._maxPage = new MaxPage();
		if (newMax) {
			await BrowserWrapper.switchWindowByTitle("MAX");
		}
		return this._maxPage;
	}

	/**
	 * Check OBEmail Address list doesn't duplicate when we click NEW -> OutBound Email
	 * @author Huy.Nguyen
	 * @returns {Promise<boolean>} each OBEmail is displayed a time. 
	 * @memberof MaxPage
	 */
	public async isDuplicateListEmailAddress(): Promise<boolean> {
		try {
			await Logger.write(FunctionType.UI, `Check email address list does not duplicate in New -> Outbound email`);

			//Get count of child node from parent node based on Locator
			let countNode: number = await this.resultListOBEmail.getChildCountByTagName('li');

			//Initial array contain all skill name to check
			let arraySkillName: string[] = [];
			for (let i = 0; i < countNode; i++) {
				let xpathOBEmail: ElementWrapper = this.lblElementOBEmail(`${i + 1}`);
				let dataSkillName: string = await xpathOBEmail.getAttribute('data-skillname');
				arraySkillName.push(dataSkillName);
			}

			//Handle check duplicate 'data-skill name' value
			for (let i = 0; i < (arraySkillName.length - 1); i++) {
				for (let j = i + 1; j < arraySkillName.length; j++) {
					if (arraySkillName[i] === arraySkillName[j]) {
						return false;
					}
				}
			}
			return true;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isDuplicateListEmailAddress, err.message);
		}
	}

	/**
	 * Check Address book is displayed or not
	 * @returns {Promise<boolean>} the existence of Add New dialog
	 * @memberof MaxPage
	 */
	public async isAddressBookDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.popAddressBook.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAddressBookDisplayed, err.message);
		}
	}

	/**
	 * Check a MAX state is displayed ot not
	 * @returns {Promise<boolean>} the existence of the MAX state
	 * @memberof MaxPage
	 */
	public async isMAXStateDisplayed(maxState: MaxState): Promise<boolean> {
		try {
			return await this.lblMaxStateItem(maxState).isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMAXStateDisplayed, err.message);
		}
	}


    /**
     * Select Add New option
     * @param {string} option
     * @returns {Promise<MaxPage>}
     * @memberof MaxPage
     */
	public async selectAddNewOption(contactName: ContactName): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Selecting Add New option item ${contactName}`);

			if (await this.dlgAddNew.isDisplayed(TestRunInfo.shortTimeout)) {
				if (contactName == ContactName.EMAIL) {
					await this.btnOutboundEmail.click();
				} else if (contactName == ContactName.PHONE_CALL) {
					await this.btnOutboundCall.click();
				}
			}
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectAddNewOption, err.message);
		}
	}

	/**
	 * Select Email from list
	 * @param {string} SkillType
	 * @returns {Promise<MaxEmailPage>}
	 * @memberof MaxPage
	 */
	public async selectEmailFromAddressBook(skillType: SkillType, emailAddress?: string, requiredDisposition?: boolean, acw?: boolean): Promise<MaxEmailPage> {
		try {
			let skillName: string = SkillCore.getSkillName(skillType);
			await Logger.write(FunctionType.UI, `Selecting item ${skillName}`);
			if (await this.lblEmailAddressBookItem(skillName).isDisplayed(TestRunInfo.shortTimeout)) {
				await this.lblEmailAddressBookItem(skillName).click();
			}
			else {
				await this.txtSearchAddress.type(emailAddress);
				await this.btnEmailAddressBook(emailAddress).waitForControlStable();
				await this.btnEmailAddressBook(emailAddress).click();
				if (await this.pnlSelectSkill.isDisplayed(TestRunInfo.shortTimeout)) {
					let skill: string = RuleSkill.MAX_OBEMAIL;

					if (requiredDisposition) {
						skill = RuleSkill.MAX_OBEMAIL_REQUIREDDISPOSITIO;
					}
					else if (requiredDisposition == false) {
						skill = RuleSkill.MAX_OBEMAIL_NONREQUIREDDISPOSI;
					}
					else if (acw) {
						skill = RuleSkill.MAX_OBEMAIL_ACW;
					}
					await this.lblEmailSkill(skill).moveMouse();
					await this.lblEmailSkill(skill).click();
				}
			}
			let maxEmail = require(`${ProjectPath.pageObjects}/inContact/max/max-email`).default;
			return await maxEmail.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectEmailFromAddressBook, err.message);
		}
	}

	/**
	 * Click New button on MAX
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async clickNew(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Clicking New button`);
			await this.btnNew.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickNew, err.message);
		}
	}

    /**
	 * Open More Toolbar on MAX
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async openMoreToolbar(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Clicking More button`);
			await this.btnMore.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.openMoreToolbar, err.message);
		}
	}

	/**
	 * Set Max ADA setting mode
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async setMaxPanelsSetting(state: State,timeoutInSecond: number = 10): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Setting MAX ADA`);
			let panelName: string = await this.pnlMore.getAttribute('data-current-context');
			let i: number = 0;

			while (panelName != 'more' && i < TestRunInfo.shortTimeout) {
				await this.btnBackArrow.click();
				panelName = await this.pnlMore.getAttribute('data-current-context');
				i++;
			}
			await this.btnSetting.click()
			let PanelsMode: string = await this.lblPanelsStatus.getText();

			if (state.toLocaleLowerCase() != PanelsMode) {
				await this.btnPanels.click();

				if (state == State.ON) {
					await this.waitForMAXGlanceStable();
					await BrowserWrapper.sleepInSecond(timeoutInSecond); // Wait for MAX glance changing Panels completely
				}
			}

			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.setMaxPanelsSetting, err.message);
		}
	}

	/**
	 * Get Max panels status
	 * @author Tuan.Vu
	 * @returns {Promise<string>} Max panels status
	 * @memberof MaxPage
	 */
	public async getMaxPanelsStatus(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Getting MAX Panels status`);
			await this.lblPanelsStatus.waitForControlStable();
			return await this.lblPanelsStatus.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getMaxPanelsStatus, err.message);
		}
	}

	/**
	 * Set Max Panels mode
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async setMaxADASetting(state: State): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Setting MAX Panels`);
			let panelName: string = await this.pnlMore.getAttribute('data-current-context');
			let i: number = 0;

			while (panelName != 'more' && i < TestRunInfo.shortTimeout) {
				await this.btnBackArrow.click();
				panelName = await this.pnlMore.getAttribute('data-current-context');
				i++;
			}
			await this.btnSetting.click()
			let ADAMode: string = await this.lblADAHighContrastStatus.getText();

			if (state.toLocaleLowerCase() != ADAMode) {
				await this.btnADAHighContrast.click();

				if (state == State.ON) {
					await this.waitForMAXGlanceStable();
					await BrowserWrapper.sleepInSecond(10); // Wait for MAX glance changing contrast completely
				}
			}

			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.setMaxADASetting, err.message);
		}
	}

	/**
	 * Create a outbound call
	 * @param {number} phoneNumber phone number for create outbound call
	 * @param {string} contactType Type contact want to create
	 * @param {string} skillName Skill outbound call want to create
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxPage
	 */
	public async makeOutboundCall(phoneNumber: string, skillType: SkillType): Promise<MaxCall> {
		try {
			let skillName: string = SkillCore.getSkillName(skillType);
			await Logger.write(FunctionType.UI, `Making Outbound Call`);
			await this.txtSearchAddress.type(phoneNumber);
			await this.btnCall.waitForControlStable();
			await this.btnCall.moveMouse();
			await this.btnCall.click();

			let state: boolean = await this.ddlSkill.isDisplayed(5);

			if (state) {
				await this.lblSkill(skillName).moveMouse();
				await this.lblSkill(skillName).click();
			}
			let maxCall = require(`${ProjectPath.pageObjects}/inContact/max/max-call`).default;

			return maxCall.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.makeOutboundCall, err.message);
		}
	}

	/**
	 * Check Add New dialog is displayed or not
	 * @returns {Promise<boolean>} the existence of Add New dialog
	 * @memberof MaxPage
	 */
	public async isAddNewDialogDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return (await this.plnNew.isDisplayed(timeoutInSecond) || await this.dlgAddNew.isDisplayed(timeoutInSecond));
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAddNewDialogDisplayed, err.message);
		}
	}


	/**
	 * Check the Page Action is displayed or not
	 * @returns {Promise<boolean>} the existence of PageAction Page
	 * @memberof MaxPage
	 */
	public async isPageActionPageExist(timeoutInSecond?: number): Promise<boolean> {
		try {
			return (await this.ifmPageActionPage.isDisplayed(timeoutInSecond));
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPageActionPageExist, err.message);
		}
	}

	/**
	 * Check contact workspace is displayed or not
	 * @param {string} contactType
	 * @param {boolean} [state=true]
	 * @returns {Promise<boolean>} the existence of contact workspace
	 * @memberof MaxPage
	 */
	public async isContactWorkSpaceDisplayed(contactName: ContactName, timeoutInSecond?: number): Promise<boolean> {
		try {
			switch (contactName) {
				case ContactName.EMAIL: {
					return await this.emailWorkingSpace.isDisplayed(timeoutInSecond);
				}
				case ContactName.PHONE_CALL: {
					return await this.pnlCallWorkspace.isDisplayed(timeoutInSecond);
				}
				case ContactName.WORK_ITEM: {
					return await this.workItemWorkSpace.isDisplayed(timeoutInSecond);
				}
				case ContactName.CHAT: {
					return await this.pnlChatWorkspace.isDisplayed(timeoutInSecond);
				}
				case ContactName.VOICE_MAIL: {
					return await this.voiceMailWorkingSpace.isDisplayed(timeoutInSecond);
				}
				case ContactName.SMS: {
					return await this.smsWorkingSpace.isDisplayed(timeoutInSecond);
				}
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.isContactWorkSpaceDisplayed, err.message);
		}
	}

	/**
	 * Wait for contact workspace completely disappeared 
	 * @author Tuan.Vu
	 * @param {string} contactType
	 * @param {number} timeoutInSecond time to wait for contact workspace to be disappeared
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async waitForContactWorkSpaceDisappeared(contactName: ContactName, timeoutInSecond?: number): Promise<MaxPage> {
		try {
			switch (contactName) {
				case ContactName.EMAIL: {
					await this.emailWorkingSpace.waitUntilDisappear(timeoutInSecond);
				}
				case ContactName.PHONE_CALL: {
					await this.pnlCallWorkspace.waitUntilDisappear(timeoutInSecond);
				}
				case ContactName.WORK_ITEM: {
					await this.workItemWorkSpace.waitUntilDisappear(timeoutInSecond);
				}
				case ContactName.CHAT: {
					await this.pnlChatWorkspace.waitUntilDisappear(timeoutInSecond);
				}
				case ContactName.VOICE_MAIL: {
					await this.voiceMailWorkingSpace.waitUntilDisappear(timeoutInSecond);
				}
			}
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForContactWorkSpaceDisappeared, err.message);
		}
	}

	/**
	 * Check MAX page is displayed or not
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>} the existence of MAX page
	 * @memberof MaxPage
	 */
	public async isPageDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.btnStateSection.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
		}
	}

	/**
	 * Change MAX state
	 * @param {MaxState} maxState State of agent
	 * @returns {Promise<MaxPage>} 
	 * @memberof MaxPage
	 */
	public async changeState(maxState: MaxState): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Changing MAX state to ${maxState}`);
			await this.btnStateSection.waitForControlStable(TestRunInfo.shortTimeout);
			await this.btnStateSection.moveMouse();
			await this.btnStateSection.click();
			await BrowserWrapper.sleepInSecond(2); //Handle for Agent crash issue sleep 2 seconds.
			await this.lblMaxStateItem(maxState).click();
			await this.lblMaxStateItem(maxState).waitUntilDisappear();

			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.changeState, err.message);
		}
	}
	/**
	 * Click MAX state drop down
	 * @param {MaxState} maxState State of agent
	 * @returns {Promise<MaxPage>} 
	 * @memberof MaxPage
	 */
	public async clickMAXStateDropDown(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `clickMAXStateDropDown`);

			await this.btnStateSection.waitForControlStable(TestRunInfo.shortTimeout);
			await this.btnStateSection.moveMouse();
			await this.btnStateSection.click();
			await BrowserWrapper.sleepInSecond(2); //Handle for Agent crash issue sleep 2 seconds.

			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickMAXStateDropDown, err.message);
		}
	}
	/**
	 * Log out MAX
	 * @returns {Promise<CentralPage>} 
	 * @memberof MaxPage
	 */
	public async logOut(noButton: boolean = false): Promise<CentralPage> {
		try {
			await Logger.write(FunctionType.UI, "Logging out from MAX");
			let lengthHandles: number = await BrowserWrapper.getTotalWindows();
			await this.changeState(MaxState.LOGOUT);
			await BrowserWrapper.sleepInSecond(2); //Handle for Agent crash issue sleep 2 seconds.
			if (noButton) {
				await this.btnNoButton.click();
			} else {
				await this.btnConfirmLogoutMAX.click();
			}
			await BrowserWrapper.sleepInSecond(2); //Handle for Agent crash issue sleep 2 seconds.
			await BrowserWrapper.waitForNumberOfWindows(lengthHandles - 1);
			await BrowserWrapper.switchWindow(0);
			return await CentralPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.logOut, err.message);
		}
	}

	/**
	 * Wait for loading
	 * @returns {Promise<MaxPage>} MAX page
	 * @memberof MaxPage
	 */
	public async waitForLoading(timeoutInSecond?: number): Promise<MaxPage> {
		try {
			let isSpinnerDisplayed: boolean = await this.divSpinner.isDisplayed(timeoutInSecond);
			if (isSpinnerDisplayed) {
				await this.divSpinner.waitUntilDisappear();
			}
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForLoading, err.message);
		}
	}

	/**
	 * Get agent status
	 * @returns {Promise<string>} Agent state
	 * @memberof MaxPage
	 */
	public async getAgentStatus(timeoutInSecond: number = TestRunInfo.shortTimeout): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting Agent Status");
			await this.btnStateSection.waitUntilPropertyChange("title", timeoutInSecond);
			return await this.btnStateSection.getControlTitle();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getAgentStatus, err.message);
		}
	}

	/**
	 * Click Back Setting Arrow
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async clickBackArrow(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Clicking Back Setting Arrow");
			await this.btnBackArrow.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickBackArrow, err.message);
		}
	}

	/**	
	 * Get dialog messages
	 * @returns {Promise<string>} messages
	 * @memberof MaxPage
	 */
	public async getDialogContent(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting dialog message")
			await this.lblDialogMessage.wait();
			return await this.lblDialogMessage.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getDialogContent, err.message);
		}
	}

	/**	
	 * Get ADA High Contrast status
	 * @returns {Promise<string>} status
	 * @memberof MaxPage
	 */
	public async getADAHighContrastStatus(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting ADA High Contrast status")
			await this.lblADAHighContrastStatus.waitUntilPropertyNotChange('width');
			return await this.lblADAHighContrastStatus.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getADAHighContrastStatus, err.message);
		}
	}

	/**	
	 * Click accept button on force out confirm dialog
	 * @returns {Promise<CentralPage>}
	 * @memberof MaxPage
	 */
	public async clickAcceptButton(): Promise<CentralPage> {
		try {
			await Logger.write(FunctionType.UI, "Clicking on accept button")
			await this.btnAcceptForceLogout.click();
			await this.btnAcceptForceLogout.waitUntilDisappear();
			return await CentralPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickAcceptButton, err.message);
		}
	}

	public async getMaxIndexPage(): Promise<number> {
		try {
			return await BrowserWrapper.getTotalWindows() - 1;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getMaxIndexPage, err.message);
		}
	}

	public async waitForNewContactPopUp(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Waiting for new contact popup displays");
			await this.newContactPopUp.wait();
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForNewContactPopUp, err.message);
		}
	}

	public async acceptNewContact(): Promise<MaxChatPage> {
		try {
			await Logger.write(FunctionType.UI, "Accepting new contact pop up");
			await this.btnAccept.click();
			await this.btnAccept.waitUntilDisappear();
			let maxChatPage = require(`${ProjectPath.pageObjects}/inContact/max/max-chat-page`).default;
			return maxChatPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.acceptNewContact, err.message);
		}
	}

	/**	
	 * Check if contact is inqueue or not
	 * @param {string} mediaType type of contact
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isContactInQueue(contactName: ContactName): Promise<boolean> {
		try {
			let queueNumber: number = 0;
			let stopTime: number = 0;
			let stopWatch = new StopWatch();
			stopWatch.startClock();

			while (queueNumber == 0 && stopTime <= TestRunInfo.elementTimeout) {

				if (contactName == ContactName.CHAT) {
					queueNumber = parseInt((await this.lblInboundChatQueue.getText()).replace(/"/g, ""));
				} else if (contactName == ContactName.EMAIL) {
					queueNumber = parseInt((await this.lblInboundEmailQueue.getText()).replace(/"/g, ""));
				} else if (contactName == ContactName.PHONE_CALL) {
					if (await this.lblInboundPhoneQueue.getText() != "") {
						queueNumber = parseInt((await this.lblInboundPhoneQueue.getText()).replace(/"/g, ""));
					}
					else {
						queueNumber = parseInt((await this.lblOutboundPhoneQueue.getText()).replace(/"/g, ""));
					}
				} else if (contactName == ContactName.VOICE_MAIL) {
					queueNumber = parseInt((await this.lblInboundVoiceMailQueue.getText()).replace(/"/g, ""));
				} else if (contactName == ContactName.WORK_ITEM) {
					queueNumber = parseInt((await this.lblInboundWorkItemQueue.getText()).replace(/"/g, ""));
				}
				stopTime = stopWatch.getElapsedTimeInSecond();
			}

			return queueNumber > 0 ? true : false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isContactInQueue, err.message);
		}
	}

	/**	
	 * Check if Agent Leg is active or inactive
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isAgentLegActive(): Promise<boolean> {
		try {
			let agentLegStatus: string = await this.lblAgentLegStatus.getControlTitle();
			return agentLegStatus.match("Agent Leg - Active") ? true : false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAgentLegActive, err.message);
		}
	}

	/**	
	 * Check if IbPhone icon is displayed or not
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isIbPhoneIconDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return this.icoIbPhone.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isIbPhoneIconDisplayed, err.message);
		}
	}

	/**	
	 * Check if IbPhone Queue is displayed or not
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isIbPhoneQueueDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return this.lblInboundPhoneQueue.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isIbPhoneQueueDisplayed, err.message);
		}
	}

	/**	
	 * Wait for call workspace
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxPage
	 */
	public async waitForCallWorkspace(timeoutInSecond?: number): Promise<MaxCall> {
		try {
			if (await this.pnlCallWorkspace.isDisplayed(timeoutInSecond)) {
				let maxCall = require(`${ProjectPath.pageObjects}/inContact/max/max-call`).default;
				return maxCall.getInstance();
			} else {
				throw Error("Call workspace doesn't display.");
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForCallWorkspace, err.message);
		}
	}

	/**	
	 * Wait for Initializing soft phone
	 * @returns {Promise<MaxVoiceMailPage>}
	 * @memberof MaxPage
	 */
	public async waitForInitializeSoftPhone(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Waiting for initializing SoftPhone");
			await this.dlgInitializeSoftPhone.waitUntilDisappear();
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForInitializeSoftPhone, err.message);
		}
	}

	/**	
	 * Wait for voice mail workspace
	 * @returns {Promise<MaxVoiceMailPage>}
	 * @memberof MaxPage
	 */
	public async waitForVoiceMailWorkspace(): Promise<MaxVoiceMailPage> {
		try {
			await this.pnlVoiceMailWorkspace.wait();
			let maxVoiceMailPage = require(`${ProjectPath.pageObjects}/inContact/max/max-voicemail`).default;
			return maxVoiceMailPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForVoiceMailWorkspace, err.message);
		}
	}

	/**	
	 * Wait for email workspace
	 * @returns {Promise<MaxEmailPage>}
	 * @memberof MaxPage
	 */
	public async waitForEmailWorkspace(timeoutInSecond?: number): Promise<MaxEmailPage> {
		try {
			if (await this.pnlEmailWorkspace.isDisplayed(timeoutInSecond)) {
				let maxEmail = require(`${ProjectPath.pageObjects}/inContact/max/max-email`).default;
				return await maxEmail.getInstance();
			} else {
				throw Error("Email workspace doesn't display.")
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForEmailWorkspace, err.message);
		}
	}

	/**	
	 * Wait for MAX Glance stable
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async waitForMAXGlanceStable(): Promise<MaxPage> {
		try {
			await this.pnlGlanceWorkspace.waitUntilPropertyNotChange('width');
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForMAXGlanceStable, err.message);
		}
	}

	/**	
	 * Wait for MAX voice mail workspace disappear
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async waitForMAXVoicemailDisappear(): Promise<MaxPage> {
		try {
			await this.pnlVoiceMailWorkspace.waitUntilDisappear(TestRunInfo.shortTimeout);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForMAXVoicemailDisappear, err.message);
		}
	}

	/**
	 * Check new contact pop up is displayed or not
	 * @returns {Promise<boolean>} Return value of isNewContactPopUpDisplayed()
	 * @memberof MaxPage
	 */
	public async isNewContactPopUpDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.newContactPopUp.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isNewContactPopUpDisplayed, err.message);
		}
	}
	/**
	 * @ author AnhLe
	 * Check new contact pop up is displayed or not
	 * @returns {Promise<boolean>} Return value of isNewContactPopUpDisplayed()
	 * @memberof MaxPage
	 */
	public async isColorlessBorder(): Promise<boolean> {
		try {
			return await this.pnlColorlessBorder.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isColorlessBorder, err.message);
		}
	}

	/**
	 * Accept new chat contact
	 * @returns {Promise<MaxChatPage>} Return MaxChatPage
	 * @memberof MaxPage
	 */
	public async acceptNewChatContact(): Promise<MaxChatPage> {
		try {
			await Logger.write(FunctionType.UI, "Accepting new chat contact pop up");
			await this.btnAccept.waitForControlStable();
			await this.btnAccept.click();
			await this.btnAccept.waitUntilDisappear();
			let maxChatPage = require(`${ProjectPath.pageObjects}/inContact/max/max-chat-page`).default;
			return maxChatPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.acceptNewChatContact, err.message);
		}
	}


	/**
	 * Accept new SMS contact
	 * @returns {Promise<MaxChatPage>} Return MaxSMSPage
	 * @memberof MaxPage
	 */
	public async acceptNewSMSContact(): Promise<MaxSMSPage> {
		try {
			await Logger.write(FunctionType.UI, "Accepting new chat contact pop up");
			await this.btnAccept.click();
			await this.btnAccept.waitUntilDisappear();
			let maxSMSPage = require(`${ProjectPath.pageObjects}/inContact/max/max-sms-page`).default;
			return maxSMSPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.acceptNewSMSContact, err.message);
		}
	}


	/**
	 * Accept new work item contact pop up
	 * @author {Tan.Ta}
	 * @returns {Promise<MaxWorkItemPage>} Returning M
	 * @memberof MaxPage
	 */
	public async acceptNewWorkItemContact(): Promise<MaxWorkItemPage> {
		try {
			await Logger.write(FunctionType.UI, "Accepting new work item contact pop up");
			await this.btnAccept.click();
			await this.btnAccept.waitUntilDisappear();
			let maxWIPage = require(`${ProjectPath.pageObjects}/inContact/max/max-workitem-page`).default;
			return await maxWIPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.acceptNewWorkItemContact, err.message);
		}
	}

	/**
	 * Show MAX glance
	 * @author {Tan.Ta}
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async showMaxGlance(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Showing MAX glance");
			await this.pnlGlanceWorkspace.waitUntilPropertyNotChange('width');
			await this.icoStatus.moveMouse();
			await this.pnlGlanceWorkspace.waitUntilPropertyNotChange('width');
			await this.icoStatus.wait();
		} catch (err) {
			throw new errorwrapper.CustomError(this.showMaxGlance, err.message);
		}
	}

	/**
	 * Hide MAX glance
	 * @author {Tan.Ta}
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async hideMaxGlance(): Promise<void> {
		try {
			if (await this.pnlMaxGlanceOverlay.isDisplayed(TestRunInfo.shortTimeout)) {

				await Logger.write(FunctionType.UI, "Hiding MAX glance");
				let sizeContainer: ISize = await this.pnlModuleContainer.getSize();
				await Logger.write(FunctionType.UI, "container height " + sizeContainer.height);
				await Logger.write(FunctionType.UI, "container width " + sizeContainer.width);
				let sizeGlance: ISize = await this.pnlGlanceWorkspace.getSize();
				await Logger.write(FunctionType.UI, "contact workspace height " + sizeGlance.height);
				await Logger.write(FunctionType.UI, "contact workspace width " + sizeGlance.width);
				let x: number;
				let y: number;
				if (TestRunInfo.browser === Browser.CHROME || TestRunInfo.browser === Browser.EDGE) //handle for Chrome: Control coordinate is start at central
				{
					x = (sizeContainer.width - sizeGlance.width) / 4 + sizeGlance.width;
					y = sizeContainer.height / 2;
				}
				else //handle for FF and IE: Control coordinate is start at top left corner
				{
					x = ((sizeContainer.width - sizeGlance.width) / 2 + sizeGlance.width) - (sizeContainer.width / 2);
					y = 0;
				}

				// await this.pnlModuleContainer.moveMouse({ x: x, y: y });
				if (sizeContainer.width > 0) {
					await BrowserWrapper.mouseMove({ x: x, y: y });					
					await this.pnlGlanceWorkspace.waitUntilPropertyNotChange('width');
				}
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.hideMaxGlance, err.message);
		}
	}

	/**
	 * Check Search text box exist to input number
	 * @returns {Promise<boolean>} the existence of Search text box
	 * @memberof MaxPage
	 */
	public async isSearchAddressDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.txtSearchAddress.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isSearchAddressDisplayed, err.message);
		}
	}

	/**
	 * Check Search-box placeholder text
	 * @author W.Plaza
	 * @returns {Promise<string>} the placeholder text in the Search-box
	 * @memberof MaxPage
	 */
	public async getSearchFieldPlaceholderValue(timeoutInSecond?: number): Promise<string> {
		try {
			return await this.txtSearchAddress.getAttribute("placeholder", timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.getSearchFieldPlaceholderValue, err.message);
		}
	}

	/**	
     * Close popover
     * @author {Tan.Ta}
     * @returns {Promise<void>}
     * @memberof MaxPage
     */
	public async closePopover(): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, `Closing Popover`);

			if (TestRunInfo.browser == Browser.IE) {
				await this.icoStatus.pressButtonForClosePopover(Button.ESCAPE);
			} else {
				await BrowserWrapper.pressKey(Button.ESCAPE);
			}

			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.closePopover, err.message);
		}
	}

	/**
	 * Opening Max schedule pop up
	 * @author {Y.Le}
	 * @returns {Promise<MaxSchedulePopUp>}
	 * @memberof MaxPage
	 */
	public async openSchedulePopUp(): Promise<MaxSchedulePopUp> {
		try {
			await Logger.write(FunctionType.UI, "Opening Max schedule pop up");
			await this.btnMaxSchedule.click();
			let maxSchedule = require("@page-objects/inContact/max/max-toolbar/max-schedule").default;
			return await maxSchedule.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.openSchedulePopUp, err.messages);
		}
	}

	/**	
	 * Check call workspace is displayed
	 * @author {Phat.Truong}
	 * @returns {Promise<boolean>} Return value of isCallWorkspaceDisplayed()
	 * @memberof MaxPage
	 */
	public async isCallWorkspaceDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.pnlCallWorkspace.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCallWorkspaceDisplayed, err.message);
		}
	}

	/**	
	 * Check ico skill displayed
	 * @author {Phat.Truong}
	 * @returns {Promise<boolean>} Return value of isCallWorkspaceDisplayed()
	 * @memberof MaxPage
	 */
	public async isIcoSkillDisplayed(skillName: string, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.icoSkill(skillName).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isIcoSkillDisplayed, err.message);
		}
	}
	/* Get size of max glance
	* @returns {Promise<boolean>} Return value of isCallWorkspaceDisplayed()
	* @memberof MaxPage
	*/
	public async getMaxGlanceSize(): Promise<number> {
		try {
			await Logger.write(FunctionType.UI, "Getting MAX glance size");
			let sizeGlance: ISize = await this.pnlGlanceWorkspace.getSize();
			let glanceWidth = sizeGlance.width;
			return glanceWidth;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getMaxGlanceSize, err.message);
		}
	}

	/**	
	 * Get skill queue
	 * @author Tan.Ta
	 * @returns {Promise<string>} Return value of isCallWorkspaceDisplayed()
	 * @memberof MaxPage
	 */
	public async getSkillQueue(skillName: string): Promise<number> {
		try {
			let queueNumber: number = parseInt((await this.lblSkillQueue(skillName).getText()).replace(/"/g, ""));
			return queueNumber;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getSkillQueue, err.message);
		}
	}

	/**	
	 * Check queue count displays
	 * @author {Nhat.Nguyen}
	 * @returns {Promise<boolean>} queue count display: true, queue count not displayed: false
	 * @memberof MaxPage
	 */
	public async checkQueueCountFormat(queueCount: number): Promise<boolean> {
		try {
			if (`+${queueCount}` == "+99" || queueCount >= 0 || queueCount <= 99) {
				return true;
			}
			return false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.checkQueueCountFormat, err.message);
		}
	}

	/* Get Call Module size
	* @returns {Promise<boolean>} Return value of isCallWorkspaceDisplayed()
	* @memberof MaxPage
	*/
	public async getCallModuleSize(): Promise<number> {
		try {
			await Logger.write(FunctionType.UI, "Getting module size");
			let sizeGlance: ISize = await this.pnlModuleContainer.getSize();
			let moduleSize = sizeGlance.width;
			return moduleSize;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getCallModuleSize, err.message);
		}
	}

	/**
     *Check button on Work Item Page is displayed or not
     * @param {boolean, ButtonTitle} state, buttonName
     * @returns {Promise<boolean>} desired button is display or not
     * @memberof MaxPage
     */
	public async isButtonDisplayed(buttonName: ButtonTitle, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.btnButton(buttonName).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isButtonDisplayed, err.message);
		}
	}

	/**
	 *Check button on Work Item Page is displayed or not
	 * @author {Anh.Ho}
     * @param {boolean, string} mediaType, state
     * @returns {Promise<boolean>} desired button is display or not
     * @memberof MaxPage
     */
	public async isControlWithColorlessBorder(contactName: ContactName, timeoutInSecond?: number): Promise<boolean> {
		try {
			if (contactName == ContactName.CHAT || contactName == ContactName.WORK_ITEM) {
				return await this.pnlColorlessBorderOfChat.isDisplayed(timeoutInSecond);
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.isControlWithColorlessBorder, err.message);
		}
	}

	/**
	 * Get MAX next state
	 * @author Tuan.Vu
	 * @returns {Promise<string>} MAX next state
	 * @memberof MaxPage
	 */
	public async getMAXNextState(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting MAX next state");
			await this.lblMAXNextState.waitUntilPropertyChange("title", TestRunInfo.middleTimeout);
			return await this.lblMAXNextState.getControlTitle();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getMAXNextState, err.message);
		}
	}

	/**
	 * Get MAX next out state
	 * @author Chinh.Nguyen
	 * @returns {Promise<string>} MAX next state
	 * @memberof MaxPage
	 */
	public async getMAXNextOutState(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting MAX next out state");
			return await this.lblMAXNextOutState.getControlTitle();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getMAXNextOutState, err.message);
		}
	}

	/**	
	 * Open toolbar button
	 * @author Tan.Ta
	 * @param {string} buttonName name of button
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async openToolbarButton(buttonName: string): Promise<any> {
		try {
			await Logger.write(FunctionType.UI, `Opening toolbar button ${buttonName}`);
			await this.btnToolbar(buttonName).click();

			if (buttonName = "More") {
				return await MaxMoreToolsPage.getInstance();
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.openToolbarButton, err.message);
		}
	}

	/**	
	 * Compare left of GlanceMax and Contact popup
	 * @param {string} buttonName name of button
	 * @returns {Promise<any>}
	 * @memberof MaxPage
	 */
	public async checkPositionWorkspaceContactPopup(): Promise<boolean> {
		try {
			await Logger.write(FunctionType.UI, `Comparing left of workspace and left of Contact popup`);
			let locationGlanceWorkspace: ISize = await this.pnlGlanceWorkspace.getSize();
			let leftGlanceWorkspace: number = await this.pnlGlanceWorkspace.getElementCoordinate(CoordinateType.LEFT);
			let leftContactPopup: number = await this.newContactPopUp.getElementCoordinate(CoordinateType.LEFT);
			if (leftGlanceWorkspace + locationGlanceWorkspace.width < leftContactPopup) {
				return true;
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.checkPositionWorkspaceContactPopup, err.message);
		}
	}
	/** 
	* Get next agent status
	* @returns {Promise<string>} State Status
	* @memberof MaxPage
	*/
	public async getStateStatus(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting State Status");
			await this.lblState.waitUntilPropertyChange("title", TestRunInfo.shortTimeout)
			return await this.lblState.getControlTitle();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getStateStatus, err.message);
		}
	}

	/** 
	* Get next agent status
	* @returns {Promise<string>} Out State Status
	* @memberof MaxPage
	*/
	public async getOutStateStatus(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting Out State Status");
			await this.lblOutState.waitUntilPropertyChange("title", TestRunInfo.middleTimeout)
			return await this.lblOutState.getControlTitle();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getOutStateStatus, err.message);
		}
	}

	/** 
	 * Check NewContactPopUpTimeout
	 * @returns {Promise<string>} checkNewContactPopUpTimeout disappears after time out
	 * @memberof MaxPage
	 */
	public async checkNewContactPopUpTimeout(timeoutInSecond: number): Promise<boolean> {
		try {
			let count = 0;
			let timeDurationOnPopUp = await this.getTimeDurationOnPopUp();
			if (!(timeoutInSecond - timeDurationOnPopUp >= 0 && timeoutInSecond - timeDurationOnPopUp <= 10)) {
				return false;
			}
			while (await this.newContactPopUp.isDisplayed(1)) {
				await BrowserWrapper.sleepInSecond(1);
				count++;
				if (count > timeDurationOnPopUp) {
					return false;
				}
			}
			return true;
		} catch (err) {
			throw new errorwrapper.CustomError(this.checkNewContactPopUpTimeout, err.message);
		}
	}
	/**
	 * Check personal queue contact is displayed or not
	 * @author {Tan.Ta}
	 * @param {boolean} [state=true]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isPersonalQueueContactDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblPersonalQueueContact.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPersonalQueueContactDisplayed, err.message);
		}
	}

	/**
	 * Select active contact on MAX
	 * @author Chinh.Nguyen
	 * @param {string} contactType
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async selectMAXActiveContact(contactType: string): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Selecting ${contactType} active contact on MAX`);
			switch (contactType) {
				case ContactName.PHONE_CALL: {
					await this.icoActiveCallContact.click();
					break;
				}
				case ContactName.EMAIL: {
					await this.icoActiveEmailContact.click();
					break;
				}
			}
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectMAXActiveContact, err.message);
		}
	}

	/** 	 
	 * Check MAX notifications is displayed
	 * @author Huy.Nguyen
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isMaxNotificationDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.dlgMaxNotification.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMaxNotificationDisplayed, err.message);
		}
	}

	/**
	 * Check call history is not displayed in MAX
	 * @returns {Promise<boolean>} the existence of call history
	 * @memberof MaxPage
	 */
	public async isContactHistoryEmpty(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblNoContactHistory.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isContactHistoryEmpty, err.message);
		}
	}

	/**
	 * Check call history message is displayed
	 * @returns {Promise<boolean>} the existence of call history
	 * @memberof MaxPage
	 */
	public async isCallHistoryDisplayed(phoneNumber?: string, skillType?: SkillType, timeoutInSecond?: number): Promise<boolean> {
		try {
			let skillName: string = SkillCore.getSkillName(skillType);
			return await this.contactHistoryItem(phoneNumber, skillName).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCallHistoryDisplayed, err.message);
		}
	}

	/** 
	 * Check customer contact icon is displayed or not
	 * @author Anh.Ho
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isCustomerContactCardDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.icoCustomerContactCard.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCustomerContactCardDisplayed, err.message);
		}
	}

	/**
	 * Wait for queue value change when contacts route to agent
	 * @author Tan.Ta
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async waitForQueueValue(contactLabel: ContactLabel, value: number): Promise<void> {
		try {
			let stopTime: number = 0;
			let stopWatch = new StopWatch();
			stopWatch.startClock();
			let queueNumber: number;

			queueNumber = await this.getSkillQueue(contactLabel);

			while (queueNumber != value && stopTime < TestRunInfo.elementTimeout) {
				queueNumber = await this.getSkillQueue(contactLabel);
				stopTime = stopWatch.getElapsedTimeInSecond();
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForQueueValue, err.message);
		}
	}

	/** 
	 * Check ACW timer Count Correctly
	 * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} displayed or not
	 * @memberof MaxPage
	 */
	public async isACWTimerCountCorrectly(): Promise<boolean> {
		try {
			await this.lblACWTime.wait();
			let time1: string = await this.lblACWTime.getText();
			await BrowserWrapper.sleepInSecond(2); // Need waits 2s to checks the ACW countdown timer is shown correctly.
			let time2: string = await this.lblACWTime.getText();
			if (time1 > time2) {
				return true;
			}
			return false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isACWTimerCountCorrectly, err.message);
		}
	}

	/** 
	 * Wait ACW timer Disappear
	 * @author Nhat.Nguyen
	 * @returns {Promise<MaxPage>} MaxPage
	 * @memberof MaxPage
	 */
	public async waitACWDisappear(timeOut?: number): Promise<MaxPage> {
		try {
			await this.lblACWTime.waitUntilDisappear(timeOut);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitACWDisappear, err.message);
		}
	}

	/**
	 * Create a outbound call
	 * @author Phat.Truong
	 * @param {number} phoneNumber phone number for create outbound call
	 * @param {string} contactType Type contact want to create
	 * @param {string} skillName Skill outbound call want to create
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxPage
	 */
	public async dialOutboundCall(phoneNumber: string, skillType?: SkillType): Promise<void> {
		try {
			await this.clickNew();
			let addressExists: boolean = await this.txtSearchAddress.isDisplayed(5);

			if (addressExists == false) {
				await this.selectAddNewOption(ContactName.PHONE_CALL);
			}

			await this.makeOutboundCall(phoneNumber, skillType);
		} catch (err) {
			throw new errorwrapper.CustomError(this.dialOutboundCall, err.message);
		}
	}

	/**
	 * Resizing Max by drop and drag
	 * @author Y.Le
	 * @param {ISize} sizeChange
	 * @returns {Promise<this>}
	 * @memberof MaxPage
	 */
	public async resizeMaxByDropAndDrag(widthSize: number, heightSize: number): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Resizing Max by drop and drag");
			let pageBase = new PageBase();
			let pageSize = await pageBase.getPageSize()
			await pageBase.setPageSize(pageSize.width + widthSize, pageSize.height + heightSize);
			return await this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.resizeMaxByDropAndDrag, err.message);
		}
	}

	/**
	 * Reject new work item contact pop up
	 * @author {Phat.Truong}
	 * @returns {Promise<MaxWorkItemPage>} Returning M
	 * @memberof MaxPage
	 */
	public async rejectNewItemContact(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Rejecting new work item contact pop up");
			await this.btnReject.click();
			await this.btnReject.waitUntilDisappear();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.rejectNewItemContact, err.message);
		}
	}

	/**	
	 * Wait for chat workspace
	 * @author Nhat.Nguyen
 	 * @returns {Promise<MaxChatPage>}
 	 * @memberof MaxPage
 	 */
	public async waitForChatWorkspace(): Promise<MaxChatPage> {
		try {
			await this.pnlChatWorkspace.wait();
			let maxChatPage = require(`${ProjectPath.pageObjects}/inContact/max/max-chat-page`).default;

			return maxChatPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForChatWorkspace, err.message);
		}
	}

	/**
	 * Checking chat, email, voice mail, work item contact in Glance contact items displayed 
	 * @author Y.Le
	 * @param {string} mediaType
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isContactItemInGlanceDisplayed(mediaType: ContactName, timeOut?: number): Promise<boolean> {
		try {
			if (mediaType == ContactName.CHAT) {
				return await this.icoChatInBoundContact.isDisplayed(timeOut);
			} else if (mediaType == ContactName.PHONE_CALL) {
				return await this.icoInboundPhoneContact.isDisplayed(timeOut);
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.isContactItemInGlanceDisplayed, err.message);
		}
	}

	/**
	 * Change Max Panels Setting
	 * @author Phat Truong
	 * @returns {Promise<MaxPage>} 
	 * @memberof MaxPage
	 */
	public async changeMaxPanelsSetting(state: State, closeMoreTools?: boolean, timeoutInSecond?: number): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Changing Panels setting");
			await this.openMoreToolbar();
			await this.setMaxPanelsSetting(state,timeoutInSecond);
			if (closeMoreTools) {
				await this.closePopover();
			}
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.changeMaxPanelsSetting, err.message);
		}
	}

	/**
	 * Checking button 'New' is disable
	 * @author Tuan Vu
	 * @param {string} title
	 * @returns {Promise<void>}
	 * @returns {Promise<boolean>} disable or not
	 * @memberof MaxPage
	 */
	public async changeMaxADASetting(state: State, closeMoreTools?: boolean): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Changing ADA setting");
			await this.openMoreToolbar();
			await this.setMaxADASetting(state);
			if (closeMoreTools) {
				await this.closePopover();
			}
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.changeMaxADASetting, err.message);
		}
	}

	/**
		 * is New button disable
		 * @author Nhat.Nguyen
		 * @returns {Promise<boolean>} disable or not
		 * @memberof MaxPage
		 */
	public async isNewButtonDisabled(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.btnNewDisabled.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isNewButtonDisabled, err.message);
		}
	}

	/**
	 * Selecting quick reply in MAX inC-UI
	 * @author Tuan Vu
	 * @param {string} title
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async selectQuickReply(title: string): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Selecting quick reply in MAX inC-UI");
			await this.lblQuickReplyTitle(title).click();
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectQuickReply, err.message);
		}
	}

	/**
	 * Selecting quick reply message
	 * @author Devi Venkatachalam
	 * @param {string} content
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async selectQuickReplymessage(content: string): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Selecting quick reply message");
			await this.lblQuickReplyMessage(content).click();
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectQuickReplymessage, err.message);
		}
	}

	/**
	 * Click Quick Replies button
	 * @author Tuan Vu
	 * @param {string} title
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async clickQuickRepliesButton(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Clicking Quick Replies button");
			await this.btnQuickReplies.click();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickQuickRepliesButton, err.message);
		}
	}

	/**
	 * Check On Inbox items for all media types 
	 * @author Y.Le
	 * @param {string} mediaType
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isContactIconInfoDisplayed(contactName: ContactName, timeOut?: number): Promise<boolean> {
		try {
			if (contactName == ContactName.CHAT) {
				return await this.icoChatInfo.isDisplayed(timeOut);
			} else if (contactName == ContactName.PHONE_CALL) {
				return await this.icoInboundPhoneInfo.isDisplayed(timeOut);
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.isContactIconInfoDisplayed, err.message);
		}
	}
	/**
	 * Check if quick reply wraps text in MAX inC-UI
	 * @author Tuan.Vu
	 * @param {text} string Content of quick reply
	 * @returns {Promise<string>} Return value of isQuickreplyWrapsText
	 * @memberof MaxPage
	 */
	public async isQuickReplyTextWrapped(text: string): Promise<boolean> {
		try {
			await this.lblQuickReplyMessage(text).getCssValue("box-sizing");
			return await this.lblQuickReplyMessage(text).getCssValue("box-sizing") == "border-box";
		} catch (err) {
			throw new errorwrapper.CustomError(this.isQuickReplyTextWrapped, err.message);
		}
	}

	/**
    * Open quick replies panel
    * @author Tan.Ta
	* @returns {Promise<void>}
	* @memberof MaxPage
	*/
	public async openQuickRepliesPanel(state: boolean = true): Promise<void> {
		try {
			if (state) {
				Logger.write(FunctionType.UI, "Opening Quick Replies panel");
				if (!await this.pnlQuickReplies.isDisplayed(TestRunInfo.shortTimeout)) {
					await this.btnExpandQuickReplies.click();
				}
			} else {
				Logger.write(FunctionType.UI, "Closing Quick Replies panel");
				if (await this.pnlQuickReplies.isDisplayed()) {
					await this.btnExpandQuickReplies.click();
				}
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.openQuickRepliesPanel, err.message);
		}
	}

	/**
    * Open quick replies panel by contact id
    * @author Phat TTruong
	* @returns {Promise<void>}
	* @memberof MaxPage
	*/
	public async openQuickRepliesPanelByContactId(contactId: string): Promise<void> {
		try {
			Logger.write(FunctionType.UI, "Opening Quick Replies panel by contact id");
			if (!await this.pnlQuickReplies.isDisplayed(TestRunInfo.shortTimeout)) {
				await this.btnExpandQuickRepliesByContactId(contactId).click();
			}
		}
		catch (err) {
			throw new errorwrapper.CustomError(this.openQuickRepliesPanelByContactId, err.message);
		}
	}

	/**
    * Close quick replies panel by contact id
    * @author Phat TTruong
	* @returns {Promise<void>}
	* @memberof MaxPage
	*/
	public async closeQuickRepliesPanelByContactId(contactId: string): Promise<void> {
		try {
			Logger.write(FunctionType.UI, "Closing Quick Replies panel by contact id");
			if (await this.pnlQuickReplies.isDisplayed()) {
				await this.btnExpandQuickRepliesByContactId(contactId).click();
			}
		}
		catch (err) {
			throw new errorwrapper.CustomError(this.closeQuickRepliesPanelByContactId, err.message);
		}
	}

	/**
	 * Contact icons should be displayed on inbox items for all media types 
	 * @author Y.Le
	 * @param {string} mediaType
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isContactIconSummaryDisplayed(contactName: ContactName, timeOut?: number): Promise<boolean> {
		try {
			if (contactName == ContactName.CHAT) {
				return await this.icoChatSummary.isDisplayed(timeOut);
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.isContactIconSummaryDisplayed, err.message);
		}
	}

	/**
	 * Check quick reply is displayed or not
	 * @author Tan.Ta
	 * @param {string} title
	 * @returns {Promise<boolean>}  the existence of quick reply
	 * @memberof MaxPage
	 */
	public async isQuickReplyDisplayed(title: string, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblQuickReplyTitle(title).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isQuickReplyDisplayed, err.message);
		}
	}

	/**
	 * Check insert quick reply is displayed or not
	 * @author Tan.Ta
	 * @param {string} title
	 * @returns {Promise<boolean>} the existence of insert quick reply button
	 * @memberof MaxPage
	 */
	public async isInsertQuickReplyButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.btnInsertQuickReply.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isInsertQuickReplyButtonDisplayed, err.message);
		}
	}

	/**
	 * Check insert quick reply (in chat) is displayed or not 
	 * @author Devi Venkatachalam
	 * @returns {Promise<boolean>} the existence of insert quick reply button
	 * @memberof MaxPage
	 */
	public async isInsertQuickReplyButtonDisplayedForChat(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.btnInsertQuickReplyChat.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isInsertQuickReplyButtonDisplayedForChat, err.message);
		}
	}

	/**
	 * Check cancel quick reply button is displayed or not
	 * @author Tan.Ta
	 * @param {string} title
	 * @returns {Promise<boolean>} the existence of cancel quick reply button
	 * @memberof MaxPage
	 */
	public async isCancelQuickReplyButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.btnCancelQuickReply.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCancelQuickReplyButtonDisplayed, err.message);
		}
	}

	/**
	 * Insert quick reply
	 * @author Tan.Ta
     * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async insertQuickReply(): Promise<void> {
		try {
			Logger.write(FunctionType.UI, "Inserting Quick Reply");
			await this.btnInsertQuickReply.click();
		} catch (err) {
			throw new errorwrapper.CustomError(this.insertQuickReply, err.message);
		}
	}

	/**
	 * Insert quick reply in chat workspace
	 * @author Devi venkatachalam
     * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async insertQuickReplyChat(): Promise<void> {
		try {
			Logger.write(FunctionType.UI, "Inserting Quick Reply");
			await this.btnInsertQuickReplyChat.click();
		} catch (err) {
			throw new errorwrapper.CustomError(this.insertQuickReplyChat, err.message);
		}
	}

	/* Open Agent Reports
	 * @author Anh.Ho	  
	 * @returns {Promise<MaxPage>} 
	 * @memberof MaxPage
	 */
	public async openAgentReports(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Opening Agent Reports");
			await this.btnAgentReport.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.openAgentReports, err.message);
		}
	}

	/* Open assigned skills detailed
	 * @author Anh.Ho	 
	 * @returns {Promise<MaxPage>} 
	 * @memberof MaxPage
	 */
	public async openAssignedSkillsDetail(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Opening detail report");
			await this.icoSelectAssignedSkills.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.openAssignedSkillsDetail, err.message);
		}
	}

	/**
	 * Open assigned skills master
	 * @author Anh.Ho	 
	 * @returns {Promise<MaxPage>} 
	 * @memberof MaxPage
	 */
	public async openAssignedSkillsMaster(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Opening master report");
			let isAssignedSkillDetailed: boolean = await this.pnlAssignedSkillsPanel.isDisplayed(TestRunInfo.shortTimeout);
			if (isAssignedSkillDetailed == true) {
				this.btnBackAssignedSkillsMaster.click();
			}
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.openAssignedSkillsMaster, err.message);
		}
	}

	/**
	* Is Chat Inbound Icon exist
	* @author Tung.Vo
	* @returns {Promise<boolean>} true if chat inbound exist, false it not
	* @memberof MaxChatPage
	*/
	public async isChatInboundIconDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.icoChatInbound.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isChatInboundIconDisplayed, err.message);
		}
	}

    /** 
     * Search Quick Replies
     * @author Nhat.Nguyen
     * @param {quickReplyTitle} string Quick reply title
     * @returns {Promise<MaxPage>}
     * @memberof MaxPage
    */
	public async searchQuickReplies(quickReplyKeyword: string): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Searching quick reply keyword up quick replies`)
			await this.txtSearchQuickReplies.type(quickReplyKeyword);
			await this.txtSearchQuickReplies.sendKeys(Key.ENTER);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.searchQuickReplies, err.message);
		}
	}

	/**	
	 * Wait for quick replies panel
	 * @author Nhat.Nguyen
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async waitForQuickRepliesPanel(): Promise<MaxPage> {
		try {
			await this.pnlQuickReplies.wait();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForQuickRepliesPanel, err.message);
		}
	}

	/**	
	 * Is quick replies panel displayed
	 * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} displayed or not
	 * @memberof MaxPage
	 */
	public async isQuickRepliesPanelDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.pnlQuickReplies.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isQuickRepliesPanelDisplayed, err.message);
		}
	}

	/**	
	 * Get ACW Time
	 * @author Tung.Vo
	 * @returns {Promise<string>} acw current time
	 * @memberof MaxPage
	 */
	public async getACWTime(): Promise<string> {
		try {
			await this.lblACWTime.waitForVisibilityOf();
			return await this.lblACWTime.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getACWTime, err.message);
		}
	}

	/**	
	 * Is ACW Time Formatted MM:SS
	 * @author Tung.Vo
	 * @returns {Promise<boolean>} acw current time formatted mm:ss or not
	 * @memberof MaxPage
	 */
	public async isACWTimeFormattedMMSS(): Promise<boolean> {
		try {
			let acwTime = await this.getACWTime();
			let acwTimeArr: string[] = acwTime.split(":", 2);
			let acwMinute: number = parseInt((acwTimeArr[0]));
			let acwSecond: number = parseInt((acwTimeArr[1]));
			if (acwMinute < 60 && acwSecond < 60) {
				return true;
			}
			return false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isACWTimeFormattedMMSS, err.message);
		}
	}

	/**	
	 * Input value to address book
	 * @author Tan.Ta
	 * @param {string} searchingText
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async inputAddressBook(searchingText: string): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, `Inputting to address book`);
			await this.txtSearchAddress.type(searchingText);
			await this.addressBookItem(searchingText).waitForControlStable();
		} catch (err) {
			throw new errorwrapper.CustomError(this.inputAddressBook, err.message);
		}
	}

	/**
	 * Check contact is displayed or not in address book
	 * @author Tan.Ta
	 * @param { string } value contact want to check
	 * @returns { Promise<boolean>} displayed or not
	 * @memberof MaxPage
	 */
	public async isContactInAddressBookDisplayed(value: string, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.addressBookItem(value).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isContactInAddressBookDisplayed, err.message);
		}
	}

	/**	
	 * Wait for MAX change to expected state
	 * @author Chinh.Nguyen
	 * @param {string} MAXState
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async waitForMAXStateChangeTo(MAXState: string): Promise<MaxPage> {
		try {
			let state: string = await this.btnStateSection.getText();
			let stopTime: number = 0;
			let stopWatch = new StopWatch();
			stopWatch.startClock();
			while (state != MAXState && stopTime < TestRunInfo.longTimeout) {
				state = await this.btnStateSection.getText();
				stopTime = stopWatch.getElapsedTimeInSecond();
			}
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForMAXStateChangeTo, err.message);
		}
	}

	/**
	* Check icon of assigned skill on Master Report is displayed or not
	* @author Anh.Ho
	* @param {string} timeoutInSecond, contactLabel
	* @returns {Promise<boolean>} the existence of icon
	* @memberof MaxPage
	*/
	public async isIcoAssignedSkillMasterDisplayed(contactLabel: string, timeoutInSecond: number = TestRunInfo.shortTimeout): Promise<boolean> {
		try {
			return await this.icoAssignedSkillMaster(contactLabel).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isIcoAssignedSkillMasterDisplayed, err.message);
		}
	}

	/** 	
	 * Checking tab name is display in advance address book
	 * @author Y.Le
	 * @param {string} tabName
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isAdvancedAddressBookTabDisplayed(tabName: TransferTab, timeOut?: number): Promise<boolean> {
		try {
			return await this.tabAdvanceAddressBook(tabName).isDisplayed(timeOut);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAdvancedAddressBookTabDisplayed, err.message);
		}
	}

	/**
	* Check icon of assigned skill on Detailed Report is displayed or not
	* @author Anh.Ho
	* @param {string} timeoutInSecond, contactLabel, mediaType
	* @returns {Promise<boolean>} the existence of icon
	* @memberof MaxPage
	*/
	public async isIcoAssignedSkillDetailedDisplayed(ruleSkill: string, contactLabel: string, timeoutInSecond: number = TestRunInfo.shortTimeout): Promise<boolean> {
		try {
			return await this.icoAssignedSkillDetailed(ruleSkill, contactLabel).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isIcoAssignedSkillMasterDisplayed, err.message);
		}
	}

	/** 
	 * Check search filed is top od address book advance
	 * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isSearchFieldOnTopAddressBook(): Promise<boolean> {
		try {
			let searchLocation: ILocation = await this.txtSearchAddress.getLocation();
			let addressBookLocation: ILocation = await this.popAddressBook.getLocation();
			return searchLocation.y - addressBookLocation.y <= 5
		} catch (err) {
			throw new errorwrapper.CustomError(this.isSearchFieldOnTopAddressBook, err.message);
		}
	}

	/**
	 * Check ACW timer displayed
	 * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} displayed or not
	 * @memberof MaxPage
	 */
	public async isACWTimerCountDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblACWTime.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isACWTimerCountDisplayed, err.message);
		}
	}

	/** 
	 * Check Agent Status changed
	 * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} displayed or not
	 * @memberof MaxPage
	 */
	public async checkAgentStatusChanged(oldAgentStatus: string, currentAgentStatus: string): Promise<boolean> {
		try {
			return (oldAgentStatus != currentAgentStatus)
		} catch (err) {
			throw new errorwrapper.CustomError(this.checkAgentStatusChanged, err.message);
		}
	}

	/**
	 * Check history item list is displayed or not
	 * @author AnhLe
	 * @param {boolean} [state=true]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isNoRecentCall(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblNoRecentCall.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isNoRecentCall, err.message);
		}
	}

	/**
	 * Check Personal Queue, Coming Up, and Call History is displayed or not
	 * @author AnhLe
	 * @returns {Promise<boolean>} the existence of MaxGlance
	 * @memberof MaxPage
	 */
	public async isHeaderDisplayed(headerType: string, timeoutInSecond?: number): Promise<boolean> {
		try {
			switch (headerType) {
				case "PersonalQueue": {
					return await this.lblPersonalQueueHeader.isDisplayed(timeoutInSecond);
				}
				case "ComingUp": {
					return await this.lblComingUpHeader.isDisplayed(timeoutInSecond);
				}
				case "CallHistory": {
					return await this.lblCallHistoryHeader.isDisplayed(timeoutInSecond);
				}
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.isHeaderDisplayed, err.message);
		}
	}

	/**
	 * Go To Max More Tools page
	 * @returns {Promise<MaxMoreToolsPage>} the existence of Add New dialog
	 * @author Tung.Vo
	 * @memberof MaxPage
	 */
	public async goToMaxMoreToolsPage(): Promise<MaxMoreToolsPage> {
		try {
			await Logger.write(FunctionType.UI, `Going to Max More Tools Page`);
			await this.toolbarItem("More").click();
			return await MaxMoreToolsPage.getInstance()
		} catch (err) {
			throw new errorwrapper.CustomError(this.goToMaxMoreToolsPage, err.message);
		}
	}
	/**
	 * Checking ACW name is next to time counter
	 * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isACWNameNextToTimeCounter(): Promise<boolean> {
		try {
			let acwNameLocation: ILocation = await this.lblACWName.getLocation();
			let acwTimeLocation: ILocation = await this.lblACWTime.getLocation();
			let acwNameSize: ISize = await this.lblACWName.getSize();
			return acwTimeLocation.x - (acwNameLocation.x + acwNameSize.width) <= 5 // 5 is the tolerant of two element
		} catch (err) {
			throw new errorwrapper.CustomError(this.isACWNameNextToTimeCounter, err.message);
		}
	}
	/**	
 	* Get skill name of New Contact Popup
 	* @author Anh.Ho 	
 	* @returns {Promise<string>} MAX page
 	* @memberof MaxPage
 	*/
	public async getSkillNameOfNewContactPopUp(): Promise<string> {
		try {
			return await this.lblSkillNameOfContactPopup.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getSkillNameOfNewContactPopUp, err.message);
		}
	}

	/**	
 	* Check skill name of new contact popup is displayed correctly or not
 	* @author Anh.Ho 	
 	* @returns {Promise<boolean>} MAX page
 	* @memberof MaxPage
 	*/
	public async isSkillNameOfNewContactPopUpCorrectly(skillType: SkillType): Promise<boolean> {
		try {
			let skillName: string = SkillCore.getSkillName(skillType)
			let actualSkillName: string = await this.getSkillNameOfNewContactPopUp();
			if (actualSkillName == skillName) {
				return true;
			}
			return false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isSkillNameOfNewContactPopUpCorrectly, err.message);
		}
	}

	/**	
 	* click close button
 	* @author Nhat.Nguyen 	
 	* @returns {Promise<MaxPage>} MAX page
 	* @memberof MaxPage
 	*/
	public async clickCloseButton(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Clicking close button`);
			await this.btnClose.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickCloseButton, err.message);
		}
	}

	/**	
 	* is Error Dialog displayed
 	* @author Nhat.Nguyen 	
 	* @returns {Promise<boolean>} displayed or not
 	* @memberof MaxPage
 	*/
	public async isErrorDialogDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.pnlErrorDialog.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isErrorDialogDisplayed, err.message);
		}
	}

	/** Check if agent report button displayed
	 * @author Phat.Truong  
	 * @returns {Promise<boolean>} displayed or not
	 * @memberof MaxPage
	 **/
	public async isAgentReportsButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.btnAgentReport.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAgentReportsButtonDisplayed, err.message);
		}
	}

	/**	
	* Check if queue displayed
	* @author Phat.Truong  
	* @returns {Promise<boolean>} displayed or not
	* @memberof MaxPage
 	*/
	public async isSkillQueueDisplayed(skillName: string, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblSkillQueue(skillName).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isSkillQueueDisplayed, err.message);
		}
	}

	/**
	* Hover mouse over Agent Report button
	* @author Phat.Truong
	* @returns {Promise<void>}
	* @memberof MaxPage
	*/
	public async hoverAgentReportButton(): Promise<void> {
		try {
			await this.btnAgentReport.moveMouse();
			await this.btnAgentReport.waitUntilCssValueNotChange("background-color", 5);
		} catch (err) {
			throw new errorwrapper.CustomError(this.hoverAgentReportButton, err.message);
		}
	}

	/**
	 * Get background color of Agent Report button
	 * @author Phat.Truong
	 * @returns {Promise<string>}
	 * @memberof MaxPage
	 */
	public async getAgentReportBackGroundColor(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting background color of Agent Report button");
			return await this.btnAgentReport.getCssValue("background-color");
		} catch (err) {
			throw new errorwrapper.CustomError(this.getAgentReportBackGroundColor, err.message);
		}
	}

	/**	
	* Check if queue displayed Main Pop over dispalyed
	* @author Phat.Truong  
	* @returns {Promise<boolean>} displayed or not
	* @memberof MaxPage
 	*/
	public async isReportAgentPopOverDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.pnlAgentReports.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isReportAgentPopOverDisplayed, err.message);
		}
	}

	/**	
	* Get back ground color of Agent Report Header
	* @author Phat.Truong  
	* @returns {Promise<string>} 
	* @memberof MaxPage
 	*/
	public async getAgentReportHeaderBGColor(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting background color of Agent Report Header");
			await this.pnlAgentReportsHeader.waitUntilCssValueNotChange("background-color");
			return Utility.convertRgbToHex(await this.pnlAgentReportsHeader.getCssValue("background-color"));
		} catch (err) {
			throw new errorwrapper.CustomError(this.getAgentReportHeaderBGColor, err.message);
		}
	}

	/**	
	* Get back color of Agent Report Header
	* @author Phat.Truong  
	* @returns {Promise<string>} 
	* @memberof MaxPage
	*/
	public async getAgentReportHeaderColor(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting color of Agent Report Header");
			await this.lblAgentReports(AgentReportOption.REPORTS).waitUntilCssValueNotChange("color");
			return Utility.convertRgbToHex(await this.lblAgentReports(AgentReportOption.REPORTS).getCssValue("color"));
		} catch (err) {
			throw new errorwrapper.CustomError(this.getAgentReportHeaderColor, err.message);
		}
	}

	/**	
	* Check if Agent Report Option Displayed
	* @author Phat.Truong  
	* @param agentReportOption Performance, Productivity and  Assign Skills
	* @returns {Promise<boolean>} displayed or not
	* @memberof MaxPage
	*/
	public async isAgentReportOptionDisplayed(agentReportOption: AgentReportOption, timeoutInSecond?: number): Promise<boolean> {
		try {
			switch (agentReportOption) {
				case AgentReportOption.PERFORMANCE: {
					return await this.pnlPerformanceOption.isDisplayed(timeoutInSecond);
				}
				case AgentReportOption.PRODUCTIVITY: {
					return await this.pnlProductivityOption.isDisplayed(timeoutInSecond);
				}
				case AgentReportOption.ASSIGN_SKILLS: {
					return await this.pnlAssignSkillsOption.isDisplayed(timeoutInSecond);
				}
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAgentReportOptionDisplayed, err.message);
		}
	}

	/**	
	* Check if Agent Report Option Favorite icon Displayed
	* @author Phat.Truong  
	* @param agentReportOption Performance, Productivity and  Assign Skills
	* @returns {Promise<string>} 
	* @memberof MaxPage
 	*/
	public async isOptionFavoriteIconDisplayed(agentReportOption: AgentReportOption, timeoutInSecond?: number): Promise<boolean> {
		try {
			switch (agentReportOption) {
				case AgentReportOption.PERFORMANCE: {
					return await this.icoAgentReportsFavorite(AgentReportOption.PERFORMANCE).isDisplayed(timeoutInSecond);
				}
				case AgentReportOption.PRODUCTIVITY: {
					return await this.icoAgentReportsFavorite(AgentReportOption.PRODUCTIVITY).isDisplayed(timeoutInSecond);
				}
				case AgentReportOption.ASSIGN_SKILLS: {
					return await this.icoAgentReportsFavorite(AgentReportOption.PRODUCTIVITY).isDisplayed(timeoutInSecond);
				}
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.isOptionFavoriteIconDisplayed, err.message);
		}
	}

	/**	
	* Check if Agent Report Option Drill icon Displayed
	* @author Phat.Truong  
	* @param agentReportOption Performance, Productivity and  Assign Skills
	* @returns {Promise<string>} 
	* @memberof MaxPage
	*/
	public async isOptionDrillIconDisplayed(agentReportOption: AgentReportOption, timeoutInSecond?: number): Promise<boolean> {
		try {
			switch (agentReportOption) {
				case AgentReportOption.PERFORMANCE: {
					return await this.icoAgentReportsDrillIcon(AgentReportOption.PERFORMANCE).isDisplayed(timeoutInSecond);
				}
				case AgentReportOption.PRODUCTIVITY: {
					return await this.icoAgentReportsDrillIcon(AgentReportOption.PRODUCTIVITY).isDisplayed(timeoutInSecond);
				}
				case AgentReportOption.ASSIGN_SKILLS: {
					return await this.icoAgentReportsDrillIcon(AgentReportOption.PRODUCTIVITY).isDisplayed(timeoutInSecond);
				}
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.isOptionDrillIconDisplayed, err.message);
		}
	}

	/**	
	* Check if Agent Report Option Drill icon Displayed
	* @author Phat.Truong  
	* @param agentReportOption Performance, Productivity and  Assign Skills
	* @returns {Promise<MaxPage>}
	* @memberof MaxPage
  	*/
	public async clickDrillIconAgentReportOption(agentReportOption: AgentReportOption): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Clicking on Drill icon of ${agentReportOption} `);
			switch (agentReportOption) {
				case AgentReportOption.PERFORMANCE: {
					await this.icoAgentReportsDrillIcon(AgentReportOption.PERFORMANCE).click();
					break;
				}
				case AgentReportOption.PRODUCTIVITY: {
					await this.icoAgentReportsDrillIcon(AgentReportOption.PRODUCTIVITY).click();
					break;
				}
				case AgentReportOption.ASSIGN_SKILLS: {
					await this.icoAgentReportsDrillIcon(AgentReportOption.ASSIGN_SKILLS).click();
					break;
				}
			}
			return this
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickDrillIconAgentReportOption, err.message);
		}
	}

	/**	
	* Get  Agent Report Header title
	* @author Phat.Truong  
	* @returns {Promise<string>} 
	* @memberof MaxPage
	*/
	public async getAgentReportHeader(agentReportOption: AgentReportOption): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting header name");
			return await this.lblAgentReports(agentReportOption).getAttribute('title');
		} catch (err) {
			throw new errorwrapper.CustomError(this.getAgentReportHeader, err.message);
		}
	}

	/**	
	* Click on back button of Agent Reports
	* @author Phat.Truong  
	* @returns {Promise<MaxPage>} 
	* @memberof MaxPage
	*/
	public async clickBackButtonAgentReport(agentReportOption: AgentReportOption): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Clicking back button of ${agentReportOption} `);
			await this.btnAgentReportsBack(agentReportOption).click();
			return this
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickBackButtonAgentReport, err.message);
		}
	}

	/**	
	* Check if back button Agent Report Option Displayed
	* @author Phat.Truong  
	* @returns {Promise<Boolean>} displayed or not
	* @memberof MaxPage
 	*/
	public async isBackButtonReportOptionDisplayed(agentReportOption: AgentReportOption, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.btnAgentReportsBack(agentReportOption).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isBackButtonReportOptionDisplayed, err.message);
		}
	}

	/**	
	* Check if favorite icon display in Agent Option
	* @author Phat.Truong  
	* @returns {Promise<Boolean>} displayed or not
	* @memberof MaxPage
 	*/
	public async isFavoriteIconOptionDisplayed(agentReportOption: AgentReportOption, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.icoFavoriteAgentOption(agentReportOption).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isFavoriteIconOptionDisplayed, err.message);
		}
	}

	/**	
	* Check if Date Range button display in Agent Option
	* @author Phat.Truong  
	* @returns {Promise<Boolean>} displayed or not
	* @memberof MaxPage
 	*/
	public async isPerformanceDateRangeDisplayed(timeRange: TimeRangeOption, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.btnPerformanceDateRange(timeRange).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPerformanceDateRangeDisplayed, err.message);
		}
	}

	/**	
	* Check if performance table displayed
	* @author Phat.Truong  
	* @returns {Promise<Boolean>} displayed or not
	* @memberof MaxPage
 	*/
	public async isPerformanceTableDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.tblPerformance.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPerformanceTableDisplayed, err.message);
		}
	}

	/**	
	* Check if performance table header displayed
	* @author Phat.Truong  
	* @returns {Promise<Boolean>} displayed or not
	* @memberof MaxPage
 	*/
	public async isPerformanceTableHeaderDisplayed(headerName: string, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblPerformanceTableHeader(headerName).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPerformanceTableHeaderDisplayed, err.message);
		}
	}

	/**	
	* Click on favorite icon in Agent Option
	* @author Phat.Truong  
	* @returns {Promise<MaxPage>} 
	* @memberof MaxPage
 	*/
	public async clickFavoriteIconOption(agentReportOption: AgentReportOption, timeoutInSecond?: number): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Clicking favorite icon of ${agentReportOption} `);
			await this.icoFavoriteAgentOption(agentReportOption).click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickFavoriteIconOption, err.message);
		}
	}

	/**	
	* Get favorite icon color in Agent Option
	* @author Phat.Truong  
	* @returns {Promise<string>} 
	* @memberof MaxPage
	*/
	public async getFavoriteIconOptionColor(agentReportOption: AgentReportOption): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Getting favorite icon of ${agentReportOption} `);
			return await this.icoFavoriteAgentOption(agentReportOption).getCssValue('color');
		} catch (err) {
			throw new errorwrapper.CustomError(this.getFavoriteIconOptionColor, err.message);
		}
	}

	/**	
	* Set favorite on/off in Agent Option
	* @author Phat.Truong  
	* @returns {Promise<string>} 
	* @memberof MaxPage
 	*/
	public async setFavoriteIconMode(agentReportOption: AgentReportOption, mode: string): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Setting favorite icon of ${agentReportOption} as ${mode}`);
			let iconStatus: string = await this.icoFavoriteAgentOption(agentReportOption).getAttribute('title');
			if (mode == 'off' && iconStatus == 'Favorite (selected)') {
				await this.icoFavoriteAgentOptionStatus(agentReportOption, 'Favorite (selected)').click();
			}
			else if (mode == 'on' && iconStatus == 'Favorite (not selected)') {
				await this.icoFavoriteAgentOptionStatus(agentReportOption, 'Favorite (not selected)').click();
			}
			return this
		} catch (err) {
			throw new errorwrapper.CustomError(this.setFavoriteIconMode, err.message);
		}
	}

	/**	
	* Check state of favorite on/off in Agent Option
	* @author Phat.Truong  
	* @returns {Promise<boolean>} 
	* @memberof MaxPage
	*/
	public async isFavoriteIconModeCorrect(agentReportOption: AgentReportOption, mode: string, timeoutInSecond?: number): Promise<boolean> {
		try {
			if (mode == 'on') {
				return await this.icoFavoriteAgentOptionStatus(agentReportOption, 'Favorite (selected)').isDisplayed(timeoutInSecond);
			}
			else {
				return await this.icoFavoriteAgentOptionStatus(agentReportOption, 'Favorite (not selected)').isDisplayed(timeoutInSecond);
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.isFavoriteIconModeCorrect, err.message);
		}
	}

	/**	
	* Get Agent report button text
	* @author Phat.Truong  
	* @returns {Promise<string>} 
	* @memberof MaxPage
 	*/
	public async getAgentReportText(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Getting name of Agent reports `);
			return await this.btnAgentReport.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getAgentReportText, err.message);
		}
	}
	/**	
	* Get Agent report button tooltip
	* @author Phat.Truong  
	* @returns {Promise<string>} 
	* @memberof MaxPage
 	*/
	public async getAgentReportTooltip(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Getting tooltip of Agent reports `);
			return await this.btnAgentReport.getAttribute('title');
		} catch (err) {
			throw new errorwrapper.CustomError(this.getAgentReportTooltip, err.message);
		}
	}

	/**
	 * Checking max glance overlay is opened
	 * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isMaxGlanceOpened(): Promise<boolean> {
		try {
			return await this.pnlMaxGlanceOverlay.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMaxGlanceOpened, err.message);
		}
	}

	/**	
 	* Check windows size of MAX
 	* @author Nhat.Nguyen 	
 	* @returns {Promise<boolean>} 
 	* @memberof MaxPage
 	*/
	public async isMaxSizeChanged(originalSize: ISize, currentSize: ISize): Promise<boolean> {
		try {
			return (originalSize.height != currentSize.height || originalSize.width != currentSize.width)
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMaxSizeChanged, err.message);
		}
	}

	/**
	 * Clicking New button to open New popup
	 * @author Y.Le
	 * @returns {Promise<this>}
	 * @memberof MaxPage
	 */
	public async openNewPopUp(): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Clicking to 'New' button");
			await this.btnNew.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.openNewPopUp, err.message);
		}
	}

	/**
     * Opening my team tab in address book
	 * @author Y.Le
     * @returns {Promise<this>}
     * @memberof MaxCall
     */
	public async openAddressBookTab(tabName: TransferTab): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Opening my team tab in address book");
			await this.tabAdvanceAddressBook(tabName).click();
			return await this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.openAddressBookTab, err.message);
		}
	}

	/**
     * Filtering agent name in address book
	 * @author Y.Le
     * @param {string} agentName
     * @returns {Promise<this>}
     * @memberof MaxCall
     */
	public async filterAgentNameOrNumberAddressBook(agentName: string): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Filtering agent name in address book");
			await this.txtSearchAddress.type(agentName);
			await this.lblSearchResultAddressBook(agentName).waitForControlStable();
			return await this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.filterAgentNameOrNumberAddressBook, err.message);
		}
	}

	/**
	 * Making call to other agent from agent
	 * @author Y.Le
	 * @param {string} agentName
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxPage
	 */
	public async makeInBoundPhoneToAgent(agentName: string): Promise<MaxCall> {
		try {
			await Logger.write(FunctionType.UI, "Making call to other agent from agent");
			await this.txtSearchAddress.waitForVisibilityOf();
			await this.txtSearchAddress.type(agentName);
			await this.lblSearchResultAddressBook(agentName).waitForControlStable(TestRunInfo.middleTimeout);
			await this.lblSearchResultAddressBook(agentName).moveMouse();
			await this.btnCallAddressBook(agentName).waitForControlStable();
			await this.btnCallAddressBook(agentName).moveMouse();
			await this.btnCallAddressBook(agentName).click();
			let maxCall = require(`${ProjectPath.pageObjects}/inContact/max/max-call`).default;
			return maxCall.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.makeInBoundPhoneToAgent, err.message);
		}
	}

	/**
	 * Accepting the inbound call popup
	 * @author Y.Le
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async acceptInBoundCallContact(): Promise<MaxCall> {
		try {
			await Logger.write(FunctionType.UI, "Accepting the inbound call popup");
			await this.btnAcceptCallContact.wait();
			await this.btnAcceptCallContact.click();
			await this.pnlCallWorkspace.wait();
			let maxCall = require("${ProjectPath.pageObjects}/inContact/max/max-call").default;
			return maxCall.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.acceptInBoundCallContact, err.message);
		}
	}

	/** Is Queue count displayed below icon
	 * @author Nhat.Nguyen
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isQueueCountDisplayedBelowIcon(skillName: string, timeoutInSecond?: number): Promise<boolean> {
		try {
			let horizontalTolerance: number = 10;
			let verticalTolerance: number = 5;
			let icoSkillLocation: ILocation = await this.icoSkill(skillName).getLocation(timeoutInSecond);
			let skillQueueLocation: ILocation = await this.lblSkillQueue(skillName).getLocation(timeoutInSecond);
			let icoSkillSize: ISize = await this.icoSkill(skillName).getSize(timeoutInSecond);
			return (skillQueueLocation.y - (icoSkillLocation.y + icoSkillSize.height) <= verticalTolerance) && (icoSkillLocation.x - skillQueueLocation.x <= horizontalTolerance)
		} catch (err) {
			throw new errorwrapper.CustomError(this.isQueueCountDisplayedBelowIcon, err.message);
		}
	}
	/**	
	 * @author Anh.Le
	 * Get time duration on popUp
	 * @returns {Promise<number>}
	 * @memberof MaxPage
	 */
	public async getTimeDurationOnPopUp(): Promise<number> {
		try {
			await Logger.write(FunctionType.UI, "Getting time duration on popUp")
			await this.lblTimeDurationPopUp.wait();
			let stringTime: string = await this.lblTimeDurationPopUp.getText();
			stringTime = stringTime.match(/\d{1,2}:\d{2}/)[0];
			return Utility.convertStringMinutesToSeconds(stringTime);
		} catch (err) {
			throw new errorwrapper.CustomError(this.getTimeDurationOnPopUp, err.message);
		}
	}

	/* Get size of max page
	* @returns {Promise<boolean>} Return size of Max Wrappper panel
	* @author Tung Vo
	* @memberof MaxPage
	*/
	public async getMaxWrapPanelSize(mode: string = "number"): Promise<any> {
		try {
			await Logger.write(FunctionType.UI, "Getting MAX wrap page size");
			await this.divMaxWrapper.waitUntilPropertyNotChange('width');
			let sizeGlance: ISize = await this.divMaxWrapper.getSize();
			if (mode == "number") {
				let glanceWidth = sizeGlance.width;
				return glanceWidth;
			}
			else if (mode == "ISize") {
				return sizeGlance;
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.getMaxWrapPanelSize, err.message);
		}
	}

	/**
	 * Wait for popover address book disappeared
	 * @author Huy.Nguyen
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async waitForPopAddressBookDisappear(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Waiting for popover address book disappear");
			await this.txtSearchAddress.waitUntilDisappear();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForPopAddressBookDisappear, err.message);
		}
	}

    /**	
     * Get state time
     * @author Chinh.Nguyen
     * @returns {Promise<string>}
     * @memberof MaxPage
     */
	public async getStateTime(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting state time");
			return await this.lblTimeState.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getStateTime, err.message);
		}
	}

	/**
	 * Checking call contact pop up is displayed
	 * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isCallContactPopUpDisplayed(timeOut?: number): Promise<boolean> {
		try {
			return this.btnAcceptCallContact.isDisplayed(timeOut);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCallContactPopUpDisplayed, err.message);
		}
	}

	/** Getting skill name to transfer (Note: skill name had been not assigned to agent)
	 * @author Y.Le
	 * @param {Agent} agent
	 * @param {string} mediaType
	 * @returns {Promise<string>}
	 * @memberof MaxPage
	 */
	public async getSkillNameTransfer(agent: Agent, mediaType: string): Promise<string> {
		try {
			await Logger.write(FunctionType.API, "Getting skill name transfer");
			let listKillsTransfer: string[] = await CustomAPIs.getListSkillNameOfMediaType(agent, mediaType);
			if (listKillsTransfer.length == 0) {
				throw new errorwrapper.CustomError(this.getSkillNameTransfer, "There is no skill available");
			} else {
				for (let i = 0; i < listKillsTransfer.length; i++) {
					let isSkillBelongToAgent: boolean = await CustomAPIs.isSkillsActiveOnAgent(agent, listKillsTransfer[i]);
					if (isSkillBelongToAgent == false) {
						return listKillsTransfer[i];
					}
				}
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.getSkillNameTransfer, err.message);
		}
	}

	/**	
	* Get Agent report button tooltip
	* @author Tuan.Vu  
	* @returns {Promise<string>} 
	* @memberof MaxPage
 	*/
	public async getPopupPhoneContactName(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Getting popup phone contact name`);
			return await this.lblPopupPhoneContactName.getControlTitle();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getPopupPhoneContactName, err.message);
		}
	}

	/**
	 * Click New button on MAX
	 * @author Nhat.Nguyen
	 * @param {string} emailAddress
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async enterEmailAddress(emailAddress: string): Promise<void> {
		try {
			if (await this.plnNew.isDisplayed(TestRunInfo.shortTimeout)) {
				await Logger.write(FunctionType.UI, `Entering email address`);
				await this.txtSearchAddress.type(emailAddress);
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.enterEmailAddress, err.message);
		}
	}

	/**
	 * Enter launch MAX form of new BU
	 * @param {MaxConnectOption} phoneType Phone Type value
	 * @param {string} phoneNumber Phone number value
	 * @param {boolean} [rememberMe=false] Select Remember Me checkbox, default value is false
	 * @returns {Promise<MaxPage>} 
	 * @memberof MaxPage
	 */
	public async enterLaunchForm(phoneType: MaxConnectOption, phoneNumber: string, rememberMe: boolean = false, loopTimes: number = 1): Promise<void> {
		try {
			let sw: StopWatch = new StopWatch();
			sw.startClock();

			await BrowserWrapper.sleepInSecond(TestRunInfo.shortTimeout);

			if (phoneType == MaxConnectOption.SOFT_PHONE) {
				await this.radSoftPhone.click();
			} else {
				await Logger.write(FunctionType.UI, "Entering information to the Launching Max form");

				try {
					if (phoneType == MaxConnectOption.PHONE) {
						await this.radPhone.click();
						await this.txtPhone.type(phoneNumber);
					} else if (phoneType == MaxConnectOption.STATION_ID) {
						await this.radStation.click();
						await this.txtStation.type(phoneNumber);
					}
				} catch (error) {
					if (sw.getElapsedTimeInSecond() >= 30 && loopTimes > 0) {
						await BrowserWrapper.refreshPage();
						loopTimes--;
						await this.enterLaunchForm(phoneType, phoneNumber, rememberMe, loopTimes);
					}
				}
			}

			if (rememberMe) {
				await this.chkRememberMe.click();
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.enterLaunchForm, err.message);
		}
	}

	/**
	 * Connect MAX
	 * @returns {Promise<MaxPage>} MAX page
	 * @memberof MaxPage
	 */
	public async connectMax(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Connecting MAX");
			await this.btnConnect.click();
			await this.btnNewToolbar.wait();
			await this.btnStateSection.waitForVisibilityOf();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.connectMax, err.message);
		}
	}

	/**
     * Getting the color of error message
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>}
     * @memberof MaxPage
     */
	public async isMAXColorErrorMessageRed(): Promise<boolean> {
		try {
			await Logger.write(FunctionType.UI, "Getting color of error message");
			let style: string = await this.lblErrorMessage.getCssValue("color");
			if (style == "rgba(232, 93, 70, 1)") {
				return true;
			}
			return false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMAXColorErrorMessageRed, err.message);
		}
	}

	/**
     * Getting Error message on Join session
     * @author Nhat.Nguyen
     * @returns {Promise<string>}
     * @memberof MaxPage
     */
	public async getMAXErrorMessage(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting error message on 'Join Agent Session` form");
			return await this.lblErrorMessage.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getMAXErrorMessage, err.message);
		}
	}

	/**
     * Filling join agent session to launch MAX
     * @author Nhat.Nguyen
     * @param {string} phoneNumber
     * @param {string} [mode]
     * @returns {Promise<this>}
     * @memberof MaxPage
     */
	public async fillAgentSession(phoneNumber: string, phoneType?: MaxConnectOption): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, `Filling 'Join Agent Session' form to launch MAX`);
			await this.selectMode(phoneType);
			await this.txtPhone.type(phoneNumber);
			return await this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.fillAgentSession, err.message);
		}
	}

	/**
	 * Select mode before launching MAX
     * @param {string} mode Mode want to select
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async selectMode(phoneType: MaxConnectOption): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, `Selecting mode for launching MAX`);

			if (phoneType.match(MaxConnectOption.PHONE)) {
				await this.radPhone.click();
			} else if (phoneType.match(MaxConnectOption.STATION_ID)) {
				await this.radStation.click();
			} else if (phoneType.match(MaxConnectOption.SOFT_PHONE)) {
				await this.radSoftPhone.click();
				await this.txtPhone.waitUntilDisappear();
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectMode, err.message);
		}
	}

	/**
     * Getting entered phone number
     * @author Nhat.Nguyen
     * @param {string} mode
     * @returns {Promise<string>}
     * @memberof MaxPage
     */
	public async getEnteredPhone(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting entered phone number");
			return <string>await BrowserWrapper.executeScript("return document.getElementById('phoneNumberText').value;");
		} catch (err) {
			throw new errorwrapper.CustomError(this.getEnteredPhone, err.message);
		}
	}

	/**
	* Clicking Continue button on join agent session
	* @author Nhat.Nguyen
	* @returns {Promise<MaxPage>}
	* @memberof MaxPage
	*/
	public async clickContinueButton(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Clicking 'Continue' button")
			await this.btnConnect.click();
			await this.formLaunchMAX.waitUntilDisappear();
			return this
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickContinueButton, err.message);
		}
	}

	/**
	 * Connect MAX
	 * @returns {Promise<MaxPage>} MAX page
	 * @memberof MaxPage
	 */
	public async connectMaxError(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Connecting MAX");
			await this.btnConnect.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.connectMaxError, err.message);
		}
	}

	/**
	* Clicking Continue button on join agent session
	* @author Nhat.Nguyen
	* @returns {Promise<boolean>}
	* @memberof MaxPage
	*/
	public async isAgentSessionFormDisplayedNewBU(timeout?: number): Promise<boolean> {
		try {
			return await this.formLaunchMAX.isDisplayed(timeout);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAgentSessionFormDisplayedNewBU, err.message);
		}
	}

	/**
     * Is error message displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>}
     * @memberof NavigationBar
     */
	public async isErrorMessageDisplayedNewBU(timeout?: number): Promise<boolean> {
		try {
			return await this.lblErrorMessage.isDisplayed(timeout);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isErrorMessageDisplayedNewBU, err.message);
		}
	}

	/**
     * Check disposition timer is increase
     * @author Huy.Nguyen
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof MaxDispositionPage
     */
	public async isChatDispositionTimerIncreased(timeOut?: number): Promise<boolean> {
		try {
			await Logger.write(FunctionType.UI, "Checking Disposition ACW timer is increased");
			await this.dispositionTimer.waitForVisibilityOf();
			let timerAtFirst = <string>await BrowserWrapper.executeScript(`return document.getElementsByClassName("auxiliary-timer")[0].innerText;`);
			await BrowserWrapper.sleepInSecond(2);
			let timerAtSecond = <string>await BrowserWrapper.executeScript(`return document.getElementsByClassName("auxiliary-timer")[0].innerText;`);
			if (timerAtSecond > timerAtFirst) {
				return true;
			} else return false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isChatDispositionTimerIncreased, err.message);
		}
	}

	/*
	 * Check the call is ended or not
	 * @returns {Promise<boolean>} the Agent state
	 * @author Phat.Truong
	 * @memberof MaxPage
	 */
	public async isCallEnded(): Promise<boolean> {
		try {
			await this.btnStateSection.waitUntilPropertyChange("title");
			return (await this.getAgentStatus() == MaxState.AVAILABLE.toUpperCase());
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCallEnded, err.message);
		}
	}

	/**
	 * Check Call history number is displayed or not
	 * @returns {Promise<boolean>}
	 * @author Phat.Truong
	 * @memberof MaxPage
	 */
	public async isCallHistoryNumberDisplayed(number: string, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblCallHistoryNumber(number).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCallHistoryNumberDisplayed, err.message);
		}
	}

	/**
	 * Check Call history skill is displayed or not
	 * @returns {Promise<boolean>}
	 * @author Phat.Truong
	 * @memberof MaxPage
	 */
	public async isCallHistorySkillDisplayed(skillName: string, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblCallHistorySkill(skillName).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCallHistorySkillDisplayed, err.message);
		}
	}

	/**
	 * Check Call history inbound icon is displayed or not
	 * @returns {Promise<boolean>}
	 * @author Phat.Truong
	 * @memberof MaxPage
	 */
	public async isCallHistoryIBIconDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.icoCallHistoryInbound.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCallHistoryIBIconDisplayed, err.message);
		}
	}

	/**
	 * Check Call history outbound icon is displayed or not
	 * @returns {Promise<boolean>}
	 * @author Phat.Truong
	 * @memberof MaxPage
	 */
	public async isCallHistoryOBIconDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.icoCallHistoryOutbound.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCallHistoryOBIconDisplayed, err.message);
		}
	}

	/**
	 * Check Call history active duration is displayed or not
	 * @returns {Promise<boolean>}
	 * @author Phat.Truong
	 * @memberof MaxPage
	 */
	public async isCallHistoryActiveDurationDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblTimeActiveDuration.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCallHistoryActiveDurationDisplayed, err.message);
		}
	}

	/**	
	 * Check if Date Range button display in Agent Option
	 * @author Chinh.Nguyen  
	 * @returns {Promise<Boolean>} displayed or not
	 * @memberof MaxPage
	   */
	public async isProductivityDateRangeDisplayed(timeRange: TimeRangeOption, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.btnProductivityDateRange(timeRange).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isProductivityDateRangeDisplayed, err.message);
		}
	}

	/**	
	* Check if Productivity table header displayed
	* @author Chinh.Nguyen  
	* @returns {Promise<Boolean>} displayed or not
	* @memberof MaxPage
 	*/
	public async isProductivityTableHeaderDisplayed(headerName: string, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblProductivityTableHeader(headerName).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isProductivityTableHeaderDisplayed, err.message);
		}
	}

	/**	
	* Check if agent report header changed
	* @author Chinh.Nguyen  
	* @returns {Promise<Boolean>} change or not
	* @memberof MaxPage
 	*/
	public async isAgentReportHeaderChanged(oldValue: string): Promise<boolean> {
		try {
			if (await this.getAgentReportHeader(AgentReportOption.PRODUCTIVITY) == oldValue) {
				return false;
			} else if (await this.getAgentReportHeader(AgentReportOption.PRODUCTIVITY) != oldValue) {
				return true;
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAgentReportHeaderChanged, err.message);
		}
	}

	/**	
	 * Get color of Favorite icon in Agent Report
	 * @author Chinh.Nguyen  
	 * @returns {Promise<string>} 
	 * @memberof MaxPage
	   */
	public async getAgentReportFavoriteIconColor(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting color of Agent Report Favorite icon");
			return Utility.convertRgbToHex(await this.icoFavoriteIcon.getCssValue("color"));
		} catch (err) {
			throw new errorwrapper.CustomError(this.getAgentReportFavoriteIconColor, err.message);
		}
	}

	/**
 * Check Screen Popup is displayed or not
 * @returns {Promise<boolean>}
 * @memberof MaxPage
 */
	public async isScreenPopsDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.pnlScreenPops.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isScreenPopsDisplayed, err.message);
		}
	}
	/**
	* Select Address book tab
	* @author Chinh.Nguyen
	* @param {string} tabName
	* @returns {Promise<MaxPage>}
	* @memberof MaxPage
	*/
	public async selectAddressBookTab(tabName: string): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Selecting Address book ${tabName} tab`);
			await this.lblAddressBookTab(tabName).click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectAddressBookTab, err.message);
		}
	}

	/**
	 * Check max page is refreshed
	 * @author Y Le
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isMaxPageRefresh(timeOut?: number): Promise<boolean> {
		try {
			let spinner: boolean = await this.divSpinner.isDisplayed(timeOut);
			await this.waitForLoading();
			let maxState: boolean = await this.btnStateSection.isDisplayed(timeOut);
			return spinner == maxState;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMaxPageRefresh, err.message);
		}
	}

    /**
	 * Check Call history item is displayed or not
	 * @author Chinh.Nguyen
	 * @param {string} contactId
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isCallHistoryItemDisplayed(contactId: string, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblHistoryItem(contactId).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCallHistoryItemDisplayed, err.message);
		}
	}

	/**
* Get Screen Popup title 
* @returns {Promise<string>}
* @memberof MaxPage
*/
	public async getScreenPopsTitle(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting title of screen pops");
			return await this.lblScreenPopsPanel.getAttribute('title');
		} catch (err) {
			throw new errorwrapper.CustomError(this.getScreenPopsTitle, err.message);
		}
	}

	/**
	* Get Page title 
	* @returns {Promise<string>}
	* @memberof MaxPage
	*/
	public async getPageTitle(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting title of PageAction Page");
			return await this.ifmPageActionPage.getAttribute('src');
		} catch (err) {
			throw new errorwrapper.CustomError(this.getPageTitle, err.message);
		}
	}

	/**
	 * Check history Call item information is correct or not
	 * @author Chinh.Nguyen
	 * @param {string} contactId
	 * @param {string} phoneNumber
	 * @param {string} agentName
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isHistoryCallItemInformationCorrect(contactId: string, phoneNumber: string, agentName: string, timeoutInSecond?: number): Promise<boolean> {
		try {

			return await this.lblHistoryItemInformation(phoneNumber, contactId, agentName).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isHistoryCallItemInformationCorrect, err.message);
		}
	}

	/**
	* This method is used to check current max glance size is matched with expectation with the allowable range (default is +-10)
	* @author Tung.Vo 
	* @param {number} expectedSize expected size to check
	* @param {number} range tolerance to adjust acceptable checking value
	* @returns {Promise<boolean>}
	* @memberof MaxPage
	*/
	public async isMaxGlanceSizeInRange(expectedSize: number, range: number): Promise<boolean> {
		try {
			let maxCurrentSize = await this.getMaxWrapPanelSize();
			return await Utility.isNumberInRange(maxCurrentSize, expectedSize, range);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMaxGlanceSizeInRange, err.message);
		}
	}

	/**
	 * Create a call in history list 
	 * @author Chinh.Nguyen
	 * @param {number} phoneNumber phone number for create outbound call
	 * @param {string} contactType Type contact want to create
	 * @param {string} skillName Skill outbound call want to create
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxPage
	 */
	public async makeCallInHistoryList(historyCallContactId: string, skillType: SkillType): Promise<MaxCall> {
		try {
			let skillName: string = SkillCore.getSkillName(skillType);
			await Logger.write(FunctionType.UI, `Making Call in History list`);
			await this.lblHistoryItem(historyCallContactId).moveMouse();
			await this.btnHistoryItemCallButton(historyCallContactId).click();

			let state: boolean = await this.ddlHistoryCallSkill.isDisplayed(5);

			if (state) {
				await this.lblSkill(skillName).moveMouse();
				await this.lblSkill(skillName).click();
			}

			let maxCall = require(`${ProjectPath.pageObjects}/inContact/max/max-call`).default;
			return maxCall.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.makeCallInHistoryList, err.message);
		}
	}

	/**
	 * Showing contact work space when agent keep multi contacts
	 * @author Y.Le
	 * @param {ContactName} contactName
	 * @returns {Promise<this>}
	 * @memberof MaxPage
	 */
	public async showContactWorkSpace(contactName: ContactName): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Showing contact work space")
			let contactString: string = "";
			if (contactName == ContactName.PHONE_CALL) {
				await this.iconCallOBPhoneMaxGlance.moveMouse();
				await this.iconCallOBPhoneMaxGlance.click();
			} else if (contactName == ContactName.CHAT) {
				await this.iconChatMaxGlance.click();
			}
			else {
				if (contactName == ContactName.EMAIL) {
					contactString = "email";
				} else if (contactName == ContactName.VOICE_MAIL) {
					contactString = "voicemail";
				} else if (contactName == ContactName.WORK_ITEM) {
					contactString = "workItem";
				} else {
					contactString = "omni";
				}
				await this.activeContactSession(contactString).moveMouse();
				await this.activeContactSession(contactString).click();
			}
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.showContactWorkSpace, err.message);
		}
	}

	/**	
	 * Check Screen Pop positioned at right side of contact work space
	 * @param {string} buttonName name of button
	 * @returns {Promise<any>}
	 * @memberof MaxPage
	 */
	public async isScreenPopPositionedAtRightSide(): Promise<Boolean> {
		try {
			await Logger.write(FunctionType.UI, `Comparing left of contact workspace and left of Screen Pop`);
			let contactWorkSpaceSize: ISize = await this.pnlWorkspaceContactActive.getSize();
			let leftWorkspace: number = await this.pnlWorkspaceContactActive.getElementCoordinate(CoordinateType.LEFT);
			let leftScreenPop: number = await this.pnlScreenPops.getElementCoordinate(CoordinateType.LEFT);
			return (leftWorkspace + contactWorkSpaceSize.width <= leftScreenPop);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isScreenPopPositionedAtRightSide, err.message);
		}
	}

	/**
	 * Check a schedule is coming up
	 * @author Huy.Nguyen
	 * @param {string} useSchedule
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isScheduleComingUp(useSchedule: string, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblItemScheduleComingUp(useSchedule).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isScheduleComingUp, err.message);
		}
	}

	/**	
	* Click on Address Book call button and get skill name from dropdown
	* @author W.Plaza
	* @returns {Promise<string>} 
	* @memberof MaxPage
 	*/
	public async getCallButtonDropdownSkillName(skillName: string): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Getting skill name from call button dropdown`);
			return await this.lblSkill(skillName).getControlTitle();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getCallButtonDropdownSkillName, err.message);
		}
	}

	/**
	 * Click Call button on MAX Address Book
	 * @author W.Plaza
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async clickCallButton(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Clicking call button`);
			await this.btnCall.moveMouse();
			await this.btnCall.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickCallButton, err.message);
		}
	}

	/** Check Screen Pop positioned at right side
	 * @param {string} buttonName name of button
	 * @returns {Promise<any>}
	 * @memberof MaxPage
	 */
	public async openOBEmailWorkspace(toAddress: string): Promise<MaxEmailPage> {
		try {
			await Logger.write(FunctionType.UI, `Comparing left of chat workspace and left of Screen Pop`);
			await this.clickNew();
			await this.selectAddNewOption(ContactName.EMAIL);
			await this.selectEmailFromAddressBook(SkillType.OB_EMAIL, toAddress);
			await this.waitForEmailWorkspace();
			let maxEmail = require(`${ProjectPath.pageObjects}/inContact/max/max-email`).default;
			return maxEmail.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.openOBEmailWorkspace, err.message);
		}
	}

	/**	
	 * Click an item from the Address Book tab panels
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async clickAddressBookTabPanelItem(mainTabItem: string): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, `Clicking Address Book Main tab item`);
			await this.lblAddressBookTabPanelItem(mainTabItem).waitForControlStable();
			await this.lblAddressBookTabPanelItem(mainTabItem).moveMouse();
			await this.lblAddressBookTabPanelItem(mainTabItem).click();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickAddressBookTabPanelItem, err.message);
		}
	}

	/* Get Panel setting High Contrast status
	 * @returns {Promise<string>} status
	 * @memberof MaxPage
	 */
	public async getPanelSettingStatus(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting panel status")
			await this.openMoreToolbar();
			await this.lblPanelsStatus.waitUntilPropertyNotChange('width');
			return await this.lblPanelsStatus.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getPanelSettingStatus, err.message);
		}
	}

	/** Check Work Item workspace positioned at right side of Quick Replies panel
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isWorkItemPositionedAtLeftSide(): Promise<boolean> {
		try {
			await Logger.write(FunctionType.UI, `Comparing left of work item workspace and left of quick replies panel`);
			let locationWorkItemWorkspace: ISize = await this.workItemWorkSpace.getSize();
			let leftWorkItemWorkspace: number = await this.workItemWorkSpace.getElementCoordinate(CoordinateType.LEFT);
			let leftQuickReplies: number = await this.pnlQuickReplies.getElementCoordinate(CoordinateType.LEFT);
			return (leftWorkItemWorkspace + locationWorkItemWorkspace.width <= leftQuickReplies);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isWorkItemPositionedAtLeftSide, err.message);
		}
	}

	/**	
	 * Hover over Custom Address Book name
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async hoverCustomAddressBookName(customAddressBookName: string): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, `Hoving over Custom Address Book title`);
			await this.lblCustomAddressBookPanelItem(customAddressBookName).moveMouse();
		} catch (err) {
			throw new errorwrapper.CustomError(this.hoverCustomAddressBookName, err.message);
		}
	}

	/** Get Quick Replies info
	 * @param {string} mode mode includes "title" or "content"
	 * @returns {Promise<string>}
	 * @memberof MaxPage
	 */
	public async getQuickRepliesInfo(mode: string): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Gettting quick replies info`);
			if (mode == "title") {
				return await this.lblQuickRepliesSubject.getText();
			}
			else if (mode == "content") {
				return await this.lblQuickRepliesContent.getText();
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.getQuickRepliesInfo, err.message);
		}
	}

	/**	
	 * Click call/email button on the Custom Address Book
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async clickCustomAddressBookButton(buttonName: string): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, `Clicking Customer Address Book contact button`);
			await this.btnCustomAddressBookPanel(buttonName).click();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickCustomAddressBookButton, err.message);
		}
	}

	/**
	 * Check Address book is displayed or not
	 * @returns {Promise<boolean>} the existence of custom address book button
	 * @memberof MaxPage
	 */
	public async isCustomAddressBookButtonDisplayed(buttonName: string): Promise<boolean> {
		try {
			return await this.btnCustomAddressBookPanel(buttonName).isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCustomAddressBookButtonDisplayed, err.message);
		}
	}

	/** Get Quick Replies info by contact id
	 * @author Phat TTruong
	 * @param {string} mode mode includes "title" or "content"
	 * @param {string} contactId 
	 * @returns {Promise<string>}
	 * @memberof MaxPage
	 */
	public async getQuickRepliesInfoByContactId(mode: string, contactId: string): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Gettting quick replies info by contact id`);
			if (mode == "title") {
				return await this.lblQuickRepliesTitleByContactId(contactId).getText();
			}
			else if (mode == "content") {
				return await this.lblQuickRepliesContentByContactId(contactId).getText();
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.getQuickRepliesInfoByContactId, err.message);
		}
	}

	/**    
     * Check if EMailWorkSpace is cut off or not
     * @author Chinh.Nguyen
     * @returns {Promise<Boolean>}
     * @memberof MaxEmailPage
     */
	public async isEmailWorkSpaceCutOff(sizeEmailWithPanel?: number): Promise<Boolean> {
		try {
			let isNotCutOff: boolean;
			await this.emailWorkingSpace.waitForControlStable();
			await this.emailWorkingSpace.waitUntilCssValueNotChange("width");

			let emailWorkSpace: string = await this.emailWorkingSpace.getCssValue("width");
			let widthValue: number = parseInt(emailWorkSpace.substring(0, emailWorkSpace.length - 2));
			if (sizeEmailWithPanel != null) {
				isNotCutOff = await (Utility.isNumberInRange(widthValue, sizeEmailWithPanel, 10) && (await this.lblTimeState.getElementCoordinate(CoordinateType.RIGHT) < await this.emailWorkingSpace.getElementCoordinate(CoordinateType.RIGHT)));
			} else {
				if (await this.pnlQuickReplies.isDisplayed()) {
					emailWorkSpace = await this.pnlEmailWithQuickReply.getCssValue("width");
					widthValue = parseInt(emailWorkSpace.substring(0, emailWorkSpace.length - 2));
					isNotCutOff = await (Utility.isNumberInRange(widthValue, parseInt(MAXWorkspaceSize.WIDTH_EMAIL_QuickReply), 10) && (await this.lblTimeState.getElementCoordinate(CoordinateType.RIGHT) < await this.emailWorkingSpace.getElementCoordinate(CoordinateType.RIGHT)));
				} else {
					isNotCutOff = await (Utility.isNumberInRange(widthValue, parseInt(MAXWorkspaceSize.WIDTH_EMAIL), 10) && (await this.lblTimeState.getElementCoordinate(CoordinateType.RIGHT) < await this.emailWorkingSpace.getElementCoordinate(CoordinateType.RIGHT)));
				}
			}
			return !isNotCutOff;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isEmailWorkSpaceCutOff, err.message);
		}
	}
	/**
	 * Create an outbound email
	 * @param {SkillType} skillType
	 * @param {string} [emailAddress]
	 * @param {boolean} [requiredDisposition]
	 * @param {boolean} [acw]
	 * @returns {Promise<MaxEmailPage>}
	 * @memberof MaxPage
	 */
	public async makeOutboundEmail(skillType: SkillType, emailAddress?: string, requiredDisposition?: boolean, acw?: boolean): Promise<MaxEmailPage> {
		try {
			let skillName: string = SkillCore.getSkillName(skillType);

			await Logger.write(FunctionType.UI, `Making Outbound Email`);
			await this.clickNew();
			await this.selectEmailFromAddressBook(skillType, emailAddress, requiredDisposition, acw);

			let maxEmail = require(`${ProjectPath.pageObjects}/inContact/max/max-email`).default;
			return maxEmail.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.makeOutboundEmail, err.message);
		}
	}


	/**
   * This method is used to check current screenpop panel  is matched with expectation with the allowable range (default is +-10)
   * @author Phat.Truong
   * @param {number} expectedSize expected size to check
   * @param {number} range tolerance to adjust acceptable checking value
   * @returns {Promise<boolean>}
   * @memberof MaxPage
   */
	public async isScreenPopSizeInRange(expectedSize: number, range: number): Promise<boolean> {
		try {
			let pnlScreenPopsSize: ISize = await this.lblScreenPopsPanel.getSize();
			let maxCurrentSize = pnlScreenPopsSize.width;
			return await Utility.isNumberInRange(maxCurrentSize, expectedSize, range);

		} catch (err) {
			throw new errorwrapper.CustomError(this.isScreenPopSizeInRange, err.message);
		}
	}
	/**
	 * Check whether the item display in coming up section or not
	 * @author Chinh.Nguyen
	 * @param {string} itemName
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isItemDisplayedInComingUpSection(itemName: string, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblComingUpItem(itemName).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isItemDisplayedInComingUpSection, err.message);
		}
	}

    /**
	 * Check whether the item displays in personal queue section or not
	 * @author Chinh.Nguyen
	 * @param {string} itemName
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isItemDisplayedInPersonalQueueSection(phoneNumber: number, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblPersonalQueueItem(phoneNumber).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isItemDisplayedInPersonalQueueSection, err.message);
		}
	}

	/**
	 * Get Commitment duration in Comming up section
	 * @author Chinh.Nguyen
	 * @returns {Promise<string>} Commitment duration
	 * @memberof MaxPage
	 */
	public async getCommingUpCommitmentDurationInSecond(timeoutInSecond: number = TestRunInfo.shortTimeout): Promise<number> {
		try {
			await Logger.write(FunctionType.UI, "Getting Commitment duration in comming up section");
			await this.btnStateSection.waitUntilPropertyChange("title", timeoutInSecond);
			let durationStr = await this.lblCommitmentDuration.getText();
			let durationInSecond: number = 0;
			if (durationStr.indexOf(':') > -1) {
				durationInSecond = parseInt(durationStr.split(":")[0]) * 60 + parseInt(durationStr.split(":")[1]);
			} else if (durationStr.indexOf('h') > -1) {
				durationInSecond = parseInt(durationStr.split("h ")[0]) * 60 + parseInt(durationStr.split("h ")[1]);
			} else if (durationStr.indexOf('<1') > -1) {
				durationInSecond = 60;
			} else if ((durationStr.indexOf('min') > -1)) {
				durationInSecond = parseInt(durationStr) * 60;
			} else if (durationStr.indexOf('Now') > -1) {
				durationInSecond = 60;
			}
			return durationInSecond;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getCommingUpCommitmentDurationInSecond, err.message);
		}
	}

    /**
	 * Get MAX current out state
	 * @author Chinh.Nguyen
	 * @returns {Promise<string>} MAX current out state
	 * @memberof MaxPage
	 */
	public async getMAXCurrentOutState(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting MAX current out state");
			return await this.lblMAXCurrentOutState.getControlTitle();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getMAXCurrentOutState, err.message);
		}
	}

	/** 
	 * Wait for new contact popup disappeared
	 * @param {string} contactId
	 * @memberof MaxChatPage
	 */
	public async waitForNewContactPopUpDisappeared(timeoutInsecond?: number): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Waiting for new contact popup disappeared");
			await this.newContactPopUp.waitUntilDisappear(timeoutInsecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForNewContactPopUpDisappeared, err.message);
		}
	}

	/**
	 * Is Contact Title parked
	 * @author Tung Vo
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */

	public async isContactTitleParked(timeOut?: number): Promise<boolean> {
		try {
			return await this.icoParkedContact.isDisplayed(timeOut);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isContactTitleParked, err.message);
		}
	}

	/**
	 * Getting contact workspace size
	 * @param {string} contactType
	 * @param {boolean} [state=true]
	 * @returns {Promise<boolean>} the existence of contact workspace
	 * @memberof MaxPage
	 */
	public async getContactWorkSpaceSize(contactName: ContactName): Promise<ISize> {
		try {
			await Logger.write(FunctionType.UI, `Getting contact ${contactName} workspace size`)
			switch (contactName) {
				case ContactName.EMAIL: {
					return await this.emailWorkingSpace.getSize();
				}
				case ContactName.PHONE_CALL: {
					return await this.pnlCallWorkspace.getSize();
				}
				case ContactName.WORK_ITEM: {
					return await this.workItemWorkSpace.getSize();
				}
				case ContactName.CHAT: {
					return await this.pnlChatWorkspace.getSize();
				}
				case ContactName.VOICE_MAIL: {
					return await this.voiceMailWorkingSpace.getSize();
				}
				case ContactName.SMS: {
					return await this.smsWorkingSpace.getSize();
				}
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.getContactWorkSpaceSize, err.message);
		}
	}
	/** 
	* This method is used to check current max work space (include all active contact) is matched with expectation with the allowable range (default is +-10)
	* @author Phat Truong 
	* @param {number} expectedSize expected size to check
	* @param {number} range tolerance to adjust acceptable checking value
	* @returns {Promise<boolean>}
	* @memberof MaxPage
	*/
	public async isMaxWorkSpaceSizeInRange(expectedSize: number, range: number): Promise<boolean> {
		try {
			let maxCurrentSize: ISize = await this.pnlWorkspaceWrapper.getSize();
			return await Utility.isNumberInRange(maxCurrentSize.width, expectedSize, range);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMaxWorkSpaceSizeInRange, err.message);
		}
	}


	/**	
	 * Check if Skill Level is displayed or not
	 * @author Phat truong
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxPage
     */
	public async isSkillLevelTabDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.tabSkillLevel.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isSkillLevelTabDisplayed, err.message);
		}
	}

	/**	
	 * get color attribute of call & email buttons from Custom Address book 
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async getCustomAddressBookButtonColor(buttonName: string): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Getting Customer Address Book contact button color`);
			return this.btnCustomAddressBookPanel(buttonName).getCssValue('color');
		} catch (err) {
			throw new errorwrapper.CustomError(this.getCustomAddressBookButtonColor, err.message);
		}
	}

	/** Check if Favorites is displayed or not
	 * @author Phat truong
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxPage
     */
	public async isFavoritesTabDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.tabFavorites.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isFavoritesTabDisplayed, err.message);
		}
	}

	/**
	 * Check Max glance is displayed
	 * @author Y.Le
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isMaxGlanceDisplayed(timeOut?: number): Promise<boolean> {
		try {
			return await this.pnlGlanceWorkspace.isDisplayed(timeOut);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMaxGlanceDisplayed, err.message);
		}
	}

	/**
	 * @author Y.le
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isHorizontalScrollBarDisplayed(): Promise<boolean> {
		try {
			return <boolean>await BrowserWrapper.executeScript('node = document.getElementById("contactContainer"); return node.scrollWidth > node.clientWidth');
		} catch (err) {
			throw new errorwrapper.CustomError(this.isHorizontalScrollBarDisplayed, err.message)
		}
	}

	/** 
	 * Select Active contact on MAX Glance
	 * @author Chinh.Nguyen
	 * @param {string} contactId
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async selectGlanceActiveContact(contactId: string): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Selecting glance active contact with contactId ${contactId}`);
			await this.lblGlanceActiveContact(contactId).click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectGlanceActiveContact, err.message);
		}
	}

	/**
	 * Wait for the schedule commitment item coming up is disappear
	 * @author Huy.Nguyen
	 * @param {string} useSchedule
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async waitForScheduleComingUpDisappear(useSchedule: string, timeoutInSecond?: number): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, `Waiting for schedule ${useSchedule} is disappear`);
			await this.lblItemScheduleComingUp(useSchedule).waitUntilDisappear(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForScheduleComingUpDisappear, err.message);
		}
	}
	/**
	* This method is used to check current  glance size is matched with expectation with the allowable range (default is +-10)
	* @author Lien Nguyen 
	* @param {number} expectedSize expected size to check
	* @param {number} range tolerance to adjust acceptable checking value
	* @returns {Promise<boolean>}
	* @memberof MaxPage
	*/
	public async isGlanceSizeInRange(expectedSize: number, range: number): Promise<boolean> {
		try {
			let maxCurrentSize = await this.getMaxGlanceSize();
			return await Utility.isNumberInRange(maxCurrentSize, expectedSize, range);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMaxGlanceSizeInRange, err.message);
		}
	}


	/**
	 * Wait for MAX container is stable after refreshing
	 * @author Huy.Nguyen
	 * @param {number} [waitTime]
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async waitForMaxRefresh(waitTime: number): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Waiting for refresing max page is stable");
			await this.waitForLoading();
			await BrowserWrapper.sleepInSecond(waitTime);
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForMaxRefresh, err.message);
		}
	}

	/**
	 * Refresh MAX page with wait for spinner is disappear
	 * @author Huy.Nguyen
	 * @param {number} [waitTime]
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async refreshMaxPage(waitTime?: number): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Refreshing Max page");
			await BrowserWrapper.refreshPage();
			if (waitTime > 0) {
				await this.waitForMaxRefresh(waitTime);
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.refreshMaxPage, err.message);
		}
	}

	/**	
	 * get color attribute of call & email buttons from Custom Address book 
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public getAddressBookContactButtonColorByBrowser(buttonState: string, browserName: TestRunInfo): string {
		try {
			let enabled: string;
			let disabled: string;

			Logger.write(FunctionType.UI, `Getting Customer Address Book contact button color by browser`);
			if (browserName == "chrome") {
				enabled = "rgba(109, 110, 112, 1)";
				disabled = "rgba(225, 234, 242, 1)";
			}

			else if (browserName == "internet explorer") {
				enabled = "rgba(109, 110, 112, 1)";
				disabled = "rgba(226, 226, 226, 1)";
			}

			else if (browserName == "firefox") {
				enabled = "rgb(109, 110, 112)";
				disabled = "rgb(225, 234, 242)";
			}

			switch (buttonState) {
				case 'enabled':
					return enabled;
				case 'disabled':
					return disabled;
				default: throw `The ${buttonState} is invalid`;
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.getAddressBookContactButtonColorByBrowser, err.message);
		}
	}

	/**
	* This method is used to check if a Address Book panel header is displayed 
	* @author W.Plaza 
	* @param {string} headerName
	* @returns {Promise<boolean>}
	* @memberof MaxPage
	*/
	public async isAddressBookHeaderDisplayed(headerName: string): Promise<boolean> {
		try {
			return await this.lblAddressBookPanelHeader(headerName).isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAddressBookHeaderDisplayed, err.message);
		}
	}

	/**	
	 * Check if an item from the Address Book tab panels is displayed
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isAddressBookTabPanelItemDisplayed(tabPanelItemName: string): Promise<boolean> {
		try {
			return await this.lblAddressBookTabPanelItem(tabPanelItemName).isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAddressBookTabPanelItemDisplayed, err.message);
		}
	}

	/**
	 * Click Page action Page Next button
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async clickPageActionPageNextButton(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, `Click Page action Next button`);
			await this.ifmPageActionPage.switchToFrame();
			await this.btnPageActionPageNextButton.click();
			await BrowserWrapper.switchToDefaultContent();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickPageActionPageNextButton, err.message);
		}
	}

	/**    
    * Get Agent report button text
    * @author W.Plaza  
    * @returns {Promise<number>} 
    * @memberof MaxPage
     */
	public async getPerformanceTableCellValue(cellName: string): Promise<number> {
		try {
			await Logger.write(FunctionType.UI, `Getting cell text of Performance report`);
			let cellTextValue: string = await this.lblPerformanceTableCell(cellName).getText();
			return +cellTextValue.trim();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getPerformanceTableCellValue, err.message);
		}
	}

    /**
    * Clicking Continue button on join agent session
    * @author W.Plaza
    * @returns {Promise<MaxPage>}
    * @memberof MaxPage
    */
	public async clickPerformanceTableDateRangeButton(dateRangeButtonName: string): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Clicking button ${dateRangeButtonName}`)
			await this.btnPerformanceDateRange(dateRangeButtonName).click();
			return this
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickPerformanceTableDateRangeButton, err.message);
		}
	}

	/**	
	 * Check call button color
	 * @author W.Plaza
	 * @returns {Promise<boolean>} Return call button state value
	 * @memberof MaxPage
	 */
	public async getCallButtonColor(timeoutInSecond?: number): Promise<string> {
		try {
			return await this.btnCall.getCssValue('color');
		} catch (err) {
			throw new errorwrapper.CustomError(this.getCallButtonColor, err.message);
		}
	}

	/**
	 * Check Phone radio button is checked
	 * @author W.Plaza
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isPhoneRadioButtonChecked(): Promise<boolean> {
		try {
			return await this.radPhone.isEnabled(10);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPhoneRadioButtonChecked, err.message);
		}
	}

	/**	
     * Close Max by clicking the Close button
     * @author W.Plaza
     * @returns {Promise<void>}
     * @memberof MaxPage
     */
	public async clickMaxCloseButton(): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, `Closing Max`);
			await this.btnCloseMax.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickMaxCloseButton, err.message);
		}
	}

	/**	
     * CLick parked contact label in glance
     * @author W.Plaza
     * @returns {Promise<this>}
     * @memberof MaxPage
     */
	public async clickParkedContactLabel(): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, `Clicking Parked Contact label.`);
			await this.icoParkedContact.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickParkedContactLabel, err.message);
		}
	}

	/**
	 * Set Max Multi Chat Display mode
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async setMaxMultiChatDisplaySetting(state: State): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Setting Multi Chat Display`);
			let panelName: string = await this.pnlMore.getAttribute('data-current-context');
			let i: number = 0;

			while (panelName != 'more' && i < TestRunInfo.shortTimeout) {
				await this.btnBackArrow.click();
				panelName = await this.pnlMore.getAttribute('data-current-context');
				i++;
			}
			await this.btnSetting.click()
			let MultiChatDisplayMode: string = await this.lblMultiChatDisplayStatus.getText();

			if (state.toLocaleLowerCase() != MultiChatDisplayMode) {
				await this.lblMultiChatDisplayStatus.click();

				if (state == State.ON) {
					await this.waitForMAXGlanceStable();
					await BrowserWrapper.sleepInSecond(10); // Wait for MAX glance changing contrast completely
				}
			}

			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.setMaxMultiChatDisplaySetting, err.message);
		}
	}

	/**	
	 * Get Multi Chat Display status
	 * @returns {Promise<string>} status
	 * @memberof MaxPage
	 */
	public async getMultiChatDisplayStatus(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting Multi Chat Display status");
			let panelName: string = await this.pnlMore.getAttribute('data-current-context');
			let i: number = 0;

			while (panelName != 'more' && i < TestRunInfo.shortTimeout) {
				await this.btnBackArrow.click();
				panelName = await this.pnlMore.getAttribute('data-current-context');
				i++;
			}
			await this.btnSetting.click()
			await this.lblMultiChatDisplayStatus.waitUntilPropertyNotChange('width');
			return await this.lblMultiChatDisplayStatus.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getMultiChatDisplayStatus, err.message);
		}
	}

	/**
	 * Check Multi Chat Display is displayed or not
	 * @returns {Promise<boolean>} the existence of the MAX state
	 * @memberof MaxPage
	 */
	public async isMultiChatDisplayDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			await Logger.write(FunctionType.UI, "Checking if Multi Chat Display");
			let panelName: string = await this.pnlMore.getAttribute('data-current-context');
			let i: number = 0;

			while (panelName != 'more' && i < TestRunInfo.shortTimeout) {
				await this.btnBackArrow.click();
				panelName = await this.pnlMore.getAttribute('data-current-context');
				i++;
			}
			await this.btnSetting.click();
			return await this.lblMultiChatDisplayStatus.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMultiChatDisplayDisplayed, err.message);
		}
	}

	/**	
	 * Click Contact Panel Toggle
     * @author W.Plaza
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
    public async clickContactPanelToggle(): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on Contact Panel Toggle`);
            await this.lblContactPanelToggle.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickContactPanelToggle, err.message);
        }
	}
	
	/**
	 * Getting contact workspace size
	 * @author W.Plaza
	 * @param {boolean} [state=true]
	 * @returns {Promise<boolean>} the size of Contact Panel
	 * @memberof MaxPage
	 */
	public async getContactPanelSize(): Promise<ISize> {
		try {
			await Logger.write(FunctionType.UI, `Getting Contact Panel size`)
			return await this.pnlContact.getSize();			
		} catch (err) {
			throw new errorwrapper.CustomError(this.getContactPanelSize, err.message);
		}
	}

	/**	
	 * Get GlanceSensitivity option values
	 * @author W.Plaza
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isGlanceSensitivityOptiondisplayed(option: string): Promise<boolean> {
		try {
			await Logger.write(FunctionType.UI, "Getting GlanceSensitivity option values");
			let panelName: string = await this.pnlMore.getAttribute('data-current-context');
			let i: number = 0;

			while (panelName != 'more' && i < TestRunInfo.shortTimeout) {
				await this.btnBackArrow.click();
				panelName = await this.pnlMore.getAttribute('data-current-context');
				i++;
			}
			await this.btnSetting.click()
			await this.btnGlanceSensitivity.waitUntilPropertyNotChange('width');
			await this.ddlGlanceSensitivity.click();
			return await this.lblGlanceSensitivityOption(option).isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isGlanceSensitivityOptiondisplayed, err.message);
		}
	}

	/**	
	 * Get GlanceSensitivity option values
	 * @author W.Plaza
	 * @returns {Promise<string>}
	 * @memberof MaxPage
	 */
	public async getGlanceSensitivityOptionsAttribute(option: string, attribute: string): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting GlanceSensitivity option attribute values");
			let panelName: string = await this.pnlMore.getAttribute('data-current-context');
			let i: number = 0;

			while (panelName != 'more' && i < TestRunInfo.shortTimeout) {
				await this.btnBackArrow.click();
				panelName = await this.pnlMore.getAttribute('data-current-context');
				i++;
			}
			await this.btnSetting.click()
			await this.btnGlanceSensitivity.waitUntilPropertyNotChange('width');
			await this.ddlGlanceSensitivity.click();
			return await this.lblGlanceSensitivityOption(option).getCssValue(attribute);
		} catch (err) {
			throw new errorwrapper.CustomError(this.getGlanceSensitivityOptionsAttribute, err.message);
		}
	}

	/**
	 * Connect Agent Leg in MAX
	 * @returns {Promise<MaxPage>} MAX page
	 * @memberof MaxPage
	 */
	public async connectAgentLeg(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Connecting MAX Agent Leg");
			await this.btnConnectAgentLeg.waitForVisibilityOf();
			await this.btnConnectAgentLeg.click();			
			await this.dlgConnectAgent.waitUntilDisappear();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.connectAgentLeg, err.message);
		}
	}
}
