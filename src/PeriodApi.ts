import {Api} from "./Api";
import {Period} from "./Period";
import {PeriodJsonInterface} from "./PeriodJsonInterface";

export class PeriodApi {

    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    request(input: RequestInfo, init?: RequestInit): Promise<Period> {
        return this.api.request<PeriodJsonInterface>(input, init)
            .then((data: PeriodJsonInterface) => {
                return new Period(data);
            });
    }
}
