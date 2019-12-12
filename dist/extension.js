module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/extension.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/cells/cell-label.ts":
/*!********************************************!*\
  !*** ./src/components/cells/cell-label.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CellLabelConstructor; });
function matchArray(arr, reg) {
    let matches = [];
    for (let str of arr) {
        let match = str.match(reg);
        if (!match) {
            return [];
        }
        matches.push(match.slice(1));
    }
    return matches;
}
function CellLabelConstructor(label, input) {
    let matches = [];
    const input_rows = input.split(/\r\n|\r|\n/);
    const re1 = /(\d{1,4})(?:[\.\)\]]{1})\s*(.*)/;
    const reCatchAll = /(.*)/;
    const matches_re1 = matchArray(input_rows, re1);
    const matches_reCatchAll = matchArray(input_rows, reCatchAll);
    if (matches_re1) {
        matches = matches_re1.map((el) => ({ label: `${label}${el[0]}`, content: el[1] }));
    }
    else if (matches_reCatchAll) {
        matches = matches_reCatchAll.map((el, idx) => ({ label: `${label}${idx + 1}`, content: el[0] }));
    }
    return matches;
}


/***/ }),

/***/ "./src/components/cells/cell.ts":
/*!**************************************!*\
  !*** ./src/components/cells/cell.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CellConstructor; });
/* harmony import */ var _cell_label__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell-label */ "./src/components/cells/cell-label.ts");

class CellConstructor {
    constructor(type) {
        this.extra = '';
        this.prelabel = '';
        this.extraCheck = undefined;
        this.type = type;
    }
    run(input) {
        switch (this.type) {
            case 'row':
                this.prelabel = 'r';
                this.extraCheck = /(other.*?specify)/i;
                break;
            case 'col':
                this.prelabel = 'c';
                break;
            case 'choice':
                this.prelabel = 'ch';
                break;
            case 'case':
                this.prelabel = 'c';
                break;
            default:
                break;
        }
        let constructed_cells = Object(_cell_label__WEBPACK_IMPORTED_MODULE_0__["default"])(this.prelabel, input);
        if (this.type === 'case') {
            constructed_cells.push({ label: 'c999', content: 'BAD PIPE' });
        }
        let cells = constructed_cells.map(({ label, content }, idx) => {
            if (this.type === 'row' && this.extraCheck && this.extraCheck.test(content)) {
                this.extra = ' open="1" openSize="25" randomize="0"';
            }
            if (this.type === 'case') {
                this.extra = ((idx + 1) === cells.length) ? ' cond="1"' : ' cond=""';
            }
            return `  <${this.type} label="${label}"${this.extra}>${content.trim()}</${this.type}>`;
        });
        return cells.join('\n');
    }
}


/***/ }),

/***/ "./src/components/index.ts":
/*!*********************************!*\
  !*** ./src/components/index.ts ***!
  \*********************************/
/*! exports provided: CellConstructor, QuestionConstructor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cells_cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cells/cell */ "./src/components/cells/cell.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CellConstructor", function() { return _cells_cell__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _questions_question__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./questions/question */ "./src/components/questions/question.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuestionConstructor", function() { return _questions_question__WEBPACK_IMPORTED_MODULE_1__["default"]; });






/***/ }),

/***/ "./src/components/questions/question-label.ts":
/*!****************************************************!*\
  !*** ./src/components/questions/question-label.ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return QuestionLabelConstructor; });
function QuestionLabelConstructor(input) {
    const search_for_cells = /<row|<col|<choice|<style|<group|<net|<exec|<validate|\@([^c][^\s]*)/;
    const search_for_comment = /\@c\s*/;
    const search_for_question = /^(?:\[)*\s*([A-Za-z0-9_]+)\s*(?:\.|\]|\))*\s*([^]*)$/i;
    let beginning_cells = input.search(search_for_cells);
    beginning_cells = (beginning_cells === -1) ? input.length : beginning_cells;
    let question = input.substr(0, beginning_cells);
    let question_cells = input.substr(beginning_cells);
    question = question.trim().replace(/[\n\r]{1,}/g, '\n<br/><br/>\n');
    const question_list = question.split(search_for_comment);
    let question_comment = question_list.slice(1)[0];
    question = question.slice(0)[0];
    let matches = question.match(search_for_question);
    if (!matches) {
        return false;
    }
    const question_label = matches[1];
    const question_text = matches[2];
    return {
        question_cells: question_cells,
        question_label: question_label.trim(),
        question_text: question_text.trim(),
        question_comment: question_comment
    };
}


