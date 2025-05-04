const service = require('./lane.service');

/**
 * GraphQL query resolvers for Lane.
 * @namespace Query
 */
const queryResolvers = {
  /**
   * Resolver for `lanes` query.
   *
   * @returns {Promise<Object[]>}
   */
  lanes: async () => {
    const rows = await service.listLanes();
    return rows;
  },

  /**
   * Resolver for `lane` query.
   *
   * @param {unknown} _parent - Parent resolver result.
   * @param {{id: number}} args - Arguments.
   * @returns {Promise<Object|null>}
   */
  lane: async (_parent, { id }) => {
    const row = await service.getLane(id);
    return row;
  },

  /**
   * Resolver for `lanesWithItem` query.
   *
   * @param {unknown} _parent - Parent resolver result.
   * @param {{filter: {name?: string}}} args - Arguments.
   * @returns {Promise<Object[]>}
   */
  lanesWithItem: async (_parent, { filter }) => {
    const rows = await service.listLanesWithTodo(filter);
    return rows;
  },
};

/**
 * GraphQL mutation resolvers for Lane.
 * @namespace Mutation
 */
const mutationResolvers = {
  /**
   * Resolver for `createLane` mutation.
   *
   * @param {unknown} _parent - Parent resolver result.
   * @param {{values: Object}} args - Arguments.
   * @returns {Promise<Object>}
   */
  createLane: async (_parent, { values }) => {
    const row = await service.addLane(values);
    return row;
  },

  /**
   * Resolver for `updateLane` mutation.
   *
   * @param {unknown} _parent - Parent resolver result.
   * @param {{id: number, values: Object}} args - Arguments.
   * @returns {Promise<Object|null>}
   */
  updateLane: async (_parent, { id, values }) => {
    const row = await service.editLane(id, values);
    return row;
  },

  /**
   * Resolver for `deleteLane` mutation.
   *
   * @param {unknown} _parent - Parent resolver result.
   * @param {{id: number}} args - Arguments.
   * @returns {Promise<boolean>}
   */
  deleteLane: async (_parent, { id }) => {
    const ok = await service.deleteLane(id);
    return ok;
  },
};

module.exports = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};
