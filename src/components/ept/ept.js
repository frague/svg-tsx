"use strict";
exports.__esModule = true;
var react_1 = require("react");
function startDragging(event, setDragging) {
    setDragging(true);
    console.log([event.clientX, event.clientY]);
    return [event.clientX, event.clientY];
}
function drag(event, startedAt, setOffset) {
    event.preventDefault();
    var result = [event.clientX - startedAt[0], event.clientY - startedAt[1]];
    console.log(startedAt, result);
    setOffset(result);
}
var Ept = function (_a) {
    var title = _a.title, position = _a.position, type = _a.type, inputTypes = _a.inputTypes, _b = _a.outputType, outputType = _b === void 0 ? null : _b;
    var _c = react_1.useState(false), isDragging = _c[0], setDragging = _c[1];
    var _d = react_1.useState([0, 0]), offset = _d[0], setOffset = _d[1];
    var startedAt = [0, 0];
    return react_1["default"].createElement("g", { className: 'ept' + (isDragging ? ' drag' : ''), transform: "translate(" + (offset[0] + position.x) + "," + (offset[1] + position.y) + ")", onMouseDown: function (event) { return startedAt = startDragging(event, setDragging); }, onMouseUp: function () { return setDragging(false); }, onMouseLeave: function () { return setDragging(false); }, onMouseMove: function (event) { if (isDragging)
            drag(event, startedAt, setOffset); } },
        react_1["default"].createElement("g", null,
            react_1["default"].createElement("rect", { className: "container" }),
            react_1["default"].createElement("text", { className: "title" }, title),
            inputTypes && [
                react_1["default"].createElement("circle", { key: "in", className: "in" }),
                react_1["default"].createElement("text", { key: "in-label", className: "in" }, inputTypes.join(', '))
            ],
            outputType && [
                react_1["default"].createElement("circle", { key: "out", className: "out" }),
                react_1["default"].createElement("text", { key: "out-label", className: "out" }, outputType)
            ]));
};
exports["default"] = Ept;