/***/ }),

/***/ "./src/components/questions/question.ts":
/*!**********************************************!*\
  !*** ./src/components/questions/question.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return QuestionConstructor; });
/* harmony import */ var _question_label__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./question-label */ "./src/components/questions/question-label.ts");

class QuestionConstructor {
    constructor(type) {
        this.extra = '';
        this.comment = '';
        this.type = type;
    }
    run(input) {
        const question = Object(_question_label__WEBPACK_IMPORTED_MODULE_0__["default"])(input);
        if (!question) {
            return false;
        }
        switch (this.type) {
            case 'checkbox':
                this.extra = ' atleast="1"';
                this.comment = 'Please select all that apply';
                let new_cells = question.question_cells.split(/\n/).map((line) => {
                    let new_line;
                    const test_dk = /none of the.*|not sure|don't know/i;
                    if (/<row/.test(line) && test_dk.test(line)) {
                        new_line = line.replace(/(\s*<row label=[^\>]*)/, '$1 exclusive="1" randomize="0"');
                        return new_line;
                    }
                    return line;
                });
                question.question_cells = new_cells.join('\n');
                break;
            case 'float':
                this.extra = ' size="6" optional="0"';
                break;
            case 'number':
                this.extra = ' size="6" optional="0"';
                this.comment = 'Please enter a whole number';
                break;
            case 'radio':
                this.comment = 'Please select one';
                if ((question.question_cells.indexOf('<row') !== -1) && (question.question_cells.search(/<col|<choice/) !== -1)) {
                    this.comment = 'Please select one in each row';
                }
                break;
            case 'select':
                this.extra = ' optional="0"';
                break;
            case 'text':
                this.extra = ' size="40" optional="0"';
                this.comment = 'Please be as specific as possible';
                break;
            case 'textarea':
                this.extra = ' optional="0"';
                this.comment = 'Please be as specific as possible';
                break;
            default:
                break;
        }
        if (question.question_comment) {
            this.comment = question.question_comment.trim().replace(/^\(/g, '').replace(/[\)\.]*\s*$/g, '');
        }
        this.comment = `<comment>${this.comment}</comment>`;
        let question_constructed = `<${this.type} label="${question.question_label}"${this.extra}>
  <title>${question.question_text}</title>
  ${this.comment}
  ${question.question_cells}
</${this.type}>`;
        return question_constructed;
    }
}


/***/ }),

/***/ "./src/extension.ts":
/*!**************************!*\
  !*** ./src/extension.ts ***!
  \**************************/
/*! exports provided: activate, deactivate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activate", function() { return activate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deactivate", function() { return deactivate; });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vscode */ "vscode");
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _processSelection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./processSelection */ "./src/processSelection.ts");
/* harmony import */ var _insert_nums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./insert_nums */ "./src/insert_nums/index.ts");



function activate(context) {
    const actions = [
        ['extension.ezfvRow', _processSelection__WEBPACK_IMPORTED_MODULE_1__["row"]],
        ['extension.ezfvCol', _processSelection__WEBPACK_IMPORTED_MODULE_1__["col"]],
        ['extension.ezfvChoice', _processSelection__WEBPACK_IMPORTED_MODULE_1__["choice"]],
        ['extension.ezfvPipe', _processSelection__WEBPACK_IMPORTED_MODULE_1__["pipe"]],
        ['extension.ezfvRadio', _processSelection__WEBPACK_IMPORTED_MODULE_1__["radio"]],
        ['extension.ezfvCheckbox', _processSelection__WEBPACK_IMPORTED_MODULE_1__["checkbox"]],
        ['extension.ezfvFloat', _processSelection__WEBPACK_IMPORTED_MODULE_1__["float"]],
        ['extension.ezfvNumber', _processSelection__WEBPACK_IMPORTED_MODULE_1__["number"]],
        ['extension.ezfvSelect', _processSelection__WEBPACK_IMPORTED_MODULE_1__["select"]],
        ['extension.ezfvText', _processSelection__WEBPACK_IMPORTED_MODULE_1__["text"]],
        ['extension.ezfvTextarea', _processSelection__WEBPACK_IMPORTED_MODULE_1__["textarea"]],
        ['extension.ezfvStrip', _processSelection__WEBPACK_IMPORTED_MODULE_1__["strip"]],
        ['extension.ezfvInsertNums', _insert_nums__WEBPACK_IMPORTED_MODULE_2__["default"]],
    ];
    const subs = actions.map((pair) => {
        const [name, func] = pair;
        return vscode__WEBPACK_IMPORTED_MODULE_0__["commands"].registerCommand(...pair);
    });
    context.subscriptions.push(...subs);
}
// this method is called when your extension is deactivated
function deactivate() {
}


