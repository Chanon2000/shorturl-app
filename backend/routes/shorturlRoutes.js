const express = require('express');
const shorturlController = require('./../controllers/shorturlController')

const router = express.Router();

router
    .route('/')
    .post(shorturlController.makeShortUrl)
    .get(shorturlController.getAllUrls);

router
    .route('/:urlId')
    .get(shorturlController.urlRedirect)

module.exports = router;