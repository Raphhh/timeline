import {Period} from "./Period";

interface PeriodCssInterface {
    height?: number
}

export class PeriodCss {

    private readonly period: Period;
    private readonly scale: number;
    private readonly options: PeriodCssInterface;

    constructor(period: Period, scale: number = 0.0000001, options: PeriodCssInterface = {}) {
        this.period = period;
        this.scale = scale;
        this.options = options;
    }

    buildStyle(): object {
        return {
            'height': this.height + 'px',
            'width': this.width + 'px',
            'top': this.top + 'px',
            'left': this.left + 'px',
        };
    }

    get width(): number {
        if (this.period.duration) {
            //todo ici on a un problème pour gérer les margin et les border quand la duration est celle du parent.
            return this.period.duration.unix * this.scale;
        }
        return 0;
    }

    get height(): number {
        let defaultMinHeight: number = 60;
        let defaultTitleHeight: number = 30;

        let height: number = this.options.height || defaultMinHeight;

        //inspect children
        for (let i = 0, length = this.period.children.length; i < length; ++i) {
            let childCss: PeriodCss = this.buildPeriodCss(this.period.children[i]);
            if (childCss.top + childCss.height > (height - defaultTitleHeight)) {
                height = childCss.top + childCss.height + defaultTitleHeight;
            }
        }

        return height;

        //todo how to inspect brothers
        // if (!this.period.parent) {
        //     return height;
        // }
        //
        // let children: Period[] = this.period.parent.children;
        // for (let i = 0, length = children.length; i < length; ++i) {
        //     if (children[i] === this.period) {
        //         continue;
        //     }
        //     let brotherCss: PeriodCss = this.buildPeriodCss(children[i]);
        //     if (brotherCss.height > height) {
        //         height = brotherCss.height;
        //     }
        // }
        // throw new Error('instance not found in the children of the parent');
    }


    get left(): number {
        if (this.period.relativeStartDate) {
            return this.period.relativeStartDate.unix * this.scale;
        }
        return 0;
    }


    get top(): number {
        let top: number = 0;

        if (!this.period.parent) {
            return top;
        }

        if (this.period.relativeStartDate && this.period.relativeStartDate.unix) {
            return top;
        }

        //inspect brothers
        let brothers: Period[] = this.period.parent.children;
        for (let i = 0, length = brothers.length; i < length; ++i) {
            if (brothers[i] === this.period) {
                return top;
            }
            let brotherCss: PeriodCss = this.buildPeriodCss(brothers[i]);
            top = brotherCss.top + brotherCss.height + 2; //todo 2 pour compter les border et les margin aussi.
        }
        throw new Error('instance not found in the children of the parent');
    }

    private buildPeriodCss(period: Period): PeriodCss {
        return new PeriodCss(period, this.scale, this.options);
    }
}
