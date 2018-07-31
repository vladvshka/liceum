const express = require("express");
const router = express.Router();
const DATA_NAME = "rt-periods";
const model = require("../../models/" + DATA_NAME);
const defaultSort = ["created", "asc"];
const notCustomParams = ["sort", "page", "itemsPerPage"];
router.get(`/${DATA_NAME}`, getItems);
router.get(`/${DATA_NAME}/:id`, getItem);
router.post(`/${DATA_NAME}`, postItem);
router.put(`/${DATA_NAME}/:id`, editItem);
router.delete(`/${DATA_NAME}/:id`, deleteItem);
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
function getItem(req, res, next) {
  const id = req.params.id;
  console.log("opa-chirik");
  model
    .findById({ _id: id })
    .then(function(doc) {
      res.status(200).json(doc);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("DB receiving entry by id error");
    });
}
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
function editItem(req, res, next) {
  model
    .findByReqAndUpdate(req)
    .then(function(doc) {
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("DB updating error");
    });
}
function deleteItem(req, res, next) {
  const id = req.params.id;
  model
    .findByIdAndRemove(id)
    .then(function(offer) {
      if (offer) {
        res.sendStatus(204);
      } else {
        res.status(404).send("Resource doesn't exist");
      }
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("DB deleting error");
    });
}
module.exports = router;
