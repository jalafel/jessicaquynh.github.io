---
layout: post
title:  "Node-serialport Inquiry and Native Modules in Node.js"
description: "How exactly does node-serialport build as a native module?"
tags: [outreachy, nodejs]
---

These past few weeks have been a bit of a challenge. No excuses here, but my
main machine was out of commission for a little while. And ultimately, the 
state of the world certainly made an impact in general feelings of security,
in spite of my privilege as a Canadian.

Nonetheless, as they say, on with the show! In the past few weeks I've been 
doing more study and inquiry into [`node-serialport`][] and learning exactly 
how they it is built. I have finally published my piece on [Node Streams][], 
and still continuing to contribute to the repos.

### Building Native Modules

#### Bindings

I learned a lot about the abstraction layers in `node-serialport`. Starting off 
with the JavaScript layer, most of the function calls uses the syntax 
`bindings` to wrap the JavaScript calls around the native code (C++).


[Example From Node-serialport][]:
```javascript

'use strict';
const binding = require('bindings')('serialport.node');

```

The entire stack call to create a serialport in node goes something like this:
  * Serialport is created and machine bindings is determined in the entry point.
  * Serialport object determines bindings by file [`auto-detect.js`][]
  * Binding is set in [Serialport constructor call][].
  * [node-bindings][] calls machine specific C++ source code
  * Every function call will use machine-targetted functions


The first question I had is what exactly is bindings? Well, it turns out that 
it's a library used to port native modules more easily in Node.js, which removes 
the overhead of requiring your C++ files in your header.

Instead of:
```javascript
const binding = require('./src/linux-binding')
```

Bindings.js shortens the string to:
```javascript
const binding = require('bindings')('serialport.node')
```

The machine specific C++ file is determined by the [`binding.gyp`][] file which 
is specified by the author of the package.

#### NaN (Native Abstractions for Node.js) Methods

The native code can be written exactly as one would normally write C++ code.
The Node.js [Addon documentation][] does a wonderful outlining exactly how one
would go about writing a common "Hello World" program in C++ and running it
as a node module.

With respects to the UNIX philosophy of using tools when possible, there have 
been packages built to help aid in the process. In particular, [`NaN`][] is one
of these libraries and is recommended because it is maintained by the Node 
Foundation, which helps support multiple versions of Node.js as changes are
introduced.

`NaN` allows you to wrap around your C++ functions so that they can be used and
manipulated by Javascript. More importantly, it provides the same wrappers for 
Node.js classes and their respective functions. Finally, it helps access V8
and libuv function calls that are version specific, so if you write your native 
code using `NaN`, you do not need to worry about future implementations of Node.js. 

This abstraction layer acts as a compatibility layer and handles all the 
versioning overhead for you. 🎉

A lot of credit is due to this resource here over at [Rising Stack][] on 
building native modules with Node.js, with great provided examples.
### Documentation on Backpressure

Working on a pull request to write a [guide on backpressuring][]! It's been
a great learning experience. 

Thank you @addaleax and @mcollina for all their time to help me figure out most 
of the backpressuring. 


[`node-serialport`]: https://github.com/EmergingTechnologyAdvisors/node-serialport
[Node-Streams]: https://medium.com/@jessica.quynh.tran/a-brief-history-of-node-streams-pt-1-3401db451f21#.exlelk719
[Example From Node-serialport]: https://github.com/EmergingTechnologyAdvisors/node-serialport/blob/master/lib/bindings/linux.js#L1-L2
[Serialport constructor call]: https://github.com/EmergingTechnologyAdvisors/node-serialport/blob/master/lib/serialport.js#L124
[auto-detect.js]: https://github.com/EmergingTechnologyAdvisors/node-serialport/blob/master/lib/bindings/auto-detect.js
[node-bindings]: https://github.com/TooTallNate/node-bindings
[Rising Stack]: https://blog.risingstack.com/writing-native-node-js-modules/
[`binding.gyp`]: https://github.com/EmergingTechnologyAdvisors/node-serialport/blob/master/binding.gyp
[`NaN`]: https://github.com/nodejs/nan
[C++ macros]: https://gcc.gnu.org/onlinedocs/cpp/Macros.html
[Addon documentation]: https://nodejs.org/api/addons.html
[guide on backpressuring]: https://github.com/nodejs/nodejs.org/pull/1109
