const Users = require("../models/User");
var express = require("express");
var router = express.Router();



// all these will be done by admin
// retrieve user
// update user
// delete user

router.use((req, res, next) => {
    if (!req.user.admin) return res.json({ msg: "NOT ADMIN" })
    else next()
})



router.post("/getUserByEmail", async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })
        res.json({ msg: "USER FOUND", data: user })
    } catch (error) {
        console.error(error)
    }
});

router.post("/deleteUserByEmail", async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })
        await Users.deleteOne({ email: req.body.email })
        res.json({ msg: "USER DELETED" })
    } catch (error) {
        console.error(error)
    }
});


router.post("/updateUserByEmail", async (req, res) => {
    try {
        const user = await Users.findOne({ isbn: req.body.isbn })
        if (!user) return res.json({ msg: "USER NOT FOUND" })

        //const filter = { isbn: req.body.isbn };
        
        await Users.updateOne({ email: req.body.email, ...req.body})
        res.json({msg: "USER UPDATED"})
    } catch (error) {
        console.error(error)
    }
});


module.exports = router