/***/ }),

/***/ "./src/helpers/clean_text.ts":
/*!***********************************!*\
  !*** ./src/helpers/clean_text.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CleanText; });
function CleanText(input) {
    let text = input.replace(/\n{2,}/g, '\n');
    // replace(u"\u2019", "'").
    // replace(u"\u2018", "'").
    // replace(u"\u201C", "\"").
    // replace(u"\u201D", "\"").
    // replace(u"\u2014", '&amp;mdash;').replace(u"\u2013", '&amp;ndash;')
    // re.sub('&\s', '&amp; ',input)
    return text;
}


/***/ }),

/***/ "./src/helpers/one_offs/one_offs.ts":
/*!******************************************!*\
  !*** ./src/helpers/one_offs/one_offs.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OneOffPointer; });
/* harmony import */ var _pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pipe */ "./src/helpers/one_offs/pipe.ts");
/* harmony import */ var _strip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./strip */ "./src/helpers/one_offs/strip.ts");


class OneOffPointer {
    constructor(type) {
        this.func_list = {
            pipe: _pipe__WEBPACK_IMPORTED_MODULE_0__["default"],
            strip: _strip__WEBPACK_IMPORTED_MODULE_1__["default"]
        };
        this.func = this.func_list[type];
    }
    run(input) {
        return this.func(input);
    }
}


/***/ }),

/***/ "./src/helpers/one_offs/pipe.ts":
/*!**************************************!*\
  !*** ./src/helpers/one_offs/pipe.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PipeConstuctor; });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components */ "./src/components/index.ts");

function PipeConstuctor(input) {
    const cc = new _components__WEBPACK_IMPORTED_MODULE_0__["CellConstructor"]('case');
    let pipe_cells = cc.run(input);
    let pipe = `<pipe label="" capture="">
${pipe_cells}
</pipe>`;
    return pipe;
}


/***/ }),

/***/ "./src/helpers/one_offs/strip.ts":
/*!***************************************!*\
  !*** ./src/helpers/one_offs/strip.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StripTag; });
function StripTag(input) {
    const find_label = /(<.*? label=".*?"[^>]*>)([^]*?)(<\/.*?>)/ig;
    return input.replace(/(\s*<.*? label=".*?"[^>]*>)([^]*?)(<\/.*?>\s*)/ig, "$2\n");
}


/***/ }),

/***/ "./src/helpers/window.ts":
/*!*******************************!*\
  !*** ./src/helpers/window.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vscode */ "vscode");
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (function () {
    const editor = vscode__WEBPACK_IMPORTED_MODULE_0__["window"].activeTextEditor;
    const document = editor ? editor.document : undefined;
    const selections = editor ? editor.selections : undefined;
    return {
        window: vscode__WEBPACK_IMPORTED_MODULE_0__["window"],
        editor,
        document,
        selections
    };
});


/***/ }),

/***/ "./src/insert_nums/index.ts":
/*!**********************************!*\
  !*** ./src/insert_nums/index.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/window */ "./src/helpers/window.ts");
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vscode */ "vscode");
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_1__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class InsertNums {
    constructor(sp) {
        this.alpha = false;
        this.upperCase = true;
        const { editor, selections } = Object(_helpers_window__WEBPACK_IMPORTED_MODULE_0__["default"])();
        this.e = editor;
        this.sels = selections;
        this.current = sp;
        if (isNaN(sp) && typeof (sp) === 'string') {
            this.alpha = true;
            if (sp === sp.toLocaleLowerCase()) {
                this.upperCase = false;
            }
        }
    }
    alpha_to_num(l) {
        return l.split('').reduce((r, x) => r * 26 + parseInt(x, 36) - 9, 0) - 1;
    }
    num_to_alpha(i) {
        let num = i + 1;
        let ret = '';
        for (let a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
            ret = String.fromCharCode(parseInt(`${(num % b) / a}`) + 65) + ret;
        }
        return ret;
    }
    update() {
        try {
            if (this.alpha) {
                const idx = this.alpha_to_num(this.current);
                const alpha = this.num_to_alpha(idx + 1);
                this.current = this.upperCase ? alpha.toUpperCase() : alpha.toLowerCase();
            }
            else {
                this.current = (+this.current) + 1;
            }
        }
        catch (e) {
            throw e;
        }
    }
    run() {
        this.e.edit((edit) => {
            this.sels.forEach((sel) => {
                edit.replace(sel, this.current.toString());
                this.update();
            });
        });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (function () {
    return __awaiter(this, void 0, void 0, function* () {
        const starting_point = yield vscode__WEBPACK_IMPORTED_MODULE_1__["window"].showInputBox({
            placeHolder: 'Enter a starting point'
        });
        const insertnums = new InsertNums(starting_point);
        return insertnums.run();
    });
});


/***/ }),

