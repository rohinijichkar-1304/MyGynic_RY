const db = require("../config/db.config");
const config = require('../config/config.js');
var generator = require('generate-password');
var randomize = require('randomatic');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');

const Clinic = db.clinic;
const Doctor = db.doctor;
const Login = db.login;
const NewUser = db.register_user;
const Reports = db.report;
const PatientDetails = db.patientdetail;
const Appointment= db.appointment;




// API for ADD Clinic
exports.AddClinic =(req, res) => {
    
    if (!req.body.ClinicName) {
        return res.status(401).json({ message: ' Please Enter a Clinic Name. ' });
	}
    if (!req.body.Address) {
		return res.status(401).json({ message: 'Please Enter a Clinic Address.' });
	}
    if (!req.body.City) {
		return res.status(401).json({ message: 'Please Enter a Clinic City.' });
	}
    if (!req.body.State) {
		return res.status(401).json({ message: 'Please Enter a State.' });
	}
    if (!req.body.Country) {
		return res.status(401).json({ message: 'Please Enter a Country.' });
	}
    if (!req.body.ClinicGstNumber) {
		return res.status(401).json({ message: 'Please Enter a Clinic GST Number.' });
	}
    if (!req.body.ClinicRegistrationNumber) {
		return res.status(401).json({ message: 'Please Enter a Clinic Registration Number.' });
	}
    if (!req.body.NoOfStaff) {
		return res.status(401).json({ message: 'Please Enter a Number of Staff.' });
	}
    if (!req.body.ClinicStartTime) {
		return res.status(401).json({ message: 'Please Enter a Clinic Start-Time.' });
	}
    if (!req.body.ClinicEndTime) {
		return res.status(401).json({ message: 'Please Enter a Clinic End-Time.' });
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
       
        return res.status(500).json({message: ' Mobile no is not valid'});
    }
    const pin = req.body.Pincode;
      const PinregExp = /^(\d{4}|\d{6})$/;
      const pincode = PinregExp.test(pin);
      if (!pincode) {
       
        return res.status(500).json({message: 'Pincode is not valid'});
    }
    Login.findOne({where: {Email: req.body.Email}
    }).then(loginuser => {
      if(!loginuser){
    Clinic.findOne({where: {  ClinicName:req.body.ClinicName }
    }).then(user => {
  
    if(!user){
  
      var password = generator.generate({
        length: 5,
        numbers: true
      });
      var fistname=  req.body.Name.split(' ')[0]
      var clinicnm = req.body.ClinicName.split(' ')[0]
 Login.create({
  UserId: fistname+randomize('A0',4),
  ClinicId: clinicnm+randomize('A0',4),
   Name:req.body.Name,
  Password:password,
   Role:'DOCTOR',
   Email:req.body.Email,
   MobileNo: req.body.MobileNo,
 }).then(async(user) => {

		Doctor.create({
        Name : req.body.Name,
				Education: req.body.Education,
				ClinicTime: req.body.ClinicTime,
				Experience: req.body.Experience,
				MobileNo:req.body.MobileNo,
        Address: req.body.Address,
        City: req.body.City,
        Pincode: req.body.Pincode,
        State: req.body.State,
        Country: req.body.Country,
				Email:req.body.Email,
				UserId: user.UserId,
				Role: "DOCTOR",
				Gender: req.body.Gender,
				DOB: req.body.DOB,
				ClinicId: user.ClinicId,
				StartDate: req.body.StartDate,
				EndDate: req.body.EndDate,
				ReferedBy: req.body.ReferedBy,
				Type: req.body.Type,
        HeadDoctor: req.body.HeadDoctor,
        ClinicName:req.body.ClinicName,
        ClinicAddress: req.body.ClinicAddress,
        ClinicGstNumber: req.body.ClinicGstNumber,
        ClinicRegistrationNumber: req.body.ClinicRegistrationNumber,
        // ProfileImage:"http://" + req.headers.host +"/" +req.file.filename,
    	}).then(async(data) => {

			var user = await Clinic.create({ 
        ClinicName:data.ClinicName,
      ClinicEmail: req.body.ClinicEmail,
      ClinicId:data.ClinicId,
      ClinicAddress: data.ClinicAddress,
      ClinicCity: req.body.ClinicCity,
      ClinicState: req.body.ClinicState,
      ClinicPincode: req.body.ClinicPincode,
      ClinicCountry: req.body.ClinicCountry,
      ClinicGstNumber: data.ClinicGstNumber,
      ClinicRegistrationNumber: data.ClinicRegistrationNumber,
      ClinicStartTime: req.body.ClinicStartTime,
      ClinicEndTime: req.body.ClinicEndTime,
      NoOfStaff: req.body.NoOfStaff		
        
           
         })

        res.status(200).json({

             success: '200',
            message:'Clinic Information Added Successfully',
            // ProfileImage: user.ProfileImage
        })
      })
 })
    } 
    else
     { return res.status(500).json({success:'500', message: "Clinic is already present" }); }

    })
  }
  else
     { return res.status(500).json({success:'500', message: "User is already present" }); }

  })
}




