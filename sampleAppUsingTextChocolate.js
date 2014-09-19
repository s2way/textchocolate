/*jslint devel: true, node: true, indent: 4, vars: true, maxlen: 256 */
'use strict';

// In your project you will change for require('TextChocolate');
var TextChocolate = require('./src/TextChocolate');
var tc = new TextChocolate('./sampleTranslateFile.json', 'pt-BR'), _T = tc.translate;
// Do you expect anything else? ;)
console.log(_T('hello_world'));
tc.lang('de-DE');
console.log(_T('hello_world'));
var amount = 1;
console.log(_T('beer_please', amount));
amount += 1;
console.log(_T('beer_please', amount));
tc.lang('pt-BR');
amount = 1;
console.log(_T('beer_please', amount));
amount += 1;
console.log(_T('beer_please', amount));
