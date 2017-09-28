## createTexture <-> createTextures

* param "options" in createTextures is optional, but in createTexture not.



# How to write type definition tests

## from https://github.com/types/_generator-typings#about-writing-tests-for-typings

Simply shape test (like those in DefinitelyTyped) is not sufficient. Since there is no type in javascript, even if you create a wrong signature, you won't detect it until runtime.

e.g.

```js
// source code
function foo(something) {
  return something++;
}
```

The source code expects something to be a number. If you write your typings as:

```js
function foo(something: string): string;
```

It won't fail until you use it. i.e.

```js
// consumer program
import foo ....somehow

let x = "abc";
foo(x);
```

Because your typings provide guidance to the consumer, they will write their code that way and will fail when they run it. tsc will compile fine.


## npm package: [typescript-definition-tester](https://www.npmjs.com/package/typescript-definition-tester)

## mocha with ts

https://journal.artfuldev.com/write-tests-for-typescript-projects-with-mocha-and-chai-in-typescript-86e053bdb2b6

* ts-node

package.json:

```json
"test-ts": "mocha -r ts-node/register test/src/ts/twgl.d.ts-test.ts"
```

error: `window is not defined`

possbible solutions:

1. install jsdom-global [like here suggested](https://stackoverflow.com/questions/34059644/mocha-command-giving-referenceerror-window-is-not-defined)
    * the WebGLRenderingContext is not included
    * npm package `canvas` has to be installed, which installation is different on each OS **so this is not a good solution**.
1. install `gl` to only get 
    * prolematic when installing (could not be installed on my system Win7)
1. run the mocha test in html file via browser
    * I guess this is not good for the automatic testing workflow (combine with 'npm build', ...), as result is isolated in the browser
    * html could be started manually, or via `npm run test-ts` which starts a browser window (npm package like `lite-server` has to be installed)
    * one way to do this: https://stackoverflow.com/questions/42857778/how-do-you-run-mocha-tests-in-the-browser
1. run mocha test with karma in browser


## compile test.ts file, check for errors, and test ouput js with mocha in the browser

npm install

```bash
npm i --save-dev @types/mocha

```

test.ts

```ts
/// <reference path="../../../src/twgl.d.ts" />
import * as twgl from '../../../dist/twgl.js';

// if above is not getting recognized by editors tsc (as module name is twgl.js - not twgl): than use instead following line,
// and configure twgl.js path in tsconfig: compileOptions: { "paths": {"twgl.js": ["dist/3.x/twgl.js"]} }

// import * as twgl from 'twgl.js';

import 'mocha';

let canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.width = 500;
canvas.height = 400;

let gl: WebGLRenderingContext = canvas.getContext('webgl');

describe('something', function() {
  it('should return a WebGLRenderingContext', function() {

    let gl: WebGLRenderingContext = canvas.getContext('webgl');

    gl.should.
  })
})
```

test.html

```html
<html>
    <head>
      <meta charset="utf-8">
      <title>Mocha Tests</title>
      <link href="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.css" rel="stylesheet" />
    </head>
    <body>
      <div id="mocha"></div>
    
      <script src="https://cdn.rawgit.com/jquery/jquery/2.1.4/dist/jquery.min.js"></script>
      <script src="https://cdn.rawgit.com/Automattic/expect.js/0.3.1/index.js"></script>
      <script src="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.js"></script>
    
      <script>mocha.setup('bdd')</script>
      <script src="./test1.js"></script>
      <!-- <script src="test.object.js"></script>
      <script src="test.xhr.js"></script> -->
      <script>
        mocha.checkLeaks();
        mocha.globals(['jQuery']);
        mocha.run();
      </script>
    </body>
</html>
```

package.json

```json
"test-ts" : "tsc test/src/ts/test.ts --outFile test/src/ts/test.js --module amd --allowJs && lite-server baseDir test/src/ts/test.html"
```

* requires lite-server to open html in default browser - maybe there's a simplier solution
