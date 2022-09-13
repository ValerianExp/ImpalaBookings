const router = require("express").Router();
const AxiosIH = require('../connect/axios.connect');
const axiosCharacter = new AxiosIH();

//Axios
const AxiosImp = require("../connect/axios.connect");
const axiosImpala = new AxiosImp();

router.get("/", (req, res, next) => {
    res.render("hotels/");
});

router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    axiosImpala.getHotel(id)
        .then((hotel) => {
            // console.log(hotel.data);
            res.render("hotels/details", { hotel: hotel.data });
            // res.json(hotel.data);
        })
        .catch((err) => next(err))
    // res.json(axiosImpala.getHotel(id));
});


router.get('/rooms', (req, res, next) => {
    axiosCharacter
        .getCharacters()
        .then((room) => {
            console.log(room);
            res.json(room);
        })
        .catch((err) => next(err));
});



module.exports = router;