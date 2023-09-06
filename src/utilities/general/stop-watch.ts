import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class StopWatch {

	private _startTime: number;

	/**
	 * Start clock to count
	 * @static
	 * @memberof StopWatch
	 */
	public startClock(): void {
		try {
			if (this._startTime == null) {
				this._startTime = new Date().getTime();
			} else {
				throw Error("Clock has already started");
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.startClock, err.message);
		}
	}

	/**
	 * Stop the watch and get elapsed time in millisecond
	 * @static
	 * @param {number} startTime start point of time
	 * @returns {number} 
	 * @memberof StopWatch
	 */
	public getElapsedTime(): number {
		try {
			let endTime = new Date().getTime();
			return endTime - this._startTime;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getElapsedTime, err.message);
		}
	}

	/**
	 * Stop the watch and get elapsed time in second
	 * @static
	 * @param {number} startTime  start point of time
	 * @returns {number} 
	 * @memberof StopWatch
	 */
	public getElapsedTimeInSecond(): number {
		try {
			let endTime = new Date().getTime();
			return (endTime - this._startTime) / 1000;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getElapsedTimeInSecond, err.message);
		}
	}

	/**
	 * get time left in second
	 * @param {number} maxTimeoutInSecond
	 * @returns {number}
	 * @memberof StopWatch
	 */
	public getTimeLeftInSecond(maxTimeoutInSecond: number): number {
		try {
			return maxTimeoutInSecond - this.getElapsedTimeInSecond();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getTimeLeftInSecond, err.message);
		}
	}
}