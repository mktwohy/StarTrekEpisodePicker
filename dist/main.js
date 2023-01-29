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

/***/ "./src/database.ts":
/*!*************************!*\
  !*** ./src/database.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"StarTrekDatabase\": () => (/* binding */ StarTrekDatabase)\n/* harmony export */ });\nvar StarTrekDatabase = /** @class */ (function () {\r\n    function StarTrekDatabase(onLoad) {\r\n        var _this = this;\r\n        this.episodes = [];\r\n        this.seasons = [];\r\n        this.series = [];\r\n        var path = '/StarTrekEpisodePicker/src/db/json/';\r\n        Promise.all([\r\n            getJSON(path + 'series.json'),\r\n            getJSON(path + 'seasons.json'),\r\n            getJSON(path + 'episodes.json')\r\n        ])\r\n            .then(function (_a) {\r\n            var series = _a[0], seasons = _a[1], episodes = _a[2];\r\n            _this.series = series.map(parseToSeries);\r\n            _this.seasons = seasons.map(function (json) {\r\n                return parseToSeason(json, _this.getSeriesFromId(json.series.uid));\r\n            });\r\n            _this.episodes = episodes.map(function (json) {\r\n                return parseToEpisode(json, _this.getSeriesFromId(json.series.uid), _this.getSeasonFromId(json.season.uid));\r\n            });\r\n            onLoad();\r\n        });\r\n    }\r\n    StarTrekDatabase.prototype.getAllEpisodes = function (limit) {\r\n        if (limit === void 0) { limit = null; }\r\n        return getAll_(this.episodes, limit);\r\n    };\r\n    StarTrekDatabase.prototype.getAllSeasons = function (limit) {\r\n        if (limit === void 0) { limit = null; }\r\n        return getAll_(this.seasons, limit);\r\n    };\r\n    StarTrekDatabase.prototype.getAllSeries = function (limit) {\r\n        if (limit === void 0) { limit = null; }\r\n        var compareFunc = function (a, b) {\r\n            return a.productionYearStart - b.productionYearStart;\r\n        };\r\n        return getAll_(this.series, limit).sort(compareFunc);\r\n    };\r\n    StarTrekDatabase.prototype.getEpisodeFromId = function (id) {\r\n        return this.episodes.filter(function (episode) { return episode.id === id; })[0];\r\n    };\r\n    StarTrekDatabase.prototype.getSeasonFromId = function (id) {\r\n        return this.seasons.filter(function (season) { return season.id === id; })[0];\r\n    };\r\n    StarTrekDatabase.prototype.getSeriesFromId = function (id) {\r\n        return this.series.filter(function (series) { return series.id === id; })[0];\r\n    };\r\n    StarTrekDatabase.prototype.getRandomEpisode = function (filter) {\r\n        if (filter === void 0) { filter = null; }\r\n        return (filter !== null)\r\n            ? this.episodes.filter(filter).random()\r\n            : this.episodes.random();\r\n    };\r\n    return StarTrekDatabase;\r\n}());\r\n\r\nfunction getAll_(list, limit) {\r\n    return (limit !== null) ? list.slice(0, limit) : list;\r\n}\r\nfunction getJSON(url) {\r\n    return fetch(url)\r\n        .then(function (response) { return response.json(); })\r\n        .then(function (data) { return data; });\r\n}\r\nfunction parseToEpisode(json, series, season) {\r\n    return {\r\n        id: json.uid,\r\n        series: series,\r\n        season: season,\r\n        title: json.title,\r\n        episodeNumber: json.episodeNumber,\r\n        stardateStart: json.stardateFrom,\r\n        stardateEnd: json.stardateTo,\r\n        yearStart: json.yearFrom,\r\n        yearEnd: json.yearTo,\r\n        usAirDate: json.usAirDate\r\n    };\r\n}\r\nfunction parseToSeason(json, series) {\r\n    return {\r\n        id: json.uid,\r\n        series: series,\r\n        title: json.title,\r\n        seasonNumber: json.seasonNumber,\r\n        episodeCount: json.numberOfEpisodes\r\n    };\r\n}\r\nfunction parseToSeries(json) {\r\n    return {\r\n        id: json.uid,\r\n        title: json.title.replace(\"Star Trek: \", \"\"),\r\n        abbreviation: json.abbreviation,\r\n        seasonCount: json.seasonsCount,\r\n        episodeCount: json.episodesCount,\r\n        productionYearStart: json.productionStartYear,\r\n        productionYearEnd: json.productionEndYear,\r\n        runYearStart: json.originalRunStartDate,\r\n        runYearEnd: json.originalRunEndDate\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./src/database.ts?");

/***/ }),

