import { Utility } from "@utilities/general/utility";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { Timezone } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";

export class Tenant {
	name: string;
	partner: string;
	tenantType: string;
	expirationDate: string;
	timezone: string;
	billingId: string;
	clusterId: string;
	billingCycle: number;
	billingTelephoneNumber: string;
	userCap: number;

	/**
	 * Initialize data for Tenant
	 * @param {string} tenantType
	 * @param {string} timezone
	 * @param {string} billingId
	 * @param {string} clusterId
	 * @param {string} [partner=""]
	 * @param {string} [expirationDate=""]
	 * @returns {Tenant}
	 * @memberof Tenant
	 */
	public initData(tenantType: TenantType, timezone: Timezone, billingId: string = "-1", clusterId: string = TestRunInfo.clusterID, partner: string = "", expirationDate: string = ""): Tenant {
		try {
			let _tenantName = Utility.createRandomString(18, "IT_lgvn_");
			let _phoneNumber = "99" + Utility.getRandomNumber(8);
			this.name = _tenantName;
			this.partner = partner;
			this.tenantType = tenantType;
			this.expirationDate = expirationDate;
			this.timezone = timezone;
			this.billingId = billingId;
			this.clusterId = clusterId;
			this.billingCycle = Utility.getRandomNumber(null, 1, 28);
			this.billingTelephoneNumber = _phoneNumber;
			this.userCap = Utility.getRandomNumber(null, 1, 3000);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.initData, err.message);
		}
	}
}

export enum TenantType {
	TRIAL = "TRIAL",
	CUSTOMER = "CUSTOMER"
}

export enum ApplicationType {
	ACD = "ACD",
	ANALYTICS = "ANALYTICS",
	AUTOMATIONSTUDIO = "AUTOMATIONSTUDIO",
	PM = "PM",
	QM = "QM",
	RECORDING = "RECORDING",
	WFI = "WFI",
	WFM = "WFM"
}

export enum QMFeature {
	QM = "QM",
	QM_ANALYTICS = "QM Analytics"
}

export enum RecordingSetting {
	CXONE = "CXone",
	AMAZON_CONNECT = "Amazon Connect",
	UPTIVITY = "Uptivity"
}



