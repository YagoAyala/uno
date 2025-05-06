module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
    '!src/db.js'
  ],
  coverageThreshold: {
    global: { branches: 10, functions: 25, lines: 25, statements: 25 }
  }
};
