const Sequelize = require('sequelize');


// ******** AWS Database Config *****************
 
// const env = {
//     database: 'mygynic',
//     username: 'root',
//     password: 'root',
//     host_name:  "localhost",
//     dialect: 'mysql',
//     port:'3306',

//     // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
   
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
//   }; 


// ******** Local Database Config *****************

const env = {
    database: 'mygynic',
    username: 'root',
    password: '',
    host:  "0.0.0.0",
    dialect: 'mysql',
     port:'3306',
  
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  }; 

  
  module.exports = env;


  // AKIAQEQXGNRH7F6SZXNQ
  // T/LyfU7DP6zkmJvemf1n392vAkByDU73QgF46SfF
  // arn:aws:iam::009712331855:user/mygynicapp