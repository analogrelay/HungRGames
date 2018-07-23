(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["shootR"] = factory();
	else
		root["shootR"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _aspnet_signalr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _Server_ServerAdapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(119);
/* harmony import */ var _GameScreen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(83);




$(function () {
    var connection = new _aspnet_signalr__WEBPACK_IMPORTED_MODULE_0__["HubConnectionBuilder"]().withUrl("/Game").configureLogging(_aspnet_signalr__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Warning).build();
    var gameCanvas = $("#game"), popUpHolder = $("#popUpHolder"), gameContent = $("#gameContent"), loadContent = $("#loadContent"), game, serverAdapter = new _Server_ServerAdapter__WEBPACK_IMPORTED_MODULE_2__["ServerAdapter"](connection, "shootr.state"), gameScreen = new _GameScreen__WEBPACK_IMPORTED_MODULE_3__["GameScreen"](gameCanvas, popUpHolder, serverAdapter);
    serverAdapter.Negotiate().then(function (initializationData) {
        loadContent.hide();
        gameContent.show();
        game = new _Game__WEBPACK_IMPORTED_MODULE_1__["Game"](gameCanvas[0], gameScreen, serverAdapter, initializationData);
        gameScreen.ForceResizeCheck();
    }, function (reason) { return console.error("Failed to negotiate with server: " + reason); });
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return VERSION; });
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpError", function() { return _Errors__WEBPACK_IMPORTED_MODULE_0__["HttpError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimeoutError", function() { return _Errors__WEBPACK_IMPORTED_MODULE_0__["TimeoutError"]; });

/* harmony import */ var _HttpClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultHttpClient", function() { return _HttpClient__WEBPACK_IMPORTED_MODULE_1__["DefaultHttpClient"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpClient", function() { return _HttpClient__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpResponse", function() { return _HttpClient__WEBPACK_IMPORTED_MODULE_1__["HttpResponse"]; });

/* harmony import */ var _HubConnection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HubConnection", function() { return _HubConnection__WEBPACK_IMPORTED_MODULE_2__["HubConnection"]; });

/* harmony import */ var _HubConnectionBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HubConnectionBuilder", function() { return _HubConnectionBuilder__WEBPACK_IMPORTED_MODULE_3__["HubConnectionBuilder"]; });

/* harmony import */ var _IHubProtocol__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessageType", function() { return _IHubProtocol__WEBPACK_IMPORTED_MODULE_4__["MessageType"]; });

/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LogLevel", function() { return _ILogger__WEBPACK_IMPORTED_MODULE_5__["LogLevel"]; });

/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpTransportType", function() { return _ITransport__WEBPACK_IMPORTED_MODULE_6__["HttpTransportType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransferFormat", function() { return _ITransport__WEBPACK_IMPORTED_MODULE_6__["TransferFormat"]; });

/* harmony import */ var _Loggers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NullLogger", function() { return _Loggers__WEBPACK_IMPORTED_MODULE_7__["NullLogger"]; });

/* harmony import */ var _JsonHubProtocol__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(19);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JsonHubProtocol", function() { return _JsonHubProtocol__WEBPACK_IMPORTED_MODULE_8__["JsonHubProtocol"]; });

// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Version token that will be replaced by the prepack command
/** The version of the SignalR client. */
var VERSION = "1.0.2";









//# sourceMappingURL=index.js.map

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpError", function() { return HttpError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeoutError", function() { return TimeoutError; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

/** Error thrown when an HTTP request fails. */
var HttpError = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](HttpError, _super);
    /** Constructs a new instance of {@link HttpError}.
     *
     * @param {string} errorMessage A descriptive error message.
     * @param {number} statusCode The HTTP status code represented by this error.
     */
    function HttpError(errorMessage, statusCode) {
        var _newTarget = this.constructor;
        var _this = this;
        var trueProto = _newTarget.prototype;
        _this = _super.call(this, errorMessage) || this;
        _this.statusCode = statusCode;
        // Workaround issue in Typescript compiler
        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
        _this.__proto__ = trueProto;
        return _this;
    }
    return HttpError;
}(Error));

/** Error thrown when a timeout elapses. */
var TimeoutError = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TimeoutError, _super);
    /** Constructs a new instance of {@link TimeoutError}.
     *
     * @param {string} errorMessage A descriptive error message.
     */
    function TimeoutError(errorMessage) {
        var _newTarget = this.constructor;
        if (errorMessage === void 0) { errorMessage = "A timeout occurred."; }
        var _this = this;
        var trueProto = _newTarget.prototype;
        _this = _super.call(this, errorMessage) || this;
        // Workaround issue in Typescript compiler
        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
        _this.__proto__ = trueProto;
        return _this;
    }
    return TimeoutError;
}(Error));

//# sourceMappingURL=Errors.js.map

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpResponse", function() { return HttpResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpClient", function() { return HttpClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultHttpClient", function() { return DefaultHttpClient; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.



/** Represents an HTTP response. */
var HttpResponse = /** @class */ (function () {
    function HttpResponse(statusCode, statusText, content) {
        this.statusCode = statusCode;
        this.statusText = statusText;
        this.content = content;
    }
    return HttpResponse;
}());

/** Abstraction over an HTTP client.
 *
 * This class provides an abstraction over an HTTP client so that a different implementation can be provided on different platforms.
 */
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.get = function (url, options) {
        return this.send(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, options, { method: "GET", url: url }));
    };
    HttpClient.prototype.post = function (url, options) {
        return this.send(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, options, { method: "POST", url: url }));
    };
    HttpClient.prototype.delete = function (url, options) {
        return this.send(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, options, { method: "DELETE", url: url }));
    };
    return HttpClient;
}());

/** Default implementation of {@link HttpClient}. */
var DefaultHttpClient = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DefaultHttpClient, _super);
    /** Creates a new instance of the {@link DefaultHttpClient}, using the provided {@link ILogger} to log messages. */
    function DefaultHttpClient(logger) {
        var _this = _super.call(this) || this;
        _this.logger = logger;
        return _this;
    }
    /** @inheritDoc */
    DefaultHttpClient.prototype.send = function (request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(request.method, request.url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            // Explicitly setting the Content-Type header for React Native on Android platform.
            xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            if (request.headers) {
                Object.keys(request.headers)
                    .forEach(function (header) { return xhr.setRequestHeader(header, request.headers[header]); });
            }
            if (request.responseType) {
                xhr.responseType = request.responseType;
            }
            if (request.abortSignal) {
                request.abortSignal.onabort = function () {
                    xhr.abort();
                };
            }
            if (request.timeout) {
                xhr.timeout = request.timeout;
            }
            xhr.onload = function () {
                if (request.abortSignal) {
                    request.abortSignal.onabort = null;
                }
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(new HttpResponse(xhr.status, xhr.statusText, xhr.response || xhr.responseText));
                }
                else {
                    reject(new _Errors__WEBPACK_IMPORTED_MODULE_1__["HttpError"](xhr.statusText, xhr.status));
                }
            };
            xhr.onerror = function () {
                _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Warning, "Error from HTTP request. " + xhr.status + ": " + xhr.statusText);
                reject(new _Errors__WEBPACK_IMPORTED_MODULE_1__["HttpError"](xhr.statusText, xhr.status));
            };
            xhr.ontimeout = function () {
                _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Warning, "Timeout from HTTP request.");
                reject(new _Errors__WEBPACK_IMPORTED_MODULE_1__["TimeoutError"]());
            };
            xhr.send(request.content || "");
        });
    };
    return DefaultHttpClient;
}(HttpClient));

//# sourceMappingURL=HttpClient.js.map

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogLevel", function() { return LogLevel; });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// These values are designed to match the ASP.NET Log Levels since that's the pattern we're emulating here.
/** Indicates the severity of a log message.
 *
 * Log Levels are ordered in increasing severity. So `Debug` is more severe than `Trace`, etc.
 */
var LogLevel;
(function (LogLevel) {
    /** Log level for very low severity diagnostic messages. */
    LogLevel[LogLevel["Trace"] = 0] = "Trace";
    /** Log level for low severity diagnostic messages. */
    LogLevel[LogLevel["Debug"] = 1] = "Debug";
    /** Log level for informational diagnostic messages. */
    LogLevel[LogLevel["Information"] = 2] = "Information";
    /** Log level for diagnostic messages that indicate a non-fatal problem. */
    LogLevel[LogLevel["Warning"] = 3] = "Warning";
    /** Log level for diagnostic messages that indicate a failure in the current operation. */
    LogLevel[LogLevel["Error"] = 4] = "Error";
    /** Log level for diagnostic messages that indicate a failure that will terminate the entire application. */
    LogLevel[LogLevel["Critical"] = 5] = "Critical";
    /** The highest possible log level. Used when configuring logging to indicate that no log messages should be emitted. */
    LogLevel[LogLevel["None"] = 6] = "None";
})(LogLevel || (LogLevel = {}));
//# sourceMappingURL=ILogger.js.map

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HubConnection", function() { return HubConnection; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _HandshakeProtocol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _IHubProtocol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.





var DEFAULT_TIMEOUT_IN_MS = 30 * 1000;
/** Represents a connection to a SignalR Hub. */
var HubConnection = /** @class */ (function () {
    function HubConnection(connection, logger, protocol) {
        var _this = this;
        _Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isRequired(connection, "connection");
        _Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isRequired(logger, "logger");
        _Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isRequired(protocol, "protocol");
        this.serverTimeoutInMilliseconds = DEFAULT_TIMEOUT_IN_MS;
        this.logger = logger;
        this.protocol = protocol;
        this.connection = connection;
        this.handshakeProtocol = new _HandshakeProtocol__WEBPACK_IMPORTED_MODULE_1__["HandshakeProtocol"]();
        this.connection.onreceive = function (data) { return _this.processIncomingData(data); };
        this.connection.onclose = function (error) { return _this.connectionClosed(error); };
        this.callbacks = {};
        this.methods = {};
        this.closedCallbacks = [];
        this.id = 0;
    }
    /** @internal */
    // Using a public static factory method means we can have a private constructor and an _internal_
    // create method that can be used by HubConnectionBuilder. An "internal" constructor would just
    // be stripped away and the '.d.ts' file would have no constructor, which is interpreted as a
    // public parameter-less constructor.
    HubConnection.create = function (connection, logger, protocol) {
        return new HubConnection(connection, logger, protocol);
    };
    /** Starts the connection.
     *
     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully established, or rejects with an error.
     */
    HubConnection.prototype.start = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var handshakeRequest;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handshakeRequest = {
                            protocol: this.protocol.name,
                            version: this.protocol.version,
                        };
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Debug, "Starting HubConnection.");
                        this.receivedHandshakeResponse = false;
                        return [4 /*yield*/, this.connection.start(this.protocol.transferFormat)];
                    case 1:
                        _a.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Debug, "Sending handshake request.");
                        return [4 /*yield*/, this.connection.send(this.handshakeProtocol.writeHandshakeRequest(handshakeRequest))];
                    case 2:
                        _a.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Information, "Using HubProtocol '" + this.protocol.name + "'.");
                        // defensively cleanup timeout in case we receive a message from the server before we finish start
                        this.cleanupTimeout();
                        this.configureTimeout();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Stops the connection.
     *
     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully terminated, or rejects with an error.
     */
    HubConnection.prototype.stop = function () {
        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Debug, "Stopping HubConnection.");
        this.cleanupTimeout();
        return this.connection.stop();
    };
    /** Invokes a streaming hub method on the server using the specified name and arguments.
     *
     * @typeparam T The type of the items returned by the server.
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {IStreamResult<T>} An object that yields results from the server as they are received.
     */
    HubConnection.prototype.stream = function (methodName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var invocationDescriptor = this.createStreamInvocation(methodName, args);
        var subject = new _Utils__WEBPACK_IMPORTED_MODULE_4__["Subject"](function () {
            var cancelInvocation = _this.createCancelInvocation(invocationDescriptor.invocationId);
            var cancelMessage = _this.protocol.writeMessage(cancelInvocation);
            delete _this.callbacks[invocationDescriptor.invocationId];
            return _this.connection.send(cancelMessage);
        });
        this.callbacks[invocationDescriptor.invocationId] = function (invocationEvent, error) {
            if (error) {
                subject.error(error);
                return;
            }
            if (invocationEvent.type === _IHubProtocol__WEBPACK_IMPORTED_MODULE_2__["MessageType"].Completion) {
                if (invocationEvent.error) {
                    subject.error(new Error(invocationEvent.error));
                }
                else {
                    subject.complete();
                }
            }
            else {
                subject.next((invocationEvent.item));
            }
        };
        var message = this.protocol.writeMessage(invocationDescriptor);
        this.connection.send(message)
            .catch(function (e) {
            subject.error(e);
            delete _this.callbacks[invocationDescriptor.invocationId];
        });
        return subject;
    };
    /** Invokes a hub method on the server using the specified name and arguments. Does not wait for a response from the receiver.
     *
     * The Promise returned by this method resolves when the client has sent the invocation to the server. The server may still
     * be processing the invocation.
     *
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {Promise<void>} A Promise that resolves when the invocation has been successfully sent, or rejects with an error.
     */
    HubConnection.prototype.send = function (methodName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var invocationDescriptor = this.createInvocation(methodName, args, true);
        var message = this.protocol.writeMessage(invocationDescriptor);
        return this.connection.send(message);
    };
    /** Invokes a hub method on the server using the specified name and arguments.
     *
     * The Promise returned by this method resolves when the server indicates it has finished invoking the method. When the promise
     * resolves, the server has finished invoking the method. If the server method returns a result, it is produced as the result of
     * resolving the Promise.
     *
     * @typeparam T The expected return type.
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {Promise<T>} A Promise that resolves with the result of the server method (if any), or rejects with an error.
     */
    HubConnection.prototype.invoke = function (methodName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var invocationDescriptor = this.createInvocation(methodName, args, false);
        var p = new Promise(function (resolve, reject) {
            _this.callbacks[invocationDescriptor.invocationId] = function (invocationEvent, error) {
                if (error) {
                    reject(error);
                    return;
                }
                if (invocationEvent.type === _IHubProtocol__WEBPACK_IMPORTED_MODULE_2__["MessageType"].Completion) {
                    var completionMessage = invocationEvent;
                    if (completionMessage.error) {
                        reject(new Error(completionMessage.error));
                    }
                    else {
                        resolve(completionMessage.result);
                    }
                }
                else {
                    reject(new Error("Unexpected message type: " + invocationEvent.type));
                }
            };
            var message = _this.protocol.writeMessage(invocationDescriptor);
            _this.connection.send(message)
                .catch(function (e) {
                reject(e);
                delete _this.callbacks[invocationDescriptor.invocationId];
            });
        });
        return p;
    };
    /** Registers a handler that will be invoked when the hub method with the specified method name is invoked.
     *
     * @param {string} methodName The name of the hub method to define.
     * @param {Function} newMethod The handler that will be raised when the hub method is invoked.
     */
    HubConnection.prototype.on = function (methodName, newMethod) {
        if (!methodName || !newMethod) {
            return;
        }
        methodName = methodName.toLowerCase();
        if (!this.methods[methodName]) {
            this.methods[methodName] = [];
        }
        // Preventing adding the same handler multiple times.
        if (this.methods[methodName].indexOf(newMethod) !== -1) {
            return;
        }
        this.methods[methodName].push(newMethod);
    };
    HubConnection.prototype.off = function (methodName, method) {
        if (!methodName) {
            return;
        }
        methodName = methodName.toLowerCase();
        var handlers = this.methods[methodName];
        if (!handlers) {
            return;
        }
        if (method) {
            var removeIdx = handlers.indexOf(method);
            if (removeIdx !== -1) {
                handlers.splice(removeIdx, 1);
                if (handlers.length === 0) {
                    delete this.methods[methodName];
                }
            }
        }
        else {
            delete this.methods[methodName];
        }
    };
    /** Registers a handler that will be invoked when the connection is closed.
     *
     * @param {Function} callback The handler that will be invoked when the connection is closed. Optionally receives a single argument containing the error that caused the connection to close (if any).
     */
    HubConnection.prototype.onclose = function (callback) {
        if (callback) {
            this.closedCallbacks.push(callback);
        }
    };
    HubConnection.prototype.processIncomingData = function (data) {
        this.cleanupTimeout();
        if (!this.receivedHandshakeResponse) {
            data = this.processHandshakeResponse(data);
            this.receivedHandshakeResponse = true;
        }
        // Data may have all been read when processing handshake response
        if (data) {
            // Parse the messages
            var messages = this.protocol.parseMessages(data, this.logger);
            for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                var message = messages_1[_i];
                switch (message.type) {
                    case _IHubProtocol__WEBPACK_IMPORTED_MODULE_2__["MessageType"].Invocation:
                        this.invokeClientMethod(message);
                        break;
                    case _IHubProtocol__WEBPACK_IMPORTED_MODULE_2__["MessageType"].StreamItem:
                    case _IHubProtocol__WEBPACK_IMPORTED_MODULE_2__["MessageType"].Completion:
                        var callback = this.callbacks[message.invocationId];
                        if (callback != null) {
                            if (message.type === _IHubProtocol__WEBPACK_IMPORTED_MODULE_2__["MessageType"].Completion) {
                                delete this.callbacks[message.invocationId];
                            }
                            callback(message);
                        }
                        break;
                    case _IHubProtocol__WEBPACK_IMPORTED_MODULE_2__["MessageType"].Ping:
                        // Don't care about pings
                        break;
                    case _IHubProtocol__WEBPACK_IMPORTED_MODULE_2__["MessageType"].Close:
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Information, "Close message received from server.");
                        this.connection.stop(message.error ? new Error("Server returned an error on close: " + message.error) : null);
                        break;
                    default:
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Warning, "Invalid message type: " + message.type);
                        break;
                }
            }
        }
        this.configureTimeout();
    };
    HubConnection.prototype.processHandshakeResponse = function (data) {
        var responseMessage;
        var remainingData;
        try {
            _a = this.handshakeProtocol.parseHandshakeResponse(data), remainingData = _a[0], responseMessage = _a[1];
        }
        catch (e) {
            var message = "Error parsing handshake response: " + e;
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Error, message);
            var error = new Error(message);
            this.connection.stop(error);
            throw error;
        }
        if (responseMessage.error) {
            var message = "Server returned handshake error: " + responseMessage.error;
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Error, message);
            this.connection.stop(new Error(message));
        }
        else {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Debug, "Server handshake complete.");
        }
        return remainingData;
        var _a;
    };
    HubConnection.prototype.configureTimeout = function () {
        var _this = this;
        if (!this.connection.features || !this.connection.features.inherentKeepAlive) {
            // Set the timeout timer
            this.timeoutHandle = setTimeout(function () { return _this.serverTimeout(); }, this.serverTimeoutInMilliseconds);
        }
    };
    HubConnection.prototype.serverTimeout = function () {
        // The server hasn't talked to us in a while. It doesn't like us anymore ... :(
        // Terminate the connection
        this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."));
    };
    HubConnection.prototype.invokeClientMethod = function (invocationMessage) {
        var _this = this;
        var methods = this.methods[invocationMessage.target.toLowerCase()];
        if (methods) {
            methods.forEach(function (m) { return m.apply(_this, invocationMessage.arguments); });
            if (invocationMessage.invocationId) {
                // This is not supported in v1. So we return an error to avoid blocking the server waiting for the response.
                var message = "Server requested a response, which is not supported in this version of the client.";
                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Error, message);
                this.connection.stop(new Error(message));
            }
        }
        else {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Warning, "No client method with the name '" + invocationMessage.target + "' found.");
        }
    };
    HubConnection.prototype.connectionClosed = function (error) {
        var _this = this;
        var callbacks = this.callbacks;
        this.callbacks = {};
        Object.keys(callbacks)
            .forEach(function (key) {
            var callback = callbacks[key];
            callback(undefined, error ? error : new Error("Invocation canceled due to connection being closed."));
        });
        this.cleanupTimeout();
        this.closedCallbacks.forEach(function (c) { return c.apply(_this, [error]); });
    };
    HubConnection.prototype.cleanupTimeout = function () {
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
        }
    };
    HubConnection.prototype.createInvocation = function (methodName, args, nonblocking) {
        if (nonblocking) {
            return {
                arguments: args,
                target: methodName,
                type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_2__["MessageType"].Invocation,
            };
        }
        else {
            var id = this.id;
            this.id++;
            return {
                arguments: args,
                invocationId: id.toString(),
                target: methodName,
                type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_2__["MessageType"].Invocation,
            };
        }
    };
    HubConnection.prototype.createStreamInvocation = function (methodName, args) {
        var id = this.id;
        this.id++;
        return {
            arguments: args,
            invocationId: id.toString(),
            target: methodName,
            type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_2__["MessageType"].StreamInvocation,
        };
    };
    HubConnection.prototype.createCancelInvocation = function (id) {
        return {
            invocationId: id,
            type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_2__["MessageType"].CancelInvocation,
        };
    };
    return HubConnection;
}());

//# sourceMappingURL=HubConnection.js.map

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandshakeProtocol", function() { return HandshakeProtocol; });
/* harmony import */ var _TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

var HandshakeProtocol = /** @class */ (function () {
    function HandshakeProtocol() {
    }
    // Handshake request is always JSON
    HandshakeProtocol.prototype.writeHandshakeRequest = function (handshakeRequest) {
        return _TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__["TextMessageFormat"].write(JSON.stringify(handshakeRequest));
    };
    HandshakeProtocol.prototype.parseHandshakeResponse = function (data) {
        var responseMessage;
        var messageData;
        var remainingData;
        if (data instanceof ArrayBuffer) {
            // Format is binary but still need to read JSON text from handshake response
            var binaryData = new Uint8Array(data);
            var separatorIndex = binaryData.indexOf(_TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__["TextMessageFormat"].RecordSeparatorCode);
            if (separatorIndex === -1) {
                throw new Error("Message is incomplete.");
            }
            // content before separator is handshake response
            // optional content after is additional messages
            var responseLength = separatorIndex + 1;
            messageData = String.fromCharCode.apply(null, binaryData.slice(0, responseLength));
            remainingData = (binaryData.byteLength > responseLength) ? binaryData.slice(responseLength).buffer : null;
        }
        else {
            var textData = data;
            var separatorIndex = textData.indexOf(_TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__["TextMessageFormat"].RecordSeparator);
            if (separatorIndex === -1) {
                throw new Error("Message is incomplete.");
            }
            // content before separator is handshake response
            // optional content after is additional messages
            var responseLength = separatorIndex + 1;
            messageData = textData.substring(0, responseLength);
            remainingData = (textData.length > responseLength) ? textData.substring(responseLength) : null;
        }
        // At this point we should have just the single handshake message
        var messages = _TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__["TextMessageFormat"].parse(messageData);
        responseMessage = JSON.parse(messages[0]);
        // multiple messages could have arrived with handshake
        // return additional data to be parsed as usual, or null if all parsed
        return [remainingData, responseMessage];
    };
    return HandshakeProtocol;
}());

//# sourceMappingURL=HandshakeProtocol.js.map

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextMessageFormat", function() { return TextMessageFormat; });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Not exported from index
var TextMessageFormat = /** @class */ (function () {
    function TextMessageFormat() {
    }
    TextMessageFormat.write = function (output) {
        return "" + output + TextMessageFormat.RecordSeparator;
    };
    TextMessageFormat.parse = function (input) {
        if (input[input.length - 1] !== TextMessageFormat.RecordSeparator) {
            throw new Error("Message is incomplete.");
        }
        var messages = input.split(TextMessageFormat.RecordSeparator);
        messages.pop();
        return messages;
    };
    TextMessageFormat.RecordSeparatorCode = 0x1e;
    TextMessageFormat.RecordSeparator = String.fromCharCode(TextMessageFormat.RecordSeparatorCode);
    return TextMessageFormat;
}());

//# sourceMappingURL=TextMessageFormat.js.map

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageType", function() { return MessageType; });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
/** Defines the type of a Hub Message. */
var MessageType;
(function (MessageType) {
    /** Indicates the message is an Invocation message and implements the {@link InvocationMessage} interface. */
    MessageType[MessageType["Invocation"] = 1] = "Invocation";
    /** Indicates the message is a StreamItem message and implements the {@link StreamItemMessage} interface. */
    MessageType[MessageType["StreamItem"] = 2] = "StreamItem";
    /** Indicates the message is a Completion message and implements the {@link CompletionMessage} interface. */
    MessageType[MessageType["Completion"] = 3] = "Completion";
    /** Indicates the message is a Stream Invocation message and implements the {@link StreamInvocationMessage} interface. */
    MessageType[MessageType["StreamInvocation"] = 4] = "StreamInvocation";
    /** Indicates the message is a Cancel Invocation message and implements the {@link CancelInvocationMessage} interface. */
    MessageType[MessageType["CancelInvocation"] = 5] = "CancelInvocation";
    /** Indicates the message is a Ping message and implements the {@link PingMessage} interface. */
    MessageType[MessageType["Ping"] = 6] = "Ping";
    /** Indicates the message is a Close message and implements the {@link CloseMessage} interface. */
    MessageType[MessageType["Close"] = 7] = "Close";
})(MessageType || (MessageType = {}));
//# sourceMappingURL=IHubProtocol.js.map

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Arg", function() { return Arg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataDetail", function() { return getDataDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatArrayBuffer", function() { return formatArrayBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendMessage", function() { return sendMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLogger", function() { return createLogger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Subject", function() { return Subject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubjectSubscription", function() { return SubjectSubscription; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsoleLogger", function() { return ConsoleLogger; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _Loggers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.



var Arg = /** @class */ (function () {
    function Arg() {
    }
    Arg.isRequired = function (val, name) {
        if (val === null || val === undefined) {
            throw new Error("The '" + name + "' argument is required.");
        }
    };
    Arg.isIn = function (val, values, name) {
        // TypeScript enums have keys for **both** the name and the value of each enum member on the type itself.
        if (!(val in values)) {
            throw new Error("Unknown " + name + " value: " + val + ".");
        }
    };
    return Arg;
}());

function getDataDetail(data, includeContent) {
    var length = null;
    if (data instanceof ArrayBuffer) {
        length = "Binary data of length " + data.byteLength;
        if (includeContent) {
            length += ". Content: '" + formatArrayBuffer(data) + "'";
        }
    }
    else if (typeof data === "string") {
        length = "String data of length " + data.length;
        if (includeContent) {
            length += ". Content: '" + data + "'.";
        }
    }
    return length;
}
function formatArrayBuffer(data) {
    var view = new Uint8Array(data);
    // Uint8Array.map only supports returning another Uint8Array?
    var str = "";
    view.forEach(function (num) {
        var pad = num < 16 ? "0" : "";
        str += "0x" + pad + num.toString(16) + " ";
    });
    // Trim of trailing space.
    return str.substr(0, str.length - 1);
}
function sendMessage(logger, transportName, httpClient, url, accessTokenFactory, content, logMessageContent) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        var headers, token, response, _a;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, accessTokenFactory()];
                case 1:
                    token = _b.sent();
                    if (token) {
                        headers = (_a = {},
                            _a["Authorization"] = "Bearer " + token,
                            _a);
                    }
                    logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Trace, "(" + transportName + " transport) sending data. " + getDataDetail(content, logMessageContent) + ".");
                    return [4 /*yield*/, httpClient.post(url, {
                            content: content,
                            headers: headers,
                        })];
                case 2:
                    response = _b.sent();
                    logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Trace, "(" + transportName + " transport) request complete. Response status: " + response.statusCode + ".");
                    return [2 /*return*/];
            }
        });
    });
}
function createLogger(logger) {
    if (logger === undefined) {
        return new ConsoleLogger(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Information);
    }
    if (logger === null) {
        return _Loggers__WEBPACK_IMPORTED_MODULE_2__["NullLogger"].instance;
    }
    if (logger.log) {
        return logger;
    }
    return new ConsoleLogger(logger);
}
var Subject = /** @class */ (function () {
    function Subject(cancelCallback) {
        this.observers = [];
        this.cancelCallback = cancelCallback;
    }
    Subject.prototype.next = function (item) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.next(item);
        }
    };
    Subject.prototype.error = function (err) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            if (observer.error) {
                observer.error(err);
            }
        }
    };
    Subject.prototype.complete = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            if (observer.complete) {
                observer.complete();
            }
        }
    };
    Subject.prototype.subscribe = function (observer) {
        this.observers.push(observer);
        return new SubjectSubscription(this, observer);
    };
    return Subject;
}());

var SubjectSubscription = /** @class */ (function () {
    function SubjectSubscription(subject, observer) {
        this.subject = subject;
        this.observer = observer;
    }
    SubjectSubscription.prototype.dispose = function () {
        var index = this.subject.observers.indexOf(this.observer);
        if (index > -1) {
            this.subject.observers.splice(index, 1);
        }
        if (this.subject.observers.length === 0) {
            this.subject.cancelCallback().catch(function (_) { });
        }
    };
    return SubjectSubscription;
}());

var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger(minimumLogLevel) {
        this.minimumLogLevel = minimumLogLevel;
    }
    ConsoleLogger.prototype.log = function (logLevel, message) {
        if (logLevel >= this.minimumLogLevel) {
            switch (logLevel) {
                case _ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Critical:
                case _ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Error:
                    console.error(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"][logLevel] + ": " + message);
                    break;
                case _ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Warning:
                    console.warn(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"][logLevel] + ": " + message);
                    break;
                case _ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Information:
                    console.info(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"][logLevel] + ": " + message);
                    break;
                default:
                    // console.debug only goes to attached debuggers in Node, so we use console.log for Trace and Debug
                    console.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"][logLevel] + ": " + message);
                    break;
            }
        }
    };
    return ConsoleLogger;
}());

//# sourceMappingURL=Utils.js.map

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NullLogger", function() { return NullLogger; });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
/** A logger that does nothing when log messages are sent to it. */
var NullLogger = /** @class */ (function () {
    function NullLogger() {
    }
    /** @inheritDoc */
    NullLogger.prototype.log = function (logLevel, message) {
    };
    /** The singleton instance of the {@link NullLogger}. */
    NullLogger.instance = new NullLogger();
    return NullLogger;
}());

//# sourceMappingURL=Loggers.js.map

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HubConnectionBuilder", function() { return HubConnectionBuilder; });
/* harmony import */ var _HttpConnection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _HubConnection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _JsonHubProtocol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _Loggers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.





/** A builder for configuring {@link HubConnection} instances. */
var HubConnectionBuilder = /** @class */ (function () {
    function HubConnectionBuilder() {
    }
    HubConnectionBuilder.prototype.configureLogging = function (logging) {
        _Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isRequired(logging, "logging");
        if (isLogger(logging)) {
            this.logger = logging;
        }
        else {
            this.logger = new _Utils__WEBPACK_IMPORTED_MODULE_4__["ConsoleLogger"](logging);
        }
        return this;
    };
    HubConnectionBuilder.prototype.withUrl = function (url, transportTypeOrOptions) {
        _Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isRequired(url, "url");
        this.url = url;
        // Flow-typing knows where it's at. Since HttpTransportType is a number and IHttpConnectionOptions is guaranteed
        // to be an object, we know (as does TypeScript) this comparison is all we need to figure out which overload was called.
        if (typeof transportTypeOrOptions === "object") {
            this.httpConnectionOptions = transportTypeOrOptions;
        }
        else {
            this.httpConnectionOptions = {
                transport: transportTypeOrOptions,
            };
        }
        return this;
    };
    /** Configures the {@link HubConnection} to use the specified Hub Protocol.
     *
     * @param {IHubProtocol} protocol The {@link IHubProtocol} implementation to use.
     */
    HubConnectionBuilder.prototype.withHubProtocol = function (protocol) {
        _Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isRequired(protocol, "protocol");
        this.protocol = protocol;
        return this;
    };
    /** Creates a {@link HubConnection} from the configuration options specified in this builder.
     *
     * @returns {HubConnection} The configured {@link HubConnection}.
     */
    HubConnectionBuilder.prototype.build = function () {
        // If httpConnectionOptions has a logger, use it. Otherwise, override it with the one
        // provided to configureLogger
        var httpConnectionOptions = this.httpConnectionOptions || {};
        // If it's 'null', the user **explicitly** asked for null, don't mess with it.
        if (httpConnectionOptions.logger === undefined) {
            // If our logger is undefined or null, that's OK, the HttpConnection constructor will handle it.
            httpConnectionOptions.logger = this.logger;
        }
        // Now create the connection
        if (!this.url) {
            throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");
        }
        var connection = new _HttpConnection__WEBPACK_IMPORTED_MODULE_0__["HttpConnection"](this.url, httpConnectionOptions);
        return _HubConnection__WEBPACK_IMPORTED_MODULE_1__["HubConnection"].create(connection, this.logger || _Loggers__WEBPACK_IMPORTED_MODULE_3__["NullLogger"].instance, this.protocol || new _JsonHubProtocol__WEBPACK_IMPORTED_MODULE_2__["JsonHubProtocol"]());
    };
    return HubConnectionBuilder;
}());

function isLogger(logger) {
    return logger.log !== undefined;
}
//# sourceMappingURL=HubConnectionBuilder.js.map

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpConnection", function() { return HttpConnection; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _HttpClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _LongPollingTransport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
/* harmony import */ var _ServerSentEventsTransport__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var _WebSocketTransport__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(18);
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.








var MAX_REDIRECTS = 100;
var HttpConnection = /** @class */ (function () {
    function HttpConnection(url, options) {
        if (options === void 0) { options = {}; }
        this.features = {};
        _Utils__WEBPACK_IMPORTED_MODULE_6__["Arg"].isRequired(url, "url");
        this.logger = Object(_Utils__WEBPACK_IMPORTED_MODULE_6__["createLogger"])(options.logger);
        this.baseUrl = this.resolveUrl(url);
        options = options || {};
        options.accessTokenFactory = options.accessTokenFactory || (function () { return null; });
        options.logMessageContent = options.logMessageContent || false;
        this.httpClient = options.httpClient || new _HttpClient__WEBPACK_IMPORTED_MODULE_1__["DefaultHttpClient"](this.logger);
        this.connectionState = 2 /* Disconnected */;
        this.options = options;
    }
    HttpConnection.prototype.start = function (transferFormat) {
        transferFormat = transferFormat || _ITransport__WEBPACK_IMPORTED_MODULE_3__["TransferFormat"].Binary;
        _Utils__WEBPACK_IMPORTED_MODULE_6__["Arg"].isIn(transferFormat, _ITransport__WEBPACK_IMPORTED_MODULE_3__["TransferFormat"], "transferFormat");
        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug, "Starting connection with transfer format '" + _ITransport__WEBPACK_IMPORTED_MODULE_3__["TransferFormat"][transferFormat] + "'.");
        if (this.connectionState !== 2 /* Disconnected */) {
            return Promise.reject(new Error("Cannot start a connection that is not in the 'Disconnected' state."));
        }
        this.connectionState = 0 /* Connecting */;
        this.startPromise = this.startInternal(transferFormat);
        return this.startPromise;
    };
    HttpConnection.prototype.send = function (data) {
        if (this.connectionState !== 1 /* Connected */) {
            throw new Error("Cannot send data if the connection is not in the 'Connected' State.");
        }
        return this.transport.send(data);
    };
    HttpConnection.prototype.stop = function (error) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var e_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.connectionState = 2 /* Disconnected */;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.startPromise];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (!this.transport) return [3 /*break*/, 6];
                        this.stopError = error;
                        return [4 /*yield*/, this.transport.stop()];
                    case 5:
                        _a.sent();
                        this.transport = null;
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.startInternal = function (transferFormat) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            var url, negotiateResponse, redirects, _loop_1, this_1, state_1, e_2;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.baseUrl;
                        this.accessTokenFactory = this.options.accessTokenFactory;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 12, , 13]);
                        if (!this.options.skipNegotiation) return [3 /*break*/, 5];
                        if (!(this.options.transport === _ITransport__WEBPACK_IMPORTED_MODULE_3__["HttpTransportType"].WebSockets)) return [3 /*break*/, 3];
                        // No need to add a connection ID in this case
                        this.transport = this.constructTransport(_ITransport__WEBPACK_IMPORTED_MODULE_3__["HttpTransportType"].WebSockets);
                        // We should just call connect directly in this case.
                        // No fallback or negotiate in this case.
                        return [4 /*yield*/, this.transport.connect(url, transferFormat)];
                    case 2:
                        // We should just call connect directly in this case.
                        // No fallback or negotiate in this case.
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3: throw Error("Negotiation can only be skipped when using the WebSocket transport directly.");
                    case 4: return [3 /*break*/, 11];
                    case 5:
                        negotiateResponse = null;
                        redirects = 0;
                        _loop_1 = function () {
                            var accessToken_1;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this_1.getNegotiationResponse(url)];
                                    case 1:
                                        negotiateResponse = _a.sent();
                                        // the user tries to stop the connection when it is being started
                                        if (this_1.connectionState === 2 /* Disconnected */) {
                                            return [2 /*return*/, { value: void 0 }];
                                        }
                                        if (negotiateResponse.url) {
                                            url = negotiateResponse.url;
                                        }
                                        if (negotiateResponse.accessToken) {
                                            accessToken_1 = negotiateResponse.accessToken;
                                            this_1.accessTokenFactory = function () { return accessToken_1; };
                                        }
                                        redirects++;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 6;
                    case 6: return [5 /*yield**/, _loop_1()];
                    case 7:
                        state_1 = _a.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _a.label = 8;
                    case 8:
                        if (negotiateResponse.url && redirects < MAX_REDIRECTS) return [3 /*break*/, 6];
                        _a.label = 9;
                    case 9:
                        if (redirects === MAX_REDIRECTS && negotiateResponse.url) {
                            throw Error("Negotiate redirection limit exceeded.");
                        }
                        return [4 /*yield*/, this.createTransport(url, this.options.transport, negotiateResponse, transferFormat)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        if (this.transport instanceof _LongPollingTransport__WEBPACK_IMPORTED_MODULE_4__["LongPollingTransport"]) {
                            this.features.inherentKeepAlive = true;
                        }
                        this.transport.onreceive = this.onreceive;
                        this.transport.onclose = function (e) { return _this.stopConnection(e); };
                        // only change the state if we were connecting to not overwrite
                        // the state if the connection is already marked as Disconnected
                        this.changeState(0 /* Connecting */, 1 /* Connected */);
                        return [3 /*break*/, 13];
                    case 12:
                        e_2 = _a.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error, "Failed to start the connection: " + e_2);
                        this.connectionState = 2 /* Disconnected */;
                        this.transport = null;
                        throw e_2;
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.getNegotiationResponse = function (url) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var token, headers, negotiateUrl, response, e_3, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _b.sent();
                        if (token) {
                            headers = (_a = {},
                                _a["Authorization"] = "Bearer " + token,
                                _a);
                        }
                        negotiateUrl = this.resolveNegotiateUrl(url);
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug, "Sending negotiation request: " + negotiateUrl);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.httpClient.post(negotiateUrl, {
                                content: "",
                                headers: headers,
                            })];
                    case 3:
                        response = _b.sent();
                        if (response.statusCode !== 200) {
                            throw Error("Unexpected status code returned from negotiate " + response.statusCode);
                        }
                        return [2 /*return*/, JSON.parse(response.content)];
                    case 4:
                        e_3 = _b.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error, "Failed to complete negotiation with the server: " + e_3);
                        throw e_3;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.createConnectUrl = function (url, connectionId) {
        return url + (url.indexOf("?") === -1 ? "?" : "&") + ("id=" + connectionId);
    };
    HttpConnection.prototype.createTransport = function (url, requestedTransport, negotiateResponse, requestedTransferFormat) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var connectUrl, transports, _i, transports_1, endpoint, transport, ex_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connectUrl = this.createConnectUrl(url, negotiateResponse.connectionId);
                        if (!this.isITransport(requestedTransport)) return [3 /*break*/, 2];
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug, "Connection was provided an instance of ITransport, using that directly.");
                        this.transport = requestedTransport;
                        return [4 /*yield*/, this.transport.connect(connectUrl, requestedTransferFormat)];
                    case 1:
                        _a.sent();
                        // only change the state if we were connecting to not overwrite
                        // the state if the connection is already marked as Disconnected
                        this.changeState(0 /* Connecting */, 1 /* Connected */);
                        return [2 /*return*/];
                    case 2:
                        transports = negotiateResponse.availableTransports;
                        _i = 0, transports_1 = transports;
                        _a.label = 3;
                    case 3:
                        if (!(_i < transports_1.length)) return [3 /*break*/, 9];
                        endpoint = transports_1[_i];
                        this.connectionState = 0 /* Connecting */;
                        transport = this.resolveTransport(endpoint, requestedTransport, requestedTransferFormat);
                        if (!(typeof transport === "number")) return [3 /*break*/, 8];
                        this.transport = this.constructTransport(transport);
                        if (!(negotiateResponse.connectionId === null)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getNegotiationResponse(url)];
                    case 4:
                        negotiateResponse = _a.sent();
                        connectUrl = this.createConnectUrl(url, negotiateResponse.connectionId);
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.transport.connect(connectUrl, requestedTransferFormat)];
                    case 6:
                        _a.sent();
                        this.changeState(0 /* Connecting */, 1 /* Connected */);
                        return [2 /*return*/];
                    case 7:
                        ex_1 = _a.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error, "Failed to start the transport '" + _ITransport__WEBPACK_IMPORTED_MODULE_3__["HttpTransportType"][transport] + "': " + ex_1);
                        this.connectionState = 2 /* Disconnected */;
                        negotiateResponse.connectionId = null;
                        return [3 /*break*/, 8];
                    case 8:
                        _i++;
                        return [3 /*break*/, 3];
                    case 9: throw new Error("Unable to initialize any of the available transports.");
                }
            });
        });
    };
    HttpConnection.prototype.constructTransport = function (transport) {
        switch (transport) {
            case _ITransport__WEBPACK_IMPORTED_MODULE_3__["HttpTransportType"].WebSockets:
                return new _WebSocketTransport__WEBPACK_IMPORTED_MODULE_7__["WebSocketTransport"](this.accessTokenFactory, this.logger, this.options.logMessageContent);
            case _ITransport__WEBPACK_IMPORTED_MODULE_3__["HttpTransportType"].ServerSentEvents:
                return new _ServerSentEventsTransport__WEBPACK_IMPORTED_MODULE_5__["ServerSentEventsTransport"](this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent);
            case _ITransport__WEBPACK_IMPORTED_MODULE_3__["HttpTransportType"].LongPolling:
                return new _LongPollingTransport__WEBPACK_IMPORTED_MODULE_4__["LongPollingTransport"](this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent);
            default:
                throw new Error("Unknown transport: " + transport + ".");
        }
    };
    HttpConnection.prototype.resolveTransport = function (endpoint, requestedTransport, requestedTransferFormat) {
        var transport = _ITransport__WEBPACK_IMPORTED_MODULE_3__["HttpTransportType"][endpoint.transport];
        if (transport === null || transport === undefined) {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug, "Skipping transport '" + endpoint.transport + "' because it is not supported by this client.");
        }
        else {
            var transferFormats = endpoint.transferFormats.map(function (s) { return _ITransport__WEBPACK_IMPORTED_MODULE_3__["TransferFormat"][s]; });
            if (transportMatches(requestedTransport, transport)) {
                if (transferFormats.indexOf(requestedTransferFormat) >= 0) {
                    if ((transport === _ITransport__WEBPACK_IMPORTED_MODULE_3__["HttpTransportType"].WebSockets && typeof WebSocket === "undefined") ||
                        (transport === _ITransport__WEBPACK_IMPORTED_MODULE_3__["HttpTransportType"].ServerSentEvents && typeof EventSource === "undefined")) {
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug, "Skipping transport '" + _ITransport__WEBPACK_IMPORTED_MODULE_3__["HttpTransportType"][transport] + "' because it is not supported in your environment.'");
                    }
                    else {
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug, "Selecting transport '" + _ITransport__WEBPACK_IMPORTED_MODULE_3__["HttpTransportType"][transport] + "'");
                        return transport;
                    }
                }
                else {
                    this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug, "Skipping transport '" + _ITransport__WEBPACK_IMPORTED_MODULE_3__["HttpTransportType"][transport] + "' because it does not support the requested transfer format '" + _ITransport__WEBPACK_IMPORTED_MODULE_3__["TransferFormat"][requestedTransferFormat] + "'.");
                }
            }
            else {
                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug, "Skipping transport '" + _ITransport__WEBPACK_IMPORTED_MODULE_3__["HttpTransportType"][transport] + "' because it was disabled by the client.");
            }
        }
        return null;
    };
    HttpConnection.prototype.isITransport = function (transport) {
        return transport && typeof (transport) === "object" && "connect" in transport;
    };
    HttpConnection.prototype.changeState = function (from, to) {
        if (this.connectionState === from) {
            this.connectionState = to;
            return true;
        }
        return false;
    };
    HttpConnection.prototype.stopConnection = function (error) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.transport = null;
                // If we have a stopError, it takes precedence over the error from the transport
                error = this.stopError || error;
                if (error) {
                    this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error, "Connection disconnected with error '" + error + "'.");
                }
                else {
                    this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Information, "Connection disconnected.");
                }
                this.connectionState = 2 /* Disconnected */;
                if (this.onclose) {
                    this.onclose(error);
                }
                return [2 /*return*/];
            });
        });
    };
    HttpConnection.prototype.resolveUrl = function (url) {
        // startsWith is not supported in IE
        if (url.lastIndexOf("https://", 0) === 0 || url.lastIndexOf("http://", 0) === 0) {
            return url;
        }
        if (typeof window === "undefined" || !window || !window.document) {
            throw new Error("Cannot resolve '" + url + "'.");
        }
        // Setting the url to the href propery of an anchor tag handles normalization
        // for us. There are 3 main cases.
        // 1. Relative  path normalization e.g "b" -> "http://localhost:5000/a/b"
        // 2. Absolute path normalization e.g "/a/b" -> "http://localhost:5000/a/b"
        // 3. Networkpath reference normalization e.g "//localhost:5000/a/b" -> "http://localhost:5000/a/b"
        var aTag = window.document.createElement("a");
        aTag.href = url;
        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Information, "Normalizing '" + url + "' to '" + aTag.href + "'.");
        return aTag.href;
    };
    HttpConnection.prototype.resolveNegotiateUrl = function (url) {
        var index = url.indexOf("?");
        var negotiateUrl = url.substring(0, index === -1 ? url.length : index);
        if (negotiateUrl[negotiateUrl.length - 1] !== "/") {
            negotiateUrl += "/";
        }
        negotiateUrl += "negotiate";
        negotiateUrl += index === -1 ? "" : url.substring(index);
        return negotiateUrl;
    };
    return HttpConnection;
}());

function transportMatches(requestedTransport, actualTransport) {
    return !requestedTransport || ((actualTransport & requestedTransport) !== 0);
}
//# sourceMappingURL=HttpConnection.js.map

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpTransportType", function() { return HttpTransportType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransferFormat", function() { return TransferFormat; });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// This will be treated as a bit flag in the future, so we keep it using power-of-two values.
/** Specifies a specific HTTP transport type. */
var HttpTransportType;
(function (HttpTransportType) {
    /** Specifies no transport preference. */
    HttpTransportType[HttpTransportType["None"] = 0] = "None";
    /** Specifies the WebSockets transport. */
    HttpTransportType[HttpTransportType["WebSockets"] = 1] = "WebSockets";
    /** Specifies the Server-Sent Events transport. */
    HttpTransportType[HttpTransportType["ServerSentEvents"] = 2] = "ServerSentEvents";
    /** Specifies the Long Polling transport. */
    HttpTransportType[HttpTransportType["LongPolling"] = 4] = "LongPolling";
})(HttpTransportType || (HttpTransportType = {}));
/** Specifies the transfer format for a connection. */
var TransferFormat;
(function (TransferFormat) {
    /** Specifies that only text data will be transmitted over the connection. */
    TransferFormat[TransferFormat["Text"] = 1] = "Text";
    /** Specifies that binary data will be transmitted over the connection. */
    TransferFormat[TransferFormat["Binary"] = 2] = "Binary";
})(TransferFormat || (TransferFormat = {}));
//# sourceMappingURL=ITransport.js.map

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LongPollingTransport", function() { return LongPollingTransport; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _AbortController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.






var SHUTDOWN_TIMEOUT = 5 * 1000;
// Not exported from 'index', this type is internal.
var LongPollingTransport = /** @class */ (function () {
    function LongPollingTransport(httpClient, accessTokenFactory, logger, logMessageContent, shutdownTimeout) {
        this.httpClient = httpClient;
        this.accessTokenFactory = accessTokenFactory || (function () { return null; });
        this.logger = logger;
        this.pollAbort = new _AbortController__WEBPACK_IMPORTED_MODULE_1__["AbortController"]();
        this.logMessageContent = logMessageContent;
        this.shutdownTimeout = shutdownTimeout || SHUTDOWN_TIMEOUT;
    }
    Object.defineProperty(LongPollingTransport.prototype, "pollAborted", {
        // This is an internal type, not exported from 'index' so this is really just internal.
        get: function () {
            return this.pollAbort.aborted;
        },
        enumerable: true,
        configurable: true
    });
    LongPollingTransport.prototype.connect = function (url, transferFormat) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var pollOptions, token, closeError, pollUrl, response;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _Utils__WEBPACK_IMPORTED_MODULE_5__["Arg"].isRequired(url, "url");
                        _Utils__WEBPACK_IMPORTED_MODULE_5__["Arg"].isRequired(transferFormat, "transferFormat");
                        _Utils__WEBPACK_IMPORTED_MODULE_5__["Arg"].isIn(transferFormat, _ITransport__WEBPACK_IMPORTED_MODULE_4__["TransferFormat"], "transferFormat");
                        this.url = url;
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Trace, "(LongPolling transport) Connecting");
                        if (transferFormat === _ITransport__WEBPACK_IMPORTED_MODULE_4__["TransferFormat"].Binary && (typeof new XMLHttpRequest().responseType !== "string")) {
                            // This will work if we fix: https://github.com/aspnet/SignalR/issues/742
                            throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
                        }
                        pollOptions = {
                            abortSignal: this.pollAbort.signal,
                            headers: {},
                            timeout: 90000,
                        };
                        if (transferFormat === _ITransport__WEBPACK_IMPORTED_MODULE_4__["TransferFormat"].Binary) {
                            pollOptions.responseType = "arraybuffer";
                        }
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _a.sent();
                        this.updateHeaderToken(pollOptions, token);
                        pollUrl = url + "&_=" + Date.now();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Trace, "(LongPolling transport) polling: " + pollUrl);
                        return [4 /*yield*/, this.httpClient.get(pollUrl, pollOptions)];
                    case 2:
                        response = _a.sent();
                        if (response.statusCode !== 200) {
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Error, "(LongPolling transport) Unexpected response code: " + response.statusCode);
                            // Mark running as false so that the poll immediately ends and runs the close logic
                            closeError = new _Errors__WEBPACK_IMPORTED_MODULE_2__["HttpError"](response.statusText, response.statusCode);
                            this.running = false;
                        }
                        else {
                            this.running = true;
                        }
                        this.poll(this.url, pollOptions, closeError);
                        return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    LongPollingTransport.prototype.updateHeaderToken = function (request, token) {
        if (token) {
            // tslint:disable-next-line:no-string-literal
            request.headers["Authorization"] = "Bearer " + token;
            return;
        }
        // tslint:disable-next-line:no-string-literal
        if (request.headers["Authorization"]) {
            // tslint:disable-next-line:no-string-literal
            delete request.headers["Authorization"];
        }
    };
    LongPollingTransport.prototype.poll = function (url, pollOptions, closeError) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var token, pollUrl, response, e_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 8, 9]);
                        _a.label = 1;
                    case 1:
                        if (!this.running) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 2:
                        token = _a.sent();
                        this.updateHeaderToken(pollOptions, token);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        pollUrl = url + "&_=" + Date.now();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Trace, "(LongPolling transport) polling: " + pollUrl);
                        return [4 /*yield*/, this.httpClient.get(pollUrl, pollOptions)];
                    case 4:
                        response = _a.sent();
                        if (response.statusCode === 204) {
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Information, "(LongPolling transport) Poll terminated by server");
                            this.running = false;
                        }
                        else if (response.statusCode !== 200) {
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Error, "(LongPolling transport) Unexpected response code: " + response.statusCode);
                            // Unexpected status code
                            closeError = new _Errors__WEBPACK_IMPORTED_MODULE_2__["HttpError"](response.statusText, response.statusCode);
                            this.running = false;
                        }
                        else {
                            // Process the response
                            if (response.content) {
                                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Trace, "(LongPolling transport) data received. " + Object(_Utils__WEBPACK_IMPORTED_MODULE_5__["getDataDetail"])(response.content, this.logMessageContent));
                                if (this.onreceive) {
                                    this.onreceive(response.content);
                                }
                            }
                            else {
                                // This is another way timeout manifest.
                                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Trace, "(LongPolling transport) Poll timed out, reissuing.");
                            }
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        if (!this.running) {
                            // Log but disregard errors that occur after we were stopped by DELETE
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Trace, "(LongPolling transport) Poll errored after shutdown: " + e_1.message);
                        }
                        else {
                            if (e_1 instanceof _Errors__WEBPACK_IMPORTED_MODULE_2__["TimeoutError"]) {
                                // Ignore timeouts and reissue the poll.
                                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Trace, "(LongPolling transport) Poll timed out, reissuing.");
                            }
                            else {
                                // Close the connection with the error as the result.
                                closeError = e_1;
                                this.running = false;
                            }
                        }
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 1];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        // Indicate that we've stopped so the shutdown timer doesn't get registered.
                        this.stopped = true;
                        // Clean up the shutdown timer if it was registered
                        if (this.shutdownTimer) {
                            clearTimeout(this.shutdownTimer);
                        }
                        // Fire our onclosed event
                        if (this.onclose) {
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Trace, "(LongPolling transport) Firing onclose event. Error: " + (closeError || "<undefined>"));
                            this.onclose(closeError);
                        }
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Trace, "(LongPolling transport) Transport finished.");
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    LongPollingTransport.prototype.send = function (data) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (!this.running) {
                    return [2 /*return*/, Promise.reject(new Error("Cannot send until the transport is connected"))];
                }
                return [2 /*return*/, Object(_Utils__WEBPACK_IMPORTED_MODULE_5__["sendMessage"])(this.logger, "LongPolling", this.httpClient, this.url, this.accessTokenFactory, data, this.logMessageContent)];
            });
        });
    };
    LongPollingTransport.prototype.stop = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            var deleteOptions, token, response;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 3, 4]);
                        this.running = false;
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Trace, "(LongPolling transport) sending DELETE request to " + this.url + ".");
                        deleteOptions = {
                            headers: {},
                        };
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _a.sent();
                        this.updateHeaderToken(deleteOptions, token);
                        return [4 /*yield*/, this.httpClient.delete(this.url, deleteOptions)];
                    case 2:
                        response = _a.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Trace, "(LongPolling transport) DELETE request accepted.");
                        return [3 /*break*/, 4];
                    case 3:
                        // Abort the poll after the shutdown timeout if the server doesn't stop the poll.
                        if (!this.stopped) {
                            this.shutdownTimer = setTimeout(function () {
                                _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Warning, "(LongPolling transport) server did not terminate after DELETE request, canceling poll.");
                                // Abort any outstanding poll
                                _this.pollAbort.abort();
                            }, this.shutdownTimeout);
                        }
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return LongPollingTransport;
}());

//# sourceMappingURL=LongPollingTransport.js.map

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbortController", function() { return AbortController; });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Rough polyfill of https://developer.mozilla.org/en-US/docs/Web/API/AbortController
// We don't actually ever use the API being polyfilled, we always use the polyfill because
// it's a very new API right now.
// Not exported from index.
var AbortController = /** @class */ (function () {
    function AbortController() {
        this.isAborted = false;
    }
    AbortController.prototype.abort = function () {
        if (!this.isAborted) {
            this.isAborted = true;
            if (this.onabort) {
                this.onabort();
            }
        }
    };
    Object.defineProperty(AbortController.prototype, "signal", {
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbortController.prototype, "aborted", {
        get: function () {
            return this.isAborted;
        },
        enumerable: true,
        configurable: true
    });
    return AbortController;
}());

//# sourceMappingURL=AbortController.js.map

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerSentEventsTransport", function() { return ServerSentEventsTransport; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.




var ServerSentEventsTransport = /** @class */ (function () {
    function ServerSentEventsTransport(httpClient, accessTokenFactory, logger, logMessageContent) {
        this.httpClient = httpClient;
        this.accessTokenFactory = accessTokenFactory || (function () { return null; });
        this.logger = logger;
        this.logMessageContent = logMessageContent;
    }
    ServerSentEventsTransport.prototype.connect = function (url, transferFormat) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            var token;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _Utils__WEBPACK_IMPORTED_MODULE_3__["Arg"].isRequired(url, "url");
                        _Utils__WEBPACK_IMPORTED_MODULE_3__["Arg"].isRequired(transferFormat, "transferFormat");
                        _Utils__WEBPACK_IMPORTED_MODULE_3__["Arg"].isIn(transferFormat, _ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"], "transferFormat");
                        if (typeof (EventSource) === "undefined") {
                            throw new Error("'EventSource' is not supported in your environment.");
                        }
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Trace, "(SSE transport) Connecting");
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _a.sent();
                        if (token) {
                            url += (url.indexOf("?") < 0 ? "?" : "&") + ("access_token=" + encodeURIComponent(token));
                        }
                        this.url = url;
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var opened = false;
                                if (transferFormat !== _ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"].Text) {
                                    reject(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
                                }
                                var eventSource = new EventSource(url, { withCredentials: true });
                                try {
                                    eventSource.onmessage = function (e) {
                                        if (_this.onreceive) {
                                            try {
                                                _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Trace, "(SSE transport) data received. " + Object(_Utils__WEBPACK_IMPORTED_MODULE_3__["getDataDetail"])(e.data, _this.logMessageContent) + ".");
                                                _this.onreceive(e.data);
                                            }
                                            catch (error) {
                                                if (_this.onclose) {
                                                    _this.onclose(error);
                                                }
                                                return;
                                            }
                                        }
                                    };
                                    eventSource.onerror = function (e) {
                                        var error = new Error(e.message || "Error occurred");
                                        if (opened) {
                                            _this.close(error);
                                        }
                                        else {
                                            reject(error);
                                        }
                                    };
                                    eventSource.onopen = function () {
                                        _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Information, "SSE connected to " + _this.url);
                                        _this.eventSource = eventSource;
                                        opened = true;
                                        resolve();
                                    };
                                }
                                catch (e) {
                                    return Promise.reject(e);
                                }
                            })];
                }
            });
        });
    };
    ServerSentEventsTransport.prototype.send = function (data) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (!this.eventSource) {
                    return [2 /*return*/, Promise.reject(new Error("Cannot send until the transport is connected"))];
                }
                return [2 /*return*/, Object(_Utils__WEBPACK_IMPORTED_MODULE_3__["sendMessage"])(this.logger, "SSE", this.httpClient, this.url, this.accessTokenFactory, data, this.logMessageContent)];
            });
        });
    };
    ServerSentEventsTransport.prototype.stop = function () {
        this.close();
        return Promise.resolve();
    };
    ServerSentEventsTransport.prototype.close = function (e) {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
            if (this.onclose) {
                this.onclose(e);
            }
        }
    };
    return ServerSentEventsTransport;
}());

//# sourceMappingURL=ServerSentEventsTransport.js.map

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebSocketTransport", function() { return WebSocketTransport; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.




var WebSocketTransport = /** @class */ (function () {
    function WebSocketTransport(accessTokenFactory, logger, logMessageContent) {
        this.logger = logger;
        this.accessTokenFactory = accessTokenFactory || (function () { return null; });
        this.logMessageContent = logMessageContent;
    }
    WebSocketTransport.prototype.connect = function (url, transferFormat) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            var token;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _Utils__WEBPACK_IMPORTED_MODULE_3__["Arg"].isRequired(url, "url");
                        _Utils__WEBPACK_IMPORTED_MODULE_3__["Arg"].isRequired(transferFormat, "transferFormat");
                        _Utils__WEBPACK_IMPORTED_MODULE_3__["Arg"].isIn(transferFormat, _ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"], "transferFormat");
                        if (typeof (WebSocket) === "undefined") {
                            throw new Error("'WebSocket' is not supported in your environment.");
                        }
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Trace, "(WebSockets transport) Connecting");
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _a.sent();
                        if (token) {
                            url += (url.indexOf("?") < 0 ? "?" : "&") + ("access_token=" + encodeURIComponent(token));
                        }
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                url = url.replace(/^http/, "ws");
                                var webSocket = new WebSocket(url);
                                if (transferFormat === _ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"].Binary) {
                                    webSocket.binaryType = "arraybuffer";
                                }
                                webSocket.onopen = function (event) {
                                    _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Information, "WebSocket connected to " + url);
                                    _this.webSocket = webSocket;
                                    resolve();
                                };
                                webSocket.onerror = function (event) {
                                    reject(event.error);
                                };
                                webSocket.onmessage = function (message) {
                                    _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Trace, "(WebSockets transport) data received. " + Object(_Utils__WEBPACK_IMPORTED_MODULE_3__["getDataDetail"])(message.data, _this.logMessageContent) + ".");
                                    if (_this.onreceive) {
                                        _this.onreceive(message.data);
                                    }
                                };
                                webSocket.onclose = function (event) {
                                    // webSocket will be null if the transport did not start successfully
                                    _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Trace, "(WebSockets transport) socket closed.");
                                    if (_this.onclose) {
                                        if (event.wasClean === false || event.code !== 1000) {
                                            _this.onclose(new Error("Websocket closed with status code: " + event.code + " (" + event.reason + ")"));
                                        }
                                        else {
                                            _this.onclose();
                                        }
                                    }
                                };
                            })];
                }
            });
        });
    };
    WebSocketTransport.prototype.send = function (data) {
        if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Trace, "(WebSockets transport) sending data. " + Object(_Utils__WEBPACK_IMPORTED_MODULE_3__["getDataDetail"])(data, this.logMessageContent) + ".");
            this.webSocket.send(data);
            return Promise.resolve();
        }
        return Promise.reject("WebSocket is not in the OPEN state");
    };
    WebSocketTransport.prototype.stop = function () {
        if (this.webSocket) {
            this.webSocket.close();
            this.webSocket = null;
        }
        return Promise.resolve();
    };
    return WebSocketTransport;
}());

//# sourceMappingURL=WebSocketTransport.js.map

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonHubProtocol", function() { return JsonHubProtocol; });
/* harmony import */ var _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _Loggers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _TextMessageFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.





var JSON_HUB_PROTOCOL_NAME = "json";
/** Implements the JSON Hub Protocol. */
var JsonHubProtocol = /** @class */ (function () {
    function JsonHubProtocol() {
        /** @inheritDoc */
        this.name = JSON_HUB_PROTOCOL_NAME;
        /** @inheritDoc */
        this.version = 1;
        /** @inheritDoc */
        this.transferFormat = _ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"].Text;
    }
    /** Creates an array of {@link HubMessage} objects from the specified serialized representation.
     *
     * @param {string} input A string containing the serialized representation.
     * @param {ILogger} logger A logger that will be used to log messages that occur during parsing.
     */
    JsonHubProtocol.prototype.parseMessages = function (input, logger) {
        // The interface does allow "ArrayBuffer" to be passed in, but this implementation does not. So let's throw a useful error.
        if (typeof input !== "string") {
            throw new Error("Invalid input for JSON hub protocol. Expected a string.");
        }
        if (!input) {
            return [];
        }
        if (logger === null) {
            logger = _Loggers__WEBPACK_IMPORTED_MODULE_3__["NullLogger"].instance;
        }
        // Parse the messages
        var messages = _TextMessageFormat__WEBPACK_IMPORTED_MODULE_4__["TextMessageFormat"].parse(input);
        var hubMessages = [];
        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
            var message = messages_1[_i];
            var parsedMessage = JSON.parse(message);
            if (typeof parsedMessage.type !== "number") {
                throw new Error("Invalid payload.");
            }
            switch (parsedMessage.type) {
                case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__["MessageType"].Invocation:
                    this.isInvocationMessage(parsedMessage);
                    break;
                case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__["MessageType"].StreamItem:
                    this.isStreamItemMessage(parsedMessage);
                    break;
                case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__["MessageType"].Completion:
                    this.isCompletionMessage(parsedMessage);
                    break;
                case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__["MessageType"].Ping:
                    // Single value, no need to validate
                    break;
                case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__["MessageType"].Close:
                    // All optional values, no need to validate
                    break;
                default:
                    // Future protocol changes can add message types, old clients can ignore them
                    logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Information, "Unknown message type '" + parsedMessage.type + "' ignored.");
                    continue;
            }
            hubMessages.push(parsedMessage);
        }
        return hubMessages;
    };
    /** Writes the specified {@link HubMessage} to a string and returns it.
     *
     * @param {HubMessage} message The message to write.
     * @returns {string} A string containing the serialized representation of the message.
     */
    JsonHubProtocol.prototype.writeMessage = function (message) {
        return _TextMessageFormat__WEBPACK_IMPORTED_MODULE_4__["TextMessageFormat"].write(JSON.stringify(message));
    };
    JsonHubProtocol.prototype.isInvocationMessage = function (message) {
        this.assertNotEmptyString(message.target, "Invalid payload for Invocation message.");
        if (message.invocationId !== undefined) {
            this.assertNotEmptyString(message.invocationId, "Invalid payload for Invocation message.");
        }
    };
    JsonHubProtocol.prototype.isStreamItemMessage = function (message) {
        this.assertNotEmptyString(message.invocationId, "Invalid payload for StreamItem message.");
        if (message.item === undefined) {
            throw new Error("Invalid payload for StreamItem message.");
        }
    };
    JsonHubProtocol.prototype.isCompletionMessage = function (message) {
        if (message.result && message.error) {
            throw new Error("Invalid payload for Completion message.");
        }
        if (!message.result && message.error) {
            this.assertNotEmptyString(message.error, "Invalid payload for Completion message.");
        }
        this.assertNotEmptyString(message.invocationId, "Invalid payload for Completion message.");
    };
    JsonHubProtocol.prototype.assertNotEmptyString = function (value, errorMessage) {
        if (typeof value !== "string" || value === "") {
            throw new Error(errorMessage);
        }
    };
    return JsonHubProtocol;
}());

//# sourceMappingURL=JsonHubProtocol.js.map

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _Configuration_ConfigurationManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54);
/* harmony import */ var _Ships_ShipManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(96);
/* harmony import */ var _Bullets_BulletManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(97);
/* harmony import */ var _Powerups_PowerupManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(98);
/* harmony import */ var _Debug_DebugManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(99);
/* harmony import */ var _HUD_HUDManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(107);
/* harmony import */ var _GameScreen__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(83);
/* harmony import */ var _Ships_Graphics_ShipBodyGraphic__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(57);
/* harmony import */ var _User_UserShipManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(116);
/* harmony import */ var _Space_Map__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(73);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();











var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(gameCanvas, gameScreen, serverAdapter, initializationData) {
        var _this = _super.call(this, gameCanvas) || this;
        Game.GameConfiguration = new _Configuration_ConfigurationManager__WEBPACK_IMPORTED_MODULE_1__["ConfigurationManager"](initializationData.Configuration);
        _this.Configuration.CollisionConfiguration.MinQuadTreeNodeSize = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"](75); // Size of a ship
        _this.Configuration.CollisionConfiguration.InitialQuadTreeSize = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"](10125); // Initial Map Size x 2
        _this._bufferedViewport = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Bounds"].BoundingRectangle(_this.Scene.Camera.Position, _this.Scene.Camera.Size.Add(_GameScreen__WEBPACK_IMPORTED_MODULE_7__["GameScreen"].SCREEN_BUFFER_AREA));
        _this._shipManager = new _Ships_ShipManager__WEBPACK_IMPORTED_MODULE_2__["ShipManager"](_this._bufferedViewport, _this.Scene, _this.CollisionManager, _this.Content);
        _this._shipManager.Initialize(new _User_UserShipManager__WEBPACK_IMPORTED_MODULE_9__["UserShipManager"](initializationData.ShipID, _this._shipManager, _this.CollisionManager, _this.Input, _this.Scene.Camera, serverAdapter));
        _this._bulletManager = new _Bullets_BulletManager__WEBPACK_IMPORTED_MODULE_3__["BulletManager"](_this._bufferedViewport, _this.Scene, _this.Content);
        _this._powerupManager = new _Powerups_PowerupManager__WEBPACK_IMPORTED_MODULE_4__["PowerupManager"](_this._bufferedViewport, _this.Scene, _this.Content);
        _this._map = new _Space_Map__WEBPACK_IMPORTED_MODULE_10__["Map"](_this.Scene, _this.CollisionManager, _this.Content, _this.Input.Keyboard, serverAdapter);
        _this._debugManager = new _Debug_DebugManager__WEBPACK_IMPORTED_MODULE_5__["DebugManager"](initializationData.ShipID, _this, serverAdapter);
        _this._hud = new _HUD_HUDManager__WEBPACK_IMPORTED_MODULE_6__["HUDManager"](initializationData, _this._shipManager, _this._map.AreaRenderer, _this.Input.Keyboard, serverAdapter);
        serverAdapter.OnPayload.Bind(function (payload) {
            _this._shipManager.LoadPayload(payload);
            _this._bulletManager.LoadPayload(payload);
            _this._powerupManager.LoadPayload(payload);
            _this._hud.LoadPayload(payload);
            _this._debugManager.LoadPayload(payload);
        });
        gameScreen.OnResize.Bind(function (newSize) {
            _this._hud.OnScreenResize(newSize);
            _this._bufferedViewport.Size = newSize.Add(_GameScreen__WEBPACK_IMPORTED_MODULE_7__["GameScreen"].SCREEN_BUFFER_AREA);
        });
        return _this;
    }
    Game.prototype.LoadContent = function () {
        this.Content.LoadImage("StarBackground", "/Images/bg_stars.png", 1000, 1000);
        this.Content.LoadImage("BulletExplosion", "/Images/SpriteSheets/explosion_1.png", 320, 320);
        this.Content.LoadImage("ShipExplosion", "/Images/SpriteSheets/explosion_2.png", 768, 640);
        this.Content.LoadImage("Bullet", "/Images/Laser.png", 13, 13);
        this.Content.LoadImage("Ship1", "/Images/Ships/ship_lvl1.png", 75, 75);
        this.Content.LoadImage("Ship3", "/Images/Ships/ship_lvl3.png", 75, 75);
        this.Content.LoadImage("Ship5", "/Images/Ships/ship_lvl5.png", 75, 75);
        this.Content.LoadImage("Ship7", "/Images/Ships/ship_lvl7.png", 75, 75);
        this.Content.LoadImage("Ship8", "/Images/Ships/ship_lvl8.png", 75, 75);
        this.Content.LoadImage("Ship9", "/Images/Ships/ship_lvl9.png", 75, 75);
        this.Content.LoadImage("Ship10", "/Images/Ships/ship_lvl10.png", 75, 75);
        this.Content.LoadImage("Ship12", "/Images/Ships/LaserCat.png", 75, 75);
        this.Content.LoadImage("Thrust", "/Images/SpriteSheets/thrust_basic.png", 468, 100);
        this.Content.LoadImage("ThrustStart", "/Images/SpriteSheets/thrust_start.png", 468, 100);
        this.Content.LoadImage("Boost", "/Images/SpriteSheets/thrusters-BOOST.png", 400, 150);
        this.Content.LoadImage("HealthPack", "/Images/SpriteSheets/health_pack.png", 450, 100);
        this.Content.LoadImage("ShipDamage1", "/Images/Ships/Damage/damage_1.png", 75, 75);
        this.Content.LoadImage("ShipDamage3", "/Images/Ships/Damage/damage_2.png", 75, 75);
        this.Content.LoadImage("ShipDamage5", "/Images/Ships/Damage/damage_3.png", 75, 75);
        this.Content.LoadImage("ShipDamage7", "/Images/Ships/Damage/damage_4.png", 75, 75);
        _Ships_Graphics_ShipBodyGraphic__WEBPACK_IMPORTED_MODULE_8__["ShipBodyGraphic"].LoadShipBodies(this.Content);
    };
    Game.prototype.Update = function (gameTime) {
        this._bufferedViewport.Position = this.Scene.Camera.Position;
        this._shipManager.Update(gameTime);
        this._bulletManager.Update(gameTime);
        this._powerupManager.Update(gameTime);
        this._hud.Update(gameTime);
        this._debugManager.Update(gameTime);
    };
    // Most drawing takes place via the Scene.
    // This method can be used to draw items to the game screen with raw canvas API's.
    // I don't do this because there's no need :), i only update the debug manager in order to track the draw rate.
    Game.prototype.Draw = function (context) {
        this._debugManager.Draw(context);
    };
    return Game;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Game"]));



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Bounds_Bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bounds", function() { return _Bounds_Bounds__WEBPACK_IMPORTED_MODULE_0__["Bounds"]; });

/* harmony import */ var _Collision_Collision__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Collision", function() { return _Collision_Collision__WEBPACK_IMPORTED_MODULE_1__["Collision"]; });

/* harmony import */ var _Graphics_Graphics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Graphics", function() { return _Graphics_Graphics__WEBPACK_IMPORTED_MODULE_2__["Graphics"]; });

/* harmony import */ var _Input_Input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(35);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return _Input_Input__WEBPACK_IMPORTED_MODULE_3__["Input"]; });

/* harmony import */ var _InputControllers_InputControllers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(37);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InputControllers", function() { return _InputControllers_InputControllers__WEBPACK_IMPORTED_MODULE_4__["InputControllers"]; });

/* harmony import */ var _MapLoaders_MapLoaders__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(39);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MapLoaders", function() { return _MapLoaders_MapLoaders__WEBPACK_IMPORTED_MODULE_5__["MapLoaders"]; });

/* harmony import */ var _MovementControllers_MovementControllers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(38);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MovementControllers", function() { return _MovementControllers_MovementControllers__WEBPACK_IMPORTED_MODULE_6__["MovementControllers"]; });

/* harmony import */ var _Particles_Particles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(40);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Particles", function() { return _Particles_Particles__WEBPACK_IMPORTED_MODULE_7__["Particles"]; });

/* harmony import */ var _Rendering_Rendering__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(43);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rendering", function() { return _Rendering_Rendering__WEBPACK_IMPORTED_MODULE_8__["Rendering"]; });

/* harmony import */ var _Sound_Sound__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(44);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sound", function() { return _Sound_Sound__WEBPACK_IMPORTED_MODULE_9__["Sound"]; });

/* harmony import */ var _Tweening_Tweening__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(41);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tweening", function() { return _Tweening_Tweening__WEBPACK_IMPORTED_MODULE_10__["Tweening"]; });

/* harmony import */ var _Content_Content__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(45);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Content", function() { return _Content_Content__WEBPACK_IMPORTED_MODULE_11__["Content"]; });

/* harmony import */ var _Tweening_Functions_Functions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(42);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TweeningFunctions", function() { return _Tweening_Functions_Functions__WEBPACK_IMPORTED_MODULE_12__["Functions"]; });

/* harmony import */ var _Utilities_EventHandler__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(30);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventHandler", function() { return _Utilities_EventHandler__WEBPACK_IMPORTED_MODULE_13__["EventHandler"]; });

/* harmony import */ var _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(29);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventHandler1", function() { return _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_14__["EventHandler1"]; });

/* harmony import */ var _Utilities_EventHandler2__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(31);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventHandler2", function() { return _Utilities_EventHandler2__WEBPACK_IMPORTED_MODULE_15__["EventHandler2"]; });

/* harmony import */ var _Utilities_EventHandler3__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(46);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventHandler3", function() { return _Utilities_EventHandler3__WEBPACK_IMPORTED_MODULE_16__["EventHandler3"]; });

/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(47);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return _Game__WEBPACK_IMPORTED_MODULE_17__["Game"]; });

/* harmony import */ var _GameConfiguration__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(49);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GameConfiguration", function() { return _GameConfiguration__WEBPACK_IMPORTED_MODULE_18__["GameConfiguration"]; });

/* harmony import */ var _GameTime__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(48);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GameTime", function() { return _GameTime__WEBPACK_IMPORTED_MODULE_19__["GameTime"]; });

/* harmony import */ var _Assets_Matrixes_Matrix2x2__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(53);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Matrix2x2", function() { return _Assets_Matrixes_Matrix2x2__WEBPACK_IMPORTED_MODULE_20__["Matrix2x2"]; });

/* harmony import */ var _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(28);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Size2d", function() { return _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_21__["Size2d"]; });

/* harmony import */ var _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(33);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimeSpan", function() { return _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_22__["TimeSpan"]; });

/* harmony import */ var _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(23);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vector2d", function() { return _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_23__["Vector2d"]; });



























/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bounds", function() { return Bounds; });
/* harmony import */ var _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _Assets_Vectors_Helpers_Vector2dHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Bounds;
(function (Bounds) {
    /**
    * Abstract bounds type that is used to detect intersections.
    */
    var Bounds2d = /** @class */ (function () {
        function Bounds2d(position, rotation) {
            this._boundsType = "Bounds2d";
            this.Position = position;
            this.Rotation = rotation || 0;
        }
        /**
        * Abstract: Scales the size of the bounded object.
        * @param x Value to multiply the horizontal component by.
        * @param y Value to multiply the vertical component by.
        */
        Bounds2d.prototype.Scale = function (x, y) {
            throw new Error("This method is abstract!");
        };
        /**
        * Abstract: Determines if the current bounded object contains the provided Vector2d.
        * @param point A point.
        */
        Bounds2d.prototype.ContainsPoint = function (point) {
            throw new Error("This method is abstract!");
        };
        /**
        * Abstract: Determines if the current bounded object completely contains the provided BoundingCircle.
        * @param circle A circle to check containment on.
        */
        Bounds2d.prototype.ContainsCircle = function (circle) {
            throw new Error("This method is abstract!");
        };
        /**
        * Abstract: Determines if the current bounded object completely contains the provided BoundingRectangle.
        * @param rectangle A rectangle to check containment on.
        */
        Bounds2d.prototype.ContainsRectangle = function (rectangle) {
            throw new Error("This method is abstract!");
        };
        Bounds2d.prototype.Contains = function (obj) {
            if (obj._boundsType === "BoundingCircle") {
                return this.ContainsCircle(obj);
            }
            else if (obj._boundsType === "BoundingRectangle") {
                return this.ContainsRectangle(obj);
            }
            else if (obj._type === "Vector2d") {
                return this.ContainsPoint(obj);
            }
            else {
                throw new Error("Cannot try and check contains with an unidentifiable object, must be a Vector2d, BoundingCircle or BoundingRectangle.");
            }
        };
        Bounds2d.prototype.Intersects = function (obj) {
            if (obj._boundsType === "BoundingCircle") {
                return this.IntersectsCircle(obj);
            }
            else if (obj._boundsType === "BoundingRectangle") {
                return this.IntersectsRectangle(obj);
            }
            else {
                throw new Error("Cannot intersect with unidentifiable object, must be BoundingCircle or BoundingRectangle.");
            }
        };
        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        Bounds2d.prototype.IntersectsCircle = function (circle) {
            throw new Error("This method is abstract!");
        };
        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        Bounds2d.prototype.IntersectsRectangle = function (rectangle) {
            throw new Error("This method is abstract!");
        };
        return Bounds2d;
    }());
    Bounds.Bounds2d = Bounds2d;
    /**
    * Defines a circle that can be used to detect intersections.
    */
    var BoundingCircle = /** @class */ (function (_super) {
        __extends(BoundingCircle, _super);
        /**
        * Creates a new instance of BoundingCircle.
        * @param position Initial Position of the BoundingCircle.
        * @param radius Initial Radius of the BoundingCircle.
        */
        function BoundingCircle(position, radius) {
            var _this = _super.call(this, position) || this;
            _this._type = "BoundingCircle";
            _this._boundsType = "BoundingCircle";
            _this.Radius = radius;
            return _this;
        }
        /**
        * Scales the radius of the BoundingCircle.
        * @param scale Value to multiply the radius by.
        */
        BoundingCircle.prototype.Scale = function (scale) {
            // This is an overloaded version of Bounds2d Scale but we don't care
            // about the second parameter within a BoundingCircle
            this.Radius *= scale;
        };
        /**
        * Calculates the area of the BoundingCircle.
        */
        BoundingCircle.prototype.Area = function () {
            return Math.PI * this.Radius * this.Radius;
        };
        /**
        * Calculates the circumference of the BoundingCircle.
        */
        BoundingCircle.prototype.Circumference = function () {
            return 2 * Math.PI * this.Radius;
        };
        /**
        * Determines if the current BoundingCircle is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        BoundingCircle.prototype.IntersectsCircle = function (circle) {
            return this.Position.Distance(circle.Position).Length() < this.Radius + circle.Radius;
        };
        /**
        * Determines if the current BoundingCircle is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        BoundingCircle.prototype.IntersectsRectangle = function (rectangle) {
            var translated = (rectangle.Rotation === 0)
                ? this.Position
                : this.Position.RotateAround(rectangle.Position, -rectangle.Rotation);
            var circleDistance = translated.Distance(rectangle.Position);
            if (circleDistance.X > (rectangle.Size.HalfWidth + this.Radius)) {
                return false;
            }
            if (circleDistance.Y > (rectangle.Size.HalfHeight + this.Radius)) {
                return false;
            }
            if (circleDistance.X <= (rectangle.Size.HalfWidth)) {
                return true;
            }
            if (circleDistance.Y <= (rectangle.Size.HalfHeight)) {
                return true;
            }
            var cornerDistance_sq = Math.pow(circleDistance.X - rectangle.Size.HalfWidth, 2) + Math.pow(circleDistance.Y - rectangle.Size.HalfHeight, 2);
            return (cornerDistance_sq <= (this.Radius * this.Radius));
        };
        /**
        * Determines if the current BoundingCircle contains the provided Vector2d.
        * @param point A point.
        */
        BoundingCircle.prototype.ContainsPoint = function (point) {
            return this.Position.Distance(point).Magnitude() < this.Radius;
        };
        /**
        * Determines if the current BoundingCircle completely contains the provided BoundingCircle.
        * @param circle A circle to check containment on.
        */
        BoundingCircle.prototype.ContainsCircle = function (circle) {
            return circle.Position.Distance(this.Position).Length() + circle.Radius <= this.Radius;
        };
        /**
        * Determines if the current BoundingCircle completely contains the provided BoundingRectangle.
        * @param rectangle A rectangle to check containment on.
        */
        BoundingCircle.prototype.ContainsRectangle = function (rectangle) {
            var corners = rectangle.Corners();
            for (var i = 0; i < corners.length; i++) {
                if (!this.ContainsPoint(corners[i])) {
                    return false;
                }
            }
            return true;
        };
        return BoundingCircle;
    }(Bounds2d));
    Bounds.BoundingCircle = BoundingCircle;
    /**
    * Defines a rectangle that can be used to detect intersections.
    */
    var BoundingRectangle = /** @class */ (function (_super) {
        __extends(BoundingRectangle, _super);
        /**
        * Creates a new instance of BoundingRectangle.
        * @param position Initial Position of the BoundingRectangle.
        * @param size Initial Size of the BoundingRectangle.
        */
        function BoundingRectangle(position, size) {
            var _this = _super.call(this, position) || this;
            _this._type = "BoundingRectangle";
            _this._boundsType = "BoundingRectangle";
            _this.Size = size;
            return _this;
        }
        /**
        * Scales the width and height of the BoundingRectangle.
        * @param x Value to multiply the width by.
        * @param y Value to multiply the height by.
        */
        BoundingRectangle.prototype.Scale = function (x, y) {
            this.Size.Width *= x;
            this.Size.Height *= y;
        };
        Object.defineProperty(BoundingRectangle.prototype, "TopLeft", {
            /**
            * Gets the top left corner of the BoundingRectangle.
            */
            get: function () {
                if (this.Rotation === 0) {
                    return new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](this.Position.X - this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight);
                }
                return new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](this.Position.X - this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoundingRectangle.prototype, "TopRight", {
            /**
            * Gets the top right corner of the BoundingRectangle.
            */
            get: function () {
                if (this.Rotation === 0) {
                    return new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](this.Position.X + this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight);
                }
                return new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](this.Position.X + this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoundingRectangle.prototype, "BotLeft", {
            /**
            * Gets the bottom left corner of the BoundingRectangle.
            */
            get: function () {
                if (this.Rotation === 0) {
                    return new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](this.Position.X - this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight);
                }
                return new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](this.Position.X - this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoundingRectangle.prototype, "BotRight", {
            /**
            * Gets the bottom right corner of the BoundingRectangle.
            */
            get: function () {
                if (this.Rotation === 0) {
                    return new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](this.Position.X + this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight);
                }
                return new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](this.Position.X + this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Returns a list of vertices that are the locations of each corner of the BoundingRectangle. Format: [TopLeft, TopRight, BotLeft, BotRight].
        */
        BoundingRectangle.prototype.Corners = function () {
            return [this.TopLeft, this.TopRight, this.BotLeft, this.BotRight];
        };
        /**
        * Determines if the current BoundingRectangle is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        BoundingRectangle.prototype.IntersectsCircle = function (circle) {
            return circle.IntersectsRectangle(this);
        };
        /**
        * Determines if the current BoundingRectangle is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        BoundingRectangle.prototype.IntersectsRectangle = function (rectangle) {
            if (this.Rotation === 0 && rectangle.Rotation === 0) {
                var myTopLeft = this.TopLeft, myBotRight = this.BotRight, theirTopLeft = rectangle.TopLeft, theirBotRight = rectangle.BotRight;
                return theirTopLeft.X <= myBotRight.X && theirBotRight.X >= myTopLeft.X && theirTopLeft.Y <= myBotRight.Y && theirBotRight.Y >= myTopLeft.Y;
            }
            else if (rectangle.Position.Distance(this.Position).Magnitude() <= rectangle.Size.Radius + this.Size.Radius) { // Check if we're somewhat close to the rectangle ect that we might be colliding with
                var axisList = [this.TopRight.Subtract(this.TopLeft), this.TopRight.Subtract(this.BotRight), rectangle.TopLeft.Subtract(rectangle.BotLeft), rectangle.TopLeft.Subtract(rectangle.TopRight)];
                var myVertices = this.Corners();
                var theirVertices = rectangle.Corners();
                for (var i = 0; i < axisList.length; i++) {
                    var axi = axisList[i];
                    var myProjections = _Assets_Vectors_Helpers_Vector2dHelpers__WEBPACK_IMPORTED_MODULE_1__["Vector2dHelpers"].GetMinMaxProjections(axi, myVertices);
                    var theirProjections = _Assets_Vectors_Helpers_Vector2dHelpers__WEBPACK_IMPORTED_MODULE_1__["Vector2dHelpers"].GetMinMaxProjections(axi, theirVertices);
                    // No collision
                    if (theirProjections.Max < myProjections.Min || myProjections.Max < theirProjections.Min) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        };
        /**
        * Determines if the current BoundingRectangle contains the provided Vector2d.
        * @param point A point.
        */
        BoundingRectangle.prototype.ContainsPoint = function (point) {
            var savedRotation = this.Rotation;
            if (this.Rotation !== 0) {
                this.Rotation = 0;
                point = point.RotateAround(this.Position, -savedRotation);
            }
            var myTopLeft = this.TopLeft, myBotRight = this.BotRight;
            this.Rotation = savedRotation;
            return point.X <= myBotRight.X && point.X >= myTopLeft.X && point.Y <= myBotRight.Y && point.Y >= myTopLeft.Y;
        };
        /**
        * Determines if the current BoundingRectangle completely contains the provided BoundingCircle.
        * @param circle A circle to check containment on.
        */
        BoundingRectangle.prototype.ContainsCircle = function (circle) {
            return this.ContainsPoint(new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](circle.Position.X - circle.Radius, circle.Position.Y)) &&
                this.ContainsPoint(new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](circle.Position.X, circle.Position.Y - circle.Radius)) &&
                this.ContainsPoint(new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](circle.Position.X + circle.Radius, circle.Position.Y)) &&
                this.ContainsPoint(new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](circle.Position.X, circle.Position.Y + circle.Radius));
        };
        /**
        * Determines if the current BoundingCircle completely contains the provided BoundingRectangle.
        * @param rectangle A rectangle to check containment on.
        */
        BoundingRectangle.prototype.ContainsRectangle = function (rectangle) {
            var corners = rectangle.Corners();
            for (var i = 0; i < corners.length; i++) {
                if (!this.ContainsPoint(corners[i])) {
                    return false;
                }
            }
            return true;
        };
        return BoundingRectangle;
    }(Bounds2d));
    Bounds.BoundingRectangle = BoundingRectangle;
})(Bounds || (Bounds = {}));


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector2d", function() { return Vector2d; });
/* harmony import */ var _Extensions_MathExtensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);

/**
* Defines a two dimensional vector object which specifies an X and Y.
*/
var Vector2d = /** @class */ (function () {
    function Vector2d(x, y) {
        this._type = "Vector2d";
        this.X = x || 0;
        this.Y = y || 0;
    }
    Object.defineProperty(Vector2d, "Zero", {
        /**
        * Returns a Vector2d with all its components set to zero.
        */
        get: function () {
            return new Vector2d(0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2d, "One", {
        /**
        * Returns a Vector2d with all its components set to one.
        */
        get: function () {
            return new Vector2d(1, 1);
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Returns a Vector2d that's reflected over the normal.
    * @param normal The normal to reflect over.
    */
    Vector2d.prototype.Reflect = function (normal) {
        var normalUnit = normal.Unit(), num = this.Dot(normalUnit) * 2;
        return new Vector2d(this.X - num * normalUnit.X, this.Y - num * normalUnit.Y);
    };
    /**
    * Returns a Vector2d that represents the current Vector2d projected onto the provided Vector2d.
    * @param vector Source vector.
    */
    Vector2d.prototype.ProjectOnto = function (vector) {
        return vector.Multiply(this.Dot(vector) / vector.Dot(vector));
    };
    Vector2d.prototype.RotateAround = function (point, angle, precision) {
        if (precision === void 0) { precision = 2; }
        var ca = Math.cos(angle);
        var sa = Math.sin(angle);
        return new Vector2d(Object(_Extensions_MathExtensions__WEBPACK_IMPORTED_MODULE_0__["MathRoundTo"])(ca * (this.X - point.X) - sa * (this.Y - point.Y) + point.X, precision), Object(_Extensions_MathExtensions__WEBPACK_IMPORTED_MODULE_0__["MathRoundTo"])(sa * (this.X - point.X) + ca * (this.Y - point.Y) + point.Y, precision));
    };
    /**
    * Executes the action with the X and Y components of this Vector2d and sets the X and Y components to the corresponding return values.
    * @param action The function used to modify the X and Y components.
    */
    Vector2d.prototype.Apply = function (action) {
        this.X = action(this.X);
        this.Y = action(this.Y);
    };
    /**
    * Executes the action with the X and Y components of this Vector2d.
    * @param action The function to pass the X and Y components to.
    */
    Vector2d.prototype.Trigger = function (action) {
        action(this.X);
        action(this.Y);
    };
    /**
    * Returns the current vector as a unit vector. The result is a vector one unit in length pointing in the same direction as the original vector.
    */
    Vector2d.prototype.Normalized = function () {
        var magnitude = this.Magnitude();
        return new Vector2d(this.X / magnitude, this.Y / magnitude);
    };
    /**
    * Calculates the magnitude or length of the vector
    */
    Vector2d.prototype.Magnitude = function () {
        return Math.sqrt(this.X * this.X + this.Y * this.Y);
    };
    /**
    * Calculates the length or magnitude of the vector
    */
    Vector2d.prototype.Length = function () {
        return this.Magnitude();
    };
    /**
    * Calculates dot product.
    * @param vector Source vector.
    */
    Vector2d.prototype.Dot = function (vector) {
        return vector.X * this.X + vector.Y * this.Y;
    };
    /**
    * Returns a Vector2d that has the current Vector2d's X and Y components as positive values.
    */
    Vector2d.prototype.Abs = function () {
        return new Vector2d(Math.abs(this.X), Math.abs(this.Y));
    };
    /**
    * Returns a Vector2d that has its X and Y components converted to -1, 0 or 1 depending on the current Vector2d's component values.
    */
    Vector2d.prototype.Sign = function () {
        return new Vector2d(this.X / Math.abs(this.X), this.Y / Math.abs(this.Y));
    };
    /**
    * Returns the unit vector of the current vector.
    */
    Vector2d.prototype.Unit = function () {
        var magnitude = this.Magnitude();
        return new Vector2d(this.X / magnitude, this.Y / magnitude);
    };
    /**
    * Calculates the distance between the current vector and the provided one.
    */
    Vector2d.prototype.Distance = function (vector) {
        return new Vector2d(Math.abs(vector.X - this.X), Math.abs(vector.Y - this.Y));
    };
    Vector2d.prototype.Add = function (val) {
        if (val._type === "Vector2d") {
            return new Vector2d(this.X + val.X, this.Y + val.Y);
        }
        else if (val._type === "Size2d") {
            return new Vector2d(this.X + val.Width, this.Y + val.Height);
        }
        else {
            return new Vector2d(this.X + val, this.Y + val);
        }
    };
    Vector2d.prototype.Multiply = function (val) {
        if (val._type === "Vector2d") {
            return new Vector2d(this.X * val.X, this.Y * val.Y);
        }
        else if (val._type === "Size2d") {
            return new Vector2d(this.X * val.Width, this.Y * val.Height);
        }
        else {
            return new Vector2d(this.X * val, this.Y * val);
        }
    };
    Vector2d.prototype.Subtract = function (val) {
        if (val._type === "Vector2d") {
            return new Vector2d(this.X - val.X, this.Y - val.Y);
        }
        else if (val._type === "Size2d") {
            return new Vector2d(this.X - val.Width, this.Y - val.Height);
        }
        else {
            return new Vector2d(this.X - val, this.Y - val);
        }
    };
    Vector2d.prototype.SubtractFrom = function (val) {
        if (val._type === "Vector2d") {
            return new Vector2d(val.X - this.X, val.Y - this.Y);
        }
        else if (val._type === "Size2d") {
            return new Vector2d(val.Width - this.X, val.Height = this.Y);
        }
        else {
            return new Vector2d(val - this.X, val - this.Y);
        }
    };
    Vector2d.prototype.Divide = function (val) {
        if (val._type === "Vector2d") {
            return new Vector2d(this.X / val.X, this.Y / val.Y);
        }
        else if (val._type === "Size2d") {
            return new Vector2d(this.X / val.Width, this.Y / val.Height);
        }
        else {
            return new Vector2d(this.X / val, this.Y / val);
        }
    };
    Vector2d.prototype.DivideFrom = function (val) {
        if (val._type === "Vector2d") {
            return new Vector2d(val.X / this.X, val.Y / this.Y);
        }
        else if (val._type === "Size2d") {
            return new Vector2d(val.Width / this.X, val.Height / this.Y);
        }
        else {
            return new Vector2d(val / this.X, val / this.Y);
        }
    };
    /**
    * Determines whether this Vector2d's X and Y components are zero.
    */
    Vector2d.prototype.IsZero = function () {
        return this.X === 0 && this.Y === 0;
    };
    /**
    * Returns a Vector2d that is the negated version of this Vector2d.
    */
    Vector2d.prototype.Negate = function () {
        return new Vector2d(this.X * -1, this.Y * -1);
    };
    /**
    * Determines whether this Vector2d has the same X and Y of the provided Vector2d.
    * @param vector The Vector2d to compare the current Vector2d to.
    */
    Vector2d.prototype.Equivalent = function (vector) {
        return this.X === vector.X && this.Y === vector.Y;
    };
    /**
    * Returns a Vector2d that has an identical X and Y component as the current Vector2d.
    */
    Vector2d.prototype.Clone = function () {
        return new Vector2d(this.X, this.Y);
    };
    /**
    * Overridden toString method to display Vector2d in the (X, Y) format.
    */
    Vector2d.prototype.toString = function () {
        return "(" + this.X + ", " + this.Y + ")";
    };
    return Vector2d;
}());



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MathRoundTo", function() { return MathRoundTo; });
function MathRoundTo(val, decimals) {
    var multiplier = Math.pow(10, decimals);
    return Math.round(val * multiplier) / multiplier;
}
;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector2dHelpers", function() { return Vector2dHelpers; });
/* harmony import */ var _MinMax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);

var Vector2dHelpers = /** @class */ (function () {
    function Vector2dHelpers() {
    }
    Vector2dHelpers.GetMinMaxProjections = function (axis, vertices) {
        var min = vertices[0].ProjectOnto(axis).Dot(axis);
        var max = min;
        for (var i = 1; i < vertices.length; i++) {
            var vertex = vertices[i];
            var value = vertex.ProjectOnto(axis).Dot(axis);
            if (value < min) {
                min = value;
            }
            else if (value > max) {
                max = value;
            }
        }
        return new _MinMax__WEBPACK_IMPORTED_MODULE_0__["MinMax"](min, max);
    };
    return Vector2dHelpers;
}());



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinMax", function() { return MinMax; });
var MinMax = /** @class */ (function () {
    function MinMax(min, max) {
        this.Min = min;
        this.Max = max;
    }
    return MinMax;
}());



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Collision", function() { return Collision; });
/* harmony import */ var _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var _Bounds_Bounds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* harmony import */ var _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _Utilities_EventHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(30);
/* harmony import */ var _Utilities_EventHandler2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(31);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var Collision;
(function (Collision) {
    /**
    * Defines a collidable object that can be used to detect collisions with other objects.
    */
    var Collidable = /** @class */ (function () {
        /**
        * Creates a new instance of Collidable.
        * @param bounds Initial bounds for the Collidable.
        */
        function Collidable(bounds) {
            this._type = "Collidable";
            this._disposed = false;
            this.Bounds = bounds;
            this._id = Collidable._collidableIDs++;
            this._onCollision = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_2__["EventHandler1"]();
            this._onDisposed = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_2__["EventHandler1"]();
        }
        Object.defineProperty(Collidable.prototype, "OnCollision", {
            /**
            * Gets an event that is triggered when a collision happens.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onCollision;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collidable.prototype, "OnDisposed", {
            /**
            * Gets an event that is triggered when the Collidable has been disposed.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onDisposed;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Determines if the provided collidable is colliding with this Collidable.
        * @param other Collidable to check collision with.
        */
        Collidable.prototype.IsCollidingWith = function (other) {
            return this.Bounds.Intersects(other.Bounds);
        };
        /**
        * Triggers the OnCollision event.  Can also be overridden from derived classes to be called when a collision occurs if the collidable is being used with a CollisionManager
        * @param data Collision information related to the collision.
        */
        Collidable.prototype.Collided = function (data) {
            this.OnCollision.Trigger(data);
        };
        /**
        * Triggers the OnDisposed event.  If this Collidable is used with a CollisionManager it will be unmonitored when disposed.
        */
        Collidable.prototype.Dispose = function () {
            if (!this._disposed) {
                this._disposed = true;
                this.OnDisposed.Trigger(this);
                this.OnDisposed.Dispose();
                this.OnCollision.Dispose();
            }
            else {
                throw new Error("Cannot dispose collidable more than once.");
            }
        };
        Collidable._collidableIDs = 0;
        return Collidable;
    }());
    Collision.Collidable = Collidable;
    /**
    * Defines a CollisionConfiguration object that is used to configure and optimize the collision manager.
    */
    var CollisionConfiguration = /** @class */ (function () {
        function CollisionConfiguration(initialQuadTreeSize) {
            this._initialQuadTreeSize = initialQuadTreeSize;
            this._minQuadTreeNodeSize = CollisionConfiguration._DefaultMinQuadTreeNodeSize;
            this._OnChange = new _Utilities_EventHandler__WEBPACK_IMPORTED_MODULE_4__["EventHandler"]();
        }
        Object.defineProperty(CollisionConfiguration.prototype, "MinQuadTreeNodeSize", {
            /**
            * Gets or sets the minimum quad tree node size.  For best performance this value should be equivalent to the smallest collidable object that will be monitored by the CollisionManager.  Changing this value re-creates the collision manager.  Values must represent a square.
            */
            get: function () {
                return this._minQuadTreeNodeSize.Clone();
            },
            set: function (newSize) {
                if (newSize.Width !== newSize.Height) {
                    throw new Error("MinQuadTreeNodeSize must be a square.  Width and height must be identical.");
                }
                this._minQuadTreeNodeSize = newSize;
                this._OnChange.Trigger();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CollisionConfiguration.prototype, "InitialQuadTreeSize", {
            /**
            * Gets or sets the initial quad tree size.  The quad tree used for collision detection will dynamically grow in size if items drift outside of its boundaries.  If this property is set it will re-instantiate a new quad tree.  Values must be divisible by the MinQuadTreeNodeSize and must represent a square.
            */
            get: function () {
                return this._initialQuadTreeSize;
            },
            set: function (newSize) {
                if (newSize.Width !== newSize.Height) {
                    throw new Error("InitialQuadTreeSize must be a square.  Width and height must be identical.");
                }
                else if (newSize.Width % this._minQuadTreeNodeSize.Width !== 0) {
                    throw new Error("InitialQuadTreeSize must be divisible by the MinQuadTreeNodeSize.");
                }
                this._initialQuadTreeSize = newSize;
                this._OnChange.Trigger();
            },
            enumerable: true,
            configurable: true
        });
        CollisionConfiguration._DefaultMinQuadTreeNodeSize = new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_0__["Size2d"](32);
        return CollisionConfiguration;
    }());
    Collision.CollisionConfiguration = CollisionConfiguration;
    /**
    * Defines a data object that is used to describe a collision event.
    */
    var CollisionData = /** @class */ (function () {
        /**
        * Creates a new instance of the CollisionData object.
        * @param w Initial value of the With component of CollisionData.
        */
        function CollisionData(w) {
            this.With = w;
        }
        return CollisionData;
    }());
    Collision.CollisionData = CollisionData;
    /**
    * Defines a manager that will check for collisions between objects that it is monitoring.
    */
    var CollisionManager = /** @class */ (function () {
        /**
        * Creates a new instance of CollisionManager.
        */
        function CollisionManager(configuration) {
            this._type = "CollisionManager";
            this._collidables = [];
            this._nonStaticCollidables = [];
            this._quadTree = new QuadTree(configuration);
            this._enabled = false;
            this._disposed = false;
            this._onCollision = new _Utilities_EventHandler2__WEBPACK_IMPORTED_MODULE_5__["EventHandler2"]();
        }
        Object.defineProperty(CollisionManager.prototype, "OnCollision", {
            /**
            * Gets an event that is triggered when a collision happens among two of the monitored objects.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onCollision;
            },
            enumerable: true,
            configurable: true
        });
        CollisionManager.prototype.Monitor = function (obj, staticPosition) {
            var _this = this;
            if (staticPosition === void 0) { staticPosition = false; }
            var mapping = {
                Collidable: obj,
                Unmonitor: function (collidable) {
                    _this.Unmonitor(collidable);
                }
            };
            this._enabled = true;
            obj.OnDisposed.Bind(mapping.Unmonitor);
            this._collidables.push(mapping);
            if (!staticPosition) {
                this._nonStaticCollidables.push(obj);
            }
            this._quadTree.Insert(obj);
        };
        /**
        * Unmonitors the provided collidable.  The Collided function and OnCollision event will no longer be triggered when an actual collision may have occurred.
        * Disposing a monitored collidable will automatically be unmonitored
        * @param obj Collidable to unmonitor.
        */
        CollisionManager.prototype.Unmonitor = function (obj) {
            var index;
            for (var i = 0; i < this._collidables.length; i++) {
                if (this._collidables[i].Collidable._id === obj._id) {
                    this._collidables[i].Collidable.OnDisposed.Unbind(this._collidables[i].Unmonitor);
                    this._collidables.splice(i, 1);
                    break;
                }
            }
            index = this._nonStaticCollidables.indexOf(obj);
            if (index >= 0) {
                this._nonStaticCollidables.splice(index, 1);
            }
            this._quadTree.Remove(obj);
        };
        /**
        * Checks for collisions within its monitored objects.  Games CollisionManager's automatically have their Update functions called at the beginning of each update loop.
        * @param gameTime The current game time object.
        */
        CollisionManager.prototype.Update = function (gameTime) {
            var collidable, hash, candidates, cacheMap = {}, colliding = new Array();
            if (this._enabled) {
                // Update the structure of the quad tree, this accounts for moving objects
                this._quadTree.Update(gameTime);
                // Determine colliding objects
                for (var i = 0; i < this._nonStaticCollidables.length; i++) {
                    collidable = this._nonStaticCollidables[i];
                    candidates = this._quadTree.CollisionCandidates(collidable);
                    for (var j = 0; j < candidates.length; j++) {
                        // If we're colliding with someone else
                        if (collidable._id !== candidates[j]._id && collidable.IsCollidingWith(candidates[j])) {
                            colliding.push([collidable, candidates[j]]);
                        }
                    }
                }
                // Dispatch collision events
                for (var i = 0; i < colliding.length; i++) {
                    hash = this.HashIds(colliding[i][0], colliding[i][1]);
                    if (!cacheMap[hash]) {
                        cacheMap[hash] = true;
                        colliding[i][0].Collided(new CollisionData(colliding[i][1]));
                        colliding[i][1].Collided(new CollisionData(colliding[i][0]));
                        this.OnCollision.Trigger(colliding[i][0], colliding[i][1]);
                    }
                }
            }
        };
        /**
        * Destroys removes all monitored collidables and destroys the collision manager.
        */
        CollisionManager.prototype.Dispose = function () {
            if (!this._disposed) {
                this._disposed = true;
                for (var i = 0; i < this._collidables.length; i++) {
                    this.Unmonitor(this._collidables[i].Collidable);
                }
                this._collidables = [];
                this._nonStaticCollidables = [];
                this._onCollision.Dispose();
                delete this._quadTree;
            }
            else {
                throw new Error("CollisionManager cannot be disposed more than once");
            }
        };
        CollisionManager.prototype.HashIds = function (c1, c2) {
            return Math.min(c1._id, c2._id).toString() + Math.max(c2._id, c1._id).toString();
        };
        return CollisionManager;
    }());
    Collision.CollisionManager = CollisionManager;
    var QuadTree = /** @class */ (function () {
        function QuadTree(configuration) {
            this._disposed = false;
            this._minNodeSize = configuration.MinQuadTreeNodeSize;
            this._collidableMap = {};
            this._updateableCollidableMap = {};
            this._root = new QuadTreeNode(new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_3__["Vector2d"](configuration.InitialQuadTreeSize.HalfWidth, configuration.InitialQuadTreeSize.HalfHeight), configuration.InitialQuadTreeSize, configuration.MinQuadTreeNodeSize, null);
        }
        QuadTree.prototype.Insert = function (obj, staticPosition) {
            if (staticPosition === void 0) { staticPosition = false; }
            if (!this._root.Bounds.Contains(obj.Bounds)) {
                this.Expand(obj);
            }
            this._collidableMap[obj._id] = {
                Node: this._root.Insert(obj),
                Collidable: obj,
                StaticPosition: staticPosition
            };
            if (!staticPosition) {
                this._updateableCollidableMap[obj._id] = this._collidableMap[obj._id];
            }
        };
        QuadTree.prototype.Remove = function (obj) {
            var node = this._collidableMap[obj._id].Node;
            delete this._collidableMap[obj._id];
            delete this._updateableCollidableMap[obj._id];
            node.Remove(obj);
        };
        QuadTree.prototype.CollisionCandidates = function (obj) {
            var node = this._collidableMap[obj._id].Node, results = node.GetSubTreeContents();
            // Collect parent contents
            while (node.Parent !== null) {
                results = results.concat(node.Parent.Contents);
                node = node.Parent;
            }
            return results;
        };
        QuadTree.prototype.Query = function (queryArea) {
            return this._root.Query(queryArea);
        };
        QuadTree.prototype.Expand = function (cause) {
            var rootBounds = this._root.Bounds, topLeftDistance = rootBounds.TopLeft.Distance(cause.Bounds.Position).Length(), topRightDistance = rootBounds.TopRight.Distance(cause.Bounds.Position).Length(), botLeftDistance = rootBounds.BotLeft.Distance(cause.Bounds.Position).Length(), botRightDistance = rootBounds.BotRight.Distance(cause.Bounds.Position).Length(), closestCornerDistance = Math.min(topLeftDistance, topRightDistance, botLeftDistance, botRightDistance), newSize = rootBounds.Size.Multiply(2), newRoot;
            if (closestCornerDistance === topLeftDistance) { // Current root will be bottom right of expanded quad tree because we need to expand to the top left
                newRoot = new QuadTreeNode(rootBounds.TopLeft, newSize, this._minNodeSize, null);
                newRoot.Partition();
                newRoot.BotRightChild = this._root;
            }
            else if (closestCornerDistance === topRightDistance) { // Current root will be bottom left of expanded quad tree because we need to expand to the top right
                newRoot = new QuadTreeNode(rootBounds.TopRight, newSize, this._minNodeSize, null);
                newRoot.Partition();
                newRoot.BotLeftChild = this._root;
            }
            else if (closestCornerDistance === botLeftDistance) { // Current root will be top right of expanded quad tree because we need to expand to the bottom left
                newRoot = new QuadTreeNode(rootBounds.BotLeft, newSize, this._minNodeSize, null);
                newRoot.Partition();
                newRoot.TopRightChild = this._root;
            }
            else if (closestCornerDistance === botRightDistance) { // Current root will be top left of expanded quad tree because we need to expand to the bottom right
                newRoot = new QuadTreeNode(rootBounds.BotRight, newSize, this._minNodeSize, null);
                newRoot.Partition();
                newRoot.TopLeftChild = this._root;
            }
            else {
                throw new Error("Unexpected collision.");
            }
            this._root.Parent = newRoot;
            this._root = newRoot;
        };
        QuadTree.prototype.Update = function (gameTime) {
            var node, lookup, collidable, newNode;
            for (var id in this._updateableCollidableMap) {
                lookup = this._updateableCollidableMap[id];
                node = lookup.Node;
                collidable = lookup.Collidable;
                node.Remove(collidable);
                // If one of the collidables has drifted outside the root bounds, expand the quad tree
                if (!this._root.Bounds.Contains(collidable.Bounds)) {
                    this.Expand(collidable);
                    newNode = this._root.Insert(collidable);
                }
                else {
                    // Check if object has left the bounds of this node and is not root
                    if (!node.Bounds.Contains(collidable.Bounds) && node.Parent != null) {
                        // We now belong to a parent
                        newNode = node.Parent.ReverseInsert(collidable);
                    }
                    else // We're within the same node, but could be in children, must insert
                     {
                        newNode = node.Insert(collidable);
                    }
                }
                // This will update the _collidableMap as well since its referencing the same object.
                this._updateableCollidableMap[id].Node = newNode;
            }
        };
        QuadTree.prototype.Dispose = function () {
            if (!this._disposed) {
                this._disposed = true;
            }
            else {
                throw new Error("Cannot dispose collidable more than once.");
            }
        };
        return QuadTree;
    }());
    Collision.QuadTree = QuadTree;
    var QuadTreeNode = /** @class */ (function (_super) {
        __extends(QuadTreeNode, _super);
        function QuadTreeNode(position, size, minNodeSize, parent) {
            var _this = _super.call(this, new _Bounds_Bounds__WEBPACK_IMPORTED_MODULE_1__["Bounds"].BoundingRectangle(position, size)) || this;
            _this._minNodeSize = minNodeSize;
            _this._children = new Array();
            _this.Contents = new Array();
            _this.Parent = parent;
            _this._partitioned = false;
            return _this;
        }
        Object.defineProperty(QuadTreeNode.prototype, "Children", {
            get: function () {
                return this._children;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QuadTreeNode.prototype, "TopLeftChild", {
            get: function () {
                return this._children[0];
            },
            set: function (newChild) {
                this._children[0] = newChild;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QuadTreeNode.prototype, "TopRightChild", {
            get: function () {
                return this._children[1];
            },
            set: function (newChild) {
                this._children[1] = newChild;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QuadTreeNode.prototype, "BotLeftChild", {
            get: function () {
                return this._children[2];
            },
            set: function (newChild) {
                this._children[2] = newChild;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QuadTreeNode.prototype, "BotRightChild", {
            get: function () {
                return this._children[3];
            },
            set: function (newChild) {
                this._children[3] = newChild;
            },
            enumerable: true,
            configurable: true
        });
        QuadTreeNode.prototype.IsPartitioned = function () {
            return this._partitioned;
        };
        QuadTreeNode.prototype.Partition = function () {
            var partitionedSize = new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_0__["Size2d"](Math.round(this.Bounds.Size.Width * .5)), boundsPosition = this.Bounds.Position;
            this._partitioned = true;
            if (partitionedSize.Width < this._minNodeSize.Width) {
                return;
            }
            this._children.push(new QuadTreeNode(boundsPosition.Subtract(partitionedSize.Multiply(.5)), partitionedSize, this._minNodeSize, this));
            this._children.push(new QuadTreeNode(new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_3__["Vector2d"](boundsPosition.X + partitionedSize.Width / 2, boundsPosition.Y - partitionedSize.Height / 2), partitionedSize, this._minNodeSize, this));
            this._children.push(new QuadTreeNode(new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_3__["Vector2d"](boundsPosition.X - partitionedSize.Width / 2, boundsPosition.Y + partitionedSize.Height / 2), partitionedSize, this._minNodeSize, this));
            this._children.push(new QuadTreeNode(boundsPosition.Add(partitionedSize.Multiply(.5)), partitionedSize, this._minNodeSize, this));
        };
        QuadTreeNode.prototype.Insert = function (obj) {
            if (!this._partitioned) {
                this.Partition();
            }
            for (var i = 0; i < this._children.length; i++) {
                if (this._children[i].Bounds.Contains(obj.Bounds)) {
                    return this._children[i].Insert(obj);
                }
            }
            this.Contents.push(obj);
            return this;
        };
        QuadTreeNode.prototype.ReverseInsert = function (obj) {
            // Check if object has left the bounds of this node then go up another level
            if (!this.Bounds.Contains(obj.Bounds)) {
                if (this.Parent != null) {
                    return this.Parent.ReverseInsert(obj);
                }
            }
            return this.Insert(obj);
        };
        QuadTreeNode.prototype.Query = function (queryArea) {
            var results = new Array(), child;
            // Check if some of the items in this quadrant are partially contained within the query area
            for (var i = 0; i < this.Contents.length; i++) {
                if (queryArea.Intersects(this.Contents[i].Bounds)) {
                    results.push(this.Contents[i]);
                }
            }
            for (var i = 0; i < this._children.length; i++) {
                child = this._children[i];
                // If child fully contains the query area then we need to
                // drill down until we find all of the query items
                if (child.Bounds.Contains(queryArea)) {
                    results = results.concat(child.Query(queryArea));
                    break;
                }
                // If the queryArea fully contains the node then everything
                // underneath it belongs to the query
                if (queryArea.Contains(child.Bounds)) {
                    results = results.concat(child.GetSubTreeContents());
                    continue;
                }
                // If a sub-node intersects partially with the query then we
                // need to query its children to find valid nodes
                if (child.Bounds.Intersects(queryArea)) {
                    results = results.concat(child.Query(queryArea));
                }
            }
            return results;
        };
        QuadTreeNode.prototype.Remove = function (obj) {
            var index = this.Contents.indexOf(obj);
            if (index >= 0) {
                this.Contents.splice(index, 1);
            }
        };
        QuadTreeNode.prototype.GetSubTreeContents = function () {
            var results = new Array();
            for (var i = 0; i < this._children.length; i++) {
                results = results.concat(this._children[i].GetSubTreeContents());
            }
            results = results.concat(this.Contents);
            return results;
        };
        return QuadTreeNode;
    }(Collidable));
    Collision.QuadTreeNode = QuadTreeNode;
})(Collision || (Collision = {}));


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Size2d", function() { return Size2d; });
/**
* Defines a two dimensional size object which specifies a Width and Height.
*/
var Size2d = /** @class */ (function () {
    function Size2d(first, second) {
        this._type = "Size2d";
        this.Width = first || 0;
        this.Height = typeof second !== "undefined" ? second : this.Width;
    }
    Object.defineProperty(Size2d, "Zero", {
        /**
        * Returns a Size2d with all its components set to zero.
        */
        get: function () {
            return new Size2d(0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Size2d, "One", {
        /**
        * Returns a Size2d with all its components set to one.
        */
        get: function () {
            return new Size2d(1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Size2d.prototype, "Radius", {
        /**
        * Gets the radius that encompasses the two dimensional size of this Size2d.
        */
        get: function () {
            return .5 * Math.sqrt(this.Width * this.Width + this.Height * this.Height);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Size2d.prototype, "HalfWidth", {
        /**
        * Gets half of the Width component of this Size2d.
        */
        get: function () {
            return this.Width / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Size2d.prototype, "HalfHeight", {
        /**
        * Gets half of the Height component of this Size2d.
        */
        get: function () {
            return this.Height / 2;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Executes the action with the Width and Height of this Size2d and sets the Width and Height to the corresponding return values.
    * @param action The function used to modify the Width and Height.
    */
    Size2d.prototype.Apply = function (action) {
        this.Width = action(this.Width);
        this.Height = action(this.Height);
    };
    /**
    * Executes the action with the Width and Height of this Size2d.
    * @param action The function to pass the Width and Height components to.
    */
    Size2d.prototype.Trigger = function (action) {
        action(this.Width);
        action(this.Height);
    };
    Size2d.prototype.Add = function (val) {
        if (val._type === "Size2d") {
            return new Size2d(this.Width + val.Width, this.Height + val.Height);
        }
        else if (val._type === "Vector2d") {
            return new Size2d(this.Width + val.X, this.Height + val.Y);
        }
        else {
            return new Size2d(this.Width + val, this.Height + val);
        }
    };
    Size2d.prototype.Multiply = function (val) {
        if (val._type === "Size2d") {
            return new Size2d(this.Width * val.Width, this.Height * val.Height);
        }
        else if (val._type === "Vector2d") {
            return new Size2d(this.Width * val.X, this.Height * val.Y);
        }
        else {
            return new Size2d(this.Width * val, this.Height * val);
        }
    };
    Size2d.prototype.Subtract = function (val) {
        if (val._type === "Size2d") {
            return new Size2d(this.Width - val.Width, this.Height - val.Height);
        }
        else if (val._type === "Vector2d") {
            return new Size2d(this.Width - val.X, this.Height - val.Y);
        }
        else {
            return new Size2d(this.Width - val, this.Height - val);
        }
    };
    Size2d.prototype.SubtractFrom = function (val) {
        if (val._type === "Size2d") {
            return new Size2d(val.Width - this.Width, val.Height - this.Height);
        }
        else if (val._type === "Vector2d") {
            return new Size2d(val.X - this.Width, val.Y - this.Height);
        }
        else {
            return new Size2d(val - this.Width, val - this.Height);
        }
    };
    Size2d.prototype.Divide = function (val) {
        if (val._type === "Size2d") {
            return new Size2d(this.Width / val.Width, this.Height / val.Height);
        }
        else if (val._type === "Vector2d") {
            return new Size2d(this.Width / val.X, this.Height / val.Y);
        }
        else {
            return new Size2d(this.Width / val, this.Height / val);
        }
    };
    Size2d.prototype.DivideFrom = function (val) {
        if (val._type === "Size2d") {
            return new Size2d(val.Width / this.Width, val.Height / this.Height);
        }
        else if (val._type === "Vector2d") {
            return new Size2d(val.X / this.Width, val.Y / this.Height);
        }
        else {
            return new Size2d(val / this.Width, val / this.Height);
        }
    };
    /**
    * Returns a Size2d that is the negated version of this Size2d.
    */
    Size2d.prototype.Negate = function () {
        return new Size2d(this.Width * -1, this.Height * -1);
    };
    /**
    * Determines whether this Size2d has the same Width and Height of another Size2d.
    * @param size The Size2d to compare the current Size2d to.
    */
    Size2d.prototype.Equivalent = function (size) {
        return this.Width === size.Width && this.Height === size.Height;
    };
    /**
    * Returns a Size2d that has identical Width's and Height's as the current Size2d.
    */
    Size2d.prototype.Clone = function () {
        return new Size2d(this.Width, this.Height);
    };
    /**
    * Overridden toString method to display Size2d in the (Width, Height) format.
    */
    Size2d.prototype.toString = function () {
        return "(" + this.Width + ", " + this.Height + ")";
    };
    return Size2d;
}());



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventHandler1", function() { return EventHandler1; });
/**
* Defines a type constrained event handler object that can maintain bound functions which take in a value T and trigger them on demand.
*/
var EventHandler1 = /** @class */ (function () {
    /**
    * Creates a new instance of the EventHandler object.
    */
    function EventHandler1() {
        this._type = "EventHandler1";
        this._actions = [];
    }
    /**
    * Binds the provided action to the EventHandler1.  Trigger will execute all bound functions.
    * @param action Function to execute on EventHandler Trigger.
    */
    EventHandler1.prototype.Bind = function (action) {
        this._actions.push(action);
    };
    /**
    * Binds the provided action to the EventHandler1 for the specified number of triggers.  Once all triggers have been fired the action will unbind itself.  Trigger will execute all bound functions.
    * @param action Function to execute on EventHandler Trigger.
    * @param triggerCount Number of triggers to wait before unbinding the action.
    */
    EventHandler1.prototype.BindFor = function (action, triggerCount) {
        var that = this, triggers = 0, wire = function () {
            if (++triggers >= triggerCount) {
                that.Unbind(wire);
            }
            // @ts-ignore
            action.apply(this, arguments);
        };
        this._actions.push(wire);
    };
    /**
    * Unbinds the provided action from the EventHandler1.
    * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
    */
    EventHandler1.prototype.Unbind = function (action) {
        for (var i = 0; i < this._actions.length; i++) {
            if (this._actions[i] === action) {
                this._actions.splice(i, 1);
                return;
            }
        }
    };
    /**
    * Determines if the EventHandler1 has active bindings.
    */
    EventHandler1.prototype.HasBindings = function () {
        return this._actions.length > 0;
    };
    /**
    * Executes all bound functions and passes the provided args to each.
    * @param val The argument to pass to the bound functions.
    */
    EventHandler1.prototype.Trigger = function (val) {
        var actions;
        if (this.HasBindings()) {
            // Clone array so unbinds happening via triggers do not affect functionality
            actions = this._actions.slice(0);
            for (var i = 0; i < actions.length; i++) {
                actions[i](val);
            }
        }
    };
    /**
    * Disposes the event handler and unbinds all bound events.
    */
    EventHandler1.prototype.Dispose = function () {
        // Clear the array
        this._actions = [];
    };
    return EventHandler1;
}());



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventHandler", function() { return EventHandler; });
/**
* Defines an event handler object that can maintain bound functions and trigger them on demand.
*/
var EventHandler = /** @class */ (function () {
    /**
    * Creates a new instance of the EventHandler object.
    */
    function EventHandler() {
        this._type = "EventHandler";
        this._actions = [];
    }
    /**
    * Binds the provided action to the EventHandler.  Trigger will execute all bound functions.
    * @param action Function to execute on EventHandler Trigger.
    */
    EventHandler.prototype.Bind = function (action) {
        this._actions.push(action);
    };
    /**
    * Binds the provided action to the EventHandler for the specified number of triggers.  Once all triggers have been fired the EventHandler will unbind itself.  Trigger will execute all bound functions.
    * @param action Function to execute on EventHandler Trigger.
    * @param triggerCount Number of triggers to wait before unbinding the action.
    */
    EventHandler.prototype.BindFor = function (action, triggerCount) {
        var that = this, triggers = 0, wire = function () {
            if (++triggers >= triggerCount) {
                that.Unbind(wire);
            }
            // @ts-ignore
            action.apply(this, arguments);
        };
        this._actions.push(wire);
    };
    /**
    * Unbinds the provided action from the EventHandler.
    * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
    */
    EventHandler.prototype.Unbind = function (action) {
        for (var i = 0; i < this._actions.length; i++) {
            if (this._actions[i] === action) {
                this._actions.splice(i, 1);
                return;
            }
        }
    };
    /**
    * Determines if the EventHandler has active bindings.
    */
    EventHandler.prototype.HasBindings = function () {
        return this._actions.length > 0;
    };
    /**
    * Executes all bound functions and passes the provided args to each.
    */
    EventHandler.prototype.Trigger = function () {
        var actions;
        if (this.HasBindings()) {
            // Clone array so unbinds happening via triggers do not affect functionality
            actions = this._actions.slice(0);
            for (var i = 0; i < actions.length; i++) {
                actions[i]();
            }
        }
    };
    /**
    * Disposes the event handler and unbinds all bound events.
    */
    EventHandler.prototype.Dispose = function () {
        // Clear the array
        this._actions = [];
    };
    return EventHandler;
}());



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventHandler2", function() { return EventHandler2; });
/**
* Defines a type constrained event handler object that can maintain bound functions which take in a value T and U and trigger them on demand.
*/
var EventHandler2 = /** @class */ (function () {
    /**
    * Creates a new instance of the EventHandler2 object.
    */
    function EventHandler2() {
        this._type = "EventHandler2";
        this._actions = [];
    }
    /**
    * Binds the provided action to the EventHandler2.  Trigger will execute all bound functions.
    * @param action Function to execute on EventHandler2 Trigger.
    */
    EventHandler2.prototype.Bind = function (action) {
        this._actions.push(action);
    };
    /**
    * Binds the provided action to the EventHandler2 for the specified number of triggers.  Once all triggers have been fired the action will unbind itself.  Trigger will execute all bound functions.
    * @param action Function to execute on EventHandler2 Trigger.
    * @param triggerCount Number of triggers to wait before unbinding the action.
    */
    EventHandler2.prototype.BindFor = function (action, triggerCount) {
        var that = this, triggers = 0, wire = function () {
            if (++triggers >= triggerCount) {
                that.Unbind(wire);
            }
            // @ts-ignore
            action.apply(this, arguments);
        };
        this._actions.push(wire);
    };
    /**
    * Unbinds the provided action from the EventHandler2.
    * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
    */
    EventHandler2.prototype.Unbind = function (action) {
        for (var i = 0; i < this._actions.length; i++) {
            if (this._actions[i] === action) {
                this._actions.splice(i, 1);
                return;
            }
        }
    };
    /**
    * Determines if the EventHandler2 has active bindings.
    */
    EventHandler2.prototype.HasBindings = function () {
        return this._actions.length > 0;
    };
    /**
    * Executes all bound functions and passes the provided args to each.
    * @param val1 The first argument to pass to the bound functions.
    * @param val2 The second argument to pass to the bound functions.
    */
    EventHandler2.prototype.Trigger = function (val1, val2) {
        var actions;
        if (this.HasBindings()) {
            // Clone array so unbinds happening via triggers do not affect functionality
            actions = this._actions.slice(0);
            for (var i = 0; i < actions.length; i++) {
                actions[i](val1, val2);
            }
        }
    };
    /**
    * Disposes the event handler and unbinds all bound events.
    */
    EventHandler2.prototype.Dispose = function () {
        // Clear the array
        this._actions = [];
    };
    return EventHandler2;
}());



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Graphics", function() { return Graphics; });
/* harmony import */ var _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
/* harmony import */ var _Bounds_Bounds__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _Utilities_EventHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30);
/* harmony import */ var _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(29);
/* harmony import */ var _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(33);
/* harmony import */ var _Utilities_EventHandler2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(31);
/* harmony import */ var _Extensions_Helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(34);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();








var Graphics;
(function (Graphics) {
    var Graphic2dState = /** @class */ (function () {
        function Graphic2dState() {
            this._cachedState = {};
        }
        Object.defineProperty(Graphic2dState.prototype, "StrokeStyle", {
            get: function () {
                return this._cachedState["strokeStyle"];
            },
            set: function (value) {
                this._cachedState["strokeStyle"] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphic2dState.prototype, "FillStyle", {
            get: function () {
                return this._cachedState["fillStyle"];
            },
            set: function (value) {
                this._cachedState["fillStyle"] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphic2dState.prototype, "GlobalAlpha", {
            get: function () {
                return this._cachedState["globalAlpha"];
            },
            set: function (value) {
                this._cachedState["globalAlpha"] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphic2dState.prototype, "LineWidth", {
            get: function () {
                return this._cachedState["lineWidth"];
            },
            set: function (value) {
                this._cachedState["lineWidth"] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphic2dState.prototype, "LineCap", {
            get: function () {
                return this._cachedState["lineCap"];
            },
            set: function (value) {
                this._cachedState["lineCap"] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphic2dState.prototype, "LineJoin", {
            get: function () {
                return this._cachedState["lineJoin"];
            },
            set: function (value) {
                this._cachedState["lineJoin"] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphic2dState.prototype, "MiterLimit", {
            get: function () {
                return this._cachedState["miterLimit"];
            },
            set: function (value) {
                this._cachedState["miterLimit"] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphic2dState.prototype, "ShadowOffsetX", {
            get: function () {
                return this._cachedState["shadowOffsetX"];
            },
            set: function (value) {
                this._cachedState["shadowOffsetX"] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphic2dState.prototype, "ShadowOffsetY", {
            get: function () {
                return this._cachedState["shadowOffsetY"];
            },
            set: function (value) {
                this._cachedState["shadowOffsetY"] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphic2dState.prototype, "ShadowBlur", {
            get: function () {
                return this._cachedState["shadowBlur"];
            },
            set: function (value) {
                this._cachedState["shadowBlur"] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphic2dState.prototype, "ShadowColor", {
            get: function () {
                return this._cachedState["shadowColor"];
            },
            set: function (value) {
                this._cachedState["shadowColor"] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphic2dState.prototype, "GlobalCompositeOperation", {
            get: function () {
                return this._cachedState["globalCompositeOperation"];
            },
            set: function (value) {
                this._cachedState["globalCompositeOperation"] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphic2dState.prototype, "Font", {
            get: function () {
                return this._cachedState["font"];
            },
            set: function (value) {
                this._cachedState["font"] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphic2dState.prototype, "TextAlign", {
            get: function () {
                return this._cachedState["textAlign"];
            },
            set: function (value) {
                this._cachedState["textAlign"] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphic2dState.prototype, "TextBaseline", {
            get: function () {
                return this._cachedState["textBaseline"];
            },
            set: function (value) {
                this._cachedState["textBaseline"] = value;
            },
            enumerable: true,
            configurable: true
        });
        Graphic2dState.prototype.SetContextState = function (context) {
            for (var key in this._cachedState) {
                // @ts-ignore
                context[key] = this._cachedState[key];
            }
        };
        return Graphic2dState;
    }());
    Graphics.Graphic2dState = Graphic2dState;
    /**
    * Abstract drawable graphic type that is used create the base for graphics.
    */
    var Graphic2d = /** @class */ (function () {
        /**
        * Creates a new instance of the Graphic2d object.  Should only ever be called by a derived class.
        * @param position The initial position of the Graphic2d
        */
        function Graphic2d(position) {
            this._type = "Graphic2d";
            this.Position = position;
            this.Rotation = 0;
            this.ZIndex = 0;
            this.Visible = true;
            this._State = new Graphic2dState();
            this.Opacity = 1;
            this._children = [];
            this._childrenRemovalBindings = [];
            this.Parent = null;
            this._disposed = false;
            this._onDisposed = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_4__["EventHandler1"]();
        }
        Object.defineProperty(Graphic2d.prototype, "AbsolutePosition", {
            /**
            * Gets the absolute position of the Graphic2d.  This is used to calculate absolute positions when graphic's have parents.
            */
            get: function () {
                var position = this.Position, node = this;
                // Iterate up the parent tree until we're at the root parent
                while (node = node.Parent) {
                    position = position.Add(node.Position);
                }
                return position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphic2d.prototype, "OnDisposed", {
            /**
            * Gets an event that is triggered when the Graphic2d has been disposed.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onDisposed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphic2d.prototype, "Opacity", {
            /**
            * Gets or sets the current opacity.  Value is between 0 and 1.
            */
            get: function () {
                return this._State.GlobalAlpha;
            },
            set: function (alpha) {
                this._State.GlobalAlpha = alpha;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Returns the list of children for the current Graphic2d.
        */
        Graphic2d.prototype.GetChildren = function () {
            return this._children.slice(0);
        };
        /**
        * Adds a child to the Graphic2d.  Children are drawn with relative positions to the parent Graphic2d.  Children
        * of a Graphic2d should not be added to the Scene, parent Graphic2d's are responsible for drawing their children.
        * @param graphic Child to add.
        */
        Graphic2d.prototype.AddChild = function (graphic) {
            var _this = this;
            var removalBinding;
            if (graphic.Parent !== null) {
                throw new Error("Graphic already has parent, cannot add it as a child.");
            }
            removalBinding = function (graphic) {
                _this.RemoveChild(graphic);
            };
            graphic.Parent = this;
            graphic.OnDisposed.Bind(removalBinding);
            this._children.push(graphic);
            this._childrenRemovalBindings.push(removalBinding);
            this._children.sort(Graphic2d._zindexSort);
        };
        /**
        * Removes a child from the Graphic2d.  Returns a Boolean value indicating whether or not the child was able to be removed.
        * @param graphic Child to remove.
        */
        Graphic2d.prototype.RemoveChild = function (graphic) {
            var index = this._children.indexOf(graphic);
            if (index >= 0) {
                this._children[index].Parent = null;
                this._children[index].OnDisposed.Unbind(this._childrenRemovalBindings[index]);
                this._children.splice(index, 1);
                this._childrenRemovalBindings.splice(index, 1);
                return true;
            }
            return false;
        };
        Graphic2d.prototype._StartDraw = function (context) {
            context.save();
            this._State.SetContextState(context);
            context.translate(this.Position.X, this.Position.Y);
            if (this.Rotation !== 0) {
                context.rotate(this.Rotation);
            }
        };
        Graphic2d.prototype._EndDraw = function (context) {
            for (var i = 0; i < this._children.length; i++) {
                if (this._children[i].Visible) {
                    this._children[i].Draw(context);
                }
            }
            context.restore();
        };
        /**
        * Abstract: Should be overridden to draw the derived class onto the context.  If this graphic is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the graphic onto.
        */
        Graphic2d.prototype.Draw = function (context) {
            throw new Error("The Draw method is abstract on Graphic2d and should not be called.");
        };
        /**
        * Abstract: Should be overridden to return the bounding area that represents where the graphic will draw.
        */
        Graphic2d.prototype.GetDrawBounds = function () {
            throw new Error("GetDrawBounds is abstract, it must be implemented.");
        };
        /**
        * Abstract: Should be overridden to scale the size of the Graphic2d.
        * @param scale The value to multiply the graphic's size by.
        */
        Graphic2d.prototype.Scale = function (scale) {
            throw new Error("Scale is abstract, it must be implemented.");
        };
        /**
        * Abstract: Returns a nearly identical copy of this Graphic2d.  If this Graphic2d belongs to a parent, the cloned Graphic2d will not. If this Graphic2d has children, all children will be cloned as well.  Lastly, the cloned Graphic2d will not have the same event bindings as this one does.
        */
        Graphic2d.prototype.Clone = function () {
            throw new Error("Clone is abstract, it must be implemented.");
        };
        // Used by derived Graphic2d's to centralize logic
        Graphic2d.prototype._Clone = function (graphic) {
            for (var i = 0; i < this._children.length; i++) {
                graphic.AddChild(this._children[i].Clone());
            }
            graphic.Opacity = this.Opacity;
            graphic.Rotation = this.Rotation;
            graphic.Visible = this.Visible;
            graphic.ZIndex = this.ZIndex;
        };
        /**
        * Triggers the OnDisposed event.  If this Graphic2d is used with a Scene2d it will be removed from the scene when disposed.
        */
        Graphic2d.prototype.Dispose = function () {
            var childrenClone;
            if (!this._disposed) {
                this._disposed = true;
                childrenClone = this._children.slice(0);
                // Dispose all children to ensure that there's no dangling references.
                for (var i = 0; i < childrenClone.length; i++) {
                    childrenClone[i].Dispose();
                }
                delete this._children;
                this.OnDisposed.Trigger(this);
                this.OnDisposed.Dispose();
            }
            else {
                throw new Error("Cannot dispose graphic more than once.");
            }
        };
        Graphic2d._zindexSort = function (a, b) { return a.ZIndex - b.ZIndex; };
        return Graphic2d;
    }());
    Graphics.Graphic2d = Graphic2d;
    /**
    * Defines a drawable 2d line element.
    */
    var Line2d = /** @class */ (function (_super) {
        __extends(Line2d, _super);
        function Line2d(fromX, fromY, toX, toY, lineWidth, color) {
            if (lineWidth === void 0) { lineWidth = 1; }
            var _this = _super.call(this, _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero) || this;
            _this._type = "Line2d";
            _this._from = new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](fromX, fromY);
            _this._to = new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](toX, toY);
            _this.LineWidth = lineWidth;
            _this.UpdatePosition();
            _this._strokeChangeWire = function (color) {
                _this._State.StrokeStyle = color.toString();
            };
            if (typeof color !== "undefined") {
                if (typeof color === "string") {
                    color = new Color(color);
                }
                _this.Color = _this._strokeStyle = color;
            }
            else {
                _this.Color = _this._strokeStyle = Color.Black;
            }
            return _this;
        }
        Object.defineProperty(Line2d.prototype, "From", {
            /**
            * Gets or sets the From location of the Line2d.
            */
            get: function () {
                return this._from;
            },
            set: function (newPosition) {
                this._from = newPosition;
                this.UpdatePosition();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Line2d.prototype, "To", {
            /**
            * Gets or sets the To location of the Line2d.
            */
            get: function () {
                return this._to;
            },
            set: function (newPosition) {
                this._to = newPosition;
                this.UpdatePosition();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Line2d.prototype, "Color", {
            /**
            * Gets or sets the line color.  Valid colors are strings like "red" or "rgb(255,0,0)".
            */
            get: function () {
                return this._strokeStyle;
            },
            set: function (color) {
                if (typeof color === "string") {
                    color = new Color(color);
                }
                // Unbind old
                this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
                this._strokeStyle = color;
                // Bind new
                this._strokeStyle.OnChange.Bind(this._strokeChangeWire);
                // Update state
                this._strokeChangeWire(color);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Line2d.prototype, "LineWidth", {
            /**
            * Gets or sets the line width.
            */
            get: function () {
                return this._State.LineWidth;
            },
            set: function (width) {
                this._State.LineWidth = width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Line2d.prototype, "LineCap", {
            /**
            * Gets or sets the line cap.  Values can be "butt", "round", "square".
            */
            get: function () {
                return this._State.LineCap;
            },
            set: function (cap) {
                this._State.LineCap = cap;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Draws the line onto the given context.  If this Line2d is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the line onto.
        */
        Line2d.prototype.Draw = function (context) {
            // Need to check to ensure that the colors still match up so if people are performing direct color manipulation
            // such as color.R = 131.
            if (this._strokeStyle.toString() !== this._State.StrokeStyle) {
                this._State.StrokeStyle = this._strokeStyle.toString();
            }
            _super.prototype._StartDraw.call(this, context);
            // Check if the user has modified the position directly, if so we need to translate the from and to positions accordingly
            if (!this._cachedPosition.Equivalent(this.Position)) {
                this.RefreshCache();
            }
            // Context origin is at the center point of the line
            context.beginPath();
            context.moveTo(this._from.X - this.Position.X, this._from.Y - this.Position.Y);
            context.lineTo(this._to.X - this.Position.X, this._to.Y - this.Position.Y);
            context.stroke();
            _super.prototype._EndDraw.call(this, context);
        };
        /**
        * The bounding area that represents where the Line2d will draw.
        */
        Line2d.prototype.GetDrawBounds = function () {
            var bounds = new _Bounds_Bounds__WEBPACK_IMPORTED_MODULE_2__["Bounds"].BoundingRectangle(this.Position, new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_1__["Size2d"](this._boundsWidth, this.LineWidth));
            bounds.Rotation = Math.atan2(this._difference.Y, this._difference.X) + this.Rotation;
            return bounds;
        };
        /**
        * Scale's the Line2d graphic.
        * @param scale The value to multiply the graphic's size by.
        */
        Line2d.prototype.Scale = function (scale) {
            this.From = this.Position.Add(this.From.Subtract(this.Position).Multiply(scale));
            this.To = this.Position.Add(this.To.Subtract(this.Position).Multiply(scale));
        };
        /**
        * Returns a nearly identical copy of this Line2d.  If this Line2d belongs to a parent, the cloned Line2d will not. If this Line2d has children, all children will be cloned as well.  Lastly, the cloned Line2d will not have the same event bindings as this one does.
        */
        Line2d.prototype.Clone = function () {
            var graphic = new Line2d(this.From.X, this.From.Y, this.To.X, this.To.Y, this.LineWidth, this.Color.Clone());
            graphic.LineCap = this.LineCap;
            _super.prototype._Clone.call(this, graphic);
            return graphic;
        };
        Line2d.prototype.Dispose = function () {
            _super.prototype.Dispose.call(this);
            this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
        };
        Line2d.prototype.UpdatePosition = function () {
            this.Position = ((this._from.Add(this._to)).Divide(2));
            this._difference = this._to.Subtract(this._from);
            this._boundsWidth = this._from.Distance(this._to).Length();
            this._cachedPosition = this.Position.Clone();
        };
        Line2d.prototype.RefreshCache = function () {
            var difference = this.Position.Subtract(this._cachedPosition);
            this._from.X += difference.X;
            this._from.Y += difference.Y;
            this._to.X += difference.X;
            this._to.Y += difference.Y;
            this._cachedPosition = this.Position.Clone();
        };
        return Line2d;
    }(Graphic2d));
    Graphics.Line2d = Line2d;
    /**
    * Defines an image resource that can be used within Sprite's, SpriteAnimation's and other drawable graphics.
    */
    var ImageSource = /** @class */ (function () {
        // @ts-ignore
        function ImageSource(image, width, height, clipX, clipY, clipWidth, clipHeight) {
            if (clipX === void 0) { clipX = 0; }
            if (clipY === void 0) { clipY = 0; }
            if (clipWidth === void 0) { clipWidth = width; }
            if (clipHeight === void 0) { clipHeight = height; }
            var _this = this;
            var sizeDefined = typeof width !== "undefined", imageLocation;
            this._onLoaded = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_4__["EventHandler1"]();
            if (typeof image === "string") {
                imageLocation = image;
                this._loaded = false;
                this.Source = new Image();
                this._loadWire = function (e) {
                    _this._loaded = true;
                    if (!sizeDefined) {
                        _this._size = new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_1__["Size2d"](_this.Source.width, _this.Source.height);
                        _this.ClipLocation = _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero;
                        _this.ClipSize = _this._size.Clone();
                    }
                    _this._onLoaded.Trigger(_this);
                };
                this.Source.src = imageLocation;
                this._imageLocation = imageLocation;
                if (sizeDefined) {
                    // @ts-ignore
                    this._size = new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_1__["Size2d"](width, height);
                    this.ClipLocation = new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](clipX, clipY);
                    this.ClipSize = new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_1__["Size2d"](clipWidth, clipHeight);
                }
                else {
                    // @ts-ignore
                    this.ClipSize = null; // Waiting for the image source OnLoad to set it
                }
            }
            else {
                clipWidth = clipX;
                clipHeight = clipY;
                // @ts-ignore
                clipX = width;
                // @ts-ignore
                clipY = height;
                this.Source = image;
                this._imageLocation = image.src;
                this._loaded = false;
                if (this.Source.complete) {
                    this._loadWire = function (e) {
                        _this._loaded = true;
                        _this._onLoaded.Trigger(_this);
                    };
                    this._size = new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_1__["Size2d"](image.width, image.height);
                }
                else {
                    this._loadWire = function (e) {
                        _this._loaded = true;
                        _this._onLoaded.Trigger(_this);
                        _this._size = new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_1__["Size2d"](image.width, image.height);
                    };
                }
                this.ClipLocation = new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](clipX, clipY);
                this.ClipSize = new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_1__["Size2d"](clipWidth, clipHeight);
            }
            if (!this.Source.complete) {
                this.Source.addEventListener("load", this._loadWire, false);
            }
            else {
                setTimeout(this._loadWire, 0);
            }
        }
        Object.defineProperty(ImageSource.prototype, "OnLoaded", {
            /**
            * Gets an event that is triggered when the base image is finished loading.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onLoaded;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageSource.prototype, "Size", {
            /**
            * Returns the base Size of the image source.
            */
            get: function () {
                return this._size.Clone();
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Determines if the ImageSource has been loaded.
        */
        ImageSource.prototype.IsLoaded = function () {
            return this._loaded;
        };
        /**
        * Returns an ImageSource that is extracted from the current ImageSource based on the provided clip location and clip size.
        * @param clipX The horizontal location of the clip.
        * @param clipY The vertical location of the clip.
        * @param clipWidth The width of the clip.
        * @param clipHeight The height of the clip.
        */
        ImageSource.prototype.Extract = function (clipX, clipY, clipWidth, clipHeight) {
            return new ImageSource(this._imageLocation, this._size.Width, this._size.Height, clipX, clipY, clipWidth, clipHeight);
        };
        /**
        * Disposes the image source and unbinds all bound events.
        */
        ImageSource.prototype.Dispose = function () {
            this.Source.removeEventListener("load", this._loadWire);
            // @ts-ignore
            this.Source = null;
            this._onLoaded.Dispose();
        };
        /**
        * Returns an identical copy of this image source.  Uses existing base image source.
        */
        ImageSource.prototype.Clone = function () {
            if (this.ClipSize) {
                return new ImageSource(this.Source, this.ClipLocation.X, this.ClipLocation.Y, this.ClipSize.Width, this.ClipSize.Height);
            }
            else {
                return new ImageSource(this.Source);
            }
        };
        return ImageSource;
    }());
    Graphics.ImageSource = ImageSource;
    /**
    * Defines a drawable sprite.  Sprites are used to draw images to the game screen.
    */
    var Sprite2d = /** @class */ (function (_super) {
        __extends(Sprite2d, _super);
        function Sprite2d(x, y, image, width, height) {
            if (width === void 0) { width = image.ClipSize.Width; }
            if (height === void 0) { height = image.ClipSize.Height; }
            var _this = _super.call(this, new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](x, y)) || this;
            _this._type = "Sprite2d";
            _this.Image = image;
            _this.Size = new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_1__["Size2d"](width, height);
            return _this;
        }
        /**
        * Draws the sprite onto the given context.  If this sprite is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the sprite onto.
        */
        Sprite2d.prototype.Draw = function (context) {
            _super.prototype._StartDraw.call(this, context);
            context.drawImage(this.Image.Source, this.Image.ClipLocation.X, this.Image.ClipLocation.Y, this.Image.ClipSize.Width, this.Image.ClipSize.Height, -this.Size.HalfWidth, -this.Size.HalfHeight, this.Size.Width, this.Size.Height);
            _super.prototype._EndDraw.call(this, context);
        };
        /**
        * The bounding area that represents where the Sprite2d will draw.
        */
        Sprite2d.prototype.GetDrawBounds = function () {
            var bounds = new _Bounds_Bounds__WEBPACK_IMPORTED_MODULE_2__["Bounds"].BoundingRectangle(this.Position, this.Size);
            bounds.Rotation = this.Rotation;
            return bounds;
        };
        /**
        * Scale's the Sprite2d graphic.
        * @param scale The value to multiply the graphic's size by.
        */
        Sprite2d.prototype.Scale = function (scale) {
            this.Size.Width *= scale;
            this.Size.Height *= scale;
        };
        /**
        * Returns a nearly identical copy of this Sprite2d.  If this Sprite2d belongs to a parent, the cloned Sprite2d will not. If this Sprite2d has children, all children will be cloned as well.  Lastly, the cloned Sprite2d will not have the same event bindings as this one does.
        */
        Sprite2d.prototype.Clone = function () {
            var graphic = new Sprite2d(this.Position.X, this.Position.Y, this.Image.Clone(), this.Size.Width, this.Size.Height);
            _super.prototype._Clone.call(this, graphic);
            return graphic;
        };
        return Sprite2d;
    }(Graphic2d));
    Graphics.Sprite2d = Sprite2d;
    /**
    * Color class used to pass around colors in a typed manner.
    */
    var Color = /** @class */ (function () {
        function Color(r, g, b, a) {
            this._type = "Color";
            // @ts-ignore
            this._cached = undefined;
            this._onChange = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_4__["EventHandler1"]();
            if (typeof (r) === 'string' && r.length > 0) {
                this.InitializeColorFromString(r);
            }
            else {
                //check if the alpha channel is defined
                this.A = a === undefined ? 1 : a;
                this.R = r;
                this.G = g;
                this.B = b;
            }
        }
        Object.defineProperty(Color.prototype, "OnChange", {
            /**
            * Gets an EventHandler that is triggered when the R, G, B, or A values of this Color change.
            */
            get: function () {
                return this._onChange;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "R", {
            /**
            * Gets or sets the current red channel. Value must be an integer between 0 and 255 inclusive.
            */
            get: function () {
                return this._r;
            },
            set: function (r) {
                // @ts-ignore
                this._cached = undefined;
                this._r = Math.round(Math.min(Math.max(r, 0), 255));
                this._onChange.Trigger(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "G", {
            /**
            * Gets or sets the current green channel. Value must be an integer between 0 and 255 inclusive.
            */
            get: function () {
                return this._g;
            },
            set: function (g) {
                // @ts-ignore
                this._cached = undefined;
                this._g = Math.round(Math.min(Math.max(g, 0), 255));
                this._onChange.Trigger(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "B", {
            /**
            * Gets or sets the current blue channel. Value must be an integer between 0 and 255 inclusive.
            */
            get: function () {
                return this._b;
            },
            set: function (b) {
                // @ts-ignore
                this._cached = undefined;
                this._b = Math.round(Math.min(Math.max(b, 0), 255));
                this._onChange.Trigger(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "A", {
            /**
            * Gets or sets the current alpha channel. Value must be between 0 and 1 inclusive.
            */
            get: function () {
                return this._a;
            },
            set: function (a) {
                // @ts-ignore
                this._cached = undefined;
                this._a = Math.min(Math.max(a, 0), 1);
                this._onChange.Trigger(this);
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Creates a new Color object with the specified RGB values.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        */
        Color.FromRGB = function (r, g, b) {
            return new Color(r, g, b);
        };
        /**
        * Creates a new Color object with the specified RGBA values.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        * @param a The alpha channel. Must be between 0 and 1 inclusive.
        */
        Color.FromRGBA = function (r, g, b, a) {
            return new Color(r, g, b, a);
        };
        /**
        * Creates a new Color object with the specified ARGB values.
        * @param a The alpha channel. Must be between 0 and 1 inclusive.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        */
        Color.FromARGB = function (a, r, g, b) {
            return new Color(r, g, b, a);
        };
        /**
        * Creates a new Color object from the specified hex assignment.
        * @param hex The hex based color code.
        */
        Color.FromHex = function (hex) {
            return new Color(hex);
        };
        /**
        * Creates a new Color object form the HTML5 named colors.
        * @param name The name of the HTML5 color to use.
        */
        Color.FromName = function (name) {
            return new Color(name);
        };
        //Converts a short hex string e.g. fff or cccc to the long version 
        //e.g. ffffffff the alpha channel.
        Color.ConvertShortHexToLong = function (hex) {
            if (hex.length === 3) {
                //append the alpha channel default which is fully opaque
                hex = hex + 'f';
            }
            if (hex.length === 4) {
                //short version that includes alpha channel
                hex = hex.replace(Color.RgbaHexRegExp, function (m, a, r, g, b) {
                    return r + r + g + g + b + b + a + a;
                });
            }
            return hex;
        };
        //Initializes a color object based on the string passed.
        //Possible values are hex and named values
        //rgba/argb/rgb values are handled elsewhere
        Color.prototype.InitializeColorFromString = function (color) {
            //rgb, hex, rgba, argb
            var namedColor = this.NamedColorToHex(color);
            // @ts-ignore
            var result = null;
            if (typeof (namedColor) === 'string') {
                result = this.CreateColorObjectFromString(namedColor);
            }
            else {
                result = namedColor;
            }
            this.A = result.A;
            this.B = result.B;
            this.R = result.R;
            this.G = result.G;
        };
        //Creates a color object from the string provided
        Color.prototype.CreateColorObjectFromString = function (hex) {
            //we're not interested in the pound sign
            if (hex.charAt(0) === '#') {
                hex = hex.substr(1);
            }
            //convert short hexes to long hexes
            hex = Color.ConvertShortHexToLong(hex);
            //ensure we have an alpha channel
            if (hex.length === 6) {
                hex = hex + 'ff';
            }
            //if it's exactly 8 characters long then it's
            //a hex and we build the Color object from this
            if (hex.length === 8) {
                return this.ParseAlphaHex(hex);
            }
            //it's no longer a hex and must be an rgb style function
            return this.ParseRGB(hex);
        };
        //Parses a color function and returns a Color object
        Color.prototype.ParseRGB = function (rgb) {
            var result = Color.RgbRegExp.exec(rgb);
            if (result) {
                var name = result[1];
                switch (name) {
                    case 'rgb': //rgb(n, n, n)
                        return new Color(parseInt(result[2]), parseInt(result[3]), parseInt(result[4]));
                    case 'argb': //argb(d, n, n, n)
                        return new Color(parseInt(result[3]), parseInt(result[4]), parseInt(result[5]), parseFloat(result[2]));
                    case 'rgba': //rgba(n, n, n, d)
                        return new Color(parseInt(result[2]), parseInt(result[3]), parseInt(result[4]), parseFloat(result[5]));
                }
            }
            //since the hex, named colors and color functions were
            //not available in the string passed then it's not a color
            //return Magenta so it's obvious something is wrong
            return Color.Magenta;
        };
        //Parses out all color channels including alpha
        //and returns a Color object based on the values
        Color.prototype.ParseAlphaHex = function (hex) {
            var a, r, g, b;
            r = parseInt(hex.charAt(0) + hex.charAt(1), 16);
            g = parseInt(hex.charAt(2) + hex.charAt(3), 16);
            b = parseInt(hex.charAt(4) + hex.charAt(5), 16);
            a = parseInt(hex.charAt(6) + hex.charAt(7), 16) / 255;
            return new Color(r, g, b, a);
        };
        //Parses out all color channels and returns a Color object based on the values
        Color.prototype.ParseHex = function (hex) {
            var r, g, b;
            r = parseInt(hex.charAt(0) + hex.charAt(1), 16);
            g = parseInt(hex.charAt(2) + hex.charAt(3), 16);
            b = parseInt(hex.charAt(4) + hex.charAt(5), 16);
            return new Color(r, g, b);
        };
        //Checks the named color object and looks for a similarly named color
        //if one is found returns the named Color object
        Color.prototype.NamedColorToHex = function (color) {
            if (color.substring(0, 1) === '#') {
                return color;
            }
            // @ts-ignore
            if (typeof Color._namedColors[color.toLowerCase()] !== 'undefined') {
                // @ts-ignore
                return Color._namedColors[color.toLowerCase()];
            }
            return color;
        };
        Object.defineProperty(Color, "Transparent", {
            /**
            * Returns a transparent Color object.
            */
            get: function () {
                return Color._namedColors.transparent.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "AliceBlue", {
            /**
            * Returns a Color object set to the color named color AliceBlue.
            */
            get: function () {
                return Color._namedColors.aliceblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "AntiqueWhite", {
            /**
            * Returns a Color object set to the color named color AntiqueWhite.
            */
            get: function () {
                return Color._namedColors.antiquewhite.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Aqua", {
            /**
            * Returns a Color object set to the color named color Aqua.
            */
            get: function () {
                return Color._namedColors.aqua.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Aquamarine", {
            /**
            * Returns a Color object set to the color named color Aquamarine.
            */
            get: function () {
                return Color._namedColors.aquamarine.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Azure", {
            /**
            * Returns a Color object set to the color named color Azure.
            */
            get: function () {
                return Color._namedColors.azure.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Beige", {
            /**
            * Returns a Color object set to the color named color Beige.
            */
            get: function () {
                return Color._namedColors.beige.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Bisque", {
            /**
            * Returns a Color object set to the color named color Bisque.
            */
            get: function () {
                return Color._namedColors.bisque.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Black", {
            /**
            * Returns a Color object set to the color named color Black.
            */
            get: function () {
                return Color._namedColors.black.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "BlanchedAlmond", {
            /**
            * Returns a Color object set to the color named color BlanchedAlmond.
            */
            get: function () {
                return Color._namedColors.blanchedalmond.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Blue", {
            /**
            * Returns a Color object set to the color named color Blue.
            */
            get: function () {
                return Color._namedColors.blue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "BlueViolet", {
            /**
            * Returns a Color object set to the color named color BlueViolet.
            */
            get: function () {
                return Color._namedColors.blueviolet.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Brown", {
            /**
            * Returns a Color object set to the color named color Brown.
            */
            get: function () {
                return Color._namedColors.brown.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "BurlyWood", {
            /**
            * Returns a Color object set to the color named color BurlyWood.
            */
            get: function () {
                return Color._namedColors.burlywood.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "CadetBlue", {
            /**
            * Returns a Color object set to the color named color CadetBlue.
            */
            get: function () {
                return Color._namedColors.cadetblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Chartreuse", {
            /**
            * Returns a Color object set to the color named color Chartreuse.
            */
            get: function () {
                return Color._namedColors.chartreuse.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Chocolate", {
            /**
            * Returns a Color object set to the color named color Chocolate.
            */
            get: function () {
                return Color._namedColors.chocolate.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Coral", {
            /**
            * Returns a Color object set to the color named color Coral.
            */
            get: function () {
                return Color._namedColors.coral.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "CornflowerBlue", {
            /**
            * Returns a Color object set to the color named color CornflowerBlue.
            */
            get: function () {
                return Color._namedColors.cornflowerblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Cornsilk", {
            /**
            * Returns a Color object set to the color named color Cornsilk.
            */
            get: function () {
                return Color._namedColors.cornsilk.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Crimson", {
            /**
            * Returns a Color object set to the color named color Crimson.
            */
            get: function () {
                return Color._namedColors.crimson.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Cyan", {
            /**
            * Returns a Color object set to the color named color Cyan.
            */
            get: function () {
                return Color._namedColors.cyan.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DarkBlue", {
            /**
            * Returns a Color object set to the color named color DarkBlue.
            */
            get: function () {
                return Color._namedColors.darkblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DarkCyan", {
            /**
            * Returns a Color object set to the color named color DarkCyan.
            */
            get: function () {
                return Color._namedColors.darkcyan.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DarkGoldenRod", {
            /**
            * Returns a Color object set to the color named color DarkGoldenRod.
            */
            get: function () {
                return Color._namedColors.darkgoldenrod.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DarkGray", {
            /**
            * Returns a Color object set to the color named color DarkGray.
            */
            get: function () {
                return Color._namedColors.darkgray.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DarkGreen", {
            /**
            * Returns a Color object set to the color named color DarkGreen.
            */
            get: function () {
                return Color._namedColors.darkgreen.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DarkKhaki", {
            /**
            * Returns a Color object set to the color named color DarkKhaki.
            */
            get: function () {
                return Color._namedColors.darkkhaki.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DarkMagenta", {
            /**
            * Returns a Color object set to the color named color DarkMagenta.
            */
            get: function () {
                return Color._namedColors.darkmagenta.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DarkOliveGreen", {
            /**
            * Returns a Color object set to the color named color DarkOliveGreen.
            */
            get: function () {
                return Color._namedColors.darkolivegreen.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DarkOrange", {
            /**
            * Returns a Color object set to the color named color DarkOrange.
            */
            get: function () {
                return Color._namedColors.darkorange.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DarkOrchid", {
            /**
            * Returns a Color object set to the color named color DarkOrchid.
            */
            get: function () {
                return Color._namedColors.darkorchid.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DarkRed", {
            /**
            * Returns a Color object set to the color named color DarkRed.
            */
            get: function () {
                return Color._namedColors.darkred.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DarkSalmon", {
            /**
            * Returns a Color object set to the color named color DarkSalmon.
            */
            get: function () {
                return Color._namedColors.darksalmon.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DarkSeaGreen", {
            /**
            * Returns a Color object set to the color named color DarkSeaGreen.
            */
            get: function () {
                return Color._namedColors.darkseagreen.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DarkSlateBlue", {
            /**
            * Returns a Color object set to the color named color DarkSlateBlue.
            */
            get: function () {
                return Color._namedColors.darkslateblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DarkSlateGray", {
            /**
            * Returns a Color object set to the color named color DarkSlateGray.
            */
            get: function () {
                return Color._namedColors.darkslategray.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DarkTurquoise", {
            /**
            * Returns a Color object set to the color named color DarkTurquoise.
            */
            get: function () {
                return Color._namedColors.darkturquoise.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DarkViolet", {
            /**
            * Returns a Color object set to the color named color DarkViolet.
            */
            get: function () {
                return Color._namedColors.darkviolet.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DeepPink", {
            /**
            * Returns a Color object set to the color named color DeepPink.
            */
            get: function () {
                return Color._namedColors.deeppink.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DeepSkyBlue", {
            /**
            * Returns a Color object set to the color named color DeepSkyBlue.
            */
            get: function () {
                return Color._namedColors.deepskyblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DimGray", {
            /**
            * Returns a Color object set to the color named color DimGray.
            */
            get: function () {
                return Color._namedColors.dimgray.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "DodgerBlue", {
            /**
            * Returns a Color object set to the color named color DodgerBlue.
            */
            get: function () {
                return Color._namedColors.dodgerblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "FireBrick", {
            /**
            * Returns a Color object set to the color named color FireBrick.
            */
            get: function () {
                return Color._namedColors.firebrick.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "FloralWhite", {
            /**
            * Returns a Color object set to the color named color FloralWhite.
            */
            get: function () {
                return Color._namedColors.floralwhite.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "ForestGreen", {
            /**
            * Returns a Color object set to the color named color ForestGreen.
            */
            get: function () {
                return Color._namedColors.forestgreen.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Fuchsia", {
            /**
            * Returns a Color object set to the color named color Fuchsia.
            */
            get: function () {
                return Color._namedColors.fuchsia.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Gainsboro", {
            /**
            * Returns a Color object set to the color named color Gainsboro.
            */
            get: function () {
                return Color._namedColors.gainsboro.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "GhostWhite", {
            /**
            * Returns a Color object set to the color named color GhostWhite.
            */
            get: function () {
                return Color._namedColors.ghostwhite.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Gold", {
            /**
            * Returns a Color object set to the color named color Gold.
            */
            get: function () {
                return Color._namedColors.gold.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "GoldenRod", {
            /**
            * Returns a Color object set to the color named color GoldenRod.
            */
            get: function () {
                return Color._namedColors.goldenrod.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Gray", {
            /**
            * Returns a Color object set to the color named color Gray.
            */
            get: function () {
                return Color._namedColors.gray.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Green", {
            /**
            * Returns a Color object set to the color named color Green.
            */
            get: function () {
                return Color._namedColors.green.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "GreenYellow", {
            /**
            * Returns a Color object set to the color named color GreenYellow.
            */
            get: function () {
                return Color._namedColors.greenyellow.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "HoneyDew", {
            /**
            * Returns a Color object set to the color named color HoneyDew.
            */
            get: function () {
                return Color._namedColors.honeydew.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "HotPink", {
            /**
            * Returns a Color object set to the color named color HotPink.
            */
            get: function () {
                return Color._namedColors.hotpink.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "IndianRed", {
            /**
            * Returns a Color object set to the color named color IndianRed.
            */
            get: function () {
                return Color._namedColors.indianred.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Indigo", {
            /**
            * Returns a Color object set to the color named color Indigo.
            */
            get: function () {
                return Color._namedColors.indigo.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Ivory", {
            /**
            * Returns a Color object set to the color named color Ivory.
            */
            get: function () {
                return Color._namedColors.ivory.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Khaki", {
            /**
            * Returns a Color object set to the color named color Khaki.
            */
            get: function () {
                return Color._namedColors.khaki.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Lavender", {
            /**
            * Returns a Color object set to the color named color Lavender.
            */
            get: function () {
                return Color._namedColors.lavender.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LavenderBlush", {
            /**
            * Returns a Color object set to the color named color LavenderBlush.
            */
            get: function () {
                return Color._namedColors.lavenderblush.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LawnGreen", {
            /**
            * Returns a Color object set to the color named color LawnGreen.
            */
            get: function () {
                return Color._namedColors.lawngreen.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LemonChiffon", {
            /**
            * Returns a Color object set to the color named color LemonChiffon.
            */
            get: function () {
                return Color._namedColors.lemonchiffon.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LightBlue", {
            /**
            * Returns a Color object set to the color named color LightBlue.
            */
            get: function () {
                return Color._namedColors.lightblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LightCoral", {
            /**
            * Returns a Color object set to the color named color LightCoral.
            */
            get: function () {
                return Color._namedColors.lightcoral.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LightCyan", {
            /**
            * Returns a Color object set to the color named color LightCyan.
            */
            get: function () {
                return Color._namedColors.lightcyan.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LightGoldenRodYellow", {
            /**
            * Returns a Color object set to the color named color LightGoldenRodYellow.
            */
            get: function () {
                return Color._namedColors.lightgoldenrodyellow.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LightGray", {
            /**
            * Returns a Color object set to the color named color LightGray.
            */
            get: function () {
                return Color._namedColors.lightgray.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LightGrey", {
            /**
            * Returns a Color object set to the color named color LightGrey.
            */
            get: function () {
                return Color._namedColors.lightgrey.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LightGreen", {
            /**
            * Returns a Color object set to the color named color LightGreen.
            */
            get: function () {
                return Color._namedColors.lightgreen.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LightPink", {
            /**
            * Returns a Color object set to the color named color LightPink.
            */
            get: function () {
                return Color._namedColors.lightpink.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LightSalmon", {
            /**
            * Returns a Color object set to the color named color LightSalmon.
            */
            get: function () {
                return Color._namedColors.lightsalmon.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LightSeaGreen", {
            /**
            * Returns a Color object set to the color named color LightSeaGreen.
            */
            get: function () {
                return Color._namedColors.lightseagreen.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LightSkyBlue", {
            /**
            * Returns a Color object set to the color named color LightSkyBlue.
            */
            get: function () {
                return Color._namedColors.lightskyblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LightSlateGray", {
            /**
            * Returns a Color object set to the color named color LightSlateGray.
            */
            get: function () {
                return Color._namedColors.lightslategray.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LightSteelBlue", {
            /**
            * Returns a Color object set to the color named color LightSteelBlue.
            */
            get: function () {
                return Color._namedColors.lightsteelblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LightYellow", {
            /**
            * Returns a Color object set to the color named color LightYellow.
            */
            get: function () {
                return Color._namedColors.lightyellow.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Lime", {
            /**
            * Returns a Color object set to the color named color Lime.
            */
            get: function () {
                return Color._namedColors.lime.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "LimeGreen", {
            /**
            * Returns a Color object set to the color named color LimeGreen.
            */
            get: function () {
                return Color._namedColors.limegreen.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Linen", {
            /**
            * Returns a Color object set to the color named color Linen.
            */
            get: function () {
                return Color._namedColors.linen.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Magenta", {
            /**
            * Returns a Color object set to the color named color Magenta.
            */
            get: function () {
                return Color._namedColors.magenta.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Maroon", {
            /**
            * Returns a Color object set to the color named color Maroon.
            */
            get: function () {
                return Color._namedColors.maroon.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "MediumAquaMarine", {
            /**
            * Returns a Color object set to the color named color MediumAquaMarine.
            */
            get: function () {
                return Color._namedColors.mediumaquamarine.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "MediumBlue", {
            /**
            * Returns a Color object set to the color named color MediumBlue.
            */
            get: function () {
                return Color._namedColors.mediumblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "MediumOrchid", {
            /**
            * Returns a Color object set to the color named color MediumOrchid.
            */
            get: function () {
                return Color._namedColors.mediumorchid.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "MediumPurple", {
            /**
            * Returns a Color object set to the color named color MediumPurple.
            */
            get: function () {
                return Color._namedColors.mediumpurple.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "MediumSeaGreen", {
            /**
            * Returns a Color object set to the color named color MediumSeaGreen.
            */
            get: function () {
                return Color._namedColors.mediumseagreen.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "MediumSlateBlue", {
            /**
            * Returns a Color object set to the color named color MediumSlateBlue.
            */
            get: function () {
                return Color._namedColors.mediumslateblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "MediumSpringGreen", {
            /**
            * Returns a Color object set to the color named color MediumSpringGreen.
            */
            get: function () {
                return Color._namedColors.mediumspringgreen.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "MediumTurquoise", {
            /**
            * Returns a Color object set to the color named color MediumTurquoise.
            */
            get: function () {
                return Color._namedColors.mediumturquoise.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "MediumVioletRed", {
            /**
            * Returns a Color object set to the color named color MediumVioletRed.
            */
            get: function () {
                return Color._namedColors.mediumvioletred.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "MidnightBlue", {
            /**
            * Returns a Color object set to the color named color MidnightBlue.
            */
            get: function () {
                return Color._namedColors.midnightblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "MintCream", {
            /**
            * Returns a Color object set to the color named color MintCream.
            */
            get: function () {
                return Color._namedColors.mintcream.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "MistyRose", {
            /**
            * Returns a Color object set to the color named color MistyRose.
            */
            get: function () {
                return Color._namedColors.mistyrose.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Moccasin", {
            /**
            * Returns a Color object set to the color named color Moccasin.
            */
            get: function () {
                return Color._namedColors.moccasin.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "NavajoWhite", {
            /**
            * Returns a Color object set to the color named color NavajoWhite.
            */
            get: function () {
                return Color._namedColors.navajowhite.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Navy", {
            /**
            * Returns a Color object set to the color named color Navy.
            */
            get: function () {
                return Color._namedColors.navy.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "OldLace", {
            /**
            * Returns a Color object set to the color named color OldLace.
            */
            get: function () {
                return Color._namedColors.oldlace.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Olive", {
            /**
            * Returns a Color object set to the color named color Olive.
            */
            get: function () {
                return Color._namedColors.olive.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "OliveDrab", {
            /**
            * Returns a Color object set to the color named color OliveDrab.
            */
            get: function () {
                return Color._namedColors.olivedrab.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Orange", {
            /**
            * Returns a Color object set to the color named color Orange.
            */
            get: function () {
                return Color._namedColors.orange.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "OrangeRed", {
            /**
            * Returns a Color object set to the color named color OrangeRed.
            */
            get: function () {
                return Color._namedColors.orangered.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Orchid", {
            /**
            * Returns a Color object set to the color named color Orchid.
            */
            get: function () {
                return Color._namedColors.orchid.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "PaleGoldenRod", {
            /**
            * Returns a Color object set to the color named color PaleGoldenRod.
            */
            get: function () {
                return Color._namedColors.palegoldenrod.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "PaleGreen", {
            /**
            * Returns a Color object set to the color named color PaleGreen.
            */
            get: function () {
                return Color._namedColors.palegreen.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "PaleTurquoise", {
            /**
            * Returns a Color object set to the color named color PaleTurquoise.
            */
            get: function () {
                return Color._namedColors.paleturquoise.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "PaleVioletRed", {
            /**
            * Returns a Color object set to the color named color PaleVioletRed.
            */
            get: function () {
                return Color._namedColors.palevioletred.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "PapayaWhip", {
            /**
            * Returns a Color object set to the color named color PapayaWhip.
            */
            get: function () {
                return Color._namedColors.papayawhip.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "PeachPuff", {
            /**
            * Returns a Color object set to the color named color PeachPuff.
            */
            get: function () {
                return Color._namedColors.peachpuff.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Peru", {
            /**
            * Returns a Color object set to the color named color Peru.
            */
            get: function () {
                return Color._namedColors.peru.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Pink", {
            /**
            * Returns a Color object set to the color named color Pink.
            */
            get: function () {
                return Color._namedColors.pink.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Plum", {
            /**
            * Returns a Color object set to the color named color Plum.
            */
            get: function () {
                return Color._namedColors.plum.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "PowderBlue", {
            /**
            * Returns a Color object set to the color named color PowderBlue.
            */
            get: function () {
                return Color._namedColors.powderblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Purple", {
            /**
            * Returns a Color object set to the color named color Purple.
            */
            get: function () {
                return Color._namedColors.purple.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Red", {
            /**
            * Returns a Color object set to the color named color Red.
            */
            get: function () {
                return Color._namedColors.red.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "RosyBrown", {
            /**
            * Returns a Color object set to the color named color RosyBrown.
            */
            get: function () {
                return Color._namedColors.rosybrown.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "RoyalBlue", {
            /**
            * Returns a Color object set to the color named color RoyalBlue.
            */
            get: function () {
                return Color._namedColors.royalblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "SaddleBrown", {
            /**
            * Returns a Color object set to the color named color SaddleBrown.
            */
            get: function () {
                return Color._namedColors.saddlebrown.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Salmon", {
            /**
            * Returns a Color object set to the color named color Salmon.
            */
            get: function () {
                return Color._namedColors.salmon.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "SandyBrown", {
            /**
            * Returns a Color object set to the color named color SandyBrown.
            */
            get: function () {
                return Color._namedColors.sandybrown.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "SeaGreen", {
            /**
            * Returns a Color object set to the color named color SeaGreen.
            */
            get: function () {
                return Color._namedColors.seagreen.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "SeaShell", {
            /**
            * Returns a Color object set to the color named color SeaShell.
            */
            get: function () {
                return Color._namedColors.seashell.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Sienna", {
            /**
            * Returns a Color object set to the color named color Sienna.
            */
            get: function () {
                return Color._namedColors.sienna.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Silver", {
            /**
            * Returns a Color object set to the color named color Silver.
            */
            get: function () {
                return Color._namedColors.silver.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "SkyBlue", {
            /**
            * Returns a Color object set to the color named color SkyBlue.
            */
            get: function () {
                return Color._namedColors.skyblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "SlateBlue", {
            /**
            * Returns a Color object set to the color named color SlateBlue.
            */
            get: function () {
                return Color._namedColors.slateblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "SlateGray", {
            /**
            * Returns a Color object set to the color named color SlateGray.
            */
            get: function () {
                return Color._namedColors.slategray.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Snow", {
            /**
            * Returns a Color object set to the color named color Snow.
            */
            get: function () {
                return Color._namedColors.snow.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "SpringGreen", {
            /**
            * Returns a Color object set to the color named color SpringGreen.
            */
            get: function () {
                return Color._namedColors.springgreen.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "SteelBlue", {
            /**
            * Returns a Color object set to the color named color SteelBlue.
            */
            get: function () {
                return Color._namedColors.steelblue.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Tan", {
            /**
            * Returns a Color object set to the color named color Tan.
            */
            get: function () {
                return Color._namedColors.tan.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Teal", {
            /**
            * Returns a Color object set to the color named color Teal.
            */
            get: function () {
                return Color._namedColors.teal.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Thistle", {
            /**
            * Returns a Color object set to the color named color Thistle.
            */
            get: function () {
                return Color._namedColors.thistle.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Tomato", {
            /**
            * Returns a Color object set to the color named color Tomato.
            */
            get: function () {
                return Color._namedColors.tomato.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Turquoise", {
            /**
            * Returns a Color object set to the color named color Turquoise.
            */
            get: function () {
                return Color._namedColors.turquoise.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Violet", {
            /**
            * Returns a Color object set to the color named color Violet.
            */
            get: function () {
                return Color._namedColors.violet.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Wheat", {
            /**
            * Returns a Color object set to the color named color Wheat.
            */
            get: function () {
                return Color._namedColors.wheat.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "White", {
            /**
            * Returns a Color object set to the color named color White.
            */
            get: function () {
                return Color._namedColors.white.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "WhiteSmoke", {
            /**
            * Returns a Color object set to the color named color WhiteSmoke.
            */
            get: function () {
                return Color._namedColors.whitesmoke.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "Yellow", {
            /**
            * Returns a Color object set to the color named color Yellow.
            */
            get: function () {
                return Color._namedColors.yellow.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "YellowGreen", {
            /**
            * Returns a Color object set to the color named color YellowGreen.
            */
            get: function () {
                return Color._namedColors.yellowgreen.Clone();
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Returns a copy of the color with the current color channels.
        */
        Color.prototype.Clone = function () {
            return new Color(this.R, this.G, this.B, this.A);
        };
        /**
        * Disposes the Color object and unbinds any active event bindings.
        */
        Color.prototype.Dispose = function () {
            this._onChange.Dispose();
        };
        /**
        * toString override that returns the Color in the "rgba(r,g,b,a)" format.
        */
        Color.prototype.toString = function () {
            if (this._cached === undefined) {
                this._cached = 'rgba(' + this.R + ',' + this.G + ',' + this.B + ',' + this.A + ')';
            }
            return this._cached;
        };
        //Regex to match rgba in hex form ffffffff, 00000000, ff33dd4499
        Color.RgbaHexRegExp = /^([a-f\d])([a-f\d])([a-f\d])([a-f\d])$/i;
        //Regex to match function color form for argb(d, n, n, n), rgb(n, n, n), and rgba(n, n, n, d) 
        Color.RgbRegExp = /^(argb|rgb|rgba)\s*\(\s*([\d+(\.\d+)]{0,3})\s*,\s*([\d]{0,3})\s*,\s*([\d]{0,3})\s*(?:,\s*([\d+(\.\d+)]{0,3})\s*)?\s*\)$/i;
        //regex to match rgb in hex form ffffff, 000000, ff33dd
        Color.RgbaRegExp = /^([a-f\d])([a-f\d])([a-f\d])$/i;
        //Object to hold all HTML5 named colors
        //ref: http://www.tutorialspoint.com/html5/html5_color_names.htm
        Color._namedColors = {
            "transparent": new Color(255, 255, 255, 0),
            "aliceblue": new Color("#f0f8ff"),
            "antiquewhite": new Color("#faebd7"),
            "aqua": new Color("#00ffff"),
            "aquamarine": new Color("#7fffd4"),
            "azure": new Color("#f0ffff"),
            "beige": new Color("#f5f5dc"),
            "bisque": new Color("#ffe4c4"),
            "black": new Color("#000000"),
            "blanchedalmond": new Color("#ffebcd"),
            "blue": new Color("#0000ff"),
            "blueviolet": new Color("#8a2be2"),
            "brown": new Color("#a52a2a"),
            "burlywood": new Color("#deb887"),
            "cadetblue": new Color("#5f9ea0"),
            "chartreuse": new Color("#7fff00"),
            "chocolate": new Color("#d2691e"),
            "coral": new Color("#ff7f50"),
            "cornflowerblue": new Color("#6495ed"),
            "cornsilk": new Color("#fff8dc"),
            "crimson": new Color("#dc143c"),
            "cyan": new Color("#00ffff"),
            "darkblue": new Color("#00008b"),
            "darkcyan": new Color("#008b8b"),
            "darkgoldenrod": new Color("#b8860b"),
            "darkgray": new Color("#a9a9a9"),
            "darkgreen": new Color("#006400"),
            "darkkhaki": new Color("#bdb76b"),
            "darkmagenta": new Color("#8b008b"),
            "darkolivegreen": new Color("#556b2f"),
            "darkorange": new Color("#ff8c00"),
            "darkorchid": new Color("#9932cc"),
            "darkred": new Color("#8b0000"),
            "darksalmon": new Color("#e9967a"),
            "darkseagreen": new Color("#8fbc8f"),
            "darkslateblue": new Color("#483d8b"),
            "darkslategray": new Color("#2f4f4f"),
            "darkturquoise": new Color("#00ced1"),
            "darkviolet": new Color("#9400d3"),
            "deeppink": new Color("#ff1493"),
            "deepskyblue": new Color("#00bfff"),
            "dimgray": new Color("#696969"),
            "dodgerblue": new Color("#1e90ff"),
            "firebrick": new Color("#b22222"),
            "floralwhite": new Color("#fffaf0"),
            "forestgreen": new Color("#228b22"),
            "fuchsia": new Color("#ff00ff"),
            "gainsboro": new Color("#dcdcdc"),
            "ghostwhite": new Color("#f8f8ff"),
            "gold": new Color("#ffd700"),
            "goldenrod": new Color("#daa520"),
            "gray": new Color("#808080"),
            "green": new Color("#008000"),
            "greenyellow": new Color("#adff2f"),
            "honeydew": new Color("#f0fff0"),
            "hotpink": new Color("#ff69b4"),
            "indianred": new Color("#cd5c5c"),
            "indigo": new Color("#4b0082"),
            "ivory": new Color("#fffff0"),
            "khaki": new Color("#f0e68c"),
            "lavender": new Color("#e6e6fa"),
            "lavenderblush": new Color("#fff0f5"),
            "lawngreen": new Color("#7cfc00"),
            "lemonchiffon": new Color("#fffacd"),
            "lightblue": new Color("#add8e6"),
            "lightcoral": new Color("#f08080"),
            "lightcyan": new Color("#e0ffff"),
            "lightgoldenrodyellow": new Color("#fafad2"),
            "lightgray": new Color("#d3d3d3"),
            "lightgrey": new Color("#d3d3d3"),
            "lightgreen": new Color("#90ee90"),
            "lightpink": new Color("#ffb6c1"),
            "lightsalmon": new Color("#ffa07a"),
            "lightseagreen": new Color("#20b2aa"),
            "lightskyblue": new Color("#87cefa"),
            "lightslategray": new Color("#778899"),
            "lightsteelblue": new Color("#b0c4de"),
            "lightyellow": new Color("#ffffe0"),
            "lime": new Color("#00ff00"),
            "limegreen": new Color("#32cd32"),
            "linen": new Color("#faf0e6"),
            "magenta": new Color("#ff00ff"),
            "maroon": new Color("#800000"),
            "mediumaquamarine": new Color("#66cdaa"),
            "mediumblue": new Color("#0000cd"),
            "mediumorchid": new Color("#ba55d3"),
            "mediumpurple": new Color("#9370d8"),
            "mediumseagreen": new Color("#3cb371"),
            "mediumslateblue": new Color("#7b68ee"),
            "mediumspringgreen": new Color("#00fa9a"),
            "mediumturquoise": new Color("#48d1cc"),
            "mediumvioletred": new Color("#c71585"),
            "midnightblue": new Color("#191970"),
            "mintcream": new Color("#f5fffa"),
            "mistyrose": new Color("#ffe4e1"),
            "moccasin": new Color("#ffe4b5"),
            "navajowhite": new Color("#ffdead"),
            "navy": new Color("#000080"),
            "oldlace": new Color("#fdf5e6"),
            "olive": new Color("#808000"),
            "olivedrab": new Color("#6b8e23"),
            "orange": new Color("#ffa500"),
            "orangered": new Color("#ff4500"),
            "orchid": new Color("#da70d6"),
            "palegoldenrod": new Color("#eee8aa"),
            "palegreen": new Color("#98fb98"),
            "paleturquoise": new Color("#afeeee"),
            "palevioletred": new Color("#d87093"),
            "papayawhip": new Color("#ffefd5"),
            "peachpuff": new Color("#ffdab9"),
            "peru": new Color("#cd853f"),
            "pink": new Color("#ffc0cb"),
            "plum": new Color("#dda0dd"),
            "powderblue": new Color("#b0e0e6"),
            "purple": new Color("#800080"),
            "red": new Color("#ff0000"),
            "rosybrown": new Color("#bc8f8f"),
            "royalblue": new Color("#4169e1"),
            "saddlebrown": new Color("#8b4513"),
            "salmon": new Color("#fa8072"),
            "sandybrown": new Color("#f4a460"),
            "seagreen": new Color("#2e8b57"),
            "seashell": new Color("#fff5ee"),
            "sienna": new Color("#a0522d"),
            "silver": new Color("#c0c0c0"),
            "skyblue": new Color("#87ceeb"),
            "slateblue": new Color("#6a5acd"),
            "slategray": new Color("#708090"),
            "snow": new Color("#fffafa"),
            "springgreen": new Color("#00ff7f"),
            "steelblue": new Color("#4682b4"),
            "tan": new Color("#d2b48c"),
            "teal": new Color("#008080"),
            "thistle": new Color("#d8bfd8"),
            "tomato": new Color("#ff6347"),
            "turquoise": new Color("#40e0d0"),
            "violet": new Color("#ee82ee"),
            "wheat": new Color("#f5deb3"),
            "white": new Color("#ffffff"),
            "whitesmoke": new Color("#f5f5f5"),
            "yellow": new Color("#ffff00"),
            "yellowgreen": new Color("#9acd32")
        };
        return Color;
    }());
    Graphics.Color = Color;
    /**
    * Defines an abstract class TileMap that takes an array of resources to be mapped to tiles.
    */
    var TileMap = /** @class */ (function (_super) {
        __extends(TileMap, _super);
        /**
        * Creates a new instance of the TileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        */
        function TileMap(x, y, resources) {
            var _this = _super.call(this, new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](x, y)) || this;
            _this._Resources = resources;
            return _this;
        }
        /**
        * Scale is not implemented.
        */
        TileMap.prototype.Scale = function (scale) {
            throw new Error("Scale is not implemented for TileMaps.");
        };
        return TileMap;
    }(Graphics.Graphic2d));
    Graphics.TileMap = TileMap;
    /**
* Defines a structure that is proficient at creating diverse tile maps based off of a resource image.  Best drawn via a SceneryHandler.
*/
    var SquareTileMap = /** @class */ (function (_super) {
        __extends(SquareTileMap, _super);
        function SquareTileMap(x, y, tileWidth, tileHeight, resources, mappings, staticMap, drawGridLines) {
            if (staticMap === void 0) { staticMap = true; }
            if (drawGridLines === void 0) { drawGridLines = false; }
            var _this = _super.call(this, x, y, resources) || this;
            _this._mappings = mappings;
            _this._grid = new Graphics.Grid(0, 0, mappings.length, mappings[0].length, tileWidth, tileHeight, drawGridLines);
            _this._staticMap = staticMap;
            _this._onTileLoad = new _Utilities_EventHandler2__WEBPACK_IMPORTED_MODULE_6__["EventHandler2"]();
            _this._onLoaded = new _Utilities_EventHandler__WEBPACK_IMPORTED_MODULE_3__["EventHandler"]();
            _this._loaded = false;
            _this._tilesBuilt = 0;
            _this._totalTiles = _this._grid.Rows * _this._grid.Columns;
            _this.TileLoadDelay = _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_5__["TimeSpan"].Zero;
            _this.RowLoadDelay = _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_5__["TimeSpan"].Zero;
            if (_this._staticMap) {
                _this.BuildCache();
            }
            // Execute this on the next stack, to allow time for binding to the tile maps load events
            setTimeout(function () {
                _this.FillGridWith(mappings, function () {
                    _this._loaded = true;
                    _this._onLoaded.Trigger();
                });
            }, 0);
            return _this;
        }
        Object.defineProperty(SquareTileMap.prototype, "OnTileLoad", {
            /**
            * Gets an event that is triggered when a tile has been loaded, first argument is the tile details for the loaded tile, second is the percent complete.  Once this SquareTileMap has been created and all tiles loaded this event will no longer be triggered. Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onTileLoad;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SquareTileMap.prototype, "OnLoaded", {
            /**
            * Gets an event that is triggered when the square tile map has been loaded.  Once this SquareTileMap has been created and all tiles loaded this event will no longer be triggered. Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onLoaded;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Helper function used to take a SpriteSheet image and create a one dimensional resource tile array.
        * @param imageSource The sprite sheet to extract the tile resources from.
        * @param tileWidth The width of the sprite sheet tiles.
        * @param tileHeight The height of the sprite sheet tiles.
        */
        SquareTileMap.ExtractTiles = function (imageSource, tileWidth, tileHeight) {
            var resources = [], framesPerRow = Math.floor(imageSource.ClipSize.Width / tileWidth), rows = Math.floor(imageSource.ClipSize.Height / tileHeight);
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < framesPerRow; j++) {
                    resources.push(imageSource.Extract(j * tileWidth, i * tileHeight, tileWidth, tileHeight));
                }
            }
            return resources;
        };
        /**
        * Determines if the current SquareTileMap is loaded.
        */
        SquareTileMap.prototype.IsLoaded = function () {
            return this._loaded;
        };
        /**
        * Draws the SquareTileMap onto the given context.  If the SquareTileMap is part of a Scene2d or SceneryHandler the Draw function will be called automatically.
        * @param context The canvas context to draw the SquareTileMap onto.
        */
        SquareTileMap.prototype.Draw = function (context) {
            _super.prototype._StartDraw.call(this, context);
            if (!this._staticMap) {
                this._grid.Draw(context);
            }
            else {
                context.drawImage(this._mapCache, -this._mapCache.width / 2, -this._mapCache.height / 2);
            }
            _super.prototype._EndDraw.call(this, context);
        };
        /**
        * The bounding area that represents where the SquareTileMap will draw.
        */
        SquareTileMap.prototype.GetDrawBounds = function () {
            var bounds = this._grid.GetDrawBounds();
            bounds.Position = this.Position;
            return bounds;
        };
        /**
        * Removes all children and unbinds all events associated with the SquareTileMap.
        */
        SquareTileMap.prototype.Dispose = function () {
            this._grid.Dispose();
            this._onLoaded.Dispose();
            this._onTileLoad.Dispose();
            _super.prototype.Dispose.call(this);
        };
        /**
        * Returns a nearly identical copy of this SquareTileMap.  If this SquareTileMap belongs to a parent, the cloned SquareTileMap will not. If this SquareTileMap has children, all children will be cloned as well.  Lastly, the cloned SquareTileMap will not have the same event bindings as this one does.
        */
        SquareTileMap.prototype.Clone = function () {
            var graphic = new SquareTileMap(this.Position.X, this.Position.Y, this._grid.TileSize.Width, this._grid.TileSize.Height, this._Resources, this._mappings);
            graphic.Opacity = this.Opacity;
            graphic.Rotation = this.Rotation;
            graphic.Visible = this.Visible;
            graphic.ZIndex = this.ZIndex;
            graphic.RowLoadDelay = this.RowLoadDelay.Clone();
            graphic.TileLoadDelay = this.TileLoadDelay.Clone();
            return graphic;
        };
        SquareTileMap.prototype.BuildCache = function () {
            var size = this._grid.Size, originalPosition = this._grid.Position;
            // @ts-ignore
            this._mapCache = document.createElement("canvas");
            this._mapCache.width = size.Width;
            this._mapCache.height = size.Height;
            // @ts-ignore
            this._mapCacheContext = this._mapCache.getContext("2d");
            this._mapCacheContext.translate(size.HalfWidth, size.HalfHeight);
        };
        SquareTileMap.prototype.CacheTile = function (tile) {
            // Draw the tile onto the map cache
            tile.Draw(this._mapCacheContext);
        };
        SquareTileMap.prototype.FillGridWith = function (mappings, onComplete) {
            var _this = this;
            Object(_Extensions_Helpers__WEBPACK_IMPORTED_MODULE_7__["asyncLoop"])(function (next, rowsComplete) {
                _this.AsyncBuildGridRow(rowsComplete, mappings, function () {
                    next();
                });
            }, mappings.length, function () {
                onComplete();
            });
        };
        SquareTileMap.prototype.AsyncBuildGridTile = function (row, column, resourceIndex, onComplete) {
            var _this = this;
            var action = function () {
                var tile, tileGraphic = _this._Resources[resourceIndex];
                tile = new SquareTile(tileGraphic, _this._grid.TileSize.Width, _this._grid.TileSize.Height);
                _this._grid.Fill(row, column, tile);
                _this.OnTileLoad.Trigger({
                    Tile: tile,
                    Row: row,
                    Column: column,
                    ResourceIndex: resourceIndex,
                    Parent: _this
                }, _this._tilesBuilt / _this._totalTiles);
                if (_this._staticMap) {
                    _this.CacheTile(tile);
                }
                onComplete(tile);
            };
            if (this.TileLoadDelay.Milliseconds > 0) {
                setTimeout(action, this.TileLoadDelay.Milliseconds);
            }
            else {
                action();
            }
        };
        // Only pretend async in order to free up the DOM
        SquareTileMap.prototype.AsyncBuildGridRow = function (rowIndex, mappings, onComplete) {
            var _this = this;
            setTimeout(function () {
                Object(_Extensions_Helpers__WEBPACK_IMPORTED_MODULE_7__["asyncLoop"])(function (next, tilesLoaded) {
                    _this._tilesBuilt++;
                    if (mappings[rowIndex][tilesLoaded] >= 0) {
                        _this.AsyncBuildGridTile(rowIndex, tilesLoaded, mappings[rowIndex][tilesLoaded], function (tile) {
                            next();
                        });
                    }
                    else {
                        next();
                    }
                }, mappings[rowIndex].length, function () {
                    onComplete();
                });
            }, this.RowLoadDelay.Milliseconds);
        };
        return SquareTileMap;
    }(TileMap));
    Graphics.SquareTileMap = SquareTileMap;
    /**
    * Defines a SquareTile that is used by the SquareTileMap.  Represents one tile within the tile map.
    */
    var SquareTile = /** @class */ (function (_super) {
        __extends(SquareTile, _super);
        /**
        * Creates a new instance of the SquareTile object.
        * @param image The image that is within the tile.
        * @param width The width of the tile.
        * @param height The height of the tile.
        */
        function SquareTile(image, width, height) {
            return _super.call(this, 0, 0, image, width, height) || this;
        }
        return SquareTile;
    }(Sprite2d));
    Graphics.SquareTile = SquareTile;
    /**
    * Defines an animation that can be drawn to the screen.
    */
    var SpriteAnimation = /** @class */ (function () {
        function SpriteAnimation(imageSource, fps, frameSize, frameCount, startOffset) {
            if (startOffset === void 0) { startOffset = _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero; }
            var _this = this;
            this._imageSource = imageSource;
            this._frameSize = frameSize;
            this._frameCount = frameCount;
            this._startOffset = startOffset;
            this._playing = false;
            this._repeating = false;
            this._currentFrame = 0;
            this._lastStepAt = 0;
            this._onComplete = new _Utilities_EventHandler__WEBPACK_IMPORTED_MODULE_3__["EventHandler"]();
            this.Fps = fps;
            if (imageSource.ClipSize !== null || imageSource.IsLoaded()) {
                this._framesPerRow = Math.min(Math.floor((imageSource.Size.Width - startOffset.X) / frameSize.Width), frameCount);
                this.UpdateImageSource();
            }
            else {
                imageSource.OnLoaded.BindFor(function (image) {
                    _this._framesPerRow = Math.min(Math.floor((imageSource.Size.Width - startOffset.X) / frameSize.Width), frameCount);
                    _this.UpdateImageSource();
                }, 1);
                this._framesPerRow = 1;
            }
        }
        Object.defineProperty(SpriteAnimation.prototype, "OnComplete", {
            /**
            * Gets an event that is triggered when the animation has completed, will not trigger if the animation is repeating.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onComplete;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriteAnimation.prototype, "Fps", {
            /**
            * Gets or sets the current frames per second.
            */
            get: function () {
                return this._fps;
            },
            set: function (newFps) {
                this._fps = newFps;
                this._stepEvery = 1000 / this._fps;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Determines if the animation is currently playing.
        */
        SpriteAnimation.prototype.IsPlaying = function () {
            return this._playing;
        };
        /**
        * Determines if the animation can play.  This is essentially checking if the underlying image source is loaded.
        */
        SpriteAnimation.prototype.CanPlay = function () {
            return this._imageSource.IsLoaded();
        };
        SpriteAnimation.prototype.Play = function (repeat) {
            if (repeat === void 0) { repeat = false; }
            if (!this._imageSource.ClipSize) {
                throw new Error("Image source not loaded yet.");
            }
            this._lastStepAt = new Date().getTime();
            this._repeating = repeat;
            this._playing = true;
            this.UpdateImageSource();
        };
        /**
        * Pauses the animation.
        */
        SpriteAnimation.prototype.Pause = function () {
            this._playing = false;
        };
        SpriteAnimation.prototype.Step = function (count) {
            if (count === void 0) { count = 1; }
            this._currentFrame += count;
            if (this._currentFrame >= this._frameCount) {
                if (this._repeating) {
                    this._currentFrame %= this._frameCount;
                }
                else {
                    this._currentFrame = this._frameCount - 1;
                    this.OnComplete.Trigger();
                    this.Stop(false);
                }
            }
            if (count !== 0) {
                this.UpdateImageSource();
            }
        };
        SpriteAnimation.prototype.Stop = function (resetFrame) {
            if (resetFrame === void 0) { resetFrame = true; }
            this._playing = false;
            if (resetFrame) {
                this.Reset();
            }
        };
        /**
        * Resets the current animation frame to 0.
        */
        SpriteAnimation.prototype.Reset = function () {
            this._currentFrame = 0;
            this.UpdateImageSource();
        };
        /**
        * Updates the animations current frame.  Needs to be updated in order to play the animation.
        * @param gameTime The current game time object.
        */
        SpriteAnimation.prototype.Update = function (gameTime) {
            var timeSinceStep = gameTime.Now.getTime() - this._lastStepAt, stepCount = 0;
            if (this._playing) {
                stepCount = Math.floor(timeSinceStep / this._stepEvery);
                if (stepCount > 0) {
                    this._lastStepAt = gameTime.Now.getTime();
                    this.Step(stepCount);
                }
            }
        };
        /**
        * Unbinds all events.  Does not dispose the underlying image source.
        */
        SpriteAnimation.prototype.Dispose = function () {
            this._onComplete.Dispose();
        };
        SpriteAnimation.prototype.UpdateImageSource = function () {
            var row = this.GetFrameRow(), column = this.GetFrameColumn();
            this._imageSource.ClipLocation.X = this._startOffset.X + column * this._frameSize.Width;
            this._imageSource.ClipLocation.Y = this._startOffset.Y + row * this._frameSize.Height;
            this._imageSource.ClipSize = this._frameSize;
        };
        SpriteAnimation.prototype.GetFrameRow = function () {
            return Math.floor(this._currentFrame / this._framesPerRow);
        };
        SpriteAnimation.prototype.GetFrameColumn = function () {
            return Math.ceil(this._currentFrame % this._framesPerRow);
        };
        return SpriteAnimation;
    }());
    Graphics.SpriteAnimation = SpriteAnimation;
    /**
* Abstract drawable shape type that is used create customizable drawable graphics.
*/
    var Shape = /** @class */ (function (_super) {
        __extends(Shape, _super);
        function Shape(position, color) {
            var _this = _super.call(this, position) || this;
            _this._type = "Shape";
            _this._fillChangeWire = function (color) {
                _this._State.FillStyle = color.toString();
            };
            _this._strokeChangeWire = function (color) {
                _this._State.StrokeStyle = color.toString();
            };
            _this._shadowChangeWire = function (color) {
                _this._State.ShadowColor = color.toString();
            };
            _this.ShadowColor = _this._shadowColor = Color.Black;
            _this.BorderColor = _this._strokeStyle = Color.Black;
            if (typeof color !== "undefined") {
                if (typeof color === "string") {
                    color = new Color(color);
                }
                _this.Color = _this._fillStyle = color;
            }
            else {
                _this.Color = _this._fillStyle = Color.Black;
            }
            return _this;
        }
        Object.defineProperty(Shape.prototype, "Color", {
            /**
            * Gets or sets the current shape color.  Valid colors are strings like "red" or "rgb(255,0,0)".
            */
            get: function () {
                return this._fillStyle;
            },
            set: function (color) {
                if (typeof color === "string") {
                    color = new Color(color);
                }
                // Unbind old
                this._fillStyle.OnChange.Unbind(this._fillChangeWire);
                this._fillStyle = color;
                // Bind new
                this._fillStyle.OnChange.Bind(this._fillChangeWire);
                // Update state
                this._fillChangeWire(color);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "BorderThickness", {
            /**
            * Gets or sets the current border thickness.
            */
            get: function () {
                return this._State.LineWidth;
            },
            set: function (thickness) {
                this._State.LineWidth = thickness;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "BorderColor", {
            /**
            * Gets or sets the current border color.  Valid colors are strings like "red" or "rgb(255,0,0)".
            */
            get: function () {
                return this._strokeStyle;
            },
            set: function (color) {
                if (typeof color === "string") {
                    color = new Color(color);
                }
                // Unbind old
                this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
                this._strokeStyle = color;
                // Bind new
                this._strokeStyle.OnChange.Bind(this._strokeChangeWire);
                // Update state
                this._strokeChangeWire(color);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "ShadowColor", {
            /**
            * Gets or sets the current shadow color.  Valid colors are strings like "red" or "rgb(255,0,0)".
            */
            get: function () {
                return this._shadowColor;
            },
            set: function (color) {
                if (typeof color === "string") {
                    color = new Color(color);
                }
                // Unbind old
                this._shadowColor.OnChange.Unbind(this._shadowChangeWire);
                this._shadowColor = color;
                // Bind new
                this._shadowColor.OnChange.Bind(this._shadowChangeWire);
                // Update state
                this._shadowChangeWire(color);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "ShadowX", {
            /**
            * Gets or sets the current horizontal shadow position.
            */
            get: function () {
                return this._State.ShadowOffsetX;
            },
            set: function (x) {
                this._State.ShadowOffsetX = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "ShadowY", {
            /**
            * Gets or sets the current vertical shadow position.
            */
            get: function () {
                return this._State.ShadowOffsetY;
            },
            set: function (y) {
                this._State.ShadowOffsetY = y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "ShadowBlur", {
            /**
            * Gets or sets the current shadow blur.
            */
            get: function () {
                return this._State.ShadowBlur;
            },
            set: function (blur) {
                this._State.ShadowBlur = blur;
            },
            enumerable: true,
            configurable: true
        });
        Shape.prototype.Border = function (thickness, color) {
            this.BorderThickness = thickness;
            this.BorderColor = color;
        };
        Shape.prototype.Shadow = function (x, y, color, blur) {
            this.ShadowX = x;
            this.ShadowY = y;
            this.ShadowColor = color;
            // @ts-ignore
            this.ShadowBlur = blur;
        };
        Shape.prototype._StartDraw = function (context) {
            _super.prototype._StartDraw.call(this, context);
            context.beginPath();
        };
        Shape.prototype._EndDraw = function (context) {
            context.fill();
            if (this._State.LineWidth > 0) {
                context.stroke();
            }
            else {
                context.closePath();
            }
            _super.prototype._EndDraw.call(this, context);
        };
        // This should be overridden if you want to build a proper shape
        Shape.prototype._BuildPath = function (context) {
        };
        /**
        * Draws the shape onto the given context.  If this shape is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the shape onto.
        */
        Shape.prototype.Draw = function (context) {
            this._StartDraw(context);
            this._BuildPath(context);
            this._EndDraw(context);
        };
        Shape.prototype.Dispose = function () {
            _super.prototype.Dispose.call(this);
            this._fillStyle.OnChange.Unbind(this._fillChangeWire);
            this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
            this._shadowColor.OnChange.Unbind(this._shadowChangeWire);
        };
        Shape.prototype._Clone = function (graphic) {
            graphic.Border(this.BorderThickness, this.BorderColor.Clone());
            graphic.Shadow(this.ShadowX, this.ShadowY, this.ShadowColor.Clone(), this.ShadowBlur);
            _super.prototype._Clone.call(this, graphic);
        };
        return Shape;
    }(Graphic2d));
    Graphics.Shape = Shape;
    /**
* Defines a drawable rectangle.
*/
    var Rectangle = /** @class */ (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle(x, y, width, height, color) {
            var _this = _super.call(this, new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](x, y), color) || this;
            _this._type = "Rectangle";
            _this.Size = new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_1__["Size2d"](width, height);
            return _this;
        }
        /**
        * The bounding area that represents where the Rectangle will draw.
        */
        Rectangle.prototype.GetDrawBounds = function () {
            var bounds = new _Bounds_Bounds__WEBPACK_IMPORTED_MODULE_2__["Bounds"].BoundingRectangle(this.Position, this.Size);
            bounds.Rotation = this.Rotation;
            return bounds;
        };
        /**
        * Scale's the rectangle graphic.
        * @param scale The value to multiply the graphic's size by.
        */
        Rectangle.prototype.Scale = function (scale) {
            this.Size.Width *= scale;
            this.Size.Height *= scale;
        };
        /**
        * Returns a nearly identical copy of this Rectangle.  If this Rectangle belongs to a parent, the cloned Rectangle will not. If this Rectangle has children, all children will be cloned as well.  Lastly, the cloned Rectangle will not have the same event bindings as this one does.
        */
        Rectangle.prototype.Clone = function () {
            var graphic = new Rectangle(this.Position.X, this.Position.Y, this.Size.Width, this.Size.Height, this.Color.Clone());
            _super.prototype._Clone.call(this, graphic);
            return graphic;
        };
        Rectangle.prototype._BuildPath = function (context) {
            context.rect(-this.Size.HalfWidth, -this.Size.HalfHeight, this.Size.Width, this.Size.Height);
        };
        return Rectangle;
    }(Shape));
    Graphics.Rectangle = Rectangle;
    /**
* Defines a drawable circle.
*/
    var Circle = /** @class */ (function (_super) {
        __extends(Circle, _super);
        function Circle(x, y, radius, color) {
            var _this = _super.call(this, new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](x, y), color) || this;
            _this._type = "Circle";
            _this.Radius = radius;
            return _this;
        }
        /**
        * The bounding area that represents where the Circle will draw.
        */
        Circle.prototype.GetDrawBounds = function () {
            var bounds = new _Bounds_Bounds__WEBPACK_IMPORTED_MODULE_2__["Bounds"].BoundingCircle(this.Position, this.Radius);
            bounds.Rotation = this.Rotation;
            return bounds;
        };
        /**
        * Scale's the circle graphic.
        * @param scale The value to multiply the graphic's size by.
        */
        Circle.prototype.Scale = function (scale) {
            this.Radius *= scale;
        };
        /**
        * Returns a nearly identical copy of this Circle.  If this Circle belongs to a parent, the cloned Circle will not. If this Circle has children, all children will be cloned as well.  Lastly, the cloned Circle will not have the same event bindings as this one does.
        */
        Circle.prototype.Clone = function () {
            var graphic = new Circle(this.Position.X, this.Position.Y, this.Radius, this.Color.Clone());
            _super.prototype._Clone.call(this, graphic);
            return graphic;
        };
        Circle.prototype._BuildPath = function (context) {
            context.arc(0, 0, this.Radius, 0, Math.twoPI);
        };
        return Circle;
    }(Shape));
    Graphics.Circle = Circle;
    /**
* Defines a drawable text element.
*/
    var Text2d = /** @class */ (function (_super) {
        __extends(Text2d, _super);
        function Text2d(x, y, text, color) {
            if (color === void 0) { color = Color.Black; }
            var _this = _super.call(this, new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](x, y), color) || this;
            _this._type = "Text2d";
            _this._text = text;
            _this._drawBounds = new _Bounds_Bounds__WEBPACK_IMPORTED_MODULE_2__["Bounds"].BoundingRectangle(_this.Position, _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_1__["Size2d"].One);
            _this._recalculateBoundsSize = true;
            _this._fontSettings = new FontSettings();
            _this.Align = "center";
            _this.Baseline = "middle";
            return _this;
        }
        Object.defineProperty(Text2d.prototype, "Align", {
            /**
            * Gets or sets the text alignment of the Text2d.  Values can be "start", "end", "left", "center", or "right".
            */
            get: function () {
                return this._State.TextAlign;
            },
            set: function (alignment) {
                this._State.TextAlign = alignment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text2d.prototype, "Baseline", {
            /**
            * Gets or sets the text baseline of the Text2d.  Values can be "top", "hanging", "middle", "alphabetic", "ideographic", and "bottom".
            */
            get: function () {
                return this._State.TextBaseline;
            },
            set: function (baseline) {
                this._State.TextBaseline = baseline;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text2d.prototype, "FontSettings", {
            /**
            * Gets the Text2d's FontSetting's.
            */
            get: function () {
                this._recalculateBoundsSize = true;
                return this._fontSettings;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text2d.prototype, "Text", {
            /**
            * Gets or sets the current Text2d's text.
            */
            get: function () {
                return this._text;
            },
            set: function (text) {
                this._recalculateBoundsSize = true;
                this._text = text;
            },
            enumerable: true,
            configurable: true
        });
        Text2d.prototype._StartDraw = function (context) {
            context.save();
            this._State.SetContextState(context);
            context.translate(this.Position.X, this.Position.Y);
            if (this.Rotation !== 0) {
                context.rotate(this.Rotation);
            }
        };
        Text2d.prototype._EndDraw = function (context) {
            var children = this.GetChildren();
            for (var i = 0; i < children.length; i++) {
                if (children[i].Visible) {
                    children[i].Draw(context);
                }
            }
            context.restore();
        };
        /**
        * Draws the text onto the given context.  If this Text2d is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the text onto.
        */
        Text2d.prototype.Draw = function (context) {
            var textSize;
            this._State.Font = this._fontSettings._BuildFont();
            this._StartDraw(context);
            context.fillText(this._text, 0, 0);
            if (this._State.LineWidth > 0) {
                context.strokeText(this._text, 0, 0);
            }
            // Only recalculate bounds if the text or font has changed since the last draw.
            if (this._recalculateBoundsSize) {
                this._recalculateBoundsSize = false;
                textSize = context.measureText(this._text);
                this._drawBounds.Size.Width = textSize.width;
                this._drawBounds.Size.Height = parseInt(this._fontSettings.FontSize) * 1.5;
            }
            this._EndDraw(context);
        };
        /**
        * The bounding area that represents where the Text2d will draw.
        */
        Text2d.prototype.GetDrawBounds = function () {
            this._drawBounds.Rotation = this.Rotation;
            this._drawBounds.Position = this.Position;
            return this._drawBounds;
        };
        /**
        * Scale's the fonts FontSize.
        * @param scale The value to multiply the graphic's size by.
        */
        Text2d.prototype.Scale = function (scale) {
            var size = parseInt(this.FontSettings.FontSize);
            this.FontSettings.FontSize = this.FontSettings.FontSize.replace(size.toString(), (size * scale).toString());
        };
        /**
        * Returns a nearly identical copy of this Text2d.  If this Text2d belongs to a parent, the cloned Text2d will not. If this Text2d has children, all children will be cloned as well.  Lastly, the cloned Text2d will not have the same event bindings as this one does.
        */
        Text2d.prototype.Clone = function () {
            var graphic = new Text2d(this.Position.X, this.Position.Y, this.Text, this.Color.Clone());
            graphic.Align = this.Align;
            graphic.Baseline = this.Baseline;
            graphic.FontSettings.FontFamily = this.FontSettings.FontFamily;
            graphic.FontSettings.FontSize = this.FontSettings.FontSize;
            graphic.FontSettings.FontStyle = this.FontSettings.FontStyle;
            graphic.FontSettings.FontVariant = this.FontSettings.FontVariant;
            graphic.FontSettings.FontWeight = this.FontSettings.FontWeight;
            _super.prototype._Clone.call(this, graphic);
            return graphic;
        };
        return Text2d;
    }(Shape));
    Graphics.Text2d = Text2d;
    /**
* Defines valid FontVariant's that can be used to change the appearance of Text2d's.
*/
    var FontVariant;
    (function (FontVariant) {
        FontVariant[FontVariant["Normal"] = 0] = "Normal";
        FontVariant[FontVariant["SmallCaps"] = 1] = "SmallCaps";
    })(FontVariant = Graphics.FontVariant || (Graphics.FontVariant = {}));
    ;
    /**
* Defines valid FontStyles that can be used to modify the font's style for Text2d's.
*/
    var FontStyle;
    (function (FontStyle) {
        FontStyle[FontStyle["Normal"] = 0] = "Normal";
        FontStyle[FontStyle["Italic"] = 1] = "Italic";
        FontStyle[FontStyle["Oblique"] = 2] = "Oblique";
    })(FontStyle = Graphics.FontStyle || (Graphics.FontStyle = {}));
    /**
* Defines a set of font settings that are used to modify the appearance of text that is drawn via Text2d's.
*/
    var FontSettings = /** @class */ (function () {
        /**
        * Creates a new instance of the FontSettings object with the following default values.
        * FontSize: 10px
        * FontFamily: Times New Roman
        */
        function FontSettings() {
            this._cachedState = {
                fontSize: "10px",
                fontFamily: FontFamily.TimesNewRoman,
                fontVariant: FontVariant.Normal,
                fontWeight: "",
                fontStyle: FontStyle.Normal
            };
            this._refreshCache = true;
            this._BuildFont();
        }
        Object.defineProperty(FontSettings.prototype, "FontSize", {
            /**
            * Gets or sets the current font size.  Values can be things such as 20px.
            */
            get: function () {
                return this._cachedState["fontSize"];
            },
            set: function (size) {
                this._refreshCache = true;
                this._cachedState["fontSize"] = size;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FontSettings.prototype, "FontFamily", {
            /**
            * Gets or sets the font family.
            */
            get: function () {
                return this._cachedState["fontFamily"];
            },
            set: function (family) {
                this._refreshCache = true;
                this._cachedState["fontFamily"] = family;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FontSettings.prototype, "FontVariant", {
            /**
            * Gets or sets the font variant.
            */
            get: function () {
                return this._cachedState["fontVariant"];
            },
            set: function (variant) {
                this._refreshCache = true;
                this._cachedState["fontVariant"] = variant;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FontSettings.prototype, "FontWeight", {
            /**
            * Gets or sets the current font weight.
            */
            get: function () {
                return this._cachedState["fontWeight"];
            },
            set: function (weight) {
                this._refreshCache = true;
                this._cachedState["fontWeight"] = weight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FontSettings.prototype, "FontStyle", {
            /**
            * Gets or sets the current font style.
            */
            get: function () {
                return this._cachedState["fontStyle"];
            },
            set: function (style) {
                this._refreshCache = true;
                this._cachedState["fontStyle"] = style;
            },
            enumerable: true,
            configurable: true
        });
        FontSettings.prototype._BuildFont = function () {
            var font;
            if (this._refreshCache) {
                font = this._cachedState["fontWeight"] + " " + FontStyle[this._cachedState["fontStyle"]].replace("Normal", "") + " " + FontVariant[this._cachedState["fontVariant"]].replace("Normal", "") + " " + this._cachedState["fontSize"];
                if (this._cachedState["fontFamily"] !== undefined) {
                    font += " " + FontFamily[this._cachedState["fontFamily"]];
                }
                this._cachedFont = font.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                this._refreshCache = false;
            }
            return this._cachedFont;
        };
        return FontSettings;
    }());
    Graphics.FontSettings = FontSettings;
    /**
* Defines valid FontFamilies that can be used to display Text2d's differently.
*/
    var FontFamily;
    (function (FontFamily) {
        FontFamily[FontFamily["Antiqua"] = 0] = "Antiqua";
        FontFamily[FontFamily["Arial"] = 1] = "Arial";
        FontFamily[FontFamily["Avqest"] = 2] = "Avqest";
        FontFamily[FontFamily["Blackletter"] = 3] = "Blackletter";
        FontFamily[FontFamily["Calibri"] = 4] = "Calibri";
        FontFamily[FontFamily["ComicSans"] = 5] = "ComicSans";
        FontFamily[FontFamily["Courier"] = 6] = "Courier";
        FontFamily[FontFamily["Decorative"] = 7] = "Decorative";
        FontFamily[FontFamily["Fraktur"] = 8] = "Fraktur";
        FontFamily[FontFamily["Frosty"] = 9] = "Frosty";
        FontFamily[FontFamily["Garamond"] = 10] = "Garamond";
        FontFamily[FontFamily["Georgia"] = 11] = "Georgia";
        FontFamily[FontFamily["Helvetica"] = 12] = "Helvetica";
        FontFamily[FontFamily["Impact"] = 13] = "Impact";
        FontFamily[FontFamily["Minion"] = 14] = "Minion";
        FontFamily[FontFamily["Modern"] = 15] = "Modern";
        FontFamily[FontFamily["Monospace"] = 16] = "Monospace";
        FontFamily[FontFamily["Palatino"] = 17] = "Palatino";
        FontFamily[FontFamily["Roman"] = 18] = "Roman";
        FontFamily[FontFamily["Script"] = 19] = "Script";
        FontFamily[FontFamily["Swiss"] = 20] = "Swiss";
        FontFamily[FontFamily["TimesNewRoman"] = 21] = "TimesNewRoman";
        FontFamily[FontFamily["Verdana"] = 22] = "Verdana";
    })(FontFamily = Graphics.FontFamily || (Graphics.FontFamily = {}));
    ;
    /**
    * Defines a drawable grid that can be used to store other graphics in a grid like structure.
    */
    var Grid = /** @class */ (function (_super) {
        __extends(Grid, _super);
        function Grid(x, y, rows, columns, tileWidth, tileHeight, drawGridLines, gridLineColor) {
            if (drawGridLines === void 0) { drawGridLines = false; }
            if (gridLineColor === void 0) { gridLineColor = new Color("gray"); }
            var _this = _super.call(this, new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](x, y)) || this;
            _this._type = "Grid";
            _this._size = new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_1__["Size2d"](tileWidth * columns, tileHeight * rows);
            _this._tileSize = new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_1__["Size2d"](tileWidth, tileHeight);
            _this._grid = [];
            _this._rows = rows;
            _this._columns = columns;
            _this._gridLines = [];
            _this.GridLineColor = gridLineColor;
            _this.DrawGridLines = drawGridLines;
            // Initialize our grid
            for (var i = 0; i < _this._rows; i++) {
                _this._grid[i] = [];
                for (var j = 0; j < _this._columns; j++) {
                    // @ts-ignore
                    _this._grid[i].push(null);
                }
            }
            return _this;
        }
        Object.defineProperty(Grid.prototype, "DrawGridLines", {
            /**
            * Gets or sets the DrawGridLines property.  Indicates whether the grids column and row lines will be drawn.
            */
            get: function () {
                return this._drawGridLines;
            },
            set: function (shouldDraw) {
                if (shouldDraw && this._gridLines.length === 0) {
                    this.BuildGridLines();
                }
                this._drawGridLines = shouldDraw;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "GridLineColor", {
            /**
            * Gets or sets the current grid line color.  Grid lines are only drawn of DrawGridLines is set to true.  Valid colors are strings like "red" or "rgb(255,0,0)".
            */
            get: function () {
                return this._gridLineColor;
            },
            set: function (color) {
                if (typeof color === "string") {
                    color = new Color(color);
                }
                this._gridLineColor = color;
                for (var i = 0; i < this._gridLines.length; i++) {
                    this._gridLines[i].Color = color;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "Size", {
            /**
            * Gets the size of the grid.
            */
            get: function () {
                return this._size.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "TileSize", {
            /**
            * Gets the size of the tiles.
            */
            get: function () {
                return this._tileSize.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "Rows", {
            /**
            * Gets the number of rows.
            */
            get: function () {
                return this._rows;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "Columns", {
            /**
            * Gets the number of columns.
            */
            get: function () {
                return this._columns;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Fills a tile with the provided graphic.
        * @param row The row.
        * @param column The column.
        * @param graphic The graphic to fill the tile with.
        */
        Grid.prototype.Fill = function (row, column, graphic) {
            if (!graphic || !this.ValidRow(row) || !this.ValidColumn(column)) {
                return;
            }
            graphic.Position = this.GetInsideGridPosition(row, column);
            this._grid[row][column] = graphic;
            this.AddChild(graphic);
        };
        Grid.prototype.FillRow = function (row, graphicList, columnOffset) {
            if (columnOffset === void 0) { columnOffset = 0; }
            var graphic;
            for (var i = 0; i < graphicList.length; i++) {
                graphic = graphicList[i];
                graphic.Position = this.GetInsideGridPosition(row, i + columnOffset);
                this._grid[row][i + columnOffset] = graphic;
                this.AddChild(graphic);
            }
        };
        Grid.prototype.FillColumn = function (column, graphicList, rowOffset) {
            if (rowOffset === void 0) { rowOffset = 0; }
            var graphic;
            for (var i = 0; i < graphicList.length; i++) {
                graphic = graphicList[i];
                graphic.Position = this.GetInsideGridPosition(i + rowOffset, column);
                this._grid[i + rowOffset][column] = graphic;
                this.AddChild(graphic);
            }
        };
        /**
        * Fills a tile with the provided graphic.
        * @param row The row to start filling at.
        * @param column The column to start filling at.
        * @param graphicList The list of graphics to fill the space with.  The space will be filled with as many elements that are contained within the multi-dimensional graphicList.
        */
        Grid.prototype.FillSpace = function (row, column, graphicList) {
            var graphic;
            for (var i = 0; i < graphicList.length; i++) {
                for (var j = 0; j < graphicList[i].length; j++) {
                    graphic = graphicList[i][j];
                    if (graphic) {
                        graphic.Position = this.GetInsideGridPosition(i + row, j + column);
                        this._grid[i + row][j + column] = graphic;
                        this.AddChild(graphic);
                    }
                }
            }
        };
        /**
        * Gets a graphic within the grid.
        * @param row The row.
        * @param column The column.
        */
        Grid.prototype.Get = function (row, column) {
            // @ts-ignore
            if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                // @ts-ignore
                return null;
            }
            return this._grid[row][column];
        };
        Grid.prototype.GetRow = function (row, columnOffset) {
            if (columnOffset === void 0) { columnOffset = 0; }
            var rowList = [];
            for (var i = columnOffset; i < this._columns; i++) {
                rowList.push(this._grid[row][i]);
            }
            return rowList;
        };
        Grid.prototype.GetColumn = function (column, rowOffset) {
            if (rowOffset === void 0) { rowOffset = 0; }
            var columnList = [];
            for (var i = rowOffset; i < this._rows; i++) {
                columnList.push(this._grid[i][column]);
            }
            return columnList;
        };
        /**
        * Retrieves graphics within row column cross section.
        * @param rowStart The row to start pulling graphics from.
        * @param columnStart The column to start pulling graphics from.
        * @param rowEnd The row to stop pulling graphics from.
        * @param columnEnd The column to stop pulling graphics from.
        */
        Grid.prototype.GetSpace = function (rowStart, columnStart, rowEnd, columnEnd) {
            var space = [], rowIncrementor = (rowEnd >= rowStart) ? 1 : -1, columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;
            for (var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                if (i >= this._rows) {
                    break;
                }
                for (var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                    if (j >= this._columns) {
                        break;
                    }
                    space.push(this._grid[i][j]);
                }
            }
            return space;
        };
        /**
        * Clear a grid tile.
        * @param row The row.
        * @param column The column.
        */
        Grid.prototype.Clear = function (row, column) {
            // @ts-ignore
            if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                // @ts-ignore
                return null;
            }
            var val = this._grid[row][column];
            // @ts-ignore
            this._grid[row][column] = null;
            this.RemoveChild(val);
            return val;
        };
        Grid.prototype.ClearRow = function (row, columnOffset) {
            if (columnOffset === void 0) { columnOffset = 0; }
            var vals = [];
            for (var i = 0; i < this._columns; i++) {
                vals.push(this._grid[row][i]);
                this.RemoveChild(this._grid[row][i]);
                // @ts-ignore
                this._grid[row][i] = null;
            }
            return vals;
        };
        Grid.prototype.ClearColumn = function (column, rowOffset) {
            if (rowOffset === void 0) { rowOffset = 0; }
            var vals = [];
            for (var i = 0; i < this._rows; i++) {
                vals.push(this._grid[i][column]);
                this.RemoveChild(this._grid[i][column]);
                // @ts-ignore
                this._grid[i][column] = null;
            }
            return vals;
        };
        /**
        * Clears graphics within row column cross section.
        * @param rowStart The row to start clearing graphics from.
        * @param columnStart The column to start clearing graphics from.
        * @param rowEnd The row to stop clearing graphics from.
        * @param columnEnd The column to stop clearing graphics from.
        */
        Grid.prototype.ClearSpace = function (rowStart, columnStart, rowEnd, columnEnd) {
            var space = [], rowIncrementor = (rowEnd >= rowStart) ? 1 : -1, columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;
            for (var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                if (i > this._rows) {
                    break;
                }
                for (var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                    if (j > this._columns) {
                        break;
                    }
                    space.push(this._grid[i][j]);
                    this.RemoveChild(this._grid[i][j]);
                    // @ts-ignore
                    this._grid[i][j] = null;
                }
            }
            return space;
        };
        /**
        * Draws the grid onto the given context.  If this grid is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the grid onto.
        */
        Grid.prototype.Draw = function (context) {
            _super.prototype._StartDraw.call(this, context);
            context.save();
            _super.prototype._EndDraw.call(this, context);
            if (this.DrawGridLines) {
                for (var i = 0; i < this._gridLines.length; i++) {
                    this._gridLines[i].Draw(context);
                }
            }
            context.restore();
        };
        /**
        * The bounding area that represents where the grid will draw.
        */
        Grid.prototype.GetDrawBounds = function () {
            var bounds = new _Bounds_Bounds__WEBPACK_IMPORTED_MODULE_2__["Bounds"].BoundingRectangle(this.Position, this._size);
            bounds.Rotation = this.Rotation;
            return bounds;
        };
        /**
        * Scale is not implemented.
        * @param scale The value to multiply the graphic's size by.
        */
        Grid.prototype.Scale = function (scale) {
            throw new Error("Scale is not implemented for the Grid class.");
        };
        /**
        * Converts the provided vertical coordinate to a row number that is based on the current grid.
        * @param y The vertical coordinate to convert to a row.
        */
        Grid.prototype.ConvertToRow = function (y) {
            return Math.floor((y - (this.Position.Y - this._size.HalfHeight)) / this._tileSize.Height);
        };
        /**
        * Converts the provided horizontal coordinate to a column number that is based on the current grid.
        * @param x The horizontal component to convert to a column.
        */
        Grid.prototype.ConvertToColumn = function (x) {
            return Math.floor((x - (this.Position.X - this._size.HalfWidth)) / this._tileSize.Width);
        };
        /**
        * Returns a nearly identical copy of this Grid.  If this Grid belongs to a parent, the cloned Grid will not. If this Grid has children, all children will be cloned as well.  Lastly, the cloned Grid will not have the same event bindings as this one does.
        */
        Grid.prototype.Clone = function () {
            var graphic = new Grid(this.Position.X, this.Position.Y, this._rows, this._columns, this._tileSize.Width, this._tileSize.Height, this._drawGridLines, this._gridLineColor.Clone());
            for (var i = 0; i < this._grid.length; i++) {
                for (var j = 0; j < this._grid[i].length; j++) {
                    if (this._grid[i][j]) {
                        graphic.Fill(i, j, this._grid[i][j].Clone());
                    }
                }
            }
            graphic.Opacity = this.Opacity;
            graphic.Rotation = this.Rotation;
            graphic.Visible = this.Visible;
            graphic.ZIndex = this.ZIndex;
            return graphic;
        };
        Grid.prototype.BuildGridLines = function () {
            var halfSize = this._size.Multiply(.5), topLeft = new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](-halfSize.Width, -halfSize.Height), bottomRight = new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](halfSize.Width, halfSize.Height);
            for (var i = 0; i < this._rows; i++) {
                this._gridLines.push(new Line2d(topLeft.X, topLeft.Y + i * this._tileSize.Height, bottomRight.X, topLeft.Y + i * this._tileSize.Height, 1, this._gridLineColor));
                if (i === 0) {
                    for (var j = 0; j < this._columns; j++) {
                        this._gridLines.push(new Line2d(topLeft.X + j * this._tileSize.Width, topLeft.Y, topLeft.X + j * this._tileSize.Width, bottomRight.Y, 1, this._gridLineColor));
                    }
                }
            }
            this._gridLines.push(new Line2d(topLeft.X, bottomRight.Y, bottomRight.X, bottomRight.Y, 1));
            this._gridLines.push(new Line2d(bottomRight.X, topLeft.Y, bottomRight.X, bottomRight.Y, 1));
        };
        Grid.prototype.GetInsideGridPosition = function (row, column) {
            return new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](column * this._tileSize.Width - this._size.HalfWidth + this._tileSize.HalfWidth, row * this._tileSize.Height - this._size.HalfHeight + this._tileSize.HalfHeight);
        };
        Grid.prototype.ValidRow = function (row) {
            return row >= 0 && row < this._rows;
        };
        Grid.prototype.ValidColumn = function (column) {
            return column >= 0 && column < this._columns;
        };
        return Grid;
    }(Graphic2d));
    Graphics.Grid = Grid;
})(Graphics || (Graphics = {}));


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeSpan", function() { return TimeSpan; });
/**
* Defines a time interval.
*/
var TimeSpan = /** @class */ (function () {
    function TimeSpan(milliseconds, seconds, minutes) {
        if (seconds === void 0) { seconds = 0; }
        if (minutes === void 0) { minutes = 0; }
        this._type = "TimeSpan";
        this._milliseconds = 0;
        this._seconds = 0;
        this._minutes = 0;
        this.Milliseconds = milliseconds + seconds * TimeSpan._secondsMultiplier + minutes * TimeSpan._minutesMultiplier;
    }
    Object.defineProperty(TimeSpan.prototype, "Milliseconds", {
        /**
        * Gets or sets the number of milliseconds the TimeSpan represents.
        */
        get: function () {
            return this._milliseconds;
        },
        set: function (val) {
            this._milliseconds = val;
            this._seconds = val / TimeSpan._secondsMultiplier;
            this._minutes = val / TimeSpan._minutesMultiplier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Seconds", {
        /**
        * Gets or sets the number of seconds the TimeSpan represents.
        */
        get: function () {
            return this._seconds;
        },
        set: function (val) {
            this._seconds = val;
            this._milliseconds = val * TimeSpan._secondsMultiplier;
            this._minutes = this._milliseconds / TimeSpan._minutesMultiplier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Minutes", {
        /**
        * Gets or sets the number of minutes the TimeSpan represents.
        */
        get: function () {
            return this._minutes;
        },
        set: function (val) {
            this._minutes = val;
            this._seconds = val * 60;
            this._milliseconds = this._seconds * TimeSpan._secondsMultiplier;
        },
        enumerable: true,
        configurable: true
    });
    TimeSpan.prototype.Add = function (val) {
        if (val._type === "TimeSpan") {
            return new TimeSpan(this.Milliseconds + val.Milliseconds);
        }
        else {
            return new TimeSpan(this.Milliseconds + val);
        }
    };
    TimeSpan.prototype.Multiply = function (val) {
        if (val._type === "TimeSpan") {
            return new TimeSpan(this.Milliseconds * val.Milliseconds);
        }
        else {
            return new TimeSpan(this.Milliseconds * val);
        }
    };
    TimeSpan.prototype.Subtract = function (val) {
        if (val._type === "TimeSpan") {
            return new TimeSpan(this.Milliseconds - val.Milliseconds);
        }
        else {
            return new TimeSpan(this.Milliseconds - val);
        }
    };
    TimeSpan.prototype.SubtractFrom = function (val) {
        if (val._type === "TimeSpan") {
            return new TimeSpan(val.Milliseconds - this.Milliseconds);
        }
        else {
            return new TimeSpan(val - this.Milliseconds);
        }
    };
    TimeSpan.prototype.Divide = function (val) {
        if (val._type === "TimeSpan") {
            return new TimeSpan(this.Milliseconds / val.Milliseconds);
        }
        else {
            return new TimeSpan(this.Milliseconds / val);
        }
    };
    TimeSpan.prototype.DivideFrom = function (val) {
        if (val._type === "TimeSpan") {
            return new TimeSpan(val.Milliseconds / this.Milliseconds);
        }
        else {
            return new TimeSpan(val / this.Milliseconds);
        }
    };
    /**
    * Determines whether this TimeSpan represents the same amount of time as the provided TimeSpan.
    * @param timeSpan The TimeSpan to compare the current TimeSpan to.
    */
    TimeSpan.prototype.Equivalent = function (timeSpan) {
        return this.Milliseconds === timeSpan.Milliseconds;
    };
    /**
    * Returns a TimeSpan that represents the same time interval.
    */
    TimeSpan.prototype.Clone = function () {
        return new TimeSpan(this.Milliseconds);
    };
    /**
    * Overridden toString method to display TimeSpan in the ms:s:m format.
    */
    TimeSpan.prototype.toString = function () {
        return this.Milliseconds + ":" + this.Seconds + ":" + this.Minutes;
    };
    /**
    * Returns a TimeSpan that represents the specified number of milliseconds.
    * @param val Number of milliseconds.
    */
    TimeSpan.FromMilliseconds = function (val) {
        return new TimeSpan(val);
    };
    /**
    * Returns a TimeSpan that represents the specified number of seconds.
    * @param val Number of seconds.
    */
    TimeSpan.FromSeconds = function (val) {
        return new TimeSpan(0, val);
    };
    /**
    * Returns a TimeSpan that represents the specified number of minutes.
    * @param val Number of minutes.
    */
    TimeSpan.FromMinutes = function (val) {
        return new TimeSpan(0, 0, val);
    };
    /**
    * Returns a TimeSpan that represents the time between the two dates.
    * @param from The from date.
    * @param to The to date.
    */
    TimeSpan.DateSpan = function (from, to) {
        return new TimeSpan(to.getTime() - from.getTime());
    };
    Object.defineProperty(TimeSpan, "Zero", {
        /**
        * Gets a TimeSpan that represents a 0 millisecond time interval.
        */
        get: function () {
            return new TimeSpan(0);
        },
        enumerable: true,
        configurable: true
    });
    TimeSpan._secondsMultiplier = 1000;
    TimeSpan._minutesMultiplier = TimeSpan._secondsMultiplier * 60;
    return TimeSpan;
}());



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncLoop", function() { return asyncLoop; });
function asyncLoop(action, count, onComplete) {
    (function loop(index) {
        if (index < count) {
            action(function () {
                loop(index + 1);
            }, index);
        }
        else if (onComplete) {
            onComplete();
        }
    }(0));
}


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return Input; });
/* harmony import */ var _Utilities_EventHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
/* harmony import */ var _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var _Utilities_NoopTripInvoker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36);




var Input;
(function (Input) {
    var MouseButton = /** @class */ (function () {
        function MouseButton() {
        }
        MouseButton.Left = "Left";
        MouseButton.Middle = "Middle";
        MouseButton.Right = "Right";
        return MouseButton;
    }());
    Input.MouseButton = MouseButton;
    /**
    * Defines an all around Input handler which manages mouse and keyboard events.
    */
    var InputManager = /** @class */ (function () {
        /**
        * Creates a new instance of the InputManager object.
        * @param target The object through which mouse events will be monitored on.
        */
        function InputManager(target) {
            this._disposed = false;
            this.Mouse = new MouseHandler(target);
            this.Keyboard = new KeyboardHandler();
        }
        /**
        * Disposes the MouseHandler and unbinds all bound events.
        */
        InputManager.prototype.Dispose = function () {
            if (!this._disposed) {
                this._disposed = true;
                this.Mouse.Dispose();
                this.Keyboard.Dispose();
            }
            else {
                throw new Error("MouseHandler cannot be disposed more than once");
            }
        };
        return InputManager;
    }());
    Input.InputManager = InputManager;
    /**
* Defines a handler that will monitor mouse events over a specified area and will execute appropriate functions based on the events.
*/
    var MouseHandler = /** @class */ (function () {
        /**
        * Creates a new instance of the MouseHandler object.
        * @param target The object to monitor mouse events for.
        */
        function MouseHandler(target) {
            var _this = this;
            this._target = target;
            this._disposed = false;
            this._onClick = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_1__["EventHandler1"]();
            this._onDoubleClick = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_1__["EventHandler1"]();
            this._onDown = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_1__["EventHandler1"]();
            this._onUp = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_1__["EventHandler1"]();
            this._onMove = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_1__["EventHandler1"]();
            this._onScroll = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_1__["EventHandler1"]();
            // Generic flags to check mouse state
            this._leftIsDown = false;
            this._middleIsDown = false;
            this._rightIsDown = false;
            this.Wire();
            this.OnDown.Bind(function (e) {
                _this._isDown = true;
                // @ts-ignore
                _this["_" + e.Button.toLowerCase() + "IsDown"] = true;
                window.focus();
            });
            this.OnUp.Bind(function (e) {
                _this._isDown = false;
                // @ts-ignore
                _this["_" + e.Button.toLowerCase() + "IsDown"] = false;
                window.focus();
            });
            this.OnClick.Bind(function (e) {
                window.focus();
            });
            this.OnDoubleClick.Bind(function (e) {
                window.focus();
            });
        }
        Object.defineProperty(MouseHandler.prototype, "LeftIsDown", {
            /**
            * Indicates if the left mouse button is down
            */
            get: function () {
                return this._leftIsDown;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseHandler.prototype, "MiddleIsDown", {
            /**
            * Indicates if the middle mouse button is down
            */
            get: function () {
                return this._middleIsDown;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseHandler.prototype, "RightIsDown", {
            /**
            * Indicates if the right mouse button is down
            */
            get: function () {
                return this._rightIsDown;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseHandler.prototype, "IsDown", {
            /**
            * Indicates if any mouse button is down.
            */
            get: function () {
                return this._isDown;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseHandler.prototype, "OnClick", {
            /**
            * Gets an event that is triggered when a mouse click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onClick;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseHandler.prototype, "OnDoubleClick", {
            /**
            * Gets an event that is triggered when a mouse double click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onDoubleClick;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseHandler.prototype, "OnDown", {
            /**
            * Gets an event that is triggered when a mouse down event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onDown;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseHandler.prototype, "OnUp", {
            /**
            * Gets an event that is triggered when a mouse up event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onUp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseHandler.prototype, "OnMove", {
            /**
            * Gets an event that is triggered when a mouse move event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onMove;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseHandler.prototype, "OnScroll", {
            /**
            * Gets an event that is triggered when a mouse scroll event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onScroll;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Disposes the MouseHandler and unbinds all bound events.
        */
        MouseHandler.prototype.Dispose = function () {
            if (!this._disposed) {
                this._disposed = true;
                this._onClick.Dispose();
                this._onDoubleClick.Dispose();
                this._onDown.Dispose();
                this._onMove.Dispose();
                this._onScroll.Dispose();
                this._onUp.Dispose();
                this.Unwire();
                // @ts-ignore
                this._target = null;
            }
            else {
                throw new Error("MouseHandler cannot be disposed more than once");
            }
        };
        MouseHandler.prototype.Wire = function () {
            var _this = this;
            this._clickWire = this._contextMenuWire = this.BuildEvent(this._onClick, this.BuildMouseClickEvent);
            this._dblClickWire = this.BuildEvent(this._onDoubleClick, this.BuildMouseClickEvent);
            this._mouseDownWire = this.BuildEvent(this._onDown, this.BuildMouseClickEvent);
            this._mouseUpWire = this.BuildEvent(this._onUp, this.BuildMouseClickEvent);
            this._mouseMoveWire = this.BuildEvent(this._onMove, this.BuildMouseEvent);
            // OnScroll, in order to detect horizontal scrolling need to hack a bit (browser sniffing)
            // if we were just doing vertical scrolling we could settle with the else statement in this block
            if ((/MSIE/i.test(navigator.userAgent)) || (/Trident/i.test(navigator.userAgent))) {
                this._mouseWheelWireName = "wheel";
                this._mouseWheelWire = this.BuildEvent(this._onScroll, function (e) {
                    e.wheelDeltaX = -e.deltaX;
                    e.wheelDeltaY = -e.deltaY;
                    return _this.BuildMouseScrollEvent(e);
                });
            }
            else if ((/Firefox/i.test(navigator.userAgent))) {
                this._mouseWheelWireName = "DOMMouseScroll";
                this._mouseWheelWire = this.BuildEvent(this._onScroll, function (e) {
                    e.wheelDeltaX = e.axis === 1 ? -e.detail : 0;
                    e.wheelDeltaY = e.axis === 2 ? -e.detail : 0;
                    return _this.BuildMouseScrollEvent(e);
                });
            }
            else {
                this._mouseWheelWireName = "mousewheel";
                // @ts-ignore
                this._mouseWheelWire = this.BuildEvent(this._onScroll, this.BuildMouseScrollEvent);
            }
            this._target.addEventListener("click", this._clickWire, false);
            this._target.addEventListener("contextmenu", this._contextMenuWire, false);
            this._target.addEventListener("dblclick", this._dblClickWire, false);
            this._target.addEventListener("mousedown", this._mouseDownWire, false);
            this._target.addEventListener("mouseup", this._mouseUpWire, false);
            this._target.addEventListener("mousemove", this._mouseMoveWire, false);
            // @ts-ignore
            this._target.addEventListener(this._mouseWheelWireName, this._mouseWheelWire, false);
        };
        MouseHandler.prototype.Unwire = function () {
            this._target.removeEventListener("click", this._clickWire, false);
            this._target.removeEventListener("contextmenu", this._contextMenuWire, false);
            this._target.removeEventListener("dblclick", this._dblClickWire, false);
            this._target.removeEventListener("mousedown", this._mouseDownWire, false);
            this._target.removeEventListener("mouseup", this._mouseUpWire, false);
            this._target.removeEventListener("mousemove", this._mouseMoveWire, false);
            // @ts-ignore
            this._target.removeEventListener(this._mouseWheelWireName, this._mouseWheelWire, false);
        };
        MouseHandler.prototype.BuildEvent = function (eventHandler, mouseEventBuilder, returnValue) {
            var _this = this;
            if (returnValue === void 0) { returnValue = false; }
            return function (e) {
                if (eventHandler.HasBindings()) {
                    eventHandler.Trigger(mouseEventBuilder.call(_this, e));
                }
                e.preventDefault();
                return returnValue;
            };
        };
        MouseHandler.prototype.BuildMouseScrollEvent = function (event) {
            return {
                Position: this.GetMousePosition(event),
                Direction: this.GetMouseScrollDierction(event)
            };
        };
        MouseHandler.prototype.BuildMouseEvent = function (event) {
            return {
                Position: this.GetMousePosition(event)
            };
        };
        MouseHandler.prototype.BuildMouseClickEvent = function (event) {
            return {
                Position: this.GetMousePosition(event),
                Button: this.GetMouseButton(event)
            };
        };
        MouseHandler.prototype.GetMousePosition = function (event) {
            return new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_2__["Vector2d"](event.offsetX ? (event.offsetX) : event.pageX - this._target.offsetLeft, event.offsetY ? (event.offsetY) : event.pageY - this._target.offsetTop);
        };
        MouseHandler.prototype.GetMouseButton = function (event) {
            if (event.which) {
                // @ts-ignore
                return MouseHandler.MouseButtonArray[event.which];
            }
            return MouseButton.Right;
        };
        MouseHandler.prototype.GetMouseScrollDierction = function (event) {
            return new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_2__["Vector2d"](-Math.max(-1, Math.min(1, event.wheelDeltaX)), -Math.max(-1, Math.min(1, event.wheelDeltaY)));
        };
        // Used to determine mouse buttons without using extra conditional statements, performance enhancer
        MouseHandler.MouseButtonArray = [null, MouseButton.Left, MouseButton.Middle, MouseButton.Right];
        return MouseHandler;
    }());
    Input.MouseHandler = MouseHandler;
    var Keys;
    (function (Keys) {
        Keys[Keys["Backspace"] = 8] = "Backspace";
        Keys[Keys["Tab"] = 9] = "Tab";
        Keys[Keys["Enter"] = 13] = "Enter";
        Keys[Keys["Shift"] = 16] = "Shift";
        Keys[Keys["Ctrl"] = 17] = "Ctrl";
        Keys[Keys["Alt"] = 18] = "Alt";
        Keys[Keys["Pause"] = 19] = "Pause";
        Keys[Keys["CapsLock"] = 20] = "CapsLock";
        Keys[Keys["Escape"] = 27] = "Escape";
        Keys[Keys["Space"] = 32] = "Space";
        Keys[Keys["PageUp"] = 33] = "PageUp";
        Keys[Keys["PageDown"] = 34] = "PageDown";
        Keys[Keys["End"] = 35] = "End";
        Keys[Keys["Home"] = 36] = "Home";
        Keys[Keys["LeftArrow"] = 37] = "LeftArrow";
        Keys[Keys["UpArrow"] = 38] = "UpArrow";
        Keys[Keys["RightArrow"] = 39] = "RightArrow";
        Keys[Keys["DownArrow"] = 40] = "DownArrow";
        Keys[Keys["Insert"] = 45] = "Insert";
        Keys[Keys["Delete"] = 46] = "Delete";
        Keys[Keys["Num0"] = 48] = "Num0";
        Keys[Keys["Num1"] = 49] = "Num1";
        Keys[Keys["Num2"] = 50] = "Num2";
        Keys[Keys["Num3"] = 51] = "Num3";
        Keys[Keys["Num4"] = 52] = "Num4";
        Keys[Keys["Num5"] = 53] = "Num5";
        Keys[Keys["Num6"] = 54] = "Num6";
        Keys[Keys["Num7"] = 55] = "Num7";
        Keys[Keys["Num8"] = 56] = "Num8";
        Keys[Keys["Num9"] = 57] = "Num9";
        Keys[Keys["A"] = 65] = "A";
        Keys[Keys["B"] = 66] = "B";
        Keys[Keys["C"] = 67] = "C";
        Keys[Keys["D"] = 68] = "D";
        Keys[Keys["E"] = 69] = "E";
        Keys[Keys["F"] = 70] = "F";
        Keys[Keys["G"] = 71] = "G";
        Keys[Keys["H"] = 72] = "H";
        Keys[Keys["I"] = 73] = "I";
        Keys[Keys["J"] = 74] = "J";
        Keys[Keys["K"] = 75] = "K";
        Keys[Keys["L"] = 76] = "L";
        Keys[Keys["M"] = 77] = "M";
        Keys[Keys["N"] = 78] = "N";
        Keys[Keys["O"] = 79] = "O";
        Keys[Keys["P"] = 80] = "P";
        Keys[Keys["Q"] = 81] = "Q";
        Keys[Keys["R"] = 82] = "R";
        Keys[Keys["S"] = 83] = "S";
        Keys[Keys["T"] = 84] = "T";
        Keys[Keys["U"] = 85] = "U";
        Keys[Keys["V"] = 86] = "V";
        Keys[Keys["W"] = 87] = "W";
        Keys[Keys["X"] = 88] = "X";
        Keys[Keys["Y"] = 89] = "Y";
        Keys[Keys["Z"] = 90] = "Z";
        Keys[Keys["LeftWindows"] = 91] = "LeftWindows";
        Keys[Keys["RightWindows"] = 92] = "RightWindows";
        Keys[Keys["Menu"] = 93] = "Menu";
        Keys[Keys["NumPad0"] = 96] = "NumPad0";
        Keys[Keys["NumPad1"] = 97] = "NumPad1";
        Keys[Keys["NumPad2"] = 98] = "NumPad2";
        Keys[Keys["NumPad3"] = 99] = "NumPad3";
        Keys[Keys["NumPad4"] = 100] = "NumPad4";
        Keys[Keys["NumPad5"] = 101] = "NumPad5";
        Keys[Keys["NumPad6"] = 102] = "NumPad6";
        Keys[Keys["NumPad7"] = 103] = "NumPad7";
        Keys[Keys["NumPad8"] = 104] = "NumPad8";
        Keys[Keys["NumPad9"] = 105] = "NumPad9";
        Keys[Keys["Multiply"] = 106] = "Multiply";
        Keys[Keys["Add"] = 107] = "Add";
        Keys[Keys["Subtract"] = 109] = "Subtract";
        Keys[Keys["DecimalPoint"] = 110] = "DecimalPoint";
        Keys[Keys["Divide"] = 111] = "Divide";
        Keys[Keys["F1"] = 112] = "F1";
        Keys[Keys["F2"] = 113] = "F2";
        Keys[Keys["F3"] = 114] = "F3";
        Keys[Keys["F4"] = 115] = "F4";
        Keys[Keys["F5"] = 116] = "F5";
        Keys[Keys["F6"] = 117] = "F6";
        Keys[Keys["F7"] = 118] = "F7";
        Keys[Keys["F8"] = 119] = "F8";
        Keys[Keys["F9"] = 120] = "F9";
        Keys[Keys["F10"] = 121] = "F10";
        Keys[Keys["F11"] = 122] = "F11";
        Keys[Keys["F12"] = 123] = "F12";
        Keys[Keys["NumLock"] = 144] = "NumLock";
        Keys[Keys["ScrollLock"] = 145] = "ScrollLock";
        Keys[Keys["BrowserBack"] = 166] = "BrowserBack";
        Keys[Keys["BrowserForward"] = 167] = "BrowserForward";
        Keys[Keys["Semicolon"] = 186] = "Semicolon";
        Keys[Keys["Equal"] = 187] = "Equal";
        Keys[Keys["Comma"] = 188] = "Comma";
        Keys[Keys["Dash"] = 189] = "Dash";
        Keys[Keys["Period"] = 190] = "Period";
        Keys[Keys["ForwardSlash"] = 191] = "ForwardSlash";
        Keys[Keys["GraveAccent"] = 192] = "GraveAccent";
        Keys[Keys["OpenBracket"] = 219] = "OpenBracket";
        Keys[Keys["BackSlash"] = 220] = "BackSlash";
        Keys[Keys["CloseBracket"] = 221] = "CloseBracket";
        Keys[Keys["SingleQuote"] = 222] = "SingleQuote";
    })(Keys = Input.Keys || (Input.Keys = {}));
    /**
    * Defines an object that is used to represent a keyboard modifier state to determine if Ctrl, Alt, or Shift is being pressed.
    */
    var KeyboardModifiers = /** @class */ (function () {
        /**
        * Creates a new instance of the KeyboardModifiers object.
        * @param ctrl The initial value of the Ctrl component.
        * @param alt The initial value of the Alt component.
        * @param shift The initial value of the Shift component.
        */
        function KeyboardModifiers(ctrl, alt, shift) {
            this.Ctrl = ctrl;
            this.Alt = alt;
            this.Shift = shift;
        }
        /**
        * Determines whether this KeyboardModifiers object has the same ctrl, alt, and shift states as the provided KeyboardModifiers.
        * @param modifier The KeyboardModifiers to compare the current modifiers to.
        */
        KeyboardModifiers.prototype.Equivalent = function (modifier) {
            return this.Ctrl === modifier.Ctrl && this.Alt === modifier.Alt && this.Shift === modifier.Shift;
        };
        /**
        * Builds a KeyboardModifiers object to represent the state of an expected keyCommand
        * @param keyCommand The command to analyze.
        */
        KeyboardModifiers.BuildFromCommandString = function (keyCommand) {
            var ctrl = (keyCommand.toLowerCase().indexOf("ctrl+") >= 0) ? true : false, alt = (keyCommand.toLowerCase().indexOf("alt+") >= 0) ? true : false, shift = (keyCommand.toLowerCase().indexOf("shift+") >= 0) ? true : false;
            return new KeyboardModifiers(ctrl, alt, shift);
        };
        return KeyboardModifiers;
    }());
    Input.KeyboardModifiers = KeyboardModifiers;
    /**
    * Defines a handler that will check for keyboard commands and execute appropriate functions.
    */
    var KeyboardHandler = /** @class */ (function () {
        /**
        * Creates a new instance of the KeyboardHandler object.
        */
        function KeyboardHandler() {
            this._onPressCommands = {};
            this._onDownCommands = {};
            this._onUpCommands = {};
            this._onKeyPress = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_1__["EventHandler1"]();
            this._onKeyDown = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_1__["EventHandler1"]();
            this._onKeyUp = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_1__["EventHandler1"]();
            this._disposed = false;
            this.Wire();
        }
        Object.defineProperty(KeyboardHandler.prototype, "OnKeyPress", {
            /**
            * Gets an event that is triggered when any key press occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onKeyPress;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardHandler.prototype, "OnKeyDown", {
            /**
            *Gets an event that is triggered when any key goes down.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onKeyDown;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardHandler.prototype, "OnKeyUp", {
            /**
            * Gets an event that is triggered when any key comes up.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onKeyUp;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Binds function to be called when the keyCommand is pressed.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand has been pressed.
        */
        KeyboardHandler.prototype.OnCommandPress = function (keyCommand, action) {
            return this.UpdateCache(keyCommand, action, this._onPressCommands);
        };
        /**
        * Binds function to be called when the keyCommand goes down.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand has is down.
        */
        KeyboardHandler.prototype.OnCommandDown = function (keyCommand, action) {
            return this.UpdateCache(keyCommand, action, this._onDownCommands);
        };
        /**
        * Binds function to be called when the keyCommand comes up.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand comes up.
        */
        KeyboardHandler.prototype.OnCommandUp = function (keyCommand, action) {
            return this.UpdateCache(keyCommand, action, this._onUpCommands);
        };
        /**
        * Disposes the KeyboardHandler and unbinds all bound events.
        */
        KeyboardHandler.prototype.Dispose = function () {
            if (!this._disposed) {
                this._disposed = true;
                this._onKeyDown.Dispose();
                this._onKeyPress.Dispose();
                this._onKeyUp.Dispose();
                for (var command in this._onDownCommands) {
                    this._onDownCommands[command].Dispose();
                }
                // @ts-ignore
                this._onDownCommands = null;
                for (var command in this._onUpCommands) {
                    this._onUpCommands[command].Dispose();
                }
                // @ts-ignore
                this._onUpCommands = null;
                for (var command in this._onPressCommands) {
                    this._onPressCommands[command].Dispose();
                }
                // @ts-ignore
                this._onPressCommands = null;
                this.Unwire();
            }
            else {
                throw new Error("KeyboardHandler cannot be disposed more than once");
            }
        };
        KeyboardHandler.prototype.UpdateCache = function (keyCommand, action, store) {
            var command = new KeyboardCommand(keyCommand, action), commandId = KeyboardHandler._keyboardCommandIds++;
            command.OnDispose.Bind(function () {
                delete store[commandId];
            });
            store[commandId] = command;
            return command;
        };
        KeyboardHandler.prototype.Wire = function () {
            this._keyPressWire = this.BuildKeyEvent(this._onPressCommands, this.OnKeyPress);
            this._keyDownWire = this.BuildKeyEvent(this._onDownCommands, this.OnKeyDown);
            this._keyUpWire = this.BuildKeyEvent(this._onUpCommands, this.OnKeyUp);
            document.addEventListener("keypress", this._keyPressWire, false);
            document.addEventListener("keydown", this._keyDownWire, false);
            document.addEventListener("keyup", this._keyUpWire, false);
        };
        KeyboardHandler.prototype.Unwire = function () {
            document.removeEventListener("keypress", this._keyPressWire, false);
            document.removeEventListener("keydown", this._keyDownWire, false);
            document.removeEventListener("keyup", this._keyUpWire, false);
        };
        KeyboardHandler.prototype.BuildKeyEvent = function (store, eventHandler) {
            return function (ke) {
                var keyboardCommandEvent, propogate = true;
                keyboardCommandEvent = new KeyboardCommandEvent(ke);
                eventHandler.Trigger(keyboardCommandEvent);
                for (var keyboardCommandId in store) {
                    if (keyboardCommandEvent.Matches(store[keyboardCommandId])) {
                        store[keyboardCommandId].Action();
                        ke.preventDefault();
                        propogate = false;
                    }
                }
                return propogate;
            };
        };
        KeyboardHandler._keyboardCommandIds = 0;
        return KeyboardHandler;
    }());
    Input.KeyboardHandler = KeyboardHandler;
    /**
 * HtmlElement that triggered a KeyboardEvent.
 */
    var KeyboardEventTarget = /** @class */ (function () {
        function KeyboardEventTarget(target) {
            this._element = target;
            this._id = this._element.id;
            this._classes = Array.prototype.slice.call(this._element.classList);
            this._tag = this._element.tagName;
        }
        Object.defineProperty(KeyboardEventTarget.prototype, "Id", {
            /**
            * Gets the id of the target element.
            */
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEventTarget.prototype, "Classes", {
            /**
            * Gets a list of classes on the target element.
            */
            get: function () {
                return this._classes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEventTarget.prototype, "Element", {
            /**
            * Gets the element that caused the keyboard event.
            */
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEventTarget.prototype, "Tag", {
            /**
            * Gets the type of tag of the target element.
            */
            get: function () {
                return this._tag;
            },
            enumerable: true,
            configurable: true
        });
        return KeyboardEventTarget;
    }());
    Input.KeyboardEventTarget = KeyboardEventTarget;
    var KeyboardCommandHelper = /** @class */ (function () {
        function KeyboardCommandHelper() {
        }
        KeyboardCommandHelper.ParseKey = function (command) {
            var arr = command.split("+");
            if (arr.length > 1) {
                return arr[arr.length - 1];
            }
            return arr[0];
        };
        return KeyboardCommandHelper;
    }());
    Input.KeyboardCommandHelper = KeyboardCommandHelper;
    var shiftValues = {
        "~": "`",
        "!": "1",
        "@": "2",
        "#": "3",
        "$": "4",
        "%": "5",
        "^": "6",
        "&": "7",
        "*": "8",
        "(": "9",
        ")": "0",
        "_": "-",
        "+": "=",
        ":": ";",
        "\"": "'",
        "<": ",",
        ">": ".",
        "?": "/",
        "|": "\\"
    }, specialKeys = {
        "27": "esc",
        "9": "tab",
        "32": "space",
        "13": "return",
        "8": "backspace",
        "45": "insert",
        "36": "home",
        "46": "delete",
        "35": "end",
        "37": "left",
        "38": "up",
        "39": "right",
        "40": "down",
        "112": "f1",
        "113": "f2",
        "114": "f3",
        "115": "f4",
        "116": "f5",
        "117": "f6",
        "118": "f7",
        "119": "f8",
        "120": "f9",
        "121": "f10",
        "122": "f11",
        "123": "f12"
    };
    /**
    * Defines a KeyboardCommandEvent object that represents when a command has been attempted.
    */
    var KeyboardCommandEvent = /** @class */ (function () {
        /**
        * Creates a new instance of the KeyboardCommandEvent object.
        * @param keyEvent The raw key event from the DOM.
        */
        function KeyboardCommandEvent(keyEvent) {
            var code, character;
            this.Modifiers = new KeyboardModifiers(keyEvent.ctrlKey, keyEvent.altKey, keyEvent.shiftKey);
            if (keyEvent.keyCode) {
                code = keyEvent.keyCode;
            }
            else if (keyEvent.which) {
                code = keyEvent.which;
            }
            if (!((character = String.fromCharCode(keyEvent.keyCode)) === keyEvent.key)) {
                // @ts-ignore
                if (!(character = specialKeys[code])) {
                    // @ts-ignore
                    character = String.fromCharCode(code).toLowerCase();
                    if (this.Modifiers.Shift && shiftValues[character]) {
                        character = shiftValues[character];
                    }
                }
            }
            this.Key = character;
            this.KeyCode = code;
            // @ts-ignore
            this.Target = new KeyboardEventTarget(keyEvent.target);
        }
        /**
        * Determines if the KeyboardCommand matches the KeyboardCommandEvent
        * @param command The KeyboardCommand to check.
        */
        KeyboardCommandEvent.prototype.Matches = function (command) {
            return this.Key.toLowerCase() === command.Key.toLowerCase() && command.Modifiers.Equivalent(this.Modifiers);
        };
        return KeyboardCommandEvent;
    }());
    Input.KeyboardCommandEvent = KeyboardCommandEvent;
    /**
 * Defines a class that is used to represent a keyboard command.
 */
    var KeyboardCommand = /** @class */ (function () {
        /**
        * Creates a new instance of the KeyboardCommand object.
        * @param command Initial command required to trigger the action function.
        * @param action Initial action to be triggered when the command is executed..
        */
        function KeyboardCommand(command, action) {
            var _this = this;
            this.Action = action;
            this.Modifiers = KeyboardModifiers.BuildFromCommandString(command);
            this.Key = KeyboardCommandHelper.ParseKey(command);
            this._onDisposed = new _Utilities_EventHandler__WEBPACK_IMPORTED_MODULE_0__["EventHandler"]();
            this._onDisposeInvoker = new _Utilities_NoopTripInvoker__WEBPACK_IMPORTED_MODULE_3__["NoopTripInvoker"](function () {
                _this._onDisposed.Trigger();
            }, true);
        }
        Object.defineProperty(KeyboardCommand.prototype, "OnDispose", {
            /**
            * Gets an event that is triggered when a KeyboardCommand has been disposed.  If this KeyboardCommand is used with a KeyboardHandler it will no longer trigger the Action function.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onDisposed;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Triggers the OnDisposed event.  If this KeyboardCommand is used with a KeyboardHandler it will no longer trigger the Action function.
        */
        KeyboardCommand.prototype.Dispose = function () {
            this._onDisposeInvoker.InvokeOnce();
        };
        return KeyboardCommand;
    }());
    Input.KeyboardCommand = KeyboardCommand;
})(Input || (Input = {}));


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoopTripInvoker", function() { return NoopTripInvoker; });
var NoopTripInvoker = /** @class */ (function () {
    function NoopTripInvoker(action, tripped) {
        if (tripped === void 0) { tripped = false; }
        this._invoker = NoopTripInvoker._noop;
        this._action = action;
        if (tripped) {
            this.Trip();
        }
    }
    NoopTripInvoker.prototype.Invoke = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._invoker.apply(this, args);
    };
    NoopTripInvoker.prototype.InvokeOnce = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._invoker.apply(this, args);
        this.Reset();
    };
    NoopTripInvoker.prototype.Trip = function () {
        this._invoker = this._action;
    };
    NoopTripInvoker.prototype.Reset = function () {
        this._invoker = NoopTripInvoker._noop;
    };
    NoopTripInvoker._noop = function () { };
    return NoopTripInvoker;
}());



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputControllers", function() { return InputControllers; });
/* harmony import */ var _MovementControllers_MovementControllers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38);

var InputControllers;
(function (InputControllers) {
    /**
    * Defines a DirectionalInputController that will monitor Up, Right, Left, and Down movement attempts.
    */
    var DirectionalInputController = /** @class */ (function () {
        function DirectionalInputController(keyboard, onMove, upKeys, rightKeys, downKeys, leftKeys) {
            if (upKeys === void 0) { upKeys = ["w", "Up"]; }
            if (rightKeys === void 0) { rightKeys = ["d", "Right"]; }
            if (downKeys === void 0) { downKeys = ["s", "Down"]; }
            if (leftKeys === void 0) { leftKeys = ["a", "Left"]; }
            this._keyboard = keyboard;
            this._onMove = onMove;
            this._directions = new _MovementControllers_MovementControllers__WEBPACK_IMPORTED_MODULE_0__["MovementControllers"].LinearDirections();
            this.BindKeys(upKeys, "OnCommandDown", "Up", true);
            this.BindKeys(rightKeys, "OnCommandDown", "Right", true);
            this.BindKeys(downKeys, "OnCommandDown", "Down", true);
            this.BindKeys(leftKeys, "OnCommandDown", "Left", true);
            this.BindKeys(upKeys, "OnCommandUp", "Up", false);
            this.BindKeys(rightKeys, "OnCommandUp", "Right", false);
            this.BindKeys(downKeys, "OnCommandUp", "Down", false);
            this.BindKeys(leftKeys, "OnCommandUp", "Left", false);
        }
        DirectionalInputController.prototype.BindKeys = function (keyList, bindingAction, direction, startMoving) {
            var _this = this;
            for (var i = 0; i < keyList.length; i++) {
                // @ts-ignore
                this._keyboard[bindingAction](keyList[i], function () {
                    // @ts-ignore
                    if (_this._directions[direction] != startMoving) {
                        // @ts-ignore
                        _this._directions[direction] = startMoving;
                        _this._onMove(direction, startMoving);
                    }
                });
            }
        };
        return DirectionalInputController;
    }());
    InputControllers.DirectionalInputController = DirectionalInputController;
})(InputControllers || (InputControllers = {}));


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MovementControllers", function() { return MovementControllers; });
/* harmony import */ var _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var _Utilities_NoopTripInvoker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(36);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var MovementControllers;
(function (MovementControllers) {
    /**
* Defines a direction management object that represents directional state.
*/
    var LinearDirections = /** @class */ (function () {
        /**
        * Creates a new instance of the LinearDirection object with all directions= indicators initially set to false.
        */
        function LinearDirections() {
            this.Left = false;
            this.Right = false;
            this.Up = false;
            this.Down = false;
        }
        return LinearDirections;
    }());
    MovementControllers.LinearDirections = LinearDirections;
    /**
* Abstract class that holds moveable objects and synchronizes positions across them.
*/
    var MovementController = /** @class */ (function () {
        /**
        * Should only ever be called by derived classes.
        * @param moveables Moveable objects to synchronize.
        */
        function MovementController(moveables) {
            this.Position = moveables.length > 0 ? moveables[0].Position : _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero;
            this.Velocity = _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero;
            this.Rotation = 0;
            this._frozen = false;
            this._moveables = moveables;
        }
        /**
        * Prevents the MovementController from updating object locations.
        */
        MovementController.prototype.Freeze = function () {
            this._frozen = true;
        };
        /**
        * Used to re-enable movement within the MovementController.
        */
        MovementController.prototype.Thaw = function () {
            this._frozen = false;
        };
        /**
        * Determines if the MovementController is moving.  Frozen MovementControllers are not considered moving.
        */
        MovementController.prototype.IsMoving = function () {
            return !this._frozen && !this.Velocity.IsZero();
        };
        /**
        * Synchronizes the current position with all tracked moveable objects.  MovementController's must be updated in order to move.
        * @param gameTime The current game time object.
        */
        MovementController.prototype.Update = function (gameTime) {
            // Sync moveables position and rotation
            for (var i = 0; i < this._moveables.length; i++) {
                this._moveables[i].Position = this.Position;
                this._moveables[i].Rotation = this.Rotation;
            }
        };
        return MovementController;
    }());
    MovementControllers.MovementController = MovementController;
    /**
* Defines a LinearMovementController that can move objects Up, Right, Left, Down or a combination.
*/
    var LinearMovementController = /** @class */ (function (_super) {
        __extends(LinearMovementController, _super);
        function LinearMovementController(movables, moveSpeed, rotateWithMovements, multiDirectional) {
            if (rotateWithMovements === void 0) { rotateWithMovements = true; }
            if (multiDirectional === void 0) { multiDirectional = true; }
            var _this = _super.call(this, movables) || this;
            _this._moveSpeed = moveSpeed;
            _this._moving = new LinearDirections();
            _this.OnMove = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_1__["EventHandler1"]();
            _this._rotationUpdater = new _Utilities_NoopTripInvoker__WEBPACK_IMPORTED_MODULE_2__["NoopTripInvoker"](function () {
                _this.UpdateRotation();
            }, rotateWithMovements);
            if (multiDirectional) {
                _this._velocityUpdater = _this.UpdateVelocityWithMultiDirection;
            }
            else {
                _this._velocityUpdater = _this.UpdateVelocityNoMultiDirection;
            }
            return _this;
        }
        /**
        * Determines if the movement controller is moving in the provided direction.
        * @param direction The direction to check.
        */
        LinearMovementController.prototype.IsMovingInDirection = function (direction) {
            // @ts-ignore
            return this._moving[direction] || false;
        };
        /**
        * Starts moving the movement controller in the specified direction.
        * @param direction The direction to start moving.
        */
        LinearMovementController.prototype.StartMoving = function (direction) {
            this.Move(direction, true);
        };
        /**
        * Stops the movement controller from moving in the specified direction.
        * @param direction The direction to stop moving.
        */
        LinearMovementController.prototype.StopMoving = function (direction) {
            this.Move(direction, false);
        };
        LinearMovementController.prototype.MoveSpeed = function (speed) {
            if (typeof speed !== "undefined") {
                this._moveSpeed = speed;
                this._velocityUpdater();
            }
            return this._moveSpeed;
        };
        /**
        * Moves the LinearMovementController in the currently active directions.  MovementController's must be updated in order to move.
        * @param gameTime The current game time object.
        */
        LinearMovementController.prototype.Update = function (gameTime) {
            if (!this._frozen) {
                this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.Elapsed.Seconds));
                _super.prototype.Update.call(this, gameTime);
            }
        };
        /**
        * Triggers a move event on the MovementController.
        * @param direction The direction to start or stop moving.
        * @param startMoving Whether the movement is starting or stopping.
        */
        LinearMovementController.prototype.Move = function (direction, startMoving) {
            // @ts-ignore
            if (typeof this._moving[direction] !== "undefined") {
                // @ts-ignore
                this._moving[direction] = startMoving;
                this._velocityUpdater();
                this._rotationUpdater.Invoke();
                this.OnMove.Trigger({
                    Direction: direction,
                    StartMoving: startMoving
                });
            }
            else {
                throw new Error(direction + " is an unknown direction.");
            }
        };
        LinearMovementController.prototype.UpdateVelocityNoMultiDirection = function () {
            var velocity = _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero;
            if (velocity.IsZero()) {
                if (this._moving.Up) {
                    velocity.Y -= this._moveSpeed;
                }
                if (this._moving.Down) {
                    velocity.Y += this._moveSpeed;
                }
                if (velocity.Y === 0) {
                    if (this._moving.Left) {
                        velocity.X -= this._moveSpeed;
                    }
                    if (this._moving.Right) {
                        velocity.X += this._moveSpeed;
                    }
                }
            }
            this.Velocity = velocity;
        };
        LinearMovementController.prototype.UpdateVelocityWithMultiDirection = function () {
            var velocity = _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero;
            if (this._moving.Up) {
                velocity.Y -= this._moveSpeed;
            }
            if (this._moving.Down) {
                velocity.Y += this._moveSpeed;
            }
            if (this._moving.Left) {
                velocity.X -= this._moveSpeed;
            }
            if (this._moving.Right) {
                velocity.X += this._moveSpeed;
            }
            this.Velocity = velocity;
        };
        LinearMovementController.prototype.UpdateRotation = function () {
            if (!this.Velocity.IsZero()) {
                this.Rotation = Math.atan2(this.Velocity.Y, this.Velocity.X);
            }
        };
        return LinearMovementController;
    }(MovementController));
    MovementControllers.LinearMovementController = LinearMovementController;
})(MovementControllers || (MovementControllers = {}));


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapLoaders", function() { return MapLoaders; });
/* harmony import */ var _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* harmony import */ var _Graphics_Graphics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
/* harmony import */ var _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33);
/* harmony import */ var _Extensions_Helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(34);




var MapLoaders;
(function (MapLoaders) {
    /**
* Defines supported JSON formats for map loading.
*/
    var JSONFormat;
    (function (JSONFormat) {
        JSONFormat[JSONFormat["TMX"] = 0] = "TMX";
    })(JSONFormat = MapLoaders.JSONFormat || (MapLoaders.JSONFormat = {}));
    var TMXLoader = /** @class */ (function () {
        function TMXLoader() {
            this._orientationLoaders = {
                orthogonal: new OrthogonalLoader()
            };
        }
        TMXLoader.prototype.Load = function (data, propertyHooks, onComplete) {
            if (!this._orientationLoaders[data.orientation]) {
                throw new Error("Invalid orientation.  The orientation '" + data.orientation + "' is not supported.");
            }
            return this._orientationLoaders[data.orientation].Load(data, propertyHooks, onComplete);
        };
        return TMXLoader;
    }());
    MapLoaders.TMXLoader = TMXLoader;
    var OrthogonalLoader = /** @class */ (function () {
        function OrthogonalLoader() {
        }
        OrthogonalLoader.prototype.Load = function (data, propertyHooks, onComplete) {
            var _this = this;
            // We're initially at 0%.
            var percent = 0, tileCount = 0, onPartialLoad = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_0__["EventHandler1"]();
            // Load all the sources referenced within the data
            this.LoadTilesetSources(data.tilesets, function (tileset) {
                percent += (1 / data.tilesets.length) * OrthogonalLoader._imagePercentMax;
                onPartialLoad.Trigger(percent);
            }, function (tilesetSources) {
                // Triggered once all the sources have completed loading
                // All the tiles extracted represent our resource list
                var resources = _this.ExtractTilesetTiles(data.tilesets, tilesetSources, propertyHooks), mappings, layers = new Array(), layerPercentValue = (1 - OrthogonalLoader._imagePercentMax) / data.layers.length;
                percent = OrthogonalLoader._imagePercentMax;
                Object(_Extensions_Helpers__WEBPACK_IMPORTED_MODULE_3__["asyncLoop"])(function (next, i) {
                    if (data.layers[i].type !== "tilelayer") {
                        throw new Error("Invalid layer type.  The layer type '" + data.layers[i].type + "' is not supported.");
                    }
                    _this.AsyncBuildLayer(data, i, propertyHooks, resources, function (details, percentLoaded) {
                        onPartialLoad.Trigger(percent + percentLoaded * layerPercentValue);
                    }, function (layer) {
                        percent += layerPercentValue;
                        onPartialLoad.Trigger(percent);
                        layers.push(layer);
                        next();
                    });
                }, data.layers.length, function () {
                    // All layers loaded
                    onComplete({
                        Layers: layers
                    });
                });
            });
            for (var i = 0; i < data.layers.length; i++) {
                tileCount += data.layers[i].data.length;
            }
            return {
                TileCount: tileCount,
                LayerCount: data.layers.length,
                ResourceSheetCount: data.tilesets.length,
                OnPercentLoaded: onPartialLoad
            };
        };
        OrthogonalLoader.prototype.LoadTilesetSources = function (tilesets, onTilesetLoad, onComplete) {
            var tilesetSources = {}, loadedCount = 0, onLoaded = function (source) {
                onTilesetLoad(source);
                // If everything has loaded
                if (++loadedCount === tilesets.length) {
                    onComplete(tilesetSources);
                }
            };
            for (var i = 0; i < tilesets.length; i++) {
                tilesetSources[tilesets[i].name] = new _Graphics_Graphics__WEBPACK_IMPORTED_MODULE_1__["Graphics"].ImageSource(tilesets[i].image, tilesets[i].imagewidth, tilesets[i].imageheight);
                tilesetSources[tilesets[i].name].OnLoaded.Bind(onLoaded);
            }
        };
        OrthogonalLoader.prototype.ExtractTilesetTiles = function (tilesets, tilesetSources, propertyHooks) {
            var tilesetTiles = new Array(), resourceHooks = new Array(), sources, index;
            tilesets.sort(function (a, b) { return a.firstgid - b.firstgid; });
            for (var i = 0; i < tilesets.length; i++) {
                sources = _Graphics_Graphics__WEBPACK_IMPORTED_MODULE_1__["Graphics"].SquareTileMap.ExtractTiles(tilesetSources[tilesets[i].name], tilesets[i].tilewidth, tilesets[i].tileheight);
                for (var property in tilesets[i].properties) {
                    // @ts-ignore
                    if (typeof propertyHooks.ResourceSheetHooks[property] !== "undefined") {
                        for (var j = tilesets[i].firstgid - 1; j < tilesets[i].firstgid - 1 + sources.length; j++) {
                            if (typeof resourceHooks[j] === "undefined") {
                                resourceHooks[j] = new Array();
                            }
                            // @ts-ignore
                            resourceHooks[j].push(this.BuildHookerFunction(tilesets[i].properties[property], propertyHooks.ResourceSheetHooks[property]));
                        }
                    }
                }
                for (var tileIndex in tilesets[i].tileproperties) {
                    for (var property in tilesets[i].tileproperties[tileIndex])
                        // @ts-ignore
                        if (typeof propertyHooks.ResourceTileHooks[property] !== "undefined") {
                            index = parseInt(tileIndex) + tilesets[i].firstgid - 1;
                            if (typeof resourceHooks[index] === "undefined") {
                                resourceHooks[index] = new Array();
                            }
                            // @ts-ignore
                            resourceHooks[index].push(this.BuildHookerFunction(tilesets[i].tileproperties[tileIndex][property], propertyHooks.ResourceTileHooks[property]));
                        }
                }
                tilesetTiles = tilesetTiles.concat(sources);
            }
            return {
                Resources: tilesetTiles,
                ResourceHooks: resourceHooks
            };
        };
        // Not true async but it frees up the DOM
        OrthogonalLoader.prototype.AsyncBuildLayer = function (tmxData, layerIndex, propertyHooks, resources, onTileLoad, onComplete) {
            var _this = this;
            setTimeout(function () {
                // Convert the layer data to a 2 dimensional array and subtract 1 from all the data points (to make it 0 based)
                var tmxLayer = tmxData.layers[layerIndex], mappings = _this.NormalizeLayerData(tmxLayer.data, tmxData.width), layer = new _Graphics_Graphics__WEBPACK_IMPORTED_MODULE_1__["Graphics"].SquareTileMap(tmxLayer.x, tmxLayer.y, tmxData.tilewidth, tmxData.tileheight, resources.Resources, mappings), layerHooks = new Array();
                for (var property in tmxLayer.properties) {
                    // @ts-ignore
                    if (typeof propertyHooks.LayerHooks[property] !== "undefined") {
                        // @ts-ignore
                        layerHooks.push(_this.BuildHookerFunction(tmxLayer.properties[property], propertyHooks.LayerHooks[property]));
                    }
                }
                layer.ZIndex = layerIndex;
                layer.Visible = tmxLayer.visible;
                layer.Opacity = tmxLayer.opacity;
                // Enough delay to ensure that the page doesn't freeze
                layer.RowLoadDelay = _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_2__["TimeSpan"].FromMilliseconds(5);
                layer.OnTileLoad.Bind(function (details, percentComplete) {
                    if (resources.ResourceHooks[details.ResourceIndex]) {
                        for (var i = 0; i < resources.ResourceHooks[details.ResourceIndex].length; i++) {
                            resources.ResourceHooks[details.ResourceIndex][i](details);
                        }
                    }
                    for (var i = 0; i < layerHooks.length; i++) {
                        layerHooks[i](details);
                    }
                    onTileLoad(details, percentComplete);
                });
                layer.OnLoaded.Bind(function () {
                    onComplete(layer);
                });
            }, 0);
        };
        OrthogonalLoader.prototype.BuildHookerFunction = function (propertyValue, fn) {
            return function (details) {
                return fn(details, propertyValue);
            };
        };
        OrthogonalLoader.prototype.NormalizeLayerData = function (data, columns) {
            var normalized = new Array(), index;
            for (var i = 0; i < data.length; i++) {
                index = Math.floor(i / columns);
                if (!(normalized[index] instanceof Array)) {
                    normalized[index] = new Array();
                }
                // Subtract 1 because TMX format starts at 1
                normalized[index].push(data[i] - 1);
            }
            return normalized;
        };
        OrthogonalLoader._imagePercentMax = .2;
        return OrthogonalLoader;
    }());
    MapLoaders.OrthogonalLoader = OrthogonalLoader;
    /**
* Defines a JSON loader that is used to load maps.
*/
    var JSONLoader = /** @class */ (function () {
        function JSONLoader() {
        }
        JSONLoader.Load = function (json, onComplete, propertyHooks, format) {
            if (format === void 0) { format = JSONFormat.TMX; }
            if (!propertyHooks) {
                // Defaults
                propertyHooks = {
                    ResourceTileHooks: {},
                    ResourceSheetHooks: {},
                    LayerHooks: {}
                };
            }
            return JSONLoader._loaders[JSONFormat[format]].Load(json, propertyHooks, onComplete);
        };
        JSONLoader._loaders = {
            TMX: new TMXLoader()
        };
        return JSONLoader;
    }());
    MapLoaders.JSONLoader = JSONLoader;
})(MapLoaders || (MapLoaders = {}));


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Particles", function() { return Particles; });
/* harmony import */ var _Graphics_Graphics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* harmony import */ var _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _Tweening_Tweening__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(41);
/* harmony import */ var _Bounds_Bounds__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22);
/* harmony import */ var _Tweening_Functions_Functions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(42);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var Particles;
(function (Particles) {
    /**
* Defines a particle that abides by several configured values.
*/
    var Particle = /** @class */ (function () {
        /**
        * Creates a new instance of the Particle object.
        * @param texture The texture for the particle.
        * @param fromLocation The from location of the Particle.
        * @param toLocation The end location of the Particle.
        * @param scale How large the Particles Texture should be.  Value will multiply the size of the provided texture.
        * @param opacity The particles opacity.  Value should be between 0 and 1.
        * @param rotation The particles initial rotation.  Value should be in radians.
        * @param rotationSpeed How fast the particle should rotate.  Value should be X radians per second.
        * @param lifetime How long the particle should live before dying.
        * @param fadeInDuration How long the particle should take to fade in.
        * @param fadeOutDuration How long the particle should take to fade out.
        * @param movementFunction The function to use to move from the 'fromLocation' to the 'toLocation'.
        */
        function Particle(texture, fromLocation, toLocation, scale, opacity, rotation, rotationSpeed, lifetime, fadeInDuration, fadeOutDuration, movementFunction) {
            texture.Position = fromLocation;
            texture.Scale(scale);
            texture.Rotation = rotation;
            texture.Opacity = 0;
            this._texture = texture;
            this._rotationSpeed = rotationSpeed;
            this._alive = true;
            this._fadingOut = false;
            this._lifetime = lifetime;
            this._createdAt = new Date().getTime();
            this._onDeath = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_2__["EventHandler1"]();
            this._fadeOutDuration = fadeOutDuration;
            this._fadeOutAt = lifetime.Milliseconds - fadeOutDuration.Milliseconds;
            this._locationTween = new _Tweening_Tweening__WEBPACK_IMPORTED_MODULE_4__["Tweening"].Vector2dTween(texture.Position, toLocation, lifetime, movementFunction);
            this._fadeTween = new _Tweening_Tweening__WEBPACK_IMPORTED_MODULE_4__["Tweening"].NumberTween(0, opacity * 100, fadeInDuration, _Tweening_Functions_Functions__WEBPACK_IMPORTED_MODULE_6__["Functions"].Linear.EaseNone);
            this._locationTween.Play();
            this._fadeTween.Play();
        }
        Object.defineProperty(Particle.prototype, "Texture", {
            /**
            * Gets the particles texture.
            */
            get: function () {
                return this._texture;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "OnDeath", {
            /**
            * Gets an event that is triggered when the particle dies.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onDeath;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Determines if the particle is alive.
        */
        Particle.prototype.IsAlive = function () {
            return this._alive;
        };
        /**
        * Makes the particle move, fade, and even die if needed.
        * @param gameTime The current game time object.
        */
        Particle.prototype.Update = function (gameTime) {
            var aliveFor;
            if (this._alive) {
                aliveFor = gameTime.Now.getTime() - this._createdAt;
                if (aliveFor > this._lifetime.Milliseconds) {
                    this._alive = false;
                    this._onDeath.Trigger(this);
                }
                else {
                    if (!this._fadingOut && aliveFor >= this._fadeOutAt) {
                        this._fadingOut = true;
                        this._fadeTween.From = this._texture.Opacity * 100;
                        this._fadeTween.To = 0;
                        this._fadeTween.Duration = this._fadeOutDuration;
                        this._fadeTween.Restart();
                    }
                    this._locationTween.Update(gameTime);
                    this._fadeTween.Update(gameTime);
                    this._texture.Rotation += gameTime.Elapsed.Seconds * this._rotationSpeed;
                    this._texture.Position = this._locationTween.Current;
                    this._texture.Opacity = this._fadeTween.Current / 100;
                }
            }
        };
        return Particle;
    }());
    Particles.Particle = Particle;
    /**
* Defines a range that is used to describe a range of values.
*/
    var Range = /** @class */ (function () {
        function Range(min, max) {
            if (max === void 0) { max = min; }
            this.Min = min;
            this.Max = max;
        }
        /**
        * Returns an identical copy of this range.
        */
        Range.prototype.Clone = function () {
            return new Range(this.Min, this.Max);
        };
        /**
        * Returns a random number between range.Min and range.Max.
        * @param range The range used to bound the number value.
        */
        Range.RandomNumber = function (range) {
            return Math.random() * (range.Max - range.Min) + range.Min;
        };
        /**
        * Returns a random TimeSpan between range.Min and range.Max.
        * @param range The range used to bound the TimeSpan value.
        */
        Range.RandomTimeSpan = function (range) {
            return _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_1__["TimeSpan"].FromMilliseconds(Math.floor(Math.random() * (range.Max.Milliseconds - range.Min.Milliseconds + 1) + range.Min.Milliseconds));
        };
        return Range;
    }());
    Particles.Range = Range;
    /**
* Defines a particle emitter that can emit particles based on various configurations.
*/
    var Emitter = /** @class */ (function (_super) {
        __extends(Emitter, _super);
        /**
        * Creates a new instance of the Emitter object.
        * @param x The initial horizontal location of the Emitter.
        * @param y The initial vertical location of the Emitter.
        * @param emissionFunction The initial EmissionFunction to use for particle control.
        */
        function Emitter(x, y, emissionFunction) {
            var _this = _super.call(this, new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_3__["Vector2d"](x, y)) || this;
            /**
            * Gets or sets the EmissionInterval.  The EmissionInterval is used to control how often particles are emitted.
            */
            _this.EmissionInterval = new Range(_Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_1__["TimeSpan"].FromMilliseconds(30));
            /**
            * Gets or sets the EmissionDirection.  The EmissionDirection is used to control the angle of particle emissions.  This angle value should be in radians.
            */
            _this.EmissionDirection = new Range(0, Math.PI * 2);
            /**
            * Gets or sets the EmissionOutput.  The EmissionOutput is used to control how many particles should be emitted per emission.
            */
            _this.EmissionOutput = new Range(1);
            /**
            * Gets or sets the ParticleLifetime.  The ParticleLifetime is used to control how long particles live before dying out.
            */
            _this.ParticleLifetime = new Range(_Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_1__["TimeSpan"].FromSeconds(1), _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_1__["TimeSpan"].FromSeconds(3));
            /**
            * Gets or sets the ParticleSpeed.  The ParticleSpeed is used to control the average speed that emitted particles will move at during their lifetime.
            */
            _this.ParticleSpeed = new Range(30, 100);
            /**
            * Gets or sets the ParticleScale.  The ParticleScale is used to control each particles size.  Values are percentages of particles base sizes.
            */
            _this.ParticleScale = new Range(.75, 1.5);
            /**
            * Gets or sets the ParticleRotation.  The ParticleRotation is used to control the initial rotation of emitted particles.
            */
            _this.ParticleRotation = new Range(0, Math.PI * 2);
            /**
            * Gets or sets the ParticleRotationSpeed.  The ParticleRotationSpeed is used to control how quickly emitted particles rotate.  Values should indicate X number of radians per second.
            */
            _this.ParticleRotationSpeed = new Range(0, Math.PI);
            /**
            * Gets or sets the ParticleOpacity.  The ParticleOpacity is used to control emitted particles opacity.  Values should be between 0 and 1.
            */
            _this.ParticleOpacity = new Range(1);
            /**
            * Gets or sets the ParticleFadeInDuration.  The ParticleFadeInDuration is used to control how long particles take to fade in.
            */
            _this.ParticleFadeInDuration = new Range(_Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_1__["TimeSpan"].FromSeconds(.5));
            /**
            * Gets or sets the ParticleFadeOutDuration.  The ParticleFadeOutDuration is used to control how long particles take to fade out.
            */
            _this.ParticleFadeOutDuration = new Range(_Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_1__["TimeSpan"].FromSeconds(.5), _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_1__["TimeSpan"].FromSeconds(1));
            _this._texturePool = new Array();
            _this._particlePool = {};
            _this._particleId = 0;
            _this._emitting = false;
            _this._particleRemover = function (particle) {
                _this.RemoveChild(particle.Texture);
                delete _this._particlePool[particle._id];
            };
            _this.EmissionFunction = emissionFunction;
            return _this;
        }
        /**
        * Determines if the Emitter is emitting particles.
        */
        Emitter.prototype.IsEmitting = function () {
            return this._emitting;
        };
        /**
        * Starts the Emitter.  Update must be called once started to begin auto-emission of particles.
        */
        Emitter.prototype.Start = function () {
            if (this._texturePool.length === 0) {
                throw new Error("Cannot start Emitter without any textures added to it.");
            }
            this._emitting = true;
            this._lastEmit = new Date().getTime();
        };
        /**
        * Stops the Emitter, no particles will be emitted while stopped.
        */
        Emitter.prototype.Stop = function () {
            this._emitting = false;
        };
        Emitter.prototype.AddTexture = function (texture, weight) {
            if (weight === void 0) { weight = 1; }
            for (var i = 0; i < weight; i++) {
                this._texturePool.push(texture);
            }
        };
        /**
        * Removes the provided texture from the texture pool.
        * @param texture The texture to remove from the pool.
        */
        Emitter.prototype.RemoveTexture = function (texture) {
            for (var i = 0; i < this._texturePool.length; i++) {
                if (this._texturePool[i] === texture) {
                    this._texturePool.splice(i--, 1);
                }
            }
        };
        /**
        * Emits particles based on the Emitters configuration.  Does not abide by the EmissionInterval.
        * To allow for complex particle manipulation this method can be overridden by derived Emitter classes.
        */
        Emitter.prototype.Emit = function () {
            var particleCount = Range.RandomNumber(this.EmissionOutput), endLocation, emissionDirection, particleSpeed, particleLifeTime, particle, particles = new Array();
            for (var i = 0; i < particleCount; i++) {
                particleLifeTime = Range.RandomTimeSpan(this.ParticleLifetime);
                particleSpeed = Range.RandomNumber(this.ParticleSpeed);
                emissionDirection = Range.RandomNumber(this.EmissionDirection);
                endLocation = new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_3__["Vector2d"](particleLifeTime.Seconds * particleSpeed, 0).RotateAround(_Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_3__["Vector2d"].Zero, emissionDirection);
                particle = new Particle(this.BuildTextureFromPool(), _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_3__["Vector2d"].Zero, endLocation, Range.RandomNumber(this.ParticleScale), Range.RandomNumber(this.ParticleOpacity), Range.RandomNumber(this.ParticleRotation), Range.RandomNumber(this.ParticleRotationSpeed), particleLifeTime, Range.RandomTimeSpan(this.ParticleFadeInDuration), Range.RandomTimeSpan(this.ParticleFadeOutDuration), this.EmissionFunction);
                particle._id = this._particleId++;
                this._particlePool[particle._id] = particle;
                this.AddChild(particle.Texture);
                particle.OnDeath.Bind(this._particleRemover);
                particles.push(particle);
            }
            return particles;
        };
        /**
        * Draws the Emitter onto the given context.  If this Emitter is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the Emitter onto.
        */
        Emitter.prototype.Draw = function (context) {
            _super.prototype._StartDraw.call(this, context);
            _super.prototype._EndDraw.call(this, context);
        };
        /**
        * Scale is not implemented.
        * @param scale The value to multiply the graphic's size by.
        */
        Emitter.prototype.Scale = function (scale) {
            throw new Error("Scale is not implemented for the Emitter class.");
        };
        /**
        * Attempts to emit particles if the configured EmisisonInterval has passed since the last Emission.
        * @param gameTime The current game time object.
        */
        Emitter.prototype.Update = function (gameTime) {
            var timeSinceEmit, emitCount, emissionRate;
            if (this._emitting) {
                emissionRate = Range.RandomTimeSpan(this.EmissionInterval).Milliseconds;
                if (emissionRate > 0) {
                    timeSinceEmit = gameTime.Now.getTime() - this._lastEmit;
                    emitCount = Math.floor(timeSinceEmit / emissionRate);
                    if (emitCount > 0) {
                        this._lastEmit = gameTime.Now.getTime();
                        for (var i = 0; i < emitCount; i++) {
                            this.Emit();
                        }
                    }
                }
                for (var particleId in this._particlePool) {
                    this._particlePool[particleId].Update(gameTime);
                }
            }
        };
        /**
        * The bounding area that represents where the Emitter will draw.
        */
        Emitter.prototype.GetDrawBounds = function () {
            var bounds = new _Bounds_Bounds__WEBPACK_IMPORTED_MODULE_5__["Bounds"].BoundingCircle(this.Position, this.ParticleSpeed.Max * this.ParticleLifetime.Max.Seconds);
            return bounds;
        };
        /**
        * Returns a nearly identical copy of this Emitter.  The cloned Emitter will be stopped.  If this Emitter belongs to a parent, the cloned Emitter will not. The cloned Emitter will not have the same event bindings as this one does.
        */
        Emitter.prototype.Clone = function () {
            var clone = new Emitter(this.Position.X, this.Position.Y, this.EmissionFunction);
            for (var i = 0; i < this._texturePool.length; i++) {
                clone.AddTexture(this._texturePool[i]);
            }
            clone.EmissionInterval = this.EmissionInterval.Clone();
            clone.EmissionDirection = this.EmissionDirection.Clone();
            clone.EmissionOutput = this.EmissionOutput.Clone();
            clone.ParticleLifetime = this.ParticleLifetime.Clone();
            clone.ParticleSpeed = this.ParticleSpeed.Clone();
            clone.ParticleRotation = this.ParticleRotation.Clone();
            clone.ParticleRotationSpeed = this.ParticleRotationSpeed.Clone();
            clone.ParticleFadeInDuration = this.ParticleFadeInDuration.Clone();
            clone.ParticleFadeOutDuration = this.ParticleFadeOutDuration.Clone();
            clone.ParticleScale = this.ParticleScale.Clone();
            clone.ParticleOpacity = this.ParticleOpacity.Clone();
            clone.Opacity = this.Opacity;
            clone.Rotation = this.Rotation;
            clone.Visible = this.Visible;
            clone.ZIndex = this.ZIndex;
            return clone;
        };
        Emitter.prototype.BuildTextureFromPool = function () {
            var textureIndex = Math.floor(Math.random() * this._texturePool.length);
            return this._texturePool[textureIndex].Clone();
        };
        return Emitter;
    }(_Graphics_Graphics__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Graphic2d));
    Particles.Emitter = Emitter;
})(Particles || (Particles = {}));


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tweening", function() { return Tweening; });
/* harmony import */ var _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* harmony import */ var _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var Tweening;
(function (Tweening) {
    //interface Number extends ICloneable {
    //    Clone: () => number;
    //}
    //(<any>Number.prototype).Clone = function (): number { return this; };
    /**
* Defines a base Tween class that is used to move a value from a start value to an end value.
*/
    function Clone(item) {
        if (item.Clone) {
            return item.Clone();
        }
        return item;
    }
    var Tween = /** @class */ (function () {
        /**
        * Creates a new instance of the Tween object.  This should only ever be called from derived classes via a super constructor call.
        * @param from Start value.
        * @param to End value.
        * @param duration How fast to move the current value from start to end.
        * @param tweeningFunction The function to use to translate the current value from start to end.  Different functions result in different translation behavior.
        */
        function Tween(from, to, duration, tweeningFunction) {
            this._from = Clone(from);
            this._to = Clone(to);
            this._current = Clone(this._from);
            this._duration = duration;
            this._elapsed = _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_1__["TimeSpan"].Zero;
            this._playing = false;
            this._onChange = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_2__["EventHandler1"]();
            this._onComplete = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_2__["EventHandler1"]();
            this._tweeningFunction = tweeningFunction;
        }
        Object.defineProperty(Tween.prototype, "OnChange", {
            /**
            * Gets an event that is triggered when the tween has changed its Current value, occurs directly after a tween update.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onChange;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "OnComplete", {
            /**
            * Gets an event that is triggered when the tween has completed transitioning the Current value, once triggered Elapsed will be equivalent to Duration and Current will be equivalent to To.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onComplete;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "From", {
            /**
            * Gets or sets the From component of the tween.
            */
            get: function () {
                return this._from;
            },
            set: function (from) {
                this._from = from;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "To", {
            /**
            * Gets or sets the To component of the tween.
            */
            get: function () {
                return this._to;
            },
            set: function (to) {
                this._to = to;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "Current", {
            /**
            * Gets or sets the Current component of the tween.  The Current is the current value of the tween, the final value of Current will be equivalent to To when the tween has completed.
            */
            get: function () {
                return this._current;
            },
            set: function (current) {
                this._current = current;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "Duration", {
            /**
            * Gets or sets the Duration component of the tween.  The Duration is how long the tween will take to go From -> To.
            */
            get: function () {
                return this._duration;
            },
            set: function (duration) {
                this._duration = duration;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "Elapsed", {
            /**
            * Gets or the Elapsed component of the tween.  Elapsed represents how far along the tween is.  When Elapsed equals Duration the tween is completed.
            */
            get: function () {
                return this._elapsed.Clone();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "TweeningFunction", {
            /**
            * Gets or sets the TweeningFunction of the tween.  The TweeningFunction controls how the tween translates the Current value to the To value.
            */
            get: function () {
                return this._tweeningFunction;
            },
            set: function (fn) {
                this._tweeningFunction = fn;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Determines if the tween is playing.
        */
        Tween.prototype.IsPlaying = function () {
            return this._playing;
        };
        /**
        * Starts playing the tween.  The tween will only start translating the value if Update is called.
        */
        Tween.prototype.Play = function () {
            this._playing = true;
        };
        /**
        * Pauses the tween.  Calls to update will not translate the tween when paused.
        */
        Tween.prototype.Pause = function () {
            this._playing = false;
        };
        /**
        * Resets the tween to the To location and resets the Elapsed time.  This does not stop or start the tween.
        */
        Tween.prototype.Reset = function () {
            this._elapsed.Milliseconds = 0;
            this._current = Clone(this._from);
        };
        /**
        * Stops the tween from playing.  This also resets the tween to its To value.
        */
        Tween.prototype.Stop = function () {
            this._playing = false;
            this.Reset();
        };
        /**
        * Restarts the tween.  Essentially calls Reset and then Play.
        */
        Tween.prototype.Restart = function () {
            this.Reset();
            this.Play();
        };
        /**
        * Reverses the tween from the Current value back to the From value.  This changes the To component to equal the From value and the From value to equal the Current value.
        */
        Tween.prototype.Reverse = function () {
            this._elapsed = _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_1__["TimeSpan"].Zero;
            this._to = this._from;
            this._from = Clone(this.Current);
        };
        /**
        * Updates the tweens Current and Elapsed component if the tween is playing.
        * @param gameTime The global game time object.  Used to represent total time running and used to track update interval elapsed speeds.
        */
        Tween.prototype.Update = function (gameTime) {
            if (!this._playing) {
                return;
            }
            this._elapsed = this._elapsed.Add(gameTime.Elapsed);
            if (this._elapsed.Milliseconds >= this._duration.Milliseconds) {
                this._elapsed = this._duration.Clone();
                this._current = Clone(this._to);
                this._playing = false;
                this._onChange.Trigger(Clone(this._current));
                this._onComplete.Trigger(this);
            }
            else {
                this._UpdateTween();
                this._onChange.Trigger(Clone(this._current));
            }
        };
        /**
        * Stops and unbinds all events from the tween.
        */
        Tween.prototype.Dispose = function () {
            this.Stop();
            this._onChange.Dispose();
            this._onComplete.Dispose();
        };
        Tween.prototype._UpdateTween = function () {
            // This should be overridden
        };
        return Tween;
    }());
    Tweening.Tween = Tween;
    /**
* Defines a Size2dTween class that is used to move a Size2d from a start value to an end value.
*/
    var Size2dTween = /** @class */ (function (_super) {
        __extends(Size2dTween, _super);
        /**
        * Creates a new instance of the Size2dTween object.
        * @param from Start Size2d.
        * @param to End Size2d.
        * @param duration How fast to move the current Size2d from start to end.
        * @param tweeningFunction The function to use to translate the current Size2d from start to end.  Different functions result in different translation behavior.
        */
        function Size2dTween(from, to, duration, tweeningFunction) {
            return _super.call(this, from, to, duration, tweeningFunction) || this;
        }
        Size2dTween.prototype._UpdateTween = function () {
            this.Current = new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_3__["Size2d"](this.TweeningFunction(this.From.Width, this.To.Width, this.Elapsed, this.Duration), this.TweeningFunction(this.From.Height, this.To.Height, this.Elapsed, this.Duration));
        };
        return Size2dTween;
    }(Tween));
    Tweening.Size2dTween = Size2dTween;
    /**
    * Defines a NumberTween class that is used to move a number from a start value to an end value.
    */
    var NumberTween = /** @class */ (function (_super) {
        __extends(NumberTween, _super);
        /**
        * Creates a new instance of the NumberTween object.
        * @param from Start number.
        * @param to End number.
        * @param duration How fast to move the current number from start to end.
        * @param tweeningFunction The function to use to translate the current number from start to end.  Different functions result in different translation behavior.
        */
        function NumberTween(from, to, duration, tweeningFunction) {
            return _super.call(this, from, to, duration, tweeningFunction) || this;
        }
        NumberTween.prototype._UpdateTween = function () {
            this.Current = this.TweeningFunction(this.From, this.To, this.Elapsed, this.Duration);
        };
        return NumberTween;
    }(Tween));
    Tweening.NumberTween = NumberTween;
    /**
* Defines a ColorTween class that is used to move a number from a start value to an end value.
*/
    var ColorTween = /** @class */ (function (_super) {
        __extends(ColorTween, _super);
        /**
        * Creates a new instance of the ColorTween object.
        * @param from Start color.
        * @param to End color.
        * @param duration How fast to move the current color from start to end.
        * @param tweeningFunction The function to use to translate the current color from start to end.  Different functions result in different translation behavior.
        */
        function ColorTween(from, to, duration, tweeningFunction) {
            return _super.call(this, from, to, duration, tweeningFunction) || this;
        }
        ColorTween.prototype._UpdateTween = function () {
            this.Current.R = this.TweeningFunction(this.From.R, this.To.R, this.Elapsed, this.Duration);
            this.Current.G = this.TweeningFunction(this.From.G, this.To.G, this.Elapsed, this.Duration);
            this.Current.B = this.TweeningFunction(this.From.B, this.To.B, this.Elapsed, this.Duration);
        };
        return ColorTween;
    }(Tween));
    Tweening.ColorTween = ColorTween;
    /**
    * Defines a Vector2dTween class that is used to move a Vector2d from a start value to an end value.
    */
    var Vector2dTween = /** @class */ (function (_super) {
        __extends(Vector2dTween, _super);
        /**
        * Creates a new instance of the Vector2dTween object.
        * @param from Start Vector2d.
        * @param to End Vector2d.
        * @param duration How fast to move the current Vector2d from start to end.
        * @param tweeningFunction The function to use to translate the current Vector2d from start to end.  Different functions result in different translation behavior.
        */
        function Vector2dTween(from, to, duration, tweeningFunction) {
            return _super.call(this, from, to, duration, tweeningFunction) || this;
        }
        Vector2dTween.prototype._UpdateTween = function () {
            this.Current = new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](this.TweeningFunction(this.From.X, this.To.X, this.Elapsed, this.Duration), this.TweeningFunction(this.From.Y, this.To.Y, this.Elapsed, this.Duration));
        };
        return Vector2dTween;
    }(Tween));
    Tweening.Vector2dTween = Vector2dTween;
})(Tweening || (Tweening = {}));


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Functions", function() { return Functions; });
var Functions;
(function (Functions) {
    /**
* Defines an Exponential tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
*/
    var Exponential = /** @class */ (function () {
        function Exponential() {
        }
        Object.defineProperty(Exponential, "EaseIn", {
            /**
            * Gets the Exponential EaseIn function.
            */
            get: function () {
                return Exponential._easeIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Exponential, "EaseOut", {
            /**
            * Gets the Exponential EaseOut function.
            */
            get: function () {
                return Exponential._easeOut;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Exponential, "EaseInOut", {
            /**
            * Gets the Exponential EaseInOut function.
            */
            get: function () {
                return Exponential._easeInOut;
            },
            enumerable: true,
            configurable: true
        });
        Exponential._easeIn = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            return (elapsedMilliseconds == 0) ? from : change * Math.pow(2, 10 * (elapsedMilliseconds / duration.Milliseconds - 1)) + from;
        };
        Exponential._easeOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            return (elapsedMilliseconds == duration.Milliseconds) ? from + change : change * (-Math.pow(2, -10 * elapsedMilliseconds / duration.Milliseconds) + 1) + from;
        };
        Exponential._easeInOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            if (elapsedMilliseconds == 0) {
                return from;
            }
            if (elapsedMilliseconds == duration.Milliseconds) {
                return from + change;
            }
            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                return change / 2 * Math.pow(2, 10 * (elapsedMilliseconds - 1)) + from;
            }
            return change / 2 * (-Math.pow(2, -10 * --elapsedMilliseconds) + 2) + from;
        };
        return Exponential;
    }());
    Functions.Exponential = Exponential;
    /**
* Defines an Elastic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
*/
    var Elastic = /** @class */ (function () {
        function Elastic() {
        }
        Object.defineProperty(Elastic, "EaseIn", {
            /**
            * Gets the Elastic EaseIn function.
            */
            get: function () {
                return Elastic._easeIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Elastic, "EaseOut", {
            /**
            * Gets the Elastic EaseOut function.
            */
            get: function () {
                return Elastic._easeOut;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Elastic, "EaseInOut", {
            /**
            * Gets the Elastic EaseInOut function.
            */
            get: function () {
                return Elastic._easeInOut;
            },
            enumerable: true,
            configurable: true
        });
        Elastic._easeIn = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, timePartial, timePartialQuarter;
            if (elapsedMilliseconds === 0) {
                return from;
            }
            if ((elapsedMilliseconds /= duration.Milliseconds) === 1) {
                return from + change;
            }
            timePartial = duration.Milliseconds * .3;
            timePartialQuarter = timePartial / 4;
            return -(change * Math.pow(2, 10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial)) + from;
        };
        Elastic._easeOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, timePartial, timePartialQuarter;
            if (elapsedMilliseconds === 0) {
                return from;
            }
            if ((elapsedMilliseconds /= duration.Milliseconds) === 1) {
                return from + change;
            }
            timePartial = duration.Milliseconds * .3;
            timePartialQuarter = timePartial / 4;
            return (change * Math.pow(2, -10 * elapsedMilliseconds) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial) + change + from);
        };
        Elastic._easeInOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, timePartial, timePartialQuarter;
            if (elapsedMilliseconds === 0) {
                return from;
            }
            if ((elapsedMilliseconds /= duration.Milliseconds / 2) === 2) {
                return from + change;
            }
            timePartial = duration.Milliseconds * (.3 * 1.5);
            timePartialQuarter = timePartial / 4;
            if (elapsedMilliseconds < 1) {
                return -.5 * (change * Math.pow(2, 10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial)) + from;
            }
            return (change * Math.pow(2, -10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial) * .5 + change + from);
        };
        return Elastic;
    }());
    Functions.Elastic = Elastic;
    /**
* Defines a Cubic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
*/
    var Cubic = /** @class */ (function () {
        function Cubic() {
        }
        Object.defineProperty(Cubic, "EaseIn", {
            /**
            * Gets the Cubic EaseIn function.
            */
            get: function () {
                return Cubic._easeIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cubic, "EaseOut", {
            /**
            * Gets the Cubic EaseOut function.
            */
            get: function () {
                return Cubic._easeOut;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cubic, "EaseInOut", {
            /**
            * Gets the Cubic EaseInOut function.
            */
            get: function () {
                return Cubic._easeInOut;
            },
            enumerable: true,
            configurable: true
        });
        Cubic._easeIn = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds + from;
        };
        Cubic._easeOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds + 1) + from;
        };
        Cubic._easeInOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
            }
            return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds + 2) + from;
        };
        return Cubic;
    }());
    Functions.Cubic = Cubic;
    /**
    * Defines a Circular tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    var Circular = /** @class */ (function () {
        function Circular() {
        }
        Object.defineProperty(Circular, "EaseIn", {
            /**
            * Gets the Circular EaseIn function.
            */
            get: function () {
                return Circular._easeIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Circular, "EaseOut", {
            /**
            * Gets the Circular EaseOut function.
            */
            get: function () {
                return Circular._easeOut;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Circular, "EaseInOut", {
            /**
            * Gets the Circular EaseInOut function.
            */
            get: function () {
                return Circular._easeInOut;
            },
            enumerable: true,
            configurable: true
        });
        Circular._easeIn = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            return -change * (Math.sqrt(1 - (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds) - 1) + from;
        };
        Circular._easeOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            return change * Math.sqrt(1 - (elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds) + from;
        };
        Circular._easeInOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                return -change / 2 * (Math.sqrt(1 - elapsedMilliseconds * elapsedMilliseconds) - 1) + from;
            }
            return change / 2 * (Math.sqrt(1 - (elapsedMilliseconds -= 2) * elapsedMilliseconds) + 1) + from;
        };
        return Circular;
    }());
    Functions.Circular = Circular;
    /**
* Defines a Bounce tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
*/
    var Bounce = /** @class */ (function () {
        function Bounce() {
        }
        Object.defineProperty(Bounce, "EaseIn", {
            /**
            * Gets the Bounce EaseIn function.
            */
            get: function () {
                return Bounce._easeIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bounce, "EaseOut", {
            /**
            * Gets the Bounce EaseOut function.
            */
            get: function () {
                return Bounce._easeOut;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bounce, "EaseInOut", {
            /**
            * Gets the Bounce EaseInOut function.
            */
            get: function () {
                return Bounce._easeInOut;
            },
            enumerable: true,
            configurable: true
        });
        Bounce._easeIn = function (from, to, elapsed, duration) {
            var change = to - from;
            return change - Bounce.EaseOut(0, change, duration.Subtract(elapsed), duration) + from;
        };
        Bounce._easeOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            if ((elapsedMilliseconds /= duration.Milliseconds) < (1 / 2.75)) {
                return change * (7.5625 * elapsedMilliseconds * elapsedMilliseconds) + from;
            }
            else if (elapsedMilliseconds < (2 / 2.75)) {
                return change * (7.5625 * (elapsedMilliseconds -= (1.5 / 2.75)) * elapsedMilliseconds + .75) + from;
            }
            else if (elapsedMilliseconds < (2.5 / 2.75)) {
                return change * (7.5625 * (elapsedMilliseconds -= (2.25 / 2.75)) * elapsedMilliseconds + .9375) + from;
            }
            else {
                return change * (7.5625 * (elapsedMilliseconds -= (2.625 / 2.75)) * elapsedMilliseconds + .984375) + from;
            }
        };
        Bounce._easeInOut = function (from, to, elapsed, duration) {
            var change = to - from;
            if (elapsed.Milliseconds < duration.Milliseconds / 2) {
                return Bounce.EaseIn(0, change, elapsed.Multiply(2), duration) * 0.5 + from;
            }
            else {
                return Bounce.EaseOut(0, change, elapsed.Multiply(2).Subtract(duration), duration) * .5 + change * 0.5 + from;
            }
        };
        return Bounce;
    }());
    Functions.Bounce = Bounce;
    /**
    * Defines a Back tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    var Back = /** @class */ (function () {
        function Back() {
        }
        Object.defineProperty(Back, "EaseIn", {
            /**
            * Gets the Back EaseIn function.
            */
            get: function () {
                return Back._easeIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Back, "EaseOut", {
            /**
            * Gets the Back EaseOut function.
            */
            get: function () {
                return Back._easeOut;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Back, "EaseInOut", {
            /**
            * Gets the Back EaseInOut function.
            */
            get: function () {
                return Back._easeInOut;
            },
            enumerable: true,
            configurable: true
        });
        Back._easeIn = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * ((1.70158 + 1) * elapsedMilliseconds - 1.70158) + from;
        };
        Back._easeOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * ((1.70158 + 1) * elapsedMilliseconds + 1.70158) + 1) + from;
        };
        Back._easeInOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, constant = 1.70158;
            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                return change / 2 * (elapsedMilliseconds * elapsedMilliseconds * (((constant *= (1.525)) + 1) * elapsedMilliseconds - constant)) + from;
            }
            return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * (((constant *= (1.525)) + 1) * elapsedMilliseconds + constant) + 2) + from;
        };
        return Back;
    }());
    Functions.Back = Back;
    /**
    * Defines a Sinusoidal tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    var Sinusoidal = /** @class */ (function () {
        function Sinusoidal() {
        }
        Object.defineProperty(Sinusoidal, "EaseIn", {
            /**
            * Gets the Sinusoidal EaseIn function.
            */
            get: function () {
                return Sinusoidal._easeIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sinusoidal, "EaseOut", {
            /**
            * Gets the Sinusoidal EaseOut function.
            */
            get: function () {
                return Sinusoidal._easeOut;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sinusoidal, "EaseInOut", {
            /**
            * Gets the Sinusoidal EaseInOut function.
            */
            get: function () {
                return Sinusoidal._easeInOut;
            },
            enumerable: true,
            configurable: true
        });
        Sinusoidal._easeIn = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            return -change * Math.cos(elapsedMilliseconds / duration.Milliseconds * (Math.PI / 2)) + change + from;
        };
        Sinusoidal._easeOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            return change * Math.sin(elapsedMilliseconds / duration.Milliseconds * (Math.PI / 2)) + from;
        };
        Sinusoidal._easeInOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            return -change / 2 * (Math.cos(Math.PI * elapsedMilliseconds / duration.Milliseconds) - 1) + from;
        };
        return Sinusoidal;
    }());
    Functions.Sinusoidal = Sinusoidal;
    /**
    * Defines a Quintic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    var Quintic = /** @class */ (function () {
        function Quintic() {
        }
        Object.defineProperty(Quintic, "EaseIn", {
            /**
            * Gets the Quintic EaseIn function.
            */
            get: function () {
                return Quintic._easeIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Quintic, "EaseOut", {
            /**
            * Gets the Quintic EaseOut function.
            */
            get: function () {
                return Quintic._easeOut;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Quintic, "EaseInOut", {
            /**
            * Gets the Quintic EaseInOut function.
            */
            get: function () {
                return Quintic._easeInOut;
            },
            enumerable: true,
            configurable: true
        });
        Quintic._easeIn = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
        };
        Quintic._easeOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + 1) + from;
        };
        Quintic._easeInOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
            }
            return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + 2) + from;
        };
        return Quintic;
    }());
    Functions.Quintic = Quintic;
    /**
    * Defines a Quartic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    var Quartic = /** @class */ (function () {
        function Quartic() {
        }
        Object.defineProperty(Quartic, "EaseIn", {
            /**
            * Gets the Quartic EaseIn function.
            */
            get: function () {
                return Quartic._easeIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Quartic, "EaseOut", {
            /**
            * Gets the Quartic EaseOut function.
            */
            get: function () {
                return Quartic._easeOut;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Quartic, "EaseInOut", {
            /**
            * Gets the Quartic EaseInOut function.
            */
            get: function () {
                return Quartic._easeInOut;
            },
            enumerable: true,
            configurable: true
        });
        Quartic._easeIn = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
        };
        Quartic._easeOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            return -change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds - 1) + from;
        };
        Quartic._easeInOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
            }
            return -change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds - 2) + from;
        };
        return Quartic;
    }());
    Functions.Quartic = Quartic;
    /**
    * Defines a Quadratic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    var Quadratic = /** @class */ (function () {
        function Quadratic() {
        }
        Object.defineProperty(Quadratic, "EaseIn", {
            /**
            * Gets the Quadratic EaseIn function.
            */
            get: function () {
                return Quadratic._easeIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Quadratic, "EaseOut", {
            /**
            * Gets the Quadratic EaseOut function.
            */
            get: function () {
                return Quadratic._easeOut;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Quadratic, "EaseInOut", {
            /**
            * Gets the Quadratic EaseInOut function.
            */
            get: function () {
                return Quadratic._easeInOut;
            },
            enumerable: true,
            configurable: true
        });
        Quadratic._easeIn = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds + from;
        };
        Quadratic._easeOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            return -change * (elapsedMilliseconds /= duration.Milliseconds) * (elapsedMilliseconds - 2) + from;
        };
        Quadratic._easeInOut = function (from, to, elapsed, duration) {
            var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;
            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                return change / 2 * elapsedMilliseconds * elapsedMilliseconds + from;
            }
            return -change / 2 * ((--elapsedMilliseconds) * (elapsedMilliseconds - 2) - 1) + from;
        };
        return Quadratic;
    }());
    Functions.Quadratic = Quadratic;
    /**
* Defines a Linear tweening function that has an EaseNone function that can be used with Tween's.
*/
    var Linear = /** @class */ (function () {
        function Linear() {
        }
        Object.defineProperty(Linear, "EaseNone", {
            /**
            * Gets the Linear EaseNone function.
            */
            get: function () {
                return Linear._easeNone;
            },
            enumerable: true,
            configurable: true
        });
        Linear._easeNone = function (from, to, elapsed, duration) {
            var change = to - from;
            return change * elapsed.Milliseconds / duration.Milliseconds + from;
        };
        return Linear;
    }());
    Functions.Linear = Linear;
})(Functions || (Functions = {}));


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rendering", function() { return Rendering; });
/* harmony import */ var _Bounds_Bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);
/* harmony import */ var _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var Rendering;
(function (Rendering) {
    /**
    * Defines a scene object that is used to maintain a list of renderable objects that are rendered onto a joint game area.
    */
    var Scene2d = /** @class */ (function () {
        function Scene2d(onDraw, drawArea) {
            if (onDraw === void 0) { onDraw = function (_) { }; }
            this._actorMappings = [];
            this._actors = [];
            if (typeof drawArea === "undefined") {
                drawArea = this.CreateDefaultDrawArea();
            }
            this._onDraw = onDraw;
            this._drawArea = drawArea;
            this._camera = new Camera2d(new _Assets_Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_1__["Vector2d"](this._drawArea.width / 2, this._drawArea.height / 2), new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_2__["Size2d"](this._drawArea.width, this._drawArea.height));
            this._renderer = new Camera2dRenderer(this._drawArea, this._camera);
            this._disposed = false;
        }
        Object.defineProperty(Scene2d.prototype, "DrawArea", {
            /**
            * Gets the canvas that the Scene2d uses as its game area.
            */
            get: function () {
                return this._drawArea;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene2d.prototype, "Camera", {
            /**
            * Gets the game camera.
            */
            get: function () {
                return this._camera;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Adds an actor to the scene.  All actors added to the scene have their Draw function called automatically.
        * @param actor The graphic to add to the scene.
        */
        Scene2d.prototype.Add = function (actor) {
            var _this = this;
            var mapping = {
                Actor: actor,
                Remove: function (graphic) {
                    _this.Remove(graphic);
                }
            };
            actor.OnDisposed.Bind(mapping.Remove);
            this._actorMappings.push(mapping);
            this._actors.push(actor);
        };
        /**
        * Removes an actor from the scene.  The actor will no longer have its Draw called.
        * @param actor The graphic to remove from the scene.
        */
        Scene2d.prototype.Remove = function (actor) {
            for (var i = 0; i < this._actors.length; i++) {
                if (this._actors[i] === actor) {
                    this._actors[i].OnDisposed.Unbind(this._actorMappings[i].Remove);
                    this._actors.splice(i, 1);
                    this._actorMappings.splice(i, 1);
                    return;
                }
            }
        };
        /**
        * Draws all actors within the Scene and triggers the Scene2d's onDraw callback.
        */
        Scene2d.prototype.Draw = function () {
            this._onDraw(this._renderer.Render(this._actors));
        };
        /**
        * Destroys the game canvas and clears the Scene2d's actors.
        */
        Scene2d.prototype.Dispose = function () {
            if (!this._disposed) {
                this._disposed = true;
                for (var i = 0; i < this._actors.length; i++) {
                    this.Remove(this._actors[i]);
                }
                this._actors = [];
                this._actorMappings = [];
                this._renderer.Dispose();
            }
            else {
                throw new Error("Scene2d cannot be disposed more than once");
            }
        };
        Scene2d.prototype.CreateDefaultDrawArea = function () {
            var drawArea = document.createElement("canvas"), body = document.getElementsByTagName('body')[0];
            drawArea.width = document.documentElement.clientWidth;
            drawArea.height = document.documentElement.clientHeight - 5;
            body.appendChild(drawArea);
            body.style.margin = "0px";
            body.style.padding = "0px";
            return drawArea;
        };
        return Scene2d;
    }());
    Rendering.Scene2d = Scene2d;
    /**
* Defines a 2d renderer that uses a double buffer to draw graphics.
*/
    var Renderer2d = /** @class */ (function () {
        /**
        * Creates a new instance of the Renderer2d object.
        * @param renderOnto The canvas to render onto.
        */
        function Renderer2d(renderOnto) {
            this._visibleCanvas = renderOnto;
            // @ts-ignore
            this._visibleContext = renderOnto.getContext("2d");
            // Create an equally sized canvas for a buffer
            this._BufferCanvas = document.createElement("canvas");
            // @ts-ignore
            this._BufferContext = this._BufferCanvas.getContext("2d");
            this._onRendererSizeChange = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_3__["EventHandler1"]();
            this.UpdateBufferSize();
            this._disposed = false;
        }
        Object.defineProperty(Renderer2d.prototype, "OnRendererSizeChange", {
            /**
            * Gets an event that is triggered when the renderOnto canvas changes size.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onRendererSizeChange;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Renders the provided renderables onto the renderOnto canvas.  Returns the canvas that was rendered onto.
        * @param renderables Array of items that are to be rendered, assumes Visible is set to true.
        */
        Renderer2d.prototype.Render = function (renderables) {
            // Check if our visible canvas has changed size
            if (this._BufferCanvas.width !== this._visibleCanvas.width || this._BufferCanvas.height !== this._visibleCanvas.height) {
                this.UpdateBufferSize();
            }
            // Push buffer to screen
            this._visibleContext.clearRect(0, 0, this._visibleCanvas.width, this._visibleCanvas.height);
            this._visibleContext.drawImage(this._BufferCanvas, 0, 0);
            // Clear our buffer to prepare it for new drawings
            this._ClearBuffer();
            // Sort the renderables by the ZIndex so we draw in the correct order (for layering);
            renderables.sort(Renderer2d._zindexSort);
            // We do not save or restore the canvas state because we want to let the
            // dev decide how they manipulate the canvas            
            for (var i = 0; i < renderables.length; i++) {
                renderables[i].Draw(this._BufferContext);
            }
            return this._BufferContext;
        };
        /**
        * Destroys the visible canvas.
        */
        Renderer2d.prototype.Dispose = function () {
            if (!this._disposed) {
                this._disposed = true;
                // @ts-ignore
                this._visibleCanvas.parentNode.removeChild(this._visibleCanvas);
                // @ts-ignore
                this._onRendererSizeChange.Dispose();
            }
        };
        Renderer2d.prototype._ClearBuffer = function () {
            this._BufferContext.clearRect(0, 0, this._BufferCanvas.width, this._BufferCanvas.height);
        };
        Renderer2d.prototype.UpdateBufferSize = function () {
            this._BufferCanvas.width = this._visibleCanvas.width;
            this._BufferCanvas.height = this._visibleCanvas.height;
            this.OnRendererSizeChange.Trigger(new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_2__["Size2d"](this._visibleCanvas.width, this._visibleCanvas.height));
        };
        Renderer2d._zindexSort = function (a, b) { return a.ZIndex - b.ZIndex; };
        return Renderer2d;
    }());
    Rendering.Renderer2d = Renderer2d;
    /**
    * Defines a camera rendering object that when used in conjunction with a Camera2d draws all objects in a camera relative position.
    */
    var Camera2dRenderer = /** @class */ (function (_super) {
        __extends(Camera2dRenderer, _super);
        /**
        * Creates a new instance of the Camera2dRenderer.
        * @param renderOnto The canvas to render onto.
        * @param camera The camera that ultimately decides what is drawn to the renderOnto canvas.
        */
        function Camera2dRenderer(renderOnto, camera) {
            var _this = _super.call(this, renderOnto) || this;
            _this._camera = camera;
            _this._contextBuilder = new Camera2dCanvasContextBuilder(_this._camera);
            _this.OnRendererSizeChange.Bind(function (newSize) {
                _this._contextBuilder._UpdateCanvasCenter(newSize);
                _this._camera.Size = newSize;
            });
            _this._contextBuilder._UpdateCanvasCenter(new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_2__["Size2d"](renderOnto.width, renderOnto.height));
            _this._BufferContext = _this._contextBuilder.Build(_this._BufferContext);
            return _this;
        }
        /**
        * Renders the provided renderables onto the renderOnto canvas.  Returns the canvas that was rendered onto.
        * @param renderables Array of items that are to be rendered.
        */
        Camera2dRenderer.prototype.Render = function (renderables) {
            var context, inverseScale = this._camera._GetInverseDistanceScale();
            this._BufferContext.save();
            this._BufferContext.scale(inverseScale, inverseScale);
            context = _super.prototype.Render.call(this, this.GetOnScreenRenderables(renderables));
            this._BufferContext.restore();
            return context;
        };
        Camera2dRenderer.prototype._ClearBuffer = function () {
            var cameraScale = this._camera._GetDistanceScale();
            this._BufferContext.unModifiedClearRect(0, 0, this._BufferCanvas.width * cameraScale, this._BufferCanvas.height * cameraScale);
        };
        Camera2dRenderer.prototype.GetOnScreenRenderables = function (allRenderables) {
            var onscreen = [], scale = this._camera._GetDistanceScale(), unscale = 1 / scale;
            // Scale camera size to our zoom level
            this._camera.Scale(scale, scale);
            for (var i = 0; i < allRenderables.length; i++) {
                if (allRenderables[i].Visible && this._camera.Intersects(allRenderables[i].GetDrawBounds())) {
                    onscreen.push(allRenderables[i]);
                }
            }
            this._camera.Scale(unscale, unscale);
            return onscreen;
        };
        return Camera2dRenderer;
    }(Renderer2d));
    Rendering.Camera2dRenderer = Camera2dRenderer;
    /**
* Defines a builder that is used to build a camera sensitive CanvasRenderingContext2d so that anything drawn to it becomes relative to the Camera2d.
*/
    var Camera2dCanvasContextBuilder = /** @class */ (function () {
        /**
        * Creates a new instance of the Camera2dCanvasContextBuilder object.
        * @param camera Camera to link to built CanvasRenderingContext2d's (Cannot change after construction).
        */
        function Camera2dCanvasContextBuilder(camera) {
            this._camera = camera;
            this._canvasCenter = this._camera.Position.Clone();
            this._translated = false;
            this._translationState = [];
            this._translationState.push(this._translated);
        }
        /**
        * Builds a new CanvasRenderingContext2d around the provided context that is linked to the camera.  Anything drawn to the context becomes relative to the camera.
        * @param context The context to build the camera linked context around.
        */
        Camera2dCanvasContextBuilder.prototype.Build = function (context) {
            var that = this, savedCreateRadialGradient = context.createRadialGradient, savedTranslate = context.translate, savedSave = context.save, savedRestore = context.restore, savedDrawImage1 = this.BuildPositionReplacer(context.drawImage, 1), savedDrawImage2 = this.BuildPositionReplacer(context.drawImage, 5);
            context.unModifiedClearRect = context.clearRect;
            context.arc = this.BuildPositionReplacer(context.arc);
            context.arcTo = this.BuildPositionReplacer(context.arcTo, 0, 4);
            context.bezierCurveTo = this.BuildPositionReplacer(context.bezierCurveTo, 0, 6);
            context.clearRect = this.BuildPositionReplacer(context.clearRect);
            context.createLinearGradient = this.BuildPositionReplacer(context.createLinearGradient, 0, 4);
            context.createRadialGradient = function () {
                var scale = that._camera._GetDistanceScale();
                arguments[0] += -that._camera.Position.X + that._canvasCenter.X * scale;
                arguments[1] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                arguments[3] += -that._camera.Position.X + that._canvasCenter.X * scale;
                arguments[4] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                return savedCreateRadialGradient.apply(this, arguments);
            };
            context.drawImage = function () {
                if (arguments.length <= 5) {
                    savedDrawImage1.apply(this, arguments);
                }
                else {
                    savedDrawImage2.apply(this, arguments);
                }
            };
            context.fillRect = this.BuildPositionReplacer(context.fillRect);
            context.fillText = this.BuildPositionReplacer(context.fillText, 1);
            context.getImageData = this.BuildPositionReplacer(context.getImageData);
            context.isPointInPath = this.BuildPositionReplacer(context.isPointInPath);
            context.lineTo = this.BuildPositionReplacer(context.lineTo);
            context.moveTo = this.BuildPositionReplacer(context.moveTo);
            context.putImageData = this.BuildPositionReplacer(context.putImageData, 1);
            context.quadraticCurveTo = this.BuildPositionReplacer(context.quadraticCurveTo, 0, 4);
            context.rect = this.BuildPositionReplacer(context.rect);
            context.strokeRect = this.BuildPositionReplacer(context.strokeRect);
            context.strokeText = this.BuildPositionReplacer(context.strokeText, 1);
            context.save = function () {
                that._translationState.push(that._translated);
                savedSave.call(this);
            };
            context.restore = function () {
                that._translated = that._translationState.pop();
                savedRestore.call(this);
            };
            context.translate = function () {
                var scale;
                if (!that._translated) {
                    scale = that._camera._GetDistanceScale();
                    arguments[0] += -that._camera.Position.X + that._canvasCenter.X * scale;
                    arguments[1] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                }
                that._translated = true;
                savedTranslate.apply(this, arguments);
            };
            return context;
        };
        Camera2dCanvasContextBuilder.prototype._UpdateCanvasCenter = function (newSize) {
            this._canvasCenter.X = newSize.Width / 2;
            this._canvasCenter.Y = newSize.Height / 2;
        };
        Camera2dCanvasContextBuilder.prototype.BuildPositionReplacer = function (replacee, positionArgOffset, argCount) {
            if (positionArgOffset === void 0) { positionArgOffset = 0; }
            if (argCount === void 0) { argCount = 2; }
            var that = this, axiList = ["X", "Y"];
            return function () {
                var scale, axi;
                if (!that._translated) {
                    scale = that._camera._GetDistanceScale();
                    for (var i = 0; i < argCount; i++) {
                        axi = axiList[i % 2];
                        // @ts-ignore
                        arguments[positionArgOffset + i] += -that._camera.Position[axi] + that._canvasCenter[axi] * scale;
                    }
                }
                // @ts-ignore
                return replacee.apply(this, arguments);
            };
        };
        return Camera2dCanvasContextBuilder;
    }());
    Rendering.Camera2dCanvasContextBuilder = Camera2dCanvasContextBuilder;
    /**
    * Defines a camera that is used to define a viewport.  Should be used in conjunction with a Camera2dRenderer to render graphics as if being viewed through a camera.
    */
    var Camera2d = /** @class */ (function (_super) {
        __extends(Camera2d, _super);
        /**
        * Creates a new instance of the Camera2d object.
        * @param position Initial position of the camera.
        * @param size Initial size of the camera.
        */
        function Camera2d(position, size) {
            var _this = _super.call(this, position, size) || this;
            _this._type = "Camera2d";
            _this.Distance = Camera2d.DefaultDistance;
            return _this;
        }
        /**
        * Converts an absolute position (0 to cameras Size) to a camera relative position.  Most useful when used to convert mouse click coordinates to scene coordinates.
        * @param position The absolute position to convert.  0 position represents the top or left hand side of the camera.
        */
        Camera2d.prototype.ToCameraRelative = function (position) {
            var scaledTopLeft = this.Position.Subtract(this.Size.Multiply(this._GetDistanceScale() * .5));
            return scaledTopLeft.Add(position.Multiply(this._GetDistanceScale()));
        };
        Camera2d.prototype._GetInverseDistanceScale = function () {
            return Camera2d.DefaultDistance / this.Distance;
        };
        Camera2d.prototype._GetDistanceScale = function () {
            return this.Distance / Camera2d.DefaultDistance;
        };
        /**
        *  The distance in which the Camera2d will default to and the distance that defines the 100% scale value.
        */
        Camera2d.DefaultDistance = 1000;
        return Camera2d;
    }(_Bounds_Bounds__WEBPACK_IMPORTED_MODULE_0__["Bounds"].BoundingRectangle));
    Rendering.Camera2d = Camera2d;
})(Rendering || (Rendering = {}));


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sound", function() { return Sound; });
/* harmony import */ var _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);

var Sound;
(function (Sound) {
    /**
* Defines a set of settings that are used to play AudioClip's a custom way.
*/
    var AudioSettings = /** @class */ (function () {
        function AudioSettings(repeat, volume, autoplay, preload) {
            if (repeat === void 0) { repeat = false; }
            if (volume === void 0) { volume = 100; }
            if (autoplay === void 0) { autoplay = false; }
            if (preload === void 0) { preload = "auto"; }
            this.Repeat = repeat;
            this.Volume = volume;
            this.AutoPlay = autoplay;
            this.Preload = preload;
        }
        /**
        * Returns a new AudioSettings object that is identical to the current AudioSettings object.
        */
        AudioSettings.prototype.Clone = function () {
            return new AudioSettings(this.Repeat, this.Volume, this.AutoPlay, this.Preload);
        };
        /**
        * The default audio settings.
        */
        AudioSettings.Default = new AudioSettings();
        return AudioSettings;
    }());
    Sound.AudioSettings = AudioSettings;
    /**
* Defines an AudioPlayer that is mapped to a specific source.  Ultimately used to play the same sound simultaneously.
*/
    var AudioPlayer = /** @class */ (function () {
        function AudioPlayer(source) {
            if (!(source instanceof Array)) {
                this._source = [];
                this._source.push(source);
            }
            else {
                this._source = source;
            }
        }
        AudioPlayer.prototype.BuildClip = function (settings) {
            if (settings === void 0) { settings = AudioSettings.Default; }
            return new AudioClip(this._source, settings);
        };
        AudioPlayer.prototype.Play = function (settings) {
            if (settings === void 0) { settings = AudioSettings.Default; }
            var clip = new AudioClip(this._source, settings);
            clip.Play();
            return clip;
        };
        return AudioPlayer;
    }());
    Sound.AudioPlayer = AudioPlayer;
    var supportedAudioTypes = {
        mp3: 'audio/mpeg',
        ogg: 'audio/ogg',
        wav: 'audio/wav',
        aac: 'audio/aac',
        m4a: 'audio/x-m4a'
    };
    /**
    * Defines a single audio clip that can be played, stopped or paused.
    */
    var AudioClip = /** @class */ (function () {
        function AudioClip(source, settings) {
            if (settings === void 0) { settings = AudioSettings.Default; }
            this._disposed = false;
            this._settings = settings.Clone();
            this._canPlayWires = [];
            if (source instanceof HTMLAudioElement) {
                this._audio = source;
            }
            else {
                this._audio = document.createElement("audio");
                this.SetAudioSource(source);
            }
            this.ApplySettings();
            this._onComplete = new _Utilities_EventHandler1__WEBPACK_IMPORTED_MODULE_0__["EventHandler1"]();
        }
        Object.defineProperty(AudioClip.prototype, "OnComplete", {
            /**
            * Gets an event that is triggered when the audio clip has completed, will not trigger if the audio clip is repeating.  Functions can be bound or unbound to this event to be executed when the event triggers.
            */
            get: function () {
                return this._onComplete;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AudioClip.prototype, "Volume", {
            /**
            * Gets or sets the audio clip volume.
            */
            get: function () {
                return this._settings.Volume;
            },
            set: function (percent) {
                this._settings.Volume = percent;
                this._audio.volume = Math.max(Math.min(percent / 100, 1), 0);
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Determines if the AudioClip is currently playing.
        */
        AudioClip.prototype.IsPlaying = function () {
            return !this._audio.paused;
        };
        /**
        * Determines if the AudioClip has completed.
        */
        AudioClip.prototype.IsComplete = function () {
            return this._audio.ended;
        };
        /**
        * Plays the current audio clip.
        */
        AudioClip.prototype.Play = function () {
            var _this = this;
            var wire;
            if (this._audio.readyState === 0) {
                wire = function () {
                    _this._audio.play();
                };
                this._canPlayWires.push(wire);
                this._audio.addEventListener("canplay", wire, true);
            }
            else {
                this._audio.play();
            }
        };
        /**
        * Pauses the current audio clip.
        */
        AudioClip.prototype.Pause = function () {
            this._audio.pause();
        };
        /**
        * Seeks the audio clip to the provided time.
        * @param time The time to seek to.
        */
        AudioClip.prototype.Seek = function (time) {
            var _this = this;
            var wire;
            if (this._audio.readyState === 0) {
                wire = function () {
                    _this._audio.currentTime = time;
                };
                this._canPlayWires.push(wire);
                this._audio.addEventListener("canplay", wire, true);
            }
            else {
                this._audio.currentTime = time;
            }
        };
        /**
        * Stops the current audio clip and seeks back to time 0.
        */
        AudioClip.prototype.Stop = function () {
            this.Seek(0);
            this._audio.pause();
        };
        /**
        * Unbinds all events and nulls out the settings and audio component to allow for garbage collection.
        */
        AudioClip.prototype.Dispose = function () {
            if (!this._disposed) {
                this._disposed = true;
                this._onComplete.Dispose();
                for (var i = 0; i < this._canPlayWires.length; i++) {
                    this._audio.removeEventListener("canplay", this._canPlayWires[i], true);
                }
                this._audio.removeEventListener("ended", this._endedWire, true);
                // @ts-ignore
                this._audio = null;
                // @ts-ignore
                this._settings = null;
            }
            else {
                throw new Error("Cannot dispose AudioClip more than once.");
            }
        };
        AudioClip.prototype.SetAudioSource = function (source) {
            var sourceHolder, sourceType;
            // If we've passed in a list of sources
            if (!(source instanceof Array)) {
                source = [source];
            }
            for (var i = 0; i < source.length; i++) {
                sourceHolder = document.createElement("source");
                sourceHolder.src = source[i];
                // @ts-ignore
                sourceType = supportedAudioTypes[source[i].split('.').pop()];
                if (typeof sourceType !== "undefined") {
                    sourceHolder.type = sourceType;
                }
                this._audio.appendChild(sourceHolder);
            }
        };
        AudioClip.prototype.ApplySettings = function () {
            var _this = this;
            this._audio.loop = this._settings.Repeat;
            this._audio.autoplay = this._settings.AutoPlay;
            this._audio.preload = this._settings.Preload;
            this.Volume = this._settings.Volume;
            this._endedWire = function (e) {
                _this.OnComplete.Trigger(e);
            };
            this._audio.addEventListener("ended", this._endedWire, true);
        };
        return AudioClip;
    }());
    Sound.AudioClip = AudioClip;
})(Sound || (Sound = {}));


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Content", function() { return Content; });
/* harmony import */ var _Graphics_Graphics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _Sound_Sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);


var Content;
(function (Content) {
    /**
    * Defines a content manager that is used to preload AudioClip's and ImageSource's so that they can be used throughout a game.
    */
    var ContentManager = /** @class */ (function () {
        /**
        * Creates a new instance of the ContentManager object.
        */
        function ContentManager() {
            this._images = {};
            this._audioPlayers = {};
        }
        ContentManager.prototype.LoadImage = function (name, src, width, height) {
            var imageSource;
            if (typeof width === "undefined") {
                imageSource = new _Graphics_Graphics__WEBPACK_IMPORTED_MODULE_0__["Graphics"].ImageSource(src);
            }
            else {
                imageSource = new _Graphics_Graphics__WEBPACK_IMPORTED_MODULE_0__["Graphics"].ImageSource(src, width, height);
            }
            this._images[name] = imageSource;
            return imageSource.Clone();
        };
        /**
        * Retrieves an ImageSource designated under the provided name.
        * @param name The mapped name of the ImageSource to retrieve.
        */
        ContentManager.prototype.GetImage = function (name) {
            if (this._images[name]) {
                return this._images[name].Clone();
            }
            else {
                throw new Error("Image with name '" + name + "' was not found.");
            }
        };
        /**
        * Unload the ImageSource that is mapped to the provided name.
        * @param name The mapped name of the ImageSource to unload.
        */
        ContentManager.prototype.UnloadImage = function (name) {
            if (this._images[name]) {
                delete this._images[name];
                return true;
            }
            return false;
        };
        ContentManager.prototype.LoadAudio = function (name, src) {
            this._audioPlayers[name] = new _Sound_Sound__WEBPACK_IMPORTED_MODULE_1__["Sound"].AudioPlayer(src);
            return this._audioPlayers[name];
        };
        /**
        * Retrieves a loaded audio player under the provided name.
        * @param name The mapped name of the AudioPlayer to retrieve.
        */
        ContentManager.prototype.GetAudio = function (name) {
            if (this._audioPlayers[name]) {
                return this._audioPlayers[name];
            }
            else {
                throw new Error("Audio with name '" + name + "' was not found.");
            }
        };
        /**
        * Unload the AudioPlayer that is mapped to the provided name.
        * @param name The mapped name of the AudioPlayer to unload.
        */
        ContentManager.prototype.UnloadAudio = function (name) {
            var player = this._audioPlayers[name];
            delete this._audioPlayers[name];
            return player;
        };
        return ContentManager;
    }());
    Content.ContentManager = ContentManager;
})(Content || (Content = {}));


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventHandler3", function() { return EventHandler3; });
/**
* Defines a type constrained event handler object that can maintain bound functions which take in a value T, U and V and trigger them on demand.
*/
var EventHandler3 = /** @class */ (function () {
    /**
    * Creates a new instance of the EventHandler3 object.
    */
    function EventHandler3() {
        this._type = "EventHandler3";
        this._actions = [];
    }
    /**
    * Binds the provided action to the EventHandler3.  Trigger will execute all bound functions.
    * @param action Function to execute on EventHandler3 Trigger.
    */
    EventHandler3.prototype.Bind = function (action) {
        this._actions.push(action);
    };
    /**
    * Binds the provided action to the EventHandler3 for the specified number of triggers.  Once all triggers have been fired the action will unbind itself.  Trigger will execute all bound functions.
    * @param action Function to execute on EventHandler3 Trigger.
    * @param triggerCount Number of triggers to wait before unbinding the action.
    */
    EventHandler3.prototype.BindFor = function (action, triggerCount) {
        var that = this, triggers = 0, wire = function () {
            if (++triggers >= triggerCount) {
                that.Unbind(wire);
            }
            // @ts-ignore
            action.apply(this, arguments);
        };
        this._actions.push(wire);
    };
    /**
    * Unbinds the provided action from the EventHandler3.
    * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
    */
    EventHandler3.prototype.Unbind = function (action) {
        for (var i = 0; i < this._actions.length; i++) {
            if (this._actions[i] === action) {
                this._actions.splice(i, 1);
                return;
            }
        }
    };
    /**
    * Determines if the EventHandler3 has active bindings.
    */
    EventHandler3.prototype.HasBindings = function () {
        return this._actions.length > 0;
    };
    /**
    * Executes all bound functions and passes the provided args to each.
    * @param val1 The first argument to pass to the bound functions.
    * @param val2 The second argument to pass to the bound functions.
    * @param val3 The third argument to pass to the bound functions.
    */
    EventHandler3.prototype.Trigger = function (val1, val2, val3) {
        var actions;
        if (this.HasBindings()) {
            // Clone array so unbinds happening via triggers do not affect functionality
            actions = this._actions.slice(0);
            for (var i = 0; i < actions.length; i++) {
                actions[i](val1, val2, val3);
            }
        }
    };
    /**
    * Disposes the event handler and unbinds all bound events.
    */
    EventHandler3.prototype.Dispose = function () {
        // Clear the array
        this._actions = [];
    };
    return EventHandler3;
}());



/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
/* harmony import */ var _Collision_Collision__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);
/* harmony import */ var _Rendering_Rendering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43);
/* harmony import */ var _Input_Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35);
/* harmony import */ var _Content_Content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(45);
/* harmony import */ var _GameTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(48);
/* harmony import */ var _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28);
/* harmony import */ var _GameConfiguration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(49);
/* harmony import */ var _GameRunner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(50);








/**
* Defines a virtual Game object that is meant to be derived from.  Games contain a multitude of management objects to control every aspect of the game.
*/
var Game = /** @class */ (function () {
    function Game(gameCanvas) {
        var _this = this;
        this._type = "Game";
        var initialQuadTreeSize, defaultMinQuadTreeSize = _Collision_Collision__WEBPACK_IMPORTED_MODULE_0__["Collision"].CollisionConfiguration._DefaultMinQuadTreeNodeSize;
        this._updateRequired = true;
        this._gameTime = new _GameTime__WEBPACK_IMPORTED_MODULE_4__["GameTime"]();
        this._ID = Game._gameIds++;
        if (gameCanvas) {
            this.Scene = new _Rendering_Rendering__WEBPACK_IMPORTED_MODULE_1__["Rendering"].Scene2d(function (context) {
                _this.Draw(context);
            }, gameCanvas);
        }
        else {
            this.Scene = new _Rendering_Rendering__WEBPACK_IMPORTED_MODULE_1__["Rendering"].Scene2d(function (context) {
                _this.Draw(context);
            });
        }
        this.Input = new _Input_Input__WEBPACK_IMPORTED_MODULE_2__["Input"].InputManager(this.Scene.DrawArea);
        this.Content = new _Content_Content__WEBPACK_IMPORTED_MODULE_3__["Content"].ContentManager();
        initialQuadTreeSize = this.Scene.Camera.Size;
        if (initialQuadTreeSize.Width % defaultMinQuadTreeSize.Width !== 0) {
            initialQuadTreeSize = new _Assets_Sizes_Size2d__WEBPACK_IMPORTED_MODULE_5__["Size2d"](initialQuadTreeSize.Width % defaultMinQuadTreeSize.Width + initialQuadTreeSize.Width);
        }
        this.Configuration = new _GameConfiguration__WEBPACK_IMPORTED_MODULE_6__["GameConfiguration"](_GameRunner__WEBPACK_IMPORTED_MODULE_7__["GameRunnerInstance"].Register(this), initialQuadTreeSize);
        this.CollisionManager = new _Collision_Collision__WEBPACK_IMPORTED_MODULE_0__["Collision"].CollisionManager(this.Configuration.CollisionConfiguration);
        this.Configuration.CollisionConfiguration._OnChange.Bind(function () {
            _this.CollisionManager = new _Collision_Collision__WEBPACK_IMPORTED_MODULE_0__["Collision"].CollisionManager(_this.Configuration.CollisionConfiguration);
        });
        this._PrepareLoadContent();
    }
    Game.prototype._PrepareUpdate = function () {
        this._gameTime.Update();
        this.Update(this._gameTime);
        this.CollisionManager.Update(this._gameTime);
        this._updateRequired = false;
    };
    Game.prototype._PrepareLoadContent = function () {
        this.LoadContent();
    };
    /**
    * Triggered at the start of the game.  All audio sources and images should be loaded in this method.
    */
    Game.prototype.LoadContent = function () {
    };
    /**
    * Triggered on a regular interval defined by the GameConfiguration.
    * @param gameTime The global game time object.  Used to represent total time running and used to track update interval elapsed speeds.
    */
    Game.prototype.Update = function (gameTime) {
    };
    Game.prototype._PrepareDraw = function () {
        if (this.Configuration.DrawOnlyAfterUpdate && this._updateRequired) {
            return;
        }
        this.Scene.Draw();
        this._updateRequired = true;
    };
    /**
    * Triggered as fast as possible.  Determined by the current browsers repaint rate.
    */
    Game.prototype.Draw = function (context) {
        // This is called by the scene
    };
    /**
    * Removes game canvas and disposes all tracked objects.
    */
    Game.prototype.Dispose = function () {
        this.Scene.Dispose();
        this.CollisionManager.Dispose();
        this.Input.Dispose();
        _GameRunner__WEBPACK_IMPORTED_MODULE_7__["GameRunnerInstance"].Unregister(this);
    };
    Game._gameIds = 0;
    return Game;
}());



/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameTime", function() { return GameTime; });
/* harmony import */ var _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);

/**
* Defines a game time class that is used to manage update timing execution as well as total game time.
*/
var GameTime = /** @class */ (function () {
    /**
    * Creates a new instance of the GameTime object.
    */
    function GameTime() {
        this._type = "GameTime";
        this._elapsed = _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].Zero;
        this._start = this._lastUpdate = new Date();
        this.Update();
    }
    Object.defineProperty(GameTime.prototype, "Elapsed", {
        /**
        * Gets the elapsed time since the last update.
        */
        get: function () {
            return this._elapsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameTime.prototype, "Now", {
        /**
        * Gets the current date time at the start of the update.
        */
        get: function () {
            return this._lastUpdate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameTime.prototype, "Total", {
        /**
        * Gets the total amount of time surpassed since construction.
        */
        get: function () {
            return _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].DateSpan(this._start, new Date());
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Updates the game time object.  Causes the gameTime to refresh all its components.
    */
    GameTime.prototype.Update = function () {
        var now = new Date();
        this._elapsed = new _Assets_TimeSpan__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"](now.getTime() - this._lastUpdate.getTime());
        this._lastUpdate = now;
    };
    return GameTime;
}());



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameConfiguration", function() { return GameConfiguration; });
/* harmony import */ var _Collision_Collision__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);

/**
* Defines a GameConfiguration object that is used to represent the current state of a Game object.
*/
var GameConfiguration = /** @class */ (function () {
    /**
    * Creates a new instance of the GameConfiguration object.
    * @param updateRateSetter A function that updates the rate of "Update" execution.
    */
    function GameConfiguration(updateRateSetter, initialQuadTreeSize) {
        this._defaultUpdateRate = 65;
        this.DrawOnlyAfterUpdate = true;
        this._updateRateSetter = updateRateSetter;
        this._updateRate = this.UpdateRate = this._defaultUpdateRate;
        this._collisionConfiguration = new _Collision_Collision__WEBPACK_IMPORTED_MODULE_0__["Collision"].CollisionConfiguration(initialQuadTreeSize);
    }
    Object.defineProperty(GameConfiguration.prototype, "UpdateRate", {
        /**
        * Gets or sets the UpdateRate of the game.  Update rates are represented as X many updates per second.
        */
        get: function () {
            return this._updateRate;
        },
        set: function (updateRate) {
            this._updateRate = updateRate;
            this._updateRateSetter(this._updateRate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfiguration.prototype, "CollisionConfiguration", {
        /**
        * Gets the CollisionConfiguration of the game.  These configurations are used to optimize the collision management performance.
        */
        get: function () {
            return this._collisionConfiguration;
        },
        enumerable: true,
        configurable: true
    });
    return GameConfiguration;
}());



/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameRunner", function() { return GameRunner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameRunnerInstance", function() { return GameRunnerInstance; });
/* harmony import */ var _Loopers_Loopers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(51);

var GameRunner = /** @class */ (function () {
    function GameRunner() {
        this._type = "GameRunner";
        this._updateCallbacks = {};
        this._drawCallbacks = {};
        this._updateLoop = null;
        this._drawLoop = null;
        this._callbackCount = 0;
    }
    GameRunner.prototype.Register = function (game) {
        var updateCallback = this.CreateAndCacheUpdateCallback(game);
        var drawCallback = this.CreateAndCacheDrawCallback(game);
        this._callbackCount++;
        // Try to start the loop prior to adding our games callback.  This callback may be the first, hence the "Try"
        this.TryLoopStart();
        if (!this._updateLoop || !this._drawLoop) {
            throw new Error("Unexpected.");
        }
        // Add our callback to the game loop (which is now running), it will now be called on an interval dictated by updateCallback
        this._updateLoop.AddCallback(updateCallback);
        this._drawLoop.AddCallback(drawCallback);
        // Updating the "updateRate" is an essential element to the game configuration.
        // If a game is running slowly we need to be able to slow down the update rate.
        return this.CreateUpdateRateSetter(updateCallback);
    };
    GameRunner.prototype.Unregister = function (game) {
        var updateCallback, drawCallback;
        if (this._updateCallbacks[game._ID]) {
            updateCallback = this._updateCallbacks[game._ID];
            drawCallback = this._drawCallbacks[game._ID];
            if (!this._updateLoop || !this._drawLoop) {
                throw new Error("Unexpected.");
            }
            this._updateLoop.RemoveCallback(updateCallback);
            this._drawLoop.RemoveCallback(drawCallback);
            delete this._updateCallbacks[game._ID];
            delete this._drawCallbacks[game._ID];
            this._callbackCount--;
            this.TryLoopStop();
        }
    };
    GameRunner.prototype.TryLoopStart = function () {
        if (this._callbackCount === 1) {
            this._updateLoop = new _Loopers_Loopers__WEBPACK_IMPORTED_MODULE_0__["Loopers"].Looper();
            this._updateLoop.Start();
            this._drawLoop = new _Loopers_Loopers__WEBPACK_IMPORTED_MODULE_0__["Loopers"].RepaintLooper();
            this._drawLoop.Start();
        }
    };
    GameRunner.prototype.TryLoopStop = function () {
        if (this._callbackCount === 0 && this._updateLoop != null && this._drawLoop != null) {
            this._updateLoop.Dispose();
            this._updateLoop = null;
            this._drawLoop.Dispose();
            this._drawLoop = null;
        }
    };
    GameRunner.prototype.CreateAndCacheUpdateCallback = function (game) {
        var updateCallback = new _Loopers_Loopers__WEBPACK_IMPORTED_MODULE_0__["Loopers"].TimedCallback(0, function () {
            game._PrepareUpdate();
        });
        this._updateCallbacks[game._ID] = updateCallback;
        return updateCallback;
    };
    GameRunner.prototype.CreateAndCacheDrawCallback = function (game) {
        var drawCallback = new _Loopers_Loopers__WEBPACK_IMPORTED_MODULE_0__["Loopers"].LooperCallback(function () {
            game._PrepareDraw();
        });
        this._drawCallbacks[game._ID] = drawCallback;
        return drawCallback;
    };
    GameRunner.prototype.CreateUpdateRateSetter = function (callback) {
        return function (updateRate) {
            callback.Fps = updateRate;
        };
    };
    return GameRunner;
}());

var GameRunnerInstance = new GameRunner();


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loopers", function() { return Loopers; });
/* harmony import */ var _Extensions_WindowExtensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Loopers;
(function (Loopers) {
    var Looper = /** @class */ (function () {
        function Looper() {
            this._type = "Looper";
            this._running = false;
            this._callbacks = [];
        }
        Looper.prototype.AddCallback = function (timedCallback) {
            var _this = this;
            this._callbacks.push(timedCallback);
            timedCallback.Active = true;
            if (this._running) {
                // Let initial call stack unwind before initiating the loop
                window.setTimeout(function () {
                    _this.Loop(timedCallback);
                }, 0);
            }
        };
        Looper.prototype.RemoveCallback = function (timedCallback) {
            for (var i = 0; i < this._callbacks.length; i++) {
                if (this._callbacks[i].ID === timedCallback.ID) {
                    window.clearTimeout(timedCallback.TimeoutID);
                    timedCallback.Active = false;
                    this._callbacks.splice(i, 1);
                    return;
                }
            }
        };
        Looper.prototype.Start = function () {
            this._running = true;
            this.Run();
        };
        Looper.prototype.Run = function () {
            var _this = this;
            for (var i = 0; i < this._callbacks.length; i++) {
                window.setTimeout((function (index) {
                    return function () {
                        _this.Loop(_this._callbacks[index]);
                    };
                })(i), 0);
            }
        };
        Looper.prototype.Loop = function (timedCallback) {
            var that = this, msTimer = 1000 / timedCallback.Fps;
            timedCallback.Callback();
            if (timedCallback.Active) {
                timedCallback.TimeoutID = window.setTimeout(function () {
                    that.Loop(timedCallback);
                }, msTimer);
            }
        };
        Looper.prototype.Dispose = function () {
            // We need to "remove" every callback to stop each of their timeouts
            for (var i = this._callbacks.length - 1; i >= 0; i--) {
                this.RemoveCallback(this._callbacks[i]);
            }
            this._callbacks = [];
            this._running = false;
        };
        return Looper;
    }());
    Loopers.Looper = Looper;
    var LooperCallback = /** @class */ (function () {
        function LooperCallback(callback) {
            this._type = "LooperCallback";
            this.Callback = callback;
            this.ID = LooperCallback._ids++;
        }
        LooperCallback._ids = 0;
        return LooperCallback;
    }());
    Loopers.LooperCallback = LooperCallback;
    // This looper uses the request animation frame to run its internal loop
    // The method has been aliased as "OnRepaintCompleted" via the WindowExtensions
    var RepaintLooper = /** @class */ (function () {
        function RepaintLooper() {
            this._type = "RepaintLooper";
            this._running = false;
            this._callbacksModified = false;
            this._callbacks = [];
        }
        RepaintLooper.prototype.Start = function () {
            this._running = true;
            this.Run();
        };
        RepaintLooper.prototype.Run = function () {
            var _this = this;
            if (this._running) {
                this._callbacksModified = false;
                for (var i = 0; i < this._callbacks.length; i++) {
                    this._callbacks[i].Callback();
                    if (this._callbacksModified) {
                        break;
                    }
                }
                // We want to maintain the "this" context, also we need to continuously bind
                // the method due to how the underlying native function works
                Object(_Extensions_WindowExtensions__WEBPACK_IMPORTED_MODULE_0__["OnWindowRepaintCompleted"])(function () {
                    _this.Run();
                });
            }
        };
        RepaintLooper.prototype.AddCallback = function (looperCallback) {
            // This doesn't necessarily need to be here (it wont do any harm) but in order for
            // consistency sake I'm putting it in
            this._callbacksModified = true;
            this._callbacks.push(looperCallback);
        };
        RepaintLooper.prototype.RemoveCallback = function (looperCallback) {
            for (var i = 0; i < this._callbacks.length; i++) {
                if (this._callbacks[i].ID === looperCallback.ID) {
                    this._callbacksModified = true;
                    this._callbacks.splice(i, 1);
                    return;
                }
            }
        };
        RepaintLooper.prototype.Dispose = function () {
            this._callbacksModified = true;
            this._callbacks = [];
            this._running = false;
        };
        return RepaintLooper;
    }());
    Loopers.RepaintLooper = RepaintLooper;
    var TimedCallback = /** @class */ (function (_super) {
        __extends(TimedCallback, _super);
        function TimedCallback(fps, callback) {
            var _this = _super.call(this, callback) || this;
            _this._type = "TimedCallback";
            _this.Fps = fps;
            _this.TimeoutID = 0;
            _this.Active = false;
            return _this;
        }
        return TimedCallback;
    }(LooperCallback));
    Loopers.TimedCallback = TimedCallback;
})(Loopers || (Loopers = {}));


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnWindowRepaintCompleted", function() { return OnWindowRepaintCompleted; });
function OnWindowRepaintCompleted(callback) {
    if (window.requestAnimationFrame) {
        window.requestAnimationFrame(function (time) { return callback(); });
        return;
    }
    setTimeout(callback, 0);
}


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Matrix2x2", function() { return Matrix2x2; });
/* harmony import */ var _Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);

/**
* Defines a matrix with 2 columns and 2 rows (2x2).
*/
var Matrix2x2 = /** @class */ (function () {
    function Matrix2x2(topLeft, topRight, botLeft, botRight) {
        if (topLeft === void 0) { topLeft = 0; }
        if (topRight === void 0) { topRight = 0; }
        if (botLeft === void 0) { botLeft = 0; }
        if (botRight === void 0) { botRight = 0; }
        this._type = "Matrix2x2";
        this.Values = [
            [topLeft, topRight],
            [botLeft, botRight]
        ];
    }
    Object.defineProperty(Matrix2x2, "Zero", {
        /**
        * Creates a Matrix2x2 with all its rows and columns initialized to 0.
        */
        get: function () {
            return new Matrix2x2();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix2x2, "Identity", {
        /**
        * Returns the identity matrix for a 2x2.
        */
        get: function () {
            return new Matrix2x2(1, 0, 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Executes the action with each row and column item of this Matrix2x2 and modifies their values.
    * @param action The function used to modify each row and column items.
    */
    Matrix2x2.prototype.Apply = function (action) {
        this.Values[0][0] = action(this.Values[0][0]);
        this.Values[0][1] = action(this.Values[0][1]);
        this.Values[1][0] = action(this.Values[1][0]);
        this.Values[1][1] = action(this.Values[1][1]);
    };
    /**
    * Executes the action with each row and column item of this Matrix2x2.
    * @param action The function to pass the row column item to.
    */
    Matrix2x2.prototype.Trigger = function (action) {
        action(this.Values[0][0]);
        action(this.Values[0][1]);
        action(this.Values[1][0]);
        action(this.Values[1][1]);
    };
    Matrix2x2.prototype.Add = function (val) {
        if (val._type === "Matrix2x2") {
            return new Matrix2x2(this.Values[0][0] + val.Values[0][0], this.Values[0][1] + val.Values[0][1], this.Values[1][0] + val.Values[1][0], this.Values[1][1] + val.Values[1][1]);
        }
        else {
            return new Matrix2x2(this.Values[0][0] + val, this.Values[0][1] + val, this.Values[1][0] + val, this.Values[1][1] + val);
        }
    };
    Matrix2x2.prototype.Multiply = function (val) {
        if (val._type === "Matrix2x2") {
            return new Matrix2x2(this.Values[0][0] * val.Values[0][0] + this.Values[0][1] * val.Values[1][0], this.Values[0][0] * val.Values[0][1] + this.Values[0][1] * val.Values[1][1], this.Values[1][0] * val.Values[0][0] + this.Values[1][1] * val.Values[1][0], this.Values[1][0] * val.Values[0][1] + this.Values[1][1] * val.Values[1][1]);
        }
        else {
            return new Matrix2x2(this.Values[0][0] * val, this.Values[0][1] * val, this.Values[1][0] * val, this.Values[1][1] * val);
        }
    };
    Matrix2x2.prototype.Subtract = function (val) {
        if (val._type === "Matrix2x2") {
            return new Matrix2x2(this.Values[0][0] - val.Values[0][0], this.Values[0][1] - val.Values[0][1], this.Values[1][0] - val.Values[1][0], this.Values[1][1] - val.Values[1][1]);
        }
        else {
            return new Matrix2x2(this.Values[0][0] - val, this.Values[0][1] - val, this.Values[1][0] - val, this.Values[1][1] - val);
        }
    };
    Matrix2x2.prototype.SubtractFrom = function (val) {
        if (val._type === "Matrix2x2") {
            return new Matrix2x2(val.Values[0][0] - this.Values[0][0], val.Values[0][1] - this.Values[0][1], val.Values[1][0] - this.Values[1][0], val.Values[1][1] - this.Values[1][1]);
        }
        else {
            return new Matrix2x2(val - this.Values[0][0], val - this.Values[0][1], val - this.Values[1][0], val - this.Values[1][1]);
        }
    };
    Matrix2x2.prototype.Divide = function (val) {
        if (val._type === "Matrix2x2") {
            return new Matrix2x2(this.Values[0][0] / val.Values[0][0], this.Values[0][1] / val.Values[0][1], this.Values[1][0] / val.Values[1][0], this.Values[1][1] / val.Values[1][1]);
        }
        else {
            return new Matrix2x2(this.Values[0][0] / val, this.Values[0][1] / val, this.Values[1][0] / val, this.Values[1][1] / val);
        }
    };
    Matrix2x2.prototype.DivideFrom = function (val) {
        if (val._type === "Matrix2x2") {
            return new Matrix2x2(val.Values[0][0] / this.Values[0][0], val.Values[0][1] / this.Values[0][1], val.Values[1][0] / this.Values[1][0], val.Values[1][1] / this.Values[1][1]);
        }
        else {
            return new Matrix2x2(val / this.Values[0][0], val / this.Values[0][1], val / this.Values[1][0], val / this.Values[1][1]);
        }
    };
    /**
    * Returns a Vector2d that has been transformed by the current Matrix2x2.
    * @param vector The vector to transform.
    */
    Matrix2x2.prototype.Transform = function (vector) {
        return new _Vectors_Vector2d__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](this.Values[0][0] * vector.X + this.Values[0][1] * vector.Y, this.Values[1][0] * vector.X + this.Values[1][1] * vector.Y);
    };
    /**
    * Returns the transpose of the current Matrix2x2.
    */
    Matrix2x2.prototype.Transpose = function () {
        return new Matrix2x2(this.Values[0][0], this.Values[1][0], this.Values[0][1], this.Values[1][1]);
    };
    /**
    * Returns the determinant of the current Matrix2x2.
    */
    Matrix2x2.prototype.Determinant = function () {
        return this.Values[0][0] * this.Values[1][1] - this.Values[0][1] * this.Values[1][0];
    };
    /**
    * Returns the inverse of the current Matrix2x2.
    */
    Matrix2x2.prototype.Inverse = function () {
        return new Matrix2x2(this.Values[1][1], -this.Values[0][1], -this.Values[1][0], this.Values[0][0]).Multiply(1 / this.Determinant());
    };
    /**
    * Returns a Matrix2x2 that has identical rows and columns as the current Matrix2x2.
    */
    Matrix2x2.prototype.Clone = function () {
        return new Matrix2x2(this.Values[0][0], this.Values[0][1], this.Values[1][0], this.Values[1][1]);
    };
    /**
    * Determines whether this Matrix2x2 has the same row and column values as the provided Matrix2x2.
    * @param matrix The Matrix2x2 to compare the current Matrix2x2 to.
    */
    Matrix2x2.prototype.Equivalent = function (matrix) {
        return this.Values[0][0] === matrix.Values[0][0] && this.Values[0][1] === matrix.Values[0][1] && this.Values[1][0] === matrix.Values[1][0] && this.Values[1][1] === matrix.Values[1][1];
    };
    /**
    * Overridden toString method to display Matrix2x2 in easy to read format: "[topLeft, topRight] [botLeft, botRight]"
    */
    Matrix2x2.prototype.toString = function () {
        return this.Values[0].toString() + " " + this.Values[1].toString();
    };
    /**
    * Creates a scaling matrix based off the provided Vector2d.
    * @param vector The vector used to determine the X and Y scaling values.
    */
    Matrix2x2.Scale = function (vector) {
        return new Matrix2x2(vector.X, 0, 0, vector.Y);
    };
    return Matrix2x2;
}());



/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigurationManager", function() { return ConfigurationManager; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _Ships_Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(55);
/* harmony import */ var _Ships_ShipMovementController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(65);
/* harmony import */ var _Ships_ShipFireController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(82);
/* harmony import */ var _Ships_ShipLifeController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(60);
/* harmony import */ var _Ships_Abilities_Boost__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(69);
/* harmony import */ var _Space_Map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(73);
/* harmony import */ var _GameScreen__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(83);
/* harmony import */ var _Bullets_Bullet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(85);
/* harmony import */ var _Powerups_HealthPack__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(90);
/* harmony import */ var _HUD_LeaderboardManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(93);
/* harmony import */ var _HUD_DeathScreen__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(94);
/* harmony import */ var _User_LatencyResolver__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(95);













var ConfigurationManager = /** @class */ (function () {
    function ConfigurationManager(configuration) {
        // Update the prototypes from the config
        _Ships_Ship__WEBPACK_IMPORTED_MODULE_1__["Ship"].SIZE = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"](configuration.shipConfig.WIDTH, configuration.shipConfig.HEIGHT);
        _Ships_Ship__WEBPACK_IMPORTED_MODULE_1__["Ship"].DAMAGE_INCREASE_RATE = configuration.shipConfig.DAMAGE_INCREASE_RATE;
        _Ships_ShipFireController__WEBPACK_IMPORTED_MODULE_3__["ShipFireController"].MIN_FIRE_RATE = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromMilliseconds(configuration.shipConfig.MIN_FIRE_RATE);
        _Ships_ShipMovementController__WEBPACK_IMPORTED_MODULE_2__["ShipMovementController"].DRAG_AREA = configuration.shipMovementControllerConfig.DRAG_AREA;
        _Ships_ShipMovementController__WEBPACK_IMPORTED_MODULE_2__["ShipMovementController"].DRAG_COEFFICIENT = configuration.shipMovementControllerConfig.DRAG_COEFFICIENT;
        _Ships_ShipMovementController__WEBPACK_IMPORTED_MODULE_2__["ShipMovementController"].ENGINE_POWER = configuration.shipMovementControllerConfig.ENGINE_POWER;
        _Ships_ShipMovementController__WEBPACK_IMPORTED_MODULE_2__["ShipMovementController"].MASS = configuration.shipMovementControllerConfig.MASS;
        _Ships_ShipMovementController__WEBPACK_IMPORTED_MODULE_2__["ShipMovementController"].ROTATE_SPEED = configuration.shipMovementControllerConfig.ROTATE_SPEED * .0174532925; // Convert to radians
        _Ships_ShipLifeController__WEBPACK_IMPORTED_MODULE_4__["ShipLifeController"].START_LIFE = configuration.shipConfig.START_LIFE;
        _Ships_Abilities_Boost__WEBPACK_IMPORTED_MODULE_5__["Boost"].DURATION = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromMilliseconds(configuration.abilityConfig.BOOST_DURATION);
        _Ships_Abilities_Boost__WEBPACK_IMPORTED_MODULE_5__["Boost"].SPEED_INCREASE = configuration.abilityConfig.BOOST_SPEED_INCREASE;
        _Space_Map__WEBPACK_IMPORTED_MODULE_6__["Map"].SIZE = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"](configuration.mapConfig.WIDTH, configuration.mapConfig.HEIGHT);
        _Space_Map__WEBPACK_IMPORTED_MODULE_6__["Map"].BARRIER_DEPRECATION = configuration.mapConfig.BARRIER_DEPRECATION;
        _GameScreen__WEBPACK_IMPORTED_MODULE_7__["GameScreen"].MAX_SCREEN_HEIGHT = configuration.screenConfig.MAX_SCREEN_HEIGHT;
        _GameScreen__WEBPACK_IMPORTED_MODULE_7__["GameScreen"].MAX_SCREEN_WIDTH = configuration.screenConfig.MAX_SCREEN_WIDTH;
        _GameScreen__WEBPACK_IMPORTED_MODULE_7__["GameScreen"].MIN_SCREEN_HEIGHT = configuration.screenConfig.MIN_SCREEN_HEIGHT;
        _GameScreen__WEBPACK_IMPORTED_MODULE_7__["GameScreen"].MIN_SCREEN_WIDTH = configuration.screenConfig.MIN_SCREEN_WIDTH;
        _GameScreen__WEBPACK_IMPORTED_MODULE_7__["GameScreen"].SCREEN_BUFFER_AREA = configuration.screenConfig.SCREEN_BUFFER_AREA;
        _Bullets_Bullet__WEBPACK_IMPORTED_MODULE_8__["Bullet"].BULLET_DIE_AFTER = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromMilliseconds(configuration.gameConfig.BULLET_DIE_AFTER);
        _Bullets_Bullet__WEBPACK_IMPORTED_MODULE_8__["Bullet"].SIZE = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"](configuration.bulletConfig.WIDTH, configuration.bulletConfig.HEIGHT);
        _Powerups_HealthPack__WEBPACK_IMPORTED_MODULE_9__["HealthPack"].SIZE = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"](configuration.healthPackConfig.WIDTH, configuration.healthPackConfig.HEIGHT);
        _Powerups_HealthPack__WEBPACK_IMPORTED_MODULE_9__["HealthPack"].LIFE_SPAN = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromMilliseconds(configuration.healthPackConfig.LIFE_SPAN);
        _HUD_LeaderboardManager__WEBPACK_IMPORTED_MODULE_10__["LeaderboardManager"].LEADERBOARD_SIZE = configuration.leaderboardConfig.LEADERBOARD_SIZE;
        _HUD_DeathScreen__WEBPACK_IMPORTED_MODULE_11__["DeathScreen"].RESPAWN_TIMER = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromSeconds(configuration.gameConfig.RESPAWN_TIMER);
        $.extend(this, configuration);
        _User_LatencyResolver__WEBPACK_IMPORTED_MODULE_12__["LatencyResolver"].REQUEST_PING_EVERY = configuration.gameConfig.REQUEST_PING_EVERY;
    }
    return ConfigurationManager;
}());



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ship", function() { return Ship; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _Graphics_ShipGraphic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(56);
/* harmony import */ var _ShipMovementController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(65);
/* harmony import */ var _Abilities_AbilityHandlers_ShipAbilityHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(67);
/* harmony import */ var _Animations_ShipAnimationHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(76);
/* harmony import */ var _ShipLifeController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(60);
/* harmony import */ var _Levels_ShipLevelManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(81);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var Ship = /** @class */ (function (_super) {
    __extends(Ship, _super);
    function Ship(payload, contentManager) {
        var _this = _super.call(this) || this;
        _this._destroyed = false;
        _this.OnExplosion = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["EventHandler"]();
        _this.ID = -1;
        _this.LifeController = new _ShipLifeController__WEBPACK_IMPORTED_MODULE_5__["ShipLifeController"](payload);
        _this.LevelManager = new _Levels_ShipLevelManager__WEBPACK_IMPORTED_MODULE_6__["ShipLevelManager"](payload);
        _this.Graphic = new _Graphics_ShipGraphic__WEBPACK_IMPORTED_MODULE_1__["ShipGraphic"](payload.Name, !!payload.UserControlled, _this.LevelManager, _this.LifeController, payload.MovementController.Position, payload.MovementController.Rotation, Ship.SIZE, contentManager);
        // Going to use the rectangle to "hold" all the other graphics
        _this.Bounds = _this.Graphic.GetDrawBounds();
        _this.MovementController = new _ShipMovementController__WEBPACK_IMPORTED_MODULE_2__["ShipMovementController"](new Array(_this.Bounds, _this.Graphic));
        _this.MovementController.UserControlled = !!payload.UserControlled;
        _this.AbilityHandler = new _Abilities_AbilityHandlers_ShipAbilityHandler__WEBPACK_IMPORTED_MODULE_3__["ShipAbilityHandler"](_this);
        _this.AnimationHandler = new _Animations_ShipAnimationHandler__WEBPACK_IMPORTED_MODULE_4__["ShipAnimationHandler"](_this, contentManager);
        _this.LoadPayload(payload, true);
        _this.Graphic.RotateShip(_this.MovementController.Rotation);
        return _this;
    }
    Ship.prototype.Update = function (gameTime) {
        this.AbilityHandler.Update(gameTime);
        this.MovementController.Update(gameTime);
        this.AnimationHandler.Update(gameTime);
        // Updates rotation
        this.Graphic.RotateShip(this.MovementController.Rotation);
        this.Graphic.Update(gameTime);
    };
    Ship.prototype.LoadPayload = function (payload, forceMovement) {
        this.ID = payload.ID;
        this.MovementController.LoadPayload(payload.MovementController, forceMovement);
        this.LifeController.LoadPayload(payload);
        this.LevelManager.LoadPayload(payload);
        this.AbilityHandler.LoadPayload(payload.Abilities);
    };
    Ship.prototype.Destroy = function (explode) {
        if (explode === void 0) { explode = false; }
        if (!this._destroyed) {
            this._destroyed = true;
            this.MovementController.Dispose();
            if (!explode) {
                this.Graphic.Dispose();
                this.Dispose();
            }
            else {
                // We rely on the completion of the explosion to finish disposing the bounds and graphic
                this.OnExplosion.Trigger();
            }
        }
    };
    Ship.SIZE = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"](75);
    Ship.DAMAGE_INCREASE_RATE = .1;
    return Ship;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Collision"].Collidable));



/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipGraphic", function() { return ShipGraphic; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _ShipBodyGraphic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(57);
/* harmony import */ var _ShipDamageGraphic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(58);
/* harmony import */ var _ShipLifeGraphic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(59);
/* harmony import */ var _ShipStatusTextGraphic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(62);
/* harmony import */ var _ShipNameGraphic__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(64);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var ShipGraphic = /** @class */ (function (_super) {
    __extends(ShipGraphic, _super);
    function ShipGraphic(name, userControlled, levelManager, lifeController, position, rotation, size, contentManager) {
        var _this = 
        // The Graphic color is transparent because all graphics that represent a ship will be added as a child.
        _super.call(this, position.X, position.Y, size.Width, size.Height, _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.Transparent) || this;
        _this.Body = new _ShipBodyGraphic__WEBPACK_IMPORTED_MODULE_1__["ShipBodyGraphic"](levelManager);
        _this.RotateShip(rotation);
        _this._damageGraphic = new _ShipDamageGraphic__WEBPACK_IMPORTED_MODULE_2__["ShipDamageGraphic"](lifeController, contentManager);
        _this._statusGraphic = new _ShipStatusTextGraphic__WEBPACK_IMPORTED_MODULE_4__["ShipStatusTextGraphic"](levelManager, lifeController);
        _this.AddChild(_this.Body);
        _this.AddChild(_this._statusGraphic);
        _this.Body.AddChild(_this._damageGraphic);
        if (!userControlled) {
            _this._lifeBar = new _ShipLifeGraphic__WEBPACK_IMPORTED_MODULE_3__["ShipLifeGraphic"](lifeController);
            _this._nameGraphic = new _ShipNameGraphic__WEBPACK_IMPORTED_MODULE_5__["ShipNameGraphic"](name);
            _this.AddChild(_this._lifeBar);
            _this.AddChild(_this._nameGraphic);
        }
        return _this;
    }
    ShipGraphic.prototype.Status = function (text, size, color, fadeDuration, reverseDirection) {
        this._statusGraphic.Status(text, size, color, fadeDuration, reverseDirection);
    };
    ShipGraphic.prototype.AddChildToShip = function (child) {
        this.Body.AddChild(child);
    };
    ShipGraphic.prototype.RotateShip = function (newRotation) {
        this.Body.Rotation = newRotation;
    };
    ShipGraphic.prototype.HideShip = function () {
        if (this._lifeBar) {
            this._lifeBar.Visible = false;
            if (this._nameGraphic) {
                this._nameGraphic.Visible = false;
            }
        }
        this.Body.Visible = false;
    };
    ShipGraphic.prototype.Update = function (gameTime) {
        this._statusGraphic.Update(gameTime);
    };
    return ShipGraphic;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Rectangle));



/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipBodyGraphic", function() { return ShipBodyGraphic; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ShipBodyGraphic = /** @class */ (function (_super) {
    __extends(ShipBodyGraphic, _super);
    function ShipBodyGraphic(levelManager) {
        var _this = _super.call(this, 0, 0, ShipBodyGraphic._bodyGraphics[Math.min(levelManager.Level, 13)]) || this;
        levelManager.OnLevelChange.Bind(function (newLevel) {
            _this.Image = _this.DetermineBody(levelManager);
        });
        return _this;
    }
    ShipBodyGraphic.prototype.DetermineBody = function (levelManager) {
        return ShipBodyGraphic._bodyGraphics[Math.min(levelManager.Level, 13)];
    };
    // Made as a static so we don't have to construct the ship bodies every time a new ship is created.
    ShipBodyGraphic.LoadShipBodies = function (contentManager) {
        ShipBodyGraphic._bodyGraphics = new Array();
        ShipBodyGraphic._bodyGraphics[1] = ShipBodyGraphic._bodyGraphics[2] = contentManager.GetImage("Ship1");
        ShipBodyGraphic._bodyGraphics[3] = ShipBodyGraphic._bodyGraphics[4] = contentManager.GetImage("Ship3");
        ShipBodyGraphic._bodyGraphics[5] = ShipBodyGraphic._bodyGraphics[6] = contentManager.GetImage("Ship5");
        ShipBodyGraphic._bodyGraphics[7] = contentManager.GetImage("Ship7");
        ShipBodyGraphic._bodyGraphics[8] = contentManager.GetImage("Ship8");
        ShipBodyGraphic._bodyGraphics[9] = contentManager.GetImage("Ship9");
        ShipBodyGraphic._bodyGraphics[10] = ShipBodyGraphic._bodyGraphics[11] = contentManager.GetImage("Ship10");
        ShipBodyGraphic._bodyGraphics[12] = contentManager.GetImage("Ship12");
        ShipBodyGraphic._bodyGraphics[13] = contentManager.GetImage("Ship10");
    };
    return ShipBodyGraphic;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Sprite2d));



/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipDamageGraphic", function() { return ShipDamageGraphic; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(55);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var ShipDamageGraphic = /** @class */ (function (_super) {
    __extends(ShipDamageGraphic, _super);
    function ShipDamageGraphic(lifeController, contentManager) {
        var _this = this;
        var damageTier;
        _this = _super.call(this, 0, 0, _Ship__WEBPACK_IMPORTED_MODULE_1__["Ship"].SIZE.Width, _Ship__WEBPACK_IMPORTED_MODULE_1__["Ship"].SIZE.Height, _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.Transparent) || this;
        _this._damageTiers = new Array();
        for (var i = 0; i < ShipDamageGraphic.DAMAGE_TIERS.length; i++) {
            damageTier = ShipDamageGraphic.DAMAGE_TIERS[i];
            _this._damageTiers[damageTier] = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Sprite2d(0, 0, contentManager.GetImage("ShipDamage" + damageTier));
            _this._damageTiers[damageTier].ZIndex = i;
            _this._damageTiers[damageTier].Visible = false;
            _this.AddChild(_this._damageTiers[damageTier]);
        }
        lifeController.OnLifeChange.Bind(function (currentHealth, maxHealth) {
            var damageImage = Math.floor((1 - currentHealth / maxHealth) * 10) - 2, damageTier;
            if (damageImage > 0) {
                for (var i = 0; i < ShipDamageGraphic.DAMAGE_TIERS.length; i++) {
                    damageTier = ShipDamageGraphic.DAMAGE_TIERS[i];
                    if (damageTier <= damageImage) {
                        _this._damageTiers[damageTier].Visible = true;
                    }
                    else {
                        _this._damageTiers[damageTier].Visible = false;
                    }
                }
            }
            else { // Not enough damage, turn all damage images off
                for (var i = 0; i < ShipDamageGraphic.DAMAGE_TIERS.length; i++) {
                    damageTier = ShipDamageGraphic.DAMAGE_TIERS[i];
                    _this._damageTiers[damageTier].Visible = false;
                }
            }
        });
        return _this;
    }
    ShipDamageGraphic.prototype.Update = function (gameTime) {
    };
    ShipDamageGraphic.DAMAGE_TIERS = [1, 3, 5, 7];
    return ShipDamageGraphic;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Rectangle));



/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipLifeGraphic", function() { return ShipLifeGraphic; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _ShipLifeController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(60);
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var ShipLifeGraphic = /** @class */ (function (_super) {
    __extends(ShipLifeGraphic, _super);
    function ShipLifeGraphic(lifeController) {
        var _this = this;
        var width = _Ship__WEBPACK_IMPORTED_MODULE_2__["Ship"].SIZE.Width * ShipLifeGraphic.SHIP_WIDTH_PARTIAL;
        _this = _super.call(this, 0, _Ship__WEBPACK_IMPORTED_MODULE_2__["Ship"].SIZE.HalfHeight + ShipLifeGraphic.Y_OFFSET, width, ShipLifeGraphic.HEIGHT, ShipLifeGraphic.BACKGROUND_COLOR) || this;
        _this._lifeController = lifeController;
        _this.Border(1, ShipLifeGraphic.BORDER_COLOR);
        _this._overlay = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Rectangle(0, 0, width, ShipLifeGraphic.HEIGHT, _this.OverlayColor());
        _this._lifeController.OnLifeChange.Bind(function (health, maxHealth) {
            _this.UpdateGraphic(health, maxHealth);
        });
        _this.UpdateGraphic(lifeController.Health, lifeController.MaxHealth);
        _this.AddChild(_this._overlay);
        return _this;
    }
    ShipLifeGraphic.prototype.UpdateGraphic = function (health, maxHealth) {
        var healthPercentage = health / maxHealth;
        this._overlay.Color = this.OverlayColor();
        this._overlay.Size.Width = healthPercentage * (this.Size.Width);
        this._overlay.Position.X = -(this.Size.Width - this._overlay.Size.Width) * .5;
    };
    ShipLifeGraphic.prototype.OverlayColor = function () {
        var healthPercentage = this._lifeController.HealthPercent;
        if (healthPercentage <= _ShipLifeController__WEBPACK_IMPORTED_MODULE_1__["ShipLifeController"].BAD_THRESHOLD) {
            return _ShipLifeController__WEBPACK_IMPORTED_MODULE_1__["ShipLifeController"].BAD_COLOR;
        }
        else if (healthPercentage <= _ShipLifeController__WEBPACK_IMPORTED_MODULE_1__["ShipLifeController"].HURT_THRESHOLD) {
            return _ShipLifeController__WEBPACK_IMPORTED_MODULE_1__["ShipLifeController"].HURT_COLOR;
        }
        else {
            return _ShipLifeController__WEBPACK_IMPORTED_MODULE_1__["ShipLifeController"].GOOD_COLOR;
        }
    };
    ShipLifeGraphic.BACKGROUND_COLOR = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.FromHex("7F767D");
    ShipLifeGraphic.BORDER_COLOR = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.Black;
    ShipLifeGraphic.Y_OFFSET = 15;
    ShipLifeGraphic.SHIP_WIDTH_PARTIAL = .8;
    ShipLifeGraphic.HEIGHT = 5;
    return ShipLifeGraphic;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Rectangle));



/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipLifeController", function() { return ShipLifeController; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _Common_LifeController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var ShipLifeController = /** @class */ (function (_super) {
    __extends(ShipLifeController, _super);
    function ShipLifeController(payload) {
        return _super.call(this, payload.LifeController.Health, payload.MaxLife) || this;
    }
    ShipLifeController.START_LIFE = 100;
    ShipLifeController.BAD_COLOR = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.FromHex("#ED1E79");
    ShipLifeController.HURT_COLOR = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.FromHex("#FF931E");
    ShipLifeController.GOOD_COLOR = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.FromHex("#7AC943");
    ShipLifeController.BAD_THRESHOLD = .3;
    ShipLifeController.HURT_THRESHOLD = .6;
    return ShipLifeController;
}(_Common_LifeController__WEBPACK_IMPORTED_MODULE_1__["LifeController"]));



/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LifeController", function() { return LifeController; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);

var LifeController = /** @class */ (function () {
    function LifeController(health, maxHealth) {
        this.Alive = true;
        this.Health = health;
        this.MaxHealth = maxHealth;
        this.OnLifeChange = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["EventHandler2"]();
    }
    Object.defineProperty(LifeController.prototype, "HealthPercent", {
        get: function () {
            return this.Health / this.MaxHealth;
        },
        enumerable: true,
        configurable: true
    });
    LifeController.prototype.LoadPayload = function (payload) {
        this.Alive = payload.LifeController.Alive;
        if (this.Health !== payload.LifeController.Health || this.MaxHealth !== payload.MaxLife) {
            this.Health = payload.LifeController.Health;
            this.MaxHealth = payload.MaxLife;
            this.OnLifeChange.Trigger(this.Health, this.MaxHealth);
        }
    };
    return LifeController;
}());



/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipStatusTextGraphic", function() { return ShipStatusTextGraphic; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _StatusText__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(63);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var ShipStatusTextGraphic = /** @class */ (function (_super) {
    __extends(ShipStatusTextGraphic, _super);
    function ShipStatusTextGraphic(levelManager, lifeController) {
        var _this = _super.call(this, 0, 0, 0, _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.Transparent) || this;
        _this._statusIds = 0;
        _this._statuses = {};
        _this._lastHealth = lifeController.Health;
        _this._lastLevel = levelManager.Level;
        _this._lastExperience = levelManager.Experience;
        _this._lastExperienceToNextLevel = levelManager.ExperienceToNextLevel;
        lifeController.OnLifeChange.Bind(function (health, maxHealth) {
            var diff = health - _this._lastHealth;
            if (levelManager.Level === _this._lastLevel && diff !== 0) {
                if (diff < 0) {
                    _this.Status(diff.toString(), ShipStatusTextGraphic.HEALTH_DECREASE_SIZE, ShipStatusTextGraphic.HEALTH_DECREASE_COLOR);
                }
                else {
                    _this.Status("+" + diff.toString(), ShipStatusTextGraphic.HEALTH_INCREASE_SIZE, ShipStatusTextGraphic.HEALTH_INCREASE_COLOR);
                }
                _this._lastHealth = health;
            }
        });
        levelManager.OnExperienceChange.Bind(function (experience) {
            if (typeof _this._lastExperience === "undefined") {
                _this._lastExperience = experience;
                _this._lastExperienceToNextLevel = levelManager.ExperienceToNextLevel;
            }
            else {
                var experienceChange = experience - _this._lastExperience;
                ;
                if (levelManager.Level !== _this._lastLevel) {
                    experienceChange += _this._lastExperienceToNextLevel;
                    _this._lastLevel = levelManager.Level;
                }
                if (experienceChange < 0) {
                    _this.Status(experienceChange.toString() + " xp", ShipStatusTextGraphic.EXPERIENCE_DECREASE_SIZE, ShipStatusTextGraphic.EXPERIENCE_CHANGE_COLOR, ShipStatusTextGraphic.EXPERIENCE_FADE_DURATION, true);
                }
                else {
                    _this.Status("+" + experienceChange.toString() + " xp", ShipStatusTextGraphic.EXPERIENCE_INCREASE_SIZE, ShipStatusTextGraphic.EXPERIENCE_CHANGE_COLOR, ShipStatusTextGraphic.EXPERIENCE_FADE_DURATION, true);
                }
                _this._lastExperience = experience;
                _this._lastExperienceToNextLevel = levelManager.ExperienceToNextLevel;
            }
        });
        return _this;
    }
    ShipStatusTextGraphic.prototype.Status = function (text, size, color, fadeDuration, reverseDirection) {
        var _this = this;
        var status = new _StatusText__WEBPACK_IMPORTED_MODULE_1__["StatusText"](text, size, color, fadeDuration, reverseDirection), id = this._statusIds++;
        status.OnDisposed.Bind(function (status) {
            status.Dispose();
            delete _this._statuses[id];
        });
        this._statuses[id] = status;
        this.AddChild(status);
    };
    ShipStatusTextGraphic.prototype.Update = function (gameTime) {
        for (var id in this._statuses) {
            this._statuses[id].Update(gameTime);
        }
    };
    ShipStatusTextGraphic.prototype.Dispose = function () {
    };
    ShipStatusTextGraphic.HEALTH_INCREASE_COLOR = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.FromRGB(122, 201, 67);
    ShipStatusTextGraphic.HEALTH_DECREASE_COLOR = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.FromRGB(237, 30, 121);
    ShipStatusTextGraphic.EXPERIENCE_CHANGE_COLOR = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.FromRGB(250, 182, 250);
    ShipStatusTextGraphic.HEALTH_INCREASE_SIZE = 40;
    ShipStatusTextGraphic.HEALTH_DECREASE_SIZE = 30;
    ShipStatusTextGraphic.EXPERIENCE_INCREASE_SIZE = 40;
    ShipStatusTextGraphic.EXPERIENCE_DECREASE_SIZE = 40;
    ShipStatusTextGraphic.EXPERIENCE_FADE_DURATION = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromSeconds(3);
    ShipStatusTextGraphic._statusRemoval = function (id, statuses) {
        statuses[id].Dispose();
        delete statuses[id];
    };
    return ShipStatusTextGraphic;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Circle));



/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusText", function() { return StatusText; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var StatusText = /** @class */ (function (_super) {
    __extends(StatusText, _super);
    function StatusText(text, size, color, fadeDuration, reverseDirection) {
        if (fadeDuration === void 0) { fadeDuration = StatusText.DEFAULT_FADE_DURATION; }
        if (reverseDirection === void 0) { reverseDirection = false; }
        var _this = _super.call(this, 0, 0, text, color) || this;
        var directionMultipler = reverseDirection ? -1 : 1;
        _this.FontSettings.FontSize = size + "px";
        _this.FontSettings.FontFamily = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].FontFamily.Verdana;
        _this.FontSettings.FontWeight = "bold";
        _this._movementTween = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Tweening"].Vector2dTween(_this.Position, new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](directionMultipler * _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Particles"].Range.RandomNumber(StatusText.MOVE_X_RANGE), directionMultipler * _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Particles"].Range.RandomNumber(StatusText.MOVE_Y_RANGE)), fadeDuration, _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TweeningFunctions"].Cubic.EaseOut);
        _this._fadeTween = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Tweening"].NumberTween(100, 0, fadeDuration, _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TweeningFunctions"].Cubic.EaseOut);
        _this._active = false;
        _this._movementTween.OnChange.Bind(function (newPosition) {
            _this.Position = newPosition;
        });
        _this._fadeTween.OnChange.Bind(function (fade) {
            _this.Opacity = fade / 100;
        });
        _this._movementTween.OnComplete.Bind(function (movementTween) {
            _this.Dispose();
        });
        _this._movementTween.Play();
        _this._fadeTween.Play();
        return _this;
    }
    StatusText.prototype.Update = function (gameTime) {
        this._movementTween.Update(gameTime);
        this._fadeTween.Update(gameTime);
    };
    StatusText.prototype.Dispose = function () {
        if (!this._active) {
            this._active = true;
            this._movementTween.Dispose();
            this._fadeTween.Dispose();
            _super.prototype.Dispose.call(this);
        }
    };
    StatusText.MOVE_Y_RANGE = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Particles"].Range(-50, -200);
    StatusText.MOVE_X_RANGE = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Particles"].Range(-50, 50);
    StatusText.DEFAULT_FADE_DURATION = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromSeconds(1);
    return StatusText;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Text2d));



/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipNameGraphic", function() { return ShipNameGraphic; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(55);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var ShipNameGraphic = /** @class */ (function (_super) {
    __extends(ShipNameGraphic, _super);
    function ShipNameGraphic(name) {
        var _this = _super.call(this, 0, _Ship__WEBPACK_IMPORTED_MODULE_1__["Ship"].SIZE.HalfHeight + ShipNameGraphic.Y_OFFSET, name, ShipNameGraphic.NAME_COLOR) || this;
        _this.FontSettings.FontSize = ShipNameGraphic.FONT_SIZE;
        _this.FontSettings.FontFamily = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].FontFamily.Arial;
        _this.FontSettings.FontWeight = "bold";
        return _this;
    }
    ShipNameGraphic.FONT_SIZE = "15px";
    ShipNameGraphic.Y_OFFSET = 33;
    ShipNameGraphic.NAME_COLOR = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.White;
    return ShipNameGraphic;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Text2d));



/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipMovementController", function() { return ShipMovementController; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _ShipInterpolationManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var ShipMovementController = /** @class */ (function (_super) {
    __extends(ShipMovementController, _super);
    function ShipMovementController(movables) {
        var _this = _super.call(this, movables) || this;
        _this._trackedMoveables = movables;
        _this.Mass = ShipMovementController.MASS;
        _this.Power = ShipMovementController.ENGINE_POWER;
        _this.Forces = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero;
        _this.Controllable = true;
        _this._acceleration = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero;
        _this.UserControlled = true;
        _this.Moving = {
            Forward: false,
            Backward: false,
            RotatingLeft: false,
            RotatingRight: false
        };
        _this._interpolationManager = new _ShipInterpolationManager__WEBPACK_IMPORTED_MODULE_1__["ShipInterpolationManager"](_this);
        _this.OnMove = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["EventHandler1"]();
        return _this;
    }
    ShipMovementController.prototype.LoadPayload = function (payload, forceMovement) {
        if (!forceMovement) {
            this._interpolationManager.LoadPayload(payload);
        }
        else {
            this.Position = payload.Position;
            this.Rotation = payload.Rotation;
        }
        if (!this.UserControlled || forceMovement) {
            this.Mass = payload.Mass;
            this.Forces = payload.Forces;
            this.Velocity = payload.Velocity;
            this.Moving = payload.Moving;
        }
    };
    ShipMovementController.prototype.IsMovingInDirection = function (direction) {
        // @ts-ignore
        return this.Moving[direction] || false;
    };
    ShipMovementController.prototype.StartMoving = function (direction) {
        this.Move(direction, true);
    };
    ShipMovementController.prototype.StopMoving = function (direction) {
        this.Move(direction, false);
    };
    ShipMovementController.prototype.StopAllMovement = function () {
        for (var i = ShipMovementController.MOVING_DIRECTIONS.length - 1; i >= 0; i--) {
            // @ts-ignore
            this.Moving[ShipMovementController.MOVING_DIRECTIONS[i]] = false;
        }
    };
    ShipMovementController.prototype.ApplyForce = function (force) {
        this.Forces = this.Forces.Add(force);
    };
    ShipMovementController.prototype.Update = function (gameTime) {
        var rotationIncrementor, direction = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](Math.cos(this.Rotation), Math.sin(this.Rotation)), dragForce, velocityLength;
        this._interpolationManager.Update(gameTime);
        if (!this._interpolationManager.Interpolating) {
            this._acceleration = this.Forces.Divide(this.Mass);
            this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.Elapsed.Seconds).Add(this._acceleration.Multiply(gameTime.Elapsed.Seconds * gameTime.Elapsed.Seconds)));
            this.Velocity = this.Velocity.Add(this._acceleration.Multiply(gameTime.Elapsed.Seconds));
            velocityLength = this.Velocity.Length();
            // Stop moving if the "speed" is less than 10
            if (velocityLength < 10) {
                this.Velocity = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero;
            }
            else if (velocityLength > 3000) // Hack
             {
                this.Velocity = direction.Multiply(600);
            }
            this._acceleration = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero;
            this.Forces = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero;
            dragForce = this.Velocity.Multiply(.5).Multiply(this.Velocity.Abs()).Multiply(ShipMovementController.DRAG_COEFFICIENT * ShipMovementController.DRAG_AREA * -1);
            if (this.Moving.Forward) {
                this.ApplyForce(direction.Multiply(this.Power));
            }
            if (this.Moving.Backward) {
                this.ApplyForce(direction.Multiply(this.Power * -1));
            }
            this.ApplyForce(dragForce);
            rotationIncrementor = gameTime.Elapsed.Seconds * ShipMovementController.ROTATE_SPEED;
            if (this.Moving.RotatingLeft) {
                this.Rotation -= rotationIncrementor;
            }
            if (this.Moving.RotatingRight) {
                this.Rotation += rotationIncrementor;
            }
        }
        for (var i = 0; i < this._trackedMoveables.length; i++) {
            this._trackedMoveables[i].Position = this.Position;
        }
    };
    ShipMovementController.prototype.Move = function (direction, startMoving) {
        if (this.Controllable) {
            // @ts-ignore
            if (typeof this.Moving[direction] !== "undefined") {
                // @ts-ignore
                this.Moving[direction] = startMoving;
                this.OnMove.Trigger({
                    Direction: direction,
                    StartMoving: startMoving
                });
            }
            else {
                throw new Error(direction + " is an unknown direction.");
            }
        }
    };
    ShipMovementController.prototype.Dispose = function () {
        // Make all active functions no-op
        this.Update = function () { };
        this.LoadPayload = function () { };
    };
    ShipMovementController.MASS = 50;
    ShipMovementController.ENGINE_POWER = 110000;
    ShipMovementController.DRAG_AREA = 5;
    ShipMovementController.DRAG_COEFFICIENT = .2;
    ShipMovementController.ROTATE_SPEED = Math.PI;
    ShipMovementController.MOVING_DIRECTIONS = ["RotatingLeft", "RotatingRight", "Forward", "Backward"];
    return ShipMovementController;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["MovementControllers"].MovementController));



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipInterpolationManager", function() { return ShipInterpolationManager; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);


var ShipInterpolationManager = /** @class */ (function () {
    function ShipInterpolationManager(_movementController) {
        var _this = this;
        this._movementController = _movementController;
        if (_Game__WEBPACK_IMPORTED_MODULE_1__["Game"].GameConfiguration.gameConfig) {
            this._interpolationDuration = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromMilliseconds(_Game__WEBPACK_IMPORTED_MODULE_1__["Game"].GameConfiguration.gameConfig.DRAW_INTERVAL * 2);
        }
        else {
            this._interpolationDuration = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromMilliseconds(60);
        }
        this.Interpolating = false;
        this._positionInterpolation = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Tweening"].Vector2dTween(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero, _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero, this._interpolationDuration, _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TweeningFunctions"].Linear.EaseNone);
        this._rotationInterpolation = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Tweening"].NumberTween(0, 0, this._interpolationDuration, _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TweeningFunctions"].Linear.EaseNone);
        this._positionInterpolation.OnChange.Bind(function (newPosition) {
            _this._movementController.Position = newPosition;
        });
        this._rotationInterpolation.OnChange.Bind(function (newRotation) {
            _this._movementController.Rotation = newRotation;
        });
        this._rotationInterpolation.OnComplete.Bind(function (rotationTween) {
            _this.Interpolating = false;
            _this.Interpolate();
        });
        this._payloadBuffer = new Array();
    }
    ShipInterpolationManager.prototype.LoadPayload = function (payload) {
        if (!this._movementController.UserControlled) {
            this.BufferPayload(payload);
            this.Interpolate();
        }
    };
    ShipInterpolationManager.prototype.Update = function (gameTime) {
        this._positionInterpolation.Update(gameTime);
        this._rotationInterpolation.Update(gameTime);
    };
    ShipInterpolationManager.prototype.BufferPayload = function (payload) {
        if (this._payloadBuffer.length === ShipInterpolationManager.PAYLOAD_BUFFER) {
            this._payloadBuffer.pop();
        }
        this._payloadBuffer.push(payload);
    };
    ShipInterpolationManager.prototype.StartInterpolationPayload = function (payload) {
        if (!payload) {
            return;
        }
        this._positionInterpolation.From = this._movementController.Position;
        this._positionInterpolation.To = payload.Position;
        this._rotationInterpolation.From = this._movementController.Rotation;
        this._rotationInterpolation.To = payload.Rotation;
        // console.log("Interpolating " + this._positionInterpolation.From.Distance(this._positionInterpolation.To) + " pixels over " + this._positionInterpolation.Duration.Milliseconds + " ms.");
        // console.log("Interpolating " + Math.abs(this._rotationInterpolation.From - this._rotationInterpolation.To) * 57.2957795  + " degrees over " + this._rotationInterpolation.Duration.Milliseconds + " ms.");
        this._positionInterpolation.Restart();
        this._rotationInterpolation.Restart();
        this.Interpolating = true;
    };
    ShipInterpolationManager.prototype.Interpolate = function () {
        if (this._payloadBuffer.length > 0) {
            this.StartInterpolationPayload(this._payloadBuffer.shift());
        }
    };
    // Buffer X payloads
    ShipInterpolationManager.PAYLOAD_BUFFER = 2;
    return ShipInterpolationManager;
}());



/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipAbilityHandler", function() { return ShipAbilityHandler; });
/* harmony import */ var _AbilityHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68);
/* harmony import */ var _Boost__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(69);
/* harmony import */ var _Space_MapBoundary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(72);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var ShipAbilityHandler = /** @class */ (function (_super) {
    __extends(ShipAbilityHandler, _super);
    function ShipAbilityHandler(myShip) {
        var _this = this;
        var boost = new _Boost__WEBPACK_IMPORTED_MODULE_1__["Boost"](myShip.MovementController);
        _this = _super.call(this, [boost]) || this;
        _this.Boost = boost;
        myShip.OnCollision.Bind(function (data) {
            if (data.With instanceof _Space_MapBoundary__WEBPACK_IMPORTED_MODULE_2__["MapBoundary"]) {
                _this.Boost.Deactivate();
            }
        });
        return _this;
    }
    ShipAbilityHandler.prototype.LoadPayload = function (payload) {
        if (payload.Boost && !this.Boost.Active) {
            this.Boost.Activate();
        }
        else if (!payload.Boost) {
            this.Boost.Deactivate();
        }
    };
    return ShipAbilityHandler;
}(_AbilityHandler__WEBPACK_IMPORTED_MODULE_0__["AbilityHandler"]));



/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbilityHandler", function() { return AbilityHandler; });
var AbilityHandler = /** @class */ (function () {
    function AbilityHandler(aList) {
        this._abilityList = {};
        for (var i = aList.length - 1; i >= 0; i--) {
            this._abilityList[aList[i].Name] = aList[i];
        }
    }
    AbilityHandler.prototype.Abilities = function () {
        return this._abilityList;
    };
    AbilityHandler.prototype.Ability = function (abilityName) {
        return this._abilityList[abilityName];
    };
    AbilityHandler.prototype.AddAbility = function (ability) {
        this._abilityList[ability.Name] = ability;
    };
    AbilityHandler.prototype.Activate = function (abilityName) {
        if (this._abilityList[abilityName]) {
            this._abilityList[abilityName].Activate();
            return true;
        }
        return false;
    };
    AbilityHandler.prototype.Deactivate = function (abilityName) {
        if (this._abilityList[abilityName] && this._abilityList[abilityName].Active) {
            this._abilityList[abilityName].Deactivate();
            return true;
        }
        return false;
    };
    AbilityHandler.prototype.UpdateAbilities = function (aList) {
        for (var abilityName in aList) {
            var dataActive = aList[abilityName], myActive = this._abilityList[abilityName].Active;
            if (dataActive && !myActive) {
                this.Activate(abilityName);
            }
            else if (!dataActive && myActive) {
                this.Deactivate(abilityName);
            }
        }
    };
    AbilityHandler.prototype.Update = function (gameTime) {
        for (var key in this._abilityList) {
            this._abilityList[key].Update(gameTime);
        }
    };
    return AbilityHandler;
}());



/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Boost", function() { return Boost; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _MovementAbility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(70);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Boost = /** @class */ (function (_super) {
    __extends(Boost, _super);
    function Boost(_movementController) {
        var _this = _super.call(this, Boost.NAME, _movementController) || this;
        _this._movementController = _movementController;
        _this.OnStart = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["EventHandler"]();
        _this.OnStop = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["EventHandler"]();
        return _this;
    }
    Boost.prototype.Activate = function () {
        this._movementController.StopAllMovement();
        this._movementController.Moving.Forward = true;
        this._movementController.Controllable = false;
        if (!this.Active) {
            this.MultiplySpeedBy(Boost.SPEED_INCREASE);
            this.OnStart.Trigger();
        }
        _super.prototype.Activate.call(this);
    };
    Boost.prototype.Deactivate = function () {
        if (this.Active) {
            this.ResetSpeed();
            _super.prototype.Deactivate.call(this);
            this._movementController.Moving.Forward = false;
            this._movementController.Controllable = true;
            this.OnStop.Trigger();
        }
    };
    Boost.prototype.Update = function (gameTime) {
        if (this.Active && _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].DateSpan(this.ActivatedAt, gameTime.Now).Milliseconds >= Boost.DURATION.Milliseconds) {
            this.Deactivate();
        }
    };
    Boost.NAME = "Boost";
    Boost.SPEED_INCREASE = 3; // Updated by server configuration value
    Boost.DURATION = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromSeconds(3); // Updated by server configuration value
    return Boost;
}(_MovementAbility__WEBPACK_IMPORTED_MODULE_1__["MovementAbility"]));



/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MovementAbility", function() { return MovementAbility; });
/* harmony import */ var _Ability__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(71);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var MovementAbility = /** @class */ (function (_super) {
    __extends(MovementAbility, _super);
    function MovementAbility(name, MovementController) {
        var _this = _super.call(this, name) || this;
        _this.MovementController = MovementController;
        _this._initialPower = MovementController.Power;
        return _this;
    }
    MovementAbility.prototype.IncreaseSpeedBy = function (amount) {
        this.MovementController.Power += amount;
    };
    MovementAbility.prototype.MultiplySpeedBy = function (amount) {
        this.MovementController.Power *= amount;
    };
    MovementAbility.prototype.DecreaseSpeedBy = function (amount) {
        this.MovementController.Power -= amount;
    };
    MovementAbility.prototype.ResetSpeed = function () {
        this.MovementController.Power = this._initialPower;
    };
    return MovementAbility;
}(_Ability__WEBPACK_IMPORTED_MODULE_0__["Ability"]));



/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ability", function() { return Ability; });
var Ability = /** @class */ (function () {
    function Ability(Name) {
        this.Name = Name;
        this.Active = false;
        this.ActivatedAt = null;
    }
    Ability.prototype.Activate = function () {
        this.Active = true;
        this.ActivatedAt = new Date();
    };
    Ability.prototype.Deactivate = function () {
        this.Active = false;
        this.ActivatedAt = null;
    };
    // Meant to be overridden
    Ability.prototype.Update = function (gameTime) { };
    return Ability;
}());



/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapBoundary", function() { return MapBoundary; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _Space_Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73);
/* harmony import */ var _Ships_Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var MapBoundary = /** @class */ (function (_super) {
    __extends(MapBoundary, _super);
    function MapBoundary(from, to) {
        var _this = _super.call(this, new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Line2d(from.X, from.Y, to.X, to.Y, 1, MapBoundary.Color).GetDrawBounds()) || this;
        _this.Graphic = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Line2d(from.X, from.Y, to.X, to.Y, 1, MapBoundary.Color);
        _this.Graphic.LineWidth = MapBoundary.BoundaryWidth;
        // Left or right
        if (from.X - to.X === 0) {
            _this._bounceMultiplier = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](-_Space_Map__WEBPACK_IMPORTED_MODULE_1__["Map"].BARRIER_DEPRECATION, _Space_Map__WEBPACK_IMPORTED_MODULE_1__["Map"].BARRIER_DEPRECATION);
        }
        else { // Top or bottom
            _this._bounceMultiplier = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](_Space_Map__WEBPACK_IMPORTED_MODULE_1__["Map"].BARRIER_DEPRECATION, -_Space_Map__WEBPACK_IMPORTED_MODULE_1__["Map"].BARRIER_DEPRECATION);
        }
        return _this;
    }
    MapBoundary.prototype.Collided = function (data) {
        if (data.With instanceof _Ships_Ship__WEBPACK_IMPORTED_MODULE_2__["Ship"]) {
            this.HandleShipCollision(data.With);
        }
        // TODO: Add bullet
    };
    MapBoundary.prototype.Dispose = function () {
        _super.prototype.Dispose.call(this);
        this.Graphic.Dispose();
    };
    MapBoundary.prototype.HandleShipCollision = function (ship) {
        var bounceMultiplier;
        ship.MovementController.StopMoving("Forward");
        ship.MovementController.StopMoving("Backward");
        ship.AnimationHandler.StopAllAnimations();
        this.RepositionShipInBounds(ship);
        // Reverse velocity, aka bounce
        ship.MovementController.Forces = ship.MovementController.Forces.Multiply(this._bounceMultiplier);
        ship.MovementController.Velocity = ship.MovementController.Velocity.Multiply(this._bounceMultiplier);
    };
    // Ugly
    MapBoundary.prototype.RepositionShipInBounds = function (ship) {
        // Re-position to be in-bounds
        if (ship.MovementController.Position.X - _Ships_Ship__WEBPACK_IMPORTED_MODULE_2__["Ship"].SIZE.HalfWidth <= 1) {
            ship.MovementController.Position.X = _Ships_Ship__WEBPACK_IMPORTED_MODULE_2__["Ship"].SIZE.HalfWidth + 3;
        }
        else if (ship.MovementController.Position.X + _Ships_Ship__WEBPACK_IMPORTED_MODULE_2__["Ship"].SIZE.HalfWidth >= _Space_Map__WEBPACK_IMPORTED_MODULE_1__["Map"].SIZE.Width - 1) {
            ship.MovementController.Position.X = _Space_Map__WEBPACK_IMPORTED_MODULE_1__["Map"].SIZE.Width - _Ships_Ship__WEBPACK_IMPORTED_MODULE_2__["Ship"].SIZE.HalfWidth - 3;
        }
        if (ship.MovementController.Position.Y - _Ships_Ship__WEBPACK_IMPORTED_MODULE_2__["Ship"].SIZE.HalfHeight <= 1) {
            ship.MovementController.Position.Y = _Ships_Ship__WEBPACK_IMPORTED_MODULE_2__["Ship"].SIZE.HalfHeight + 3;
        }
        else if (ship.MovementController.Position.Y + _Ships_Ship__WEBPACK_IMPORTED_MODULE_2__["Ship"].SIZE.HalfHeight >= _Space_Map__WEBPACK_IMPORTED_MODULE_1__["Map"].SIZE.Height - 1) {
            ship.MovementController.Position.Y = _Space_Map__WEBPACK_IMPORTED_MODULE_1__["Map"].SIZE.Height - _Ships_Ship__WEBPACK_IMPORTED_MODULE_2__["Ship"].SIZE.HalfHeight - 3;
        }
    };
    MapBoundary.Color = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.FromHex("#3fa9f5");
    MapBoundary.BoundaryWidth = 5;
    return MapBoundary;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Collision"].Collidable));



/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return Map; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _MapBoundary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72);
/* harmony import */ var _AreaRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(74);



var Map = /** @class */ (function () {
    function Map(_scene, _collisionManager, _contentManager, _keyboard, serverAdapter) {
        var _this = this;
        this._scene = _scene;
        this._collisionManager = _collisionManager;
        this._contentManager = _contentManager;
        this._keyboard = _keyboard;
        this._boundaries = new Array();
        this._backgroundTiles = new Array();
        this.BuildBackground();
        this.BuildBoundaries();
        this.BuildAreas();
        serverAdapter.OnMapResize.Bind(function (newSize) {
            Map.SIZE = newSize;
            _this.BuildBackground();
            _this.BuildBoundaries();
            if (_this.AreaRenderer) {
                _this.AreaRenderer.OnMapResize(newSize);
            }
        });
    }
    Map.prototype.BuildBackground = function () {
        var _this = this;
        var source = this._contentManager.GetImage("StarBackground"), build = function () {
            // Add 2 to give a buffer on both sides of the map
            var tileCount = (Map.SIZE.Width / source.ClipSize.Width) + 2, templateTile = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Sprite2d(0, 0, source, source.ClipSize.Width, source.ClipSize.Height), tile;
            templateTile.ZIndex = -2;
            // Clean up any existing tiles so that we can create new ones (also used to resize the map).
            for (var i = 0; i < _this._backgroundTiles.length; i++) {
                _this._backgroundTiles[i].Dispose();
            }
            _this._backgroundTiles = new Array();
            for (var i = 0; i < tileCount; i++) {
                for (var j = 0; j < tileCount; j++) {
                    tile = templateTile.Clone();
                    tile.Position.X = j * source.ClipSize.Width - source.ClipSize.HalfWidth;
                    tile.Position.Y = i * source.ClipSize.Height - source.ClipSize.HalfHeight;
                    _this._scene.Add(tile);
                    _this._backgroundTiles.push(tile);
                }
            }
        };
        if (source.IsLoaded()) {
            build();
        }
        else {
            source.OnLoaded.Bind(build);
        }
    };
    Map.prototype.BuildBoundaries = function () {
        var corners = new Array(new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](0, 0), new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](Map.SIZE.Width, 0), new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](Map.SIZE.Width, Map.SIZE.Height), new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](0, Map.SIZE.Height)), boundary;
        for (var i = 0; i < this._boundaries.length; i++) {
            this._boundaries[i].Dispose();
        }
        this._boundaries = new Array();
        for (var i = 0; i < corners.length; i++) {
            boundary = new _MapBoundary__WEBPACK_IMPORTED_MODULE_1__["MapBoundary"](new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](corners[i].X, corners[i].Y), new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](corners[(i + 1) % corners.length].X, corners[(i + 1) % corners.length].Y));
            boundary.Graphic.ZIndex = -1;
            this._collisionManager.Monitor(boundary, true);
            this._scene.Add(boundary.Graphic);
            this._boundaries.push(boundary);
        }
    };
    Map.prototype.BuildAreas = function () {
        this.AreaRenderer = new _AreaRenderer__WEBPACK_IMPORTED_MODULE_2__["AreaRenderer"](this._scene, this._keyboard);
        this.AreaRenderer.OnMapResize(Map.SIZE);
    };
    return Map;
}());



/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AreaRenderer", function() { return AreaRenderer; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _Area__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(75);


var AreaRenderer = /** @class */ (function () {
    function AreaRenderer(_scene, keyboard) {
        var _this = this;
        this._scene = _scene;
        this._active = true;
        this._areas = new Array();
        this._areaSize = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"].Zero;
        this._mapSize = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"].Zero;
        keyboard.OnCommandPress(AreaRenderer.KEYBOARD_MAPPING, function () {
            _this._active = !_this._active;
            _this.UpdateVisible();
        });
        // IE is the only browser that can handle the performance, therefore this check sees if we're NOT an ie
        if (!(!!(navigator.userAgent.match(/Trident/) && !navigator.userAgent.match(/MSIE/)))) {
            this.Hide();
        }
    }
    AreaRenderer.prototype.OnMapResize = function (newSize) {
        this._mapSize = newSize;
        this._areaSize = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"](Math.max(Math.round(newSize.Width / AreaRenderer.AREA_LETTERS.length), 1000));
        // On every map resize we need to rebuild the sectors so that they fit within the map
        this.BuildSectors();
    };
    AreaRenderer.prototype.AreaFromPosition = function (position) {
        var letter = AreaRenderer.AREA_LETTERS[Math.max(Math.floor(position.X / this._areaSize.Width), 0)], sectorNumber = Math.max(Math.ceil(position.Y / this._areaSize.Height), 1);
        return letter + sectorNumber.toString();
    };
    AreaRenderer.prototype.Show = function () {
        this._active = true;
        this.UpdateVisible();
    };
    AreaRenderer.prototype.Hide = function () {
        this._active = false;
        this.UpdateVisible();
    };
    AreaRenderer.prototype.BuildSectors = function () {
        var gridCount = this._mapSize.Width / this._areaSize.Width, locationOffset = this._areaSize.HalfWidth, area;
        if (gridCount % 1 !== 0) {
            throw new Error("Area size does not divide evenly into the map size.");
        }
        // Remove any existing areas so we can build new
        for (var i = 0; i < this._areas.length; i++) {
            this._areas[i].Dispose();
        }
        this._areas = new Array();
        for (var i = 0; i < gridCount; i++) {
            for (var j = 0; j < gridCount; j++) {
                area = new _Area__WEBPACK_IMPORTED_MODULE_1__["Area"](locationOffset + this._areaSize.Width * j, locationOffset + this._areaSize.Width * i, this._areaSize.Width, AreaRenderer.AREA_LETTERS[j] + (i + 1));
                area.ZIndex = -1;
                this._areas.push(area);
                this._scene.Add(area);
            }
        }
        this.UpdateVisible();
    };
    AreaRenderer.prototype.UpdateVisible = function () {
        for (var i = 0; i < this._areas.length; i++) {
            this._areas[i].Visible = this._active;
        }
    };
    AreaRenderer.AREA_BOX_COLOR = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.FromHex("#304665");
    AreaRenderer.AREA_TEXT_COLOR = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.FromHex("#3fa9f5");
    AreaRenderer.AREA_TEXT_MARGE = 17;
    AreaRenderer.KEYBOARD_MAPPING = "m";
    AreaRenderer.AREA_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    return AreaRenderer;
}());



/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Area", function() { return Area; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Area = /** @class */ (function (_super) {
    __extends(Area, _super);
    function Area(x, y, size, _area) {
        var _this = _super.call(this, x, y, size, size, _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.Transparent) || this;
        _this._area = _area;
        _this.Border(2, Area.BOX_COLOR);
        _this.BuildTextCorners();
        return _this;
    }
    Area.prototype.BuildTextCorners = function () {
        var locationOffset = this.Size.HalfWidth - Area.TEXT_MARGIN, text;
        text = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Text2d(-locationOffset, -locationOffset, this._area, Area.TEXT_COLOR);
        text.Align = "left";
        text.FontSettings.FontSize = "18px";
        text.FontSettings.FontFamily = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].FontFamily.Calibri;
        this.AddChild(text);
        text = text.Clone();
        text.Position = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](-locationOffset, +locationOffset);
        this.AddChild(text);
        text = text.Clone();
        text.Align = "right";
        text.Position = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](locationOffset, -locationOffset);
        this.AddChild(text);
        text = text.Clone();
        text.Position = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](locationOffset, locationOffset);
        this.AddChild(text);
    };
    Area.BOX_COLOR = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.FromHex("#304665");
    Area.TEXT_COLOR = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.FromHex("#3fa9f5");
    Area.TEXT_MARGIN = 20;
    return Area;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Rectangle));



/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipAnimationHandler", function() { return ShipAnimationHandler; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _ShipThrustAnimation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(77);
/* harmony import */ var _ShipBoostAnimation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(78);
/* harmony import */ var _ShipDeathAnimation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(80);




var ShipAnimationHandler = /** @class */ (function () {
    function ShipAnimationHandler(_ship, _contentManager) {
        var _this = this;
        this._ship = _ship;
        this._contentManager = _contentManager;
        var thrustSpriteSheet = this._contentManager.GetImage("Thrust"), thrustStartSpriteSheet = this._contentManager.GetImage("ThrustStart");
        this._thrustAnimation = new _ShipThrustAnimation__WEBPACK_IMPORTED_MODULE_1__["ShipThrustAnimation"](this._contentManager);
        this._boostAnimation = new _ShipBoostAnimation__WEBPACK_IMPORTED_MODULE_2__["ShipBoostAnimation"](this._contentManager);
        this._deathAnimation = new _ShipDeathAnimation__WEBPACK_IMPORTED_MODULE_3__["ShipDeathAnimation"](this._contentManager);
        this._ship.Graphic.AddChildToShip(this._thrustAnimation);
        this._ship.Graphic.AddChildToShip(this._boostAnimation);
        this._ship.Graphic.AddChild(this._deathAnimation);
        this._ship.AbilityHandler.Boost.OnStart.Bind(function () {
            _this._thrustAnimation.Stop();
            _this._boostAnimation.Play();
        });
        this._ship.AbilityHandler.Boost.OnStop.Bind(function () {
            _this._boostAnimation.Stop();
        });
        this._ship.OnExplosion.Bind(function () {
            _this._thrustAnimation.Visible = false;
            _this._boostAnimation.Visible = false;
            _this._ship.Graphic.HideShip();
            _this._deathAnimation.Play();
        });
        this._deathAnimation.OnComplete.Bind(function () {
            _this._ship.Dispose();
            _this._ship.Graphic.Dispose();
        });
    }
    ShipAnimationHandler.prototype.StopAllAnimations = function () {
        this._thrustAnimation.Stop();
        this._boostAnimation.Stop();
    };
    ShipAnimationHandler.prototype.Update = function (gameTime) {
        var thrustIsPlaying = this._thrustAnimation.IsPlaying();
        if (!thrustIsPlaying && this._ship.MovementController.IsMovingInDirection("Forward") && !this._ship.AbilityHandler.Boost.Active) {
            this._thrustAnimation.Play();
        }
        else if (thrustIsPlaying && !this._ship.MovementController.IsMovingInDirection("Forward")) {
            this._thrustAnimation.Stop();
        }
        this._thrustAnimation.Update(gameTime);
        this._boostAnimation.Update(gameTime);
        this._deathAnimation.Update(gameTime);
    };
    ShipAnimationHandler.FULL_THRUST_AFTER = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromMilliseconds(400);
    return ShipAnimationHandler;
}());



/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipThrustAnimation", function() { return ShipThrustAnimation; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(55);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var ShipThrustAnimation = /** @class */ (function (_super) {
    __extends(ShipThrustAnimation, _super);
    function ShipThrustAnimation(contentManager) {
        var _this = _super.call(this, -_Ship__WEBPACK_IMPORTED_MODULE_1__["Ship"].SIZE.HalfWidth - ShipThrustAnimation.FRAME_SIZE.HalfWidth, 0, contentManager.GetImage("ThrustStart"), ShipThrustAnimation.FRAME_SIZE.Width, ShipThrustAnimation.FRAME_SIZE.Height) || this;
        _this._thrustStartSpriteSheet = contentManager.GetImage("ThrustStart");
        _this._thrustSpriteSheet = contentManager.GetImage("Thrust");
        _this._thrustStartAnimator = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].SpriteAnimation(_this._thrustStartSpriteSheet, ShipThrustAnimation.FPS, ShipThrustAnimation.FRAME_SIZE, ShipThrustAnimation.FRAME_COUNT);
        _this._thrustAnimator = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].SpriteAnimation(_this._thrustSpriteSheet, ShipThrustAnimation.FPS, ShipThrustAnimation.FRAME_SIZE, ShipThrustAnimation.FRAME_COUNT);
        _this._thrustStartAnimator.OnComplete.Bind(function () {
            _this.Image = _this._thrustSpriteSheet;
            _this._thrustAnimator.Play(true);
        });
        _this.Visible = false;
        return _this;
    }
    ShipThrustAnimation.prototype.Play = function () {
        this.Image = this._thrustStartSpriteSheet;
        this._thrustStartAnimator.Play();
        this.Visible = true;
    };
    ShipThrustAnimation.prototype.IsPlaying = function () {
        return this._thrustAnimator.IsPlaying() || this._thrustStartAnimator.IsPlaying();
    };
    ShipThrustAnimation.prototype.Stop = function () {
        this._thrustStartAnimator.Stop();
        this._thrustAnimator.Stop();
        this.Visible = false;
    };
    ShipThrustAnimation.prototype.Update = function (gameTime) {
        this._thrustStartAnimator.Update(gameTime);
        this._thrustAnimator.Update(gameTime);
    };
    ShipThrustAnimation.FRAME_SIZE = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"](52, 50);
    ShipThrustAnimation.FRAME_COUNT = 18;
    ShipThrustAnimation.FPS = 18;
    return ShipThrustAnimation;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Sprite2d));



/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipBoostAnimation", function() { return ShipBoostAnimation; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _Common_Animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(79);
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var ShipBoostAnimation = /** @class */ (function (_super) {
    __extends(ShipBoostAnimation, _super);
    function ShipBoostAnimation(contentManager) {
        var _this = _super.call(this, new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](-_Ship__WEBPACK_IMPORTED_MODULE_2__["Ship"].SIZE.HalfWidth - ShipBoostAnimation.FRAME_SIZE.HalfWidth, -2), contentManager.GetImage("Boost"), ShipBoostAnimation.FPS, ShipBoostAnimation.FRAME_SIZE, ShipBoostAnimation.FRAME_COUNT) || this;
        _this.Visible = false;
        return _this;
    }
    ShipBoostAnimation.prototype.Play = function () {
        this.Visible = true;
        _super.prototype.Play.call(this, true);
    };
    ShipBoostAnimation.prototype.Stop = function () {
        this.Visible = false;
        _super.prototype.Stop.call(this);
    };
    ShipBoostAnimation.FRAME_SIZE = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"](102, 50);
    ShipBoostAnimation.FRAME_COUNT = 10;
    ShipBoostAnimation.FPS = 12;
    return ShipBoostAnimation;
}(_Common_Animation__WEBPACK_IMPORTED_MODULE_1__["Animation"]));



/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return Animation; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    function Animation(position, spriteSheet, fps, frameSize, frameCount) {
        var _this = _super.call(this, position.X, position.Y, spriteSheet, frameSize.Width, frameSize.Height) || this;
        _this._animator = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].SpriteAnimation(spriteSheet, fps, frameSize, frameCount);
        _this._animator.Step(1);
        return _this;
    }
    Object.defineProperty(Animation.prototype, "OnComplete", {
        get: function () {
            return this._animator.OnComplete;
        },
        enumerable: true,
        configurable: true
    });
    Animation.prototype.Play = function (repeat) {
        if (repeat === void 0) { repeat = false; }
        this._animator.Play(repeat);
    };
    Animation.prototype.Stop = function () {
        this._animator.Stop();
    };
    Animation.prototype.Update = function (gameTime) {
        this._animator.Update(gameTime);
    };
    return Animation;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Sprite2d));



/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipDeathAnimation", function() { return ShipDeathAnimation; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _Common_Animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(79);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var ShipDeathAnimation = /** @class */ (function (_super) {
    __extends(ShipDeathAnimation, _super);
    function ShipDeathAnimation(contentManager) {
        var _this = _super.call(this, _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero, contentManager.GetImage("ShipExplosion"), ShipDeathAnimation.FPS, ShipDeathAnimation.FRAME_SIZE, ShipDeathAnimation.FRAME_COUNT) || this;
        _this.Rotation = (Math.random() * (Math.PI * 100)) / 100;
        _this.Visible = false;
        return _this;
    }
    ShipDeathAnimation.prototype.Play = function () {
        this.Visible = true;
        _super.prototype.Play.call(this);
    };
    ShipDeathAnimation.FRAME_SIZE = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"](128, 128);
    ShipDeathAnimation.FRAME_COUNT = 30;
    ShipDeathAnimation.FPS = 25;
    return ShipDeathAnimation;
}(_Common_Animation__WEBPACK_IMPORTED_MODULE_1__["Animation"]));



/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipLevelManager", function() { return ShipLevelManager; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);

var ShipLevelManager = /** @class */ (function () {
    function ShipLevelManager(payload) {
        this.Level = payload.Level;
        this.Experience = 0;
        this.ExperienceToNextLevel = 1000000;
        this.OnLevelChange = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["EventHandler1"]();
        this.OnExperienceChange = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["EventHandler2"]();
    }
    ShipLevelManager.prototype.LoadPayload = function (payload) {
        if (payload.Level != this.Level) {
            this.Level = payload.Level;
            this.OnLevelChange.Trigger(this.Level);
        }
    };
    ShipLevelManager.prototype.UpdateExperience = function (experience, experienceToNextLevel) {
        if (experience !== this.Experience || experienceToNextLevel !== this.ExperienceToNextLevel) {
            this.Experience = experience;
            this.ExperienceToNextLevel = experienceToNextLevel;
            this.OnExperienceChange.Trigger(experience, experienceToNextLevel);
        }
    };
    return ShipLevelManager;
}());



/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipFireController", function() { return ShipFireController; });
var ShipFireController = /** @class */ (function () {
    function ShipFireController(keyboard, onFire) {
        var autoFireHandle, firedAt = 0, singleFireMode = true, lastShot = 0;
        keyboard.OnCommandDown(" ", function () {
            var timeSinceFired;
            firedAt = new Date().getTime();
            if (singleFireMode) {
                timeSinceFired = firedAt - lastShot;
                if (timeSinceFired > ShipFireController.MIN_FIRE_RATE.Milliseconds) {
                    lastShot = firedAt;
                    onFire("Fire");
                }
                autoFireHandle = setTimeout(function () {
                    singleFireMode = false;
                    onFire("StartFire");
                }, ShipFireController.MIN_FIRE_RATE.Milliseconds);
            }
            else {
                onFire("StartFire");
            }
        });
        keyboard.OnCommandUp(" ", function () {
            var timeFireReleased;
            clearTimeout(autoFireHandle);
            timeFireReleased = new Date().getTime();
            if (!singleFireMode) {
                lastShot = timeFireReleased;
                onFire("StopFire");
            }
            singleFireMode = timeFireReleased - firedAt < ShipFireController.MIN_FIRE_RATE.Milliseconds;
        });
    }
    return ShipFireController;
}());



/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameScreen", function() { return GameScreen; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _Utilities_UtilityFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(84);


var GameScreen = /** @class */ (function () {
    function GameScreen(_gameCanvas, _popUpHolder, _serverAdapter) {
        var _this = this;
        this._gameCanvas = _gameCanvas;
        this._popUpHolder = _popUpHolder;
        this._serverAdapter = _serverAdapter;
        this._gameHUDHeight = $("#gameHUD").height();
        this.Viewport = this.UpdateViewport();
        this.OnResize = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["EventHandler1"]();
        this.OnResizeComplete = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["EventHandler"]();
        $(window).resize(function () {
            // Wait till window has officially finished resizing (wait a quarter second).
            Object(_Utilities_UtilityFunctions__WEBPACK_IMPORTED_MODULE_1__["delay"])(function () {
                _this.ScreenResizeEvent();
            }, 250);
        });
        this.ForceResizeCheck();
    }
    GameScreen.prototype.ForceResizeCheck = function () {
        this.ScreenResizeEvent();
    };
    GameScreen.prototype.UpdateGameCanvas = function () {
        this._gameCanvas.attr("width", this.Viewport.Width);
        this._gameCanvas.attr("height", this.Viewport.Height);
        if (this._popUpHolder) {
            this._popUpHolder.css("width", this.Viewport.Width);
            this._popUpHolder.css("height", this.Viewport.Height);
        }
    };
    GameScreen.prototype.UpdateScreen = function () {
        this.Viewport = this.UpdateViewport();
        this.UpdateGameCanvas();
        this.SendNewViewportToServer();
        this.OnResize.Trigger(this.Viewport);
    };
    GameScreen.prototype.ScreenResizeEvent = function () {
        var _this = this;
        this.UpdateScreen();
        setTimeout(function () {
            _this.UpdateScreen();
            _this.OnResizeComplete.Trigger();
        }, 1500); // Re-calculate in-case there were scrollbars
    };
    GameScreen.prototype.UpdateViewport = function () {
        return new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"](Math.max(Math.min($(window).width(), GameScreen.MAX_SCREEN_WIDTH), GameScreen.MIN_SCREEN_WIDTH), Math.max(Math.min($(window).height() - this._gameHUDHeight, GameScreen.MAX_SCREEN_HEIGHT), GameScreen.MIN_SCREEN_HEIGHT));
    };
    GameScreen.prototype.SendNewViewportToServer = function () {
        this._serverAdapter.Connection.invoke("changeViewport", this.Viewport.Width, this.Viewport.Height);
    };
    // Initially set to really high, this will be changed by the configuration
    GameScreen.MAX_SCREEN_WIDTH = 10000;
    GameScreen.MAX_SCREEN_HEIGHT = 10000;
    GameScreen.MIN_SCREEN_WIDTH = -1;
    GameScreen.MIN_SCREEN_HEIGHT = -1;
    GameScreen.SCREEN_BUFFER_AREA = 200;
    return GameScreen;
}());



/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StandardDeviation", function() { return StandardDeviation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Average", function() { return Average; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return delay; });
function StandardDeviation(arr) {
    var average = Average(arr), sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += Math.pow(arr[i] - average, 2);
    }
    return Math.sqrt(sum / (arr.length - 1));
}
function Average(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}
var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();
jQuery.fn.flash = function (color, duration) {
    this.stop(true);
    var current = this.css('backgroundColor');
    this.animate({ backgroundColor: 'rgb(' + color + ')' }, duration / 2)
        .animate({ backgroundColor: current }, duration / 2);
};


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bullet", function() { return Bullet; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _BulletGraphic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(86);
/* harmony import */ var _BulletMovementController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(87);
/* harmony import */ var _Animations_BulletAnimationHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(88);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet(payload, contentManager) {
        var _this = _super.call(this) || this;
        // Going to use the rectangle to "hold" all the other graphics
        _this.Graphic = new _BulletGraphic__WEBPACK_IMPORTED_MODULE_1__["BulletGraphic"](payload.MovementController.Position, Bullet.SIZE, contentManager);
        _this.ID = -1;
        _this.Bounds = _this.Graphic.GetDrawBounds();
        _this.OnExplosion = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["EventHandler"]();
        _this.MovementController = new _BulletMovementController__WEBPACK_IMPORTED_MODULE_2__["BulletMovementController"](new Array(_this.Bounds, _this.Graphic), payload.MovementController);
        _this.AnimationHandler = new _Animations_BulletAnimationHandler__WEBPACK_IMPORTED_MODULE_3__["BulletAnimationHandler"](_this, contentManager);
        _this._spawnedAt = new Date().getTime();
        _this._destroyed = false;
        _this.LoadPayload(payload);
        return _this;
    }
    Bullet.prototype.Update = function (gameTime) {
        this.MovementController.Update(gameTime);
        this.AnimationHandler.Update(gameTime);
        // Bullets been alive too long
        if ((new Date().getTime() - this._spawnedAt) >= Bullet.BULLET_DIE_AFTER.Milliseconds) {
            this.Destroy(false);
        }
    };
    Bullet.prototype.LoadPayload = function (payload) {
        this.ID = payload.ID;
        this.MovementController.LoadPayload(payload.MovementController);
        // Ensure that our position matches the movement controllers position
        this.Bounds.Position = this.Graphic.Position = this.MovementController.Position;
    };
    Bullet.prototype.Destroy = function (explode) {
        if (explode === void 0) { explode = true; }
        if (!this._destroyed) {
            this._destroyed = true;
            this.MovementController.Dispose();
            if (!explode) {
                this.Graphic.Dispose();
                this.Dispose();
            }
            else {
                // We rely on the completion of the explosion to finish disposing the bounds and graphic
                this.OnExplosion.Trigger();
            }
        }
    };
    Bullet.SIZE = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"](13);
    Bullet.BULLET_DIE_AFTER = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromSeconds(2);
    return Bullet;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Collision"].Collidable));



/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BulletGraphic", function() { return BulletGraphic; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var BulletGraphic = /** @class */ (function (_super) {
    __extends(BulletGraphic, _super);
    function BulletGraphic(position, size, contentManager) {
        var _this = 
        // The Graphic color is transparent because all graphics that represent a ship will be added as a child.
        _super.call(this, position.X, position.Y, size.Width, size.Height, _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.Transparent) || this;
        _this._bulletBody = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Sprite2d(0, 0, contentManager.GetImage("Bullet"));
        _this.AddChild(_this._bulletBody);
        return _this;
    }
    BulletGraphic.prototype.HideBullet = function () {
        this._bulletBody.Visible = false;
    };
    return BulletGraphic;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Rectangle));



/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BulletMovementController", function() { return BulletMovementController; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var BulletMovementController = /** @class */ (function (_super) {
    __extends(BulletMovementController, _super);
    function BulletMovementController(movables, payload) {
        var _this = _super.call(this, movables) || this;
        _this.LoadPayload(payload);
        return _this;
    }
    BulletMovementController.prototype.LoadPayload = function (payload) {
        this.Position = payload.Position;
        this.Velocity = payload.Velocity;
    };
    BulletMovementController.prototype.Update = function (gameTime) {
        this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.Elapsed.Seconds));
        _super.prototype.Update.call(this, gameTime);
    };
    BulletMovementController.prototype.Dispose = function () {
        // Make all active functions no-op
        this.Update = function () { };
        this.LoadPayload = function () { };
    };
    return BulletMovementController;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["MovementControllers"].MovementController));



/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BulletAnimationHandler", function() { return BulletAnimationHandler; });
/* harmony import */ var _BulletExplosionAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(89);

var BulletAnimationHandler = /** @class */ (function () {
    function BulletAnimationHandler(_bullet, _contentManager) {
        var _this = this;
        this._bullet = _bullet;
        this._contentManager = _contentManager;
        this._explosionAnimation = new _BulletExplosionAnimation__WEBPACK_IMPORTED_MODULE_0__["BulletExplosionAnimation"](this._contentManager);
        this._explosionAnimation.OnComplete.Bind(function () {
            _this._bullet.Dispose();
            _this._bullet.Graphic.Dispose();
        });
        this._bullet.OnExplosion.Bind(function () {
            _this._bullet.Graphic.HideBullet();
            _this._explosionAnimation.Play();
        });
        this._bullet.Graphic.AddChild(this._explosionAnimation);
    }
    BulletAnimationHandler.prototype.Update = function (gameTime) {
        this._explosionAnimation.Update(gameTime);
    };
    return BulletAnimationHandler;
}());



/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BulletExplosionAnimation", function() { return BulletExplosionAnimation; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _Common_Animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(79);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var BulletExplosionAnimation = /** @class */ (function (_super) {
    __extends(BulletExplosionAnimation, _super);
    function BulletExplosionAnimation(contentManager) {
        var _this = _super.call(this, _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero, contentManager.GetImage("BulletExplosion"), BulletExplosionAnimation.FPS, BulletExplosionAnimation.FRAME_SIZE, BulletExplosionAnimation.FRAME_COUNT) || this;
        _this.Rotation = (Math.random() * (Math.PI * 100)) / 100;
        _this.Visible = false;
        return _this;
    }
    BulletExplosionAnimation.prototype.Play = function () {
        this.Visible = true;
        _super.prototype.Play.call(this);
    };
    BulletExplosionAnimation.FRAME_SIZE = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"](64, 64);
    BulletExplosionAnimation.FRAME_COUNT = 24;
    BulletExplosionAnimation.FPS = 24;
    return BulletExplosionAnimation;
}(_Common_Animation__WEBPACK_IMPORTED_MODULE_1__["Animation"]));



/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HealthPack", function() { return HealthPack; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _Powerup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(91);
/* harmony import */ var _Graphics_HealthPackGraphic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var HealthPack = /** @class */ (function (_super) {
    __extends(HealthPack, _super);
    function HealthPack(payload, contentManager) {
        var _this = _super.call(this, payload, new _Graphics_HealthPackGraphic__WEBPACK_IMPORTED_MODULE_2__["HealthPackGraphic"](payload.MovementController.Position, contentManager)) || this;
        _this._spawnedAt = new Date();
        return _this;
    }
    HealthPack.prototype.Update = function (gameTime) {
        if (_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].DateSpan(this._spawnedAt, gameTime.Now).Milliseconds >= HealthPack.LIFE_SPAN.Milliseconds) {
            this.Destroy();
            return;
        }
        this.Graphic.Update(gameTime);
    };
    HealthPack.SIZE = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"](50);
    HealthPack.LIFE_SPAN = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromSeconds(6);
    return HealthPack;
}(_Powerup__WEBPACK_IMPORTED_MODULE_1__["Powerup"]));



/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Powerup", function() { return Powerup; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Powerup = /** @class */ (function (_super) {
    __extends(Powerup, _super);
    function Powerup(payload, graphic) {
        var _this = _super.call(this, graphic.GetDrawBounds()) || this;
        _this.ID = payload.ID;
        _this.Graphic = graphic;
        _this._destroyed = false;
        return _this;
    }
    Powerup.prototype.LoadPayload = function (payload) {
        this.Bounds.Position = this.Graphic.Position = payload.MovementController.Position;
    };
    Powerup.prototype.Update = function (gameTime) {
    };
    Powerup.prototype.Destroy = function () {
        if (!this._destroyed) {
            this._destroyed = true;
            this.Dispose();
            this.Graphic.Dispose();
        }
    };
    return Powerup;
}(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Collision"].Collidable));



/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HealthPackGraphic", function() { return HealthPackGraphic; });
/* harmony import */ var _Common_Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(79);
/* harmony import */ var _HealthPack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(90);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var HealthPackGraphic = /** @class */ (function (_super) {
    __extends(HealthPackGraphic, _super);
    function HealthPackGraphic(position, contentManager) {
        var _this = _super.call(this, position, contentManager.GetImage("HealthPack"), HealthPackGraphic.FPS, _HealthPack__WEBPACK_IMPORTED_MODULE_1__["HealthPack"].SIZE, HealthPackGraphic.FRAME_COUNT) || this;
        _this.Play(true);
        return _this;
    }
    HealthPackGraphic.FRAME_COUNT = 18;
    HealthPackGraphic.FPS = 18;
    return HealthPackGraphic;
}(_Common_Animation__WEBPACK_IMPORTED_MODULE_0__["Animation"]));



/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeaderboardManager", function() { return LeaderboardManager; });
var LeaderboardManager = /** @class */ (function () {
    function LeaderboardManager(_myShipId, _keyboard, _serverAdapter) {
        var _this = this;
        this._myShipId = _myShipId;
        this._keyboard = _keyboard;
        this._serverAdapter = _serverAdapter;
        this._leaderboardHolder = $("#leaderboardHolder, #doublePopupHolder");
        this._leaderboard = $("#leaderboard");
        this._popUpHolder = $("#popUpHolder");
        this._gameCover = $("#GameCover");
        this._myRanking = $("#myRanking");
        this._leaderboardRows = [];
        this.LeaderboardUp = false;
        this.initializeLeaderboardRows();
        this.applyKeyboardShortcuts();
        this._serverAdapter.OnLeaderboardUpdate.Bind(function (leaderboardData) {
            _this.bindToLeaderboard(leaderboardData);
        });
    }
    LeaderboardManager.prototype.initializeLeaderboardRows = function () {
        var tempRow = $("#leaderboard .row");
        this._leaderboardRows.push(tempRow);
        for (var i = 0; i < LeaderboardManager.LEADERBOARD_SIZE - 1; i++) {
            var rowCopy = tempRow.clone();
            this._leaderboardRows.push(rowCopy);
            this._leaderboard.append(rowCopy);
        }
    };
    LeaderboardManager.prototype.bindToLeaderboard = function (data) {
        for (var i = 0; i < data.length; i++) {
            var row = $(this._leaderboardRows[i]);
            if (data[i].ID === this._myShipId) {
                if (data[i].Photo.length === 0) {
                    data[i].Photo = "Images/HUD/You_Default.png";
                }
                row.addClass("highlight");
            }
            else {
                row.removeClass("highlight");
            }
            // Bind photo separately becase it's bound to the src
            var photoEle = row.find(".lbPhoto");
            if (data[i].Photo.length === 0) {
                data[i].Photo = "Images/HUD/KilledBy_Default.png";
            }
            if (photoEle.attr("src") !== data[i].Photo) {
                photoEle.attr("src", data[i].Photo);
            }
            // Delete the photo and ID from the data because we don't want them to be bound with the rest of the data
            delete data[i].Photo;
            delete data[i].ID;
            for (var key in data[i]) {
                // @ts-ignore
                row.find(".lb" + key).html(data[i][key]);
            }
        }
    };
    // Create shortcuts
    LeaderboardManager.prototype.applyKeyboardShortcuts = function () {
        var _this = this;
        this._keyboard.OnCommandPress("l", function () {
            _this.toggleLeaderboard();
        });
        $("#GlobalRanking").click(function () {
            _this.toggleLeaderboard();
        });
    };
    LeaderboardManager.prototype.toggleLeaderboard = function () {
        if (!this.LeaderboardUp) {
            this.showLeaderboard();
        }
        else {
            this.hideLeaderboard();
        }
    };
    LeaderboardManager.prototype.showLeaderboard = function () {
        // Go left is turned on when the ship dies.  We want the Leaderboard to float along side the death
        // screen when we're in the "dead" state.
        if (!this._leaderboard.hasClass('goLeft')) {
            this.LeaderboardUp = true;
            this._leaderboardHolder.css("display", "block");
            this._popUpHolder.fadeIn(350);
            this._gameCover.fadeIn(350);
            this._serverAdapter.Connection.invoke("readyForLeaderboardPayloads");
        }
    };
    LeaderboardManager.prototype.hideLeaderboard = function () {
        var _this = this;
        if (!this._leaderboard.hasClass('goLeft')) {
            this.LeaderboardUp = false;
            this._popUpHolder.fadeOut(200, function () {
                _this._leaderboardHolder.css("display", "none");
            });
            this._gameCover.fadeOut(200);
            this._serverAdapter.Connection.invoke("stopLeaderboardPayloads");
        }
    };
    return LeaderboardManager;
}());



/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeathScreen", function() { return DeathScreen; });
var DeathScreen = /** @class */ (function () {
    function DeathScreen() {
        this._fadeIns = $("#HUDBarCover, #GameCover, #popUpHolder");
        this._respawnTime = $("#RespawnTime");
        this._killedByName = $("#KilledByNameSmall, #KilledByNameLarge");
        this._killedByPhoto = $("#KilledByPhotoSmall, #KilledByPhotoLarge");
        this._doublePopupHolder = $("#doublePopupHolder");
        this._popupWindows = $("#leaderboardHolder, #deathScreenHolder");
        this._topLineQuote = $("#topLineQuote");
        this._botLineQuote = $("#botLineQuote");
        this._randomQuotes = [
            ["HAS LEFT A DENT IN YOUR EGO.", "(HOPE NOBODY SAW THAT)"],
            ["JUST DOMINATED YOU.", "OUCH!"],
            ["SUCKS TO BE YOU!", ""],
            ["...", "REALLY?"],
            ["YOU ALRIGHT?", "THAT MUST HAVE HURT."],
            ["SAID TO TELL YOUR MOTHER", "HELLO!"],
            ["TIS BUT A SCRATCH", ""],
            ["BOOM...", "HEADSHOT!"],
            ["CAN'T LET YOU DO THAT STARFOX", ""],
            ["PLAYTIME IS OVER!", ""],
            ["YOU MISSED!", "YOU MAY NEED GLASSES"],
            ["YOU'RE GOOD...", "BUT I'M BETTER."],
            ["TOO SLOW...", "MY GRAMAH DRIVES FASTER THAN THAT!"],
            ["TOASTERS...", "BLAME THE TOASTERS!"],
            ["=(", ""]
        ];
    }
    DeathScreen.prototype.LoadPayload = function (payload) {
        if (payload.KilledByName) {
            this.YouDied(payload.KilledByName, payload.KilledByPhoto);
        }
    };
    DeathScreen.prototype.YouDied = function (by, byPhoto) {
        var _this = this;
        var quote = Math.floor(Math.random() * this._randomQuotes.length);
        this._topLineQuote[0].innerHTML = this._randomQuotes[quote][0];
        this._botLineQuote[0].innerHTML = this._randomQuotes[quote][1];
        this._killedByName.text(by);
        this._killedByPhoto.attr("src", byPhoto);
        this._popupWindows.css("display", "block");
        this._doublePopupHolder.css("display", "block");
        this._popupWindows.addClass("goLeft");
        this._fadeIns.fadeIn(1000);
        this._respawnTime[0].innerHTML = DeathScreen.RESPAWN_TIMER.Seconds.toString();
        var interval = setInterval(function () {
            var left = parseInt(_this._respawnTime[0].innerHTML) - 1;
            _this._respawnTime[0].innerHTML = left.toString();
            if (left === 0) {
                clearInterval(interval);
                _this._fadeIns.fadeOut(1000, function () {
                    _this._popupWindows.css("display", "none");
                    _this._doublePopupHolder.css("display", "none");
                    _this._popupWindows.removeClass("goLeft");
                });
            }
        }, 1000);
    };
    return DeathScreen;
}());



/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LatencyResolver", function() { return LatencyResolver; });
/* harmony import */ var _Utilities_UtilityFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84);

var LatencyResolver = /** @class */ (function () {
    function LatencyResolver(serverAdapter) {
        var _this = this;
        this._tryCount = 0;
        this._requestedAt = null;
        this._pingData = new Array();
        this.Latency = "...";
        serverAdapter.OnPingRequest.Bind(function () {
            if (_this._requestedAt) {
                _this.AddData(new Date().getTime() - _this._requestedAt.getTime());
                _this._requestedAt = null;
            }
        });
    }
    LatencyResolver.prototype.TryRequestPing = function () {
        if (++this._tryCount % LatencyResolver.REQUEST_PING_EVERY === 0) {
            this._requestedAt = new Date();
            return true;
        }
        return false;
    };
    LatencyResolver.prototype.AddData = function (timeElapsed) {
        if (this._pingData.length === LatencyResolver.PING_DATA_POINTS) {
            this._pingData.shift();
        }
        this._pingData.push(timeElapsed);
        this.UpdateLatency();
    };
    LatencyResolver.prototype.UpdateLatency = function () {
        var validItemCount = 0, totalValue = 0, standardDeviation = Object(_Utilities_UtilityFunctions__WEBPACK_IMPORTED_MODULE_0__["StandardDeviation"])(this._pingData), baseAverage = Object(_Utilities_UtilityFunctions__WEBPACK_IMPORTED_MODULE_0__["Average"])(this._pingData);
        for (var i = 0; i < this._pingData.length; i++) {
            if (Math.abs(this._pingData[i] - baseAverage) <= standardDeviation) {
                validItemCount++;
                totalValue += this._pingData[i];
            }
        }
        if (validItemCount > 0) {
            this.Latency = Math.round(totalValue / validItemCount).toString() + "ms";
        }
    };
    LatencyResolver.REQUEST_PING_EVERY = 5;
    LatencyResolver.PING_DATA_POINTS = 100;
    return LatencyResolver;
}());



/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipManager", function() { return ShipManager; });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55);

var ShipManager = /** @class */ (function () {
    function ShipManager(_viewport, _scene, _collisionManager, _contentManager) {
        this._viewport = _viewport;
        this._scene = _scene;
        this._collisionManager = _collisionManager;
        this._contentManager = _contentManager;
        this._ships = {};
    }
    ShipManager.prototype.Initialize = function (userShipManager) {
        this.UserShipManager = userShipManager;
    };
    ShipManager.prototype.UpdateViewport = function (viewport) {
        this._viewport.Size = viewport;
    };
    ShipManager.prototype.GetShip = function (id) {
        return this._ships[id];
    };
    ShipManager.prototype.RemoveShip = function (shipID) {
        delete this._ships[shipID];
    };
    ShipManager.prototype.LoadPayload = function (payload) {
        var _this = this;
        var shipPayload = payload.Ships, ship;
        for (var i = 0; i < shipPayload.length; i++) {
            ship = shipPayload[i];
            if (!this._ships[ship.ID]) {
                if (this.UserShipManager && ship.ID === this.UserShipManager.ControlledShipId) {
                    ship.UserControlled = true;
                }
                else {
                    ship.UserControlled = false;
                }
                this._ships[ship.ID] = new _Ship__WEBPACK_IMPORTED_MODULE_0__["Ship"](ship, this._contentManager);
                this._collisionManager.Monitor(this._ships[ship.ID]);
                this._scene.Add(this._ships[ship.ID].Graphic);
                this._ships[ship.ID].OnDisposed.Bind(function (ship) {
                    delete _this._ships[ship.ID];
                });
            }
            else {
                this._ships[ship.ID].LoadPayload(ship);
            }
            if (ship.Disposed) {
                this._ships[ship.ID].Destroy(!ship.LifeController.Alive);
            }
        }
        if (this.UserShipManager) {
            this.UserShipManager.LoadPayload(payload);
        }
    };
    ShipManager.prototype.Update = function (gameTime) {
        // Update positions first
        for (var id in this._ships) {
            this._ships[id].Update(gameTime);
        }
        if (this.UserShipManager) {
            this.UserShipManager.Update(gameTime);
        }
        // Check for "in-bounds" to see what ships we should destroy
        for (var id in this._ships) {
            if (!this._ships[id].Bounds.IntersectsRectangle(this._viewport)) {
                this._ships[id].Destroy();
            }
        }
    };
    return ShipManager;
}());



/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BulletManager", function() { return BulletManager; });
/* harmony import */ var _Bullet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85);

var BulletManager = /** @class */ (function () {
    function BulletManager(_viewport, _scene, _contentManager) {
        this._viewport = _viewport;
        this._scene = _scene;
        this._contentManager = _contentManager;
        this._bullets = {};
    }
    BulletManager.prototype.UpdateViewport = function (viewport) {
        this._viewport.Size = viewport;
    };
    BulletManager.prototype.LoadPayload = function (payload) {
        var _this = this;
        var bulletPayload = payload.Bullets, bullet;
        for (var i = 0; i < bulletPayload.length; i++) {
            bullet = bulletPayload[i];
            if (!this._bullets[bullet.ID]) {
                this._bullets[bullet.ID] = new _Bullet__WEBPACK_IMPORTED_MODULE_0__["Bullet"](bullet, this._contentManager);
                this._scene.Add(this._bullets[bullet.ID].Graphic);
                this._bullets[bullet.ID].OnDisposed.Bind(function (bullet) {
                    delete _this._bullets[bullet.ID];
                });
            }
            else {
                this._bullets[bullet.ID].LoadPayload(bullet);
            }
            if (bullet.Disposed) {
                if (bullet.Collided) {
                    this._bullets[bullet.ID].MovementController.Position = bullet.CollidedAt;
                }
                this._bullets[bullet.ID].Destroy(bullet.Collided);
            }
        }
    };
    BulletManager.prototype.Update = function (gameTime) {
        // Update positions first
        for (var id in this._bullets) {
            this._bullets[id].Update(gameTime);
        }
        // Update positions first
        for (var id in this._bullets) {
            // Check for "in-bounds" to see what bullets we should destroy
            if (!this._bullets[id].Bounds.IntersectsRectangle(this._viewport)) {
                this._bullets[id].Destroy(false);
            }
        }
    };
    return BulletManager;
}());



/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PowerupManager", function() { return PowerupManager; });
/* harmony import */ var _HealthPack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(90);

var PowerupManager = /** @class */ (function () {
    function PowerupManager(_viewport, _scene, _contentManager) {
        this._viewport = _viewport;
        this._scene = _scene;
        this._contentManager = _contentManager;
        this._powerups = {};
    }
    PowerupManager.prototype.LoadPayload = function (payload) {
        var _this = this;
        var powerupPayload = payload.Powerups, powerup;
        for (var i = 0; i < powerupPayload.length; i++) {
            powerup = powerupPayload[i];
            if (!this._powerups[powerup.ID]) {
                if (powerup.Type === 1) {
                    this._powerups[powerup.ID] = new _HealthPack__WEBPACK_IMPORTED_MODULE_0__["HealthPack"](powerup, this._contentManager);
                }
                this._scene.Add(this._powerups[powerup.ID].Graphic);
                this._powerups[powerup.ID].OnDisposed.Bind(function (powerup) {
                    delete _this._powerups[powerup.ID];
                });
            }
            else {
                this._powerups[powerup.ID].LoadPayload(powerup);
            }
            if (powerup.Disposed) {
                this._powerups[powerup.ID].Destroy();
            }
        }
    };
    PowerupManager.prototype.Update = function (gameTime) {
        // Update positions first
        for (var id in this._powerups) {
            this._powerups[id].Update(gameTime);
        }
        // Update positions first
        for (var id in this._powerups) {
            // Check for "in-bounds" to see what powerups we should destroy
            if (!this._powerups[id].Bounds.IntersectsRectangle(this._viewport)) {
                this._powerups[id].Destroy();
            }
        }
    };
    return PowerupManager;
}());



/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DebugManager", function() { return DebugManager; });
/* harmony import */ var _ServerGhost__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(100);
/* harmony import */ var _GameInformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(101);
/* harmony import */ var _UpdateRate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(102);
/* harmony import */ var _DrawRate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(104);
/* harmony import */ var _PayloadRate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(105);
/* harmony import */ var _ConnectionMonitor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(106);






var DebugManager = /** @class */ (function () {
    function DebugManager(myShipId, game, serverAdapter) {
        // @ts-ignore
        this._debugMode = this.GetUrlVars()[DebugManager.DEBUG_FLAG] === "true";
        if (this._debugMode) {
            this._serverGhost = new _ServerGhost__WEBPACK_IMPORTED_MODULE_0__["ServerGhost"](myShipId, game.Scene, game.Content);
            this._gameInformer = new _GameInformer__WEBPACK_IMPORTED_MODULE_1__["GameInformer"](game.Scene);
            this._updateRate = new _UpdateRate__WEBPACK_IMPORTED_MODULE_2__["UpdateRate"](this._gameInformer, game);
            this._drawRate = new _DrawRate__WEBPACK_IMPORTED_MODULE_3__["DrawRate"](this._gameInformer);
            this._payloadRate = new _PayloadRate__WEBPACK_IMPORTED_MODULE_4__["PayloadRate"](this._gameInformer);
            this._connectionMonitor = new _ConnectionMonitor__WEBPACK_IMPORTED_MODULE_5__["ConnectionMonitor"](this._gameInformer, serverAdapter);
        }
    }
    DebugManager.prototype.LoadPayload = function (payload) {
        if (this._debugMode && this._payloadRate && this._serverGhost) {
            this._payloadRate.LoadPayload(payload);
            this._serverGhost.LoadPayload(payload.Ships);
        }
    };
    DebugManager.prototype.Update = function (gameTime) {
        if (this._debugMode && this._updateRate && this._drawRate && this._payloadRate && this._gameInformer && this._serverGhost) {
            this._updateRate.Update(gameTime);
            this._drawRate.Update(gameTime);
            this._payloadRate.Update(gameTime);
            this._gameInformer.Update(gameTime);
            this._serverGhost.Update(gameTime);
        }
    };
    DebugManager.prototype.Draw = function (context) {
        if (this._debugMode && this._drawRate) {
            this._drawRate.Draw(context);
        }
    };
    DebugManager.prototype.GetUrlVars = function () {
        var vars = [], hash, hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            // @ts-ignore
            vars.push(hash[0]);
            // @ts-ignore
            vars[hash[0]] = hash[1];
        }
        return vars;
    };
    DebugManager.DEBUG_FLAG = "debug";
    return DebugManager;
}());



/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerGhost", function() { return ServerGhost; });
/* harmony import */ var _Ships_Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55);

var ServerGhost = /** @class */ (function () {
    function ServerGhost(_myShipId, _scene, _content) {
        this._myShipId = _myShipId;
        this._scene = _scene;
        this._content = _content;
    }
    ServerGhost.prototype.LoadPayload = function (payload) {
        var shipPayload;
        for (var i = 0; i < payload.length; i++) {
            shipPayload = payload[i];
            if (shipPayload.ID === this._myShipId) {
                if (!this._ghost) {
                    this._ghost = new _Ships_Ship__WEBPACK_IMPORTED_MODULE_0__["Ship"](shipPayload, this._content);
                    this._ghost.MovementController.UserControlled = false;
                    this._ghost.Graphic.Body.Opacity = .5;
                    this._scene.Add(this._ghost.Graphic);
                }
                else {
                    this._ghost.LoadPayload(shipPayload);
                }
            }
        }
    };
    ServerGhost.prototype.Update = function (gameTime) {
        if (this._ghost) {
            this._ghost.Update(gameTime);
        }
    };
    return ServerGhost;
}());



/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameInformer", function() { return GameInformer; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);

var GameInformer = /** @class */ (function () {
    function GameInformer(_scene) {
        this._scene = _scene;
        this._yOffset = GameInformer.PADDING;
        this._holder = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Rectangle(0, 0, 0, 0, GameInformer.HOLDER_BACGROUND_COLOR);
        this._holder.Opacity = .3;
        this._holder.Border(2, _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.White);
        this.RepositionHolder();
        this._scene.Add(this._holder);
    }
    GameInformer.prototype.AddTextualInformation = function (title) {
        var textBounds = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Bounds"].BoundingRectangle(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero, GameInformer.MAX_TEXT_SIZE), titleGraphic = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Text2d(GameInformer.PADDING, this._yOffset + textBounds.Size.HalfHeight, title + ": ", GameInformer.TITLE_TEXT_COLOR), valueGraphic, currentHolderSize = this._holder.Size.Clone(), sizeDifference, currentChildren = this._holder.GetChildren();
        titleGraphic.FontSettings.FontWeight = "bold";
        titleGraphic.Align = "left";
        titleGraphic.FontSettings.FontSize = GameInformer.TITLE_TEXT_SIZE + "px";
        titleGraphic.FontSettings.FontFamily = GameInformer.TEXT_FONT;
        this.ResizeHolder(textBounds);
        sizeDifference = this._holder.Size.Subtract(currentHolderSize).Multiply(.5);
        for (var i = 0; i < currentChildren.length; i++) {
            currentChildren[i].Position = currentChildren[i].Position.Subtract(sizeDifference);
        }
        titleGraphic.Position = titleGraphic.Position.Subtract(this._holder.Size.Multiply(.5));
        valueGraphic = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Text2d(titleGraphic.Position.X + GameInformer.MAX_TEXT_SIZE.Width * 2 / 3 - GameInformer.PADDING, titleGraphic.Position.Y, "");
        valueGraphic.Align = "left";
        valueGraphic.FontSettings.FontSize = GameInformer.VALUE_TEXT_SIZE + "px";
        valueGraphic.FontSettings.FontFamily = GameInformer.TEXT_FONT;
        this._holder.AddChild(titleGraphic);
        this._holder.AddChild(valueGraphic);
        return valueGraphic;
    };
    GameInformer.prototype.AddInformation = function (graphic) {
        var bounds = graphic.GetDrawBounds();
        graphic.Position.Y = this._yOffset + bounds.Size.HalfHeight;
        graphic.Position.X = GameInformer.PADDING + bounds.Size.HalfWidth;
        this.ResizeHolder(bounds);
        graphic.Position = graphic.Position.Subtract(this._holder.Size.Multiply(.5));
        this._holder.AddChild(graphic);
    };
    GameInformer.prototype.Update = function (gameTime) {
        this.RepositionHolder();
    };
    GameInformer.prototype.RepositionHolder = function () {
        var cameraTR = this._scene.Camera.TopRight;
        this._holder.Position.X = cameraTR.X - this._holder.Size.HalfWidth;
        this._holder.Position.Y = cameraTR.Y + this._holder.Size.HalfHeight;
    };
    GameInformer.prototype.ResizeHolder = function (target) {
        var targetFullWidth = target.Size.Width + GameInformer.PADDING * 2;
        this._holder.Size.Width = targetFullWidth;
        this._yOffset += target.Size.Height + GameInformer.ITEM_OFFSET;
        this._holder.Size.Height = this._yOffset + GameInformer.PADDING - GameInformer.ITEM_OFFSET;
    };
    GameInformer.ITEM_OFFSET = 3;
    GameInformer.PADDING = 15;
    GameInformer.MAX_TEXT_SIZE = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"](250, 20);
    GameInformer.TITLE_TEXT_COLOR = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.White;
    GameInformer.HOLDER_BACGROUND_COLOR = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.Gray;
    GameInformer.TITLE_TEXT_SIZE = 13;
    GameInformer.VALUE_TEXT_SIZE = 12;
    GameInformer.TEXT_FONT = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].FontFamily.Verdana;
    return GameInformer;
}());



/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateRate", function() { return UpdateRate; });
/* harmony import */ var _RateMonitor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(103);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var UpdateRate = /** @class */ (function (_super) {
    __extends(UpdateRate, _super);
    function UpdateRate(informer, game) {
        return _super.call(this, UpdateRate.TITLE, informer, game.Configuration.UpdateRate) || this;
    }
    UpdateRate.prototype.Update = function (gameTime) {
        this.MarkRate();
        _super.prototype.Update.call(this, gameTime);
    };
    UpdateRate.TITLE = "Update Rate";
    return UpdateRate;
}(_RateMonitor__WEBPACK_IMPORTED_MODULE_0__["RateMonitor"]));



/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RateMonitor", function() { return RateMonitor; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _UpdateRate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(102);


var RateMonitor = /** @class */ (function () {
    function RateMonitor(title, informer, _targetRate) {
        this._targetRate = _targetRate;
        this._textNode = informer.AddTextualInformation(title);
        this._textNode.Color = RateMonitor.TEXT_COLOR;
        this._textNode.Text = "...";
        this._lastCalculatedAt = new Date();
        this._count = 0;
    }
    RateMonitor.prototype.MarkRate = function () {
        this._count++;
    };
    RateMonitor.prototype.Update = function (gameTime) {
        if (_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].DateSpan(this._lastCalculatedAt, gameTime.Now).Seconds >= _UpdateRate__WEBPACK_IMPORTED_MODULE_1__["UpdateRate"].CALCULATE_EVERY.Seconds) {
            this._textNode.Text = this._count.toString() + "  |  " + Math.round((this._count / this._targetRate) * 100).toString() + "%";
            this._count = 0;
            this._lastCalculatedAt = gameTime.Now;
        }
    };
    RateMonitor.TEXT_COLOR = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.White;
    RateMonitor.CALCULATE_EVERY = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromSeconds(1);
    return RateMonitor;
}());



/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawRate", function() { return DrawRate; });
/* harmony import */ var _RateMonitor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(103);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var DrawRate = /** @class */ (function (_super) {
    __extends(DrawRate, _super);
    function DrawRate(informer) {
        return _super.call(this, DrawRate.TITLE, informer, 60) || this;
    }
    DrawRate.prototype.Draw = function (context) {
        this.MarkRate();
    };
    DrawRate.TITLE = "Draw Rate";
    return DrawRate;
}(_RateMonitor__WEBPACK_IMPORTED_MODULE_0__["RateMonitor"]));



/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PayloadRate", function() { return PayloadRate; });
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _RateMonitor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(103);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var PayloadRate = /** @class */ (function (_super) {
    __extends(PayloadRate, _super);
    function PayloadRate(informer) {
        return _super.call(this, PayloadRate.TITLE, informer, 1000 / _Game__WEBPACK_IMPORTED_MODULE_0__["Game"].GameConfiguration.gameConfig.DRAW_INTERVAL) || this;
    }
    PayloadRate.prototype.LoadPayload = function (payload) {
        this.MarkRate();
    };
    PayloadRate.TITLE = "Payload Rate";
    return PayloadRate;
}(_RateMonitor__WEBPACK_IMPORTED_MODULE_1__["RateMonitor"]));



/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionMonitor", function() { return ConnectionMonitor; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);

var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["Connecting"] = 0] = "Connecting";
    ConnectionState[ConnectionState["Connected"] = 1] = "Connected";
    ConnectionState[ConnectionState["Reconnecting"] = 2] = "Reconnecting";
    ConnectionState[ConnectionState["Disconnected"] = 4] = "Disconnected";
})(ConnectionState || (ConnectionState = {}));
var ConnectionMonitor = /** @class */ (function () {
    function ConnectionMonitor(informer, serverAdapter) {
        this._textNode = informer.AddTextualInformation(ConnectionMonitor.TITLE);
        this._textNode.FontSettings.FontWeight = "bold";
        this._connection = serverAdapter.Connection;
        this.UpdateText();
    }
    ConnectionMonitor.prototype.UpdateText = function () {
        this._textNode.Color = this.DetermineColor();
        this._textNode.Text = this.GetStateText();
    };
    ConnectionMonitor.prototype.DetermineColor = function () {
        return _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.LightGreen;
    };
    ConnectionMonitor.prototype.GetStateText = function () {
        return ConnectionState[this._connection.state];
    };
    ConnectionMonitor.TITLE = "Connection State";
    return ConnectionMonitor;
}());



/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HUDManager", function() { return HUDManager; });
/* harmony import */ var _ShipStatMonitor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(108);
/* harmony import */ var _HealthMonitor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(109);
/* harmony import */ var _ExperienceMonitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(110);
/* harmony import */ var _RankingsManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(111);
/* harmony import */ var _EnvironmentMonitor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(112);
/* harmony import */ var _LeaderboardManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(93);
/* harmony import */ var _DeathScreen__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(94);
/* harmony import */ var _NotificationManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(113);
/* harmony import */ var _UserInformationManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(114);
/* harmony import */ var _Chat__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(115);










var HUDManager = /** @class */ (function () {
    function HUDManager(initialization, _shipManager, areaRenderer, keyboard, serverAdapter) {
        this._shipManager = _shipManager;
        this._gameHUD = $("#gameHUD");
        this._doublePopupHolder = $("#doublePopupHolder");
        this._locationStats = $("#LocationStatisticsHolder");
        this._shipStats = $("#StatisticHolder");
        this._logout = $("#logout");
        this._myShipId = initialization.ShipID;
        this._gameHUDHeight = this._gameHUD.height();
        this._shipStatMonitor = new _ShipStatMonitor__WEBPACK_IMPORTED_MODULE_0__["ShipStatMonitor"]();
        this._shipHealthMonitor = new _HealthMonitor__WEBPACK_IMPORTED_MODULE_1__["HealthMonitor"]();
        this._shipExperienceMonitor = new _ExperienceMonitor__WEBPACK_IMPORTED_MODULE_2__["ExperienceMonitor"]();
        this._rankingsManager = new _RankingsManager__WEBPACK_IMPORTED_MODULE_3__["RankingsManager"]();
        this._environmentMonitor = new _EnvironmentMonitor__WEBPACK_IMPORTED_MODULE_4__["EnvironmentMonitor"](areaRenderer, this._shipManager.UserShipManager);
        this._leaderboardManager = new _LeaderboardManager__WEBPACK_IMPORTED_MODULE_5__["LeaderboardManager"](this._myShipId, keyboard, serverAdapter);
        this._deathScreen = new _DeathScreen__WEBPACK_IMPORTED_MODULE_6__["DeathScreen"]();
        this._notificationManager = new _NotificationManager__WEBPACK_IMPORTED_MODULE_7__["NotificationManager"](serverAdapter);
        this._userInformationManager = new _UserInformationManager__WEBPACK_IMPORTED_MODULE_8__["UserInformationManager"](initialization.UserInformation);
        this._chat = new _Chat__WEBPACK_IMPORTED_MODULE_9__["Chat"](initialization.UserInformation, serverAdapter);
        this._logout.click(function () {
            // Clear cookies
            var c = document.cookie.split(";");
            for (var i = 0; i < c.length; i++) {
                var e = c[i].indexOf("=");
                var n = e > -1 ? c[i].substr(0, e) : c[i];
                document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
            window.location.reload(true);
        });
    }
    HUDManager.prototype.OnScreenResize = function (newViewport) {
        this._gameHUD.css("width", newViewport.Width);
        this._gameHUD.css("height", this._gameHUDHeight);
        this._gameHUD.css("top", newViewport.Height);
        this._shipHealthMonitor.OnScreenResize();
        this.CenterDoublePopup(newViewport);
        // Remove or Add HUD objects
        if (newViewport.Width <= 1370) {
            this._locationStats.css("display", "none");
        }
        else {
            this._locationStats.css("display", "block");
        }
        // Remove or Add HUD objects
        if (newViewport.Width <= 1177) {
            this._shipStats.css("display", "none");
        }
        else {
            this._shipStats.css("display", "block");
        }
    };
    HUDManager.prototype.CenterDoublePopup = function (newViewport) {
        // The left is handled by the css
        this._doublePopupHolder.css("top", (newViewport.Height / 2) - this._doublePopupHolder.height() / 2);
    };
    HUDManager.prototype.LoadPayload = function (payload) {
        this._rankingsManager.LoadPayload(payload);
        this._environmentMonitor.LoadPayload(payload);
        this._deathScreen.LoadPayload(payload);
        this._notificationManager.LoadPayload(payload);
    };
    HUDManager.prototype.Update = function (gameTime) {
        var ship = this._shipManager.GetShip(this._myShipId);
        if (ship) {
            this._shipStatMonitor.Update(ship);
            this._shipHealthMonitor.Update(ship);
            this._shipExperienceMonitor.Update(ship);
            this._environmentMonitor.Update(ship);
            this._rankingsManager.Update(ship);
        }
    };
    return HUDManager;
}());



/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipStatMonitor", function() { return ShipStatMonitor; });
/* harmony import */ var _Ships_Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55);
/* harmony import */ var _Ships_ShipLifeController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(60);


var ShipStatMonitor = /** @class */ (function () {
    function ShipStatMonitor() {
        this._speedHolder = $("#Speed");
        this._healthHolder = $("#IncreasedHealth");
        this._damageHolder = $("#IncreasedDamage");
        this._lastSpeed = 0;
        this._lastIncreasedLife = 0;
        this._lastDamage = 0;
    }
    ShipStatMonitor.prototype.Update = function (ship) {
        var speed = Math.round(Math.sqrt(Math.pow(ship.MovementController.Velocity.X, 2) + Math.pow(ship.MovementController.Velocity.Y, 2))), increasedLife = ship.LifeController.MaxHealth - _Ships_ShipLifeController__WEBPACK_IMPORTED_MODULE_1__["ShipLifeController"].START_LIFE, increasedDamage = Math.round((ship.LevelManager.Level - 1) * _Ships_Ship__WEBPACK_IMPORTED_MODULE_0__["Ship"].DAMAGE_INCREASE_RATE * 10) / 10;
        if (this._lastSpeed !== speed) {
            this._speedHolder[0].innerHTML = speed.toString();
            this._lastSpeed = speed;
        }
        if (this._lastIncreasedLife !== increasedLife) {
            this._healthHolder[0].innerHTML = increasedLife.toString();
            this._lastIncreasedLife = increasedLife;
        }
        if (this._lastDamage !== increasedDamage) {
            this._damageHolder[0].innerHTML = increasedDamage.toString();
            this._lastDamage = increasedDamage;
        }
    };
    return ShipStatMonitor;
}());



/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HealthMonitor", function() { return HealthMonitor; });
/* harmony import */ var _Ships_ShipLifeController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60);

var HealthMonitor = /** @class */ (function () {
    function HealthMonitor() {
        this._maxHealth = _Ships_ShipLifeController__WEBPACK_IMPORTED_MODULE_0__["ShipLifeController"].START_LIFE;
        this._currentHealthBar = $("#Health");
        this._currentHealthHeart = $("#HealthHeart");
        this._whiteHeartIndicator = $("#WhiteHealthHeart");
        this._healthHolder = $("#HealthHolder");
        this._healthText = $("#HealthText");
        this._gameWrapper = $("#gameWrapper");
        this._whiteHeartVisible = true;
        this._lastHealth = 0;
        this._halfHeartWidth = .5 * this._currentHealthHeart.width();
    }
    HealthMonitor.prototype.OnScreenResize = function () {
        this._lastHealth = -1;
    };
    HealthMonitor.prototype.Update = function (ship) {
        if (ship.LifeController.Health !== this._lastHealth) {
            this._maxHealth = ship.LifeController.MaxHealth;
            // If we're taking damage
            if (ship.LifeController.Health < this._lastHealth) {
                if (ship.LifeController.Health <= 0) {
                    this._whiteHeartIndicator.fadeOut(HealthMonitor.ANIMATE_SPEED);
                    this._whiteHeartVisible = false;
                }
            }
            else {
                if (!this._whiteHeartVisible) {
                    this._whiteHeartVisible = true;
                    this._whiteHeartIndicator.fadeIn(HealthMonitor.ANIMATE_SPEED);
                }
            }
            this._lastHealth = ship.LifeController.Health;
            this._healthText[0].innerHTML = this._lastHealth + "/" + this._maxHealth;
            this._currentHealthBar.stop(true);
            this._currentHealthHeart.stop(true);
            var lifePercentage = ship.LifeController.HealthPercent, holderWidth = this._healthHolder.width(), heartLeft = Math.min(Math.max((holderWidth * lifePercentage) - this._halfHeartWidth, 0), holderWidth - 2 * this._halfHeartWidth), barColor;
            this._currentHealthHeart.removeClass("good hurt bad");
            if (lifePercentage <= _Ships_ShipLifeController__WEBPACK_IMPORTED_MODULE_0__["ShipLifeController"].BAD_THRESHOLD) {
                this._currentHealthHeart.addClass("bad");
                barColor = _Ships_ShipLifeController__WEBPACK_IMPORTED_MODULE_0__["ShipLifeController"].BAD_COLOR;
            }
            else if (lifePercentage <= _Ships_ShipLifeController__WEBPACK_IMPORTED_MODULE_0__["ShipLifeController"].HURT_THRESHOLD) {
                this._currentHealthHeart.addClass("hurt");
                barColor = _Ships_ShipLifeController__WEBPACK_IMPORTED_MODULE_0__["ShipLifeController"].HURT_COLOR;
            }
            else {
                this._currentHealthHeart.addClass("good");
                barColor = _Ships_ShipLifeController__WEBPACK_IMPORTED_MODULE_0__["ShipLifeController"].GOOD_COLOR;
            }
            this._currentHealthHeart.animate({ left: heartLeft }, HealthMonitor.ANIMATE_SPEED, "easeOutExpo");
            this._currentHealthBar.animate({ width: (lifePercentage * 100) + '%', backgroundColor: barColor }, HealthMonitor.ANIMATE_SPEED, "easeOutExpo");
        }
    };
    HealthMonitor.ANIMATE_SPEED = 500;
    return HealthMonitor;
}());



/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExperienceMonitor", function() { return ExperienceMonitor; });
var ExperienceMonitor = /** @class */ (function () {
    function ExperienceMonitor() {
        this._currentExperience = $("#Experience");
        this._experienceBar = $("#ExperienceBar");
        this._currentLevel = $("#Level");
        this._levelNotification = $("#levelNotification");
        this._currentLevelNotification = $("#CurrentLevel_Notification");
        this._popupHolder = $("#popUpHolder");
        this._lastExperience = 0;
        this._lastLevel = -1;
        this._lastExperienceToNextLevel = 0;
    }
    ExperienceMonitor.prototype.Update = function (ship) {
        var that = this;
        if (ship.LevelManager.Experience !== this._lastExperience || ship.LevelManager.Level !== this._lastLevel) {
            var experienceIncrease, experiencePercentage;
            // If the level has changed we need to animate a full bar to then re-fill
            if (ship.LevelManager.Level !== this._lastLevel) {
                experienceIncrease = this._lastExperienceToNextLevel - this._lastExperience + ship.LevelManager.Experience;
                this._experienceBar.css('width', '0%'); // Reset to 0 so when we animate we're animating forward, not backward
                this._popupHolder.css("display", "block");
                this._currentLevelNotification[0].innerHTML = ship.LevelManager.Level.toString();
                this._levelNotification.animate({ top: 0 }, 1000).delay(3000).animate({ top: -234 }, 1000, function () {
                    that._popupHolder.css("display", "none");
                });
            }
            else {
                experienceIncrease = ship.LevelManager.Experience - this._lastExperience;
            }
            this._currentExperience[0].innerHTML = ship.LevelManager.Experience + "/" + ship.LevelManager.ExperienceToNextLevel;
            experiencePercentage = (ship.LevelManager.Experience / ship.LevelManager.ExperienceToNextLevel) * 100;
            this._currentExperience.stop(true);
            this._currentExperience.animate({ color: "#FFFFFF" }, ExperienceMonitor.ANIMATE_SPEED).animate({ color: "#7F7F7F" }, ExperienceMonitor.ANIMATE_SPEED);
            this._experienceBar.animate({ width: (experiencePercentage) + '%' }, ExperienceMonitor.ANIMATE_SPEED, "easeOutExpo");
            this._lastLevel = ship.LevelManager.Level;
            this._lastExperience = ship.LevelManager.Experience;
            this._lastExperienceToNextLevel = ship.LevelManager.ExperienceToNextLevel;
            this._currentLevel[0].innerHTML = ship.LevelManager.Level.toString();
        }
    };
    ExperienceMonitor.ANIMATE_SPEED = 500;
    return ExperienceMonitor;
}());



/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RankingsManager", function() { return RankingsManager; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);

var RankingsManager = /** @class */ (function () {
    function RankingsManager() {
        this._myPosition = 0; // Initially set to a very high value so we flash green on leaderboard position first update
        this._globalRanking = $("#GlobalRanking");
        this._globalRankingLB = $("#GlobalRankingLB");
        this._killsEle = $("#Kills");
        this._deathsEle = $("#Deaths");
        this._kdRatioEle = $("#KDRatio");
        this._koStatusCount = this._lastKills = 0;
        this._initialLoad = true;
        this._lastDeaths = 0;
        this._lastOutOf = 0;
    }
    RankingsManager.prototype.LoadPayload = function (payload) {
        this.UpdateLeaderboard(payload.LeaderboardPosition, payload.ShipsInWorld);
        this.UpdateKillsDeaths(payload.Kills, payload.Deaths);
    };
    RankingsManager.prototype.Update = function (ship) {
        if (this._initialLoad) {
            this._initialLoad = false;
            this._koStatusCount = 0;
            return;
        }
        while (this._koStatusCount !== 0) {
            ship.Graphic.Status("K.O.", 50, _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.White, RankingsManager.KO_FADE_DURATION);
            this._koStatusCount--;
        }
    };
    RankingsManager.prototype.UpdateLeaderboard = function (newPosition, outOf) {
        if (this._myPosition != newPosition || outOf !== this._lastOutOf) {
            if (this._myPosition && this._myPosition != newPosition) {
                this._globalRanking.stop(true);
                this._globalRanking.animate({ color: "#FFFFFF" }, 500).animate({ color: "#7F7F7F" }, 500);
            }
            this._myPosition = newPosition;
            this._lastOutOf = outOf;
            this._globalRanking[0].innerHTML = this._myPosition.toString();
            this._globalRankingLB[0].innerHTML = this._myPosition + " of " + outOf;
        }
    };
    RankingsManager.prototype.UpdateKillsDeaths = function (kills, deaths) {
        if (kills != this._lastKills || deaths != this._lastDeaths) {
            if (kills != this._lastKills) {
                this._koStatusCount = kills - this._lastKills;
                this._killsEle.stop(true);
                this._killsEle.animate({ color: "#7F7F7F" }, 500).animate({ color: "#FFFFFF" }, 500);
                this._killsEle[0].innerHTML = kills.toString();
            }
            if (deaths != this._lastDeaths) {
                this._deathsEle.stop(true);
                this._deathsEle.animate({ color: "#7F7F7F" }, 500).animate({ color: "#FFFFFF" }, 500);
                this._deathsEle[0].innerHTML = deaths.toString();
            }
            var finalRatio;
            if (deaths === 0 && kills !== 0) {
                finalRatio = "∞";
            }
            else if (deaths === 0 && kills === 0) {
                finalRatio = "";
            }
            else {
                var kRatio, dRatio;
                if (kills <= deaths && kills !== 0) {
                    kRatio = 1;
                    dRatio = Math.round((deaths / kills) * 10) / 10;
                }
                else {
                    kRatio = Math.round((kills / deaths) * 10) / 10;
                    dRatio = 1;
                }
                finalRatio = kRatio + ":" + dRatio;
            }
            this._kdRatioEle[0].innerHTML = finalRatio;
            this._lastKills = kills;
            this._lastDeaths = deaths;
        }
    };
    RankingsManager.KO_FADE_DURATION = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromSeconds(3);
    return RankingsManager;
}());



/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnvironmentMonitor", function() { return EnvironmentMonitor; });
var EnvironmentMonitor = /** @class */ (function () {
    function EnvironmentMonitor(_areaRenderer, _userShipManager) {
        this._areaRenderer = _areaRenderer;
        this._userShipManager = _userShipManager;
        this._latency = $("#Latency");
        this._worldTargets = $("#WorldTargets");
        this._worldBullets = $("#WorldBullets");
        this._area = $("#Area");
    }
    EnvironmentMonitor.prototype.LoadPayload = function (payload) {
        if (this._userShipManager) {
            this._latency[0].innerHTML = this._userShipManager.LatencyResolver.Latency;
        }
        this._worldBullets[0].innerHTML = payload.BulletsInWorld.toString();
        this._worldTargets[0].innerHTML = payload.ShipsInWorld.toString();
    };
    EnvironmentMonitor.prototype.Update = function (ship) {
        this._area[0].innerHTML = this._areaRenderer.AreaFromPosition(ship.MovementController.Position).toString();
    };
    return EnvironmentMonitor;
}());



/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationManager", function() { return NotificationManager; });
var NotificationManager = /** @class */ (function () {
    function NotificationManager(serverAdapter) {
        var _this = this;
        this.controlsNCredits = $("#ControlsNCredits");
        this.showInfoButton = $("#ShowInfo");
        this.notificationHolder = $("#NotificationHolder");
        this.notificationBase = $(".Notification");
        this.notifications = $("#Notifications");
        this.notificationBaseHeight = $(".Notification").height() + parseInt($(".Notification").css("margin-bottom"));
        this.controlsNCreditsHeight = $("#ControlsNCredits").height();
        this.notificationHalfHeight = 50;
        this.initialControlsShowFor = 7000; // Show the controls info for X milliseconds
        this.notifyTime = 4000;
        this.showInfoButton.click(function () {
            if (_this.showInfoButton.hasClass("active")) {
                _this.hideInfo();
                _this.showInfoButton.removeClass("active");
            }
            else {
                _this.showInfo();
                _this.showInfoButton.addClass("active");
            }
        });
        this.showInfoButton.click();
        setTimeout(function () {
            // Only hide if it hasn't been hidden already
            if (_this.showInfoButton.hasClass("active")) {
                _this.showInfoButton.click();
            }
        }, this.initialControlsShowFor);
        serverAdapter.OnForcedDisconnct.Bind(function () {
            _this.Notify("You have been disconnected for being Idle too long.  Refresh the page to play again.", true);
            serverAdapter.Stop();
        });
        serverAdapter.OnControlTransferred.Bind(function () {
            _this.Notify("You have been disconnected!  The control for your ship has been transferred to your other login.", true);
            serverAdapter.Stop();
        });
    }
    NotificationManager.prototype.showInfo = function () {
        this.notificationHolder.css("display", "block");
        this.notificationHolder.css("top", parseInt(this.notificationHolder.css("top")) - this.controlsNCreditsHeight);
        this.controlsNCredits.fadeIn(1000);
    };
    NotificationManager.prototype.hideInfo = function () {
        var _this = this;
        this.controlsNCredits.fadeOut(1000, function () {
            _this.notificationHolder.css("top", parseInt(_this.notificationHolder.css("top")) + _this.controlsNCreditsHeight);
            _this.notificationHolder.css("display", "none");
        });
    };
    NotificationManager.prototype.LoadPayload = function (payload) {
        if (payload.Notification) {
            this.Notify(payload.Notification, false);
        }
    };
    NotificationManager.prototype.Notify = function (message, stayUp) {
        var _this = this;
        var newNotification = this.notificationBase.clone(), notificationText = newNotification.find("p");
        notificationText[0].innerHTML = message;
        this.notifications.append(newNotification);
        this.notificationHolder.css("display", "block");
        this.notificationHolder.css("top", parseInt(this.notificationHolder.css("top")) - this.notificationBaseHeight);
        newNotification.fadeIn(1000, function () {
            if (!stayUp) {
                setTimeout(function () {
                    newNotification.fadeOut(1000, function () {
                        newNotification.remove();
                        _this.notificationHolder.css("top", parseInt(_this.notificationHolder.css("top")) + _this.notificationBaseHeight);
                        _this.notificationHolder.css("display", "none");
                    });
                }, _this.notifyTime);
            }
        });
        var textHeightHalf = notificationText.height() / 2;
        notificationText.css("top", this.notificationHalfHeight - textHeightHalf);
    };
    return NotificationManager;
}());



/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserInformationManager", function() { return UserInformationManager; });
var UserInformationManager = /** @class */ (function () {
    function UserInformationManager(userInformation) {
        this._displayName = $("#DisplayName");
        this._displayNameLB = $("#DisplayNameLB");
        this._you = $("#You");
        this._youLB = $("#YouLB");
        this._displayName.text(userInformation.Name);
        this._displayNameLB.text(userInformation.Name);
        this._you.attr("src", userInformation.Photo);
        this._youLB.attr("src", userInformation.Photo);
    }
    return UserInformationManager;
}());



/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatMessageType", function() { return ChatMessageType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatMessage", function() { return ChatMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chat", function() { return Chat; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);

var ChatMessageType;
(function (ChatMessageType) {
    ChatMessageType[ChatMessageType["User"] = 0] = "User";
    ChatMessageType[ChatMessageType["System"] = 1] = "System";
})(ChatMessageType || (ChatMessageType = {}));
var ChatMessage = /** @class */ (function () {
    function ChatMessage(From, Message, Type) {
        this.From = From;
        this.Message = Message;
        this.Type = Type;
    }
    return ChatMessage;
}());

var Chat = /** @class */ (function () {
    function Chat(_userInformation, serverAdapter) {
        var _this = this;
        this._userInformation = _userInformation;
        this._document = $(document);
        this._chatContainer = $("#chat");
        this._chatBox = $("<input>").attr("id", "chatbox").attr("type", "input").attr("autocomplete", "off");
        this._chatBoxContainer = $("<li>");
        this._chatBoxVisible = false;
        this._colors = [
            _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.Red.toString(),
            _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.Orange.toString(),
            _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.Yellow.toString(),
            _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.Green.toString(),
            _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.Blue.toString(),
            _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.Purple.toString(),
            _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.White.toString(),
            _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.Cyan.toString()
        ];
        this._systemMessageColor = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Graphics"].Color.Yellow.toString();
        serverAdapter.OnMessageReceived.Bind(function (chat) {
            _this.AddMessage(chat);
        });
        this._myShipId = -1;
        this._chatBoxContainer.append(this._chatBox);
        this._document.keydown(function (key) {
            switch (key.keyCode) {
                //if they press enter
                case 13:
                    if (_this._chatBoxVisible) {
                        var message = _this._chatBox.val();
                        if (message) {
                            _this.AddMessage(new ChatMessage(_this._userInformation.Name, message, ChatMessageType.User));
                            serverAdapter.Connection.invoke("sendMessage", message);
                        }
                        _this.HideChatBox();
                    }
                    else {
                        _this.ShowChatBox();
                    }
                    _this.StopPropogation(key);
                    break;
                //the letter 't'
                case 84:
                    if (!_this._chatBoxVisible) {
                        _this.ShowChatBox();
                        _this.StopPropogation(key);
                    }
                    //determine status of chat box
                    break;
                //escape key
                case 27: //close the chat box if open
                    if (_this._chatBoxVisible) {
                        _this.HideChatBox();
                        _this.StopPropogation(key);
                    }
                    break;
            }
        });
    }
    Chat.prototype.StopPropogation = function (key) {
        key.preventDefault();
        key.stopPropagation();
    };
    Chat.prototype.ShowChatBox = function () {
        this._chatContainer.append(this._chatBoxContainer);
        this._chatBoxContainer.show();
        this._chatBox.focus();
        this._chatBoxVisible = true;
    };
    Chat.prototype.HideChatBox = function () {
        this._chatBox.val("");
        this._chatBoxContainer.remove();
        this._chatBoxVisible = false;
    };
    Chat.prototype.AddMessage = function (chatMessage) {
        //User message
        if (chatMessage.Type === ChatMessageType.User) {
            var color = this._colors[this.GetHashCode(chatMessage.From) % this._colors.length], playerName = $("<span>").text(chatMessage.From).css("color", color), message = $("<span>").append($("<div/>").text(chatMessage.Message).html().replace(/\"/g, "&quot;"));
            //only insert new items before the chat box so that the chat box stays at the
            //bottom of the screen and doesn't scroll up.
            if (this._chatBoxVisible) {
                $("<li>")
                    .append(playerName)
                    .append($("<span>").text(": "))
                    .append(message)
                    .insertBefore(this._chatBoxContainer);
            }
            else {
                this._chatContainer.append($("<li>")
                    .append(playerName)
                    .append($("<span>").text(": "))
                    .append(message));
            }
        }
        //System message
        if (chatMessage.Type === ChatMessageType.System) {
            this._chatContainer.append($("<li>")
                .append(chatMessage.Message)
                .css("color", this._systemMessageColor));
        }
        if (this._chatContainer.children.length > 100) {
            // @ts-ignore
            this._chatContainer.children[0].remove();
        }
    };
    Chat.prototype.GetHashCode = function (name) {
        var hash = 0, i, c, l;
        if (name.length === 0)
            return hash;
        for (i = 0, l = name.length; i < l; i++) {
            c = name.charCodeAt(i);
            hash = ((hash << 5) - hash) + c;
            hash |= 0;
        }
        return hash;
    };
    return Chat;
}());



/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserShipManager", function() { return UserShipManager; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _LatencyResolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95);
/* harmony import */ var _Ships_ShipInputController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(117);
/* harmony import */ var _UserCameraController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(118);
/* harmony import */ var _Ships_Ship__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(55);
/* harmony import */ var _Space_MapBoundary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(72);
/* harmony import */ var _Ships_ShipMovementController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(65);
/* harmony import */ var _endgate_Extensions_MathExtensions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);








var UserShipManager = /** @class */ (function () {
    function UserShipManager(ControlledShipId, _shipManager, _collisionManager, input, _camera, serverAdapter) {
        var _this = this;
        this.ControlledShipId = ControlledShipId;
        this._shipManager = _shipManager;
        this._collisionManager = _collisionManager;
        this._camera = _camera;
        this._connection = serverAdapter.Connection;
        this._userCameraController = new _UserCameraController__WEBPACK_IMPORTED_MODULE_3__["UserCameraController"](this.ControlledShipId, this._shipManager, this._camera);
        this._lastSync = new Date();
        this.LatencyResolver = new _LatencyResolver__WEBPACK_IMPORTED_MODULE_1__["LatencyResolver"](serverAdapter);
        this._collisionManager.OnCollision.Bind(function (ship, boundary) {
            if (ship instanceof _Ships_Ship__WEBPACK_IMPORTED_MODULE_4__["Ship"] && boundary instanceof _Space_MapBoundary__WEBPACK_IMPORTED_MODULE_5__["MapBoundary"]) {
                if (ship.ID === _this.ControlledShipId) {
                    for (var i = _Ships_ShipMovementController__WEBPACK_IMPORTED_MODULE_6__["ShipMovementController"].MOVING_DIRECTIONS.length - 1; i >= 0; i--) {
                        _this.Invoke("registerMoveStop", false, _this.NewMovementCommand("Forward", false));
                        _this.Invoke("registerMoveStop", false, _this.NewMovementCommand("Backward", false));
                    }
                }
            }
        });
        this._shipInputController = new _Ships_ShipInputController__WEBPACK_IMPORTED_MODULE_2__["ShipInputController"](input.Keyboard, function (direction, startMoving) {
            var ship = _this._shipManager.GetShip(_this.ControlledShipId);
            if (ship && ship.MovementController.Controllable && ship.LifeController.Alive) {
                if (startMoving) {
                    if (direction === "Boost") {
                        _this.Invoke("registerAbilityStart", _this.LatencyResolver.TryRequestPing(), _this.NewAbilityCommand(direction, true));
                        ship.AbilityHandler.Activate(direction);
                        // Don't want to trigger a server command if we're already moving in the direction
                    }
                    else if (!ship.MovementController.IsMovingInDirection(direction)) {
                        _this.Invoke("registerMoveStart", _this.LatencyResolver.TryRequestPing(), _this.NewMovementCommand(direction, true));
                        ship.MovementController.Move(direction, startMoving);
                    }
                }
                else {
                    // Don't want to trigger a server command if we're already moving in the direction
                    if (ship.MovementController.IsMovingInDirection(direction)) {
                        _this.Invoke("registerMoveStop", _this.LatencyResolver.TryRequestPing(), _this.NewMovementCommand(direction, false));
                        ship.MovementController.Move(direction, startMoving);
                    }
                }
            }
        }, function (fireMethod) {
            var hubMethod = fireMethod.substr(0, 1).toUpperCase() + fireMethod.substring(1);
            _this._connection.invoke(hubMethod);
        });
    }
    UserShipManager.prototype.LoadPayload = function (payload) {
        var ship = this._shipManager.GetShip(this.ControlledShipId);
        if (ship) {
            ship.LevelManager.UpdateExperience(payload.Experience, payload.ExperienceToNextLevel);
        }
    };
    UserShipManager.prototype.Update = function (gameTime) {
        var ship = this._shipManager.GetShip(this.ControlledShipId);
        if (ship) {
            if (_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].DateSpan(this._lastSync, gameTime.Now).Seconds > UserShipManager.SYNC_INTERVAL.Seconds && ship.LifeController.Alive) {
                this._lastSync = gameTime.Now;
                this._connection.invoke("syncMovement", { X: Math.round(ship.MovementController.Position.X - ship.Graphic.Size.HalfWidth), Y: Math.round(ship.MovementController.Position.Y - ship.Graphic.Size.HalfHeight) }, Object(_endgate_Extensions_MathExtensions__WEBPACK_IMPORTED_MODULE_7__["MathRoundTo"])(ship.MovementController.Rotation * 57.2957795, 2), { X: Math.round(ship.MovementController.Velocity.X), Y: Math.round(ship.MovementController.Velocity.Y) });
            }
            this._userCameraController.Update(gameTime);
        }
    };
    UserShipManager.prototype.Invoke = function (method, pingBack, command) {
        var ship = this._shipManager.GetShip(this.ControlledShipId);
        this._connection.invoke(method, command.Command, { X: Math.round(ship.MovementController.Position.X - ship.Graphic.Size.HalfWidth), Y: Math.round(ship.MovementController.Position.Y - ship.Graphic.Size.HalfHeight) }, Object(_endgate_Extensions_MathExtensions__WEBPACK_IMPORTED_MODULE_7__["MathRoundTo"])(ship.MovementController.Rotation * 57.2957795, 2), { X: Math.round(ship.MovementController.Velocity.X), Y: Math.round(ship.MovementController.Velocity.Y) }, pingBack);
    };
    UserShipManager.prototype.NewMovementCommand = function (direction, startMoving) {
        var command = {
            Command: direction,
            Start: startMoving,
            IsAbility: false
        };
        return command;
    };
    UserShipManager.prototype.NewAbilityCommand = function (ability, startMoving) {
        var command = {
            Command: ability,
            Start: startMoving,
            IsAbility: true
        };
        return command;
    };
    UserShipManager.SYNC_INTERVAL = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromSeconds(1.5);
    return UserShipManager;
}());



/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipInputController", function() { return ShipInputController; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _ShipFireController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(82);


var ShipInputController = /** @class */ (function () {
    function ShipInputController(_keyboard, _onMove, _onFire) {
        var _this = this;
        this._keyboard = _keyboard;
        this._onMove = _onMove;
        this._onFire = _onFire;
        this._directions = {
            Forward: false,
            Backward: false,
            RotatingLeft: false,
            RotatingRight: false
        };
        this._lastBoostTap = new Date();
        this.BindKeys(["w"], "OnCommandDown", "Forward", true);
        this.BindKeys(["d"], "OnCommandDown", "RotatingRight", true);
        this.BindKeys(["s"], "OnCommandDown", "Backward", true);
        this.BindKeys(["a"], "OnCommandDown", "RotatingLeft", true);
        this.BindKeys(["w"], "OnCommandUp", "Forward", false);
        this.BindKeys(["d"], "OnCommandUp", "RotatingRight", false);
        this.BindKeys(["s"], "OnCommandUp", "Backward", false);
        this.BindKeys(["a"], "OnCommandUp", "RotatingLeft", false);
        this._keyboard.OnCommandUp("w", function () {
            var now = new Date();
            if (_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].DateSpan(_this._lastBoostTap, now).Milliseconds <= ShipInputController.DOUBLE_TAP_AFTER.Milliseconds) {
                _this._onMove("Boost", true);
            }
            else { // no double tap
                _this._lastBoostTap = now;
            }
        });
        this._fireController = new _ShipFireController__WEBPACK_IMPORTED_MODULE_1__["ShipFireController"](this._keyboard, this._onFire);
    }
    ShipInputController.prototype.BindKeys = function (keyList, bindingAction, direction, startMoving) {
        var _this = this;
        for (var i = 0; i < keyList.length; i++) {
            // @ts-ignore
            this._keyboard[bindingAction](keyList[i], function () {
                // @ts-ignore
                if (_this._directions[direction] !== startMoving) {
                    // @ts-ignore
                    _this._directions[direction] = startMoving;
                    _this._onMove(direction, startMoving);
                }
            });
        }
    };
    ShipInputController.DOUBLE_TAP_AFTER = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromMilliseconds(350);
    return ShipInputController;
}());



/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserCameraController", function() { return UserCameraController; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);

var UserCameraController = /** @class */ (function () {
    function UserCameraController(_myShipId, _shipManager, _camera) {
        var _this = this;
        this._myShipId = _myShipId;
        this._shipManager = _shipManager;
        this._camera = _camera;
        this._movementTween = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Tweening"].Vector2dTween(_endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero, _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"].Zero, UserCameraController.MOVEMENT_TIME, _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TweeningFunctions"].Exponential.EaseOut);
        this._movementTween.OnChange.Bind(function (newPosition) {
            _this._camera.Position = newPosition;
        });
        this._started = false;
    }
    UserCameraController.prototype.Update = function (gameTime) {
        var ship = this._shipManager.GetShip(this._myShipId), distance;
        if (ship) {
            // On the initial start of the game just position the camera directly over the ship
            if (!this._started) {
                this._started = true;
                this._camera.Position = ship.MovementController.Position;
                return;
            }
            distance = ship.MovementController.Position.Distance(this._camera.Position).Magnitude();
            if (!this._movementTween.IsPlaying()) {
                if (distance < UserCameraController.DISTANCE_THRESHOLD) {
                    this._camera.Position = ship.MovementController.Position;
                }
                else {
                    this._movementTween.From = this._camera.Position;
                    this._movementTween.To = ship.MovementController.Position;
                    this._movementTween.Restart();
                }
            }
            else {
                this._movementTween.To = ship.MovementController.Position;
            }
        }
        this._movementTween.Update(gameTime);
    };
    UserCameraController.DISTANCE_THRESHOLD = 500;
    UserCameraController.MOVEMENT_TIME = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromMilliseconds(500);
    return UserCameraController;
}());



/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerAdapter", function() { return ServerAdapter; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _HUD_Chat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(115);
/* harmony import */ var _PayloadDecompressor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(120);
/* harmony import */ var _ServerConnectionManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(121);




var ServerAdapter = /** @class */ (function () {
    function ServerAdapter(Connection, authCookieName) {
        this.Connection = Connection;
        this.OnPayload = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["EventHandler1"]();
        this.OnLeaderboardUpdate = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["EventHandler1"]();
        this.OnForcedDisconnct = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["EventHandler"]();
        this.OnControlTransferred = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["EventHandler"]();
        this.OnPingRequest = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["EventHandler"]();
        this.OnMapResize = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["EventHandler1"]();
        this.OnMessageReceived = new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["EventHandler1"]();
        this._connectionManager = new _ServerConnectionManager__WEBPACK_IMPORTED_MODULE_3__["ServerConnectionManager"](authCookieName);
    }
    ServerAdapter.prototype.Negotiate = function () {
        var _this = this;
        var result = $.Deferred();
        this.Wire();
        this.Connection.start().then(function () {
            var userInformation = _this._connectionManager.PrepareRegistration();
            _this.TryInitialize(userInformation, function (initialization) {
                initialization.UserInformation = userInformation;
                _this._payloadDecompressor = new _PayloadDecompressor__WEBPACK_IMPORTED_MODULE_2__["PayloadDecompressor"](initialization.CompressionContracts);
                result.resolve(initialization);
                _this.Connection.invoke("readyForPayloads");
            });
        }, function (reason) { return console.error("Failed to negotiate with server inthe adapter: " + reason); });
        return result.promise();
    };
    ServerAdapter.prototype.Stop = function () {
        this.Connection.stop();
    };
    ServerAdapter.prototype.TryInitialize = function (userInformation, onComplete, count) {
        var _this = this;
        if (count === void 0) { count = 0; }
        this.Connection.invoke("initializeClient", userInformation.RegistrationID).then(function (initialization) {
            if (!initialization) {
                if (count >= ServerAdapter.NEGOTIATE_RETRIES) {
                    console.log("Could not negotiate with server, refreshing the page.");
                    window.location.reload();
                }
                else {
                    setTimeout(function () {
                        _this.TryInitialize(userInformation, onComplete, count + 1);
                    }, ServerAdapter.RETRY_DELAY.Milliseconds);
                }
            }
            else {
                onComplete(initialization);
            }
        });
    };
    ServerAdapter.prototype.Wire = function () {
        var _this = this;
        this.Connection.on("d", function (payload) {
            if (_this._payloadDecompressor) {
                _this.OnPayload.Trigger(_this._payloadDecompressor.Decompress(payload));
            }
        });
        this.Connection.on("l", function (leaderboardUpdate) {
            if (_this._payloadDecompressor) {
                _this.OnLeaderboardUpdate.Trigger(_this._payloadDecompressor.DecompressLeaderboard(leaderboardUpdate));
            }
        });
        this.Connection.on("disconnect", function () {
            _this.OnForcedDisconnct.Trigger();
        });
        this.Connection.on("controlTransferred", function () {
            _this.OnControlTransferred.Trigger();
        });
        this.Connection.on("pingBack", function () {
            _this.OnPingRequest.Trigger();
        });
        this.Connection.on("mapSizeIncreased", function (size) {
            _this.OnMapResize.Trigger(new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Size2d"](size.Width, size.Height));
        });
        this.Connection.on("chatMessage", function (from, message, type) {
            _this.OnMessageReceived.Trigger(new _HUD_Chat__WEBPACK_IMPORTED_MODULE_1__["ChatMessage"](from, message, type));
        });
    };
    ServerAdapter.NEGOTIATE_RETRIES = 3;
    ServerAdapter.RETRY_DELAY = _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["TimeSpan"].FromSeconds(1);
    return ServerAdapter;
}());



/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PayloadDecompressor", function() { return PayloadDecompressor; });
/* harmony import */ var _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _Powerups_HealthPack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(90);
/* harmony import */ var _Ships_Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55);



var PayloadDecompressor = /** @class */ (function () {
    function PayloadDecompressor(contracts) {
        this.PayloadContract = contracts.PayloadContract;
        this.CollidableContract = contracts.CollidableContract;
        this.ShipContract = contracts.ShipContract;
        this.BulletContract = contracts.BulletContract;
        this.LeaderboardEntryContract = contracts.LeaderboardEntryContract;
        this.PowerupContract = contracts.PowerupContract;
    }
    PayloadDecompressor.prototype.DecompressCollidable = function (obj) {
        return {
            Collided: !!obj[this.CollidableContract.Collided],
            CollidedAt: new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](obj[this.CollidableContract.CollidedAtX], obj[this.CollidableContract.CollidedAtY]),
            MovementController: {
                Forces: new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](obj[this.CollidableContract.ForcesX], obj[this.CollidableContract.ForcesY]),
                Mass: obj[this.CollidableContract.Mass],
                Position: new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](obj[this.CollidableContract.PositionX], obj[this.CollidableContract.PositionY]),
                Rotation: obj[this.CollidableContract.Rotation] * .0174532925,
                Velocity: new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](obj[this.CollidableContract.VelocityX], obj[this.CollidableContract.VelocityY])
            },
            LifeController: {
                Alive: obj[this.CollidableContract.Alive],
                Health: obj[this.CollidableContract.Health]
            },
            ID: obj[this.CollidableContract.ID],
            Disposed: !!obj[this.CollidableContract.Disposed]
        };
    };
    PayloadDecompressor.prototype.DecompressShip = function (ship) {
        var result = this.DecompressCollidable(ship);
        result.MovementController.Position = result.MovementController.Position.Add(_Ships_Ship__WEBPACK_IMPORTED_MODULE_2__["Ship"].SIZE.Multiply(.5));
        result.MovementController.Moving = {
            RotatingLeft: !!ship[this.ShipContract.RotatingLeft],
            RotatingRight: !!ship[this.ShipContract.RotatingRight],
            Forward: !!ship[this.ShipContract.Forward],
            Backward: !!ship[this.ShipContract.Backward]
        };
        result.Name = ship[this.ShipContract.Name];
        result.MaxLife = ship[this.ShipContract.MaxLife];
        result.Level = ship[this.ShipContract.Level];
        result.Abilities = {
            Boost: ship[this.ShipContract.Boost]
        };
        return result;
    };
    PayloadDecompressor.prototype.DecompressBullet = function (bullet) {
        var result = this.DecompressCollidable(bullet);
        result.DamageDealt = bullet[this.BulletContract.DamageDealt];
        return result;
    };
    PayloadDecompressor.prototype.DecompressLeaderboardEntry = function (data) {
        return {
            Name: data[this.LeaderboardEntryContract.Name],
            Photo: data[this.LeaderboardEntryContract.Photo],
            ID: data[this.LeaderboardEntryContract.ID],
            Level: data[this.LeaderboardEntryContract.Level],
            Kills: data[this.LeaderboardEntryContract.Kills],
            Deaths: data[this.LeaderboardEntryContract.Deaths],
            Position: 0
        };
    };
    PayloadDecompressor.prototype.DecompressPowerup = function (data) {
        return {
            MovementController: {
                Position: new _endgate_endgate__WEBPACK_IMPORTED_MODULE_0__["Vector2d"](data[this.PowerupContract.PositionX] + _Powerups_HealthPack__WEBPACK_IMPORTED_MODULE_1__["HealthPack"].SIZE.HalfWidth, data[this.PowerupContract.PositionY] + _Powerups_HealthPack__WEBPACK_IMPORTED_MODULE_1__["HealthPack"].SIZE.HalfHeight),
                Rotation: 0
            },
            ID: data[this.PowerupContract.ID],
            Disposed: data[this.PowerupContract.Disposed],
            Type: data[this.PowerupContract.Type],
            LifeController: {
                Alive: true,
                Health: 0
            }
        };
    };
    PayloadDecompressor.prototype.DecompressPayload = function (data) {
        return {
            Ships: data[this.PayloadContract.Ships],
            LeaderboardPosition: data[this.PayloadContract.LeaderboardPosition],
            Kills: data[this.PayloadContract.Kills],
            Deaths: data[this.PayloadContract.Deaths],
            Powerups: data[this.PayloadContract.Powerups],
            Bullets: data[this.PayloadContract.Bullets],
            ShipsInWorld: data[this.PayloadContract.ShipsInWorld],
            BulletsInWorld: data[this.PayloadContract.BulletsInWorld],
            Experience: data[this.PayloadContract.Experience],
            ExperienceToNextLevel: data[this.PayloadContract.ExperienceToNextLevel],
            Notification: data[this.PayloadContract.Notification],
            LastCommandProcessed: data[this.PayloadContract.LastCommandProcessed],
            KilledByName: data[this.PayloadContract.KilledByName],
            KilledByPhoto: data[this.PayloadContract.KilledByPhoto]
        };
    };
    PayloadDecompressor.prototype.DecompressLeaderboard = function (data) {
        var payload = [];
        for (var i = 0; i < data.length; i++) {
            var item = this.DecompressLeaderboardEntry(data[i]);
            item.Position = i + 1;
            payload.push(item);
        }
        return payload;
    };
    PayloadDecompressor.prototype.Decompress = function (data) {
        var payload = this.DecompressPayload(data), i = 0;
        for (i = 0; i < payload.Ships.length; i++) {
            payload.Ships[i] = this.DecompressShip(payload.Ships[i]);
        }
        for (i = 0; i < payload.Bullets.length; i++) {
            payload.Bullets[i] = this.DecompressBullet(payload.Bullets[i]);
        }
        for (i = 0; i < payload.Powerups.length; i++) {
            payload.Powerups[i] = this.DecompressPowerup(payload.Powerups[i]);
        }
        return payload;
    };
    return PayloadDecompressor;
}());



/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerConnectionManager", function() { return ServerConnectionManager; });
var ServerConnectionManager = /** @class */ (function () {
    function ServerConnectionManager(_authCookieName) {
        this._authCookieName = _authCookieName;
    }
    ServerConnectionManager.prototype.PrepareRegistration = function () {
        var stateCookie = $.cookie(this._authCookieName), state = stateCookie ? JSON.parse(stateCookie) : {}, registrationID = state.RegistrationID;
        if (registrationID) {
            delete state.RegistrationID;
            // Re-update the registration cookie
            $.cookie(this._authCookieName, JSON.stringify(state), { path: '/', expires: 30 });
            return {
                Name: state.DisplayName,
                Photo: state.Photo,
                RegistrationID: registrationID
            };
        }
        else {
            throw new Error("Registration ID not available.");
        }
    };
    return ServerConnectionManager;
}());



/***/ })
/******/ ]);
});
//# sourceMappingURL=shootR.js.map