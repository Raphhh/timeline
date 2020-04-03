import { PeriodJsonInterface } from './PeriodJsonInterface';

export class Period {

    public readonly parent: Period|null;
    private readonly data: PeriodJsonInterface;
    private _children: Period[];

    constructor(data: PeriodJsonInterface, parent: Period = null) {
        this.data = data;
        this.parent = parent;
    }

    get title(): string {
        return this.data.title || '';
    }

    get startDate(): Date|null {
        if (this.data.start_date) {
            return new Date(this.data.start_date);
        }
        return null;
    }

    get relativeStartDate(): Date|null {

        if (!this.parent) {
            return new Date(0);
        }

        if (!this.startDate) {
            return this.parent.relativeStartDate;
        }

        if (this.parent.relativeStartDate) {
            return new Date(this.parent.relativeStartDate.getUTCMilliseconds() - this.startDate.getUTCMilliseconds());
        }

        return null;
    }

    get endDate(): Date|null {
        if (this.data.end_date) {
            return new Date(this.data.end_date);
        }
        return null;
    }

    get duration(): Date|null {
        if (!this.endDate) {
            return null;
        }

        let relativeStartDate: Date|null = this.relativeStartDate;
        if (!relativeStartDate) {
            return null;
        }

        return new Date(this.endDate.getUTCMilliseconds() - relativeStartDate.getUTCMilliseconds());
    }

    get children(): Period[] {
        if (!this._children) {
            this._children = this.buildChildren();
        }
        return this._children;
    }

    private buildChildren(): Period[] {
        let result: Period[] = [];

        if (!this.data.children) {
            return result;
        }

        for (let child of this.data.children) {
            result.push(new Period(child, this));
        }

        return result;
    }
}
