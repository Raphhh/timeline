import { PeriodJsonInterface } from './PeriodJsonInterface';
import { Date } from './Date';
import {Duration} from "./Duration";

export class Period {

    public readonly parent: Period|null;
    private readonly data: PeriodJsonInterface;
    private _children: Period[];
    private _relativeStartDate: Duration|null;
    private _duration: Duration|null;

    constructor(data: PeriodJsonInterface, parent: Period = null) {
        this.data = data;
        this.parent = parent;
    }

    get id(): string {
        return this.data.id || '';
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

    get relativeStartDate(): Duration|null {
        if (this._relativeStartDate === undefined) {
            this._relativeStartDate = this.buildRelativeStartDate();
        }
        return this._relativeStartDate;
    }

    get endDate(): Date|null {
        if (this.data.end_date) {
            return new Date(this.data.end_date);
        }
        return null;
    }

    get duration(): Duration|null {
        if (this._duration === undefined) {
            this._duration = this.buildDuration();
        }
        return this._duration;
    }

    get children(): Period[] {
        if (this._children === undefined) {
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

    private buildRelativeStartDate(): Duration|null {
        if (!this.parent) {
            return new Duration(0);
        }

        if (!this.startDate) {
            return this.parent.relativeStartDate;
        }

        let parent: Period|null = this;
        while (parent = parent.parent) {
            if (parent.startDate) {
                return new Duration(this.startDate.unix() - parent.startDate.unix());
            }
        }

        return null;
    }

    buildDuration(): Duration|null {
        if (!this.startDate) {
            return this.parent.duration;
        }

        if (!this.endDate) {
            return new Duration(0);
        }

        return new Duration(this.endDate.unix() - this.startDate.unix());
    }
}
