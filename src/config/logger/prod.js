"use strict";
exports.__esModule = true;
var winston_1 = require("winston");
var combine = winston_1.format.combine, printf = winston_1.format.printf, json = winston_1.format.json, label = winston_1.format.label, timestamp = winston_1.format.timestamp, errors = winston_1.format.errors;
var consoleFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp, stack = _a.stack;
    return "".concat(timestamp, "\n[").concat(label, "] ").concat(level, ":\n").concat(stack || message, "\n");
});
var env_1 = require("../env");
var APP_NAME = env_1["default"].APP_NAME;
var logger = (0, winston_1.createLogger)({
    format: combine(label({ label: APP_NAME }), timestamp(), errors({ stack: true }), json()),
    transports: [
        new winston_1.transports.Console({
            format: combine(consoleFormat)
        }),
        new winston_1.transports.File({ filename: "errors.log", level: "error" }),
        new winston_1.transports.File({ filename: "all-logs.log" }),
    ],
    rejectionHandlers: [
        new winston_1.transports.File({ filename: "unhandled-rejections.log" }),
    ]
});
exports["default"] = logger;
