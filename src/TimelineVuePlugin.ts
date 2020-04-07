import {PluginObject} from "vue/types/plugin";
import {PluginFunction} from "vue/types/umd";
import Vue from "vue";
import {VueConstructor} from "vue/types/vue";
import {Timeline} from "./Timeline";
import {TimelineOptionsInterface} from "./TimelineOptionsInterface";
import {Period} from "./Period";

interface Options {
    timeline?: TimelineOptionsInterface
    api?: RequestInit
}

export class TimelineVuePlugin implements PluginObject<Options> {

    private readonly windowOrWorkerGlobalScope: WindowOrWorkerGlobalScope;
    private timeline: Timeline;
    private options: Options;

    static init(vue: VueConstructor, options ?: Options) {
        Vue.use(new TimelineVuePlugin(), options);
    }

    constructor(windowOrWorkerGlobalScope: WindowOrWorkerGlobalScope = window) {
        this.windowOrWorkerGlobalScope = windowOrWorkerGlobalScope;
    }

    get install(): PluginFunction<Options> {
        return this.init;
    };

    init(Vue: VueConstructor, options?: Options) {
        Vue.prototype.$timelinePlugin = this;
        this.options = options || {};
        this.timeline = new Timeline(
            this.options.timeline || {},
            this.windowOrWorkerGlobalScope
        );
    }

    requestPeriod(input: RequestInfo): Promise<Period> {
        return this.timeline.periodApi.request(input, this.options.api);
    }

    buildStyleForPeriod(period: Period): object {
        return this.timeline.periodCssFactory.createPeriodCss(period).buildStyle();
    }
}