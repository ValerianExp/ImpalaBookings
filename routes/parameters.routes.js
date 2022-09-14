const router = require("express").Router();
const AxiosIH = require('../connect/axios.connect');
const axiosCharacter = new AxiosIH();
const AxiosImp = require("../connect/axios.connect");
const axiosImpala = new AxiosImp();


router.get('/', (req, res, next) => res.render('hotels/parameters'))
router.post('/', (req, res, next) => {

    const data = req.body;
    const newObj = {
        start: data.tripStart,
        end: data.tripEnd,
        'country[eq]': data.country,
        radius: data.radio,
        'starRating[eq]': data.startRatingInput
    }

    axiosImpala.getHotels(newObj)
        .then((response) => {
            const reservaResp = response.data;
            res.json(reservaResp);
            res.render("hotels", { reserva: reservaResp.data });
        })
        .catch((err) => {
            next(err);
        });

});


module.exports = router;