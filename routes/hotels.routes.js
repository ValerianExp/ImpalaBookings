const router = require("express").Router();

router.get("/", (req, res, next) => {
    res.render("hotels/");
});

router.get("/:id", (req, res, next) => {

});

module.exports = router;