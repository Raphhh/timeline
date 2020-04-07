import {Period} from "./Period";
import {PeriodCssOptionsInterface} from "./PeriodCssOptionsInterface";
import {PeriodCssProxy} from "./PeriodCssProxy";
import {PeriodCssInterface} from "./PeriodCssInterface";

export class PeriodCssFactory {

    private readonly scale: number;
    private readonly options: PeriodCssOptionsInterface;

    constructor(scale: number = 0.0000001, options: PeriodCssOptionsInterface) {
        this.scale = scale;
        this.options = options;
    }

    createPeriodCss(period: Period): PeriodCssInterface {
        return new PeriodCssProxy(
            period,
            this.scale,
            this.options
        )
    }
}