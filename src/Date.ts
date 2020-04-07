import moment from 'moment';

function formatValue(value: string): string {

    //for now,BC not supported
    if (value.charAt(0) === '-') {
        throw new Error('BC dates are not supported');
    }

    //force 4 digit year
    let length: number = 4 - value.split('-')[0].length;
    for(let i: number = 0; i < length; ++i) {
        value = '0' + value;
    }

    //force timezone
    if (value.length === 4) {
        return value + '-01-01T00:00:00+00:00';
    }
    return value + 'T00:00:00+00:00';
}

export class Date {

    public readonly value: string;
    public readonly moment: moment.Moment;

    constructor(value: string) {
        this.value = value;
        this.moment = moment(formatValue(value));
    }

    toString(): string {
        return this.value;
    }

    toISOString(): string {
        return this.moment.toISOString();
    }

    unix(): number {
        return this.moment.unix();
    }
}
