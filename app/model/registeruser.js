const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const NewUser = sequelize.define('register_user', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING,
        },
        UserId: {
            type: Sequelize.STRING,
        },
        ClinicId:{
            type: Sequelize.STRING,
        },
        Role: {
            type: Sequelize.STRING,
        },
        Email: {
            type: Sequelize.STRING,
        },
        Address: {
            type: Sequelize.STRING,
        },
        Gender: {
            type: Sequelize.STRING,
        },
        MobileNo: {
            type: Sequelize.STRING,
        },
        NotificationStatus: {
            type: Sequelize.STRING,
            defaultValue: 'true'
        },
        ProfileImage: {
            type: Sequelize.STRING,
        },
       
   
    });  
    return NewUser;
}
