const bcrypt = require("bcrypt");
const Users = require("../models/User");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")

router.post("/signUp", async (req, res) => {
    try {
        const { email, password, firstName } = req.body

        let user = await Users.findOne({ email })
        if (user) return res.json({ msg: "USER EXISTS" })

        if (firstName.length < 4) {
            return res.status(400).json({ msg: "Name should have more than 3 characters" });
        }
        
        if (password.length < 8) {
            return res.status(400).json({ msg: "Password should have at least 8 characters" });
        }
       

        await Users.create({ ...req.body, password: await bcrypt.hash(password, 5) });

        return res.json({ msg: "CREATED" })
    } catch (error) {
        console.error(e)
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await Users.findOne({ email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) return res.json({ msg: "WRONG PASSWORD" })

        const token = jwt.sign({
            email,
            createdAt: new Date(),
            admin: user.admin,
        }, "MY_SECRET", { expiresIn: "1d" });

        res.json({
            msg: "LOGGED IN", token
        })
    } catch (error) {
        console.error(error)
    }
});

module.exports = router
