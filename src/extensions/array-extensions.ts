declare global {
    interface Array<T> {
        random<T>(): T
        filterNotNull<T>(): Array<T>
    }
}

export function random<T>(array: Array<T>): T {
    return array[Math.floor(Math.random() * array.length)];
}

export function filterNotNull<T>(array: (T | null | undefined)[]): T[] {
    return array.filter(item => item !== null && item !== undefined) as T[]
}

