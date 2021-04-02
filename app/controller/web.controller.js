const db = require('../config/db.config.js');
const config = require('../config/config.js');
var generator = require('generate-password');
var randomize = require('randomatic');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Login = db.login;
const Admin = db.admin;
const Doctor = db.doctor;
const Notification = db.notification;



// API for Login
exports.AdminLogin=(req,res)=>{ 


	if (!req.body.UserId) {
		return res.status(401).json({ message: ' UserId is missing details in details. ' });
	} 
	if (!req.body.Password) {
		return res.status(401).json({ message: 'Password is missing details in details.' });
	}

	Login.findOne({ where: { UserId: req.body.UserId, Role:'Admin', } }).then(user => {
		if (!user) {

			return res.status(401).json({
				success: '404',
				message: 'Unauthorized Access'
			});
		} else {


			Login.findOne({where: { UserId: req.body.UserId }
			}).then(async user => {
				if (!user) {
					return res.status(401).json({
						success: '404',
						message: 'Unauthorized Access,Enter Correct UserID And Password'
					});
				}
				
				if (req.body.Password == user.Password) {

				const userid = user.userid;
				const jwt = require('jsonwebtoken');
				const JWTToken1 = jwt.sign({ UserId: user.UserId, id: user.id }, config.secret, {
				});
				const uid = user.id;
				console.log(uid)
				
				var Userdata =await Admin.findOne({where:{UserId: req.body.UserId}})

					res.status(200).json({

						success: '200',
						message: 'Welcome To The Application',
						token: JWTToken1,
						UserProfile:Userdata
						
					});


				
				} else {

					return res.status(401).json({
					success: '404',
					message: 'Wrong Password',

					});

				}

				
			}).catch(err => {
				res.status(500).send('Error -> ' + err);
			});


		}
	});


}



  // API for Add Doctor
  exports.AddDoctor = (req, res) => {

	
	if (!req.body.Name) {
        return res.status(401).json({ message: ' Please Enter Doctor Name. ' });
    }
	if (!req.body.Education) {
        return res.status(401).json({ message: ' Please Enter Education. ' });
    }
	if (!req.body.Experience) {
        return res.status(401).json({ message: ' Please Enter Experience. ' });
    }
    if (!req.body.MobileNo) {
        return res.status(401).json({ message: ' Please Enter Mobile No. ' });
    }
    if (!req.body.Email) {
        return res.status(401).json({ message: ' Please Enter Email Address. ' });
	}
	if (!req.body.Address) {
        return res.status(401).json({ message: ' Please Enter Address. ' });
	}
	if (!req.body.City) {
        return res.status(401).json({ message: ' Please Enter City. ' });
	}
	if (!req.body.State) {
        return res.status(401).json({ message: ' Please Enter State. ' });
	}
	if (!req.body.Pincode) {
        return res.status(401).json({ message: ' Please Enter Pincode. ' });
	}
	if (!req.body.Country) {
        return res.status(401).json({ message: ' Please Enter Country. ' });
	}
	if (!req.body.DOB) {
        return res.status(401).json({ message: ' Please Enter DOB. ' });
	}
	if (!req.body.ClinicName) {
        return res.status(401).json({ message: ' Please Enter Clinic Name. ' });
	}
	if (!req.body.ClinicAddress) {
        return res.status(401).json({ message: ' Please Enter Clinic Address. ' });
	}
	if (!req.body.ClinicGstNumber) {
        return res.status(401).json({ message: ' Please Enter Clinic GST Number. ' });
	}
	if (!req.body.ClinicRegistrationNumber) {
        return res.status(401).json({ message: ' Please Enter Clinic Registration Number. ' });
	}
	if (!req.body.StartDate) {
        return res.status(401).json({ message: ' Please Enter Clinic Start Date. ' });
	}
	if (!req.body.EndDate) {
        return res.status(401).json({ message: ' Please Enter Clinic End Date. ' });
	}
	if (!req.body.ReferedBy) {
        return res.status(401).json({ message: ' Please Enter Refered By . ' });
	}
	if (!req.body.Type) {
        return res.status(401).json({ message: ' Please Enter Type. ' });
	}

	var now = new Date();
    var date = now.toLocaleTimeString().split('T')[0];

	const EmailToValidate = req.body.Email;
	const EmailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	const mailcheck = EmailRegexp.test(EmailToValidate);
	if (!mailcheck) {
	  console.log(EmailToValidate);
	  return res.status(500).json({ message: 'Please Enter A Correct Email like abc@example.com'});
	}
	const mobileno = req.body.MobileNo;
	// const regExp = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
	const regExp =  /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    const phone = regExp.test(mobileno);
    if (!phone) {
     
      return res.status(500).json({message: ' Mobile no is not valid'});
	}
	const pin = req.body.Pincode;
    const PinregExp = /^(\d{4}|\d{6})$/;
    const pincode = PinregExp.test(pin);
    if (!pincode) {
     
      return res.status(500).json({message: 'Pincode is not valid'});
	}

	Doctor.findOne({where: {  Email:req.body.Email, MobileNo:req.body.MobileNo }
	}).then(user => {

	if(!user){

		var password = generator.generate({
			length: 5,
			numbers: true
		});
		var fistname=  req.body.Name.split(' ')[0]
		var clinicnm = req.body.ClinicName.split(' ')[0]

		Login.create({ UserId: fistname+randomize('A0',4),
						ClinicId: req.body.ClinicId,
					   Name:req.body.Name,
				       Password:password,
					   Role:'DOCTOR',
					   Email:req.body.Email,
					   MobileNo: req.body.MobileNo,

    	}).then(async(data) => {

			var user = await Doctor.create({ 		
				Name:req.body.Name,
				Education: req.body.Education,
				ClinicId: data.ClinicId,
				ClinicTime: req.body.ClinicTime,
				// AppointmentTime: req. body.AppointmentTime,
				Experience: req.body.Experience,
				MobileNo:req.body.MobileNo,
				Email:req.body.Email,
				DoctorId: data.UserId,
				Role: data.Role,
				Address: req.body.Address,
				City: req.body.City,
				State: req.body.State,
				Pincode: req.body.Pincode,
				Country: req.body.Country,
				Gender: req.body.Gender,
				DOB: req.body.DOB,
				ClinicId:data.ClinicId,
				ClinicName: req.body.ClinicName,
				ClinicAddress: req.body.ClinicAddress,
				ClinicGstNumber: req.body.ClinicGstNumber,
				ClinicRegistrationNumber: req.body.ClinicRegistrationNumber,
				StartDate: req.body.StartDate,
				EndDate: req.body.EndDate,
				ReferedBy: req.body.ReferedBy,
				Type: req.body.Type,
				ProfileImage:"http://" + req.headers.host +"/" +req.file.filename,

			 })

        	res.status(200).json({

         	    success: '200',
        	    message:'Details of doctor ' + req.body.Name +' Added Successfully',
				ProfileImage: data.ProfileImage
        	})
			Notification.create({ 
                UserId:data.DoctorId, 
				ClinicId: req.body.ClinicId,
                Description:'Details of doctor ' + req.body.Name +' Added Successfully' , 
                Notification:'Doctor Added Successfully',
                Time: date
            })
    	})

		} else { return res.status(500).json({success:'500', message: "User is already present" }); }

	})



}


  // API for Edit Doctor
  exports.EditDoctor = (req, res) => {

	if (!req.body.Name) {
        return res.status(401).json({ message: ' Please Enter Doctor Name. ' });
    }
	
	// if (!req.body.Education) {
    //     return res.status(401).json({ message: ' Please Enter Education. ' });
    // }
	// if (!req.body.Experience) {
    //     return res.status(401).json({ message: ' Please Enter Experience. ' });
    // }
    // if (!req.body.MobileNo) {
    //     return res.status(401).json({ message: ' Please Enter Mobile No. ' });
    // }
    // if (!req.body.Email) {
    //     return res.status(401).json({ message: ' Please Enter Email Address. ' });
	// }
	// if (!req.body.Address) {
    //     return res.status(401).json({ message: ' Please Enter Address. ' });
	// }
	// if (!req.body.City) {
    //     return res.status(401).json({ message: ' Please Enter City. ' });
	// }
	// if (!req.body.State) {
    //     return res.status(401).json({ message: ' Please Enter State. ' });
	// }
	// if (!req.body.Pincode) {
    //     return res.status(401).json({ message: ' Please Enter Pincode. ' });
	// }
	// if (!req.body.Country) {
    //     return res.status(401).json({ message: ' Please Enter Country. ' });
	// }
	// if (!req.body.DOB) {
    //     return res.status(401).json({ message: ' Please Enter DOB. ' });
	// }
	// if (!req.body.ClinicName) {
    //     return res.status(401).json({ message: ' Please Enter Clinic Name. ' });
	// }
	// if (!req.body.ClinicAddress) {
    //     return res.status(401).json({ message: ' Please Enter Clinic Address. ' });
	// }
	// if (!req.body.ClinicGstNumber) {
    //     return res.status(401).json({ message: ' Please Enter Clinic GST Number. ' });
	// }
	// if (!req.body.ClinicRegistrationNumber) {
    //     return res.status(401).json({ message: ' Please Enter Clinic Registration Number. ' });
	// }
	// if (!req.body.StartDate) {
    //     return res.status(401).json({ message: ' Please Enter Clinic Start Date. ' });
	// }
	// if (!req.body.EndDate) {
    //     return res.status(401).json({ message: ' Please Enter Clinic End Date. ' });
	// }
	// if (!req.body.ReferedBy) {
    //     return res.status(401).json({ message: ' Please Enter Refered By . ' });
	// }
	// if (!req.body.Type) {
    //     return res.status(401).json({ message: ' Please Enter Type. ' });
	// }

	var now = new Date();
    var date = now.toLocaleTimeString().split('T')[0];


	const EmailToValidate = req.body.Email;
	const EmailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	const mailcheck = EmailRegexp.test(EmailToValidate);
	if (!mailcheck) {
	  console.log(EmailToValidate);
	  return res.status(500).json({ message: 'Please Enter A Correct Email like abc@example.com'});
	}
	const mobileno = req.body.MobileNo;
	// const regExp = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
	const regExp =  /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    const phone = regExp.test(mobileno);
    if (!phone) {
     
      return res.status(500).json({message: ' Mobile no is not valid'});
	}
	const pin = req.body.Pincode;
    const PinregExp = /^(\d{4}|\d{6})$/;
    const pincode = PinregExp.test(pin);
    // if (!pincode) {
     
    //   return res.status(500).json({message: 'Pincode is not valid'});
	// }

	// if(req.file){
	// 	Doctor.update({ProfileImage:"http://" + req.headers.host +"/" +req.file.filename },
	// 		{ where: { DoctorId: req.body.DoctorId } })
	// }

		Login.update({ Name:req.body.Name,
					   Email:req.body.Email,
					   MobileNo:req.body.MobileNo,

    	},{ where: { id: req.body.id } }).then(async(data) => {

			var user = await Doctor.update({ 		
				Name:req.body.Name,
				Education: req.body.Education,
				ClinicTime: req.body.ClinicTime,
				// AppointmentTime: req. body.AppointmentTime,
				Experience: req.body.Experience,
				MobileNo:req.body.MobileNo,
				Email:req.body.Email,
				DoctorId: data.UserId,
				Role: data.Role,
				Address: req.body.Address,
				City: req.body.City,
				State: req.body.State,
				Pincode: req.body.Pincode,
				Country: req.body.Country,
				Gender: req.body.Gender,
				DOB: req.body.DOB,
				ClinicId:data.ClinicId,
				ClinicName: req.body.ClinicName,
				ClinicAddress: req.body.ClinicAddress,
				ClinicGstNumber: req.body.ClinicGstNumber,
				ClinicRegistrationNumber: req.body.ClinicRegistrationNumber,
				StartDate: req.body.StartDate,
				EndDate: req.body.EndDate,
				ReferedBy: req.body.ReferedBy,
				Type: req.body.Type,
				// ProfileImage:"http://" + req.headers.host +"/" +req.file.filename,

			 },{ where: { id: req.body.id } })

        	res.status(200).json({

         	    success: '200',
        	    message:'Doctor Profile Edited Successfully',
				// ProfileImage: data.ProfileImage
        	})
			// Notification.create({ 
            //     UserId:data.UserId, 
            //     Description:'Doctor '+req.body.Name+' Edited Successfully ' , 
            //     Notification:'Doctor Edited Successfully',
            //     Time: date
            // })
    	})

}




