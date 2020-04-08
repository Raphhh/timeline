export interface PeriodJsonInterface {
    id?: string;
    url?: string;
    title?: string;
    end_date?: string;
    start_date?: string;
    children?: PeriodJsonInterface[];
}