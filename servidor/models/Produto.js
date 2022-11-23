'use strict';

const {

  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class produto extends Model {
    static associate(models) {
    }
  }
  produto.init({

    nome: DataTypes.STRING,

    imagem: DataTypes.STRING,

    descri: DataTypes.STRING,

    preco: DataTypes.STRING,

  }, {

    sequelize,
    modelName: 'produto',

  });
  
  return produto;
};