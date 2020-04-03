export class Api {

    private windowOrWorkerGlobalScope: WindowOrWorkerGlobalScope;

    constructor(windowOrWorkerGlobalScope: WindowOrWorkerGlobalScope) {
        this.windowOrWorkerGlobalScope = windowOrWorkerGlobalScope;
    }

    request<T>(url: string): Promise<T> {
        return this.windowOrWorkerGlobalScope.fetch(url).then(
            (response: Response) => {
                return <T><unknown>response.json();
            }
        );
    }
}