export class LogHeader {
    
    private case_id: number
    private event: number
    private timestamp: number

    constructor(case_id, event, timestamp) {
        this.case_id = case_id
        this.event = event
        this.timestamp = timestamp
    }

}