// API for Show all Clinics
exports.GetAllClinic=(req,res)=>{ 


    Clinic.findAll({where: { ClinicId: req.body.ClinicId }
    }).then(data => {

        res.status(200).json({

            success: '200',
            message:'Clinic Details',
            Clinic: data
        })

    })

}



// API for Edit Clinic Details 
exports.EditClinicsDetails=(req,res)=>{ 

  if (!req.body.ClinicName) {
    return res.status(401).json({ message: ' Please Enter a Clinic Name. ' });
}
if (!req.body.Address) {
return res.status(401).json({ message: 'Please Enter a Clinic Address.' });
}
if (!req.body.City) {
return res.status(401).json({ message: 'Please Enter a Clinic City.' });
}
if (!req.body.State) {
return res.status(401).json({ message: 'Please Enter a State.' });
}
if (!req.body.Country) {
return res.status(401).json({ message: 'Please Enter a Country.' });
}
if (!req.body.ClinicGstNumber) {
return res.status(401).json({ message: 'Please Enter a Clinic GST Number.' });
}
if (!req.body.ClinicRegistrationNumber) {
return res.status(401).json({ message: 'Please Enter a Clinic Registration Number.' });
}
if (!req.body.NoOfStaff) {
return res.status(401).json({ message: 'Please Enter a Number of Staff.' });
}
if (!req.body.ClinicStartTime) {
return res.status(401).json({ message: 'Please Enter a Clinic Start-Time.' });
}
if (!req.body.ClinicEndTime) {
return res.status(401).json({ message: 'Please Enter a Clinic End-Time.' });
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
      
        return res.status(500).json({message: ' Mobile no is not valid'});
    }
    const pin = req.body.Pincode;
      const PinregExp = /^(\d{4}|\d{6})$/;
      const pincode = PinregExp.test(pin);
      if (!pincode) {
      
        return res.status(500).json({message: 'Pincode is not valid'});
    }



  // if(req.file){
// 	PatientDetails.update({ProfileImage:"http://" + req.headers.host +"/" +req.file.filename },
// 		{ where: { id: req.body.id } })
// }

  
    if(req.body){

          Clinic.update({ 
            ClinicName:data.ClinicName,
            ClinicEmail: req.body.ClinicEmail,
            ClinicId:data.ClinicId,
            ClinicAddress: data.ClinicAddress,
            ClinicCity: req.body.ClinicCity,
            ClinicState: req.body.ClinicState,
            ClinicPincode: req.body.ClinicPincode,
            ClinicCountry: req.body.ClinicCountry,
            ClinicGstNumber: data.ClinicGstNumber,
            ClinicRegistrationNumber: data.ClinicRegistrationNumber,
            ClinicStartTime: req.body.ClinicStartTime,
            ClinicEndTime: req.body.ClinicEndTime,
            NoOfStaff: req.body.NoOfStaff		
              
          },{ where: { ClinicId: req.body.ClinicId } }).then(async(user) => {

              var clinic =await Clinic.findOne({where:{ClinicId: req.body.ClinicId}})

        res.status(200).json({

          success: '200',
                  message:'Clinic Details Edited Successfully',
              })
          })
      }

    }



