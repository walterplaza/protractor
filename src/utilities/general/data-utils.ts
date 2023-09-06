import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

/**
 * Utils to read data from file
 */
export class DataUtils {
    /**
     * Read CSV file
     * @static
     * @param {string} filePath File location
     * @returns {Promise<Array<Object>>}
     * @memberof DataUtils
     */
    public static async readCSV(filePath: string): Promise<Array<Object>> {
        try {
            let csv = require('csvtojson');
            let jsonArray = await csv().fromFile(filePath);
            return jsonArray;
        } catch (err) {
            throw new errorwrapper.CustomError(this.readCSV, err.message);
        }

    }

    /**
     * Read Excel file
     * @static
     * @param {string} file Read Excel (xlsx) file
     * @param {string} [sheetName=""] the sheet name of excel file, default get data of the first sheet
     * @returns {Array<Object>}
     * @memberof DataUtils
     */
    public static readExcel(file: string, sheetName: string = ""): Array<Object> {
        try {
            let XLSX = require('xlsx');
            let workbook = XLSX.readFile(file);

            if (sheetName === "") {
                let sheet_name_list = workbook.SheetNames;
                sheetName = sheet_name_list[0];
            }

            return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        } catch (err) {
            throw new errorwrapper.CustomError(this.readExcel, err.message);
        }
    }

    /**
     * Read CSV file
     * @static
     * @param {string} file Read Excel (xlsx) file
     * @returns {Array<Object>}
     * @memberof DataUtils
     */
    public static readCSVToArray(file: string): Array<Array<string>> {
        var fs = require('fs');
        var contents = fs.readFileSync(file, 'utf8');

        const parse = require('csv-parse/lib/sync')
        const records = parse(contents, {
            columns: false,
            skip_empty_lines: true
        });
        return records;
    }
}