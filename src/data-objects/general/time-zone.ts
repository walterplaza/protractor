export class TimeZone {
    timeZone: string;
    timeZoneName: string;
    timeStandard: string;

    public init(timeStandard: string, timeZone: string, timeZoneName?: string, ): TimeZone {
        this.timeStandard = timeStandard;
        this.timeZone = timeZone;
        if(timeZoneName==''){
            this.timeZoneName = timeZoneName;
        }
        return this;
        
    }
}