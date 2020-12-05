"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Actor }) {
      // define association here
      this.belongsToMany(Actor, {
        through: "FilmActor",
        as: "actors",
        foreignKey: "filmId",
      });
    }
  }
  Film.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      release_year: { type: DataTypes.INTEGER, allowNull: false },
      rating: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      tableName: "films",
      modelName: "Film",
    }
  );
  return Film;
};
