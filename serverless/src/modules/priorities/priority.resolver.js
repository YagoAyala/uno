const service = require('./priority.service');

const queryResolvers = {
  priorities: async () => {
    const rows = await service.listPriorities();
    return rows;
  },
};

module.exports = { Query: queryResolvers };
