'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      { nome: 'John Doe', senha: '123', usuario: "John Doe" },
      { nome: 'Picolo', senha: '123', usuario: "Picolo" },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
