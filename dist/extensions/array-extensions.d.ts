declare global {
    interface Array<T> {
        random<T>(): T;
        filterNotNull<T>(): Array<T>;
    }
}
export declare function random<T>(array: Array<T>): T;
export declare function filterNotNull<T>(array: (T | null | undefined)[]): T[];
