
const multer = require('multer');
const doctor = require('../model/doctor.js');

module.exports = function (app) {


    const users = require('../controller/user.controller.js');
    const patient = require('../controller/patient.controller.js');
    const doctor = require('../controller/doctor.controller.js');
    const service = require('../controller/service.controller.js');
    const foster = require('../controller/foster.controller.js');
    const web = require('../controller/web.controller.js');
    const clinic = require('../controller/clinic.controller.js');


    const path = require('path');
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './public/images')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
      }
      // filename: (req, file, cb) => {
      //   console.log(file);
      //   var filetype = '';
      //   if(file.mimetype === 'image/gif') {
      //     filetype = 'gif';
      //   }
      //   if(file.mimetype === 'image/png') {
      //     filetype = 'png';
      //   }
      //   if(file.mimetype === 'image/jpeg') {
      //     filetype = 'jpg';
      //   }
      //   cb(null, 'image-' + Date.now() + '.' + filetype);
      // }
    })
    var upload = multer({ storage: storage })
    


    app.post('/api/Login', users.Login);
    app.post('/api/Forgotpassword',users.Forgotpassword)
    app.patch('/api/Resetpassword',users.Resetpassword)
    app.post('/api/RegisterUser',users.RegisterUser)
    app.get('/api/GetAllUserProfile',users.GetAllUserProfile)
    app.get('/api/ShowUserDetailUsingId/:UserId',users.ShowUserDetailUsingId)
    app.post('/api/GetAllDoctorProfile',users.GetAllDoctorProfile)
    app.post('/api/ShowDoctorDetailUsingId',users.ShowDoctorDetailUsingId)
    app.patch('/api/DeleteDoctor',users.DeleteDoctor)
    app.post('/api/GetNotification',users.GetNotification)
    app.post('/api/SeenNotification', users.SeenNotification);
    app.post('/api/NotSeenNotification', users.NotSeenNotification)
    app.post('/api/Upload', users.Upload);

    app.post('/api/AddPatient',upload.single('file'),patient.AddPatient)
    app.patch('/api/EditPatient',upload.single('file'),patient.EditPatient)
    app.post('/api/GetAllPatients',patient.GetAllPatients)
    app.post('/api/ShowPatientDetailUsingId',patient.ShowPatientDetailUsingId)
    app.patch('/api/DeletePatient',patient.DeletePatient)
    // app.post('/api/AddMattingPet',patient.AddMattingPet)

    //only for testing
    app.patch('/api/UploadImage',upload.single('file'),patient.uploadimage);


    app.post('/api/AddProducts',upload.single('myFile'),doctor.AddProducts)
    app.patch('/api/EditProducts',upload.single('myFile'),doctor.EditProducts)
    app.post('/api/GetProducts',doctor.GetProducts)
    app.post('/api/GetSlots',doctor.GetSlots)
    app.post('/api/AddAppointment',upload.single('file'),doctor.AddAppointment)
    app.patch('/api/EditAppointment',upload.single('file'),doctor.EditAppointment)
    app.patch('/api/PatientIn',doctor.PatientIn)
    app.patch('/api/SendIn',doctor.SendIn)
    app.get('/api/GetAllAppointments',doctor.GetAllAppointments)
    app.post('/api/UpcomingAppointmentforDoctor',doctor.UpcomingAppointmentforDoctor)
    app.post('/api/ShowPatientInQueue',doctor.ShowPatientInQueue)
    app.post('/api/MedicalHistory',doctor.MedicalHistory)
    app.patch('/api/DeleteAppointments',doctor.DeleteAppointments)
    //Not in used
    // app.post('/api/UpcomingAppointmentDoctor',doctor.UpcomingAppointmentDoctor)
    // app.post('/api/GetTodaysAppointment',doctor.GetTodaysAppointment)
    app.post('/api/BookAppointment',doctor.BookAppointment)
    app.post('/api/AddProductCategory',doctor.AddProductCategory)
    app.delete('/api/DeleteProduct',doctor.DeleteProduct)
    app.post('/api/AddVaccine',doctor.AddVaccine)
    app.get('/api/MattingRequest/:UserId',doctor.MattingRequest)
    app.post('/api/SearchPet',doctor.SearchPet)


    app.post('/api/AddServiceCategory',service.AddServiceCategory)
    app.post('/api/AddServices',upload.single('file'),service.AddServices)
    app.patch('/api/EditServices',upload.single('file'),service.EditServices)
    app.patch('/api/DeleteServices',service.DeleteServices)
    app.post('/api/GetAllServices',service.GetAllServices)
    app.post('/api/AddTips',service.AddTips)
    app.post('/api/GetAllTips',service.GetAllTips)
    app.delete('/api/DeleteTips',service.DeleteTips)
    app.post('/api/AddBroadcast',service.AddBroadcast)
    app.get('/api/GetAllBroadcast',service.GetAllBroadcast)
    app.delete('/api/DeleteBroadcast',service.DeleteBroadcast)
    app.post('/api/AddLoyalty',upload.single('myFile'),service.AddLoyalty)
    app.patch('/api/UpdateLoyalty',upload.single('myFile'),service.UpdateLoyalty)
    app.get('/api/GetLoyalty/:UserId',service.GetLoyalty)
    app.delete('/api/DeleteLoyalty',service.DeleteLoyalty)
    // app.post('/api/GetNotification',service.GetNotification)

    app.post('/api/AddFoster', upload.single('myFile'), foster.AddFoster);
    app.get('/api/GetFosters', foster.GetFosters);


    app.post('/api/AddClinic',upload.single('file'),clinic.AddClinic);
    app.get('/api/GetAllClinic/:UserId',clinic.GetAllClinic);
    app.patch('/api/EditClinicsDetails',clinic.EditClinicsDetails);
    app.post('/api/NewRegistrationReport',clinic.NewRegistrationReport);
    app.post('/api/CheckupAppointmentReport',clinic.CheckupAppointmentReport);
    app.post('/api/FollowupAppointmentReport',clinic.FollowupAppointmentReport);
    

    //----------------------- WEB APIs ----------------------------------

    app.post('/api/AdminLogin',web.AdminLogin)
    app.post('/api/AddDoctor',upload.single('file'),web.AddDoctor)
    app.patch('/api/EditDoctor',upload.single('file'),web.EditDoctor)
    app.post('/api/AllDoctors',web.AllDoctors)
    app.patch('/api/DeactivateUser',web.DeactivateUser);
    app.patch('/api/ActiveUser',web.ActiveUser);
    app.post('/api/AddSiteAdmin',web.AddSiteAdmin);
    app.patch('/api/EditSiteAdmin',web.EditSiteAdmin);
    app.post('/api/SiteAdmins',web.SiteAdmins);
    app.patch('/api/DeactivateAdmin',web.DeactivateAdmin);
    app.patch('/api/ActiveAdmin',web.ActiveAdmin);


}
