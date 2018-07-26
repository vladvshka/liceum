const express = require('express');
const router = express.Router();

const contentBlockModel = require('../models/contentBlock');

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