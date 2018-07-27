const express = require("express");
const contentBlocksRouter = express.Router();

const contentBlockModel = require("../../models/contentBlock");

contentBlocksRouter.get("/content-blocks", getContentBlocks);
contentBlocksRouter.get("/content-blocks/:id", getContentBlock);
contentBlocksRouter.post("/content-blocks", postContentBlock);
contentBlocksRouter.put("/content-blocks/:id", editContentBlock);
contentBlocksRouter.delete("/content-blocks/:id", deleteContentBlock);

function getContentBlocks(req, res, next) {
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

	const filterFields = {
		header: req.query.header,
		visible: req.query.visible
	};

	const findQuery = contentBlockModel.find();
	const countQuery = contentBlockModel.find();

	filteredSearch(queryParams, filterFields, res, findQuery, countQuery);
}

function filteredSearch(queryParams, filterFields, res, findQuery, countQuery) {

	for (filter in filterFields) {

		if (filterFields[filter]) {
			const findFilter = {};

			if (filter === 'header') {
				findFilter[filter] = new RegExp(filterFields[filter], 'i');
			} else {
				findFilter[filter] = filterFields[filter];
			}
			findQuery.find(findFilter);
			countQuery.find(findFilter);
		}
	}

	findQuery
		.sort(queryParams.sortDirection + queryParams.sortField)
		.skip(queryParams.itemsPerPage * (queryParams.page - 1))
		.limit(queryParams.itemsPerPage);
	//.populate('profile');	

	Promise.all([findQuery.exec(), countQuery.countDocuments().exec()])
		.then(function ([first, second]) {
			const data = {
				items: first,
				count: second
			};

			res.status(200).json(data);
		})
		.catch(function (err) {
			console.error(err);
			res.status(500).send("DB paggination error");
		});
}

function getContentBlock(req, res, next) {
	const id = req.params.id;
	console.log("opa-chirik");

	contentBlockModel
		.findById({
			_id: id
		})
		.then(function (doc) {
			res.status(200).json(doc);
		})
		.catch(function (err) {
			console.error(err);
			res.status(500).send("DB receiving entry by id error");
		});
}

function postContentBlock(req, res, next) {
	const contentBlock = req.body;
	const newContentBlock = new contentBlockModel(contentBlock);

	newContentBlock
		.save()
		.then(function (doc) {
			res.sendStatus(200);
		})
		.catch(function (err) {
			console.error(err);
			res.status(500).send("DB saving error");
		});
}

function editContentBlock(req, res, next) {
	const id = req.params.id;
	//console.log(id);
	const update = req.body;
	const options = {
		new: true
	};

	update.updated = Date.now();

	contentBlockModel
		.findOneAndUpdate({
				_id: id
			},
			update,
			options
		)
		.then(function (doc) {
			res.sendStatus(200);
		})
		.catch(function (err) {
			console.error(err);
			res.status(500).send("DB updating error");
		});
}

function deleteContentBlock(req, res, next) {
	const id = req.params.id;
	//console.log(id);

	contentBlockModel
		.findOneAndRemove({
			_id: id
		})
		.then(function (offer) {
			//console.log(offer);
			if (offer) {
				res.sendStatus(204);
			} else {
				res.status(404).send("Resource doesn't exist");
			}
		})
		.catch(function (err) {
			console.error(err);
			res.status(500).send("DB deleting error");
		});
}

module.exports = contentBlocksRouter;