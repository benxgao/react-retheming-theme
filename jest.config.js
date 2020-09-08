module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.js',
  ],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
}