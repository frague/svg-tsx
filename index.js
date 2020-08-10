"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var canvas_1 = require("./src/components/canvas/canvas");
var ept_1 = require("./src/components/ept/ept");
react_dom_1["default"].render(react_1["default"].createElement(canvas_1["default"], { width: "800", height: "600" },
    react_1["default"].createElement(ept_1["default"], { title: "test ept very very long title", position: { x: 100, y: 50 }, type: "Address Type", inputTypes: ['interface'], outputType: 'interface' })), document.getElementById('content'));
