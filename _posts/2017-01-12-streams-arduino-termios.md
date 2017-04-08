---
layout: post
title:  "Streams, The Arduino, and Cross-platform Complexity"
description: "Robotting around the world (or at least around many systems)"
tags: [outreachy, nodejs]
---

It's certainly been awhile since I have written up a post in regards to my
Outreachy internship with Node! I think most folks are suffering from a hazy
case of the "holidaze" right now, and I will admit that I am one of them. 

I was hoping to do a two-for-one by posting the project I worked on over the
holidays at the same time as this update. There have been considerable delays,
but as the punchline goes: "better nate than lever!"

Here's a quick catch up on what I have been working on :)

### Streams Writeup

Prior to beginning my mentorship with Myles, I inquired often on Streams in
Node.js. I truly did not understand them.

As a part of initiating our project, we decided I would do a writeup on streams.
It quickly got out of hand. My piece is now >3000 words long and is still
incomplete. To make the piece easier to read and understand, I have split up the
post into two pieces, and will be publishing it on Medium later this week.

There is still a bit of polishing to do, but I am happy to have employed so
many different faculties of myself: researching & learning (on UNIX anagalous
to streams), editorial writing, and coding & hacking examples. It was a long
task that took longer than I would have liked. But I'm very happy with how much
I know.

To build on my knowledge even further, I will be helping to write up a first
draft on a [guide to back-pressuring with streams] to contribute to node-docs.
I'm very happy to advance my expertise on this subject. Some of the practical
aspects still feel very foreign, but theortically, I understand so much more
about UNIX in general, and I have begun to understand the deep connection
between UNIX and node.


### The Arduino

When I met up with Francis Guetto who maintains the node-serialport package,
he graciously gifted me with an Arduino Uno that was flashed with the serialport test code.

{% include image.html path="artisanal_arduino.jpg" path-detail="artisanal_arduino.jpg" alt="An Artisanal Arduino" %}
<em>An Arduino Uno Against An Artisanal Cafe Background</em>
<!-- <div>
  <img src="{{ site.url }}/assets/images/artisanal_arduino.jpg" alt="An Artisanal Arduino"/>
  <em>An Arduino Uno Against An Artisanal Cafe Background</em>
</div>  
 -->
---
  
I have begun playing around with node-serialport to understand exactly what is
happening outside of the Johnny-five abstraction layer. Myles suggested that
I try out the [Arduino blink program] to learn more about serial communication.

Thus far, this is what I know:

* Serial communication is a way for two devices to speak with each other. Both the output device and input device are told to send and recieve data at the exact same time (this is also known as _baudrate_).
* Once a program is uploaded onto an arduino, it can run independent of the operating system that it originated from, so long it is connected to a power source.

#### Goals to Blink

1. Connect to the device
2. Pinpoint the LED pin (on an Arduino Uno, the built-in LED is called pin 13)
3. Send HIGH and LOW signals from node-serialport to turn the LED on and off

I ran into a few roadblocks with this project. Without being too pedantic, step 2 is the biggest issue in my way.

I am able to mimic a blink program using only the RX light on the Arduino board. Ideally, this would operate on the L-pin (aka pin 13). But, looking at
Johnny-five's codebase, it seems to be a complex procedure and will require a
bit more time and understanding.

Tomorrow, Myles and I will plan to co-code and work on this problem together.

For now, here is a currrent snapshot of the code that succeeds in getting
the RX light to blink:

```
var SerialPort = require('serialport');

var port = new SerialPort('/dev/cu.usbmodem1411', {
  // A baud is the unit to denote rate of data transfer in electronics.
  // Explicitly, it is the amount of signals sent per second.
  baudRate: 9600
});

port.on('open', () => {

  console.log('Port is open!');

  var SIG = 0, LOW = 0, HIGH = 255;

  function sendData() {
    // Send the data.
    port.write(SIG);

    // Ternary operation to alternate high and low signals.
    SIG = SIG === 0 ? HIGH : LOW;
  }

  // Set an interval to send data every 500ms.
  setInterval(sendData, 500);
});

// Open errors will be emitted as an error event.
port.on('error', (err) => {
  console.log('Error: ', err.message);
});

```


### Cross-platform Complexity

Finally, I have been taking a look at this [node-serialport issue]. From our
meeting, Francis compiled a wishlist that libuv and node-core could work on
to implement a cleaner serialport interface. One of those includes a setting
to set a custom baudrate.

The ability to set a custom baudrate is useful if you're working with a piece
of hardware that sends out signals at a non-standard rate.

One of the largest hurdles in this is that each operating system effectively
uses a different C library and the system calls varies slightly from each other.

As Francis writes,
>There are a finite set of tricks for linux, osx and windows to make this work right and serialport hasn't yet figured them all out yet.

In the referenced issue, someone opened a pull request that had a fix for
Linux systems. In newer versions of Linux (+2.8), there is a new C `struct`
called `termios2`. This `struct` is used in `pyserial` for its ability to
set custom baudrates. However, because it is linux specific, it does not  open the option up to Windows and OSX.

Francis offers a suggestion to transplant the `termios2` code into the project to bypass cross-platform issues. However, I agree with his opinion
that it would not be the best solution.

Hopefully, we can generate ideas what can be done in libuv and node-core to
fix this issue.

#### Thanks for reading! :)

<!-- External links-->

[guide to back-pressuring with streams]: https://github.com/nodejs/node/issues/10766
[Arduino blink program]: https://www.arduino.cc/en/tutorial/blink
[node-serialport issue]: https://github.com/EmergingTechnologyAdvisors/node-serialport/issues/545
