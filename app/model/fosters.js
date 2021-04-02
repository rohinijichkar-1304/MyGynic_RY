const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Foster = sequelize.define('foster', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        VetId: {
            type: Sequelize.STRING,
        },
        Name: {
            type: Sequelize.STRING,
        },
        Email: {
            type: Sequelize.STRING,
        },
        Phone: {
            type: Sequelize.STRING,
        },
        Address: {
            type: Sequelize.STRING,
        },
        Time: {
            type: Sequelize.STRING,
        },
        Image: {
            type: Sequelize.STRING,
        },
    });  
    return Foster;
}
