const router = require("express").Router();

// Models
const modelUser = require("../models/User.model");
const modelHotel = require("../models/hotel.model");
const modelRoom = require("../models/room.model");

//Axios
const AxiosImp = require("../connect/axios.connect");
const axiosImpala = new AxiosImp();

/* GET home page */
router.get("/", (req, res, next) => {
  // DATOS => modelUser { fav: IDHotel }
  axiosImpala
    .getHotels({}) // TODO -> Add query params
    .then((response) => {
      const hotelResp = response.data;
      // res.json(hotelResp);
      res.render("index", { hotels: hotelResp.data });
    })
    .catch((err) => {
      next(err);
    });
});



// /* GET home page */
// router.get('/', (_req, res) => {
//   res.render('index');
// });

// router.get('/signup', (_req, res) => {
//   res.render('signup');
// });
// router.get('/login', (req, res) => {
//   res.render('login');
// });

// router.post('/signup', (req, res, next) => {
//   console.log(req.body);
//   // const username = req.body.username;
//   // const email = req.body.email;
//   // const password = req.body.password;
//   const { name, email, password, level } = req.body;
//   console.log({ name, email, password, level });
//   modelUser.create({ username: name, email, password, level })
//     .then((user) => {
//       res.redirect(`/users/${user._id}`);
//     })
//     // Utilizamos el next(err) para controlar el error
//     .catch((err) => {
//       next(err);
//     });
// });




module.exports = router;