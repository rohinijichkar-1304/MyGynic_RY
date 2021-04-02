const db = require('../config/db.config.js');
const config = require('../config/config.js');
const sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const Op = sequelize.Op;

const Patient = db.patientdetail;
const Products = db.products;
const Slots = db.slots;
const NewUser = db.register_user;
const Doctor = db.doctor;
const Setappointment = db.setappointment;
const Appointment= db.appointment;
const Bookappointment = db.bookappointment;
const Productcategory = db.productcategory;
const Vaccine = db.vaccine;
const TodaysAppointment = db.todaysappointment;
const Notification = db.notification;


// API for Add Product 
exports.AddProducts=(req,res)=>{ 

    if (!req.body.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
    }
    if (!req.body.ProductName) {
        return res.status(401).json({ message: ' Your request ProductName is missing. ' });
    }
    if (!req.body.Category) {
        return res.status(401).json({ message: ' Your request Category is missing. ' });
    }
    if (!req.body.Price) {
        return res.status(401).json({ message: ' Your request Price is missing. ' });
    }
    if (!req.body.Description) {
        return res.status(401).json({ message: ' Your request Description is missing. ' });
    }

    var discount = req.body.Discount
    var disprice = req.body.Price - (req.body.Price * discount / 100)

    Products.create({ 
        VetId:req.body.UserId,
        ProductName:req.body.ProductName,
        Category:req.body.Category,
        Price:req.body.Price,
        Description:req.body.Description, 
        Discount:req.body.Discount, 
        DiscountPrice: disprice, 
        ProductImage:"http://" + req.headers.host +"/" +req.file.filename,


    }).then((pro) => {

        res.status(200).json({

            success: '200',
            message:'Product Added Successfully',
            productimage: pro.ProductImage
        })
    })


}




// API for Edit Product 
exports.EditProducts=(req,res)=>{ 

    if (!req.body.id) {
        return res.status(401).json({ message: ' Your request id is missing. ' });
    }
    if (!req.body.ProductName) {
        return res.status(401).json({ message: ' Your request ProductName is missing. ' });
    }
    if (!req.body.Category) {
        return res.status(401).json({ message: ' Your request Category is missing. ' });
    }
    if (!req.body.Price) {
        return res.status(401).json({ message: ' Your request Price is missing. ' });
    }
    if (!req.body.Description) {
        return res.status(401).json({ message: ' Your request Description is missing. ' });
    }

    if(req.file){
		Products.update({ProductImage:"http://" + req.headers.host +"/" +req.file.filename },
			{ where: { id: req.body.id } })
	}

    var discount = req.body.Discount
    var disprice = req.body.Price - (req.body.Price * discount / 100)

    if(req.body){

    Products.update({ 
        ProductName:req.body.ProductName,
        Category:req.body.Category,
        Price:req.body.Price,
        Description:req.body.Description, 
        Discount:req.body.Discount, 
        DiscountPrice: disprice

    },{ where: { id: req.body.id } }).then(async(pro) => {

        var prod =await Products.findOne({where:{id: req.body.id}})

        res.status(200).json({

            success: '200',
            message:'Product Edited Successfully',
            productimage: prod.ProductImage
        })
    })

    }

}



// API for Show Products 
exports.GetProducts=(req,res)=>{ 


    Products.findAll({where: { Category: req.body.Category }
    }).then(pro => {

        res.status(200).json({

            success: '200',
            message:'Product Details',
            Productdetails: pro
        })


    })

}



// API for Add Product Category 
exports.AddProductCategory=(req,res)=>{ 

    Productcategory.create({ 
        Category:req.body.Category,

    }).then((pro) => {

        res.status(200).json({

            success: '200',
            message:'Category Added Successfully',
        })
    })


}


// API for Delete Product  
exports.DeleteProduct=(req,res)=>{ 

    if (!req.body.id) {
        return res.status(401).json({ message: ' Your request id is missing. ' });
    }
    
	Products.destroy({where: {id: req.body.id}})
	.then((user) => {

		res.status(200).json({

			success: '200',
			message: 'Deleted Successfully.',

		});


	})

}




