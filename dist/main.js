/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/extensions/array-extensions.ts":
/*!********************************************!*\
  !*** ./src/extensions/array-extensions.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"random\": () => (/* binding */ random)\n/* harmony export */ });\nfunction random(array) {\r\n    return array[Math.floor(Math.random() * array.length)];\r\n}\r\n\n\n//# sourceURL=webpack:///./src/extensions/array-extensions.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _extensions_array_extensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extensions/array-extensions */ \"./src/extensions/array-extensions.ts\");\n\r\nvar allSeries;\r\nvar allEpisodes;\r\n// const db = new StarTrekDatabase()\r\n// extension boilerplate\r\nArray.prototype.random = function () { return (0,_extensions_array_extensions__WEBPACK_IMPORTED_MODULE_0__.random)(this); };\r\n$(document).ready(function () {\r\n    Promise.all([\r\n        $.getJSON('../src/db/json/series.json'),\r\n        $.getJSON('../src/db/json/episodes.json')\r\n    ])\r\n        .then(function (data) {\r\n        allSeries = data[0];\r\n        allEpisodes = data[1];\r\n        populateSeries();\r\n        showRandomEpisode();\r\n    });\r\n    $('#btn_new_episode').on('click', showRandomEpisode);\r\n    // db.getAllEpisodes(5).then((episodes) => console.log(episodes))\r\n});\r\nfunction populateSeries() {\r\n    allSeries.sort(function (a, b) { return a.productionStartYear - b.productionStartYear; });\r\n    var seriesFilters = $('#series_filters');\r\n    for (var _i = 0, allSeries_1 = allSeries; _i < allSeries_1.length; _i++) {\r\n        var s = allSeries_1[_i];\r\n        seriesFilters.append(\"\\n            <li>\\n                <input type=\\\"checkbox\\\" id=\\\"\".concat(s.uid, \"\\\">\\n                \").concat(s.title, \"\\n            </li>\\n        \"));\r\n    }\r\n    seriesFilters\r\n        .find('li input')\r\n        .prop('checked', true);\r\n}\r\nfunction getToggledSeries() {\r\n    return $('#series_filters')\r\n        .find('input:checked')\r\n        .toArray()\r\n        .map(function (item) { return getSeriesFromId(item.id); });\r\n}\r\nfunction seriesIsSelected(uid) {\r\n    var series = getSeriesFromId(uid);\r\n    if (series === null)\r\n        return false;\r\n    return series.title.includes(\"Star Trek:\");\r\n}\r\nfunction getSeriesFromId(uid) {\r\n    return allSeries.filter(function (s) { return s.uid === uid; })[0] || null;\r\n}\r\nfunction showRandomEpisode() {\r\n    if (allEpisodes === undefined) {\r\n        console.error(\"Cannot pick random episode; episodes have not been read from file yet.\");\r\n        return;\r\n    }\r\n    console.log(\"toggled: \", getToggledSeries());\r\n    var toggledSeriesIds = getToggledSeries().map(function (s) { return s.uid; });\r\n    var episode = allEpisodes\r\n        .filter(function (e) { return toggledSeriesIds.includes(e.series.uid); })\r\n        .random();\r\n    console.log(\"Randomly picked episode: \", episode);\r\n    if (episode === undefined)\r\n        return;\r\n    $('#episode').text(\"\".concat(episode.season.title, \": \").concat(episode.title));\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;