const router = require("express").Router();

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

module.exports = router;