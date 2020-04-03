import {PluginObject} from "vue/types/plugin";
import {PluginFunction} from "vue/types/umd";
import {PeriodApi} from "./PeriodApi";
import {Api} from "./Api";

interface Options {}

export class TimelineVuePlugin implements PluginObject<Options> {

    private readonly periodApi: PeriodApi;

    constructor(windowOrWorkerGlobalScope: WindowOrWorkerGlobalScope) {
        this.periodApi = new PeriodApi(new Api(windowOrWorkerGlobalScope));
    }

    get install(): PluginFunction<Options> {
        let periodApi: PeriodApi = this.periodApi;
        return function (Vue, options?) {
            Vue.prototype.$periodApi = periodApi;
        };
    };
}