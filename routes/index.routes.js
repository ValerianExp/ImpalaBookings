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

module.exports = router;