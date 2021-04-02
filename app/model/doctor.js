const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Doctor = sequelize.define('doctor', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING,
        },
        DoctorId: {
            type: Sequelize.STRING,
        },
        ClinicId:{
            type: Sequelize.STRING,
        },
        HeadDoctor: {
            type: Sequelize.BOOLEAN,
        },
        Role:{
            type: Sequelize.STRING,
        },
        Education: {
            type: Sequelize.STRING,
        },
        Email: {
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
        Gender: {
            type: Sequelize.STRING,
        },
        MobileNo: {
            type: Sequelize.STRING,
        },
        DOB: {
            type: Sequelize.STRING,
        },
        Experience: {
            type: Sequelize.STRING,
        },
        ProfileImage: {
            type: Sequelize.STRING,
        },
       
        ClinicName: {
            type: Sequelize.STRING,
        },
        ClinicAddress: {
            type: Sequelize.STRING,
        },
        ClinicGstNumber: {
            type: Sequelize.STRING,
        },
        ClinicRegistrationNumber: {
            type: Sequelize.STRING,
        },
        ClinicTime: {
            type: Sequelize.STRING,
        },
        // AppointmentTime: {
        //     type: Sequelize.STRING,
        // },
        StartDate: {
            type: Sequelize.STRING,
        },
        EndDate: {
            type: Sequelize.STRING,
        },
        Type: {
            type: Sequelize.STRING,
        },
        ReferedBy: {
            type: Sequelize.STRING,
        },
        IsActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: '1'
        },
       

    });
    //  Clinic  = sequelize.define('Clinic', {
        //  ClinicId:{
        //      type: Sequelize.STRING,
        //  }
    //  });
    //  Doctor.belongsTo(Clinic, {foreignKey: 'ClinicId'}); 
    return Doctor;
}
