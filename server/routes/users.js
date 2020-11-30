const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        student_id: req.user.student_id,
        department: req.user.department,
        grade:req.user.grade, 
        role: req.user.role,
        image: req.user.image
    });
});

router.get("/getInfo", auth, (req, res) => {
    return res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        department: req.user.department,
        student_id: req.user.student_id,
        role: req.user.role,
        image: req.user.image,
        grade: req.user.grade
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ student_id: req.body.student_id }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, student_id not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});


router.post("/update",auth, (req, res) => {
    console.log(req.body.name);
    User.findOneAndUpdate({_id:req.user._id},{
        $set:{
            id:req.body._id,
            name:req.body.name,
            email:req.body.email,
            department:req.body.department,   
            student_id:req.body.student_id
        }},(err, doc) => {
       if (err) return res.json({ success: false, err });
        return res.status(200).json({
           success: true
        })}
    )
});


module.exports = router;
