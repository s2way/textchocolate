/*jslint devel: true, node: true, indent: 4, vars: true, maxlen: 256 */

'use strict';

var fs = require('fs');

var __apply = function (context, func) {
    return function () {
        return func.apply(context, arguments);
    };
};

function TextChocolate(translationJsonFile, i18n) {
    if (!fs.existsSync(translationJsonFile)) {
        throw new Error('FileNotFound');
    }
    var stats = fs.lstatSync(translationJsonFile);
    if (!stats.isFile()) {
        throw new Error('InvalidFile');
    }
    this.defaultLang = 'en-US';
    this.lang(i18n);
    this.data = {};
    var $this = this;
    (function transformJsonFile2HashFunctions() {
        $this.data = JSON.parse(fs.readFileSync(translationJsonFile, 'utf8'));
    }());
    var i;
    for (i in TextChocolate.prototype) {
        if (TextChocolate.prototype.hasOwnProperty(i)) {
            this[i] = __apply(this, this[i]);
        }
    }
}

TextChocolate.prototype.lang = function (i18n) {
    this.i18n = i18n || this.defaultLang;
};

TextChocolate.prototype.translate = function (msg, n) {
    if (!msg) {
        return '';
    }
    var message = this.data[msg];
    if (message !== undefined) {
        var language = message[this.i18n];
        if (language !== undefined) {
            var p = (n !== undefined && n > 1) ? 'p' : 's';
            var translation = language[p];
            if (translation !== undefined) {
                return translation;
            }
        }
    }
    return msg;
};

module.exports = TextChocolate;