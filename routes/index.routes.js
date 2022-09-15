const router = require("express").Router();

// Models
const modelUser = require("../models/User.model");
const modelHotel = require("../models/hotel.model");
const modelRoom = require("../models/room.model");

//Axios
const AxiosImp = require("../connect/axios.connect");
const axiosImpala = new AxiosImp();

// Separator
const separator = require("../utils/separator");

/* GET home page */
router.get("/", (req, res, next) => {
  // DATOS => modelUser { fav: IDHotel }
  axiosImpala
    .getHotels({}) // TODO -> Add query params
    .then((response) => {
      const hotelResp = response.data;
      // res.json(hotelResp);
      // const nextLink = response.data.pagination.next;
      // const prevLink = response.data.pagination.prev;
      // console.log("nextLink", nextLink);
      // console.log("prevLink", prevLink);

      // let nextLinkParams = 0;
      // if (nextLink) {
      //   nextLinkParams = separator(nextLink);
      // }
      // let prevLinkParams = 0;
      // if (prevLink) {
      //   prevLinkParams = separator(prevLink);
      // }

      res.render("index",
        {
          hotels: hotelResp.data,
          // next:
          // {
          //   size: parseInt(nextLinkParams.size) + 25, offset: parseInt(nextLinkParams.offset) + 25
          // },
          // prev:
          // {
          //   size: prevLinkParams.size, offset: prevLinkParams.offset
          // }
        });
    })
    .catch((err) => {
      next(err);
    });
});

//TODO finish next values
router.get("/next/", (req, res, next) => {
  const { size, offset } = req.query;
  // const { size, offset } = separator(n);

  axiosImpala
    .getHotels({ size, offset }) // TODO -> Add query params
    .then((response) => {
      const hotelResp = response.data;
      // res.json(hotelResp);
      res.render("index", { hotels: hotelResp.data });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/prev/:p", (req, res, next) => {
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