const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Tips = sequelize.define('tips', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        DoctorId: {
            type: Sequelize.STRING,
        },
        ClinicId: {
            type: Sequelize.STRING,
        },
        Title: {
            type: Sequelize.STRING,
        },
        Discription: {
            type: Sequelize.STRING,
        },

        
    });  
    return Tips;
}
