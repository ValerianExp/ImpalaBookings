const router = require("express").Router();
const User = require("../models/User.model");
const Hotel = require("../models/hotel.model");
const checkTypeCustomer = require("../utils/check-type-customer")
const bcrypt = require('bcryptjs')
const saltRounds = 10

// Signup
router.get('/registro', (req, res, next) => res.render('auth/signup'))
router.post('/registro', (req, res, next) => {

    const { userPwd } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => {
            if (!/\d/.test(userPwd)) {
                throw ("password must contain at least one number");
            }
            return bcrypt.hash(userPwd, salt)
        })
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
        .then(createdUser => res.redirect('/'))
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
                res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
                return
            } else if (bcrypt.compareSync(userPwd, user.password) === false) {
                res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
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