/***/ "./src/processSelection.ts":
/*!*********************************!*\
  !*** ./src/processSelection.ts ***!
  \*********************************/
/*! exports provided: row, col, choice, pipe, strip, radio, checkbox, float, number, select, text, textarea */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "row", function() { return row; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "col", function() { return col; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "choice", function() { return choice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return pipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strip", function() { return strip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "radio", function() { return radio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkbox", function() { return checkbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "float", function() { return float; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number", function() { return number; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select", function() { return select; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "text", function() { return text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "textarea", function() { return textarea; });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vscode */ "vscode");
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_clean_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/clean_text */ "./src/helpers/clean_text.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components */ "./src/components/index.ts");
/* harmony import */ var _helpers_one_offs_one_offs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/one_offs/one_offs */ "./src/helpers/one_offs/one_offs.ts");
/* harmony import */ var _helpers_window__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/window */ "./src/helpers/window.ts");





function processSelection(task) {
    const { editor, document, selections, window, } = Object(_helpers_window__WEBPACK_IMPORTED_MODULE_4__["default"])();
    if (editor && selections && document) {
        editor.edit((edit) => {
            selections.forEach((sel) => {
                let txt = Object(_helpers_clean_text__WEBPACK_IMPORTED_MODULE_1__["default"])(document.getText(new vscode__WEBPACK_IMPORTED_MODULE_0__["Range"](sel.start, sel.end))).trim();
                txt = task.run(txt);
                if (txt.length) {
                    return edit.replace(sel, txt);
                }
                else {
                    return window.showInformationMessage('Looks like something went wrong');
                }
            });
        });
    }
}
const row = () => processSelection(new _components__WEBPACK_IMPORTED_MODULE_2__["CellConstructor"]('row'));
const col = () => processSelection(new _components__WEBPACK_IMPORTED_MODULE_2__["CellConstructor"]('col'));
const choice = () => processSelection(new _components__WEBPACK_IMPORTED_MODULE_2__["CellConstructor"]('choice'));
const pipe = () => processSelection(new _helpers_one_offs_one_offs__WEBPACK_IMPORTED_MODULE_3__["default"]('pipe'));
const strip = () => processSelection(new _helpers_one_offs_one_offs__WEBPACK_IMPORTED_MODULE_3__["default"]('strip'));
const radio = () => processSelection(new _components__WEBPACK_IMPORTED_MODULE_2__["QuestionConstructor"]('radio'));
const checkbox = () => processSelection(new _components__WEBPACK_IMPORTED_MODULE_2__["QuestionConstructor"]('checkbox'));
const float = () => processSelection(new _components__WEBPACK_IMPORTED_MODULE_2__["QuestionConstructor"]('float'));
const number = () => processSelection(new _components__WEBPACK_IMPORTED_MODULE_2__["QuestionConstructor"]('number'));
const select = () => processSelection(new _components__WEBPACK_IMPORTED_MODULE_2__["QuestionConstructor"]('select'));
const text = () => processSelection(new _components__WEBPACK_IMPORTED_MODULE_2__["QuestionConstructor"]('text'));
const textarea = () => processSelection(new _components__WEBPACK_IMPORTED_MODULE_2__["QuestionConstructor"]('textarea'));


/***/ }),

/***/ "vscode":
/*!*************************!*\
  !*** external "vscode" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vscode");

/***/ })

/******/ });
//# sourceMappingURL=extension.js.map