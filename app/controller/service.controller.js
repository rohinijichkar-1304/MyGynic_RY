const db = require('../config/db.config.js');
const config = require('../config/config.js');

const Servicecategory = db.servicecategory;
const Service = db.service;
const Tips = db.tips;
const Broadcast = db.broadcast;
const Login = db.login;
const NewUser = db.register_user;
const Notification = db.notification;


// API for Add Service Category 
exports.AddServiceCategory=(req,res)=>{ 

    Servicecategory.create({ 
        Category:req.body.Category,

    }).then((service) => {

        res.status(200).json({

            success: '200',
            message:'Category Added Successfully',
        })
    })


}



// API for Add Services 
exports.AddServices=(req,res)=>{ 

    if (!req.body.DoctorId) {
        return res.status(401).json({ message: ' Doctor Id is missing in details. ' });
    }
    if (!req.body.ClinicId) {
        return res.status(401).json({ message: ' Clinic Id is missing in details. ' });
    }
    if (!req.body.ServiceName) {
        return res.status(401).json({ message: ' ServiceName is missing in details. ' });
    }
    if (!req.body.Category) {
        return res.status(401).json({ message: ' Category is missing in details. ' });
    }
    if (!req.body.Price) {
        return res.status(401).json({ message: ' Price is missing in details. ' });
    }
    if (!req.body.Description) {
        return res.status(401).json({ message: ' Description is missing in details. ' });
    }

    var now = new Date();
    var date = now.toLocaleTimeString().split('T')[0];

    var discount = req.body.Discount
    var disprice = req.body.Price - (req.body.Price * discount / 100)

    Service.create({ 
        DoctorId:req.body.DoctorId,
        ClinicId: req.body.ClinicId,
        ServiceName:req.body.ServiceName,
        Category:req.body.Category,
        Price:req.body.Price,
        Description:req.body.Description, 
        Discount:req.body.Discount, 
        DiscountPrice: disprice, 
        // ServiceImage:"http://" + req.headers.host +"/" +req.file.filename,


    }).then((data) => {

        res.status(200).json({

            success: '200',
            message: 'Service of ' +req.body.ServiceName + ' is Added Successfully ',
            // serviceImage: data.ServiceImage
        })
        Notification.create({ 
            UserId:data.DoctorId, 
            ClinicId: req.body.ClinicId,
            Description: 'Service of ' +req.body.ServiceName + ' is Added Successfully ' , 
            Notification:'Service Added Successfully',
            Time: date
        })
    })


}




// API for Edit Services 
exports.EditServices=(req,res)=>{ 

    if (!req.body.id) {
        return res.status(401).json({ message: ' Id is missing in details. ' });
    }
    if (!req.body.ServiceName) {
        return res.status(401).json({ message: ' ServiceName is missing in details. ' });
    }
    if (!req.body.Category) {
        return res.status(401).json({ message: ' Category is missing in details. ' });
    }
    if (!req.body.Price) {
        return res.status(401).json({ message: ' Price is missing in details. ' });
    }
    if (!req.body.Description) {
        return res.status(401).json({ message: ' Description is missing in details. ' });
    }

    if(req.file){
		Service.update({ServiceImage:"http://" + req.headers.host +"/" +req.file.filename },
			{ where: { id: req.body.id } })
	}

    var discount = req.body.Discount
    var disprice = req.body.Price - (req.body.Price * discount / 100)

    var now = new Date();
    var date = now.toLocaleTimeString().split('T')[0];
    

    if(req.body){

    Service.update({ 
        DoctorId:req.body.DoctorId,
        ClinicId: req.body.ClinicId,
        ServiceName:req.body.ServiceName,
        Category:req.body.Category,
        Price:req.body.Price,
        Description:req.body.Description, 
        Discount:req.body.Discount, 
        DiscountPrice: disprice, 
        // ServiceImage:"http://" + req.headers.host +"/" +req.file.filename,


    },{ where: { id: req.body.id } }).then(async(data) => {

        var serve =await Service.findOne({where:{id: req.body.id}})

        res.status(200).json({

            success: '200',
            message:'Service of ' + req.body.ServiceName + ' has been Edited Successfully ',
            // serviceImage: serve.ServiceImage
        })
        Notification.create({ 
            UserId: req.body.DoctorId, 
            ClinicId: req.body.ClinicId,
            Description: 'Service of ' + req.body.ServiceName + ' has been Edited Successfully ' , 
            Notification:'Service Edited Successfully',
            Time: date
        })
    })

    }

}



// // API for Delete Service  
// exports.DeleteServices=(req,res)=>{ 

//     if (!req.body.id) {
//         return res.status(401).json({ message: ' Id is required. ' });
//     }
    
// 	Service.destroy({where: {id: req.body.id}})
// 	.then((data) => {

// 		res.status(200).json({

// 			success: '200',
// 			message: 'Service Deleted Successfully.',

// 		});


// 	})

// }




