const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Clinic = sequelize.define('clinic', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        ClinicName: {
            type: Sequelize.STRING,
        },
        ClinicId: {
            type: Sequelize.STRING,
        },
        ClinicEmail: {
            type: Sequelize.STRING,
        },
        ClinicAddress: {
            type: Sequelize.STRING,
        },
        ClinicCity: {
            type: Sequelize.STRING,
        },
        ClinicState: {
            type: Sequelize.STRING,
        },
        ClinicPincode: {
            type: Sequelize.STRING,
        },
        ClinicCountry: {
            type: Sequelize.STRING,
        },
        ClinicGstNumber: {
            type: Sequelize.STRING,
        },
        ClinicRegistrationNumber: {
            type: Sequelize.STRING,
        },
        ClinicStartTime: {
            type: Sequelize.STRING,
        },
        ClinicEndTime: {
            type: Sequelize.STRING,
        },
        NoOfStaff: {
            type: Sequelize.STRING,
        },
        IsActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: '1'
        },


        
    });
    return Clinic;
}