// API for Show slots 
exports.GetSlots=async(req,res)=>{ 

    if (!req.body.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
    }
    if (!req.body.Date) {
        return res.status(401).json({ message: ' Your request Date is missing. ' });
    }

    var ID=req.body.UserId
    const data = await db.sequelize.query("SELECT DoctorId FROM register_user Where UserId = $UserId ", {
        bind: { UserId: ID },
        type: QueryTypes.SELECT
      });
      

    var data1 = await Setappointment.findOne({where:{DoctorId: data[0].DoctorId, Date: req.body.Date}})

      if(data1){

          var from = data1.TimeFrom
          var to = data1.TimeTo

          var data2 = await Slots.findOne({ where: { Slots: { [Op.startsWith]: from } } })
          var data3 = await Slots.findOne({ where: { Slots: { [Op.endsWith]: to } } })

          var formid = data2.id
          var toid = data3.id

          var data4 = await Slots.findAll({ where: { id: { [Op.between]: [formid, toid] } } })
          var data04 = JSON.parse(JSON.stringify(data4))

            for (var i = 0; i < data04.length; i++) {    

                var data5 = await Bookappointment.findAll({ where: { SlotId: data04[i].id, Date: req.body.Date} })

                console.log(data5.length > 5)
                if(data5.length >= 5){
                    data04[i].status = 'Full';
                }else{
                    data04[i].status = 'Open';
                }

            }
            return res.status(200).json({

                 success: '202',
                 message:'Open',
                 slots: data04
            })

      }else{

       return res.status(404).json({

            success: '404',
            message:'Not Open yet',
        })

      }

}



// API for Book Appointment 
exports.BookAppointment=async(req,res)=>{ 

    if (!req.body.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
    }
    if (!req.body.Date) {
        return res.status(401).json({ message: ' Your request Date is missing. ' });
    }
    if (!req.body.SlotId) {
        return res.status(401).json({ message: ' Your request SlotId is missing. ' });
    }

    var Udata = await NewUser.findOne({ where: { UserId: req.body.UserId} })

    var data = await Bookappointment.findOne({ where: { UserId: req.body.UserId, Date: req.body.Date} })

    if(data){
        return res.status(401).json({ message: ' Already Booked. '});
    }else{

        Bookappointment.create({
            UserId: req.body.UserId,
            Date: req.body.Date,
            SlotId: req.body.SlotId,
            DoctorId: Udata.DoctorId,

        }).then((pro) => {

            res.status(200).json({

                success: '200',
                message: 'Appointment Booked Successfully',
            })
        })
    }


}




// API for Delete Product  
exports.DeleteAppointments=(req,res)=>{ 

    if (!req.body.id) {
        return res.status(401).json({ message: ' Please Enter a Id. ' });
    }
    
    if(req.body){

            Appointment.update({ 
                isActive: '0',
             
            },{ where: { id: req.body.id } }).then(async(user) => {
    
                var appointment =await Appointment.findOne({where:{id: req.body.id}})
    
                res.status(200).json({
    
                    success: '200',
                    message:'Appointment Deleted Successfully',
                   
                })
        })
    
        }

}



// API for Add Vaccine 
exports.AddVaccine=(req,res)=>{ 

    if (!req.body.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
    }
    if (!req.body.PetId) {
        return res.status(401).json({ message: ' Your request PetId is missing. ' });
    }
    if (!req.body.VaccineName) {
        return res.status(401).json({ message: ' Your request VaccineName is missing. ' });
    }
    if (!req.body.Discription) {
        return res.status(401).json({ message: ' Your request Discription is missing. ' });
    }
    if (!req.body.Date) {
        return res.status(401).json({ message: ' Your request Date is missing. ' });
    }

    Vaccine.create({ 
        VetId:req.body.UserId,
        VaccineName:req.body.VaccineName,
        PetId:req.body.PetId,
        Description:req.body.Description, 
        Date:req.body.Date, 

    }).then((data) => {

        res.status(200).json({

            success: '200',
            message:'Vaccine Added Successfully',
            vaccine: data
        })
    })


}



// API for Searching Pet Info 
exports.SearchPet=async(req,res)=>{ 

    if (!req.body.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
	}

        if( req.body.PetId ){

            var ById= await Petdetails.findAll({where:{PetId:{[Op.like]: '%' + req.body.PetId + '%'} }, VetId: req.body.UserId})
            return res.status(200).json({success: '200',message:'Pet details', Petdetail:ById,});


        }
        if( req.body.PetName ){

            var ByPetName= await Petdetails.findAll({where:{PetName:{[Op.like]: '%' + req.body.PetName + '%'} },VetId: req.body.UserId})
            return res.status(200).json({success: '200',message:'Pet details', Petdetail:ByPetName,});

        }
        if( req.body.OwnerName ){

            var ByOwnerName= await Petdetails.findAll({where:{OwnerName:{[Op.like]: '%' + req.body.OwnerName + '%'} },VetId: req.body.UserId})
            return res.status(200).json({success: '200',message:'Pet details', Petdetail:ByOwnerName,});

        }


}






