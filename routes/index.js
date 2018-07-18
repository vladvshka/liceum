const express = require('express');
const router = express.Router();

const contentBlockModel = require('../models/contentBlock');
const openConnection = require('../controllers/dbConnection');

const connection = openConnection();

router.get('/', getRoot);

function getRoot(req, res, next) {
	let contentBlocks = null;

	contentBlockModel.find({})
        .then(function (docs) {
		   contentBlocks = docs;
		   
		   res.render('index', {
				title: 'Lyceum',
				contentBlocks: contentBlocks
			});
        })
        .catch(function (err) {
			console.error(err);			
			res.send('DB receiving entries error');
        });	
}

module.exports = router;