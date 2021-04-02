const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Login = sequelize.define('login', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Email: {
            type: Sequelize.STRING,
        },
        UserId: {
            type: Sequelize.STRING,
        },
        ClinicId:{
            type: Sequelize.STRING,
        },
        Name: {
            type: Sequelize.STRING,
        },
        MobileNo: {
            type: Sequelize.STRING,
        },
        Role: {
            type: Sequelize.STRING,
        },
        Password: {
            type: Sequelize.STRING,
        },
        IsActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: '1'
        },
        LastLogin: {
            type: Sequelize.STRING,
        }
        
    });  
    return Login;
}
