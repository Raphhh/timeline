import {Period} from "./Period";
import {PeriodCssOptionsInterface} from "./PeriodCssOptionsInterface";
import {PeriodCss} from "./PeriodCss";
import {PeriodCssInterface} from "./PeriodCssInterface";

export class PeriodCssProxy implements PeriodCssInterface {

    public scale: number;
    public options: PeriodCssOptionsInterface;
    private readonly period: Period;

    public constructor(period: Period, scale: number, options: PeriodCssOptionsInterface) {
        this.period = period;
        this.scale = scale;
        this.options = options;
    }

    buildStyle(): object {
        return this.getCache().buildStyle();
    }

    get width(): number {
        return this.getCache().width;
    }

    get height(): number {
        return this.getCache().height;
    }

    get left(): number {
        return this.getCache().left;
    }

    get top(): number {
        return this.getCache().top;
    }

    private getCache(): PeriodCss {
        //because object has no identifier, we store data in it directly
        if (!this.period.periodCss || !this.isEquivalent(this.period.periodCss)) {
            this.period.periodCss = new PeriodCss(this.period, this.scale, this.options);
        }
        return this.period.periodCss;
    }

    private isEquivalent(periodCss: PeriodCss) {
        return this.scale === periodCss.scale
            && this.options === this.options;
    }
}
