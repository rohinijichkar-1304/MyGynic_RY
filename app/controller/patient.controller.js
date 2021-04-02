const db = require('../config/db.config.js');
const config = require('../config/config.js');
var generator = require('generate-password');
const Sequelize = require('sequelize');
var randomize = require('randomatic');
const Op = Sequelize.Op;

const { register_user } = require('../config/db.config.js');


const PatientDetails = db.patientdetail;
const Login = db.login;
const Notification = db.notification;
const Appointment= db.appointment;


// API for Add patient 
exports.AddPatient=async(req,res)=>{ 

    if (!req.body.Name) {
        return res.status(401).json({ message: ' Please Enter a Patient Name. ' });
    }
    // if (!req.body.Age) {
    //     return res.status(401).json({ message: ' Please Enter a Patient Age. ' });
    // }
    if (!req.body.MobileNo) {
        return res.status(401).json({ message: ' Please Enter a Patient Mobile Number. ' });
    }
    // if (!req.body.Height) {
    //     return res.status(401).json({ message: ' Please Enter a Patient Height. ' });
    // }
    // if (!req.body.Weight) {
    //     return res.status(401).json({ message: ' Please Enter a Patient Weight. ' });
    // }
    // if (!req.body.DOB) {
    //     return res.status(401).json({ message: ' Please Enter a Patient DOB. ' });
    // }
    // if (!req.body.Address) {
    //     return res.status(401).json({ message: ' Please Enter a Patient Address. ' });
    // }
    // if (!req.body.City) {
    //     return res.status(401).json({ message: ' Please Enter a City. ' });
    // }
    // if (!req.body.State) {
    //     return res.status(401).json({ message: ' Please Enter a State. ' });
    // }
    // if (!req.body.Pincode) {
    //     return res.status(401).json({ message: ' Please Enter a Pincode. ' });
    // }
    // if (!req.body.Country) {
    //     return res.status(401).json({ message: ' Please Enter a Country. ' });
    // }
    if (!req.body.ClinicId) {
        return res.status(401).json({ message: ' Please Enter a Clinic Id. ' });
    }
    // if (!req.body.isPregant) {
    //     return res.status(401).json({ message: ' Please Enter a Patient is Pregant or Not. ' });
    // }
    // if (!req.body.LastPeriodDate) {
    //     return res.status(401).json({ message: ' Please Enter a Last Period Date. ' });
    // }
    
    var now = new Date();
    var date = now.toLocaleTimeString().split('T')[0];

    

    const mobileno = req.body.MobileNo;
	const regExp =  /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    const phone = regExp.test(mobileno);
    if (!phone) {
     
      return res.status(500).json({message: 'Mobile no is not valid'});
    }
    

    PatientDetails.findOne({where: { MobileNo:req.body.MobileNo }
	}).then(user => {
        if(!user){

            var password = generator.generate({
                length: 5,
                numbers: true
            });
            var fistname=  req.body.Name.split(' ')[0]
              
            Login.create({ 
                          
                           UserId: fistname+randomize('A0',4),
                           ClinicId:req.body.ClinicId,
                          Name:req.body.Name,
                          Password:password,
                          Role:'PATIENT',
                          Email:req.body.Email,
                          MobileNo: req.body.MobileNo,
                            
                        
            }).then(async(data) => {
    
                var user = await PatientDetails.create({ 	
                    PatientId: fistname+randomize('A0',4),
                    UserId:data.UserId,
                    // DoctorId: data.DoctorId,
                    Email: data.Email,
                    ClinicId:data.ClinicId,
                    Name:req.body.Name, 
                    Age: req.body.Age,
                    // DOB:req.body.DOB,
                    MobileNo:req.body.MobileNo,
                    Address:req.body.Address,
                    City:req.body.City,
                    State:req.body.State,
                    Pincode:req.body.Pincode,
                    Country:req.body.Country,
                    Height:req.body.Height,
                    Weight:req.body.Weight,
                    isPregant: req.body.isPregant,
                    LastPeriodDate: req.body.LastPeriodDate,
                    PregantDate: req.body.PregantDate,
                    createdDate : req.body.createdDate,
                    // ProfileImage:"http://" + req.headers.host +"/" +req.file.filename,	
                 })
    
                res.status(200).json({
    
                     success: '200',
                    message:'Patient '+data.Name+' is Added Successfully ',
                    // ProfileImage: data.ProfileImage
                })
                Notification.create({ 
                    UserId:register_user.UserId, 
                    ClinicId: register_user.ClinicId,
                    Description:'Patient '+data.Name+' is Added Successfully ' , 
                    Notification:'Patient Added Successfully',
                    Time: date
                })
            })
    
            } else { return res.status(500).json({success:'500', message: "User is already present" }); }
    
        })
    

}



