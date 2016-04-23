
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'article',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING,
        },
        content: {
          type: Sequelize.TEXT,
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('article');
  },
};