// API for Add Appointment 
exports.AddAppointment=async(req,res)=>{ 

    if (!req.body.Title) {
        return res.status(401).json({ message: ' Title is missing in details. ' });
    }
    if (!req.body.PatientId) {
        return res.status(401).json({ message: ' Patient Id is missing in details. ' });
    }
    if (!req.body.DoctorId) {
        return res.status(401).json({ message: ' Doctor Id is missing in details. ' });
    }
    if (!req.body.ClinicId) {
        return res.status(401).json({ message: ' Clinic Id is missing in details. ' });
    }
    if (!req.body.AppointmentDate) {
        return res.status(401).json({ message: ' Appointment Date is missing in details. ' });
    }
    if (!req.body.AppointmentTime) {
        return res.status(401).json({ message: ' Appointment Time is missing in details. ' });
    }
    if (!req.body.AppointmentType) {
        return res.status(401).json({ message: ' Appointment Type is missing in details. ' });
    }
    if (!req.body.AppointmentChannel) {
        return res.status(401).json({ message: ' Appointment Channel is missing in details. ' });
    }
    if (!req.body.AppointmentStatus) {
        return res.status(401).json({ message: ' Appointment Status is missing in details. ' });
    }
    if (!req.body.Patient_BP) {
        return res.status(401).json({ message: ' Patient BP is missing in details. ' });
    }
    if (!req.body.Patient_Weight) {
        return res.status(401).json({ message: ' Patient Weight is missing in details. ' });
    }
    // if (!req.body.Patient_LastPeriodDate) {
    //     return res.status(401).json({ message: ' Last Period Date is missing in details. ' });
    // }
    // if (!req.body.ShortNote) {
    //     return res.status(401).json({ message: ' Short Note is missing in details. ' });
    // }
    // if (!req.body.FollowupDate) {
    //     return res.status(401).json({ message: ' FollowupDate is missing in details. ' });
    // }
    // if (!req.body.PrescriptionURL) {
    //     return res.status(401).json({ message: ' Prescription URL is missing in details. ' });
    // }
    // if (!req.body.createdBy) {
    //     return res.status(401).json({ message: ' created By is missing in details. ' });
    // }
    // if (!req.body.updatedBy) {
    //     return res.status(401).json({ message: ' updated By is missing in details. ' });
    // }
    if (!req.body.Name) {
        return res.status(401).json({ message: ' Name is missing in details. ' });
    }
    
    
    var now = new Date();
    var date = now.toLocaleTimeString().split('T')[0];

    var patient = await Patient.findOne({ where: { 
        PatientId: req.body.PatientId, 
        Name: req.body.Name,
        // ProfileImage:"http://" + req.headers.host +"/" +req.file.filename
    } })

    var data = await Appointment.findOne({ where: { PatientId: req.body.PatientId, AppointmentDate: req.body.AppointmentDate, AppointmentTime: req.body.AppointmentTime} })

    if(data){
        return res.status(401).json({ message: ' Already Booked. '});
    }else{

        Appointment.create({
            Title: req.body.Title,
            PatientId: req.body.PatientId,
            Name : req.body.Name,
            DoctorId: req.body.DoctorId,
            ClinicId: req.body.ClinicId,
            AppointmentDate: req.body.AppointmentDate,
            BookedDate: req.body.BookedDate,
            AppointmentTime: req.body.AppointmentTime,
            AppointmentType: req.body.AppointmentType,
            AppointmentChannel: req.body.AppointmentChannel,
            AppointmentStatus: req.body.AppointmentStatus,
            Patient_BP: req.body.Patient_BP,
            Patient_Weight: req.body.Patient_Weight,
            Patient_LastPeriodDate: req.body.Patient_LastPeriodDate,
            ShortNote: req.body.ShortNote,
            FollowupDate: req.body.FollowupDate,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            // ProfileImage:"http://" + req.headers.host +"/" +req.file.filename,
            // PrescriptionURL:"http://" + req.headers.host +"/" +req.file.filename
        }).then((data) => {

            res.status(200).json({

                success: '200',
                message: 'Appointment of '+ req.body.Name + ' has Booked Successfully',
                // PrescriptionURL: data.PrescriptionURL,
                // ProfileImage: data.ProfileImage
            })
            Notification.create({ 
                UserId:data.PatientId, 
                Description:'Appointment of '+ req.body.Name + ' has Booked ' , 
                Notification:'Appointment of ' + req.body.Name + ' has booked Successfully',
                Time: date
            })
        })
    }


}








