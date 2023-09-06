import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { by } from "protractor";
import { Utility } from "@utilities/general/utility";

export default class DateTimePicker {

    private static _dateTimePicker: DateTimePicker = null;

    protected icPreviousArrow = new ElementWrapper(by.xpath("//div[contains(@id,'_prevArrow')]"));
    protected icNextArrow = new ElementWrapper(by.xpath("//div[contains(@id,'_nextArrow')]"));

    // Dynamic controls

    protected getStartDateLabel(startDateLabelId: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[contains(@id,'${startDateLabelId}')]`));
    }

    protected getDate(dateId: string, date: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[contains(@id,'${dateId}')][contains(@title,'${date}')]`));
    }

    protected getMonth(monthId: string, month: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[contains(@id,'${monthId}')][contains(@title,'${month}')]`));
    }

    protected getYear(yearId: string, year: number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[contains(@id,'${yearId}')][contains(text(),'${year}')]`));
    }

    public static getInstance(): DateTimePicker {
        this._dateTimePicker = new DateTimePicker();
        return this._dateTimePicker;
    }

    public async selectDateByDatePicker(startDate: string, dateId: string, lbId: string, yearId: string, monthId: string): Promise<void> {

        let lbStartDate = await this.getStartDateLabel(lbId);

        let startDateTitle: string = await lbStartDate.getText();

        // Generate new start date if the given date is empty or invalid
        if (startDate == "" || startDate == "Invalid Date") {
            startDate = await Utility.addDateToCurrentDate(0, 1, 0, '2-digit', 'long', 'numeric');
        }

        // Select date

        let dynDate = await this.getDate(dateId, startDate);
        let date: Date = new Date(startDate);
        let year: number = date.getFullYear();

        let arrDate: string[] = (startDateTitle.split(" ", 2));
        arrDate[0] = arrDate[0].substr(0, arrDate[0].length - 1);

        let isMonthContained: number = startDate.indexOf(arrDate[0]);
        let isYearContained: number = startDate.indexOf(arrDate[1]);

        if (isMonthContained >= 0 && isYearContained >= 0) {
            await dynDate.waitForControlStable();
            await dynDate.click();
        } else {

            // Go to year calendar
            if (startDateTitle.length > 9) {
                await lbStartDate.click();
                await lbStartDate.waitForControlStable();
                await lbStartDate.click();
                await lbStartDate.waitForControlStable();
                await lbStartDate.click();

            } else if (startDateTitle.length == 9) {
                await lbStartDate.click();
                await lbStartDate.waitForControlStable();
                await lbStartDate.click();

            }

            // Move to year period
            await lbStartDate.waitForControlStable();
            startDateTitle = await lbStartDate.getText();

            let arrYear: string[] = (startDateTitle.split("-", 2));
            let arrYearN: number[] = [];

            arrYearN[0] = parseInt(arrYear[0], 0);
            arrYearN[1] = parseInt(arrYear[1], 0);

            if (arrYearN[0] > year) {

                for (var i: number = (arrYearN[0] - year) / 10; i >= 0; i--) {

                    await this.icPreviousArrow.click();
                    await lbStartDate.waitForControlStable();

                }
            } else if (year > arrYearN[1]) {

                for (var i: number = (year - arrYearN[1]) / 10; i >= 0; i--) {

                    await this.icNextArrow.click();
                    await lbStartDate.waitForControlStable();

                }
            }

            // Select year
            let dynYear = await this.getYear(yearId, year);
            await dynYear.waitForControlStable();
            await dynYear.click();

            // Format month value
            let arrDate: string[] = startDate.split(",", 3);
            let arrMonthDay: string[] = arrDate[1].split(" ", 2);
            let month: string = arrMonthDay[1] + "," + arrDate[2];

            // Select month
            let dynMonth = await this.getMonth(monthId, month);
            await dynMonth.waitForControlStable();
            await dynMonth.click();

            await dynDate.click();

        }
    }
}