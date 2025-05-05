module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
    '!src/db.js'
  ],
  coverageThreshold: {
    global: { branches: 35, functions: 50, lines: 50, statements: 50 }
  }
};
