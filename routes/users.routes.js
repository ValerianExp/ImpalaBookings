const router = require("express").Router();
const User = require("../models/User.model");
const Hotel = require("../models/hotel.model");



// const UserModel = require('../models/User.model');

router.get('/signup', (req, res) => {
    res.render('users/signup');
});
router.get('/login', (req, res) => {
    res.render('users/login');
});
/**
 *  POST
 */
router.post('/signup', (req, res) => {
    const { username, password } = req.body;


    User
        .save()
        .then((user) => {
            // req.session.user = user;
            res.redirect('/auth/login');
        })
        .catch((err) => {
            console.log(err);
            res.render('users/signup', { messageError: 'Ha ocurrido un error' });
        });
});
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }).then((user) => {
        if (user) {
            if (user.comparePassword(password)) {
                req.session.user = user;
                res.redirect('/post');
            } else {
                res.render('/users/login', {
                    messageError: 'Username or password invalid',
                });
            }
        } else {
            res.render('/users/login', {
                messageError: 'Username or password invalid',
            });
        }
    });
});

module.exports = router;































// //List of Users
// router.get("/", (req, res, next) => {
//     User.find()
//         .then(data => {
//             console.log(data)
//             res.render("users/list-users", { data })
//         })
//         .catch(err => console.log(err));

// });

// /*Create User*/
// router.get("/create", (req, res, next) => {
//     res.render("users/create-users");
// });

// router.post("/create", (req, res, next) => {
//     const { name, type } = req.body;

//     const newHotel = {
//         name,
//         type
//         // location: {
//         //   type: "Point",
//         //   coordinates: [latitude, longitude]
//         // }

//     }

//     Hotel.create(newHotel)
//         .then(result => {
//             res.redirect("/users")
//         })
//         .catch(err => console.log(err));
// });



// /*Edit Place*/
// router.get("/edit/:id", (req, res, next) => {
//     User.findById(req.params.id)
//         .then(data => {
//             console.log('data ---> ', data)


//             res.render("users/edit-users", { data, type })
//         })
//         .catch(err => console.log(err));

// });

// router.post("/edit/:id", (req, res, next) => {
//     const { name, type } = req.body;

//     const newPlace = {
//         name,
//         type
//         // ,
//         // location: {
//         //   type: "Point",
//         //   coordinates: [lat, lon]
//         // }

//     }

//     User.findByIdAndUpdate(req.params.id, newPlace)
//         .then(result => {
//             res.redirect("/users")
//         })
//         .catch(err => console.log(err));
// });


// // DELETE

// router.post("/delete/:id", (req, res, next) => {
//     User.findByIdAndDelete(req.params.id)
//         .then(res.redirect("/users"))
//         .catch(err => console.log(err));
// });


// module.exports = router;







