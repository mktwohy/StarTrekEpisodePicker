declare global {
    interface Array<T> {
        random(): T;
    }
}
export declare function random<T>(array: Array<T>): T;
