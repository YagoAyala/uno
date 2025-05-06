const Priority = require('./priority.model');

/**
 * Fetch every priority ordered by ascending `id`.
 *
 * @async
 * @function findAll
 * @returns {Promise<Array<Object>>} Resolves to an array of Priority rows.
 */
const findAll = async () => {
  const rows = await Priority.findAll({ order: [['id', 'ASC']] });
  return rows;
};

module.exports = { findAll };