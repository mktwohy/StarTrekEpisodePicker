declare global {
    interface Array<T> {
        random(): T
    }
}

export function random<T>(array: Array<T>): T {
    return array[Math.floor(Math.random() * array.length)];
}

