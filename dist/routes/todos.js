"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
router.post('/');
router.get('/', function (req, res, next) { return res.status(201).json({ message: "Got todo" }); });
router.patch('/:id');
router.delete('/:id');
exports.default = router;
