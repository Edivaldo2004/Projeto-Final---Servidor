'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('produtos', [{
  	nome: "Mackbook pro",
   imagem:"https://imgs.casasbahia.com.br/55048282/1g.jpg",
	descri: "Projetado para o local de trabalho moderno, o Lenovo V15 2a geração (15” Intel) é um notebook que sempre acerta. Adequado para produtividade móvel, oferece ótimo desempenho no escritório ou em casa. ",
	preco: 3.299
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
