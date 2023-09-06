declare module jasmine {
        interface Matchers<T> {
                toBe(expected: any, message: string): boolean;
        }
}