// API for Display all doctors
exports.AllDoctors = async (req, res) => {

	if (!req.body.ClinicId) {
        return res.status(401).json({ message: ' Please Enter Clinic Id. ' });
	}
		var users = await Doctor.findAll({where : { ClinicId : req.body.ClinicId}})
		return res.status(200).json({

			success: '200',
			Data: users
		});

	

}


// API for Deactivate Doctor
exports.DeactivateUser = async (req, res) => {


	Doctor.update({ IsActive: '0' },
		{ where: { id: req.body.id } }
	).then((user) => {
		res.status(200).json
			({
				success: '200',
				message: 'Deactivate Successfully..',
			});
	});

}

// API for Active Doctor
exports.ActiveUser = async (req, res) => {


	Doctor.update({ IsActive: '1' },
		{ where: { id: req.body.id } }
	).then((user) => {
		res.status(200).json
			({
				success: '200',
				message: 'Active Successfully..',
			});
	});



}



  // API for Add Site Admin
  exports.AddSiteAdmin = (req, res) => {

	
	if (!req.body.Name) {
        return res.status(401).json({ message: '  Name is missing in details. ' });
    }
    if (!req.body.MobileNo) {
        return res.status(401).json({ message: ' MobileNo is missing in details. ' });
    }
    if (!req.body.Email) {
        return res.status(401).json({ message: ' Email is missing in details. ' });
	}
	if (!req.body.UserId) {
        return res.status(401).json({ message: ' UserId is missing in details. ' });
    }
	if (!req.body.Password) {
        return res.status(401).json({ message: ' Password is missing in details. ' });
	}
	if (!req.body.HouesNo) {
        return res.status(401).json({ message: ' HouseNo is missing in details. ' });
	}
	if (!req.body.City) {
        return res.status(401).json({ message: ' City is missing in details. ' });
	}
	if (!req.body.State) {
        return res.status(401).json({ message: ' State is missing in details. ' });
	}
	if (!req.body.Pincode) {
        return res.status(401).json({ message: ' Pincode is missing in details. ' });
	}
	if (!req.body.Country) {
        return res.status(401).json({ message: ' Country is missing in details. ' });
	}
	if (!req.body.DOB) {
        return res.status(401).json({ message: ' DOB is missing in details. ' });
	}
	if (!req.body.Role) {
        return res.status(401).json({ message: ' Role is missing in details. ' });
	}
	if (!req.body.Gender) {
        return res.status(401).json({ message: ' Gender is missing in details. ' });
    }
	
	const EmailToValidate = req.body.Email;
	const EmailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	const mailcheck = EmailRegexp.test(EmailToValidate);
	if (!mailcheck) {
	  console.log(EmailToValidate);
	  return res.status(500).json({ message: 'Please Enter A Correct Email like abc@example.com'});
	}
	const mobileno = req.body.MobileNo;
	// const regExp = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
	const regExp =  /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    const phone = regExp.test(mobileno);
    if (!phone) {
     
      return res.status(500).json({message: ' mobile no is not valid'});
	}
	const pin = req.body.Pincode;
    const PinregExp = /^(\d{4}|\d{6})$/;
    const pincode = PinregExp.test(pin);
    if (!pincode) {
     
      return res.status(500).json({message: 'Pincode is not valid'});
	}

	Admin.findOne({where: {  Email:req.body.Email, MobileNo:req.body.MobileNo }
	}).then(user => {

	if(!user){

		Login.create({ UserId: req.body.UserId,
					   Name:req.body.Name,
				       Password: req.body.Password,
					   Role: req.body.Role,
					   Email:req.body.Email

    	}).then(async(data) => {

			var user = await Admin.create({ 		
				Name:req.body.Name,
				MobileNo:req.body.MobileNo,
				Email:req.body.Email,
				UserId: req.body.UserId,
				Role: req.body.Role,
				HouesNo: req.body.HouesNo,
				City: req.body.City,
				State: req.body.State,
				Pincode: req.body.Pincode,
				Country: req.body.Country,
				Gender: req.body.Gender,
				DOB: req.body.DOB
			 })
        	res.status(200).json({

         	    success: '200',
        	    message:'Site Admin Added Successfully',
        	})
    	})

		} else { return res.status(500).json({success:'500', message: "User is already present" }); }

	})



}


  // API for Edit Site Admin
  exports.EditSiteAdmin = (req, res) => {

	
	if (!req.body.id) {
        return res.status(401).json({ message: ' Id is missing in details. ' });
    }
	if (!req.body.Name) {
        return res.status(401).json({ message: ' Name is missing in details. ' });
    }
    if (!req.body.MobileNo) {
        return res.status(401).json({ message: ' MobileNo is missing in details. ' });
    }
    if (!req.body.Email) {
        return res.status(401).json({ message: ' Email is missing in details. ' });
	}
	if (!req.body.UserId) {
        return res.status(401).json({ message: ' UserId is missing in details. ' });
    }
	if (!req.body.Password) {
        return res.status(401).json({ message: ' Password is missing in details. ' });
	}
	if (!req.body.HouesNo) {
        return res.status(401).json({ message: ' HouseNo is missing in details. ' });
	}
	if (!req.body.City) {
        return res.status(401).json({ message: ' City is missing in details. ' });
	}
	if (!req.body.State) {
        return res.status(401).json({ message: ' State is missing in details. ' });
	}
	if (!req.body.Pincode) {
        return res.status(401).json({ message: ' Pincode is missing in details. ' });
	}
	if (!req.body.Country) {
        return res.status(401).json({ message: ' Country is missing in details. ' });
	}
	if (!req.body.DOB) {
        return res.status(401).json({ message: ' DOB is missing in details. ' });
	}
	if (!req.body.Role) {
        return res.status(401).json({ message: ' Role is missing in details. ' });
	}
	if (!req.body.Gender) {
        return res.status(401).json({ message: '  Gender is missing in details. ' });
    }

	const EmailToValidate = req.body.Email;
	const EmailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	const mailcheck = EmailRegexp.test(EmailToValidate);
	if (!mailcheck) {
	  console.log(EmailToValidate);
	  return res.status(500).json({ message: 'Please Enter A Correct Email like abc@example.com'});
	}
	const mobileno = req.body.MobileNo;
	// const regExp = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
	const regExp =  /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    const phone = regExp.test(mobileno);
    if (!phone) {
     
      return res.status(500).json({message: ' mobile no is not valid'});
	}
	const pin = req.body.Pincode;
    const PinregExp = /^(\d{4}|\d{6})$/;
    const pincode = PinregExp.test(pin);
    if (!pincode) {
     
      return res.status(500).json({message: 'Pincode is not valid'});
	}


		Login.update({ UserId: req.body.UserId,
					   Name:req.body.Name,
				       Password: req.body.Password,
					   Role: req.body.Role,
					   Email:req.body.Email

    	},{ where: { id: req.body.id } }).then(async(data) => {

			var user = await Admin.update({ 		
				Name:req.body.Name,
				MobileNo:req.body.MobileNo,
				Email:req.body.Email,
				UserId: req.body.UserId,
				Role: req.body.Role,
				HouesNo: req.body.HouesNo,
				City: req.body.City,
				State: req.body.State,
				Pincode: req.body.Pincode,
				Country: req.body.Country,
				Gender: req.body.Gender,
				DOB: req.body.DOB
			 },{ where: { id: req.body.id } })

        	res.status(200).json({

         	    success: '200',
        	    message:'Edited Successfully',
        	})
    	})



}




// API for Display all Site Admin
exports.SiteAdmins = async (req, res) => {


	if(req.body.Name){

		var users = await Admin.findAll({where: { Name:{[Op.like]: '%' + req.body.Name + '%'} }})
		return res.status(200).json({

			success: '200',
			Data: users
		});

	}else{

	Admin.findAll().then(user => {
		res.status(200).json({

			success: '200',
			Data: user
		});
	})

	}


}


// API for Deactivate Admin
exports.DeactivateAdmin = async (req, res) => {


	Admin.update({ IsActive: '0' },
		{ where: { id: req.body.id } }
	).then((user) => {
		res.status(200).json
			({
				success: '200',
				message: 'Deactivate Successfully..',
			});
	});

}

// API for Active Admin
exports.ActiveAdmin = async (req, res) => {


	Admin.update({ IsActive: '1' },
		{ where: { id: req.body.id } }
	).then((user) => {
		res.status(200).json
			({
				success: '200',
				message: 'Active Successfully..',
			});
	});



}