// API for Edit Appointment
exports.EditAppointment = (req, res) => {

    // if (!req.body.PrescriptionURL) {
    //     return res.status(401).json({ message: ' Prescription is missing in details. ' });
    // }

    if(req.file){
		Appointment.update({PrescriptionURL:"http://" + req.headers.host +"/" +req.file.fileName },
			{ where: { id: req.body.id } })
	}
    
    var now = new Date();
    var date = now.toLocaleTimeString().split('T')[0];
	
			var user = Appointment.update({ 		
			Title: req.body.Title,
            PatientId: req.body.PatientId,
            Name : req.body.Name,
            DoctorId: req.body.DoctorId,
            ClinicId: req.body.ClinicId,
            AppointmentDate: req.body.AppointmentDate,
            BookedDate: req.body.BookedDate,
            AppointmentTime: req.body.AppointmentTime,
            AppointmentType: req.body.AppointmentType,
            AppointmentChannel: req.body.AppointmentChannel,
            AppointmentStatus: req.body.AppointmentStatus,
            Patient_BP: req.body.Patient_BP,
            Patient_Weight: req.body.Patient_Weight,
            Patient_LastPeriodDate: req.body.Patient_LastPeriodDate,
            ShortNote: req.body.ShortNote,
            FollowupDate: req.body.FollowupDate,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            PrescriptionURL:"http://" + req.headers.host +"/" +req.file.fileName,

			 },{ where: { id: req.body.id } }).then(async(data) => {


        	res.status(200).json({

         	    success: '200',
        	    message:'Appointment Status of ' + req.body.Name + ' has been Changed to '+req.body.AppointmentStatus,
                PrescriptionURL: data.PrescriptionURL
        	})
            Notification.create({ 
                UserId:req.body.PatientId, 
                ClinicId: req.body.ClinicId,
                Description:'Appointment Status of ' + req.body.Name + ' has been Changed to '+req.body.AppointmentStatus , 
                Notification:'Appointment Status of ' + req.body.Name + ' has been Changed to '+req.body.AppointmentStatus ,
                Time: date
            })
             })

}


// API for Edit Patient In
exports.PatientIn = (req, res) => {

    
    var now = new Date();
    var date = now.toLocaleTimeString().split('T')[0];
	
    Appointment.findOne({where: { id:req.body.id ,AppointmentStatus : "Completed" }
	}).then(user => {
        if(!user){

			var user = Appointment.update({ 		
            PatientId: req.body.PatientId,
            Name : req.body.Name,
            DoctorId: req.body.DoctorId,
            AppointmentStatus: req.body.AppointmentStatus,
            Patient_BP: req.body.Patient_BP,
            Patient_Weight: req.body.Patient_Weight,
            Patient_LastPeriodDate: req.body.Patient_LastPeriodDate,
            ShortNote: req.body.ShortNote,
            
			 },{ where: { id: req.body.id } }).then(async(data) => {


        	res.status(200).json({

         	    success: '200',
        	    message:'Appointment Status of '+req.body.Name+' has been Changed to '+req.body.AppointmentStatus
        	})
            Notification.create({ 
                UserId:req.body.PatientId, 
                ClinicId: req.body.ClinicId,
                Description:'Appointment Status of '+req.body.Name+' has been Changed to '+req.body.AppointmentStatus , 
                Notification:'Patient In',
                Time: date
            })
             })
            } else { return res.status(500).json({success:'500', message: "Appointment is already completed" }); }
    
        })

}



