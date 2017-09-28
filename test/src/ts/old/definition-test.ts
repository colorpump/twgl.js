
/// <reference path="../../../src/twgl.d.ts" />
import * as twgl from '../../../dist/twgl.js';

import * as ts from 'typescript';
import * as tt from "typescript-definition-tester";
import * as fs from "fs";

describe('ambient declaration tests', () => {
    it('should compile examples successfully against my-module.d.ts', (done) => {
        tt.compileDirectory(
            __dirname + '/examples',
            (fileName: string) => fileName.indexOf('.ts') > -1,
            () => done()
        );
    });
});
