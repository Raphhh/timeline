import {PluginObject} from "vue/types/plugin";
import {PluginFunction} from "vue/types/umd";
import {PeriodApi} from "./PeriodApi";
import {Api} from "./Api";
import Vue from "vue";
import {VueConstructor} from "vue/types/vue";

interface Options {
    api?: RequestInit
}

export class TimelineVuePlugin implements PluginObject<Options> {

    private readonly periodApi: PeriodApi;

    static init(vue: VueConstructor, options ?: Options) {
        Vue.use(new TimelineVuePlugin(), options);
    }

    constructor(windowOrWorkerGlobalScope: WindowOrWorkerGlobalScope = window) {
        this.periodApi = new PeriodApi(new Api(windowOrWorkerGlobalScope));
    }

    get install(): PluginFunction<Options> {
        let periodApi: PeriodApi = this.periodApi;
        return function (Vue, options?) {
            Vue.prototype.$periodApi = periodApi;
            Vue.prototype.$timelineOptions = options || {};
        };
    };
}