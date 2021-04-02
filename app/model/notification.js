const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define('notification', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        UserId: {
            type: Sequelize.STRING,
        },
        ClinicId: {
            type: Sequelize.STRING,
        },
        Notification: {
            type: Sequelize.STRING,
        },
        Description: {
            type: Sequelize.STRING,
        },
        Time: {
            type: Sequelize.STRING,
        },
        SeenStatus: {
            type: Sequelize.BOOLEAN,
            defaultValue: '0'
        },
        // NotificationImage:{
        //     type: Sequelize.STRING,
        // },

        
    });  
    return Notification;
}
