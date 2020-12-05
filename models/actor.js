"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Film }) {
      // define association here
      this.belongsToMany(Film, {
        through: "FilmActor",
        as: "films",
        foreignKey: "actorId",
      });
    }
  }
  Actor.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      age: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      tableName: "actors",
      modelName: "Actor",
    }
  );
  return Actor;
};
