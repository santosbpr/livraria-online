module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/lib/__tests__/setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/src/lib/__tests__/setup.ts'],
};