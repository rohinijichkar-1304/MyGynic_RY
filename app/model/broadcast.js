const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Broadcast = sequelize.define('broadcast', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        DoctorId: {
            type: Sequelize.STRING,
        },
        Title: {
            type: Sequelize.STRING,
        },
        Discription: {
            type: Sequelize.STRING,
        },

        
    });  
    return Broadcast;
}
