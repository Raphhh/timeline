import { PeriodJsonInterface } from './PeriodJsonInterface';
import { Date } from './Date';
import {Duration} from "./Duration";
import {PeriodCss} from "./PeriodCss";

export class Period {

    public periodCss: PeriodCss|null;
    public readonly parent: Period|null;
    private readonly data: PeriodJsonInterface;
    private _children: Period[];
    private _relativeStartDate: Duration|null;
    private _duration: Duration|null;
    private _previousBrother: Period|null;

    constructor(data: PeriodJsonInterface, parent: Period = null) {
        this.data = data;
        this.parent = parent;
        this.periodCss = null;
    }

    get id(): string|null {
        return this.data.id || null;
    }

    get url(): string|null {
        return this.data.url || null;
    }

    get title(): string|null {
        return this.data.title || null;
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
    
    get previousBrother(): Period|null {
        if (this._previousBrother === undefined) {
            this._previousBrother = this.buildPreviousBrother();
        }
        return this._previousBrother;
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
            return new Duration(0);
        }

        let parent: Period|null = this;
        while (parent = parent.parent) {
            if (parent.startDate) {
                return new Duration(this.startDate.unix() - parent.startDate.unix());
            }
        }

        //todo ici c'est que le noeud root n'a aucune date... mhhh peut-être thrower une exception?
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

    private buildPreviousBrother(): Period|null {
        if (!this.parent) {
            return null;
        }

        let brother: Period|null = null;
        for (let i = 0, length = this.parent.children.length; i < length; ++i){
            if (this.parent.children[i] === this) {
                break;
            }
            brother = this.parent.children[i];
        }
        return brother;
    }
}
