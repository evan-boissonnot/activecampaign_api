const express = require("express");
const router = express.Router();

router.post('/', function(req, res, next) {
    let toBeAddedContact = req.body;
    let status = 422;

    if(toBeAddedContact && toBeAddedContact.email) {
        status = 200;

        throw new Error("07/12/2018, A finir");
    }

    res.status(status).send({
        item: toBeAddedContact,
        isSuccess: status == 200
    });
});

module.exports = router;