const Priority = require('./priority.model');

const findAll = async () => {
  const rows = await Priority.findAll({ order: [['id', 'ASC']] });
  return rows;
};

module.exports = { findAll };
