const router = require("express").Router();
const User = require("../models/User.model");
const Hotel = require("../models/hotel.model");
const bcrypt = require('bcryptjs')
const saltRounds = 10

const checkMongoID = require("../utils/check-mongo-id")

const checkTypeCustomer = require("../utils/check-type-customer")

const { rolesChecker } = require("./../utils/roles-checker")

const { checkRole } = require("./../middleware/roles-checker")

const { isLoggedIn } = require("./../middleware/session-guard")

const { canEditUser } = require("./../middleware/can-edit-user")

const axiosImp = require("../connect/axios.connect")
const axiosImpala = new axiosImp();

router.get('/users', isLoggedIn, (req, res, next) => {
    const roles = rolesChecker(req.session.currentUser);
    console.log("roles:", roles)
    User.find({ role: "USER" })
        .then(data => {
            res.render('users/list-users', { data, roles })
        })
        .catch(err => console.log(err))
})

router.get('/administ', isLoggedIn, checkRole("PA"), (req, res, next) => {
    const roles = rolesChecker(req.session.currentUser);
    console.log("roles:", roles)
    User.find()
        .then(data => {
            res.render('users/list-users', { data, roles })
        })
        .catch(err => console.log(err))
})

router.get('/users/:id', isLoggedIn, (req, res, next) => {
    const UserID = req.params.id

    const userMatch = UserID === req.session.currentUser._id

    console.log(UserID, req.session.currentUser._id)
    if (!checkMongoID(UserID)) {
        res.render('index', { errorMessage: "Invalid ID" })
    }
    let user;
    const roles = rolesChecker(req.session.currentUser);
    User.findById(UserID)
        .populate('favorites', 'hotelId')
        .then(data => {
            user = data
            const auxArr = [];
            const hotelRequests = data.favorites.map(hotel => axiosImpala.getHotel(hotel.hotelId))
            return Promise.all(hotelRequests)
        })
        .then(values => {
            console.log(values[0].data);
            res.render('users/user-details', { user, values, roles, userMatch, fav: values[0].data })
            // res.render('users/users-details', { data: values, roles, userMatch })
        })
        .catch(err => console.log(err))
})


router.get('/users/:id/edit', isLoggedIn, canEditUser(), (req, res, next) => {
    User.findById(req.params.id)
        .then(data => res.render('users/edit-users', data))
        .catch(err => res.redirect(`/users/${req.params.id}/id`, { errorMessage: err }))

})
router.post('/users/:id/edit', isLoggedIn, canEditUser(), (req, res, next) => {
    const { id } = req.params

    User.findByIdAndUpdate(id, req.body)
        .then(() => res.redirect('/users'))
        .catch(err => res.redirect(`/users/${req.params.id}/id`, { errorMessage: err }))
})



router.post('/users/:id/changeRole/:role', isLoggedIn, checkRole("PA"), (req, res, next) => {
    const { id, role } = req.params

    User.findByIdAndUpdate(id, { role })
        .then(() => res.redirect('/users'))
        .catch(err => console.log(err))


})

router.post('/users/fav', isLoggedIn, (req, res, next) => {
    const { hotelId } = req.body
    const { _id } = req.session.currentUser

    Hotel.findOne({ hotelId })
        .then(hotel => {
            if (hotel) {
                return hotel
            }
            else {
                return Hotel.create({ hotelId });
            }
        }).
        then((hotelMongo) => {
            User.findByIdAndUpdate(_id, { $addToSet: { favorites: hotelMongo._id } })
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

router.post('/users/fav/delete', isLoggedIn, (req, res, next) => {
    const { hotelId } = req.body
    const { _id } = req.session.currentUser

    Hotel.findOne({ hotelId })
        .then(hotel => {
            if (hotel) {
                return hotel
            }
            else {
                return Hotel.create({ hotelId });
            }
        }).
        then((hotelMongo) => {
            User.findByIdAndUpdate(_id, { $pull: { favorites: hotelMongo._id } })
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})


router.post('/users/:id/delete', checkRole("PA"), (req, res, next) => {
    const { id } = req.params
    User.findByIdAndDelete(id)
        .then(() => res.redirect('/users'))
        .catch(err => console.log(err))
})
module.exports = router




















//sin refactorizar
//--------------------------------------------------------

// router.get('/:userId', (req, res, next) => {
//     console.log(req.params);
//     User.findById(req.params.userId)
//         .then((user) => {
//             if (user) {
//                 res.render('users/edit-users', user);
//             } else {
//                 res.render('not-found');
//             }
//         })
//         // Utilizamos el next(err) para controlar el error
//         .catch((err) => {
//             next(err);
//         });
// });

// router.get('/delete/:idUser', (req, res, next) => {
//     User.findByIdAndDelete(req.params.idUser)
//         .then(() => {
//             res.redirect('/');
//         })
//         // Utilizamos el next(err) para controlar el error
//         .catch((err) => next(err));
// });

// router.post('/:userId', (req, res, next) => {
//     // Realizamos el destructuring para solo seleccionar los campos que queremos.
//     const { username, email } = req.body;
//     User.findByIdAndUpdate(req.params.userId, { username, email })
//         .then((user) => {
//             res.redirect(`/users/${user._id}`);
//         })
//         // Utilizamos el next(err) para controlar el error
//         .catch((err) => next(err));
// });


// module.exports = router;

//---------------------------------------------------------------------


// router.get('/signup', (req, res) => {
//     res.render('users/signup');
// });
// router.get('/login', (req, res) => {
//     res.render('users/login');
// });
// /**
//  *  POST
//  */
// router.post('/signup', (req, res) => {
//     const { username, password } = req.body;


//     User
//         .save()
//         .then((user) => {
//             // req.session.user = user;
//             res.redirect('/users/login');
//         })
//         .catch((err) => {
//             console.log(err);
//             res.render('users/signup', { messageError: 'Ha ocurrido un error' });
//         });
// });
// router.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     User.findOne({ username }).then((user) => {
//         if (user) {
//             if (user.comparePassword(password)) {
//                 req.session.user = user;
//                 res.redirect('/post');
//             } else {
//                 res.render('/users/login', {
//                     messageError: 'Username or password invalid',
//                 });
//             }
//         } else {
//             res.render('/users/login', {
//                 messageError: 'Username or password invalid',
//             });
//         }
//     });
// });
































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







