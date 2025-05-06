const { DataTypes } = require('sequelize');
const sequelize   = require('../../db');
const Lane        = require('../lane/lane.model');
const Priority    = require('../priorities/priority.model');

const Todo = sequelize.define('Todo', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:        { type: DataTypes.STRING,  allowNull: false, unique: true },
  lane_id:     { type: DataTypes.INTEGER, references: { model: 'lanes', key: 'id' } },
  priority_id: { type: DataTypes.INTEGER, references: { model: 'priorities', key: 'id' }, allowNull: false, defaultValue: 1 },
  created_at:  { type: DataTypes.DATE,    allowNull: false, defaultValue: DataTypes.NOW },
  updated_at:  { type: DataTypes.DATE,    allowNull: false, defaultValue: DataTypes.NOW },
  deleted_at:  { type: DataTypes.DATE },
}, { tableName: 'todos', timestamps: false, paranoid: false });

Todo.belongsTo(Lane,     { foreignKey: 'lane_id',     as: 'lane'     });
Todo.belongsTo(Priority, { foreignKey: 'priority_id', as: 'priority' });
Lane.hasMany(Todo,       { foreignKey: 'lane_id',     as: 'todos'    });
Priority.hasMany(Todo,   { foreignKey: 'priority_id', as: 'todos'    });

Todo.beforeUpdate(todo => { todo.updated_at = new Date(); });

module.exports = Todo;
