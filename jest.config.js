module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test-setup.js'],
  testMatch: ['**/*.spec.js', '**/*.test.js'],
  resetMocks: true,
  restoreMocks: true,
  moduleNameMapper: {
    '^.+\\.(css|less|scss|svg|png|jpg)$': 'babel-jest',
  },
  transform: {
    '^.+\\.(js|jsx|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/build/',
    '<rootDir>/dist/',
    '<rootDir>/coverage/',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
