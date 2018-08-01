const express = require("express");
const router = express.Router();
const defaultSort = ["created", "asc"];
const notCustomParams = ["sort", "page", "itemsPerPage"];
const model = require("../../models/rt-events");

router.get("/rt-events", getItems);
router.post("/rt-events", postItem);

function postItem(req, res, next) {
  const item = req.body;
  const newItem = new model(item);
  newItem
    .save()
    .then(function(doc) {
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("DB saving error");
    });
}

function getItems(req, res, next) {
	const sort = req.query.sort ? req.query.sort.split("-") : defaultSort;
  const sortField = sort[0];
  const sortDirection = sort[1] === "asc" ? "" : "-";
  const page = Number(req.query.page) || 1;
  const itemsPerPage = Number(req.query.itemsPerPage) || 30;
  const queryParams = { sortField, sortDirection, itemsPerPage, page };
  const filterFields = [];
  Object.keys(req.query).forEach(key => {
    if (notCustomParams.indexOf(key) < 0) {
      filterFields.push({ name: key, value: req.query[key] });
    }
  });
	model
		.filteredSearch(queryParams, filterFields)
		.then(function([items, count]) {
			const data = { items: items, count: count };
			res.status(200).json(data);
	  	})
		.catch(function(err) {
			console.error(err);
			res.status(500).send("DB paggination error");
		});
}

module.exports = router;