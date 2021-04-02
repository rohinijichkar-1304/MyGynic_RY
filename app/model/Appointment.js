const sequelize = require('sequelize');
const { patientdetail } = require('../config/db.config');
const Patient = require("./patientdetails");
module.exports = (sequelize, Sequelize) => {
    const Appointment = sequelize.define('appointment', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        Title:{
            type: Sequelize.STRING,
        },
        Name:{
            type: Sequelize.STRING,
        },
        PatientId:{
            type: Sequelize.STRING,
        },
        DoctorId:{
            type: Sequelize.STRING,
        },
        ClinicId:{
            type: Sequelize.STRING,
        },
        AppointmentDate:{
            type: Sequelize.STRING,
        },
        AppointmentTime: {
            type: Sequelize.STRING,
        },
        BookedDate:{
            type: Sequelize.STRING,
        },
        AppointmentType:{
            type: Sequelize.STRING,
        },
        AppointmentChannel: {
            type: Sequelize.STRING,
        },
        AppointmentStatus: {
            type: Sequelize.STRING,
        },
        Patient_BP: {
            type: Sequelize.STRING,
        },
        Patient_Weight: {
            type: Sequelize.STRING,
        },
        Patient_LastPeriodDate: {
            type: Sequelize.STRING,
        },
        ShortNote: {
            type: Sequelize.STRING,
        },
        FollowupDate: {
            type: Sequelize.STRING,
        },
        PrescriptionURL: {
            type: Sequelize.STRING,
        },
        createdBy: {
            type: Sequelize.STRING,
        },
        updatedBy: {
            type: Sequelize.STRING,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: '1'
        },
    })
    // , Patient  = sequelize.define('patientdetails', {
    //     PatientId:{
    //         type: Sequelize.STRING
    //     }
    //  });
    //  Appointment.belongsTo(Patient, {foreignKey: 'PatientId'}); 
;
    return Appointment;
}
