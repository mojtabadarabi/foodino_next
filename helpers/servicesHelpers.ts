// =========== Types ============
interface Result {
    isError: boolean,
    data:any,
    error: {
        status: number,
        data: Record<string, any>
    }
}
// =========== Types ============

export function afterSsrApi(results: Result[]):[Result[],boolean] {
    const foundedResult = results.find((result: Result) => result.isError && result.error.status === 403)
    if (foundedResult) {
        return [
            results,
            true
        ]
    }
    else {
        return [
            results,
            false
        ]
    }
}