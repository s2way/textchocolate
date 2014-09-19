/*jslint devel: true, node: true, indent: 4, vars: true, maxlen: 256 */

'use strict';

var fs = require('fs');
var crypto = require('crypto');
var util = require('util');

var __apply = function (context, func) {
    return function () {
        return func.apply(context, arguments);
    };
};

function TextChocolate(translationJsonFile, i18n) {
    if (!fs.existsSync(translationJsonFile)) {
        throw new Error('The file does not exist!');
    }
    var stats = fs.lstatSync(translationJsonFile);
    if (!stats.isFile()) {
        throw new Error('Something went wrong!');
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
    try {
        var message = this.data[msg];
        if (message !== undefined) {
            var language = message[this.i18n];
            if (language !== undefined) {
                var p = (n !== undefined && n > 1) ? 'p' : 's';
                var translation = language[p];
                if (translation !== undefined) {
                    return (n !== undefined) ? util.format(translation, n) : translation;
                }
            }
        }
        return msg;
    } catch (e) {
        console.log(e);
        // any error will return the original msg 
        return msg;
    }
};

module.exports = TextChocolate;