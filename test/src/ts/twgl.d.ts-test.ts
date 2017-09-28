
/// <reference path="../../../src/twgl.d.ts" />
import * as twgl from '../../../dist/twgl.js';
// import * as twgl from 'twgl.js';
// import * as should from 'should';
// import * as tsNode from 'ts-node';
import 'mocha';
// import * as should from 'should';

declare module requirejs {
    function config(any);
};

requirejs.config({
    baseUrl: 'lib',
    paths: {
        'App':'../app'
    }
});

export function bla() {console.log('bla')}
module.exports = {blub : 3};


let canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.width = 500;
canvas.height = 400;

let gl: WebGLRenderingContext = canvas.getContext('webgl');
// let gl: WebGLRenderingContext = new WebGLRenderingContext();

describe('Sum', function() {
    it('should be 2 when adding 1+1', function() {
        return (1+1 == 2);
    })
})

console.log('Hello');

twgl.addExtensionsToContext(gl);

// console.log(twgl);