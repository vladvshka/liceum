const express = require("express");
const router = express.Router();
const DATA_NAME = 'content-blocks';
const model = require("../../models/" + DATA_NAME);
router.get(`/${DATA_NAME}`, getItems);
router.get(`/${DATA_NAME}/:id`, getItem);
router.post(`/${DATA_NAME}`, postItem);
router.put(`/${DATA_NAME}/:id`, editItem);
router.delete(`/${DATA_NAME}/:id`, deleteItem);

function getItems(req, res, next) {
  const defaultSort = ["created", "asc"];
  const sort = req.query.sort ? req.query.sort.split("-") : defaultSort;
  const sortField = sort[0];
  const sortDirection = sort[1] === "asc" ? "" : "-";
  const page = Number(req.query.page) || 1;
  const itemsPerPage = Number(req.query.itemsPerPage) || 30;
  const queryParams = {
    sortField,
    sortDirection,
    itemsPerPage,
    page
  };
  const notCustomParams = ['sort', 'page', 'itemsPerPage'];
  const filterFields = [];
  Object.keys(req.query).forEach(key => {
    if (notCustomParams.indexOf(key) < 0) {
      filterFields.push({
        name: key,
        value: req.query[key]
      })
    }
  });
  const findQuery = model.find();
  const countQuery = model.find();
  filteredSearch(queryParams, filterFields, res, findQuery, countQuery);
}

function filteredSearch(queryParams, filterFields, res, findQuery, countQuery) {
  filterFields.forEach(filter => {
    const findFilter = {};
    let filterName = filter.name;
    let filterValue = filter.value;
    let dateFilterType;
    const isDateFilter = filterName.indexOf('dateFrom_') > -1 || filterName.indexOf('dateTo_') > -1;
    if (isDateFilter) {
      dateFilterType = filterName.split('_')[0];
      filterName = filterName.split('_')[1];
      if (dateFilterType === 'dateFrom') {
        filterValue = {
          '$gte': new Date(filter.value)
        };
      }
      if (dateFilterType === 'dateTo') {
        filterValue = {
          '$lt': new Date(filter.value)
        };
      }
    }
    if (!isDateFilter) {
      if (["header"].indexOf(filterName) > -1) {
        filterValue = new RegExp(filter.value, 'i');
      }
    }
    findFilter[filterName] = filterValue;
    findQuery.find(findFilter);
    countQuery.find(findFilter);
  });
  findQuery.sort(queryParams.sortDirection + queryParams.sortField).skip(queryParams.itemsPerPage * (queryParams.page - 1)).limit(queryParams.itemsPerPage);
  Promise.all([findQuery.exec(), countQuery.countDocuments().exec()]).then(function ([first, second]) {
    const data = {
      items: first,
      count: second
    };
    res.status(200).json(data);
  }).catch(function (err) {
    console.error(err);
    res.status(500).send("DB paggination error");
  });
}

function getItem(req, res, next) {
  const id = req.params.id;
  console.log("opa-chirik");
  model.findById({
    _id: id
  }).then(function (doc) {
    res.status(200).json(doc);
  }).catch(function (err) {
    console.error(err);
    res.status(500).send("DB receiving entry by id error");
  });
}

function postItem(req, res, next) {
  const item = req.body;
  const newItem = new model(item);
  newItem.save().then(function (doc) {
    res.sendStatus(200);
  }).catch(function (err) {
    console.error(err);
    res.status(500).send("DB saving error");
  });
}

function editItem(req, res, next) {
  const id = req.params.id;
  const update = req.body;
  const options = {
    new: true,
    runValidators: true
  };
  update.updated = Date.now();
  model.findByIdAndUpdate(id, update, options).then(function (doc) {
    res.sendStatus(200);
  }).catch(function (err) {
    console.error(err);
    res.status(500).send("DB updating error");
  });
}

function deleteItem(req, res, next) {
  const id = req.params.id;
  model.findByIdAndRemove(id).then(function (offer) {
    if (offer) {
      res.sendStatus(204);
    } else {
      res.status(404).send("Resource doesn't exist");
    }
  }).catch(function (err) {
    console.error(err);
    res.status(500).send("DB deleting error");
  });
}
module.exports = router;