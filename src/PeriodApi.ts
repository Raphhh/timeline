import {Api} from "./Api";
import {Period} from "./Period";
import {PeriodJsonInterface} from "./PeriodJsonInterface";

export class PeriodApi {

    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    request(url: string): Promise<Period> {
        return this.api.request<PeriodJsonInterface>(url)
            .then((data: PeriodJsonInterface) => {
                return new Period(data);
            });
    }
}
