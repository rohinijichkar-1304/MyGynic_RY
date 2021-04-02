const db = require('../config/db.config.js');
const config = require('../config/config.js');

const nodeMailer = require('nodemailer');
var generator = require('generate-password');
var randomize = require('randomatic');
const login = require('../model/login.js');

const Login = db.login;
const NewUser = db.register_user;
const Doctor = db.doctor;
const Notification = db.notification;

const fs = require('fs')
const path = require('path');
const Appointment= db.appointment;


// API for Login
exports.Login=(req,res)=>{ 
	// if (!req.body.Role) {
	// 	return res.status(401).json({ message: ' Please Enter a User Role. ' });
	// } 

	if (!req.body.MobileNo) {
		return res.status(401).json({ message: ' Please Enter a Mobile No. ' });
	} 
	if (!req.body.Password) {
		return res.status(401).json({ message: 'Please Enter a Password.' });
	}



	// const mobileno = req.body.MobileNo;
	// const regExp =  /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    // const phone = regExp.test(mobileno);
    // if (!phone) {
     
    //   return res.status(500).json({message: 'Mobile no is not valid'});
    // }

	Login.findOne({ where: { MobileNo: req.body.MobileNo } }).then(user => {
		if (!user) {

			return res.status(401).json({
				success: '404',
				message: 'Unauthorized Access'
			});
		} else {

			
			Login.findOne({where: { MobileNo: req.body.MobileNo }
			}).then(user => {
				if (!user) {
					
					return res.status(401).json({
						success: '404',
						message: 'Unauthorized Access,Enter Correct UserID And Password'
					});
					

				}
				
				if (req.body.Password == user.Password) {

				const userid = user.userid;
				const mobile = user.MobileNo;
				const jwt = require('jsonwebtoken');
				const JWTToken1 = jwt.sign({ userid: user.UserId, id: user.id }, config.secret, {
				});
				const uid = user.id;
				console.log(uid)
				console.log("save")
				
				// const jwttokon = new JWTToken({
				// 	UserId: uid,
				// 	Status: true,
				// 	Token: JWTToken1,

				// });
				
				// jwttokon.save().then(function (result) {
					res.status(200).json({

						success: '200',
						message: 'Welcome To The Application',
						id: uid,
						token: JWTToken1,
						userid:user.UserId,
						mobile: user.MobileNo,
						name:user.Name,
						// Role: user.Role,
						ClinicId: user.ClinicId,
						// LastLogin: user.LastLogin,
					});
					Notification.create({ 
						UserId:user.UserId, 
						Description: user.Name + ' is Login Successfully ' , 
						Notification: user.Name + ' Login Successfully',
						Time: date
					})


				// })	
				
				} else {

					console.log("wrong pass")
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


// API for Forgot Password
exports.Forgotpassword = (req, res) => {

	// if (!req.body.MobileNo) {
	// 	return res.status(401).json({ message: ' Your request MobileNo Id is missing details. ' });
	// } 

	Login.findOne({ where: { MobileNo: req.body.MobileNo } }).then(function (user) {

		
		if (user) {
			var useremail= req.body.Email
			var password = generator.generate({
				length: 5,
				numbers: true
			});
			// let hash = bcrypt.hashSync(password, 10);

			let transporter = nodeMailer.createTransport({
				host: 'smtp.gmail.com',
				port: 465,
				secure: true,
				auth: {
					user: 'Rajyug',
					pass: ''
				}
				});
				let mailOptions = {
				from: '@gmail.com', // sender address
				to: useremail, 
				subject: 'Email From Admin Application ✔',

				text: 'Your Password', // plain text bdy
				html: 'Dear User Your Password is ='+password
				};
				transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return console.log(error);
				}
				console.log('Message %s sent: %s', info.messageId, info.response);
				});

				res.status(200).json({success: '200',message: 'Password is sent to your registered Email'});

				Login.update({ Password: password },
					{ where: { MobileNo: req.body.MobileNo } }
				).then((user) => {
				});

		}
		else{res.status(401).json({message: 'Email is Not Correct'});}
	})
}

// API for Reset Password
exports.Resetpassword = (req, res) => {

	
	if (!req.body.MobileNo) {
	  return res.status(401).json({message: ' Please Enter a Mobile No. ' });
	}
	if (!req.body.CurrentPassword) {
	  return res.status(401).json({message: ' Please Enter a Current Password. ' });
	}
	if (!req.body.NewPassword) {
		return res.status(401).json({message: ' Please Enter a New Password. ' });
    }
	if (!req.body.ConfirmPassword) {
		return res.status(401).json({message: ' Please Enter a Confirm Password. ' });
	}

	Login.findOne({ where: { MobileNo: req.body.MobileNo } }).then(function (user) {
  
	  if (user) {

		if(user.Password==req.body.CurrentPassword)
		{
			if(req.body.NewPassword==req.body.ConfirmPassword)
			{
				Login.update({ Password: req.body.ConfirmPassword },
					{ where: { MobileNo: req.body.MobileNo } }
				).then((user) => {
					res.status(200).json({
						success: '200',
						message: 'Password Changed successfully.'
					});
				});
			}else {
				res.status(200).json({success: '404', message: "New Password and Confirm Password is not matching"});
			  }	

		}else {
			res.status(200).json({success: '404', message: "Current Password is Incorrect"});
		  }
	  } else {
		res.status(200).json({
		  success: '404',
		  message: "Mobile No. is not valid"
		});
	  }
	})
	
  };  



  // API for Register New User (like: doctor/staff/patient)
exports.RegisterUser = (req, res) => {

	if (!req.body.Gender) {
        return res.status(401).json({ message: ' Please Enter a User Gender. ' });
    }
	if (!req.body.Role) {
        return res.status(401).json({ message: ' Please Enter a User Role. ' });
	}
	if (!req.body.ClinicId) {
        return res.status(401).json({ message: ' Please Enter a Clinic Id. ' });
	}
	if (!req.body.Name) {
        return res.status(401).json({ message: ' Please Enter a User Name. ' });
    }
    if (!req.body.MobileNo) {
        return res.status(401).json({ message: ' Please Enter a Users Mobile Number. ' });
    }
    if (!req.body.Email) {
        return res.status(401).json({ message: ' Please Enter a User Email. ' });
	}
	if (!req.body.Address) {
        return res.status(401).json({ message: ' Please Enter a Address. ' });
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
     
      return res.status(500).json({message: ' mobile no is not valid'});
	}

	NewUser.findOne({where: {  Email:req.body.Email, MobileNo:req.body.MobileNo }
	}).then(user => {

	if(!user){

		var password = generator.generate({
			length: 5,
			numbers: true
		});

		Login.create({ UserId:  randomize('A0',4),
					   ClinicId: req.body.ClinicId,
					   Name:req.body.Name,
				       Password:password,
					   MobileNo: req.body.MobileNo,
					   Email:req.body.Email,
				       Role:req.body.Role

    	}).then(async(register_user) => {

			var register_user = await NewUser.create({ 		
				ClinicId: register_user.ClinicId,
				Name:req.body.Name,
				Gender : req.body.Gender,
				MobileNo:req.body.MobileNo,
				Email:req.body.Email,
				UserId: register_user.UserId,
				Role: register_user.Role,
				Address: req.body.Address,
			 })

        	res.status(200).json({

         	    success: '200',
        	    message:'Details of ' + register_user.Name + ' is Added Successfully ',
        	});
			Notification.create({ 
				UserId:req.body.UserId, 
				ClinicId: req.body.ClinicId,
				Description: 'Details of ' + register_user.Name + ' is Added Successfully ' , 
				Notification:'User Added Successfully',
				Time: date
			})
    	})

		} else { return res.status(500).json({success:'500', message: "User is already present" }); }

	})

}

// API for Show all Users/Staff
exports.GetAllUserProfile=(req,res)=>{ 


    NewUser.findAll({where: { UserId: req.body.UserId }
	}).then(user => {

        res.status(200).json({

            success: '200',
            message:'All Users Details',
            NewUser: user
        })

    })

}


// API for Show Perticular User/Staff details 
exports.ShowUserDetailUsingId=(req,res)=>{ 

    NewUser.findOne({where: { UserId: req.body.UserId }
    }).then(user => {

        res.status(200).json({

            success: '200',
            message:'User Details',
            NewUser: user
        })


    })


}


  // API for Get Doctor Profile
  exports.GetAllDoctorProfile=(req,res)=>{ 


    Doctor.findAll().then(user => {

        res.status(200).json({

            success: '200',
            message:'All Doctors Details',
            Doctor: user
        })

    })

}

// API for Show Perticular doctor details 
exports.ShowDoctorDetailUsingId=(req,res)=>{ 
 if(!req.body.DoctorId){
	return res.status(500).json({message: ' Please Enter a Doctor Id'});
 }
    Doctor.findOne({where: { DoctorId: req.body.DoctorId}
    }).then(user => {

        res.status(200).json({

            success: '200',
            message: 'Doctor Details',
            Doctor: user
        })


    })
}



// API for Delete Patients details
exports.DeleteDoctor=(req,res)=>{ 


    if (!req.body.id) {
        return res.status(401).json({ message: ' Please Enter a Id. ' });
    }
    
    if(req.body){

            Doctor.update({ 
                isActive: '0',
             
            },{ where: { id: req.body.id } }).then(async(user) => {
    
                var doctor1 =await Doctor.findOne({where:{id: req.body.id}})
    
                res.status(200).json({
    
                    success: '200',
                    message:'Doctor details Deleted Successfully',
                   
                })
        })
    
        }

}


// API for Get Notification
exports.GetNotification = async(req, res) => {

	var data = await NewUser.findOne({where:{ UserId: req.body.UserId, NotificationStatus:'true' }})
	await Notification.findAll({ where: { SeenStatus: '0', ClinicId: req.body.ClinicId },  order: [ ['id', 'DESC']]  
      }).then(notify => {

		if(notify){

        res.status(200).json({
            
            success: '200',
            message:'All Notification',
			notification:notify,
			notifycount:notify.length
        
		});
	}else{ return res.status(404).json({ status: 404, message: "No Notifications"});}

    })

}



// API for Update Seen status
exports.SeenNotification = async(req, res) => {

	Notification.findOne({ where: { id: req.body.id} }).then(notify => {

		Notification.update({ SeenStatus:'1'},
		  { where: { id: req.body.id } }).then(async(user) => {

			await Notification.destroy({where: {id: req.body.id, SeenStatus:'1'}})
			res.status(200).json({

				success: '200',
				message:'Notification seen by user',
			
			});
		})
	})

}

// API for Notification which is not seen
exports.NotSeenNotification = async(req, res) => {

	var data = await NewUser.findOne({where:{ UserId: req.body.UserId, NotificationStatus:'true' }})

	await Notification.findAll({ where: {SeenStatus:0} }).then(notify => {

		res.status(200).json({

			success: '200',
			message:'Notifications',
			notification:notify,
			notifycount:notify.length

		
		});


	})
}



//  {where:{ UserId: req.body.UserId, NotificationStatus:'true' }}
//await Notification.findAll({ where: { UserId: data.UserId, SeenStatus:0 } }).then(notify => {



  // For Testing only
//   exports.GetNotification = (req, res) => {

		

//   }


// API for Upload Profile Image 
exports.Upload = async(req, res) => {

	// if (!req.body.id) {
    //     return res.status(401).json({ message: ' Your request id is missing. ' });
	// }

	let base64String = req.body.image_data.data // Not a real image
	let fileName = req.body.image_data.fileName // Not a real image
	// Remove header
	let base64Image = base64String.split(';base64,').pop();
	// let filepath = fileName;
	let filepath = path.join(__dirname.replace('app/controller',''), 'public/images');

	fs.mkdir(filepath, { recursive: true }, (err) => { 
		if (err) { 
			return console.error(err); 
		} 
		console.log('Directory created successfully!'); 
		fs.writeFile(filepath + '/' + fileName, base64Image, {encoding: 'base64'}, function(err) {
			console.log('File created', err);
		});
	}); 

	let finaImageUrl = "http://" + req.headers.host +"/" + fileName;
	Appointment.update({ PrescriptionURL: finaImageUrl},
	{ where: { id: req.body.id } }).then(async(user) => {		

		var data = await Appointment.findOne({ where: { id: req.body.id }});
		res.status(200).json({

			success: '200',
			message:'PrescriptionURL Image Updated Successfully',
			data: data.PrescriptionURL
		});
	  })

}