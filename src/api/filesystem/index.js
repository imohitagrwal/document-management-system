
const express = require('express');

const router = express.Router();

const controller = require("./filesystem.controller");

router.post('/mkdir', controller.mkdir);
router.post('/ls', controller.ls);
router.post('/touch',controller.touch);
router.put('/mv', controller.mv);

module.exports = router;
