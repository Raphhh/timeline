import {Period} from "./Period";
import {PeriodCssInterface} from "./PeriodCssInterface";
import {PeriodCssOptionsInterface} from "./PeriodCssOptionsInterface";


export class PeriodCss implements PeriodCssInterface {

    public scale: number;
    public options: PeriodCssOptionsInterface;
    private readonly period: Period;

    constructor(period: Period, scale: number, options: PeriodCssOptionsInterface) {
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

    get left(): number {
        if (this.period.relativeStartDate) {
            return this.period.relativeStartDate.unix * this.scale;
        }
        return 0;
    }

    get width(): number {
        if (this.period.duration) {
            //todo ici on a un problème pour gérer les margin et les border quand la duration est celle du parent.
            return this.period.duration.unix * this.scale;
        }
        return 0;
    }

    get height(): number {
        let defaultTitleHeight: number = this.period.title ? 30 : 10;
        let height: number = this.options.height || 100;

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
    
    get top(): number {

        if (this.period.previousBrother) {
            let brotherCss: PeriodCss = this.buildPeriodCss(this.period.previousBrother);
            //todo compter les border et les margin aussi.
            //todo ici on a des erreurs de précision à cause de js. => Math.floor()
            if (Math.floor(brotherCss.left + brotherCss.width) > this.left) {
                return brotherCss.top + brotherCss.height ;
            }
            return brotherCss.top;
        }

        return 0;
    }

    private buildPeriodCss(period: Period): PeriodCss {
        //todo utiliser la factory!
        return new PeriodCss(period, this.scale, this.options);
    }
}
