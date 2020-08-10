"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Canvas = function (props) {
    var width = props.width, height = props.height, children = props.children;
    return react_1["default"].createElement("svg", { height: height, width: width, xmlns: "http://www.w3.org/2000/svg", version: "1.2", baseProfile: "tiny" }, children);
};
exports["default"] = Canvas;
