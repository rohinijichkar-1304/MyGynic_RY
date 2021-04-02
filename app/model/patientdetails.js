const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Patient = sequelize.define('patientdetail', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        UserId: {
            type: Sequelize.STRING,
        },
        // DoctorId:{
        //     type: Sequelize.STRING,
        // },
        PatientId: {
            type: Sequelize.STRING,
        },
        ClinicId:{
            type: Sequelize.STRING,
        },
        Name: {
            type: Sequelize.STRING,
        },
        Email:{
            type : Sequelize.STRING,
        },
        MobileNo: {
            type: Sequelize.STRING,
        },
        DOB: {
            type: Sequelize.STRING,
        },
       
        Age: {
            type: Sequelize.STRING,
        },
        Height: {
            type: Sequelize.STRING,
        },
        Weight: {
            type: Sequelize.STRING,
        },
        Address: {
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
        isPregant: {
            type: Sequelize.STRING,
        },
        LastPeriodDate: {
            type: Sequelize.STRING,
        },
        PregantDate: {
            type: Sequelize.STRING,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: '1',
            defaultValue: '1'
        },
        createdAt: {
            type : Sequelize.DATE,
        },
        updatedAt: {
            type : Sequelize.DATE,
        },
        ProfileImage: {
            type: Sequelize.STRING,
        },
        createdDate:
        {
            type: Sequelize.STRING,
        }
        
    })
    // , NewUser  = sequelize.define('register_user', {
    //     GynicId:{
    //         type: Sequelize.STRING
    //     }
    //  });
    //  Patient.belongsTo(NewUser, {foreignKey: 'GynicId'}); 
    ;
    return Patient;
}
