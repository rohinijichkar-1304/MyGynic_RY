const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define('service', {
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
        ServiceName: {
            type: Sequelize.STRING,
        },
        Category: {
            type: Sequelize.STRING,
        },
        Price: {
            type: Sequelize.STRING,
        },
        Discount: {
            type: Sequelize.STRING,
        },
        DiscountPrice: {
            type: Sequelize.STRING,
        },
        Description: {
            type: Sequelize.STRING,
        },
        ServiceImage: {
            type: Sequelize.STRING,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: '1',
            defaultValue: '1'
        },
        
    });  
    return Service;
}
