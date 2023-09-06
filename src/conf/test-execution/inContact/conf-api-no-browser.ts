require('module-alias/register');
var Jasmine = require('jasmine');
var jas = new Jasmine();

import { APIVersion } from '@data-objects/general/cluster';
import TestRunInfo from '@data-objects/general/test-run-info';
import ProjectPath from '@test-data/general/project-path';
import TestBase from '@testcases/test-base';
import HTMLEmailReportAPI from '@utilities/report-email/report-email-api';
import NewReportAPIHTML from '@utilities/report-email/report-html-api';
let jsLogger = require('js-logger');

TestRunInfo.versionAPI = <APIVersion>(process.argv.slice(2))[0]
TestRunInfo.apiTestCasesID = [];

jsLogger.useDefaults({
    defaultLevel: jsLogger.INFO,
    formatter: function (messages, context) {
        messages.unshift(new Date().toLocaleString())
    }
});

TestBase.setUpTestRunInfo();
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

jas.loadConfig({
    params: {
        testType: 'API'
    },
    spec_files: [
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/returns-an-agent-message-list.js`,  //ADV120035
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/download-a-calling-list.js`,  //ADV120154
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/returns-a-list-of-groups-an-agent-is-assigned.js`,  //ADV120022
        `${ProjectPath.testCases}/inContact/non-UI/admin/address-book-management/returns-address-books-for-a-team.js`,  //ADV120015
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/returns-list-of-teams.js`,  //ADV120040
        `${ProjectPath.testCases}/inContact/non-UI/agent/supervisor-management/gives-a-supervisor-the-ability-to-barge-an-agent-on-a-live-call.js`,  //AGV120067
        `${ProjectPath.testCases}/inContact/non-UI/patron/chat-client-API/sends-agent-a-chat-preview.js`,  //PTV120008
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-a-security-profile.js`,  //ADV120089
        `${ProjectPath.testCases}/inContact/non-UI/agent/personal-connection-management/log-out-of-a-dialer-campaign.js`,  //AGV120030
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/returns-a-list-of-quick-replies-for-an-agent.js`,  //ADV120032
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/create-a-calling-list-mapping.js`,  //ADV120152
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/assign-unavailable-codes-to-a-team.js`,  //ADV120050
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/assign-agents-to-a-team.js`,  //ADV120047
        `${ProjectPath.testCases}/inContact/non-UI/admin/address-book-management/create-or-update-dynamic-address-book-entries.js`,  //ADV120006
        `${ProjectPath.testCases}/inContact/non-UI/real-time-data/real-time-reporting/returns-active-contact-states.js`,  //RTV120005
        `${ProjectPath.testCases}/inContact/non-UI/admin/address-book-management/delete-a-dynamic-address-book-entry.js`,  //ADV120007
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/expire-records-from-a-dnc-group.js`,  //ADV120144
        `${ProjectPath.testCases}/inContact/non-UI/patron/chat-client-API/ends-an-active-chat-session.js`,  //PTV120004
        `${ProjectPath.testCases}/inContact/non-UI/agent/voicemail-contact-management/transfer-voicemail-to-a-skill.js`,  //AGV120017
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/returns-a-list-of-quick-replies.js`,  //ADV120031
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/assigns-skills-to-an-agent.js`,  //ADV120025
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/returns-all-team’s-agents.js`,  //ADV120044
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/removes-tags-from-a-skill.js`,  //ADV120122
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/returns-a-team-agents.js`,  //ADV120046
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-a-list-of-unprocessed-files.js`,  //ADV120066
        `${ProjectPath.testCases}/inContact/non-UI/admin/group-management/returns-a-list-of-agents-assigned-to-a-group.js`,  //ADV120165
        `${ProjectPath.testCases}/inContact/non-UI/agent/work-items-contact-management/end-a-work-item.js`,  //AGV120048
        `${ProjectPath.testCases}/inContact/non-UI/admin/address-book-management/create-standard-address-book-entries.js`,  //ADV120009
        `${ProjectPath.testCases}/inContact/non-UI/admin/address-book-management/create-a-new-address-book.js`,  //ADV120002
        `${ProjectPath.testCases}/inContact/non-UI/patron/callback-api/schedule-a-callback.js`,  //PTV120002
        `${ProjectPath.testCases}/inContact/non-UI/real-time-data/real-time-reporting/returns-active-contacts.js`,  //RTV120003
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/download-a-calling-list's-attempts.js`,  //ADV120155
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-contact-history-for-an-agent.js`,  //RPV120001
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-skill-details.js`,  //ADV120107
        `${ProjectPath.testCases}/inContact/non-UI/admin/address-book-management/update-standard-address-book-entries.js`,  //ADV120010
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/returns-an-agent-indicator-list.js`,  //ADV120036
        `${ProjectPath.testCases}/inContact/non-UI/agent/chat-contact-management/accept-a-chat-contact.js`,  //AGV120006
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/create-a-team.js`,  //ADV120041
        `${ProjectPath.testCases}/inContact/non-UI/agent/supervisor-management/gives-the-ability-to-monitor-an-agent-on-a-live-call.js`,  //AGV120065
        `${ProjectPath.testCases}/inContact/non-UI/agent/agent-phone-management/unmute-agent-leg.js`,  //AGV120003
        `${ProjectPath.testCases}/inContact/non-UI/agent/supervisor-management/gives-the-ability-to-coach-an-agent-on-a-live-call.js`,  //AGV120066
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/get-agents-that-are-not-assigned-to-skill.js`,  //ADV120117
        `${ProjectPath.testCases}/inContact/non-UI/agent/work-items-contact-management/accept-a-work-item.js`,  //AGV120050
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/force-a-contact-to-be-disconnected-and-to-end.js`,  //ADV120130
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/returns-a-team.js`,  //ADV120042
        `${ProjectPath.testCases}/inContact/non-UI/agent/email-contact-management/preview-an-email.js`,  //AGV120027
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/upload-new-records-to-a-call-list.js`,  //ADV120156
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-a-performance-summary-of-all-agents.js`,  //RPV120005
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-a-message-template.js`,  //ADV120081
        `${ProjectPath.testCases}/inContact/non-UI/agent/phone-call-management/dials-an-agent-s-personal-queue.js`,  //AGV120032
        `${ProjectPath.testCases}/inContact/non-UI/agent/chat-contact-management/add-a-chat-contact.js`,  //AGV120005
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-an-email-transcript.js`,  //ADV120128
        `${ProjectPath.testCases}/inContact/non-UI/patron/chat-client-API/starts-a-chat-session.js`,  //PTV120003
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/returns-summary-of-all-agents-contacts-by-skill.js`,  //ADV120028
        `${ProjectPath.testCases}/inContact/non-UI/agent/Agent-Session-Management/adds-a-media-type-to-route.js`,  //AGV120063
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/create-an-agent-message.js`,  //ADV120033
        `${ProjectPath.testCases}/inContact/non-UI/admin/address-book-management/assign-entities-to-an-address-book.js`,  //ADV120004
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-a-list-of-tags.js`,  //ADV120093
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/start-a-custom-reporting-job.js`,  //RPV120023
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-states-or-provinces.js`,  //ADV120059
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/assign-a-contributing-skill.js`,  //ADV120143
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-a-list-of-permissions-for-an-agent.js`,  //ADV120084
        `${ProjectPath.testCases}/inContact/non-UI/admin/address-book-management/delete-a-standard-address-book-entry.js`,  //ADV120011
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/returns-the-status-of-calling-list-upload-jobs.js`,  //ADV120157
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-a-list-of-reporting-jobs.js`,  //RPV120021
        `${ProjectPath.testCases}/inContact/non-UI/agent/email-contact-management/reply-to-an-email.js`,  //AGV120021
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-config-for-thank-you-page.js`,  //ADV120109
        `${ProjectPath.testCases}/inContact/non-UI/agent/voicemail-contact-management/pause-a-voicemail.js`,  //AGV120015
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/returns-skills-assigned-to-all-agents.js`,  //ADV120021
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-contact-custom-data.js`,  //RPV120013
        `${ProjectPath.testCases}/inContact/non-UI/agent/work-items-contact-management/hold-a-work-item.js`,  //AGV120046
        `${ProjectPath.testCases}/inContact/non-UI/agent/chat-contact-management/transfer-to-agent.js`,  //AGV120010
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-the-server-time-in-ISO-8601.js`,  //ADV120092
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/modifies-the-configuration-of-a-disposition.js`,  //ADV120103
        `${ProjectPath.testCases}/inContact/non-UI/patron/chat-client-API/sends-chat-transcript-via-email.js`,  //PTV120009
        `${ProjectPath.testCases}/inContact/non-UI/admin/address-book-management/returns-entries-for-a-dynamic-address-book.js`,  //ADV120005
        `${ProjectPath.testCases}/inContact/non-UI/admin/group-management/removes-agents-from-a-group.js`,  //ADV120164
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-statistics-for-a-skill.js`,  //RPV120015
        `${ProjectPath.testCases}/inContact/non-UI/agent/phone-call-management/transfer-call.js`,  //AGV120037
        `${ProjectPath.testCases}/inContact/non-UI/admin/group-management/returns-a-group-config.js`,  //ADV120162
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/creates-a-custom-agent-event.js`,  //ADV120030
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-a-reporting-job.js`,  //RPV120022
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/search-for-a-phone-number.js`,  //ADV120150
        `${ProjectPath.testCases}/inContact/non-UI/agent/agent-phone-management/ends-the-agents-phone-call.js`,  //AGV120004
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/add-records-to-a-dnc-group.js`,  //ADV120146
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-an-hour-of-operation-profile.js`,  //ADV120075
        `${ProjectPath.testCases}/inContact/non-UI/admin/address-book-management/returns-address-books-for-a-skill.js`,  //ADV120014
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-a-list-of-unavailable-codes.js`,  //ADV120098
        `${ProjectPath.testCases}/inContact/non-UI/admin/address-book-management/delete-an-existing-address-book.js`,  //ADV120003
        `${ProjectPath.testCases}/inContact/non-UI/agent/chat-contact-management/transfer-to-skill.js`,  //AGV120011
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-a-skill-s-dispositions.js`,  //ADV120120
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-contact-call-quality.js`,  //RPV120011
        `${ProjectPath.testCases}/inContact/non-UI/patron/callback-api/request-an-immediate-callback.js`,  //PTV120001
        `${ProjectPath.testCases}/inContact/non-UI/agent/voicemail-contact-management/end-a-voicemail-contact.js`,  //AGV120013
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/starts-a-script.js`,  //ADV120091
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/cancel-pending-processing-list-process.js`,  //ADV120158
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-a-list-of-permissions.js`,  //ADV120083
        `${ProjectPath.testCases}/inContact/non-UI/patron/chat-client-API/sends-text-to-members-of-the-chat-session.js`,  //PTV120006
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/returns-agent-dialing-patterns.js`,  //ADV120038
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/delete-agent-message.js`,  //ADV120034
        `${ProjectPath.testCases}/inContact/non-UI/agent/agent-phone-management/mute-agent-phone.js`,  //AGV120002
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-skills-assignments.js`,  //ADV120112
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-branding-profile.js`,  //ADV120056
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/returns-skills-assigned-to-an-agent.js`,  //ADV120024
        `${ProjectPath.testCases}/inContact/non-UI/agent/voicemail-contact-management/play-a-voicemail.js`,  //AGV120014
        `${ProjectPath.testCases}/inContact/non-UI/admin/address-book-management/returns-address-books-for-a-campaign.js`,  //ADV120013
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-a-chat-transcript.js`,  //ADV120127
        `${ProjectPath.testCases}/inContact/non-UI/agent/work-items-contact-management/resume-a-work-item.js`,  //AGV120047
        `${ProjectPath.testCases}/inContact/non-UI/agent/Agent-Session-Management/dispositions-a-contact.js`,  //AGV120059
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/updates-a-tag.js`,  //ADV120096
        `${ProjectPath.testCases}/inContact/non-UI/admin/address-book-management/returns-address-books-for-an-agent.js`,  //ADV120012
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/forces-an-agent-session-to-end.js`,  //ADV120037
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-business-unit-config.js`,  //ADV120057
        `${ProjectPath.testCases}/inContact/non-UI/patron/chat-client-API/returns-chat-profile-config.js`,  //PTV120010
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/remove-a-scrubbed-skill.js`,  //ADV120148
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/assign-a-scrubbed-skill.js`,  //ADV120149
        `${ProjectPath.testCases}/inContact/non-UI/agent/voicemail-contact-management/transfer-voicemail-to-an-agent.js`,  //AGV120016
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/remove-agents-from-a-team.js`,  //ADV120045
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-a-contacts-files.js`,  //ADV120129
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/updates-a-message-template.js`,  //ADV120082
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-a-list-of-media-types.js`,  //ADV120077
        `${ProjectPath.testCases}/inContact/non-UI/reporting/wfm-Management/returns-contact-statistics-for-wfm.js`,  //RPV120031
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-contact-details.js`,  //RPV120007
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-countries.js`,  //ADV120058
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/returns-the-status-of-calling-list-upload-job.js`,  //ADV120159
        `${ProjectPath.testCases}/inContact/non-UI/agent/phone-call-management/send-dtmf-tones.js`,  //AGV120035
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/returns-summary-of-an-agents-contacts-by-skill.js`,  //ADV120029
        `${ProjectPath.testCases}/inContact/non-UI/admin/scheduled-callbacks-management/deletes-a-scheduled-callback.js`,  //ADV120053
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/remove-skill-assignments-for-an-agent.js`,  //ADV120023
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/remove-a-calling-list.js`,  //ADV120153
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-sms-transcripts-for-a-contactid.js`,  //RPV120009
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/get-agent-details-by-agent-ID.js`,  //ADV120018
        `${ProjectPath.testCases}/inContact/non-UI/agent/email-contact-management/restore-an-email.js`,  //AGV120028
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/uploads-a-file.js`,  //ADV120064
        `${ProjectPath.testCases}/inContact/non-UI/agent/chat-contact-management/notify-patron-agent-is-typing.js`,  //AGV120012
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/returns-scrubbed-skills-for-a-dnc-group.js`,  //ADV120147
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/create-a-hiring-source.js`,  //ADV120073
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-skills-details.js`,  //ADV120105
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-a-list-of-dispositions.js`,  //ADV120061
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-csi-statistics.js`,  //RPV120027
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/returns-records-in-a-dnc-group.js`,  //ADV120145
        `${ProjectPath.testCases}/inContact/non-UI/agent/phone-call-management/record-a-call.js`,  //AGV120041
        `${ProjectPath.testCases}/inContact/non-UI/real-time-data/real-time-reporting/returns-the-current-state-for-all-agents.js`,  //RTV120001
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/remove-skill-agent-assignments.js`,  //ADV120113
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/get-agents-list.js`,  //ADV120016
        `${ProjectPath.testCases}/inContact/non-UI/admin/scheduled-callbacks-management/creates-a-scheduled-callback.js`,  //ADV120052
        `${ProjectPath.testCases}/inContact/non-UI/agent/scheduled-callbacks-management/reschedule-a-scheduled-callback.js`,  //AGV120052
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-Sla-summary-for-all-skills.js`,  //RPV120016
        `${ProjectPath.testCases}/inContact/non-UI/agent/email-contact-management/sends-an-email.js`,  //AGV120022
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-contact-management/allows-to-begin-the-recording-of-an-active-phone-call.js`,  //ADV120132
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-statistics-for-all-skills.js`,  //RPV120014
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-a-directory-listing.js`,  //ADV120070
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/creates-a-message-template.js`,  //ADV120080
        `${ProjectPath.testCases}/inContact/non-UI/agent/chat-contact-management/reject-a-chat-contact.js`,  //AGV120007
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-a-list-of-scripts.js`,  //ADV120090
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/returns-unavailable-codes-for-a-team.js`,  //ADV120049
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-outbound-skill-general-settings.js`,  //ADV120125
        `${ProjectPath.testCases}/inContact/non-UI/real-time-data/real-time-reporting/returns-the-current-state-for-an-agent.js`,  //RTV120002
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-a-list-of-disposition-classifications.js`,  //ADV120104
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/returns-list-of-dnc-groups.js`,  //ADV120137
        `${ProjectPath.testCases}/inContact/non-UI/agent/phone-call-management/dials-an-outbound-call.js`,  //AGV120033
        `${ProjectPath.testCases}/inContact/non-UI/real-time-data/real-time-reporting/returns-parked-contacts.js`,  //RTV120004
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/update-a-team.js`,  //ADV120043
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-contact-management/assigns-tags-to-a-contact.js`,  //ADV120133
        `${ProjectPath.testCases}/inContact/non-UI/reporting/wfm-Management/returns-agent-performance.js`,  //RPV120036
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-contact-management/starts-monitoring-a-phone-call.js`,  //ADV120131
        `${ProjectPath.testCases}/inContact/non-UI/admin/address-book-management/returns-a-list-of-address-books.js`,  //ADV120001
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/update-a-dnc-group.js`,  //ADV120140
        `${ProjectPath.testCases}/inContact/non-UI/patron/chat-client-API/gets-any-inbound-chat-text.js`,  //PTV120005
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-contact-state-history.js`,  //RPV120012
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/modify-skill-assignments-for-an-agent.js`,  //ADV120026
        `${ProjectPath.testCases}/inContact/non-UI/real-time-data/real-time-reporting/returns-activity-for-a-skill.js`,  //RTV120007
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/returns-skills-not-assigned-to-an-agent.js`,  //ADV120027
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-state-duration-for-an-agent.js`,  //RPV120004
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-a-single-campaign.js`,  //ADV120100
        `${ProjectPath.testCases}/inContact/non-UI/admin/scheduled-callbacks-management/returns-scheduled-callbacks-for-a-skill.js`,  //ADV120055
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/moves-or-renames-a-file.js`,  //ADV120065
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-data-types.js`,  //ADV120060
        `${ProjectPath.testCases}/inContact/non-UI/reporting/wfm-Management/returns-agent-metadata.js`,  //RPV120032
        `${ProjectPath.testCases}/inContact/non-UI/agent/Agent-Session-Management/post-a-feedback.js`,  //AGV120061
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-a-list-of-points-of-contact.js`,  //ADV120086
        `${ProjectPath.testCases}/inContact/non-UI/agent/personal-connection-management/log-into-a-dialer-campaign.js`,  //AGV120029
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/deletes-a-folder.js`,  //ADV120069
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-contact-management/create-a-signal-for-a-contact.js`,  //ADV120136
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-tags-for-a-skill.js`,  //ADV120123
        `${ProjectPath.testCases}/inContact/non-UI/reporting/wfm-Management/returns-scorecard-statistics.js`,  //RPV120035
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-info-on-recent-contacts.js`,  //RPV120002
        `${ProjectPath.testCases}/inContact/non-UI/admin/address-book-management/lists-all-standard-address-book-entries-for-an-address-book.js`,  //ADV120008
        `${ProjectPath.testCases}/inContact/non-UI/patron/chat-client-API/notify-agent-patron-is-typing.js`,  //PTV120007
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-a-tag.js`,  //ADV120095
        `${ProjectPath.testCases}/inContact/non-UI/agent/email-contact-management/add-an-email-contact.js`,  //AGV120018
        `${ProjectPath.testCases}/inContact/non-UI/agent/work-items-contact-management/reject-a-work-item.js`,  //AGV120049
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/returns-contributing-skills-for-a-dnc-group.js`,  //ADV120141
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-hiring-sources.js`,  //ADV120072
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/sets-an-agents-state.js`,  //ADV120020
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-sms-transcripts-for-a-date-range-and-transport-code.js`,  //RPV120008
        `${ProjectPath.testCases}/inContact/non-UI/agent/Agent-Session-Management/ending-an-agent-session.js`,  //AGV120056
        `${ProjectPath.testCases}/inContact/non-UI/agent/Agent-Session-Management/post-custom-data-to-a-contact.js`,  //AGV120062
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-ftci-adherence-statistics.js`,  //RPV120028
        `${ProjectPath.testCases}/inContact/non-UI/reporting/wfm-Management/returns-dailer-contact-statistics.js`,  //RPV120033
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-contact-management/returns-a-list-of-contact-states.js`,  //ADV120134
        `${ProjectPath.testCases}/inContact/non-UI/agent/email-contact-management/unparks-an-email.js`,  //AGV120026
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/get-a-file.js`,  //ADV120063
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-unassigned-dispositions-for-a-skill.js`,  //ADV120121
        `${ProjectPath.testCases}/inContact/non-UI/reporting/wfm-Management/returns-adherence-statistics.js`,  //RPV120034
        `${ProjectPath.testCases}/inContact/non-UI/real-time-data/real-time-reporting/returns-activity-for-all-skills.js`,  //RTV120006
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-summary-of-contacts-for-a-skill.js`,  //ADV120119
        `${ProjectPath.testCases}/inContact/non-UI/agent/email-contact-management/forwards-an-email.js`,  //AGV120020
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/marks-a-file-to-be-processed.js`,  //ADV120067
        `${ProjectPath.testCases}/inContact/non-UI/agent/phone-call-management/dials-a-skill.js`,  //AGV120034
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/marks-a-file-as-processed.js`,  //ADV120068
        `${ProjectPath.testCases}/inContact/non-UI/patron/work-item-API/create-a-new-work-item.js`,  //PTV120011
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/returns-all-calling-lists.js`,  //ADV120151
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/return-scorecard-statistics.js`,  //RPV120025
        `${ProjectPath.testCases}/inContact/non-UI/admin/scheduled-callbacks-management/updates-a-scheduled-callback.js`,  //ADV120054
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-hours-of-operation-profiles.js`,  //ADV120074
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-agent-login-history.js`,  //RPV120003
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-a-disposition-configuration.js`,  //ADV120102
        `${ProjectPath.testCases}/inContact/non-UI/agent/email-contact-management/parks-an-email.js`,  //AGV120025
        `${ProjectPath.testCases}/inContact/non-UI/agent/email-contact-management/creates-an-outbound-email-contact.js`,  //AGV120019
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/creates-a-tag.js`,  //ADV120094
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-performance-summary-of-a-team.js`,  //RPV120019
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-summary-of-contacts-for-all-skills.js`,  //ADV120118
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/returns-a-dnc-group.js`,  //ADV120139
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-contact-management/returns-a-single-contact-state.js`,  //ADV120135
        `${ProjectPath.testCases}/inContact/non-UI/agent/Agent-Session-Management/gets-the-next-agent-event-description.js`,  //AGV120057
        `${ProjectPath.testCases}/inContact/non-UI/agent/supervisor-management/gives-the-ability-to-take-over-an-agent-on-a-live-call.js`,  //AGV120068
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-a-single-media-type.js`,  //ADV120078
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-a-list-of-custom-reports.js`,  //RPV120020
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-osi-statistics.js`,  //RPV120029
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-locations.js`,  //ADV120076
        `${ProjectPath.testCases}/inContact/non-UI/agent/phone-call-management/dial-agent-consult.js`,  //AGV120036
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-a-list-of-campaigns.js`,  //ADV120099
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/deletes-a-file.js`,  //ADV120062
        `${ProjectPath.testCases}/inContact/non-UI/admin/scheduled-callbacks-management/returns-scheduled-callbacks-for-an-agent.js`,  //ADV120051
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/remove-unavailable-codes-from-a-team.js`,  //ADV120048
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-a-performance-summary-of-an-agent.js`,  //RPV120006
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/gets-all-message-templates.js`,  //ADV120079
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/returns-agents-assigned-to-a-skill.js`,  //ADV120114
        `${ProjectPath.testCases}/inContact/non-UI/agent/Agent-Session-Management/continue-or-cancel-a-reskill-call-during-closed-hours.js`,  //AGV120058
        `${ProjectPath.testCases}/inContact/non-UI/agent/scheduled-callbacks-management/dial-a-scheduled-callback.js`,  //AGV120051
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/create-a-dnc-group.js`,  //ADV120138
        `${ProjectPath.testCases}/inContact/non-UI/agent/chat-contact-management/restore-a-chat-to-an-active-state.js`,  //AGV120008
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/assigns-a-tag-to-a-kill.js`,  //ADV120124
        `${ProjectPath.testCases}/inContact/non-UI/admin/agent-management/returns-a-list-of-agent-states.js`,  //ADV120039
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-possible-timezones.js`,  //ADV120097
        `${ProjectPath.testCases}/inContact/non-UI/agent/phone-call-management/conference-calls-together.js`,  //AGV120038
        `${ProjectPath.testCases}/inContact/non-UI/admin/group-management/get-groups.js`,  //ADV120160
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-sla-summary-for-a-skill.js`,  //RPV120017
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-a-single-point-of-contact.js`,  //ADV120087
        `${ProjectPath.testCases}/inContact/non-UI/admin/calling-dnc-group-management/removes-a-contributing-skill.js`,  //ADV120142
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/generates-a-link-to-a-datadownload-report.js`,  //RPV120024
        `${ProjectPath.testCases}/inContact/non-UI/agent/phone-call-management/stop-masking-a-call-recording.js`,  //AGV120043
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/get-all-feedback-categories-and-priorities.js`,  //ADV120071
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/updates-a-skill.js`,  //ADV120108
        `${ProjectPath.testCases}/inContact/non-UI/agent/Agent-Session-Management/set-agent-status.js`,  //AGV120060
        `${ProjectPath.testCases}/inContact/non-UI/agent/scheduled-callbacks-management/cancels-a-presented-scheduled-callback.js`,  //AGV120053
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/assign-agents-to-a-skill.js`,  //ADV120115
        `${ProjectPath.testCases}/inContact/non-UI/admin/group-management/modifies-a-group.js`,  //ADV120163
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/return-asi-metadata.js`,  //RPV120026
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-completed-contacts.js`,  //RPV120010
        `${ProjectPath.testCases}/inContact/non-UI/agent/agent-phone-management/dial-agent-phone.js`,  //AGV120001
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/creates-a-skill.js`,  //ADV120106
        `${ProjectPath.testCases}/inContact/non-UI/agent/phone-call-management/masks-a-recording-with-white-noise.js`,  //AGV120042
        `${ProjectPath.testCases}/inContact/non-UI/admin/group-management/assigns-agents-to-a-group.js`,  //ADV120166
        `${ProjectPath.testCases}/inContact/non-UI/agent/email-contact-management/transfer-email-to-a-skill.js`,  //AGV120024
        `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-performance-summary-of-all-teams.js`,  //RPV120018
        `${ProjectPath.testCases}/inContact/non-UI/agent/Agent-Session-Management/joins-an-existing-agent-session.js`,  //AGV120055
        `${ProjectPath.testCases}/inContact/non-UI/agent/Agent-Session-Management/starts-an-agent-session.js`,  //AGV120054
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/start-a-personal-connection-skil.js`,  //ADV120110
        `${ProjectPath.testCases}/inContact/non-UI/agent/chat-contact-management/send-chat-text-to-the-patron.js`,  //AGV120009
        `${ProjectPath.testCases}/inContact/non-UI/agent/email-contact-management/transfer-email-to-an-agent.js`,  //AGV120023
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/create-a-new-disposition.js`,  //ADV120101
        `${ProjectPath.testCases}/inContact/non-UI/admin/group-management/create-groups.js`,  //ADV120161
        `${ProjectPath.testCases}/inContact/non-UI/agent/Agent-Session-Management/moves-an-email-into-focus.js`,  //AGV120064
        `${ProjectPath.testCases}/inContact/non-UI/admin/skill-campaign-management/update-skill-agent-assignments.js`,  //ADV120116
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-all-security-prrofiles.js`,  //ADV120088
        `${ProjectPath.testCases}/inContact/non-UI/admin/general-admin-management/returns-sms-phone-codes.js`,  //ADV120085
        
        // `${ProjectPath.testCases}/inContact/non-UI/agent/phone-call-management/accept-consult-request.js`,
        // `${ProjectPath.testCases}/inContact/non-UI/reporting/historical-reporting/returns-quality-management-statistics.js`,

    ],
    helpers: [
        `${ProjectPath.test_helpers}/helper-api/configReport.js`
    ],
    stopSpecOnExpectationFailure: false,
    random: false,

});

jas.onComplete(function (passed: any) {
    try {
        let testConfig = {
            reportTitle: 'Test Report',
            outputPath: `${ProjectPath.conf}/test/reports`
        };

        NewReportAPIHTML.from(`${ProjectPath.conf}/test/reports/xmlresults.xml`, testConfig);
        HTMLEmailReportAPI.generateReportHourly(`${ProjectPath.conf}/test/reports/xmlresults.xml`, `${ProjectPath.conf}/test/reports/emailHtml/`, "inContact API Test");
    } catch (err) {
        console.log(err);
    }
});

jas.execute();