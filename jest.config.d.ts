export const preset: string;
export const testEnvironment: string;
export const setupFilesAfterEnv: string[];
export const testMatch: string[];
export const resetMocks: boolean;
export const restoreMocks: boolean;
export const moduleNameMapper: {
    '^.+\\.(css|less|scss|svg|png|jpg)$': string;
};
export const transform: {
    '^.+\\.(js|jsx|tsx)$': string;
};
export const transformIgnorePatterns: string[];
export namespace coverageThreshold {
    namespace global {
        const statements: number;
        const branches: number;
        const functions: number;
        const lines: number;
    }
}
