import moment from "moment";

export class Duration {

    private readonly moment: moment.Moment;

    constructor(unix: number) {
        this.moment = moment.unix(unix);
    }

    get years(): number {
        return (this.moment.year() - 1970);
    }

    get months(): number {
        return this.moment.month();
    }

    get days(): number {
        return this.moment.day(); //todo 4???
    }

    toString(): string {
        return [
            this.years,
            this.months,
            this.days
        ].join('-');
    }

    get unix(): number {
        return this.moment.unix();
    }
}