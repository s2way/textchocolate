/*jslint devel: true, node: true, indent: 4, vars: true, maxlen: 256 */
'use strict';

var fs = require('fs');
var crypto = require('crypto');

function TextChocolate(translationJsonFile, i18n) {
    var stats = fs.lstat(translationJsonFile);
    if (!stats.isFile) {
        throw new Error("The file does not exist!");
    }
    this.defaultLang = 'en-US';
    this.lang(i18n);

    (function transformJsonFile2HashFunctions () {
        var i, json = JSON.parse(fs.readFileSync(translationJsonFile, 'utf8'));
        for (i in json) {
            console.log(i);
        }
    }());
}

TextChocolate.prototype.lang = function (i18n) {
    this.i18n = i18n || this.defaultLang;
};

TextChocolate.prototype.hash = function (msg) {
    return crypto.createHash('sha1').update(msg).digest('hex');
};

TextChocolate.prototype.translate = function (msg, n) {
    if (!msg) {
        return '';
    }
    try {
        
    } catch (e) {
        // any error will return the original msg 
        return msg;
    }
};

module.exports = TextChocolate;