// API for Delete Patients details
exports.DeleteServices=(req,res)=>{ 


    if (!req.body.id) {
        return res.status(401).json({ message: ' Please Enter a Id. ' });
    }
    
    if(req.body){

        Service.update({ 
                isActive: '0',
             
            },{ where: { id: req.body.id } }).then(async(user) => {
    
                var service =await Service.findOne({where:{id: req.body.id}})
    
                res.status(200).json({
    
                    success: '200',
                    message:'Service Deleted Successfully',
                   
                })
        })
    
        }

}


// API for Show Services 
exports.GetAllServices=(req,res)=>{ 

     if(!req.body.ClinicId){
         return res.status(401).json({ message : 'Please Enter a Clinic Id'})
     }

    Service.findAll({ where: { isActive: "1" , ClinicId: req.body.ClinicId } }).then(user => {

        res.status(200).json({

            success: '200',
            message:'Services Details',
            Service: user
        })

    })

}


// API for Add Tips 
exports.AddTips=(req,res)=>{ 

    if (!req.body.DoctorId) {
        return res.status(401).json({ message: ' Doctor Id is missing in details. ' });
    }
    if (!req.body.Title) {
        return res.status(401).json({ message: ' Title is missing in details. ' });
    }
    if (!req.body.Discription) {
        return res.status(401).json({ message: ' Discription is missing in details. ' });
    }

    var now = new Date();
    var date = now.toLocaleTimeString().split('T')[0];

    Tips.create({ 
        DoctorId:req.body.DoctorId,
        Title:req.body.Title,
        Discription:req.body.Discription, 
        ClinicId: req.body.ClinicId,

    }).then((data) => {

        res.status(200).json({

            success: '200',
            message:'Tips of ' + data.Title + ' is Added Successfully ',
            tips: data
        })
        Notification.create({ 
            UserId:data.DoctorId, 
            ClinicId: req.body.ClinicId,
            Description: 'Tips of ' + data.Title + ' is Added Successfully ' , 
            Notification:'Tips Added Successfully',
            Time: date
        })
    })

}

exports.GetAllTips=(req,res)=>{ 
 if(!req.body.ClinicId){
    return res.status(401).json({message : " Clinic Id is missing in details.." });
 }

    Tips.findAll({ where: { ClinicId: req.body.ClinicId } }).then(user => {

        res.status(200).json({

            success: '200',
            message:'All Tips',
            Tips: user
        })

    })

}


// API for Delete Tips
exports.DeleteTips=(req,res)=>{ 


    if (!req.body.id) {
        return res.status(401).json({ message: ' Id is required. ' });
    }
    
	Tips.destroy({where: {id: req.body.id}})
	.then((user) => {

		res.status(200).json({

			success: '200',
			message: 'Tips Deleted Successfully.',

		});


	})

}

// API for Add Broadcast 
exports.AddBroadcast=(req,res)=>{ 

    if (!req.body.DoctorId) {
        return res.status(401).json({ message: ' Doctor Id is missing in details. ' });
    }
    if (!req.body.Title) {
        return res.status(401).json({ message: ' Title is missing in details. ' });
    }
    if (!req.body.Discription) {
        return res.status(401).json({ message: ' Discription is missing in details. ' });
    }

    Broadcast.create({ 
        DoctorId:req.body.DoctorId,
        Title:req.body.Title,
        Discription:req.body.Discription, 

    }).then((data) => {

        res.status(200).json({

            success: '200',
            message:'Broadcast Added Successfully',
            tips: data
        })
    })

}


// API for Get All Broadcast 
exports.GetAllBroadcast=(req,res)=>{ 


    NewUser.findOne({where: { UserId: req.body.UserId }
    }).then(async data => {

        var broadcast =await Broadcast.findAll()

        res.status(200).json({

            success: '200',
            message:'Broadcast messages',
            broadcast: broadcast
        })


    })
}



// API for Delete Broadcast
exports.DeleteBroadcast=(req,res)=>{ 


    if (!req.body.id) {
        return res.status(401).json({ message: ' Id is missing in details. ' });
    }
    
	Broadcast.destroy({where: {id: req.body.id}})
	.then((user) => {

		res.status(200).json({

			success: '200',
			message: 'Broadcast Deleted Successfully.',

		});


	})

}

// API for Notification
// exports.GetNotification=(req,res)=>{ 


//     var admin = require("firebase-admin");

//     var serviceAccount = require("../config/lpet-76870-firebase.json");

//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount)
//     });

//     var registrationToken = req.body.token

//     var payload = {

//         notification: {
//             title: 'Title of your push notification',
//             body: 'Body of your push notification'
//         },

//     };

//     admin.messaging().sendToDevice(registrationToken, payload)
//         .then(function (response) {
//             console.log("Successfull sent", response);

//             res.status(200).json({

//                 success: '200',
//                 message: 'Successfully sent.',
    
//             });
    
//         })
//         .catch(function (error) {
//             res.status(400).json({

//                 success: '400',
//                 message: 'Error.',
    
//             });
    
//             console.log("Error", error);
//         })

// // fcm.send(message, function(err, response){
// //     if (err) {
// //         console.log("Something has gone wrong!");
// //     } else {
// //         console.log("Successfully sent with response: ", response);
// //     }
// // });

// }