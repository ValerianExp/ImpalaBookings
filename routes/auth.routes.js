const router = require("express").Router();
const User = require("../models/User.model");
const Hotel = require("../models/hotel.model");
// const checkTypeCustomer = require("../utils/check-type-customer")
const bcrypt = require('bcryptjs')
const saltRounds = 10

//Uploads image profile 
const fileUploader = require('../config/cloudinary.config');

// Signup
router.get('/registro', (req, res, next) => {
    res.render('auth/signup')
    // res.render('auth/signup');
})


router.post('/registro', fileUploader.single('profileImg'), (req, res) => {
    const { username, userPwd, email, description } = req.body
    // console.log('====================================');}
    // console.log('====================================');

    let profileImg;

    if (!req.file) {
        //Default image
        profileImg = 'https://i.imgur.com/XeN1BHm.png'
    } else {
        // User image
        profileImg = req.file.path
    }
    bcrypt
        .genSalt(saltRounds)
        .then(salt => {
            // convertilo a una función
            if (!/\d/.test(userPwd)) {
                throw ("password must contain at least one number");
            }
            return bcrypt.hash(userPwd, salt)
        })
        .then(hashedPassword => User.create({ username, email, password: hashedPassword, profileImg, description }))
        .then(createdUser => {
            res.redirect('/')
        })
        .catch(error => res.render('auth/signup', { errorMessage: error }))
})

// Login
router.get('/iniciar-sesion', (req, res, next) => res.render('auth/login'))
router.post('/iniciar-sesion', (req, res, next) => {

    const { email, userPwd } = req.body
    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                // res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
                res.render('auth/login', { errorMessage: 'Email/contraseña incorrecta' })

                return
            } else if (bcrypt.compareSync(userPwd, user.password) === false) {
                // cuidado con los men que mandamos
                // res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
                res.render('auth/login', { errorMessage: 'Email/contraseña incorrecta' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/')
            }
        })
        .catch(error => next(error))
})


// Logout
router.post('/cerrar-sesion', (req, res, next) => {
    req.session.destroy(() => res.redirect('/iniciar-sesion'))
})

module.exports = router





//-------------------------------------------------------------------------------
// sin refactorizar

// router.get('/signup', (_req, res) => {
//     res.render('auth/signup');
// });
// router.get('/login', (req, res) => {
//     res.render('auth/login');
// });

// router.post('/signup', (req, res, next) => {
//     console.log(req.body);
//     // const username = req.body.username;
//     // const email = req.body.email;
//     // const password = req.body.password;
//     const { name, email, password, level } = req.body;
//     console.log({ name, email, password, level });
//     User.create({ username: name, email, password, level })
//         .then((user) => {
//             res.redirect(`/users/${user._id}`);
//         })
//         // Utilizamos el next(err) para controlar el error
//         .catch((err) => {
//             next(err);
//         });
// });

// module.exports = router;

//-------------------------------------------------------------------------------