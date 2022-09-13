const router = require("express").Router();
const AxiosIH = require('../connect/axios.connect');
const axiosCharacter = new AxiosIH();

router.get("/", (req, res, next) => {
    res.render("hotels/");
});

router.get("/:id", (req, res, next) => {

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