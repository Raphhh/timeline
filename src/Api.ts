export class Api {

    private windowOrWorkerGlobalScope: WindowOrWorkerGlobalScope;

    constructor(windowOrWorkerGlobalScope: WindowOrWorkerGlobalScope) {
        this.windowOrWorkerGlobalScope = windowOrWorkerGlobalScope;
    }

    request<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
        return this.windowOrWorkerGlobalScope.fetch(input, init).then(
            (response: Response) => {
                return <T><unknown>response.json();
            }
        );
    }
}