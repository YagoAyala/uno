const service = require('./todo.service');

/**
 * GraphQL query resolvers for Todo.
 * @namespace Query
 */
const queryResolvers = {
  /**
   * Resolver for `todoList` query.
   *
   * @param {unknown} _p - Parent.
   * @param {{filter?: {id?: number, name?: string}}} args - Arguments.
   * @returns {Promise<Object[]>}
   */
  todoList: async (_p, { filter }) => {
    const result = await service.listItems(filter);
    return result;
  },
};

/**
 * GraphQL mutation resolvers for Todo.
 * @namespace Mutation
 */
const mutationResolvers = {
  /**
   * Resolver for `addItem` mutation.
   *
   * @param {unknown} _p - Parent.
   * @param {{values: {name: string}}} args - Arguments.
   * @returns {Promise<void>}
   */
  addItem: async (_p, { values }) => {
    const result = await service.createItem(values);
    return result;
  },

  /**
   * Resolver for `updateItem` mutation.
   *
   * @param {unknown} _p - Parent.
   * @param {{values: {id: number, [key: string]: any}}} args - Arguments.
   * @returns {Promise<boolean>}
   */
  updateItem: async (_p, { values }) => {
    const result = await service.updateItem(values);
    return result;
  },

  /**
   * Resolver for `deleteItem` mutation.
   *
   * @param {unknown} _p - Parent.
   * @param {{id: number}} args - Arguments.
   * @returns {Promise<boolean>}
   */
  deleteItem: async (_p, { id }) => {
    const result = await service.removeItem(id);
    return result;
  },
};

module.exports = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};
