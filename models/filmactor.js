"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FilmActor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FilmActor.init(
    {
      filmId: {
        type: DataTypes.INTEGER,
        references: { model: "films", key: "id" },
        onDelete: "CASCADE",
        allowNull: false,
      },
      actorId: {
        type: DataTypes.INTEGER,
        references: { model: "actors", key: "id" },
        onDelete: "CASCADE",
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "film_actors",
      modelName: "FilmActor",
    }
  );
  return FilmActor;
};
