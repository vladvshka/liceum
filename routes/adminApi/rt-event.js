const express = require("express");
const router = express.Router();

const model = require("../../models/rt-event");

router.get("/rt-event", getItems);

function getItems(req, res, next) {
	
}

module.exports = router;