const repo = require('./priority.repository');

/**
 * Return the full list of priorities.
 *
 * @async
 * @function listPriorities
 * @returns {Promise<Array<Object>>} Resolves to an array of Priority rows.
 */
const listPriorities = async () => {
  const priorities = await repo.findAll();
  return priorities;
};

module.exports = { listPriorities };