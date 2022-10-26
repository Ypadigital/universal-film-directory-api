"use strict";
exports.__esModule = true;
var env_1 = require("../env");
var dev_1 = require("./dev");
var prod_1 = require("./prod");
var logger = env_1["default"].NODE_ENV === "production" ? prod_1["default"] : dev_1["default"];
exports["default"] = logger;
