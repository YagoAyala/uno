const repo = require('./priority.repository');

const listPriorities = async () => {
  const priorities = await repo.findAll();
  return priorities;
};

module.exports = { listPriorities };
