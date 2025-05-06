const service = require('./priority.service');

/**
 * GraphQL root **Query** resolvers.
 * @type {{ priorities: () => Promise<Array<Object>> }}
 */
const queryResolvers = {
  /**
   * Resolver for the `priorities` query.
   *
   * @returns {Promise<Array<Object>>} All priorities.
   */
  priorities: async () => {
    const rows = await service.listPriorities();
    return rows;
  },
};

module.exports = { Query: queryResolvers };