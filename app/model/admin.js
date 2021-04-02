const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define('admin', {
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
        Role: {
            type: Sequelize.STRING,
        },
        Email: {
            type: Sequelize.STRING,
        },
        DOB: {
            type: Sequelize.STRING,
        },
        HouesNo: {
            type: Sequelize.STRING,
        },
        City: {
            type: Sequelize.STRING,
        },
        State: {
            type: Sequelize.STRING,
        },
        Pincode: {
            type: Sequelize.STRING,
        },
        Country: {
            type: Sequelize.STRING,
        },
        Gender: {
            type: Sequelize.STRING,
        },
        MobileNo: {
            type: Sequelize.STRING,
        },
        ProfileImage: {
            type: Sequelize.STRING,
        },
        IsActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: '1'
        },


        
    });  
    return Admin;
}
