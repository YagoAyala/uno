const repository = require('./todo.repository');

/**
 * List todos.
 *
 * @async
 * @param {{id?: number, name?: string}} [filter] - Filter options.
 * @returns {Promise<Object[]>}
 */
const listItems = async (filter) => {
  const list = await repository.findAll(filter);
  return list;
};

/**
 * Create a new todo.
 *
 * @async
 * @param {{name: string, priority_id?: number}} values - Todo values.
 * @throws {Error} If name is empty or duplicate.
 * @returns {Promise<void>}
 */
const createItem = async ({ name, priority_id = 1 }) => {
  if (!name?.trim()) {
    throw new Error('Name cannot be empty');
  }

  const existing = await repository.findByName(name.trim());

  if (existing) {
    throw new Error('Duplicate item');
  }

  await repository.insert({ name: name.trim(), priority_id });
};

/**
 * Rename/update a todo.
 *
 * @async
 * @param {{id: number, name?: string, priority_id?: number}} todo - Todo update.
 * @throws {Error} If validation fails or item not found.
 * @returns {Promise<boolean>} True if update succeeded.
 */
const renameItem = async (todo) => {
  const todoId = todo.id;
  delete todo.id;

  if (todo.name && !todo.name?.trim()) {
    throw new Error('Name cannot be empty');
  }

  const updated = await repository.update(todoId, todo);

  if (!updated) {
    throw new Error('Item not found');
  }

  return true;
};

/**
 * Remove a todo by ID.
 *
 * @async
 * @param {number} id - Todo ID.
 * @throws {Error} If item not found.
 * @returns {Promise<boolean>} True if removal succeeded.
 */
const removeItem = async (id) => {
  const removed = await repository.deleteById(id);

  if (!removed) {
    throw new Error('Item not found');
  }

  return true;
};

module.exports = {
  listItems,
  createItem,
  renameItem,
  removeItem,
};
