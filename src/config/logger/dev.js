"use strict";
exports.__esModule = true;
var winston_1 = require("winston");
var env_1 = require("../env");
var APP_NAME = env_1["default"].APP_NAME;
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, label = winston_1.format.label, printf = winston_1.format.printf, colorize = winston_1.format.colorize, errors = winston_1.format.errors;
var logFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp, stack = _a.stack;
    message = message.replace(/[[\d]+m/g, "");
    return "".concat(timestamp, "\n[").concat(label, "] ").concat(level, ":\n").concat(stack || message, "\n");
});
var consoleFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp, stack = _a.stack;
    return "".concat(timestamp, "\n[").concat(label, "] ").concat(level, ":\n").concat(stack || message, "\n");
});
var logger = (0, winston_1.createLogger)({
    format: combine(label({ label: APP_NAME }), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), logFormat),
    transports: [
        new winston_1.transports.Console({
            format: combine(colorize(), consoleFormat)
        }),
        new winston_1.transports.File({ filename: "errors.log", level: "error" }),
        new winston_1.transports.File({ filename: "all-logs.log" }),
    ],
    rejectionHandlers: [
        new winston_1.transports.File({ filename: "unhandled-rejections.log" }),
    ]
});
exports["default"] = logger;
