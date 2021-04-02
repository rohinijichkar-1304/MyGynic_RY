const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const TodaysAppointment = sequelize.define('todaysappointment', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        Title:{
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
    });
    return TodaysAppointment;
}
