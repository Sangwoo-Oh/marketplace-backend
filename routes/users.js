const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.post('/sign-in', (req, res) => {

})
router.post('/sign-up', async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    if (!username) {
        return res.status(422).send({ error: 'Please fill the username' })
    }
    if (!email) {
        return res.status(422).send({ error: 'Please fill the email' })
    }
    if (!password) {
        return res.status(422).send({ error: 'Please fill the password' })
    }
    if (password !== confirmPassword) {
        return res.status(422).send({ error: 'password did not match with confirmPassword' })
    }

    try {
        const foundUser = await User.findOne({email});
        if(foundUser) {
            return res.status(422).send({ error: 'An user with this email already exists' })
        }
        try {
            const newUser = new User({username, email, password})
            newUser.save()
            return res.json({"registered": true})
        } catch (err) {
            res.status(422).send({ error: 'something went wrong' })
        }
        return res.json(foundUser)
    } catch(err) {
        res.status(422).send({ error: 'something went wrong' })
    }
})
module.exports = router;
