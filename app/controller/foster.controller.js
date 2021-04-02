const db = require('../config/db.config.js');
const config = require('../config/config.js');

const Foster = db.foster;

exports.AddFoster=(req,res)=>{ 
    if (!req.body.Name) {
        return res.status(401).json({ message: ' Your request Name is missing. ' });
    }
    if (!req.body.VetId) {
        return res.status(401).json({ message: ' Your request VetId is missing. ' });
    }
    if (!req.body.Email) {
        return res.status(401).json({ message: ' Your request Email is missing. ' });
    }
    if (!req.body.Phone) {
        return res.status(401).json({ message: ' Your request Phone is missing. ' });
    }
    if (!req.body.Address) {
        return res.status(401).json({ message: ' Your request Address is missing. ' });
    }
    if (!req.body.Time) {
        return res.status(401).json({ message: ' Your request Time is missing. ' });
    }
    
    Foster.create({ 
        VetId: req.body.VetId,
        Name: req.body.Name,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Address: req.body.Address,
        Time: req.body.Time,
        Image: "http://" + req.headers.host +"/" +req.file.filename,
    }).then((foster) => {
        res.status(200).json({
            success: '200',
            message:'Foster Added Successfully',
        })
    })
}

exports.GetFosters=(req,res)=>{ 
    Foster.findAll().then(data => {
        res.status(200).json({
            success: '200',
            message:'Foster Details',
            Fosters: data
        })
    })
}