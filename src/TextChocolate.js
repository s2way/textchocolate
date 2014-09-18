/*jslint devel: true, node: true, indent: 4, vars: true, maxlen: 256 */
'use strict';

var fs = require('fs');

function TextChocolate(translationJsonFile, i18n) {
    var stats = fs.lstat(translationJsonFile);
    if (!stats.isFile) {
        throw new Error("The file does not exist!");
    }
    this.defaultLang = 'en-US';
    this.lang(i18n);

    (function transformTheJsonFileIntoHashFunctions () {
        var json = JSON.parse(fs.readFileSync(translationJsonFile, 'utf8'));
    }())
}

TextChocolate.prototype.lang = function (i18n) {
    this.i18n = i18n || this.defaultLang;
};