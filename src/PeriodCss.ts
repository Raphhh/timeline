import {Period} from "./Period";

export class PeriodCss {

    private readonly period: Period;
    private readonly scale: number;

    constructor(period: Period, scale: number = 0.0000001) {
        this.period = period;
        this.scale = scale;
    }

    buildStyle(): object {
        return {
            'left': this.left,
            'width': this.width,
        };
    }

    get left(): string {
        if (this.period.relativeStartDate) {
            return (this.period.relativeStartDate.unix * this.scale) + 'px';
        }
        return '0';
    }

    get width(): string {
        if (this.period.duration) {
            return (this.period.duration.unix * this.scale) + 'px';
        }
        return '0';
    }
}