//Report generation

  exports.NewRegistrationReport = async(req, res) => {

    if (!req.body.ClinicId) {
      return res.status(401).json({ message: ' Your request ClinicId is missing details. ' });
    }


    var now = new Date();
    var date = now.toISOString().split('T')[0];
   console.log(date);


   var now = new Date();
   var quarter = Math.floor((now.getMonth() / 3));
   var firstDate = new Date(now.getFullYear(), quarter * 3, 2);
   var endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 1);
   var lastyear = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
   var currentyear = new Date(new Date().setFullYear(new Date().getFullYear()));

    var Patient=[]
    var countpatients = await PatientDetails.findAndCountAll({ where: { ClinicId: req.body.ClinicId , createdDate: date } });
    console.log(countpatients);

    var monthlycount = await PatientDetails.findAndCountAll({ where: { ClinicId:req.body.ClinicId , createdDate: {[Op.between]: [firstDate,endDate]}}});
    console.log(monthlycount);

    var yearlycount = await PatientDetails.findAndCountAll({ where: { ClinicId: req.body.ClinicId , createdDate: {[Op.between]: [lastyear,currentyear]}}});
    console.log(yearlycount);


    var resd = JSON.parse(JSON.stringify(countpatients))

      Patient.push(resd);
    
      return res.status(200).json({
  
        success : '200',
        message : 'Patient List',
        counts : countpatients.length,
        MonthlyRecord : monthlycount.count,
        Yearly : yearlycount.count,
        Data : countpatients.count,
      
      });
  
  }


  exports.CheckupAppointmentReport = async(req, res) => {

    if (!req.body.DoctorId) {
      return res.status(401).json({ message: ' Your request Doctor Id is missing details. ' });
    }
	

    var now = new Date();
    var date = now.toISOString().split('T')[0];
    var quarter = Math.floor((now.getMonth() / 3));
   var firstDate = new Date(now.getFullYear(), quarter * 3, 2);
   var endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 1);
   var lastyear = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
   var currentyear = new Date(new Date().setFullYear(new Date().getFullYear()));
  

      console.log(currentyear);
      console.log(date);
      console.log(lastyear);
      console.log(firstDate);
      console.log(endDate);

    var Appoint=[]
    var countappoint = await Appointment.findAll({ where: { DoctorId: req.body.DoctorId , AppointmentDate: date , AppointmentStatus : "Completed"} });
    console.log(countappoint.length);

    var monthlycount = await Appointment.findAndCountAll({ where: { DoctorId: req.body.DoctorId , AppointmentStatus : "Completed", AppointmentDate: {[Op.between]: [firstDate,endDate]}}});
    console.log(monthlycount);

    var yearlycount = await Appointment.findAndCountAll({ where: { DoctorId: req.body.DoctorId , AppointmentStatus : "Completed", AppointmentDate: {[Op.between]: [lastyear,currentyear]}}});
    console.log(yearlycount);

    // var yearly = db.sequelize.query("SELECT * From appointments WHERE ApointmentDate > DATEADD(year,-1,GETDATE())", { type: QueryTypes.SELECT });
    // console.log(yearly);

    var resd = JSON.parse(JSON.stringify(countappoint))

      Appoint.push(resd);
    
      return res.status(200).json({
  
        success : '200',
        message : 'Patient List',
        daily : countappoint.length,
        Monthly : monthlycount.count,
        Yearly : yearlycount.count,
        Data : Appoint,
      
      });
  
  }



  exports.FollowupAppointmentReport = async(req, res) => {

    if (!req.body.DoctorId) {
      return res.status(401).json({ message: ' Your request Doctor Id is missing details. ' });
    }


    var now = new Date();
    var date = now.toISOString().split('T')[0];
    var quarter = Math.floor((now.getMonth() / 3));
  //  var firstDate = new Date(now.getFullYear(), quarter * 3, 2);
  //  var endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 1);
   var nextyear = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
   var currentyear = new Date(new Date().setFullYear(new Date().getFullYear()));

   var currentMonth = new Date(new Date().setMonth(new Date().getMonth()));
   var nextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1));
     console.log(currentMonth);
     console.log(nextMonth);

    var Appoint=[]
    var daily = await Appointment.findAndCountAll({ where: { DoctorId: req.body.DoctorId , FollowupDate: date} });
    console.log(daily);

    var monthlycount = await Appointment.findAndCountAll({ where: { DoctorId: req.body.DoctorId, FollowupDate: {[Op.between]: [currentMonth, nextMonth]} }}); //{[Op.gt]: [date]}
    console.log(monthlycount);

    var yearlycount = await Appointment.findAndCountAll({ where: { DoctorId: req.body.DoctorId , FollowupDate: {[Op.between]: [currentyear, nextyear]}}});
    console.log(yearlycount);

    // var query = db.sequelize.query(" select count(*) from appointments where FollowupDate >  "+ date +"");
    // console.log(query);

    var resd = JSON.parse(JSON.stringify(daily))

      Appoint.push(resd);
    
      return res.status(200).json({
  
        success : '200',
        message : 'Appointment List',
        Daily : daily.count,
        Monthly : monthlycount.count,
        Yearly : yearlycount.count,
        Data : Appoint,
      //  res : query,
      });
  
  }