// API for Edit Patient Send In
exports.SendIn = (req, res) => {

    
    var now = new Date();
    var date = now.toLocaleTimeString().split('T')[0];
	
			var user = Appointment.update({ 		
            PatientId: req.body.PatientId,
            Name : req.body.Name,
            // DoctorId: req.body.DoctorId,
            // AppointmentStatus: req.body.AppointmentStatus,
            // Patient_BP: req.body.Patient_BP,
            // Patient_Weight: req.body.Patient_Weight,
            // Patient_LastPeriodDate: req.body.Patient_LastPeriodDate,
            ShortNote: req.body.ShortNote,
            
			 },{ where: { id: req.body.id } }).then(async(data) => {


        	res.status(200).json({

         	    success: '200',
        	    message:'Appointment Status of '+req.body.Name+' has been Changed to '+req.body.AppointmentStatus
        	})
            Notification.create({ 
                UserId:req.body.PatientId, 
                ClinicId:req.body.ClinicId,
                Description:'Appointment Status of '+req.body.Name+' has been Changed to '+req.body.AppointmentStatus , 
                Notification:'Send In',
                Time: date
            })
             })

}





// API for Show all Appointments
exports.GetAllAppointments=(req,res)=>{ 

    if (!req.body.ClinicId) {
        return res.status(401).json({ message: ' Clinic Id is missing in details. ' });
	}
	
    Appointment.findAll({where : { DoctorId: req.body.DoctorId}}).then(data => {

        res.status(200).json({

            success: '200',
            message:'All Appointments Details',
            Appointment: data
        })

    })

}







// // API for Upcoming Appointment for Doctor 
// exports.UpcomingAppointmentforDoctor=(req,res)=>{ 

//     var now = new Date();
//     var date = now.toISOString().split('T')[0];
//     console.log(date)



//     Appointment.findAll({where: { DoctorId: req.body.DoctorId, AppointmentDate: date }
//     }).then(async appoint => {

//         var Appoint = JSON.parse(JSON.stringify(appoint))

//         for (var i = 0; i < Appoint.length; i++) {    

//             var appointment = await Patient.findAll({ where: { PatientId: Appoint[i].PatientId } })
//             var app = JSON.parse(JSON.stringify(appointment))

//             for (var j = 0; j < app.length; j++) {

//                 if (Appoint[i].PatientId == app[j].PatientId) {

                    // Appoint[i].Name = app[j].Name;
                    // Appoint[i].Email = app[j].Email;
                    // Appoint[i].MobileNo = app[j].MobileNo;
                    // Appoint[i].DOB = app[j].DOB;
                    // Appoint[i].Age = app[j].Age;
                    // Appoint[i].Height = app[j].Height;
                    // Appoint[i].Weight = app[j].Weight;
                    // Appoint[i].Address = app[j].Address;
                    // Appoint[i].City = app[j].City;
                    // Appoint[i].State = app[j].State;
                    // Appoint[i].Pincode = app[j].Pincode;
                    // Appoint[i].Country = app[j].Country;
                    // Appoint[i].isPregant = app[j].isPregant;
                    // Appoint[i].LastPeriodDate = app[j].LastPeriodDate;
                    // Appoint[i].PregantDate = app[j].PregantDate;
                    // Appoint[i].ProfileImage = app[j].ProfileImage;


//                 }
//             }

//         }
//         res.status(200).json({

//             success: '200',
//             message:'Upcoming Appointments',
//             Appointment: Appoint
//         })

//     })

// }



// API for Upcoming Appointment for Doctor 
exports.UpcomingAppointmentforDoctor=(req,res)=>{ 

    var now = new Date();
    var date = now.toISOString().split('T')[0];
    console.log(date)

    Appointment.findAll({where: { DoctorId : req.body.DoctorId, AppointmentDate : date }, order: [ ['id', 'DESC']]
    }).then(async appoint => {

        var Appoint = JSON.parse(JSON.stringify(appoint))

        for (var i = 0; i < Appoint.length; i++) {    

            var Appointment = await Patient.findAll({ where: { PatientId: Appoint[i].PatientId } })
            var app = JSON.parse(JSON.stringify(Appointment))

            for (var j = 0; j < app.length; j++) {

                if (Appoint[i].PatientId == app[j].PatientId) {

                    Appoint[i].Name = app[j].Name;
                    Appoint[i].Email = app[j].Email;
                    Appoint[i].MobileNo = app[j].MobileNo;
                    Appoint[i].DOB = app[j].DOB;
                    Appoint[i].Age = app[j].Age;
                    Appoint[i].Height = app[j].Height;
                    Appoint[i].Weight = app[j].Weight;
                    Appoint[i].Address = app[j].Address;
                    Appoint[i].City = app[j].City;
                    Appoint[i].State = app[j].State;
                    Appoint[i].Pincode = app[j].Pincode;
                    Appoint[i].Country = app[j].Country;
                    Appoint[i].isPregant = app[j].isPregant;
                    Appoint[i].LastPeriodDate = app[j].LastPeriodDate;
                    Appoint[i].PregantDate = app[j].PregantDate;
                    Appoint[i].ProfileImage = app[j].ProfileImage;


                }
            }

        }
        res.status(200).json({

            success: '200',
            message:'Upcoming Appointments',
            Appointment: Appoint
        })


    })


}