/***/ "./src/extensions/array-extensions.ts":
/*!********************************************!*\
  !*** ./src/extensions/array-extensions.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"filterNotNull\": () => (/* binding */ filterNotNull),\n/* harmony export */   \"random\": () => (/* binding */ random)\n/* harmony export */ });\nfunction random(array) {\r\n    return array[Math.floor(Math.random() * array.length)];\r\n}\r\nfunction filterNotNull(array) {\r\n    return array.filter(function (item) { return item !== null && item !== undefined; });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/extensions/array-extensions.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _extensions_array_extensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extensions/array-extensions */ \"./src/extensions/array-extensions.ts\");\n/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./database */ \"./src/database.ts\");\n\r\n\r\nvar db = new _database__WEBPACK_IMPORTED_MODULE_1__.StarTrekDatabase(onload = function () {\r\n    populateSeries();\r\n    showRandomEpisode();\r\n});\r\n// extension boilerplate\r\nArray.prototype.random = function () { return (0,_extensions_array_extensions__WEBPACK_IMPORTED_MODULE_0__.random)(this); };\r\nArray.prototype.filterNotNull = function () { return (0,_extensions_array_extensions__WEBPACK_IMPORTED_MODULE_0__.filterNotNull)(this); };\r\n$(document).ready(function () {\r\n    $('#btn_new_episode').on('click', showRandomEpisode);\r\n});\r\nfunction populateSeries() {\r\n    var series = db.getAllSeries();\r\n    var seriesFilters = $('#series_filters');\r\n    for (var _i = 0, series_1 = series; _i < series_1.length; _i++) {\r\n        var s = series_1[_i];\r\n        seriesFilters.append(\"\\n            <li>\\n                <div class=\\\"toggle-button\\\">\\n                    <input type=\\\"checkbox\\\" id=\\\"\".concat(s.id, \"\\\">\\n                    <label for=\\\"\").concat(s.id, \"\\\">\\n                        <span>\").concat(s.title, \"</span>\\n                    </label>\\n                </div>\\n            </li>\\n        \"));\r\n    }\r\n    seriesFilters\r\n        .find('li input')\r\n        .prop('checked', true);\r\n}\r\nfunction getToggledSeries() {\r\n    return $('#series_filters')\r\n        .find('input:checked')\r\n        .toArray()\r\n        .map(function (item) { return db.getSeriesFromId(item.id); })\r\n        .filter(function (item) { return item; })\r\n        .filterNotNull();\r\n}\r\nfunction seriesIsSelected(uid) {\r\n    var series = db.getSeriesFromId(uid);\r\n    if (series === null)\r\n        return false;\r\n    return series.title.includes(\"Star Trek:\");\r\n}\r\nfunction showRandomEpisode() {\r\n    var toggledSeriesIds = getToggledSeries().map(function (series) { return series.id; });\r\n    var episode = db.getRandomEpisode(function (episode) {\r\n        return toggledSeriesIds.includes(episode.series.id);\r\n    });\r\n    if (episode === undefined || episode === null)\r\n        return;\r\n    $('#episode').text(episode.title);\r\n    $('#season').text(\"SEASON \".concat(leftPadZeros(episode.season.seasonNumber)));\r\n    $('#series').text(episode.series.title.toUpperCase());\r\n}\r\nfunction leftPadZeros(num, targetLength) {\r\n    if (targetLength === void 0) { targetLength = 2; }\r\n    return num.toString().padStart(targetLength, '0');\r\n}\r\nfunction doStuff() {\r\n}\r\nfunction main() {\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

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