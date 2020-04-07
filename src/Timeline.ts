import {PeriodApi} from "./PeriodApi";
import {Api} from "./Api";
import {PeriodCssFactory} from "./PeriodCssFactory";
import {TimelineOptionsInterface} from "./TimelineOptionsInterface";

export class Timeline {

    private readonly options: TimelineOptionsInterface;
    private readonly windowOrWorkerGlobalScope: WindowOrWorkerGlobalScope;
    private _periodApi: PeriodApi;
    private _periodCssFactory: PeriodCssFactory;

    constructor(options: TimelineOptionsInterface, windowOrWorkerGlobalScope: WindowOrWorkerGlobalScope = window) {
        this.options = options;
        this.windowOrWorkerGlobalScope = windowOrWorkerGlobalScope;
    }

    get periodApi(): PeriodApi {
        if (!this._periodApi) {
            this._periodApi = new PeriodApi(new Api(this.windowOrWorkerGlobalScope));
        }
        return this._periodApi;
    }

    get periodCssFactory(): PeriodCssFactory {
        if (!this._periodCssFactory) {
            this._periodCssFactory = new PeriodCssFactory(
                this.options.scale,
                this.options.css,
            );
        }
        return this._periodCssFactory;
    }
}