// API for Upcoming Appointment for Doctor 
exports.ShowPatientInQueue=(req,res)=>{ 

    var now = new Date();
    var date = now.toISOString().split('T')[0];
    console.log(date)

    Appointment.findAll({where: { DoctorId: req.body.DoctorId, AppointmentDate: date, AppointmentStatus:"Patient In" }
    }).then(async appoint => {

        var Appoint = JSON.parse(JSON.stringify(appoint))

        for (var i = 0; i < Appoint.length; i++) {    

            var Appointment = await Patient.findAll({ where: { PatientId: Appoint[i].PatientId } })
            var app = JSON.parse(JSON.stringify(Appointment))

            for (var j = 0; j < app.length; j++) {

                if (Appoint[i].PatientId == app[j].PatientId) {

                    Appoint[i].Name = app[j].Name;
                    Appoint[i].Email = app[j].Email;
                    Appoint[i].MobileNo = app[j].MobileNo;
                    Appoint[i].DOB = app[j].DOB;
                    Appoint[i].Age = app[j].Age;
                    Appoint[i].Height = app[j].Height;
                    Appoint[i].Weight = app[j].Weight;
                    Appoint[i].Address = app[j].Address;
                    Appoint[i].City = app[j].City;
                    Appoint[i].State = app[j].State;
                    Appoint[i].Pincode = app[j].Pincode;
                    Appoint[i].Country = app[j].Country;
                    Appoint[i].isPregant = app[j].isPregant;
                    Appoint[i].LastPeriodDate = app[j].LastPeriodDate;
                    Appoint[i].PregantDate = app[j].PregantDate;
                    Appoint[i].ProfileImage = app[j].ProfileImage;


                }
            }

        }
        res.status(200).json({

            success: '200',
            message:'Patient In Queue',
            Appointment: Appoint
        })

    })


}

// API for Show all Appointments
exports.MedicalHistory=(req,res)=>{ 

    
    if (!req.body.PatientId) {
        return res.status(401).json({ message: ' Patient Id is missing in details. ' });
	}
	
    Appointment.findAll({ where: { PatientId: req.body.PatientId, AppointmentStatus: "Completed" } }).then(data => {

        res.status(200).json({

            success: '200',
            message:'Medical History',
            Appointment: data
        })

    })

}




// Correct Apis but not in used

//  //API for Upcoming Appointment for Doctor 
// exports.UpcomingAppointmentDoctor=(req,res)=>{ 

//     var now = new Date();
//     var date = now.toISOString().split('T')[0];

//     console.log(date)

//     Patient.hasMany(Appointment, {foreignKey: 'PatientId'})
//     Appointment.belongsTo(Patient, {foreignKey: 'PatientId'})


//     const users =  db.sequelize.query("SELECT * FROM appointments INNER JOIN patientdetails ON appointments.PatientId = patientdetails.PatientId", 
//     { type: QueryTypes.SELECT }).then(results => {
//         res.status(200).json({

//             success: '200',
//             message:'Upcoming Appointments',
//             Appointment: results
//         })
//      });
   
// }



// // API for Get Todays Appointment Details with Patient Details
// exports.GetTodaysAppointment=(req,res)=>{ 

//     var now = new Date();
//     var date = now.toISOString().split('T')[0];

//     console.log(date)
//     TodaysAppointment.findAll({where: { DoctorId: req.body.UserId, AppointmentDate: date }
//     }).then(data => {

//         res.status(200).json({

//             success: '200',
//             message:'Todays Appointments',
//             TodaysAppointment: data
//         })

//     })

// }
