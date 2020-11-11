const Sequelize = require('sequelize')
const db = require('../db')

// READ ME: defining category model

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue:
      'https://i.etsystatic.com/12037351/r/il/b50db7/1906584793/il_794xN.1906584793_c4zm.jpg'
  }
})

module.exports = Category
