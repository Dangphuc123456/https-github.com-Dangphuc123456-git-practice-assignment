const { Sequelize } = require('sequelize');
require('dotenv').config();  

const sequelize = new Sequelize({
  host: process.env.DB_HOST,        
  dialect: 'mysql',                  
  username: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE, 
});

sequelize.authenticate()
  .then(() => {
    console.log('Kết nối thành công đến cơ sở dữ liệu.');
  })
  .catch(err => {
    console.error('Không thể kết nối đến cơ sở dữ liệu:', err);
  });

module.exports = sequelize;
