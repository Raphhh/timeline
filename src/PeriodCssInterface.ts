import {PeriodCssOptionsInterface} from "./PeriodCssOptionsInterface";

export interface PeriodCssInterface {
    scale: number;
    options: PeriodCssOptionsInterface;
    width: number;
    height: number;
    left: number;
    top: number;
    buildStyle(): object;
}
