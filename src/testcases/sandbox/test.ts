import { DataUtils } from "@utilities/general/data-utils";
import { Utility } from "@utilities/general/utility";

describe('Test 1', function () {

    it('Spec 1', async function () {       
                
        let a1 = await DataUtils.readCSV(Utility.getPath("src\\Test\\Sample1.csv"));
        let a2 = DataUtils.readExcel(Utility.getPath("src\\Test\\Book1.xlsx"), "Sheet2");
    });  
});