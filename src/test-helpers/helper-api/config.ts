import HTMLEmailHReport from '@utilities/report-email/report-html';
import ProjectPath from '@test-data/general/project-path';

export default function setConfig(jas: any): void {
    jas.onComplete(function (passed: any) {
        try {
            let testConfig = {
                reportTitle: 'Test Execution Report',
                outputPath: `${ProjectPath.conf}/test/reports`
            };

            HTMLEmailHReport.from(`${ProjectPath.conf}/test/reports/xmlresults.xml`, testConfig);
        } catch (err) {
            console.log(err);
        }
    });
}