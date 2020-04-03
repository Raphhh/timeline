export interface PeriodJsonInterface {
    title?: string;
    end_date?: string;
    start_date?: string;
    children?: PeriodJsonInterface[];
}