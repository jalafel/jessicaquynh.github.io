---
layout: post
title:  "What I am Learning: Threading"
description: "Multi-thread vs Single threads, exactly what are threads even about?"
tags: [learning, unix, nodejs]
---

## What is a Thread?

A thread is a term that denotes the execution of the smallest sequence of
programmed instructions that can be managed by a `scheduler`[^1]. Typically, a
thread is used by an operating system, and is a component of a process.

Properties of threads:
  - Multiple threads can exists within one process (_multithreading_)
  - By property, it can execute concurrently and shares resources (ie. memory)

### It is not a process

Though the definition uses the word `process`, a thread is not a process, vice
versa. However, we can say that a thread or multiple threads is contained within
a subset of a process.
  - processes are typically independent
  - processes carry more state information than threads, while multiple threads
    within a process share process state as well as memory & other resources
  - processes have separate address spaces[^2], threads share theirs
  - processes interact only through system-provided inter-process
    communication[^3] mechanisms
  - context-switching with threads is faster than it is with processes

### Single-threading

This is the term to denote the processing of one command at a time.

### Multi-threading

This allows multiple threads to exist within the context of one process. They
share the process's resources, but are able to execute independently. It can
also be useful for concurrent execution or parallel execution[^4].

### Where does JavaScript fit on the binary?

JavaScript is an example of non-parallel concurrency. There is only one thread.
Any asynchronous callback must wait until the previous chunk of code has
finished executing. This is important to know, because it guarantees that any
function you write is atomic[^5], and thus, no callback can interrupt the
function until it returns.

The atomization of JavaScript functions, guarantees that the shared memory will
use the entire data as it appears in the moment of execution.

There is one single thread that handles your event loop[^6]. The event loop is
a queue of unprocessed events. It iterates through one at a time, and invokes
each event as necessary; say a function calls another function, there is no
other function you can implement in your program that can block that callback
from executing. Once an event is processed, the event loop dequeues that event
and the process continues.

### Synchronous I/O (blocking I/O)

A form of I/O that waits for each process to complete before starting the next.
This approach blocks the progress of a program while the communication is in
progress, leaving system resources idle. If there are many I/O operations, a
processor can spend much of it's time idle, waiting for I/O operations to
complete.

### Asynchronous I/O (non-blocking I/O, non-sequential I/O)

A form of I/O that permits other processing to continue before the transmission
has finished. It functions such that any operation that depends on another
operation to complete to remain blocked, while other functions that are
independent to continue.

The method for implementation utilizes polling[^7] at intervals

This is used to improve throughput, latency, and/or responsiveness.

### What is Node.js, then?

Node.js is a runtime environment[^7] for JavaScript. It operates on a
single-thread and uses non-blocking I/O calls. If you recall, this will
support concurrency between function calls, and the single thread enforces
callbacks.

While this sounds inefficient, node.js operates asynchronously. Which is why
we can say that it is event-driven. The event loop exists to poll specific
events and invokes handlers at the proper time. A callback function is also
known as an event handler.

So when a function is invoked in the event pool from Node.js it makes that
request and attaches a callback function to that request. Whenever the
request is fulfilled, an event is emitted to trigger the associated callback
to do something with either the results of the requested action

In order to accomodate the single-threaded event loop, libuv is utilized to
use a fixed-size threadpool, which is responsible for some of the
non-blocking asynchronous I/O operations.

Uses of Node include:

  - Web servers and networking tools
  - file system I/O
  - networking (DNS, HTTP, TCP, TLS/SSL, or UDP)
  - binary data (buffers)
  - cryptography functions
  - data streams

#### More on Threadpool

Since each execution of parallel tasks are handled by the threadpool, let's look
a little closer to what that means.

A threadpool is a queued set of threads that is dispatched by the main thread.
Each thread differs inherent to its type; networking is non-blocking and file
I/O runs in a blocking way.

When a thread in the thread pool completes a task, it informs the main thread of
this, which in turn, the main thread reacts by executing the registered
callback. Callbacks are handled serially on the main thread, which may pose
problems if long-lasting computations will freeze the entire event-loop.

Glossary:
_Throughput_ - the total amount of work completed per time unit
_Response Time_ - time from work becoming enabled until the first point it
                  begins execution
_Latency_ - the time between working becoming enabled and its completion
_Heap_ - Denotes a large, mostly unstructured, region of memory
_Data race_ - Two memory accesses in a program where both:
  - target the same location
  - are performed concurrently by two threads
  - are not reads
  - are not synchronization operations
  Data races can exist without race conditions but many data races lead
  to race conditions.
_Race condition_ - Where output is dependent on the sequence of timing of
other unctonrollable events.
  Race conditions can exist without data races, but many race conditions
  are due to data races.
_Execution Model_ - Specifies how work takes place specific to the language

Resources:
https://en.wikipedia.org/wiki/Thread_(computing)
https://en.wikipedia.org/wiki/Scheduling_(computing)
https://en.wikipedia.org/wiki/Parallel_computing
https://en.wikipedia.org/wiki/Linearizability
https://en.wikipedia.org/wiki/Asynchronous_I/O
https://en.wikipedia.org/wiki/Runtime_system
https://en.wikipedia.org/wiki/Node.js
https://en.wikipedia.org/wiki/Observer_pattern
https://developer.mozilla.org/en/docs/Web/JavaScript/EventLoop
http://softwareengineering.stackexchange.com/questions/190719/
https://www.quora.com/How-does-a-single-thread-handle-asynchronous-code-in-JavaScriptthe-difference-between-concurrent-and-parallel-execution
http://preshing.com/20130618/atomic-vs-non-atomic-operations/
http://blog.regehr.org/archives/490


### Footnotes
[^1]:
    A scheduler is a method by which work is assigned to resources to complete
    that work.

[^2]:
    An address space defines a range of discrete addresses; of each may relate
    to a network host, peripheal device, disk sector, a memory cell or other
    logical/physical idenitty.

[^3]:
    IPC are mechanisms that allow processes to share data; typically categorized
    as clients and servers.

[^4]:
    The difference between concurrent and parallel execution is explained as
    concurrency being the sequence of task A and task B happening independently.
    Such that task A begins, and then B starts before task A is finished.
    Otherwise stated that A and B tasks/calculations happen within the same time
    frame, with a general tendency towards depdendency between the two.

    On the other hand, parallelism describes two or more tasks/calculations that
    happen simultaneously. Parallelism is one way to implement concurrency. This
    is seen through task switching; the CPU will switch between tasks A and B
    with fractions of time slices in between and the two tasks will appear to be
    running in parallel.

[^5]:
    This is a term used in concurrent programming. Also known as
    linearizability. An operation (or set of) is atomic if it appears to the
    rest of the system to occur instantaneously. It guarantees isolation from
    concurrent processes. They commonly have a succeed-or-fail definition. They
    either successfully change the state of the system or have no apparent
    effect.

[^6]:
    Got its name from its usual implementation:

        while(queue.waitForMessage()) {
          queue.processNextMessage();
        }

    `queue.processNextMessage` waits synchronously for a message to arrive (where
    a _message_ is an association with the function to be called in a JavaScript
    runtime).

    Each message is processed completely before any other message is processed. It
    cannot be pre-empted and will run entirely before any other code runs. Unlike in
    C, which if a function runs in a thread, it can be stopped at any point to
    run some other code in another thread.

[^7]:
    A system to implement an execution model (the order in which work was
    specified in terms of the language that it gets performed.)

