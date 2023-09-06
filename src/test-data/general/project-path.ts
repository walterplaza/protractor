import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import * as filePath from 'path';
export default class ProjectPath {

    static conf: string = ProjectPath.getPath("built\\conf").replace(/\\/g,"/");
    static testCases: string = ProjectPath.getPath("built\\testcases").replace(/\\/g,"/");
    static testData: string = ProjectPath.getPath("built\\test-data").replace(/\\/g,"/");
    static pageObjects: string = ProjectPath.getPath("built\\page-objects").replace(/\\/g,"/");
    static dataObjects: string = ProjectPath.getPath("built\\data-objects").replace(/\\/g,"/");
	static utilities: string = ProjectPath.getPath("built\\utilities").replace(/\\/g, "/");
	static test_helpers : string = ProjectPath.getPath("built\\test-helpers").replace(/\\/g, "/");
	static project : string = ProjectPath.getPath().replace(/\\/g, "/");

    /**
	 * Get the current file directory
	 * @static
	 * @param {string} filename
	 * @memberof ProjectPath
	 */
	private static getPath(filename?: string): string {
		try {
			let splitString: number = "built\\test-data\\general".length;
			let projectPath: string = __dirname.slice(0, __dirname.length - splitString);

			if (filename == null) {
				return projectPath;
			} else {
				return filePath.join(projectPath, filename);
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.getPath, err.message);
		}
	}
}