// API for Edit Patients 
exports.EditPatient=(req,res)=>{ 

    // if (!req.body.Name) {
    //     return res.status(401).json({ message: ' Please Enter a Patient Name. ' });
    // }
    // if (!req.body.Age) {
    //     return res.status(401).json({ message: ' Please Enter a Patient Age. ' });
    // }
    // if (!req.body.MobileNo) {
    //     return res.status(401).json({ message: ' Please Enter a Patient Mobile Number. ' });
    // }
    // if (!req.body.Height) {
    //     return res.status(401).json({ message: ' Please Enter a Patient Height. ' });
    // }
    // if (!req.body.Weight) {
    //     return res.status(401).json({ message: ' Please Enter a Patient Weight. ' });
    // }
    // // if (!req.body.DOB) {
    // //     return res.status(401).json({ message: ' Please Enter a Patient DOB. ' });
    // // }
    // if (!req.body.Address) {
    //     return res.status(401).json({ message: ' Please Enter a Patient Address. ' });
    // }
    // if (!req.body.City) {
    //     return res.status(401).json({ message: ' Please Enter a City. ' });
    // }
    // if (!req.body.State) {
    //     return res.status(401).json({ message: ' Please Enter a State. ' });
    // }
    // if (!req.body.Pincode) {
    //     return res.status(401).json({ message: ' Please Enter a Pincode. ' });
    // }
    // if (!req.body.Country) {
    //     return res.status(401).json({ message: ' Please Enter a Country. ' });
    // }
    // if (!req.body.ClinicId) {
    //     return res.status(401).json({ message: ' Please Enter a Clinic Id. ' });
    // }
    // if (!req.body.isPregant) {
    //     return res.status(401).json({ message: ' Please Enter a Patient is Pregant or Not. ' });
    // }
    // if (!req.body.LastPeriodDate) {
    //     return res.status(401).json({ message: ' Please Enter a Last Period Date. ' });
    // }
    


    const mobileno = req.body.OwnerContact;
	const regExp =  /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    const phone = regExp.test(mobileno);
    if (!phone) {
     
      return res.status(500).json({message: 'Owner mobile no is not valid'});
    }


    if(req.file){
		PatientDetails.update({ProfileImage:"http://" + req.headers.host +"/" +req.file.filename },
			{ where: { id: req.body.id } })
	}

    
	if(req.body){
        Login.update({ 
                          
           Name:req.body.Name,
           Email:req.body.Email,
           MobileNo: req.body.MobileNo,        
           }).then(async(data) => {


             PatientDetails.update({ 
                    UserId:data.UserId,
                    // DoctorId: data.DoctorId,
                    Email: data.Email,
                    ClinicId:data.ClinicId,
                    Name:req.body.Name, 
                    Age: req.body.Age,
                    DOB:req.body.DOB,
                    MobileNo:req.body.MobileNo,
                    Address:req.body.Address,
                    City:req.body.City,
                    State:req.body.State,
                    Pincode:req.body.Pincode,
                    Country:req.body.Country,
                    Height:req.body.Height,
                    Weight:req.body.Weight,
                    isPregant: req.body.isPregant,
                    LastPeriodDate: req.body.LastPeriodDate,
                    PregantDate: req.body.PregantDate,
                    ProfileImage:"http://" + req.headers.host +"/" +req.file.filename,
					  


        },{ where: { id: req.body.id } }).then(async(user) => {

            var register_user =await PatientDetails.findOne({where:{id: req.body.id}})

			res.status(200).json({

				success: '200',
                message: "Details of " + data.Name + " has been Edited Successfully " ,
                ProfileImage: user.ProfileImage
            })
        })
    })
    }

}


// API for Show all patients
exports.GetAllPatients=(req,res)=>{ 


    PatientDetails.findAll({where :{ClinicId: req.body.ClinicId },  order: [ ['id', 'DESC']] 
        }).then(user => {

        res.status(200).json({

            success: '200',
            message:'Patients Details',
            PatientDetails: user
        })

    })

}


// API for Show Perticular Patient details 
exports.ShowPatientDetailUsingId=(req,res)=>{ 

    PatientDetails.findOne({where: { UserId: req.body.UserId }
    }).then(user => {

        res.status(200).json({

            success: '200',
            message:'Patient Details',
            PatientDetails: user
        })


    })


}


// API for Delete Patients details
exports.DeletePatient=(req,res)=>{ 


    if (!req.body.id) {
        return res.status(401).json({ message: ' Please Enter a Id. ' });
    }
    
    var now = new Date();
    var date = now.toLocaleTimeString().split('T')[0];

    if(req.body){

            PatientDetails.update({ 
                isActive: '0',
             
            },{ where: { id: req.body.id } }).then(async(user) => {
    
                var register_user =await PatientDetails.findOne({where:{id: req.body.id}})
    
                res.status(200).json({
    
                    success: '200',
                    message:'Record of '+req.body.Name+' has been deleted ',
                   
                })
                Notification.create({ 
                    UserId:data.id, 
                    ClinicId: req.body.ClinicId,
                    Description:'Record of '+req.body.Name+' has been deleted ', 
                    Notification:'Patient deleted Successfully',
                    Time: date
                })
        })
    
        }

}



// Only for testing 
exports.uploadimage = (req, res) => {


	Appointment.update({PrescriptionURL:"http://" + req.headers.host +"/" +req.file.filename},
			{ where: { id: req.body.id } })
			.then((user) => {

				res.status(200).json({
	
					success: '200',
					message:'Image Updated Successfully.',
				
				});
			})  

}



