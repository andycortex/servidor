const express = require('express')
const cryto = require('crypto')
const jwt = require('jsonwebtoken')
const Users = require('../models/Users')
const { isAuthenticated } = require('../auth/index')

const router = express.Router()

const signToken = (_id) => {
    return jwt.sign({ _id }, 'mi-secreto', {
        expiresIn: 60 * 60 * 24 * 365,
    })
}

router.post('/register', (req, res) => {
    const { email, password } = req.body
    cryto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64')
        cryto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) =>{
            const encrytedPassword = key.toString('base64')
            Users.findOne({ email }).exec()
            .then(user => {
                if (user) {
                    return res.send('usuario ya existe')
                }
                Users.create({
                    email,
                    password: encrytedPassword,
                    salt: newSalt,
                }).then(() => {
                    res.send('usuario creado con exito')
                })
            })
        })
    })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    Users.findOne({ email }).exec()
    .then(user => {
        if (!user) {
            return res.send('usuario y/o contrasenia incorrecta')
        }
        cryto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) =>{
            const encryptedPasword = key.toString('base64')
            if (user.password === encryptedPasword) {
                const token = signToken(user._id)
                return res.send({ token })
            }
            return res.send('usuario y/o contrasenia incorrecta')
        })
    })
})

router.get('/me', isAuthenticated, (req, res) => {
    res.send(req.user)
})

module.exports = router;