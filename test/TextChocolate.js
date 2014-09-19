/*jslint devel: true, node: true, indent: 4 */
/*globals describe, it, beforeEach */
'use strict';

var TextChocolate = require('./../src/TextChocolate');
var expect = require('expect.js');
var path = require('path');

describe('TextChocolate.js', function () {

    var tc;

    beforeEach(function () {
        tc = new TextChocolate(path.resolve('./sampleTranslateFile.json'));
    });

    describe('lang', function () {
        it('should change the current i18n', function () {
            tc.lang('pt-BR');
            expect(tc.i18n).to.be.equal('pt-BR');
        });
    });

});
