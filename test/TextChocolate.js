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

    describe('translate', function () {
        it('should return a blank string if there is no msg', function () {
            expect(tc.translate()).to.be.equal('');
        });
        it('should return the key if the key string was not found', function () {
            expect(tc.translate('Oi')).to.be.equal('Oi');
        });
        it('should return the key if the i18n was not found', function () {
            tc.lang('ru-RU');
            expect(tc.translate('hello_world')).to.be.equal('hello_world');
        });
        it('should return the singular translation', function () {
            tc.lang('pt-BR');
            expect(tc.translate('hello_world')).to.be.equal('Oi mundo!');
        });
        it('should return the plural translation', function () {
            tc.lang('pt-BR');
            expect(tc.translate('beer_please', 2)).to.be.equal('%d cervejas, por favor.');
        });
    });

    describe('TextChocolate', function () {
        it('should throw an error if the translate file does not exist', function () {
            expect(function () {
                var x = new TextChocolate('it/must/not/exist');
                // smart jslint
                x = x.toString();
            }).to.throwException(function (e) {
                expect(e).to.be.a(Error);
            });
        });
        it('should throw an error if the translate file is not a file', function () {
            expect(function () {
                // We hope you are a unix user ;)
                var x = new TextChocolate('/tmp');
                // smart jslint
                x = x.toString();
            }).to.throwException(function (e) {
                expect(e).to.be.a(Error);
            });
        });
    });

});
